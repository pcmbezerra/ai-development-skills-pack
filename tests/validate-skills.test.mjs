import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cp, mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validate } from '../scripts/validate-skills.mjs';

const source = fileURLToPath(new URL('../', import.meta.url));
async function fixture(run) {
  const root = await mkdtemp(join(tmpdir(), 'skills-validation-'));
  try {
    for (const path of ['bin','skills','contracts','templates','targets','manifest','references','package.json','README.md','AGENTS.md']) await cp(join(source,path),join(root,path),{recursive:true});
    await run(root);
  } finally {
    await rm(root,{recursive:true,force:true});
  }
}
async function changeManifest(root, edit) {
  const path = join(root,'manifest/skills.json');
  const manifest = JSON.parse(await readFile(path,'utf8'));
  edit(manifest);
  await writeFile(path,JSON.stringify(manifest));
}
async function changeText(root,path,edit) {
  const target = join(root,path);
  await writeFile(target,edit(await readFile(target,'utf8')));
}
async function markSkillImplemented(root, name) {
  let skill;
  await changeManifest(root,m=>{
    skill = m.skills.find(s=>s.name===name);
    skill.status = 'implemented';
  });
  await changeText(root,skill.contract,s=>s
    .replace('Status: scaffold.', 'Status: implemented.')
    .replace(/Pending implementation\. Read inputs and the shared artifact contract; operational steps are outside this scaffold\.\r?\n/, '')
    .replace(' This scaffold does not execute the workflow or produce ready artifacts.', ''));
  await changeText(root,skill.path,s=>s
    .replace('Status: scaffold; the operational workflow is not implemented.', 'Status: implemented; the operational workflow is available.')
    .replace('When preparing this skill for implementation,', 'Before executing this skill,')
    .replace('Do not claim to have executed this skill from this skeleton.', 'Execute the workflow and report its observable result.'));
  return skill;
}
async function implementSkill(root, name) {
  const skill = await markSkillImplemented(root,name);
  await changeText(root,skill.contract,s=>s.replace(
    /## Workflow\r?\n\r?\n(?=## Quality gates)/,
    '## Workflow\n\n1. Read the approved input and repository context.\n2. Apply the smallest scoped change.\n3. Validate behavior and record evidence.\n\n',
  ));
  await changeText(root,skill.path,s=>`${s}\n## Workflow\n\n1. Read the requested change and repository context.\n2. Apply the smallest scoped change.\n3. Validate behavior and report evidence.\n`);
  return skill;
}
async function artifactLineEndings(root, eol) {
  const manifest = JSON.parse(await readFile(join(root,'manifest/skills.json'),'utf8'));
  const paths = new Set(Object.values(manifest.artifacts).flatMap(a=>[a.contract,a.template]).filter(Boolean));
  for (const path of paths) await changeText(root,path,s=>s.replace(/\r\n/g,'\n').replace(/\n/g,eol));
}
for (const [format,eol] of [['LF','\n'],['CRLF','\r\n']]) {
  test(`accepts artifact contracts and templates with ${format}`,()=>fixture(async root=>{
    await artifactLineEndings(root,eol);
    const result = await validate(root);
    assert.deepEqual(result.errors,[]);
    assert.equal(result.ok,true);
    assert.equal(result.skills,18);
  }));
  for (const [artifact,path,section] of [
    ['SPEC','templates/artifacts/spec.md','Acceptance Criteria'],
    ['ADR','templates/artifacts/adr.md','Decision'],
  ]) test(`rejects missing ${artifact} section with ${format}`,()=>fixture(async root=>{
    await artifactLineEndings(root,eol);
    await changeText(root,path,s=>s.replace(`## ${section}${eol}`,''));
    const result = await validate(root);
    assert.equal(result.ok,false);
    assert.deepEqual(result.errors,[`${artifact}: missing template section ${section}`]);
  }));
}
test('accepts one consistently implemented skill in the scaffold catalogue',()=>fixture(async root=>{
  await implementSkill(root,'implement');
  const result = await validate(root);
  assert.equal(result.ok,true,result.errors.join('\n'));
  assert.equal(result.skills,18);
}));
const failures = [
  ['npm development dependency', async root=>{
    const path = join(root,'package.json');
    const packageJson = JSON.parse(await readFile(path,'utf8'));
    packageJson.devDependencies = {fixture: '1.0.0'};
    await writeFile(path,JSON.stringify(packageJson));
  }, /Package dependencies forbidden/],
  ['escaping CLI entrypoint', async root=>{
    const path = join(root,'package.json');
    const packageJson = JSON.parse(await readFile(path,'utf8'));
    packageJson.bin['ai-dev-skills'] = '../outside.mjs';
    await writeFile(path,JSON.stringify(packageJson));
  }, /Invalid CLI entrypoint/],
  ['implemented bootstrap migration status divergence', root=>changeManifest(root,m=>m.skills.find(s=>s.name==='setup-ai-development-skills').status='scaffold'), /setup-ai-development-skills: status mismatch \(manifest scaffold, contract implemented, source implemented\)/],
  ['implemented context migration status divergence', root=>changeManifest(root,m=>m.skills.find(s=>s.name==='context-engineering').status='scaffold'), /context-engineering: status mismatch \(manifest scaffold, contract implemented, source implemented\)/],
  ['unknown skill status', root=>changeManifest(root,m=>m.skills.find(s=>s.name==='implement').status='experimental'), /implement: invalid skill status experimental/],
  ['skill status divergence in contract', root=>changeText(root,'contracts/skills/implement.md',s=>s.replace('Status: scaffold.', 'Status: implemented.')), /implement: status mismatch \(manifest scaffold, contract implemented, source scaffold\)/],
  ['skill status divergence in source', root=>changeText(root,'skills/development/implement/SKILL.md',s=>s.replace('Status: scaffold;', 'Status: implemented;')), /implement: status mismatch \(manifest scaffold, contract scaffold, source implemented\)/],
  ['skill status divergence in manifest', root=>changeManifest(root,m=>m.skills.find(s=>s.name==='implement').status='implemented'), /implement: status mismatch \(manifest implemented, contract scaffold, source scaffold\)/],
  ['implemented skill with pending workflow', async root=>{
    await implementSkill(root,'implement');
    await changeText(root,'contracts/skills/implement.md',s=>`${s}\nPending implementation.\n`);
  }, /implement: implemented skill declares pending or unavailable workflow/],
  ['implemented skill denying operational capability', async root=>{
    await implementSkill(root,'implement');
    await changeText(root,'skills/development/implement/SKILL.md',s=>`${s}\nDo not claim to have executed this skill from this skeleton.\n`);
  }, /implement: implemented skill declares pending or unavailable workflow/],
  ['implemented skill without operational workflow', root=>markSkillImplemented(root,'implement'), /implement: implemented skill must define workflow in contract and source/],
  ['implemented skill with workflow placeholder', async root=>{
    const skill = await implementSkill(root,'implement');
    await changeText(root,skill.path,s=>`${s}\nTBD\n`);
  }, /implement: implemented skill declares pending or unavailable workflow/],
  ['implemented skill with unsupported operational execution', async root=>{
    const skill = await implementSkill(root,'implement');
    await changeText(root,skill.path,s=>`${s}\nOperational execution remains unsupported.\n`);
  }, /implement: implemented skill declares pending or unavailable workflow/],
  ['implemented skill with pending implementation', async root=>{
    const skill = await implementSkill(root,'implement');
    await changeText(root,skill.path,s=>`${s}\nImplementation pending.\n`);
  }, /implement: implemented skill declares pending or unavailable workflow/],
  ['implemented skill with non-operational capability', async root=>{
    const skill = await implementSkill(root,'implement');
    await changeText(root,skill.path,s=>`${s}\nThis capability is not operational.\n`);
  }, /implement: implemented skill declares pending or unavailable workflow/],
  ['missing Claude Code target', root=>changeManifest(root,m=>m.targets=m.targets.filter(t=>t.name!=='claude-code')), /Invalid targets/],
  ['Claude Code installation disabled', root=>changeText(root,'targets/claude-code.mjs',s=>s.replace('"installationImplemented": true','"installationImplemented": false')), /claude-code: incompatible target descriptor/],
  ['hardcoded Claude Code path', root=>changeText(root,'skills/development/implement/SKILL.md',s=>s+'\nInstall at .claude/skills\n'), /hardcoded target/],
  ['unknown artifact', root=>changeManifest(root,m=>m.skills.find(s=>s.name==='implement').artifactOutputs.push('UNKNOWN')), /unknown declared artifact/],
  ['missing artifact declaration', root=>changeManifest(root,m=>m.skills.find(s=>s.name==='implement').artifactOutputs=[]), /undeclared output artifact/],
  ['missing input declaration', root=>changeManifest(root,m=>m.skills.find(s=>s.name==='to-spec').artifactInputs=[]), /undeclared input artifact/],
  ['missing template', root=>changeManifest(root,m=>m.artifacts.SPEC.template='templates/missing.md'), /missing reference/],
  ['missing template section', root=>changeText(root,'templates/artifacts/spec.md',s=>s.replace('## Acceptance Criteria','## Missing')), /missing template section Acceptance Criteria/],
  ['ready template', root=>changeText(root,'templates/artifacts/spec.md',s=>s.replace('status: draft','status: ready')), /template must be draft/],
  ['invented named-only schema', root=>changeManifest(root,m=>m.artifacts.CHANGE_SET.template='templates/artifacts/spec.md'), /must not invent/],
  ['missing R17', root=>changeText(root,'contracts/routing.md',s=>s.replace('## R17 —','## Removed —')), /ordered R1–R17/],
  ['missing failure field', root=>changeText(root,'contracts/failure.md',s=>s.replace('Missing prerequisite','Missing requirement')), /Missing failure field/],
  ['duplicate target', root=>changeManifest(root,m=>m.targets[2]=m.targets[1]), /Duplicate targets/],
  ['target installation disabled', root=>changeText(root,'targets/codex.mjs',s=>s.replace('"installationImplemented": true','"installationImplemented": false')), /incompatible target descriptor/],
  ['invalid target skills path', root=>changeText(root,'targets/codex.mjs',s=>s.replace('".agents/skills"','".codex/skills"')), /invalid project skills path/],
  ['executable target prelude', root=>changeText(root,'targets/codex.mjs',s=>'console.log("side effect");\n'+s), /declarative descriptor/],
  ['hardcoded target path', root=>changeText(root,'skills/development/implement/SKILL.md',s=>s+'\nInstall at .cursor/skills\n'), /hardcoded target/],
  ['mandatory cycle', root=>changeManifest(root,m=>m.skills.find(s=>s.name==='context-engineering').dependencies.required.push('setup-ai-development-skills')), /Mandatory cycle/],
  ['conditional cycle', root=>changeManifest(root,m=>m.skills.find(s=>s.name==='context-engineering').dependencies.conditional.push({skill:'setup-ai-development-skills',when:'fixture'})), /Mandatory\/conditional cycle/],
];
for (const [name,mutate,expected] of failures) test(`rejects ${name}`,()=>fixture(async root=>{
  await mutate(root);
  const result = await validate(root);
  assert.equal(result.ok,false);
  assert.match(result.errors.join('\n'),expected);
}));
test('optional composition cycles do not become mandatory prerequisites',()=>fixture(async root=>{
  await changeManifest(root,m=>m.skills.find(s=>s.name==='context-engineering').dependencies.optional.push('setup-ai-development-skills'));
  const result = await validate(root);
  assert.equal(result.ok,true,result.errors.join('\n'));
}));
test('current catalogue implements to-spec, clarify, workflow, context and bootstrap without defining named-only outputs',async()=>{
  const manifest = JSON.parse(await readFile(join(source,'manifest/skills.json'),'utf8'));
  assert.deepEqual(manifest.skills.filter(skill=>skill.status==='implemented').map(skill=>skill.name),['setup-ai-development-skills','workflow','clarify','context-engineering','to-spec']);
  assert.equal(manifest.skills.filter(skill=>skill.status==='scaffold').length,13);
  assert.deepEqual(manifest.skills.find(skill=>skill.name==='to-spec').dependencies,{required:[],conditional:[{skill:'clarify',when:'material ambiguity exists'}],optional:[]});
  assert.deepEqual(manifest.artifacts.SPEC,{
    contract: 'contracts/artifacts.md',
    template: 'templates/artifacts/spec.md',
    schema: 'defined',
  });
  assert.deepEqual(manifest.skills.find(skill=>skill.name==='clarify').dependencies.optional,['context-engineering']);
  assert.deepEqual(manifest.artifacts.DECISION_SET,{
    contract: 'contracts/artifacts.md',
    template: 'templates/artifacts/decision-set.md',
    schema: 'defined',
  });
  assert.deepEqual(manifest.skills.find(skill=>skill.name==='setup-ai-development-skills').dependencies.required,['context-engineering']);
  assert.deepEqual(manifest.skills.find(skill=>skill.name==='workflow').dependencies,{required:[],conditional:[],optional:[]});
  assert.deepEqual(manifest.artifacts.PROJECT_CONTEXT,{
    contract: 'contracts/artifacts.md',
    schema: 'named-only',
  });
  assert.deepEqual(manifest.artifacts.BOOTSTRAP_READINESS,{
    contract: 'contracts/artifacts.md',
    schema: 'named-only',
  });
  assert.deepEqual(manifest.artifacts.WORKFLOW_PLAN,{
    contract: 'contracts/artifacts.md',
    schema: 'named-only',
  });
});
test('CLI exposes distribution commands while rejecting unsupported commands',()=>{
  const cli = join(source,'bin/ai-dev-skills.mjs');
  for (const command of ['--help','help','-h']) {
    const result = spawnSync(process.execPath,[cli,command],{encoding:'utf8'});
    assert.equal(result.status,0,result.stderr);
    assert.match(result.stdout,/ai-dev-skills install --target/);
    assert.match(result.stdout,/ai-dev-skills package --target/);
  }
  for (const command of ['bootstrap','doctor','list','sync']) {
    const result = spawnSync(process.execPath,[cli,command],{encoding:'utf8'});
    assert.equal(result.status,1,`${command}: ${result.stdout}${result.stderr}`);
    assert.match(result.stderr,/ERROR:/);
  }
});
test('current mixed catalogue satisfies the complete baseline checks',async()=>{
  const result = await validate(source);
  assert.equal(result.ok,true,result.errors.join('\n'));
  assert.equal(result.skills,18);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validate } from '../scripts/validate-skills.mjs';

const source = fileURLToPath(new URL('../', import.meta.url));
async function fixture(run) {
  const root = await mkdtemp(join(tmpdir(), 'skills-validation-'));
  try {
    for (const path of ['skills','contracts','templates','targets','manifest','references','package.json','README.md','AGENTS.md']) await cp(join(source,path),join(root,path),{recursive:true});
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
  ['missing Claude Code target', root=>changeManifest(root,m=>m.targets=m.targets.filter(t=>t.name!=='claude-code')), /Invalid targets/],
  ['Claude Code installation enabled', root=>changeText(root,'targets/claude-code.mjs',s=>s.replace('"installationImplemented": false','"installationImplemented": true')), /claude-code: incompatible scaffold descriptor/],
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
  ['target installation enabled', root=>changeText(root,'targets/codex.mjs',s=>s.replace('"installationImplemented": false','"installationImplemented": true')), /incompatible scaffold descriptor/],
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
test('current scaffold satisfies the complete baseline checks',async()=>{
  const result = await validate(source);
  assert.equal(result.ok,true,result.errors.join('\n'));
  assert.equal(result.skills,18);
});

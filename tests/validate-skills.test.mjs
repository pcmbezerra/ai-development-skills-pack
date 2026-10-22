import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { chmod, cp, mkdtemp, mkdir, readFile, readdir, stat, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { delimiter, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projectCatalogue, projectContract, validate } from '../scripts/validate-skills.mjs';

const source = fileURLToPath(new URL('../', import.meta.url));
async function fixture(run) {
  const root = await mkdtemp(join(tmpdir(), 'skills-validation-'));
  try {
    for (const path of ['bin','skills','contracts','templates','targets','manifest','references','package.json','README.md','AGENTS.md','CONTEXT.md']) await cp(join(source,path),join(root,path),{recursive:true});
    await mkdir(join(root,'.ai'),{recursive:true});
    await mkdir(join(root,'docs/agents'),{recursive:true});
    for (const path of ['.ai/architecture.md','.ai/project.md','docs/agents/domain.md','docs/agents/issue-tracker.md','docs/agents/triage-labels.md']) await cp(join(source,path),join(root,path));
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
async function setDescription(root, name, description) {
  let skill;
  await changeManifest(root, manifest => {
    skill = manifest.skills.find(item => item.name === name);
    skill.description = description;
  });
  await changeText(root, skill.path, text => text.replace(/^description: .+$/m, `description: ${JSON.stringify(description)}`));
}
async function setName(root, name, next) {
  await changeManifest(root, manifest => {
    manifest.skills.find(item => item.name === name).name = next;
  });
}
async function refreshContractProjection(root, contractPath) {
  const manifest = JSON.parse(await readFile(join(root,'manifest/skills.json'),'utf8'));
  const skill = manifest.skills.find(item=>item.contract===contractPath);
  await writeFile(join(root,skill.path.replace(/SKILL\.md$/,'references/contract.md')), projectContract(await readFile(join(root,contractPath),'utf8')));
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
  await refreshContractProjection(root, skill.contract);
  await changeText(root,skill.path,s=>s
    .replace('Status: scaffold; the operational workflow is not implemented.', 'Status: implemented; the operational workflow is available.')
    .replace('When preparing this skill for implementation,', 'Before executing this skill,')
    .replace('Do not claim to have executed this skill from this skeleton.', 'Execute the workflow and report its observable result.'));
  return skill;
}
async function restoreModernizeScaffold(root) {
  await changeManifest(root,m=>m.skills.find(s=>s.name==='modernize').status='scaffold');
  await changeText(root,'contracts/skills/modernize.md',s=>`${s
    .replace('Status: implemented.', 'Status: scaffold.')
    .replace(/## Workflow\r?\n\r?\n[\s\S]*?\r?\n## Quality gates/,'## Workflow\n\nPending implementation. Read inputs and the shared artifact contract; operational steps are outside this scaffold.\n\n## Quality gates')}\n This scaffold does not execute the workflow or produce ready artifacts.\n`);
  await refreshContractProjection(root, 'contracts/skills/modernize.md');
  await writeFile(join(root,'skills/modernization/modernize/SKILL.md'),`---
name: modernize
description: "Plans a bounded runtime, framework, or architecture migration and does not apply it. Use when the work is modernization rather than an ordinary refactor."
---

# modernize

Status: scaffold; the operational workflow is not implemented.

When preparing this skill for implementation, read its [contract](references/contract.md) for inputs, outputs, constraints, gates and failure behaviour.

Consult that contract for invocation and dependencies, [modernization-plan.md](assets/modernization-plan.md) for persistence, and [routing rules](references/routing.md) for prerequisites.

Do not claim to have executed this skill from this skeleton.
`);
}
async function implementSkill(root, name) {
  const skill = await markSkillImplemented(root,name);
  await changeText(root,skill.contract,s=>s.replace(
    /## Workflow\r?\n\r?\n(?=## Quality gates)/,
    '## Workflow\n\n1. Read the approved input and repository context.\n2. Apply the smallest scoped change.\n3. Validate behavior and record evidence.\n\n',
  ));
  await refreshContractProjection(root, skill.contract);
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
  for (const [artifact,path,section,asset] of [
    ['SPEC','templates/artifacts/spec.md','Acceptance Criteria','skills/discovery/to-spec/assets/spec.md'],
    ['ADR','templates/artifacts/adr.md','Decision','skills/discovery/architecture-design/assets/adr.md'],
  ]) test(`rejects missing ${artifact} section with ${format}`,()=>fixture(async root=>{
    await artifactLineEndings(root,eol);
    const strip = text=>text.replace(`## ${section}\r\n`,'').replace(`## ${section}\n`,'');
    await changeText(root,path,strip);
    await changeText(root,asset,strip);
    const result = await validate(root);
    assert.equal(result.ok,false);
    assert.deepEqual(result.errors,[`${artifact}: missing template section ${section}`]);
  }));
}
test('accepts one consistently implemented skill in the scaffold catalogue',()=>fixture(async root=>{
  await restoreModernizeScaffold(root);
  await implementSkill(root,'modernize');
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
  ['skill status divergence in contract', async root=>{ await restoreModernizeScaffold(root); await changeText(root,'contracts/skills/modernize.md',s=>s.replace('Status: scaffold.', 'Status: implemented.')); }, /modernize: status mismatch \(manifest scaffold, contract implemented, source scaffold\)/],
  ['skill status divergence in source', async root=>{ await restoreModernizeScaffold(root); await changeText(root,'skills/modernization/modernize/SKILL.md',s=>s.replace('Status: scaffold;', 'Status: implemented;')); }, /modernize: status mismatch \(manifest scaffold, contract scaffold, source implemented\)/],
  ['skill status divergence in manifest', async root=>{ await restoreModernizeScaffold(root); await changeManifest(root,m=>m.skills.find(s=>s.name==='modernize').status='implemented'); }, /modernize: status mismatch \(manifest implemented, contract scaffold, source scaffold\)/],
  ['implemented skill with pending workflow', async root=>{
    await implementSkill(root,'implement');
    await changeText(root,'contracts/skills/implement.md',s=>`${s}\nPending implementation.\n`);
  }, /implement: implemented skill declares pending or unavailable workflow/],
  ['implemented skill denying operational capability', async root=>{
    await implementSkill(root,'implement');
    await changeText(root,'skills/development/implement/SKILL.md',s=>`${s}\nDo not claim to have executed this skill from this skeleton.\n`);
  }, /implement: implemented skill declares pending or unavailable workflow/],
  ['implemented skill without operational workflow', async root=>{ await restoreModernizeScaffold(root); await markSkillImplemented(root,'modernize'); }, /modernize: implemented skill must define workflow in contract and source/],
  ['implemented skill with workflow placeholder', async root=>{
    await restoreModernizeScaffold(root);
    const skill = await implementSkill(root,'modernize');
    await changeText(root,skill.path,s=>`${s}\nTBD\n`);
  }, /modernize: implemented skill declares pending or unavailable workflow/],
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
  ['discovery description without trigger', async root=>{
    const description = 'Recommends a skill sequence.';
    await changeManifest(root,m=>m.skills.find(s=>s.name==='workflow').description=description);
    await changeText(root,'skills/core/workflow/SKILL.md',s=>s.replace(/^description: .+$/m,`description: ${JSON.stringify(description)}`));
  }, /workflow: discovery description must state when to use the skill/],
  ['link that escapes the skill directory', root=>changeText(root,'skills/development/implement/SKILL.md',s=>s.replace('](references/contract.md)','](../../../contracts/skills/implement.md)')), /implement: link escapes skill directory/],
  ['projection drifted from the canonical source', root=>changeText(root,'skills/development/implement/references/failure.md',s=>`${s}\nlocal drift\n`), /implement: failure projection drifted/],
  ['discovery description over the pack budget', async root=>{
    const description = `Use when ${'x'.repeat(240)}`;
    await changeManifest(root,m=>m.skills.find(s=>s.name==='workflow').description=description);
    await changeText(root,'skills/core/workflow/SKILL.md',s=>s.replace(/^description: .+$/m,`description: ${JSON.stringify(description)}`));
  }, /workflow: discovery description exceeds the 240-character pack budget/],
];
for (const [name,mutate,expected] of failures) test(`rejects ${name}`,()=>fixture(async root=>{
  await mutate(root);
  const result = await validate(root);
  assert.equal(result.ok,false);
  assert.match(result.errors.join('\n'),expected);
}));
test('optional composition cycles do not become mandatory prerequisites',()=>fixture(async root=>{
  await changeManifest(root,m=>m.skills.find(s=>s.name==='context-engineering').dependencies.optional.push('setup-ai-development-skills'));
  const manifest = JSON.parse(await readFile(join(root,'manifest/skills.json'),'utf8'));
  await writeFile(join(root,'skills/core/workflow/references/catalogue.json'), projectCatalogue(manifest.skills));
  const result = await validate(root);
  assert.equal(result.ok,true,result.errors.join('\n'));
}));
test('current catalogue implements modernize, docs, edge-case-analysis, refactor, diagnose, research, handoff, code-review, tdd, implement, architecture-design, domain-modelling, to-tickets, to-spec, clarify, workflow, context and bootstrap without defining named-only outputs',async()=>{
  const manifest = JSON.parse(await readFile(join(source,'manifest/skills.json'),'utf8'));
  assert.deepEqual(manifest.skills.filter(skill=>skill.status==='implemented').map(skill=>skill.name),['setup-ai-development-skills','workflow','clarify','context-engineering','handoff','research','to-spec','domain-modelling','architecture-design','to-tickets','diagnose','implement','tdd','refactor','edge-case-analysis','code-review','docs','modernize']);
  assert.equal(manifest.skills.filter(skill=>skill.status==='scaffold').length,0);
  assert.deepEqual(manifest.skills.find(skill=>skill.name==='modernize').dependencies,{required:[],conditional:[],optional:['diagnose','research','architecture-design','tdd','to-tickets']});
  assert.deepEqual(manifest.artifacts.MODERNIZATION_PLAN,{
    contract: 'contracts/artifacts.md',
    template: 'templates/artifacts/modernization-plan.md',
    schema: 'defined',
  });
  assert.deepEqual(manifest.skills.find(skill=>skill.name==='docs').dependencies,{required:[],conditional:[],optional:[]});
  assert.deepEqual(manifest.artifacts.DOC_UPDATE,{
    contract: 'contracts/artifacts.md',
    template: 'templates/artifacts/doc-update.md',
    schema: 'defined',
  });
  assert.deepEqual(manifest.skills.find(skill=>skill.name==='refactor').dependencies,{required:[],conditional:[],optional:[]});
  assert.deepEqual(manifest.skills.find(skill=>skill.name==='diagnose').dependencies,{required:[],conditional:[],optional:['tdd']});
  assert.deepEqual(manifest.artifacts.DIAGNOSIS_REPORT,{
    contract: 'contracts/artifacts.md',
    template: 'templates/artifacts/diagnosis-report.md',
    schema: 'defined',
  });
  assert.deepEqual(manifest.skills.find(skill=>skill.name==='handoff').dependencies,{required:[],conditional:[],optional:[]});
  assert.deepEqual(manifest.artifacts.HANDOFF,{
    contract: 'contracts/artifacts.md',
    template: 'templates/artifacts/handoff.md',
    schema: 'defined',
  });
  assert.deepEqual(manifest.skills.find(skill=>skill.name==='research').dependencies,{required:[],conditional:[],optional:[]});
  assert.deepEqual(manifest.skills.find(skill=>skill.name==='research').capabilities,{optional:[{name:'external-research',when:'externally verifiable facts require external access',fallback:'Leave unsupported claims explicitly unresolved.'}]});
  assert.deepEqual(manifest.artifacts.RESEARCH_REPORT,{
    contract: 'contracts/artifacts.md',
    template: 'templates/artifacts/research-report.md',
    schema: 'defined',
  });
  assert.deepEqual(manifest.skills.find(skill=>skill.name==='tdd').dependencies,{required:[],conditional:[],optional:[]});
  assert.deepEqual(manifest.skills.find(skill=>skill.name==='edge-case-analysis').dependencies,{required:[],conditional:[],optional:[]});
  assert.deepEqual(manifest.artifacts.EDGE_CASE_REPORT,{
    contract: 'contracts/artifacts.md',
    template: 'templates/artifacts/edge-case-report.md',
    schema: 'defined',
  });
  assert.deepEqual(manifest.skills.find(skill=>skill.name==='code-review').dependencies,{required:[],conditional:[],optional:[]});
  assert.deepEqual(manifest.artifacts.REVIEW_REPORT,{
    contract: 'contracts/artifacts.md',
    template: 'templates/artifacts/review-report.md',
    schema: 'defined',
  });
  assert.deepEqual(manifest.skills.find(skill=>skill.name==='implement').dependencies,{required:[],conditional:[],optional:['tdd','edge-case-analysis','code-review','context-engineering']});
  assert.deepEqual(manifest.artifacts.IMPLEMENTATION_REPORT,{
    contract: 'contracts/artifacts.md',
    template: 'templates/artifacts/implementation-report.md',
    schema: 'defined',
  });
  assert.deepEqual(manifest.artifacts.TEST_EVIDENCE,{
    contract: 'contracts/artifacts.md',
    template: 'templates/artifacts/test-evidence.md',
    schema: 'defined',
  });
  assert.deepEqual(manifest.artifacts.CHANGE_SET,{
    contract: 'contracts/artifacts.md',
    schema: 'named-only',
  });
  const artifacts = await readFile(join(source,'contracts/artifacts.md'),'utf8');
  assert.match(artifacts, /\*\*Producer:\*\* `implement` or `refactor`/);
  assert.match(artifacts, /\*\*Producer:\*\* `tdd`, `implement` or `refactor`/);
  const implementationTemplate = await readFile(join(source,'templates/artifacts/implementation-report.md'),'utf8');
  assert.match(implementationTemplate, /^created_by: implement$/m);
  const evidenceTemplate = await readFile(join(source,'templates/artifacts/test-evidence.md'),'utf8');
  assert.match(evidenceTemplate, /^created_by: tdd$/m);
  assert.deepEqual(manifest.skills.find(skill=>skill.name==='architecture-design').dependencies,{required:[],conditional:[{skill:'research',when:'external facts affect decisions'},{skill:'domain-modelling',when:'business invariants affect design'}],optional:[]});
  assert.deepEqual(manifest.artifacts.ARCHITECTURE_DESIGN,{
    contract: 'contracts/artifacts.md',
    template: 'templates/artifacts/architecture-design.md',
    schema: 'defined',
  });
  assert.deepEqual(manifest.artifacts.ADR,{
    contract: 'contracts/artifacts.md',
    template: 'templates/artifacts/adr.md',
    schema: 'defined',
  });
  assert.deepEqual(manifest.skills.find(skill=>skill.name==='domain-modelling').dependencies,{required:[],conditional:[],optional:[]});
  assert.deepEqual(manifest.artifacts.DOMAIN_MODEL,{
    contract: 'contracts/artifacts.md',
    template: 'templates/artifacts/domain-model.md',
    schema: 'defined',
  });
  assert.deepEqual(manifest.skills.find(skill=>skill.name==='to-tickets').dependencies,{required:[],conditional:[],optional:[]});
  assert.deepEqual(manifest.artifacts.TICKET_SET,{
    contract: 'contracts/artifacts.md',
    template: 'templates/artifacts/ticket-set.md',
    schema: 'defined',
  });
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
test('validate rejects two skills with the same stored description',()=>fixture(async root=>{
  const description = 'Use when alpha.';
  await setDescription(root,'workflow',description);
  await setDescription(root,'clarify',description);
  const result = await validate(root);
  assert.equal(result.ok,false);
  assert.deepEqual(result.errors,['workflow: identical manifest description clarify']);
  await cp(join(source,'scripts'),join(root,'scripts'),{recursive:true});
  const cli = spawnSync(process.execPath,[join(root,'scripts/validate-skills.mjs')],{encoding:'utf8'});
  assert.equal(cli.status,1);
  assert.match(cli.stderr,/^- workflow: identical manifest description clarify$/m);
}));
test('validate rejects every pair of identical stored descriptions',()=>fixture(async root=>{
  const description = 'Use when alpha.';
  await setDescription(root,'workflow',description);
  await setDescription(root,'clarify',description);
  await setDescription(root,'context-engineering',description);
  const result = await validate(root);
  assert.deepEqual(result.errors,[
    'workflow: identical manifest description clarify',
    'workflow: identical manifest description context-engineering',
    'clarify: identical manifest description context-engineering',
  ]);
}));
test('validate keeps case, trailing space and unicode form distinct',()=>fixture(async root=>{
  const nfc = 'Use when café.';
  const nfd = 'Use when cafe\u0301.';
  assert.notEqual(nfc,nfd);
  assert.equal(nfc.normalize('NFC'),nfd.normalize('NFC'));
  await setDescription(root,'workflow','Use when alpha.');
  await setDescription(root,'clarify','Use when Alpha.');
  let result = await validate(root);
  assert.equal(result.ok,true,result.errors.join('\n'));
  await setDescription(root,'clarify','Use when alpha. ');
  result = await validate(root);
  assert.equal(result.ok,true,result.errors.join('\n'));
  await setDescription(root,'workflow',nfc);
  await setDescription(root,'clarify',nfd);
  result = await validate(root);
  assert.equal(result.ok,true,result.errors.join('\n'));
}));
test('validate rejects two skills with the same stored name',()=>fixture(async root=>{
  await setName(root,'clarify','workflow');
  const result = await validate(root);
  assert.equal(result.ok,false);
  assert.ok(result.errors.includes('workflow: duplicate manifest name workflow'));
  assert.ok(result.errors.includes('Invalid canonical catalogue'));
  await cp(join(source,'scripts'),join(root,'scripts'),{recursive:true});
  const cli = spawnSync(process.execPath,[join(root,'scripts/validate-skills.mjs')],{encoding:'utf8'});
  assert.equal(cli.status,1);
  assert.match(cli.stderr,/^- workflow: duplicate manifest name workflow$/m);
  assert.match(cli.stderr,/^- Invalid canonical catalogue$/m);
}));
test('validate rejects every pair of identical stored names',()=>fixture(async root=>{
  await setName(root,'clarify','workflow');
  await setName(root,'context-engineering','workflow');
  const result = await validate(root);
  assert.ok(result.errors.includes('Invalid canonical catalogue'));
  assert.deepEqual(result.errors.filter(error=>error.includes('duplicate manifest name')),[
    'workflow: duplicate manifest name workflow',
    'workflow: duplicate manifest name workflow',
    'workflow: duplicate manifest name workflow',
  ]);
}));
test('validate keeps case, trailing space and unicode form distinct for names',()=>fixture(async root=>{
  const nfc = 'café';
  const nfd = 'cafe\u0301';
  assert.notEqual(nfc,nfd);
  assert.equal(nfc.normalize('NFC'),nfd.normalize('NFC'));
  await setName(root,'clarify','Workflow');
  let result = await validate(root);
  assert.equal(result.errors.some(error=>error.includes('duplicate manifest name')),false);
  assert.ok(result.errors.includes('Invalid name Workflow'));
  await setName(root,'Workflow','workflow ');
  result = await validate(root);
  assert.equal(result.errors.some(error=>error.includes('duplicate manifest name')),false);
  assert.ok(result.errors.includes('Invalid name workflow '));
  await setName(root,'workflow',nfc);
  await setName(root,'workflow ',nfd);
  result = await validate(root);
  assert.equal(result.errors.some(error=>error.includes('duplicate manifest name')),false);
}));
test('validate compares name spaces without trimming',()=>fixture(async root=>{
  await changeManifest(root,manifest=>{
    manifest.skills.find(skill=>skill.name==='workflow').name = 'workflow ';
    manifest.skills.find(skill=>skill.name==='clarify').name = 'workflow ';
  });
  const result = await validate(root);
  assert.equal(result.ok,false);
  assert.ok(result.errors.includes('workflow : duplicate manifest name workflow '));
  assert.ok(result.errors.includes('Invalid name workflow '));
  assert.ok(result.errors.includes('Invalid canonical catalogue'));
}));
test('validate keeps distinct names when descriptions match',()=>fixture(async root=>{
  const description = 'Use when alpha.';
  await setDescription(root,'workflow',description);
  await setDescription(root,'clarify',description);
  const result = await validate(root);
  assert.ok(result.errors.includes('workflow: identical manifest description clarify'));
  assert.equal(result.errors.some(error=>error.includes('duplicate manifest name')),false);
}));
test('validate rejects two targets with the same stored name',()=>fixture(async root=>{
  await changeManifest(root,manifest=>{ manifest.targets[2] = manifest.targets[1]; });
  const result = await validate(root);
  assert.equal(result.ok,false);
  assert.ok(result.errors.includes('cursor: duplicate target name cursor'));
  assert.ok(result.errors.includes('Invalid targets'));
  assert.ok(result.errors.includes('Duplicate targets'));
  assert.equal(result.errors.some(error=>error.includes('duplicate manifest name')),false);
  await cp(join(source,'scripts'),join(root,'scripts'),{recursive:true});
  const cli = spawnSync(process.execPath,[join(root,'scripts/validate-skills.mjs')],{encoding:'utf8'});
  assert.equal(cli.status,1);
  assert.match(cli.stderr,/^- cursor: duplicate target name cursor$/m);
  assert.match(cli.stderr,/^- Invalid targets$/m);
  assert.match(cli.stderr,/^- Duplicate targets$/m);
}));
test('validate rejects distinct target name pairs in index order',()=>fixture(async root=>{
  await changeManifest(root,manifest=>{
    manifest.targets[2] = manifest.targets[0];
    manifest.targets[3] = manifest.targets[1];
  });
  const result = await validate(root);
  assert.ok(result.errors.includes('Invalid targets'));
  assert.ok(result.errors.includes('Duplicate targets'));
  assert.deepEqual(result.errors.filter(error=>error.includes('duplicate target name')),[
    'claude-code: duplicate target name claude-code',
    'cursor: duplicate target name cursor',
  ]);
}));
test('validate rejects every pair of three identical target names',()=>fixture(async root=>{
  await changeManifest(root,manifest=>{
    manifest.targets[0] = manifest.targets[1];
    manifest.targets[2] = manifest.targets[1];
  });
  const result = await validate(root);
  assert.ok(result.errors.includes('Invalid targets'));
  assert.ok(result.errors.includes('Duplicate targets'));
  assert.deepEqual(result.errors.filter(error=>error.includes('duplicate target name')),[
    'cursor: duplicate target name cursor',
    'cursor: duplicate target name cursor',
    'cursor: duplicate target name cursor',
  ]);
}));
test('validate names a repeated target when four unique names remain',()=>fixture(async root=>{
  await changeManifest(root,manifest=>{ manifest.targets.push({...manifest.targets[0]}); });
  const result = await validate(root);
  assert.ok(result.errors.includes('claude-code: duplicate target name claude-code'));
  assert.ok(result.errors.includes('Invalid targets'));
  assert.equal(result.errors.includes('Duplicate targets'),false);
}));
test('validate keeps Duplicate targets when a target is absent and names do not repeat',()=>fixture(async root=>{
  await changeManifest(root,manifest=>{ manifest.targets = manifest.targets.filter(target=>target.name!=='claude-code'); });
  const result = await validate(root);
  assert.ok(result.errors.includes('Invalid targets'));
  assert.ok(result.errors.includes('Duplicate targets'));
  assert.equal(result.errors.some(error=>error.includes('duplicate target name')),false);
}));
test('validate keeps case, trailing space and unicode form distinct for target names',()=>fixture(async root=>{
  const nfc = 'café';
  const nfd = 'cafe\u0301';
  assert.notEqual(nfc,nfd);
  assert.equal(nfc.normalize('NFC'),nfd.normalize('NFC'));
  await changeManifest(root,manifest=>{ manifest.targets[1].name = 'Cursor'; });
  let result = await validate(root);
  assert.equal(result.errors.some(error=>error.includes('duplicate target name')),false);
  await changeManifest(root,manifest=>{
    manifest.targets[1].name = 'cursor';
    manifest.targets[2].name = 'cursor ';
  });
  result = await validate(root);
  assert.equal(result.errors.some(error=>error.includes('duplicate target name')),false);
  await changeManifest(root,manifest=>{
    manifest.targets[0].name = nfc;
    manifest.targets[1].name = nfd;
  });
  result = await validate(root);
  assert.equal(result.errors.some(error=>error.includes('duplicate target name')),false);
}));
test('validate compares target name spaces without trimming',()=>fixture(async root=>{
  await changeManifest(root,manifest=>{
    manifest.targets[1].name = 'cursor ';
    manifest.targets[2].name = 'cursor ';
  });
  const result = await validate(root);
  assert.equal(result.ok,false);
  assert.ok(result.errors.includes('cursor : duplicate target name cursor '));
}));
test('validate keeps a duplicate skill name out of the target diagnostic',()=>fixture(async root=>{
  await setName(root,'clarify','workflow');
  const result = await validate(root);
  assert.ok(result.errors.includes('workflow: duplicate manifest name workflow'));
  assert.ok(result.errors.includes('Invalid canonical catalogue'));
  assert.equal(result.errors.some(error=>error.includes('duplicate target name')),false);
}));
test('validate keeps matching descriptions out of the target diagnostic',()=>fixture(async root=>{
  const description = 'Use when alpha.';
  await setDescription(root,'workflow',description);
  await setDescription(root,'clarify',description);
  const result = await validate(root);
  assert.ok(result.errors.includes('workflow: identical manifest description clarify'));
  assert.equal(result.errors.some(error=>error.includes('duplicate target name')),false);
}));
test('validate compares description spaces without trimming',()=>fixture(async root=>{
  await setDescription(root,'workflow',' ');
  await setDescription(root,'clarify',' ');
  const same = await validate(root);
  assert.equal(same.ok,false);
  assert.ok(same.errors.includes('workflow: identical manifest description clarify'));
  await setDescription(root,'clarify','  ');
  const different = await validate(root);
  assert.equal(different.errors.includes('workflow: identical manifest description clarify'),false);
}));
test('CLI exposes distribution commands while rejecting unsupported commands',()=>{
  const cli = join(source,'bin/ai-dev-skills.mjs');
  const names = JSON.parse(readFileSync(join(source,'manifest/skills.json'),'utf8')).skills.map(skill=>skill.name);
  for (const command of ['--help','help','-h']) {
    const result = spawnSync(process.execPath,[cli,command],{encoding:'utf8'});
    assert.equal(result.status,0,result.stderr);
    assert.match(result.stdout,/ai-dev-skills list/);
    assert.match(result.stdout,/ai-dev-skills doctor/);
    assert.match(result.stdout,/ai-dev-skills install --target/);
    assert.match(result.stdout,/ai-dev-skills package --target/);
  }
  const listed = spawnSync(process.execPath,[cli,'list'],{encoding:'utf8'});
  assert.equal(listed.status,0,listed.stderr);
  assert.equal(listed.stdout,`${names.join('\n')}\n`);
  const rejected = spawnSync(process.execPath,[cli,'list','--target','cursor'],{encoding:'utf8'});
  assert.equal(rejected.status,1,rejected.stdout);
  assert.match(rejected.stderr,/ERROR:/);
  for (const command of ['bootstrap','sync']) {
    const result = spawnSync(process.execPath,[cli,command],{encoding:'utf8'});
    assert.equal(result.status,1,`${command}: ${result.stdout}${result.stderr}`);
    assert.match(result.stderr,/ERROR:/);
  }
});
test('doctor reports node and git without calling validate', async () => {
  const cli = join(source,'bin/ai-dev-skills.mjs');
  const root = await mkdtemp(join(tmpdir(),'doctor-'));
  try {
    const git = join(root,'git');
    const empty = join(root,'empty');
    await writeFile(git,'');
    await chmod(git,0o755);
    await mkdir(empty);
    const passed = spawnSync(process.execPath,[cli,'doctor'],{encoding:'utf8',env:{...process.env,PATH:root}});
    assert.equal(passed.status,0,passed.stderr);
    assert.equal(passed.stderr,'');
    assert.equal(passed.stdout,`node pass ${process.versions.node}\ngit pass\n`);
    assert.deepEqual((await readdir(root)).sort(),['empty','git']);
    const missing = spawnSync(process.execPath,[cli,'doctor'],{encoding:'utf8',env:{...process.env,PATH:empty}});
    assert.equal(missing.status,1,missing.stderr);
    assert.equal(missing.stderr,'');
    assert.equal(missing.stdout,`node pass ${process.versions.node}\ngit fail\n`);
    await chmod(git,0o644);
    const plain = spawnSync(process.execPath,[cli,'doctor'],{encoding:'utf8',env:{...process.env,PATH:root}});
    assert.equal(plain.status,1,plain.stderr);
    assert.equal(plain.stderr,'');
    assert.equal(plain.stdout,`node pass ${process.versions.node}\ngit fail\n`);
    const rejected = spawnSync(process.execPath,[cli,'doctor','--target','cursor'],{encoding:'utf8'});
    assert.equal(rejected.status,1);
    assert.match(rejected.stderr,/ERROR:/);
    assert.doesNotMatch(rejected.stdout,/node (?:pass|fail)/);
    const body = readFileSync(cli,'utf8');
    const start = body.indexOf("if (command === 'doctor')");
    const end = body.indexOf('throw new Error(`Unsupported command:');
    assert.equal(start >= 0, true, 'doctor branch marker missing');
    assert.equal(end > start, true, 'unsupported-command marker missing or before doctor');
    const branch = body.slice(start, end);
    assert.equal(branch.length > 0, true, 'doctor branch slice is empty');
    assert.equal(branch.includes('gitLine'), true, 'doctor branch slice missed gitLine');
    assert.equal(branch.includes('validateTarget'), false);
    assert.equal(branch.includes('validate('), false);
    assert.equal(branch.includes('child_process'), false);
    assert.equal(branch.includes('fetch('), false);
    assert.equal(branch.includes('node:net'), false);
    assert.equal(branch.includes('node:http'), false);
    const {nodeLine,gitLine} = await import('../bin/ai-dev-skills.mjs');
    assert.equal(nodeLine('21.9.9'),'node fail 21.9.9');
    assert.equal(nodeLine('22.0.0'),'node pass 22.0.0');
    assert.equal(nodeLine('23.1.0'),'node pass 23.1.0');
    assert.equal(await gitLine(root,async () => { throw new Error('boom'); }),'git fail');
    assert.equal(`${nodeLine('21.9.9')}\n${await gitLine(empty)}`,'node fail 21.9.9\ngit fail');
    await chmod(git,0o755);
    assert.equal(`${nodeLine('21.9.9')}\n${await gitLine(root)}`,'node fail 21.9.9\ngit pass');
    const blocker = join(root,'not-dir');
    await writeFile(blocker,'');
    const observed = await stat(join(blocker,'git')).then(() => null, error => error);
    assert.equal(observed instanceof Error && observed.code !== 'ENOENT', true, 'git observation did not throw a non-ENOENT error');
    const thrown = spawnSync(process.execPath,[cli,'doctor'],{encoding:'utf8',env:{...process.env,PATH:blocker}});
    assert.equal(thrown.status,1,thrown.stderr);
    assert.equal(thrown.stderr,'');
    assert.equal(thrown.stdout,`node pass ${process.versions.node}\ngit fail\n`);
  } finally {
    await rm(root,{recursive:true,force:true});
  }
});
test('doctor fails git for an empty, omitted, or delimiter-only PATH', async () => {
  const cli = join(source,'bin/ai-dev-skills.mjs');
  const expected = `node pass ${process.versions.node}\ngit fail\n`;
  const omitted = {...process.env};
  delete omitted.PATH;
  for (const env of [{...process.env,PATH:''}, omitted, {...process.env,PATH:delimiter}]) {
    const result = spawnSync(process.execPath,[cli,'doctor'],{encoding:'utf8',env});
    assert.equal(result.status,1,result.stderr);
    assert.equal(result.stderr,'');
    assert.equal(result.stdout,expected);
  }
});
test('doctor passes git found only in a later PATH segment', async () => {
  const cli = join(source,'bin/ai-dev-skills.mjs');
  const root = await mkdtemp(join(tmpdir(),'doctor-later-'));
  try {
    const first = join(root,'first');
    const second = join(root,'second');
    await mkdir(first);
    await mkdir(second);
    const git = join(second,'git');
    await writeFile(git,'');
    await chmod(git,0o755);
    const result = spawnSync(process.execPath,[cli,'doctor'],{encoding:'utf8',env:{...process.env,PATH:[first,second].join(delimiter)}});
    assert.equal(result.status,0,result.stderr);
    assert.equal(result.stderr,'');
    assert.equal(result.stdout,`node pass ${process.versions.node}\ngit pass\n`);
  } finally {
    await rm(root,{recursive:true,force:true});
  }
});
test('doctor fails when the resolved git name is a directory', async () => {
  const cli = join(source,'bin/ai-dev-skills.mjs');
  const root = await mkdtemp(join(tmpdir(),'doctor-dir-'));
  try {
    await mkdir(join(root,'git'),{recursive:true});
    const result = spawnSync(process.execPath,[cli,'doctor'],{encoding:'utf8',env:{...process.env,PATH:root}});
    assert.equal(result.status,1,result.stderr);
    assert.equal(result.stderr,'');
    assert.equal(result.stdout,`node pass ${process.versions.node}\ngit fail\n`);
  } finally {
    await rm(root,{recursive:true,force:true});
  }
});
test('doctor fails when PATH contains only an executable git.exe', async () => {
  const cli = join(source,'bin/ai-dev-skills.mjs');
  const root = await mkdtemp(join(tmpdir(),'doctor-exe-'));
  try {
    const git = join(root,'git.exe');
    await writeFile(git,'');
    await chmod(git,0o755);
    const result = spawnSync(process.execPath,[cli,'doctor'],{encoding:'utf8',env:{...process.env,PATH:root}});
    assert.equal(result.status,1,result.stderr);
    assert.equal(result.stderr,'');
    assert.equal(result.stdout,`node pass ${process.versions.node}\ngit fail\n`);
  } finally {
    await rm(root,{recursive:true,force:true});
  }
});
test('doctor rejects a positional argument and an option without a value', () => {
  const cli = join(source,'bin/ai-dev-skills.mjs');
  for (const args of [['doctor','extra'],['doctor','--target']]) {
    const result = spawnSync(process.execPath,[cli,...args],{encoding:'utf8'});
    assert.equal(result.status,1,result.stderr);
    assert.match(result.stderr,/ERROR:/);
    assert.doesNotMatch(result.stdout,/node (?:pass|fail)/);
  }
});
test('doctor does not change the working directory or the PATH directory', async () => {
  const cli = join(source,'bin/ai-dev-skills.mjs');
  const root = await mkdtemp(join(tmpdir(),'doctor-files-'));
  try {
    const listed = async dir => {
      const rows = [];
      for (const name of (await readdir(dir)).sort()) {
        const info = await stat(join(dir,name));
        rows.push([name,info.size,info.mode]);
      }
      return rows;
    };
    const gitDir = join(root,'git-dir');
    const empty = join(root,'empty');
    const blocker = join(root,'not-dir');
    await mkdir(gitDir);
    await mkdir(empty);
    await writeFile(join(gitDir,'git'),'');
    await chmod(join(gitDir,'git'),0o755);
    await writeFile(blocker,'');
    const cases = [
      [gitDir,0,`node pass ${process.versions.node}\ngit pass\n`],
      [empty,1,`node pass ${process.versions.node}\ngit fail\n`],
      [blocker,1,`node pass ${process.versions.node}\ngit fail\n`],
    ];
    for (const [pathEnv,status,stdout] of cases) {
      const cwdBefore = (await readdir(process.cwd())).sort();
      const pathBefore = pathEnv === blocker ? await listed(root) : await listed(pathEnv);
      const result = spawnSync(process.execPath,[cli,'doctor'],{encoding:'utf8',env:{...process.env,PATH:pathEnv}});
      assert.equal(result.status,status,result.stderr);
      assert.equal(result.stderr,'');
      assert.equal(result.stdout,stdout);
      assert.deepEqual((await readdir(process.cwd())).sort(),cwdBefore);
      assert.deepEqual(pathEnv === blocker ? await listed(root) : await listed(pathEnv),pathBefore);
    }
  } finally {
    await rm(root,{recursive:true,force:true});
  }
});
test('current mixed catalogue satisfies the complete baseline checks',async()=>{
  const result = await validate(source);
  assert.equal(result.ok,true,result.errors.join('\n'));
  assert.equal(result.skills,18);
  const cli = spawnSync(process.execPath,[join(source,'scripts/validate-skills.mjs')],{encoding:'utf8'});
  assert.equal(cli.status,0,cli.stderr);
});

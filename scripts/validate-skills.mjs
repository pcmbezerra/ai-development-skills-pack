import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, relative, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const rootDirectory = fileURLToPath(new URL('../', import.meta.url));
const catalogue = { core: ['setup-ai-development-skills','workflow','clarify','context-engineering','handoff'], discovery: ['research','to-spec','domain-modelling','architecture-design','to-tickets'], development: ['diagnose','implement','tdd','refactor'], quality: ['edge-case-analysis','code-review'], documentation: ['docs'], modernization: ['modernize'] };
const namedOnlyArtifacts = new Set(['PROJECT_CONTEXT','WORKFLOW_PLAN','CHANGE_SET','BOOTSTRAP_READINESS']);
const routingCitation = /routing\.md|\bR(?:1[0-7]|[1-9])\b/;
const packReadPath = /contracts\/|manifest\/skills\.json|templates\/artifacts\//;

export function normalizeNewlines(text) {
  return text.replace(/\r\n/g, '\n');
}
export function projectContract(text) {
  return text.replaceAll('](../failure.md)', '](failure.md)').replaceAll('](../quality-gates.md)', '](quality-gates.md)').replaceAll('](../artifacts.md)', '](artifacts.md)');
}
export function projectArtifacts(text) {
  // The canonical file links ../manifest/skills.json. From references/ that path is not a file inside the skill directory, and the manifest stays out of the projection.
  return text.replaceAll('](../manifest/skills.json)', '](#machine-readable-catalogue-and-named-outputs)');
}
export function projectCatalogue(skills) {
  return `${JSON.stringify({ skills: skills.map(skill => ({
    name: skill.name,
    status: skill.status,
    primaryInvocation: skill.primaryInvocation,
    dependencies: {
      required: [...skill.dependencies.required],
      conditional: skill.dependencies.conditional.map(item => ({ skill: item.skill, when: item.when })),
      optional: [...skill.dependencies.optional],
    },
  })) }, null, 2)}\n`;
}
export function projectionFiles(skill, contractText, skillText, artifacts) {
  const files = new Set(['SKILL.md', 'references/contract.md', 'references/failure.md']);
  const contract = contractText ?? '';
  if (contract.includes('](../quality-gates.md)') || contract.includes('](quality-gates.md)')) files.add('references/quality-gates.md');
  if (contract.includes('](../artifacts.md)') || contract.includes('](artifacts.md)') || skill.name === 'workflow') files.add('references/artifacts.md');
  if (routingCitation.test(`${contract}\n${skillText ?? ''}`)) files.add('references/routing.md');
  if (skill.name === 'workflow') files.add('references/catalogue.json');
  for (const id of skill.artifactOutputs ?? []) {
    const template = artifacts?.[id]?.template;
    if (!template || namedOnlyArtifacts.has(id) || id === 'TICKET') continue;
    files.add(`assets/${template.split('/').pop()}`);
  }
  return files;
}
export async function validate(root = rootDirectory) {
  root = resolve(root);
  const errors = [];
  const check = (ok, message) => { if (!ok) errors.push(message); };
  async function reference(path, from) {
    if (typeof path !== 'string' || !path) throw Error(`${from}: invalid reference`);
    const rel = relative(root, resolve(root, path));
    if (rel === '..' || rel.startsWith(`..${sep}`)) { errors.push(`${from}: reference escapes package`); return; }
    try { check((await stat(resolve(root,path))).isFile(), `${from}: not a file ${path}`); }
    catch { errors.push(`${from}: missing reference ${path}`); }
  }
  async function walk(dir) {
    const files = [];
    for (const e of await readdir(dir,{withFileTypes:true})) {
      const p = resolve(dir,e.name);
      if (e.isDirectory() && !['.git','node_modules'].includes(e.name)) files.push(...await walk(p));
      else if (e.isFile()) files.push(p);
    }
    return files;
  }
  try {
    const m = JSON.parse(await readFile(resolve(root,'manifest/skills.json'),'utf8'));
    const p = JSON.parse(await readFile(resolve(root,'package.json'),'utf8'));
    const dependencyFields = ['dependencies','devDependencies','optionalDependencies','peerDependencies'];
    check(dependencyFields.every(field=>!Object.keys(p[field] ?? {}).length), 'Package dependencies forbidden');
    const cliPath = 'bin/ai-dev-skills.mjs';
    check(Object.keys(p.bin ?? {}).length === 1 && p.bin['ai-dev-skills'] === cliPath, 'Invalid CLI entrypoint');
    await reference(cliPath,'package bin');
    check(m.schemaVersion === 1 && m.skillCount === 18, 'Invalid schema/count');
    check(m.architectureVersion === 1, 'Invalid architecture baseline version');
    check(p.scripts?.validate === 'node scripts/validate-skills.mjs' && p.scripts?.['skills:validate'] === p.scripts.validate, 'Missing validation script/alias');
    for (const key of ['baseline','routingContract','qualityGatesContract','failureContract']) await reference(m[key],key);
    const routing = await readFile(resolve(root,m.routingContract),'utf8');
    const rules = [...routing.matchAll(/^## R(\d+) — /gm)].map(x=>Number(x[1]));
    check(rules.length === 17 && rules.every((n,i)=>n===i+1), 'Routing must contain ordered R1–R17');
    const gates = await readFile(resolve(root,m.qualityGatesContract),'utf8');
    for (const gate of ['Specification','Architecture','Ticket','Implementation','Review','Documentation','Modernization']) check(gates.includes(`## ${gate} gate`), `Missing ${gate} gate`);
    const failure = await readFile(resolve(root,m.failureContract),'utf8');
    for (const field of ['Status: BLOCKED','Reason','Evidence','Missing prerequisite','Recommended next skill/action']) check(failure.includes(field), `Missing failure field ${field}`);
    const artifactNames = ['DECISION_SET','RESEARCH_REPORT','SPEC','DOMAIN_MODEL','ARCHITECTURE_DESIGN','ADR','TICKET_SET','TICKET','DIAGNOSIS_REPORT','TEST_EVIDENCE','IMPLEMENTATION_REPORT','EDGE_CASE_REPORT','REVIEW_REPORT','DOC_UPDATE','MODERNIZATION_PLAN','HANDOFF','PROJECT_CONTEXT','WORKFLOW_PLAN','CHANGE_SET','BOOTSTRAP_READINESS'];
    const artifacts = m.artifacts;
    check(artifacts && Object.keys(artifacts).length === artifactNames.length && artifactNames.every(n=>n in artifacts), 'Invalid artifact catalogue');
    for (const [name,a] of Object.entries(artifacts ?? {})) {
      await reference(a.contract, name);
      const namedOnly = ['PROJECT_CONTEXT','WORKFLOW_PLAN','CHANGE_SET','BOOTSTRAP_READINESS'].includes(name);
      check(a.schema === (namedOnly ? 'named-only' : 'defined'), `${name}: invalid schema classification`);
      if (namedOnly) {
        check(!a.template && !a.container, `${name}: named-only output must not invent a template/container`);
        continue;
      }
      if (name === 'TICKET') {
        check(a.container === 'TICKET_SET' && !a.template, 'TICKET must be contained in TICKET_SET');
        continue;
      }
      await reference(a.template,name);
      // Normalize only in memory so artifact parsing is independent of checkout line endings.
      const template = (await readFile(resolve(root,a.template),'utf8')).replace(/\r\n/g,'\n');
      const metadata = template.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
      check(!!metadata, `${name}: missing artifact frontmatter`);
      for (const field of ['artifact','id','version','status','created_by','inputs']) check(new RegExp(`^${field}: .+$`,'m').test(metadata ?? ''), `${name}: missing metadata ${field}`);
      check(metadata?.includes(`artifact: ${name.toLowerCase()}`), `${name}: artifact type mismatch`);
      check(/^status: draft$/m.test(metadata ?? '') && /^version: 1$/m.test(metadata ?? ''), `${name}: template must be draft v1`);
      const producer = metadata?.match(/^created_by: (.+)$/m)?.[1];
      check(m.skills.some(s=>s.name===producer && s.artifactOutputs?.includes(name)), `${name}: invalid template producer`);
      const contract = (await readFile(resolve(root,a.contract),'utf8')).replace(/\r\n/g,'\n');
      const start = name === 'ADR' ? contract.indexOf('ADR format:') : contract.indexOf(`\n${name}\n`);
      const remainder = contract.slice(start);
      const fields = name === 'ADR' ? remainder.match(/```text\n([\s\S]*?)\n```/)?.[1] : remainder.match(/(?:Required sections:|Each ticket SHALL contain:|Required information:|Each finding:)\s*```text\n([\s\S]*?)\n```/)?.[1];
      check(start >= 0 && !!fields, `${name}: missing canonical artifact fields`);
      for (const field of (fields ?? '').split('\n').filter(Boolean)) check(template.includes(`## ${field}\n`), `${name}: missing template section ${field}`);
    }
    const skills = m.skills, names = skills.map(s=>s.name), expected = Object.values(catalogue).flat();
    const skillStatuses = ['scaffold','implemented'];
    check(skills.length === 18 && new Set(names).size === 18 && expected.every(n=>names.includes(n)), 'Invalid canonical catalogue');
    for (let i = 0; i < skills.length; i++) {
      for (let j = i + 1; j < skills.length; j++) {
        check(skills[i].description !== skills[j].description, `${skills[i].name}: identical manifest description ${skills[j].name}`);
      }
    }
    for (const s of skills) {
      check(typeof s.name === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s.name) && s.name.length < 64, `Invalid name ${s.name}`);
      check(catalogue[s.category]?.includes(s.name), `${s.name}: invalid category`);
      check(s.path === `skills/${s.category}/${s.name}/SKILL.md`, `${s.name}: invalid path`);
      const model = ['context-engineering','domain-modelling','tdd','edge-case-analysis','code-review'].includes(s.name);
      check(s.primaryInvocation === (model ? 'model' : 'user'), `${s.name}: invalid invocation`);
      for (const f of ['description','goal']) check(typeof s[f] === 'string' && s[f].trim(), `${s.name}: missing ${f}`);
      check(s.description.length <= 240, `${s.name}: discovery description exceeds the 240-character pack budget`);
      check(/\bUse when\b/.test(s.description), `${s.name}: discovery description must state when to use the skill`);
      for (const f of ['inputs','outputs','references']) check(Array.isArray(s[f]) && s[f].length && s[f].every(v=>typeof v === 'string' && v.trim()), `${s.name}: invalid ${f}`);
      check(skillStatuses.includes(s.status), `${s.name}: invalid skill status ${s.status}`);
      for (const key of ['artifactInputs','artifactOutputs']) {
        check(Array.isArray(s[key]) && new Set(s[key]).size === s[key].length, `${s.name}: invalid ${key}`);
        for (const id of s[key] ?? []) check(artifactNames.includes(id), `${s.name}: unknown declared artifact ${id}`);
      }
      for (const input of s.inputs) {
        for (const id of input.match(/\b[A-Z][A-Z_]+\b/g) ?? []) check(artifactNames.includes(id) && s.artifactInputs.includes(id), `${s.name}: undeclared input artifact ${id}`);
      }
      for (const output of s.outputs) {
        const id = output.replace(/ optional$/, '');
        if (/^[A-Z][A-Z_]*$/.test(id)) check(artifactNames.includes(id) && s.artifactOutputs.includes(id), `${s.name}: undeclared output artifact ${id}`);
      }
      for (const path of [s.path,s.contract,...s.references]) await reference(path,s.name);
      const body = await readFile(resolve(root,s.path),'utf8');
      const contract = await readFile(resolve(root,s.contract),'utf8');
      const contractStatus = contract.match(/^Status: ([^.;\r\n]+)[.;]/m)?.[1];
      const sourceStatus = body.match(/^Status: ([^.;\r\n]+)[.;]/m)?.[1];
      check(skillStatuses.includes(contractStatus), `${s.name}: invalid contract status ${contractStatus}`);
      check(skillStatuses.includes(sourceStatus), `${s.name}: invalid source status ${sourceStatus}`);
      check(s.status === contractStatus && s.status === sourceStatus, `${s.name}: status mismatch (manifest ${s.status}, contract ${contractStatus}, source ${sourceStatus})`);
      if (s.status === 'implemented') {
        const workflow = text=>text.replace(/\r\n/g,'\n').match(/(?:^|\n)## Workflow\n+([\s\S]*?)(?=\n## |$)/)?.[1].trim();
        const contractWorkflow = workflow(contract), sourceWorkflow = workflow(body);
        check(!!contractWorkflow && !!sourceWorkflow, `${s.name}: implemented skill must define workflow in contract and source`);
        const unavailableWorkflow = /pending implementation|(?:implementation|workflow|operational execution|(?:operational )?capability)\s+(?:is |remains )?(?:pending|unavailable|unsupported|not (?:implemented|supported|available|operational|ready))|does not execute the workflow|operational steps are outside this scaffold|do not claim to have executed this skill from this skeleton/i;
        check(!/\b(?:todo|tbd)\b/i.test(`${contractWorkflow}\n${sourceWorkflow}`) && !unavailableWorkflow.test(`${contract}\n${body}`), `${s.name}: implemented skill declares pending or unavailable workflow`);
      }
      check(!/\.(?:cursor|codex|gemini|antigravity|claude)[/\\]/i.test(body), `${s.name}: hardcoded target installation path`);
      const fm = body.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
      check(!!fm, `${s.name}: missing frontmatter`);
      if (fm) {
        const fields = {};
        for (const line of fm[1].split(/\r?\n/)) {
          const match = line.match(/^(name|description): (.+)$/);
          if (!match) { errors.push(`${s.name}: unsupported frontmatter line`); continue; }
          check(!(match[1] in fields), `${s.name}: duplicate frontmatter field`);
          fields[match[1]] = match[2].startsWith('"') ? JSON.parse(match[2]) : match[2];
        }
        check(fields.name === s.name && fields.description === s.description, `${s.name}: frontmatter mismatch`);
      }
      const d = s.dependencies;
      if (!d || !['required','conditional','optional'].every(k=>Array.isArray(d[k]))) throw Error(`${s.name}: invalid dependencies`);
      const deps = [...d.required,...d.optional,...d.conditional.map(x=>x.skill)];
      check(new Set(deps).size === deps.length, `${s.name}: duplicate dependency`);
      for (const n of deps) check(names.includes(n) && n !== s.name, `${s.name}: unknown/self dependency ${n}`);
      for (const x of d.conditional) check(typeof x.when === 'string' && x.when.trim(), `${s.name}: missing dependency condition`);
      const skillDir = resolve(root, dirname(s.path));
      const expectedFiles = projectionFiles(s, contract, body, artifacts);
      const actualFiles = (await walk(skillDir)).map(file => relative(skillDir, file).split(sep).join('/'));
      for (const file of expectedFiles) check(actualFiles.includes(file), `${s.name}: missing projection ${file}`);
      for (const file of actualFiles) check(expectedFiles.has(file), `${s.name}: unexpected projection file ${file}`);
      async function matchesProjection(file, expected, message) {
        try { check(normalizeNewlines(await readFile(resolve(skillDir, file), 'utf8')) === normalizeNewlines(expected), message); }
        catch (error) { if (error.code !== 'ENOENT') throw error; }
      }
      await matchesProjection('references/contract.md', projectContract(contract), `${s.name}: contract projection drifted`);
      await matchesProjection('references/failure.md', failure, `${s.name}: failure projection drifted`);
      if (expectedFiles.has('references/quality-gates.md')) await matchesProjection('references/quality-gates.md', gates, `${s.name}: quality-gates projection drifted`);
      if (expectedFiles.has('references/artifacts.md')) await matchesProjection('references/artifacts.md', projectArtifacts(await readFile(resolve(root, 'contracts/artifacts.md'), 'utf8')), `${s.name}: artifacts projection drifted`);
      if (expectedFiles.has('references/routing.md')) await matchesProjection('references/routing.md', routing, `${s.name}: routing projection drifted`);
      if (expectedFiles.has('references/catalogue.json')) await matchesProjection('references/catalogue.json', projectCatalogue(skills), `${s.name}: catalogue projection drifted`);
      for (const id of s.artifactOutputs ?? []) {
        const template = artifacts?.[id]?.template;
        if (!template || !expectedFiles.has(`assets/${template.split('/').pop()}`)) continue;
        await matchesProjection(`assets/${template.split('/').pop()}`, await readFile(resolve(root, template), 'utf8'), `${s.name}: template projection drifted ${template.split('/').pop()}`);
      }
      check(!packReadPath.test(body), `${s.name}: external pack read path`);
      for (const file of actualFiles.filter(item => item.endsWith('.md'))) {
        const text = await readFile(resolve(skillDir, file), 'utf8');
        if (file !== 'SKILL.md') check(!packReadPath.test(text), `${s.name}: external pack read path in ${file}`);
        for (const match of text.matchAll(/\[[^\]\n]*\]\(([^)\s]+)\)/g)) {
          const link = match[1];
          if (/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(link)) continue;
          let target;
          try { target = resolve(dirname(resolve(skillDir, file)), decodeURIComponent(link.split('#')[0])); }
          catch { errors.push(`${s.name}: link escapes skill directory ${link}`); continue; }
          const rel = relative(skillDir, target);
          if (!rel || rel === '..' || rel.startsWith(`..${sep}`)) { errors.push(`${s.name}: link escapes skill directory ${link}`); continue; }
          try { check((await stat(target)).isFile(), `${s.name}: link does not resolve inside the skill directory ${link}`); }
          catch { errors.push(`${s.name}: link does not resolve inside the skill directory ${link}`); }
        }
      }
    }
    for (const conditional of [false,true]) {
      const active = new Set(), done = new Set();
      function visit(n,chain=[]) {
        if (active.has(n)) { errors.push(`Mandatory${conditional?'/conditional':''} cycle: ${[...chain,n].join(' -> ')}`); return; }
        if (done.has(n)) return;
        active.add(n);
        const d = skills.find(s=>s.name===n)?.dependencies;
        for (const next of [...(d?.required??[]),...(conditional?(d?.conditional??[]).map(x=>x.skill):[])]) visit(next,[...chain,n]);
        active.delete(n); done.add(n);
      }
      names.forEach(n=>visit(n));
    }
    const targetPaths = { cursor: '.cursor/skills', codex: '.agents/skills', antigravity: '.agents/skills', 'claude-code': '.claude/skills' };
    check(m.targets.length === 4 && Object.keys(targetPaths).every(n=>m.targets.some(t=>t.name===n)), 'Invalid targets');
    check(new Set(m.targets.map(t=>t.name)).size === 4, 'Duplicate targets');
    for (const t of m.targets) {
      check(t.path === `targets/${t.name}.mjs`, `${t.name}: invalid target path`);
      await reference(t.path,t.name);
      const body = await readFile(resolve(root,t.path),'utf8');
      // Parse declarative JSON only; never execute descriptor code during validation.
      const match = body.replace(/^\/\/[^\n]*\n/gm,'').trim().match(/^export default Object\.freeze\((\{[\s\S]*?\})\);$/);
      check(!!match, `${t.name}: target must remain a declarative descriptor`);
      if (match) {
        const descriptor = JSON.parse(match[1]);
        check(descriptor.name === t.name && descriptor.tier === 1 && descriptor.status === 'implemented' && descriptor.source === 'manifest/skills.json' && descriptor.installationImplemented === true, `${t.name}: incompatible target descriptor`);
        check(descriptor.projectSkillsPath === targetPaths[t.name], `${t.name}: invalid project skills path`);
        check(Object.keys(descriptor).every(k=>['name','displayName','tier','status','source','installationImplemented','projectSkillsPath'].includes(k)), `${t.name}: unsupported target capability`);
      }
    }
    const files = await walk(root);
    const physical = files.filter(f=>f.startsWith(resolve(root,'skills')+sep) && f.endsWith(`${sep}SKILL.md`)).map(f=>relative(root,f).split(sep).join('/'));
    check(physical.length === 18 && physical.every(f=>skills.some(s=>s.path===f)), 'Physical catalogue differs from manifest');
    for (const f of files.filter(f=>f.endsWith('.md'))) {
      const body = await readFile(f,'utf8');
      for (const match of body.matchAll(/\[[^\]\n]*\]\(([^)\s]+)\)/g)) {
        const link = match[1];
        if (/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(link)) continue;
        await reference(relative(root,resolve(dirname(f),decodeURIComponent(link.split('#')[0]))),relative(root,f));
      }
    }
    return {ok:!errors.length,skills:skills.length,errors};
  } catch (e) { errors.push(e.message); return {ok:false,errors}; }
}
export function report(r) {
  if (r.ok) console.log(`PASS: ${r.skills} skills; catalogue, lifecycle status, frontmatter, artifacts/templates, R1–R17, gates, failure contract, dependencies, references, mandatory/conditional cycles and target descriptors validated.`);
  else console.error(`FAIL:\n${r.errors.map(e=>`- ${e}`).join('\n')}`);
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const r = await validate(); report(r); process.exitCode = r.ok ? 0 : 1;
}

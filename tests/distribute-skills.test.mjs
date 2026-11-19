import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { installTarget, packageTargets, readTarget, targetNames, validateTarget } from '../scripts/distribute-skills.mjs';

const source = fileURLToPath(new URL('../', import.meta.url));

async function temporary(run) {
  const root = await mkdtemp(join(tmpdir(), 'skills-distribution-'));
  try {
    await run(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

test('packages and validates all target-specific layouts', () => temporary(async output => {
  const names = await targetNames(source);
  const results = await packageTargets({ target: 'all', output, root: source });
  assert.deepEqual(results.map(result => result.target), names);
  for (const name of names) {
    const result = await validateTarget({ target: name, path: join(output, name), root: source });
    assert.equal(result.ok, true, result.errors.join('\n'));
    assert.equal(result.skills, 18);
  }
}));

test('installation is idempotent and refuses divergent collisions before copying', () => temporary(async destination => {
  const first = await installTarget({ target: 'codex', destination, root: source });
  assert.equal(first.actions.filter(action => action.status === 'installed').length, 18);
  const second = await installTarget({ target: 'codex', destination, root: source });
  assert.equal(second.actions.filter(action => action.status === 'unchanged').length, 18);

  const skillsRoot = join(destination, '.agents', 'skills');
  const divergent = join(skillsRoot, 'setup-ai-development-skills', 'SKILL.md');
  await writeFile(divergent, `${await readFile(divergent, 'utf8')}\nlocal change\n`);
  await rm(join(skillsRoot, 'workflow'), { recursive: true, force: true });

  await assert.rejects(
    installTarget({ target: 'codex', destination, root: source }),
    /refusing to overwrite divergent skill setup-ai-development-skills/,
  );
  const validation = await validateTarget({ target: 'codex', path: destination, root: source });
  assert.deepEqual(validation.errors, [
    'setup-ai-development-skills: differs from canonical source',
    'workflow: missing',
  ]);
}));

async function filesUnder(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesUnder(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}

test('four targets install without the origin repository and resolve local links', () => temporary(async destination => {
  await assert.rejects(stat(join(destination, 'contracts')));
  await assert.rejects(stat(join(destination, 'manifest', 'skills.json')));
  const names = await targetNames(source);
  assert.deepEqual(names.length, 4);
  for (const name of names) {
    const installed = await installTarget({ target: name, destination, root: source });
    assert.equal(installed.actions.length, 18);
    const again = await installTarget({ target: name, destination, root: source });
    assert.equal(again.actions.filter(action => action.status === 'unchanged').length, 18);
    const descriptor = await readTarget(name, source);
    const skillsRoot = join(destination, descriptor.projectSkillsPath);
    const skillDirs = (await readdir(skillsRoot, { withFileTypes: true })).filter(entry => entry.isDirectory());
    assert.equal(skillDirs.length, 18);
    for (const entry of skillDirs) {
      const skillDir = join(skillsRoot, entry.name);
      for (const file of await filesUnder(skillDir)) {
        if (!file.endsWith('.md')) continue;
        const text = await readFile(file, 'utf8');
        assert.doesNotMatch(text, /contracts\/|manifest\/skills\.json|templates\/artifacts\//);
        for (const match of text.matchAll(/\[[^\]\n]*\]\(([^)\s]+)\)/g)) {
          const link = match[1];
          if (/^[a-z][a-z0-9+.-]*:/i.test(link)) continue;
          const target = link.startsWith('#') ? file : resolve(dirname(file), decodeURIComponent(link.split('#')[0]));
          const rel = relative(skillDir, target);
          assert.equal(rel.startsWith('..'), false, `${name}/${entry.name}: ${link}`);
          assert.equal((await stat(target)).isFile(), true, link);
          const fromSource = relative(source, target);
          assert.equal(fromSource.startsWith('..') || isAbsolute(fromSource), true, link);
        }
      }
    }
  }
  await assert.rejects(stat(join(destination, 'contracts')));
  await assert.rejects(stat(join(destination, 'manifest', 'skills.json')));
}));

test('CLI packages and validates a selected target', () => temporary(async output => {
  const cli = join(source, 'bin', 'ai-dev-skills.mjs');
  const packaged = spawnSync(process.execPath, [cli, 'package', '--target', 'claude-code', '--output', output], { encoding: 'utf8' });
  assert.equal(packaged.status, 0, packaged.stderr);
  assert.match(packaged.stdout, /packaged claude-code/);

  const validated = spawnSync(process.execPath, [cli, 'validate', '--target', 'claude-code', '--path', join(output, 'claude-code')], { encoding: 'utf8' });
  assert.equal(validated.status, 0, validated.stderr);
  assert.match(validated.stdout, /18 canonical skills validated/);
}));

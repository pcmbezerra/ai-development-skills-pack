import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { installTarget, packageTargets, targetNames, validateTarget } from '../scripts/distribute-skills.mjs';

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

test('CLI packages and validates a selected target', () => temporary(async output => {
  const cli = join(source, 'bin', 'ai-dev-skills.mjs');
  const packaged = spawnSync(process.execPath, [cli, 'package', '--target', 'claude-code', '--output', output], { encoding: 'utf8' });
  assert.equal(packaged.status, 0, packaged.stderr);
  assert.match(packaged.stdout, /packaged claude-code/);

  const validated = spawnSync(process.execPath, [cli, 'validate', '--target', 'claude-code', '--path', join(output, 'claude-code')], { encoding: 'utf8' });
  assert.equal(validated.status, 0, validated.stderr);
  assert.match(validated.stdout, /18 canonical skills validated/);
}));

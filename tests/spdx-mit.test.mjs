import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { copyFile, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const officialHash = 'b05785f9f18e6716bab63424b11454513b9943a222595b70411009202fc592b5';
const approvedNotice = 'Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)';
const placeholder = 'Copyright (c) <year> <copyright holders>';

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function contentLines(bytes) {
  if (bytes.includes(0x0d) || bytes.length === 0 || bytes.at(-1) !== 0x0a) {
    return { ok: false, class: 'extensao' };
  }
  const parts = bytes.toString('utf8').split('\n');
  if (parts.at(-1) !== '') return { ok: false, class: 'extensao' };
  return { ok: true, lines: parts.slice(0, -1) };
}

function assess(licenseBytes, templateBytes, packageBytes) {
  if (sha256(templateBytes) !== officialHash || templateBytes.length !== 1078) {
    return { ok: false, class: 'template' };
  }
  const template = contentLines(templateBytes);
  if (!template.ok || template.lines.length !== 18 || template.lines[2] !== placeholder) {
    return { ok: false, class: 'template' };
  }
  const license = contentLines(licenseBytes);
  if (!license.ok) return license;
  if (license.lines.length !== 18) return { ok: false, class: 'extensao' };
  if (license.lines[2] !== approvedNotice) return { ok: false, class: 'aviso' };
  for (let index = 0; index < license.lines.length; index += 1) {
    if (index !== 2 && license.lines[index] !== template.lines[index]) {
      return { ok: false, class: 'corpo' };
    }
  }
  let parsed;
  try {
    parsed = JSON.parse(packageBytes.toString('utf8'));
  } catch {
    return { ok: false, class: 'campo' };
  }
  if (parsed.license !== 'MIT' || parsed.private !== true || parsed.version !== '1.0.0-scaffold') {
    return { ok: false, class: 'campo' };
  }
  return { ok: true };
}

async function withCopies(mutate) {
  const dir = await mkdtemp(join(tmpdir(), 'spdx-mit-'));
  const paths = {
    license: join(dir, 'LICENSE'),
    package: join(dir, 'package.json'),
    template: join(dir, 'spdx-mit.txt'),
  };
  try {
    await copyFile(join(root, 'LICENSE'), paths.license);
    await copyFile(join(root, 'package.json'), paths.package);
    await copyFile(join(root, 'tests/spdx-mit.txt'), paths.template);
    if (mutate) await mutate(paths);
    return assess(
      await readFile(paths.license),
      await readFile(paths.template),
      await readFile(paths.package),
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

async function replaceLine(path, index, line) {
  const parts = (await readFile(path)).toString('utf8').split('\n');
  parts[index] = line;
  await writeFile(path, parts.join('\n'));
}

function assertClass(result, failureClass) {
  assert.equal(result.ok, false);
  assert.equal(result.class, failureClass);
}

test('template bytes match the official MIT text before LICENSE is compared', async () => {
  const bytes = await readFile(join(root, 'tests/spdx-mit.txt'));
  assert.equal(bytes.length, 1078);
  assert.equal(sha256(bytes), officialHash);
  assert.equal(bytes.includes(0x0d), false);
  assert.equal(bytes.at(-1), 0x0a);
  const parsed = contentLines(bytes);
  assert.equal(parsed.ok, true);
  assert.equal(parsed.lines.length, 18);
  assert.equal(parsed.lines[2], placeholder);
});

test('canonical LICENSE and package.json pass on an unmodified temporary copy', async () => {
  const before = {
    license: sha256(await readFile(join(root, 'LICENSE'))),
    template: sha256(await readFile(join(root, 'tests/spdx-mit.txt'))),
    package: await readFile(join(root, 'package.json')),
  };
  const result = await withCopies();
  assert.equal(result.ok, true);
  assert.equal(sha256(await readFile(join(root, 'LICENSE'))), before.license);
  assert.equal(sha256(await readFile(join(root, 'tests/spdx-mit.txt'))), before.template);
  assert.deepEqual(await readFile(join(root, 'package.json')), before.package);
});

test('a changed template byte fails as template while LICENSE stays approved', async () => {
  const result = await withCopies(async (paths) => {
    const bytes = await readFile(paths.template);
    bytes[0] ^= 0xff;
    await writeFile(paths.template, bytes);
  });
  assertClass(result, 'template');
});

test('an extra space, the placeholder, another year, or another name fails as aviso', async () => {
  const notices = [
    `${approvedNotice} `,
    placeholder,
    'Copyright (c) 2025 Paulo César Melo Bezerra (LAB-IT)',
    'Copyright (c) 2026 Outro Nome (LAB-IT)',
  ];
  for (const notice of notices) {
    const result = await withCopies(async (paths) => {
      await replaceLine(paths.license, 2, notice);
    });
    assertClass(result, 'aviso');
  }
});

test('a changed word outside line 3 fails as corpo', async () => {
  const result = await withCopies(async (paths) => {
    const parts = (await readFile(paths.license)).toString('utf8').split('\n');
    parts[4] = parts[4].replace('Permission', 'Permitted');
    await writeFile(paths.license, parts.join('\n'));
  });
  assertClass(result, 'corpo');
});

test('an extra content line or a removed content line fails as extensao', async () => {
  const removed = await withCopies(async (paths) => {
    const parts = (await readFile(paths.license)).toString('utf8').split('\n');
    parts.splice(4, 1);
    await writeFile(paths.license, parts.join('\n'));
  });
  assertClass(removed, 'extensao');
  const added = await withCopies(async (paths) => {
    const parts = (await readFile(paths.license)).toString('utf8').split('\n');
    parts.splice(parts.length - 1, 0, 'EXTRA');
    await writeFile(paths.license, parts.join('\n'));
  });
  assertClass(added, 'extensao');
});

test('CRLF or a missing final newline fails as extensao', async () => {
  const crlf = await withCopies(async (paths) => {
    const text = (await readFile(paths.license)).toString('utf8');
    await writeFile(paths.license, text.replaceAll('\n', '\r\n'));
  });
  assertClass(crlf, 'extensao');
  const trimmed = await withCopies(async (paths) => {
    const bytes = await readFile(paths.license);
    await writeFile(paths.license, bytes.subarray(0, -1));
  });
  assertClass(trimmed, 'extensao');
});

test('license, private, version, and invalid JSON fail as campo', async () => {
  const edits = [
    (parsed) => { parsed.license = 'UNLICENSED'; },
    (parsed) => { parsed.license = 'Apache-2.0'; },
    (parsed) => { parsed.license = 'mit'; },
    (parsed) => { parsed.license = 'MIT '; },
    (parsed) => { delete parsed.license; },
    (parsed) => { parsed.private = false; },
    (parsed) => { parsed.private = 'true'; },
    (parsed) => { parsed.version = '1.0.0'; },
  ];
  for (const edit of edits) {
    const result = await withCopies(async (paths) => {
      const parsed = JSON.parse(await readFile(paths.package, 'utf8'));
      edit(parsed);
      await writeFile(paths.package, JSON.stringify(parsed));
    });
    assertClass(result, 'campo');
  }
  const invalid = await withCopies(async (paths) => {
    await writeFile(paths.package, '{');
  });
  assertClass(invalid, 'campo');
});

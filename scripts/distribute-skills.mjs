import { cp, mkdir, readFile, readdir, realpath, stat } from 'node:fs/promises';
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDirectory = fileURLToPath(new URL('../', import.meta.url));

function assertInside(base, target, label) {
  const rel = relative(base, target);
  if (rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) {
    throw new Error(`${label} escapes destination`);
  }
}

async function canonical(path) {
  const missing = [];
  let current = path;
  while (true) {
    try {
      const real = await realpath(current);
      return missing.reduceRight((dir, name) => join(dir, name), real);
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error;
      const parent = dirname(current);
      if (parent === current) throw error;
      missing.push(basename(current));
      current = parent;
    }
  }
}

async function inside(base, path, label) {
  const absoluteBase = resolve(base);
  const absolutePath = resolve(absoluteBase, path);
  assertInside(absoluteBase, absolutePath, label);
  assertInside(await canonical(absoluteBase), await canonical(absolutePath), label);
  return absolutePath;
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

async function readCatalogue(root) {
  return JSON.parse(await readFile(resolve(root, 'manifest/skills.json'), 'utf8'));
}

export async function readTarget(target, root = rootDirectory) {
  const catalogue = await readCatalogue(root);
  const entry = catalogue.targets.find(candidate => candidate.name === target);
  if (!entry) throw new Error(`Unknown target: ${target}`);
  const body = await readFile(resolve(root, entry.path), 'utf8');
  const match = body.replace(/^\/\/[^\n]*\n/gm, '').trim().match(/^export default Object\.freeze\((\{[\s\S]*?\})\);$/);
  if (!match) throw new Error(`${target}: invalid declarative descriptor`);
  return JSON.parse(match[1]);
}

export async function targetNames(root = rootDirectory) {
  return (await readCatalogue(root)).targets.map(target => target.name);
}

async function snapshot(directory) {
  const files = new Map();
  async function visit(current) {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const path = join(current, entry.name);
      if (entry.isDirectory()) await visit(path);
      else if (entry.isFile()) files.set(relative(directory, path), await readFile(path));
      else throw new Error(`Unsupported filesystem entry: ${path}`);
    }
  }
  await visit(directory);
  return files;
}

async function directoriesEqual(left, right) {
  const [leftFiles, rightFiles] = await Promise.all([snapshot(left), snapshot(right)]);
  if (leftFiles.size !== rightFiles.size) return false;
  for (const [path, contents] of leftFiles) {
    const candidate = rightFiles.get(path);
    if (!candidate || !contents.equals(candidate)) return false;
  }
  return true;
}

export async function installTarget({ target, destination, root = rootDirectory }) {
  if (!destination) throw new Error('Missing destination');
  const descriptor = await readTarget(target, root);
  const catalogue = await readCatalogue(root);
  const skillsRoot = await inside(destination, descriptor.projectSkillsPath, `${target}: projectSkillsPath`);
  const actions = [];

  for (const skill of catalogue.skills) {
    const source = resolve(root, dirname(skill.path));
    const targetDirectory = await inside(skillsRoot, skill.name, `${target}: skill ${skill.name}`);
    if (await exists(targetDirectory)) {
      if (!await directoriesEqual(source, targetDirectory)) {
        throw new Error(`${target}: refusing to overwrite divergent skill ${skill.name}`);
      }
      actions.push({ name: skill.name, status: 'unchanged' });
    } else {
      actions.push({ name: skill.name, status: 'installed', source, targetDirectory });
    }
  }

  await mkdir(skillsRoot, { recursive: true });
  for (const action of actions.filter(action => action.status === 'installed')) {
    await cp(action.source, action.targetDirectory, { recursive: true, errorOnExist: true });
  }
  return { target, destination: resolve(destination), skillsRoot, actions };
}

export async function packageTargets({ target, output, root = rootDirectory }) {
  if (!output) throw new Error('Missing output');
  const names = target === 'all' ? await targetNames(root) : [target];
  const results = [];
  for (const name of names) {
    results.push(await installTarget({ target: name, destination: resolve(output, name), root }));
  }
  return results;
}

export async function validateTarget({ target, path, root = rootDirectory }) {
  if (!path) throw new Error('Missing validation path');
  const descriptor = await readTarget(target, root);
  const catalogue = await readCatalogue(root);
  const skillsRoot = await inside(path, descriptor.projectSkillsPath, `${target}: projectSkillsPath`);
  const errors = [];

  for (const skill of catalogue.skills) {
    const source = resolve(root, dirname(skill.path));
    const installed = await inside(skillsRoot, skill.name, `${target}: skill ${skill.name}`);
    if (!await exists(installed)) {
      errors.push(`${skill.name}: missing`);
    } else if (!await directoriesEqual(source, installed)) {
      errors.push(`${skill.name}: differs from canonical source`);
    }
  }
  return { ok: errors.length === 0, target, path: resolve(path), skills: catalogue.skills.length, errors };
}

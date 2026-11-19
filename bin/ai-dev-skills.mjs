#!/usr/bin/env node
import { readFile, stat } from 'node:fs/promises';
import { delimiter, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { packageTargets, installTarget, validateTarget } from '../scripts/distribute-skills.mjs';
import { validate, report } from '../scripts/validate-skills.mjs';

const HELP = `AI - Development Skills Pack
Usage:
  ai-dev-skills validate
  ai-dev-skills validate --target <codex|cursor|antigravity|claude-code> --path <root>
  ai-dev-skills install --target <target> --destination <project-root>
  ai-dev-skills package --target <target|all> --output <directory>
  ai-dev-skills list
  ai-dev-skills doctor
  ai-dev-skills --help`;

export function nodeLine(version) {
  const major = Number(String(version).split('.')[0]);
  const result = Number.isInteger(major) && major >= 22 ? 'pass' : 'fail';
  return `node ${result} ${version}`;
}

export async function gitLine(pathEnv, lookup = observeGit) {
  try {
    return await lookup(pathEnv) ? 'git pass' : 'git fail';
  } catch {
    return 'git fail';
  }
}

async function observeGit(pathEnv) {
  const windows = process.platform === 'win32';
  const name = windows ? 'git.exe' : 'git';
  for (const segment of String(pathEnv ?? '').split(delimiter)) {
    if (!segment) continue;
    let info;
    try {
      info = await stat(join(segment, name));
    } catch (error) {
      if (error?.code === 'ENOENT') continue;
      throw error;
    }
    if (!info.isFile()) continue;
    if (windows) return true;
    return (info.mode & 0o111) !== 0;
  }
  return false;
}

function options(args) {
  const parsed = {};
  for (let index = 0; index < args.length; index += 2) {
    const key = args[index];
    const value = args[index + 1];
    if (!key?.startsWith('--') || value === undefined || value.startsWith('--')) {
      throw new Error(`Invalid option: ${key ?? ''}`);
    }
    if (key.slice(2) in parsed) throw new Error(`Duplicate option: ${key}`);
    parsed[key.slice(2)] = value;
  }
  return parsed;
}

function requireOnly(actual, allowed) {
  for (const key of Object.keys(actual)) {
    if (!allowed.includes(key)) throw new Error(`Unsupported option: --${key}`);
  }
}

async function main(args) {
  if (!args.length || (args.length === 1 && ['--help', 'help', '-h'].includes(args[0]))) {
    console.log(HELP);
    return;
  }

  const [command, ...rest] = args;
  const parsed = options(rest);
  if (command === 'validate' && !rest.length) {
    const result = await validate();
    report(result);
    if (!result.ok) process.exitCode = 1;
    return;
  }
  if (command === 'validate') {
    requireOnly(parsed, ['target', 'path']);
    const result = await validateTarget({ target: parsed.target, path: parsed.path });
    if (result.ok) console.log(`PASS: ${result.target}; ${result.skills} canonical skills validated at ${result.path}.`);
    else {
      console.error(`FAIL: ${result.target}\n${result.errors.map(error => `- ${error}`).join('\n')}`);
      process.exitCode = 1;
    }
    return;
  }
  if (command === 'install') {
    requireOnly(parsed, ['target', 'destination']);
    const result = await installTarget({ target: parsed.target, destination: parsed.destination });
    const installed = result.actions.filter(action => action.status === 'installed').length;
    console.log(`PASS: ${result.target}; ${installed} installed, ${result.actions.length - installed} unchanged at ${result.skillsRoot}.`);
    return;
  }
  if (command === 'package') {
    requireOnly(parsed, ['target', 'output']);
    const results = await packageTargets({ target: parsed.target, output: parsed.output });
    for (const result of results) console.log(`PASS: packaged ${result.target} at ${result.destination}.`);
    return;
  }
  if (command === 'list') {
    requireOnly(parsed, []);
    const manifest = JSON.parse(await readFile(new URL('../manifest/skills.json', import.meta.url), 'utf8'));
    for (const skill of manifest.skills) console.log(skill.name);
    return;
  }
  if (command === 'doctor') {
    requireOnly(parsed, []);
    const node = nodeLine(process.versions.node);
    const git = await gitLine(process.env.PATH);
    console.log(node);
    console.log(git);
    if (node.split(' ')[1] === 'fail' || git === 'git fail') process.exitCode = 1;
    return;
  }
  throw new Error(`Unsupported command: ${command}. Use --help.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    await main(process.argv.slice(2));
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exitCode = 1;
  }
}

#!/usr/bin/env node
import { validate, report } from '../scripts/validate-skills.mjs';
const args = process.argv.slice(2);
if (!args.length || (args.length === 1 && ['--help', 'help', '-h'].includes(args[0]))) {
  console.log('AI - Development Skills Pack (scaffold)\nUsage: ai-dev-skills [validate|--help]\nInstall, sync and doctor are not implemented.');
} else if (args.length === 1 && args[0] === 'validate') {
  const result = await validate(); report(result); process.exitCode = result.ok ? 0 : 1;
} else {
  console.error('Unsupported command. Use --help.'); process.exitCode = 1;
}

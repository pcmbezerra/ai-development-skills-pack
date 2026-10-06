---
artifact: test_evidence
id: TEST-20261006-003
version: 1
status: ready
created_by: tdd
inputs: ["TICKET-SET-20261006-001/03", "SPEC-20261006-001"]
---

## Tests Added

- Structural regression requiring `setup-ai-development-skills` and `context-engineering` as the only implemented skills, preserving the required dependency and both named-only outputs.
- Structural regression rejecting status divergence for the migrated bootstrap skill.
- Agent-executed conformance scenarios for a new repository, invalid JSON and blocked `context-engineering`.

## Tests Executed

- Focused RED/GREEN lifecycle test.
- `npm.cmd test`; `npm.cmd run validate`; `npm.cmd run skills:validate`.
- `node bin/ai-dev-skills.mjs --help`; `node bin/ai-dev-skills.mjs validate`.
- Three isolated local fixtures executed by the agent following the bootstrap and context workflows.

## Expected Failure / RED

`node --test --test-name-pattern="current catalogue implements context and bootstrap" tests/validate-skills.test.mjs` failed before implementation: expected `setup-ai-development-skills` and `context-engineering`, but only `context-engineering` was implemented.

## Passing Evidence / GREEN

- New repository: created `.ai/config.json` with version `1`, tracker `local` and four canonical in-repository paths; composed `context-engineering`; created exactly the five canonical context documents; result `Status: READY`. Re-evaluation produced no writes and preserved all six hashes.
- Invalid JSON: result `Status: BLOCKED`; hash `7C63EA3A1D168A20F3B5F59DF48D9DBDD0B9F02A07D37653A3541811542BA0CA` remained unchanged.
- Blocked dependency: an explicit Node.js 22-only decision conflicted with `package.json` requiring Node.js >=24. `context-engineering` returned `BLOCKED`; bootstrap propagated it without `READY`; configuration, decision and build manifest hashes remained unchanged, and no context document was created.
- No readiness schema, template or persisted readiness artifact was created.

## Regression Suite

`npm.cmd test`: PASS, 41/41, zero failures, skips or todos. Both validation aliases and both CLI commands exited zero. The validator reported 18 skills and four scaffold targets.

## Failures

The first sandboxed full-suite run could not create temporary fixtures (`EPERM` from `mkdtemp`). The required rerun outside the read-only sandbox passed; this was an environment restriction, not a product failure.

## Skipped Tests

None.

## Environment Limitations

Executed on Windows/PowerShell with Node.js v25.2.0 and npm 11.6.2. Agent-executed fixtures demonstrate this workflow in the current session; they do not certify Node.js 22, Linux/macOS or live Cursor/Codex/Gemini Antigravity/Claude Code compatibility.

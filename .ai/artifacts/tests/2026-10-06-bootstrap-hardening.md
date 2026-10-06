---
artifact: test_evidence
id: TEST-20261006-004
version: 1
status: ready
created_by: tdd
inputs: ["TICKET-SET-20261006-001/04", "SPEC-20261006-001", "TEST-20261006-002", "TEST-20261006-003"]
---

## Tests Added

- Deterministic regression rejecting any npm dependency field, including `devDependencies`.
- Deterministic regression rejecting a CLI entrypoint outside the canonical package path.
- Behavior-level subprocess regression accepting help and rejecting unsupported CLI commands.
- Agent-executed adversarial fixtures for existing configuration, incompatible version, invalid JSON, repository escape and material conflict.

## Tests Executed

- Focused RED/GREEN started with `node --test --test-name-pattern="rejects (npm development dependency|expanded CLI command surface)" tests/validate-skills.test.mjs`; both cases failed before the first implementation.
- Full deterministic suite, validator, validation alias, CLI help and CLI validation.
- Five isolated Git repositories evaluated by the agent against the public workflows of `setup-ai-development-skills` and `context-engineering`.

## Expected Failure / RED

Both initial focused regressions failed before the validator change: `validate(root)` accepted a development dependency and an added `doctor` branch. Review rejected the latter test because it matched source syntax; it was replaced by public CLI subprocess assertions plus canonical-entrypoint validation.

## Passing Evidence / GREEN

- The dependency regression passes after commit `800db27`; the review-corrected focused set passes 3/3 and the full suite passes 44/44 with no failures, skips or todos.
- Existing valid CRLF configuration kept the same SHA-256, unknown extension and project-selected paths. Bootstrap returned `READY`; only the five canonical context files changed.
- Re-evaluation with unchanged inputs preserved all five output hashes and produced no additional write.
- Incompatible version, invalid JSON and an escaping path each returned `BLOCKED` with `Reason`, `Evidence`, `Missing prerequisite` and `Recommended next skill/action`; each kept the configuration hash unchanged and produced an empty diff.
- A material decision/build conflict returned `BLOCKED` from `context-engineering`; bootstrap did not report `READY` and produced an empty diff.
- A secret-bearing fixture was inspected only for architectural effect. The scenario emitted no application log; the captured command summary, context, readiness and recorded evidence contained no secret value.

## Regression Suite

`npm.cmd test`, `npm.cmd run validate`, `npm.cmd run skills:validate`, `node bin/ai-dev-skills.mjs --help` and `node bin/ai-dev-skills.mjs validate` pass. Catalogue state remains two `implemented` skills, 16 `scaffold` skills and four declarative `scaffold` targets. Named-only artifacts, dependency semantics, targets and LF/CRLF coverage remain unchanged.

## Specification Traceability

| SPEC criterion | Evidence |
| --- | --- |
| 1 | `TEST-20261006-003`: new repository created configuration plus five context files and returned `READY`. |
| 2 | `TEST-20261006-002` plus this matrix: existing context, unknown configuration extension and selected paths preserved. |
| 3 | This matrix: second execution preserved hashes and added no diff. |
| 4 | This matrix: invalid JSON, incompatible version and escaping path emitted all four required failure fields and kept configuration unchanged. |
| 5 | `TEST-20261006-002` and this matrix: unresolved material conflict blocked without overwrite. |
| 6 | `TEST-20261006-003` and this matrix: blocked context never became bootstrap `READY`. |
| 7 | This matrix: successful diff contained exactly the five context documents; application/build files were unchanged. |
| 8 | `TEST-20261006-002` and this matrix: no application log was emitted and the secret value was absent from captured output and evidence. |
| 9 | Deterministic suite and validator: 2 implemented, 16 scaffold, 4 scaffold targets. |
| 10 | Deterministic lifecycle regressions: mixed state accepted and all status-source divergences rejected. |
| 11 | Manifest regression: `PROJECT_CONTEXT` and `BOOTSTRAP_READINESS` remain named-only without templates. |
| 12 | Dependency, canonical-entrypoint and behavior-level CLI regressions plus direct package inspection. |
| 13 | Final command matrix above, all exit zero. |
| 14 | Environment limitations below distinguish fixtures from compatibility claims. |

## Failures

The first fixture attempt was denied by the read-only sandbox. The approved rerun in the Windows temporary directory passed. One PowerShell collection shape initially made the write-boundary comparison false; a flat recheck confirmed exactly five allowed paths. A later auxiliary target inspection tried to parse `.mjs` as raw JSON; the corrected Node import confirmed four scaffold targets with installation disabled. None was a product failure.

## Skipped Tests

None.

## Environment Limitations

Deterministic tests and agent fixtures ran on Windows/PowerShell with Node.js v25.2.0 and npm 11.6.2. Node.js 22, Linux, a fresh macOS run and live Cursor, Codex, Gemini Antigravity and Claude Code execution remain unverified. Agent-executed fixtures demonstrate conformance in this session; they are not deterministic Node tests or target certification.

---
artifact: test_evidence
id: TEST-20261006-002
version: 1
status: ready
created_by: tdd
inputs: ["TICKET-SET-20261006-001/02", "SPEC-20261006-001"]
---

## Tests Added

- Structural regression requiring exactly `context-engineering` as `implemented`, the other 17 skills as `scaffold`, and `PROJECT_CONTEXT` as named-only.
- Structural regression rejecting a status divergence in the migrated `context-engineering` skill.
- Agent-executed conformance scenarios for creation, preservation, repeat execution, material conflict and secret exclusion.

## Tests Executed

- Focused RED/GREEN test for the checked-in lifecycle state.
- Three focused lifecycle/migration tests after implementation.
- `npm.cmd test`; `npm.cmd run validate`; `npm.cmd run skills:validate`.
- `node bin/ai-dev-skills.mjs --help`; `node bin/ai-dev-skills.mjs validate`.
- Two isolated temporary repository fixtures executed by the agent following the operational skill.

## Expected Failure / RED

`node --test --test-name-pattern='current catalogue implements only context-engineering' tests/validate-skills.test.mjs` failed before implementation: expected `['context-engineering']`, received `[]`.

## Passing Evidence / GREEN

- Focused migration run: 3/3 passed.
- New-repository fixture: exactly the five canonical `.ai` documents were created from `README.md`, `pyproject.toml`, source layout and tests. Facts, one inference and pending evidence gaps were separated; no recommendation was emitted as current state.
- Existing-context fixture: the manual recovery note and all non-conflicting content remained byte-for-byte unchanged.
- Repeat execution: SHA-256 hashes for all five generated documents were unchanged; no context file changed.
- Material conflict: `.ai/decisions/001-runtime.md` required Python 3.11 while `pyproject.toml` required >=3.12. Result:
  - `Status: BLOCKED`
  - `Reason`: explicit runtime decision conflicts with executable project metadata.
  - `Evidence`: the decision and `pyproject.toml` requirements.
  - `Missing prerequisite`: one resolved supported-runtime decision.
  - `Recommended next skill/action`: clarify the supported Python runtime, reconcile the decision or manifest, then rerun `context-engineering`.
  All five context document hashes remained unchanged.
- Secret fixture: the known token value had zero occurrences across generated context documents.

## Regression Suite

`npm.cmd test`: PASS, 40/40, zero failures, skips or todos. Both validation aliases and both CLI commands exited zero. The validator reported 18 skills and four scaffold targets.

## Failures

The first sandboxed full-suite attempt could not create temporary fixtures (`EPERM` from `mkdtemp`). The required rerun outside the read-only sandbox passed 40/40; this was an environment restriction, not a product failure.

## Skipped Tests

None.

## Environment Limitations

Executed on Windows/PowerShell with Node.js v25.2.0 and npm 11.6.2. The conformance fixtures demonstrate agent workflow behavior in this session; they do not certify deterministic interpretation by every agent, Node.js 22, Linux/macOS, or live Cursor/Codex/Gemini Antigravity/Claude Code compatibility.

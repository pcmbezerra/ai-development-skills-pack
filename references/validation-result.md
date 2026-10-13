# Validation result

## Current observation — operational handoff, Linux, 2026-10-13

Linux 6.12.94+ x86_64, Node.js v22.14.0, npm 10.9.9. Amendment v1-A12 implements `handoff` without adding an executor, dependency, schema, template, target or CLI command. A verified transfer uses the existing handoff template. A non-ready input is recorded and does not authorize implementation. A blocked path writes no file from that attempt. ADR `0001` is unchanged.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; 12 `implemented` and 6 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 48 tests, zero failures/skips/todos. The catalogue assertion already covered the migration; no new test file was added.
- `git diff --check`: PASS.
- `TEST-20261013-002` records twelve isolated agent-conducted scenarios in a temporary directory: a ready transfer with an empty frontier, an unchanged rerun, an in-place version update, a blocked specification with a draft ticket, missing project context, unobserved change state, an unobserved artifact inventory, an omitted secret, a conflict with an existing decision, an external fact, combined blockers that preserve an existing handoff and application file, and a ready transfer that leaves glossary and application code unchanged.
- The semantic matrix is evidence from this agent session, not a deterministic Node.js executor or live product certification.

This run covers the structural suite on Linux with Node.js 22 and the agent-applied scenarios. Live discovery/execution in Cursor, Codex, Gemini Antigravity and Claude Code remains unverified.

## Previous observation — operational tdd and code-review, macOS, 2026-10-10

Node.js v26.5.0, npm 11.17.0, macOS 26.6.2 (Darwin 25.6.0). Amendment v1-A11 implements `tdd` and `code-review` without adding an executor, dependency, schema, template, target or CLI command. `tdd` writes its own ready test evidence and does not rewrite evidence whose `created_by` is `implement`. `code-review` writes a ready review report and does not edit code. A blocked path writes no file from that attempt. ADR `0001` is unchanged. `implement` still does not invoke either skill.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; 11 `implemented` and 7 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 48 tests, zero failures/skips/todos. The catalogue assertion already covered the migration; no new test file was added.
- `git diff --check`: PASS.
- `TEST-20261010-002` records thirteen isolated agent-conducted scenarios in a temporary directory: a ready test with no existing tests, an unchanged rerun, an in-place version update, explicit TDD with RED before any implementation edit, a missing objective, a draft ticket, a draft specification, a review without spec or ticket, an unchanged review rerun, missing project context, a missing change, an omitted secret, and a conflict with an existing decision.
- The semantic matrix is evidence from this agent session, not a deterministic Node.js executor or live product certification.

Node.js 22, Linux and live discovery/execution in Cursor, Codex, Gemini Antigravity and Claude Code remain unverified. This macOS run covers the structural suite and the agent-applied scenarios only.

## Previous observation — operational implement, macOS, 2026-10-09

Node.js v26.5.0, npm 11.17.0, macOS 26.6.2 (Darwin 25.6.0). Amendment v1-A10 implements `implement` without adding an executor, dependency, schema, template, target or CLI command. A bounded ready objective uses the existing implementation-report and test-evidence templates. `CHANGE_SET` stays named-only and is cited as the working tree. A blocked path writes no file and applies no change from that attempt. ADR `0001` is unchanged.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; 9 `implemented` and 9 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 48 tests, zero failures/skips/todos. The catalogue assertion already covered the migration; no new test file was added.
- `git diff --check`: PASS.
- `TEST-20261009-004` records eighteen isolated agent-conducted scenarios in a temporary directory: a ready ticket change, an unchanged rerun, an in-place version update, a trivial explicit request, a specification with two changes, missing project context, a draft ticket, a draft specification, an unconfirmed diagnosis, a confirmed diagnosis, an unclear request, an external fact, an omitted secret, an unrelated edit, one bounded specification, a conflict with an existing decision, a research report that is not ready, and combined blockers.
- The semantic matrix is evidence from this agent session, not a deterministic Node.js executor or live product certification.

Node.js 22, Linux and live discovery/execution in Cursor, Codex, Gemini Antigravity and Claude Code remain unverified. This macOS run covers the structural suite and the agent-applied scenarios only.

## Previous observation — operational architecture-design, macOS, 2026-10-09

Node.js v26.5.0, npm 11.17.0, macOS 26.6.2 (Darwin 25.6.0). Amendment v1-A9 implements `architecture-design` without adding an executor, dependency, schema, template, target or CLI command. A ready specification uses the existing architecture-design template. A durable architectural decision already in that specification also uses the existing ADR template. A blocked path writes no file from that attempt. ADR `0001` is unchanged.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; 8 `implemented` and 10 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 48 tests, zero failures/skips/todos. The catalogue assertion already covered the migration; no new test file was added.
- `git diff --check`: PASS.
- `TEST-20261009-003` records eighteen isolated agent-conducted scenarios in a temporary directory: a ready design without an ADR, a ready design with a durable-decision ADR, an unchanged rerun, an in-place version update, a change that does not justify a design, a glossary entry that does not trigger R9, missing project context, a missing specification, an omitted secret, a required missing domain model, a present domain model that is not ready, unadopted recommendations kept out of the design, a premise, material ambiguity, conflict with an existing decision, an external fact, a research report that is not ready, and combined blockers.
- The semantic matrix is evidence from this agent session, not a deterministic Node.js executor or live product certification.

Node.js 22, Linux and live discovery/execution in Cursor, Codex, Gemini Antigravity and Claude Code remain unverified. This macOS run covers the structural suite and the agent-applied scenarios only.

## Previous observation — operational domain-modelling, macOS, 2026-10-09

Node.js v26.5.0, npm 11.17.0, macOS 26.6.2 (Darwin 25.6.0). Amendment v1-A8 implements `domain-modelling` without adding an executor, dependency, schema, template, target or CLI command. A ready specification or a ready decision set uses the existing domain-model template. A blocked path writes no domain-model file. ADR `0001` is unchanged.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; 7 `implemented` and 11 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 48 tests, zero failures/skips/todos. The catalogue assertion already covered the migration; no new test file was added.
- `git diff --check`: PASS.
- `TEST-20261009-002` records eighteen isolated agent-conducted scenarios in a temporary directory: a ready model from a specification, a ready model from a decision set, an unchanged rerun, an in-place version update, CRUD and glossary-only refusals, missing project context, missing and non-ready inputs, a premise, material ambiguity, conflict with an existing decision, an external fact, an adopted aggregate with R9, an omitted secret and combined blockers.
- The semantic matrix is evidence from this agent session, not a deterministic Node.js executor or live product certification.

Node.js 22, Linux and live discovery/execution in Cursor, Codex, Gemini Antigravity and Claude Code remain unverified. This macOS run covers the structural suite and the agent-applied scenarios only.

## Previous observation — operational to-tickets, macOS, 2026-10-09

Node.js v26.5.0, npm 11.17.0, macOS 26.6.2 (Darwin 25.6.0). Amendment v1-A7 implements `to-tickets` without adding an executor, dependency, schema, template, target or CLI command. A ready specification uses the existing ticket-set template. A blocked path writes no ticket-set file. ADR `0001` is unchanged.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; 6 `implemented` and 12 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 48 tests, zero failures/skips/todos. The catalogue assertion already covered the migration; no new test file was added.
- `git diff --check`: PASS.
- `TEST-20261009-001` records eighteen isolated agent-conducted scenarios in a temporary directory: ready ticket set without optional artifacts, ready domain model and architecture design kept distinct from unadopted recommendations, in-place version update, missing and non-ready specifications, present but not-ready optional artifacts, R8 and R9, premise, material ambiguity, conflict with an existing decision, external fact, combined blockers and omitted secret.
- The semantic matrix is evidence from this agent session, not a deterministic Node.js executor or live product certification.

Node.js 22, Linux and live discovery/execution in Cursor, Codex, Gemini Antigravity and Claude Code remain unverified. This macOS run covers the structural suite and the agent-applied scenarios only.

## Previous observation — operational to-spec, macOS, 2026-10-08

Node.js v26.5.0, npm 11.17.0, macOS 26.6.2 (Darwin 25.6.0). Amendment v1-A6 implements `to-spec` without adding an executor, dependency, schema, template, target or CLI command. A ready specification uses the existing template. A blocked path writes no specification file. ADR `0001` is unchanged.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; 5 `implemented` and 13 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 48 tests, zero failures/skips/todos. The catalogue assertion already covered the migration; no new test file was added.
- `git diff --check`: PASS.
- `TEST-20261008-003` records sixteen isolated agent-conducted scenarios in a temporary directory: ready specification, research finding kept distinct from an unadopted recommendation, non-blocking open question, in-place version update, missing decision set, draft, blocked and superseded sets, unaccepted premise, material ambiguity, conflict with an existing decision, external fact, non-ready research report, missing project context, combined blockers and omitted secret.
- The semantic matrix is evidence from this agent session, not a deterministic Node.js executor or live product certification.

Node.js 22, Linux and live discovery/execution in Cursor, Codex, Gemini Antigravity and Claude Code remain unverified. This macOS run covers the structural suite and the agent-applied scenarios only.

## Previous observation — operational clarify, macOS, 2026-10-08

Node.js v26.5.0, npm 11.17.0, macOS 26.6.2 (Darwin 25.6.0). Amendment v1-A5 implements `clarify` without adding an executor, dependency, schema, template, target or CLI command. Ready and blocked decision sets use the existing template. ADR `0001` records persistence of the blocked set.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; 4 `implemented` and 14 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 48 tests, zero failures/skips/todos. The catalogue assertion was extended; no new test file was added.
- `git diff --check`: PASS.
- RED before migration: the catalogue test expected `clarify` among the implemented skills and observed only `setup-ai-development-skills`, `workflow` and `context-engineering`.
- `TEST-20261008-002` records eleven isolated agent-conducted scenarios in a temporary directory: decided request, unanswered ambiguity, partial answer with in-place update, repository evidence, user preference, unaccepted premise, conflict with an existing decision, non-material open question, blocked input, external fact and omitted secret.
- The semantic matrix is evidence from this agent session, not a deterministic Node.js executor or live product certification.

Node.js 22, Linux and live discovery/execution in Cursor, Codex, Gemini Antigravity and Claude Code remain unverified. This macOS run covers the structural suite and the agent-applied scenarios only.

## Previous observation — operational workflow router, Windows, 2026-10-08

Node.js v25.2.0, npm 11.6.2, PowerShell. Amendment v1-A4 implements `workflow` as a consultative router without adding an executor, dependency, schema, template, target or CLI command.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; 3 `implemented` and 15 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 48 tests, zero failures/skips/todos.
- `git diff --check`: PASS.
- `WORKFLOW_PLAN` remains named-only and has no persisted file, schema or template.
- `TEST-20261008-001` records nine isolated agent-conducted scenarios: explicit invocation, ambiguity, unknown failure, bounded change, unknown external fact, missing material context, unusable artifact, scaffold blocking and absence of execution/write/persistence with secret redaction.
- The corrected semantic matrix passed all scenarios and maps all 17 criteria of `SPEC-20261008-001`; `REVIEW-20261008-001` records Standards and Spec PASS after corrections. It is evidence from this agent session, not a deterministic Node.js test or live product certification.

Node.js 22, Linux, a fresh macOS run and live discovery/execution in Cursor, Codex, Gemini Antigravity and Claude Code remain unverified. Model-to-model routing consistency is not proven.

## Previous observation — target distribution, Windows, 2026-10-06

Node.js v25.2.0, npm 11.6.2, PowerShell. Amendment v1-A3 implements deterministic packaging, explicit project installation and canonical-content validation for Codex, Cursor, Gemini Antigravity and Claude Code.

- `npm run validate`: PASS, exactly 18 skills and four implemented declarative target descriptors.
- `npm run skills:validate`: PASS.
- `npm test`: PASS, 48 tests, zero failures/skips/todos.
- `node bin/ai-dev-skills.mjs --help`: PASS; exposes `validate`, `install` and `package`.
- Distribution regressions package and validate all four layouts, confirm 18 installed skills, prove identical reinstall idempotence, reject a divergent collision before copying a missing skill, and exercise package/validate through subprocess CLI calls.
- `git diff --check`: PASS.

The implementation uses only Node.js standard modules. Production and development dependencies remain empty. The installer requires an explicit destination, never overwrites divergent skill directories and does not implement uninstall, sync, global installation or platform detection. Validation proves package structure and byte equality with canonical sources; live discovery inside the four products, Linux/macOS and Node.js 22 remain unverified.

## Previous observation — context/bootstrap hardening, Windows, 2026-10-06

Node.js v25.2.0, npm 11.6.2, PowerShell. Validation passes after the LF/CRLF parser fix, mixed lifecycle support and the operational context/bootstrap migrations.

- `npm run validate`: PASS, exactly 18 skills and four scaffold targets.
- `npm test`: PASS, 44 tests, zero failures/skips/todos.
- `npm run skills:validate`: PASS.
- `node bin/ai-dev-skills.mjs --help`: PASS (exit 0).
- `node bin/ai-dev-skills.mjs validate`: PASS (exit 0).

Regression evidence: before the fix, `node --test --test-name-pattern='with (LF|CRLF)' tests/validate-skills.test.mjs` passed all three LF cases and failed all three CRLF cases. After the fix, the full suite passes. The six new cases explicitly set line endings in temporary copies of artifact contracts/templates, independently of checkout settings. They accept valid LF/CRLF documents and assert the exact missing-section error for SPEC Acceptance Criteria and ADR Decision in both formats.

Lifecycle evidence: regressions accept a consistent mixed fixture and reject unknown status, divergence originating in each of manifest/contract/source, pending or unavailable workflow declarations, missing `Workflow` sections, placeholders and unsupported/non-operational capability statements. The checked-in catalogue contains `context-engineering` and `setup-ai-development-skills` as `implemented`, 16 `scaffold` skills and four declarative `scaffold` targets.

Bootstrap evidence: `TEST-20261006-003` records RED/GREEN lifecycle coverage and agent-executed fixtures. A new repository produced version 1/local configuration plus exactly five context documents and `Status: READY`; a repeat evaluation preserved all six hashes. Invalid JSON returned `BLOCKED` with the original SHA-256 unchanged. A material runtime conflict blocked `context-engineering`, propagated through bootstrap without `READY`, preserved all inputs and created no context documents.

Hardening evidence: `TEST-20261006-004` separates deterministic checks from agent conformance. New regressions reject npm dependency fields and a noncanonical CLI entrypoint; behavior-level subprocess tests accept help and reject unsupported commands. Agent fixtures preserved an existing CRLF configuration with an unknown extension and project-selected paths, proved a five-file write boundary and repeat hashes, excluded a secret value, and blocked incompatible version, invalid JSON, root escape and material conflict without modifying tracked inputs. All 14 `SPEC-20261006-001` criteria are mapped to evidence there.

The fix normalizes CRLF to LF only in strings read for artifact contracts and templates. No checkout-wide conversion, dependency, catalogue, target or contract change was needed. `git ls-files --eol contracts/artifacts.md templates/artifacts/spec.md` still reports `i/lf w/crlf` for both files. Production dependencies remain `{}`; existing required/conditional/optional dependency checks still pass.

Linux and a fresh macOS run, Node.js 22, and live Cursor/Codex/Antigravity/Claude Code execution remain unverified. LF fixtures on Windows establish parser coverage, not operating-system compatibility. Apart from context and bootstrap, workflows and installation remain unimplemented. Amendment v1-A2 is closed; `SPEC-20261006-001` has no remaining ticket frontier.

## Historical failure — Windows, 2026-10-06, before the fix

Node.js v25.2.0, Git 2.53.0.windows.1, PowerShell. Git repository exists; inspected HEAD is `347b05a`. The historical statement below about no Git repository describes the earlier environment only.

- `npm run validate`: FAIL, 15 `missing canonical artifact fields` errors.
- `npm test` after amendment v1-A1: 17 PASS, 3 FAIL, 20 total. The three added tests pass: missing Claude Code target, enabled Claude Code installation and hardcoded Claude Code path. Failures: missing template section, optional composition cycles, and current scaffold baseline.
- `node bin/ai-dev-skills.mjs --help`: PASS.
- `node bin/ai-dev-skills.mjs validate`: FAIL with the same artifact parsing errors.
- The alias `npm run skills:validate` was not separately executed in this session; package.json points it at the same validator.

Confirmed cause: `contracts/artifacts.md` and artifact templates use CRLF in this checkout (`git ls-files --eol` reports index LF, working tree CRLF). The validator uses LF-only artifact marker searches, fenced field extraction and template heading checks. An in-memory comparison for SPEC returned start=-1 / fieldsFound=false / acceptanceHeading=false with original text, and start=1145 / fieldsFound=true / acceptanceHeading=true after CRLF-to-LF normalization. No source or checkout normalization was applied.

The initial pass was documentation only. The subsequent user-requested amendment v1-A1 added Claude Code to the contract, manifest, descriptor, validator and tests. Validation then still reported the same 15 CRLF parsing errors; no target errors were reported. This historical run was not a successful Windows validation; the current result above supersedes it. GitHub CLI was not found in PATH in that session; remote tracker state was not inspected.

## Historical evidence — macOS, 2026-10-05

Reconciled baseline v1 validated on 2026-10-05 with Node.js v26.5.0 and Git 2.54.0 on macOS.

- `npm run validate`: PASS, exactly 18 skills.
- `npm run skills:validate`: PASS, same validator through the baseline-required alias.
- `node bin/ai-dev-skills.mjs validate` and CLI help: PASS.
- `npm test`: PASS, 17 tests. Isolated fixtures reject unknown/undeclared artifacts, absent templates/sections, ready templates, invented named-only schemas, missing R17/failure fields, duplicate/incompatible/executable targets, hardcoded target paths and mandatory/conditional cycles. Optional composition cycles are accepted.
- The original scaffold passes after isolated fixture cleanup. Production dependencies remain {}.

Validation checks the emitted name/description frontmatter subset, not arbitrary YAML. Artifact templates are checked for canonical headings, metadata, draft status and declared producers. Lifecycle checks require workflow sections and reject explicit pending/unavailable sentinels; they do not interpret arbitrary natural-language paraphrases or execute workflows. Routing/gate checks validate structure; they do not certify semantics. No semantic routing overlap suite is implemented.

Windows/Linux execution and platform installation were not tested. Target descriptors express Tier 1 intent and remain scaffolds; live Cursor/Codex/Antigravity compatibility is unverified. The workspace has no Git repository, so no Git diff/commit was available. Full baseline sections 1–27 are now recorded; see [provenance](provenance.md).

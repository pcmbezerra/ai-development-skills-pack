# Validation result

## Current observation — live-host protocol only, v1-A21, Linux, Node.js 22, 2026-10-14

Linux 6.12.94+ (x86_64), Node.js v22.14.0, npm 10.9.9. Amendment v1-A20 is implemented on `origin/main` at `b86f41d`. Amendment v1-A21 records the live observation protocol and does not change skills, the installer, targets, or canonical contracts. This record uses `RESEARCH-20261014-403`, `DECISION-SET-20261014-001`, `SPEC-20261014-001`, `TICKET-SET-20261014-001` and `HANDOFF-20261014-002`. Eighteen skills stay `implemented`. The projection measured again in this session is 84 files and 263465 bytes. Descriptions are 132 to 183 characters, all with `Use when`. A synthetic `- name: description` listing is 3016 characters; that format is not a host listing.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; 18 `implemented` and 0 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 53 tests, zero failures, skips, or todos. No new test was added.
- `git diff --check`: PASS on the tree before these planning artifacts.
- `node bin/ai-dev-skills.mjs --help`: exit 0. `list`, `doctor` and `sync` still exit 1.
- `cursor`, `agent`, `codex`, `claude`, `agy` and `antigravity` are not on `PATH` in this session. That absence does not mark a host `NOT_RUN` for the amendment.

Public pages read on 2026-10-14: https://cursor.com/docs/skills, https://developers.openai.com/codex/skills, https://antigravity.google/docs/skills/, https://code.claude.com/docs/en/skills and https://agentskills.io/specification. Codex documents an initial list of name, description and path, capped at 2% of the window or 8,000 characters, shortening descriptions before omitting skills. Claude Code documents a 1% listing budget, keeps every name, and drops overflowing descriptions starting with the least-invoked skills. Antigravity documents `resources/` and does not name `references/` or `assets/`. None of those pages was executed.

The structural suite does not launch Cursor, Codex, Gemini Antigravity, or Claude Code. Live discovery and live opening of `references/` or `assets/` remain unverified. The next step is `TICKET-SET-20261014-001`, which is not started.

## Previous observation — installed skill projection, v1-A20, Linux, Node.js 22, 2026-10-14

Linux 6.12.94+ (x86_64), Node.js v22.14.0, npm 10.9.9. Amendment v1-A20 is implemented from `origin/main` at `754849f`. Eighteen skills stay `implemented`. Each skill directory contains the selective projection. `SKILL.md` navigation stays inside that directory. Workflow steps, goals, status and dependency edges stay. The installer still copies the directory and does not rewrite links. `references/artifacts.md` rewrites one canonical href, `../manifest/skills.json`, to a same-file anchor; the canonical `contracts/artifacts.md` is unchanged. This record uses `SPEC-20261013-009`, `TICKET-SET-20261013-009`, `TEST-20261013-016`, `IMPLEMENTATION-20261013-016`, `REVIEW-20261013-012` and `HANDOFF-20261014-001`. The projection on disk is 84 files and 263465 bytes. ADR `0001` is unchanged.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; 18 `implemented` and 0 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 53 tests, zero failures, skips, or todos. New rejections cover a link that leaves the skill directory and a projection that drifts. A new distribution test installs all four targets into a destination with no `contracts/` directory and no `manifest/skills.json`, then resolves every markdown link from the installed directory.
- `git diff --check`: PASS on this implementation tree.
- `node bin/ai-dev-skills.mjs --help`: exit 0. `list`, `doctor` and `sync` still exit 1.

The structural suite does not launch Cursor, Codex, Gemini Antigravity, or Claude Code. A file inside the installed directory is not evidence that a host opened it. Live discovery and live opening of `references/` or `assets/` remain unverified.

## Previous observation — v1-A20 analysis only, Linux, Node.js 22, 2026-10-13

Linux 6.12.94+ (x86_64), Node.js v22.14.0, npm 10.9.9. Amendment v1-A19 is closed on `origin/main` at `52c35d7`. `cf74225` is the v1-A18 ancestor. Amendment v1-A20 records the selective in-directory projection and does not change skills, the installer, targets, or canonical contracts. This record uses `RESEARCH-20261013-402`, `DECISION-SET-20261013-009`, `SPEC-20261013-009`, `ARCHITECTURE-20261013-002`, `ADR-0002`, `TICKET-SET-20261013-009` and `HANDOFF-20261013-009`. Eighteen skills stay `implemented`. The 108 `SKILL.md` links still point at `contracts/` and `manifest/skills.json`.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; 18 `implemented` and 0 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 50 tests, zero failures, skips, or todos. No projection test was added.
- `git diff --check`: PASS on the planning tree.
- `node bin/ai-dev-skills.mjs --help` and `node bin/ai-dev-skills.mjs validate`: exit 0. The help text still has no `list`, `doctor`, or `sync`.

The structural suite does not launch Cursor, Codex, Gemini Antigravity, or Claude Code. Live discovery and live opening of supporting files remain unverified. The next implementation step is `TICKET-SET-20261013-009`, which is not started.

## Previous observation — documented skill discovery, v1-A19, Linux, Node.js 22, 2026-10-13

Linux 6.12.94+ (x86_64), Node.js v22.14.0, npm 10.9.9. Amendment v1-A19 gives every skill a one-line discovery description with a `Use when` clause and a 240-character pack budget. It does not add an executor, dependency, schema, template, target, CLI command, vendor frontmatter field, or host process. `origin/main` at the start of this amendment is `cf74225`. This record uses `RESEARCH-20261013-401`, `DECISION-SET-20261013-008`, `ARCHITECTURE-20261013-001`, `SPEC-20261013-008`, `TICKET-SET-20261013-008`, `TEST-20261013-015`, `IMPLEMENTATION-20261013-015`, `REVIEW-20261013-011` and `HANDOFF-20261013-008`. Eighteen skills stay `implemented`. Goals, workflows, and dependencies stay. ADR `0001` is unchanged.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; 18 `implemented` and 0 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 50 tests, zero failures, skips, or todos. Two new rejections cover a description without `Use when` and a description over the 240-character pack budget. The scaffold fixture for `modernize` keeps the discovery description so frontmatter still matches the manifest.
- `git diff --check`: PASS at this run.
- `node bin/ai-dev-skills.mjs` still rejects `list`, `doctor`, and `sync`. That assertion is the existing CLI test, not a new command.

The structural suite does not launch Cursor, Codex, Gemini Antigravity, or Claude Code. Live discovery remains unverified. The 240-character budget is pack policy derived from Codex's published 8,000-character listing cap; the listing format itself was not measured. The next free amendment identifier is v1-A20.

## Previous observation — operational modernize, v1-A18, Linux, Node.js 22, 2026-10-13

Linux 6.12.94+ (x86_64), Node.js v22.14.0, npm 10.9.9. Amendment v1-A18 implements `modernize` without adding an executor, dependency, schema, template, target or CLI command. `origin/main` is `ecbd29e`, the v1-A17 close. This record uses `SPEC-20261013-007`, `TEST-20261013-013`, `TEST-20261013-014`, `REVIEW-20261013-010` and `HANDOFF-20261013-007`. Eighteen skills are `implemented` and none remain `scaffold`. A bounded modernization objective uses the existing modernization-plan template. A blocked path writes no file from that attempt and leaves application code unchanged. A ready plan authorizes `to-tickets` and does not authorize `implement` directly. ADR `0001` is unchanged. The producer of `MODERNIZATION_PLAN` stays `modernize`. The optional dependencies stay `diagnose`, `research`, `architecture-design`, `tdd` and `to-tickets`.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; 18 `implemented` and 0 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 48 tests, zero failures/skips/todos. The catalogue assertion lists `modernize`. Scaffold-sample checks restore `modernize` inside the fixture. No new test file was added.
- `git diff --check`: PASS at the close.
- `TEST-20261013-013` records the catalogue RED before migration and GREEN after it. The workflow text is identical in the contract and the source, 9143 characters.
- `TEST-20261013-014` records eighteen isolated agent-conducted scenarios in a temporary directory: a bounded runtime migration, an unchanged rerun, an in-place validation update, missing architecture, an uncontrolled upgrade, a behaviour change, an unknown failure, an ordinary refactor, a documentation request, an unobserved baseline, missing rollback, missing stages, an external fact, a conflict with ADR `0001`, a non-ready research report, a non-ready architecture design, a plan created by another skill, and combined blockers.
- The semantic matrix is evidence from that agent session, not a deterministic Node.js executor or live product certification.

Live discovery and execution in Cursor, Codex, Gemini Antigravity and Claude Code remain unverified. The next free amendment identifier is v1-A19.

## Previous observation — merged catalogue, Linux, Node.js 22, 2026-10-13

Linux 6.12.94+ (x86_64), Node.js v22.14.0, npm 10.9.9. This merge keeps `edge-case-analysis` as amendment v1-A16 and reissues `docs` as v1-A17. Origin/main already published v1-A16 with `SPEC-20261013-005`, `TEST-20261013-009`, `TEST-20261013-010`, `REVIEW-20261013-007`, `REVIEW-20261013-008` and `HANDOFF-20261013-005`. The docs record uses `SPEC-20261013-006`, `TEST-20261013-011`, `TEST-20261013-012`, `REVIEW-20261013-009` and `HANDOFF-20261013-006`. The next free amendment identifier is v1-A18. Seventeen skills are `implemented` and `modernize` remains the only `scaffold`. Neither skill adds an executor, dependency, schema, template, target or CLI command. ADR `0001` is unchanged.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; 17 `implemented` and 1 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 48 tests, zero failures/skips/todos. The catalogue assertion lists both `edge-case-analysis` and `docs`; the scaffold sample is `modernize`. No new test file was added.
- `git diff --check`: PASS at the merge closure.
- The semantic matrix is evidence from the agent sessions below, not a deterministic Node.js executor or live product certification.

Live discovery and execution in Cursor, Codex, Gemini Antigravity and Claude Code remain unverified. This Linux run covers the structural suite on the merged catalogue. The v1-A16 observation below records 16 `implemented` and 2 `scaffold`, the catalogue at the close of `edge-case-analysis`.

## Previous observation — operational edge-case-analysis, Linux, Node.js 22, 2026-10-13

Linux 6.12.94+ (x86_64), Node.js v22.14.0, npm 10.9.9. Amendment v1-A16 implements `edge-case-analysis`. The branch first used v1-A15 and the identifiers `004`, `007` and `008`. Origin/main published `refactor` as v1-A15 with those identifiers, so this record uses v1-A16 and the next free identifiers. The skill adds no executor, dependency, schema, template, target or CLI command. A ready specification and a working-tree change that exposes an untested boundary write one ready edge-case report. A recommended test stays inside already-specified behaviour. A proposal that would broaden product behaviour is not a recommended test. A blocked path writes no file from that attempt. A ready report does not authorize `implement` to change product behaviour. ADR `0001` is unchanged. The skill does not invoke `tdd` or `code-review`.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; 16 `implemented` and 2 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 48 tests, zero failures/skips/todos. The catalogue assertion covers both `refactor` and `edge-case-analysis`; no new test file was added.
- `git diff --check`: PASS.
- `TEST-20261013-009` records the catalogue expectation for `edge-case-analysis` after `refactor` is already implemented.
- `TEST-20261013-010` records eighteen isolated agent-conducted scenarios in a temporary directory: a cited boundary gap, an unchanged rerun, an in-place coverage update, evidenced absence of R12 risk, a missing specification, a draft specification, a missing change, a draft domain model, an absent domain model, a ready domain model used by the specification, unobserved tests, observed absence of tests, a conflict with an existing decision, a broadening proposal, combined blockers, an omitted secret, no neighboring artifacts, and a blocked rerun that preserves an existing report.
- The semantic matrix is evidence from that agent session, not a deterministic Node.js executor or live product certification.

Live discovery and execution in Cursor, Codex, Gemini Antigravity and Claude Code remain unverified. That Linux run covers the structural suite and the agent-applied scenarios at the close of v1-A16. The v1-A17 observation below records the docs work after its identifiers moved off `005`, `009`, `010` and `007`.

## Previous observation — operational docs, reissued as v1-A17, Linux, Node.js 22, 2026-10-13

Linux 6.12.94+ (x86_64), Node.js v22.14.0, npm 10.9.9. Amendment v1-A17 implements `docs` without adding an executor, dependency, schema, template, target or CLI command. This branch first recorded the cut as v1-A16 with `TEST-20261013-009` and `TEST-20261013-010`. Origin/main published `edge-case-analysis` as v1-A16 with those identifiers, so this record uses `TEST-20261013-011` and `TEST-20261013-012`. A bounded documentation objective uses the existing documentation-update template. Documentation matches verified repository state. Future design stays marked as future design. A blocked path writes no file from that attempt and leaves no documentation change from that attempt. A ready documentation update does not authorize implementation. ADR `0001` is unchanged. The producer of `DOC_UPDATE` stays `docs`.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; at that close on this branch, before the merge, 16 `implemented` and 2 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 48 tests, zero failures/skips/todos. The catalogue assertion already covered the migration; no new test file was added.
- `git diff --check`: PASS at that closure.
- `TEST-20261013-011` records the catalogue RED before migration and GREEN after it for `docs`.
- `TEST-20261013-012` records eighteen isolated agent-conducted scenarios in a temporary directory: a verified documentation update, an unchanged rerun, an in-place additional edit, combined blockers with preserved files, an escaping docs path, a missing objective, an intentional behaviour change, an unknown failure, a structural request, a modernization request, a conflict with an existing decision, an unsupported public-API claim, a draft specification, future design kept distinct from current behaviour, a draft architecture design, a draft research report, documentation that already matched, and a foreign update left unchanged.
- The semantic matrix is evidence from that agent session, not a deterministic Node.js executor or live product certification.

Live discovery and execution in Cursor, Codex, Gemini Antigravity and Claude Code remain unverified. That Linux run covers the structural suite and the agent-applied scenarios. The v1-A15 observation below records 15 `implemented` and 3 `scaffold`, the catalogue at the close of `refactor`.

## Previous observation — operational refactor, Linux, Node.js 22, 2026-10-13

Linux 6.12.94+ (x86_64), Node.js v22.14.0, npm 10.9.9. Amendment v1-A15 implements `refactor` without adding an executor, dependency, schema, template, target or CLI command. Origin/main already published v1-A13 as `diagnose` and v1-A14 as `research`, so this amendment keeps those records and uses the next free artifact ids. A bounded structural objective uses the existing implementation-report and test-evidence templates. External behaviour stays unchanged unless that objective explicitly authorizes one named change. A blocked path writes no file from that attempt and leaves no change from that attempt. ADR `0001` is unchanged. The artifact contract names `refactor` beside the existing producers.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; 15 `implemented` and 3 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 48 tests, zero failures/skips/todos. The catalogue assertion already covered the migration; no new test file was added.
- `git diff --check`: PASS at closure.
- `TEST-20261013-007` records the catalogue RED before migration and GREEN after it for `refactor`.
- `TEST-20261013-008` records eighteen isolated agent-conducted scenarios in a temporary directory: a ready structural rename, an unchanged rerun, an in-place additional edit, missing project context, an unobserved baseline, a failing test before the change, an unbounded objective, an intentional behaviour change, one explicitly authorized behaviour change, a modernization request, a draft research report, a conflict with an existing decision, an omitted secret, a reverted post-change failure, combined blockers, a blocked attempt that preserves existing files, a speculative abstraction, and a trivial rename.
- The semantic matrix is evidence from this agent session, not a deterministic Node.js executor or live product certification.

Live discovery and execution in Cursor, Codex, Gemini Antigravity and Claude Code remain unverified. This Linux run covers the structural suite and the agent-applied scenarios. The v1-A14 observation below records 14 `implemented` and 4 `scaffold`, the catalogue at the close of `research`.

## Previous observation — operational research, Linux, Node.js 22, 2026-10-13

Linux 6.12.94+ (x86_64), Node.js v22.14.0, npm 10.9.9. Amendment v1-A14 implements `research` without adding an executor, dependency, schema, template, target or CLI command. A question that is an external fact, with project context, writes one ready research report. Unsupported claims stay in Unknowns when external access cannot be used. A blocked path writes no file from that attempt. A ready report whose unknowns can still change the requested next step does not authorize or recommend a consumer. ADR `0001` is unchanged. The skill does not invoke `to-spec`.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; 14 `implemented` and 4 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 48 tests, zero failures/skips/todos. The catalogue assertion already covered the migration; no new test file was added.
- `git diff --check`: PASS.
- `TEST-20261013-005` records the catalogue RED before migration and GREEN after it.
- `TEST-20261013-006` records eighteen isolated agent-conducted scenarios in a temporary directory: a cited repository fact, an unchanged rerun, an in-place version update, an unresolved external claim, missing project context, a missing question, a project choice, a conflict with an existing decision, an omitted secret, a premise left unresolved, a blocked decision set whose blocker is the researched fact, a different ambiguity, an evidenced absence, no neighboring artifacts, combined blockers, a rejected alternative, a separated recommendation, and a rerun that preserves the unknown.
- The semantic matrix is evidence from this agent session, not a deterministic Node.js executor or live product certification.

Live discovery and execution in Cursor, Codex, Gemini Antigravity and Claude Code remain unverified. This Linux run covers the structural suite and the agent-applied scenarios. The v1-A13 observation below records 13 `implemented` and 5 `scaffold`, the catalogue at the close of `diagnose`.

## Previous observation — operational diagnose, Linux, 2026-10-13

Linux 6.12.94+ x86_64, Node.js v22.14.0, npm 10.9.9. Amendment v1-A13 implements `diagnose` without adding an executor, dependency, schema, template, target or CLI command. A classified failure uses the existing diagnosis template. A probable cause, an unconfirmed hypothesis, or a confirmed cause without regression evidence does not authorize implementation. A blocked path writes no file from that attempt. Optional `tdd` is not invoked. ADR `0001` is unchanged.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; 13 `implemented` and 5 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 48 tests, zero failures/skips/todos. The catalogue assertion already covered the migration; no new test file was added.
- `git diff --check`: PASS.
- `TEST-20261013-003` records the catalogue RED before migration and GREEN after it for `diagnose`.
- `TEST-20261013-004` records fourteen isolated agent-conducted scenarios in a temporary directory: a confirmed cause with an existing failing test, an unchanged rerun, an in-place version update, a probable cause, an unconfirmed hypothesis, a confirmed cause without regression evidence, missing project context, a blocked project context, an unknown symptom, an unobserved repository, an omitted secret, a conflict with an existing decision, an external fact, and combined blockers that preserve an existing diagnosis and application file.
- The semantic matrix is evidence from this agent session, not a deterministic Node.js executor or live product certification.

This run covers the structural suite on Linux with Node.js 22 and the agent-applied scenarios. Live discovery/execution in Cursor, Codex, Gemini Antigravity and Claude Code remains unverified. An earlier same-day run recorded `gh issue list` returning `Resource not accessible by integration`. No issue was created.

## Previous observation — operational handoff, Linux, 2026-10-13

Linux 6.12.94+ x86_64, Node.js v22.14.0, npm 10.9.9. Amendment v1-A12 implements `handoff` without adding an executor, dependency, schema, template, target or CLI command. A verified transfer uses the existing handoff template. A non-ready input is recorded and does not authorize implementation. A blocked path writes no file from that attempt. ADR `0001` is unchanged.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; 12 `implemented` and 6 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 48 tests, zero failures/skips/todos. The catalogue assertion already covered the migration; no new test file was added.
- `git diff --check`: PASS.
- `TEST-20261013-002` records twelve isolated agent-conducted scenarios in a temporary directory: a ready transfer with an empty frontier, an unchanged rerun, an in-place version update, a blocked specification with a draft ticket, missing project context, unobserved change state, an unobserved artifact inventory, an omitted secret, a conflict with an existing decision, an external fact, combined blockers that preserve an existing handoff and application file, and a ready transfer that leaves glossary and application code unchanged.
- The semantic matrix is evidence from this agent session, not a deterministic Node.js executor or live product certification.

This run covers the structural suite on Linux with Node.js 22 and the agent-applied scenarios. Live discovery/execution in Cursor, Codex, Gemini Antigravity and Claude Code remains unverified. An earlier same-day run on the v1-A11 tree, recorded below, found `gh` on PATH and `gh issue list` returning `Resource not accessible by integration`. No issue was created.

## Previous observation — structural suite on Linux, Node.js 22, after v1-A11, 2026-10-13

Linux 6.12.94+ (x86_64), Node.js v22.14.0, npm 10.9.9. `node_modules` was absent. The scripts use Node.js built-ins only. This run re-executes the structural suite and CLI after amendment v1-A11. It does not re-run the agent-driven semantic matrices and does not certify live discovery in Cursor, Codex, Gemini Antigravity or Claude Code.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; 11 `implemented` and 7 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 48 tests, zero failures/skips/todos.
- `git diff --check`: PASS on the clean tree before this note.
- `node bin/ai-dev-skills.mjs --help` and `node bin/ai-dev-skills.mjs validate`: exit 0.

`gh` is on PATH and authenticated as the Cursor integration. `gh issue list` returned `Resource not accessible by integration`. Remote issues and labels remain unreconciled. No issue was created.

Node.js 22 and Linux structural execution are verified by this run. Live product discovery remains unverified.

## Previous observation — operational tdd and code-review, macOS, 2026-10-10

Node.js v26.5.0, npm 11.17.0, macOS 26.6.2 (Darwin 25.6.0). Amendment v1-A11 implements `tdd` and `code-review` without adding an executor, dependency, schema, template, target or CLI command. `tdd` writes its own ready test evidence and does not rewrite evidence whose `created_by` is `implement`. `code-review` writes a ready review report and does not edit code. A blocked path writes no file from that attempt. ADR `0001` is unchanged. `implement` still does not invoke either skill.

- `npm run validate` and `npm run skills:validate`: PASS, 18 skills; 11 `implemented` and 7 `scaffold`; four implemented target descriptors.
- `npm test`: PASS, 48 tests, zero failures/skips/todos. The catalogue assertion already covered the migration; no new test file was added.
- `git diff --check`: PASS.
- `TEST-20261010-002` records thirteen isolated agent-conducted scenarios in a temporary directory: a ready test with no existing tests, an unchanged rerun, an in-place version update, explicit TDD with RED before any implementation edit, a missing objective, a draft ticket, a draft specification, a review without spec or ticket, an unchanged review rerun, missing project context, a missing change, an omitted secret, and a conflict with an existing decision.
- The semantic matrix is evidence from this agent session, not a deterministic Node.js executor or live product certification.

This macOS run did not itself verify Node.js 22 or Linux. Those structural runs are recorded in the 2026-10-13 observations above. Live discovery/execution in Cursor, Codex, Gemini Antigravity and Claude Code remains unverified.

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

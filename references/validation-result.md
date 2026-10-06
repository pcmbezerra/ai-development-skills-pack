# Validation result

## Current observation — Windows, 2026-10-06

Node.js v25.2.0, npm 11.6.2, PowerShell. Validation passes after the LF/CRLF parser fix and the mixed skill lifecycle prefactor.

- `npm run validate`: PASS, exactly 18 skills and four scaffold targets.
- `npm test`: PASS, 36 tests, zero failures/skips.
- `npm run skills:validate`: PASS.
- `node bin/ai-dev-skills.mjs --help`: PASS (exit 0).
- `node bin/ai-dev-skills.mjs validate`: PASS (exit 0).

Regression evidence: before the fix, `node --test --test-name-pattern='with (LF|CRLF)' tests/validate-skills.test.mjs` passed all three LF cases and failed all three CRLF cases. After the fix, the full suite passes. The six new cases explicitly set line endings in temporary copies of artifact contracts/templates, independently of checkout settings. They accept valid LF/CRLF documents and assert the exact missing-section error for SPEC Acceptance Criteria and ADR Decision in both formats.

Lifecycle evidence: ten regressions accept one consistent `implemented` fixture and reject unknown status, divergence originating in each of manifest/contract/source, pending or unavailable workflow declarations, missing `Workflow` sections, placeholders and unsupported operational execution. The checked-in catalogue remains 18 `scaffold` skills and four declarative `scaffold` targets.

The fix normalizes CRLF to LF only in strings read for artifact contracts and templates. No checkout-wide conversion, dependency, catalogue, target or contract change was needed. `git ls-files --eol contracts/artifacts.md templates/artifacts/spec.md` still reports `i/lf w/crlf` for both files. Production dependencies remain `{}`; existing required/conditional/optional dependency checks still pass.

Linux and a fresh macOS run, Node.js 22, and live Cursor/Codex/Antigravity/Claude Code execution remain unverified. LF fixtures on Windows establish parser coverage, not operating-system compatibility. Workflows and installation remain unimplemented; the next implementation slice is defined in the project handoff.

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

Validation checks the emitted name/description frontmatter subset, not arbitrary YAML. Artifact templates are checked for canonical headings, metadata, draft status and declared producers. Routing/gate checks validate structure; they do not certify semantics or execute production workflows. No semantic routing overlap suite is implemented.

Windows/Linux execution and platform installation were not tested. Target descriptors express Tier 1 intent and remain scaffolds; live Cursor/Codex/Antigravity compatibility is unverified. The workspace has no Git repository, so no Git diff/commit was available. Full baseline sections 1–27 are now recorded; see [provenance](provenance.md).

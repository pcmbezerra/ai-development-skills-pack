# Validation result

Reconciled baseline v1 validated on 2026-10-05 with Node.js v26.5.0 and Git 2.54.0 on macOS.

- `npm run validate`: PASS, exactly 18 skills.
- `npm run skills:validate`: PASS, same validator through the baseline-required alias.
- `node bin/ai-dev-skills.mjs validate` and CLI help: PASS.
- `npm test`: PASS, 17 tests. Isolated fixtures reject unknown/undeclared artifacts, absent templates/sections, ready templates, invented named-only schemas, missing R17/failure fields, duplicate/incompatible/executable targets, hardcoded target paths and mandatory/conditional cycles. Optional composition cycles are accepted.
- The original scaffold passes after isolated fixture cleanup. Production dependencies remain {}.

Validation checks the emitted name/description frontmatter subset, not arbitrary YAML. Artifact templates are checked for canonical headings, metadata, draft status and declared producers. Routing/gate checks validate structure; they do not certify semantics or execute production workflows. No semantic routing overlap suite is implemented.

Windows/Linux execution and platform installation were not tested. Target descriptors express Tier 1 intent and remain scaffolds; live Cursor/Codex/Antigravity compatibility is unverified. The workspace has no Git repository, so no Git diff/commit was available. Full baseline sections 1–27 are now recorded; see [provenance](provenance.md).

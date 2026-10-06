# AI - Development Skills Pack

Maintain exactly the 18 skills in [manifest](manifest/skills.json). Before changing contracts, read [provenance](references/provenance.md) and the relevant per-skill contract. For artifact or routing changes, consult [artifacts](contracts/artifacts.md) and [routing](contracts/routing.md).

Keep reusable skill source tool-agnostic and project state outside skills. Preserve required, conditional and optional dependency semantics. Skill status must be `scaffold` or `implemented` and agree across manifest, contract and source. Do not add production npm dependencies or target installation logic.

Run `npm run validate` after structural changes. Report failures and unverified platform assumptions explicitly.

## Agent skills

### Issue tracker

GitHub Issues, with local Markdown fallback in `.ai/artifacts/tickets`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the five default triage labels. See `docs/agents/triage-labels.md`.

### Domain docs

Single context: `CONTEXT.md`; ADRs in `.ai/decisions`. See `docs/agents/domain.md`.

For continuity, read `.ai/artifacts/handoffs/2026-10-06-project-state.md` and refresh its validation evidence before proceeding.

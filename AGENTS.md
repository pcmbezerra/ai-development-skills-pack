# AI - Development Skills Pack

Maintain exactly the 18 skills in [manifest](manifest/skills.json). Before changing contracts, read [provenance](references/provenance.md) and the relevant per-skill contract. For artifact or routing changes, consult [artifacts](contracts/artifacts.md) and [routing](contracts/routing.md).

Keep reusable skill source tool-agnostic and project state outside skills. Preserve required, conditional and optional dependency semantics. This phase is scaffolding only: no production npm dependencies or installer/workflow logic.

Run `npm run validate` after structural changes. Report failures and unverified platform assumptions explicitly.

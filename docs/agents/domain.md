# Domain docs

Single-context repository. Read `CONTEXT.md` for vocabulary and relevant ADRs in `.ai/decisions` before changes. If absent, proceed silently; create decisions lazily when a real trade-off warrants an ADR.

Use glossary terms consistently and surface conflicts with existing decisions. `CONTEXT.md` is only a glossary; implementation details, current state and project constraints belong in `.ai/`.

The maintainer confirmed `.ai/decisions` on 2026-10-06, retaining the project's existing artifact contract instead of the external setup skill's default `docs/adr`. Do not maintain duplicate ADR stores.

Normative sources remain `references/architecture-contract-v1.md`, `references/provenance.md`, `contracts/` and `manifest/skills.json`. The local glossary does not replace the pack's broader DOMAIN_MODEL artifact. The external helper `domain-modeling` and the pack skill `domain-modelling` are distinct; preserve their names.

# Provenance and scaffold decisions

## Baseline v1 reconciliation

The [complete normative contract](architecture-contract-v1.md) was supplied by the user as “Texto colado.txt” and accepted for reconciliation on 2026-10-05. It contains sections 1–27, including R1–R17. It supersedes the partial snapshot as the active baseline; completing previously unavailable clauses is a baseline v1 reconciliation, not a new architecture version.

The [recovered contract](architecture-contract-v1.recovered.md) remains historical evidence from ChatGPT conversation 6ab241d8-d530-83e9-a9de-d6493ffa7f3d, message c7cf3f10-fcf2-4cf9-a6c5-cb8866e37764. That snapshot was capped at 20,000 characters inside R10. Previous truncation warnings apply only to that snapshot.

## Representation choices and remaining limitations

- Exactly 18 runtime skills; primary invocation remains a classification allowing composition and explicit requests for model skills.
- JSON manifest uses an array and schemaVersion, preserving existing consumers; architectureVersion=1 identifies the normative baseline. artifactInputs/artifactOutputs index artifacts without replacing prose input alternatives or dependency semantics.
- Dependencies retain required/conditional/optional semantics. External research is an optional capability with unresolved-claims fallback, never a hard skill/npm dependency.
- R13 has a “mandatory” title but SHOULD in its normative body. The scaffold preserves SHOULD rather than silently strengthening it to SHALL.
- WORKFLOW_PLAN, PROJECT_CONTEXT, CHANGE_SET and bootstrap readiness still have no complete schemas in the full baseline. Registry entries identify named-only outputs; no schemas are invented. TICKET is a record within TICKET_SET.
- Existing centralized artifact and per-skill contracts/templates remain authoritative operational references. The canonical tree in section 24 is represented using these existing paths; optional meta-skills and detailed cross-cutting guidance are not invented.
- Node >=22, frontmatter limited to name/description (JSON-quoted descriptions), declarative target descriptors, and help/validate-only CLI remain scaffold choices. skills:validate aliases the existing validator.
- Target validation checks descriptor/manifest structure and tool-agnostic sources; it does not certify installation, execution or live platform compatibility. Windows/Linux and Cursor/Codex/Antigravity installations remain unverified.
- No installer, sync, doctor, list, automatic routing, platform detection, production workflow or npm production dependencies are implemented. Semantic routing overlap tests remain future work.

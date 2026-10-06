# Provenance and scaffold decisions

## Baseline v1 reconciliation

The [complete normative contract](architecture-contract-v1.md) was supplied by the user as “Texto colado.txt” and accepted for reconciliation on 2026-10-05. It contains sections 1–27, including R1–R17. It supersedes the partial snapshot as the active baseline; completing previously unavailable clauses is a baseline v1 reconciliation, not a new architecture version.

The [recovered contract](architecture-contract-v1.recovered.md) remains historical evidence from ChatGPT conversation 6ab241d8-d530-83e9-a9de-d6493ffa7f3d, message c7cf3f10-fcf2-4cf9-a6c5-cb8866e37764. That snapshot was capped at 20,000 characters inside R10. Previous truncation warnings apply only to that snapshot.

## Amendment v1-A1 — Claude Code, 2026-10-06

The user explicitly requested Claude Code as an additional Tier 1 distribution target. The active contract, manifest, descriptor and validator now include four targets. This versioned amendment changes only the target set; architectureVersion=1, schemaVersion=1, package version and the 18-skill catalogue remain unchanged.

The Claude Code descriptor remains declarative, with installation disabled. No installation path, runtime capability, frontmatter extension or working integration is claimed. The recovered historical snapshot is unchanged.

## Amendment v1-A2 — operational context workflow, 2026-10-06

The approved context/bootstrap specification authorizes incremental implementation without changing the baseline responsibilities. This amendment begins that transition: `context-engineering` is operational and `implemented`; the other 17 skills remain `scaffold`. The five existing context documents compose the named-only `PROJECT_CONTEXT`; no schema, template, wrapper artifact, runtime executor or dependency is added.

Target readiness is unchanged. Cursor, Codex, Gemini Antigravity and Claude Code remain declarative `scaffold` targets with live compatibility unverified. A later ticket may complete v1-A2 by implementing `setup-ai-development-skills`; this partial state does not claim bootstrap readiness.

## Representation choices and remaining limitations

- Exactly 18 runtime skills; primary invocation remains a classification allowing composition and explicit requests for model skills.
- Skill lifecycle is declared per skill as `scaffold` or `implemented` and must agree across manifest, contract and source. `context-engineering` is implemented and the other 17 skills remain scaffold; target status remains independent and declarative.
- JSON manifest uses an array and schemaVersion, preserving existing consumers; architectureVersion=1 identifies the normative baseline. artifactInputs/artifactOutputs index artifacts without replacing prose input alternatives or dependency semantics.
- Dependencies retain required/conditional/optional semantics. External research is an optional capability with unresolved-claims fallback, never a hard skill/npm dependency.
- R13 has a “mandatory” title but SHOULD in its normative body. The scaffold preserves SHOULD rather than silently strengthening it to SHALL.
- WORKFLOW_PLAN, PROJECT_CONTEXT, CHANGE_SET and bootstrap readiness still have no complete schemas in the full baseline. Registry entries identify named-only outputs; no schemas are invented. TICKET is a record within TICKET_SET.
- Existing centralized artifact and per-skill contracts/templates remain authoritative operational references. The canonical tree in section 24 is represented using these existing paths; optional meta-skills and detailed cross-cutting guidance are not invented.
- Node >=22, frontmatter limited to name/description (JSON-quoted descriptions), declarative target descriptors, and help/validate-only CLI remain scaffold choices. skills:validate aliases the existing validator.
- Target validation checks descriptor/manifest structure and tool-agnostic sources; it does not certify installation, execution or live platform compatibility. Linux execution and Cursor/Codex/Antigravity/Claude Code installations remain unverified; Windows validation now passes with in-memory LF/CRLF artifact parsing and 40 passing tests, as recorded in validation-result.md.
- No installer, sync, doctor, list, automatic routing, platform detection or npm production dependencies are implemented. Apart from `context-engineering`, skill workflows remain scaffold; semantic routing overlap tests remain future work.

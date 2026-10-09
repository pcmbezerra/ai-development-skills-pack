# Provenance and scaffold decisions

## Baseline v1 reconciliation

The [complete normative contract](architecture-contract-v1.md) was supplied by the user as “Texto colado.txt” and accepted for reconciliation on 2026-10-05. It contains sections 1–27, including R1–R17. It supersedes the partial snapshot as the active baseline; completing previously unavailable clauses is a baseline v1 reconciliation, not a new architecture version.

The [recovered contract](architecture-contract-v1.recovered.md) remains historical evidence from ChatGPT conversation 6ab241d8-d530-83e9-a9de-d6493ffa7f3d, message c7cf3f10-fcf2-4cf9-a6c5-cb8866e37764. That snapshot was capped at 20,000 characters inside R10. Previous truncation warnings apply only to that snapshot.

## Amendment v1-A1 — Claude Code, 2026-10-06

The user explicitly requested Claude Code as an additional Tier 1 distribution target. The active contract, manifest, descriptor and validator now include four targets. This versioned amendment changes only the target set; architectureVersion=1, schemaVersion=1, package version and the 18-skill catalogue remain unchanged.

The Claude Code descriptor remains declarative, with installation disabled. No installation path, runtime capability, frontmatter extension or working integration is claimed. The recovered historical snapshot is unchanged.

## Amendment v1-A2 — operational context workflow, 2026-10-06

The approved context/bootstrap specification authorizes incremental implementation without changing the baseline responsibilities. `context-engineering` and `setup-ai-development-skills` are operational and `implemented`; the other 16 skills remain `scaffold`. The bootstrap validates or creates local configuration, composes the required context workflow and reports readiness only after both configuration and the five context documents pass their gates.

The five context documents compose the named-only `PROJECT_CONTEXT`, and `BOOTSTRAP_READINESS` remains a named-only execution result; no schema, template, wrapper artifact, runtime executor or dependency is added. Target readiness is unchanged. Cursor, Codex, Gemini Antigravity and Claude Code remain declarative `scaffold` targets with live compatibility unverified. Ticket 04 closed the amendment with adversarial agent fixtures and deterministic dependency/CLI regressions; all 14 specification criteria have traceable evidence.

## Amendment v1-A3 — target distribution, 2026-10-06

The user explicitly authorized installer and packaging support for the four Tier 1 targets. Target descriptors remain declarative data but are now `implemented`, with project paths verified against the current official product documentation: Codex and Antigravity use `.agents/skills`, Cursor uses `.cursor/skills`, and Claude Code uses `.claude/skills`.

The shared distributor packages all targets, installs into an explicit destination and validates every installed skill against the canonical source. Installation is idempotent for identical content and rejects any divergent existing skill before copying. No uninstall, overwrite, sync, global installation, automatic platform detection, archive format or production dependency was added.

Path sources: [Codex skills](https://developers.openai.com/codex/skills), [Cursor skills](https://cursor.com/docs/skills), [Antigravity skills](https://codelabs.developers.google.com/antigravity/how-to-create-agent-skills-for-antigravity-cli), and [Claude Code skills](https://code.claude.com/docs/en/skills).

## Amendment v1-A4 — operational workflow router, 2026-10-08

The maintainer approved `workflow` as the third operational skill. It reads the request, manifest, available artifacts and project context when material; applies R1–R17; and returns one minimal, justified `WORKFLOW_PLAN` in the conversation. It never executes planned skills, modifies application code or persists the plan.

`WORKFLOW_PLAN` remains named-only without a schema or template. Missing material context conditionally places `context-engineering` first without adding a manifest dependency. Draft, blocked, incomplete or incompatible artifacts return to their producer. A required scaffold skill remains visible in the complete route but produces the contracted `BLOCKED` result at the first unavailable step. Nine agent-conducted scenarios validate these semantics separately from the deterministic Node.js suite.

## Amendment v1-A5 — operational clarify, 2026-10-08

The maintainer approved `clarify` as the fourth operational skill. It resolves material ambiguity; distinguishes resolved decisions, premises, open questions, blocking questions and external facts; and persists both ready and blocked decision sets under `.ai/artifacts/decisions/` with the existing template. ADR `0001` records why a blocked set is persisted. Repository evidence that already answers a question closes it. `context-engineering` stays optional and runs only when repository evidence could answer or reclassify a material question. The skill stops after the decision set and does not invoke the next skill. Eleven agent-conducted scenarios validate these semantics separately from the deterministic Node.js suite.

## Amendment v1-A6 — operational to-spec, 2026-10-08

The maintainer approved `to-spec` as the fifth operational skill. It consumes a ready decision set and project context, incorporates a ready research report when one exists, and persists one ready specification with the existing template. A later execution of the same objective updates that file and increments `version`. When the specification gate does not pass, the skill returns one BLOCKED report and writes no file. The earliest blocker is recommended in this order: missing project context, a decision-set problem, then an external fact. `context-engineering` is not composed. ADR `0001` stays limited to decision sets. The skill stops after the result and does not invoke the next skill. Sixteen agent-conducted scenarios validate these semantics separately from the deterministic Node.js suite.

## Amendment v1-A7 — operational to-tickets, 2026-10-09

The maintainer approved `to-tickets` as the sixth operational skill. It consumes a ready specification, uses a ready domain model or architecture design only when that artifact is present and ready, and persists one ready ticket set with the existing template. A later execution of the same objective updates that file and increments `version`. When the ticket gate does not pass, the skill returns one BLOCKED report and writes no file. The earliest blocker is recommended in this order: a missing or non-ready specification, a decision problem, a domain-model problem, an architecture-design problem, then an external fact. Dependencies stay empty. ADR `0001` stays limited to decision sets. The skill stops after the result, does not invoke `implement` and does not publish a remote issue. Eighteen agent-conducted scenarios validate these semantics separately from the deterministic Node.js suite.

## Amendment v1-A8 — operational domain-modelling, 2026-10-09

The maintainer approved `domain-modelling` as the seventh operational skill. It consumes a ready specification or a ready decision set, plus project context, and persists one ready domain model with the existing template under `.ai/artifacts/domain/`. A later execution of the same objective updates that file and increments `version`. When the model cannot be justified, the skill returns one BLOCKED report and writes no file. The earliest blocker is recommended in this order: missing project context, a decision-set problem, a specification problem, an external fact, then a change that does not justify a model. Optional DDD sections appear only when the ready input already adopts them. Dependencies stay empty. ADR `0001` stays limited to decision sets. The skill stops after the result and does not invoke `architecture-design` or `to-tickets`. Eighteen agent-conducted scenarios validate these semantics separately from the deterministic Node.js suite.

## Amendment v1-A9 — operational architecture-design, 2026-10-09

The maintainer continued with amendment v1-A9. `architecture-design` is the eighth operational skill. It consumes a ready specification and project context, uses a ready domain model or research report only when that artifact is present and ready, and persists one ready architecture design with the existing template under `.ai/artifacts/architecture/`. When the ready specification already records a durable architectural decision, with alternatives and consequences, it also persists one ready ADR with the existing template under `.ai/decisions/` and does not modify ADR `0001`. A later execution of the same objective updates that file and increments `version`. When the architecture gate does not pass, the skill returns one BLOCKED report and writes no file from that attempt. The earliest blocker is recommended in this order: missing project context, a specification problem, a decision problem, an external fact or a research report that is present and not ready, a domain model that is required or present and not ready, then a change that does not justify a design. Existing conditional dependencies stay. ADR `0001` stays limited to decision sets. The skill stops after the result and does not invoke `to-tickets`. Eighteen agent-conducted scenarios validate these semantics separately from the deterministic Node.js suite.

## Representation choices and remaining limitations

- Exactly 18 runtime skills; primary invocation remains a classification allowing composition and explicit requests for model skills.
- Skill lifecycle is declared per skill as `scaffold` or `implemented` and must agree across manifest, contract and source. `context-engineering`, `setup-ai-development-skills`, `workflow`, `clarify`, `to-spec`, `to-tickets`, `domain-modelling` and `architecture-design` are implemented and the other 10 skills remain scaffold; target status remains independent and declarative.
- JSON manifest uses an array and schemaVersion, preserving existing consumers; architectureVersion=1 identifies the normative baseline. artifactInputs/artifactOutputs index artifacts without replacing prose input alternatives or dependency semantics.
- Dependencies retain required/conditional/optional semantics. External research is an optional capability with unresolved-claims fallback, never a hard skill/npm dependency.
- R13 has a “mandatory” title but SHOULD in its normative body. The scaffold preserves SHOULD rather than silently strengthening it to SHALL.
- WORKFLOW_PLAN, PROJECT_CONTEXT, CHANGE_SET and bootstrap readiness still have no complete schemas in the full baseline. Registry entries identify named-only outputs; no schemas are invented. TICKET is a record within TICKET_SET.
- Existing centralized artifact and per-skill contracts/templates remain authoritative operational references. The canonical tree in section 24 is represented using these existing paths; optional meta-skills and detailed cross-cutting guidance are not invented.
- Node >=22, frontmatter limited to name/description (JSON-quoted descriptions), declarative target descriptors and zero npm dependencies remain deliberate constraints. `skills:validate` aliases the structural validator.
- Target validation checks descriptor/manifest structure and byte equality of installed skill directories. It does not execute Cursor, Codex, Antigravity or Claude Code; live discovery remains unverified.
- Package, project installation and per-target validation are implemented. Sync, doctor, list, uninstall, overwrite, global installation, automatic routing and platform detection are not. Apart from context, bootstrap, the consultative workflow router, operational `clarify`, operational `to-spec`, operational `to-tickets`, operational `domain-modelling` and operational `architecture-design`, skill workflows remain scaffold. Semantic coverage is the nine workflow scenarios, the eleven clarify scenarios, the sixteen to-spec scenarios, the eighteen to-tickets scenarios, the eighteen domain-modelling scenarios and the eighteen architecture-design scenarios.

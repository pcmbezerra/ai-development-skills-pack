# Shared skill contract

The manifest is authoritative for catalogue, primary invocation and dependency types. Per-skill contracts define goal, accepted inputs, produced outputs, workflow boundary, constraints, quality gates and failure behaviour. Source baseline: [complete v1](../references/architecture-contract-v1.md), sections 2–5 and 11.

Primary invocation is a routing classification, not a ban on composition or automatic discovery. Model-invoked skills accept explicit requests. No platform-specific invocation flags are inferred from these classes.

Required dependencies must be present. Conditional dependencies become prerequisites only when their condition applies. Optional dependencies represent composition, not mandatory execution. Artifact flow is distinct from the dependency graph. Required and potentially required (required + conditional) edges must be acyclic. R11–R13 can recommend composition without making an optional dependency globally mandatory.

Prefer repository evidence; preserve existing decisions; distinguish facts, assumptions, decisions and recommendations. Make the smallest correct change, avoid unrelated edits and speculative dependencies, persist durable decisions, and preserve request → decision → spec → ticket → change → review traceability. Validate before claiming completion.

Project knowledge and state belong outside skills, in .ai/ or configured external artifacts. Canonical source stays tool-agnostic; target-specific distribution logic belongs under targets/. Integrations are optional capabilities with local Markdown fallback; secrets never belong in .ai/config.json. Research without external access leaves unsupported claims unresolved.

Consult [routing](routing.md) for prerequisites, [quality gates](quality-gates.md) for completion criteria, [failure](failure.md) for BLOCKED reports, [cross-cutting concerns](../references/cross-cutting.md) for security/performance/testing responsibilities, and [workflow sequences](workflows.md) for lifecycle composition.

## Skill lifecycle and scaffold boundary

Each skill declares exactly one lifecycle status, `scaffold` or `implemented`, consistently in the manifest, its contract and its source. `scaffold` means the operational workflow is pending. `implemented` requires a non-empty `Workflow` section in both contract and source and cannot retain notices that the workflow is pending or unavailable. Under amendments v1-A2, v1-A4 and v1-A5, `context-engineering`, `setup-ai-development-skills`, `workflow` and `clarify` are implemented and the other 14 skills remain scaffold.

Skill lifecycle is independent from target readiness. No installer, sync, doctor, list, automatic router, PR/release/deployment automation or platform detection is implemented. The manifest is designed to support future list/doctor/documentation/routing tests; semantic overlap testing remains future work. Node.js and Git are runtime prerequisites; Node >=22 is a scaffold choice. Production npm dependencies remain {}.

Exactly 18 runtime skills are maintained. A future meta-skills/skill-authoring may be added outside the runtime catalogue, but is not implemented here. Prototype, resolve-conflicts, large-work decision mapping, triage, PR automation, release management, deployment automation and standalone security-review/performance-review/dependency-upgrade are outside v1 (baseline section 26).

Changes to skill responsibilities, artifact schemas, routing precedence, mandatory dependencies or target architecture SHOULD be explicitly versioned. Baseline v1 is extended by amendment v1-A1 (2026-10-06), adding Claude Code as the fourth Tier 1 target; v1-A2 (2026-10-06), implementing local context and bootstrap workflows; v1-A3 (2026-10-06), implementing project-scoped target distribution; v1-A4 (2026-10-08), implementing the consultative `workflow` router; and v1-A5 (2026-10-08), implementing operational `clarify` with persisted ready and blocked decision sets. Live product compatibility remains unverified. None of these amendments introduces v2 artifact or skill contracts.

---
name: context-engineering
description: "Discovers and maintains project context from repository evidence. Use when project context is missing or stale and a later skill needs it."
---

# context-engineering

Status: implemented; the operational workflow is available.

Read the [contract](references/contract.md) and the [failure contract](references/failure.md) before execution.

## Workflow

1. Resolve the repository root from the supplied repository or active workspace. Verify that it is accessible and unambiguous. Otherwise return `BLOCKED` in the contracted format without writing.
2. Read any existing `.ai/project.md`, `.ai/architecture.md`, `.ai/standards.md`, `.ai/tech-stack.md` and `.ai/business-rules.md`. Collect relevant local evidence from explicit configuration and decisions, dependency/build manifests, source layout, maintained documentation and tests. Do not copy values from environment files, credentials, tokens, connection strings or other secret-bearing inputs; record only their existence and necessary architectural effect.
3. Reconcile statements in this order: explicit decisions and configuration; executable or structural evidence; current documentation; agent inference. Keep facts, inferences, recommendations and pending gaps in separate labelled sections or bullets; never present a recommendation as current state. Preserve existing content unless stronger evidence contradicts it.
4. If an explicit decision materially conflicts with other evidence and local evidence does not resolve the conflict, stop before writing. Return `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` and `Recommended next skill/action`; never overwrite the decision.
5. Create missing context files or minimally update affected ones under `.ai/`. Write only the five canonical documents. Follow existing document structure; in a new file, use concise evidence-backed facts and separate labelled inferences, recommendations or pending gaps only when present. Do not create a `PROJECT_CONTEXT` schema, template or wrapper artifact.
6. Inspect the diff. Remove any secret values, reject changes outside the five documents and leave unchanged content byte-for-byte intact. Re-evaluate the same evidence: if inputs are unchanged, the second execution must produce no diff.
7. Report which files were created, updated or unchanged; the evidence used; labelled inferences, recommendations and pending gaps; and environment or platform assumptions not verified. The five documents together are the named `PROJECT_CONTEXT` output.

## Failure behaviour

Return the [contracted `BLOCKED` result](references/failure.md) before writing when the repository root is unavailable or ambiguous, a material conflict is unresolved, secret-safe processing is not possible, or the five-document write boundary cannot be maintained.

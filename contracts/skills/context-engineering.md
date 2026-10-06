# context-engineering

Status: implemented. Primary invocation: model.

## Goal

Discover and maintain project context.

Consumes:

```text
repository evidence
project configuration
existing documentation
```

Produces/updates:

```text
PROJECT_CONTEXT
```

Dependencies:

```text
none
```

## Workflow

1. Resolve an accessible, unambiguous repository root and collect relevant local evidence without copying secret values. If the root or secret-safe processing cannot be established, return the contracted `BLOCKED` result before writing.
2. Reconcile material statements using this precedence: explicit decisions and configuration; executable or structural evidence; current documentation; labelled inference. Preserve non-conflicting content. Keep facts, inferences, recommendations and pending gaps explicitly labelled and separate. An unresolved material conflict returns `BLOCKED` before any write and never overwrites a decision.
3. Create or minimally update only `.ai/project.md`, `.ai/architecture.md`, `.ai/standards.md`, `.ai/tech-stack.md` and `.ai/business-rules.md`. Do not create a `PROJECT_CONTEXT` schema, template or wrapper artifact.
4. Review the diff for the five-document boundary, secret exclusion, preservation and idempotence, then report created, updated and unchanged files with their evidence and unresolved gaps.

## Quality gates

The repository root is verified; every material fact is traceable to local evidence or labelled as inference; facts, inferences, recommendations and pending gaps are separate; stronger evidence wins; non-conflicting content is preserved; secrets are absent; only the five canonical documents change; and an unchanged second execution has an empty diff. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. Return it before writes when the root is unavailable or ambiguous, a material conflict is unresolved, sensitive data cannot be handled safely, or the allowed write boundary cannot be maintained.

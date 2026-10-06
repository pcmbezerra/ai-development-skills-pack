# setup-ai-development-skills

Status: implemented. Primary invocation: user.

## Goal

Bootstrap repository for the pack.

Consumes:

```text
repository
existing configuration
```

Produces:

```text
.ai/config.json
initial project context
bootstrap readiness result
```

Dependencies:

```text
context-engineering
```

Restrictions:

```text
MUST NOT modify application code
MUST NOT overwrite existing project decisions
```

## Workflow

1. Resolve one accessible repository root. Inspect `.ai/config.json`, repository evidence and existing decisions before writing. If the root is ambiguous or inaccessible, return `BLOCKED`.
2. If `.ai/config.json` exists, parse it without rewriting it. Require version `1`, a non-empty `issueTracker`, and non-empty `specPath`, `ticketPath`, `adrPath` and `docsPath` strings that resolve within the root. Preserve all valid values and unknown extensions. Invalid JSON, an incompatible or incomplete model, or an escaping path returns `BLOCKED` with the original bytes unchanged.
3. If configuration is absent and no explicit repository evidence requires different values, create `.ai/config.json` with version `1`, local issue tracking and the canonical paths `.ai/artifacts/specs`, `.ai/artifacts/tickets`, `.ai/decisions` and `docs`. When explicit evidence requires other safe values, use those values instead of the defaults.
4. Invoke the required `context-engineering` skill using the resolved root and validated configuration. Propagate its `BLOCKED` result or execution failure; neither permits `READY`.
5. Revalidate the configuration and require `.ai/project.md`, `.ai/architecture.md`, `.ai/standards.md`, `.ai/tech-stack.md` and `.ai/business-rules.md`. Review the diff and reject changes to application code, build configuration or existing decisions.
6. Only after every gate passes, report `Status: READY` with the configuration path, the five context paths and validation evidence. Do not persist a readiness artifact or schema.

## Quality gates

Preserve existing configuration and project decisions; produce initial context through required context-engineering. Application code is outside bootstrap scope. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. Report it before unsafe writes, preserve invalid configuration byte for byte and never translate a blocked or failed dependency into `READY`.

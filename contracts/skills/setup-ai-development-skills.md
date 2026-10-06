# setup-ai-development-skills

Status: scaffold. Primary invocation: user.

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

Pending implementation. Read inputs and the shared artifact contract; operational steps are outside this scaffold.

## Quality gates

Preserve existing configuration and project decisions; produce initial context through required context-engineering. Application code is outside bootstrap scope. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. This scaffold does not execute the workflow or produce ready artifacts.

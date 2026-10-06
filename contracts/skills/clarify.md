# clarify

Status: scaffold. Primary invocation: user.

## Goal

Resolve material ambiguities.

Consumes:

```text
request
project context
existing decisions
```

Produces:

```text
DECISION_SET
```

Optional dependency:

```text
context-engineering
```

## Workflow

Pending implementation. Read inputs and the shared artifact contract; operational steps are outside this scaffold.

## Quality gates

A Decision Set is ready only when no unresolved question materially affects the requested next step. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. This scaffold does not execute the workflow or produce ready artifacts.

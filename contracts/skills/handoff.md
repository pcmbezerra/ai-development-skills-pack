# handoff

Status: scaffold. Primary invocation: user.

## Goal

Transfer verified work state between agents/sessions.

Consumes:

```text
current state
existing artifacts
change state
```

Produces:

```text
HANDOFF
```

Dependencies:

```text
none
```

## Workflow

Pending implementation. Read inputs and the shared artifact contract; operational steps are outside this scaffold.

## Quality gates

Include verified state only, with validation, known issues, constraints and next actions. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. This scaffold does not execute the workflow or produce ready artifacts.

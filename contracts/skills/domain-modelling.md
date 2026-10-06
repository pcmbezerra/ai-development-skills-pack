# domain-modelling

Status: scaffold. Primary invocation: model.

## Goal

Model business concepts and invariants when warranted.

Consumes:

```text
SPEC or DECISION_SET
PROJECT_CONTEXT
```

Produces:

```text
DOMAIN_MODEL
```

Dependencies:

```text
none
```

Invoked only when domain complexity justifies it.

## Workflow

Pending implementation. Read inputs and the shared artifact contract; operational steps are outside this scaffold.

## Quality gates

Record business terminology, relationships, invariants and ambiguities. Introduce DDD constructs only when domain complexity justifies them. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. This scaffold does not execute the workflow or produce ready artifacts.

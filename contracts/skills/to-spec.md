# to-spec

Status: scaffold. Primary invocation: user.

## Goal

Convert resolved requirements into implementation-ready specification.

Consumes:

```text
DECISION_SET
PROJECT_CONTEXT
RESEARCH_REPORT optional
```

Produces:

```text
SPEC
```

Dependencies:

```text
clarify when material ambiguity exists
```

## Workflow

Pending implementation. Read inputs and the shared artifact contract; operational steps are outside this scaffold.

## Quality gates

Apply the [specification gate](../quality-gates.md). Preserve input provenance and validation evidence. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. This scaffold does not execute the workflow or produce ready artifacts.

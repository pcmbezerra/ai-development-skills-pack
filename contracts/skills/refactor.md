# refactor

Status: scaffold. Primary invocation: user.

## Goal

Improve internal structure without changing external behaviour.

Consumes:

```text
refactor objective
behaviour baseline
PROJECT_CONTEXT
tests
```

Produces:

```text
CHANGE_SET
IMPLEMENTATION_REPORT
TEST_EVIDENCE
```

Invariant:

```text
external behaviour MUST NOT change
```

unless explicitly authorized.

## Workflow

Pending implementation. Read inputs and the shared artifact contract; operational steps are outside this scaffold.

## Quality gates

Apply the [implementation gate](../quality-gates.md). Preserve input provenance and validation evidence. Establish a behaviour baseline; external behaviour stays unchanged unless explicitly authorized. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. This scaffold does not execute the workflow or produce ready artifacts.

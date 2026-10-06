# implement

Status: scaffold. Primary invocation: user.

## Goal

Execute a defined change.

Consumes one or more:

```text
TICKET
SPEC
DIAGNOSIS_REPORT
explicit change request
```

Also consumes:

```text
PROJECT_CONTEXT
```

Produces:

```text
CHANGE_SET
IMPLEMENTATION_REPORT
TEST_EVIDENCE
```

May invoke:

```text
tdd
edge-case-analysis
code-review
context-engineering
```

Restrictions:

```text
smallest correct change
no unrelated changes
no speculative abstractions
```

## Workflow

Pending implementation. Read inputs and the shared artifact contract; operational steps are outside this scaffold.

## Quality gates

Apply the [implementation gate](../quality-gates.md). Preserve input provenance and validation evidence. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. This scaffold does not execute the workflow or produce ready artifacts.

# tdd

Status: scaffold. Primary invocation: model.

## Goal

Execute Red → Green → Refactor workflow.

Consumes:

```text
acceptance criteria
ticket/spec
existing tests
```

Produces:

```text
TEST_EVIDENCE
test changes
implementation changes when composed by implement
```

Workflow:

```text
RED
↓
GREEN
↓
REFACTOR
```

When explicit TDD is requested, RED SHALL be demonstrated before implementation.

## Workflow

Pending implementation. Read inputs and the shared artifact contract; operational steps are outside this scaffold.

## Quality gates

Explicit TDD requires demonstrated RED before implementation, then GREEN and REFACTOR. TEST_EVIDENCE records failures, skipped tests and environment limitations. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. This scaffold does not execute the workflow or produce ready artifacts.

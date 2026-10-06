# diagnose

Status: scaffold. Primary invocation: user.

## Goal

Identify root cause of unknown failures.

Consumes:

```text
symptom
repository
PROJECT_CONTEXT
logs/tests/runtime evidence when available
```

Produces:

```text
DIAGNOSIS_REPORT
```

May invoke:

```text
tdd
```

to establish regression/reproduction tests.

Diagnosis SHALL precede a fix when root cause is unknown.

## Workflow

Pending implementation. Read inputs and the shared artifact contract; operational steps are outside this scaffold.

## Quality gates

Distinguish confirmed root cause, probable root cause and unconfirmed hypothesis. Establish reproduction and regression evidence before recommending a fix. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. This scaffold does not execute the workflow or produce ready artifacts.

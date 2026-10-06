# edge-case-analysis

Status: scaffold. Primary invocation: model.

## Goal

Identify untested boundary/adversarial scenarios.

Consumes:

```text
SPEC
CHANGE_SET
DOMAIN_MODEL optional
existing tests
```

Produces:

```text
EDGE_CASE_REPORT
```

May propose tests.

It SHALL NOT silently broaden product behaviour.

## Workflow

Pending implementation. Read inputs and the shared artifact contract; operational steps are outside this scaffold.

## Quality gates

Report expected behaviour and existing/missing coverage per finding. Proposed tests must not silently broaden product behaviour. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. This scaffold does not execute the workflow or produce ready artifacts.

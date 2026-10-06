# workflow

Status: scaffold. Primary invocation: user.

## Goal

Route work to the correct skill/workflow.

Consumes:

```text
user request
project context
available artifacts
skill manifest
```

Produces:

```text
WORKFLOW_PLAN
```

Dependencies:

```text
none
```

Restrictions:

```text
MUST NOT perform implementation
MUST NOT modify application code
```

## Workflow

Pending implementation. Read inputs and the shared artifact contract; operational steps are outside this scaffold.

## Quality gates

Recommend a sequence using explicit invocation precedence and blocking prerequisites. Application code and implementation remain outside routing scope. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. This scaffold does not execute the workflow or produce ready artifacts.

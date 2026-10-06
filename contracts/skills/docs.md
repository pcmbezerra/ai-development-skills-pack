# docs

Status: scaffold. Primary invocation: user.

## Goal

Create/update documentation from evidence.

Consumes:

```text
repository evidence
CHANGE_SET
SPEC optional
ARCHITECTURE_DESIGN optional
existing documentation
```

Produces:

```text
documentation changes
DOC_UPDATE
```

Documentation SHALL NOT invent implementation state.

## Workflow

Pending implementation. Read inputs and the shared artifact contract; operational steps are outside this scaffold.

## Quality gates

Apply the [documentation gate](../quality-gates.md). Preserve input provenance and validation evidence. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. This scaffold does not execute the workflow or produce ready artifacts.

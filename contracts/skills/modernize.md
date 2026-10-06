# modernize

Status: scaffold. Primary invocation: user.

## Goal

Plan and orchestrate legacy modernization.

Consumes:

```text
PROJECT_CONTEXT
modernization objective
existing architecture
runtime/dependency information
```

Produces:

```text
MODERNIZATION_PLAN
```

May invoke:

```text
diagnose
research
architecture-design
tdd
to-tickets
```

Implementation SHOULD subsequently flow through:

```text
to-tickets
→ implement
```

`modernize` SHALL NOT perform an uncontrolled "upgrade everything" operation.

## Workflow

Pending implementation. Read inputs and the shared artifact contract; operational steps are outside this scaffold.

## Quality gates

Apply the [modernization gate](../quality-gates.md). Preserve input provenance and validation evidence. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. This scaffold does not execute the workflow or produce ready artifacts.

# to-tickets

Status: scaffold. Primary invocation: user.

## Goal

Decompose specification into executable work.

Consumes:

```text
SPEC
ARCHITECTURE_DESIGN optional
DOMAIN_MODEL optional
```

Produces:

```text
TICKET_SET
```

Dependencies:

```text
none
```

A blocked SPEC SHALL NOT produce implementation-ready tickets.

## Workflow

Pending implementation. Read inputs and the shared artifact contract; operational steps are outside this scaffold.

## Quality gates

Apply the [ticket gate](../quality-gates.md). Preserve input provenance and validation evidence. Executable ticket sets require a ready SPEC; ticket dependencies must be explicit and acyclic. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. This scaffold does not execute the workflow or produce ready artifacts.

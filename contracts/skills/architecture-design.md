# architecture-design

Status: scaffold. Primary invocation: user.

## Goal

Define technical solution and architectural decisions.

Consumes:

```text
SPEC
PROJECT_CONTEXT
DOMAIN_MODEL optional
RESEARCH_REPORT optional
```

Produces:

```text
ARCHITECTURE_DESIGN
ADR optional
```

Dependencies:

```text
research when external facts affect decisions
domain-modelling when business invariants affect design
```

## Workflow

Pending implementation. Read inputs and the shared artifact contract; operational steps are outside this scaffold.

## Quality gates

Apply the [architecture gate](../quality-gates.md). Preserve input provenance and validation evidence. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. This scaffold does not execute the workflow or produce ready artifacts.

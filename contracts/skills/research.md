# research

Status: scaffold. Primary invocation: user.

## Goal

Establish externally verifiable technical facts.

Consumes:

```text
research question
project context
decision context
```

Produces:

```text
RESEARCH_REPORT
```

Dependencies:

```text
external research capability when required
```

External access SHALL be optional.

If unavailable, unsupported claims SHALL remain explicitly unresolved.

## Workflow

Pending implementation. Read inputs and the shared artifact contract; operational steps are outside this scaffold.

## Quality gates

Clearly separate facts from recommendations, cite evidence, and leave unsupported claims unresolved when external access is unavailable. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. This scaffold does not execute the workflow or produce ready artifacts.

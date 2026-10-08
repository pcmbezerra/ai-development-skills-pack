# workflow

Status: implemented. Primary invocation: user.

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

1. Read the user request, the skill manifest, the routing rules and the available artifacts. Consult project context only when repository facts can materially change the route; when such context is missing or insufficient, place `context-engineering` first. Do not add it to self-contained requests or make it a global dependency.
2. Classify the intent using R1–R17. Explicit invocation wins unless a blocking prerequisite applies. Route material ambiguity to `clarify`, unknown external facts to `research`, an unknown failure to `diagnose`, and a clear bounded change to `implement`.
3. Before routing an artifact downstream, inspect only its metadata, required sections and applicable quality gate. Route a `draft`, `blocked`, incomplete or incompatible artifact back to its producing skill.
4. Build one preferred sequence containing only necessary steps. Include conditional steps only when their declared condition applies; present alternatives only when a material decision remains, with `clarify` as the first applicable step.
5. For each step, report its reason, prerequisites, lifecycle availability and condition. Report the next executable action and keep the presentation non-canonical: `WORKFLOW_PLAN` remains a named-only response and is not persisted.
6. Inspect every planned skill's lifecycle in the manifest. When a required step is `scaffold` or another prerequisite blocks progress, still report the complete route, identify the first unavailable step and append the contracted `Status: BLOCKED` result.
7. End after reporting the plan. Do not invoke planned skills, produce their artifacts, modify application code or write repository files.

## Quality gates

The result contains one minimal, justified sequence; respects explicit invocation precedence, prerequisites, artifact readiness and skill lifecycle; identifies the next executable action and first blocker; and keeps `WORKFLOW_PLAN` named-only and non-persistent. Application code, downstream execution and artifact production remain outside routing scope. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. Include the plan already determined, stop at the first unavailable step and never translate a blocked prerequisite or scaffold skill into executable readiness.

---
name: workflow
description: "Route work to the correct skill/workflow."
---

# workflow

Status: implemented; the operational workflow is available.

Before execution, read its [contract](../../../contracts/skills/workflow.md) for inputs, outputs, constraints, gates and failure behaviour.

Consult the [manifest](../../../manifest/skills.json) for invocation and dependencies, the [shared skill contract](../../../contracts/skill-contract.md) for composition, the [artifact contract](../../../contracts/artifacts.md) for persistence, and [routing rules](../../../contracts/routing.md) for prerequisites.

## Workflow

1. Read the request, manifest, routing rules and available artifacts. Read project context only when repository facts can materially change the route. If material context is missing, start with `context-engineering`; do not add it to a self-contained request.
2. Apply R1–R17 in order. Prefer an explicit invocation unless blocked; otherwise distinguish material ambiguity, unknown external facts, unknown failure causes, clear bounded changes and broader lifecycle work.
3. For any artifact needed by the route, check only its metadata, required sections and applicable gate. Send a `draft`, `blocked`, incomplete or incompatible artifact back to its producer.
4. Produce one preferred minimal sequence. Add conditional steps only when their condition applies. If a material decision remains, place `clarify` first instead of presenting equally ranked plans.
5. For every step, state its reason, prerequisites, lifecycle availability and condition. Identify the next executable action. This presentation is not a schema or template; `WORKFLOW_PLAN` remains a named-only response in the conversation.
6. If a required skill is `scaffold` or another prerequisite blocks progress, show the complete route, identify the first unavailable step and append `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` and `Recommended next skill/action`.
7. Stop after the plan. Never invoke the listed skills, produce downstream artifacts, persist the plan, modify application code or write repository files.

## Failure behaviour

Return the [contracted `BLOCKED` result](../../../contracts/failure.md) after the plan when the first required step is unavailable or a prerequisite is blocked. Never present a scaffold skill or blocked artifact as executable.

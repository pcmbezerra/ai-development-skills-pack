---
name: workflow
description: "Recommends the smallest skill sequence and does not execute it. Use when several skills could apply or the order of work is unclear."
---

# workflow

Status: implemented; the operational workflow is available.

Before execution, read its [contract](../../../contracts/skills/workflow.md) for inputs, outputs, constraints, gates and failure behaviour.

Consult the [manifest](../../../manifest/skills.json) for invocation and dependencies, the [shared skill contract](../../../contracts/skill-contract.md) for composition, the [artifact contract](../../../contracts/artifacts.md) for persistence, and [routing rules](../../../contracts/routing.md) for prerequisites.

## Workflow

1. Resolve the request and available inputs as specified by the contract. Consult project context only when repository facts can materially change the route; otherwise keep the request self-contained. Never copy secret values from context or artifacts—mention only their existence and necessary architectural effect.
2. Apply R1–R17 and the artifact-readiness rules in the contract. Send unusable artifacts back to their producer and put `clarify` first when a material decision remains.
3. Return one preferred minimal sequence. For every step, state its reason, applicable rule or evidence, prerequisites, lifecycle availability and condition; then identify the next executable action. Keep `WORKFLOW_PLAN` as a named-only response, not a schema, template or persisted file.
4. Inspect lifecycle status for every planned skill. If a required step is `scaffold` or otherwise blocked, show the complete route, identify the first unavailable step and append `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` and `Recommended next skill/action`.
5. Stop after the plan. Never invoke the listed skills, produce downstream artifacts, persist the plan, modify application code or write repository files.

## Failure behaviour

Return the [contracted `BLOCKED` result](../../../contracts/failure.md) after the plan when the first required step is unavailable or a prerequisite is blocked. Never present a scaffold skill or blocked artifact as executable.

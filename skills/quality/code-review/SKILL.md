---
name: code-review
description: "Reviews a non-trivial change and does not edit code. Use when an implementation or refactor should be reviewed before it is treated as complete."
---

# code-review

Status: implemented; the operational workflow is available.

Before execution, read its [contract](../../../contracts/skills/code-review.md) for inputs, outputs, constraints, gates and failure behaviour.

Consult the [manifest](../../../manifest/skills.json) for invocation and dependencies, the [shared skill contract](../../../contracts/skill-contract.md) for composition, the [artifact contract](../../../contracts/artifacts.md) for persistence, and [routing rules](../../../contracts/routing.md) for prerequisites.

## Workflow

1. Read the project context and the change cited as `working tree`. A specification, a ticket and test evidence are optional. A glossary entry is not a change. Never copy secret values; record only their existence and effect. Record blockers through step 4 and continue; the only BLOCKED return is step 7.
2. When project context is missing, record that blocker and recommend `context-engineering`. Do not run that skill, do not add it as a dependency, write no file and do not authorize implementation.
3. When no change is present to review, record that blocker and recommend `implement`. Do not run that skill, write no file and do not authorize implementation.
4. Do not invent a finding or a decision. When a conflict with an existing decision appears, including ADR `0001`, record a decision blocker that recommends `clarify`. Preserve the ADR. Do not extend ADR `0001`.
5. When no blocker remains, review the working-tree change in this order: correctness, regressions, security, requirements, architecture, project conventions, maintainability, tests, style. Do not write a `CHANGE_SET` file and do not change code. Write one review report for that objective under `.ai/artifacts/reviews/`, using the existing template and frontmatter and including every required section. Set status `ready` and `created_by` to `code-review`. Set the `Verdict` section to `PASS`, `PASS_WITH_NOTES`, `CHANGES_REQUIRED` or `BLOCKED`. Do not leave template draft markers. List the consumed artifact identifiers in `inputs`.
6. On a later execution of the same objective, update that same review report and increment `version`. Do not create a duplicate and do not delete an existing report. When the consumed inputs are unchanged, keep the material sections.
7. When any blocker remains, write no file from this attempt. Return one BLOCKED report with `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` and `Recommended next skill/action`, and name every missing prerequisite. `Evidence` cites the input for each blocker. Do not authorize implementation. Do not delete an existing report.
8. Stop. Do not invoke `implement`, `tdd`, `docs` or any other skill. Do not write the glossary, `CONTEXT.md`, any other artifact, or extend ADR `0001`.

## Failure behaviour

Return the [contracted `BLOCKED` result](../../../contracts/failure.md) when any blocker remains. Name every missing prerequisite. `Evidence` cites the input for each blocker. Missing project context recommends `context-engineering`. A missing change recommends `implement`. A conflict with an existing decision recommends `clarify`. Do not leave a review report from this attempt. Do not delete an existing report. The file this skill writes is a ready review report. Never present the BLOCKED result as a ready review report.

---
name: tdd
description: "Execute Red \u2192 Green \u2192 Refactor workflow."
---

# tdd

Status: implemented; the operational workflow is available.

Before execution, read its [contract](../../../contracts/skills/tdd.md) for inputs, outputs, constraints, gates and failure behaviour.

Consult the [manifest](../../../manifest/skills.json) for invocation and dependencies, the [shared skill contract](../../../contracts/skill-contract.md) for composition, the [artifact contract](../../../contracts/artifacts.md) for persistence, and [routing rules](../../../contracts/routing.md) for prerequisites.

## Workflow

1. Read the invoked objective and every defining input that is present: acceptance criteria, a ticket and a specification. Existing tests are an input when they are present. A glossary entry is not an objective and does not by itself authorize a test change. Never copy secret values; record only their existence and effect. Record blockers through step 3 and continue; the only BLOCKED return is step 6.
2. When no acceptance criteria are present and neither a ticket nor a specification defines the objective, record that blocker. When a ticket defines the objective and that ticket is absent or has any status other than `ready`, record a ticket blocker that recommends `to-tickets`. When a specification defines the objective and that specification is missing, `draft`, `blocked` or `superseded`, record a specification blocker that recommends `to-spec`. Absence of existing tests is not a blocker. RED starts from that absence. Do not run the recommended skill and do not add it as a dependency.
3. Do not invent behaviour, a decision or a test outcome. When a material ambiguity or a conflict with an existing decision appears, including ADR `0001`, record a decision blocker that recommends `clarify`. Preserve the existing decision. Do not extend ADR `0001`. Leave a rejected alternative out of the test change.
4. When no blocker remains, execute RED, then GREEN, then REFACTOR. The REFACTOR step stays inside this skill and does not invoke `refactor`. When TDD was explicitly requested, record the demonstrated RED in the evidence before any implementation change. Apply the test change in the working tree. Apply an implementation change only when `implement` composes this execution. A direct invocation does not cause `implement` to compose this skill and does not apply an implementation change. Write one test-evidence file for that objective under `.ai/artifacts/tests/`, using the existing template and frontmatter and including every required information section. Set status `ready` and `created_by` to `tdd`. Do not leave template draft markers. List the consumed artifact identifiers in `inputs`. Do not rewrite a test-evidence file whose `created_by` is `implement`. Do not write a `CHANGE_SET` file.
5. On a later execution of the same objective, update that same test-evidence file and increment `version`. Do not create a duplicate and do not delete an existing evidence file. When the consumed inputs are unchanged, keep the material sections and do not apply the change again. When the inputs change, apply only the additional test change and update the same file.
6. When any blocker remains, or the cycle cannot be completed without invention, write no file and apply no change from this attempt. Return one BLOCKED report with `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` and `Recommended next skill/action`, and name every missing prerequisite. `Evidence` cites the input for each blocker. Do not delete an existing evidence file.
7. Stop. Do not invoke `implement`, `code-review`, `refactor` or any other skill. Do not write the glossary, `CONTEXT.md`, any other artifact, or extend ADR `0001`.

## Failure behaviour

Return the [contracted `BLOCKED` result](../../../contracts/failure.md) when any blocker remains or the cycle cannot be completed without invention. Name every missing prerequisite. `Evidence` cites the input for each blocker. A ticket that defines the objective and is not `ready` recommends `to-tickets`. A specification that defines the objective and is not `ready` recommends `to-spec`. A conflict with an existing decision recommends `clarify`. Do not leave a test-evidence file or a change from this attempt. Do not delete an existing evidence file. The file this skill writes is a ready test-evidence file. Never present the BLOCKED result as ready evidence.

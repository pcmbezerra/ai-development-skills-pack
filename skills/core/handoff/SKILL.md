---
name: handoff
description: "Transfers verified work state to another agent or session. Use when work is incomplete, context may be lost, or an explicit handoff was requested."
---

# handoff

Status: implemented; the operational workflow is available.

Before execution, read its [contract](references/contract.md) for inputs, outputs, constraints, gates and failure behaviour.

Consult that contract for invocation and dependencies, [handoff.md](assets/handoff.md) for persistence, and [routing rules](references/routing.md) for prerequisites.

## Workflow

1. Read the current state, the existing artifacts and the change state. A glossary entry is not current state. Never copy secret values; record only their existence and effect. Invocation is an explicit transfer under R17. Record blockers through step 5 and continue; the only BLOCKED return is step 8.
2. A handoff can be written only from verified current state. When current state is missing, record that blocker. When the missing state is project context, recommend `context-engineering`. Otherwise recommend supplying the verified current state and retrying `handoff`. Do not run another skill and do not add a dependency.
3. When the change state was not observed, record that blocker and recommend capturing the working-tree change state, then retrying `handoff`. An observed clean tree is change state. Do not invent a diff.
4. When the existing-artifact inventory was not observed, record that blocker and recommend inventorying the artifacts, then retrying `handoff`. An observed empty inventory is an inventory. Do not invent an artifact.
5. Do not invent a decision or treat an unverified external fact as verified. When the handoff would have to resolve a material ambiguity or a conflict with an existing decision, including ADR `0001`, record a decision blocker that recommends `clarify`. Preserve the ADR. Do not extend ADR `0001`. When a required section would have to state an unverified external fact as verified, record an external-fact blocker that recommends `research`. Do not run `research` and do not access the network.
6. A blocked, draft or otherwise non-ready input is verified state about that input. It does not authorize implementation. Record its status. Do not treat it as a successful result and do not recommend `implement` while it remains the earliest open prerequisite.
7. When no blocker remains, write one handoff for that objective under `.ai/artifacts/handoffs/`, using the existing template and frontmatter and including every required section. Set status `ready` and `created_by` to `handoff`. Do not leave template draft markers. List the consumed artifact identifiers in `inputs`. Include validation, known issues, constraints and next actions. State that a non-ready input does not authorize implementation. A completed frontier is still transferred when current state, artifacts and change state were observed. On a later execution of the same objective, update that same file and increment `version`. The objective is the transfer subject named in the current state. Do not create a duplicate and do not delete an existing handoff. When the consumed current state, artifacts and change state are unchanged, keep the material sections.
8. When any blocker remains, write no file from this attempt. Return one BLOCKED report with `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` and `Recommended next skill/action`, and name every missing prerequisite. `Evidence` cites the input for each blocker. Recommend the skill or action for the earliest blocker, in this order: missing current state, then unobserved change state, then unobserved artifact inventory, then a decision problem, then an external fact. Do not authorize implementation. Do not delete an existing handoff. Do not modify application code.
9. Stop. Do not invoke the next skill. A ready handoff authorizes a later session to resume from the verified artifacts it cites. Name at most the first applicable next skill in Next Actions and do not run it. Do not write the glossary, `CONTEXT.md`, any other artifact, or extend ADR `0001`.

## Failure behaviour

Return the [contracted `BLOCKED` result](references/failure.md) when any blocker remains. Name every missing prerequisite. `Evidence` cites the input for each blocker. Missing project context recommends `context-engineering`. Any other missing current state recommends supplying that state and retrying `handoff`. Unobserved change state recommends capturing it and retrying `handoff`. An unobserved artifact inventory recommends inventorying it and retrying `handoff`. A decision problem recommends `clarify`. An external fact recommends `research`. Do not leave a handoff file from this attempt. Do not delete an existing handoff. Do not modify application code. The file this skill writes is a ready handoff. Never present the BLOCKED result as a ready handoff.

---
name: to-spec
description: "Writes one ready specification from resolved decisions and project context. Use when decisions are resolved and the next step is a specification, not code."
---

# to-spec

Status: implemented; the operational workflow is available.

Before execution, read its [contract](../../../contracts/skills/to-spec.md) for inputs, outputs, constraints, gates and failure behaviour.

Consult the [manifest](../../../manifest/skills.json) for invocation and dependencies, the [shared skill contract](../../../contracts/skill-contract.md) for composition, the [artifact contract](../../../contracts/artifacts.md) for persistence, and [routing rules](../../../contracts/routing.md) for prerequisites.

## Workflow

1. Read the decision set, the project context and the research report when it exists. A glossary entry is not a decision. Never copy secret values; record only their existence and architectural effect. Record blockers through step 6 and continue; the only BLOCKED return is step 8.
2. A specification can be written only from a decision set whose status is `ready`. When the decision set is missing, `draft`, `blocked` or `superseded`, record a decision-set blocker that recommends `clarify`.
3. When project context is missing, record that blocker and recommend `context-engineering`. Do not run that skill and do not add it as a dependency.
4. Use a research report as an optional input. Use findings from a `ready` report as evidence, including for scope, behaviour, architecture, data model, security and acceptance criteria. A recommendation in that report becomes a requirement only when a resolved decision already adopted it. A missing report does not block when the `ready` decision set leaves no external fact that can change the specification. When an external fact can still change the specification, or a report is not `ready` and its unknowns can still change the specification, record an external-fact blocker that recommends `research`. Do not run `research`, and do not access the network to do so.
5. Do not invent a business or architectural decision. When a material ambiguity, a premise that can still change the specification, or a conflict with an existing decision appears, record a decision-set blocker that recommends `clarify`. Preserve the existing decision. Keep a premise labelled as a premise; it does not become a requirement or an acceptance criterion. Leave a rejected alternative out of the requirements.
6. Do not reopen a question that the decision set, repository evidence, project context or a `ready` research report already answers. Limit scope, behaviour, architecture, data model, security and acceptance criteria to those inputs. Cite the input used for each requirement and, for each blocker, in `Evidence`.
7. When no blocker remains and the specification gate passes, write one specification for that objective under `.ai/artifacts/specs/`, using the existing template and frontmatter and including every required section. Set status `ready`. That ready specification is the only file this skill writes. Record an open question that cannot change the requested next step under Open Questions, and state there that no blocking question remains. List the consumed artifact identifiers in `inputs`. On a later execution of the same objective, update that same file and increment `version`. The objective is the decision set objective; the specification that already cites that decision set is the specification for it. Do not create a duplicate. When the consumed decision set, project context and research report are unchanged, keep the material sections, status, scope, requirements and acceptance criteria unchanged.
8. When any blocker remains, write no file. Return one BLOCKED report with `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` and `Recommended next skill/action`, and name every missing prerequisite. `Evidence` cites the input for each blocker. Recommend the skill for the earliest blocker, in this order: missing project context, then a decision-set problem, then an external fact.
9. Stop. When a specification was written, report its path, status and whether the requested next step is authorized. A `ready` specification authorizes a next step whose existing routing prerequisite is a ready specification. Recommend at most the first applicable skill: `domain-modelling` when R8 applies, otherwise `architecture-design` when R9 applies, otherwise `to-tickets` when the requested next step is decomposition. When the requester did not ask for a step beyond the specification, report that it is `ready` and which downstream consumer the canonical sequence would indicate. Do not invoke the recommended skill. Do not write the glossary, `CONTEXT.md`, any other artifact, or extend ADR `0001`.

## Failure behaviour

Return the [contracted `BLOCKED` result](../../../contracts/failure.md) when any blocker remains. Name every missing prerequisite. `Evidence` cites the input for each blocker. Recommend the earliest blocker: missing project context recommends `context-engineering`; a decision-set problem recommends `clarify`; an external fact recommends `research`. Do not leave a specification file. The only file this skill writes is a ready specification. Never present the BLOCKED result as a ready specification.

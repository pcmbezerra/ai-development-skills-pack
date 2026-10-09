# to-spec

Status: implemented. Primary invocation: user.

## Goal

Convert resolved requirements into implementation-ready specification.

Consumes:

```text
DECISION_SET
PROJECT_CONTEXT
RESEARCH_REPORT optional
```

Produces:

```text
SPEC
```

Dependencies:

```text
clarify when material ambiguity exists
```

Restrictions:

```text
MUST NOT invent a business or architectural decision
MUST NOT persist a draft, blocked or partial specification
MUST NOT invoke the recommended skill
MUST NOT modify application code
```

## Workflow

1. Read the decision set, the project context and the research report when it exists. A glossary entry is not a decision. Never copy secret values; record only their existence and architectural effect.
2. Write a specification only from a decision set whose status is `ready`. When the decision set is missing, `draft`, `blocked` or `superseded`, return BLOCKED and recommend `clarify`. Do not write a specification.
3. When project context is missing, return BLOCKED and recommend `context-engineering`. Do not run that skill and do not add it as a dependency.
4. Use a research report as an optional input. Use findings from a `ready` report as evidence. A recommendation in that report becomes a requirement only when a resolved decision already adopted it. A missing report does not block when the `ready` decision set leaves no external fact that can change the specification. When an external fact can still change the specification, or a report is not `ready` and its unknowns can still change the specification, return BLOCKED and recommend `research`. Do not run `research`, and do not access the network to do so.
5. Do not invent a business or architectural decision. When a material ambiguity, a premise that can still change the specification, or a conflict with an existing decision appears, return BLOCKED and recommend `clarify`. Preserve the existing decision. Keep a premise labelled as a premise; it does not become a requirement or an acceptance criterion. Leave a rejected alternative out of the requirements.
6. Do not reopen a question that the decision set, repository evidence or project context already answers. Limit scope, behaviour, architecture, data model, security and acceptance criteria to those inputs. Cite the input used for each requirement.
7. When the specification gate passes, write one specification for that objective under `.ai/artifacts/specs/`, using the existing template and frontmatter and including every required section. Set status `ready`. Record an open question that cannot change the requested next step under Open Questions, and state there that no blocking question remains. List the consumed artifact identifiers in `inputs`. On a later execution of the same objective, update that same file and increment `version`. The objective is the decision set objective; the specification that already cites that decision set is the specification for it. Do not create a duplicate. Change a requirement only when the consumed decision set, project context or research report has changed.
8. When the gate does not pass, do not write a `draft`, `blocked` or partial specification. Return one BLOCKED report with `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` and `Recommended next skill/action`, and name every missing prerequisite. Recommend the skill for the earliest blocker, in this order: missing project context, then a decision-set problem, then an external fact.
9. Stop. When a specification was written, report its path, status and whether the requested next step is authorized. A `ready` specification authorizes a next step whose existing routing prerequisite is a ready specification. Recommend at most the first applicable skill: `domain-modelling` when R8 applies, otherwise `architecture-design` when R9 applies, otherwise `to-tickets` when the requested next step is decomposition. When the requester did not ask for a step beyond the specification, report that it is `ready` and which downstream consumer the canonical sequence would indicate. Do not invoke the recommended skill. Do not write `CONTEXT.md` or extend ADR `0001`.

## Quality gates

Apply the [specification gate](../quality-gates.md): scope is bounded, acceptance criteria are testable, and no blocking requirement ambiguity remains. A ready specification includes Open Questions and states that no blocking question remains. An open question that cannot change the requested next step may remain. Premises stay labelled and do not become requirements. Only a `ready` specification is persisted. A missing or non-ready decision set, missing project context, a material ambiguity, a premise that can still change the specification, a conflict with an existing decision, and an unresolved external fact do not authorize a specification. ADR `0001` stays limited to decision sets.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. Name every missing prerequisite and recommend the earliest blocker: missing project context recommends `context-engineering`; a decision-set problem recommends `clarify`; an external fact recommends `research`. Do not leave a specification file. Never present that result as a ready specification.

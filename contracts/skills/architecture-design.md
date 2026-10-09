# architecture-design

Status: implemented. Primary invocation: user.

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

Invoked only when an architectural boundary justifies it.

Restrictions:

```text
MUST NOT invent a business or architectural decision
MUST NOT persist a draft, blocked or partial architecture design
MUST NOT invoke the recommended skill
MUST NOT modify application code
MUST NOT add a dependency
MUST NOT modify ADR 0001
MUST NOT force an architectural boundary when R9 does not apply
```

## Workflow

1. Read the specification, the project context and, when they exist, the domain model and the research report. A glossary entry is not a decision and does not by itself justify an architecture design. Never copy secret values; record only their existence and architectural effect. Record blockers through step 6 and continue; the only BLOCKED return is step 8.
2. When project context is missing, record that blocker and recommend `context-engineering`. Do not run that skill and do not add it as a dependency.
3. An architecture design can be written only from a specification whose status is `ready`. When the specification is missing, `draft`, `blocked` or `superseded`, record a specification blocker that recommends `to-spec`.
4. Design only when the `ready` specification materially affects module boundaries, public interfaces, the data model, integration contracts, infrastructure, security boundaries, concurrency, deployment or high blast-radius behaviour. A change the specification limits so that none of those apply does not justify a design. Record that outcome as a blocker, introduce no architectural boundary, and recommend `to-tickets`.
5. Use a domain model as evidence only when its status is `ready`. A missing domain model does not block when the specification does not involve business terminology, invariants, state transitions, business events or context boundaries. When the specification involves those concerns and the domain model is missing, or a present domain model has any other status, record a blocker that recommends `domain-modelling`. Do not run that skill. The existing conditional dependency stays; this recommendation does not add a dependency. Use a research report as evidence only when its status is `ready`. A recommendation in a ready domain model or research report becomes part of the design only when the specification already adopted it. When a present research report has any other status, or an external fact can still change the design, record an external-fact blocker that recommends `research`. Do not access the network and do not add a dependency.
6. Do not invent a business or architectural decision. When a material ambiguity, a premise that can still change the design, or a conflict with an existing decision appears, record a decision blocker that recommends `clarify`. Preserve the existing decision. Keep a premise labelled as a premise; it does not become a component, interface, trade-off or risk. Leave a rejected alternative out of the design. Do not reopen a question that the specification, repository evidence or project context already answers. Limit context, drivers, constraints, the proposed design, components, interfaces, data flow, impacts, trade-offs, risks and the validation strategy to those inputs. When the `ready` input names no content for a required section, record that absence and cite the input. Do not fill the gap with an example. A durable architectural decision becomes an ADR only when the `ready` specification already records that decision, its alternatives and its consequences.
7. When no blocker remains and the architecture gate passes, write one architecture design for that objective under `.ai/artifacts/architecture/`, using the existing template and frontmatter and including every required section. Set status `ready`. That ready architecture design is written whenever the gate passes. Do not leave template draft markers. List the consumed artifact identifiers in `inputs`. On a later execution of the same objective, update that same file and increment `version`. The objective is the specification objective; the design that already cites that specification is the design for it. Do not create a duplicate. When the consumed inputs are unchanged, keep the material sections, status and recorded design unchanged. When the `ready` specification already records a durable architectural decision, also write one ADR for that decision under `.ai/decisions/`, using the existing ADR template, with status `ready`, and without modifying ADR `0001` or any ADR this objective did not produce. A later execution of the same decision updates that same ADR and increments `version`. When the specification does not record that decision, write no ADR and do not delete an existing ADR. The files this skill writes are the ready architecture design and, only when that decision is already in the specification, the ready ADR.
8. When any blocker remains, or the ready inputs still cannot pass the architecture gate without invention, write no file. Return one BLOCKED report with `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` and `Recommended next skill/action`, and name every missing prerequisite. `Evidence` cites the input for each blocker. Recommend the skill for the earliest blocker, in this order: missing project context, then a specification problem, then a decision problem, then an external fact or a research report that is present and not `ready`, then a domain model that is required or present and not `ready`, then a change that does not justify a design. When the inputs are ready and the architecture gate still cannot pass without invention, a specification that does not supply the affected boundary recommends `to-spec`; an open decision recommends `clarify`.
9. Stop. When an architecture design was written, report its path, status, whether an ADR was written, and whether `to-tickets` is authorized. A `ready` architecture design authorizes `to-tickets` and does not authorize another skill. When the requester did not ask for a step beyond the design, report that it is `ready` and that the canonical consumer is `to-tickets`. Do not invoke `to-tickets` or any other skill. Do not write the glossary, `CONTEXT.md`, any other artifact, or extend ADR `0001`.

## Quality gates

Apply the [architecture gate](../quality-gates.md): existing constraints considered, interfaces explicit, trade-offs documented, risks identified and a validation strategy defined. Evidenced absence, cited from the ready input, satisfies a required section. Only a `ready` architecture design is persisted. A durable architectural decision already recorded in the ready specification may additionally persist one `ready` ADR with the existing template under `.ai/decisions/`. ADR `0001` stays limited to decision sets and is not modified. A missing project context, a missing or non-`ready` specification, a material ambiguity, a premise that can still change the design, a conflict with an existing decision, an unresolved external fact, a present research report that is not `ready`, a required or present domain model that is not `ready`, and a change that does not justify a design do not authorize an architecture design or an ADR. The existing conditional dependencies stay. This recommendation does not add a dependency. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. Name every missing prerequisite. `Evidence` cites the input for each blocker. Recommend the earliest blocker: missing project context recommends `context-engineering`; a specification problem recommends `to-spec`; a decision problem recommends `clarify`; an external fact or a research report that is present and not `ready` recommends `research`; a domain model that is required or present and not `ready` recommends `domain-modelling`; a change that does not justify a design recommends `to-tickets`. Do not leave an architecture-design file or an ADR from this attempt. Do not delete an existing ADR. The files this skill writes are a ready architecture design and, only when the ready specification already records a durable architectural decision, one ready ADR. Never present the BLOCKED result as a ready architecture design.

# to-tickets

Status: implemented. Primary invocation: user.

## Goal

Decompose specification into executable work.

Consumes:

```text
SPEC
ARCHITECTURE_DESIGN optional
DOMAIN_MODEL optional
```

Produces:

```text
TICKET_SET
```

Dependencies:

```text
none
```

Restrictions:

```text
MUST NOT invent a business or architectural decision
MUST NOT persist a draft, blocked or partial ticket set
MUST NOT invoke the recommended skill
MUST NOT modify application code
MUST NOT add a dependency
MUST NOT publish a remote issue
```

A specification that is not `ready` SHALL NOT produce an implementation-ready ticket set.

## Workflow

1. Read the specification and, when they exist, the domain model and the architecture design. A glossary entry is not a decision and does not make R8 apply. Never copy secret values; record only their existence and architectural effect. Record blockers through step 6 and continue; the only BLOCKED return is step 8.
2. A ticket set can be written only from a specification whose status is `ready`. When the specification is missing, `draft`, `blocked` or `superseded`, record a specification blocker that recommends `to-spec`.
3. A missing domain model does not block when the specification does not involve business terminology, invariants, state transitions, business events or context boundaries. A missing architecture design does not block when the specification does not affect module boundaries, public interfaces, data model, integration contracts, infrastructure, security boundaries, concurrency, deployment or high blast-radius behaviour. Do not run the missing producer and do not add it as a dependency. A change the specification limits to CRUD or infrastructure does not require a domain model.
4. Use a domain model or an architecture design as evidence only when its status is `ready`. A recommendation in that artifact becomes a ticket requirement only when the specification already adopted it. When a present domain model or architecture design has any other status, record a blocker that recommends `domain-modelling` or `architecture-design`. When R8 applies and the domain model is missing, or R9 applies and the architecture design is missing, record that same blocker.
5. Do not invent a business or architectural decision. When a material ambiguity, a premise that can still change the tickets, or a conflict with an existing decision appears, record a decision blocker that recommends `clarify`. Preserve the existing decision. Keep a premise labelled as a premise; it does not become a ticket. Leave a rejected alternative out of the tickets. When an external fact can still change the tickets, record an external-fact blocker that recommends `research`. Do not access the network and do not add a dependency.
6. Do not reopen a question that the specification, repository evidence or project context already answers. Limit scope, acceptance criteria, dependencies and notes to the specification and the ready optional artifacts.
7. When no blocker remains and the ticket gate passes, write one ticket set for that objective under `.ai/artifacts/tickets/`, using the existing template and frontmatter and repeating the ticket block for every ticket. Set status `ready`. That ready ticket set is the only file this skill writes. Each ticket includes Title, Goal, Context, Scope, Out of Scope, Dependencies, Implementation Notes, Acceptance Criteria, Validation and Definition of Done. Dependencies are explicit and acyclic, and each ticket is independently verifiable once those dependencies are done. Do not leave template draft markers. Each ticket cites the consumed input used for its scope and acceptance criteria. List the consumed artifact identifiers in `inputs`. On a later execution of the same objective, update that same file and increment `version`. The objective is the specification objective; the ticket set that already cites that specification is the ticket set for it. Do not create a duplicate. When the consumed specification and optional artifacts are unchanged, keep the material sections, status, scope, tickets and acceptance criteria unchanged. Do not reformat a historical ticket set stored as a directory.
8. When any blocker remains, or the ready inputs still cannot form a valid decomposition without invention, write no file. Return one BLOCKED report with `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` and `Recommended next skill/action`, and name every missing prerequisite. `Evidence` cites the input for each blocker. Recommend the skill for the earliest blocker, in this order: a missing or non-ready specification, then a decision problem, then a domain model that is required or present and not ready, then an architecture design that is required or present and not ready, then an external fact. When the inputs are ready and a valid decomposition still cannot be formed without invention, a specification that does not supply verifiable slices recommends `to-spec`; an open decision recommends `clarify`.
9. Stop. When a ticket set was written, report its path, status and whether `implement` is authorized. A `ready` ticket set authorizes `implement` and does not authorize another skill. When the requester did not ask for a step beyond the tickets, report that the set is `ready` and that the canonical consumer is `implement`. Do not invoke `implement` or start a ticket. Do not publish a remote issue. Do not write the glossary, `CONTEXT.md`, any other artifact, or extend ADR `0001`.

## Quality gates

Apply the [ticket gate](../quality-gates.md). Preserve input provenance and validation evidence. Executable ticket sets require a ready specification; ticket dependencies must be explicit and acyclic; each ticket is independently verifiable. Only a `ready` ticket set is persisted. Each ticket cites the consumed input used for its scope and acceptance criteria. A missing or non-ready specification, a present optional artifact that is not `ready`, a required domain model or architecture design that is missing, a material ambiguity, a premise that can still change the tickets, a conflict with an existing decision, and an unresolved external fact do not authorize a ticket set. ADR `0001` stays limited to decision sets. Dependencies stay empty.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. Name every missing prerequisite. `Evidence` cites the input for each blocker. Recommend the earliest blocker: a missing or non-ready specification recommends `to-spec`; a decision problem recommends `clarify`; a domain-model problem recommends `domain-modelling`; an architecture-design problem recommends `architecture-design`; an external fact recommends `research`. Do not leave a ticket-set file. Do not publish a remote issue. The only file this skill writes is a ready ticket set. Never present the BLOCKED result as a ready ticket set.

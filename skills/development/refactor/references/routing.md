# Routing rules — baseline v1
Routing SHALL obey this precedence.
## R1 — Explicit invocation wins
If the user explicitly invokes:
/to-spec
/implement
/diagnose
that skill SHALL be preferred unless execution would violate a blocking prerequisite.

## R2 — Unknown intent routes to /workflow
Use /workflow when:
- multiple skills plausibly apply;
- request spans several lifecycle phases;
- execution sequence is unclear.
workflow SHALL recommend a sequence, not perform the entire task itself.

## R3 — Material ambiguity routes to /clarify
Route to clarify if an unanswered question can materially change:

- scope
- behaviour
- architecture
- data model
- security
- acceptance criteria

Do NOT ask questions whose answers are already available from repository evidence or project context.

## R4 — Unknown external facts route to /research
Examples:

- current API behaviour
- library capabilities
- version compatibility
- platform limits
- standards
- framework behaviour

Research SHALL precede architectural decisions when such facts materially affect them.

## R5 — Unknown failure routes to /diagnose
Use:
diagnose
when:
symptom is known
root cause is not known
Do NOT jump directly to implement.

## R6 — Known required change routes to /implement
If:
desired behaviour is clear
scope is bounded
route directly to implement.
A SPEC is recommended but not mandatory for trivial, well-defined changes.

## R7 — /to-spec requires resolved decisions
to-spec SHALL NOT invent missing business or architectural decisions.
Blocking ambiguity routes back to:
clarify

## R8 — Domain modelling is conditional
Invoke domain-modelling only when the change involves meaningful:

- business terminology
- invariants
- state transitions
- business events
- context boundaries

Do not force DDD into CRUD or infrastructure-only changes.

## R9 — Architecture design is conditional
Invoke architecture-design when a change materially affects one or more:

- module boundaries
- public interfaces
- data model
- integration contracts
- infrastructure
- security boundaries
- concurrency
- deployment
- high blast-radius behaviour


## R10 — /to-tickets requires a ready specification
Do not generate executable ticket sets from a blocked SPEC.

## R11 — TDD is composed by /implement
implement SHOULD invoke tdd when:
- TDD was explicitly requested;
- behaviour is complex;
- regression risk is material;
- a bug requires a regression test;
- domain invariants are changing.
TDD is not mandatory for every trivial change.

## R12 — Edge case analysis is risk-driven
Invoke when changes expose:

- external input
- state transitions
- date/time logic
- concurrency
- external integrations
- security-sensitive data
- high-volume processing
- data integrity risk


## R13 — Code review is mandatory for non-trivial changes
A non-trivial implementation SHOULD receive code-review before completion.
Trivial changes MAY omit it if validation is sufficient and risk is negligible.

## R14 — Documentation follows documentation impact
Invoke docs when changes affect:

- public API
- architecture
- configuration
- operations
- deployment
- developer workflow
- onboarding
- business-visible behaviour


## R15 — Refactor and implement are different intents
Use:
refactor
when behaviour must remain stable.
Use:
implement
when behaviour is intentionally changing.

## R16 — Modernization is not ordinary refactoring
Use modernize when work involves:

- runtime migrations
- framework migrations
- platform migrations
- legacy replacement
- large dependency modernization
- architecture transformation


## R17 — Handoff preserves continuity
Use handoff when:
- work is incomplete;
- another agent/session will continue;
- explicit transfer was requested;
- context is at risk of being lost.

## Routing anti-patterns

The following routes are prohibited:

```text
ambiguous request
→ implement
without resolving material ambiguity.
unknown bug
→ random code modification
without diagnosis.
blocked spec
→ to-tickets
tickets
→ large unrelated refactor
modernize
→ uncontrolled repository-wide rewrite
docs
→ invented architecture description
domain-modelling
→ forced DDD patterns

```

The normative text uses “mandatory” in the R13 title and SHOULD in its body. Non-trivial changes SHOULD receive review; this reconciliation preserves that strength. Routing rules describe contracts, not an implemented router.

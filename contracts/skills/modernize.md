# modernize

Status: implemented. Primary invocation: user.

## Goal

Plan and orchestrate legacy modernization.

Consumes:

```text
PROJECT_CONTEXT
modernization objective
existing architecture
runtime/dependency information
```

Produces:

```text
MODERNIZATION_PLAN
```

Optional, not invoked:

```text
diagnose
research
architecture-design
tdd
to-tickets
```

Recommending one of these skills is not composition. The existing optional dependencies stay.

Implementation SHOULD subsequently flow through:

```text
to-tickets
→ implement
```

That flow is the canonical consumer path. This skill does not invoke it.

`modernize` SHALL NOT perform an uncontrolled "upgrade everything" operation.

Restrictions:

```text
MUST NOT invent a target, a stage, a rollback, a validation strategy or a compatibility claim
MUST NOT persist a draft, blocked or partial modernization plan
MUST NOT modify application code
MUST NOT invoke the recommended skill
MUST NOT modify ADR 0001
MUST NOT add a dependency
```

## Workflow

1. Read the project context, the modernization objective, the existing architecture and the runtime or dependency information. A glossary entry is not a modernization objective and does not by itself authorize a plan. Never copy secret values; record only their existence and effect. Record blockers through step 6 and continue; the only BLOCKED return is step 8.
2. When project context is missing, record that blocker and recommend `context-engineering`. Project context is `.ai/project.md`. Do not run that skill and do not add it as a dependency. Current state is understood only when `.ai/architecture.md` shows the existing architecture and the objective cites runtime or dependency evidence that the repository already contains, such as `package.json` or `.ai/tech-stack.md`. When that architecture file is missing, or the cited runtime or dependency evidence is missing, record a current-state blocker and recommend `context-engineering`. Do not invent the current runtime, framework, platform, legacy component, dependency set or architecture.
3. The objective is one bounded modernization under R16: a runtime migration, a framework migration, a platform migration, a legacy replacement, a large dependency modernization or an architecture transformation. It names the current item, the target state, the ordered migration stages, the rollback strategy and the validation strategy. When no objective is present, the objective is not bounded, or the request is to upgrade everything or rewrite the repository without that bound, record an objective blocker that recommends `clarify`. When the purpose is to change behaviour and the request is not one of those R16 migrations, record an intent blocker that recommends `implement`. When the symptom is known and the cause is not, record a diagnosis blocker that recommends `diagnose`. When the purpose is a structural change and external behaviour stays stable, record a refactor blocker that recommends `refactor`. When the purpose is a documentation impact under R14, record a documentation blocker that recommends `docs`. Do not run the recommended skill and do not add it as a dependency. Do not modify application code.
4. A behaviour baseline is an observed characterization of current behaviour that the objective cites from repository evidence. When that baseline was not observed, record a baseline blocker and recommend observing the baseline and retrying `modernize`. When the cited tests fail and the cause is unknown, record a diagnosis blocker that recommends `diagnose`. Do not run `tdd`. The existing optional dependency stays; this recommendation does not add a dependency.
5. Use a research report as evidence only when its status is `ready` and the requester names it or the plan would use it. When a present research report has any other status, or an external fact can still change the target, the stages, the rollback or the validation, record an external-fact blocker that recommends `research`. Do not access the network and do not add a dependency. Use an architecture design as evidence only when its status is `ready` and the requester names it or the plan would use it. A missing architecture design does not block when `.ai/architecture.md` already shows the current architecture and the objective already names the target state. When a present architecture design has any other status, or an open architectural boundary can still change the target, record an architecture blocker that recommends `architecture-design`. Do not run that skill. The existing optional dependency stays. Use a diagnosis as evidence only when its status is `ready` and the requester names it or the plan would use it. A missing diagnosis does not block when the baseline was observed and no unknown failure remains. When a present diagnosis has any other status, record a diagnosis blocker that recommends `diagnose`. When the objective conflicts with an existing decision, including ADR `0001`, preserve that decision and record a decision blocker that recommends `clarify`. Do not supersede the decision and do not extend ADR `0001`.
6. Do not invent a target state, a migration stage, a rollback strategy, a validation strategy, a compatibility claim or a milestone. Record only what the objective and the repository evidence already contain. When the objective names no content for Technical Debt, Risk Map, Characterization Strategy, Migration Strategy, Compatibility Constraints or Milestones, cite that evidenced absence and do not fill the gap with an example. Current State cites the project context, the architecture file and the runtime or dependency evidence. Target State, Migration Sequence, Rollback Strategy and Validation Strategy cite the objective. When a required gate item is absent, that absence is a blocker from steps 2 through 5, not a filled section. Do not write application code, a test, a ticket, a specification, a research report, a diagnosis, an architecture design or a documentation update. The only file this skill writes is the ready modernization plan.
7. When no blocker remains and the modernization gate passes, write one modernization plan for that objective under `.ai/artifacts/modernization/`, using the existing template and frontmatter and including every required section. Set status `ready` and `created_by` to `modernize`. Do not leave template draft markers. List the consumed artifact identifiers in `inputs`. On a later execution of the same objective, update that same file and increment `version`. The plan that already cites that objective is the plan for it. Do not create a duplicate. When the consumed inputs are unchanged, keep the material sections unchanged. When the inputs change, apply only the additional plan change and update the same file. When a modernization plan that already cites that objective has `created_by` other than `modernize`, record a gate blocker instead of writing. Do not delete an existing modernization plan. Do not rewrite a file whose `created_by` is not `modernize`. Do not modify application code. A ready plan does not perform the migration.
8. When any blocker remains, or the inputs still cannot pass the modernization gate without invention or an uncontrolled upgrade, write no modernization-plan file and apply no application change from this attempt. Revert a plan file from this attempt before returning. Return one BLOCKED report with `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` and `Recommended next skill/action`, and name every missing prerequisite. `Evidence` cites the input for each blocker. Recommend the skill or action for the earliest blocker, in this order: missing project context, then current state that is not understood, then an objective that is absent, unbounded or an uncontrolled upgrade, then a behaviour change, then an unknown failure or tests that fail with an unknown cause, then a structural change with stable external behaviour, then a documentation impact, then a behaviour baseline that was not observed, then a decision conflict, then an external fact or a research report that is present and not `ready`, then an architecture-design problem, then a diagnosis that is present and not `ready`, then migration stages, rollback or validation that the objective does not name, then an existing modernization plan for that objective whose `created_by` is not `modernize`. Missing project context and current state that is not understood recommend `context-engineering`. An absent, unbounded or uncontrolled objective recommends `clarify`. A behaviour change recommends `implement`. An unknown failure recommends `diagnose`. A structural change with stable external behaviour recommends `refactor`. A documentation impact recommends `docs`. A behaviour baseline that was not observed recommends observing that baseline and retrying `modernize`. A decision conflict recommends `clarify`. An external fact recommends `research`. An architecture design that has any status other than `ready`, or an open boundary that can still change the target, recommends `architecture-design`. A present diagnosis that is not `ready` recommends `diagnose`. Migration stages, rollback or validation that the objective does not name recommend `clarify`. An existing plan whose `created_by` is not `modernize` recommends leaving that file unchanged. Do not delete an existing modernization plan. Do not modify application code.
9. Stop. When the plan was written, report its path, its status, and that the migration was not performed. A `ready` plan authorizes `to-tickets` as the canonical consumer and does not authorize `implement` directly and does not authorize an uncontrolled repository-wide rewrite. Implementation after tickets is incremental and is not invoked. When the requester did not ask for a step beyond the plan, report that the result is `ready` and that the canonical consumer is `to-tickets`. Do not invoke `to-tickets`, `implement`, `diagnose`, `research`, `architecture-design`, `tdd`, `refactor`, `docs`, `context-engineering` or any other skill. Do not write the glossary, `CONTEXT.md`, any other artifact, or extend ADR `0001`.

## Quality gates

Apply the [modernization gate](../quality-gates.md): current state understood, behaviour baseline exists, migration stages defined, rollback strategy exists and validation defined. Current state comes from `.ai/project.md`, `.ai/architecture.md` and runtime or dependency evidence the objective cites from the repository. The objective supplies the target, the ordered stages, the rollback and the validation. Evidenced absence, cited from the objective, satisfies Technical Debt, Risk Map, Characterization Strategy, Migration Strategy, Compatibility Constraints and Milestones. Only a `ready` modernization plan is persisted. ADR `0001` stays limited to decision sets and is not modified. Application code stays unchanged. A missing project context, current state that is not understood, an absent, unbounded or uncontrolled objective, a behaviour change, an unknown failure, a structural change with stable external behaviour, a documentation impact, a baseline that was not observed, a conflict with an existing decision, an unresolved external fact, a present research report, architecture design or diagnosis that is not `ready`, an open architectural boundary that can still change the target, and stages, rollback or validation that the objective does not name do not authorize a modernization plan or a migration. The existing optional dependencies stay. This recommendation does not add a dependency. A ready plan authorizes `to-tickets` and does not authorize `implement` directly. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. Name every missing prerequisite. `Evidence` cites the input for each blocker. Recommend the earliest blocker: missing project context recommends `context-engineering`; current state that is not understood recommends `context-engineering`; an absent, unbounded or uncontrolled objective recommends `clarify`; a behaviour change recommends `implement`; an unknown failure or tests that fail with an unknown cause recommend `diagnose`; a structural change with stable external behaviour recommends `refactor`; a documentation impact recommends `docs`; a behaviour baseline that was not observed recommends observing that baseline and retrying `modernize`; a decision conflict recommends `clarify`; an external fact or a research report that is present and not `ready` recommends `research`; an architecture design that has any status other than `ready`, or an open boundary that can still change the target, recommends `architecture-design`; a present diagnosis that is not `ready` recommends `diagnose`; migration stages, rollback or validation that the objective does not name recommend `clarify`; an existing modernization plan whose `created_by` is not `modernize` recommends leaving that file unchanged. Do not leave a modernization-plan file from this attempt. Do not delete an existing modernization plan. Do not modify application code. The file this skill writes is the ready modernization plan. Never present the BLOCKED result as a ready modernization plan.

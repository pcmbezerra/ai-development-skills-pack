# docs

Status: implemented. Primary invocation: user.

## Goal

Create/update documentation from evidence.

Consumes:

```text
repository evidence
CHANGE_SET
SPEC optional
ARCHITECTURE_DESIGN optional
existing documentation
```

Produces:

```text
documentation changes
DOC_UPDATE
```

Documentation SHALL NOT invent implementation state.

Restrictions:

```text
MUST NOT present unverified behaviour as current
MUST NOT persist a draft, blocked or partial documentation update
MUST NOT write a CHANGE_SET file
MUST NOT invoke the recommended skill
MUST NOT modify ADR 0001
MUST NOT add a dependency
MUST NOT write outside the repository root
```

## Workflow

1. Read the project context, the documentation objective, the repository evidence, the working tree cited as `CHANGE_SET`, the specification when it is present, the architecture design when it is present, and the existing documentation. A glossary entry is not a documentation objective and does not by itself authorize a documentation change. Never copy secret values; record only their existence and effect. Record blockers through step 6 and continue; the only BLOCKED return is step 8.
2. When project context is missing, record that blocker and recommend `context-engineering`. Project context is `.ai/project.md`. Do not run that skill and do not add it as a dependency. When `.ai/config.json` is missing, is not valid JSON, or its `docsPath` is empty or resolves outside the repository root, record that blocker and recommend `setup-ai-development-skills`. Do not run that skill and do not write outside the root.
3. The objective is one bounded documentation impact under R14: public API, architecture, configuration, operations, deployment, developer workflow, onboarding or business-visible behaviour. When no objective is present, or the request is not bounded, record that blocker and recommend `clarify`. When the purpose is to change behaviour or application code, record that blocker and recommend `implement`. When the symptom is known and the cause is not, record that blocker and recommend `diagnose`. When the purpose is a structural change and external behaviour stays stable, record that blocker and recommend `refactor`. When the request is modernization under R16, record that blocker and recommend `modernize`. Do not run the recommended skill and do not add it as a dependency.
4. Read a present specification and a present architecture design. A missing specification does not block when repository evidence already shows the behaviour to document. A missing architecture design does not block when repository evidence already shows the structure to document. When the requester names a specification, or the documentation would use a specification that is present, and that specification has any status other than `ready`, record a specification blocker that recommends `to-spec`. When the requester names an architecture design, or the documentation would use a design that is present, and that design has any status other than `ready`, record an architecture blocker that recommends `architecture-design`. Do not edit the specification or the design.
5. Use a research report as evidence only when its status is `ready`. When a present research report has any other status, or an external fact can still change what to document, record an external-fact blocker that recommends `research`. Do not access the network and do not add a dependency. When the objective conflicts with an existing decision, including ADR `0001`, preserve that decision and record a decision blocker that recommends `clarify`. Do not supersede the decision and do not extend ADR `0001`.
6. Do not invent implementation state or an architecture description. Current behaviour comes only from repository evidence and the working tree. A `ready` specification or a `ready` architecture design that the repository does not yet show is future design: write it only when the same objective asks to record that future design, and mark it explicitly as future design. Do not present future design as current behaviour. A premise does not become current behaviour. Leave a rejected alternative out of the documentation. When a claim is not supported, do not write it as current behaviour. When some verified statement remains, list the unsupported claim under Known Documentation Gaps. When no verified statement remains, record a gate blocker. Write documentation files only under the safe `docsPath`, plus `README.md` at the repository root when the objective names that existing file. Do not write the glossary, `CONTEXT.md`, project context files, skill source, contracts, application code, a `CHANGE_SET` file, or any artifact other than the ready documentation update.
7. When no blocker remains and the documentation gate passes, update the documentation so it matches the verified repository state. Do not write a `CHANGE_SET` file. The working-tree documentation change is the named-only change set, and the update cites it as `working tree`. When the existing documentation already matches, leave those files unchanged. Write one documentation update for that objective under `.ai/artifacts/documentation/`, using the existing template and frontmatter and including every required section. Set status `ready` and `created_by` to `docs`. Do not leave template draft markers. List the consumed artifact identifiers in `inputs`. On a later execution of the same objective, update that same file and increment `version`. The update that already cites that objective is the update for it. Do not create a duplicate. When the consumed inputs are unchanged, keep the material sections and the documentation files unchanged. When the inputs change, apply only the additional documentation change and update the same file. When a documentation update that already cites that objective has `created_by` other than `docs`, record a gate blocker instead of writing. Do not delete an existing documentation update. Do not rewrite a file whose `created_by` is not `docs`.
8. When any blocker remains, or the inputs still cannot pass the documentation gate without inventing implementation state, write no documentation-update file and apply no documentation change from this attempt. Revert a documentation change from this attempt before returning. Return one BLOCKED report with `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` and `Recommended next skill/action`, and name every missing prerequisite. `Evidence` cites the input for each blocker. Recommend the skill for the earliest blocker, in this order: missing project context, then missing or unsafe configuration, then an objective that is absent, unbounded or not a documentation impact, then a decision conflict, then an external fact or a research report that is present and not `ready`, then a specification problem, then an architecture-design problem, then an existing documentation update for that objective whose `created_by` is not `docs`, then a claim that would invent implementation state. A behaviour change recommends `implement`. An unknown failure recommends `diagnose`. A structural change with stable external behaviour recommends `refactor`. Modernization recommends `modernize`. An absent or unbounded objective, and a decision conflict, recommend `clarify`. Missing project context recommends `context-engineering`. Missing or unsafe configuration recommends `setup-ai-development-skills`. An external fact recommends `research`. A specification that has any status other than `ready` recommends `to-spec`. A design that has any status other than `ready` recommends `architecture-design`. A claim with no verified statement recommends the producer of the missing evidence, in that same order. An existing documentation update whose `created_by` is not `docs` recommends leaving that file unchanged. Do not delete an existing documentation update or existing documentation.
9. Stop. When the update was written, report its path, its status, the documentation paths created or updated, and that the result does not authorize implementation. When the requester did not ask for a step beyond the update, report that the result is `ready` and that no downstream skill is authorized. Do not invoke `implement`, `refactor`, `code-review`, `handoff`, `diagnose`, `modernize`, `context-engineering`, `setup-ai-development-skills` or any other skill. Do not write the glossary, `CONTEXT.md`, any other artifact, or extend ADR `0001`.

## Quality gates

Apply the [documentation gate](../quality-gates.md): documentation matches verified repository state. Current behaviour is written only from repository evidence and the working tree. Future design is written only from a `ready` specification or a `ready` architecture design, and only when the text marks it as future design. Only a `ready` documentation update is persisted. `CHANGE_SET` stays named-only and is cited as `working tree`. Documentation files stay under the safe `docsPath`, plus `README.md` at the repository root when the objective names that existing file. ADR `0001` stays limited to decision sets and is not modified. A missing project context, missing or unsafe configuration, an absent or unbounded objective, a request that is not a documentation impact, a conflict with an existing decision, an unresolved external fact, a present research report that is not `ready`, a specification or architecture design that the documentation would use and that is not `ready`, and a claim that would invent implementation state do not authorize a documentation update or a documentation change. Dependencies stay empty. A ready documentation update does not authorize implementation. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. Name every missing prerequisite. `Evidence` cites the input for each blocker. Recommend the earliest blocker: missing project context recommends `context-engineering`; missing or unsafe configuration recommends `setup-ai-development-skills`; an absent or unbounded objective recommends `clarify`; a behaviour change recommends `implement`; an unknown failure recommends `diagnose`; a structural change with stable external behaviour recommends `refactor`; modernization recommends `modernize`; a decision conflict recommends `clarify`; an external fact or a research report that is present and not `ready` recommends `research`; a specification that has any status other than `ready` recommends `to-spec`; an architecture design that has any status other than `ready` recommends `architecture-design`; a claim with no verified statement recommends the producer of the missing evidence in that same order. Do not leave a documentation-update file from this attempt. Do not leave a documentation change from this attempt. Do not delete an existing documentation update or existing documentation. The files this skill writes are the ready documentation update and the documentation change under the safe documentation path. Never present the BLOCKED result as a ready documentation update.

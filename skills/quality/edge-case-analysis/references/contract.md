# edge-case-analysis

Status: implemented. Primary invocation: model.

## Goal

Identify untested boundary/adversarial scenarios.

Consumes:

```text
SPEC
CHANGE_SET
DOMAIN_MODEL optional
existing tests
```

Produces:

```text
EDGE_CASE_REPORT
```

May propose tests.

It SHALL NOT silently broaden product behaviour.

Restrictions:

```text
MUST NOT persist a draft, blocked or partial edge-case report
MUST NOT invoke the recommended skill
MUST NOT write the proposed test
MUST NOT modify application code
MUST NOT write a CHANGE_SET file
MUST NOT add a dependency
```

## Workflow

1. Read the invoked objective, the specification, the change cited as `working tree`, the domain model when it is present, and the existing tests. A glossary entry is not a specification and is not a change. Never copy secret values; record only their existence and effect. Record blockers through step 6 and continue; the only BLOCKED return is step 8.
2. When the specification is missing or is not `ready`, record that blocker and recommend `to-spec`. Do not run that skill and do not add it as a dependency. A specification that is not `ready` cannot authorize implementation.
3. When no change is present to analyse, record that blocker and recommend `implement`. Do not run that skill. Do not write a `CHANGE_SET` file. The working-tree change is the named-only change set.
4. When a domain model is present and is not `ready`, record that blocker and recommend `domain-modelling`. A missing domain model does not block. Do not run that skill and do not add it as a dependency.
5. When the existing tests were not observed, record that blocker and recommend reading the existing tests. Observed absence of tests is not a blocker. Do not run `tdd` and do not add it as a dependency.
6. Do not invent a scenario, an expected behaviour or a decision. Expected behaviour comes from the ready specification, and from the ready domain model when the specification uses that model. When the specification and a ready domain model conflict, or when a conflict with an existing decision appears, including ADR `0001`, record a decision blocker that recommends `clarify`. Preserve the ADR. Do not extend ADR `0001`. A proposed test that is not already required by the ready specification, or by the ready domain model when the specification uses that model, would broaden product behaviour. Record that proposal as not authorized. Do not place it under Recommended Test. Do not write the test and do not change product code.
7. When no blocker remains, identify untested boundary and adversarial scenarios that the change exposes under R12: external input, state transitions, date/time logic, concurrency, external integrations, security-sensitive data, high-volume processing and data integrity risk. A finding category may be boundaries, state transitions, concurrency, time/date, encoding, volume, failure modes, security, external dependencies or data integrity. For each finding, report Scenario, Category, Risk, Expected Behaviour, Existing Coverage, Missing Coverage and Recommended Test. Cite the specification, cite the domain model when it supplied the expected behaviour, and cite the test that supplies existing coverage or the observed absence of that test. Recommended Test names a test of that already-specified behaviour, or `none` when no gap remains. When the change exposes none of the R12 risks, write one finding that records that evidenced absence: Missing Coverage is `none` and Recommended Test is `none`. Do not invent a risk. Write one edge-case report for that objective under `.ai/artifacts/quality/`, using the existing template and frontmatter and repeating the seven finding sections for each finding. Set status `ready` and `created_by` to `edge-case-analysis`. Do not leave template draft markers. List the consumed artifact identifiers in `inputs`. Do not write a test file, a `CHANGE_SET` file or a product change. On a later execution of the same objective, update that same report and increment `version`. Do not create a duplicate and do not delete an existing report. When the consumed inputs are unchanged, keep the material sections.
8. When any blocker remains, write no file from this attempt. Return one BLOCKED report with `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` and `Recommended next skill/action`, and name every missing prerequisite. `Evidence` cites the input for each blocker. Do not authorize implementation. Do not delete an existing report.
9. Stop. When an edge-case report was written, report its path and status. A `ready` report whose recommended tests stay inside already-specified behaviour authorizes `code-review` of the same change when an R12 risk was reported, and does not invoke it. When the only finding is evidenced absence of every R12 risk, report that `code-review` may be omitted. The report does not authorize `implement` to change product behaviour. It may name `tdd` as applicable to an authorized recommended test and does not invoke `tdd`. A proposal recorded as not authorized does not authorize a test or an implementation of that new behaviour. When the requester did not ask for a step beyond the report, report that it is `ready` and whether `code-review` is authorized. Do not invoke another skill. Do not write the glossary, `CONTEXT.md`, a specification, a domain model, a test file, or extend ADR `0001`.

## Quality gates

Apply the required finding sections in the [artifact contract](artifacts.md). Each finding reports expected behaviour and existing and missing coverage. A recommended test stays inside behaviour already required by the ready specification, or by the ready domain model when the specification uses that model. A proposal that would broaden product behaviour stays recorded as not authorized and is not a recommended test. Only a `ready` edge-case report is persisted. A missing or not-ready specification, a missing change, a domain model that is present and not ready, existing tests that were not observed, and a conflict with an existing decision do not authorize a report or implementation. Observed absence of tests and evidenced absence of an R12 risk do not block. A ready report does not authorize `implement` to change product behaviour. ADR `0001` stays limited to decision sets. Dependencies stay empty. `CHANGE_SET` stays named-only. Blocked inputs cannot authorize implementation. The skill does not write the proposed test.

## Failure behaviour

Follow the [failure contract](failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. Name every missing prerequisite. `Evidence` cites the input for each blocker. Recommend the earliest blocker, in this order: a missing or not-ready specification recommends `to-spec`; a missing change recommends `implement`; a domain model that is present and not ready recommends `domain-modelling`; existing tests that were not observed recommend reading the existing tests; a conflict with an existing decision recommends `clarify`. Do not leave an edge-case report from this attempt. Do not delete an existing report. The file this skill writes is a ready edge-case report. Never present the BLOCKED result as a ready edge-case report.

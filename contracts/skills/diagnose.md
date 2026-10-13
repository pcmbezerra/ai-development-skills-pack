# diagnose

Status: implemented. Primary invocation: user.

## Goal

Identify root cause of unknown failures.

Consumes:

```text
symptom
repository
PROJECT_CONTEXT
logs/tests/runtime evidence when available
```

Produces:

```text
DIAGNOSIS_REPORT
```

Optional, not invoked:

```text
tdd
```

to establish regression or reproduction tests. Recommending `tdd` is not composition.

Diagnosis SHALL precede a fix when root cause is unknown.

## Workflow

1. Read the symptom, the repository, the project context, and logs, tests or runtime evidence when they are available. A glossary entry is not project context. Never copy secret values; record only their existence and effect. Invocation is an unknown failure under R5: the symptom is known and the root cause is not known. Record blockers through step 5 and continue; the only BLOCKED return is step 8.
2. A diagnosis can be written only from ready project context. When project context is missing or has any status other than `ready`, record that blocker and recommend `context-engineering`. Do not run it and do not add a dependency.
3. When the symptom is not known, record that blocker and recommend supplying the symptom, then retrying `diagnose`. When the repository was not observed, record that blocker and recommend observing the repository, then retrying `diagnose`. Do not invent a symptom, a stack trace or a file. Absence of logs, tests or runtime evidence is not a blocker; record that absence. Do not invent log lines, measurements or test results.
4. Do not invent a decision or treat an unverified external fact as the cause. When the diagnosis would have to resolve a material ambiguity or a conflict with an existing decision, including ADR `0001`, record a decision blocker that recommends `clarify`. Preserve the ADR. Do not extend ADR `0001`. When a required section would have to state an unverified external fact as the cause, record an external-fact blocker that recommends `research`. Do not run `research` and do not access the network.
5. Classify the cause only from observed evidence. Use `confirmed root cause` only when an observed reproduction isolates one cause. Use `probable root cause` when the evidence supports one cause and at least one alternative remains. Otherwise use `unconfirmed hypothesis` and list the hypotheses that were tested. A classification that cannot be made because the repository was not observed is the repository blocker from step 3. Do not modify application code and do not write a test.
6. A blocked input does not authorize implementation. A probable root cause or an unconfirmed hypothesis does not authorize implementation. A confirmed root cause authorizes a later `implement` only when the reproduction was observed and regression evidence already exists. Regression evidence is an existing failing test or a ready `TEST_EVIDENCE` file that demonstrates the failure. When that evidence is absent, the recommended fix is not authorized and the next action is `tdd`. Do not run `tdd` or `implement`.
7. When no blocker remains, write one diagnosis report for that symptom under `.ai/artifacts/diagnosis/`, using the existing template and frontmatter and including every required section. Set status `ready` and `created_by` to `diagnose`. Do not leave template draft markers. List the consumed artifact identifiers in `inputs`. State exactly one of `confirmed root cause`, `probable root cause` or `unconfirmed hypothesis` in Root Cause. Fill Reproduction with the observed attempt, including an attempt that did not reproduce. Fill Regression Test with the existing evidence or with its absence. Fill Recommended Fix with the smallest fix only when step 6 authorizes it; otherwise state that the fix is not authorized and name the missing evidence. On a later execution of the same symptom, update that same file and increment `version`. The symptom names the failure. Do not create a duplicate and do not delete an existing diagnosis. When the consumed symptom, repository observation, project context and available evidence are unchanged, keep the material sections.
8. When any blocker remains, write no file from this attempt. Return one BLOCKED report with `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` and `Recommended next skill/action`, and name every missing prerequisite. `Evidence` cites the input for each blocker. Recommend the skill or action for the earliest blocker, in this order: project context, then an unknown symptom, then an unobserved repository, then a decision problem, then an external fact. Do not authorize implementation. Do not delete an existing diagnosis. Do not modify application code and do not write a test.
9. Stop. Do not invoke the next skill. A ready diagnosis with a confirmed root cause, an observed reproduction and existing regression evidence names `implement` and does not run it. A ready diagnosis with a confirmed root cause and no regression evidence names `tdd` and does not run it. Any other ready diagnosis does not name `implement`. Do not write the glossary, `CONTEXT.md`, any other artifact, or extend ADR `0001`.

## Quality gates

Distinguish confirmed root cause, probable root cause and unconfirmed hypothesis. A confirmed root cause requires an observed reproduction that isolates one cause. Establish reproduction and existing regression evidence before recommending a fix. A probable root cause, an unconfirmed hypothesis, a blocked input, or a confirmed cause without regression evidence does not authorize implementation. Missing or non-ready project context, an unknown symptom or an unobserved repository does not authorize a diagnosis file. ADR `0001` stays limited to decision sets and is not modified. Optional `tdd` is not invoked.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. Name every missing prerequisite. `Evidence` cites the input for each blocker. Recommend the earliest blocker: missing or non-ready project context recommends `context-engineering`; an unknown symptom recommends supplying it and retrying `diagnose`; an unobserved repository recommends observing it and retrying `diagnose`; a decision problem recommends `clarify`; an external fact recommends `research`. Do not leave a diagnosis file from this attempt. Do not delete an existing diagnosis. Do not modify application code and do not write a test. The file this skill writes is a ready diagnosis report. Never present the BLOCKED result as a ready diagnosis.

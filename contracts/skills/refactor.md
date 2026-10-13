# refactor

Status: implemented. Primary invocation: user.

## Goal

Improve internal structure without changing external behaviour.

Consumes:

```text
refactor objective
behaviour baseline
PROJECT_CONTEXT
tests
```

Produces:

```text
CHANGE_SET
IMPLEMENTATION_REPORT
TEST_EVIDENCE
```

Invariant:

```text
external behaviour MUST NOT change
```

unless explicitly authorized.

Restrictions:

```text
smallest structural change
no unrelated changes
no speculative abstractions
MUST NOT persist a draft, blocked or partial report
MUST NOT write a CHANGE_SET file
MUST NOT invoke the recommended skill
MUST NOT modify ADR 0001
MUST NOT add a dependency
MUST NOT rewrite a report created by implement or tdd
```

## Workflow

1. Read the project context, the refactor objective, the behaviour baseline and the tests. A glossary entry is not a refactor objective and does not by itself authorize a change. Never copy secret values; record only their existence and effect. Record blockers through step 6 and continue; the only BLOCKED return is step 8.
2. When project context is missing, record that blocker and recommend `context-engineering`. Do not run that skill and do not add it as a dependency.
3. Apply a structural change only for the objective the requester named. The objective must name one bounded internal-structure change. External behaviour stays unchanged unless that same objective explicitly authorizes one named behaviour change. A request whose purpose is to change behaviour, with no structural objective, is not a refactor objective. A runtime migration, framework migration, platform migration, legacy replacement, large dependency modernization or architecture transformation is not a refactor objective. A repository-wide or otherwise unbounded rewrite is not a refactor objective.
4. When the refactor objective is absent, not bounded or not structural, record a decision blocker that recommends `clarify`. When the request intentionally changes external behaviour and does not explicitly authorize that change inside a structural objective, record an intent blocker that recommends `implement`. When the request is modernization under R16, record a modernization blocker that recommends `modernize`. Do not run those skills.
5. Establish the behaviour baseline before any structural change. Observed relevant tests that pass are the baseline. When no test harness exists, a check the objective already names, and that was observed, is the baseline; record the harness absence in the test evidence. When the tests were not observed and no named check was observed, record a baseline blocker and recommend observing the baseline, then retrying `refactor`. When relevant tests fail before the change, or the cause of a failure is unknown, record a diagnosis blocker that recommends `diagnose`. Do not modify code to discover a cause. Do not run `diagnose` or `tdd`.
6. Do not invent behaviour, a decision or a structure. When a material ambiguity, a premise that can still change the refactor, or a conflict with an existing decision appears, record a decision blocker that recommends `clarify`. Preserve the existing decision. Keep a premise labelled as a premise. Leave a rejected alternative out of the change. Do not reopen a question that the objective, repository evidence or project context already answers. Use a research report as evidence only when its status is `ready`. When a present research report has any other status, or an external fact can still change the refactor, record an external-fact blocker that recommends `research`. Do not access the network and do not add a dependency. A recommendation in a ready research report becomes part of the change only when the objective already adopted it. Limit the change, the report and the test evidence to the objective. When the objective names no content for a required report or evidence section, record that absence and cite the objective. Do not fill the gap with an example. The change is the smallest structural edit that meets the objective. It excludes unrelated edits and speculative abstractions. When keeping the change structural still requires an unrelated edit, a speculative abstraction, or an external behaviour change that the objective did not explicitly authorize, record that gate blocker. An unauthorized behaviour change recommends `implement` when the behaviour change is the goal; otherwise it recommends bounding the objective with `clarify`.
7. When no blocker remains and the implementation gate passes, apply that structural change in the working tree. Do not write a `CHANGE_SET` file and do not invent a schema or template for it. The working-tree change is the named-only change set, and the report cites it as `working tree`. Write one implementation report for that objective under `.ai/artifacts/implementation/`, using the existing template and frontmatter and including every required section. Set status `ready` and `created_by` to `refactor`. In Behaviour Changed, state that external behaviour did not change, or record the one behaviour change the objective explicitly authorized and state that every other external behaviour did not change. Write one test-evidence file for that objective under `.ai/artifacts/tests/`, using the existing template and frontmatter and including every required information section. Set status `ready` and `created_by` to `refactor`. Do not leave template draft markers. List the consumed artifact identifiers in `inputs`. On a later execution of the same objective, update those same two files and increment `version`. The report that already cites that objective and whose `created_by` is `refactor` is the report for it. Do not create a duplicate. Do not rewrite an implementation report or a test-evidence file whose `created_by` is `implement` or `tdd`. When the consumed inputs are unchanged, keep the material sections and the recorded change unchanged and do not apply the change again. When the inputs change, apply only the additional smallest structural change and update the same files. If a relevant test fails after the change, revert the change from this attempt and treat the gate as failed. An unknown cause recommends `diagnose`. A failure that shows an unauthorized behaviour change recommends `implement` when that change is the goal; otherwise recommend repeating `refactor` with a structure-only change. Do not delete an existing report or test-evidence file. The files this skill writes are the ready implementation report and the ready test evidence. When a test harness already exists, record the baseline result and the result after the change. When no harness exists, record that absence and the named check. When R13 applies, record that `code-review` applies and was not invoked. The dependency lists stay empty. This recommendation does not add a dependency and does not run `implement`, `tdd`, `diagnose`, `code-review`, `edge-case-analysis`, `docs`, `modernize` or `context-engineering`. The REFACTOR step inside `tdd` stays inside `tdd` and does not invoke this skill.
8. When any blocker remains, or the ready inputs still cannot pass the implementation gate without invention, an unrelated change, a speculative abstraction or an unauthorized behaviour change, write no file and apply no change from this attempt. If a change from this attempt is already in the working tree, revert it before returning. Return one BLOCKED report with `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` and `Recommended next skill/action`, and name every missing prerequisite. `Evidence` cites the input for each blocker. Recommend the skill or action for the earliest blocker, in this order: missing project context, then an unknown failure or tests that fail before the change, then a behaviour baseline that was not observed, then a refactor objective that is absent, not bounded or not structural, then an intentional behaviour change, then a modernization request, then a decision problem, then an external fact or a research report that is present and not `ready`, then a change that cannot stay structural or that would change external behaviour without explicit authorization. When the inputs are ready and the gate still cannot pass, an unauthorized behaviour change recommends `implement`; a modernization request recommends `modernize`; an open decision recommends `clarify`; an unknown failing test recommends `diagnose`. Do not delete an existing report or test-evidence file.
9. Stop. When the report was written, report both paths, their status, whether the working tree changed, and whether external behaviour changed. A non-trivial ready refactor authorizes `code-review` and does not authorize another skill. A trivial ready refactor, clear and local with negligible risk, reports that `code-review` may be omitted and does not authorize another skill. When R12 or R14 applies, name `edge-case-analysis` or `docs` in Remaining Work as applicable and not invoked. When the requester did not ask for a step beyond the refactor, report that the result is `ready` and name `code-review` as the canonical consumer when it is authorized. Do not invoke `code-review`, `implement`, `tdd`, `diagnose`, `edge-case-analysis`, `docs`, `modernize`, `context-engineering` or any other skill. Do not write the glossary, `CONTEXT.md`, any other artifact, or extend ADR `0001`.

## Quality gates

Apply the [implementation gate](../quality-gates.md): requested behaviour implemented, relevant tests pass, validation evidence exists, no unrelated changes and known limitations reported. The requested behaviour is the structural change. External behaviour stays unchanged unless the objective explicitly authorized one named change. Evidenced absence of a test harness, cited from the objective, satisfies the test record when the objective named another check and that check was observed before and after the change. Only a `ready` implementation report and a `ready` test-evidence file are persisted, both with `created_by` `refactor`. `CHANGE_SET` stays named-only and is cited as `working tree`. ADR `0001` stays limited to decision sets and is not modified. A missing project context, an unknown failure, tests that fail before the change, a behaviour baseline that was not observed, an absent, unbounded or non-structural objective, an intentional behaviour change, a modernization request, a material ambiguity, a premise that can still change the refactor, a conflict with an existing decision, an unresolved external fact, a present research report that is not `ready`, and a change that cannot stay structural or that would change external behaviour without explicit authorization do not authorize a report, test evidence or a code change. The dependency lists stay empty. This recommendation does not add a dependency. Blocked inputs cannot authorize the refactor.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. Name every missing prerequisite. `Evidence` cites the input for each blocker. Recommend the earliest blocker: missing project context recommends `context-engineering`; an unknown failure or tests that fail before the change recommend `diagnose`; a behaviour baseline that was not observed recommends observing that baseline and retrying `refactor`; an absent, unbounded or non-structural objective recommends `clarify`; an intentional behaviour change recommends `implement`; a modernization request recommends `modernize`; a decision problem recommends `clarify`; an external fact or a research report that is present and not `ready` recommends `research`; a change that cannot stay structural recommends `clarify`; an unauthorized behaviour change recommends `implement` when that change is the goal and otherwise recommends repeating `refactor` with a structure-only change. Do not leave an implementation report, a test-evidence file or a code change from this attempt. Revert a change from this attempt before returning. Do not delete an existing report or test-evidence file. Do not rewrite a report or test-evidence file whose `created_by` is `implement` or `tdd`. The files this skill writes are a ready implementation report and a ready test-evidence file. Never present the BLOCKED result as a ready implementation report.

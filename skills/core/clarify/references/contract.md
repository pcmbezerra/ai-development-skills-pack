# clarify

Status: implemented. Primary invocation: user.

## Goal

Resolve material ambiguities.

Consumes:

```text
request
project context
existing decisions
```

Produces:

```text
DECISION_SET
```

Optional dependency:

```text
context-engineering
```

Restrictions:

```text
MUST NOT invent a material decision
MUST NOT authorize implementation from a blocked decision set
MUST NOT modify application code
```

## Workflow

1. Read the request, existing decisions and project context. Existing decisions are ADRs, prior decision sets and explicit decisions recorded in project context. A glossary entry is not a decision. Never copy secret values; record only their existence and architectural effect.
2. When repository evidence could answer a material question or change whether it is material, and project context is missing or insufficient, execute `context-engineering` before asking. Skip that composition when the repository cannot contain the answer, such as a user preference. Do not add a required dependency.
3. Classify each unknown. A material ambiguity is an unanswered question that can change the scope, behaviour, architecture, data model, security or acceptance criteria of the requested next step. An external fact is information outside the repository and is not a project choice. A question that cannot change the requested next step is an open question.
4. Resolve a material ambiguity from an explicit user choice, an existing decision, or repository evidence that already answers it. Cite the evidence. Record a rejected alternative only when a resolved or existing decision discards it. A premise does not close a material ambiguity. An instruction that the agent assume something is not acceptance. When the user states the premise as their own decision, record that acceptance as a resolved decision and keep the premise labelled as a premise.
5. When the request conflicts with an existing decision, preserve that decision and record a blocking question. Do not supersede it.
6. Ask every remaining material question in the same response. Do not ask anything the request, repository evidence or project context already answers. Leave an external fact unresolved, recommend `research` and keep it blocking while it can change the requested next step.
7. Persist one decision set for the objective under `.ai/artifacts/decisions/`, using the existing decision-set template and frontmatter. Include every required section. Use status `ready` when no blocking question remains, even if open questions remain. Use status `blocked` when any blocking question remains, including after a partial answer. Update the existing file for the same objective and increment `version`; do not create a duplicate or silently change a resolved decision.
8. Stop after the decision set. Report its path, status and whether the requested next step is authorized. A `blocked` set, a blocked input and an unaccepted premise do not authorize `to-spec` or `implement`. Recommend the next skill without invoking it.

## Quality gates

A decision set is ready only when no unresolved question materially affects the requested next step. A ready set still includes the blocking-questions section and states that none remain. Open questions may remain. Premises stay labelled and do not replace resolved decisions. Ready and blocked sets are both persisted. Blocked inputs and blocked decision sets cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. Include the persisted decision set. Never translate a blocking question, an external fact, a blocked input or an unaccepted premise into implementation readiness.

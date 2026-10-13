---
name: clarify
description: "Resolves material ambiguity before a specification or change. Use when an open question can change scope, behaviour, architecture, data, security, or acceptance."
---

# clarify

Status: implemented; the operational workflow is available.

Before execution, read its [contract](../../../contracts/skills/clarify.md) for inputs, outputs, constraints, gates and failure behaviour.

Consult the [manifest](../../../manifest/skills.json) for invocation and dependencies, the [shared skill contract](../../../contracts/skill-contract.md) for composition, the [artifact contract](../../../contracts/artifacts.md) for persistence, and [routing rules](../../../contracts/routing.md) for prerequisites.

## Workflow

1. Read the request, existing decisions and project context. Treat ADRs, prior decision sets and explicit project-context decisions as existing decisions. Do not treat a glossary entry as a decision. Never copy secret values; record only their existence and architectural effect.
2. If repository evidence could answer a material question or change whether it is material, and project context is missing or insufficient, execute `context-engineering` before asking. Do not execute it for a preference or other choice the repository cannot contain.
3. Separate material ambiguities, external facts and open questions. A material ambiguity can change the scope, behaviour, architecture, data model, security or acceptance criteria of the requested next step. An external fact is not a project choice. An open question cannot change that next step.
4. Record a resolved decision from an explicit user choice, an existing decision, or repository evidence that already answers the question. Cite that evidence. Record a rejected alternative only when a resolved or existing decision discards it. Keep a premise labelled as a premise; it does not close a material ambiguity. An instruction to assume a premise is not acceptance. When the user states that premise as their own decision, record the acceptance as a resolved decision and keep the premise labelled in Assumptions.
5. If the request conflicts with an existing decision, leave that decision unchanged and add a blocking question. Do not supersede it.
6. Ask all remaining material questions together. Skip questions already answered by the request, repository evidence or project context. For an external fact, recommend `research`, leave the fact unresolved and keep the question blocking while it affects the requested next step.
7. Write one decision set for that objective to `.ai/artifacts/decisions/`, using the existing template and frontmatter and including every required section. Set status `ready` when no blocking question remains. Set status `blocked` when any blocking question remains, including a partial answer. On a later execution of the same objective, update that same file and increment `version`. Do not create a duplicate and do not silently change a resolved decision.
8. Stop. Report the path, status and whether the requested next step is authorized. Recommend `context-engineering`, `research`, another `clarify` execution after the user answers, or `to-spec` when the set is ready and a specification is the requested next step. Do not invoke the recommended skill. A blocked set, a blocked input or an unaccepted premise does not authorize `to-spec` or `implement`.

## Failure behaviour

Return the [contracted `BLOCKED` result](../../../contracts/failure.md) with the persisted decision set when a blocking question remains, the input is blocked, an external fact still affects the requested next step, or a premise was not accepted as the user's own decision. Never present that result as authorization to specify or implement.

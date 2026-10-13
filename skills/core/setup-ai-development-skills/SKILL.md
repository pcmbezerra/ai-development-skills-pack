---
name: setup-ai-development-skills
description: "Creates local pack configuration and project context. Use when a repository has no ready .ai configuration and the pack should be bootstrapped."
---

# setup-ai-development-skills

Status: implemented; the operational workflow is available.

Before executing this skill, read its [contract](../../../contracts/skills/setup-ai-development-skills.md), the [manifest](../../../manifest/skills.json), the [shared skill contract](../../../contracts/skill-contract.md), the [artifact contract](../../../contracts/artifacts.md), the [routing rules](../../../contracts/routing.md) and the [failure contract](../../../contracts/failure.md).

## Workflow

1. Resolve one accessible repository root and inspect `.ai/config.json`, repository evidence and existing decisions before writing. Return the contracted `BLOCKED` result if the root is unavailable or ambiguous.
2. For existing configuration, parse without rewriting; require version `1`, a non-empty `issueTracker`, and non-empty `specPath`, `ticketPath`, `adrPath` and `docsPath` strings inside the root; and preserve every valid value, including unknown extensions. Invalid JSON, an incompatible or incomplete model, or an escaping path is `BLOCKED`, with the original bytes unchanged.
3. When configuration is absent and no explicit evidence requires different values, create `.ai/config.json` with version `1`, `issueTracker` set to `local`, and canonical `specPath`, `ticketPath`, `adrPath` and `docsPath` values. Prefer explicit safe repository evidence over defaults.
4. Invoke the required `context-engineering` skill with the resolved root and validated configuration. Propagate `BLOCKED` or execution failure without reporting `READY`.
5. Revalidate configuration; require all five canonical context documents; and review the diff to ensure application code, build configuration and existing decisions were not changed.
6. Report `Status: READY` only when every gate passes. Include paths and evidence in the execution result, but do not create a readiness artifact, schema or template.

On failure, use `Status: BLOCKED` with Reason, Evidence, Missing prerequisite and Recommended next skill/action. Never repair invalid configuration by replacing it.

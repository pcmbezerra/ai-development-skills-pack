# Failure and fallback — baseline v1

A skill SHALL NOT fabricate a successful result.
When blocked, it SHALL report:

```text
Status: BLOCKED

Reason
Evidence
Missing prerequisite
Recommended next skill/action
```

Examples:

```text
to-spec
→ BLOCKED
→ clarify
implement
→ BLOCKED: root cause unknown
→ diagnose
architecture-design
→ BLOCKED: external compatibility unknown
→ research

```

Artifact status `blocked` and execution status `BLOCKED` are distinct. A scaffold cannot claim workflow execution or ready output. Local Markdown remains the fallback for optional external integrations.

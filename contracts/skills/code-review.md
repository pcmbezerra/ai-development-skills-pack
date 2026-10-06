# code-review

Status: scaffold. Primary invocation: model.

## Goal

Perform semantic review of a change.

Consumes:

```text
CHANGE_SET
SPEC/TICKET optional
PROJECT_CONTEXT
TEST_EVIDENCE optional
```

Produces:

```text
REVIEW_REPORT
```

Review priority:

```text
1. correctness
2. regressions
3. security
4. requirements
5. architecture
6. project conventions
7. maintainability
8. tests
9. style
```

## Workflow

Pending implementation. Read inputs and the shared artifact contract; operational steps are outside this scaffold.

## Quality gates

Apply the [review gate](../quality-gates.md). Preserve input provenance and validation evidence. Use PASS, PASS_WITH_NOTES, CHANGES_REQUIRED or BLOCKED as the verdict. Blocked inputs cannot authorize implementation.

## Failure behaviour

Follow the [failure contract](../failure.md): Status: BLOCKED; Reason; Evidence; Missing prerequisite; Recommended next skill/action. This scaffold does not execute the workflow or produce ready artifacts.

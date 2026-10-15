# Issue tracker

GitHub Issues: `pcmbezerra/ai-development-skills-pack`, confirmed by the maintainer on 2026-10-06.

Use `gh` when available and authenticated. Read with `gh issue view <number> --comments`; list with `gh issue list`; create with `gh issue create --title "..." --body-file <file>`. Use `--body-file` for multiline bodies.

Publish only when requested. Without access, persist Markdown in `.ai/artifacts/tickets`, explicitly marking publication as pending. Reconcile local records with remote issue numbers before publishing to avoid duplicates.

**PRs as a request surface: no.**

This configures maintenance of this repository; GitHub is not a mandatory dependency of the reusable pack. Executable ticket sets still require a ready specification under the pack contracts.

## Reconciliation on 2026-10-15

`gh` is on PATH and authenticated as the Cursor integration. `gh issue list --state all` returned an empty list. `gh repo view` reported `pcmbezerra/ai-development-skills-pack` as `PRIVATE`. No remote issue was created.

Nineteen local ticket sets were compared with that empty list. None contains a GitHub issue URL or a remote issue number. There is no remote duplicate to attach. Local Markdown remains the source. Publishing those sets remains a separate decision. Historical sentences that say publication is pending because `gh` is absent are superseded on the access claim only: reading works, the list is empty, and publication was not requested.

The same reading listed 14 pull requests: 13 `MERGED` and 1 `CLOSED` (`#9`, "docs: reconcile project understanding after v1-A11"). None is open. Those pull requests are not issues.

| Local ticket set | Remote issue |
| --- | --- |
| `TICKET-SET-20261006-001` | none |
| `TICKET-SET-20261008-001` | none |
| `TICKET-SET-20261008-002` | none |
| `TICKET-SET-20261008-003` | none |
| `TICKET-SET-20261009-001` | none |
| `TICKET-SET-20261009-002` | none |
| `TICKET-SET-20261009-003` | none |
| `TICKET-SET-20261009-004` | none |
| `TICKET-SET-20261010-001` | none |
| `TICKET-SET-20261013-001` | none |
| `TICKET-SET-20261013-002` | none |
| `TICKET-SET-20261013-003` | none |
| `TICKET-SET-20261013-004` | none |
| `TICKET-SET-20261013-005` | none |
| `TICKET-SET-20261013-006` | none |
| `TICKET-SET-20261013-007` | none |
| `TICKET-SET-20261013-008` | none |
| `TICKET-SET-20261013-009` | none |
| `TICKET-SET-20261014-001` | none |

On 2026-10-13, an earlier session recorded `gh issue list` as `Resource not accessible by integration`. That reading is historical. It is not the result of 2026-10-15.

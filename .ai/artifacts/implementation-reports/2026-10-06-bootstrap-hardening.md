---
artifact: implementation_report
id: IMPLEMENTATION-20261006-004
version: 1
status: ready
created_by: implement
inputs: ["TICKET-SET-20261006-001/04", "SPEC-20261006-001", "TEST-20261006-004"]
---

## Input

Ticket 04: harden bootstrap and close amendment v1-A2.

## Plan

Protect remaining deterministic invariants, execute the adversarial fixture matrix through the approved public seams, and reconcile final state documentation with traceable SPEC evidence.

## Files Changed

Validator and tests for dependency/canonical CLI entrypoint invariants; behavior-level CLI coverage; final test evidence, implementation report, provenance, validation state, ticket state, README and handoff.

## Behaviour Changed

`validate(root)` now rejects npm dependencies in production, development, optional or peer fields and rejects a noncanonical CLI entrypoint without reading it. Subprocess tests verify that help works and unsupported commands remain rejected.

## Validation Performed

Focused RED/GREEN, full 44-test suite, both validation aliases, CLI help/validation, adversarial agent fixtures and two-axis code review.

## Tests

See `TEST-20261006-004` for the deterministic/agent separation and all 14 SPEC criteria.

## Known Limitations

Node.js 22, Linux, a fresh macOS run and live execution in the four targets remain unverified. The other 16 skills and all target installation flows remain scaffold.

## Remaining Work

None for `SPEC-20261006-001`; its ticket frontier is empty.

## Change Reference

Commits `800db27`, `9634dfe` and `9a15a46`, plus the final review-evidence commit on branch `main`.

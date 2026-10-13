---
artifact: diagnosis_report
id: DIAGNOSIS-S06
version: 1
status: ready
created_by: diagnose
inputs:
  - CTX-S06
  - SYM-S06
---

## Symptom

parse("ab") returned "a".

## Reproduction

parse was called with ab and returned a. The call was observed.

## Observed Behaviour

parse drops the last character.

## Expected Behaviour

parse returns the whole input.

## Evidence

src/parse.js returns value.slice(0, -1). The call isolates that expression. CTX-S06 is ready.

## Hypotheses Tested

The slice end argument was tested by reading the return expression and calling parse.

## Root Cause

confirmed root cause. The observed call isolates the slice that drops the last character.

## Affected Components

src/parse.js.

## Regression Risk

Callers that need the last character receive a shorter string.

## Recommended Fix

The fix is not authorized because regression evidence is absent. Next action: tdd. tdd is not invoked.

## Regression Test

No regression test or ready TEST_EVIDENCE was observed.

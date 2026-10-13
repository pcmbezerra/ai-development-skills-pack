---
artifact: diagnosis_report
id: DIAGNOSIS-S04
version: 1
status: ready
created_by: diagnose
inputs:
  - CTX-S04
  - SYM-S04
  - LOG-S04
---

## Symptom

The request timed out after 30 seconds.

## Reproduction

One request was observed to time out. The attempt did not isolate a single cause.

## Observed Behaviour

The request exceeded 30 seconds.

## Expected Behaviour

The request completes inside the stated limit.

## Evidence

LOG-S04 shows slow query Q-1 and lock wait L-1. Both were present during the timeout.

## Hypotheses Tested

Slow query Q-1 and lock wait L-1 were both present. Neither was removed.

## Root Cause

probable root cause. Slow query Q-1 is supported by the log, and lock wait L-1 remains an alternative.

## Affected Components

The request path that issued Q-1.

## Regression Risk

Changing the query while the lock wait remains would leave the timeout possible.

## Recommended Fix

The fix is not authorized. No downstream skill is invoked.

## Regression Test

No regression evidence was observed.

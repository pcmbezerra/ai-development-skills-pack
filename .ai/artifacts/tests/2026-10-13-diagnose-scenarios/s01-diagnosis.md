---
artifact: diagnosis_report
id: DIAGNOSIS-S01
version: 1
status: ready
created_by: diagnose
inputs:
  - CTX-S01
  - SYM-S01
  - TEST-S01
---

## Symptom

add(2, 3) returned -1. The expected result is 5.

## Reproduction

The existing test tests/add.test.js was executed. It reported expected 5 and received -1.

## Observed Behaviour

add subtracts its arguments.

## Expected Behaviour

add returns the sum of its arguments.

## Evidence

src/add.js contains return a - b. TEST-S01 records expected 5 and received -1. CTX-S01 is ready.

## Hypotheses Tested

Operator substitution was tested by reading src/add.js and the failing test. No other operator is present.

## Root Cause

confirmed root cause. The return expression subtracts b from a, and the reproduction isolates that expression.

## Affected Components

src/add.js.

## Regression Risk

Callers of add that depend on a sum receive a difference.

## Recommended Fix

Replace return a - b with return a + b. This is the smallest fix. Next action: implement. implement is not invoked.

## Regression Test

tests/add.test.js already fails on this symptom. That file is the regression evidence.

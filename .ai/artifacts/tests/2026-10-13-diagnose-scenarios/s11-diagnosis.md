---
artifact: diagnosis_report
id: DIAGNOSIS-S11
version: 1
status: ready
created_by: diagnose
inputs:
  - CTX-S11
  - SYM-S11
  - TEST-S11
---

## Symptom

The client receives 401 for a known user.

## Reproduction

tests/auth.test.js was executed and reported 401.

## Observed Behaviour

The response status is 401.

## Expected Behaviour

The known user receives a successful response.

## Evidence

TEST-S11 records status 401. A credential was present in LOG-S11. Its value is omitted. The log records only that the credential existed on the 401 response.

## Hypotheses Tested

The missing authorization header was tested by reading src/auth.js, which does not send the header. The credential value was not copied.

## Root Cause

confirmed root cause. The reproduction isolates the handler that omits the authorization header.

## Affected Components

src/auth.js.

## Regression Risk

Known users remain rejected.

## Recommended Fix

Send the authorization header that the handler already requires. Next action: implement. implement is not invoked.

## Regression Test

tests/auth.test.js already fails with status 401.

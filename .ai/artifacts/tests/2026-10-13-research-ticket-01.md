---
artifact: test_evidence
id: TEST-20261013-005
version: 1
status: ready
created_by: implement
inputs:
  - TICKET-SET-20261013-003
  - SPEC-20261013-003
---

## Tests Added

Nenhum arquivo de teste novo. A asserção de catálogo já existente em `tests/validate-skills.test.mjs` passou a exigir `research` entre as skills `implemented`, quatorze no total e quatro `scaffold`, listas de dependência vazias, a capability `external-research` e `RESEARCH_REPORT` com esquema `defined`. As mutações que exigem uma skill `scaffold` usam `refactor`, porque `diagnose` e `research` estão `implemented`.

## Tests Executed

`node --test --test-name-pattern='current catalogue implements research' tests/validate-skills.test.mjs`, antes e depois da migração. Em seguida, `npm test` e `node scripts/validate-skills.mjs`.

## Expected Failure / RED

Antes da migração o comando focado falhou. O valor observado não continha `research`. A lista `implemented` terminava em `context-engineering` seguido de `to-spec`.

## Passing Evidence / GREEN

O mesmo comando passou depois da migração consistente de manifest, contrato e fonte. `npm test` passou 48/48. `node scripts/validate-skills.mjs` passou com 18 skills.

## Regression Suite

- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs.
- `node scripts/validate-skills.mjs`: PASS.

## Failures

Nenhuma falha depois da migração. O RED inicial é a evidência esperada do critério de catálogo.

## Skipped Tests

Nenhum.

## Environment Limitations

Linux 6.12.94+ (x86_64), Node.js v22.14.0, npm 10.9.9. A matriz agent-driven não entra neste arquivo. Descoberta real nos quatro produtos não foi executada.

---
artifact: test_evidence
id: TEST-20261022-008
version: 1
status: ready
created_by: implement
inputs:
  - SPEC-20261022-004
  - TICKET-SET-20261022-004
  - TEST-20261022-007
---

## Tests Added

Nenhum arquivo em `tests/`. A verificação nomeada pelos tickets 01 e 10 é a leitura da matriz.

## Tests Executed

A leitura do arquivo `.ai/artifacts/quality/2026-10-22-known-route-matrix.md` contra os doze critérios de `SPEC-20261022-004`, depois dos tickets 01 a 09 estarem no mesmo arquivo. O vermelho anterior está em `TEST-20261022-007`.

## Expected Failure / RED

Registrado em `TEST-20261022-007`: o arquivo estava ausente antes da escrita.

## Passing Evidence / GREEN

A leitura fechou com zero falhas. K1–K8 estão presentes, não há K9, a frase do limite está no texto, caso não declarado não é falha, e o texto diz que `validate()` não recebe comparação semântica nem estes casos.

## Regression Suite

Não executada. `npm test` não verifica esta matriz. `contracts/routing.md` e `scripts/validate-skills.mjs` não apareceram em `git diff --name-only` desta mudança.

## Failures

Nenhuma na leitura final.

## Skipped Tests

Suíte Node, `npm run validate`, `list`, `doctor`, `sync` e `bootstrap`. O ticket 10 não pede esses comandos para aceitar a matriz.

## Environment Limitations

Node.js v26.5.0 e npm 11.17.0, em Darwin 25.6.0 arm64. Não há harness de leitura na suíte. A ausência está nos tickets 01 e 10, que nomeiam a leitura manual do arquivo.

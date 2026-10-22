---
artifact: test_evidence
id: TEST-20261022-006
version: 1
status: ready
created_by: implement
inputs:
  - SPEC-20261022-003
  - TICKET-SET-20261022-003
  - TEST-20261022-005
---

## Tests Added

Nove testes em `tests/validate-skills.test.mjs`: duplicidade simples com a stderr da CLI, dois pares em ordem de índice, três nomes iguais, cinco entradas, alvo ausente sem repetição, caixa, espaço final e Unicode, espaços idênticos sem `trim`, `name` de skill duplicado e `description` igual.

## Tests Executed

Fora do sandbox, `npm test`. O verde isolado do teste simples rodou antes, no sandbox, 1/1. `npm run validate` rodou fora do sandbox, na mesma sequência.

## Expected Failure / RED

Registrado em `TEST-20261022-005`, antes da alteração de `validate()`.

## Passing Evidence / GREEN

Fora do sandbox: `npm test` 78/78, duração 8971 ms, zero falhas, skips ou todos. `npm run validate` passou com 18 skills. O teste `CLI packages and validates a selected target` passou com saída 0. `list` saiu 0. `doctor` saiu 0. `sync` e `bootstrap` saíram 1 com `ERROR: Unsupported command`.

## Regression Suite

A suíte completa é a regressão. Ela inclui as rejeições anteriores de `duplicate manifest name`, `identical manifest description`, `Invalid canonical catalogue`, `Invalid targets` e `Duplicate targets`, e os comandos `list`, `doctor`, `install`, `package`, `sync` e `bootstrap`.

## Failures

Nenhuma na suíte executada fora do sandbox.

## Skipped Tests

Nenhum.

## Environment Limitations

Node.js v26.5.0 e npm 11.17.0, em Darwin 25.6.0. `npm` avisou `Unknown env config "devdir"` e a suíte mesmo assim passou. O vermelho e o verde isolado do teste simples rodaram no sandbox e falharam ou passaram por asserção, não por `EPERM`.

---
artifact: test_evidence
id: TEST-20261022-004
version: 1
status: ready
created_by: implement
inputs:
  - SPEC-20261022-002
  - TICKET-SET-20261022-002
  - TEST-20261022-003
---

## Tests Added

Cinco testes em `tests/validate-skills.test.mjs`: duplicidade simples, três pares, caixa, espaço final e Unicode, espaços idênticos sem `trim`, e `description` igual com `name` distinto. O teste simples também cobre a stderr da CLI.

## Tests Executed

Fora do sandbox, `npm test`. Antes disso, o mesmo comando no sandbox teve duas falhas `EPERM` ao criar diretório `.cursor` em `/var/folders`; os testes deste critério passaram nessa execução. `npm run validate` rodou no sandbox.

## Expected Failure / RED

Registrado em `TEST-20261022-003`, antes da alteração de `validate()`.

## Passing Evidence / GREEN

Fora do sandbox: `npm test` 69/69, duração 8095 ms, zero falhas, skips ou todos. `npm run validate` passou com 18 skills. `validate()` no catálogo versionado devolveu `ok` verdadeiro, 18 skills, zero erros `duplicate manifest name` e sem `Invalid canonical catalogue`.

## Regression Suite

A suíte completa é a regressão. `list` saiu 0. `doctor` saiu 0. `sync` e `bootstrap` saíram 1 com `ERROR: Unsupported command`.

## Failures

Nenhuma na suíte executada fora do sandbox. As duas falhas do sandbox foram `EPERM` em `mkdir` de `.cursor`, não asserção deste critério.

## Skipped Tests

Nenhum.

## Environment Limitations

Node.js v26.5.0 e npm 11.17.0, em Darwin 25.6.0. A suíte que cria `.cursor` precisa sair do sandbox. `npm` avisou `Unknown env config "devdir"` e a suíte mesmo assim passou.

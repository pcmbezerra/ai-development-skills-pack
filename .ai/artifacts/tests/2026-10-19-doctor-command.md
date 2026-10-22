---
artifact: test_evidence
id: TEST-20261019-002
version: 1
status: ready
created_by: implement
inputs:
  - TICKET-SET-20261019-001
  - SPEC-20261019-001
  - TEST-20261019-001
  - IMPL-20261019-001
---

## Tests Added

O teste `doctor reports node and git without calling validate`, no mesmo working tree do ciclo `TEST-20261019-001`.

## Tests Executed

`npm test` e `npm run validate`, depois do verde, fora do sandbox. `node bin/ai-dev-skills.mjs doctor` e `node bin/ai-dev-skills.mjs doctor --target cursor`.

## Expected Failure / RED

Registrado em `TEST-20261019-001`: dois testes falharam antes da mudança de `bin/ai-dev-skills.mjs`.

## Passing Evidence / GREEN

`npm test`: 54 aprovados, 0 falhas, 0 ignorados, 0 todos. `npm run validate`: PASS, 18 skills. `doctor` saiu 0 com as duas linhas `pass` e stderr vazia. A opção `--target` saiu 1 com `ERROR:` e sem as duas linhas.

## Regression Suite

A suíte inteira, incluindo distribuição dos quatro targets, passou fora do sandbox. Dentro do sandbox, dois testes de instalação falharam com `EPERM` ao criar `.cursor`. Não se repetiram fora dele.

## Failures

Nenhuma na execução fora do sandbox.

## Skipped Tests

Nenhum.

## Environment Limitations

Node.js v26.5.0 e npm 11.17.0, em macOS. A rejeição de Node `21.9.9` foi feita pela função `nodeLine`, sem outro binário. O Git da máquina não foi executado; o teste usou um arquivo de nome `git` num `PATH` temporário.

---
artifact: test_evidence
id: TEST-20261019-003
version: 1
status: ready
created_by: tdd
inputs:
  - TICKET-SET-20261019-001
  - SPEC-20261019-001
  - ARCHITECTURE-20261019-001
  - ADR-0004
  - TEST-20261019-001
---

## Tests Added

Nenhum teste novo nesta execução. O ticket 02 já estava no working tree de `tests/validate-skills.test.mjs`: `doctor` saiu do laço de `bootstrap` e `sync`; a ajuda exige `ai-dev-skills doctor`; o teste `doctor reports node and git without calling validate` afirma as duas linhas, a stderr vazia, o `PATH` controlado, a regra de versão e `doctor --target cursor`.

## Tests Executed

`npm test`, fora do sandbox, com o comando do ticket 01 já presente. Node.js v26.5.0 e npm 11.17.0.

## Expected Failure / RED

Não houve falha nova. O vermelho destas asserções está em `TEST-20261019-001`, observado antes de `bin/ai-dev-skills.mjs` aceitar `doctor`. Repeti-lo agora exigiria desfazer o comando, e o ticket 02 deixa esse comando fora de escopo. Esta execução não reverteu arquivo e não fabricou falha.

## Passing Evidence / GREEN

`npm test`: 54 aprovados, 0 falhas, 0 ignorados, 0 todos, duração 7095 ms. Passaram `CLI exposes distribution commands while rejecting unsupported commands`, `doctor reports node and git without calling validate` e `current mixed catalogue satisfies the complete baseline checks`.

## Regression Suite

A suíte inteira, inclusive os quatro targets em `tests/distribute-skills.test.mjs`, passou fora do sandbox.

## Failures

Nenhuma.

## Skipped Tests

Nenhum.

## Environment Limitations

macOS, Node.js v26.5.0. A refatoração não alterou arquivo: a suíte já era o menor conjunto do ticket. `21.9.9` entra em `nodeLine`, sem outro binário. O `git fail` por exceção é o retorno de `gitLine` com lookup que lança; a saída 1 desse caminho não é um segundo processo. `git.exe` não é aceito.

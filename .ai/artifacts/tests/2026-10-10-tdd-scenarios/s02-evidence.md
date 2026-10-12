---
artifact: test_evidence
id: TEST-20261010-101
version: 2
status: ready
created_by: tdd
inputs:
  - TICKET-20261010-101
---

## Tests Added

Nenhum teste adicional. Esta execução copiou a árvore da versão 1, já com `value.test.mjs` no nome `value returns one`, e aplicou o mesmo ticket.

## Tests Executed

`node --test value.test.mjs` na cópia. Exit 0. O arquivo de teste não foi reescrito.

## Expected Failure / RED

O RED permanece o da versão 1. Esta execução não repetiu a falha de arquivo ausente como uma edição nova.

## Passing Evidence / GREEN

O teste da versão 1 continuou passando. O digest de `value.test.mjs` era `1db4ac572597` antes e depois. O digest de `value.js` era `553766602464` antes e depois.

## Regression Suite

A suíte do fixture continua o único arquivo de teste copiado da versão 1.

## Failures

Nenhuma.

## Skipped Tests

Nenhum.

## Environment Limitations

A evidência anterior com `created_by: implement` manteve o digest `a09ad2500f7a`. Só esta evidência passou de `version: 1` para `version: 2`. Node.js v26.5.0 no macOS.

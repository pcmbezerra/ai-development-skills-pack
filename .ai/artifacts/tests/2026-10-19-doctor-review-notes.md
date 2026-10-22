---
artifact: test_evidence
id: TEST-20261019-005
version: 1
status: ready
created_by: implement
inputs:
  - REVIEW-20261019-002
  - SPEC-20261019-001
  - ARCHITECTURE-20261019-001
  - ADR-0004
  - IMPL-20261019-003
---

## Tests Added

Nenhum `test()` novo. No teste `doctor reports node and git without calling validate`: os marcadores do ramo passam a ser exigidos antes do `slice`; o recorte precisa conter `gitLine` e continuar sem `validate(` e `validateTarget`; um `PATH` que é arquivo cobre saída 1, stderr vazia e a linha de Node junto de `git fail`.

## Tests Executed

Antes da edição da suíte, um script local confrontou o recorte antigo com um texto sem o marcador de `doctor` e mediu `stat` mais `doctor` com `PATH` apontando para um arquivo. Depois, `npm test`, `npm run validate` e `git diff --check`, fora do sandbox.

## Expected Failure / RED

O texto sem `if (command === 'doctor')` produziu recorte vazio e as checagens antigas de `includes` passaram. A checagem nova falhou com `doctor branch marker missing` e `false !== true`. Isso ocorreu antes de editar `tests/validate-skills.test.mjs`.

## Passing Evidence / GREEN

No mesmo script, antes da edição, `stat` de `arquivo/git` devolveu `ENOTDIR`. `doctor` com esse `PATH` saiu 1, stderr vazia, stdout `node pass 26.5.0` e `git fail`. Depois da edição, `npm test`: 54 aprovados, 0 falhas, 0 ignorados, 0 todos, duração 7462 ms. `npm run validate`: PASS, 18 skills. `git diff --check` não apontou erro.

## Regression Suite

A suíte inteira passou, inclusive distribuição dos quatro targets, `list`, `sync` e `bootstrap`. A contagem continua 54, igual à baseline de `TEST-20261019-004`.

## Failures

Nenhuma depois da edição.

## Skipped Tests

Nenhum.

## Environment Limitations

Node.js v26.5.0 e npm 11.17.0, em macOS. O primeiro `spawn` do script usou o pathname com escape de URL e falhou com `MODULE_NOT_FOUND`; a repetição com `fileURLToPath` é a evidência válida. O lookup injetado em `gitLine` permanece. `git` não foi executado.

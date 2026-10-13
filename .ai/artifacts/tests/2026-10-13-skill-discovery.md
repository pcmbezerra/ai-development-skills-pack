---
artifact: test_evidence
id: TEST-20261013-015
version: 1
status: ready
created_by: tdd
inputs:
  - SPEC-20261013-008
  - TICKET-SET-20261013-008
---

## Tests Added

Duas rejeições em `tests/validate-skills.test.mjs`: descrição sem `Use when` e descrição acima de 240 caracteres. O fixture de scaffold de `modernize` passou a gravar a descrição de descoberta.

## Tests Executed

`npm test`, `npm run validate`, `npm run skills:validate` e `git diff --check`.

## Expected Failure / RED

A primeira execução, com o fixture de scaffold ainda na descrição antiga, falhou em `modernize: frontmatter mismatch`. Esse era o defeito do fixture, não do catálogo. As duas rejeições novas passaram na mesma execução.

## Passing Evidence / GREEN

Depois de alinhar o fixture, `npm test` ficou 50/50, com zero falhas, skips ou todos. `npm run validate` e `npm run skills:validate` passaram com 18 skills. `git diff --check` passou.

## Regression Suite

A suíte existente de catálogo, distribuição, CLI e ciclo de vida continuou verde. O teste da CLI ainda rejeita `list`, `doctor` e `sync`.

## Failures

Nenhuma na execução final.

## Skipped Tests

Nenhum.

## Environment Limitations

Linux 6.12.94+ x86_64, Node.js v22.14.0, npm 10.9.9. Cursor, Codex, Gemini Antigravity e Claude Code não foram executados.

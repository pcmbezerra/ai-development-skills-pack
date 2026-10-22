---
artifact: implementation_report
id: IMPL-20261022-002
version: 1
status: ready
created_by: implement
inputs:
  - TICKET-SET-20261022-002
  - SPEC-20261022-002
  - TEST-20261022-003
---

## Input

Tickets 01 e 02 de `TICKET-SET-20261022-002`, com `SPEC-20261022-002`. O pedido compôs `implement` com `tdd`. O limite observado é `validate()` e a CLI `node scripts/validate-skills.mjs`.

## Plan

Demonstrar o vermelho na ausência de `duplicate manifest name`. Depois comparar os `name` já parseados, sem normalizar, no laço `i < j` existente. Em seguida cobrir três pares, caixa, espaço, Unicode, a conservação de `description` e a saída da CLI.

## Files Changed

- `scripts/validate-skills.mjs`
- `tests/validate-skills.test.mjs`

`bin/ai-dev-skills.mjs` e `scripts/distribute-skills.mjs` não entram neste diff. Os treze caminhos de fim de linha não entram neste diff.

## Behaviour Changed

`validate()` emite um erro adicional por par `i < j` cujo `name` é a mesma string: `<nome i>: duplicate manifest name <nome j>`. `Invalid canonical catalogue` permanece. Caixa, espaço final e forma Unicode diferentes não disparam esse erro. O catálogo versionado continua passando. `validateTarget`, `list`, `doctor`, `install`, `package`, `sync` e `bootstrap` não mudaram de código.

## Validation Performed

Fora do sandbox, em Node.js v26.5.0 e npm 11.17.0: `npm test` 69/69, duração 8095 ms, zero falhas, skips ou todos. `npm run validate` passou com 18 skills. `list` saiu 0. `doctor` saiu 0. `sync` e `bootstrap` saíram 1 com `ERROR: Unsupported command`. `git diff --ignore-cr-at-eol` nos treze caminhos históricos fica vazio.

## Tests

O vermelho está em `TEST-20261022-003`. O verde da suíte está em `TEST-20261022-004`.

## Known Limitations

A comparação é `!==` sobre o valor já parseado. Não aplica `trim`, caixa nem normalização Unicode. Uma fixture que troca `name` continua disparando caminho, categoria e frontmatter; os testes usam inclusão em `errors`. A suíte desta execução rodou em macOS. A suíte no sandbox falhou duas vezes com `EPERM` ao criar `.cursor`; a repetição fora do sandbox passou 69/69.

## Remaining Work

A mudança não é trivial. `code-review` é o consumidor canônico e não foi executado. R14 se aplica ao texto novo de falha do validador; `docs` não foi executado. `README.md` e `.ai/project.md` continuam sem narrar a v1-A25. R12 nomeia entrada externa; os critérios de caixa, espaço e Unicode já estão na suíte, e `edge-case-analysis` não foi executado.

## Change Reference

working tree

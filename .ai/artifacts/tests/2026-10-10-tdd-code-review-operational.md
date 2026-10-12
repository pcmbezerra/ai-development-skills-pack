---
artifact: test_evidence
id: TEST-20261010-002
version: 2
status: ready
created_by: implement
inputs:
  - TICKET-SET-20261010-001
  - SPEC-20261010-001
---

## Tests Added

Nenhum arquivo de teste Node novo. A asserção de catálogo do ticket 01 já exige 11 skills `implemented` e 7 `scaffold`. Os cenários abaixo são avaliação agent-driven, separada da suíte Node.

## Tests Executed

Cada cenário partiu de uma entrada isolada em um diretório temporário. O contrato e a fonte publicados foram aplicados ao objetivo nomeado. Nenhum cenário invocou `implement`, `refactor` ou `docs` a partir de `tdd` ou de `code-review`.

| # | Entrada | Evidência | Resultado observado | Autorização | Divergência |
| --- | --- | --- | --- | --- | --- |
| 1 | Ticket `ready`: criar `value.test.mjs` para `value()` igual a 1; não há teste; não editar `value.js`; já existe evidência `created_by: implement` | Ticket | `ready`; o teste passa; `value.js` idêntico; a evidência anterior não foi reescrita | `tdd` não invocou `implement`, `code-review` nem `refactor` | Nenhuma. RED: arquivo ausente, status 1. |
| 2 | Cópia da árvore da versão 1 do cenário 1, mesmo ticket | Mesmo ticket | Evidência `version: 2`; digest do teste `1db4ac572597` antes e depois; `value.js` `553766602464` antes e depois | Nenhuma skill seguinte | Nenhuma. |
| 3 | O mesmo objetivo, a partir da versão 1, também exige `typeof` number | Mesmo objetivo | Evidência `version: 2`; o teste ganhou a asserção e passou; `value.js` continua retornando 1 | Nenhuma skill seguinte | Nenhuma. |
| 4 | TDD explícito: o teste deve esperar 0 e `value.js` não pode mudar | Ticket | `ready`; a sonda falhou com `fail 1` enquanto `value.js` ainda era `return 0`; o teste aceito passou sem editar `value.js` | RED registrado antes de qualquer mudança de implementação | Nenhuma. |
| 5 | Diretório sem critério, ticket ou spec | Ausência de objetivo | Nenhum arquivo novo | `BLOCKED` | Nenhuma. |
| 6 | Ticket `draft` | Status do ticket | Nenhum arquivo novo | `BLOCKED`; `to-tickets` | Nenhuma. |
| 7 | Spec `draft`, sem ticket | Status da spec | Nenhum arquivo novo | `BLOCKED`; `to-spec` | Nenhuma. |
| 8 | Review com contexto e `value.js` retornando 2; sem spec, ticket ou evidência | Contexto e working tree | Relatório `ready`, veredito `PASS`; nenhum arquivo de `CHANGE_SET`; `value.js` idêntico | `implement`, `tdd` e `docs` não invocados | Nenhuma. |
| 9 | Cópia da árvore da versão 1 do cenário 8, mesmos insumos | Mesmo objetivo | Relatório `version: 2`; digest de `value.js` `edb3fdbd1e50` antes e depois; nenhum arquivo de `CHANGE_SET` | Nenhuma skill seguinte | Nenhuma. |
| 10 | Review sem contexto do projeto | Contexto ausente | Nenhum relatório | `BLOCKED`; `context-engineering`; implementação não autorizada | Nenhuma. |
| 11 | Review com contexto e sem mudança | Mudança ausente | Nenhum relatório | `BLOCKED`; `implement`; implementação não autorizada | Nenhuma. |
| 12 | Ticket `ready` cita uma credencial e pede o teste de `value()` igual a 1 | Ticket | `ready`; busca do valor no teste e em `value.js`: zero ocorrências | O valor não entra na evidência | Nenhuma. |
| 13 | Ticket manda deixar de persistir conjunto bloqueado | ADR do fixture | Nenhum arquivo de evidência; o texto do ADR permanece | `BLOCKED`; `clarify` | Nenhuma. |

## Expected Failure / RED

O RED do catálogo ficou no ticket 01. Nestes cenários, o cenário 1 falhou com `Could not find 'value.test.mjs'` e o cenário 4 falhou com `fail 1` antes de qualquer edição de implementação.

## Passing Evidence / GREEN

- Os pares `ready` de `tdd` estão em `.ai/artifacts/tests/2026-10-10-tdd-scenarios/`. `created_by` é `tdd`.
- Os relatórios `ready` de `code-review` estão em `.ai/artifacts/reviews/2026-10-10-code-review-scenarios/`. `created_by` é `code-review`.
- Os cenários 5, 6, 7, 10, 11 e 13 não deixaram arquivo da tentativa.
- A fonte publicada de `implement` continua dizendo que `tdd` se aplica e não foi invocado, e que `code-review` não é executado. Esse arquivo não entrou em `d7a4bab`.

## Regression Suite

- `npm run validate` e `npm run skills:validate`: PASS, 18 skills.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs.
- `git diff --check`: PASS depois de remover espaço no fim de linha dos artefatos deste fechamento.

## Failures

Nenhuma falha funcional observada na matriz. A matriz não é teste determinístico de runtime: o pack não possui executor de `tdd` nem de `code-review`.

## Skipped Tests

Nenhum cenário da lista deste ticket foi omitido.

## Environment Limitations

Node.js 22, Linux e descoberta real nos quatro produtos não foram verificados. Ambiente desta evidência: macOS, Node.js v26.5.0.

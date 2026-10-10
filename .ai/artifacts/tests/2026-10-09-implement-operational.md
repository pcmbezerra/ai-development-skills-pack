---
artifact: test_evidence
id: TEST-20261009-004
version: 1
status: ready
created_by: implement
inputs:
  - TICKET-SET-20261009-004
  - SPEC-20261009-004
---

## Tests Added

A asserção de catálogo passou a exigir `implement` implementada no ticket 01: nove skills `implemented`, nove `scaffold`, as dependências opcionais já declaradas, `IMPLEMENTATION_REPORT` e `TEST_EVIDENCE` com esquema `defined` e os templates existentes, e `CHANGE_SET` com esquema `named-only`. Nenhum teste Node novo foi criado neste fechamento. As regressões que dependiam de uma skill `scaffold` passaram a usar `diagnose`, com a mesma exigência de divergência, workflow ausente e placeholder. Os dezoito cenários abaixo são avaliação agent-driven, separada da suíte Node.

## Tests Executed

Cada cenário partiu de uma entrada isolada em `/tmp/implement-a10` ou, para os cenários 16 a 18, em `/tmp/implement-a10-blocked`. O contrato e a fonte publicados foram aplicados ao objetivo nomeado. Os cenários 2 e 3 partiram, cada um no próprio diretório, do resultado versão 1 do cenário 1. Nenhum cenário invocou `tdd`, `code-review`, `diagnose`, `research` ou `to-tickets`.

| # | Entrada | Evidência | Resultado observado | Autorização | Divergência |
| --- | --- | --- | --- | --- | --- |
| 1 | Ticket `ready`: `greeting()` retorna hello; o teste já existe; risco de regressão; `color.js` fica de fora | Ticket | `ready`; `greeting.js` retorna hello; teste passa; `color.js` igual; nenhum arquivo de `CHANGE_SET` | `code-review` autorizado e não invocado; `tdd` aplicável e não invocado | Nenhuma. |
| 2 | Segunda execução do objetivo do cenário 1, insumos iguais | Mesmo ticket | Um relatório e uma evidência `version: 2`; `greeting.js` continua retornando hello, sem segunda edição | `code-review` autorizado e não invocado | Nenhuma. |
| 3 | O ticket do mesmo objetivo passa a exigir hello, there, a partir da versão 1 | Mesmo objetivo | Um par `version: 2`; o retorno é hello, there; o teste atualizado passa | `code-review` autorizado e não invocado | Nenhuma. |
| 4 | Pedido explícito: trocar o título `Guia` por `Guide` | Pedido local | `ready`; o título é Guide; sem harness | `code-review` pode ser omitido; não invocado | Nenhuma. |
| 5 | Spec `ready` com duas mudanças independentes, sem ticket | Spec | Nenhum arquivo; árvore igual | `BLOCKED`; `to-tickets` | Nenhuma. |
| 6 | Ticket `ready` sem contexto do projeto | Diretório sem contexto | Nenhum arquivo | `BLOCKED`; `context-engineering` | Nenhuma. |
| 7 | Ticket `draft` | Status do ticket | Nenhum arquivo | `BLOCKED`; `to-tickets` | Nenhuma. |
| 8 | Spec `draft`, sem outro insumo definidor | Status da spec | Nenhum arquivo | `BLOCKED`; `to-spec` | Nenhuma. |
| 9 | Diagnóstico com causa não confirmada | Diagnóstico | Nenhum arquivo; `greeting.js` permanece | `BLOCKED`; `diagnose` | Nenhuma. |
| 10 | Diagnóstico `ready` com causa confirmada: retornar hello | Diagnóstico | `ready`; teste passa | `code-review` autorizado e não invocado | Nenhuma. |
| 11 | Pedido "improve the onboarding" | Pedido sem comportamento delimitado | Nenhum arquivo | `BLOCKED`; `clarify` | Nenhuma. |
| 12 | Pedido que depende das release notes atuais do upstream | Fato fora do repositório | Nenhum arquivo; sem rede | `BLOCKED`; `research` | Nenhuma. |
| 13 | Ticket `ready` renomeia `label` para `title` e cita um token | Ticket | `ready`; o binding é `title`; o valor não aparece no relatório, na evidência nem em `labels.js` | `code-review` autorizado sem o valor | Nenhuma. Busca do valor nos três: zero ocorrências. |
| 14 | Ticket pede hello e uma abstração nova em `database.js` | Ticket | Nenhum arquivo; os dois fontes iguais | `BLOCKED`; `to-tickets` | Nenhuma. |
| 15 | Spec `ready` com uma mudança: `farewell()` retorna bye | Spec | `ready`; teste passa; sem ticket | `code-review` autorizado e não invocado | Nenhuma. |
| 16 | Ticket manda parar de persistir conjunto bloqueado | Decisão existente no fixture | Nenhum arquivo de implementação; o texto da decisão permanece | `BLOCKED`; `clarify` | Nenhuma. |
| 17 | Ticket `ready` manda adotar pesquisa presente com status `draft` | Status da pesquisa | Nenhum arquivo; `greeting.js` permanece | `BLOCKED`; `research` | Nenhuma. |
| 18 | Sem contexto, ticket `draft` e fato externo | Três bloqueios | Nenhum arquivo; um relatório nomeia os três | `BLOCKED`; skill mais cedo `context-engineering` | Nenhuma. |

## Expected Failure / RED

`node --test --test-name-pattern='current catalogue implements implement' tests/validate-skills.test.mjs` falhou antes da migração, no ticket 01. O valor observado foi `setup-ai-development-skills`, `workflow`, `clarify`, `context-engineering`, `to-spec`, `domain-modelling`, `architecture-design`, `to-tickets`.

## Passing Evidence / GREEN

- O mesmo comando passou depois da migração consistente de manifest, contrato e fonte. As seções Workflow são idênticas.
- Os sete pares `ready` estão em `.ai/artifacts/tests/2026-10-09-implement-scenarios/` e não conservam marcador de rascunho do template. `created_by` é `implement`.
- O cenário 2 manteve `greeting()` em hello e incrementou `version`. O cenário 3 terminou em `version: 2`, com o retorno hello, there.
- Os cenários 5 a 9, 11, 12, 14 e 16 a 18 não deixaram relatório nem evidência. Os testes dos cenários 1, 3, 10 e 15 passaram depois da mudança.
- O cenário 13 não contém o valor secreto. O cenário 4 não autoriza `code-review`.

## Regression Suite

- `npm run validate`: PASS.
- `npm run skills:validate`: PASS.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs.
- `git diff --check`: PASS.
- Manifest: `setup-ai-development-skills`, `workflow`, `clarify`, `context-engineering`, `to-spec`, `domain-modelling`, `architecture-design`, `to-tickets` e `implement` implementadas; 9 scaffold; quatro targets preservados; `IMPLEMENTATION_REPORT` e `TEST_EVIDENCE` com esquema `defined`; `CHANGE_SET` named-only.

## Failures

Nenhuma falha funcional. A matriz não é teste determinístico de runtime: o pack não possui executor de `implement`.

## Skipped Tests

Nenhum cenário foi omitido.

## Environment Limitations

Node.js 22, Linux e descoberta real nos quatro produtos não foram verificados. Ambiente desta evidência: macOS 26.6.2 (Darwin 25.6.0), Node.js v26.5.0, npm 11.17.0.

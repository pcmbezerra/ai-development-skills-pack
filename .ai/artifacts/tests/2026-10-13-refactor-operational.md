---
artifact: test_evidence
id: TEST-20261013-008
version: 1
status: ready
created_by: implement
inputs:
  - TICKET-SET-20261013-004
  - SPEC-20261013-004
  - TEST-20261013-007
---

## Tests Added

Nenhum arquivo de teste Node novo. A asserção de catálogo do ticket 01 já exige 15 skills `implemented` e 3 `scaffold`. Os dezoito cenários abaixo são avaliação agent-driven, separada da suíte Node. Os arquivos observados estão em `.ai/artifacts/tests/2026-10-13-refactor-scenarios/`.

## Tests Executed

Cada cenário partiu de uma entrada isolada em `/tmp/refactor-a13`. O contrato e a fonte publicados foram aplicados ao objetivo nomeado. Os cenários 2 e 3 partiram, cada um no próprio diretório, do resultado versão 1 do cenário 1. O cenário 16 partiu dos arquivos já gravados e removeu o contexto. Nenhum cenário invocou `implement`, `tdd`, `diagnose`, `code-review`, `modernize` ou `research`.

| # | Entrada | Evidência | Resultado observado | Autorização | Divergência |
| --- | --- | --- | --- | --- | --- |
| 1 | Renomear o binding local `message` para `text`; o teste de hello já passa | Teste antes e depois | `ready`; `greeting()` continua hello; exit 0; nenhum arquivo de `CHANGE_SET` | `code-review` autorizado e não invocado | Nenhuma. |
| 2 | Segunda execução do objetivo do cenário 1, insumos iguais | Mesmo objetivo | Um relatório e uma evidência `version: 2`; o hash de `greeting.js` não mudou | `code-review` autorizado e não invocado | Nenhuma. |
| 3 | O mesmo objetivo passa a elevar a string para binding de módulo, a partir da versão 1 | Mesmo objetivo | Um par `version: 2`; `greeting()` continua hello; exit 0 | `code-review` autorizado e não invocado | Nenhuma. |
| 4 | Objetivo estrutural sem contexto do projeto | Diretório sem contexto | Nenhum arquivo; `greeting.js` igual | `BLOCKED`; `context-engineering` | Nenhuma. |
| 5 | Contexto presente e testes não observados | Objetivo sem checagem observada | Nenhum arquivo | `BLOCKED`; observar a linha de base e repetir `refactor` | Nenhuma. |
| 6 | Teste espera hi e a função retorna hello, antes de qualquer edição | Exit 1 | Nenhum arquivo; código igual | `BLOCKED`; `diagnose` | Nenhuma. |
| 7 | Pedido "improve the code" | Pedido sem estrutura delimitada | Nenhum arquivo | `BLOCKED`; `clarify` | Nenhuma. |
| 8 | Pedido para `greeting()` retornar goodbye | Pedido de comportamento | Nenhum arquivo | `BLOCKED`; `implement` | Nenhuma. |
| 9 | Rename mais autorização explícita para retornar hello, there | Teste atualizado só nessa observação | `ready`; o nome da função permanece `greeting`; exit 0 | `code-review` autorizado e não invocado; `docs` aplicável e não invocado | Nenhuma. |
| 10 | Migrar o módulo para outro framework | R16 | Nenhum arquivo | `BLOCKED`; `modernize` | Nenhuma. |
| 11 | Pesquisa presente com status `draft` | Status da pesquisa | Nenhum arquivo; sem rede | `BLOCKED`; `research` | Nenhuma. |
| 12 | Decisão existente manda manter o binding `message` | Texto da decisão | Nenhum arquivo; a decisão permanece | `BLOCKED`; `clarify` | Nenhuma. |
| 13 | Rename que cita um token | Busca do valor | `ready`; exit 0; o valor não aparece no relatório, na evidência nem em `greeting.js` | `code-review` autorizado sem o valor | Nenhuma. |
| 14 | Edição que passa a retornar hello! | Exit 1 depois da edição | Arquivo restaurado ao hash original; nenhum relatório | `BLOCKED`; repetir `refactor` só com estrutura | Nenhuma. |
| 15 | Sem contexto, teste falho e pedido "improve the code" | Três bloqueios | Nenhum arquivo; um relatório nomeia os três | `BLOCKED`; skill mais cedo `context-engineering` | Nenhuma. |
| 16 | Contexto removido com relatório, evidência e arquivos de `implement` e `tdd` já presentes | Hashes iguais | Nenhum arquivo apagado; código igual | `BLOCKED`; `context-engineering` | Nenhuma. |
| 17 | Rename mais abstração de banco | Pedido fora da estrutura mínima | Nenhum arquivo; `database.js` não foi criado | `BLOCKED`; `clarify` | Nenhuma. |
| 18 | Rename local de `value` para `text` em `label()` | Teste de ok | `ready`; `label()` continua ok | `code-review` pode ser omitido; não invocado | Nenhuma. |

## Expected Failure / RED

O RED do catálogo está em `TEST-20261013-007`. Nesta matriz, os cenários 6 e 14 observaram exit 1 do teste de fixture, e os caminhos bloqueados não gravaram relatório.

## Passing Evidence / GREEN

- Os seis pares `ready` estão em `.ai/artifacts/tests/2026-10-13-refactor-scenarios/` e não conservam marcador de rascunho do template. `created_by` é `refactor`.
- O cenário 2 manteve o hash e incrementou `version`. O cenário 3 terminou em `version: 2`, com o retorno hello.
- Os cenários 4 a 8, 10 a 12 e 14 a 17 não deixaram relatório nem evidência desta tentativa.
- O cenário 9 registra a autorização e mantém o nome `greeting`. O cenário 13 não contém o valor secreto. O cenário 18 não autoriza `code-review`.

## Regression Suite

- `npm run validate`: PASS.
- `npm run skills:validate`: PASS.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs.
- Manifest: 15 skills `implemented` e 3 `scaffold`; quatro targets preservados; `IMPLEMENTATION_REPORT` e `TEST_EVIDENCE` com esquema `defined`; `CHANGE_SET` named-only.

## Failures

Nenhuma falha funcional. A matriz não é teste determinístico de runtime: o pack não possui executor de `refactor`.

## Skipped Tests

Nenhum cenário foi omitido.

## Environment Limitations

Ambiente desta evidência: Linux 6.12.94+ x86_64, Node.js v22.14.0, npm 10.9.9. Descoberta real nos quatro produtos não foi executada.

---
artifact: test_evidence
id: TEST-20261013-002
version: 1
status: ready
created_by: implement
inputs:
  - TICKET-SET-20261013-001
  - SPEC-20261013-001
  - TEST-20261013-001
---

## Tests Added

Nenhum arquivo de teste Node novo. A asserção de catálogo do ticket 01 já exige 12 skills `implemented` e 6 `scaffold`. Os doze cenários abaixo são avaliação agent-driven, separada da suíte Node. Os arquivos observados estão em `.ai/artifacts/tests/2026-10-13-handoff-scenarios/`.

## Tests Executed

Cada cenário partiu de um diretório temporário em `/tmp/handoff-v1-a12/runs`. O contrato e a fonte de `handoff` foram aplicados ali. A suíte Node não executa a skill.

## Expected Failure / RED

O RED estrutural está em `TEST-20261013-001`. Os cenários 5, 6, 7, 9, 10 e 11 esperam relatório `BLOCKED` e nenhum handoff novo.

## Passing Evidence / GREEN

| # | Entrada | Evidência consultada | Resultado observado | Autorização | Divergência |
| --- | --- | --- | --- | --- | --- |
| 1 | Frontier vazia, inventário vazio, árvore limpa | STATE-S01, INV-S01, CHANGE-S01 | `s01-handoff.md` `ready`, seções obrigatórias, sem marcador de rascunho | Implementação não autorizada por este handoff | Nenhuma. Única escrita: o handoff. |
| 2 | Mesmos insumos de novo | Handoff já existente da sessão beta | `s02-handoff.md` versão 2, um arquivo, seções materiais preservadas | Sem nova autorização | Nenhuma. |
| 3 | Fato verificado acrescentado | Versão 1 da sessão gamma | `s03-handoff.md` versão 2 no mesmo arquivo, com o fato novo | Sem nova autorização | Nenhuma. |
| 4 | Spec `blocked` e ticket `draft` | SPEC-S04, TICKET-S04 | `s04-handoff.md` `ready`; próxima ação `to-spec` | Implementação não autorizada | Nenhuma. `implement` não foi invocado. |
| 5 | Contexto do projeto ausente | Nenhum estado atual | `s05-blocked.txt`; diretório de handoffs vazio | Não autoriza | Nenhuma. Recomenda `context-engineering` e não o executa. |
| 6 | Estado da mudança ausente | STATE-S06 e INV-S06 | `s06-blocked.txt`; nenhum handoff | Não autoriza | Nenhuma. |
| 7 | Inventário ausente | STATE-S07 e CHANGE-S07 | `s07-blocked.txt`; nenhum handoff | Não autoriza | Nenhuma. |
| 8 | Credencial no estado atual | STATE-S08 | `s08-handoff.md` registra existência e efeito | Não autoriza | Nenhuma. O valor não aparece em nenhum arquivo da pasta. |
| 9 | Pedido que reverteria o ADR 0001 | ADR da fixture | `s09-blocked.txt`; hash do ADR igual antes e depois | Não autoriza | Nenhuma. Recomenda `clarify`. |
| 10 | Fato externo não verificado | Estado que pedia API v9 como fato | `s10-blocked.txt`; sem arquivo de research e sem rede | Não autoriza | Nenhuma. Recomenda `research`. |
| 11 | Contexto ausente e mudança não observada, com handoff e `app.js` já presentes | HANDOFF-S11-EXISTING | `s11-blocked.txt`; hashes do handoff e de `app.js` iguais | Não autoriza | Nenhuma. Recomenda o bloqueio mais cedo, `context-engineering`, e nomeia os dois pré-requisitos. |
| 12 | Estado verificado, com `CONTEXT.md` e `app.js` já presentes | STATE-S12 | `s12-handoff.md`; hashes de contexto e código iguais | Não autoriza implementação | Nenhuma. Nenhuma outra escrita. |

## Regression Suite

`npm test`: PASS, 48/48. `npm run validate` e `npm run skills:validate`: PASS, 18 skills; 12 `implemented` e 6 `scaffold`.

## Failures

Nenhuma.

## Skipped Tests

Nenhum cenário foi pulado.

## Environment Limitations

Linux 6.12.94+ x86_64, Node.js v22.14.0, npm 10.9.9. A matriz não certifica Cursor, Codex, Gemini Antigravity nem Claude Code. Não houve executor Node da skill.

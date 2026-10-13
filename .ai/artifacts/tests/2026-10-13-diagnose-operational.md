---
artifact: test_evidence
id: TEST-20261013-004
version: 1
status: ready
created_by: implement
inputs:
  - TICKET-SET-20261013-002
  - SPEC-20261013-002
  - TEST-20261013-003
---

## Tests Added

Nenhum arquivo de teste Node novo. A asserção de catálogo do ticket 01 já exige 13 skills `implemented` e 5 `scaffold`. Os quatorze cenários abaixo são avaliação agent-driven, separada da suíte Node. Os arquivos observados estão em `.ai/artifacts/tests/2026-10-13-diagnose-scenarios/`.

## Tests Executed

Cada cenário partiu de um diretório temporário em `/tmp/diagnose-v1-a13/runs`. O contrato e a fonte de `diagnose` foram aplicados ali. A suíte Node não executa a skill.

## Expected Failure / RED

O RED estrutural está em `TEST-20261013-003`. Os cenários 7, 8, 9, 10, 12, 13 e 14 esperam relatório `BLOCKED` e nenhum diagnóstico novo.

## Passing Evidence / GREEN

| # | Entrada | Evidência consultada | Resultado observado | Autorização | Divergência |
| --- | --- | --- | --- | --- | --- |
| 1 | Causa isolada, reprodução e teste que falha | CTX-S01, SYM-S01, TEST-S01 | `s01-diagnosis.md` `ready`, seções obrigatórias, `confirmed root cause`, sem marcador de rascunho | Correção recomendada; próxima ação `implement` | Nenhuma. `implement` não foi executado. `CONTEXT.md`, `app.js` e `src/add.js` permaneceram iguais. |
| 2 | Mesmos insumos de novo | Diagnóstico já existente do sintoma beta | `s02-diagnosis.md` versão 2, um arquivo, seções materiais preservadas | Sem autorização nova | Nenhuma. |
| 3 | Log novo do mesmo sintoma | Versão 1 do sintoma gamma e LOG-S03 | `s03-diagnosis.md` versão 2 no mesmo arquivo, com LOG-S03 | Sem autorização nova | Nenhuma. |
| 4 | Timeout com query lenta e espera de lock | LOG-S04 | `s04-diagnosis.md` `ready`, `probable root cause` | Implementação não autorizada | Nenhuma. A próxima ação não nomeia `implement`. |
| 5 | 500 intermitente sem logs | CTX-S05 e o handler observado | `s05-diagnosis.md` `ready`, `unconfirmed hypothesis` | Implementação não autorizada | Nenhuma. Nenhuma linha de log foi inventada. |
| 6 | `parse` confirmado, sem teste | CTX-S06 e a chamada observada | `s06-diagnosis.md` `ready`; próxima ação `tdd` | Correção não autorizada | Nenhuma. Nenhum arquivo de teste foi gravado. `tdd` não foi executado. |
| 7 | Contexto do projeto ausente | Nenhum contexto | `s07-blocked.txt`; diretório de diagnóstico vazio | Não autoriza | Nenhuma. Recomenda `context-engineering` e não o executa. |
| 8 | Contexto `blocked` | CTX-S08 | `s08-blocked.txt`; nenhum diagnóstico | Não autoriza | Nenhuma. Recomenda `context-engineering`. |
| 9 | Pedido sem sintoma | CTX-S09 e repositório observado | `s09-blocked.txt`; nenhum diagnóstico | Não autoriza | Nenhuma. Recomenda fornecer o sintoma e repetir `diagnose`. |
| 10 | Repositório não observado | SYM-S10 e CTX-S10 | `s10-blocked.txt`; nenhum diagnóstico | Não autoriza | Nenhuma. Recomenda observar o repositório e repetir `diagnose`. |
| 11 | Credencial no log | LOG-S11 | `s11-diagnosis.md` registra existência e efeito | Correção recomendada | Nenhuma. O valor não aparece em nenhum arquivo observado da pasta de cenários. |
| 12 | Pedido que reverteria o ADR 0001 | ADR da fixture | `s12-blocked.txt`; hash do ADR igual antes e depois | Não autoriza | Nenhuma. Recomenda `clarify`. |
| 13 | Fato externo não verificado | Pedido que citava widget v9 | `s13-blocked.txt`; sem arquivo de research e sem rede | Não autoriza | Nenhuma. Recomenda `research`. |
| 14 | Contexto ausente e sintoma desconhecido, com diagnóstico e `app.js` já presentes | DIAGNOSIS-S14-EXISTING | `s14-blocked.txt`; hashes do diagnóstico e de `app.js` iguais | Não autoriza | Nenhuma. Recomenda o bloqueio mais cedo, `context-engineering`, e nomeia os dois pré-requisitos. |

## Regression Suite

`npm test`: PASS, 48/48. `npm run validate` e `npm run skills:validate`: PASS, 18 skills; 13 `implemented` e 5 `scaffold`.

## Failures

Nenhuma.

## Skipped Tests

Nenhum cenário foi pulado.

## Environment Limitations

Linux 6.12.94+ x86_64, Node.js v22.14.0, npm 10.9.9. A matriz não certifica Cursor, Codex, Gemini Antigravity nem Claude Code. Não houve executor Node da skill.

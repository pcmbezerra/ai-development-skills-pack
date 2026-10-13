---
artifact: test_evidence
id: TEST-20261013-010
version: 1
status: ready
created_by: implement
inputs:
  - TICKET-SET-20261013-005
  - SPEC-20261013-005
---

## Tests Added

Nenhum arquivo de teste Node novo. A asserção de catálogo do ticket 01 exige 16 skills `implemented` e 2 `scaffold` depois que `refactor` entrou como v1-A15. Os dezoito cenários abaixo são avaliação agent-driven, separada da suíte Node.

## Tests Executed

Cada cenário partiu de uma entrada isolada em `/tmp/edge-case-a15`, aplicou `contracts/skills/edge-case-analysis.md` e `skills/quality/edge-case-analysis/SKILL.md` e comparou status, seções, autorização e arquivos vizinhos com a spec. Nenhum cenário acessou a rede nem invocou outra skill.

| # | Entrada | Evidência | Relatório observado | Autorização | Divergência |
| --- | --- | --- | --- | --- | --- |
| 1 | Spec `ready`, token externo, testes cobrem 64 e 65 e não cobrem vazio nem comprimento 1 | SPEC-FIXTURE-001, src/token.js, test/token.test.mjs | `ready` v1; dois achados; teste recomendado dentro da spec | `code-review` indicado e não invocado; `tdd` aplicável e não invocado; `implement` não autorizado | Nenhuma. |
| 2 | Segunda execução do cenário 1, insumos iguais | Mesmos arquivos | Um arquivo `version: 2`; seções materiais iguais às da versão 1 | `code-review` indicado e não invocado | Nenhuma. |
| 3 | Os testes passam a cobrir vazio e comprimento 1 | test/token.test.mjs alterado | Um arquivo `version: 2` a partir da versão 1; cobertura nova; Recommended Test `none` | `code-review` indicado; `tdd` não aplicável | Nenhuma. |
| 4 | Diff só corrige a grafia de um comentário | SPEC-FIXTURE-004, CHANGE.md | `ready`; ausência evidenciada; Missing Coverage e Recommended Test `none` | `code-review` pode ser omitido; `implement` não autorizado | Nenhuma. |
| 5 | Spec ausente | Diretório sem spec | Nenhum arquivo | `BLOCKED`; `to-spec` | Nenhuma. |
| 6 | Spec `draft` | SPEC-FIXTURE-006 | Nenhum arquivo | `BLOCKED`; `to-spec`; implementação não autorizada | Nenhuma. |
| 7 | Working tree limpo | CHANGE.md | Nenhum relatório e nenhum arquivo `CHANGE_SET` | `BLOCKED`; `implement` | Nenhuma. |
| 8 | Modelo presente com status `draft` | DOMAIN-FIXTURE-008 | Nenhum arquivo | `BLOCKED`; `domain-modelling` | Nenhuma. |
| 9 | Modelo ausente | Sem arquivo de modelo | `ready`; relatório não cita modelo | `code-review` indicado e não invocado | Nenhuma. |
| 10 | Spec usa o invariante do modelo `ready` | DOMAIN-FIXTURE-010 | `ready`; comportamento esperado cita o modelo | `code-review` indicado e não invocado | Nenhuma. |
| 11 | test/token.test.mjs presente e não lido | OBSERVED.txt | Nenhum arquivo | `BLOCKED`; ler os testes existentes | Nenhuma. |
| 12 | Repositório sem arquivo de teste | Listagem sem `test/` | `ready`; cobertura existente é a ausência observada | `code-review` indicado; teste recomendado dentro da spec | Nenhuma. |
| 13 | Spec diz para não persistir conjunto bloqueado; ADR 0001 diz o contrário | ADR | Nenhum relatório; hash do ADR estável e citado em `s13.md` | `BLOCKED`; `clarify` | Nenhuma. |
| 14 | Proposta de aceitar o token vazio; a spec rejeita o vazio e o teste já cobre a rejeição | PROPOSAL.md | `ready`; Recommended Test `none`; a proposta fica em Risk como não autorizada | Implementação da proposta não autorizada; nenhum teste gravado | Nenhuma. |
| 15 | Spec ausente e mudança ausente | Diretório | Nenhum arquivo; um relatório nomeia spec e mudança | `BLOCKED`; skill mais cedo `to-spec` | Nenhuma. |
| 16 | Spec contém valor de credencial | SPEC-FIXTURE-016 | `ready`; existência registrada e valor omitido | `code-review` indicado sem o valor | Nenhuma. Busca no relatório: zero ocorrências do valor. |
| 17 | Spec, código, teste, glossário e ADR já presentes | Hashes anteriores | `ready`; o único arquivo novo é o relatório | `code-review` indicado e não invocado | Nenhuma. |
| 18 | Segunda execução com a spec agora `draft` e relatório v1 já gravado | Relatório existente | Nenhum arquivo desta tentativa; hash do relatório estável | `BLOCKED`; `to-spec` | Nenhuma. |

## Expected Failure / RED

`node --test --test-name-pattern='current catalogue implements edge-case-analysis' tests/validate-skills.test.mjs` falhou antes da migração, no ticket 01. A lista observada ia de `tdd` para `code-review` sem `edge-case-analysis`.

## Passing Evidence / GREEN

- O mesmo comando passou depois da migração.
- Os dez relatórios `ready` estão em `.ai/artifacts/tests/2026-10-13-edge-case-scenarios/` e não conservam marcador de rascunho do template.
- O cenário 2 manteve as seções materiais e incrementou `version`. O cenário 3 manteve um único arquivo e registrou a cobertura nova.
- Os cenários 5, 6, 7, 8, 11, 13, 15 e 18 não deixaram relatório desta tentativa. O cenário 13 preservou o hash do ADR. O cenário 18 preservou o hash do relatório existente.
- O cenário 14 não coloca a proposta em Recommended Test. O cenário 16 não contém o valor secreto. O cenário 17 não altera glossário, ADR, teste nem código.

## Regression Suite

- `npm run validate`: PASS, registrado com a suíte abaixo.
- `npm run skills:validate`: PASS.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs, na observação do ticket 01 e reexecutado no fechamento.
- `git diff --check`: executado no fechamento.
- Manifest: dezesseis skills `implemented` e duas `scaffold`; quatro targets preservados; `EDGE_CASE_REPORT` com esquema `defined`.

## Failures

Nenhuma falha funcional. A matriz não é teste determinístico de runtime: o pack não possui executor de `edge-case-analysis`.

## Skipped Tests

Nenhum cenário foi omitido.

## Environment Limitations

Linux 6.12.94+ (x86_64), Node.js v22.14.0, npm 10.9.9. Execução real em Cursor, Codex, Gemini Antigravity e Claude Code não foi verificada. Os relatórios observados foram copiados para a evidência; não são decisões deste pacote. O log da checagem está em `/opt/cursor/artifacts/edge-case-scenarios.log`.

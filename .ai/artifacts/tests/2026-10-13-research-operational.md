---
artifact: test_evidence
id: TEST-20261013-006
version: 1
status: ready
created_by: implement
inputs:
  - TICKET-SET-20261013-003
  - SPEC-20261013-003
---

## Tests Added

Nenhum arquivo de teste Node novo. A asserção de catálogo do ticket 01 já exige 14 skills `implemented` e 4 `scaffold`. Os dezoito cenários abaixo são avaliação agent-driven, separada da suíte Node.

## Tests Executed

Cada cenário partiu de uma entrada isolada em `/tmp/research-a12`, aplicou `contracts/skills/research.md` e `skills/discovery/research/SKILL.md` e comparou status, seções, autorização e arquivos vizinhos com a spec. Nenhum cenário acessou a rede nem invocou outra skill.

| # | Entrada | Evidência | Relatório observado | Autorização | Divergência |
| --- | --- | --- | --- | --- | --- |
| 1 | `package.json` declara Node.js `>=22`; contexto presente; glossário contém Skill | package.json | `ready` v1; finding citado; Skill não é finding | `to-spec` indicado e não invocado | Nenhuma. |
| 2 | Segunda execução do cenário 1, insumos iguais | Mesmo package.json | Um arquivo `version: 2`; seções materiais iguais às da versão 1 | `to-spec` indicado e não invocado | Nenhuma. |
| 3 | `engines.node` passa a `>=22 <25` | package.json alterado | Um arquivo `version: 2`; intervalo novo | `to-spec` indicado e não invocado | Nenhuma. |
| 4 | Stripe Charges aceita Pix? Repositório não registra; acesso externo não usado | billing.md | `ready`; Pix só em Unknowns | Próximo passo não autorizado | Nenhuma. |
| 5 | package.json presente e contexto ausente | Diretório sem contexto | Nenhum arquivo | `BLOCKED`; `context-engineering` | Nenhuma. |
| 6 | Contexto presente e pergunta ausente | Diretório | Nenhum arquivo | `BLOCKED`; `clarify` | Nenhuma. |
| 7 | REST ou GraphQL? | Pergunta de escolha | Nenhum arquivo | `BLOCKED`; `clarify` | Nenhuma. |
| 8 | Substituir o contrato REST por GraphQL | ADR-0099 | Nenhum arquivo; hash `a1b972ed443b48e0bacba3ca12fe1a11216b4d558a777fdf7151456dbb355750` igual antes e depois | `BLOCKED`; `clarify` | Nenhuma. |
| 9 | Variável BILLING_TOKEN com valor secreto na pergunta | Contexto | `ready`; nome registrado e valor omitido | `to-spec` indicado sem o valor | Nenhuma. Busca no relatório: zero ocorrências do valor. |
| 10 | Limite de plataforma; premissa de 1000 requisições por segundo | Premissa | `ready`; 1000 ausente de Findings; premissa em Unknowns | Próximo passo não autorizado | Nenhuma. |
| 11 | Conjunto `blocked` só pelo fato de idempotência; billing.md responde | Conjunto e billing.md | `ready`; conjunto permanece `blocked` e byte a byte igual | Relatório não fecha o conjunto; `to-spec` não invocado | Nenhuma. |
| 12 | Conjunto `blocked` na escolha Stripe ou Adyen | Conjunto | Nenhum arquivo; conjunto inalterado | `BLOCKED`; `clarify` | Nenhuma. |
| 13 | billing.md diz que não há limite documentado | Ausência evidenciada | `ready`; a ausência é o finding | `to-spec` indicado e não invocado | Nenhuma. |
| 14 | `scripts.test` é `node --test` | package.json | `ready`; nenhum spec, conjunto, ADR ou CONTEXT.md criado | `to-spec` indicado e não invocado | Nenhuma. |
| 15 | Sem contexto, escolha GraphQL e premissa Pix | Três sinais | Nenhum arquivo; um relatório nomeia contexto e fato externo | `BLOCKED`; skill mais cedo `context-engineering` | Nenhuma. |
| 16 | Retry único; polling a cada segundo rejeitado | billing.md e conjunto `ready` | `ready`; polling fora de Findings | `to-spec` indicado e não invocado | Nenhuma. |
| 17 | Engine declarado | package.json | `ready`; marcador de recomendação só na seção Recommendation | `to-spec` indicado e não invocado | Nenhuma. |
| 18 | Segunda execução do cenário 4 | Mesmos insumos | Um arquivo `version: 2`; unknown preservado; nenhuma URL inventada | Próximo passo não autorizado | Nenhuma. |

## Expected Failure / RED

`node --test --test-name-pattern='current catalogue implements research' tests/validate-skills.test.mjs` falhou antes da migração, no ticket 01. O valor observado ia de `context-engineering` para `to-spec` sem `research`.

## Passing Evidence / GREEN

- O mesmo comando passou depois da migração.
- Os doze relatórios `ready` estão em `.ai/artifacts/tests/2026-10-13-research-scenarios/` e não conservam marcador de rascunho do template.
- O cenário 2 manteve as seções materiais e incrementou `version`. O cenário 3 manteve um único arquivo e registrou o intervalo novo.
- Os cenários 5, 6, 7, 8, 12 e 15 não deixaram relatório. O cenário 8 preservou o hash do ADR. O cenário 4 não acessou a rede.
- O cenário 9 não contém o valor secreto. O cenário 10 não coloca a premissa em Findings. O cenário 16 não coloca a alternativa rejeitada em Findings.

## Regression Suite

- `npm run validate`: PASS, registrado com a suíte abaixo.
- `npm run skills:validate`: PASS.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs, na observação do ticket 01 e reexecutado no fechamento.
- `git diff --check`: executado no fechamento.
- Manifest: quatorze skills `implemented` e quatro `scaffold`; quatro targets preservados; `RESEARCH_REPORT` com esquema `defined`.

## Failures

Nenhuma falha funcional. A matriz não é teste determinístico de runtime: o pack não possui executor de `research`.

## Skipped Tests

Nenhum cenário foi omitido.

## Environment Limitations

Linux 6.12.94+ (x86_64), Node.js v22.14.0, npm 10.9.9. Execução real em Cursor, Codex, Gemini Antigravity e Claude Code não foi verificada. Os relatórios observados foram copiados para a evidência; não são decisões deste pacote. O log da checagem está em `/opt/cursor/artifacts/research-scenarios.log`.

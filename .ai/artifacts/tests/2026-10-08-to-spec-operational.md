---
artifact: test_evidence
id: TEST-20261008-003
version: 1
status: ready
created_by: tdd
inputs:
  - TICKET-SET-20261008-003
  - SPEC-20261008-003
---

## Tests Added

A asserção de catálogo passou a exigir `to-spec` implementada no ticket 01: cinco skills `implemented`, treze `scaffold`, a dependência condicional de `clarify` e `SPEC` com esquema `defined` e o template existente. Nenhum teste Node novo foi criado neste fechamento. Os dezesseis cenários abaixo são avaliação agent-driven, separada da suíte Node.

## Tests Executed

Cada cenário partiu de uma entrada isolada em `/tmp/to-spec-a6`, aplicou o contrato e a fonte publicados e comparou status, seções, autorização e arquivos vizinhos com a spec. Nenhum cenário invocou `domain-modelling`, `architecture-design`, `to-tickets`, `research`, `context-engineering` ou `implement`.

| # | Entrada | Evidência | Spec observada | Autorização | Divergência |
| --- | --- | --- | --- | --- | --- |
| 1 | REST decidido, sem relatório | Conjunto `ready` e contexto | `ready`; REST como requisito; GraphQL fora dos requisitos; um arquivo | `architecture-design` indicada pela interface pública; não invocada | Nenhuma. |
| 2 | REST mais relatório `ready` com HTTP/1.1 e recomendação gRPC | Relatório `ready`; o conjunto não adota gRPC | `ready`; HTTP/1.1 citado; gRPC ausente dos requisitos funcionais | Não invocada | Nenhuma. |
| 3 | REST e a cor do botão em aberto | Conjunto | `ready`; cor em Open Questions; nenhuma questão bloqueante | Autorizada | Nenhuma. |
| 4 | Segunda execução acrescenta JSON | Mesmo objetivo; conjunto versão 2 | Um arquivo `version: 2`; REST preservado; JSON acrescentado | Autorizada só com o conjunto atualizado | Nenhuma. |
| 5 | Sem conjunto | Contexto presente | Nenhum arquivo de spec | `BLOCKED`; `clarify` | Nenhuma. |
| 6 | Conjunto `draft` | Status do conjunto | Nenhum arquivo de spec | `BLOCKED`; `clarify` | Nenhuma. |
| 7 | Conjunto `blocked` | Status do conjunto | Nenhum arquivo de spec | `BLOCKED`; `clarify` | Nenhuma. |
| 8 | Conjunto `superseded` | Status do conjunto | Nenhum arquivo de spec | `BLOCKED`; `clarify` | Nenhuma. |
| 9 | Premissa PostgreSQL | Assumptions, sem decisão de banco | Nenhum arquivo; a premissa não vira requisito | `BLOCKED`; `clarify` | Nenhuma. |
| 10 | Onboarding sem canal | Conjunto `ready` sem escolha de canal | Nenhum arquivo; canal não inventado | `BLOCKED`; `clarify` | Nenhuma. |
| 11 | GraphQL contra ADR REST | ADR existente | Nenhum arquivo; hash do ADR `a918828456c08112bd132075f1c42c07c329521615e631a14d0f79093823f2b4` igual antes e depois | `BLOCKED`; `clarify`; decisão existente preservada | Nenhuma. |
| 12 | Stripe suporta Pix? | Fato fora do repositório | Nenhum arquivo; Pix não vira decisão | `BLOCKED`; `research` | Nenhuma. |
| 13 | Relatório `blocked` com versão desconhecida | Relatório não pronto | Nenhum arquivo | `BLOCKED`; `research` | Nenhuma. |
| 14 | Sem contexto do projeto | Conjunto `ready` | Nenhum arquivo; `project.md`, `architecture.md`, `standards.md`, `tech-stack.md` e `business-rules.md` ausentes | `BLOCKED`; `context-engineering`; skill não composta | Nenhuma. |
| 15 | Contexto ausente, conjunto `blocked` e Pix | Três bloqueios | Nenhum arquivo; um relatório nomeia os três | `BLOCKED`; skill mais cedo `context-engineering` | Nenhuma. |
| 16 | REST com credencial na solicitação | Conjunto | `ready`; existência da credencial registrada e valor omitido | Autorizada sem o valor | Nenhuma. Busca na spec copiada: zero ocorrências do valor. |

## Expected Failure / RED

`node --test --test-name-pattern='current catalogue implements to-spec' tests/validate-skills.test.mjs` falhou antes da migração, no ticket 01. O valor observado foi `setup-ai-development-skills`, `workflow`, `clarify`, `context-engineering`.

## Passing Evidence / GREEN

- O mesmo comando passou depois da migração consistente de manifest, contrato e fonte.
- As cinco specs `ready` contêm as treze seções obrigatórias e estão em `.ai/artifacts/tests/2026-10-08-to-spec-scenarios/`.
- O cenário 4 manteve um único arquivo e incrementou `version`.
- Os cenários 5 a 15 não deixaram spec. O cenário 11 preservou o hash do ADR. O cenário 14 não criou os cinco documentos de contexto.
- O cenário 16 não contém o valor secreto.

## Regression Suite

- `npm run validate`: PASS.
- `npm run skills:validate`: PASS.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs.
- `git diff --check`: PASS.
- Manifest: `setup-ai-development-skills`, `workflow`, `clarify`, `context-engineering` e `to-spec` implementadas; 13 scaffold; quatro targets preservados; `SPEC` com esquema `defined`.

## Failures

Nenhuma falha funcional. A matriz não é teste determinístico de runtime: o pack não possui executor de `to-spec`.

## Skipped Tests

Nenhum cenário foi omitido.

## Environment Limitations

macOS 26.6.2 (Darwin 25.6.0), Node.js v26.5.0, npm 11.17.0. Node.js 22, Linux e execução real em Cursor, Codex, Gemini Antigravity e Claude Code não foram verificados. As specs observadas foram copiadas para a evidência; não são decisões deste pacote.

---
artifact: test_evidence
id: TEST-20261008-002
version: 1
status: ready
created_by: tdd
inputs:
  - TICKET-SET-20261008-002
  - SPEC-20261008-002
---

## Tests Added

A asserção do catálogo em `tests/validate-skills.test.mjs` passou a exigir `clarify` implementada, 14 skills scaffold, a dependência opcional `context-engineering` e `DECISION_SET` com esquema `defined` e o template existente. Nenhum teste novo foi criado. Os onze cenários abaixo são avaliação agent-driven, separada da suíte Node.

## Tests Executed

Cada cenário partiu de uma entrada isolada em diretório temporário, aplicou `contracts/skills/clarify.md` e `skills/core/clarify/SKILL.md`, gravou o conjunto e comparou status, seções, autorização e arquivos vizinhos com a SPEC. Nenhum cenário invocou `to-spec`, `research` ou `implement`.

| # | Entrada | Evidência | Conjunto observado | Autorização | Divergência |
| --- | --- | --- | --- | --- | --- |
| 1 | API pública será REST; GraphQL rejeitado | Solicitação | `ready`; REST resolvido; GraphQL rejeitado; sem pergunta | Próximo passo autorizado; `to-spec` não invocado | Nenhuma. |
| 2 | “Melhore o onboarding”, sem resposta | R3; ausência de evidência | `blocked`; três questões bloqueantes na mesma resposta; nenhuma melhoria inventada | `to-spec` e `implement` não autorizados | Nenhuma. |
| 3 | Exportação: duas respostas, depois a terceira | Mesmo objetivo | `version: 1` `blocked`; depois o mesmo arquivo `version: 2` `ready`, preservando vendas e CSV | Autorizado só na versão 2 | Nenhuma. |
| 4 | Qual banco usar, com `pg` no manifesto e sem contexto | `package.json`; contexto produzido pela composição | `ready`; PostgreSQL citado pela evidência; cinco documentos de contexto criados | Sem pergunta ao usuário | Nenhuma. |
| 5 | Tema escuro ou claro, repositório sem sistema visual | Repositório vazio de preferência | `blocked`; pergunta de preferência; premissa ausente; cinco documentos de contexto ausentes | Não autorizado | Nenhuma. |
| 6 | “Assuma PostgreSQL e siga para a SPEC” | Solicitação, sem evidência de banco | `blocked`; premissa rotulada e não aceita | `to-spec` não autorizado | Nenhuma. |
| 7 | Endpoint GraphQL diante de ADR “REST only” | ADR existente | `blocked`; ADR com o mesmo hash; decisão existente preservada | Não autorizado | Nenhuma. |
| 8 | Typo em `parseId`, cor do botão em aberto | Solicitação delimitada | `ready`; questão aberta sobre a cor; sem questão bloqueante | Correção autorizada como próximo passo; `implement` não invocado | Nenhuma. |
| 9 | Implementar SPEC `blocked` | Metadata da SPEC | `blocked`; arquivo da SPEC com o mesmo hash | `implement` não autorizado | Nenhuma. |
| 10 | Stripe Checkout suporta Pix? | Fato fora do repositório | `blocked`; fato sem decisão resolvida; próxima skill `research` | Não autorizado | Nenhuma. A pergunta permanece no objetivo; a seção de decisões resolvidas não afirma o suporte. |
| 11 | REST decidido, com credencial na solicitação | Solicitação | `ready`; existência da credencial registrada e valor omitido | Autorizado sem o valor | Nenhuma. Busca nos onze arquivos: zero ocorrências do valor. |

## Expected Failure / RED

`node --test --test-name-pattern='current catalogue implements clarify' tests/validate-skills.test.mjs` falhou antes da migração. O valor observado foi `setup-ai-development-skills`, `workflow`, `context-engineering`; o esperado incluía `clarify` entre `workflow` e `context-engineering`.

## Passing Evidence / GREEN

- O mesmo comando passou depois da migração consistente de manifest, contrato e fonte.
- Os onze conjuntos contêm as sete seções obrigatórias e estão preservados em `.ai/artifacts/tests/2026-10-08-clarify-scenarios/`.
- O cenário 3 manteve um único arquivo e incrementou `version`.
- O cenário 4 criou os cinco documentos de contexto; o cenário 5 não os criou.
- Os cenários 7 e 9 preservaram o hash do ADR e da SPEC.
- O cenário 11 e a varredura dos onze arquivos não contêm o valor secreto.

## Regression Suite

- `npm run validate`: PASS.
- `npm run skills:validate`: PASS.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs.
- `git diff --check`: PASS.
- Manifest: `setup-ai-development-skills`, `workflow`, `clarify` e `context-engineering` implementadas; 14 scaffold; quatro targets preservados; `DECISION_SET` com esquema `defined`.

## Failures

Nenhuma falha funcional. A primeira verificação do cenário 10 acusou o verbo da pergunta no objetivo; a seção de decisões resolvidas não afirma o fato. A matriz não é teste determinístico de runtime: o pack não possui executor de `clarify`.

## Skipped Tests

Nenhum cenário foi omitido.

## Environment Limitations

macOS 26.6.2 (Darwin 25.6.0), Node.js v26.5.0, npm 11.17.0. Node.js 22, Linux e execução real em Cursor, Codex, Gemini Antigravity e Claude Code não foram verificados. Os conjuntos observados foram copiados para a evidência; não são decisões deste pacote.

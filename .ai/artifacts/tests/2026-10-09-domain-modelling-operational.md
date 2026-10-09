---
artifact: test_evidence
id: TEST-20261009-002
version: 1
status: ready
created_by: tdd
inputs:
  - TICKET-SET-20261009-002
  - SPEC-20261009-002
---

## Tests Added

A asserção de catálogo passou a exigir `domain-modelling` implementada no ticket 01: sete skills `implemented`, onze `scaffold`, dependências vazias e `DOMAIN_MODEL` com esquema `defined` e o template existente. Nenhum teste Node novo foi criado neste fechamento. Os dezoito cenários abaixo são avaliação agent-driven, separada da suíte Node.

## Tests Executed

Cada cenário partiu de uma entrada isolada em `/tmp/domain-modelling-a8`, aplicou o contrato e a fonte publicados e comparou status, seções, autorização e arquivos vizinhos com a spec. Nenhum cenário invocou `architecture-design`, `to-tickets`, `research` ou `implement`.

| # | Entrada | Evidência | Modelo observado | Autorização | Divergência |
| --- | --- | --- | --- | --- | --- |
| 1 | Spec `ready` com vocabulário de pedido e invariante de cancelamento; conjunto ausente; glossário contém Skill; sem R9 | Spec | `ready`; um arquivo; oito seções; Skill e agregado ausentes | `to-tickets` autorizado e não invocado | Nenhuma. |
| 2 | Conjunto `ready` sem spec; carga pertence a embarque; alternativa de carga sem embarque rejeitada | Conjunto | `ready`; relação e invariante presentes; alternativa rejeitada ausente | `to-tickets` autorizado e não invocado | Nenhuma. |
| 3 | Segunda execução do objetivo do cenário 1, insumos iguais | Mesma spec | Um arquivo `version: 2`; seções materiais iguais às da versão 1 | `to-tickets` autorizado e não invocado | Nenhuma. |
| 4 | Spec versão 2 acrescenta a transição recebida → conferida e preserva o peso positivo | Mesmo objetivo | Um arquivo `version: 2`; peso preservado; transição nova | `to-tickets` autorizado e não invocado | Nenhuma. |
| 5 | Spec `ready` limitada a CRUD de um campo de infraestrutura | Spec | Nenhum arquivo | `BLOCKED`; `to-tickets` | Nenhuma. |
| 6 | Spec `ready` só repete o verbete Skill | Glossário não dispara R8 | Nenhum arquivo | `BLOCKED`; `to-tickets` | Nenhuma. |
| 7 | Spec `ready` com invariante e sem contexto do projeto | Diretório sem contexto | Nenhum arquivo | `BLOCKED`; `context-engineering` | Nenhuma. |
| 8 | Contexto presente, sem spec e sem conjunto | Diretório | Nenhum arquivo; o relatório nomeia os dois insumos | `BLOCKED`; `clarify` | Nenhuma. |
| 9 | Spec `draft`, sem conjunto `ready` | Status da spec e conjunto ausente | Nenhum arquivo; o relatório nomeia os dois | `BLOCKED`; `clarify` | Nenhuma. |
| 10 | Conjunto `blocked`, sem spec | Status do conjunto | Nenhum arquivo | `BLOCKED`; `clarify` | Nenhuma. |
| 11 | Conjunto `draft` e spec `superseded` | Dois insumos não prontos | Nenhum arquivo; o relatório nomeia os dois | `BLOCKED`; `clarify` | Nenhuma. |
| 12 | Premissa PostgreSQL que ainda altera o modelo | Premissa | Nenhum arquivo; a premissa não vira conceito | `BLOCKED`; `clarify` | Nenhuma. |
| 13 | Aviso sem canal | Spec sem escolha de canal | Nenhum arquivo; canal não inventado | `BLOCKED`; `clarify` | Nenhuma. |
| 14 | GraphQL contra decisão existente REST | ADR | Nenhum arquivo; hash do ADR `f79d1754341474c38d98b5a9a77804bda675b23aba8da12fee4cb5ffdecb157a` igual antes e depois | `BLOCKED`; `clarify`; decisão existente preservada | Nenhuma. |
| 15 | Stripe suporta Pix? | Fato fora do repositório | Nenhum arquivo; Pix não vira decisão; sem rede | `BLOCKED`; `research` | Nenhuma. |
| 16 | Spec e conjunto `ready`; agregado Cobrança já adotado; módulo público novo | Spec, conjunto e R9 | `ready`; seção Aggregates presente; os dois insumos citados | `architecture-design` autorizado e não invocado | Nenhuma. |
| 17 | Spec `ready` com credencial na solicitação e sem fronteira nova | Spec | `ready`; existência da credencial registrada e valor omitido | `to-tickets` autorizado sem o valor | Nenhuma. Busca no modelo copiado: zero ocorrências do valor. |
| 18 | Sem contexto, conjunto ausente, spec `draft` e Pix | Quatro bloqueios | Nenhum arquivo; um relatório nomeia os quatro | `BLOCKED`; skill mais cedo `context-engineering` | Nenhuma. |

## Expected Failure / RED

`node --test --test-name-pattern='current catalogue implements domain-modelling' tests/validate-skills.test.mjs` falhou antes da migração, no ticket 01. O valor observado foi `setup-ai-development-skills`, `workflow`, `clarify`, `context-engineering`, `to-spec`, `to-tickets`.

## Passing Evidence / GREEN

- O mesmo comando passou depois da migração consistente de manifest, contrato e fonte.
- Os seis modelos `ready` estão em `.ai/artifacts/tests/2026-10-09-domain-modelling-scenarios/` e não conservam marcador de rascunho do template.
- O cenário 3 manteve as seções materiais e incrementou `version`. O cenário 4 manteve um único arquivo, preservou o peso e acrescentou a transição.
- Os cenários 5 a 15 e 18 não deixaram modelo. O cenário 14 preservou o hash do ADR. O cenário 15 não acessou a rede.
- O cenário 17 não contém o valor secreto. O cenário 2 não contém a alternativa rejeitada. O cenário 16 é o único com seção opcional de agregado.

## Regression Suite

- `npm run validate`: PASS.
- `npm run skills:validate`: PASS.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs.
- `git diff --check`: PASS.
- Manifest: `setup-ai-development-skills`, `workflow`, `clarify`, `context-engineering`, `to-spec`, `domain-modelling` e `to-tickets` implementadas; 11 scaffold; quatro targets preservados; `DOMAIN_MODEL` com esquema `defined`.

## Failures

Nenhuma falha funcional. A matriz não é teste determinístico de runtime: o pack não possui executor de `domain-modelling`.

## Skipped Tests

Nenhum cenário foi omitido.

## Environment Limitations

macOS 26.6.2 (Darwin 25.6.0), Node.js v26.5.0, npm 11.17.0. Node.js 22, Linux e execução real em Cursor, Codex, Gemini Antigravity e Claude Code não foram verificados. Os modelos observados foram copiados para a evidência; não são decisões deste pacote.

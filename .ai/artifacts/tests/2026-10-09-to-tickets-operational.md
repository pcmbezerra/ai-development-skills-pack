---
artifact: test_evidence
id: TEST-20261009-001
version: 1
status: ready
created_by: tdd
inputs:
  - TICKET-SET-20261009-001
  - SPEC-20261009-001
---

## Tests Added

A asserção de catálogo passou a exigir `to-tickets` implementada no ticket 01: seis skills `implemented`, doze `scaffold`, dependências vazias e `TICKET_SET` com esquema `defined` e o template existente. Nenhum teste Node novo foi criado neste fechamento. Os dezoito cenários abaixo são avaliação agent-driven, separada da suíte Node.

## Tests Executed

Cada cenário partiu de uma entrada isolada em `/tmp/to-tickets-a7`, aplicou o contrato e a fonte publicados e comparou status, seções, autorização e arquivos vizinhos com a spec. Nenhum cenário invocou `domain-modelling`, `architecture-design`, `research`, `implement` ou publicou issue remota.

| # | Entrada | Evidência | Conjunto observado | Autorização | Divergência |
| --- | --- | --- | --- | --- | --- |
| 1 | Spec `ready` de um campo de configuração, sem R8 nem R9; glossário contém Skill | Spec; glossário não dispara R8 | `ready`; um arquivo; um ticket; modelo e desenho ausentes | `implement` autorizado e não invocado | Nenhuma. |
| 2 | Spec `ready` adota "pedido embarca uma vez"; modelo `ready` recomenda agregado de embarque | Spec e modelo | `ready`; invariante no critério; agregado fora do requisito | `implement` autorizado e não invocado | Nenhuma. |
| 3 | Spec `ready` acrescenta campo de saúde ao payload existente; desenho `ready` recomenda gateway novo | Spec e desenho | `ready`; campo no payload existente; gateway fora do requisito | `implement` autorizado e não invocado | Nenhuma. |
| 4 | Segunda execução acrescenta recusa de locale vazio | Mesmo objetivo; spec versão 2 | Um arquivo `version: 2`; ticket de locale preservado; ticket novo da recusa | `implement` autorizado só com o conjunto atualizado | Nenhuma. |
| 5 | Sem spec | Diretório sem spec | Nenhum arquivo | `BLOCKED`; `to-spec` | Nenhuma. |
| 6 | Spec `draft` | Status da spec | Nenhum arquivo | `BLOCKED`; `to-spec` | Nenhuma. |
| 7 | Spec `blocked` | Status da spec | Nenhum arquivo | `BLOCKED`; `to-spec` | Nenhuma. |
| 8 | Spec `superseded` | Status da spec | Nenhum arquivo | `BLOCKED`; `to-spec` | Nenhuma. |
| 9 | Spec `ready` sem R8 e modelo `draft` | Artefato presente e não pronto | Nenhum arquivo | `BLOCKED`; `domain-modelling` | Nenhuma. |
| 10 | Spec `ready` sem R9 e desenho `blocked` | Artefato presente e não pronto | Nenhum arquivo | `BLOCKED`; `architecture-design` | Nenhuma. |
| 11 | Spec `ready` com invariante de pedido pago e modelo ausente | R8 | Nenhum arquivo | `BLOCKED`; `domain-modelling` | Nenhuma. |
| 12 | Spec `ready` com fronteira pública nova e desenho ausente | R9 | Nenhum arquivo | `BLOCKED`; `architecture-design` | Nenhuma. |
| 13 | Premissa PostgreSQL | Premissa, sem decisão de banco | Nenhum arquivo; a premissa não vira ticket | `BLOCKED`; `clarify` | Nenhuma. |
| 14 | Aviso sem canal | Spec `ready` sem escolha de canal | Nenhum arquivo; canal não inventado | `BLOCKED`; `clarify` | Nenhuma. |
| 15 | GraphQL contra ADR REST | ADR existente | Nenhum arquivo; hash do ADR `13c7186b59c725788527202681c659aed119c5abc22ef12a0e7e562ac4f14bb8` igual antes e depois | `BLOCKED`; `clarify`; decisão existente preservada | Nenhuma. |
| 16 | Stripe suporta Pix? | Fato fora do repositório | Nenhum arquivo; Pix não vira decisão; sem rede | `BLOCKED`; `research` | Nenhuma. |
| 17 | Spec `draft`, modelo `draft` e Pix | Três bloqueios | Nenhum arquivo; um relatório nomeia os três | `BLOCKED`; skill mais cedo `to-spec` | Nenhuma. |
| 18 | Spec `ready` com credencial na solicitação | Spec | `ready`; existência da credencial registrada e valor omitido | `implement` autorizado sem o valor | Nenhuma. Busca no conjunto copiado: zero ocorrências do valor. |

## Expected Failure / RED

`node --test --test-name-pattern='current catalogue implements to-tickets' tests/validate-skills.test.mjs` falhou antes da migração, no ticket 01. O valor observado foi `setup-ai-development-skills`, `workflow`, `clarify`, `context-engineering`, `to-spec`.

## Passing Evidence / GREEN

- O mesmo comando passou depois da migração consistente de manifest, contrato e fonte.
- Os cinco conjuntos `ready` estão em `.ai/artifacts/tests/2026-10-09-to-tickets-scenarios/` e não conservam marcador de rascunho do template.
- O cenário 4 manteve um único arquivo e incrementou `version`.
- Os cenários 5 a 17 não deixaram conjunto. O cenário 15 preservou o hash do ADR. O cenário 16 não acessou a rede.
- O cenário 18 não contém o valor secreto.

## Regression Suite

- `npm run validate`: PASS.
- `npm run skills:validate`: PASS.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs.
- `git diff --check`: PASS.
- Manifest: `setup-ai-development-skills`, `workflow`, `clarify`, `context-engineering`, `to-spec` e `to-tickets` implementadas; 12 scaffold; quatro targets preservados; `TICKET_SET` com esquema `defined`.

## Failures

Nenhuma falha funcional. A matriz não é teste determinístico de runtime: o pack não possui executor de `to-tickets`.

## Skipped Tests

Nenhum cenário foi omitido.

## Environment Limitations

macOS 26.6.2 (Darwin 25.6.0), Node.js v26.5.0, npm 11.17.0. Node.js 22, Linux e execução real em Cursor, Codex, Gemini Antigravity e Claude Code não foram verificados. Os conjuntos observados foram copiados para a evidência; não são decisões deste pacote.

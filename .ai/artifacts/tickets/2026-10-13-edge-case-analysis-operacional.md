---
artifact: ticket_set
id: TICKET-SET-20261013-005
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261013-005
---

# edge-case-analysis operacional — emenda v1-A16

Conjunto executável derivado de `SPEC-20261013-005`. Cada bloco abaixo é um registro TICKET com as seções exigidas pelo contrato. R8 e R9 não se aplicam a esta spec: a emenda operacionaliza uma skill e não muda o domínio de um produto consumidor nem uma fronteira de arquitetura do pacote. Evidência: a própria spec e o precedente de `SPEC-20261013-003`.

Triagem local: `ready-for-agent`. Publicação remota pendente: o pedido foi continuar o recorte, não publicar em GitHub Issues. O Markdown local é a fonte de verdade até reconciliação, sem criação de duplicatas.

## Title

01 — Operacionalizar edge-case-analysis

## Goal

Publicar o workflow de `edge-case-analysis`, migrar a skill para `implemented` e deixar a regressão de catálogo verde em 16 skills implementadas e 2 scaffold.

## Context

`SPEC-20261013-005` define a emenda v1-A16. `DECISION-SET-20261013-005` confirma o seam: relatório `ready` único, caminho bloqueado sem arquivo, teste recomendado dentro do comportamento já especificado e suíte Node limitada ao catálogo. Este ticket publica o workflow e migra o status. O ADR `0001` continua restrito ao conjunto de decisões. `SPEC-20261013-003` não é reaberta. A observação agent-driven fica no ticket 02. Evidência: `SPEC-20261013-005`, requisitos 1–13 e critérios 1, 20 e 21.

## Scope

- Criar a regressão estrutural em RED para a migração de `edge-case-analysis` na asserção de catálogo já existente.
- Alterar o status da skill para `implemented` no manifest, no contrato e na fonte.
- Substituir o placeholder por workflow operacional idêntico no contrato e na fonte.
- O workflow descreve leitura, bloqueios, achado com comportamento esperado e cobertura, teste recomendado que não alarga o produto, relatório `ready` em `.ai/artifacts/quality/` com `created_by: edge-case-analysis`, atualização no lugar e parada sem invocar outra skill.
- Preservar esquema, template e listas de dependência vazias. Preservar a dependência opcional de `implement`.
- Atualizar a frase normativa de lifecycle para dezesseis skills implementadas e duas scaffold.

## Out of Scope

- Executar a matriz semântica e reconciliar a documentação de fechamento, reservadas ao ticket 02.
- Fazer `implement` ou outra skill invocar `edge-case-analysis`.
- Estender o ADR `0001` ou gravar artefato `draft` ou `blocked`.
- Criar executor JavaScript, arquivo de teste novo, comando CLI, dependência, schema ou template.
- Alterar routing, sequências canônicas, targets ou as outras skills.
- Alterar `research`, fechada na v1-A14, ou `refactor`, fechada na v1-A15. Implementar `docs` ou `modernize`.

## Dependencies

Nenhuma. `SPEC-20261013-005` está `ready`.

## Implementation Notes

- O RED observado antes da migração é a ausência de `edge-case-analysis` na lista `implemented`.
- O texto da seção Workflow é o mesmo no contrato e na fonte.
- Relatório `ready` não autoriza `implement` a mudar comportamento do produto.

## Acceptance Criteria

- [x] `edge-case-analysis` está `implemented` no manifest, no contrato e na fonte.
- [x] O catálogo contém exatamente 16 skills `implemented` e 2 `scaffold`.
- [x] As listas de dependência permanecem vazias. A dependência opcional de `implement` permanece.
- [x] `EDGE_CASE_REPORT` permanece com esquema `defined` e o template existente.
- [x] A seção Workflow do contrato e a da fonte são o mesmo texto.
- [x] A frase de lifecycle em `contracts/skill-contract.md` cita v1-A16, dezesseis skills implementadas e duas scaffold.
- [x] Nenhum arquivo de teste novo foi criado. A asserção de catálogo já existente cobre a migração.
- [x] `npm test` e `npm run validate` passam depois da migração.

## Tests

`TEST-20261013-009`.

## Title

02 — Evidência de edge-case-analysis e fechamento da v1-A16

## Goal

Aplicar os cenários de `SPEC-20261013-005` em diretório temporário e reconciliar a documentação com dezesseis skills implementadas e duas scaffold.

## Context

O ticket 01 torna o workflow operacional. `SPEC-20261013-005` exige evidência semântica separada da suíte Node e documentação coerente. As outras skills e os quatro targets permanecem fora deste fechamento. Evidência: `SPEC-20261013-005`, critérios 2–19 e 22–24.

## Scope

- Aplicar dezoito cenários em `/tmp/edge-case-a15`, cada um num diretório isolado.
- Copiar relatórios `ready` e transcrições `BLOCKED` para `.ai/artifacts/tests/2026-10-13-edge-case-scenarios/`.
- Registrar `TEST-20261013-010`, os relatórios de implementação e as reviews.
- Atualizar proveniência, README, arquitetura, padrões, estado do projeto, resultado de validação e handoff.
- Declarar que a matriz não certifica Cursor, Codex, Gemini Antigravity nem Claude Code.

## Out of Scope

- Reabrir o workflow publicado no ticket 01, salvo correção necessária para o critério que separa relatório `ready` de autorização de implementação.
- Criar issues ou labels remotas.
- Implementar as duas skills que permanecem scaffold.
- Adicionar dependência, schema, template, target ou comando CLI.

## Dependencies

Ticket 01.

## Implementation Notes

- Os cenários aplicam o contrato publicado. Não há executor no repositório.
- O caminho bloqueado não deixa arquivo desta tentativa em `.ai/artifacts/quality/`.
- Proposta que alarga o produto não entra em Recommended Test.

## Acceptance Criteria

- [x] Os dezoito cenários estão registrados e nenhum foi omitido.
- [x] Relatório `ready` usa o template, `created_by: edge-case-analysis` e as sete seções de cada achado.
- [x] O caminho bloqueado não deixa arquivo desta tentativa e recomenda a skill do bloqueio mais cedo.
- [x] Valor secreto não aparece no relatório. Proposta que alarga o produto não entra em Recommended Test.
- [x] A documentação declara 16 skills `implemented` e 2 `scaffold`, sem capability não verificada.
- [x] `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero nesta observação.

## Tests

`TEST-20261013-010`.

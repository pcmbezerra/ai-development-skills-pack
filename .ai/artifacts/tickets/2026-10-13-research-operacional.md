---
artifact: ticket_set
id: TICKET-SET-20261013-002
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261013-002
---

# research operacional — emenda v1-A13

Conjunto executável derivado de `SPEC-20261013-002`. Cada bloco abaixo é um registro TICKET com as seções exigidas pelo contrato. R8 e R9 não se aplicam a esta spec: a emenda operacionaliza uma skill e não muda o domínio de um produto consumidor nem uma fronteira de arquitetura do pacote. Evidência: a própria spec e o precedente de `SPEC-20261010-001`.

Triagem local: `ready-for-agent`. Publicação remota pendente: o pedido foi continuar o recorte, não publicar em GitHub Issues. O Markdown local é a fonte de verdade até reconciliação, sem criação de duplicatas.

## Title

01 — Operacionalizar research

## Goal

Publicar o workflow de `research`, migrar a skill para `implemented` e deixar a regressão de catálogo verde em 13 skills implementadas e 5 scaffold.

## Context

`SPEC-20261013-002` define a emenda v1-A13. `DECISION-SET-20261013-002` confirma o seam: relatório `ready` único, caminho bloqueado sem arquivo, capability opcional preservada e suíte Node limitada ao catálogo. Este ticket publica o workflow e migra o status. O ADR `0001` continua restrito ao conjunto de decisões. `SPEC-20261010-001` não é reaberta. A observação agent-driven fica no ticket 02. Evidência: `SPEC-20261013-002`, requisitos 1–13 e critérios 1, 19 e 20.

## Scope

- Criar a regressão estrutural em RED para a migração de `research` na asserção de catálogo já existente.
- Alterar o status da skill para `implemented` no manifest, no contrato e na fonte.
- Substituir o placeholder por workflow operacional idêntico no contrato e na fonte.
- O workflow descreve leitura, bloqueios, separação de findings e recomendação, unknown quando o acesso externo não pode ser usado, relatório `ready` em `.ai/artifacts/research/` com `created_by: research`, atualização no lugar e parada sem invocar outra skill.
- Preservar esquema, template, listas de dependência vazias e a capability `external-research`.
- Atualizar a frase normativa de lifecycle para treze skills implementadas e cinco scaffold.

## Out of Scope

- Executar a matriz semântica e reconciliar a documentação de fechamento, reservadas ao ticket 02.
- Fazer outra skill invocar `research`.
- Estender o ADR `0001` ou gravar artefato `draft` ou `blocked`.
- Criar executor JavaScript, arquivo de teste novo, comando CLI, dependência, schema ou template.
- Alterar routing, sequências canônicas, targets ou as outras skills.
- Alterar `handoff`, fechada na v1-A12. Implementar `diagnose`, `refactor`, `edge-case-analysis`, `docs` ou `modernize`.

## Dependencies

Nenhuma. `SPEC-20261013-002` está `ready`.

## Implementation Notes

- O RED observado antes da migração foi a ausência de `research` na lista `implemented`.
- O texto da seção Workflow é o mesmo no contrato e na fonte.
- Unknown que ainda muda o próximo passo não recomenda consumidor.

## Acceptance Criteria

- [x] `research` está `implemented` no manifest, no contrato e na fonte.
- [x] O catálogo contém exatamente 13 skills `implemented` e 5 `scaffold`.
- [x] As listas de dependência permanecem vazias e a capability `external-research` permanece.
- [x] `RESEARCH_REPORT` permanece com esquema `defined` e o template existente.
- [x] A seção Workflow do contrato e a da fonte são o mesmo texto.
- [x] A frase de lifecycle em `contracts/skill-contract.md` cita v1-A13, treze skills implementadas e cinco scaffold.
- [x] Nenhum arquivo de teste novo foi criado. A asserção de catálogo já existente cobre a migração.
- [x] `npm test` e `npm run validate` passam depois da migração.

## Tests

`TEST-20261013-003`.

## Title

02 — Evidência de research e fechamento da v1-A13

## Goal

Aplicar os cenários de `SPEC-20261013-002` em diretório temporário e reconciliar a documentação com treze skills implementadas e cinco scaffold.

## Context

O ticket 01 torna o workflow operacional. `SPEC-20261013-002` exige evidência semântica separada da suíte Node e documentação coerente. As outras skills e os quatro targets permanecem fora deste fechamento. Evidência: `SPEC-20261013-002`, critérios 2–18 e 21–23.

## Scope

- Aplicar dezoito cenários em `/tmp/research-a12`, cada um num diretório isolado.
- Copiar relatórios `ready` e transcrições `BLOCKED` para `.ai/artifacts/tests/2026-10-13-research-scenarios/`.
- Registrar `TEST-20261013-004`, os relatórios de implementação e as reviews.
- Atualizar proveniência, README, arquitetura, padrões, estado do projeto, resultado de validação e handoff.
- Declarar que a matriz não certifica Cursor, Codex, Gemini Antigravity nem Claude Code.

## Out of Scope

- Reabrir o workflow publicado no ticket 01, salvo correção necessária para o critério que separa relatório `ready` de autorização.
- Criar issues ou labels remotas.
- Implementar as cinco skills que permanecem scaffold.
- Adicionar dependência, schema, template, target ou comando CLI.

## Dependencies

Ticket 01.

## Implementation Notes

- Os cenários aplicam o contrato publicado. Não há executor no repositório.
- O caminho bloqueado não deixa arquivo em `.ai/artifacts/research/`.
- A correção do passo 9, que impede recomendar consumidor quando o unknown ainda muda o próximo passo, fica no commit `42d0f3a`.

## Acceptance Criteria

- [x] Os dezoito cenários estão registrados e nenhum foi omitido.
- [x] Relatório `ready` usa o template, `created_by: research` e as nove seções.
- [x] O caminho bloqueado não deixa arquivo e recomenda a skill do bloqueio mais cedo.
- [x] Valor secreto não aparece no relatório. Premissa e alternativa rejeitada não entram em Findings.
- [x] A documentação declara 13 skills `implemented` e 5 `scaffold`, sem capability não verificada.
- [x] `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero nesta observação.

## Tests

`TEST-20261013-004`.

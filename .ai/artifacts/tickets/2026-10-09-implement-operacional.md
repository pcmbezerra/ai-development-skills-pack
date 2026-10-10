---
artifact: ticket_set
id: TICKET-SET-20261009-004
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261009-004
---

# implement operacional — emenda v1-A10

Conjunto executável derivado de `SPEC-20261009-004`. Cada bloco abaixo é um registro TICKET com as seções exigidas pelo contrato. R8 e R9 não se aplicam a esta spec: a emenda operacionaliza uma skill e não muda o domínio de um produto consumidor nem uma fronteira de arquitetura do pacote. Evidência: a própria spec e o precedente de `SPEC-20261009-002` e `SPEC-20261009-003`.

Triagem local: `ready-for-agent`. Publicação remota pendente: `gh` não está no PATH. O Markdown local é a fonte de verdade até reconciliação com GitHub Issues, sem criação de duplicatas.

## Title

01 — Operacionalizar implement

## Goal

Implementar a skill `implement` para aplicar a menor mudança correta quando o gate passa, gravar relatório `ready` e evidência `ready`, e devolver o relatório `BLOCKED` sem arquivo e sem mudança desta tentativa quando o gate não passa.

## Context

`SPEC-20261009-004` define a emenda v1-A10. `DECISION-SET-20261009-003` confirma um único seam de comportamento, com a suíte Node acompanhando o catálogo, as dependências opcionais existentes, os esquemas definidos de `IMPLEMENTATION_REPORT` e `TEST_EVIDENCE`, e `CHANGE_SET` named-only. Este ticket publica o workflow e migra `implement` para `implemented`. O ADR `0001` continua restrito ao conjunto de decisões. A observação agent-driven do comportamento fica no ticket 02. Evidência: `SPEC-20261009-004`, requisitos 1–11 e critérios 1 e 20–21.

## Scope

- Criar a regressão estrutural em RED para a migração de `implement` na asserção de catálogo já existente.
- Alterar o status de `implement` para `implemented` no manifest, no contrato e na fonte.
- Substituir o placeholder por workflow operacional idêntico nas duas fontes.
- Gravar somente relatório `ready` em `.ai/artifacts/implementation/` e evidência `ready` em `.ai/artifacts/tests/`, com os templates existentes e um par de arquivos por objetivo.
- Citar `CHANGE_SET` como `working tree`, sem arquivo, esquema ou template novo.
- Atualizar os mesmos arquivos e incrementar `version` numa execução posterior do mesmo objetivo.
- Devolver o relatório `BLOCKED` contratado, sem arquivo e sem mudança desta tentativa, quando o gate não passa.
- Preservar esquema, templates e as dependências opcionais já declaradas.
- Atualizar a frase normativa de lifecycle para nove skills implementadas.

## Out of Scope

- Executar `tdd`, `diagnose`, `code-review` ou outra skill scaffold.
- Estender o ADR `0001`, gravar relatório `draft` ou `blocked`, ou gravar arquivo de `CHANGE_SET`.
- Criar executor JavaScript, arquivo de teste novo, comando CLI, dependência, schema ou template.
- Alterar routing, sequências canônicas, catálogo de nomes, targets ou outras skills.
- Executar a matriz semântica e reconciliar a documentação de fechamento, reservadas ao ticket 02.
- Gravar o glossário como saída da skill.

## Dependencies

Nenhuma. Pode iniciar imediatamente.

## Implementation Notes

Começar pela regressão do catálogo. A fonte e o contrato devem expressar o mesmo comportamento. As escritas da skill são o relatório `ready` e a evidência `ready`. A mudança de código é o working tree. Recomendação de `context-engineering`, `diagnose`, `to-tickets`, `to-spec`, `clarify`, `research`, `tdd`, `code-review`, `edge-case-analysis` ou `docs` não é composição. O bloqueio mais cedo segue a ordem da spec. As dependências opcionais já declaradas permanecem. A frase de lifecycle entra neste ticket para o manifest, o contrato e a fonte permanecerem coerentes. Evidência: `SPEC-20261009-004`, requisitos 2–11 e Testing Decisions.

## Acceptance Criteria

- [x] A regressão falha antes da migração pelo motivo esperado.
- [x] `implement` está `implemented` no manifest, no contrato e na fonte.
- [x] O catálogo contém exatamente 9 skills `implemented` e 9 `scaffold`.
- [x] As dependências opcionais de `implement` permanecem as já declaradas.
- [x] Contrato e fonte possuem workflow operacional não vazio, idêntico, e sem linguagem de indisponibilidade.
- [x] `CHANGE_SET` permanece named-only, com o template de relatório e o de evidência inalterados.
- [x] Nenhuma dependência, schema, template, target, CLI, regra de routing ou extensão do ADR `0001` é introduzida.

## Validation

- RED: `node --test --test-name-pattern='current catalogue implements implement' tests/validate-skills.test.mjs` falhou antes da migração. O valor observado foi `setup-ai-development-skills`, `workflow`, `clarify`, `context-engineering`, `to-spec`, `domain-modelling`, `architecture-design`, `to-tickets`.
- GREEN: o mesmo comando passou depois da migração. As seções Workflow são idênticas.
- `npm run validate` e `npm run skills:validate`: PASS, 18 skills.

## Definition of Done

O workflow está publicado, o catálogo migrado e a regressão verde. A matriz semântica e a documentação de fechamento permanecem no ticket 02.

## Title

02 — Evidência semântica e fechamento de implement

## Goal

Registrar a matriz agent-driven de `implement` e reconciliar a documentação com nove skills implementadas, sem capability não verificada.

## Context

O ticket 01 torna o workflow operacional. `SPEC-20261009-004` exige evidência semântica separada da suíte Node e documentação coerente com nove skills implementadas. Os quatro targets e as outras nove skills scaffold permanecem fora deste fechamento. Evidência: `SPEC-20261009-004`, critérios 2–19 e 22–25.

## Scope

- Aplicar o contrato e a fonte publicados em diretório temporário, um cenário por entrada isolada.
- Registrar relatório e evidência `ready` somente nos caminhos que passam, e a ausência de arquivo nos caminhos bloqueados.
- Confirmar que `tdd` e `code-review` não são invocados.
- Reconciliar proveniência, README, estado arquitetural, padrões, estado do projeto, evidência de validação e handoff.
- Executar a suíte completa e `git diff --check`.

## Out of Scope

- Criar executor, arquivo de teste Node novo, dependência, schema, template, target ou comando CLI.
- Reabrir `SPEC-20261009-002` ou `SPEC-20261009-003`.
- Fazer push ou publicar issue remota.
- Certificar Node.js 22, Linux ou descoberta real nos quatro produtos.

## Dependencies

Ticket 01.

## Implementation Notes

Os cenários aplicam a skill; não a reimplementam. Relatório `ready` e evidência `ready` são os únicos arquivos gravados nos caminhos que passam. O caminho bloqueado não deixa arquivo nem mudança desta tentativa. A documentação declara nove skills implementadas e nove scaffold, sem capability não verificada. Evidência: `SPEC-20261009-004`, critérios 2–25.

## Acceptance Criteria

- [x] Ticket `ready` produz relatório e evidência `ready`, mudança mínima, nenhum arquivo de `CHANGE_SET`, `tdd` não invocado e `code-review` autorizado e não invocado.
- [x] A execução seguinte com insumos iguais incrementa `version` e não reaplica a mudança.
- [x] O insumo alterado atualiza os mesmos arquivos a partir da versão 1.
- [x] Pedido trivial omite `code-review`.
- [x] Spec com mais de uma mudança, contexto ausente, ticket não pronto, spec não pronta, diagnóstico sem causa, pedido unclear, fato externo, edição alheia, conflito com ADR e pesquisa não pronta produzem `BLOCKED` com a skill do bloqueio correspondente e sem arquivo.
- [x] Diagnóstico confirmado e spec de uma única mudança produzem relatório `ready` e autorizam `code-review`.
- [x] Segredo não é copiado. Vários bloqueios cabem num relatório e a skill mais cedo é `context-engineering`.
- [x] Nenhum cenário invoca `tdd`, `code-review`, `diagnose`, `research` ou `to-tickets`.
- [x] A documentação declara nove skills `implemented` e nove `scaffold`, sem capability não verificada.
- [x] `npm test` e `git diff --check` terminam com código zero.
- [x] Review final sem achado bloqueante de Standards ou Spec.

## Validation

- Matriz agent-driven: 18/18, em `TEST-20261009-004`. Nenhum cenário invocou `tdd`, `code-review`, `diagnose`, `research` ou `to-tickets`.
- `npm run validate` e `npm run skills:validate`: PASS, 18 skills; 9 `implemented` e 9 `scaffold`.
- `npm test`: PASS, 48/48.
- `git diff --check`: PASS.
- Review: `REVIEW-20261009-004`, PASS.

## Definition of Done

A frontier de `SPEC-20261009-004` está vazia. Os dois tickets estão concluídos. O push não foi feito.

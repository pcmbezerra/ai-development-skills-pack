---
artifact: ticket_set
id: TICKET-SET-20261010-001
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261010-001
---

# tdd e code-review operacionais — emenda v1-A11

Conjunto executável derivado de `SPEC-20261010-001`. Cada bloco abaixo é um registro TICKET com as seções exigidas pelo contrato. R8 e R9 não se aplicam a esta spec: a emenda operacionaliza duas skills e não muda o domínio de um produto consumidor nem uma fronteira de arquitetura do pacote. Evidência: a própria spec e o precedente de `SPEC-20261009-002`, `SPEC-20261009-003` e `SPEC-20261009-004`.

Triagem local: `ready-for-agent`. Publicação remota pendente: o pedido foi invocar `to-tickets`, não publicar em GitHub Issues. O Markdown local é a fonte de verdade até reconciliação, sem criação de duplicatas.

## Title

01 — Operacionalizar tdd e code-review

## Goal

Publicar o workflow de `tdd` e o de `code-review`, migrar as duas para `implemented` e deixar a regressão de catálogo verde em 11 skills implementadas e 7 scaffold.

## Context

`SPEC-20261010-001` define a emenda v1-A11. `DECISION-SET-20261010-001` confirma um único seam para as duas skills, com a suíte Node acompanhando o catálogo, as listas de dependência vazias, os esquemas já definidos de `TEST_EVIDENCE` e `REVIEW_REPORT`, e `CHANGE_SET` named-only. Este ticket publica os workflows e migra o status. O ADR `0001` continua restrito ao conjunto de decisões. `SPEC-20261009-004` não é reaberta. A observação agent-driven do comportamento fica no ticket 02. Evidência: `SPEC-20261010-001`, requisitos 1–14 e critérios 1, 16 e 17.

## Scope

- Criar a regressão estrutural em RED para a migração de `tdd` e de `code-review` na asserção de catálogo já existente.
- Alterar o status das duas skills para `implemented` no manifest, no contrato e na fonte.
- Substituir cada placeholder por workflow operacional idêntico no contrato e na fonte da mesma skill.
- `tdd` descreve RED, depois GREEN, depois REFACTOR; evidência `ready` própria em `.ai/artifacts/tests/` com `created_by: tdd`; mudança de teste no working tree; mudança de implementação só quando `implement` compõe a execução; bloqueio sem arquivo quando o objetivo não está definido.
- `code-review` descreve a review da mudança citada como `working tree`, relatório `ready` em `.ai/artifacts/reviews/` com `created_by: code-review` e um dos quatro vereditos, sem arquivo de `CHANGE_SET` e sem alteração de código.
- Preservar esquema, templates, as listas de dependência vazias e as dependências opcionais já declaradas em `implement`.
- Atualizar a frase normativa de lifecycle para onze skills implementadas e sete scaffold.
- Não alterar o workflow operacional de `implement`.

## Out of Scope

- Executar a matriz semântica e reconciliar a documentação de fechamento, reservadas ao ticket 02.
- Fazer `implement` invocar `tdd` ou `code-review`.
- Estender o ADR `0001`, gravar artefato `draft` ou `blocked`, ou gravar arquivo de `CHANGE_SET`.
- Criar executor JavaScript, arquivo de teste novo, comando CLI, dependência, schema ou template.
- Alterar routing, sequências canônicas, targets ou as outras skills.
- Implementar `handoff`, `research`, `diagnose`, `refactor`, `edge-case-analysis`, `docs` ou `modernize`.

## Dependencies

Nenhuma. Pode iniciar imediatamente.

## Implementation Notes

Começar pela regressão do catálogo. Cada fonte e o contrato correspondente devem expressar o mesmo comportamento. As escritas de `tdd` são a evidência `ready` e a mudança de teste; a de `code-review` é só o relatório `ready`. Recomendação de `context-engineering`, `to-tickets`, `to-spec` ou `implement` não é composição. O passo REFACTOR permanece dentro de `tdd` e não invoca a skill `refactor`. A frase de lifecycle entra neste ticket para o manifest, o contrato e a fonte permanecerem coerentes. Evidência: `SPEC-20261010-001`, requisitos 1–14 e Testing Decisions.

## Acceptance Criteria

- [x] A regressão falha antes da migração pelo motivo esperado.
- [x] `tdd` e `code-review` estão `implemented` no manifest, no contrato e na fonte.
- [x] O catálogo contém exatamente 11 skills `implemented` e 7 `scaffold`.
- [x] As listas de dependência de `tdd` e de `code-review` permanecem vazias.
- [x] As dependências opcionais de `implement` permanecem as já declaradas.
- [x] Cada par contrato/fonte possui workflow operacional não vazio, idêntico, e sem linguagem de indisponibilidade.
- [x] `CHANGE_SET` permanece named-only. Os templates de evidência e de review permanecem inalterados.
- [x] O workflow de `implement` não passa a invocar `tdd` nem `code-review`.
- [x] Nenhuma dependência, schema, template, target, CLI, regra de routing ou extensão do ADR `0001` é introduzida.

## Validation

- RED: `node --test --test-name-pattern='current catalogue implements code-review' tests/validate-skills.test.mjs` falhou antes da migração. O valor observado foi `setup-ai-development-skills`, `workflow`, `clarify`, `context-engineering`, `to-spec`, `domain-modelling`, `architecture-design`, `to-tickets` e `implement`.
- GREEN: o mesmo comando passou depois da migração. As seções Workflow são idênticas.
- `npm run validate` e `npm run skills:validate`: PASS, 18 skills. `npm test`: PASS, 48/48. `git diff --check`: PASS.

## Definition of Done

Os dois workflows estão publicados, o catálogo migrado e a regressão estrutural verde. A matriz semântica e a documentação de fechamento permanecem no ticket 02.

## Title

02 — Evidência semântica e fechamento de tdd e code-review

## Goal

Registrar a matriz agent-driven de `tdd` e de `code-review` e reconciliar a documentação com onze skills implementadas, sem capability não verificada.

## Context

O ticket 01 torna os workflows operacionais. `SPEC-20261010-001` exige evidência semântica separada da suíte Node e documentação coerente com onze skills implementadas e sete scaffold. `implement` permanece como em `SPEC-20261009-004`. Os quatro targets e as outras sete skills scaffold permanecem fora deste fechamento. Evidência: `SPEC-20261010-001`, critérios 2–15 e 18–20.

## Scope

- Aplicar o contrato e a fonte publicados em diretório temporário, um cenário por entrada isolada.
- Registrar evidência `ready` de `tdd` e relatório `ready` de `code-review` somente nos caminhos que passam, e a ausência de arquivo nos caminhos bloqueados.
- Confirmar que `tdd` não invoca `implement`, `code-review` nem `refactor`, e que `code-review` não invoca `implement`, `tdd` nem `docs`.
- Confirmar que a evidência de `tdd` não reescreve evidência cujo `created_by` é `implement`, e que a review não grava arquivo de `CHANGE_SET` nem altera código.
- Reconciliar proveniência, README, estado arquitetural, padrões, estado do projeto, evidência de validação e handoff.
- Executar a suíte completa e `git diff --check`.

## Out of Scope

- Criar executor, arquivo de teste Node novo, dependência, schema, template, target ou comando CLI.
- Reabrir `SPEC-20261009-002`, `SPEC-20261009-003` ou `SPEC-20261009-004`.
- Fazer push ou publicar issue remota.
- Certificar Node.js 22, Linux ou descoberta real nos quatro produtos.
- Implementar as sete skills que permanecem scaffold.

## Dependencies

Ticket 01.

## Implementation Notes

Os cenários aplicam as skills publicadas; não as reimplementam. Evidência `ready` com `created_by: tdd` e relatório `ready` com `created_by: code-review` são as gravações dos caminhos que passam. O caminho bloqueado não deixa arquivo nem mudança desta tentativa. A documentação declara onze skills implementadas e sete scaffold, sem capability não verificada. Evidência: `SPEC-20261010-001`, critérios 2–20.

## Acceptance Criteria

- [x] Invocação de `tdd` com objetivo definido e sem testes existentes produz evidência `ready` com `created_by: tdd`, registra RED, depois GREEN, depois REFACTOR, aplica a mudança de teste e não reescreve evidência de `implement`. Sem composição por `implement`, não há mudança de implementação.
- [x] Pedido explícito de TDD demonstra o RED antes de qualquer mudança de implementação.
- [x] A execução seguinte do mesmo objetivo de `tdd`, com insumos iguais, incrementa `version` e não reaplica a mudança. O insumo alterado atualiza o mesmo arquivo a partir da versão 1.
- [x] Objetivo de `tdd` sem critério de aceite e sem ticket ou spec que o defina produz `BLOCKED` sem arquivo. Ticket não pronto recomenda `to-tickets`. Spec não pronta recomenda `to-spec`.
- [x] `tdd` não invoca `implement`, `code-review` nem `refactor`.
- [x] Review com contexto e mudança, sem spec, ticket ou evidência, produz relatório `ready` com um dos quatro vereditos, sem arquivo de `CHANGE_SET` e sem diff de código.
- [x] A execução seguinte do mesmo objetivo de `code-review`, com insumos iguais, incrementa `version`.
- [x] Contexto ausente na review produz `BLOCKED` e recomenda `context-engineering`. Mudança ausente produz `BLOCKED`, recomenda `implement` e não autoriza implementação.
- [x] `code-review` não invoca `implement`, `tdd` nem `docs`.
- [x] Segredo não é copiado. Conflito com o ADR `0001` preserva o ADR e recomenda `clarify`.
- [x] `implement` continua sem invocar `tdd` e `code-review`.
- [x] A documentação declara onze skills `implemented` e sete `scaffold`, sem capability não verificada.
- [x] `npm test` e `git diff --check` terminam com código zero.

## Validation

- Matriz agent-driven: 13/13, em `TEST-20261010-002`.
- `npm run validate`, `npm run skills:validate` e `npm test`: PASS, 48/48. `git diff --check`: PASS.
- Review do ticket 01: `REVIEW-20261010-001`, PASS. A review desta mudança de documentação não foi invocada.

## Definition of Done

Os critérios deste ticket estão verificados e a documentação declara a v1-A11 sem capability não verificada. A frontier desta spec só fica vazia quando este ticket e o ticket 01 estiverem concluídos. O push não faz parte deste conjunto.

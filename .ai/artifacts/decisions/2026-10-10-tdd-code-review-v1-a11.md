---
artifact: decision_set
id: DECISION-SET-20261010-001
version: 1
status: ready
created_by: clarify
inputs:
  - maintainer-approval-2026-10-10-v1-a11
  - HANDOFF-20261009-006
  - HANDOFF-20261006-001
  - DECISION-SET-20261009-003
  - SPEC-20261009-004
  - ADR-0001
  - CONTEXT.md
---

## Objective

Operacionalizar `tdd` e `code-review` como emenda v1-A11.

## Resolved Decisions

- O próximo recorte é a emenda v1-A11 e cobre as duas skills `tdd` e `code-review`. Evidência: o mantenedor definiu o passo canônico depois de `implement` como `tdd` quando R11 se aplica e `code-review` para a mudança, e pediu para abrir v1-A11.
- R8 e R9 não se aplicam a esta emenda. Ela operacionaliza skills e não muda o domínio de um produto consumidor nem uma fronteira de arquitetura do pacote. Evidência: o precedente de `SPEC-20261009-002`, `SPEC-20261009-003` e `SPEC-20261009-004`.
- `SPEC-20261009-004` não é reaberta. `implement` continua a gravar a própria evidência com `created_by: implement`, a registrar que `tdd` se aplica e não foi invocado, e a autorizar `code-review` sem invocá-lo. Evidência: o handoff `HANDOFF-20261009-006` e o contrato operacional de `implement`.
- `tdd`, quando invocada, executa RED, depois GREEN, depois REFACTOR. Quando o TDD foi pedido de forma explícita, o RED é demonstrado antes da implementação. A skill grava um `TEST_EVIDENCE` `ready`, com o template existente e `created_by: tdd`, em `.ai/artifacts/tests/`. A mudança de teste fica no working tree. Mudança de implementação só ocorre quando `implement` compõe a skill. Evidência: o contrato de `tdd`, o produtor já declarado de `TEST_EVIDENCE` e o template `templates/artifacts/test-evidence.md`.
- A evidência de `tdd` é um arquivo próprio. A skill não reescreve a evidência cujo `created_by` é `implement`. Uma execução posterior do mesmo objetivo de `tdd` atualiza esse mesmo arquivo e incrementa `version`. Evidência: dois produtores já admitidos no contrato de artefatos, o seam de atualização no lugar e a proibição de reabrir `SPEC-20261009-004`.
- Quando o gate de `tdd` não passa, a skill devolve o relatório `BLOCKED`, não grava arquivo desta tentativa e não aplica mudança desta tentativa. Critério de aceite ou ticket/spec ausente, quando esse insumo é o que define o objetivo, bloqueia. Ausência de testes existentes não bloqueia: o RED parte dessa ausência. Evidência: o contrato de `tdd` e o seam das emendas v1-A6 a v1-A10.
- `code-review`, quando invocada, revisa a mudança citada como `working tree`. Não grava arquivo de `CHANGE_SET` e não altera código. Grava um `REVIEW_REPORT` `ready`, com o template existente e `created_by: code-review`, em `.ai/artifacts/reviews/`. O veredito é `PASS`, `PASS_WITH_NOTES`, `CHANGES_REQUIRED` ou `BLOCKED`. Spec, ticket e evidência de teste continuam opcionais. Uma execução posterior do mesmo objetivo atualiza o mesmo arquivo e incrementa `version`. Evidência: o contrato de `code-review`, o gate de review, o template `templates/artifacts/review-report.md` e `CHANGE_SET` named-only.
- Contexto do projeto ausente, ou mudança ausente, impede a review: a skill devolve `BLOCKED`, não grava arquivo desta tentativa e não autoriza implementação. Uma review concluída persiste status `ready`; o veredito fica na seção `Verdict`. Evidência: o contrato de `code-review` lista o veredito dentro do relatório, e o seam que não grava arquivo quando o gate não chega a passar.
- As duas skills não invocam a skill recomendada. `tdd` não invoca `implement` nem `code-review`. `code-review` não invoca `implement`, `tdd` nem `docs`. O ADR `0001` não é estendido nem modificado. Evidência: o seam de v1-A6 a v1-A10 e o limite do ADR `0001` ao conjunto de decisões.
- Não há dependência npm, executor, schema, template, target nem comando CLI novos. As listas de dependência de `tdd` e de `code-review` permanecem vazias. As dependências opcionais já declaradas em `implement` permanecem. Evidência: o manifest atual e a aprovação deste recorte.
- A suíte Node acompanha o catálogo: ao final, 11 skills `implemented` e 7 `scaffold`. A semântica fica em cenários agent-driven, sem arquivo de teste novo. Evidência: o seam de v1-A6 a v1-A10. As 7 que permanecem scaffold são `handoff`, `research`, `diagnose`, `refactor`, `edge-case-analysis`, `docs` e `modernize`.

## Constraints

- O catálogo permanece em 18 skills e quatro targets. Evidência: `AGENTS.md` e `HANDOFF-20261006-001`.
- `edge-case-analysis`, `docs` e as outras skills scaffold fora de `tdd` e `code-review` ficam fora deste recorte. Evidência: o mantenedor nomeou só esse passo.
- Helper externo de glossário não integra o runtime da skill. Evidência: `docs/agents/domain.md`.
- Esta decisão não executa `tdd` nem `code-review`. As duas continuam scaffold até a emenda ser implementada. Evidência: o status atual no manifest.

## Assumptions

- Nenhuma.

## Rejected Alternatives

- Dividir o passo em v1-A11 para `tdd` e v1-A12 para `code-review`. Evidência: o mantenedor nomeou um único recorte, v1-A11, com as duas skills.
- Fazer `implement` passar a invocar `tdd` ou `code-review`. Evidência: `SPEC-20261009-004` está fechada e o handoff proíbe reabri-la.
- Reescrever a evidência já gravada por `implement`. Evidência: essa evidência tem `created_by: implement` e a spec fechada a protege.
- Persistir relatório ou evidência `blocked` ou `draft`. Evidência: o seam que não grava arquivo quando o gate falha, sem estender o ADR `0001`.
- Inventar esquema ou template para `CHANGE_SET`. Evidência: a saída permanece named-only no contrato de artefatos.
- Acrescentar ou remover dependência no manifest. Evidência: as listas de `tdd` e `code-review` estão vazias e as opcionais de `implement` já existem.
- Abrir o recorte em `research`, `diagnose`, `edge-case-analysis` ou `docs`. Evidência: o passo nomeado é `tdd` quando R11 se aplica e `code-review` para a mudança.
- Criar executor, schema, template, target ou comando CLI. Evidência: o mesmo seam.

## Open Questions

- Node.js 22, Linux, descoberta real nos quatro produtos e reconciliação com GitHub Issues continuam sem verificação. Nenhuma delas altera este recorte.

## Blocking Questions

- Nenhuma.

---
artifact: decision_set
id: DECISION-SET-20261009-001
version: 1
status: ready
created_by: clarify
inputs:
  - maintainer-approval-2026-10-09-domain-modelling
  - HANDOFF-20261009-003
  - HANDOFF-20261006-001
  - ADR-0001
  - CONTEXT.md
---

## Objective

Operacionalizar `domain-modelling` como emenda v1-A8.

## Resolved Decisions

- O próximo recorte é `domain-modelling`, registrado como emenda v1-A8. Evidência: aprovação explícita do mantenedor em 2026-10-09.
- A skill grava somente um `DOMAIN_MODEL` `ready`, com o template existente, em `.ai/artifacts/domain/`. Evidência: a aprovação adotou o seam de v1-A6 e v1-A7; o diretório está no layout recomendado de `contracts/artifacts.md`.
- Quando o gate não passa, a skill devolve o relatório `BLOCKED` e não grava arquivo. Evidência: a mesma aprovação.
- Uma execução posterior do mesmo objetivo atualiza o mesmo arquivo e incrementa `version`. Evidência: o seam aprovado repete v1-A6 e v1-A7.
- O ADR `0001` não é estendido. Evidência: a aprovação manteve o ADR restrito ao conjunto de decisões.
- Não há dependência npm, executor, schema, template, target nem comando CLI novos. As dependências da skill permanecem vazias. Evidência: a mesma aprovação e o contrato atual da skill.
- A suíte Node acompanha o catálogo, as dependências vazias e o esquema já definido de `DOMAIN_MODEL`. A semântica fica em cenários agent-driven, sem arquivo de teste novo. Evidência: o seam aprovado repete v1-A6 e v1-A7.
- A skill encerra no modelo e não invoca a skill seguinte. Evidência: o mesmo seam.

## Constraints

- O catálogo permanece em 18 skills e quatro targets. Evidência: `AGENTS.md` e `HANDOFF-20261006-001`.
- `architecture-design` e `implement` ficam fora deste recorte. Evidência: a aprovação nomeou `domain-modelling` como o recorte único.
- Helper externo de glossário não integra o runtime da skill. Evidência: `docs/agents/domain.md`.

## Assumptions

- Nenhuma.

## Rejected Alternatives

- Persistir modelo `blocked` ou `draft`, no padrão de `clarify`. Evidência: a aprovação adotou o seam que não grava arquivo quando o gate falha e não estende o ADR `0001`.
- Abrir o recorte em `architecture-design` ou em `implement`. Evidência: a aprovação nomeou `domain-modelling`.
- Criar executor, schema, template, dependência, target ou comando CLI. Evidência: a mesma aprovação.

## Open Questions

- Node.js 22, Linux, descoberta real nos quatro produtos e reconciliação com GitHub Issues continuam sem verificação. Nenhuma delas altera este recorte.

## Blocking Questions

- Nenhuma.

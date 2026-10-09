---
artifact: decision_set
id: DECISION-SET-20261009-002
version: 1
status: ready
created_by: clarify
inputs:
  - maintainer-approval-2026-10-09-v1-a9
  - HANDOFF-20261009-004
  - HANDOFF-20261006-001
  - ADR-0001
  - CONTEXT.md
---

## Objective

Operacionalizar `architecture-design` como emenda v1-A9.

## Resolved Decisions

- O próximo recorte é `architecture-design`, registrado como emenda v1-A9. Evidência: o mantenedor pediu continuidade em v1-A9 em 2026-10-09, e a sequência canônica de feature nova coloca essa skill imediatamente depois de `domain-modelling`.
- A skill grava um `ARCHITECTURE_DESIGN` `ready`, com o template existente, em `.ai/artifacts/architecture/`. Evidência: o seam de v1-A6, v1-A7 e v1-A8, aplicado à saída já contratada; o diretório está no layout recomendado de `contracts/artifacts.md`.
- Quando a spec `ready` já registra uma decisão arquitetural durável, com alternativas e consequências, a skill também grava um ADR `ready` com o template existente em `.ai/decisions/`. Evidência: a seção 7.5 de `contracts/artifacts.md` permite o ADR adicional; o caminho `adrPath` já é `.ai/decisions`.
- Quando o gate não passa, a skill devolve o relatório `BLOCKED` e não grava desenho nem ADR. Evidência: o mesmo seam das três emendas anteriores.
- Uma execução posterior do mesmo objetivo atualiza o mesmo desenho e incrementa `version`. O ADR da mesma decisão, quando existe, também é atualizado e incrementa `version`. A skill não apaga ADR. Evidência: o seam aprovado repete a atualização no lugar; a proibição de apagar evita reescrever ADR `0001` ou um ADR alheio.
- O ADR `0001` não é estendido nem modificado. Evidência: as emendas v1-A6, v1-A7 e v1-A8 mantiveram o ADR restrito ao conjunto de decisões.
- Não há dependência npm, executor, schema, template, target nem comando CLI novos. As dependências condicionais já declaradas permanecem. Evidência: o manifest já condiciona `research` e `domain-modelling`; a aprovação de continuidade não autoriza dependência nova.
- A suíte Node acompanha o catálogo, as dependências condicionais existentes e os esquemas já definidos de `ARCHITECTURE_DESIGN` e `ADR`. A semântica fica em cenários agent-driven, sem arquivo de teste novo. Evidência: o seam aprovado repete v1-A6, v1-A7 e v1-A8.
- A skill encerra no desenho e não invoca a skill seguinte. Desenho `ready` autoriza `to-tickets`. Evidência: a sequência canônica e o mesmo seam de não invocar.

## Constraints

- O catálogo permanece em 18 skills e quatro targets. Evidência: `AGENTS.md` e `HANDOFF-20261006-001`.
- `research`, `implement` e as outras skills scaffold ficam fora deste recorte. Evidência: o recorte único é `architecture-design`.
- Helper externo de glossário não integra o runtime da skill. Evidência: `docs/agents/domain.md`.

## Assumptions

- Nenhuma.

## Rejected Alternatives

- Persistir desenho `blocked` ou `draft`. Evidência: o seam que não grava arquivo quando o gate falha, sem estender o ADR `0001`.
- Gravar ADR em todo desenho, mesmo sem decisão durável já registrada na spec. Evidência: a seção 7.5 torna o ADR adicional, não obrigatório.
- Abrir o recorte em `research` ou em `implement`. Evidência: a continuidade de v1-A9 segue a sequência canônica depois de `domain-modelling`.
- Remover ou acrescentar dependência no manifest. Evidência: as condicionais já existem e o seam não cria dependência nova.
- Criar executor, schema, template, target ou comando CLI. Evidência: o mesmo seam.

## Open Questions

- Node.js 22, Linux, descoberta real nos quatro produtos e reconciliação com GitHub Issues continuam sem verificação. Nenhuma delas altera este recorte.

## Blocking Questions

- Nenhuma.

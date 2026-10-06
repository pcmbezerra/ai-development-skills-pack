---
artifact: ticket_set
id: TICKET-SET-20261006-001
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261006-001
---

# Contexto e bootstrap local

Conjunto executável derivado de `SPEC-20261006-001`. Cada arquivo vinculado é um registro TICKET e contém todas as seções exigidas pelo contrato.

Publicação remota: pendente; `gh` não está disponível no ambiente atual. Ao reconciliar com GitHub Issues, criar na ordem abaixo, aplicar `ready-for-agent` e substituir as referências locais pelos identificadores remotos sem duplicar tickets.

## Tickets

1. [Aceitar ciclo de vida misto das skills](01-ciclo-de-vida-misto.md) — concluído.
2. [Operacionalizar context-engineering](02-context-engineering-operacional.md) — concluído.
3. [Operacionalizar bootstrap local](03-bootstrap-local-operacional.md) — desbloqueado após a conclusão de 02.
4. [Endurecer bootstrap e fechar v1-A2](04-endurecer-bootstrap-v1-a2.md) — bloqueado por 03.

## Dependency graph

```text
01 -> 02 -> 03 -> 04
```

Frontier atual: ticket 03.

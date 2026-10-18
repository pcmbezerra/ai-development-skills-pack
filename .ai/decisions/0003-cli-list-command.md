---
artifact: adr
id: ADR-0003
version: 1
status: ready
created_by: architecture-design
inputs:
  - SPEC-20261016-001
  - DECISION-SET-20261016-001
---

## Context

ADR `0002` restringe os agentes a não acrescentar comando de CLI. A spec `SPEC-20261016-001` já registra a decisão, as alternativas e as consequências: a v1-A22 adiciona somente `list`.

## Decision

A CLI ganha o comando `list`. Ele lê o manifesto canônico e escreve uma linha por skill, somente com `name`, na ordem de `skills`. Não aceita opção e não escreve arquivo. A exceção à restrição de ADR `0002` vale só para esse comando.

## Alternatives

Manter `list` rejeitado. Incluir `status`, `category`, `primaryInvocation` e `path` na mesma linha. Aceitar `--target`. As três estão rejeitadas na spec.

## Consequences

A ajuda e o despacho em `bin/ai-dev-skills.mjs` mudam. O teste que rejeita `list` muda só para esse comando. `doctor`, `sync` e `bootstrap` continuam rejeitados. Manifesto, targets, instalador, frontmatter e dependências npm não mudam. ADR `0001` e ADR `0002` não são reescritos. Os quatro targets continuam no `install` explícito, sem papel neste comando.

## Constraints for AI Agents

Não tratar esta exceção como permissão para outro comando. Não editar ADR `0001` nem ADR `0002`. Não acrescentar chave de target, dependência npm nem campo de frontmatter. Não fazer `list` ler diretório instalado nem escolher target. Não tratar a suíte estrutural como execução dos quatro produtos.

---
artifact: adr
id: ADR-0004
version: 1
status: ready
created_by: architecture-design
inputs:
  - SPEC-20261019-001
  - DECISION-SET-20261019-001
---

## Context

ADR `0002` restringe os agentes a não acrescentar comando de CLI. ADR `0003` abre exceção só para `list`. A spec `SPEC-20261019-001` já registra a decisão, as alternativas e as consequências: a v1-A23 adiciona somente `doctor`.

## Decision

A CLI ganha o comando `doctor`. Ele verifica o Node.js do processo que o executa e a disponibilidade do executável `git` no `PATH`. Não aceita opção, não escreve arquivo, não usa a rede, não executa `git` e não chama `validate` nem `validateTarget`. A exceção à restrição de ADR `0002` vale só para esse comando.

## Alternatives

Manter `doctor` rejeitado. Repetir `validate`. Localizar instalações ou detectar plataforma. As três estão rejeitadas na spec.

## Consequences

A ajuda e o despacho em `bin/ai-dev-skills.mjs` mudam. O teste que rejeita `doctor` muda só para esse comando. `sync` e `bootstrap` continuam rejeitados. Manifesto, targets, instalador, frontmatter e dependências npm não mudam. ADR `0001`, ADR `0002` e ADR `0003` não são reescritos. Os quatro targets continuam no `install` explícito, sem papel neste comando. A stdout de diagnóstico tem duas linhas e a stderr fica vazia. Opção ou argumento continua no parser existente, com saída 1 e `ERROR:`.

## Constraints for AI Agents

Não tratar esta exceção como permissão para outro comando. Não editar ADR `0001`, ADR `0002` nem ADR `0003`. Não acrescentar chave de target, dependência npm nem campo de frontmatter. Não fazer `doctor` executar `git`, aceitar `git.exe`, ler `PATHEXT`, escolher target ou localizar instalação. Não tratar a suíte estrutural como execução dos quatro produtos. Não implementar o comando a partir deste ADR sem a etapa autorizada.

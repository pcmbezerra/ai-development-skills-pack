---
artifact: adr
id: ADR-0002
version: 1
status: ready
created_by: architecture-design
inputs:
  - SPEC-20261013-009
  - DECISION-SET-20261013-009
---

## Context

A instalação copia o diretório de cada skill e preserva os bytes. Os `SKILL.md` apontam para `contracts/` e para o manifesto com um relativo que só resolve na raiz deste repositório. A spec `SPEC-20261013-009` já registra a decisão, as alternativas e as consequências.

## Decision

A unidade que o `install` entrega é o diretório da skill. Os contratos e templates mínimos vão para dentro desse diretório como projeção da fonte canônica. O instalador não reescreve links. Os quatro targets recebem o mesmo diretório.

## Alternatives

Copiar o manifesto e o contrato compartilhado para as dezoito skills. Colocar uma única cópia num diretório irmão. Reescrever o caminho durante a instalação. Usar symlink para `contracts/`. Embutir o texto normativo inteiro no `SKILL.md`.

## Consequences

O diretório da skill cresce com cópias verificáveis do subconjunto citado. O mantenedor continua editando `contracts/` e `templates/artifacts/`. O validador acusa deriva e link que sai do diretório. Um projeto consumidor não precisa deste repositório para resolver os links. A abertura desses arquivos por Cursor, Codex, Antigravity ou Claude Code continua sem observação.

## Constraints for AI Agents

Não mover a fonte canônica para dentro da skill. Não achatar a categoria da fonte para criar um diretório compartilhado. Não acrescentar chave de target, comando de CLI, dependência npm ou campo de frontmatter. Não estender o ADR `0001`. Não tratar a suíte estrutural como execução dos quatro produtos.

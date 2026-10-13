---
artifact: ticket_set
id: TICKET-SET-20261013-008
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261013-008
  - ARCHITECTURE-20261013-001
---

# Descoberta documentada — emenda v1-A19

Conjunto executável derivado de `SPEC-20261013-008`. Cada bloco é um TICKET. Publicação remota pendente. O Markdown local é a fonte até reconciliação com GitHub Issues.

## Title

01 — Descrições de descoberta

## Goal

Trocar a descrição das dezoito skills pela frase que diz o trabalho e quando usar a skill, no manifest e no frontmatter.

## Context

`RESEARCH-20261013-401` mostra que a seleção implícita usa `description`. As frases anteriores não tinham gatilho. Goals e workflows já estão operacionais.

## Scope

- Atualizar `manifest/skills.json` e os dezoito `SKILL.md`.
- Manter goal, status, dependência e corpo do workflow.

## Out of Scope

- Validador, CLI, targets e contratos narrativos. Isso é o ticket 02.
- Flags de fornecedor e links portáteis.

## Dependencies

Nenhuma. Depende apenas de `SPEC-20261013-008`.

## Implementation Notes

Uma linha JSON. A cláusula é `Use when`. Cada frase fica em ou abaixo de 240 caracteres. Não copiar caminho de target para o corpo.

## Acceptance Criteria

- As dezoito descrições coincidem entre manifest e frontmatter.
- Nenhuma outra chave do manifest muda.

## Validation

`npm run validate` depois do ticket 02. Este ticket sozinho deixa o validador antigo verde se a descrição ainda for só nome e texto.

## Definition of Done

Diff limitado às linhas `description`.

## Title

02 — Validar a forma de descoberta

## Goal

Fazer o validador rejeitar descrição sem `Use when` ou acima de 240 caracteres, e registrar a emenda sem afirmar descoberta ao vivo.

## Context

O ticket 01 produz o texto. O validador atual só exige descrição não vazia e igual ao frontmatter. A CLI já rejeita `list`, `doctor` e `sync`.

## Scope

- Regras em `scripts/validate-skills.mjs`.
- Duas rejeições em `tests/validate-skills.test.mjs`.
- Notas em `contracts/skill-contract.md`, `references/provenance.md`, `README.md` e na evidência de validação.

## Out of Scope

- Mudança em `scripts/distribute-skills.mjs`.
- Comando novo.
- Execução dos quatro produtos.

## Dependencies

Ticket 01.

## Implementation Notes

A checagem lê a descrição do manifest. O frontmatter continua restrito a `name` e `description`. A mensagem de orçamento chama o limite de política do pacote.

## Acceptance Criteria

- A suíte falha nos dois casos novos quando a mutação está presente.
- A suíte passa no catálogo desta emenda.
- A ajuda da CLI continua sem `list`.

## Validation

`npm test`, `npm run validate`, `npm run skills:validate` e `git diff --check`.

## Definition of Done

Evidência em `TEST-20261013-015` com o ambiente e a contagem reais da execução.

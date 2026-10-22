---
artifact: ticket_set
id: TICKET-SET-20261022-002
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261022-002
---

# Diagnóstico de name duplicado — emenda v1-A25

Conjunto executável derivado de `SPEC-20261022-002`. Cada bloco é um TICKET. O Markdown local é a fonte. Nenhum ticket publica issue remota. Esta execução não inicia os tickets.

O pedido pede a comparação em `validate()`, os testes de duplicidade simples, múltiplos pares e diferenças textuais, a preservação das validações e mensagens existentes, e critérios verificáveis. Os dois primeiros são os tickets 01 e 02. A preservação e a validação final são critérios desses tickets, não um terceiro corte.

## Title

01 — Diagnóstico de name duplicado em validate()

## Goal

Fazer `validate()` emitir um erro adicional para cada par de entradas de `manifest.skills` cujo `name` seja a mesma string, sem normalizar, e manter `Invalid canonical catalogue`.

## Context

`SPEC-20261022-002` está `ready`. A comparação usa as strings que `JSON.parse` já entrega. R8 e R9 não se aplicam. Não há modelo de domínio nem desenho de arquitetura para este objetivo. A spec não autoriza implementação. Este conjunto descreve o trabalho e não o executa.

## Scope

- Comparar, em `validate()` de `scripts/validate-skills.mjs`, cada par `i < j` de `manifest.skills`.
- Tratar como iguais só as strings idênticas já parseadas.
- Registrar um erro adicional por par igual, na forma `<nome i>: duplicate manifest name <nome j>`, na ordem crescente dos pares.
- Manter a condição composta que produz exatamente `Invalid canonical catalogue`.
- Manter `ok` falso quando existir ao menos um par igual, e o `report()` já existente.

## Out of Scope

- `trim`, mudança de caixa e normalização Unicode nesta comparação. Evidência: requisito 2 e Non-goals da spec.
- Remover, reescrever ou fundir `Invalid canonical catalogue`. Evidência: requisito 5 da spec.
- Alterar a comparação de `description` e o texto `identical manifest description`. Evidência: Non-goals da spec.
- `validateTarget`, `install`, `package`, `list`, `doctor`, `sync` e `bootstrap`. Evidência: requisito 9 da spec.
- Alterar `tests/validate-skills.test.mjs`. Isso é o ticket 02.
- Manifesto permanente, targets, instalador, contratos, ADR, `.ai/project.md` e os treze caminhos de fim de linha. Evidência: Non-goals da spec.

## Dependencies

Nenhuma. `SPEC-20261022-002` já está `ready`.

## Implementation Notes

Os operandos são `skills[i].name` e `skills[j].name` depois do `JSON.parse` que `validate()` já faz. A igualdade é a da mesma sequência de caracteres. Uma entrada não é comparada com ela mesma. A regex de `name`, o teto de 64 caracteres, a categoria, o caminho, a invocação, o frontmatter e a comparação de `description` permanecem. O erro deste critério nomeia só os dois `name`, o anterior primeiro. Não reescrever ADR `0001`, ADR `0002`, ADR `0003` nem ADR `0004`.

## Acceptance Criteria

- No manifesto versionado, `validate()` retorna `ok` verdadeiro. Nenhum erro `duplicate manifest name` aparece e `Invalid canonical catalogue` não aparece. Evidência: critérios 1 e 8 da spec.
- Um par `i < j` com a mesma string produz `<nome i>: duplicate manifest name <nome j>`, e `errors` contém `Invalid canonical catalogue`. Evidência: requisitos 3 e 5 e critério 2 da spec.
- Três entradas com o mesmo `name` produzem três erros deste critério, um por par `i < j`, na ordem crescente dos pares, e `errors` contém `Invalid canonical catalogue`. Evidência: critério 3 da spec.
- Caixa diferente, espaço final diferente e NFC diferente de NFD não produzem esse erro. Evidência: critérios 4, 5 e 6 da spec.
- `validateTarget`, a comparação de `description` e os comandos existentes não são editados por este ticket. Evidência: requisito 9 da spec.

## Validation

`node scripts/validate-skills.mjs` no catálogo versionado termina com saída 0. Uma leitura de `validate()` com um par igual observa o erro do critério 2 da spec e a mensagem `Invalid canonical catalogue`. O diff deste ticket não inclui `scripts/distribute-skills.mjs`, `bin/ai-dev-skills.mjs` nem `tests/validate-skills.test.mjs`.

## Definition of Done

A comparação está em `validate()`, o catálogo versionado continua passando, `Invalid canonical catalogue` permanece, e o working tree deste ticket não altera `validateTarget`, comandos, testes, manifesto permanente, targets, instalador, contratos, ADR nem os treze caminhos de fim de linha.

## Title

02 — Testes de duplicidade simples, múltiplos pares e diferenças textuais

## Goal

Fixar na suíte a duplicidade simples, os múltiplos pares, as diferenças textuais e a preservação de `Invalid canonical catalogue`, da comparação de `description`, de `validateTarget` e dos comandos.

## Context

`tests/validate-skills.test.mjs` já altera o manifesto em fixture e afirma `validate().ok` e `errors`. `SPEC-20261022-002` pede duplicidade de um par, três pares, caixa, espaço, Unicode, nomes idênticos com espaço, a conservação do erro de `description`, a saída do comando `validate` e a conservação dos outros comandos. A spec não autoriza implementação. O comportamento novo é o ticket 01.

## Scope

- Acrescentar, no arquivo de teste já existente, uma duplicidade simples: a entrada posterior recebe exatamente o `name` da anterior.
- Afirmar que `errors` contém `<nome anterior>: duplicate manifest name <nome posterior>` e contém `Invalid canonical catalogue`. Não exigir que esses sejam os únicos erros.
- Acrescentar três entradas com o mesmo `name` e os três erros `i < j`, na ordem crescente, além de `Invalid canonical catalogue`.
- Acrescentar diferença só de caixa, só de espaço final e só de forma Unicode, sem erro deste critério. O valor que falha a regex já existente continua sujeito a `Invalid name`.
- Afirmar que dois `name` armazenados como `workflow ` e `workflow ` geram o erro deste critério, sem `trim`, e que cada um continua sujeito a `Invalid name`.
- Afirmar que dois `name` distintos com a mesma `description` geram o erro já existente de `description` e não geram `duplicate manifest name`.
- Afirmar a saída 0 do catálogo versionado e a saída 1 da fixture duplicada, com as linhas `- <nome anterior>: duplicate manifest name <nome posterior>` e `- Invalid canonical catalogue`.
- Afirmar que `validateTarget`, `install`, `package`, `list` e `doctor` seguem o comportamento já coberto, e que `sync` e `bootstrap` terminam com saída 1.

## Out of Scope

- Novo arquivo de teste, dependência npm ou mudança dos 18 `name` permanentes.
- Implementar a comparação. A comparação é o ticket 01.
- Alterar `validateTarget`, o texto `Invalid canonical catalogue` ou o despacho dos comandos para fazê-los passar.
- Exigir que `errors` contenha só o erro novo. A spec registra que caminho, categoria e frontmatter podem continuar presentes.
- Overlap semântico, `sync` com escrita, desinstalação, instalação global, detecção de plataforma, roteador automático e `meta-skills/skill-authoring`. Evidência: Non-goals da spec.
- Os treze caminhos de fim de linha. Evidência: critério 11 da spec.

## Dependencies

Ticket 01. Sem ciclo.

## Implementation Notes

A afirmação do par usa inclusão em `errors`, não igualdade da lista inteira. A ordem observada dos erros deste critério é a ordem crescente de `i < j`. A fixture de `description` pode alinhar o frontmatter da própria entrada, como a suíte da v1-A24 já faz, para o erro `identical manifest description` continuar visível. Não lançar Cursor, Codex, Antigravity nem Claude Code.

## Acceptance Criteria

- A suíte cobre um par igual com o erro exato `<nome anterior>: duplicate manifest name <nome posterior>` e com `Invalid canonical catalogue`. Evidência: critério 2 da spec.
- A suíte cobre três erros deste critério para três entradas iguais, na ordem crescente dos pares, e `Invalid canonical catalogue`. Evidência: critério 3 da spec.
- A suíte cobre caixa, espaço final e NFC/NFD sem erro deste critério. Evidência: critérios 4, 5 e 6 da spec.
- A suíte cobre `workflow ` igual a `workflow ` sem usar `trim` na igualdade, com `Invalid name` ainda aplicável. Evidência: critério 7 da spec.
- A suíte cobre `name` distintos com a mesma `description`: há erro `identical manifest description` e não há `duplicate manifest name` nesse par. Evidência: critério 8 da spec.
- `npm test` e `node scripts/validate-skills.mjs` passam no catálogo versionado. Na fixture duplicada, a stderr contém as duas linhas do critério 9 da spec.
- `validateTarget`, `install`, `package`, `list` e `doctor` conservam o comportamento atual. `sync` e `bootstrap` terminam com saída 1. Evidência: critério 10 da spec.
- Nenhuma dependência npm é adicionada. O catálogo permanente permanece em 18 skills. ADR `0001`, ADR `0002`, ADR `0003` e ADR `0004` permanecem intactos. Os treze caminhos de fim de linha não entram na mudança. Evidência: critério 11 da spec.

## Validation

Depois do ticket 01, `npm test` e `npm run validate`. `node scripts/validate-skills.mjs` no catálogo versionado termina com saída 0.

## Definition of Done

A suíte passa com duplicidade simples, múltiplos pares e diferenças textuais, `Invalid canonical catalogue` e o erro de `description` permanecem, `validateTarget` e os comandos existentes conservam o comportamento já observado, e `git status` não mostra manifesto permanente, targets, instalador, contratos, ADR nem os treze caminhos de fim de linha alterados por este ticket.

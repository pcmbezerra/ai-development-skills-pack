---
artifact: ticket_set
id: TICKET-SET-20261022-001
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261022-001
---

# Igualdade exata de description — emenda v1-A24

Conjunto executável derivado de `SPEC-20261022-001`. Cada bloco é um TICKET. O Markdown local é a fonte. Nenhum ticket publica issue remota. Esta execução não inicia os tickets.

O pedido pede a verificação em `validate()`, os testes de duplicidade, diferença textual e múltiplos pares, a preservação de `validateTarget` e dos comandos, e os critérios de aceite com a validação final. Os dois primeiros são os tickets 01 e 02. A preservação e a validação final são critérios desses tickets, não um terceiro corte.

## Title

01 — Igualdade exata de description em validate()

## Goal

Fazer `validate()` rejeitar cada par de entradas de `manifest.skills` cuja `description` seja a mesma string, sem normalizar e sem medir semelhança.

## Context

`SPEC-20261022-001` está `ready`. A comparação usa as strings que `JSON.parse` já entrega. R8 e R9 não se aplicam. Não há modelo de domínio nem desenho de arquitetura para este objetivo. A spec não autoriza implementação. Este conjunto descreve o trabalho e não o executa.

## Scope

- Comparar, em `validate()` de `scripts/validate-skills.mjs`, cada par `i < j` de `manifest.skills`.
- Tratar como iguais só as strings idênticas já parseadas.
- Registrar um erro por par igual, na forma `<nome i>: identical manifest description <nome j>`.
- Manter `ok` falso quando existir ao menos um par igual, e o `report()` já existente.

## Out of Scope

- `trim`, mudança de caixa, colapso de espaço, `normalizeNewlines` e normalização Unicode nesta comparação. Evidência: requisito 2 e Non-goals da spec.
- Overlap semântico, alteração das descrições do catálogo e comparação do corpo de `SKILL.md`. Evidência: Non-goals da spec.
- `validateTarget`, `install`, `package`, `list`, `doctor`, `sync` e `bootstrap`. Evidência: requisitos 6 e 8 da spec.
- Alterar `tests/validate-skills.test.mjs`. Isso é o ticket 02.
- Manifesto permanente, targets, instalador, contratos, ADR e `.ai/project.md`. Evidência: Non-goals da spec.

## Dependencies

Nenhuma. `SPEC-20261022-001` já está `ready`.

## Implementation Notes

Os operandos são `skills[i].description` e `skills[j].description` depois do `JSON.parse` que `validate()` já faz. A igualdade é a da mesma sequência de caracteres. Uma entrada não é comparada com ela mesma. As conferências já existentes de presença, teto de 240 caracteres, `Use when` e frontmatter permanecem. O erro nomeia só os dois `name`, o anterior primeiro. Não reescrever ADR `0001`, ADR `0002`, ADR `0003` nem ADR `0004`.

## Acceptance Criteria

- No manifesto versionado, `validate()` retorna `ok` verdadeiro e nenhum erro `identical manifest description` aparece. Evidência: critérios 1 e 7 da spec, quanto ao catálogo atual.
- Um par `i < j` com a mesma string produz exatamente `<nome i>: identical manifest description <nome j>`. Evidência: requisito 3 e critério 2 da spec.
- Três entradas iguais produzem três erros, um por par `i < j`, na ordem crescente dos pares. Evidência: critério 3 da spec.
- Caixa diferente, espaço final diferente e NFC diferente de NFD não produzem esse erro. Evidência: critérios 4, 5 e 6 da spec.
- `validateTarget` e os comandos existentes não são editados por este ticket. Evidência: requisito 8 da spec.

## Validation

`node scripts/validate-skills.mjs` no catálogo versionado termina com saída 0. Uma leitura de `validate()` com um par igual observa o erro do critério 2. O diff deste ticket não inclui `scripts/distribute-skills.mjs`, `bin/ai-dev-skills.mjs` nem `tests/validate-skills.test.mjs`.

## Definition of Done

A comparação está em `validate()`, o catálogo versionado continua passando, e o working tree deste ticket não altera `validateTarget`, comandos, testes, manifesto permanente, targets, instalador, contratos nem ADR.

## Title

02 — Testes de duplicidade, diferença textual e múltiplos pares

## Goal

Fixar na suíte a igualdade exata, as diferenças que não são duplicidade e a preservação de `validateTarget` e dos comandos.

## Context

`tests/validate-skills.test.mjs` já altera manifesto e frontmatter em fixture e afirma `validate().ok` e `errors`. `SPEC-20261022-001` pede os cenários de duplicidade, caixa, espaço final, Unicode e três pares, além da saída do comando `validate` e da conservação dos outros comandos. A spec não autoriza implementação. O comportamento novo é o ticket 01.

## Scope

- Acrescentar, no arquivo de teste já existente, a duplicidade de duas entradas com frontmatter alinhado à própria entrada.
- Acrescentar três entradas iguais e os três erros `i < j`.
- Acrescentar diferença só de caixa, só de espaço final e só de forma Unicode, sem erro deste critério.
- Afirmar que duas strings ` ` são iguais entre si e que ` ` e `  ` não são.
- Afirmar a saída 0 do catálogo versionado e a saída 1 da fixture duplicada, com a linha `- <nome anterior>: identical manifest description <nome posterior>`.
- Afirmar que `validateTarget`, `install`, `package`, `list` e `doctor` seguem o comportamento já coberto, e que `sync` e `bootstrap` terminam com saída 1.

## Out of Scope

- Novo arquivo de teste, dependência npm ou mudança das 18 descrições permanentes.
- Implementar a comparação. A comparação é o ticket 01.
- Alterar `validateTarget` ou o despacho dos comandos para fazê-los passar.
- Overlap semântico, `sync` com escrita, desinstalação, instalação global, detecção de plataforma, roteador automático e `meta-skills/skill-authoring`. Evidência: Non-goals da spec.

## Dependencies

Ticket 01. Sem ciclo.

## Implementation Notes

A fixture que copia uma `description` também atualiza o frontmatter dessa skill, para não confundir o erro novo com o erro já existente de frontmatter. A string copiada conserva `Use when` e o teto de 240 caracteres. A ordem dos nomes é a ordem de `manifest.skills`. Não lançar Cursor, Codex, Antigravity nem Claude Code.

## Acceptance Criteria

- A suíte cobre um par igual com o erro exato `<nome anterior>: identical manifest description <nome posterior>` e sem erro de frontmatter nesse par. Evidência: critério 2 da spec.
- A suíte cobre três erros para três entradas iguais. Evidência: critério 3 da spec.
- A suíte cobre caixa, espaço final e NFC/NFD sem erro deste critério. Evidência: critérios 4, 5 e 6 da spec.
- A suíte cobre ` ` igual a ` ` e diferente de `  ` sem usar `trim` na igualdade. Evidência: critério 7 da spec.
- `npm test` e `node scripts/validate-skills.mjs` passam no catálogo versionado. Na fixture duplicada, a stderr contém a linha do critério 8 da spec.
- `validateTarget`, `install`, `package`, `list` e `doctor` conservam o comportamento atual. `sync` e `bootstrap` terminam com saída 1. Evidência: critério 9 da spec.
- Nenhuma dependência npm é adicionada. O catálogo permanece em 18 skills. ADR `0001`, ADR `0002`, ADR `0003` e ADR `0004` permanecem intactos. Evidência: critério 10 da spec.

## Validation

Depois do ticket 01, `npm test` e `npm run validate`. `node scripts/validate-skills.mjs` no catálogo versionado termina com saída 0.

## Definition of Done

A suíte passa com duplicidade, diferenças textuais e múltiplos pares, `validateTarget` e os comandos existentes conservam o comportamento já observado, e `git status` não mostra manifesto permanente, targets, instalador, contratos nem ADR alterados por este ticket.

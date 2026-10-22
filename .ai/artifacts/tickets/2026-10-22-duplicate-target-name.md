---
artifact: ticket_set
id: TICKET-SET-20261022-003
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261022-003
---

# Diagnóstico de name duplicado em targets — emenda v1-A26

Conjunto executável derivado de `SPEC-20261022-003`. Cada bloco é um TICKET. O Markdown local é a fonte. Nenhum ticket publica issue remota. Esta execução não inicia os tickets.

O pedido pede o diagnóstico em `validate()`, os testes de duplicidade simples, múltiplos pares e diferenças textuais, a preservação das mensagens e dos comportamentos existentes, e dependências com critérios de conclusão. Os dois primeiros são os tickets 01 e 02. A preservação é critério dos dois, não um terceiro corte.

## Title

01 — Diagnóstico de name duplicado em manifest.targets

## Goal

Fazer `validate()` emitir um erro adicional para cada par de entradas de `manifest.targets` cujo `name` seja a mesma string, sem normalizar, e manter `Invalid targets` e `Duplicate targets` com o mesmo texto e o mesmo disparo.

## Context

`SPEC-20261022-003` está `ready`. A comparação usa as strings que `JSON.parse` já entrega. O manifesto versionado lista `claude-code`, `cursor`, `codex` e `antigravity`, nessa ordem. R8 e R9 não se aplicam. Não há modelo de domínio nem desenho de arquitetura para este objetivo. A spec não autoriza implementação. Este conjunto descreve o trabalho e não o executa.

## Scope

- Comparar, em `validate()` de `scripts/validate-skills.mjs`, cada par `i < j` de `manifest.targets`.
- Tratar como iguais só as strings idênticas já parseadas.
- Registrar um erro adicional por par igual, na forma `<nome i>: duplicate target name <nome j>`, na ordem crescente dos pares.
- Manter a condição que produz exatamente `Invalid targets`, com o mesmo disparo.
- Manter a condição que produz exatamente `Duplicate targets`, com o mesmo disparo.
- Manter `ok` falso quando existir ao menos um par igual, e o `report()` já existente.

## Out of Scope

- `trim`, mudança de caixa e normalização Unicode nesta comparação. Evidência: requisito 2 e Non-goals da spec.
- Remover, reescrever, fundir ou mudar o disparo de `Invalid targets` ou de `Duplicate targets`. Evidência: requisito 5 da spec.
- Alterar `duplicate manifest name` ou `identical manifest description`. Evidência: requisito 9 da spec.
- `validateTarget`, `install`, `package`, `list`, `doctor`, `sync` e `bootstrap`. Evidência: requisito 9 da spec.
- Alterar `tests/validate-skills.test.mjs`. Isso é o ticket 02.
- Manifesto permanente, descritores, instalador, contratos, ADR, `.ai/project.md` e os treze caminhos de fim de linha. Evidência: Non-goals da spec.
- Fazer o teste de três pares de `name` de skill distinguir uma emissão invertida. Evidência: Non-goals da spec.

## Dependencies

Nenhuma. `SPEC-20261022-003` já está `ready`.

## Implementation Notes

Os operandos são `targets[i].name` e `targets[j].name` depois do `JSON.parse` que `validate()` já faz. A igualdade é a da mesma sequência de caracteres. Uma entrada não é comparada com ela mesma. O caminho `targets/${name}.mjs`, a leitura do descritor e a compatibilidade do descritor permanecem. O erro deste critério nomeia só os dois `name`, o anterior primeiro, e o texto é distinto de `Duplicate targets` e de `duplicate manifest name`. Não reescrever ADR `0001`, ADR `0002`, ADR `0003` nem ADR `0004`.

## Acceptance Criteria

- No manifesto versionado, `validate()` retorna `ok` verdadeiro. Nenhum erro `duplicate target name` aparece. `Invalid targets` não aparece e `Duplicate targets` não aparece. Evidência: critérios 1 e 8 da spec.
- `targets[2]` substituído pelo objeto `targets[1]` produz `cursor: duplicate target name cursor`. `errors` contém `Invalid targets` e `Duplicate targets`, e não contém `duplicate manifest name`. Evidência: requisito 3 e critério 2 da spec.
- Dois pares com textos diferentes saem na ordem crescente de `i < j`: primeiro `claude-code: duplicate target name claude-code`, depois `cursor: duplicate target name cursor`. Evidência: requisito 6 e critério 3 da spec.
- Cinco entradas, com uma cópia de `targets[0]` no fim, produzem `claude-code: duplicate target name claude-code` e `Invalid targets`, e não produzem `Duplicate targets`. Evidência: critério 5 da spec.
- Remover `claude-code` sem repetir `name` mantém `Invalid targets` e `Duplicate targets` e não produz `duplicate target name`. Evidência: critério 6 da spec.
- Caixa diferente, espaço final diferente e NFC diferente de NFD não produzem esse erro. Evidência: critérios 7, 8 e 9 da spec.
- `validateTarget`, as comparações de `name` de skill e de `description`, e os comandos existentes não são editados por este ticket. Evidência: requisito 9 da spec.

## Validation

`node scripts/validate-skills.mjs` no catálogo versionado termina com saída 0. Uma leitura de `validate()` na fixture do critério 2 da spec observa `cursor: duplicate target name cursor`, `Invalid targets` e `Duplicate targets`. O diff deste ticket não inclui `scripts/distribute-skills.mjs`, `bin/ai-dev-skills.mjs` nem `tests/validate-skills.test.mjs`.

## Definition of Done

A comparação está em `validate()`, o catálogo versionado continua passando, `Invalid targets` e `Duplicate targets` permanecem com o mesmo texto e o mesmo disparo, e o working tree deste ticket não altera `validateTarget`, comandos, testes, manifesto permanente, descritores, instalador, contratos, ADR nem os treze caminhos de fim de linha.

## Title

02 — Testes de duplicidade simples, múltiplos pares e diferenças textuais

## Goal

Fixar na suíte a duplicidade simples, os múltiplos pares, as diferenças textuais e a preservação de `Invalid targets`, de `Duplicate targets`, de `duplicate manifest name`, de `identical manifest description`, de `validateTarget` e dos comandos.

## Context

`tests/validate-skills.test.mjs` já altera o manifesto em fixture e afirma `validate().ok` e `errors`. O teste `duplicate target` só casa `/Duplicate targets/`. `SPEC-20261022-003` pede um par, dois pares de textos diferentes, três nomes iguais, cinco entradas, um alvo ausente sem repetição, caixa, espaço, Unicode, nomes idênticos com espaço, a conservação dos erros de skill e a saída do comando `validate`. A spec não autoriza implementação. O comportamento novo é o ticket 01.

## Scope

- Acrescentar, no arquivo de teste já existente, a duplicidade simples: `targets[2]` recebe o objeto `targets[1]`.
- Afirmar que `errors` contém `cursor: duplicate target name cursor`, contém `Invalid targets` e contém `Duplicate targets`. Não exigir que esses sejam os únicos erros. Afirmar que não contém `duplicate manifest name`.
- Acrescentar os dois pares de textos diferentes e afirmar a ordem entre si: `claude-code: duplicate target name claude-code` e, depois, `cursor: duplicate target name cursor`, além de `Invalid targets` e `Duplicate targets`.
- Acrescentar três entradas `cursor` e afirmar três erros `cursor: duplicate target name cursor`. Registrar que as três strings são iguais e que essa lista, sozinha, não distingue uma emissão invertida. A ordem verificável é a do cenário anterior.
- Acrescentar a quinta entrada, cópia de `targets[0]`, e afirmar o erro do par e `Invalid targets`, e a ausência de `Duplicate targets`.
- Acrescentar a remoção de `claude-code` sem `name` repetido e afirmar `Invalid targets` e `Duplicate targets`, e a ausência de `duplicate target name`.
- Acrescentar diferença só de caixa, só de espaço final e só de forma Unicode, sem erro deste critério.
- Afirmar que dois `name` armazenados como `cursor ` e `cursor ` geram `cursor : duplicate target name cursor `, sem `trim`.
- Afirmar que duas skills com o mesmo `name` geram `duplicate manifest name` e `Invalid canonical catalogue`, e não geram `duplicate target name`.
- Afirmar que dois `name` de skill distintos com a mesma `description` geram o erro já existente de `description` e não geram `duplicate target name`.
- Afirmar a saída 0 do catálogo versionado e a saída 1 da fixture do critério 2, com as linhas `- cursor: duplicate target name cursor`, `- Invalid targets` e `- Duplicate targets`.
- Afirmar que `validateTarget`, `install`, `package`, `list` e `doctor` seguem o comportamento já coberto, que `validate --target` não emite `duplicate target name`, e que `sync` e `bootstrap` terminam com saída 1.

## Out of Scope

- Novo arquivo de teste, dependência npm ou mudança dos quatro `name` de target permanentes e dos 18 `name` de skill permanentes.
- Implementar a comparação. A comparação é o ticket 01.
- Alterar o texto ou o disparo de `Invalid targets` ou de `Duplicate targets`, ou o despacho dos comandos, para fazê-los passar.
- Exigir que `errors` contenha só o erro novo. A spec registra que caminho e descritor podem continuar presentes.
- Overlap semântico, `sync` com escrita, desinstalação, instalação global, detecção de plataforma, roteador automático e `meta-skills/skill-authoring`. Evidência: Non-goals da spec.
- Os treze caminhos de fim de linha. Evidência: critério 15 da spec.
- Distinguir a ordem no teste já existente de três pares de `name` de skill. Evidência: Non-goals da spec.

## Dependencies

Ticket 01. Sem ciclo.

## Implementation Notes

A afirmação do par usa inclusão em `errors`, não igualdade da lista inteira. A ordem observada dos erros deste critério é a ordem crescente de `i < j`, e o cenário que a torna visível é o de dois pares com textos diferentes. A fixture de `description` e a de `name` de skill podem seguir o desenho que a suíte da v1-A24 e da v1-A25 já usa. Não lançar Cursor, Codex, Antigravity nem Claude Code.

## Acceptance Criteria

- A suíte cobre um par igual com `cursor: duplicate target name cursor`, `Invalid targets` e `Duplicate targets`, sem `duplicate manifest name`. Evidência: critério 2 da spec.
- A suíte cobre dois pares de textos diferentes, na ordem `claude-code` e depois `cursor`, com `Invalid targets` e `Duplicate targets`. Evidência: critério 3 da spec.
- A suíte cobre três erros iguais para três entradas `cursor`, sem tratar essa lista como prova de ordem. Evidência: critério 4 da spec.
- A suíte cobre a quinta entrada: há o erro do par e `Invalid targets`, e não há `Duplicate targets`. Evidência: critério 5 da spec.
- A suíte cobre a remoção de `claude-code` sem repetição: há `Invalid targets` e `Duplicate targets`, e não há `duplicate target name`. Evidência: critério 6 da spec.
- A suíte cobre caixa, espaço final e NFC/NFD sem erro deste critério. Evidência: critérios 7, 8 e 9 da spec.
- A suíte cobre `cursor ` igual a `cursor ` sem usar `trim` na igualdade. Evidência: critério 10 da spec.
- A suíte cobre `name` de skill duplicado e `description` idêntica sem emitir `duplicate target name`. Evidência: critérios 11 e 12 da spec.
- `npm test` e `node scripts/validate-skills.mjs` passam no catálogo versionado. Na fixture do critério 2, a stderr contém as três linhas do critério 13 da spec.
- `validateTarget`, `install`, `package`, `list` e `doctor` conservam o comportamento atual. `validate --target` não emite `duplicate target name`. `sync` e `bootstrap` terminam com saída 1. Evidência: critério 14 da spec.
- Nenhuma dependência npm é adicionada. O catálogo permanente permanece em 18 skills e em quatro targets. ADR `0001`, ADR `0002`, ADR `0003` e ADR `0004` permanecem intactos. Os treze caminhos de fim de linha não entram na mudança. Evidência: critério 15 da spec.

## Validation

Depois do ticket 01, `npm test` e `npm run validate`. `node scripts/validate-skills.mjs` no catálogo versionado termina com saída 0.

## Definition of Done

A suíte passa com duplicidade simples, múltiplos pares e diferenças textuais, `Invalid targets` e `Duplicate targets` permanecem com o mesmo disparo, `duplicate manifest name` e o erro de `description` permanecem, `validateTarget` e os comandos existentes conservam o comportamento já observado, e `git status` não mostra manifesto permanente, descritores, instalador, contratos, ADR nem os treze caminhos de fim de linha alterados por este ticket.

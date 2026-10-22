---
artifact: edge_case_report
id: EDGE-CASE-20261022-001
version: 1
status: ready
created_by: edge-case-analysis
inputs:
  - SPEC-20261022-003
  - TICKET-SET-20261022-003
  - IMPL-20261022-003
  - TEST-20261022-006
  - REVIEW-20261022-004
---

# Diagnóstico de name de target — limites da v1-A26

Objetivo: fronteiras da comparação de `name` em `manifest.targets`, no working tree de `scripts/validate-skills.mjs` e `tests/validate-skills.test.mjs`. A spec `SPEC-20261022-003` está `ready`. Não há modelo de domínio; a própria spec declara que R8 não se aplica. Esta execução não alterou produção nem teste. O comportamento esperado citado abaixo vem da spec. `REVIEW-20261022-004` está `PASS`.

## Scenario

Um par `i < j` de `manifest.targets` cujo `name` armazenado é a mesma string. Evidência: requisito 3 e critério 2 de `SPEC-20261022-003`.

## Category

boundaries

## Risk

Entrada externa. O validador lê o `name` que o manifesto já persiste. Evidência: Security / Privacy de `SPEC-20261022-003`.

## Expected Behaviour

`validate()` inclui `<nome i>: duplicate target name <nome j>`, `Invalid targets` e `Duplicate targets`. Não inclui `duplicate manifest name`. Evidência: critério 2 da spec.

## Existing Coverage

`validate rejects two targets with the same stored name` copia `targets[1]` para `targets[2]` e afirma essas três mensagens e a ausência de `duplicate manifest name`. A stderr da CLI afirma as três linhas. Evidência: `tests/validate-skills.test.mjs`.

## Missing Coverage

none

## Recommended Test

none

## Scenario

Dois pares com textos diferentes, na ordem crescente de `i < j`. Evidência: requisito 6 e critério 3 de `SPEC-20261022-003`.

## Category

data integrity

## Risk

A ordem de emissão identifica qual par veio antes. Uma lista invertida mudaria o diagnóstico. Evidência: requisito 6 da spec.

## Expected Behaviour

Entre si, `claude-code: duplicate target name claude-code` sai antes de `cursor: duplicate target name cursor`. `Invalid targets` e `Duplicate targets` permanecem. Evidência: critério 3 da spec.

## Existing Coverage

`validate rejects distinct target name pairs in index order` afirma essa ordem com `deepEqual` sobre os erros deste critério. Evidência: `tests/validate-skills.test.mjs`.

## Missing Coverage

none

## Recommended Test

none

## Scenario

Três entradas com o mesmo `name`. Evidência: critério 4 de `SPEC-20261022-003`.

## Category

boundaries

## Risk

O número de pares `i < j` é três. A spec declara que as três strings iguais não distinguem uma emissão invertida. Evidência: critério 4 da spec.

## Expected Behaviour

Há três erros `cursor: duplicate target name cursor`. `Invalid targets` e `Duplicate targets` permanecem. A ordem observável continua a do critério 3. Evidência: critério 4 da spec.

## Existing Coverage

`validate rejects every pair of three identical target names` afirma a contagem e as duas mensagens existentes. A ordem está no teste do critério 3. Evidência: `tests/validate-skills.test.mjs`.

## Missing Coverage

none

## Recommended Test

none

## Scenario

Cinco entradas, com uma cópia de `targets[0]` e os quatro nomes esperados ainda presentes. Evidência: critério 5 de `SPEC-20261022-003`.

## Category

data integrity

## Risk

`Duplicate targets` usa `size === 4`. Um nome repetido que preserva quatro nomes únicos não deve passar a disparar essa mensagem, nem deixar de ser nomeado. Evidência: requisito 5 e critério 5 da spec.

## Expected Behaviour

Há `claude-code: duplicate target name claude-code` e `Invalid targets`. Não há `Duplicate targets`. Evidência: critério 5 da spec.

## Existing Coverage

`validate names a repeated target when four unique names remain`. Evidência: `tests/validate-skills.test.mjs`.

## Missing Coverage

none

## Recommended Test

none

## Scenario

`claude-code` removido e nenhum `name` repetido. Evidência: critério 6 de `SPEC-20261022-003`.

## Category

data integrity

## Risk

O conjunto fica com tamanho diferente de 4 sem haver par igual. `Duplicate targets` deve continuar, e o erro novo não deve aparecer. Evidência: critério 6 da spec.

## Expected Behaviour

Há `Invalid targets` e `Duplicate targets`. Não há `duplicate target name`. Evidência: critério 6 da spec.

## Existing Coverage

`validate keeps Duplicate targets when a target is absent and names do not repeat`. Evidência: `tests/validate-skills.test.mjs`.

## Missing Coverage

none

## Recommended Test

none

## Scenario

Dois `name` diferem só pela caixa, só por um espaço final, ou só pela forma Unicode NFC e NFD. Evidência: requisitos 1 e 4 e critérios 7, 8 e 9 de `SPEC-20261022-003`.

## Category

encoding

## Risk

Normalizar caixa, espaço ou Unicode trataria como iguais strings que a spec trata como diferentes. Evidência: requisito 2 da spec.

## Expected Behaviour

Esse par não gera `duplicate target name`. Evidência: critérios 7, 8 e 9 da spec.

## Existing Coverage

`validate keeps case, trailing space and unicode form distinct for target names` afirma `café` diferente de `cafe\u0301` e a ausência do erro neste critério. Evidência: `tests/validate-skills.test.mjs`.

## Missing Coverage

none

## Recommended Test

none

## Scenario

Dois `name` armazenados como `cursor `, com o espaço no fim. Evidência: requisito 2 e critério 10 de `SPEC-20261022-003`.

## Category

boundaries

## Risk

`trim` apagaria a igualdade que a spec exige. Evidência: requisito 2 da spec.

## Expected Behaviour

O erro é `cursor : duplicate target name cursor `. A comparação não aplica `trim`. Evidência: critério 10 da spec.

## Existing Coverage

`validate compares target name spaces without trimming`. Evidência: `tests/validate-skills.test.mjs`.

## Missing Coverage

none

## Recommended Test

none

## Scenario

Uma entrada comparada com ela mesma, ou um `name` de skill duplicado, ou duas `description` iguais. Evidência: requisitos 5 e 9 de `SPEC-20261022-003`.

## Category

data integrity

## Risk

Um auto-par, ou a comparação de skill, mudaria um diagnóstico que a spec mantém separado. Evidência: requisitos 5 e 9 da spec.

## Expected Behaviour

Não há auto-par: o laço usa `j` a partir de `i + 1`. `name` de skill duplicado continua em `duplicate manifest name` e `Invalid canonical catalogue`, sem `duplicate target name`. `description` igual continua em `identical manifest description`, sem `duplicate target name`. Evidência: requisitos 5 e 9 e critérios 11 e 12 da spec.

## Existing Coverage

O catálogo versionado passa em `current mixed catalogue satisfies the complete baseline checks`, então um auto-par não é emitido. `validate keeps a duplicate skill name out of the target diagnostic` e `validate keeps matching descriptions out of the target diagnostic` cobrem as outras duas conservações. Evidência: `tests/validate-skills.test.mjs`.

## Missing Coverage

none

## Recommended Test

none

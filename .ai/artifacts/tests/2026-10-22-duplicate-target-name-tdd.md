---
artifact: test_evidence
id: TEST-20261022-005
version: 1
status: ready
created_by: tdd
inputs:
  - SPEC-20261022-003
  - TICKET-SET-20261022-003
---

## Tests Added

O teste `validate rejects two targets with the same stored name`. Ele copia o objeto `targets[1]` para `targets[2]` e espera `ok` falso, o erro `cursor: duplicate target name cursor`, as mensagens `Invalid targets` e `Duplicate targets`, e a ausência de `duplicate manifest name`. A stderr da CLI entra no mesmo teste.

## Tests Executed

`node --test --test-name-pattern="validate rejects two targets with the same stored name" tests/validate-skills.test.mjs`, antes de alterar `scripts/validate-skills.mjs`.

## Expected Failure / RED

Um teste executado, zero aprovados, uma falha, saída 1, duração 253 ms. A asserção de `ok` falso passou, porque `Invalid targets` e `Duplicate targets` já falham. A asserção seguinte falhou: `errors` não continha `cursor: duplicate target name cursor`. O valor observado foi `false`.

## Passing Evidence / GREEN

Depois do laço `i < j` sobre `manifest.targets`, o mesmo teste passou, 1/1, duração 366 ms. A suíte completa entrou em `TEST-20261022-006`.

## Regression Suite

Não rodou no vermelho. O verde isolado foi só esse teste.

## Failures

Nenhuma depois do verde desse teste. A falha do vermelho foi a ausência do diagnóstico `duplicate target name`.

## Skipped Tests

Nenhum.

## Environment Limitations

Node.js v26.5.0 e npm 11.17.0, em Darwin 25.6.0. O passo de refatoração não alterou arquivo depois do verde: a verificação adicional no laço `i < j` com `!==` já era o menor caminho. Os cenários de dois pares, três nomes iguais, cinco entradas, alvo ausente, caixa, espaço, Unicode, `name` de skill e `description` entraram no mesmo arquivo depois desse verde e estão na evidência de `implement`.

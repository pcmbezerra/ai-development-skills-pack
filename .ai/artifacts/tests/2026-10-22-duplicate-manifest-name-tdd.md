---
artifact: test_evidence
id: TEST-20261022-003
version: 1
status: ready
created_by: tdd
inputs:
  - SPEC-20261022-002
  - TICKET-SET-20261022-002
---

## Tests Added

O teste `validate rejects two skills with the same stored name`. Ele copia o `name` de `workflow` para `clarify` e espera `ok` falso, o erro `workflow: duplicate manifest name workflow` e a mensagem `Invalid canonical catalogue`.

## Tests Executed

`node --test --test-name-pattern="validate rejects two skills with the same stored name" tests/validate-skills.test.mjs`, antes de alterar `scripts/validate-skills.mjs`.

## Expected Failure / RED

Um teste executado, zero aprovados, uma falha, saída 1, duração 268 ms. A asserção de `ok` falso passou, porque `Invalid canonical catalogue` já falha. A asserção seguinte falhou: `errors` não continha `workflow: duplicate manifest name workflow`. O valor observado foi `false`.

## Passing Evidence / GREEN

Depois da comparação de `name` no laço `i < j` já existente, o mesmo teste passou, 1/1, duração 363 ms. A suíte completa entrou em `TEST-20261022-004`.

## Regression Suite

Não rodou no vermelho. O verde isolado foi só esse teste.

## Failures

Nenhuma depois do verde desse teste. A falha do vermelho foi a ausência do diagnóstico `duplicate manifest name`.

## Skipped Tests

Nenhum.

## Environment Limitations

Node.js v26.5.0 e npm 11.17.0, em Darwin 25.6.0. O passo de refatoração não alterou arquivo depois do verde: a verificação adicional no laço `i < j` com `!==` já era o menor caminho. Os cenários de três pares, caixa, espaço, Unicode, `description` e CLI entraram no mesmo arquivo depois desse verde e estão na evidência de `implement`.

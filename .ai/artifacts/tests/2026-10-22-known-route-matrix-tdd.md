---
artifact: test_evidence
id: TEST-20261022-007
version: 1
status: ready
created_by: tdd
inputs:
  - SPEC-20261022-004
  - TICKET-SET-20261022-004
---

## Tests Added

Nenhum teste entrou em `tests/` nem em `npm test`. O ticket 01 nomeia a verificação como leitura de `.ai/artifacts/quality/2026-10-22-known-route-matrix.md` contra `SPEC-20261022-004`. A leitura confere a frase do limite, a regra do caso não declarado, a permanência da igualdade exata de `description` e as seções K1–K8.

## Tests Executed

Antes de criar o arquivo, `test -f .ai/artifacts/quality/2026-10-22-known-route-matrix.md` observou ausência. `git diff --name-only` em `contracts/routing.md` e em `scripts/validate-skills.mjs` não listou esses caminhos.

Depois do arquivo, uma leitura única conferiu os doze critérios no texto já gravado. Essa leitura não foi salva como teste da suíte.

## Expected Failure / RED

O arquivo não existia. A frase do limite, K1–K8 e a regra do caso não declarado não puderam ser lidos. Resultado observado: `MATRIX=absent`. Nenhum byte da matriz foi escrito antes dessa observação.

## Passing Evidence / GREEN

A leitura posterior encontrou a frase do limite, as seções K1 a K8 nessa ordem, nenhuma seção K9, as skills esperadas, as rotas proibidas de K5–K8 e as duas frases de `validate()`. A contagem de falhas dessa leitura foi 0.

## Regression Suite

Não rodou. O ticket 10 diz que `npm test` não é a verificação desta matriz.

## Failures

Nenhuma depois do verde. A falha do vermelho foi a ausência do arquivo.

## Skipped Tests

A suíte Node não entrou neste ciclo. O contrato de verificação desta matriz é a leitura, não `tests/validate-skills.test.mjs`.

## Environment Limitations

Node.js v26.5.0 e npm 11.17.0, em Darwin 25.6.0 arm64. O passo de refatoração não alterou o arquivo depois do verde: o texto já era só a estrutura, os oito casos e os limites pedidos. Não houve classificador, score, embedding nem caso além de K1–K8.

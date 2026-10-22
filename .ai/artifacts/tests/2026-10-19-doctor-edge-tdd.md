---
artifact: test_evidence
id: TEST-20261019-006
version: 1
status: ready
created_by: tdd
inputs:
  - EDGE-CASE-20261019-001
  - SPEC-20261019-001
  - ARCHITECTURE-20261019-001
  - ADR-0004
---

## Tests Added

Seis testes em `tests/validate-skills.test.mjs`: `PATH` vazio, omitido ou só com o separador; `git` só no segundo segmento; nome `git` que é diretório; somente `git.exe`; argumento posicional e `--target` sem valor; diretório de trabalho e diretório de `PATH` inalterados nos caminhos dos critérios 1, 3 e 6. No teste já existente, as duas linhas de `nodeLine('21.9.9')` com `gitLine`, e a ausência de `child_process`, `fetch(`, `node:net` e `node:http` no ramo delimitado.

## Tests Executed

Antes da edição da suíte, um script local executou esses casos contra `bin/ai-dev-skills.mjs`. Depois, `node --test --test-name-pattern=doctor` e `npm test`, fora do sandbox no `npm test`. Node.js v26.5.0 e npm 11.17.0.

## Expected Failure / RED

O script anterior à edição passou os onze casos. Não houve falha de produto. A suíte ainda não tinha essas asserções. `bin/ai-dev-skills.mjs` não foi editado. Nenhuma asserção incorreta foi gravada para fabricar vermelho.

## Passing Evidence / GREEN

O filtro `doctor` passou 7/7. `npm test`: 60 aprovados, 0 falhas, 0 ignorados, 0 todos, duração 6420 ms. A baseline de `TEST-20261019-005` era 54. A diferença é seis `test()` novos. `git diff --check` não apontou erro.

## Regression Suite

A suíte inteira passou, inclusive distribuição dos quatro targets, `list`, `sync` e `bootstrap`.

## Failures

Nenhuma na suíte. A primeira redação da linha `git pass` usaria o arquivo `git` já deixado em modo `0o644`; o ensaio prévio tinha usado modo `0o755`. O teste voltou o modo para `0o755` antes dessa asserção. A CLI não mudou.

## Skipped Tests

Nenhum. Os itens de `EDGE-CASE-20261019-001` marcados como não autorizados não foram escritos.

## Environment Limitations

macOS. A comparação do diretório de trabalho é a lista rasa de `process.cwd()`. A do `PATH` inclui nome, tamanho e modo de um nível. Não há hash do conteúdo aninhado. A saída 1 do processo quando só Node falha continua fora: o critério 2 dispensa outro binário, e esta execução não altera a CLI. A refatoração não mudou arquivo depois do verde.

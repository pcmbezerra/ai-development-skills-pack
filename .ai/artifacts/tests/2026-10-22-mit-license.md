---
artifact: test_evidence
id: TEST-20261022-009
version: 1
status: ready
created_by: implement
inputs:
  - SPEC-20261022-005
  - TICKET-SET-20261022-005
  - DECISION-SET-20261022-005
---

## Tests Added

Nenhum arquivo em `tests/`. Os tickets nomeiam a comparação com o texto oficial SPDX `MIT`, a leitura de `package.json` e do `README.md`, e o diff dos três arquivos.

## Tests Executed

Comparação linha a linha de `LICENSE` com `MIT.txt` do SPDX license-list-data. Leitura de `package.json` e do diff. Leitura do parágrafo de licença do `README.md`. `npm test` e `npm run validate`, fora do sandbox.

## Expected Failure / RED

Não houve vermelho de produto. A primeira `npm test`, dentro do sandbox, falhou em dois testes de instalação com `EPERM` ao criar diretório em `/var/folders`. O catálogo e os demais testes dessa rodada passaram. A causa foi o sandbox, não a licença.

## Passing Evidence / GREEN

Critérios de `SPEC-20261022-005`:

1. `LICENSE` não contém `LICENSE PLACEHOLDER` nem `No license has been selected.`
2. `LICENSE` contém uma vez a linha `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`.
3. As 18 linhas batem com `MIT.txt`, exceto a linha 3. O arquivo JSON `details/MIT.json` tem `licenseText` idêntico a `MIT.txt`, 1078 bytes, SHA-256 `b05785f9f18e6716bab63424b11454513b9943a222595b70411009202fc592b5`.
4. `package.json` tem `license` igual a `MIT`. O diff é só essa linha.
5. `private` é `true` e `version` é `1.0.0-scaffold`.
6. Nenhum outro campo de `package.json` mudou.
7. O `README.md` não contém as frases de placeholder, de licença não escolhida nem `UNLICENSED`. O diff é uma linha na seção Limites.
8. O `README.md` diz `A licença é MIT.` e continua a declarar `private: true`.
9. `git diff --ignore-cr-at-eol --stat` lista só `LICENSE`, `package.json` e `README.md`. Manifesto, contratos, ADRs, skills, CLI e validador não aparecem.

Tickets 01, 02 e 03 produzem esses arquivos. O ticket 04 é esta releitura.

## Regression Suite

`npm test`: 78/78, duração 10817 ms, zero falhas, skips ou todos. `npm run validate`: `PASS: 18 skills`. Ambiente da repetição: Node.js v26.5.0, npm 11.17.0, Darwin 25.6.0.

## Failures

Nenhuma na comparação nem na repetição fora do sandbox. As duas falhas `EPERM` ficaram na rodada anterior, dentro do sandbox.

## Skipped Tests

Nenhum na repetição. A suíte não contém asserção do texto de `LICENSE`.

## Environment Limitations

`https://spdx.org/licenses/MIT.json` respondeu HTTP 403 e não foi usado. A comparação usou o repositório oficial `spdx/license-list-data`, arquivos `text/MIT.txt` e `json/details/MIT.json`, lidos em 2026-10-22. Não há harness de licença no `npm test`.

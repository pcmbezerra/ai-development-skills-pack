---
artifact: test_evidence
id: TEST-20261022-012
version: 1
status: ready
created_by: implement
inputs:
  - TICKET-SET-20261022-008
  - SPEC-20261022-008
  - DECISION-SET-20261022-008
  - IMPL-20261022-008
---

## Tests Added

`tests/spdx-mit.test.mjs`, oito testes de `node:test`. O template lido é `tests/spdx-mit.txt`. Não houve fase separada de `tdd`.

## Tests Executed

- `node --test tests/spdx-mit.test.mjs`, dentro do sandbox, depois da correção da linha de `corpo`: 8/8, duração 115.195125 ms.
- `npm test`, fora do sandbox: 86/86, duração 11082.394208 ms.
- `npm run validate`, fora do sandbox: `PASS: 18 skills`.

## Expected Failure / RED

Não houve RED de `tdd`. A primeira execução do módulo, ainda nesta tentativa, teve 7 aprovações e 1 falha: o teste de `corpo` editava a linha em branco entre o aviso e `Permission`, então o texto não mudava e o resultado vinha `ok: true`. A causa foi o índice da linha no teste. O oráculo não foi alterado.

Os cenários negativos esperam que o avaliador recuse a cópia e nomeie a classe. O teste de `node:test` correspondente passa quando a classe é a pedida.

## Passing Evidence / GREEN

Depois da correção, o módulo passou 8/8. A suíte completa passou 86/86, com zero falhas, skips ou todos. `npm run validate` passou com 18 skills. Ambiente da suíte completa: Node.js v26.5.0, npm 11.17.0, Darwin 25.6.0 arm64.

O template tem 1078 bytes e SHA-256 `b05785f9f18e6716bab63424b11454513b9943a222595b70411009202fc592b5`. A linha 3 é `Copyright (c) <year> <copyright holders>`. Não há byte `0x0D` e o último byte é `0x0A`.

Cenários que passaram:

- Template canônico com o hash oficial, conferido antes da comparação.
- Cópia temporária intacta de `LICENSE` e `package.json`. A linha 3 aprovada é `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. `license` é `MIT`, `private` é o booleano `true` e `version` é `1.0.0-scaffold`.
- Um byte alterado no template, com `LICENSE` aprovado, classe `template`.
- Espaço extra, placeholder, ano `2025` e nome `Outro Nome`, classe `aviso`.
- `Permission` trocado por `Permitted` fora da linha 3, classe `corpo`.
- Linha removida e linha `EXTRA`, classe `extensao`.
- CRLF e newline final removido, classe `extensao`.
- `UNLICENSED`, `Apache-2.0`, `mit`, `MIT `, campo `license` ausente, `private` `false`, `private` string `true`, `version` `1.0.0` e JSON `{`, classe `campo`.

O teste positivo compara o SHA-256 canônico de `LICENSE` e do template, e os bytes de `package.json`, antes e depois da cópia. Eles permaneceram iguais.

## Regression Suite

`npm test` executou os dois módulos anteriores e o módulo novo: 86 aprovações. `npm run validate` continuou aprovando 18 skills, R1–R17 e os descritores de target. Não há contagem nova escrita em `references/validation-result.md`.

## Failures

Nenhuma na repetição do módulo nem na suíte completa. A falha intermediária do índice de linha foi corrigida no mesmo arquivo de teste antes dessa repetição.

## Skipped Tests

Nenhum. A saída registra zero skips e zero todos.

## Environment Limitations

Os comandos completos rodaram fora do sandbox. O módulo sozinho também passou dentro do sandbox. npm avisou `Unknown env config "devdir"` e mesmo assim saiu 0. Não houve rede na asserção. Nenhuma dependência npm foi adicionada.

---
artifact: test_evidence
id: TEST-20261013-016
version: 1
status: ready
created_by: implement
inputs:
  - SPEC-20261013-009
  - TICKET-SET-20261013-009
---

## Tests Added

Duas rejeições em `tests/validate-skills.test.mjs`: link Markdown que sai do diretório da skill e projeção de `failure.md` diferente da fonte. Um teste em `tests/distribute-skills.test.mjs` instala os quatro targets num diretório temporário sem `contracts/` e sem `manifest/skills.json` e resolve cada link a partir do diretório instalado. O fixture de scaffold de `modernize` passou a usar caminhos internos e a regravar `references/contract.md` quando o contrato canônico muda.

## Tests Executed

`npm test`, `npm run validate`, `npm run skills:validate`, `git diff --check`, `node bin/ai-dev-skills.mjs --help`, `list`, `doctor` e `sync`.

## Expected Failure / RED

Não houve uma execução vermelha anterior à projeção: o validador novo e os arquivos novos entraram no mesmo ciclo. As duas rejeições novas falham quando a mutação está presente e passam no catálogo desta emenda. O teste de instalação falharia se um link resolvesse só porque o processo está dentro deste repositório.

## Passing Evidence / GREEN

`npm test` ficou 53/53, com zero falhas, skips ou todos. `npm run validate` e `npm run skills:validate` passaram com 18 skills. `git diff --check` passou. `--help` saiu 0. `list`, `doctor` e `sync` saíram 1. A projeção medida tem 84 arquivos e 263465 bytes. Nenhum `SKILL.md` mudou a seção Workflow. `manifest/skills.json` e o ADR `0001` não têm diff.

## Regression Suite

Catálogo, ciclo de vida, LF/CRLF, colisão divergente, empacotamento e CLI continuaram verdes. O fixture que promove `modernize` de volta a `implemented` continua verde com a projeção atualizada.

## Failures

Nenhuma na execução final.

## Skipped Tests

Nenhum.

## Environment Limitations

Linux 6.12.94+ x86_64, Node.js v22.14.0, npm 10.9.9. A suíte não executa os quatro produtos. A comparação de projeção normaliza fim de linha em memória.

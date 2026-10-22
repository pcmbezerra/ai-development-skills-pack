---
artifact: implementation_report
id: IMPL-20261019-003
version: 1
status: ready
created_by: implement
inputs:
  - REVIEW-20261019-002
  - REVIEW-20261019-001
  - SPEC-20261019-001
  - ARCHITECTURE-20261019-001
  - ADR-0004
  - TEST-20261019-004
---

## Input

Pedido explícito para tratar as duas notas baixas de `REVIEW-20261019-002`, só em teste. `SPEC-20261019-001`, `ARCHITECTURE-20261019-001` e `ADR-0004` limitam o comando. `bin/ai-dev-skills.mjs` não entra nesta correção.

## Plan

Falhar quando o marcador do ramo `doctor` ou o marcador do comando não suportado não delimitarem um recorte não vazio que contenha `gitLine`. Acrescentar um `spawn` cujo `PATH` é um arquivo, depois de confirmar que `stat` lança erro diferente de `ENOENT`. Manter o lookup injetado em `gitLine`.

## Files Changed

- `tests/validate-skills.test.mjs`

## Behaviour Changed

Nenhum comportamento de produção. `doctor` continua com as duas linhas, sem `validate` e sem executar `git`.

## Validation Performed

Fora do sandbox, em Node.js v26.5.0 e npm 11.17.0: `npm test` 54/54, `npm run validate` PASS com 18 skills e `git diff --check` sem achado. A baseline anterior era 54 testes; a contagem permanece 54 porque as asserções entraram no teste já existente.

## Tests

O vermelho do marcador ausente e o verde desta execução estão em `TEST-20261019-005`. R11 se aplica a esta regressão de teste. A skill `tdd` não foi invocada em separado.

## Known Limitations

Os marcadores continuam sendo texto do fonte. A ausência agora falha. Um segmento de `PATH` que é arquivo produziu `ENOTDIR` neste macOS; outro código diferente de `ENOENT` também satisfaz a asserção. `ENOENT` falha o teste em vez de ser tratado como `git` ausente. `git.exe` e o bit de execução no Windows permanecem fora.

## Remaining Work

`code-review` desta correção não foi executado. R12 se aplica à entrada `PATH`; `edge-case-analysis` não foi executado. R14 não se aplica a este diff de teste. `.ai/project.md`, `.ai/architecture.md`, `contracts/skill-contract.md` e `README.md` ainda descrevem `doctor` como ausente, conforme `REVIEW-20261019-001`; `docs` não foi executado.

## Change Reference

working tree

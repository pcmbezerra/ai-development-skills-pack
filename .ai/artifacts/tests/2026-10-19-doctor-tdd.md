---
artifact: test_evidence
id: TEST-20261019-001
version: 1
status: ready
created_by: tdd
inputs:
  - SPEC-20261019-001
  - TICKET-SET-20261019-001
  - ARCHITECTURE-20261019-001
  - ADR-0004
---

## Tests Added

O teste `doctor reports node and git without calling validate`. O teste `CLI exposes distribution commands while rejecting unsupported commands` passou a exigir `ai-dev-skills doctor` na ajuda e tirou `doctor` do laço que rejeita `bootstrap` e `sync`.

## Tests Executed

`node --test --test-name-pattern="doctor reports|CLI exposes" tests/validate-skills.test.mjs`, antes de alterar `bin/ai-dev-skills.mjs`.

## Expected Failure / RED

Dois testes executados, zero aprovados, duas falhas, saída 1. A ajuda não continha `ai-dev-skills doctor`. `doctor` terminou com saída 1 e stderr `ERROR: Unsupported command: doctor. Use --help.` A importação de `nodeLine` não chegou a rodar: a primeira asserção do comando já falhou.

## Passing Evidence / GREEN

Depois da mudança em `bin/ai-dev-skills.mjs`, fora do sandbox, `npm test` passou 54/54. `npm run validate` passou com 18 skills. `node bin/ai-dev-skills.mjs doctor` saiu 0, com stdout `node pass 26.5.0` e `git pass`, e stderr vazia. `doctor --target cursor` saiu 1, com `ERROR: Unsupported option: --target` e sem as duas linhas.

## Regression Suite

`npm test` completo depois do verde: 54 aprovados, 0 falhas, 0 ignorados, 0 todos. Uma execução anterior, dentro do sandbox, teve 52 aprovados e 2 falhas `EPERM` ao criar diretório `.cursor` em teste de distribuição. Essas duas falhas não se repetiram fora do sandbox.

## Failures

Nenhuma depois do verde fora do sandbox. As falhas do vermelho foram a ajuda sem `doctor` e o comando ainda não suportado.

## Skipped Tests

Nenhum.

## Environment Limitations

Node.js v26.5.0 e npm 11.17.0, em macOS. O passo de refatoração não alterou arquivo depois do verde: o despacho já era o menor caminho. O nome `git.exe` não foi aceito. O bit de execução foi observado neste Darwin; o risco de Windows registrado em `ARCHITECTURE-20261019-001` permanece.

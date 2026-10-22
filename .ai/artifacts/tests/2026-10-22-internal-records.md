---
artifact: test_evidence
id: TEST-20261022-010
version: 1
status: ready
created_by: implement
inputs:
  - SPEC-20261022-006
  - TICKET-SET-20261022-006
  - DECISION-SET-20261022-006
  - IMPL-20261022-006
---

## Tests Added

Nenhum arquivo em `tests/`. Nenhuma asserção SPDX. Os tickets nomeiam leitura dos quatro registros e `git diff`, sem `npm test` e sem `npm run validate`.

## Tests Executed

Leitura de `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`. `git diff --ignore-cr-at-eol --name-only`. `git diff --ignore-cr-at-eol --stat` nos quatro registros. `git diff --ignore-cr-at-eol --numstat` nos treze caminhos e em `.ai/architecture.md`, `LICENSE`, `package.json`, `README.md`, `manifest/skills.json` e `contracts/routing.md`.

## Expected Failure / RED

Não houve vermelho. A spec não define falha prévia de suíte e proíbe inventar resultado de `npm test` ou `npm run validate`.

## Passing Evidence / GREEN

Critérios de `SPEC-20261022-006`:

1. O diff de conteúdo, ignorando fim de linha, lista só `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`. `.ai/architecture.md` não aparece.
2. `LICENSE`, `package.json`, `README.md`, `manifest/skills.json`, `contracts/routing.md`, a CLI, o validador, as 18 skills e os quatro ADRs não aparecem.
3. Os treze caminhos não aparecem. `git diff --ignore-cr-at-eol --numstat` neles fica vazio.
4. `.ai/project.md` conserva duas vezes `O próximo identificador livre passa a ser v1-A28.` Cada um desses parágrafos também contém `8f92189`, `MIT`, `private: true`, `1.0.0-scaffold` e `v1-A29`.
5. Permanecem a frase de 53/53, `O próximo identificador livre é v1-A25.`, `O próximo identificador livre passa a ser v1-A26.`, `O próximo identificador livre passa a ser v1-A27.` e a matriz K1–K8 fora da suíte Node.
6. `contracts/skill-contract.md` conserva os identificadores livres v1-A25, v1-A26, v1-A27 e v1-A28, `That clause is the state before amendment v1-A27.` e `None of these amendments introduces v2 artifact or skill contracts.` O acréscimo contém `8f92189`, `MIT`, `1.0.0-scaffold` e `v1-A29`, e afirma que `private` permanece `true` e que skills, R1–R17, CLI e `validate()` não mudam.
7. O parágrafo da v1-A27 ainda termina em `The next free amendment identifier is v1-A28.` O parágrafo novo contém `8f92189`, `MIT`, `1.0.0-scaffold`, `v1-A29`, `private` `true`, a suíte de 78 testes da v1-A26, nenhum teste novo e nenhuma asserção SPDX.
8. Permanecem o item que nomeia v1-A24 como estado anterior e o item que nomeia v1-A28 como próximo identificador livre. O item novo diz que a nomeação de v1-A28 é o estado do registro anterior.
9. A primeira seção `##` é `State update — MIT license, v1-A28, 2026-10-22`. A seção da v1-A27 continua abaixo e ainda contém `The next free amendment identifier is v1-A28.`, `duration 12123 ms` e a frase de estado anterior à v1-A27.
10. A seção nova nomeia `8f92189`, `MIT`, `1.0.0-scaffold` e `v1-A29`, afirma `private` `true`, que não substitui as seções de baixo, que as frases abaixo sobre v1-A28 são o estado anterior, e que a contagem de 78 testes permanece a suíte da v1-A26. Não contém `npm test` nem `npm run validate`.
11. Nenhum dos quatro arquivos contém `Permission is hereby granted`. Nenhum contém `Copyright (c)`.
12. Não há arquivo de teste novo nem asserção SPDX. `npm test` e `npm run validate` não foram executados.

Tickets 01 a 04 produziram os quatro arquivos. O ticket 05 é esta releitura.

## Regression Suite

Não executada. `SPEC-20261022-006` e o ticket 05 excluem `npm test` e `npm run validate` deste aceite. A suíte existente não foi alterada. A contagem de 78 testes permanece o registro da v1-A26.

## Failures

Nenhuma falha dos doze critérios.

## Skipped Tests

`npm test` e `npm run validate` não foram executados. Não há resultado numerado para registrar.

## Environment Limitations

A conferência é leitura e diff no working tree. Não mede host, não publica e não consulta o servidor remoto de novo. O commit `8f92189` entra como o identificador já decidido.

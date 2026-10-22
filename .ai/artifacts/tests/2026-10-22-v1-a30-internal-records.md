---
artifact: test_evidence
id: TEST-20261022-011
version: 1
status: ready
created_by: implement
inputs:
  - SPEC-20261022-007
  - TICKET-SET-20261022-007
  - DECISION-SET-20261022-007
  - IMPL-20261022-007
---

## Tests Added

Nenhum arquivo em `tests/`. Nenhuma asserção SPDX. Os tickets nomeiam leitura dos quatro registros e `git diff`, sem `npm test` e sem `npm run validate`.

## Tests Executed

Leitura de `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`. `git diff --ignore-cr-at-eol --name-only`. `git diff --ignore-cr-at-eol --stat` nos quatro registros. `git diff --ignore-cr-at-eol --numstat` nos treze caminhos e em `.ai/architecture.md`, `LICENSE`, `package.json`, `README.md`, `manifest/skills.json` e `contracts/routing.md`. `git diff --cached --name-only`.

## Expected Failure / RED

Não houve vermelho. A spec não define falha prévia de suíte e proíbe inventar resultado de `npm test` ou `npm run validate`.

## Passing Evidence / GREEN

Critérios de `SPEC-20261022-007`:

1. O diff de conteúdo, ignorando fim de linha, lista só `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`. `.ai/architecture.md` não aparece.
2. `LICENSE`, `package.json`, `README.md`, `manifest/skills.json`, `contracts/routing.md`, a CLI, o validador, as 18 skills e os quatro ADRs não aparecem.
3. Os treze caminhos não aparecem. `git diff --ignore-cr-at-eol --numstat` neles fica vazio. O índice está vazio.
4. `.ai/project.md` conserva duas vezes `O próximo identificador livre passa a ser v1-A29.` Cada uma é seguida, no mesmo parágrafo, pelo bloco do requisito 1.
5. Permanecem a frase de 53/53, `O próximo identificador livre é v1-A25.`, `O próximo identificador livre passa a ser v1-A26.`, `O próximo identificador livre passa a ser v1-A27.`, duas ocorrências de `O próximo identificador livre passa a ser v1-A28.` e a matriz K1–K8 fora da suíte Node.
6. `contracts/skill-contract.md` conserva os identificadores livres v1-A25, v1-A26, v1-A27 e v1-A28 e `That clause is the state before amendment v1-A27.` A frase de v1-A29 é seguida pelo bloco do requisito 3 e, em seguida, por `None of these amendments introduces v2 artifact or skill contracts.`
7. O parágrafo da v1-A28 ainda termina em `The next free amendment identifier is v1-A29.` Imediatamente depois estão `## Amendment v1-A29 — internal records, 2026-10-22` e o parágrafo do requisito 4.
8. Permanecem o item que nomeia v1-A24 como estado anterior e o item que nomeia v1-A28 como estado do registro anterior. O item novo é o bloco do requisito 5.
9. A primeira seção `##` é `State update — internal records, v1-A29, 2026-10-22`. A seção seguinte é a da v1-A28 e ainda contém `The next free amendment identifier is v1-A29.` A seção da v1-A27 ainda contém `duration 12123 ms` e a frase de estado anterior a essa emenda.
10. A seção nova é o bloco do requisito 6. Não contém `npm test` nem `npm run validate`.
11. Nenhum dos quatro arquivos contém `Permission is hereby granted`. Nenhum contém `Copyright (c)`.
12. Não há arquivo de teste novo nem asserção SPDX. `npm test` e `npm run validate` não foram executados.
13. Fora dos blocos dos requisitos 1, 3, 4, 5 e 6, o diff dos quatro arquivos não acrescenta outra frase. O stat é 4 files changed, 14 insertions, 3 deletions. As três deleções são as linhas que receberam o acréscimo. Esses blocos não nomeiam roadmap.

Tickets 01 a 04 produziram os quatro arquivos. O ticket 05 é esta releitura.

## Regression Suite

Não executada. `SPEC-20261022-007` e o ticket 05 excluem `npm test` e `npm run validate` deste aceite. A suíte existente não foi alterada. A contagem de 78 testes permanece o registro da v1-A26.

## Failures

Nenhuma falha dos treze critérios.

## Skipped Tests

`npm test` e `npm run validate` não foram executados. Não há resultado numerado para registrar.

## Environment Limitations

A conferência é leitura e diff no working tree. Não mede host, não publica e não consulta o servidor remoto. O commit `7a4d22c` entra como o identificador já decidido.

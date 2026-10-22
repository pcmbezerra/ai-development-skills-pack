---
artifact: ticket_set
id: TICKET-SET-20261022-009
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261022-009
---

# Alinhamento documental interno — emenda v1-A32

Conjunto executável derivado de `SPEC-20261022-009` versão 1. Cada bloco é um TICKET. O Markdown local é a fonte. Nenhum ticket publica issue remota. Esta execução não inicia os tickets e não invoca `implement`.

O único objetivo é o acréscimo documental nos quatro registros. A v1-A30 permanece publicada em `6e4173b`. A v1-A31 permanece publicada em `0dde35f`. A v1-A32 não está implementada. R8 não se aplica: não há termo de negócio, invariante, transição, evento ou fronteira de contexto novos. R9 não se aplica: a spec não muda fronteira de módulo, interface, modelo de dados, contrato de integração, infraestrutura, fronteira de segurança, concorrência nem implantação. Não há modelo de domínio nem desenho de arquitetura para este objetivo. `npm test` e `npm run validate` não são critério.

Rastreio dos quatorze critérios de aceite da spec:

| Critério | Ticket |
|---|---|
| 1. Diff de conteúdo, ignorando fim de linha, só nos quatro registros; `.ai/architecture.md` ausente | 05; cada ticket 01–04 edita só o seu arquivo |
| 2. `LICENSE`, `package.json`, `README.md`, manifesto, testes SPDX, roteamento, CLI, validador, 18 skills e ADR-0001 a ADR-0004 ausentes | 05 |
| 3. Treze caminhos de fim de linha ausentes e com diff vazio ao ignorar fim de linha | 05 |
| 4. `.ai/project.md` conserva as duas frases de v1-A30 e, depois de cada uma, o texto exato do requisito 1; conserva as duas frases de v1-A29 | 01, conferido de novo no 05 |
| 5. `.ai/project.md` conserva 53/53, v1-A25, v1-A26, v1-A27, as duas frases de v1-A28 e a matriz K1–K8 fora da suíte Node | 01, conferido de novo no 05 |
| 6. `contracts/skill-contract.md` conserva v1-A25 a v1-A29, o estado anterior à v1-A27, e insere o texto do requisito 3 entre v1-A30 e a frase de contrato v2 | 02, conferido de novo no 05 |
| 7. `references/provenance.md` conserva o parágrafo da v1-A29 e acrescenta os dois títulos e os dois parágrafos do requisito 4 | 03, conferido de novo no 05 |
| 8. `references/provenance.md` conserva os itens de v1-A24, v1-A28 e v1-A29 e acrescenta os dois itens do requisito 5 | 03, conferido de novo no 05 |
| 9. Duas seções novas no topo de `references/validation-result.md`, na ordem v1-A31, v1-A30, v1-A29; seção da v1-A28 conserva a adoção da MIT; seção da v1-A27 conserva `duration 12123 ms` | 04, conferido de novo no 05 |
| 10. As seções novas são o texto exato do requisito 6; a da v1-A30 não contém `npm test` nem `npm run validate`; a da v1-A31 cita `REVIEW-20261022-009` | 04, conferido de novo no 05 |
| 11. Ocorrências já existentes de `No SPDX assertion was added` permanecem; os blocos novos da v1-A30 também a contêm; os blocos novos da v1-A31 a citam como estado anterior | 03 e 04, conferido de novo no 05 |
| 12. Nenhum dos quatro arquivos contém identificador livre v1-A31, `Permission is hereby granted` ou `Copyright (c)` | 01, 02, 03 e 04, conferido de novo no 05 |
| 13. Sem teste novo, sem asserção SPDX nova, sem exigir `npm test` ou `npm run validate` | 05; exclusão também nos tickets 01–04 |
| 14. Nenhuma frase além das inserções dos requisitos 1, 3, 4, 5 e 6; essas inserções não nomeiam mudança de processo, roadmap nem revogação de exclusão | 01, 02, 03 e 04 na sua inserção; conferido de novo no 05 |

## Title

01 — Acréscimo em `.ai/project.md`

## Goal

Acrescentar, depois de cada uma das duas frases que fecham o identificador livre em v1-A30, o texto exato do requisito 1 de `SPEC-20261022-009`, sem apagar frase histórica.

## Context

Critérios 4 e 5 de `SPEC-20261022-009`. O arquivo contém duas vezes `O próximo identificador livre passa a ser v1-A30.` e duas vezes `O próximo identificador livre passa a ser v1-A29.` Também contém a frase de 53/53, `O próximo identificador livre é v1-A25.`, `O próximo identificador livre passa a ser v1-A26.`, `O próximo identificador livre passa a ser v1-A27.` e duas vezes `O próximo identificador livre passa a ser v1-A28.` A entrega da matriz K1–K8 fora da suíte Node permanece. Evidência: Functional Requirements 1 e 2 e Acceptance Criteria 4 e 5 da spec.

## Scope

- Editar somente `.ai/project.md`.
- Conservar as duas frases `O próximo identificador livre passa a ser v1-A30.`
- Depois de cada uma, no mesmo parágrafo, inserir exatamente o bloco abaixo. O recuo de lista não faz parte desse texto.

```text
A v1-A30 foi publicada em `6e4173b`. Ela alinha os registros internos à v1-A29. A v1-A31 foi publicada em `0dde35f`. Ela introduz a asserção SPDX determinística e offline. A licença permanece MIT. A adoção da MIT é a da v1-A28. `private: true` permanece. A versão permanece `1.0.0-scaffold`. O próximo identificador livre passa a ser v1-A32.
```

- Conservar as duas frases `O próximo identificador livre passa a ser v1-A29.`
- Conservar `A frase de 53/53 acima permanece o registro de 2026-10-14.`, `O próximo identificador livre é v1-A25.`, `O próximo identificador livre passa a ser v1-A26.`, `O próximo identificador livre passa a ser v1-A27.` e as duas frases `O próximo identificador livre passa a ser v1-A28.`
- Conservar a frase da matriz K1–K8 fora da suíte Node.

## Out of Scope

- Apagar ou reescrever frase que nomeia v1-A25, v1-A26, v1-A27, v1-A28, v1-A29 ou v1-A30 como identificador livre.
- Inventar frase que nomeie v1-A31 como identificador livre.
- Reescrever a frase de entrega da matriz K1–K8.
- Dizer que a v1-A30 adota a licença ou introduz a asserção.
- `contracts/skill-contract.md`, `references/provenance.md`, `references/validation-result.md` e `.ai/architecture.md`.
- `LICENSE`, `package.json`, `README.md`, manifesto, template SPDX, testes, CLI, validador, skills, roteamento, ADRs e os treze caminhos de fim de linha.
- Mudança de processo, roadmap e revogação de exclusão.
- `Copyright (c)`, `Permission is hereby granted`, teste novo, asserção SPDX nova, `npm test` e `npm run validate`.

## Dependencies

Nenhuma. `SPEC-20261022-009` já está `ready`.

## Implementation Notes

A frase antiga permanece. O bloco entra depois dela, no mesmo parágrafo. Não acrescentar outra frase. Evidência: Functional Requirement 1, Non-functional Requirements e critério 14 da spec.

## Acceptance Criteria

- As duas ocorrências de `O próximo identificador livre passa a ser v1-A30.` permanecem, e cada uma é seguida, no mesmo parágrafo, pelo bloco de Scope. As duas ocorrências de `O próximo identificador livre passa a ser v1-A29.` permanecem. Evidência: critério 4 da spec.
- Permanecem `A frase de 53/53 acima permanece o registro de 2026-10-14.`, `O próximo identificador livre é v1-A25.`, `O próximo identificador livre passa a ser v1-A26.`, `O próximo identificador livre passa a ser v1-A27.`, duas ocorrências de `O próximo identificador livre passa a ser v1-A28.` e a frase da matriz K1–K8 fora da suíte Node. Evidência: critério 5 da spec.
- O arquivo não contém `The next free amendment identifier is v1-A31`, `O próximo identificador livre passa a ser v1-A31.`, `O próximo identificador livre é v1-A31.`, `Permission is hereby granted` nem `Copyright (c)`. Evidência: critério 12 da spec.
- O diff deste arquivo, ignorando fim de linha, não acrescenta frase além do bloco de Scope. Esse bloco não nomeia mudança de processo, roadmap nem revogação de exclusão. Evidência: critério 14 da spec.

## Validation

Leitura de `.ai/project.md` e `git diff --ignore-cr-at-eol` limitado a esse arquivo. As frases históricas continuam presentes. Sem `npm test` e sem `npm run validate`.

## Definition of Done

Os dois parágrafos conservam o fechamento em v1-A30 e ganham o bloco exato. As frases dos critérios 4 e 5 permanecem. Nenhum outro arquivo deste ticket muda.

## Title

02 — Acréscimo em `contracts/skill-contract.md`

## Goal

Inserir, entre a frase que nomeia v1-A30 como identificador livre e a frase de contrato v2, o texto exato do requisito 3 de `SPEC-20261022-009`.

## Context

Critério 6 de `SPEC-20261022-009`. O parágrafo de versionamento conserva `The next free amendment identifier is v1-A25.`, `The next free amendment identifier is v1-A26.`, `The next free amendment identifier is v1-A27.`, `The next free amendment identifier is v1-A28.`, `The next free amendment identifier is v1-A29.`, `The next free amendment identifier is v1-A30.`, `That clause is the state before amendment v1-A27.` e `None of these amendments introduces v2 artifact or skill contracts.` Evidência: Functional Requirement 3 e Acceptance Criterion 6 da spec.

## Scope

- Editar somente `contracts/skill-contract.md`.
- Conservar `The next free amendment identifier is v1-A25.`, `The next free amendment identifier is v1-A26.`, `The next free amendment identifier is v1-A27.`, `The next free amendment identifier is v1-A28.` e `The next free amendment identifier is v1-A29.`
- Conservar `That clause is the state before amendment v1-A27.` e `None of these amendments introduces v2 artifact or skill contracts.`
- Entre `The next free amendment identifier is v1-A30.` e `None of these amendments introduces v2 artifact or skill contracts.` inserir exatamente o bloco abaixo. O recuo de lista não faz parte desse texto.

```text
Amendment v1-A30, published at `6e4173b`, aligns the internal records with the published v1-A29. It does not change skill responsibilities, R1–R17, the 18 skills, the CLI or `validate()`. It adds no SPDX assertion. `private` remains `true`. The package version remains `1.0.0-scaffold`. Amendment v1-A31, published at `0dde35f`, introduces the offline deterministic SPDX assertion in the Node suite. It does not change skill responsibilities, R1–R17, the 18 skills, the CLI or `validate()`. The MIT license was adopted by amendment v1-A28 and remains MIT. `private` remains `true`. The package version remains `1.0.0-scaffold`. The next free amendment identifier is v1-A32.
```

## Out of Scope

- Apagar ou reescrever as frases de identificador livre já escritas.
- Inventar frase que nomeie v1-A31 como identificador livre.
- Mudar o texto normativo de R1–R17, o catálogo ou o comportamento de `validate()`.
- Dizer que a v1-A30 adota a licença ou introduz a asserção.
- Os outros três registros, `.ai/architecture.md`, `LICENSE`, `package.json`, `README.md`, manifesto, template SPDX, testes, CLI, validador, skills, roteamento, ADRs e os treze caminhos.
- Mudança de processo, roadmap e revogação de exclusão.
- `Copyright (c)`, `Permission is hereby granted`, teste novo, asserção SPDX nova, `npm test` e `npm run validate`.

## Dependencies

Nenhuma. Sem ciclo com o ticket 01.

## Implementation Notes

A frase que nomeia v1-A30 permanece imediatamente antes do bloco. A frase de contrato v2 permanece imediatamente depois. A adoção da MIT fica na v1-A28. A asserção fica na v1-A31. Não acrescentar outra frase. Evidência: Functional Requirement 3 e critério 6 da spec.

## Acceptance Criteria

- Permanecem `The next free amendment identifier is v1-A25.`, `The next free amendment identifier is v1-A26.`, `The next free amendment identifier is v1-A27.`, `The next free amendment identifier is v1-A28.`, `The next free amendment identifier is v1-A29.` e `That clause is the state before amendment v1-A27.` Evidência: critério 6 da spec.
- `The next free amendment identifier is v1-A30.` é seguida pelo bloco de Scope e, em seguida, por `None of these amendments introduces v2 artifact or skill contracts.` Evidência: critério 6 da spec.
- O arquivo não contém `The next free amendment identifier is v1-A31`, `O próximo identificador livre passa a ser v1-A31.`, `O próximo identificador livre é v1-A31.`, `Permission is hereby granted` nem `Copyright (c)`. Evidência: critério 12 da spec.
- O diff deste arquivo, ignorando fim de linha, não acrescenta frase além do bloco de Scope. Esse bloco não nomeia mudança de processo, roadmap nem revogação de exclusão. Evidência: critério 14 da spec.

## Validation

Leitura do parágrafo de versionamento e `git diff --ignore-cr-at-eol` limitado a `contracts/skill-contract.md`. As frases antigas continuam no arquivo. Sem `npm test` e sem `npm run validate`.

## Definition of Done

O parágrafo conserva os identificadores livres anteriores, o estado anterior à v1-A27 e a frase de contrato v2. O bloco exato fica entre a frase de v1-A30 e a frase de contrato v2. Nenhum outro arquivo deste ticket muda.

## Title

03 — Acréscimo em `references/provenance.md`

## Goal

Acrescentar os dois registros do requisito 4 e os dois itens do requisito 5 de `SPEC-20261022-009`, conservando o parágrafo da v1-A29 e os itens históricos.

## Context

Critérios 7, 8 e 11 de `SPEC-20261022-009`. O parágrafo sob `## Amendment v1-A29 — internal records, 2026-10-22` termina com `The next free amendment identifier is v1-A30.` As limitações já têm o item que nomeia v1-A24 como estado de registro anterior, o item que nomeia v1-A28 como estado do registro anterior e o item que termina com `The sentence in the previous bullet that names v1-A29 as the next free identifier is the state of that earlier record.` O arquivo já contém quatro ocorrências de `No SPDX assertion was added`, nos parágrafos e itens da v1-A28 e da v1-A29. Evidência: Functional Requirements 4 e 5 e Acceptance Criteria 7, 8 e 11 da spec.

## Scope

- Editar somente `references/provenance.md`.
- Conservar o parágrafo da v1-A29 que termina com `The next free amendment identifier is v1-A30.`
- Depois desse parágrafo, e antes de `## Representation choices and remaining limitations`, inserir os dois registros abaixo, nessa ordem. O recuo de lista não faz parte desse texto.

```text
## Amendment v1-A30 — internal records, 2026-10-22

Amendment v1-A30, published at `6e4173b`, aligns the internal records with the published v1-A29. The license remains MIT. `private` remains `true`. The package version remains `1.0.0-scaffold`. It does not change skills, R1–R17, the CLI or `validate()`. The structural suite remains the 78 tests of v1-A26. No new test was added. No SPDX assertion was added.
```

```text
## Amendment v1-A31 — SPDX assertion, 2026-10-22

Amendment v1-A31, published at `0dde35f`, introduces the offline deterministic SPDX assertion. The MIT license was adopted by amendment v1-A28 and remains MIT. `private` remains `true`. The package version remains `1.0.0-scaffold`. It does not change skills, R1–R17, the CLI or `validate()`. `REVIEW-20261022-009` records `npm test` 86/86, duration 12008.531625 ms, exit 0, and `npm run validate` with `PASS: 18 skills`, exit 0, on Node.js v26.5.0, npm 11.17.0 and Darwin 25.6.0 arm64. This record does not report a new suite run. The next free amendment identifier is v1-A32.
```

- Conservar o item que nomeia v1-A24 como estado de registro anterior, o item que nomeia v1-A28 como estado do registro anterior e o item da v1-A29 que nomeia v1-A29 como estado do registro anterior.
- Depois desse item da v1-A29, inserir exatamente os dois itens abaixo, nessa ordem.

```text
Amendment v1-A30, published at `6e4173b`, aligns the internal records with the published v1-A29. The license remains MIT. `private` remains `true`. The package version remains `1.0.0-scaffold`. It does not change skills, R1–R17, the CLI or `validate()`. The structural suite remains the 78 tests of v1-A26. No new test was added. No SPDX assertion was added. The sentence in the previous bullet that names v1-A30 as the next free identifier is the state of that earlier record.
```

```text
Amendment v1-A31, published at `0dde35f`, introduces the offline deterministic SPDX assertion. The MIT license was adopted by amendment v1-A28 and remains MIT. `private` remains `true`. The package version remains `1.0.0-scaffold`. It does not change skills, R1–R17, the CLI or `validate()`. `REVIEW-20261022-009` records `npm test` 86/86, duration 12008.531625 ms, and `npm run validate` with `PASS: 18 skills`. This record does not report a new suite run. The next free amendment identifier is v1-A32. The sentence `No SPDX assertion was added` in the earlier records remains the state of v1-A28, v1-A29 and v1-A30.
```

## Out of Scope

- Substituir o parágrafo da v1-A29 ou os itens de v1-A24, v1-A28 e v1-A29.
- Apagar qualquer ocorrência já existente de `No SPDX assertion was added`.
- Inventar frase que nomeie v1-A31 como identificador livre.
- Dizer que a v1-A30 adota a licença ou introduz a asserção.
- Tratar 86/86, 12008.531625 ms ou `PASS: 18 skills` como execução nova. A citação é `REVIEW-20261022-009`.
- Tratar a suíte de 78 testes como resultado de uma execução nova.
- Dizer que a matriz K1–K8 entrou em `validate()` ou na suíte Node.
- Os outros três registros, `.ai/architecture.md`, `LICENSE`, `package.json`, `README.md`, manifesto, template SPDX, testes, CLI, validador, skills, roteamento, ADRs e os treze caminhos.
- Mudança de processo, roadmap e revogação de exclusão.
- `Copyright (c)`, `Permission is hereby granted`, teste novo e asserção SPDX nova.

## Dependencies

Nenhuma. Sem ciclo com os tickets 01 e 02.

## Implementation Notes

Títulos, parágrafos e itens são acréscimos. A frase da v1-A29 que termina em v1-A30 permanece. O número 78 é o registro já escrito da suíte da v1-A26. Os números 86/86, 12008.531625 ms e `PASS: 18 skills` entram só na citação de `REVIEW-20261022-009`, com a frase de que o registro não relata execução nova. As quatro ocorrências já existentes de `No SPDX assertion was added` permanecem. Os dois blocos novos da v1-A30 também contêm essa frase. O item novo da v1-A31 a cita como estado da v1-A28, da v1-A29 e da v1-A30. Não acrescentar outra frase. Evidência: Functional Requirements 4 e 5 e critérios 7, 8, 11 e 14 da spec.

## Acceptance Criteria

- O parágrafo da v1-A29 terminado em `The next free amendment identifier is v1-A30.` permanece. Imediatamente depois estão os dois títulos e os dois parágrafos de Scope, e em seguida `## Representation choices and remaining limitations`. Evidência: critério 7 da spec.
- Permanecem o item que nomeia v1-A24 como estado anterior, o item que nomeia v1-A28 como estado do registro anterior e o item que nomeia v1-A29 como estado do registro anterior. Imediatamente depois desse item da v1-A29 estão os dois itens de Scope. Evidência: critério 8 da spec.
- As quatro ocorrências já existentes de `No SPDX assertion was added` permanecem. Os dois blocos novos da v1-A30 contêm essa frase. O item novo da v1-A31 a cita como estado anterior. Nenhuma ocorrência anterior é removida. Evidência: critério 11 da spec.
- O arquivo não contém `The next free amendment identifier is v1-A31`, `Permission is hereby granted` nem `Copyright (c)`. Evidência: critério 12 da spec.
- O diff deste arquivo, ignorando fim de linha, não acrescenta frase além dos títulos, parágrafos e itens de Scope. Esses blocos não nomeiam mudança de processo, roadmap nem revogação de exclusão. Evidência: critério 14 da spec.

## Validation

Leitura do parágrafo da v1-A29, dos dois registros novos e dos itens de limitações. Busca das quatro ocorrências antigas de `No SPDX assertion was added`. `git diff --ignore-cr-at-eol` limitado a `references/provenance.md`. Sem execução de suíte.

## Definition of Done

O registro da v1-A29 e os três itens históricos permanecem. Os dois registros e os dois itens novos entram por acréscimo. A frase `No SPDX assertion was added` não é apagada. Nenhum outro arquivo deste ticket muda.

## Title

04 — Seções novas no topo de `references/validation-result.md`

## Goal

Inserir as duas seções exatas do requisito 6 de `SPEC-20261022-009` antes da seção da v1-A29, na ordem v1-A31 e depois v1-A30, sem alterar as seções já escritas e sem registrar suíte nova.

## Context

Critérios 9, 10 e 11 de `SPEC-20261022-009`. A primeira seção atual é `## State update — internal records, v1-A29, 2026-10-22`. Ela contém `The next free amendment identifier is v1-A30.`, `No SPDX assertion was added` e `The count of 78 tests remains the suite of v1-A26.` A seção `## State update — MIT license, v1-A28, 2026-10-22` conserva a adoção da MIT em `8f92189` e `The next free amendment identifier is v1-A29.` A seção `## State update — known-route reference matrix, v1-A27, 2026-10-22` contém `duration 12123 ms`. A outra ocorrência já existente de `No SPDX assertion was added` está na seção da v1-A28. Evidência: Functional Requirements 6, 7 e 8 e Acceptance Criteria 9, 10 e 11 da spec.

## Scope

- Editar somente `references/validation-result.md`.
- Inserir, imediatamente depois de `# Validation result` e antes de `## State update — internal records, v1-A29, 2026-10-22`, exatamente as duas seções abaixo, nessa ordem. O recuo de lista não faz parte desse texto.

```text
## State update — SPDX assertion, v1-A31, 2026-10-22

This section records the later state of amendment v1-A31. It does not replace the sections below, and it does not change their results.

Amendment v1-A31 was published at `0dde35f`. It introduces the offline deterministic SPDX assertion. The MIT license was adopted by amendment v1-A28 and remains MIT. `private` remains `true`. The package version remains `1.0.0-scaffold`. The next free amendment identifier is v1-A32. The sentences below that say `No SPDX assertion was added` are the state before v1-A31. `REVIEW-20261022-009` records `npm test` 86/86, duration 12008.531625 ms, exit 0, and `npm run validate` with `PASS: 18 skills`, exit 0. This section does not report a new suite run.
```

```text
## State update — internal records, v1-A30, 2026-10-22

This section records the later state of amendment v1-A30. It does not replace the sections below, and it does not change their results.

Amendment v1-A30 was published at `6e4173b`. It aligns the internal records with the published v1-A29. The license remains MIT. `private` remains `true`. The package version remains `1.0.0-scaffold`. No new Node test was added. No SPDX assertion was added. The sentences below that name v1-A30 as the next free identifier are the state before this alignment. The count of 78 tests remains the suite of v1-A26.
```

- Conservar a seção da v1-A29 como terceira, com `7a4d22c`, `The next free amendment identifier is v1-A30.`, `No SPDX assertion was added` e `The count of 78 tests remains the suite of v1-A26.`
- Conservar na seção da v1-A28 a adoção da MIT em `8f92189`, `The next free amendment identifier is v1-A29.` e `No SPDX assertion was added`.
- Conservar na seção da v1-A27 `duration 12123 ms`.

## Out of Scope

- Reescrever a seção da v1-A29, a seção da v1-A28, a seção da v1-A27 ou qualquer seção abaixo das seções novas.
- Apagar as duas ocorrências já existentes de `No SPDX assertion was added`.
- Escrever `npm test`, `npm run validate`, duração ou contagem de uma execução na seção nova da v1-A30.
- Atribuir 86/86, 12008.531625 ms ou `PASS: 18 skills` a uma execução nova ou à v1-A30.
- Copiar `duration 12123 ms` para uma seção nova.
- Inventar frase que nomeie v1-A31 como identificador livre.
- Dizer que a v1-A30 adota a licença ou introduz a asserção.
- Os outros três registros, `.ai/architecture.md`, `LICENSE`, `package.json`, `README.md`, manifesto, template SPDX, testes, CLI, validador, skills, roteamento, ADRs e os treze caminhos.
- Mudança de processo, roadmap e revogação de exclusão.
- `Copyright (c)`, `Permission is hereby granted`, teste novo e asserção SPDX nova.

## Dependencies

Nenhuma. Sem ciclo com os tickets 01, 02 e 03.

## Implementation Notes

As duas seções novas ficam no topo, v1-A31 e depois v1-A30. As seções abaixo não são editadas. A contagem de 78 testes na seção nova da v1-A30 é remissão ao registro da v1-A26, já escrita no bloco. Os números 86/86, 12008.531625 ms e `PASS: 18 skills` entram só na seção da v1-A31, na citação de `REVIEW-20261022-009`, com a frase de que a seção não relata execução nova. As duas ocorrências já existentes de `No SPDX assertion was added` permanecem. A seção nova da v1-A30 também contém essa frase. A seção nova da v1-A31 a cita como estado anterior. Não acrescentar outra frase. Evidência: Functional Requirements 6, 7 e 8 e critérios 9, 10, 11 e 14 da spec.

## Acceptance Criteria

- A primeira seção `##` é `## State update — SPDX assertion, v1-A31, 2026-10-22`. A segunda é `## State update — internal records, v1-A30, 2026-10-22`. A terceira continua `## State update — internal records, v1-A29, 2026-10-22` e ainda contém `The next free amendment identifier is v1-A30.`, `No SPDX assertion was added` e `The count of 78 tests remains the suite of v1-A26.` A seção da v1-A28 ainda contém a adoção da MIT. A seção da v1-A27 ainda contém `duration 12123 ms`. Evidência: critério 9 da spec.
- As duas seções novas são os blocos de Scope. A seção da v1-A30 não contém `npm test` nem `npm run validate`. A seção da v1-A31 contém `86/86`, `12008.531625 ms` e `PASS: 18 skills` somente na citação de `REVIEW-20261022-009`, junto com `This section does not report a new suite run.` Evidência: critério 10 da spec.
- As duas ocorrências já existentes de `No SPDX assertion was added` permanecem. A seção nova da v1-A30 contém essa frase. A seção nova da v1-A31 a cita como estado anterior. Nenhuma ocorrência anterior é removida. Evidência: critério 11 da spec.
- O arquivo não contém `The next free amendment identifier is v1-A31`, `Permission is hereby granted` nem `Copyright (c)`. Evidência: critério 12 da spec.
- O diff deste arquivo, ignorando fim de linha, não acrescenta frase além dos dois blocos de Scope. Esses blocos não nomeiam mudança de processo, roadmap nem revogação de exclusão. Evidência: critério 14 da spec.

## Validation

Leitura da ordem das seções. Busca, na seção nova da v1-A30, por `npm test` e `npm run validate`. Leitura da citação de `REVIEW-20261022-009` na seção da v1-A31. A seção da v1-A27 continua com `duration 12123 ms`. A seção da v1-A29 continua com a contagem de 78 testes. `git diff --ignore-cr-at-eol` limitado a `references/validation-result.md`. Sem executar a suíte.

## Definition of Done

As duas seções novas estão no topo, nessa ordem, e são o texto exato. A seção da v1-A29 permanece a terceira. A seção da v1-A27 permanece com `duration 12123 ms`. A seção da v1-A31 cita o review já gravado. A seção da v1-A30 não registra suíte. Nenhum outro arquivo deste ticket muda.

## Title

05 — Conferência dos quatorze critérios e do limite de arquivos

## Goal

Reler os quatorze critérios de `SPEC-20261022-009` e confirmar que o alinhamento alterou somente os quatro registros.

## Context

Os critérios 4 e 5 nascem no ticket 01, o 6 no ticket 02, os 7 e 8 no ticket 03 e os 9 e 10 no ticket 04. O critério 11 nasce nos tickets 03 e 04. O critério 12 nasce nos quatro. O critério 14 nasce nas quatro inserções. Os critérios 1, 2, 3 e 13 só fecham depois desses quatro. Evidência: a tabela de rastreio deste conjunto e Acceptance Criteria 1 a 14 da spec.

## Scope

- Reler `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md` contra os critérios 4 a 12 e 14.
- Confirmar que `.ai/architecture.md` não mudou.
- Confirmar que o diff de conteúdo do alinhamento, ignorando fim de linha, não inclui outro caminho.
- Confirmar que não há arquivo de teste novo nem asserção SPDX nova.
- Deixar os treze caminhos fora de qualquer staging.

## Out of Scope

- Nova frase além dos blocos dos tickets 01 a 04.
- Corrigir um critério falho neste ticket. Critério falho devolve o ticket dono do arquivo.
- `README.md`, `.ai/architecture.md`, mudança de processo, roadmap, revogação de exclusão, asserção SPDX nova e alteração funcional.
- `npm test`, `npm run validate`, publicação, `docs`, `handoff`, commit, push e issue remota.
- Alterar ou preparar para commit os treze caminhos:
  - `.ai/artifacts/documentation/2026-10-21-doctor-command.md`
  - `.ai/artifacts/handoffs/2026-10-18-list-v1-a22.md`
  - `.ai/artifacts/handoffs/2026-10-18-v1-a22-closed.md`
  - `.ai/artifacts/handoffs/2026-10-21-doctor-v1-a23.md`
  - `.ai/artifacts/implementation/2026-10-19-doctor-review-notes.md`
  - `.ai/artifacts/implementation/2026-10-19-doctor-ticket-02.md`
  - `.ai/artifacts/quality/2026-10-19-doctor-command.md`
  - `.ai/artifacts/reviews/2026-10-19-doctor-ticket-02.md`
  - `.ai/artifacts/reviews/2026-10-21-doctor-v1-a23.md`
  - `.ai/artifacts/tests/2026-10-19-doctor-edge-tdd.md`
  - `.ai/artifacts/tests/2026-10-19-doctor-review-notes.md`
  - `.ai/artifacts/tests/2026-10-19-doctor-ticket-02-tdd.md`
  - `.ai/artifacts/tests/2026-10-19-doctor-ticket-02.md`

## Dependencies

Tickets 01, 02, 03 e 04. Sem ciclo: nenhum deles depende do 05, e nenhum depende de outro.

## Implementation Notes

A conferência lê e compara. Não acrescenta prosa. `git diff --ignore-cr-at-eol` nos treze caminhos permanece vazio. Esses caminhos não entram no índice. `.ai/architecture.md` permanece byte a byte. O diff de conteúdo do alinhamento fica nos quatro registros. 86/86, 12008.531625 ms e `PASS: 18 skills` continuam somente a citação de `REVIEW-20261022-009`. Não inventar duração nem resultado de suíte. Evidência: Non-functional Requirements e critérios 1, 2, 3, 11, 12, 13 e 14 da spec.

## Acceptance Criteria

- Os critérios 4 e 5 da spec passam de novo em `.ai/project.md`. Evidência: ticket 01.
- O critério 6 da spec passa de novo em `contracts/skill-contract.md`. Evidência: ticket 02.
- Os critérios 7 e 8 da spec passam de novo em `references/provenance.md`. Evidência: ticket 03.
- Os critérios 9 e 10 da spec passam de novo em `references/validation-result.md`, inclusive a ordem v1-A31, v1-A30 e v1-A29, a permanência de `duration 12123 ms` na seção da v1-A27, a contagem de 78 testes na seção da v1-A29, a ausência de `npm test` e `npm run validate` na seção da v1-A30, e a citação de `REVIEW-20261022-009` na seção da v1-A31. Evidência: ticket 04.
- O critério 11 da spec passa de novo: as quatro ocorrências antigas em `references/provenance.md` e as duas antigas em `references/validation-result.md` permanecem; os blocos novos da v1-A30 contêm `No SPDX assertion was added`; os blocos novos da v1-A31 a citam como estado anterior. Evidência: tickets 03 e 04.
- O diff de conteúdo, ignorando fim de linha, contém só `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`. `.ai/architecture.md` não aparece. Evidência: critério 1 da spec.
- `LICENSE`, `package.json`, `README.md`, `manifest/skills.json`, `tests/spdx-mit.test.mjs`, `tests/spdx-mit.txt`, `contracts/routing.md`, a CLI, o validador, as 18 skills e ADR-0001 a ADR-0004 não aparecem nesse diff. Evidência: critério 2 da spec.
- Os treze caminhos não aparecem nesse diff, e `git diff --ignore-cr-at-eol` em cada um fica vazio. Eles não são preparados para commit. Evidência: critério 3 da spec.
- Nenhum dos quatro arquivos contém `The next free amendment identifier is v1-A31`, `O próximo identificador livre passa a ser v1-A31.`, `O próximo identificador livre é v1-A31.`, `Permission is hereby granted` nem `Copyright (c)`. Evidência: critério 12 da spec.
- O diff não acrescenta arquivo de teste nem asserção SPDX nova. `npm test` e `npm run validate` não são executados para aceitar o alinhamento. Evidência: critério 13 da spec.
- Fora dos blocos dos requisitos 1, 3, 4, 5 e 6, o diff dos quatro arquivos não acrescenta outra frase. Esses blocos não nomeiam mudança de processo, roadmap nem revogação de exclusão. Evidência: critério 14 da spec.

## Validation

Leitura dos quatro arquivos contra os quatorze critérios. `git diff --ignore-cr-at-eol` limitado aos quatro caminhos e, em separado, aos treze caminhos. `.ai/architecture.md` sem diff de conteúdo. Sem suíte e sem publicação.

## Definition of Done

Os quatorze critérios têm ticket de origem, a conferência os relê e o alinhamento não altera arquivo fora dos quatro registros. Os treze caminhos de fim de linha permanecem fora do índice.

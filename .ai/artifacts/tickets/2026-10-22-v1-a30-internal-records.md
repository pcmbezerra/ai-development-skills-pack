---
artifact: ticket_set
id: TICKET-SET-20261022-007
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261022-007
---

# Alinhamento documental interno — emenda v1-A30

Conjunto executável derivado de `SPEC-20261022-007` versão 1. Cada bloco é um TICKET. O Markdown local é a fonte. Nenhum ticket publica issue remota. Esta execução não inicia os tickets e não invoca `implement`.

O único objetivo é o acréscimo documental nos quatro registros. A v1-A29 permanece publicada em `7a4d22c`. A v1-A30 não está implementada. R8 não se aplica: não há termo de negócio, invariante, transição, evento ou fronteira de contexto novos. R9 não se aplica: a spec não muda fronteira de módulo, interface, modelo de dados, contrato de integração, infraestrutura, fronteira de segurança, concorrência nem implantação. Não há modelo de domínio nem desenho de arquitetura para este objetivo. `npm test` e `npm run validate` não são critério.

Rastreio dos treze critérios de aceite da spec:

| Critério | Ticket |
|---|---|
| 1. Diff de conteúdo, ignorando fim de linha, só nos quatro registros; `.ai/architecture.md` ausente | 05; cada ticket 01–04 edita só o seu arquivo |
| 2. `LICENSE`, `package.json`, `README.md`, manifesto, roteamento, CLI, validador, 18 skills e ADR-0001 a ADR-0004 ausentes | 05 |
| 3. Treze caminhos de fim de linha ausentes e com diff vazio ao ignorar fim de linha | 05 |
| 4. `.ai/project.md` conserva as duas frases de v1-A29 e, depois de cada uma, o texto exato do requisito 1 | 01, conferido de novo no 05 |
| 5. `.ai/project.md` conserva 53/53, v1-A25, v1-A26, v1-A27, as duas frases de v1-A28 e a matriz K1–K8 fora da suíte Node | 01, conferido de novo no 05 |
| 6. `contracts/skill-contract.md` conserva v1-A25 a v1-A28, o estado anterior à v1-A27, e insere o texto do requisito 3 entre v1-A29 e a frase de contrato v2 | 02, conferido de novo no 05 |
| 7. `references/provenance.md` conserva o parágrafo da v1-A28 e acrescenta o título e o parágrafo do requisito 4 | 03, conferido de novo no 05 |
| 8. `references/provenance.md` conserva os itens de v1-A24 e v1-A28 e acrescenta o item do requisito 5 | 03, conferido de novo no 05 |
| 9. Seção nova no topo de `references/validation-result.md`; seção da v1-A28 permanece a segunda; seção da v1-A27 conserva `duration 12123 ms` | 04, conferido de novo no 05 |
| 10. A seção nova é o texto exato do requisito 6 e não contém `npm test` nem `npm run validate` | 04, conferido de novo no 05 |
| 11. Nenhum dos quatro arquivos contém `Permission is hereby granted` nem `Copyright (c)` | 01, 02, 03 e 04, conferido de novo no 05 |
| 12. Sem teste novo, sem asserção SPDX, sem exigir `npm test` ou `npm run validate` | 05; exclusão também nos tickets 01–04 |
| 13. Nenhuma frase além das inserções dos requisitos 1, 3, 4, 5 e 6; essas inserções não nomeiam roadmap nem as doze evoluções | 01, 02, 03 e 04 na sua inserção; conferido de novo no 05 |

## Title

01 — Acréscimo em `.ai/project.md`

## Goal

Acrescentar, depois de cada uma das duas frases que fecham o identificador livre em v1-A29, o texto exato do requisito 1 de `SPEC-20261022-007`, sem apagar frase histórica.

## Context

Critérios 4, 5 e 11 de `SPEC-20261022-007`. O arquivo contém duas vezes `O próximo identificador livre passa a ser v1-A29.` Também contém a frase de 53/53, `O próximo identificador livre é v1-A25.`, `O próximo identificador livre passa a ser v1-A26.`, `O próximo identificador livre passa a ser v1-A27.` e duas vezes `O próximo identificador livre passa a ser v1-A28.` A entrega da matriz K1–K8 fora da suíte Node permanece. Evidência: Functional Requirements 1 e 2 e Acceptance Criteria 4 e 5 da spec.

## Scope

- Editar somente `.ai/project.md`.
- Conservar as duas frases `O próximo identificador livre passa a ser v1-A29.`
- Depois de cada uma, no mesmo parágrafo, inserir exatamente o bloco abaixo. O recuo de lista não faz parte desse texto.

```text
A v1-A29 foi publicada em `7a4d22c`. Ela alinha os registros internos à v1-A28. A licença permanece MIT. `private: true` permanece. A versão permanece `1.0.0-scaffold`. O próximo identificador livre passa a ser v1-A30.
```

- Conservar `A frase de 53/53 acima permanece o registro de 2026-10-14.`, `O próximo identificador livre é v1-A25.`, `O próximo identificador livre passa a ser v1-A26.`, `O próximo identificador livre passa a ser v1-A27.` e as duas frases `O próximo identificador livre passa a ser v1-A28.`
- Conservar a frase da matriz K1–K8 fora da suíte Node.

## Out of Scope

- Apagar ou reescrever frase que nomeia v1-A25, v1-A26, v1-A27, v1-A28 ou v1-A29 como identificador livre.
- Reescrever a frase de entrega da matriz K1–K8.
- Dizer que a v1-A29 adota a licença.
- `contracts/skill-contract.md`, `references/provenance.md`, `references/validation-result.md` e `.ai/architecture.md`.
- `LICENSE`, `package.json`, `README.md`, manifesto, CLI, validador, skills, roteamento, ADRs e os treze caminhos de fim de linha.
- Roadmap e as doze evoluções futuras.
- `Copyright (c)`, `Permission is hereby granted`, teste novo, asserção SPDX, `npm test` e `npm run validate`.

## Dependencies

Nenhuma. `SPEC-20261022-007` já está `ready`.

## Implementation Notes

A frase antiga permanece. O bloco entra depois dela, no mesmo parágrafo. Não acrescentar outra frase. Evidência: Functional Requirement 1, Non-functional Requirements e critério 13 da spec.

## Acceptance Criteria

- As duas ocorrências de `O próximo identificador livre passa a ser v1-A29.` permanecem, e cada uma é seguida, no mesmo parágrafo, pelo bloco de Scope. Evidência: critério 4 da spec.
- Permanecem `A frase de 53/53 acima permanece o registro de 2026-10-14.`, `O próximo identificador livre é v1-A25.`, `O próximo identificador livre passa a ser v1-A26.`, `O próximo identificador livre passa a ser v1-A27.`, duas ocorrências de `O próximo identificador livre passa a ser v1-A28.` e a frase da matriz K1–K8 fora da suíte Node. Evidência: critério 5 da spec.
- O arquivo não contém `Permission is hereby granted` nem `Copyright (c)`. Evidência: critério 11 da spec.
- O diff deste arquivo, ignorando fim de linha, não acrescenta frase além do bloco de Scope. Evidência: critério 13 da spec.

## Validation

Leitura de `.ai/project.md` e `git diff --ignore-cr-at-eol` limitado a esse arquivo. As frases históricas continuam presentes. Sem `npm test` e sem `npm run validate`.

## Definition of Done

Os dois parágrafos conservam o fechamento em v1-A29 e ganham o bloco exato. As frases do critério 5 permanecem. Nenhum outro arquivo deste ticket muda.

## Title

02 — Acréscimo em `contracts/skill-contract.md`

## Goal

Inserir, entre a frase que nomeia v1-A29 como identificador livre e a frase de contrato v2, o texto exato do requisito 3 de `SPEC-20261022-007`.

## Context

Critério 6 de `SPEC-20261022-007`. O parágrafo de versionamento conserva `The next free amendment identifier is v1-A25.`, `The next free amendment identifier is v1-A26.`, `The next free amendment identifier is v1-A27.`, `The next free amendment identifier is v1-A28.`, `The next free amendment identifier is v1-A29.`, `That clause is the state before amendment v1-A27.` e `None of these amendments introduces v2 artifact or skill contracts.` Evidência: Functional Requirement 3 e Acceptance Criterion 6 da spec.

## Scope

- Editar somente `contracts/skill-contract.md`.
- Conservar `The next free amendment identifier is v1-A25.`, `The next free amendment identifier is v1-A26.`, `The next free amendment identifier is v1-A27.` e `The next free amendment identifier is v1-A28.`
- Conservar `That clause is the state before amendment v1-A27.` e `None of these amendments introduces v2 artifact or skill contracts.`
- Entre `The next free amendment identifier is v1-A29.` e `None of these amendments introduces v2 artifact or skill contracts.` inserir exatamente o bloco abaixo. O recuo de lista não faz parte desse texto.

```text
Amendment v1-A29, published at `7a4d22c`, aligns the internal records with the published v1-A28. It does not change skill responsibilities, R1–R17, the 18 skills, the CLI or `validate()`. `private` remains `true`. The package version remains `1.0.0-scaffold`. The next free amendment identifier is v1-A30.
```

## Out of Scope

- Apagar ou reescrever as frases de identificador livre já escritas.
- Mudar o texto normativo de R1–R17, o catálogo ou o comportamento de `validate()`.
- Dizer que a v1-A29 adota a licença.
- Os outros três registros, `.ai/architecture.md`, `LICENSE`, `package.json`, `README.md`, manifesto, CLI, validador, skills, roteamento, ADRs e os treze caminhos.
- Roadmap e as doze evoluções futuras.
- `Copyright (c)`, `Permission is hereby granted`, teste novo, asserção SPDX, `npm test` e `npm run validate`.

## Dependencies

Nenhuma. Sem ciclo com o ticket 01.

## Implementation Notes

A frase que nomeia v1-A29 permanece imediatamente antes do bloco. A frase de contrato v2 permanece imediatamente depois. Não acrescentar outra frase. Evidência: Functional Requirement 3 e critério 6 da spec.

## Acceptance Criteria

- Permanecem `The next free amendment identifier is v1-A25.`, `The next free amendment identifier is v1-A26.`, `The next free amendment identifier is v1-A27.`, `The next free amendment identifier is v1-A28.` e `That clause is the state before amendment v1-A27.` Evidência: critério 6 da spec.
- `The next free amendment identifier is v1-A29.` é seguida pelo bloco de Scope e, em seguida, por `None of these amendments introduces v2 artifact or skill contracts.` Evidência: critério 6 da spec.
- O arquivo não contém `Permission is hereby granted` nem `Copyright (c)`. Evidência: critério 11 da spec.
- O diff deste arquivo, ignorando fim de linha, não acrescenta frase além do bloco de Scope. Evidência: critério 13 da spec.

## Validation

Leitura do parágrafo de versionamento e `git diff --ignore-cr-at-eol` limitado a `contracts/skill-contract.md`. As frases antigas continuam no arquivo. Sem `npm test` e sem `npm run validate`.

## Definition of Done

O parágrafo conserva os identificadores livres anteriores, o estado anterior à v1-A27 e a frase de contrato v2. O bloco exato fica entre a frase de v1-A29 e a frase de contrato v2. Nenhum outro arquivo deste ticket muda.

## Title

03 — Acréscimo em `references/provenance.md`

## Goal

Acrescentar o título e o parágrafo do requisito 4 e o item do requisito 5 de `SPEC-20261022-007`, conservando o parágrafo da v1-A28 e os itens históricos.

## Context

Critérios 7 e 8 de `SPEC-20261022-007`. O parágrafo sob `## Amendment v1-A28 — MIT license, 2026-10-22` termina com `The next free amendment identifier is v1-A29.` As limitações já têm o item que nomeia v1-A24 como estado de registro anterior e o item que nomeia v1-A28 como estado do registro anterior. Evidência: Functional Requirements 4 e 5 e Acceptance Criteria 7 e 8 da spec.

## Scope

- Editar somente `references/provenance.md`.
- Conservar o parágrafo da v1-A28 que termina com `The next free amendment identifier is v1-A29.`
- Depois desse parágrafo, e antes de `## Representation choices and remaining limitations`, inserir o título `## Amendment v1-A29 — internal records, 2026-10-22` e exatamente o parágrafo abaixo. O recuo de lista não faz parte desse texto.

```text
Amendment v1-A29, published at `7a4d22c`, aligns the internal records with the published v1-A28. The license remains MIT. `private` remains `true`. The package version remains `1.0.0-scaffold`. It does not change skills, R1–R17, the CLI or `validate()`. The structural suite remains the 78 tests of v1-A26. No new test was added. No SPDX assertion was added. The next free amendment identifier is v1-A30.
```

- Conservar o item que nomeia v1-A24 como estado de registro anterior e o item que nomeia v1-A28 como estado do registro anterior.
- Depois desse segundo item, inserir exatamente o texto abaixo.

```text
Amendment v1-A29, published at `7a4d22c`, aligns the internal records with the published v1-A28. The license remains MIT. `private` remains `true`. The package version remains `1.0.0-scaffold`. It does not change skills, R1–R17, the CLI or `validate()`. The structural suite remains the 78 tests of v1-A26. No new test was added. No SPDX assertion was added. The next free amendment identifier is v1-A30. The sentence in the previous bullet that names v1-A29 as the next free identifier is the state of that earlier record.
```

## Out of Scope

- Substituir o parágrafo da v1-A28 ou os itens de v1-A24 e v1-A28.
- Dizer que a v1-A29 adota a licença.
- Dizer que a matriz K1–K8 entrou em `validate()` ou na suíte Node.
- Tratar a suíte de 78 testes como resultado de uma execução nova.
- Os outros três registros, `.ai/architecture.md`, `LICENSE`, `package.json`, `README.md`, manifesto, CLI, validador, skills, roteamento, ADRs e os treze caminhos.
- Roadmap e as doze evoluções futuras.
- `Copyright (c)`, `Permission is hereby granted`, teste novo, asserção SPDX, `npm test` e `npm run validate`.

## Dependencies

Nenhuma. Sem ciclo com os tickets 01 e 02.

## Implementation Notes

Título, parágrafo e item são acréscimos. A frase da v1-A28 que termina em v1-A29 permanece. O número 78 é o registro já escrito da suíte da v1-A26. Não inventar duração. Não acrescentar outra frase. Evidência: Functional Requirements 4 e 5 e critérios 7, 8 e 13 da spec.

## Acceptance Criteria

- O parágrafo da v1-A28 terminado em `The next free amendment identifier is v1-A29.` permanece. Imediatamente depois estão o título `## Amendment v1-A29 — internal records, 2026-10-22` e o primeiro bloco de Scope. Evidência: critério 7 da spec.
- Permanecem o item que nomeia v1-A24 como estado anterior e o item que nomeia v1-A28 como estado do registro anterior. O item novo é o segundo bloco de Scope. Evidência: critério 8 da spec.
- O arquivo não contém `Permission is hereby granted` nem `Copyright (c)`. Evidência: critério 11 da spec.
- O diff deste arquivo, ignorando fim de linha, não acrescenta frase além do título, do parágrafo e do item de Scope. Evidência: critério 13 da spec.

## Validation

Leitura do parágrafo da v1-A28, do título novo, do parágrafo novo e dos itens de limitações. `git diff --ignore-cr-at-eol` limitado a `references/provenance.md`. Sem execução de suíte.

## Definition of Done

O registro da v1-A28 permanece. O título, o parágrafo e o item de estado anterior entram por acréscimo. Nenhum outro arquivo deste ticket muda.

## Title

04 — Seção nova no topo de `references/validation-result.md`

## Goal

Inserir a seção exata do requisito 6 de `SPEC-20261022-007` antes da seção da v1-A28, sem alterar as seções já escritas e sem registrar suíte não observada.

## Context

Critérios 9 e 10 de `SPEC-20261022-007`. A primeira seção atual é `## State update — MIT license, v1-A28, 2026-10-22`. Ela publica a v1-A28 em `8f92189`, registra a adoção da MIT e termina em `The next free amendment identifier is v1-A29.` A seção `## State update — known-route reference matrix, v1-A27, 2026-10-22` contém `duration 12123 ms`, `The next free amendment identifier is v1-A28.` e `The sentences below that name v1-A27 as the next free identifier are the state before this amendment.` Esta spec não observou `npm test` nem `npm run validate`. Evidência: Functional Requirements 6, 7 e 8 e Acceptance Criteria 9 e 10 da spec.

## Scope

- Editar somente `references/validation-result.md`.
- Inserir, imediatamente depois de `# Validation result` e antes de `## State update — MIT license, v1-A28, 2026-10-22`, exatamente a seção abaixo. O recuo de lista não faz parte desse texto.

```text
## State update — internal records, v1-A29, 2026-10-22

This section records the later state of amendment v1-A29. It does not replace the sections below, and it does not change their results.

Amendment v1-A29 was published at `7a4d22c`. It aligns the internal records with the published v1-A28. The license remains MIT. `private` remains `true`. The package version remains `1.0.0-scaffold`. The next free amendment identifier is v1-A30. The sentences below that name v1-A29 as the next free identifier are the state before this alignment. No new Node test was added. No SPDX assertion was added. The count of 78 tests remains the suite of v1-A26.
```

- Conservar a seção da v1-A28 como segunda seção, com a frase que publica a v1-A28 em `8f92189`, registra a adoção da MIT e termina em `The next free amendment identifier is v1-A29.`
- Conservar na seção da v1-A27 `duration 12123 ms`, `The next free amendment identifier is v1-A28.` e `The sentences below that name v1-A27 as the next free identifier are the state before this amendment.`

## Out of Scope

- Reescrever a seção da v1-A28, a seção da v1-A27 ou qualquer seção abaixo da seção nova.
- Escrever `npm test`, `npm run validate`, duração ou contagem de uma execução nova na seção nova.
- Copiar `duration 12123 ms` para a seção nova.
- Dizer que a v1-A29 adota a licença.
- Os outros três registros, `.ai/architecture.md`, `LICENSE`, `package.json`, `README.md`, manifesto, CLI, validador, skills, roteamento, ADRs e os treze caminhos.
- Roadmap e as doze evoluções futuras.
- `Copyright (c)`, `Permission is hereby granted`, teste novo e asserção SPDX.

## Dependencies

Nenhuma. Sem ciclo com os tickets 01, 02 e 03.

## Implementation Notes

A seção nova fica no topo. As seções abaixo não são editadas. A contagem de 78 testes na seção nova é remissão ao registro da v1-A26, já escrita no bloco, não resultado observado nesta emenda. Não acrescentar outra frase. Evidência: Functional Requirements 6, 7 e 8 e critérios 9, 10 e 13 da spec.

## Acceptance Criteria

- A primeira seção `##` é `## State update — internal records, v1-A29, 2026-10-22`. A seção seguinte continua `## State update — MIT license, v1-A28, 2026-10-22` e ainda contém `The next free amendment identifier is v1-A29.` A seção da v1-A27 ainda contém `duration 12123 ms` e `The sentences below that name v1-A27 as the next free identifier are the state before this amendment.` Evidência: critério 9 da spec.
- A seção nova é o bloco de Scope. Ela não contém `npm test` nem `npm run validate`. Evidência: critério 10 da spec.
- O arquivo não contém `Permission is hereby granted` nem `Copyright (c)`. Evidência: critério 11 da spec.
- O diff deste arquivo, ignorando fim de linha, não acrescenta frase além do bloco de Scope. Evidência: critério 13 da spec.

## Validation

Leitura da ordem das seções e busca, na seção nova, por `npm test` e `npm run validate`. A seção da v1-A27 continua com `duration 12123 ms`. `git diff --ignore-cr-at-eol` limitado a `references/validation-result.md`. Sem executar a suíte.

## Definition of Done

A seção nova está no topo e é o texto exato. A seção da v1-A28 permanece a segunda. A seção da v1-A27 permanece com `duration 12123 ms`. A seção nova não registra suíte. Nenhum outro arquivo deste ticket muda.

## Title

05 — Conferência dos treze critérios e do limite de arquivos

## Goal

Reler os treze critérios de `SPEC-20261022-007` e confirmar que o alinhamento alterou somente os quatro registros.

## Context

Os critérios 4 e 5 nascem no ticket 01, o 6 no ticket 02, os 7 e 8 no ticket 03 e os 9 e 10 no ticket 04. O critério 11 nasce nos quatro. O critério 13 nasce nas quatro inserções. Os critérios 1, 2, 3 e 12 só fecham depois desses quatro. Evidência: a tabela de rastreio deste conjunto e Acceptance Criteria 1, 2, 3, 12 e 13 da spec.

## Scope

- Reler `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md` contra os critérios 4 a 11 e 13.
- Confirmar que `.ai/architecture.md` não mudou.
- Confirmar que o diff de conteúdo do alinhamento, ignorando fim de linha, não inclui outro caminho.
- Confirmar que não há arquivo de teste novo nem asserção SPDX.
- Deixar os treze caminhos fora de qualquer staging.

## Out of Scope

- Nova frase além dos blocos dos tickets 01 a 04.
- Corrigir um critério falho neste ticket. Critério falho devolve o ticket dono do arquivo.
- `README.md`, `.ai/architecture.md`, roadmap, as doze evoluções futuras, asserção SPDX e alteração funcional.
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

A conferência lê e compara. Não acrescenta prosa. `git diff --ignore-cr-at-eol` nos treze caminhos permanece vazio. Esses caminhos não entram no índice. `.ai/architecture.md` permanece byte a byte. O diff de conteúdo do alinhamento fica nos quatro registros. Não inventar duração nem resultado de suíte. Evidência: Non-functional Requirements e critérios 1, 2, 3, 11, 12 e 13 da spec.

## Acceptance Criteria

- Os critérios 4 e 5 da spec passam de novo em `.ai/project.md`. Evidência: ticket 01.
- O critério 6 da spec passa de novo em `contracts/skill-contract.md`. Evidência: ticket 02.
- Os critérios 7 e 8 da spec passam de novo em `references/provenance.md`. Evidência: ticket 03.
- Os critérios 9 e 10 da spec passam de novo em `references/validation-result.md`, inclusive a permanência de `duration 12123 ms` na seção da v1-A27 e a ausência de `npm test` e `npm run validate` na seção nova. Evidência: ticket 04.
- O diff de conteúdo, ignorando fim de linha, contém só `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`. `.ai/architecture.md` não aparece. Evidência: critério 1 da spec.
- `LICENSE`, `package.json`, `README.md`, `manifest/skills.json`, `contracts/routing.md`, a CLI, o validador, as 18 skills e ADR-0001 a ADR-0004 não aparecem nesse diff. Evidência: critério 2 da spec.
- Os treze caminhos não aparecem nesse diff, e `git diff --ignore-cr-at-eol` em cada um fica vazio. Eles não são preparados para commit. Evidência: critério 3 da spec.
- Nenhum dos quatro arquivos contém `Permission is hereby granted` nem `Copyright (c)`. Evidência: critério 11 da spec.
- O diff não acrescenta arquivo de teste nem asserção SPDX. `npm test` e `npm run validate` não são executados para aceitar o alinhamento. Evidência: critério 12 da spec.
- Fora dos blocos dos requisitos 1, 3, 4, 5 e 6, o diff dos quatro arquivos não acrescenta outra frase. Esses blocos não nomeiam roadmap nem as doze evoluções futuras. Evidência: critério 13 da spec.

## Validation

Leitura dos quatro arquivos contra os treze critérios. `git diff --ignore-cr-at-eol` limitado aos quatro caminhos e, em separado, aos treze caminhos. `.ai/architecture.md` sem diff de conteúdo. Sem suíte e sem publicação.

## Definition of Done

Os treze critérios têm ticket de origem, a conferência os relê e o alinhamento não altera arquivo fora dos quatro registros. Os treze caminhos de fim de linha permanecem fora do índice.

---
artifact: spec
id: SPEC-20261022-009
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261022-009
  - REVIEW-20261022-009
---

# Alinhamento documental interno — emenda v1-A32

## Problem

A v1-A30 está publicada em `6e4173b384da53ea01913723dea657852075cf75` (`6e4173b`), em 2026-10-22, com a mensagem `Align the internal records for amendment v1-A30.` A v1-A31 está publicada em `0dde35ffcab4b55f9631f2012f8f979a2a888514` (`0dde35f`), em 2026-10-22, com a mensagem `Add the offline SPDX MIT assertion for amendment v1-A31.` `HEAD` e a ref local `origin/main` estão em `0dde35f`. `package.json` declara `license` `MIT`, `private` `true` e `version` `1.0.0-scaffold`. `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md` ainda fecham a sequência na v1-A29 publicada em `7a4d22c` e nomeiam v1-A30 como próximo identificador livre. Nenhum deles contém `6e4173b` nem `0dde35f`. Nenhum contém frase que nomeie v1-A31 como identificador livre. As frases `No SPDX assertion was added` descrevem a v1-A28, a v1-A29 e o texto gravado pela v1-A30. `.ai/architecture.md` não afirma licença, `private`, versão de pacote nem identificador livre. O contexto do projeto está em `.ai/project.md`, `.ai/architecture.md`, `.ai/standards.md`, `.ai/tech-stack.md` e `.ai/business-rules.md`. Sem esta spec, o alinhamento teria de inventar quais frases apagar. Evidência: `DECISION-SET-20261022-009` versão 1 e a leitura desses arquivos.

## Goal

Especificar o acréscimo documental que alinha esses quatro registros ao estado publicado da v1-A30 e da v1-A31, sem aplicar o acréscimo nesta spec. O único objetivo da v1-A32 é esse alinhamento. A v1-A32 não está implementada.

## Scope

- Acrescentar, sem substituir frase histórica, a narração de que a v1-A30 foi publicada em `6e4173b`, de que a v1-A31 foi publicada em `0dde35f`, de que a asserção SPDX determinística e offline foi introduzida na v1-A31, de que a adoção da MIT é a da v1-A28 e a licença permanece MIT, de que `private` permanece `true`, de que a versão permanece `1.0.0-scaffold` e de que o próximo identificador livre é v1-A32.
- Os únicos arquivos dessa narração são `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`.
- Em `references/validation-result.md`, a narração são duas seções novas no topo. A primeira é a da v1-A31. A segunda é a da v1-A30. A seção da v1-A29 permanece a terceira. As seções já existentes permanecem.
- `.ai/architecture.md` e `README.md` permanecem sem edição.
- Esta spec não edita os quatro arquivos.

## Non-goals

- Reabrir a v1-A30 ou a v1-A31.
- Editar `LICENSE`, `package.json`, `README.md`, `manifest/skills.json`, `tests/spdx-mit.test.mjs` ou `tests/spdx-mit.txt`. A linha 5 de `README.md` ainda fecha a lista de emendas na v1-A27. Essa defasagem fica fora.
- Editar `.ai/architecture.md` para repetir `6e4173b`, `0dde35f`, MIT, `private`, a versão ou v1-A32.
- Apagar ou reescrever frase que nomeia v1-A25, v1-A26, v1-A27, v1-A28, v1-A29 ou v1-A30 como identificador livre do registro em que aparece.
- Apagar `No SPDX assertion was added`.
- Inventar frase que nomeie v1-A31 como identificador livre.
- Dizer que a v1-A30 adota a licença ou introduz a asserção. Quem adotou a MIT foi a v1-A28. Quem introduziu a asserção foi a v1-A31.
- Mover a matriz K1–K8 para `validate()` ou para a suíte Node. Ela permanece documental.
- Escrever nos quatro arquivos mudança de processo, registro da emenda sem o hash do próprio commit, roadmap, revogação de exclusão ou qualquer evolução futura como requisito.
- Acrescentar teste, comando, skill ou mudança em R1–R17.
- Exigir `npm test` ou `npm run validate` como critério desta spec.
- Atribuir 86/86, a duração 12008.531625 ms ou `PASS: 18 skills` a uma execução nova ou à v1-A30.
- Publicar no npm, mudar `private` ou renomear `1.0.0-scaffold`.
- Reescrever ADR-0001, ADR-0002, ADR-0003, ADR-0004, `HANDOFF-20261022-007`, `HANDOFF-20261022-008`, `DECISION-SET-20261022-007` ou `DECISION-SET-20261022-008`.
- Incluir os treze caminhos que só diferem no fim de linha.
- Copiar o aviso `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)` ou o corpo da licença MIT para os quatro arquivos.
- Executar `to-tickets`, `implement`, `docs`, commit ou push nesta spec.

## Actors

- Mantenedor, que delimitou a v1-A32 como alinhamento documental e aprovou `DECISION-SET-20261022-009` versão 1.
- Quem implementar depois acrescenta só os quatro registros. Esta spec não faz esse acréscimo.

## Functional Requirements

1. `.ai/project.md` conserva as duas frases `O próximo identificador livre passa a ser v1-A30.` Depois de cada uma, no mesmo parágrafo, entra exatamente o texto abaixo. Evidência: `DECISION-SET-20261022-009` versão 1 e o texto atual do arquivo.

   ```text
   A v1-A30 foi publicada em `6e4173b`. Ela alinha os registros internos à v1-A29. A v1-A31 foi publicada em `0dde35f`. Ela introduz a asserção SPDX determinística e offline. A licença permanece MIT. A adoção da MIT é a da v1-A28. `private: true` permanece. A versão permanece `1.0.0-scaffold`. O próximo identificador livre passa a ser v1-A32.
   ```
2. `.ai/project.md` conserva `A frase de 53/53 acima permanece o registro de 2026-10-14.`, `O próximo identificador livre é v1-A25.`, `O próximo identificador livre passa a ser v1-A26.`, `O próximo identificador livre passa a ser v1-A27.`, as duas frases `O próximo identificador livre passa a ser v1-A28.` e as duas frases `O próximo identificador livre passa a ser v1-A29.` A frase de entrega que cita a matriz K1–K8 da v1-A27, fora da suíte Node, permanece. Evidência: o mesmo conjunto e o arquivo atual.
3. `contracts/skill-contract.md` conserva, no parágrafo de versionamento, `The next free amendment identifier is v1-A25.`, `The next free amendment identifier is v1-A26.`, `The next free amendment identifier is v1-A27.`, `The next free amendment identifier is v1-A28.`, `The next free amendment identifier is v1-A29.`, `The next free amendment identifier is v1-A30.`, `That clause is the state before amendment v1-A27.` e `None of these amendments introduces v2 artifact or skill contracts.` Entre a frase de v1-A30 e a frase de contrato v2 entra exatamente o texto abaixo. Evidência: o conjunto e o arquivo atual.

   ```text
   Amendment v1-A30, published at `6e4173b`, aligns the internal records with the published v1-A29. It does not change skill responsibilities, R1–R17, the 18 skills, the CLI or `validate()`. It adds no SPDX assertion. `private` remains `true`. The package version remains `1.0.0-scaffold`. Amendment v1-A31, published at `0dde35f`, introduces the offline deterministic SPDX assertion in the Node suite. It does not change skill responsibilities, R1–R17, the 18 skills, the CLI or `validate()`. The MIT license was adopted by amendment v1-A28 and remains MIT. `private` remains `true`. The package version remains `1.0.0-scaffold`. The next free amendment identifier is v1-A32.
   ```
4. `references/provenance.md` conserva o parágrafo sob `## Amendment v1-A29 — internal records, 2026-10-22` que termina com `The next free amendment identifier is v1-A30.` Depois desse parágrafo, e antes de `## Representation choices and remaining limitations`, entram os dois registros abaixo, nessa ordem. Evidência: o conjunto e o formato do registro da v1-A29.

   ```text
   ## Amendment v1-A30 — internal records, 2026-10-22

   Amendment v1-A30, published at `6e4173b`, aligns the internal records with the published v1-A29. The license remains MIT. `private` remains `true`. The package version remains `1.0.0-scaffold`. It does not change skills, R1–R17, the CLI or `validate()`. The structural suite remains the 78 tests of v1-A26. No new test was added. No SPDX assertion was added.
   ```

   ```text
   ## Amendment v1-A31 — SPDX assertion, 2026-10-22

   Amendment v1-A31, published at `0dde35f`, introduces the offline deterministic SPDX assertion. The MIT license was adopted by amendment v1-A28 and remains MIT. `private` remains `true`. The package version remains `1.0.0-scaffold`. It does not change skills, R1–R17, the CLI or `validate()`. `REVIEW-20261022-009` records `npm test` 86/86, duration 12008.531625 ms, exit 0, and `npm run validate` with `PASS: 18 skills`, exit 0, on Node.js v26.5.0, npm 11.17.0 and Darwin 25.6.0 arm64. This record does not report a new suite run. The next free amendment identifier is v1-A32.
   ```
5. `references/provenance.md` conserva o item das limitações que nomeia v1-A24 como estado de registro anterior, o item que nomeia v1-A28 como estado do registro anterior e o item que termina com `The sentence in the previous bullet that names v1-A29 as the next free identifier is the state of that earlier record.` Depois desse item da v1-A29 entram exatamente os dois itens abaixo, nessa ordem. Evidência: o conjunto.

   ```text
   Amendment v1-A30, published at `6e4173b`, aligns the internal records with the published v1-A29. The license remains MIT. `private` remains `true`. The package version remains `1.0.0-scaffold`. It does not change skills, R1–R17, the CLI or `validate()`. The structural suite remains the 78 tests of v1-A26. No new test was added. No SPDX assertion was added. The sentence in the previous bullet that names v1-A30 as the next free identifier is the state of that earlier record.
   ```

   ```text
   Amendment v1-A31, published at `0dde35f`, introduces the offline deterministic SPDX assertion. The MIT license was adopted by amendment v1-A28 and remains MIT. `private` remains `true`. The package version remains `1.0.0-scaffold`. It does not change skills, R1–R17, the CLI or `validate()`. `REVIEW-20261022-009` records `npm test` 86/86, duration 12008.531625 ms, and `npm run validate` with `PASS: 18 skills`. This record does not report a new suite run. The next free amendment identifier is v1-A32. The sentence `No SPDX assertion was added` in the earlier records remains the state of v1-A28, v1-A29 and v1-A30.
   ```
6. `references/validation-result.md` ganha, imediatamente depois de `# Validation result` e antes de `## State update — internal records, v1-A29, 2026-10-22`, as duas seções abaixo, nessa ordem. Evidência: o conjunto e o formato da seção da v1-A29.

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
7. A seção nova da v1-A30 em `references/validation-result.md` não contém `npm test`, `npm run validate`, duração nem contagem de uma execução. A seção nova da v1-A31 cita somente `REVIEW-20261022-009` para `npm test` 86/86, duração 12008.531625 ms e `npm run validate` com `PASS: 18 skills`. Essa citação não afirma execução nova da suíte. Evidência: o conjunto, `REVIEW-20261022-009` e `REVIEW-20261022-008`, que não executou a suíte da v1-A30.
8. A seção `## State update — internal records, v1-A29, 2026-10-22` permanece a terceira e conserva a publicação em `7a4d22c`, `The next free amendment identifier is v1-A30.`, `No SPDX assertion was added` e `The count of 78 tests remains the suite of v1-A26.` A seção `## State update — MIT license, v1-A28, 2026-10-22` conserva a adoção da MIT em `8f92189` e `The next free amendment identifier is v1-A29.` A seção `## State update — known-route reference matrix, v1-A27, 2026-10-22` conserva `duration 12123 ms`. Evidência: o texto atual dessas seções e a decisão de não reescrevê-las.
9. Nenhum dos quatro arquivos passa a conter `The next free amendment identifier is v1-A31`, `O próximo identificador livre passa a ser v1-A31.` nem `O próximo identificador livre é v1-A31.` Evidência: a leitura atual, em que essas frases estão ausentes, e a decisão que rejeitou inventá-las.
10. Nenhum dos quatro arquivos passa a conter `Copyright (c)` nem `Permission is hereby granted`. Evidência: o conjunto, que exclui o aviso e o corpo da licença, e a leitura atual, em que essas sequências estão ausentes.
11. `.ai/architecture.md` permanece byte a byte como está. Evidência: a decisão de que não há fato arquitetural novo.

## Business Rules

- O único objetivo da v1-A32 é este alinhamento. A v1-A30 permanece a emenda publicada em `6e4173b`. A v1-A31 permanece a emenda publicada em `0dde35f`. Nenhuma das duas é reaberta. Evidência: `DECISION-SET-20261022-009` versão 1.
- Frase histórica que nomeia um identificador livre permanece. O identificador livre corrente, v1-A32, entra por acréscimo. Evidência: a decisão que rejeitou apagar essas frases e o precedente `6e4173b`.
- A licença narrada como adoção continua sendo a da v1-A28. A v1-A30 e a v1-A31 conservam a MIT. Evidência: o conjunto.
- `No SPDX assertion was added` permanece como estado anterior à v1-A31. A v1-A30 também não introduziu a asserção. A v1-A31 a introduziu. Evidência: o conjunto.
- A matriz K1–K8 continua fora de `validate()` e fora da suíte Node. Evidência: o texto atual dos registros e a decisão de que `0dde35f` não alterou `validate()`.
- `private` permanece `true`. A versão permanece `1.0.0-scaffold`. A MIT não autoriza publicação no npm. Evidência: o conjunto.
- A mudança de processo recomendada para decisão posterior permanece fora dos quatro arquivos, dos requisitos e dos critérios de aceite. Nenhuma exclusão vigente é revogada. Evidência: o conjunto.

## Non-functional Requirements

- Cada critério se verifica por leitura do texto ou por `git diff`, sem `npm test`, sem `npm run validate` e sem publicação.
- Acréscimo não reescreve o parágrafo ou a seção que conserva. A frase antiga continua presente e a frase nova vem depois.
- Resultado de suíte citado na narração da v1-A31 é o já gravado em `REVIEW-20261022-009`. A narração da v1-A30 não recebe resultado de suíte.
- O texto novo é o conteúdo dos blocos dos requisitos 1, 3, 4, 5 e 6. O recuo de lista não faz parte desse texto.

## Technical Constraints

- Arquivos autorizados na implementação futura: `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`.
- `.ai/architecture.md`, `LICENSE`, `package.json`, `README.md`, `manifest/skills.json`, `tests/spdx-mit.test.mjs`, `tests/spdx-mit.txt`, `contracts/routing.md`, as 18 skills, a CLI, o validador e ADR-0001 a ADR-0004 permanecem.
- `docs` não escreve estes caminhos. `.ai/config.json` define `docsPath` como `docs`. O precedente aplicável é o acréscimo de `6e4173b`, não uma execução de `docs`. Evidência: o conjunto e `.ai/config.json`.
- `.ai/standards.md` pede `npm run validate` depois de mudança estrutural e `npm test` para mudança de comportamento do validador. Esta emenda não é essas mudanças. Esses comandos não são critério aqui.
- R8 não se aplica: não há termo de negócio, invariante, transição, evento ou fronteira de contexto novos. R9 não se aplica: não há fronteira de módulo, interface, modelo de dados, contrato de integração, infraestrutura, fronteira de segurança, concorrência, implantação ou comportamento de alto raio. Evidência: o conjunto e a exclusão de `.ai/architecture.md`.
- Os treze caminhos abaixo permanecem fora da alteração. `git diff --ignore-cr-at-eol` neles fica vazio:
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

## Security / Privacy

- Nenhum segredo entra nos quatro arquivos.
- O aviso de copyright e o corpo da licença MIT não entram nos quatro arquivos. `LICENSE` permanece fora do diff.
- Nenhuma conclusão de titularidade jurídica é acrescentada.
- `private` `true` não é alterado e esta spec não autoriza publicação no npm.

## Acceptance Criteria

1. O diff de conteúdo da implementação, ignorando fim de linha, contém só `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`. `.ai/architecture.md` não aparece.
2. `LICENSE`, `package.json`, `README.md`, `manifest/skills.json`, `tests/spdx-mit.test.mjs`, `tests/spdx-mit.txt`, `contracts/routing.md`, a CLI, o validador, as 18 skills e os quatro ADRs não aparecem nesse diff.
3. Os treze caminhos listados em Technical Constraints não aparecem nesse diff. `git diff --ignore-cr-at-eol` em cada um fica vazio.
4. `.ai/project.md` ainda contém duas ocorrências de `O próximo identificador livre passa a ser v1-A30.` Cada uma é seguida, no mesmo parágrafo, pelo texto exato do requisito 1. O arquivo ainda contém duas ocorrências de `O próximo identificador livre passa a ser v1-A29.`
5. `.ai/project.md` ainda contém `A frase de 53/53 acima permanece o registro de 2026-10-14.`, `O próximo identificador livre é v1-A25.`, `O próximo identificador livre passa a ser v1-A26.`, `O próximo identificador livre passa a ser v1-A27.`, duas ocorrências de `O próximo identificador livre passa a ser v1-A28.` e a frase da matriz K1–K8 fora da suíte Node.
6. `contracts/skill-contract.md` ainda contém `The next free amendment identifier is v1-A25.`, `The next free amendment identifier is v1-A26.`, `The next free amendment identifier is v1-A27.`, `The next free amendment identifier is v1-A28.`, `The next free amendment identifier is v1-A29.` e `That clause is the state before amendment v1-A27.` A frase `The next free amendment identifier is v1-A30.` é seguida pelo texto exato do requisito 3 e, em seguida, por `None of these amendments introduces v2 artifact or skill contracts.`
7. `references/provenance.md` ainda contém o parágrafo da v1-A29 terminado em `The next free amendment identifier is v1-A30.` Imediatamente depois estão os dois títulos e os dois parágrafos exatos do requisito 4, e em seguida `## Representation choices and remaining limitations`.
8. `references/provenance.md` ainda contém o item que nomeia v1-A24 como estado anterior, o item que nomeia v1-A28 como estado do registro anterior e o item que nomeia v1-A29 como estado do registro anterior. Imediatamente depois desse item da v1-A29 estão os dois itens exatos do requisito 5.
9. Em `references/validation-result.md`, a primeira seção `##` depois do título é `## State update — SPDX assertion, v1-A31, 2026-10-22`. A segunda é `## State update — internal records, v1-A30, 2026-10-22`. A terceira continua `## State update — internal records, v1-A29, 2026-10-22` e ainda contém `The next free amendment identifier is v1-A30.`, `No SPDX assertion was added` e `The count of 78 tests remains the suite of v1-A26.` A seção da v1-A28 ainda contém a adoção da MIT. A seção da v1-A27 ainda contém `duration 12123 ms`.
10. As duas seções novas são o texto exato do requisito 6. A seção da v1-A30 não contém `npm test` nem `npm run validate`. A seção da v1-A31 contém `86/86`, `12008.531625 ms` e `PASS: 18 skills` somente na citação de `REVIEW-20261022-009`, junto com `This section does not report a new suite run.`
11. As quatro ocorrências já existentes de `No SPDX assertion was added` em `references/provenance.md`, nos parágrafos e itens da v1-A28 e da v1-A29, permanecem. As duas já existentes em `references/validation-result.md`, nas seções da v1-A29 e da v1-A28, permanecem. Os blocos novos da v1-A30 também contêm essa frase. Os blocos novos da v1-A31 a citam como estado anterior. Nenhuma ocorrência anterior é removida.
12. Nenhum dos quatro arquivos contém `The next free amendment identifier is v1-A31`, `O próximo identificador livre passa a ser v1-A31.`, `O próximo identificador livre é v1-A31.`, `Permission is hereby granted` ou `Copyright (c)`.
13. O diff não acrescenta arquivo de teste, não altera a suíte Node e não cria asserção SPDX. `npm test` e `npm run validate` não são necessários para aceitar este alinhamento.
14. Fora das inserções nomeadas nos requisitos 1, 3, 4, 5 e 6, o diff dos quatro arquivos não acrescenta outra frase. Essas inserções não nomeiam mudança de processo, roadmap nem revogação de exclusão.

## Risks

- Tratar as frases que ainda dizem v1-A30 como identificador livre como erro e apagá-las. Os critérios 4, 6 e 8 fecham esse risco: elas permanecem como estado do registro anterior.
- Apagar `No SPDX assertion was added` porque a v1-A31 introduziu a asserção. O critério 11 conserva as ocorrências anteriores e exige a frase nos blocos novos da v1-A30.
- Dizer que a v1-A30 adota a MIT ou introduz a asserção. Os critérios 4, 6, 7 e 10 exigem a adoção na v1-A28 e a introdução na v1-A31.
- Inventar frase que nomeie v1-A31 como identificador livre. O critério 12 rejeita essa frase.
- Atribuir 86/86 a uma suíte nova ou à v1-A30. O critério 10 limita a citação a `REVIEW-20261022-009` na seção da v1-A31 e exclui esses comandos da seção da v1-A30.
- Inserir os commits em `.ai/architecture.md` porque um alinhamento anterior tocou esse arquivo. O critério 1 rejeita essa edição.
- Escrever a mudança de processo nos quatro registros. O critério 14 rejeita frase além das inserções nomeadas.

## Open Questions

Nenhuma questão bloqueante permanece.

- Quando o mantenedor abrirá o `clarify` da mudança de processo. Esta spec não o abre e não escreve essa mudança nos quatro arquivos.
- Quando `README.md` passará a narrar a v1-A28, a v1-A29, a v1-A30 e a v1-A31. Esta spec não o altera.
- Se uma sessão posterior reexecuta `npm test` ou `npm run validate`. Esta spec não exige essa reexecução. A seção da v1-A31 cita o review já gravado. A seção da v1-A30 não recebe resultado de suíte.
- Qual exclusão uma emenda posterior escolheria como único objetivo. Esta spec não escolhe e não abre essa emenda.

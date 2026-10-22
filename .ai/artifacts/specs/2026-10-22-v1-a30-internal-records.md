---
artifact: spec
id: SPEC-20261022-007
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261022-007
---

# Alinhamento documental interno — emenda v1-A30

## Problem

A v1-A29 está publicada em `7a4d22c0d30b73996380673ae993b4a92621e3e2` (`7a4d22c`), em 2026-10-22, com a mensagem `Align the internal records with the published v1-A28 license.` `package.json` declara `license` `MIT`, `private` `true` e `version` `1.0.0-scaffold`. `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md` ainda fecham a sequência na v1-A28 publicada em `8f92189` e nomeiam v1-A29 como próximo identificador livre. Nenhum deles contém `7a4d22c`. `.ai/architecture.md` não afirma licença, `private`, versão de pacote nem identificador livre, e `7a4d22c` não mudou CLI, `validate()`, skills nem testes. O contexto do projeto está em `.ai/project.md`, `.ai/architecture.md`, `.ai/standards.md`, `.ai/tech-stack.md` e `.ai/business-rules.md`. Sem esta spec, o alinhamento teria de inventar quais frases apagar. Evidência: `DECISION-SET-20261022-007` versão 1 e a leitura desses arquivos.

## Goal

Especificar o acréscimo documental que alinha esses quatro registros ao estado publicado da v1-A29, sem aplicar o acréscimo nesta spec. O único objetivo da v1-A30 é esse alinhamento. A v1-A30 não está implementada.

## Scope

- Acrescentar, sem substituir frase histórica, a narração de que a v1-A29 foi publicada em `7a4d22c`, de que ela alinha os registros internos à v1-A28, de que a licença permanece MIT, de que `private` permanece `true`, de que a versão permanece `1.0.0-scaffold` e de que o próximo identificador livre é v1-A30.
- Os únicos arquivos dessa narração são `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`.
- Em `references/validation-result.md`, a narração é uma seção nova no topo. A seção da v1-A28 permanece a segunda. As seções já existentes permanecem.
- `.ai/architecture.md` permanece sem edição.
- Esta spec não edita os quatro arquivos.

## Non-goals

- Reabrir a v1-A29 ou editar `LICENSE`, `package.json`, `README.md` ou o manifesto. A linha 5 de `README.md` ainda fecha a lista de emendas na v1-A27. Essa defasagem fica fora.
- Editar `.ai/architecture.md` para repetir `7a4d22c`, MIT, `private`, a versão ou v1-A30.
- Apagar ou reescrever frase que nomeia v1-A25, v1-A26, v1-A27, v1-A28 ou v1-A29 como identificador livre do registro em que aparece.
- Dizer que a v1-A29 adota a licença. Quem a adotou foi a v1-A28, já narrada. A narração nova diz que a licença permanece MIT.
- Mover a matriz K1–K8 para `validate()` ou para a suíte Node. Ela permanece documental.
- Escrever nos quatro arquivos o inventário informativo das doze evoluções futuras, um roadmap, uma revogação de exclusão ou qualquer dessas evoluções como requisito.
- Acrescentar teste, asserção SPDX, comando, skill ou mudança em R1–R17.
- Exigir `npm test` ou `npm run validate` como critério desta spec.
- Registrar duração, contagem ou resultado desses comandos que esta spec não observou.
- Publicar no npm, mudar `private` ou renomear `1.0.0-scaffold`.
- Reescrever ADR-0001, ADR-0002, ADR-0003, ADR-0004, `HANDOFF-20261022-006` ou `DECISION-SET-20261022-006`.
- Incluir os treze caminhos que só diferem no fim de linha.
- Copiar o aviso `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)` ou o corpo da licença MIT para os quatro arquivos.
- Executar `to-tickets`, `implement`, `docs`, commit ou push nesta spec.

## Actors

- Mantenedor, que delimitou a v1-A30 como alinhamento documental e aprovou `DECISION-SET-20261022-007` versão 1.
- Quem implementar depois acrescenta só os quatro registros. Esta spec não faz esse acréscimo.

## Functional Requirements

1. `.ai/project.md` conserva as duas frases `O próximo identificador livre passa a ser v1-A29.` Depois de cada uma, no mesmo parágrafo, entra exatamente o texto abaixo. Evidência: `DECISION-SET-20261022-007` versão 1 e o texto atual do arquivo.

   ```text
   A v1-A29 foi publicada em `7a4d22c`. Ela alinha os registros internos à v1-A28. A licença permanece MIT. `private: true` permanece. A versão permanece `1.0.0-scaffold`. O próximo identificador livre passa a ser v1-A30.
   ```
2. `.ai/project.md` conserva `A frase de 53/53 acima permanece o registro de 2026-10-14.`, `O próximo identificador livre é v1-A25.`, `O próximo identificador livre passa a ser v1-A26.`, `O próximo identificador livre passa a ser v1-A27.` e as duas frases `O próximo identificador livre passa a ser v1-A28.` A frase de entrega que cita a matriz K1–K8 da v1-A27, fora da suíte Node, permanece. Evidência: o mesmo conjunto e o arquivo atual.
3. `contracts/skill-contract.md` conserva, no parágrafo de versionamento, `The next free amendment identifier is v1-A25.`, `The next free amendment identifier is v1-A26.`, `The next free amendment identifier is v1-A27.`, `The next free amendment identifier is v1-A28.`, `The next free amendment identifier is v1-A29.`, `That clause is the state before amendment v1-A27.` e `None of these amendments introduces v2 artifact or skill contracts.` Entre a frase de v1-A29 e a frase de contrato v2 entra exatamente o texto abaixo. Evidência: o conjunto e o arquivo atual.

   ```text
   Amendment v1-A29, published at `7a4d22c`, aligns the internal records with the published v1-A28. It does not change skill responsibilities, R1–R17, the 18 skills, the CLI or `validate()`. `private` remains `true`. The package version remains `1.0.0-scaffold`. The next free amendment identifier is v1-A30.
   ```
4. `references/provenance.md` conserva o parágrafo sob `## Amendment v1-A28 — MIT license, 2026-10-22` que termina com `The next free amendment identifier is v1-A29.` Depois desse parágrafo, e antes de `## Representation choices and remaining limitations`, entra o título `## Amendment v1-A29 — internal records, 2026-10-22` e exatamente o parágrafo abaixo. Evidência: o conjunto e o formato do registro da v1-A28.

   ```text
   Amendment v1-A29, published at `7a4d22c`, aligns the internal records with the published v1-A28. The license remains MIT. `private` remains `true`. The package version remains `1.0.0-scaffold`. It does not change skills, R1–R17, the CLI or `validate()`. The structural suite remains the 78 tests of v1-A26. No new test was added. No SPDX assertion was added. The next free amendment identifier is v1-A30.
   ```
5. `references/provenance.md` conserva o item das limitações que nomeia v1-A24 como estado de registro anterior e o item que nomeia v1-A28 como estado do registro anterior. Depois desse segundo item entra exatamente o texto abaixo. Evidência: o conjunto.

   ```text
   Amendment v1-A29, published at `7a4d22c`, aligns the internal records with the published v1-A28. The license remains MIT. `private` remains `true`. The package version remains `1.0.0-scaffold`. It does not change skills, R1–R17, the CLI or `validate()`. The structural suite remains the 78 tests of v1-A26. No new test was added. No SPDX assertion was added. The next free amendment identifier is v1-A30. The sentence in the previous bullet that names v1-A29 as the next free identifier is the state of that earlier record.
   ```
6. `references/validation-result.md` ganha, imediatamente depois de `# Validation result` e antes de `## State update — MIT license, v1-A28, 2026-10-22`, a seção abaixo. Evidência: o conjunto e o formato da seção da v1-A28.

   ```text
   ## State update — internal records, v1-A29, 2026-10-22

   This section records the later state of amendment v1-A29. It does not replace the sections below, and it does not change their results.

   Amendment v1-A29 was published at `7a4d22c`. It aligns the internal records with the published v1-A28. The license remains MIT. `private` remains `true`. The package version remains `1.0.0-scaffold`. The next free amendment identifier is v1-A30. The sentences below that name v1-A29 as the next free identifier are the state before this alignment. No new Node test was added. No SPDX assertion was added. The count of 78 tests remains the suite of v1-A26.
   ```
7. A seção nova de `references/validation-result.md` não contém `npm test`, `npm run validate`, duração nem contagem de uma execução que esta spec não observou. Evidência: a questão aberta do conjunto e o pedido desta spec.
8. A seção `## State update — MIT license, v1-A28, 2026-10-22` permanece a segunda e conserva a frase que publica a v1-A28 em `8f92189`, registra a adoção da MIT e termina em `The next free amendment identifier is v1-A29.` A seção `## State update — known-route reference matrix, v1-A27, 2026-10-22` conserva `duration 12123 ms`, `The next free amendment identifier is v1-A28.` e `The sentences below that name v1-A27 as the next free identifier are the state before this amendment.` Evidência: o texto atual dessas seções e a decisão de não reescrevê-las.
9. Nenhum dos quatro arquivos passa a conter `Copyright (c)` nem `Permission is hereby granted`. Evidência: o conjunto, que exclui o aviso e o corpo da licença, e a leitura atual, em que essas sequências estão ausentes.
10. `.ai/architecture.md` permanece byte a byte como está. Evidência: a decisão de que não há fato arquitetural novo.

## Business Rules

- O único objetivo da v1-A30 é este alinhamento. A v1-A29 permanece a emenda publicada em `7a4d22c` e não é reaberta. Evidência: `DECISION-SET-20261022-007` versão 1.
- Frase histórica que nomeia um identificador livre permanece. O identificador livre corrente, v1-A30, entra por acréscimo. Evidência: a decisão que rejeitou apagar essas frases e o precedente `7a4d22c`.
- A licença narrada como adoção continua sendo a da v1-A28. A v1-A29 conserva a MIT. Evidência: o conjunto.
- A matriz K1–K8 continua fora de `validate()` e fora da suíte Node. Evidência: o texto atual dos registros e a decisão de que `7a4d22c` não alterou `validate()`.
- `private` permanece `true`. A versão permanece `1.0.0-scaffold`. A MIT não autoriza publicação no npm. Evidência: o conjunto.
- O inventário das doze evoluções futuras permanece fora dos quatro arquivos, dos requisitos e dos critérios de aceite. Nenhuma exclusão vigente é revogada. Evidência: o conjunto.

## Non-functional Requirements

- Cada critério se verifica por leitura do texto ou por `git diff`, sem `npm test`, sem `npm run validate` e sem publicação.
- Acréscimo não reescreve o parágrafo ou a seção que conserva. A frase antiga continua presente e a frase nova vem depois.
- Resultado de suíte que esta spec não observou não entra na seção nova.
- O texto novo é o conteúdo dos blocos dos requisitos 1, 3, 4, 5 e 6. O recuo de lista não faz parte desse texto.

## Technical Constraints

- Arquivos autorizados na implementação futura: `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`.
- `.ai/architecture.md`, `LICENSE`, `package.json`, `README.md`, `manifest/skills.json`, `contracts/routing.md`, as 18 skills, a CLI, o validador e ADR-0001 a ADR-0004 permanecem.
- `docs` não escreve estes caminhos. `.ai/config.json` define `docsPath` como `docs`. O precedente aplicável é o acréscimo de `7a4d22c`, não uma execução de `docs`. Evidência: o conjunto e `.ai/config.json`.
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

## Acceptance Criteria

1. O diff de conteúdo da implementação, ignorando fim de linha, contém só `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`. `.ai/architecture.md` não aparece.
2. `LICENSE`, `package.json`, `README.md`, `manifest/skills.json`, `contracts/routing.md`, a CLI, o validador, as 18 skills e os quatro ADRs não aparecem nesse diff.
3. Os treze caminhos listados em Technical Constraints não aparecem nesse diff. `git diff --ignore-cr-at-eol` em cada um fica vazio.
4. `.ai/project.md` ainda contém duas ocorrências de `O próximo identificador livre passa a ser v1-A29.` Cada uma é seguida, no mesmo parágrafo, pelo texto exato do requisito 1.
5. `.ai/project.md` ainda contém `A frase de 53/53 acima permanece o registro de 2026-10-14.`, `O próximo identificador livre é v1-A25.`, `O próximo identificador livre passa a ser v1-A26.`, `O próximo identificador livre passa a ser v1-A27.`, duas ocorrências de `O próximo identificador livre passa a ser v1-A28.` e a frase da matriz K1–K8 fora da suíte Node.
6. `contracts/skill-contract.md` ainda contém `The next free amendment identifier is v1-A25.`, `The next free amendment identifier is v1-A26.`, `The next free amendment identifier is v1-A27.`, `The next free amendment identifier is v1-A28.` e `That clause is the state before amendment v1-A27.` A frase `The next free amendment identifier is v1-A29.` é seguida pelo texto exato do requisito 3 e, em seguida, por `None of these amendments introduces v2 artifact or skill contracts.`
7. `references/provenance.md` ainda contém o parágrafo da v1-A28 terminado em `The next free amendment identifier is v1-A29.` Imediatamente depois estão o título e o parágrafo exatos do requisito 4.
8. `references/provenance.md` ainda contém o item que nomeia v1-A24 como estado anterior e o item que nomeia v1-A28 como estado do registro anterior. O item novo diz que a nomeação de v1-A29 como próximo identificador livre é o estado daquele registro anterior, e contém `7a4d22c`, `The license remains MIT.`, a suíte de 78 testes da v1-A26, nenhum teste novo, nenhuma asserção SPDX e `The next free amendment identifier is v1-A30.`
9. Em `references/validation-result.md`, a primeira seção `##` depois do título é `## State update — internal records, v1-A29, 2026-10-22`. A seção seguinte continua `## State update — MIT license, v1-A28, 2026-10-22` e ainda contém `The next free amendment identifier is v1-A29.` A seção `## State update — known-route reference matrix, v1-A27, 2026-10-22` ainda contém `duration 12123 ms` e `The sentences below that name v1-A27 as the next free identifier are the state before this amendment.`
10. A seção nova é o texto exato do requisito 6. Ela não contém `npm test` nem `npm run validate`.
11. Nenhum dos quatro arquivos contém `Permission is hereby granted` nem `Copyright (c)`.
12. O diff não acrescenta arquivo de teste, não altera a suíte Node e não cria asserção SPDX. `npm test` e `npm run validate` não são necessários para aceitar este alinhamento.
13. Fora das inserções nomeadas nos requisitos 1, 3, 4, 5 e 6, o diff dos quatro arquivos não acrescenta outra frase. Essas inserções não nomeiam roadmap nem as doze evoluções futuras.

## Risks

- Tratar as frases que ainda dizem v1-A29 como identificador livre como erro e apagá-las. Os critérios 4, 6 e 8 fecham esse risco: elas permanecem como estado do registro anterior.
- Dizer que a v1-A29 adota a MIT. Os critérios 4, 6, 7 e 10 exigem permanência da licença e conservação da frase da v1-A28 que registra a adoção.
- Inserir o commit em `.ai/architecture.md` porque um alinhamento anterior tocou esse arquivo. O critério 1 rejeita essa edição.
- Preencher a seção nova com duração ou contagem copiadas da seção da v1-A27. O critério 10 rejeita `npm test` e `npm run validate` nessa seção. O critério 9 conserva `duration 12123 ms` só na seção da v1-A27.
- Copiar o inventário das doze evoluções para os quatro registros. O critério 13 rejeita frase além das inserções nomeadas.

## Open Questions

Nenhuma questão bloqueante permanece.

- Quando `README.md` passará a narrar a v1-A28 e a v1-A29. Esta spec não o altera.
- Se uma sessão posterior reexecuta `npm test` ou `npm run validate`. Esta spec não exige essa reexecução e não autoriza escrever o resultado na seção nova.
- Qual das doze evoluções uma emenda posterior escolheria. Esta spec não escolhe e não abre essa emenda.
- Os requisitos ainda indefinidos desse inventário. Cada um bloqueia a spec daquela evolução futura. Nenhum muda os quatro arquivos nem os treze critérios.

---
artifact: spec
id: SPEC-20261022-006
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261022-006
---

# Alinhamento documental interno — emenda v1-A29

## Problem

A v1-A28 está publicada em `8f921897e88eb757164b5625f389026476676aab` (`8f92189`). `LICENSE`, `package.json` e `README.md` já registram a MIT, com `private: true` e `version` `1.0.0-scaffold`. `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md` ainda fecham a sequência na v1-A27 e nomeiam v1-A28 como próximo identificador livre. `.ai/architecture.md` não afirma licença nem identificador livre, e `8f92189` não mudou CLI, `validate()`, skills nem testes. Sem esta spec, o alinhamento teria de inventar quais frases apagar. Evidência: `DECISION-SET-20261022-006` versão 1 e a leitura desses arquivos.

## Goal

Especificar o acréscimo documental que alinha esses quatro registros ao estado publicado da v1-A28, sem aplicar o acréscimo nesta spec. O único objetivo da v1-A29 é esse alinhamento. A v1-A29 não está implementada.

## Scope

- Acrescentar, sem substituir frase histórica, a narração de que a v1-A28 foi publicada em `8f92189`, a licença é MIT, `private` permanece `true`, a versão permanece `1.0.0-scaffold` e o próximo identificador livre é v1-A29.
- Os únicos arquivos dessa narração são `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`.
- Em `references/validation-result.md`, a narração é uma seção nova no topo. As seções já existentes permanecem.
- `.ai/architecture.md` permanece sem edição.
- Esta spec não edita os quatro arquivos.

## Non-goals

- Reabrir a v1-A28 ou editar `LICENSE`, `package.json`, `README.md` ou o manifesto. O `README.md` já registra a MIT e `private: true`.
- Editar `.ai/architecture.md` para repetir MIT, `private`, a versão ou v1-A29.
- Apagar ou reescrever frase que nomeia v1-A25, v1-A26, v1-A27 ou v1-A28 como identificador livre do registro em que aparece.
- Mover a matriz K1–K8 para `validate()` ou para a suíte Node. Ela permanece documental.
- Acrescentar teste, asserção SPDX, comando, skill ou mudança em R1–R17.
- Exigir `npm test` ou `npm run validate` como critério desta spec.
- Registrar duração, contagem ou resultado desses comandos que esta spec não observou.
- Publicar no npm, mudar `private` ou renomear `1.0.0-scaffold`.
- Reescrever ADR-0001, ADR-0002, ADR-0003 ou ADR-0004.
- Incluir os treze caminhos que só diferem no fim de linha.
- Copiar o corpo da licença MIT para os registros.
- Tratar `(LAB-IT)` como conclusão sobre natureza jurídica, sociedade ou titularidade.
- Executar `to-tickets`, `implement`, `docs`, commit ou push nesta spec.

## Actors

- Mantenedor, que delimitou a v1-A29 como alinhamento documental e aprovou `DECISION-SET-20261022-006` versão 1.
- Quem implementar depois acrescenta só os quatro registros. Esta spec não faz esse acréscimo.

## Functional Requirements

1. `.ai/project.md` conserva as duas frases `O próximo identificador livre passa a ser v1-A28.` e, por acréscimo em cada um desses parágrafos, registra a v1-A28 publicada em `8f92189`, a licença MIT, a permanência de `private: true` e de `1.0.0-scaffold`, e o próximo identificador livre v1-A29. Evidência: `DECISION-SET-20261022-006` versão 1 e o texto atual do arquivo.
2. `.ai/project.md` conserva `A frase de 53/53 acima permanece o registro de 2026-10-14.`, `O próximo identificador livre é v1-A25.`, `O próximo identificador livre passa a ser v1-A26.` e `O próximo identificador livre passa a ser v1-A27.` A frase de entrega que cita a matriz K1–K8 da v1-A27, fora da suíte Node, permanece. Evidência: o mesmo conjunto e o arquivo atual.
3. `contracts/skill-contract.md` conserva, no parágrafo de versionamento, as frases que nomeiam v1-A25, v1-A26, v1-A27 e v1-A28 como próximo identificador livre, e a frase `That clause is the state before amendment v1-A27.` O acréscimo registra a v1-A28 publicada em `8f92189` como adoção da MIT, sem mudança de responsabilidade de skill, de R1–R17, das 18 skills, da CLI ou de `validate()`, com `private` permanecendo `true`, a versão permanecendo `1.0.0-scaffold` e o próximo identificador livre v1-A29. A frase `None of these amendments introduces v2 artifact or skill contracts.` permanece. Evidência: o conjunto e o arquivo atual.
4. `references/provenance.md` conserva o parágrafo da v1-A27 que termina com `The next free amendment identifier is v1-A28.` Depois dele, um parágrafo novo registra `8f92189`, MIT, `private` permanecendo `true`, `1.0.0-scaffold`, ausência de mudança em skills, R1–R17, CLI e `validate()`, suíte ainda a dos 78 testes da v1-A26, nenhum teste novo, nenhuma asserção SPDX e o próximo identificador livre v1-A29. Evidência: o conjunto e o arquivo atual.
5. `references/provenance.md` conserva o item das limitações que nomeia v1-A28 como próximo identificador livre e o item que nomeia v1-A24 como estado de registro anterior. Um item novo diz que a frase que nomeia v1-A28 como próximo identificador livre é o estado daquele registro anterior. Evidência: o conjunto.
6. `references/validation-result.md` ganha uma seção nova imediatamente depois do título `# Validation result` e antes de `## State update — known-route reference matrix, v1-A27, 2026-10-22`. A seção diz que registra estado posterior, não substitui as seções abaixo e não muda os resultados delas. Registra a v1-A28 publicada em `8f92189`, a MIT, `private` permanecendo `true`, `1.0.0-scaffold` e o próximo identificador livre v1-A29. Diz que as frases abaixo que nomeiam v1-A28 como próximo identificador livre são o estado anterior a este alinhamento. Diz que não há teste Node novo nem asserção SPDX, e que a contagem de 78 testes permanece o registro da v1-A26. Evidência: o conjunto e o formato da seção da v1-A27.
7. A seção nova de `references/validation-result.md` não contém resultado, duração ou contagem de uma execução de `npm test` ou de `npm run validate`. Esta spec não observou essas execuções. Evidência: a questão aberta do conjunto e o pedido desta spec.
8. A seção já existente da v1-A27 em `references/validation-result.md` conserva `The next free amendment identifier is v1-A28.`, `duration 12123 ms` e `The sentences below that name v1-A27 as the next free identifier are the state before this amendment.` Evidência: o texto atual dessa seção e a decisão de não alterar registros anteriores.
9. Se um dos quatro arquivos citar o aviso de copyright, a linha é exatamente `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. A citação não é obrigatória. `(LAB-IT)` não é declaração sobre natureza jurídica. O corpo da licença, reconhecível por `Permission is hereby granted`, não entra nos quatro arquivos. Evidência: o conjunto e `DECISION-SET-20261022-005` versão 4.
10. `.ai/architecture.md` permanece byte a byte como está. Evidência: a decisão de que não há fato arquitetural novo.

## Business Rules

- O único objetivo da v1-A29 é este alinhamento. A v1-A28 permanece a emenda publicada em `8f92189` e não é reaberta. Evidência: `DECISION-SET-20261022-006` versão 1.
- Frase histórica que nomeia um identificador livre permanece. O identificador livre corrente, v1-A29, entra por acréscimo. Evidência: a decisão que rejeitou apagar essas frases e o precedente `283c1f2`.
- A matriz K1–K8 continua fora de `validate()` e fora da suíte Node. Evidência: o texto atual dos registros e a decisão de que `8f92189` não alterou `validate()`.
- `private` permanece `true`. A versão permanece `1.0.0-scaffold`. A MIT não autoriza publicação no npm. Evidência: o conjunto.
- O aviso, se citado, é a linha aprovada. Essa linha não conclui natureza jurídica de LAB-IT. Evidência: `DECISION-SET-20261022-005` versão 4.

## Non-functional Requirements

- Cada critério se verifica por leitura do texto ou por `git diff`, sem `npm test`, sem `npm run validate` e sem publicação.
- Acréscimo não reescreve o parágrafo ou a seção que conserva. A frase antiga continua presente e a frase nova vem depois.
- Resultado de suíte que esta spec não observou não entra na seção nova.

## Technical Constraints

- Arquivos autorizados na implementação futura: `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`.
- `.ai/architecture.md`, `LICENSE`, `package.json`, `README.md`, `manifest/skills.json`, as 18 skills, `contracts/routing.md`, a CLI, o validador e ADR-0001 a ADR-0004 permanecem.
- `docs` não escreve estes caminhos. `.ai/config.json` define `docsPath` como `docs`. O precedente aplicável é o acréscimo de `283c1f2`, não uma execução de `docs`. Evidência: o conjunto e `DOC-20261022-004`.
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

- Nenhum segredo entra nos quatro arquivos. O único texto de identificação permitido, e só se o aviso for citado, é `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`.
- Essa linha não autoriza inferir personalidade jurídica, sociedade ou titularidade além do que o texto contém.
- O corpo da licença MIT não é copiado para o repositório por esta emenda. Ele já está em `LICENSE`, que permanece fora do diff.

## Acceptance Criteria

1. O diff de conteúdo da implementação, ignorando fim de linha, contém só `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`. `.ai/architecture.md` não aparece.
2. `LICENSE`, `package.json`, `README.md`, `manifest/skills.json`, `contracts/routing.md`, a CLI, o validador, as 18 skills e os quatro ADRs não aparecem nesse diff.
3. Os treze caminhos listados em Technical Constraints não aparecem nesse diff. `git diff --ignore-cr-at-eol` em cada um fica vazio.
4. `.ai/project.md` ainda contém as duas ocorrências de `O próximo identificador livre passa a ser v1-A28.` e também contém `8f92189`, `MIT`, `private: true`, `1.0.0-scaffold` e `v1-A29` acrescentados nesses parágrafos.
5. `.ai/project.md` ainda contém `A frase de 53/53 acima permanece o registro de 2026-10-14.`, `O próximo identificador livre é v1-A25.`, `O próximo identificador livre passa a ser v1-A26.`, `O próximo identificador livre passa a ser v1-A27.` e a frase da matriz K1–K8 fora da suíte Node.
6. `contracts/skill-contract.md` ainda contém `The next free amendment identifier is v1-A25.`, `The next free amendment identifier is v1-A26.`, `The next free amendment identifier is v1-A27.`, `The next free amendment identifier is v1-A28.`, `That clause is the state before amendment v1-A27.` e `None of these amendments introduces v2 artifact or skill contracts.` O acréscimo contém `8f92189`, `MIT`, `1.0.0-scaffold` e `v1-A29`, e afirma que `private` permanece `true` e que skills, R1–R17, CLI e `validate()` não mudam.
7. `references/provenance.md` ainda contém o parágrafo da v1-A27 terminado em `The next free amendment identifier is v1-A28.` O parágrafo novo contém `8f92189`, `MIT`, `1.0.0-scaffold`, `v1-A29`, a permanência de `private` `true`, a suíte de 78 testes da v1-A26, nenhum teste novo e nenhuma asserção SPDX.
8. `references/provenance.md` ainda contém o item que nomeia v1-A24 como estado anterior e o item que nomeia v1-A28 como próximo identificador livre. Um item novo diz que essa nomeação de v1-A28 é o estado do registro anterior.
9. Em `references/validation-result.md`, a primeira seção `##` depois do título é a seção nova da v1-A28. A seção `## State update — known-route reference matrix, v1-A27, 2026-10-22` continua logo abaixo e ainda contém `The next free amendment identifier is v1-A28.`, `duration 12123 ms` e `The sentences below that name v1-A27 as the next free identifier are the state before this amendment.`
10. A seção nova nomeia `8f92189`, `MIT`, `1.0.0-scaffold` e `v1-A29`, afirma que `private` permanece `true`, que a seção não substitui as de baixo, que as frases abaixo que nomeiam v1-A28 como próximo identificador livre são o estado anterior, e que a contagem de 78 testes permanece a suíte da v1-A26. Essa seção não contém `npm test` nem `npm run validate`.
11. Nenhum dos quatro arquivos contém `Permission is hereby granted`. Se `Copyright (c)` aparecer num deles, a linha inteira é `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`.
12. O diff não acrescenta arquivo de teste, não altera a suíte Node e não cria asserção SPDX. `npm test` e `npm run validate` não são necessários para aceitar este alinhamento.

## Risks

- Tratar as frases que ainda dizem v1-A28 como identificador livre como erro e apagá-las. O critério 4, o 6 e o 8 fecham esse risco: elas permanecem como estado do registro anterior.
- Inserir MIT em `.ai/architecture.md` porque `283c1f2` tocou esse arquivo. O critério 1 rejeita essa edição.
- Preencher a seção nova com duração ou contagem copiadas da seção da v1-A27. O critério 10 rejeita `npm test` e `npm run validate` nessa seção.
- Ler `(LAB-IT)` como natureza jurídica. A regra de negócio e o critério 11 limitam o texto à linha aprovada.

## Open Questions

Nenhuma questão bloqueante permanece.

- Se uma sessão posterior reexecuta `npm test` ou `npm run validate`. Esta spec não exige essa reexecução e não autoriza escrever o resultado na seção nova. A questão não muda os quatro arquivos nem os doze critérios.

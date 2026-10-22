---
artifact: ticket_set
id: TICKET-SET-20261022-006
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261022-006
---

# Alinhamento documental interno — emenda v1-A29

Conjunto executável derivado de `SPEC-20261022-006` versão 1. Cada bloco é um TICKET. O Markdown local é a fonte. Nenhum ticket publica issue remota. Esta execução não inicia os tickets e não invoca `implement`.

O único objetivo é o acréscimo documental nos quatro registros. A v1-A28 permanece publicada em `8f92189`. A v1-A29 não está implementada. R8 não se aplica: não há termo de negócio, invariante, transição, evento ou fronteira de contexto novos. R9 não se aplica: a spec não muda fronteira de módulo, interface, modelo de dados, contrato de integração, infraestrutura, fronteira de segurança, concorrência nem implantação. Não há modelo de domínio nem desenho de arquitetura para este objetivo. `npm test` e `npm run validate` não são critério.

Rastreio dos doze critérios de aceite da spec:

| Critério | Ticket |
|---|---|
| 1. Diff de conteúdo só nos quatro arquivos; `.ai/architecture.md` ausente | 05; cada ticket 01–04 edita só o seu arquivo |
| 2. `LICENSE`, `package.json`, `README.md`, manifesto, roteamento, CLI, validador, 18 skills e ADR-0001 a ADR-0004 ausentes | 05 |
| 3. Treze caminhos de fim de linha ausentes e com diff vazio ao ignorar fim de linha | 05 |
| 4. `.ai/project.md` conserva as duas frases de v1-A28 e acrescenta `8f92189`, MIT, `private: true`, `1.0.0-scaffold` e v1-A29 | 01, conferido de novo no 05 |
| 5. `.ai/project.md` conserva 53/53, v1-A25, v1-A26, v1-A27 e a matriz K1–K8 fora da suíte Node | 01, conferido de novo no 05 |
| 6. `contracts/skill-contract.md` conserva v1-A25 a v1-A28 e acrescenta o estado da v1-A28 | 02, conferido de novo no 05 |
| 7. `references/provenance.md` conserva o parágrafo da v1-A27 e acrescenta o parágrafo da v1-A28 | 03, conferido de novo no 05 |
| 8. `references/provenance.md` conserva os itens de v1-A24 e v1-A28 e acrescenta o item de estado anterior | 03, conferido de novo no 05 |
| 9. Seção nova no topo de `references/validation-result.md`; seção da v1-A27 conserva `duration 12123 ms` | 04, conferido de novo no 05 |
| 10. Seção nova nomeia os cinco fatos e não contém `npm test` nem `npm run validate` | 04, conferido de novo no 05 |
| 11. Sem corpo da MIT; aviso, se citado, na linha exata | 01, 02, 03 e 04, conferido de novo no 05 |
| 12. Sem teste novo, sem asserção SPDX, sem exigir `npm test` ou `npm run validate` | 05; exclusão também nos tickets 01–04 |

## Title

01 — Acréscimo em `.ai/project.md`

## Goal

Acrescentar, nos dois parágrafos que fecham o identificador livre em v1-A28, o estado publicado da v1-A28, sem apagar frase histórica.

## Context

Critérios 4, 5 e 11 de `SPEC-20261022-006`. O arquivo hoje contém duas vezes `O próximo identificador livre passa a ser v1-A28.` Também contém a frase de 53/53, `O próximo identificador livre é v1-A25.`, `O próximo identificador livre passa a ser v1-A26.`, `O próximo identificador livre passa a ser v1-A27.` e a entrega da matriz K1–K8 fora da suíte Node. Evidência: Functional Requirements 1 e 2 e Acceptance Criteria 4 e 5 da spec.

## Scope

- Editar somente `.ai/project.md`.
- Conservar as duas frases `O próximo identificador livre passa a ser v1-A28.`
- Depois de cada uma, no mesmo parágrafo, acrescentar que a v1-A28 foi publicada em `8f92189`, que a licença é MIT, que `private: true` permanece, que a versão permanece `1.0.0-scaffold` e que o próximo identificador livre é v1-A29.
- Conservar as frases históricas nomeadas no critério 5.

## Out of Scope

- Apagar ou reescrever frase que nomeia v1-A25, v1-A26, v1-A27 ou v1-A28 como identificador livre.
- Reescrever a frase de entrega da matriz K1–K8.
- `contracts/skill-contract.md`, `references/provenance.md`, `references/validation-result.md` e `.ai/architecture.md`.
- `LICENSE`, `package.json`, `README.md`, manifesto, CLI, validador, skills, ADRs e os treze caminhos de fim de linha.
- Corpo da licença MIT e conclusão jurídica sobre `(LAB-IT)`.
- Teste novo, asserção SPDX, `npm test` e `npm run validate`.

## Dependencies

Nenhuma. `SPEC-20261022-006` já está `ready`.

## Implementation Notes

O acréscimo vem depois da frase antiga. A frase antiga permanece. Não citar o aviso de copyright, salvo se uma frase do acréscimo precisar dele; nesse caso a linha inteira é `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. `(LAB-IT)` não é natureza jurídica. Não inserir `Permission is hereby granted`. Evidência: critério 11 e Security / Privacy da spec.

## Acceptance Criteria

- As duas ocorrências de `O próximo identificador livre passa a ser v1-A28.` permanecem, e cada parágrafo passa a conter também `8f92189`, `MIT`, `private: true`, `1.0.0-scaffold` e `v1-A29`. Evidência: critério 4 da spec.
- Permanecem `A frase de 53/53 acima permanece o registro de 2026-10-14.`, `O próximo identificador livre é v1-A25.`, `O próximo identificador livre passa a ser v1-A26.`, `O próximo identificador livre passa a ser v1-A27.` e a frase da matriz K1–K8 fora da suíte Node. Evidência: critério 5 da spec.
- O arquivo não contém `Permission is hereby granted`. Se `Copyright (c)` aparecer, a linha é exatamente `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. Evidência: critério 11 da spec.

## Validation

Leitura de `.ai/project.md` e diff limitado a esse arquivo. As frases históricas continuam presentes. Nenhuma execução de `npm test` ou `npm run validate`.

## Definition of Done

Os dois parágrafos conservam o fechamento em v1-A28 e ganham o estado da v1-A28 e o identificador v1-A29. As frases do critério 5 permanecem. Nenhum outro arquivo deste ticket muda.

## Title

02 — Acréscimo em `contracts/skill-contract.md`

## Goal

Acrescentar, no parágrafo de versionamento, a v1-A28 publicada como adoção da MIT, sem apagar as frases que nomeiam identificadores livres anteriores.

## Context

Critérios 6 e 11 de `SPEC-20261022-006`. O parágrafo conserva as frases de próximo identificador v1-A25, v1-A26, v1-A27 e v1-A28, a frase `That clause is the state before amendment v1-A27.` e a frase `None of these amendments introduces v2 artifact or skill contracts.` Evidência: Functional Requirement 3 e Acceptance Criterion 6 da spec.

## Scope

- Editar somente `contracts/skill-contract.md`.
- Conservar as quatro frases `The next free amendment identifier is v1-A25.`, `The next free amendment identifier is v1-A26.`, `The next free amendment identifier is v1-A27.` e `The next free amendment identifier is v1-A28.`
- Conservar `That clause is the state before amendment v1-A27.` e `None of these amendments introduces v2 artifact or skill contracts.`
- Acrescentar que a v1-A28, publicada em `8f92189`, adota a MIT, não muda responsabilidade de skill, R1–R17, as 18 skills, a CLI nem `validate()`, mantém `private` `true` e `1.0.0-scaffold`, e deixa v1-A29 como próximo identificador livre.

## Out of Scope

- Apagar ou reescrever as frases de identificador livre já escritas.
- Mudar o texto normativo de R1–R17, o catálogo ou o comportamento de `validate()`.
- Os outros três registros, `.ai/architecture.md`, `LICENSE`, `package.json`, `README.md`, manifesto, CLI, validador, skills, ADRs e os treze caminhos.
- Corpo da licença MIT, teste novo e asserção SPDX.
- `npm test` e `npm run validate`.

## Dependencies

Nenhuma. Sem ciclo com o ticket 01.

## Implementation Notes

O acréscimo fica no parágrafo de versionamento, depois da frase que nomeia v1-A28, e não substitui essa frase. A frase sobre contratos v2 permanece. Não inserir `Permission is hereby granted`. O aviso de copyright não é obrigatório; se entrar, a linha inteira é `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. Evidência: critério 11 da spec.

## Acceptance Criteria

- Permanecem `The next free amendment identifier is v1-A25.`, `The next free amendment identifier is v1-A26.`, `The next free amendment identifier is v1-A27.`, `The next free amendment identifier is v1-A28.`, `That clause is the state before amendment v1-A27.` e `None of these amendments introduces v2 artifact or skill contracts.` Evidência: critério 6 da spec.
- O acréscimo contém `8f92189`, `MIT`, `1.0.0-scaffold` e `v1-A29`, afirma que `private` permanece `true` e que skills, R1–R17, CLI e `validate()` não mudam. Evidência: critério 6 da spec.
- O arquivo não contém `Permission is hereby granted`. Se `Copyright (c)` aparecer, a linha é exatamente `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. Evidência: critério 11 da spec.

## Validation

Leitura do parágrafo de versionamento e diff limitado a `contracts/skill-contract.md`. As frases antigas continuam no arquivo. Sem `npm test` e sem `npm run validate`.

## Definition of Done

O parágrafo conserva os identificadores livres anteriores e o acréscimo registra a v1-A28 publicada, a MIT e v1-A29. Nenhum outro arquivo deste ticket muda.

## Title

03 — Acréscimo em `references/provenance.md`

## Goal

Acrescentar o parágrafo da v1-A28 e um item nas limitações, conservando o parágrafo e os itens que já nomeiam identificadores livres.

## Context

Critérios 7, 8 e 11 de `SPEC-20261022-006`. O parágrafo da v1-A27 termina com `The next free amendment identifier is v1-A28.` As limitações já têm um item que nomeia v1-A24 como estado anterior e um item que nomeia v1-A28 como próximo identificador livre. Evidência: Functional Requirements 4 e 5 e Acceptance Criteria 7 e 8 da spec.

## Scope

- Editar somente `references/provenance.md`.
- Conservar o parágrafo da v1-A27 que termina com `The next free amendment identifier is v1-A28.`
- Inserir depois dele um parágrafo com `8f92189`, MIT, `private` permanecendo `true`, `1.0.0-scaffold`, ausência de mudança em skills, R1–R17, CLI e `validate()`, suíte ainda a dos 78 testes da v1-A26, nenhum teste novo, nenhuma asserção SPDX e o próximo identificador livre v1-A29.
- Conservar o item que nomeia v1-A24 como estado anterior e o item que nomeia v1-A28 como próximo identificador livre.
- Acrescentar um item que diz que a nomeação de v1-A28 como próximo identificador livre é o estado daquele registro anterior.

## Out of Scope

- Substituir o parágrafo da v1-A27 ou os itens de v1-A24 e v1-A28.
- Dizer que a matriz K1–K8 entrou em `validate()` ou na suíte Node.
- Os outros três registros, `.ai/architecture.md`, `LICENSE`, `package.json`, `README.md`, manifesto, CLI, validador, skills, ADRs e os treze caminhos.
- Corpo da licença MIT, teste novo e asserção SPDX.
- `npm test` e `npm run validate`.

## Dependencies

Nenhuma. Sem ciclo com os tickets 01 e 02.

## Implementation Notes

Parágrafo novo e item novo são acréscimos. O número 78 é o registro já escrito da suíte da v1-A26, não resultado de uma execução nova. Não inventar duração. Não inserir `Permission is hereby granted`. O aviso não é obrigatório; se entrar, a linha inteira é `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. Evidência: critérios 7, 8 e 11 da spec.

## Acceptance Criteria

- O parágrafo da v1-A27 terminado em `The next free amendment identifier is v1-A28.` permanece. O parágrafo novo contém `8f92189`, `MIT`, `1.0.0-scaffold`, `v1-A29`, a permanência de `private` `true`, a suíte de 78 testes da v1-A26, nenhum teste novo e nenhuma asserção SPDX. Evidência: critério 7 da spec.
- Permanecem o item que nomeia v1-A24 como estado anterior e o item que nomeia v1-A28 como próximo identificador livre. O item novo diz que essa nomeação de v1-A28 é o estado do registro anterior. Evidência: critério 8 da spec.
- O arquivo não contém `Permission is hereby granted`. Se `Copyright (c)` aparecer, a linha é exatamente `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. Evidência: critério 11 da spec.

## Validation

Leitura do parágrafo da v1-A27, do parágrafo novo e dos itens de limitações. Diff limitado a `references/provenance.md`. Sem execução de suíte.

## Definition of Done

O registro da v1-A27 permanece, o parágrafo da v1-A28 e o item de estado anterior entram por acréscimo, e nenhum outro arquivo deste ticket muda.

## Title

04 — Seção nova no topo de `references/validation-result.md`

## Goal

Inserir a seção de estado da v1-A28 antes da seção da v1-A27, sem alterar essa seção nem registrar suíte não observada.

## Context

Critérios 9, 10 e 11 de `SPEC-20261022-006`. A primeira seção atual é `## State update — known-route reference matrix, v1-A27, 2026-10-22`. Ela contém `The next free amendment identifier is v1-A28.`, `duration 12123 ms` e `The sentences below that name v1-A27 as the next free identifier are the state before this amendment.` Esta spec não observou `npm test` nem `npm run validate`. Evidência: Functional Requirements 6, 7 e 8 e Acceptance Criteria 9 e 10 da spec.

## Scope

- Editar somente `references/validation-result.md`.
- Inserir uma seção `##` imediatamente depois de `# Validation result` e antes da seção da v1-A27.
- Nessa seção, registrar estado posterior, sem substituir as seções de baixo e sem mudar os resultados delas.
- Nomear `8f92189`, MIT, `private` permanecendo `true`, `1.0.0-scaffold` e v1-A29.
- Dizer que as frases abaixo que nomeiam v1-A28 como próximo identificador livre são o estado anterior a este alinhamento.
- Dizer que não há teste Node novo nem asserção SPDX, e que a contagem de 78 testes permanece a suíte da v1-A26.
- Conservar na seção da v1-A27 as três frases `The next free amendment identifier is v1-A28.`, `duration 12123 ms` e `The sentences below that name v1-A27 as the next free identifier are the state before this amendment.`

## Out of Scope

- Reescrever a seção da v1-A27 ou qualquer seção abaixo dela.
- Escrever `npm test`, `npm run validate`, duração ou contagem de uma execução nova na seção nova.
- Copiar `duration 12123 ms` para a seção nova.
- Os outros três registros, `.ai/architecture.md`, `LICENSE`, `package.json`, `README.md`, manifesto, CLI, validador, skills, ADRs e os treze caminhos.
- Corpo da licença MIT, teste novo e asserção SPDX.

## Dependencies

Nenhuma. Sem ciclo com os tickets 01, 02 e 03.

## Implementation Notes

A seção nova fica no topo. A seção da v1-A27 permanece a segunda e o texto dela, inclusive `duration 12123 ms`, não é editado. A contagem de 78 testes na seção nova é remissão ao registro da v1-A26, não resultado observado nesta emenda. Não inserir `Permission is hereby granted`. O aviso não é obrigatório; se entrar, a linha inteira é `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. Evidência: critérios 9, 10 e 11 da spec.

## Acceptance Criteria

- A primeira seção `##` é a seção nova da v1-A28. A seção `## State update — known-route reference matrix, v1-A27, 2026-10-22` continua imediatamente abaixo e ainda contém `The next free amendment identifier is v1-A28.`, `duration 12123 ms` e `The sentences below that name v1-A27 as the next free identifier are the state before this amendment.` Evidência: critério 9 da spec.
- A seção nova nomeia `8f92189`, `MIT`, `1.0.0-scaffold` e `v1-A29`, afirma que `private` permanece `true`, que não substitui as seções de baixo, que as frases abaixo que nomeiam v1-A28 como próximo identificador livre são o estado anterior, e que a contagem de 78 testes permanece a suíte da v1-A26. Essa seção não contém `npm test` nem `npm run validate`. Evidência: critério 10 da spec.
- O arquivo não ganha `Permission is hereby granted` na seção nova. Se `Copyright (c)` aparecer no acréscimo, a linha é exatamente `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. Evidência: critério 11 da spec.

## Validation

Leitura da ordem das seções e busca, na seção nova, por `npm test` e `npm run validate`. A seção da v1-A27 continua com `duration 12123 ms`. Diff limitado a `references/validation-result.md`. Sem executar a suíte.

## Definition of Done

A seção nova está no topo, a seção da v1-A27 permanece com `duration 12123 ms`, e a seção nova não registra suíte. Nenhum outro arquivo deste ticket muda.

## Title

05 — Conferência dos doze critérios e do limite de arquivos

## Goal

Reler os doze critérios de `SPEC-20261022-006` e confirmar que o alinhamento alterou somente os quatro registros.

## Context

Os critérios 4 e 5 nascem no ticket 01, o 6 no ticket 02, os 7 e 8 no ticket 03 e os 9 e 10 no ticket 04. O critério 11 nasce nos quatro. Os critérios 1, 2, 3 e 12 só fecham depois desses quatro. Evidência: a tabela de rastreio deste conjunto e Acceptance Criteria 1, 2, 3 e 12 da spec.

## Scope

- Reler `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md` contra os critérios 4 a 11.
- Confirmar que `.ai/architecture.md` não mudou.
- Confirmar que o diff de conteúdo do alinhamento, ignorando fim de linha, não inclui outro caminho de produto.
- Confirmar que não há arquivo de teste novo nem asserção SPDX.

## Out of Scope

- Nova frase além das que os tickets 01 a 04 já exigem.
- Corrigir um critério falho neste ticket. Critério falho devolve o ticket dono do arquivo.
- `npm test`, `npm run validate`, publicação, `docs`, `handoff` e issue remota.
- Alterar os treze caminhos:
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

A conferência lê e compara. Não acrescenta prosa. `git diff --ignore-cr-at-eol` nos treze caminhos permanece vazio. `.ai/architecture.md` permanece byte a byte. O diff de conteúdo do alinhamento fica nos quatro registros. Não tratar `(LAB-IT)` como natureza jurídica. Não inventar duração nem resultado de suíte. Evidência: Non-functional Requirements e critérios 1, 2, 3, 11 e 12 da spec.

## Acceptance Criteria

- Os critérios 4 e 5 da spec passam de novo em `.ai/project.md`. Evidência: ticket 01.
- O critério 6 da spec passa de novo em `contracts/skill-contract.md`. Evidência: ticket 02.
- Os critérios 7 e 8 da spec passam de novo em `references/provenance.md`. Evidência: ticket 03.
- Os critérios 9 e 10 da spec passam de novo em `references/validation-result.md`, inclusive a permanência de `duration 12123 ms` na seção da v1-A27 e a ausência de `npm test` e `npm run validate` na seção nova. Evidência: ticket 04.
- O diff de conteúdo, ignorando fim de linha, contém só `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`. `.ai/architecture.md` não aparece. Evidência: critério 1 da spec.
- `LICENSE`, `package.json`, `README.md`, `manifest/skills.json`, `contracts/routing.md`, a CLI, o validador, as 18 skills e ADR-0001 a ADR-0004 não aparecem nesse diff. Evidência: critério 2 da spec.
- Os treze caminhos não aparecem nesse diff, e `git diff --ignore-cr-at-eol` em cada um fica vazio. Evidência: critério 3 da spec.
- Nenhum dos quatro arquivos contém `Permission is hereby granted`. Se `Copyright (c)` aparecer, a linha é exatamente `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. Evidência: critério 11 da spec.
- O diff não acrescenta arquivo de teste nem asserção SPDX. `npm test` e `npm run validate` não são executados para aceitar o alinhamento. Evidência: critério 12 da spec.

## Validation

Leitura dos quatro arquivos contra os doze critérios. Diff de conteúdo limitado aos quatro caminhos. `.ai/architecture.md` sem diff. Diff com fim de linha ignorado nos treze caminhos vazio. Sem suíte e sem publicação.

## Definition of Done

Os doze critérios têm ticket de origem, a conferência os relê e o alinhamento não altera arquivo fora dos quatro registros.

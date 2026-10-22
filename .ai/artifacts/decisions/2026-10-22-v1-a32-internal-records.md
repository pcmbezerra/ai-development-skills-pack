---
artifact: decision_set
id: DECISION-SET-20261022-009
version: 1
status: ready
created_by: clarify
inputs:
  - maintainer-request-2026-10-22-v1-a32-internal-records
  - 6e4173b384da53ea01913723dea657852075cf75
  - 0dde35ffcab4b55f9631f2012f8f979a2a888514
  - 7a4d22c0d30b73996380673ae993b4a92621e3e2
  - DECISION-SET-20261022-007
  - DECISION-SET-20261022-008
  - HANDOFF-20261022-007
  - HANDOFF-20261022-008
  - REVIEW-20261022-009
  - REVIEW-20261022-008
  - ADR-0001
  - ADR-0002
  - ADR-0003
  - ADR-0004
  - .ai/project.md
  - .ai/architecture.md
  - contracts/skill-contract.md
  - contracts/skills/implement.md
  - contracts/skills/docs.md
  - contracts/quality-gates.md
  - contracts/artifacts.md
  - references/provenance.md
  - references/validation-result.md
  - references/architecture-contract-v1.md
  - package.json
  - README.md
---

## Objective

Alinhar, numa possível emenda v1-A32 ainda não implementada, os quatro registros internos às emendas v1-A30 e v1-A31 já publicadas, sem apagar a narração anterior. O único objetivo autorizado é esse alinhamento documental. A mudança de processo que evitaria outra emenda só para atualizar hash, status ou identificador livre fica recomendada e fora desta emenda. Esta execução não edita os registros.

## Resolved Decisions

- O único objetivo da possível v1-A32 é o alinhamento documental de `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md` ao estado publicado da v1-A30 e da v1-A31. A v1-A32 não está implementada e não está publicada. Esta execução não a implementa. Evidência: a mensagem desta execução e a ausência de artefato `v1-A32` antes deste conjunto.
- A v1-A30 está publicada. O commit verificado é `6e4173b384da53ea01913723dea657852075cf75` (`6e4173b`), mensagem `Align the internal records for amendment v1-A30.`, pai `7a4d22c0d30b73996380673ae993b4a92621e3e2`. O diff é os artefatos da v1-A30 e os quatro registros. Não inclui `LICENSE`, `package.json`, `README.md`, manifesto, CLI, validador, skills nem ADRs. Evidência: `git log -1` e `git show --stat` deste SHA nesta execução.
- A v1-A31 está publicada. O commit verificado é `0dde35ffcab4b55f9631f2012f8f979a2a888514` (`0dde35f`), mensagem `Add the offline SPDX MIT assertion for amendment v1-A31.`, pai `6e4173b384da53ea01913723dea657852075cf75`. O diff é os artefatos da v1-A31, `package.json`, `tests/spdx-mit.test.mjs` e `tests/spdx-mit.txt`. Não inclui os quatro registros. Evidência: `git log -1` e `git show --stat` deste SHA nesta execução.
- `HEAD` é `0dde35f`, na branch `main`. A ref local `origin/main` aponta para o mesmo SHA. `git rev-list --left-right --count origin/main...HEAD` devolve `0	0`. Esta execução não fez `git fetch` e não consultou o servidor de novo. O que está verificado é o commit, `HEAD` e a ref de rastreamento local. Evidência: `git rev-parse`, `git branch -vv` e a mensagem.
- Nenhuma emenda está aberta no índice. O índice está vazio. O diff de conteúdo, ignorando fim de linha, está vazio. Os únicos caminhos modificados são os treze de fim de linha. Evidência: `git status --short`, `git diff --cached --name-only` e `git diff --ignore-cr-at-eol --numstat`.
- `HANDOFF-20261022-007` registrou a v1-A30 ainda fora de commit, com `HEAD` em `7a4d22c`. `HANDOFF-20261022-008` registrou a v1-A31 no working tree e não publicada, com `HEAD` em `6e4173b`. Essas frases são o estado anterior à publicação. Este conjunto não reescreve esses handoffs. `DECISION-SET-20261022-007` e `DECISION-SET-20261022-008` permanecem como estão. Evidência: esses arquivos.
- O estado que os quatro registros devem passar a narrar, por acréscimo, é: v1-A30 publicada em `6e4173b`; v1-A31 publicada em `0dde35f`; a asserção SPDX determinística e offline introduzida na v1-A31; a licença permanece MIT; `private` permanece `true`; a versão permanece `1.0.0-scaffold`; o próximo identificador livre é v1-A32. A v1-A30 não adota a licença e não introduz a asserção. Quem adotou a MIT foi a v1-A28. Quem introduziu a asserção foi a v1-A31. Evidência: a mensagem, `package.json` (`license` `MIT`, `private` `true`, `version` `1.0.0-scaffold`, `scripts.test` com `tests/spdx-mit.test.mjs` no fim) e os dois `git show --stat`.
- `REVIEW-20261022-009` registrou, para a v1-A31, `npm test` 86/86, duração 12008.531625 ms, saída 0, e `npm run validate` com `PASS: 18 skills`, saída 0, em Node.js v26.5.0, npm 11.17.0 e Darwin 25.6.0 arm64. A narração da v1-A31 cita esse registro. Esta execução não rodou `npm test` nem `npm run validate` e não inventa outra contagem, outra duração nem outro ambiente. A contagem de 78 testes permanece o registro da v1-A26 e o da v1-A30, que não acrescentou teste. `REVIEW-20261022-008` não executou a suíte. Evidência: esses dois reviews e a mensagem.
- As frases históricas permanecem. Isso inclui as duas frases de `.ai/project.md`, `O próximo identificador livre passa a ser v1-A30.`, a frase de `contracts/skill-contract.md`, `The next free amendment identifier is v1-A30.`, e as frases de `references/provenance.md` e `references/validation-result.md` que nomeiam v1-A30 como identificador livre. Também permanecem as frases `No SPDX assertion was added` da v1-A28, da v1-A29 e do texto que a v1-A30 gravou. Nenhuma dessas frases é afirmação a apagar. Os quatro registros não contêm frase que nomeie v1-A31 como identificador livre. Não se inventa uma frase antiga com esse teor. O precedente é `6e4173b`, que acrescentou o estado novo e conservou as frases anteriores. Evidência: leitura dos quatro registros nesta execução e a mensagem.
- `.ai/project.md` necessita de acréscimo nos dois parágrafos que terminam com `O próximo identificador livre passa a ser v1-A30.` Essas duas frases permanecem. O acréscimo, depois de cada uma e no mesmo parágrafo, registra a v1-A30 publicada em `6e4173b`, a v1-A31 publicada em `0dde35f`, a asserção SPDX offline introduzida na v1-A31, a permanência da MIT, de `private: true` e de `1.0.0-scaffold`, e o próximo identificador v1-A32. Não reescreve as frases de v1-A22 a v1-A29 nem as que nomeiam um identificador anterior como livre. Não acrescenta roadmap nem mudança de processo. Evidência: leitura de `.ai/project.md` nesta execução.
- `contracts/skill-contract.md` necessita de acréscimo no parágrafo de versionamento. A frase `The next free amendment identifier is v1-A30.` permanece, imediatamente antes de `None of these amendments introduces v2 artifact or skill contracts.` O acréscimo entra entre essas duas frases. Registra a v1-A30 publicada em `6e4173b` como alinhamento dos registros internos, sem mudança de responsabilidade de skill, de R1–R17, das 18 skills, da CLI ou de `validate()`, e sem asserção SPDX. Registra a v1-A31 publicada em `0dde35f` como a asserção SPDX offline na suíte Node, sem mudança de responsabilidade de skill, de R1–R17, das 18 skills, da CLI ou de `validate()`. `private` `true` e `1.0.0-scaffold` permanecem. O próximo identificador é v1-A32. As frases que nomeiam v1-A25, v1-A26, v1-A27, v1-A28, v1-A29 e v1-A30 como identificador livre daquele trecho permanecem. Evidência: leitura de `contracts/skill-contract.md` nesta execução.
- `references/provenance.md` necessita de dois acréscimos no formato já usado. Depois do parágrafo `## Amendment v1-A29 — internal records, 2026-10-22`, e antes de `## Representation choices and remaining limitations`, entram o registro da v1-A30 e o da v1-A31. O parágrafo da v1-A29 que termina com o próximo identificador v1-A30 permanece. O registro da v1-A30 diz `6e4173b`, alinhamento à v1-A29, MIT, `private` `true` e `1.0.0-scaffold` permanecendo, ausência de mudança em skills, R1–R17, CLI e `validate()`, suíte ainda a dos 78 testes da v1-A26, nenhum teste novo e nenhuma asserção SPDX nessa emenda. O registro da v1-A31 diz `0dde35f`, asserção SPDX offline introduzida nessa emenda, os mesmos três campos permanecendo, ausência de mudança em skills, R1–R17, CLI e `validate()`, e a evidência de `REVIEW-20261022-009`. O próximo identificador livre narrado no registro da v1-A31 é v1-A32. Nas limitações, depois do item da v1-A29, entram dois itens. O item da v1-A30 diz que a frase anterior que nomeia v1-A30 como identificador livre é o estado daquele registro. O item da v1-A31 diz que a frase `No SPDX assertion was added` nos registros anteriores permanece o estado da v1-A28, da v1-A29 e da v1-A30. Evidência: leitura de `references/provenance.md` nesta execução.
- `references/validation-result.md` necessita de duas seções novas de state update no topo, acima de `## State update — internal records, v1-A29, 2026-10-22`. A primeira é a da v1-A31. A segunda é a da v1-A30. A seção da v1-A29 permanece a terceira e não é reescrita. Nenhuma seção nova substitui as seções abaixo nem altera resultados, contagens ou observações de host já escritas. A seção da v1-A30 registra `6e4173b`, a permanência da MIT, de `private` `true` e de `1.0.0-scaffold`, nenhum teste novo, nenhuma asserção SPDX nessa emenda, e que as frases abaixo que nomeiam v1-A30 como identificador livre são o estado anterior a este alinhamento. Não contém `npm test` nem `npm run validate`. A seção da v1-A31 registra `0dde35f`, a asserção SPDX offline, a permanência dos três campos, o próximo identificador v1-A32, e cita `REVIEW-20261022-009` com 86/86 e `PASS: 18 skills`. Declara que as frases `No SPDX assertion was added` abaixo permanecem o estado anterior à v1-A31. Não inventa duração nem resultado além desse review. Evidência: leitura de `references/validation-result.md`, `REVIEW-20261022-008` e `REVIEW-20261022-009`.
- `.ai/architecture.md` não necessita de edição. Não afirma licença, `private`, versão de pacote nem identificador livre. A v1-A31 não alterou CLI nem `validate()`. Não há fato arquitetural novo. Repetir os dois commits aqui seria edição artificial. A v1-A32 não o edita. Evidência: leitura de `.ai/architecture.md` e `git show --stat 0dde35f`.
- `README.md` permanece fora. A linha 5 ainda fecha a lista de emendas na v1-A27. A linha 112 já registra a MIT e `private: true`. Essa defasagem não entra na v1-A32. `LICENSE`, `package.json` e o manifesto também permanecem fora. Evidência: `README.md` e a mensagem, que nomeia só os quatro registros.
- ADR-0001, ADR-0002, ADR-0003 e ADR-0004 permanecem como estão. Nenhum deles escolhe o narrador dos registros internos nem exige que o hash do commit futuro esteja nesses quatro arquivos antes da publicação. Esta execução não os reescreve. Evidência: a mensagem e `DECISION-SET-20261022-007`.
- A matriz K1–K8 permanece documental. Ela valida casos conhecidos e não mede automaticamente toda a similaridade semântica entre skills. A v1-A32 não a altera. Evidência: os quatro registros e `.ai/architecture.md`.
- Os treze caminhos abaixo continuam somente com diferença de fim de linha. `git diff --ignore-cr-at-eol --numstat` neles fica vazio. O índice está vazio. Esta execução não os adiciona, restaura ou reescreve. A v1-A32 também não os inclui. Evidência: `git status --short` e `git diff --ignore-cr-at-eol --numstat` nesta execução.
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
- A recorrência tem causa observada, não um contrato que exija o hash futuro. Cada alinhamento é escrito antes do commit que o publica. O texto grava o hash do commit anterior, já conhecido, e nomeia como livre o identificador da emenda que ainda vai ser publicada. Depois do push, essa frase continua verdadeira como estado anterior e deixa de descrever o identificador livre. O hash do commit novo não cabe no próprio commit. A v1-A31, por `DECISION-SET-20261022-008`, deixou os quatro registros fora do seu objetivo, então `6e4173b` e `0dde35f` ficaram os dois sem narração. `contracts/artifacts.md` permite que `Change Reference` seja working tree, commit SHA, branch, PR ou identificador de change set. Não exige o SHA dentro destes quatro arquivos. O princípio 10 pede rastreabilidade da cadeia. Git e os artefatos já a fornecem. Evidência: `6e4173b`, `0dde35f`, `DECISION-SET-20261022-008`, `contracts/artifacts.md` e `references/architecture-contract-v1.md`.
- A alternativa A continua o ciclo: uma emenda documental depois de cada publicação. A rastreabilidade da cadeia fica explícita e também duplica o Git. O risco de atraso permanece, porque a emenda nova nasce com o próprio hash desconhecido e com o próprio identificador ainda chamado de livre. É compatível com a prática de v1-A29 e v1-A30. A quantidade de mudança é um ciclo completo de skill por publicação. Exige emenda nova sempre. Automatizar esse ciclo ainda produziria um commit cujo texto de identificador livre fica atrasado no push seguinte.
- A alternativa B, preferida pelo mantenedor, registra a emenda durante a própria execução e deixa o hash definitivo no Git, depois do push. A rastreabilidade do hash fica no `git log` e nos artefatos da emenda. O risco de atraso cai se cada emenda narrar o que ela mesma fez e nomear como livre o identificador seguinte, sem campo de hash ainda inexistente. O risco volta se uma emenda tornar a excluir os quatro registros. Nenhum contrato lido proíbe essa prática. Adotá-la muda o processo das emendas futuras. Não muda responsabilidade de skill, schema, roteamento nem target. Não cabe no mesmo objetivo da v1-A32. Evidência: a mensagem e os contratos citados na decisão seguinte.
- A alternativa C cria um registro de estado corrente, atualizado depois do push, e deixa as narrativas históricas intactas. A rastreabilidade do passado fica estável. O risco de atraso muda de lugar: passa a depender da atualização posterior. Um arquivo novo de estado é artefato ou contexto canônico que hoje não existe. `context-engineering` escreve só cinco documentos. `docs` não escreve contexto de projeto nem contrato. Introduzir esse registro é mudança de contrato ou de arquitetura, separada desta emenda. Se cada atualização posterior for ela mesma uma emenda, C volta a ser A.
- A comparação fecha assim. B é a recomendação para a decisão posterior. A permanece o mecanismo desta v1-A32, porque os hashes `6e4173b` e `0dde35f` já existem e a mensagem pede que eles sejam narrados agora. C não é a recomendação: pede arquivo e fronteira novos. Nenhuma das três é critério de aceitação além do alinhamento. Esta execução não promete que nunca haverá outra atualização documental. Evidência: a mensagem.
- A prevenção não entra no objetivo da v1-A32. Os princípios 4 e 5 de `references/architecture-contract-v1.md` pedem a menor mudança correta e proíbem código não relacionado. O gate de especificação exige escopo delimitado. O gate de implementação exige ausência de mudança não relacionada. `contracts/skills/implement.md` recusa implementar uma spec pronta que contém mais de uma mudança independente. Narrar dois commits já publicados e mudar o processo das emendas futuras são aceites independentes. A mensagem manda separar quando o contrato exige separação. O precedente `DECISION-SET-20261022-007` separou o roadmap pelo mesmo motivo. A v1-A32 fica somente no alinhamento. Evidência: a mensagem, esses contratos e esse conjunto.
- A decisão posterior que vier a adotar B precisa de outro `clarify`. Este conjunto não a abre, não a especifica e não altera contrato, workflow, ADR nem script. Evidência: a mensagem e o contrato de `clarify`.
- As evoluções abaixo foram lidas só como contexto de priorização. Nenhuma entra na v1-A32. Nenhuma exclusão é revogada. Nenhuma vira critério de aceitação. Evidência: a mensagem, `.ai/project.md`, ADR-0002, ADR-0003 e ADR-0004.
  - Renomeação de `1.0.0-scaffold`. Exclusão vigente. O identificador permanece.
  - Publicação no npm e mudança de `private`. O estado vigente é `private` `true`. Decisão própria, ainda não aberta.
  - `meta-skills/skill-authoring`. Exclusão vigente da implementação. As 18 skills permanecem.
  - CLI `sync` e CLI `bootstrap`. Exclusão vigente. ADR-0002 proíbe comando novo. ADR-0003 e ADR-0004 abrem exceção só para `list` e `doctor`.
  - Desinstalação, instalação global e detecção de plataforma. Exclusões vigentes.
  - Testes semânticos além da matriz K1–K8. Exclusão vigente da medição automática. A matriz permanece.
  - Roteador automático. Exclusão vigente. `workflow` permanece consultivo.
- `context-engineering` não foi executado. Os registros e o contexto do projeto foram lidos como evidência. O atraso de narração é o objetivo da v1-A32, não um fato ausente que impeça esta decisão. Executar aquela skill escreveria `.ai/project.md` e os outros documentos canônicos de contexto, o que iniciaria a emenda e sairia do limite de escrita de `clarify`. Evidência: a mensagem, que pede somente `clarify`, e o contrato de `context-engineering`.
- A próxima skill permitida é `to-spec`, somente para o alinhamento dos quatro registros. Esta versão a autoriza nesse escopo. Não autoriza a mudança de processo, o roadmap, `implement`, `to-tickets`, `docs`, `research`, `architecture-design`, commit nem push. Evidência: o contrato de `clarify` e a mensagem.

## Constraints

- Esta execução grava somente este conjunto.
- A v1-A32, quando especificada, edita somente `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`, e só por acréscimo que conserve as frases históricas, inclusive as que nomeiam v1-A30 como identificador livre e as que dizem `No SPDX assertion was added`.
- A mudança de processo, inclusive a alternativa B, não entra nesses quatro arquivos e não é critério de aceitação da v1-A32.
- `.ai/architecture.md` e `README.md` permanecem sem edição nesta emenda.
- `LICENSE`, `package.json`, o manifesto, as 18 skills, R1–R17, a CLI, o validador e os quatro ADRs permanecem.
- `private` permanece `true`. A versão permanece `1.0.0-scaffold`. A licença permanece MIT. Publicação no npm fica fora.
- Nenhum comando novo entra. Desinstalação, instalação global, detecção de plataforma, roteador automático e `meta-skills/skill-authoring` ficam fora.
- Nenhum teste novo entra. A v1-A32 não reexecuta a suíte para inventar contagem. A citação de 86/86 e de `PASS: 18 skills` é somente `REVIEW-20261022-009`. A contagem de 78 testes permanece o registro da v1-A26 e da v1-A30. A matriz K1–K8 permanece documental.
- Nenhuma exclusão vigente é revogada.
- Os treze caminhos de fim de linha permanecem fora de qualquer alteração.
- `HANDOFF-20261022-007`, `HANDOFF-20261022-008`, `DECISION-SET-20261022-007` e `DECISION-SET-20261022-008` não são reescritos.
- Um conjunto `ready` autoriza `to-spec` no alinhamento delimitado. Não autoriza `implement`.

## Assumptions

Nenhuma premissa ficou sem aceitação. A publicação local da v1-A30 em `6e4173b` e da v1-A31 em `0dde35f` foi verificada em `HEAD` e na ref local `origin/main`. A ausência de `git fetch` nesta execução limita a evidência a essa ref. Isso não escolhe o texto dos registros.

A preferência do mantenedor pela alternativa B está registrada como recomendação para decisão posterior. Não é aceitação de mudança de processo nesta emenda. O rótulo de recomendação permanece nas decisões resolvidas. Não substitui o objetivo único.

## Rejected Alternatives

- Manter na v1-A32 o objetivo combinado de alinhamento e mudança de processo. Rejeitada pelos princípios 4 e 5, pelo escopo delimitado do gate de especificação, por `contracts/skills/implement.md` e pela instrução de separar quando o contrato exige separação.
- Adotar a alternativa B, ou a C, como critério de aceitação da v1-A32. Rejeitada pela mesma separação. B continua a recomendação da decisão posterior. C não é a recomendação.
- Tratar a v1-A30 ou a v1-A31 como não publicada. Rejeitada por `HEAD`, pela ref local `origin/main` e pelos dois commits.
- Substituir ou apagar as frases que nomeiam v1-A30, ou um identificador anterior, como próximo livre. Rejeitada pela mensagem e pelo precedente `6e4173b`.
- Apagar `No SPDX assertion was added`. Rejeitada pela mensagem e por `DECISION-SET-20261022-007`.
- Inventar nos quatro registros uma frase antiga que nomeie v1-A31 como identificador livre. Rejeitada pela leitura: essa frase não existe nesses arquivos.
- Inventar resultado novo de `npm test` ou `npm run validate`, ou atribuir 86/86 à v1-A30. Rejeitada pela mensagem, por `REVIEW-20261022-008` e por `REVIEW-20261022-009`.
- Editar `.ai/architecture.md` ou `README.md` para repetir `6e4173b`, `0dde35f` ou v1-A32. Rejeitada pela leitura e pela lista de quatro registros.
- Alterar `LICENSE`, `package.json` ou o manifesto. Rejeitada pela mensagem.
- Reescrever ADR-0001, ADR-0002, ADR-0003 ou ADR-0004. Rejeitada pela mensagem.
- Reescrever `HANDOFF-20261022-007`, `HANDOFF-20261022-008`, `DECISION-SET-20261022-007` ou `DECISION-SET-20261022-008`. Rejeitada porque a publicação responde o estado anterior sem corrigir aqueles artefatos.
- Incluir os treze caminhos de fim de linha. Rejeitada pela mensagem e pelo diff sem conteúdo.
- Incluir qualquer exclusão funcional no aceite da v1-A32, ou revogá-la. Rejeitada pela mensagem.
- Abrir a decisão posterior do processo, ou executar `to-spec`, `to-tickets`, `implement`, `docs`, commit ou push nesta execução. Rejeitada pela mensagem e pelo contrato de `clarify`.

## Open Questions

Nenhuma destas questões escolhe o objetivo da v1-A32, os quatro arquivos, a exclusão de `.ai/architecture.md` e de `README.md`, os fatos a narrar ou a vigência das exclusões.

- Quando o mantenedor abrirá o `clarify` da alternativa B. Este conjunto recomenda B e não abre essa decisão.
- Quando `README.md` passará a narrar a v1-A28, a v1-A29, a v1-A30 e a v1-A31. A linha 5 ainda fecha a lista na v1-A27. Esta decisão não o altera.
- Se uma sessão posterior reexecuta `npm test` ou `npm run validate` ao escrever as seções de `references/validation-result.md`. Esta decisão não exige essa reexecução. A seção da v1-A31 cita o review já gravado. A seção da v1-A30 não recebe resultado de suíte.
- Qual exclusão uma emenda posterior escolheria como único objetivo. Este conjunto não escolhe e não abre essa emenda.

## Blocking Questions

Nenhuma.

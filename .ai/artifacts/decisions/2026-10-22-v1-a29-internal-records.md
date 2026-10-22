---
artifact: decision_set
id: DECISION-SET-20261022-006
version: 1
status: ready
created_by: clarify
inputs:
  - maintainer-request-2026-10-22-v1-a29-internal-records
  - 8f92189
  - 283c1f2
  - 1f4585c
  - HANDOFF-20261022-005
  - DECISION-SET-20261022-005
  - SPEC-20261022-005
  - ADR-0001
  - ADR-0002
  - ADR-0003
  - ADR-0004
  - .ai/project.md
  - .ai/architecture.md
  - contracts/skill-contract.md
  - references/provenance.md
  - references/validation-result.md
  - package.json
  - LICENSE
  - README.md
---

## Objective

Alinhar, numa possível emenda v1-A29 ainda não implementada, os registros internos ao estado da v1-A28 já publicada. O único objetivo é esse alinhamento documental. Esta execução não edita os registros.

## Resolved Decisions

- O único objetivo da possível v1-A29 é o alinhamento documental dos registros internos ao estado publicado da v1-A28. A v1-A29 não está implementada. Esta execução não a implementa e não a trata como publicada. Evidência: a mensagem desta execução.
- A v1-A28 permanece a emenda já publicada. Não é reaberta. O commit verificado é `8f921897e88eb757164b5625f389026476676aab` (`8f92189`), mensagem `Adopt the MIT license for amendment v1-A28.`, pai `283c1f281067c51f539c4c86171a6f2f6be007fd`. `HEAD` é esse commit, na branch `main`. Evidência: `git rev-parse HEAD`, `git log -1` e `git show --stat` nesta execução.
- A ref local `origin/main` aponta para o mesmo SHA. `git rev-list --left-right --count origin/main...HEAD` devolve `0	0`. Não houve `git fetch` nesta execução. O servidor remoto não foi consultado de novo. O que está verificado é o commit, `HEAD` e a ref de rastreamento local. Evidência: os mesmos comandos.
- O diff de conteúdo de `8f92189` é `LICENSE`, `package.json`, `README.md` e os artefatos da emenda. Não inclui `.ai/project.md`, `.ai/architecture.md`, `contracts/skill-contract.md`, `references/provenance.md` nem `references/validation-result.md`. Evidência: `git show --stat 8f92189`.
- `HANDOFF-20261022-005` deixou a narração da v1-A28 fora de `LICENSE`, `package.json` e `README.md` de propósito. `DECISION-SET-20261022-005` versão 4 e `SPEC-20261022-005` registram a mesma exclusão. Esta execução não edita esses três artefatos e não reabre a v1-A28. A narração passa a ser o objetivo da v1-A29. Evidência: esses artefatos e a mensagem.
- O estado publicado que os registros devem passar a narrar, sem apagar a narração anterior, é: v1-A28 publicada em `8f92189`; licença MIT; `private: true`; versão `1.0.0-scaffold`; próximo identificador livre v1-A29. Evidência: a mensagem, `package.json` (`license` `MIT`, `private` `true`, `version` `1.0.0-scaffold`) e a linha 3 de `LICENSE`, `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`.
- O aviso aprovado continua `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. `(LAB-IT)` continua identificação escrita nesse aviso. Esta execução não acrescenta conclusão de titularidade jurídica. Se um registro citar o aviso, o texto é essa linha. O corpo da licença MIT não é copiado para os registros. Evidência: `DECISION-SET-20261022-005` versão 4 e a linha 3 de `LICENSE`.
- `README.md` já registra a MIT e `private: true` na seção Limites. Permanece fora da v1-A29. `LICENSE`, `package.json` e o manifesto também permanecem fora. Evidência: `README.md`, linha 112, e a mensagem.
- As frases históricas que nomeiam um identificador livre anterior permanecem. Isso inclui as frases que dizem que o próximo identificador livre é v1-A28: elas são o estado do alinhamento da v1-A27, não uma afirmação a apagar. O precedente é `283c1f2`, que acrescentou o estado novo e conservou as frases anteriores. Evidência: a mensagem, `git show 283c1f2` e o texto atual dos quatro registros que narram a sequência.
- `.ai/project.md` necessita de acréscimo. Hoje termina a sequência na v1-A27 publicada em `1f4585c` e no próximo identificador v1-A28. Já diz pacote privado e versão `1.0.0-scaffold`. Não nomeia MIT nem `8f92189`. O acréscimo registra a v1-A28 publicada em `8f92189`, a licença MIT, a permanência de `private: true` e de `1.0.0-scaffold`, e o próximo identificador v1-A29. Não reescreve as frases de 53/53, de v1-A22 a v1-A27, nem as que nomeiam v1-A25, v1-A26, v1-A27 ou v1-A28 como identificador livre daquele registro. Evidência: leitura de `.ai/project.md` nesta execução.
- `contracts/skill-contract.md` necessita de acréscimo no parágrafo de versionamento. A última frase de emenda diz que o próximo identificador livre é v1-A28. O acréscimo registra a v1-A28 publicada em `8f92189` como adoção da MIT, sem mudança de responsabilidade de skill, de R1–R17, das 18 skills, da CLI ou de `validate()`, com `private: true` e `1.0.0-scaffold` permanecendo, e com o próximo identificador v1-A29. As frases que nomeiam v1-A25, v1-A26, v1-A27 e v1-A28 como identificador livre daquele trecho permanecem. A frase de que o teste semântico de overlap continua trabalho futuro, marcada como estado anterior à v1-A27, permanece. Evidência: leitura de `contracts/skill-contract.md` nesta execução.
- `references/provenance.md` necessita de acréscimo no mesmo formato do registro da v1-A27: um parágrafo da emenda e um item nas limitações. O parágrafo da v1-A27 que termina com o próximo identificador v1-A28 permanece. O acréscimo registra `8f92189`, MIT, `private: true`, `1.0.0-scaffold`, ausência de mudança em skills, R1–R17, CLI e `validate()`, suíte estrutural ainda a dos 78 testes da v1-A26, nenhum teste novo e nenhuma asserção SPDX, e o próximo identificador v1-A29. O item novo diz que a frase anterior que nomeia v1-A28 como identificador livre é o estado daquele registro. Evidência: leitura de `references/provenance.md` nesta execução e o diff de `283c1f2`.
- `references/validation-result.md` necessita de uma seção nova de state update no topo, no formato da seção da v1-A27. A seção não substitui as seções abaixo e não altera os resultados, as contagens nem as observações de host já escritas. Registra a v1-A28 publicada em `8f92189`, a MIT, `private: true`, `1.0.0-scaffold` e o próximo identificador v1-A29. Declara que as frases abaixo que nomeiam v1-A28 como identificador livre são o estado anterior a este alinhamento. Não acrescenta teste Node e não inclui asserção automática de conformidade SPDX. Não inventa duração nem resultado de suíte que esta decisão não observou. A contagem de 78 testes permanece o registro da v1-A26. Evidência: leitura de `references/validation-result.md` e a mensagem, que exclui o teste SPDX.
- `.ai/architecture.md` não necessita de edição. Não afirma licença, `UNLICENSED`, `private`, versão de pacote nem identificador livre. As frases sobre a CLI, `validate()`, os 78 testes e a matriz K1–K8 da v1-A27 publicada em `1f4585c` continuam verdadeiras: `8f92189` não alterou CLI, validador, skills nem testes. `283c1f2` editou este arquivo porque a v1-A27 mudou um fato que o arquivo já narrava. Repetir MIT, `private` ou v1-A29 aqui seria edição artificial. A v1-A29 não o edita. Evidência: leitura integral de `.ai/architecture.md`, `git show 283c1f2 -- .ai/architecture.md` e `git show --stat 8f92189`.
- ADR-0001, ADR-0002, ADR-0003 e ADR-0004 permanecem como estão. Nenhum deles escolhe licença nem narrador dos registros internos. Esta execução não os reescreve. Evidência: os quatro arquivos e a mensagem.
- `DECISION-SET-20261022-005` permanece como está. A questão aberta daquele conjunto, sobre quando os registros passariam a narrar a v1-A28, fica histórica. A resposta é uma emenda posterior, a v1-A29, não uma correção da v1-A28. Evidência: esse conjunto e a mensagem.
- Os treze caminhos abaixo continuam somente com diferença de fim de linha. `git diff --ignore-cr-at-eol --numstat` neles fica vazio. O índice está vazio. Esta execução não os adiciona, restaura ou reescreve. A v1-A29 também não os inclui. Evidência: `git status --short` e `git diff --ignore-cr-at-eol --numstat` nesta execução.
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
- `context-engineering` não foi executado. Os cinco arquivos e o contexto do projeto foram lidos como evidência. O atraso de narração é o objetivo da v1-A29, não um fato ausente que impeça esta decisão. Executar aquela skill escreveria `.ai/project.md` e os outros documentos canônicos de contexto, o que iniciaria a emenda e sairia do limite de escrita de `clarify`. Evidência: a mensagem, que pede somente `clarify`, e o contrato de `context-engineering`.
- `.ai/config.json` define `docsPath` como `docs`. `DOC-20261022-004` já registrou que `docs` não escreve estes cinco caminhos. O precedente `283c1f2` é o alinhamento pontual, não uma execução de `docs`. A próxima skill permitida é `to-spec`. Esta versão a autoriza para o objetivo já delimitado. Não autoriza `implement`, `to-tickets`, `docs`, commit nem push. Evidência: `.ai/config.json`, `DOC-20261022-004`, o contrato de `clarify` e a mensagem.

## Constraints

- Esta execução grava somente este conjunto.
- A v1-A29, quando especificada, edita somente `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`, e só por acréscimo que conserve as frases históricas.
- `.ai/architecture.md` permanece sem edição nesta emenda.
- `LICENSE`, `package.json`, `README.md`, o manifesto, as 18 skills, R1–R17, a CLI, o validador e os quatro ADRs permanecem.
- `private` permanece `true`. A versão permanece `1.0.0-scaffold`. Publicação no npm fica fora.
- Nenhum comando novo entra, inclusive `sync` e `bootstrap`. Desinstalação, instalação global, detecção de plataforma, roteador automático e `meta-skills/skill-authoring` ficam fora.
- Nenhum teste novo entra. A suíte Node não ganha asserção SPDX do texto de `LICENSE`. A contagem de 78 testes permanece o registro da v1-A26.
- Os treze caminhos de fim de linha permanecem fora de qualquer alteração.
- Um conjunto `ready` autoriza `to-spec` no escopo delimitado. Não autoriza `implement`. ADR-0001 permanece nesse limite para conjunto bloqueado; este conjunto não está bloqueado.

## Assumptions

Nenhuma premissa ficou sem aceitação. A publicação local da v1-A28 em `8f92189` foi verificada em `HEAD` e na ref local `origin/main`. A ausência de `git fetch` limita a evidência a essa ref; não é premissa sobre o servidor remoto e não escolhe o texto dos registros.

## Rejected Alternatives

- Reabrir a v1-A28 para narrar os registros internos. Rejeitada pela mensagem, que mantém a v1-A28 publicada em `8f92189` e nomeia a v1-A29 para esse único objetivo. `HANDOFF-20261022-005` e `SPEC-20261022-005` deixaram essa narração fora de propósito.
- Editar `.ai/architecture.md` para repetir MIT, `private: true`, `1.0.0-scaffold` ou v1-A29. Rejeitada pela leitura do arquivo e pela instrução de não exigir edição artificial. `283c1f2` não obriga a tocar de novo um arquivo cuja afirmação continua verdadeira.
- Substituir ou apagar as frases que nomeiam v1-A28, ou um identificador anterior, como próximo livre. Rejeitada pela mensagem, que manda preservar as afirmações históricas, e pelo precedente `283c1f2`.
- Incluir teste automático de conformidade SPDX, ou outro teste novo. Rejeitada pela mensagem.
- Alterar `LICENSE`, `package.json`, `README.md` ou o manifesto. Rejeitada pela mensagem. O estado desses arquivos já é o da v1-A28.
- Reescrever ADR-0001, ADR-0002, ADR-0003 ou ADR-0004. Rejeitada pela mensagem.
- Incluir os treze caminhos de fim de linha. Rejeitada pela mensagem e pelo diff sem conteúdo.
- Publicar no npm, mudar `private` ou renomear `1.0.0-scaffold`. Rejeitada pela mensagem.
- Tratar a v1-A29 como implementada nesta execução, ou executar `to-spec`, `to-tickets`, `implement`, `docs`, commit ou push. Rejeitada pela mensagem e pelo contrato de `clarify`.

## Open Questions

Nenhuma destas questões escolhe o objetivo, os quatro arquivos, a exclusão de `.ai/architecture.md` ou os fatos a narrar.

- Se uma sessão posterior reexecuta `npm test` ou `npm run validate` ao escrever a seção de `references/validation-result.md`. Esta decisão não exige essa reexecução e proíbe registrar resultado não observado.

## Blocking Questions

Nenhuma.

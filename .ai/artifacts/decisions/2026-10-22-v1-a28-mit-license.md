---
artifact: decision_set
id: DECISION-SET-20261022-005
version: 4
status: ready
created_by: clarify
inputs:
  - maintainer-decision-2026-10-22-mit-license
  - maintainer-notice-2026-10-22-mit-copyright
  - maintainer-proposal-2026-10-22-mit-copyright
  - maintainer-approval-2026-10-22-mit-copyright
  - 283c1f2
  - 1f4585c
  - HANDOFF-20261022-004
  - DECISION-SET-20261022-004
  - ADR-0001
  - ADR-0002
  - ADR-0003
  - ADR-0004
  - package.json
  - LICENSE
  - README.md
  - references/provenance.md
---

## Objective

Registrar a adoção da licença MIT como único objetivo da possível emenda v1-A28, para substituir no futuro o placeholder de `LICENSE` e a declaração `UNLICENSED`, sem aplicar a licença nesta execução.

## Resolved Decisions

- A versão 3 deste conjunto estava `blocked`. A proposta não era aprovação. Esta versão 4 não apaga esse registro. O mantenedor respondeu sim à pergunta da versão 3 e aprovou expressamente o ano 2026 e a forma do aviso. Evidência: a pergunta da versão 3 e a resposta desta execução.
- O aviso aprovado é `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. A aprovação é desse texto. Ela não acrescenta conclusão sobre a natureza jurídica de LAB-IT além do que o texto contém. Evidência: a resposta sim.
- Esta versão autoriza `to-spec` para o objetivo já delimitado. Não autoriza `implement`. Evidência: o contrato de `clarify` e a ausência de pedido de implementação nesta resposta.
- A versão 2 deste conjunto estava `blocked`. Na versão 3, o aviso aprovado continuava `Copyright (c) [ANO] [TITULAR]`. A versão 3 não apagou esse registro e não substituiu o aviso pelo texto proposto. Evidência: a versão 2 deste arquivo e a mensagem da versão 3.
- A mensagem da versão 3 fornece o nome Paulo César Melo Bezerra, a identificação adicional LAB-IT e o aviso proposto `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. Ela chama esse aviso de proposto. Na versão 3 não havia frase de aprovação expressa do ano 2026 nem da forma desse aviso. Proposta não era aprovação. LAB-IT entra só como identificação adicional escrita na proposta. A versão 3 não lhe atribui titularidade jurídica. Evidência: a mensagem da versão 3.
- A versão 1 deste conjunto estava `blocked`. Ela registrou a MIT e manteve em aberto o titular e o ano do aviso. A versão 2 não apagou esse registro e acrescentou o aviso `Copyright (c) [ANO] [TITULAR]`. Evidência: as versões 1 e 2 deste arquivo.
- Na versão 2, o aviso aprovado era `Copyright (c) [ANO] [TITULAR]`. Os termos `[ANO]` e `[TITULAR]` permaneciam nesse texto. A versão 2 não os substitui, não escolhe ano e não escolhe titular. Evidência: a mensagem da versão 2, que pede o aviso exato e proíbe inferir titular ou ano.
- O mantenedor escolheu a licença MIT (MIT License) como decisão própria. Essa é a licença da possível emenda v1-A28. Evidência: a mensagem da versão 1.
- O único objetivo nomeado é essa adoção. A v1-A28 não recebe publicação no npm, mudança de `private`, renomeação de `1.0.0-scaffold`, alteração de `schemaVersion` ou de `architectureVersion`, mudança das 18 skills, mudança de R1–R17, comando novo nem reescrita de ADR. Evidência: a mesma mensagem, `package.json`, `manifest/skills.json` e `contracts/routing.md`.
- No futuro autorizado, o placeholder de `LICENSE` deixa de ser o texto vigente e o campo `license` de `package.json` deixa de ser `UNLICENSED`. O valor desse campo passa a ser o identificador SPDX `MIT`. Evidência: a mensagem, que nomeia a substituição futura do placeholder e da declaração `UNLICENSED`, e o valor atual em `package.json`.
- O texto de `LICENSE` corresponde à licença MIT, sem cláusula acrescentada, removida ou reescrita. A única informação do projeto nesse texto é o aviso de copyright. Esta execução não copiou o corpo da licença: a página SPDX não foi lida aqui, e o corpo não é uma escolha do projeto. Evidência: a mensagem, que exige correspondência com a MIT e proíbe modificação arbitrária.
- `private` permanece `true`. A MIT substitui o placeholder e `UNLICENSED`. Ela não autoriza publicar no npm nem mudar `private`. `package.json` já declara `private: true`. `README.md` registra o mesmo campo. Nenhum ADR e nenhum conjunto anterior autoriza publicação. Evidência: a mensagem, que manda avaliar esse campo sem presumir publicação, `package.json` e a seção Limites de `README.md`.
- Os arquivos potencialmente envolvidos na implementação futura são somente `LICENSE`, `package.json` e `README.md`. `README.md` passa a registrar a MIT e deixa de dizer que nenhuma licença foi escolhida e que `license` é `UNLICENSED`. A frase de `private: true` permanece. Nenhum desses três arquivos é editado nesta execução. Evidência: a mensagem e o estado atual dos três arquivos.
- `HEAD` é `283c1f281067c51f539c4c86171a6f2f6be007fd` (`283c1f2`) em `main`, igual a `origin/main`, com zero commits à frente e zero atrás. A v1-A27 está publicada em `1f4585c`, ancestral de `HEAD`. `references/provenance.md` registra v1-A28 como o próximo identificador livre. Nenhuma emenda está aberta: o working tree, fora dos treze caminhos de fim de linha, não contém artefato de emenda em curso. Evidência: Git observado nesta execução e `references/provenance.md`.
- `DECISION-SET-20261022-004` permanece como está. Ele deixou a licença fora da v1-A27. Esta execução não o edita e não reabre a v1-A27. A escolha de licença fica na v1-A28. Evidência: esse conjunto e a mensagem.
- ADR-0001, ADR-0002, ADR-0003 e ADR-0004 permanecem como estão. Nenhum deles escolhe licença. ADR-0001 continua a exigir a persistência deste conjunto bloqueado e a impedir que ele autorize `to-spec` ou `implement`. Evidência: os quatro ADRs.
- A versão permanece `1.0.0-scaffold`. `schemaVersion` e `architectureVersion` permanecem 1. O catálogo permanece em 18 skills, todas `implemented`. R1–R17 permanecem. Nenhuma dependência npm de produção é adicionada. Evidência: `package.json`, `manifest/skills.json`, `AGENTS.md` e `contracts/routing.md`.
- Os treze caminhos abaixo continuam somente com diferença de fim de linha. `git diff --ignore-cr-at-eol` neles fica vazio. Esta execução não os adiciona, restaura ou reescreve. Evidência: `git status --short` e `git diff --ignore-cr-at-eol --numstat` nesta execução.
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
- `context-engineering` não foi executado. O aviso de copyright é escolha do mantenedor. O contexto do projeto, os ADRs e os três arquivos delimitados não contêm esse aviso. Regravar os cinco documentos de contexto não cria o titular. Evidência: `.ai/project.md`, os quatro ADRs, `LICENSE`, `package.json` e `README.md`.

## Constraints

- Esta execução grava somente este conjunto. `LICENSE`, `package.json` e `README.md` permanecem com o placeholder, `UNLICENSED` e `private: true`.
- O corpo futuro de `LICENSE` é a licença identificada por SPDX `MIT`, sem modificação arbitrária de cláusula. O aviso de copyright aprovado é `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`.
- O escopo futuro permanece `LICENSE`, `package.json` e `README.md`. `private` permanece `true`. A versão permanece `1.0.0-scaffold`. Os contratos, as 18 skills e R1–R17 permanecem.
- `private` permanece `true`. Publicação no npm fica fora desta emenda.
- A versão permanece `1.0.0-scaffold`. `schemaVersion` e `architectureVersion` permanecem 1.
- As 18 skills, R1–R17, o manifesto, os targets, a CLI, o validador, os contratos e os quatro ADRs permanecem.
- Os treze caminhos de fim de linha permanecem fora de qualquer alteração.
- Campo `license` no frontmatter das skills, `NOTICE`, `CONTRIBUTING` e narrativa em `.ai/project.md`, `references/provenance.md` ou `contracts/skill-contract.md` ficam fora dos três arquivos delimitados.
- Conjunto `blocked` não autoriza `to-spec` nem `implement`. Esta versão está `ready` e autoriza `to-spec` no escopo já delimitado. Não autoriza `implement`. ADR-0001 permanece nesse limite.

## Assumptions

A premissa da versão 3 era o aviso proposto `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`, com o nome Paulo César Melo Bezerra e a identificação adicional LAB-IT. Na versão 3 o mantenedor não a tinha declarado como decisão própria. Na versão 4 ele a aceitou ao responder sim. A aceitação está em Resolved Decisions. O rótulo de premissa permanece nesta seção. LAB-IT continua identificação escrita no aviso aprovado. Esta execução não acrescenta conclusão de titularidade jurídica além desse texto.

## Rejected Alternatives

- Manter o placeholder de `LICENSE` e a declaração `UNLICENSED`. Rejeitada pela escolha explícita da MIT.
- Adotar outra licença nesta emenda. Rejeitada pela mesma escolha, que nomeia somente a MIT.
- Mudar `private` para `false` ou publicar no npm junto com a troca da licença. Rejeitada pela mensagem, que não autoriza publicação.
- Preencher o titular com uma forma de nome do Git ou com o login do GitHub em `README.md`. Rejeitada porque esses textos não são aviso de copyright e a mensagem da versão 1 proíbe inventar a informação ausente.
- Substituir `[ANO]` ou `[TITULAR]` por um ano ou um nome que a mensagem da versão 2 não escreve. Rejeitada pela instrução da versão 2 de registrar o aviso exato e de não inferir titular ou ano.
- Tratar o aviso proposto, na versão 3, como aprovação do ano 2026 e da forma `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. Rejeitada na versão 3 porque aquela mensagem o chamava de proposto. A resposta sim da versão 4 é a aprovação posterior e não reescreve essa recusa.
- Atribuir a LAB-IT titularidade jurídica. Rejeitada porque a mensagem a apresenta como identificação adicional e proíbe presumir essa titularidade.
- Incluir os treze caminhos de fim de linha, as 18 skills, R1–R17, a versão ou os esquemas nesta emenda. Rejeitada pela mensagem.

## Open Questions

Nenhuma destas questões escolhe a licença, o campo `private` ou o aviso de copyright.

- Quando `.ai/project.md`, `references/provenance.md` e `contracts/skill-contract.md` passam a narrar a v1-A28. Esses arquivos estão fora dos três caminhos delimitados. Esta execução não os altera.

## Blocking Questions

Nenhuma. A versão 3 perguntou se o mantenedor aprovava expressamente o ano 2026 e a forma `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. A resposta desta execução foi sim.

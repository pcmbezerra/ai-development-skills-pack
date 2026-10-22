---
artifact: decision_set
id: DECISION-SET-20261022-007
version: 1
status: ready
created_by: clarify
inputs:
  - maintainer-request-2026-10-22-v1-a30-internal-records
  - 7a4d22c
  - 8f92189
  - HANDOFF-20261022-006
  - DECISION-SET-20261022-006
  - DECISION-SET-20261022-005
  - DECISION-SET-20261016-001
  - ADR-0001
  - ADR-0002
  - ADR-0003
  - ADR-0004
  - .ai/project.md
  - .ai/architecture.md
  - contracts/skill-contract.md
  - references/provenance.md
  - references/validation-result.md
  - references/architecture-contract-v1.md
  - contracts/quality-gates.md
  - contracts/routing.md
  - contracts/skills/implement.md
  - contracts/skills/docs.md
  - package.json
  - LICENSE
  - README.md
  - bin/ai-dev-skills.mjs
---

## Objective

Alinhar, numa possível emenda v1-A30 ainda não implementada, os quatro registros internos ao estado da v1-A29 já publicada. O único objetivo é esse alinhamento documental. O inventário das doze evoluções futuras fica de fora desta emenda e nenhuma emenda posterior é aberta. Esta execução não edita os registros.

## Resolved Decisions

- O único objetivo da possível v1-A30 é o alinhamento documental de `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md` ao estado publicado da v1-A29. A v1-A30 não está implementada. Esta execução não a implementa e não a trata como publicada. Evidência: a mensagem desta execução e `git status`.
- A mensagem propunha um objetivo que juntava esse alinhamento e o registro documental das doze evoluções. A mesma mensagem manda separar quando o contrato exige separação, manter a v1-A30 no alinhamento e propor o roadmap como objetivo de uma emenda posterior, sem abri-la. O contrato exige essa separação para o próximo passo. Os princípios 4 e 5 de `references/architecture-contract-v1.md` são regras que as skills da v1 devem seguir: a menor mudança correta e a proibição de modificar código não relacionado. O gate de especificação exige escopo delimitado. O gate de implementação exige ausência de mudança não relacionada. `contracts/skills/implement.md` recusa implementar uma spec pronta que contém mais de uma mudança independente. Narrar o commit publicado e classificar doze evoluções futuras são aceites independentes. O segundo não é fato de `7a4d22c`. `contracts/skills/docs.md` escreve desenho futuro somente a partir de uma spec pronta ou de um desenho de arquitetura pronto, e somente quando o texto o marca como desenho futuro. Nenhum desses insumos existe para as doze evoluções. O alinhamento da v1-A29 não foi execução de `docs`; a citação limita o roadmap, não transforma a v1-A30 em execução de `docs`. O precedente `DECISION-SET-20261022-006` limitou a v1-A29 ao alinhamento. A v1-A30 fica somente no alinhamento. O objetivo combinado não é o objetivo desta emenda. Evidência: a mensagem, esses contratos e esse conjunto.
- A v1-A29 permanece a emenda já publicada. Não é reaberta. O commit verificado é `7a4d22c0d30b73996380673ae993b4a92621e3e2` (`7a4d22c`), mensagem `Align the internal records with the published v1-A28 license.`, pai `8f921897e88eb757164b5625f389026476676aab`. O diff desse commit é os artefatos da v1-A29 e os quatro registros. Não inclui `.ai/architecture.md`, `LICENSE`, `package.json`, `README.md`, manifesto, CLI, validador, skills nem ADRs. `HEAD` é esse commit, na branch `main`. Evidência: `git rev-parse HEAD`, `git log -1` e `git show --stat` nesta execução.
- A ref local `origin/main` aponta para o mesmo SHA. `git rev-list --left-right --count origin/main...HEAD` devolve `0	0`. O mantenedor afirma que esse alinhamento é posterior a um fetch. Esta execução não executou `git fetch` e não consultou o servidor de novo. O que está verificado é o commit, `HEAD` e a ref de rastreamento local. Evidência: os mesmos comandos e a mensagem.
- Nenhuma emenda está aberta. O índice está vazio. O diff de conteúdo, ignorando fim de linha, está vazio. Os únicos caminhos modificados são os treze de fim de linha. Evidência: `git status --short`, `git diff --cached --name-only` e `git diff --ignore-cr-at-eol --stat`.
- `HANDOFF-20261022-006` registrou a v1-A29 ainda fora de um commit, com `HEAD` em `8f92189`. Essa frase é o estado anterior à publicação. Este conjunto não reescreve o handoff. `DECISION-SET-20261022-006` permanece como está. Evidência: esse handoff e esse conjunto.
- O estado publicado que os quatro registros devem passar a narrar, sem apagar a narração anterior, é: v1-A29 publicada em `7a4d22c`; a emenda alinha os registros internos à v1-A28; a licença permanece MIT; `private` permanece `true`; a versão permanece `1.0.0-scaffold`; o próximo identificador livre é v1-A30. A v1-A29 não adota a licença. Quem a adotou foi a v1-A28, já narrada. Evidência: a mensagem, `package.json` (`license` `MIT`, `private` `true`, `version` `1.0.0-scaffold`) e `git show --stat 7a4d22c`.
- O aviso em `LICENSE`, linha 3, continua `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. Esta execução não acrescenta conclusão de titularidade jurídica. Os quatro registros da v1-A30 não citam esse aviso e não copiam o corpo da licença. Evidência: `LICENSE` e `DECISION-SET-20261022-006`.
- `README.md` permanece fora. A linha 112 já registra a MIT e `private: true`. A linha 5 ainda fecha a lista de emendas na v1-A27. A linha 110 ainda lista as ausências vigentes. Essa defasagem não entra na v1-A30. `LICENSE`, `package.json` e o manifesto também permanecem fora. Evidência: `README.md` e a mensagem.
- As frases históricas que nomeiam um identificador livre anterior permanecem. Isso inclui as frases que dizem que o próximo identificador livre é v1-A29: elas são o estado do encerramento da v1-A28, gravado pela v1-A29, não uma afirmação a apagar. O precedente é `7a4d22c`, que acrescentou o estado novo e conservou as frases anteriores. Evidência: a mensagem e o texto atual dos quatro registros.
- `.ai/project.md` necessita de acréscimo. As duas frases `O próximo identificador livre passa a ser v1-A29.` permanecem. O arquivo não contém `7a4d22c`. Já diz pacote privado, versão `1.0.0-scaffold` e, nas frases da v1-A28, a licença MIT. O acréscimo, depois de cada uma dessas duas frases e no mesmo parágrafo, registra a v1-A29 publicada em `7a4d22c`, o alinhamento dos registros internos à v1-A28, a permanência da MIT, de `private: true` e de `1.0.0-scaffold`, e o próximo identificador v1-A30. Não reescreve a frase de 53/53, as frases de v1-A22 a v1-A28, nem as que nomeiam v1-A25, v1-A26, v1-A27, v1-A28 ou v1-A29 como identificador livre daquele registro. Não acrescenta o roadmap. Evidência: leitura de `.ai/project.md` nesta execução.
- `contracts/skill-contract.md` necessita de acréscimo no parágrafo de versionamento. A frase `The next free amendment identifier is v1-A29.` permanece, imediatamente antes de `None of these amendments introduces v2 artifact or skill contracts.` O acréscimo entra entre essas duas frases e registra a v1-A29 publicada em `7a4d22c` como alinhamento dos registros internos, sem mudança de responsabilidade de skill, de R1–R17, das 18 skills, da CLI ou de `validate()`, com `private` `true` e `1.0.0-scaffold` permanecendo, e com o próximo identificador v1-A30. As frases que nomeiam v1-A25, v1-A26, v1-A27, v1-A28 e v1-A29 como identificador livre daquele trecho permanecem. A frase `That clause is the state before amendment v1-A27.` permanece. Evidência: leitura de `contracts/skill-contract.md` nesta execução.
- `references/provenance.md` necessita de acréscimo no mesmo formato do registro da v1-A28: um parágrafo da emenda e um item nas limitações. O parágrafo da v1-A28 que termina com o próximo identificador v1-A29 permanece. O item que diz que a nomeação de v1-A28 é o estado daquele registro anterior permanece. O acréscimo registra `7a4d22c`, o alinhamento à v1-A28, MIT, `private` `true` e `1.0.0-scaffold` permanecendo, ausência de mudança em skills, R1–R17, CLI e `validate()`, suíte estrutural ainda a dos 78 testes da v1-A26, nenhum teste novo, nenhuma asserção SPDX e o próximo identificador v1-A30. O item novo diz que a frase anterior que nomeia v1-A29 como identificador livre é o estado daquele registro. Evidência: leitura de `references/provenance.md` nesta execução.
- `references/validation-result.md` necessita de uma seção nova de state update no topo, no formato da seção da v1-A28. A seção da v1-A28 permanece a segunda e não é reescrita. A seção da v1-A27 conserva `duration 12123 ms`. A seção nova não substitui as seções abaixo e não altera os resultados, as contagens nem as observações de host já escritas. Registra a v1-A29 publicada em `7a4d22c`, a permanência da MIT, de `private` `true` e de `1.0.0-scaffold`, e o próximo identificador v1-A30. Declara que as frases abaixo que nomeiam v1-A29 como identificador livre são o estado anterior a este alinhamento. Não acrescenta teste Node e não inclui asserção automática de conformidade SPDX. Não contém `npm test` nem `npm run validate`. Não inventa duração nem resultado de suíte. A contagem de 78 testes permanece o registro da v1-A26. Evidência: leitura de `references/validation-result.md` e a mensagem.
- `.ai/architecture.md` não necessita de edição. Não afirma licença, `private`, versão de pacote nem identificador livre. As frases sobre a CLI, `validate()`, os 78 testes e a matriz K1–K8 da v1-A27 publicada em `1f4585c` continuam verdadeiras: `7a4d22c` não alterou CLI, validador, skills nem testes. Não há fato arquitetural novo que exija decisão separada. Repetir o commit da v1-A29 aqui seria edição artificial. A v1-A30 não o edita. Evidência: leitura de `.ai/architecture.md` e `git show --stat 7a4d22c`.
- ADR-0001, ADR-0002, ADR-0003 e ADR-0004 permanecem como estão. Nenhum deles escolhe o narrador dos registros internos. Esta execução não os reescreve. Evidência: os quatro arquivos e a mensagem.
- A matriz K1–K8 permanece documental. Ela valida casos conhecidos e não mede automaticamente toda a similaridade semântica entre skills. A v1-A30 não a altera. Evidência: `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `.ai/architecture.md`.
- Os treze caminhos abaixo continuam somente com diferença de fim de linha. `git diff --ignore-cr-at-eol --numstat` neles fica vazio. O índice está vazio. Esta execução não os adiciona, restaura ou reescreve. A v1-A30 também não os inclui. Evidência: `git status --short` e `git diff --ignore-cr-at-eol --numstat` nesta execução.
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
- As doze evoluções foram lidas contra as exclusões vigentes. Nenhuma entra na v1-A30. Nenhuma exclusão é revogada, nem de forma pontual. Registrar o inventário neste conjunto não exige revogação, porque os quatro registros não recebem o roadmap. Uma emenda posterior que viesse a escrevê-lo nesses registros teria de dizer, no próprio texto, que o registro não revoga a exclusão. Esta execução não adota essa frase e não abre essa emenda. Autorizar a análise das revogações não autoriza mudança de comportamento. Evidência: a mensagem, `.ai/project.md`, ADR-0002, ADR-0003 e ADR-0004.
- O inventário abaixo é informativo. Cada rótulo descreve o estado já gravado ou uma lacuna que uma emenda futura ainda teria de decidir. Nenhum rótulo escolhe comportamento, abre emenda ou autoriza implementação.
  - Publicação no npm. Candidata a futura emenda. Requisito ainda indefinido: o que seria publicado e como. Decisão prévia necessária sobre `private` e sobre o identificador de versão. Fato externo do registro npm exigiria `research` antes de uma spec. O estado vigente é `private` `true`. Não está na lista de 2026-10-15. Evidência: `package.json` e `DECISION-SET-20261022-005`.
  - Mudança de `private: true`. Decisão vigente: permanece `true`. Candidata a revogação futura, somente por emenda que o mantenedor abra para isso. Não pede reescrita dos quatro ADRs. Evidência: `package.json` e `.ai/project.md`.
  - Renomeação de `1.0.0-scaffold`. Exclusão vigente: identificador congelado na v1-A1 e repetido sem renomeação até a v1-A29. Candidata a revogação futura. Requisito ainda indefinido: qual string o substituiria. Evidência: `.ai/project.md`.
  - Asserção automática de conformidade SPDX. A frase `No SPDX assertion was added` é fato histórico da v1-A28 e do alinhamento da v1-A29. Permanece. Candidata a futura emenda de teste. Requisito ainda indefinido: o que a asserção compararia. Não pede comando. Evidência: `references/provenance.md` e `references/validation-result.md`.
  - CLI `sync`. Exclusão vigente desde 2026-10-15. ADR-0002 proíbe comando novo. ADR-0003 e ADR-0004 abrem exceção só para `list` e `doctor`. `bin/ai-dev-skills.mjs` não despacha `sync`. Candidata a revogação futura. Requisito ainda indefinido: se escreveria conteúdo, pergunta já aberta em `DECISION-SET-20261016-001`. Decisão arquitetural necessária: ADR novo, sem reescrever ADR-0002. Evidência: `.ai/project.md`, os três ADRs e `bin/ai-dev-skills.mjs`.
  - CLI `bootstrap`. Exclusão vigente do comando, no mesmo grupo de `sync`. A skill `setup-ai-development-skills` já implementa o workflow de bootstrap da v1-A2. O comando de CLI não existe. Schemas de bootstrap readiness continuam apenas nomeados. Candidata ao comando. Decisão arquitetural necessária. Requisito ainda indefinido. Evidência: `contracts/skill-contract.md`, `references/provenance.md` e `bin/ai-dev-skills.mjs`.
  - Desinstalação. Exclusão vigente. Candidata. Requisito ainda indefinido: o escopo do que seria apagado, pergunta já aberta em `DECISION-SET-20261016-001`. Decisão arquitetural necessária, porque seria comando novo sobre o contrato do `install`. Evidência: `.ai/project.md` e ADR-0002.
  - Instalação global. Exclusão vigente. Candidata. Decisão arquitetural necessária. Fato externo: os caminhos globais de cada host. `DECISION-SET-20261016-001` já recomenda `research` antes de qualquer spec. Evidência: `.ai/project.md` e esse conjunto.
  - Detecção de plataforma. Exclusão vigente. ADR-0004 rejeitou detecção de plataforma para `doctor`. Candidata. Decisão arquitetural necessária: os descritores de Codex e Antigravity declaram `.agents/skills`. Requisito ainda indefinido. Evidência: ADR-0004 e `DECISION-SET-20261016-001`.
  - Roteador automático. Exclusão vigente. `workflow` permanece consultivo. `contracts/routing.md` declara que as regras de roteamento descrevem contratos e não são um roteador implementado. Candidata. Decisão arquitetural necessária. Requisito ainda indefinido: se seria um executor. R1–R17 permanecem. Evidência: `.ai/project.md`, `.ai/architecture.md` e esse arquivo de roteamento.
  - `meta-skills/skill-authoring`. Exclusão vigente da implementação. O contrato já admite acréscimo futuro fora do catálogo de runtime e mantém exatamente 18 skills. Candidata. A localização e o contrato dessa meta-skill continuam sem decisão. Entrar em `manifest/skills.json` mudaria a contagem de 18. Evidência: `contracts/skill-contract.md` e `.ai/project.md`.
  - Testes semânticos adicionais além da matriz K1–K8. Exclusão vigente da medição automática. A matriz permanece o registro documental da v1-A27. Candidata. Requisito ainda indefinido: o oráculo, pergunta já aberta em `DECISION-SET-20261016-001`. A comparação exata da v1-A24 permanece. Evidência: `contracts/skill-contract.md` e `references/provenance.md`.
- Dependências observadas, sem ordem de implementação e sem autorização. Publicar no npm depende de uma decisão anterior sobre `private`. Publicar o identificador `1.0.0-scaffold` seria outra decisão, ainda não tomada. A asserção SPDX depende da MIT já publicada e não depende de `private`. `sync`, `bootstrap`, desinstalação, instalação global e detecção de plataforma pedem, cada uma, exceção própria a ADR-0002 por ADR novo. Instalação global depende dos caminhos externos e, para escolher host, da detecção que ainda não existe. Desinstalação depende do `install` já existente e de um escopo de apagamento indefinido. O comando `bootstrap` convive com a skill já implementada e com schemas apenas nomeados. O roteador automático pode deixar de ser consultivo e pode atingir R1–R17. `skill-authoring` permanece fora das 18 skills. Testes semânticos adicionais não substituem K1–K8 nem a igualdade exata da v1-A24. Evidência: os mesmos registros do inventário.
- Riscos observados, sem autorização de mitigação nesta emenda. Tratar o inventário como requisito. Revogar uma exclusão ao narrá-la. Publicar o identificador congelado. Acrescentar comando sem ADR novo. Reescrever ADR-0002. Passar de 18 skills. Inventar schema de bootstrap readiness. Medir overlap semântico no lugar da igualdade exata. Escrever instalação fora do projeto sem `research`. Evidência: ADR-0002, `contracts/skill-contract.md` e a mensagem.
- Revogações que uma emenda futura poderia propor, nenhuma adotada aqui. A lista restante de 2026-10-15, um item por emenda, no precedente de `list` e de `doctor`. O identificador congelado. `private` `true`. Uma asserção SPDX nova, conservando a frase histórica de que nenhuma foi adicionada. Uma exceção de um único comando a ADR-0002, por ADR novo, sem reescrever ADR-0001 a ADR-0004. `skill-authoring` fora do catálogo de runtime, sem alterar as 18 skills. Testes semânticos além de K1–K8, sem apagar a matriz. Pré-requisito comum: outro `clarify`, aceitação do mantenedor como decisão própria e um único objetivo. Comando novo pede `architecture-design` porque muda interface pública. Instalação global e caminhos de plataforma pedem `research` antes da spec. Testes semânticos pedem o oráculo antes da spec. Publicação no npm pede a decisão de `private`, a decisão sobre o identificador de versão e `research` do registro. Evidência: `DECISION-SET-20261016-001`, ADR-0003, ADR-0004 e a mensagem.
- `context-engineering` não foi executado. Os registros e o contexto do projeto foram lidos como evidência. O atraso de narração é o objetivo da v1-A30, não um fato ausente que impeça esta decisão. Executar aquela skill escreveria `.ai/project.md` e os outros documentos canônicos de contexto, o que iniciaria a emenda e sairia do limite de escrita de `clarify`. Evidência: a mensagem, que pede somente `clarify`, e o contrato de `context-engineering`.
- A próxima skill permitida é `to-spec`, somente para o alinhamento dos quatro registros. Esta versão a autoriza nesse escopo. Não autoriza o roadmap, `implement`, `to-tickets`, `docs`, `research`, `architecture-design`, commit nem push. Evidência: o contrato de `clarify` e a mensagem.

## Constraints

- Esta execução grava somente este conjunto.
- A v1-A30, quando especificada, edita somente `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`, e só por acréscimo que conserve as frases históricas, inclusive as que nomeiam v1-A29 como identificador livre.
- O roadmap não entra nesses quatro arquivos e não é critério de aceitação da v1-A30.
- `.ai/architecture.md` permanece sem edição nesta emenda.
- `LICENSE`, `package.json`, `README.md`, o manifesto, as 18 skills, R1–R17, a CLI, o validador e os quatro ADRs permanecem.
- `private` permanece `true`. A versão permanece `1.0.0-scaffold`. A licença permanece MIT. Publicação no npm fica fora.
- Nenhum comando novo entra, inclusive `sync` e `bootstrap`. Desinstalação, instalação global, detecção de plataforma, roteador automático e `meta-skills/skill-authoring` ficam fora.
- Nenhum teste novo entra. A suíte Node não ganha asserção SPDX. A contagem de 78 testes permanece o registro da v1-A26. A matriz K1–K8 permanece documental.
- Nenhuma exclusão vigente é revogada. A análise das revogações não modifica comportamento.
- Os treze caminhos de fim de linha permanecem fora de qualquer alteração.
- Um conjunto `ready` autoriza `to-spec` no alinhamento delimitado. Não autoriza `implement`.

## Assumptions

Nenhuma premissa ficou sem aceitação. A publicação local da v1-A29 em `7a4d22c` foi verificada em `HEAD` e na ref local `origin/main`. A ausência de `git fetch` nesta execução limita a evidência a essa ref e à afirmação do mantenedor de que o fetch já ocorreu. Isso não escolhe o texto dos registros.

## Rejected Alternatives

- Manter na v1-A30 o objetivo combinado de alinhamento e roadmap. Rejeitada pelos princípios 4 e 5, pelo escopo delimitado do gate de especificação e pela instrução de separar quando o contrato exige separação.
- Adotar uma revogação pontual para escrever o roadmap nos quatro registros. Rejeitada porque o alinhamento não precisa dessa revogação e a mensagem proíbe revogação implícita. A emenda do roadmap não é aberta.
- Tratar qualquer das doze evoluções como requisito da v1-A30. Rejeitada pela separação acima.
- Editar `.ai/architecture.md` para repetir `7a4d22c`, MIT, `private: true`, `1.0.0-scaffold` ou v1-A30. Rejeitada pela leitura do arquivo e pela ausência de fato arquitetural novo.
- Substituir ou apagar as frases que nomeiam v1-A29, ou um identificador anterior, como próximo livre. Rejeitada pela mensagem e pelo precedente `7a4d22c`.
- Incluir teste automático de conformidade SPDX, ou outro teste novo, ou resultado novo de `npm test` ou `npm run validate`. Rejeitada pela mensagem. Esta execução não rodou esses comandos.
- Alterar `LICENSE`, `package.json`, `README.md` ou o manifesto. Rejeitada pela mensagem.
- Reescrever ADR-0001, ADR-0002, ADR-0003 ou ADR-0004. Rejeitada pela mensagem.
- Reescrever `HANDOFF-20261022-006` ou `DECISION-SET-20261022-006`. Rejeitada porque a publicação responde o estado anterior sem corrigir aqueles artefatos.
- Incluir os treze caminhos de fim de linha. Rejeitada pela mensagem e pelo diff sem conteúdo.
- Publicar no npm, mudar `private` ou renomear `1.0.0-scaffold`. Rejeitada pela mensagem.
- Abrir a emenda posterior do roadmap, ou executar `to-spec`, `to-tickets`, `implement`, `docs`, commit ou push nesta execução. Rejeitada pela mensagem e pelo contrato de `clarify`.

## Open Questions

Nenhuma destas questões escolhe o objetivo da v1-A30, os quatro arquivos, a exclusão de `.ai/architecture.md`, os fatos a narrar ou a vigência das exclusões.

- Quando `README.md` passará a narrar a v1-A28 e a v1-A29. A linha 5 ainda fecha a lista na v1-A27. Esta decisão não o altera.
- Se uma sessão posterior reexecuta `npm test` ou `npm run validate` ao escrever a seção de `references/validation-result.md`. Esta decisão não exige essa reexecução e proíbe registrar resultado não observado.
- Qual das doze evoluções uma emenda posterior escolheria como único objetivo. Este conjunto não escolhe e não abre essa emenda.
- Os requisitos ainda indefinidos do inventário: conteúdo de `sync`, escopo da desinstalação, caminhos globais dos hosts, critério para distinguir Codex de Antigravity, se o roteador automático seria executor, local e contrato de `skill-authoring`, oráculo dos testes semânticos adicionais, string que substituiria `1.0.0-scaffold`, e o que uma publicação no npm conteria. Cada um bloqueia a spec daquela evolução futura. Nenhum bloqueia o alinhamento.

## Blocking Questions

Nenhuma.

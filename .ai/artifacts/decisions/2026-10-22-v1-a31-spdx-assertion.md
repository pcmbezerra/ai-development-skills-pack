---
artifact: decision_set
id: DECISION-SET-20261022-008
version: 2
status: ready
created_by: clarify
inputs:
  - maintainer-request-2026-10-22-v1-a31-spdx-assertion
  - maintainer-acceptance-2026-10-22-v1-a31-spdx-oracle
  - 6e4173b384da53ea01913723dea657852075cf75
  - 8f92189
  - 7a4d22c
  - DECISION-SET-20261022-007
  - DECISION-SET-20261022-005
  - IMPL-20261022-005
  - TEST-20261022-009
  - REVIEW-20261022-006
  - HANDOFF-20261022-007
  - HANDOFF-20261022-005
  - ADR-0001
  - ADR-0002
  - ADR-0003
  - ADR-0004
  - package.json
  - LICENSE
  - contracts/skills/clarify.md
  - contracts/artifacts.md
  - contracts/routing.md
  - manifest/skills.json
---

## Objective

Proteger, na possível v1-A31, o estado vigente de licenciamento com uma asserção determinística e offline na suíte Node. A asserção verifica que `package.json` declara `license` `MIT`, `private` `true` e `version` `1.0.0-scaffold`, e que `LICENSE` mantém o texto MIT oficial, com a única substituição da linha 3 por `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. Esta execução não implementa a asserção. A versão 2 está `ready` e autoriza `to-spec` nesse escopo.

## Resolved Decisions

- A versão 1 deste conjunto estava `blocked`. Ela fez três perguntas e não autorizava `to-spec`. Esta versão 2 não apaga esse registro. O mantenedor respondeu sim às três. Evidência: as perguntas da versão 1 e a resposta desta execução.
- O oráculo aceito é um arquivo versionado com o texto oficial SPDX `MIT`, inclusive o placeholder original na linha 3, `Copyright (c) <year> <copyright holders>`. A suíte exige SHA-256 `b05785f9f18e6716bab63424b11454513b9943a222595b70411009202fc592b5`. A comparação de `LICENSE` é linha a linha. A única diferença permitida é a linha 3 igual a `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. A comparação não normaliza fim de linha, espaços, capitalização nem conteúdo. Evidência: a decisão 1 desta execução.
- O hash `3520fb2f00d9a636d4d5af85339a116a865143f6807ab8db19dd78e7b8dc9ad1` não é o oráculo principal. Ele continua sendo só a impressão do `LICENSE` já substituído. Evidência: a decisão 1 e o cálculo repetido nesta execução.
- A mesma verificação falha quando `license` não é a string `MIT`, quando `private` não é o booleano `true`, ou quando `version` não é `1.0.0-scaffold`. Essas falhas protegem o estado vigente. Não autorizam mudar esses campos nem publicar no npm. Evidência: a decisão 2.
- A implementação futura cria um módulo de teste separado em `tests/`, acompanhado do template MIT versionado. Esse template não se chama `LICENSE`. O módulo entra na suíte somente por acréscimo à lista já existente de `scripts.test`. Os dois caminhos atuais permanecem nessa lista. Nenhum outro campo de `package.json` muda. Evidência: a decisão 3 e o valor atual `node --test tests/validate-skills.test.mjs tests/distribute-skills.test.mjs`.
- O caso positivo é o estado atual do repositório. `license` é `MIT`, `private` é `true`, `version` é `1.0.0-scaffold`. `LICENSE` tem 1091 bytes, LF, 18 linhas de conteúdo, newline final e a linha 3 aprovada. As outras dezessete linhas coincidem com o template. Evidência: leitura desta execução.
- Os casos negativos usam cópia temporária e não gravam `LICENSE`, `package.json` nem `README.md`. Cada um nomeia a classe da falha. Evidência: a mensagem, que pede esses casos, e a decisão 1, que separa as classes.
  - Aviso: a linha 3 permanece o placeholder, ou muda ano, nome ou espaço, com o restante igual.
  - Corpo: uma linha que não é a 3 muda uma palavra, com a linha 3 correta.
  - Template: um byte alterado no arquivo oficial faz o SHA-256 falhar, mesmo com `LICENSE` intacto.
  - Fim de linha e extensão: CRLF, newline final ausente, linha extra ou linha removida. A comparação não normaliza.
  - Campos: `license` `UNLICENSED`, `Apache-2.0`, `mit`, `MIT ` ou ausente; JSON inválido; `private` diferente do booleano `true`, inclusive a string `true`; `version` diferente de `1.0.0-scaffold`.
- Esta versão autoriza `to-spec` para esse objetivo. Não autoriza `implement`. Evidência: o contrato de `clarify` e a ausência de pedido de implementação nesta resposta.
- O único objetivo da possível v1-A31 continua essa proteção automatizada. A v1-A31 não está implementada e não está publicada. Esta execução não a implementa. Evidência: a mensagem da versão 1, confirmada nesta execução, e a ausência de outro artefato `v1-A31`.
- O identificador v1-A31 continua livre. `HEAD` permanece `6e4173b384da53ea01913723dea657852075cf75` (`6e4173b`), mensagem `Align the internal records for amendment v1-A30.`, pai `7a4d22c0d30b73996380673ae993b4a92621e3e2`. A ref local `origin/main` aponta para o mesmo SHA. O índice está vazio. O diff de conteúdo dos arquivos rastreados, ignorando fim de linha, está vazio. O único arquivo não rastreado desta emenda é este conjunto. Evidência: `git rev-parse`, `git status --short` e `git diff --ignore-cr-at-eol --stat` nesta execução.
- Esta execução não fez `git fetch`. O alinhamento verificado continua o de `HEAD` com a ref local `origin/main`. Evidência: os mesmos comandos e a mensagem.
- `HANDOFF-20261022-007` registrou a v1-A30 ainda fora de commit, com `HEAD` em `7a4d22c`. Essa frase é o estado anterior à publicação. Este conjunto não reescreve esse handoff. `DECISION-SET-20261022-007` permanece como está. A frase daquele conjunto que deixava indefinido o que a asserção compararia é o estado da v1-A30. A versão 2 define a comparação aqui e não edita aquele arquivo. Evidência: esse handoff, esse conjunto e a decisão 1.
- A licença vigente já é MIT. Os valores lidos nesta execução repetem os da versão 1: `license` `MIT`, `private` `true`, `version` `1.0.0-scaffold`, `LICENSE` com 1091 bytes e SHA-256 `3520fb2f00d9a636d4d5af85339a116a865143f6807ab8db19dd78e7b8dc9ad1`. Evidência: leitura desta execução e `DECISION-SET-20261022-005` versão 4.
- O texto oficial continua o SPDX `MIT` de `IMPL-20261022-005` e `REVIEW-20261022-006`: 1078 bytes, 18 linhas, SHA-256 `b05785f9f18e6716bab63424b11454513b9943a222595b70411009202fc592b5`, linha 3 `Copyright (c) <year> <copyright holders>`. Nesta execução, recolocar só essa linha em memória, com LF e newline final, devolveu 1078 bytes e o mesmo SHA-256. Nenhum arquivo de produto foi gravado. Evidência: aqueles artefatos e o cálculo desta execução.
- A suíte Node ainda não contém asserção SPDX. Esta execução não rodou `npm test` nem `npm run validate` e não inventa contagem. A contagem de 78 testes permanece o registro da v1-A26. Evidência: `package.json` e `TEST-20261022-009`.
- A frase `No SPDX assertion was added` descreve a v1-A28 e o alinhamento da v1-A29. Ela permanece. A v1-A31 não a apaga. Evidência: a mensagem da versão 1 e `DECISION-SET-20261022-007`.
- `private` permanece `true`. A versão permanece `1.0.0-scaffold`. A v1-A31 não publica no npm e não acrescenta dependência npm. Evidência: a decisão 2 e `package.json`.
- O corpo da MIT não recebe cláusula nova, cláusula removida nem reescrita de direito concedido. A única informação do projeto em `LICENSE` continua o aviso aprovado. Esta execução não altera `LICENSE`, `package.json` nem `README.md`. Evidência: a mensagem e `DECISION-SET-20261022-005`.
- As 18 skills permanecem. R1–R17 permanecem. ADR-0001, ADR-0002, ADR-0003 e ADR-0004 permanecem. `validate()` e a CLI não recebem essa verificação. Evidência: a mensagem desta execução.
- Os treze caminhos abaixo continuam somente com diferença de fim de linha. `git diff --ignore-cr-at-eol --stat` neles fica vazio. Esta execução não os adiciona, restaura ou reescreve. Evidência: `git status --short` nesta execução.
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
- `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md`, `references/validation-result.md`, `.ai/architecture.md` e `README.md` ficam fora da v1-A31. As frases que nomeiam v1-A30 como próximo identificador livre permanecem. Evidência: a versão 1 e a mensagem desta execução, que não reabre narração.
- `context-engineering` não foi executado. Na versão 1 o oráculo ainda era escolha do mantenedor. Na versão 2 as três respostas são essa escolha. Regravar o contexto não substitui o sim. Evidência: as duas mensagens e o contrato de `context-engineering`.

## Constraints

- Esta execução grava somente este conjunto.
- `LICENSE`, `package.json` e `README.md` não são editados nesta execução.
- Na implementação futura, o único campo tocado de `package.json` é `scripts.test`, e só para acrescentar o módulo novo à lista existente. `license`, `private`, `version` e os demais campos permanecem.
- O template oficial tem 1078 bytes e SHA-256 `b05785f9f18e6716bab63424b11454513b9943a222595b70411009202fc592b5`. A linha 3 desse arquivo é `Copyright (c) <year> <copyright holders>`.
- A comparação não normaliza fim de linha, espaços, capitalização nem conteúdo.
- Falhar em `private` ou `version` não autoriza alterá-los nem publicar no npm.
- A frase `No SPDX assertion was added` não é apagada.
- As 18 skills, R1–R17, os quatro ADRs, a CLI, o manifesto e `validate()` permanecem.
- Os treze caminhos de fim de linha permanecem fora de qualquer alteração.
- A asserção não usa rede.
- Esta versão está `ready` e autoriza `to-spec` no escopo delimitado. Não autoriza `implement`.

## Assumptions

A premissa da versão 1 era o texto oficial versionado, conferido pelo SHA-256 `b05785f9f18e6716bab63424b11454513b9943a222595b70411009202fc592b5`, com comparação linha a linha e só a linha 3 igual a `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`, mais a falha de `private` e `version`, e o módulo novo em `tests/` acrescentado só a `scripts.test`. Na versão 1 o mantenedor não a tinha declarado como decisão própria. Na versão 2 ele a aceitou ao responder sim às três perguntas. A aceitação está em Resolved Decisions. O rótulo de premissa permanece nesta seção.

O hash `3520fb2f00d9a636d4d5af85339a116a865143f6807ab8db19dd78e7b8dc9ad1` permanece fato observado do `LICENSE` atual. Não é oráculo.

## Rejected Alternatives

- Usar o hash `3520fb2f00d9a636d4d5af85339a116a865143f6807ab8db19dd78e7b8dc9ad1` como oráculo principal. Rejeitada pela decisão 1.
- Normalizar fim de linha, espaços, capitalização ou conteúdo na comparação. Rejeitada pela decisão 1.
- Exigir o hash oficial sobre o `LICENSE` já substituído. Rejeitada pelo cálculo: o arquivo aprovado não tem esse hash.
- Tratar a falha de `private` ou `version` como autorização para mudar esses campos ou publicar no npm. Rejeitada pela decisão 2.
- Alterar outro campo de `package.json` além do acréscimo em `scripts.test`, ou embutir a asserção num dos dois módulos já listados. Rejeitada pela decisão 3.
- Implementar, especificar ou publicar a v1-A31 nesta execução. Rejeitada pela mensagem e pelo contrato de `clarify`.
- Alterar `LICENSE`, `package.json` ou `README.md` nesta execução. Rejeitada pela mensagem.
- Acrescentar, remover ou reescrever cláusula da MIT. Rejeitada pela mensagem e por `DECISION-SET-20261022-005`.
- Apagar `No SPDX assertion was added`. Rejeitada pela versão 1 e por `DECISION-SET-20261022-007`.
- Consultar a rede, `spdx.org` ou o branch `main` de `license-list-data` durante o teste. Rejeitada pela versão 1.
- Colocar a verificação em `validate()` ou num comando novo. Rejeitada pela mensagem desta execução e por ADR-0002 para comando novo.
- Reescrever as 18 skills, R1–R17, o manifesto ou ADR-0001 a ADR-0004. Rejeitada pela mensagem.
- Incluir os treze caminhos de fim de linha. Rejeitada pela versão 1 e pelo diff sem conteúdo.
- Narrar a v1-A31, ou a publicação `6e4173b`, nos registros internos nesta emenda. Rejeitada pelo objetivo único.
- Executar `context-engineering`, `to-spec`, `to-tickets`, `tdd`, `implement`, `code-review`, `docs`, commit ou push nesta execução. Rejeitada pela mensagem e pelo contrato de `clarify`.

## Open Questions

Nenhuma destas questões escolhe o oráculo, os três campos, o aviso, a comparação ou a localização do módulo.

- Quando uma emenda posterior narrará `6e4173b` e a v1-A31 em `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`. As frases que nomeiam v1-A30 como identificador livre permanecem.
- Qual será a contagem observada de `npm test` depois que a asserção existir. Esta decisão não executa a suíte e não inventa esse número.
- O nome exato do módulo em `tests/` e o nome exato do template versionado. Os dois ficam sob `tests/`, o template não se chama `LICENSE`, e o módulo é acrescentado à lista atual de `scripts.test`.

## Blocking Questions

Nenhuma. A versão 1 perguntou se o mantenedor aceitava o texto oficial versionado e o hash `b05785f9f18e6716bab63424b11454513b9943a222595b70411009202fc592b5`, se a asserção falharia para `private` e `version`, e se o módulo novo entraria só por acréscimo em `scripts.test`. A resposta desta execução foi sim às três.

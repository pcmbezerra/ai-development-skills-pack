---
artifact: decision_set
id: DECISION-SET-20261019-001
version: 2
status: ready
created_by: clarify
inputs:
  - HANDOFF-20261018-002
  - HANDOFF-20261018-001
  - DECISION-SET-20261016-001
  - ADR-0001
  - ADR-0002
  - ADR-0003
  - maintainer-authorization-2026-10-19-doctor-analysis
  - maintainer-authorization-2026-10-19-doctor-decisions
---

## Objective

Delimitar o problema funcional do comando `doctor` para a v1-A23, e deixar este conjunto pronto para especificação somente quando nenhuma questão material dessa especificação permanecer aberta.

## Resolved Decisions

- A versão 1 deste conjunto estava `blocked`. Ela registrou que a autorização de análise de 2026-10-19 não concedia a exceção ao ADR-0002 e manteve a verificação de Node.js e Git como premissa. Esta versão 2 não apaga esse registro. Ela acrescenta a aceitação posterior do mantenedor. Evidência: a versão 1 deste arquivo e a mensagem do mantenedor nesta execução.
- Em 2026-10-19 o mantenedor revisou a exclusão de 2026-10-15 exclusivamente para permitir a análise e a definição de requisitos de `doctor`. Essa revisão, na versão 1, não autorizava implementação, não abria a v1-A23 para código e não concedia a exceção ao ADR-0002. Evidência: a autorização de análise e a versão 1. `DECISION-SET-20261016-001` versão 3 permanece o registro da emenda `list` e não é reescrito.
- A v1-A22 permanece encerrada. O `HEAD` observado na versão 1 é `0f702053b1a8ef7ddcf63130dd7911348c930511` em `main`. Evidência: `HANDOFF-20261018-002` e o Git observado na versão 1.
- ADR-0001, ADR-0002 e ADR-0003 permanecem como estão. Os três arquivos não são reescritos. A exceção de ADR-0003 cobre somente `list`. Evidência: os três ADRs.
- O mantenedor aceitou como decisão própria a premissa da versão 1. A única responsabilidade de `doctor` é verificar os pré-requisitos básicos de runtime. O comando verifica se a versão do Node.js é `>=22`, verifica a disponibilidade do executável Git, apresenta o resultado das duas verificações no terminal, termina com saída 0 quando as duas passam e com saída 1 quando alguma falha. Opera só em leitura, não aceita opção, não cria nem modifica arquivo e não acessa a rede. Não repete `validate`. Evidência: a decisão 1 do mantenedor nesta execução.
- `validate` sem opção verifica a integridade estrutural da fonte canônica. `validate --target --path` verifica a correspondência da instalação num destino explícito. `doctor` não executa nenhuma dessas responsabilidades. Evidência: a decisão 1 do mantenedor, `scripts/validate-skills.mjs` e `scripts/distribute-skills.mjs`.
- A versão verificada é a do processo Node.js que executa a CLI. Evidência: `bin/ai-dev-skills.mjs` começa com `#!/usr/bin/env node` e `package.json` declara `engines.node` `>=22`. A decisão 1 fixa o limiar `>=22`.
- O mantenedor autorizou uma exceção pontual ao ADR-0002 exclusivamente para o comando `doctor` na v1-A23. A exceção não autoriza outro comando, não modifica ADR-0003 e não reescreve ADR-0001, ADR-0002 nem ADR-0003. A formalização fica para um ADR novo, produzido na etapa `architecture-design`, quando a spec `ready` já registrar essa decisão durável. Esta decisão não autoriza implementação. Evidência: a decisão 2 do mantenedor nesta execução e o precedente de `DECISION-SET-20261016-001`, que registrou a exceção de `list` sem reescrever ADR-0002.
- `sync`, `bootstrap` na CLI, roteador automático, desinstalação, instalação global, detecção de plataforma, localização automática de instalações, `meta-skills/skill-authoring`, testes semânticos de overlap e a renomeação de `1.0.0-scaffold` continuam fora. Evidência: a decisão 1 do mantenedor, `.ai/project.md` e `DECISION-SET-20261016-001`.
- A versão 1 registrou que aquela execução não autorizava `to-spec`. Esta versão está `ready` e autoriza uma execução posterior de `to-spec`. Esta execução de `clarify` não a invoca e não autoriza `implement`. Evidência: o contrato de `clarify` e a restrição desta sessão.

## Constraints

- Não implementar `doctor` a partir deste conjunto. Conjunto `ready` não autoriza implementação.
- Não reescrever ADR-0001, ADR-0002 nem ADR-0003.
- Não tratar a exceção de ADR-0003 como permissão para `doctor`.
- Não tratar esta exceção como permissão para outro comando.
- Não alterar manifesto, targets, instalador, contratos, testes nem código de produção nesta execução.
- Não atualizar `.ai/project.md` nesta execução. `clarify` grava somente este conjunto.
- Não ampliar a responsabilidade de `doctor` além das duas verificações de runtime aceitas.
- `primaryInvocation` é classificação, não exclusividade.
- `OBSERVED` não é certificação. Claude Code permanece `NOT_RUN`.

## Assumptions

- A premissa da versão 1 era que a menor verificação distinta de `validate` seria um relatório somente leitura de Node.js `>=22` e da disponibilidade do Git, sem opção, sem arquivo e sem destino de instalação. O mantenedor aceitou essa premissa como decisão própria. A aceitação está em Resolved Decisions. O rótulo de premissa permanece nesta seção e não acrescenta requisito além dessa aceitação.
- A premissa de que localizar uma instalação sem destino explícito usa detecção de plataforma permanece. A decisão 1 mantém essa exclusão e não a transforma em responsabilidade de `doctor`.

## Rejected Alternatives

- Implementar `doctor` nesta execução. Rejeitada pela decisão 2, que não autoriza implementação.
- Estender ADR-0003 a `doctor`, ou reescrever ADR-0001, ADR-0002 e ADR-0003. Rejeitada pela decisão 2 e pelos três ADRs.
- Tratar a autorização de análise da versão 1 como a exceção ao ADR-0002. Rejeitada pelo registro da versão 1. A exceção registrada nesta versão 2 é a decisão posterior do mantenedor.
- Repetir `validate` sem opção ou `validate --target --path`. Rejeitada pela decisão 1.
- Localizar instalações, detectar plataforma, instalar, atualizar, sincronizar, desinstalar, instalar globalmente ou rotear automaticamente. Rejeitada pela decisão 1.
- Incluir `sync`, `bootstrap` na CLI, `meta-skills/skill-authoring` ou testes semânticos de overlap. Rejeitada pela decisão 1.
- Executar `to-spec` com a versão 1 `blocked`, ou invocá-la nesta execução da versão 2. Rejeitada pelo contrato de `clarify` na versão 1 e pela restrição desta sessão.

## Open Questions

Nenhuma destas questões muda as duas verificações, os códigos de saída, a ausência de opção, a proibição de arquivo e de rede, nem a exceção limitada a `doctor`.

- Qual texto exato cada linha do terminal usa para apresentar as duas verificações.
- Qual mecanismo local observa a disponibilidade do executável Git, desde que não grave arquivo, não use a rede e não exija um repositório Git.
- Quando `.ai/project.md` passará a narrar a revisão de `doctor`. Esta execução não o altera.
- Quando `.ai/architecture.md` passará a citar `list` na descrição da CLI.
- Claude Code permanece `NOT_RUN`. Isso não define `doctor`.

## Blocking Questions

Nenhuma.

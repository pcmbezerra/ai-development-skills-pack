---
artifact: decision_set
id: DECISION-SET-20261022-004
version: 2
status: ready
created_by: clarify
inputs:
  - HANDOFF-20261022-003
  - DECISION-SET-20261022-003
  - DECISION-SET-20261022-001
  - ADR-0001
  - ADR-0002
  - ADR-0003
  - ADR-0004
  - 1095aa2
  - maintainer-acceptance-2026-10-22-v1-a27-overlap
  - maintainer-request-2026-10-22-v1-a27-known-cases
---

## Objective

Registrar a aceitação do mantenedor para a análise de overlap como primeiro passo da v1-A27, com o limite explícito de que uma matriz de rotas esperadas valida casos conhecidos e não mede automaticamente toda a similaridade semântica entre skills.

## Resolved Decisions

- A versão 1 deste conjunto estava `ready` para o critério e não autorizava `to-spec`. Ela deixou em aberto quais casos conhecidos a matriz declara. Esta versão 2 não apaga esse registro. Ela acrescenta a lista validada e a autorização posterior. Evidência: a versão 1 deste arquivo e a mensagem do mantenedor nesta execução.
- O mantenedor aceitou a análise de overlap como primeiro passo. As demais evoluções ficam para emendas futuras. Evidência: a mensagem que aceitou a análise.
- Uma matriz de rotas esperadas valida casos conhecidos. Ela não mede automaticamente toda a similaridade semântica entre skills. Esse limite permanece. Evidência: a mesma mensagem de aceitação.
- O único objetivo nomeado por esta aceitação é esse critério. A v1-A27 não recebe `sync`, `bootstrap` na CLI, desinstalação, instalação global, detecção de plataforma, roteador automático, `meta-skills/skill-authoring`, licença nem renomeação de `1.0.0-scaffold`. Evidência: a mensagem de aceitação e `.ai/project.md`.
- A exclusão de medição automática de overlap semântico permanece. A v1-A24 continua a única comparação automática de `description`: igualdade exata da string armazenada, sem normalizar e sem medir overlap. Esta versão não edita `DECISION-SET-20261022-001`, `DECISION-SET-20261022-002` nem `DECISION-SET-20261022-003`. Evidência: esses três conjuntos e `.ai/project.md`.
- A matriz não é score, embedding, modelo nem normalização. Caso não declarado na matriz não é overlap para esse artefato e a matriz não afirma ausência de similaridade entre as skills que ficaram de fora. Evidência: a análise aceita e a frase do mantenedor sobre casos conhecidos.
- Não há comando novo. ADR-0001, ADR-0002, ADR-0003 e ADR-0004 não são reescritos. A aceitação não concede exceção ao ADR-0002. Evidência: os quatro ADRs e as duas mensagens, que não pedem comando.
- O catálogo permanece em 18 skills. `skill-authoring` permanece fora do catálogo de runtime. `workflow` permanece roteador consultivo. A versão permanece `1.0.0-scaffold`. `schemaVersion` e `architectureVersion` permanecem 1. Nenhuma dependência npm de produção é adicionada. Evidência: `AGENTS.md`, `manifest/skills.json`, a seção 23 de `references/architecture-contract-v1.md` e o contrato de `workflow`.
- `HEAD` observado na versão 1 é `1095aa2` em `main`. `HANDOFF-20261022-003` descreve o momento anterior, com `HEAD` `f1deb2b`. Evidência: a versão 1.
- Treze caminhos de fim de linha continuam fora deste conjunto. Evidência: a versão 1.
- O mantenedor pediu uma lista mínima de casos conhecidos, com exemplos reais de roteamento já definidos nos contratos, casos positivos e negativos, e, em cada caso, a solicitação de entrada, a skill esperada e a justificativa contratual. Depois da validação, autorizou `to-spec` para transformar essa lista em critérios de aceite verificáveis. Evidência: a mensagem desta execução.
- A lista validada tem oito casos. A entrada de cada um é uma condição já escrita no contrato citado. Nenhum enunciado de produto foi acrescentado. A validação conferiu a presença da condição no contrato. Evidência: `contracts/routing.md` e o passo 3 do workflow em `contracts/skills/modernize.md`.

Casos positivos:

- K1. Entrada: o usuário invoca explicitamente `/implement` e a execução não violaria um pré-requisito bloqueante. Skill esperada: `implement`. Justificativa: R1 em `contracts/routing.md`. R1 nomeia `/implement` e prefere essa skill salvo pré-requisito bloqueante.
- K2. Entrada: `multiple skills plausibly apply`. Skill esperada: `workflow`. Justificativa: R2. R2 também exige que `workflow` recomende uma sequência e não execute a tarefa inteira.
- K3. Entrada: `desired behaviour is clear` e `scope is bounded`. Skill esperada: `implement`. Justificativa: R6.
- K4. Entrada: `behaviour must remain stable`. Skill esperada: `refactor`. Justificativa: R15.

Casos negativos:

- K5. Entrada: `behaviour is intentionally changing`. Skill esperada: `implement`. Rota proibida: `refactor`. Justificativa: R15.
- K6. Entrada: `ambiguous request` sem resolver ambiguidade material, quando uma pergunta sem resposta pode mudar `scope`, `behaviour`, `architecture`, `data model`, `security` ou `acceptance criteria`. Skill esperada: `clarify`. Rota proibida: `implement`. Justificativa: o anti-pattern de `contracts/routing.md` e R3.
- K7. Entrada: `symptom is known` e `root cause is not known`. Skill esperada: `diagnose`. Rota proibida: `implement`. Justificativa: R5, inclusive a frase `Do NOT jump directly to implement`.
- K8. Entrada: `the request is to upgrade everything or rewrite the repository without that bound`. Skill esperada: `clarify`. Rota proibida: `modernize`. Justificativa: o passo 3 do workflow em `contracts/skills/modernize.md` e o anti-pattern `modernize → uncontrolled repository-wide rewrite`.

- Os outros dois gatilhos de R2, a invocação explícita de `/to-spec` e de `/diagnose`, R4, R7 a R14, R16, R17 e os anti-patterns de spec bloqueada, tickets, `docs` e `domain-modelling` não entram nesta lista. A ausência é o limite já aceito: a matriz não mede toda a similaridade nem todas as rotas. Evidência: `contracts/routing.md` e a condição do mantenedor.
- Esta versão autoriza uma execução de `to-spec` limitada a transformar K1–K8 em critérios de aceite. Não autoriza `implement`. A versão 1 não autorizava `to-spec`; essa frase permanece como histórico da versão 1. Evidência: a mensagem desta execução e o contrato de `clarify`.

## Constraints

- Não implementar a matriz, não criar teste e não alterar `scripts/validate-skills.mjs` a partir deste conjunto.
- A autorização de `to-spec` cobre somente K1–K8 e o limite de que a matriz valida casos conhecidos e não mede automaticamente toda a similaridade semântica entre skills.
- Não medir automaticamente toda a similaridade semântica entre skills.
- Não tratar a matriz como certificação de que skills ausentes dela não se sobrepõem.
- Não reescrever ADR-0001, ADR-0002, ADR-0003 nem ADR-0004.
- Não tratar esta aceitação como exceção ao ADR-0002.
- Não acrescentar skill ao catálogo, chave de target, dependência npm nem campo de frontmatter.
- Não alterar manifesto, targets, instalador, contratos, testes nem código de produção nesta atualização do conjunto.
- Não atualizar `.ai/project.md` nesta atualização. `clarify` grava somente este conjunto.
- Não incluir os treze caminhos de fim de linha.
- `primaryInvocation` é classificação, não exclusividade.
- `OBSERVED` não é certificação. Claude Code permanece `NOT_RUN`.

## Assumptions

A premissa aceita da análise é que a matriz de rotas esperadas fica fora de `npm test`, como cobertura agent-driven, e que a suíte Node conserva a igualdade exata da v1-A24. O mantenedor aceitou essa análise como decisão própria. A aceitação está em Resolved Decisions. O rótulo de premissa permanece nesta seção e não acrescenta caso além de K1–K8, limiar nem ferramenta de similaridade.

## Rejected Alternatives

- Tratar a matriz como medição automática de toda a similaridade semântica entre skills. Rejeitada pela condição do mantenedor.
- Abrir neste passo `sync`, `bootstrap` na CLI, desinstalação, instalação global, detecção de plataforma, roteador automático, `skill-authoring`, licença ou renomeação da versão. Rejeitada pela mensagem que deixa as demais funcionalidades para emendas futuras.
- Revogar a igualdade exata da v1-A24 ou passar a normalizar `description`. Rejeitada por `DECISION-SET-20261022-001`, que esta execução não edita.
- Usar score, embedding, modelo ou normalização como oráculo. Rejeitada pela análise aceita.
- Inventar uma solicitação de produto que o contrato não escreve. Rejeitada pelo pedido de exemplos reais já definidos nos contratos.
- Incluir rota cujo contrato não nomeia a skill esperada. A spec bloqueada, em R10, proíbe `to-tickets` e não nomeia a skill substituta. Ficou de fora da lista mínima. Rejeitada pela exigência de skill esperada nesta mensagem.
- Reescrever ADR-0001, ADR-0002, ADR-0003 ou ADR-0004. Rejeitada pelos quatro ADRs.
- Conceder exceção ao ADR-0002. Rejeitada porque esta aceitação não acrescenta comando.
- Autorizar `implement` junto com `to-spec`. Rejeitada porque a mensagem autoriza a transformação da lista em critérios de aceite e não pede código.

## Open Questions

Nenhuma destas questões muda K1–K8 nem o limite da matriz.

- Quando `.ai/project.md`, o contrato compartilhado, a proveniência e o `README.md` passam a narrar a v1-A27. Esta atualização não os altera.
- Claude Code permanece `NOT_RUN`. Isso não define os casos.

## Blocking Questions

Nenhuma.

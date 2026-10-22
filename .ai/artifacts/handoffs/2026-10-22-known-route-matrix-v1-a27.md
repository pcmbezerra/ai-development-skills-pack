---
artifact: handoff
id: HANDOFF-20261022-004
version: 1
status: ready
created_by: handoff
inputs:
  - DECISION-SET-20261022-004
  - SPEC-20261022-004
  - TICKET-SET-20261022-004
  - IMPL-20261022-004
  - TEST-20261022-007
  - TEST-20261022-008
  - REVIEW-20261022-005
  - HANDOFF-20261022-003
---

## Objective

Transferir o estado verificado da v1-A27, a matriz de rotas esperadas, para que outra sessão não reabra os oito casos, os doze critérios nem as limitações já revistas.

## Current State

`HEAD` é `1095aa2554d694b61c6d146c8d3694da37c2f78f` (`1095aa2`) em `main`, igual à ref local de `origin/main`, com zero commits à frente e zero atrás. Não houve `git fetch` nesta execução. Dezoito skills seguem `implemented`. A versão permanece `1.0.0-scaffold`. A v1-A21 permanece `OBSERVED`. Claude Code permanece `NOT_RUN`. A v1-A27 está no working tree e não está publicada. Esta transferência não abre a v1-A28.

A matriz está em `.ai/artifacts/quality/2026-10-22-known-route-matrix.md`. Ela valida casos conhecidos e não mede automaticamente toda a similaridade semântica entre skills. Não é um classificador semântico. Não altera R1–R17. Não entra em `validate()` nem em `npm test`.

`REVIEW-20261022-005` está `PASS`. `docs` não gravou arquivo nesta execução: o objetivo não nomeou `README.md`.

## Completed Work

O mantenedor aceitou a matriz de casos conhecidos como primeiro passo e o limite de que ela não mede toda a similaridade semântica. `DECISION-SET-20261022-004` versão 2 nomeia K1–K8. `SPEC-20261022-004` transforma esses casos em doze critérios. `TICKET-SET-20261022-004` reparte a estrutura, os oito casos e a conferência final. `implement` e `tdd` gravaram a matriz. O vermelho foi a ausência do arquivo, em `TEST-20261022-007`. A leitura final está em `TEST-20261022-008`. A revisão ficou `PASS`.

Casos positivos:

- K1. Entrada: invocação explícita de `/implement` sem pré-requisito bloqueante. Skill: `implement`. Contrato: R1.
- K2. Entrada: `multiple skills plausibly apply`. Skill: `workflow`, que recomenda a sequência e não executa a tarefa. Contrato: R2.
- K3. Entrada: `desired behaviour is clear` e `scope is bounded`. Skill: `implement`. Contrato: R6.
- K4. Entrada: `behaviour must remain stable`. Skill: `refactor`. Contrato: R15.

Casos negativos:

- K5. Entrada: `behaviour is intentionally changing`. Skill: `implement`. Rota proibida: `refactor`. Contrato: R15.
- K6. Entrada: `ambiguous request` sem resolver ambiguidade material, quando uma pergunta sem resposta pode mudar `scope`, `behaviour`, `architecture`, `data model`, `security` ou `acceptance criteria`. Skill: `clarify`. Rota proibida: `implement`. Contrato: anti-pattern e R3.
- K7. Entrada: `symptom is known` e `root cause is not known`. Skill: `diagnose`. Rota proibida: `implement`. Contrato: R5.
- K8. Entrada: `the request is to upgrade everything or rewrite the repository without that bound`. Skill: `clarify`. Rota proibida: `modernize`. Contrato: passo 3 de `contracts/skills/modernize.md` e o anti-pattern correspondente.

Critérios de `SPEC-20261022-004`:

1. Exatamente K1–K8, sem nono caso.
2. K1 só passa com `implement` para `/implement` sem pré-requisito bloqueante e com justificativa R1.
3. K2 só passa com `workflow` para `multiple skills plausibly apply`, com o registro de que `workflow` não executa a tarefa, e com justificativa R2.
4. K3 só passa com `implement` para comportamento claro e escopo limitado, com justificativa R6.
5. K4 só passa com `refactor` para comportamento estável, com justificativa R15.
6. K5 só passa com `implement` e sem `refactor` para comportamento que muda de propósito, com justificativa R15.
7. K6 só passa com `clarify` e sem `implement` para o pedido ambíguo definido em R3, com justificativa no anti-pattern e em R3.
8. K7 só passa com `diagnose` e sem `implement` para sintoma conhecido e causa desconhecida, com justificativa R5.
9. K8 só passa com `clarify` e sem `modernize` para atualizar tudo ou reescrever sem limite, com justificativa no passo 3 de `modernize` e no anti-pattern.
10. A matriz contém a frase de que valida casos conhecidos e não mede automaticamente toda a similaridade semântica entre skills.
11. Par ou skill não declarado em K1–K8 não é falha da matriz.
12. `validate()` não ganha comparação semântica nem estes casos. A `description` idêntica permanece igualdade exata da string armazenada.

## Decisions

`DECISION-SET-20261022-004` versão 2 está `ready`. A v1-A27 cobre a matriz de referência K1–K8. A medição automática de overlap semântico continua fora. A v1-A24 permanece a única comparação automática de `description`. `sync`, `bootstrap` na CLI, desinstalação, instalação global, detecção de plataforma, roteador automático, `meta-skills/skill-authoring`, licença e a renomeação de `1.0.0-scaffold` continuam fora. ADR `0001`, ADR `0002`, ADR `0003` e ADR `0004` não foram reescritos. Esta transferência não abre a v1-A28.

## Artifacts

- `HANDOFF-20261022-003`, `ready`. Estado da v1-A26. Não foi reescrito.
- `DECISION-SET-20261022-004`, `ready`, versão 2.
- `SPEC-20261022-004`, `ready`.
- `TICKET-SET-20261022-004`, `ready`.
- `IMPL-20261022-004`, `ready`.
- `TEST-20261022-007`, `ready`, `created_by: tdd`.
- `TEST-20261022-008`, `ready`, `created_by: implement`.
- `REVIEW-20261022-005`, `ready`, `PASS`.
- Este arquivo, `HANDOFF-20261022-004`.

Não há `DOC_UPDATE` desta emenda. Um artefato fora de `ready` não autoriza implementação. Nenhum input citado está fora de `ready`.

## Files Changed

Observado com `git status --short` e `git diff --ignore-cr-at-eol --stat` antes deste arquivo. `HEAD` `1095aa2`. O diff com fim de linha ignorado não mostrou conteúdo. Não rastreados nesse status, e que entram na lista proposta de publicação:

- `.ai/artifacts/decisions/2026-10-22-v1-a27-overlap-criterion.md`
- `.ai/artifacts/specs/2026-10-22-known-route-cases.md`
- `.ai/artifacts/tickets/2026-10-22-known-route-cases.md`
- `.ai/artifacts/quality/2026-10-22-known-route-matrix.md`
- `.ai/artifacts/implementation/2026-10-22-known-route-matrix.md`
- `.ai/artifacts/tests/2026-10-22-known-route-matrix-tdd.md`
- `.ai/artifacts/tests/2026-10-22-known-route-matrix.md`
- `.ai/artifacts/reviews/2026-10-22-known-route-matrix.md`

Este handoff entra na mesma lista. Ele ainda não estava no status observado acima.

`README.md`, `.ai/project.md`, `.ai/architecture.md`, `contracts/skill-contract.md`, `references/provenance.md`, `references/validation-result.md`, `contracts/routing.md` e `scripts/validate-skills.mjs` não estão nessa lista.

Treze artefatos anteriores permanecem modificados. `git diff --ignore-cr-at-eol` nesses caminhos fica vazio. São fim de linha, não conteúdo. Esta transferência não os inclui:

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

## Validation

Em Darwin 25.6.0 arm64, Node.js v26.5.0 e npm 11.17.0, a leitura da matriz contra os doze critérios terminou com zero falhas. Isso está em `TEST-20261022-008`. `npm test` não rodou: o ticket 10 diz que a suíte Node não verifica esta matriz. `REVIEW-20261022-005` ficou `PASS`. `contracts/routing.md` e `scripts/validate-skills.mjs` não apareceram no `git status` desta mudança.

## Known Issues

O `README.md` ainda abre com emendas v1-A1 a v1-A26 e não cita a matriz. R14 alcança esse registro público. O contrato de `docs` só permite alterar `README.md` quando o objetivo nomeia esse arquivo. Este pedido não o nomeou. `docs/agents/domain.md`, `docs/agents/issue-tracker.md` e `docs/agents/triage-labels.md` não descrevem a matriz e não pedem mudança. Não houve `DOC_UPDATE`.

`.ai/project.md`, `.ai/architecture.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md` também não narram a v1-A27. `docs` não pode escrevê-los.

K1–K8 deixam de fora a maior parte de R1–R17. A spec bloqueada continua sem skill substituta nomeada e fora da matriz. `OBSERVED` não é certificação. Claude Code permanece `NOT_RUN`. A suíte publicada da v1-A26 continua 78/78. Esta emenda não a reexecutou.

## Open Questions

Nenhuma pergunta aberta bloqueia a publicação dos artefatos já `ready`, se o mantenedor aceitar o `README.md` ainda em v1-A26. Permanecem fora: `sync`, desinstalação, instalação global, detecção de plataforma, roteador automático, `meta-skills/skill-authoring`, licença e a renomeação da versão. A escolha de narrar o `README.md` antes do commit não está feita.

## Next Actions

A primeira skill aplicável, se o registro público for alinhado antes da publicação, é `docs`, com o objetivo nomeando `README.md`. Esta transferência não a invoca. Commit e push não são skill. Não estão autorizados. A lista de Files Changed é a proposta de publicação, sem os treze caminhos de fim de linha e sem o `README.md`.

## Constraints

Não estender ADR `0001` nem reescrever ADR `0002`, ADR `0003` ou ADR `0004`. Não reescrever `HANDOFF-20261022-003`. Não abrir a v1-A28 neste arquivo. Não tratar a matriz como classificador semântico nem como medição de toda a similaridade entre skills. Não alterar R1–R17 nem `validate()`. Não tratar `OBSERVED` como certificação. Não tratar as diferenças de fim de linha como conteúdo a publicar. Não incluir no commit caminho que não esteja na lista de Files Changed, salvo autorização que nomeie outro caminho. Não fazer commit nem push nesta execução.

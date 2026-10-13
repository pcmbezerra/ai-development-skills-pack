---
artifact: decision_set
id: DECISION-SET-20261013-004
version: 1
status: ready
created_by: clarify
inputs:
  - HANDOFF-20261006-001
  - HANDOFF-20261013-003
  - SPEC-20261013-003
  - CONTEXT.md
---

## Objective

Operacionalizar `edge-case-analysis` como emenda v1-A15.

## Resolved Decisions

- O próximo recorte é a emenda v1-A15 e cobre somente `edge-case-analysis`. Evidência: o mantenedor pediu para continuar na ordem do contrato e nomeou `edge-case-analysis` como o primeiro buraco. Na sequência canônica de feature nova, essa skill é o próximo scaffold composto por `implement`, depois de `tdd` e antes de `code-review`. A emenda v1-A14 já publicou `research` em `origin/main` (`2b9a1a9`), então este recorte recebe o identificador v1-A15.
- `edge-case-analysis` grava um único `EDGE_CASE_REPORT` `ready` por objetivo em `.ai/artifacts/quality/`, com o template existente. O caminho bloqueado não grava arquivo desta tentativa e não apaga relatório existente. Evidência: o seam de v1-A6 a v1-A14, em que só o artefato `ready` é persistido, e o layout recomendado em `contracts/artifacts.md`, que já nomeia `quality/`.
- Cada achado informa comportamento esperado, cobertura existente e cobertura ausente. O teste recomendado permanece dentro do comportamento já exigido pela spec `ready`, ou pelo modelo `ready` quando a spec usa esse modelo. Proposta que alargaria o comportamento do produto fica registrada como não autorizada e não entra em Recommended Test. A skill não grava o teste e não altera código de produto. Evidência: o contrato de `edge-case-analysis` e a seção 7.10 de `contracts/artifacts.md`.
- Um relatório `ready` não autoriza `implement` a mudar comportamento do produto. Quando o achado registra risco de R12, autoriza `code-review` da mesma mudança e não o invoca. Quando o único achado é ausência evidenciada de risco de R12, informa que `code-review` pode ser omitido. `tdd` pode ser nomeado como aplicável a um teste recomendado autorizado e não é invocado. Evidência: R12, R13 e o seam em que a skill para no próprio resultado.
- `CHANGE_SET` permanece named-only e é citado como `working tree`. A skill não grava arquivo de change set. Modelo ausente não bloqueia. Modelo presente que não está `ready` bloqueia. Testes não observados bloqueiam. Ausência observada de testes não bloqueia. Evidência: o contrato de artefatos e a lista de insumos da skill.
- A suíte Node acompanha o catálogo: ao final, 15 skills `implemented` e 3 `scaffold`. `edge-case-analysis` junta-se às quatorze já implementadas. A semântica fica em cenários agent-driven, sem arquivo de teste novo. Evidência: o seam de v1-A6 a v1-A14. As 3 que permanecem scaffold são `refactor`, `docs` e `modernize`.
- `implement` não passa a invocar `edge-case-analysis`. A dependência opcional já declarada permanece. O ADR `0001` não é estendido. `SPEC-20261013-003` não é reaberta. Evidência: o precedente de v1-A11, em que `tdd` e `code-review` ficaram operacionais sem serem invocados por `implement`.

## Constraints

- Não criar executor JavaScript, dependência npm, schema, template, comando CLI ou target.
- Não alterar R1–R17, as sequências canônicas nem as dependências já declaradas.
- Não invocar `tdd`, `implement`, `code-review` nem qualquer outra skill a partir de `edge-case-analysis`.
- Não copiar valor secreto.
- Não alargar em silêncio o comportamento do produto.

## Assumptions

Nenhuma premissa fecha este recorte.

## Rejected Alternatives

- Operacionalizar `refactor`, `docs` ou `modernize` antes de `edge-case-analysis`. Evidência: a sequência canônica de feature nova coloca `edge-case-analysis` como o próximo scaffold composto por `implement`, e o mantenedor nomeou esse buraco.
- Gravar relatório `blocked` ou `draft`. Evidência: o ADR `0001` não cobre `EDGE_CASE_REPORT`.
- Fazer a skill gravar o teste recomendado. Evidência: o contrato diz que a skill pode propor testes e não que ela os grava.
- Tratar ausência de risco de R12 como `BLOCKED`. Evidência: ausência evidenciada preenche as seções obrigatórias, no mesmo precedente do relatório de `research`.

## Open Questions

Node.js nos quatro produtos, descoberta real e reconciliação com GitHub Issues continuam sem verificação e não alteram este recorte.

## Blocking Questions

Nenhuma questão bloqueante.

---
artifact: ticket_set
id: TICKET-SET-20261013-002
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261013-002
---

# refactor operacional — emenda v1-A13

Conjunto executável derivado de `SPEC-20261013-002`. Cada bloco abaixo é um registro TICKET com as seções exigidas pelo contrato. R8 e R9 não se aplicam a esta spec: a emenda operacionaliza uma skill e não muda o domínio de um produto consumidor nem uma fronteira de arquitetura do pacote. Evidência: a própria spec e o precedente de `SPEC-20261013-001`.

Triagem local: `ready-for-agent`. Publicação remota pendente até reconciliação com GitHub Issues, sem criação de duplicatas.

## Title

01 — Operacionalizar refactor

## Goal

Implementar a skill `refactor` para gravar relatório e evidência `ready` quando o gate passa, e para devolver o relatório `BLOCKED` quando o contexto, a linha de base, o objetivo, a decisão ou o fato externo impedem essa gravação.

## Context

`SPEC-20261013-002` define a emenda v1-A13. `DECISION-SET-20261013-002` confirma um único seam de comportamento, com a suíte Node acompanhando o catálogo, as dependências vazias, os esquemas definidos e as linhas de produtor. Este ticket publica o workflow e migra `refactor` para `implemented`. O ADR `0001` continua restrito ao conjunto de decisões. A observação agent-driven do comportamento fica no ticket 02. Evidência: `SPEC-20261013-002`, requisitos 1–14 e critérios 1, 20 e 21.

## Scope

- Criar a regressão estrutural em RED para a migração de `refactor` na asserção de catálogo já existente.
- Alterar o status de `refactor` para `implemented` no manifest, no contrato e na fonte.
- Substituir o placeholder por workflow operacional idêntico nas duas fontes.
- Gravar somente relatório `ready` e evidência `ready`, com `created_by: refactor`, um par por objetivo.
- Citar `CHANGE_SET` como `working tree` e não gravar arquivo para ele.
- Atualizar o mesmo par e incrementar `version` numa execução posterior do mesmo objetivo.
- Devolver o relatório `BLOCKED` contratado, sem arquivo e sem mudança desta tentativa, quando o gate não passa.
- Nomear `refactor` nas linhas de produtor de `IMPLEMENTATION_REPORT` e de `TEST_EVIDENCE`.
- Preservar esquema, template e dependências vazias.
- Atualizar a frase normativa de lifecycle para treze skills implementadas e cinco scaffold.

## Out of Scope

- Executar `research`, `implement`, `tdd` ou outra skill scaffold como parte do runtime de `refactor`.
- Estender o ADR `0001`, gravar relatório `draft` ou `blocked`, ou fazer `tdd` e `implement` invocarem `refactor`.
- Criar executor JavaScript, arquivo de teste novo, comando CLI, dependência, schema ou template.
- Alterar routing, sequências canônicas, catálogo de nomes, targets ou outras skills.
- Executar a matriz semântica e reconciliar a documentação de fechamento, reservadas ao ticket 02.
- Gravar o glossário como saída da skill.

## Dependencies

Nenhuma. Pode iniciar imediatamente.

## Implementation Notes

Começar pela regressão do catálogo. A fonte e o contrato devem expressar o mesmo comportamento. A única escrita da skill é o relatório `ready` e a evidência `ready`. Recomendação de `context-engineering`, `diagnose`, `clarify`, `implement`, `modernize` ou `research` não é composição. O bloqueio mais cedo segue a ordem da spec. A frase de lifecycle entra neste ticket para o manifest, o contrato e a fonte permanecerem coerentes. Evidência: `SPEC-20261013-002`, requisitos 2–14 e Testing Decisions.

## Acceptance Criteria

- [x] A regressão falha antes da migração pelo motivo esperado.
- [x] `refactor` está `implemented` no manifest, no contrato e na fonte.
- [x] O catálogo contém exatamente 13 skills `implemented` e 5 `scaffold`.
- [x] As dependências de `refactor` permanecem vazias.
- [x] Contrato e fonte possuem workflow operacional não vazio, idêntico, e sem linguagem de indisponibilidade.
- [x] Objetivo estrutural com linha de base que passa produz relatório e evidência `ready`, com o template existente e as seções obrigatórias.
- [x] O mesmo objetivo atualiza o mesmo par e incrementa `version`.
- [x] Contexto ausente produz `BLOCKED`, recomenda `context-engineering` e não grava arquivo.
- [x] Linha de base não observada produz `BLOCKED` e não grava arquivo.
- [x] Teste que falha antes da mudança produz `BLOCKED` e recomenda `diagnose`.
- [x] Pedido de mudança de comportamento produz `BLOCKED` e recomenda `implement`.
- [x] O relatório bloqueado traz os cinco campos contratados, nomeia cada pré-requisito ausente e recomenda a skill ou ação do bloqueio mais cedo. Não deixa arquivo nem mudança desta tentativa.
- [x] A skill não invoca a próxima. Refatoração não trivial autoriza `code-review` e não o invoca.
- [x] Segredo não é copiado. O arquivo gravado não conserva marcador de rascunho do template.
- [x] Nenhuma dependência, schema, template, target, CLI, regra de routing ou extensão do ADR `0001` é introduzida. As linhas de produtor passam a nomear `refactor`.

## Validation

- RED: `node --test --test-name-pattern='current catalogue implements code-review' tests/validate-skills.test.mjs` falhou porque o catálogo observado não continha `refactor`.
- GREEN focado: o mesmo comando passou após a migração. O workflow do contrato e o da fonte são idênticos, com 8643 caracteres.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs.
- `npm run validate` e `npm run skills:validate`: PASS, 18 skills.
- Ambiente: Linux 6.12.94+ x86_64, Node.js v22.14.0, npm 10.9.9.
- A observação agent-driven dos critérios de comportamento continua no ticket 02. Evidência: `TEST-20261013-003`.

## Definition of Done

- [x] Os critérios estruturais possuem evidência da suíte.
- [x] O workflow publicado cobre os critérios de comportamento deste ticket, deixando a observação agent-driven para o ticket 02.

## Title

02 — Validar e fechar v1-A13

## Goal

Comprovar o comportamento de `refactor` nos cenários de estrutura, atualização, autorização, bloqueio e sigilo, reconciliar a documentação e fechar a emenda v1-A13.

## Context

O ticket 01 torna o workflow operacional. `SPEC-20261013-002` exige evidência semântica separada da suíte Node e documentação coerente com treze skills implementadas. Os quatro targets e as outras cinco skills scaffold permanecem fora deste fechamento. Evidência: `SPEC-20261013-002`, critérios 22–24.

## Scope

- Executar os cenários agent-driven em diretório temporário e registrar a evidência fora da suíte Node.
- Reconciliar proveniência, README, estado arquitetural, padrões, estado do projeto, frase de versionamento, evidência de validação e handoff com treze skills implementadas.
- Rodar `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check`.
- Registrar o review de Standards e Spec.

## Out of Scope

- Alterar o comportamento publicado no ticket 01, salvo correção de desvio encontrado na matriz.
- Implementar outra skill scaffold.
- Certificar descoberta real nos quatro produtos.
- Publicar issue remota neste recorte.
- Estender o ADR `0001` ou criar executor.

## Dependencies

Ticket 01. Este ticket só começa depois que o workflow e a migração de catálogo estiverem publicados.

## Implementation Notes

Cada cenário usa um diretório temporário. Registrar entrada, evidência consultada, relatório e evidência observados ou ausência de arquivo, status, autorização de `code-review` e divergência. Cenário divergente bloqueia o fechamento até a correção permanecer dentro da v1-A13. A suíte Node não executa a skill. Evidência: `SPEC-20261013-002`, Testing Decisions e critério 22.

## Acceptance Criteria

- [x] Os cenários de estrutura, atualização, autorização, bloqueio e sigilo estão registrados fora da suíte Node.
- [x] Nenhum cenário invoca `implement`, `tdd`, `diagnose`, `code-review`, `modernize` ou `research`.
- [x] A documentação declara treze skills `implemented` e cinco `scaffold`, sem capability não verificada.
- [x] `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
- [x] O review final não contém achado bloqueante de Standards ou Spec.
- [x] A frontier de `SPEC-20261013-002` fica vazia somente depois deste ticket.

## Validation

- Matriz agent-driven: 18/18, em `TEST-20261013-004`. Nenhum cenário invocou `implement`, `tdd`, `diagnose`, `code-review`, `modernize` ou `research`.
- `npm run validate` e `npm run skills:validate`: PASS, 18 skills; 13 `implemented` e 5 `scaffold`.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs.
- `git diff --check`: conferido no fechamento.
- Ambiente: Linux 6.12.94+ x86_64, Node.js v22.14.0, npm 10.9.9.
- Review: `REVIEW-20261013-002`.

## Definition of Done

- [x] A evidência semântica, a suíte e o review autorizam o fechamento da emenda v1-A13.
- [x] O handoff distingue esta emenda do fechamento da v1-A12.

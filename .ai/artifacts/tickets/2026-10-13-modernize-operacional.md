---
artifact: ticket_set
id: TICKET-SET-20261013-007
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261013-007
---

# modernize operacional — emenda v1-A18

Conjunto executável derivado de `SPEC-20261013-007`. Cada bloco abaixo é um registro TICKET com as seções exigidas pelo contrato. R8 e R9 não se aplicam a esta spec: a emenda operacionaliza uma skill e não muda o domínio de um produto consumidor nem uma fronteira de arquitetura do pacote. Evidência: a própria spec e o precedente de `SPEC-20261013-006`.

Triagem local: `ready-for-agent`. Publicação remota pendente até reconciliação com GitHub Issues, sem criação de duplicatas.

## Title

01 — Operacionalizar modernize

## Goal

Implementar a skill `modernize` para gravar `MODERNIZATION_PLAN` `ready` quando o gate passa, e para devolver o relatório `BLOCKED` quando o contexto, o estado atual, o objetivo, a decisão ou a evidência impedem essa gravação.

## Context

`SPEC-20261013-007` define a emenda v1-A18. `DECISION-SET-20261013-007` confirma um único seam de comportamento, com a suíte Node acompanhando o catálogo, as dependências opcionais e o esquema definido de `MODERNIZATION_PLAN`. Este ticket publica o workflow e migra `modernize` para `implemented`. O ADR `0001` continua restrito ao conjunto de decisões. A observação agent-driven do comportamento fica no ticket 02. Evidência: `SPEC-20261013-007`, requisitos 1–12 e critérios 1, 23 e 24.

## Scope

- Criar a regressão estrutural em RED para a migração de `modernize` na asserção de catálogo já existente.
- Alterar o status de `modernize` para `implemented` no manifest, no contrato e na fonte.
- Substituir o placeholder por workflow operacional idêntico nas duas fontes.
- Gravar somente `MODERNIZATION_PLAN` `ready`, com `created_by: modernize`, um arquivo por objetivo.
- Não alterar código de aplicação e não executar a migração.
- Atualizar o mesmo arquivo e incrementar `version` numa execução posterior do mesmo objetivo.
- Devolver o relatório `BLOCKED` contratado, sem arquivo e sem mudança de aplicação desta tentativa, quando o gate não passa.
- Preservar esquema, template, linha de produtor e dependências opcionais.
- Restaurar a amostra scaffold dentro do fixture nos casos negativos.
- Atualizar a frase normativa de lifecycle para dezoito skills implementadas e zero scaffold.

## Out of Scope

- Executar `to-tickets`, `implement` ou outra skill como parte do runtime de `modernize`.
- Estender o ADR `0001`, gravar plano `draft` ou `blocked`, ou fazer outras skills invocarem `modernize`.
- Criar executor JavaScript, arquivo de teste novo, comando CLI, dependência, schema ou template.
- Alterar routing, sequências canônicas, catálogo de nomes, targets, `contracts/artifacts.md` ou outras skills.
- Executar a matriz semântica e reconciliar a documentação de fechamento, reservadas ao ticket 02.
- Gravar o glossário como saída da skill.

## Dependencies

Nenhuma. Pode iniciar imediatamente.

## Implementation Notes

Começar pela regressão do catálogo. A fonte e o contrato devem expressar o mesmo comportamento. A escrita da skill é o `MODERNIZATION_PLAN` `ready`. Recomendação de `context-engineering`, `clarify`, `implement`, `diagnose`, `refactor`, `docs`, `research`, `architecture-design` ou `to-tickets` não é composição. O bloqueio mais cedo segue a ordem da spec. A frase de lifecycle entra neste ticket para o manifest, o contrato e a fonte permanecerem coerentes. Evidência: `SPEC-20261013-007`, requisitos 2–12 e Testing Decisions.

## Acceptance Criteria

- [x] A regressão falha antes da migração pelo motivo esperado.
- [x] `modernize` está `implemented` no manifest, no contrato e na fonte.
- [x] O catálogo contém exatamente 18 skills `implemented` e 0 `scaffold`.
- [x] As dependências opcionais de `modernize` permanecem as cinco já declaradas.
- [x] Contrato e fonte possuem workflow operacional não vazio, idêntico, e sem linguagem de indisponibilidade.
- [x] Objetivo delimitado produz `MODERNIZATION_PLAN` `ready`, com o template existente e as seções obrigatórias, sem alterar código de aplicação.
- [x] O mesmo objetivo atualiza o mesmo arquivo e incrementa `version`.
- [x] Arquitetura ausente produz `BLOCKED` e recomenda `context-engineering`.
- [x] Upgrade sem controle produz `BLOCKED` e recomenda `clarify`.
- [x] O relatório bloqueado traz os cinco campos contratados, nomeia cada pré-requisito ausente e recomenda a skill ou ação do bloqueio mais cedo. Não deixa arquivo desta tentativa nem altera código de aplicação.
- [x] A skill não invoca a próxima. Plano pronto autoriza `to-tickets` e não autoriza `implement` direto.
- [x] Segredo não é copiado. O arquivo gravado não conserva marcador de rascunho do template.
- [x] Nenhuma dependência, schema, template, target, CLI, regra de routing ou extensão do ADR `0001` é introduzida. A linha de produtor permanece `modernize`.

## Validation

- RED: `node --test --test-name-pattern='current catalogue implements modernize' tests/validate-skills.test.mjs` falhou porque a lista observada terminava em `docs` e não continha `modernize`.
- GREEN focado: o mesmo comando passou após a migração. O workflow do contrato e o da fonte são idênticos, com 9143 caracteres.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs.
- `npm run validate`: PASS, 18 skills.
- Ambiente: Linux 6.12.94+ x86_64, Node.js v22.14.0, npm 10.9.9.
- A observação agent-driven dos critérios de comportamento continua no ticket 02. Evidência: `TEST-20261013-013`.

## Definition of Done

- [x] Os critérios estruturais possuem evidência da suíte.
- [x] O workflow publicado cobre os critérios de comportamento deste ticket, deixando a observação agent-driven para o ticket 02.

## Title

02 — Validar e fechar v1-A18

## Goal

Comprovar o comportamento de `modernize` nos cenários de plano, repetição, bloqueio e sigilo, reconciliar a documentação e fechar a emenda v1-A18.

## Context

O ticket 01 torna o workflow operacional. `SPEC-20261013-007` exige evidência semântica separada da suíte Node e documentação coerente com dezoito skills implementadas. Os quatro targets permanecem fora deste fechamento. Evidência: `SPEC-20261013-007`, critérios 25–27.

## Scope

- Executar os cenários agent-driven em diretório temporário e registrar a evidência fora da suíte Node.
- Reconciliar proveniência, README, estado arquitetural, padrões, estado do projeto, frase de versionamento, evidência de validação e handoff com dezoito skills implementadas.
- Rodar `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check`.
- Registrar o review de Standards e Spec.

## Out of Scope

- Alterar o comportamento publicado no ticket 01, salvo correção de desvio encontrado na matriz.
- Implementar outra skill.
- Certificar descoberta real nos quatro produtos.
- Publicar issue remota neste recorte.
- Estender o ADR `0001` ou criar executor.

## Dependencies

Ticket 01. Este ticket só começa depois que o workflow e a migração de catálogo estiverem publicados.

## Implementation Notes

Cada cenário usa um diretório temporário. Registrar entrada, evidência consultada, plano observado ou ausência de arquivo, status, autorização e divergência. Cenário divergente bloqueia o fechamento até a correção permanecer dentro da v1-A18. A suíte Node não executa a skill. Evidência: `SPEC-20261013-007`, Testing Decisions e critério 25.

## Acceptance Criteria

- [x] Os cenários de plano, repetição, bloqueio e sigilo estão registrados fora da suíte Node.
- [x] Nenhum cenário invoca outra skill.
- [x] A documentação declara dezoito skills `implemented` e zero `scaffold`, sem capability não verificada.
- [x] `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
- [x] O review final não contém achado bloqueante de Standards ou Spec.
- [x] A frontier de `SPEC-20261013-007` fica vazia somente depois deste ticket.

## Validation

- Matriz agent-driven: 18/18, em `TEST-20261013-014`. Nenhum cenário invocou outra skill.
- `npm run validate` e `npm run skills:validate`: PASS, 18 skills; 18 `implemented` e 0 `scaffold`.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs.
- `git diff --check`: conferido no fechamento.
- Ambiente: Linux 6.12.94+ x86_64, Node.js v22.14.0, npm 10.9.9.
- Review: `REVIEW-20261013-010`, PASS.

## Definition of Done

- [x] A evidência semântica, a suíte e o review autorizam o fechamento da emenda v1-A18.
- [x] O handoff distingue esta emenda do fechamento da v1-A17.

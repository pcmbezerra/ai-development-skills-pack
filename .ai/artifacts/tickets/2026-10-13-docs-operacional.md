---
artifact: ticket_set
id: TICKET-SET-20261013-005
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261013-005
---

# docs operacional — emenda v1-A16

Conjunto executável derivado de `SPEC-20261013-005`. Cada bloco abaixo é um registro TICKET com as seções exigidas pelo contrato. R8 e R9 não se aplicam a esta spec: a emenda operacionaliza uma skill e não muda o domínio de um produto consumidor nem uma fronteira de arquitetura do pacote. Evidência: a própria spec e o precedente de `SPEC-20261013-004`.

Triagem local: `ready-for-agent`. Publicação remota pendente até reconciliação com GitHub Issues, sem criação de duplicatas.

## Title

01 — Operacionalizar docs

## Goal

Implementar a skill `docs` para gravar `DOC_UPDATE` `ready` quando o gate passa, e para devolver o relatório `BLOCKED` quando o contexto, a configuração, o objetivo, a decisão ou a evidência impedem essa gravação.

## Context

`SPEC-20261013-005` define a emenda v1-A16. `DECISION-SET-20261013-005` confirma um único seam de comportamento, com a suíte Node acompanhando o catálogo, as dependências vazias e o esquema definido de `DOC_UPDATE`. Este ticket publica o workflow e migra `docs` para `implemented`. O ADR `0001` continua restrito ao conjunto de decisões. A observação agent-driven do comportamento fica no ticket 02. Evidência: `SPEC-20261013-005`, requisitos 1–14 e critérios 1, 23 e 24.

## Scope

- Criar a regressão estrutural em RED para a migração de `docs` na asserção de catálogo já existente.
- Alterar o status de `docs` para `implemented` no manifest, no contrato e na fonte.
- Substituir o placeholder por workflow operacional idêntico nas duas fontes.
- Gravar somente `DOC_UPDATE` `ready`, com `created_by: docs`, um arquivo por objetivo, e a mudança de documentação sob o caminho seguro.
- Citar `CHANGE_SET` como `working tree` e não gravar arquivo para ele.
- Atualizar o mesmo arquivo e incrementar `version` numa execução posterior do mesmo objetivo.
- Devolver o relatório `BLOCKED` contratado, sem arquivo e sem mudança desta tentativa, quando o gate não passa.
- Preservar esquema, template, linha de produtor e dependências vazias.
- Atualizar a frase normativa de lifecycle para dezesseis skills implementadas e duas scaffold.

## Out of Scope

- Executar `implement`, `research` ou outra skill scaffold como parte do runtime de `docs`.
- Estender o ADR `0001`, gravar `DOC_UPDATE` `draft` ou `blocked`, ou fazer `implement` e `refactor` invocarem `docs`.
- Criar executor JavaScript, arquivo de teste novo, comando CLI, dependência, schema ou template.
- Alterar routing, sequências canônicas, catálogo de nomes, targets, `contracts/artifacts.md` ou outras skills.
- Executar a matriz semântica e reconciliar a documentação de fechamento, reservadas ao ticket 02.
- Gravar o glossário como saída da skill.

## Dependencies

Nenhuma. Pode iniciar imediatamente.

## Implementation Notes

Começar pela regressão do catálogo. A fonte e o contrato devem expressar o mesmo comportamento. A escrita da skill é o `DOC_UPDATE` `ready` e a mudança de documentação sob o caminho seguro. Recomendação de `context-engineering`, `setup-ai-development-skills`, `clarify`, `implement`, `diagnose`, `refactor`, `modernize`, `research`, `to-spec` ou `architecture-design` não é composição. O bloqueio mais cedo segue a ordem da spec. A frase de lifecycle entra neste ticket para o manifest, o contrato e a fonte permanecerem coerentes. Evidência: `SPEC-20261013-005`, requisitos 2–14 e Testing Decisions.

## Acceptance Criteria

- [x] A regressão falha antes da migração pelo motivo esperado.
- [x] `docs` está `implemented` no manifest, no contrato e na fonte.
- [x] O catálogo contém exatamente 16 skills `implemented` e 2 `scaffold`.
- [x] As dependências de `docs` permanecem vazias.
- [x] Contrato e fonte possuem workflow operacional não vazio, idêntico, e sem linguagem de indisponibilidade.
- [x] Objetivo documental com evidência que diverge produz `DOC_UPDATE` `ready`, com o template existente e as seções obrigatórias.
- [x] O mesmo objetivo atualiza o mesmo arquivo e incrementa `version`.
- [x] Contexto ausente produz `BLOCKED`, recomenda `context-engineering` e não grava arquivo.
- [x] `docsPath` que escapa da raiz produz `BLOCKED` e recomenda `setup-ai-development-skills`.
- [x] Objetivo ausente produz `BLOCKED` e recomenda `clarify`.
- [x] Pedido de mudança de comportamento produz `BLOCKED` e recomenda `implement`.
- [x] O relatório bloqueado traz os cinco campos contratados, nomeia cada pré-requisito ausente e recomenda a skill ou ação do bloqueio mais cedo. Não deixa arquivo nem mudança desta tentativa.
- [x] A skill não invoca a próxima. Atualização pronta não autoriza implementação.
- [x] Segredo não é copiado. O arquivo gravado não conserva marcador de rascunho do template.
- [x] Nenhuma dependência, schema, template, target, CLI, regra de routing ou extensão do ADR `0001` é introduzida. A linha de produtor permanece `docs`.

## Validation

- RED: `node --test --test-name-pattern='current catalogue implements docs' tests/validate-skills.test.mjs` falhou porque o catálogo observado não continha `docs`.
- GREEN focado: o mesmo comando passou após a migração. O workflow do contrato e o da fonte são idênticos, com 7809 caracteres.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs.
- `npm run validate`: PASS, 18 skills.
- Ambiente: Linux 6.12.94+ x86_64, Node.js v22.14.0, npm 10.9.9.
- A observação agent-driven dos critérios de comportamento continua no ticket 02. Evidência: `TEST-20261013-009`.

## Definition of Done

- [x] Os critérios estruturais possuem evidência da suíte.
- [x] O workflow publicado cobre os critérios de comportamento deste ticket, deixando a observação agent-driven para o ticket 02.

## Title

02 — Validar e fechar v1-A16

## Goal

Comprovar o comportamento de `docs` nos cenários de atualização, desenho futuro, bloqueio e sigilo, reconciliar a documentação e fechar a emenda v1-A16.

## Context

O ticket 01 torna o workflow operacional. `SPEC-20261013-005` exige evidência semântica separada da suíte Node e documentação coerente com dezesseis skills implementadas. Os quatro targets e as outras duas skills scaffold permanecem fora deste fechamento. Evidência: `SPEC-20261013-005`, critérios 25–27.

## Scope

- Executar os cenários agent-driven em diretório temporário e registrar a evidência fora da suíte Node.
- Reconciliar proveniência, README, estado arquitetural, padrões, estado do projeto, frase de versionamento, evidência de validação e handoff com dezesseis skills implementadas.
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

Cada cenário usa um diretório temporário. Registrar entrada, evidência consultada, `DOC_UPDATE` observado ou ausência de arquivo, status, autorização de implementação e divergência. Cenário divergente bloqueia o fechamento até a correção permanecer dentro da v1-A16. A suíte Node não executa a skill. Evidência: `SPEC-20261013-005`, Testing Decisions e critério 25.

## Acceptance Criteria

- [ ] Os cenários de atualização, desenho futuro, bloqueio e sigilo estão registrados fora da suíte Node.
- [ ] Nenhum cenário invoca outra skill.
- [ ] A documentação declara dezesseis skills `implemented` e duas `scaffold`, sem capability não verificada.
- [ ] `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
- [ ] O review final não contém achado bloqueante de Standards ou Spec.
- [ ] A frontier de `SPEC-20261013-005` fica vazia somente depois deste ticket.

## Validation

Pendente até a matriz e a suíte de fechamento.

## Definition of Done

- [ ] A evidência semântica, a suíte e o review autorizam o fechamento da emenda v1-A16.
- [ ] O handoff distingue esta emenda do fechamento da v1-A15.

---
artifact: ticket_set
id: TICKET-SET-20261013-001
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261013-001
---

# handoff operacional — emenda v1-A12

Conjunto executável derivado de `SPEC-20261013-001`. Cada bloco abaixo é um registro TICKET com as seções exigidas pelo contrato. R8 e R9 não se aplicam a esta spec: a emenda operacionaliza uma skill e não muda o domínio de um produto consumidor nem uma fronteira de arquitetura do pacote. Evidência: a própria spec e o precedente de `SPEC-20261010-001`.

Triagem local: `ready-for-agent`. Publicação remota pendente até reconciliação com GitHub Issues, sem criação de duplicatas.

## Title

01 — Operacionalizar handoff

## Goal

Implementar a skill `handoff` para gravar um handoff `ready` quando o gate passa, e para devolver o relatório `BLOCKED` quando o estado atual, o estado da mudança, o inventário, a decisão ou o fato externo impedem essa gravação.

## Context

`SPEC-20261013-001` define a emenda v1-A12. `DECISION-SET-20261013-001` confirma um único seam de comportamento, com a suíte Node acompanhando o catálogo, as dependências vazias e o esquema definido de `HANDOFF`. Este ticket publica o workflow e migra `handoff` para `implemented`. O ADR `0001` continua restrito ao conjunto de decisões. A observação agent-driven do comportamento fica no ticket 02. Evidência: `SPEC-20261013-001`, requisitos 1–11 e critérios 1, 13 e 14.

## Scope

- Criar a regressão estrutural em RED para a migração de `handoff` na asserção de catálogo já existente.
- Alterar o status de `handoff` para `implemented` no manifest, no contrato e na fonte.
- Substituir o placeholder por workflow operacional idêntico nas duas fontes.
- Gravar somente handoff `ready` no diretório `.ai/artifacts/handoffs/`, com o template existente e um arquivo por objetivo.
- Atualizar o mesmo arquivo e incrementar `version` numa execução posterior do mesmo objetivo.
- Devolver o relatório `BLOCKED` contratado, sem arquivo, quando o gate não passa.
- Preservar esquema, template e dependências vazias.
- Atualizar a frase normativa de lifecycle para doze skills implementadas e seis scaffold.

## Out of Scope

- Executar `research`, `implement` ou outra skill scaffold.
- Estender o ADR `0001`, gravar handoff `draft` ou `blocked`, ou alterar código de aplicação.
- Criar executor JavaScript, arquivo de teste novo, comando CLI, dependência, schema ou template.
- Alterar routing, sequências canônicas, catálogo de nomes, targets ou outras skills.
- Executar a matriz semântica e reconciliar a documentação de fechamento, reservadas ao ticket 02.
- Gravar o glossário como saída da skill.

## Dependencies

Nenhuma. Pode iniciar imediatamente.

## Implementation Notes

Começar pela regressão do catálogo. A fonte e o contrato devem expressar o mesmo comportamento. A única escrita da skill é o handoff `ready`. Recomendação de `context-engineering`, `clarify`, `research` ou `implement` não é composição. O bloqueio mais cedo segue a ordem da spec: estado atual ausente, estado da mudança não observado, inventário não observado, problema de decisão, fato externo. Insumo fora de `ready` não bloqueia a gravação e não autoriza implementação. A frase de lifecycle entra neste ticket para o manifest, o contrato e a fonte permanecerem coerentes. Evidência: `SPEC-20261013-001`, requisitos 2–11 e Testing Decisions.

## Acceptance Criteria

- [x] A regressão falha antes da migração pelo motivo esperado.
- [x] `handoff` está `implemented` no manifest, no contrato e na fonte.
- [x] O catálogo contém exatamente 12 skills `implemented` e 6 `scaffold`.
- [x] As dependências de `handoff` permanecem vazias.
- [x] Contrato e fonte possuem workflow operacional não vazio, idêntico, e sem linguagem de indisponibilidade.
- [x] Estado verificado produz um handoff `ready`, com o template existente e as seções obrigatórias.
- [x] O mesmo objetivo atualiza o mesmo arquivo e incrementa `version`.
- [x] Estado atual ausente produz `BLOCKED`, recomenda `context-engineering` quando a lacuna é o contexto do projeto, e não grava handoff.
- [x] Insumo fora de `ready` não autoriza implementação.
- [x] Conflito com decisão existente produz `BLOCKED` e recomenda `clarify`.
- [x] Fato externo que teria de ser declarado verificado produz `BLOCKED` e recomenda `research`, sem acesso à rede.
- [x] O relatório bloqueado traz os cinco campos contratados, nomeia cada pré-requisito ausente e recomenda a skill ou ação do bloqueio mais cedo. Não deixa arquivo.
- [x] A skill não invoca a próxima. Handoff `ready` autoriza retomada a partir dos artefatos citados.
- [x] Segredo não é copiado. O arquivo gravado não conserva marcador de rascunho do template.
- [x] Nenhuma dependência, schema, template, target, CLI, regra de routing ou extensão do ADR `0001` é introduzida.

## Validation

- RED: `node --test --test-name-pattern='current catalogue implements code-review' tests/validate-skills.test.mjs` falhou porque o catálogo observado não continha `handoff`.
- GREEN focado: o mesmo comando passou após a migração. O workflow do contrato e o da fonte são idênticos.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs.
- `npm run validate` e `npm run skills:validate`: PASS, 18 skills.
- Ambiente: Linux 6.12.94+ x86_64, Node.js v22.14.0, npm 10.9.9.
- A observação agent-driven dos critérios de comportamento continua no ticket 02. Evidência: `TEST-20261013-001`.

## Definition of Done

- [x] Os critérios estruturais possuem evidência da suíte.
- [x] O workflow publicado cobre os critérios de comportamento deste ticket, deixando a observação agent-driven para o ticket 02.

## Title

02 — Validar e fechar v1-A12

## Goal

Comprovar o comportamento de `handoff` nos cenários de transferência, atualização, insumo não pronto, bloqueio e sigilo, reconciliar a documentação e fechar a emenda v1-A12.

## Context

O ticket 01 torna o workflow operacional. `SPEC-20261013-001` exige evidência semântica separada da suíte Node e documentação coerente com doze skills implementadas. Os quatro targets e as outras seis skills scaffold permanecem fora deste fechamento. Evidência: `SPEC-20261013-001`, critérios 15–17.

## Scope

- Executar os cenários agent-driven em diretório temporário e registrar a evidência fora da suíte Node.
- Reconciliar proveniência, README, estado arquitetural, padrões, estado do projeto, frase de lifecycle, evidência de validação e handoff com doze skills implementadas.
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

Cada cenário usa um diretório temporário. Registrar entrada, evidência consultada, handoff observado ou ausência de arquivo, status, autorização de implementação e divergência. Cenário divergente bloqueia o fechamento até a correção permanecer dentro da v1-A12. A suíte Node não executa a skill. Evidência: `SPEC-20261013-001`, Testing Decisions e critério 15.

## Acceptance Criteria

- [x] Os cenários de transferência, atualização, insumo não pronto, bloqueio e sigilo estão registrados fora da suíte Node.
- [x] Nenhum cenário invoca `context-engineering`, `clarify`, `research` ou `implement`.
- [x] A documentação declara doze skills `implemented` e seis `scaffold`, sem capability não verificada.
- [x] `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
- [x] O review final não contém achado bloqueante de Standards ou Spec.
- [x] A frontier de `SPEC-20261013-001` fica vazia somente depois deste ticket.

## Validation

- Matriz agent-driven: 12/12, em `TEST-20261013-002`. Nenhum cenário invocou `context-engineering`, `clarify`, `research` ou `implement`.
- `npm run validate` e `npm run skills:validate`: PASS, 18 skills; 12 `implemented` e 6 `scaffold`.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs.
- `git diff --check`: conferido no fechamento.
- Ambiente: Linux 6.12.94+ x86_64, Node.js v22.14.0, npm 10.9.9.
- Review: `REVIEW-20261013-001`.

## Definition of Done

- [x] A evidência semântica, a suíte e o review autorizam o fechamento da emenda v1-A12.
- [x] O handoff distingue esta emenda do fechamento da v1-A11.

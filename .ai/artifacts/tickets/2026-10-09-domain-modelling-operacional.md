---
artifact: ticket_set
id: TICKET-SET-20261009-002
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261009-002
---

# domain-modelling operacional — emenda v1-A8

Conjunto executável derivado de `SPEC-20261009-002`. Cada bloco abaixo é um registro TICKET com as seções exigidas pelo contrato. R8 e R9 não se aplicam a esta spec: a emenda operacionaliza uma skill e não muda o domínio de um produto consumidor nem uma fronteira de arquitetura do pacote. Evidência: a própria spec e o precedente de `SPEC-20261009-001`.

Triagem local: `ready-for-agent`. Publicação remota pendente: `gh` não está no PATH. O Markdown local é a fonte de verdade até reconciliação com GitHub Issues, sem criação de duplicatas.

## Title

01 — Operacionalizar domain-modelling

## Goal

Implementar a skill `domain-modelling` para gravar um modelo `ready` quando o gate passa, e para devolver o relatório `BLOCKED` quando o contexto, o insumo, a decisão, o fato externo ou a ausência de justificativa impedem essa gravação.

## Context

`SPEC-20261009-002` define a emenda v1-A8. `DECISION-SET-20261009-001` confirma um único seam de comportamento, com a suíte Node acompanhando o catálogo, as dependências vazias e o esquema definido de `DOMAIN_MODEL`. Este ticket publica o workflow e migra `domain-modelling` para `implemented`. O ADR `0001` continua restrito ao conjunto de decisões. A observação agent-driven do comportamento fica no ticket 02. Evidência: `SPEC-20261009-002`, requisitos 1–11 e critérios 1–14.

## Scope

- Criar a regressão estrutural em RED para a migração de `domain-modelling` na asserção de catálogo já existente.
- Alterar o status de `domain-modelling` para `implemented` no manifest, no contrato e na fonte.
- Substituir o placeholder por workflow operacional idêntico nas duas fontes.
- Gravar somente modelo `ready` no diretório `.ai/artifacts/domain/`, com o template existente e um arquivo por objetivo.
- Atualizar o mesmo arquivo e incrementar `version` numa execução posterior do mesmo objetivo.
- Devolver o relatório `BLOCKED` contratado, sem arquivo, quando o gate não passa.
- Preservar esquema, template e dependências vazias.
- Atualizar a frase normativa de lifecycle para sete skills implementadas.

## Out of Scope

- Executar `architecture-design`, `research`, `implement` ou outra skill scaffold.
- Estender o ADR `0001`, gravar modelo `draft` ou `blocked`, ou alterar código de aplicação.
- Criar executor JavaScript, arquivo de teste novo, comando CLI, dependência, schema ou template.
- Alterar routing, sequências canônicas, catálogo de nomes, targets ou outras skills.
- Executar a matriz semântica e reconciliar a documentação de fechamento, reservadas ao ticket 02.
- Gravar o glossário como saída da skill.

## Dependencies

Nenhuma. Pode iniciar imediatamente.

## Implementation Notes

Começar pela regressão do catálogo. A fonte e o contrato devem expressar o mesmo comportamento. A única escrita da skill é o modelo `ready`. Recomendação de `context-engineering`, `clarify`, `to-spec`, `research`, `architecture-design` ou `to-tickets` não é composição. O bloqueio mais cedo segue a ordem da spec: contexto ausente, problema de conjunto, problema de spec, fato externo, mudança que não justifica modelo. Spec e conjunto são alternativos: a ausência de um não bloqueia quando o outro está `ready`. A frase de lifecycle entra neste ticket para o manifest, o contrato e a fonte permanecerem coerentes. Evidência: `SPEC-20261009-002`, requisitos 2–11 e Testing Decisions.

## Acceptance Criteria

- [x] A regressão falha antes da migração pelo motivo esperado.
- [x] `domain-modelling` está `implemented` no manifest, no contrato e na fonte.
- [x] O catálogo contém exatamente 7 skills `implemented` e 11 `scaffold`.
- [x] As dependências de `domain-modelling` permanecem vazias.
- [x] Contrato e fonte possuem workflow operacional não vazio, idêntico, e sem linguagem de indisponibilidade.
- [x] Spec `ready` que justifica modelo produz um modelo `ready`, com o template existente e as oito seções obrigatórias. Conjunto ausente não bloqueia.
- [x] Conjunto `ready` sem spec produz modelo `ready`. Spec ausente não bloqueia.
- [x] O mesmo objetivo atualiza o mesmo arquivo e incrementa `version`.
- [x] Contexto ausente produz `BLOCKED`, recomenda `context-engineering` e não grava modelo.
- [x] Nenhum insumo `ready` produz `BLOCKED` e recomenda `clarify` ou `to-spec`, conforme o bloqueio mais cedo.
- [x] Mudança sem justificativa de R8 produz `BLOCKED`, nenhum arquivo e nenhum constructo de DDD.
- [x] Premissa não vira conceito nem invariante. Ambiguidade material e conflito com decisão existente produzem `BLOCKED` e recomendam `clarify`.
- [x] Fato externo que ainda altera o modelo produz `BLOCKED` e recomenda `research`, sem acesso à rede.
- [x] O relatório bloqueado traz os cinco campos contratados, nomeia cada pré-requisito ausente e recomenda a skill do bloqueio mais cedo. Não deixa arquivo.
- [x] A skill informa se o próximo consumidor está autorizado e não o invoca. Modelo `ready` autoriza `architecture-design` quando R9 se aplica e, caso contrário, `to-tickets`.
- [x] Segredo não é copiado. O arquivo gravado não conserva marcador de rascunho do template.
- [x] Nenhuma dependência, schema, template, target, CLI, regra de routing ou extensão do ADR `0001` é introduzida.

## Validation

- RED: `node --test --test-name-pattern='current catalogue implements domain-modelling' tests/validate-skills.test.mjs` falhou porque o catálogo observado era `setup-ai-development-skills`, `workflow`, `clarify`, `context-engineering`, `to-spec`, `to-tickets`.
- GREEN focado: o mesmo comando passou após a migração. O workflow do contrato e o da fonte são idênticos.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs.
- `npm run validate` e `npm run skills:validate`: PASS, 18 skills.
- `git diff --check`: PASS.
- Ambiente: macOS 26.6.2 (Darwin 25.6.0), Node.js v26.5.0, npm 11.17.0.
- A observação agent-driven dos critérios de comportamento continua no ticket 02.

## Definition of Done

- [x] Os critérios estruturais possuem evidência da suíte.
- [x] O workflow publicado cobre os critérios de comportamento deste ticket, deixando a observação agent-driven para o ticket 02.

## Title

02 — Validar e fechar v1-A8

## Goal

Comprovar o comportamento de `domain-modelling` nos cenários de modelo pronto, atualização, insumo alternativo, DDD não forçado, bloqueio e sigilo, reconciliar a documentação e fechar a emenda v1-A8.

## Context

O ticket 01 torna o workflow operacional. `SPEC-20261009-002` exige evidência semântica separada da suíte Node e documentação coerente com sete skills implementadas. Os quatro targets e as outras onze skills scaffold permanecem fora deste fechamento. Evidência: `SPEC-20261009-002`, critérios 15–18.

## Scope

- Executar os cenários agent-driven em diretório temporário e registrar a evidência fora da suíte Node.
- Reconciliar proveniência, README, estado arquitetural, padrões, estado do projeto, frase de lifecycle, evidência de validação e handoff com sete skills implementadas.
- Rodar `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check`.
- Registrar o review de Standards e Spec.

## Out of Scope

- Alterar o comportamento publicado no ticket 01, salvo correção de desvio encontrado na matriz.
- Implementar outra skill scaffold.
- Certificar Node.js 22, Linux ou descoberta real nos quatro produtos.
- Publicar issue remota enquanto `gh` estiver ausente.
- Estender o ADR `0001` ou criar executor.

## Dependencies

Ticket 01. Este ticket só começa depois que o workflow e a migração de catálogo estiverem publicados.

## Implementation Notes

Cada cenário usa um diretório temporário. Registrar entrada, evidência consultada, modelo observado ou ausência de arquivo, status, autorização do próximo consumidor e divergência. Cenário divergente bloqueia o fechamento até a correção permanecer dentro da v1-A8. A suíte Node não executa a skill. A publicação remota continua pendente enquanto `gh` estiver ausente. Evidência: `SPEC-20261009-002`, Testing Decisions e critério 15.

## Acceptance Criteria

- [x] Os cenários de modelo pronto, atualização, insumo alternativo, DDD não forçado, bloqueio e sigilo estão registrados fora da suíte Node.
- [x] Nenhum cenário invoca `architecture-design`, `to-tickets`, `research` ou `implement`.
- [x] A documentação declara sete skills `implemented` e onze `scaffold`, sem capability não verificada.
- [x] `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
- [x] O review final não contém achado bloqueante de Standards ou Spec.
- [x] A frontier de `SPEC-20261009-002` fica vazia somente depois deste ticket.

## Validation

- Matriz agent-driven: 18/18, em `TEST-20261009-002`. Nenhum cenário invocou `architecture-design`, `to-tickets`, `research` ou `implement`.
- `npm run validate` e `npm run skills:validate`: PASS, 18 skills; 7 `implemented` e 11 `scaffold`.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs.
- `git diff --check`: PASS.
- Ambiente: macOS 26.6.2 (Darwin 25.6.0), Node.js v26.5.0, npm 11.17.0.
- Review: `REVIEW-20261009-002`, PASS após correções.

## Definition of Done

- [x] A evidência semântica, a suíte e o review autorizam o fechamento da emenda v1-A8.
- [x] O handoff distingue esta emenda do fechamento da v1-A7.

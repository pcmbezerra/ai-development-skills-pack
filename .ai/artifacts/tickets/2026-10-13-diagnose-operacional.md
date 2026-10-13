---
artifact: ticket_set
id: TICKET-SET-20261013-002
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261013-002
---

# diagnose operacional — emenda v1-A13

Conjunto executável derivado de `SPEC-20261013-002`. Cada bloco abaixo é um registro TICKET com as seções exigidas pelo contrato. R8 e R9 não se aplicam a esta spec: a emenda operacionaliza uma skill e não muda o domínio de um produto consumidor nem uma fronteira de arquitetura do pacote. Evidência: a própria spec e o precedente de `SPEC-20261013-001`.

Triagem local: `ready-for-agent`. Publicação remota pendente até reconciliação com GitHub Issues, sem criação de duplicatas.

## Title

01 — Operacionalizar diagnose

## Goal

Implementar a skill `diagnose` para gravar um diagnóstico `ready` quando o gate passa, e para devolver o relatório `BLOCKED` quando o contexto, o sintoma, o repositório, a decisão ou o fato externo impedem essa gravação.

## Context

`SPEC-20261013-002` define a emenda v1-A13. `DECISION-SET-20261013-002` confirma um único seam de comportamento, com a suíte Node acompanhando o catálogo, a dependência opcional `tdd` e o esquema definido de `DIAGNOSIS_REPORT`. Este ticket publica o workflow e migra `diagnose` para `implemented`. O ADR `0001` continua restrito ao conjunto de decisões. A observação agent-driven do comportamento fica no ticket 02. Evidência: `SPEC-20261013-002`, requisitos 1–11 e critérios 1, 14 e 15.

## Scope

- Criar a regressão estrutural em RED para a migração de `diagnose` na asserção de catálogo já existente.
- Alterar o status de `diagnose` para `implemented` no manifest, no contrato e na fonte.
- Substituir o placeholder por workflow operacional idêntico nas duas fontes.
- Gravar somente diagnóstico `ready` no diretório `.ai/artifacts/diagnosis/`, com o template existente e um arquivo por sintoma.
- Atualizar o mesmo arquivo e incrementar `version` numa execução posterior do mesmo sintoma.
- Devolver o relatório `BLOCKED` contratado, sem arquivo, quando o gate não passa.
- Preservar esquema, template e a dependência opcional `tdd`.
- Mover as mutações de skill `scaffold` de `diagnose` para `research`.
- Atualizar a frase normativa de lifecycle para treze skills implementadas e cinco scaffold.

## Out of Scope

- Executar `research`, `tdd`, `implement` ou outra skill scaffold.
- Estender o ADR `0001`, gravar diagnóstico `draft` ou `blocked`, ou alterar código de aplicação.
- Criar executor JavaScript, arquivo de teste novo, comando CLI, dependência, schema ou template.
- Alterar routing, sequências canônicas, catálogo de nomes, targets ou outras skills.
- Executar a matriz semântica e reconciliar a documentação de fechamento, reservadas ao ticket 02.
- Gravar o glossário como saída da skill.

## Dependencies

Nenhuma. Pode iniciar imediatamente.

## Implementation Notes

Começar pela regressão do catálogo. A fonte e o contrato devem expressar o mesmo comportamento. A única escrita da skill é o diagnóstico `ready`. Recomendação de `context-engineering`, `clarify`, `research`, `tdd` ou `implement` não é composição. O bloqueio mais cedo segue a ordem da spec: contexto do projeto, sintoma desconhecido, repositório não observado, problema de decisão, fato externo. Causa provável ou hipótese não confirmada não autoriza implementação. A frase de lifecycle entra neste ticket para o manifest, o contrato e a fonte permanecerem coerentes. Evidência: `SPEC-20261013-002`, requisitos 2–11 e Testing Decisions.

## Acceptance Criteria

- [x] A regressão falha antes da migração pelo motivo esperado.
- [x] `diagnose` está `implemented` no manifest, no contrato e na fonte.
- [x] O catálogo contém exatamente 13 skills `implemented` e 5 `scaffold`.
- [x] A dependência opcional de `diagnose` permanece somente `tdd`.
- [x] Contrato e fonte possuem workflow operacional não vazio, idêntico, e sem linguagem de indisponibilidade.
- [x] Sintoma conhecido, com causa confirmada, reprodução e teste que falha, produz um diagnóstico `ready`, com o template existente e as seções obrigatórias.
- [x] O mesmo sintoma atualiza o mesmo arquivo e incrementa `version`.
- [x] Contexto ausente produz `BLOCKED`, recomenda `context-engineering` e não grava diagnóstico.
- [x] Causa que não está confirmada não autoriza implementação.
- [x] Conflito com decisão existente produz `BLOCKED` e recomenda `clarify`.
- [x] Fato externo que teria de ser declarado como causa produz `BLOCKED` e recomenda `research`, sem acesso à rede.
- [x] O relatório bloqueado traz os cinco campos contratados, nomeia cada pré-requisito ausente e recomenda a skill ou ação do bloqueio mais cedo. Não deixa arquivo.
- [x] A skill não invoca a próxima. Diagnóstico `ready` com causa confirmada e evidência de regressão nomeia `implement` sem executá-lo.
- [x] Segredo não é copiado. O arquivo gravado não conserva marcador de rascunho do template.
- [x] Nenhuma dependência, schema, template, target, CLI, regra de routing ou extensão do ADR `0001` é introduzida.

## Validation

A observação estrutural fica em `TEST-20261013-003` depois do RED e do GREEN. A observação agent-driven dos critérios de comportamento continua no ticket 02.

## Definition of Done

- [x] Os critérios estruturais possuem evidência da suíte.
- [x] O workflow publicado cobre os critérios de comportamento deste ticket, deixando a observação agent-driven para o ticket 02.

## Title

02 — Validar e fechar v1-A13

## Goal

Comprovar o comportamento de `diagnose` nos cenários de classificação, atualização, bloqueio e sigilo, reconciliar a documentação e fechar a emenda v1-A13.

## Context

O ticket 01 torna o workflow operacional. `SPEC-20261013-002` exige evidência semântica separada da suíte Node e documentação coerente com treze skills implementadas. Os quatro targets e as outras cinco skills scaffold permanecem fora deste fechamento. Evidência: `SPEC-20261013-002`, critérios 16–18.

## Scope

- Executar os cenários agent-driven em diretório temporário e registrar a evidência fora da suíte Node.
- Reconciliar proveniência, README, estado arquitetural, padrões, estado do projeto, frase de lifecycle, evidência de validação e handoff com treze skills implementadas.
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

Aplicar o contrato e a fonte em diretório temporário, sem executor Node. Cada cenário parte de insumos isolados. O review lê a spec, o conjunto e as evidências. A documentação histórica das emendas anteriores permanece como registro daquelas emendas. Evidência: `SPEC-20261013-002`, Testing Decisions.

## Acceptance Criteria

- [x] A matriz cobre causa confirmada com regressão, causa provável, hipótese não confirmada, causa confirmada sem regressão, atualização do mesmo arquivo, contexto ausente, contexto fora de `ready`, sintoma desconhecido, repositório não observado, segredo, conflito com o ADR, fato externo e bloqueios combinados.
- [x] Nenhum cenário invoca `tdd`, `implement`, `research`, `clarify` ou `context-engineering`.
- [x] A documentação declara treze skills `implemented` e cinco `scaffold`, sem capability não verificada.
- [x] `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
- [x] O review não tem achado bloqueante.

## Validation

A matriz e a suíte final ficam em `TEST-20261013-004`.

## Definition of Done

- [x] Os critérios deste ticket possuem evidência separada da suíte Node.
- [x] A frontier de `SPEC-20261013-002` está vazia.

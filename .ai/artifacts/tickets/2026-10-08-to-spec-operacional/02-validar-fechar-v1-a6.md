# 02: Validar e fechar v1-A6

**Status:** ready-for-agent

**What to build:** a emenda v1-A6 fica comprovada por cenários agent-driven, com a documentação coerente com cinco skills implementadas e o review sem achado bloqueante.

**Blocked by:** 01 — Operacionalizar to-spec.

## Title

Validar e fechar v1-A6

## Goal

Comprovar o comportamento de `to-spec` nos cenários de spec pronta, atualização, bloqueio e sigilo, reconciliar a documentação e fechar a emenda v1-A6.

## Context

O ticket 01 torna o workflow operacional. `SPEC-20261008-003` exige evidência semântica separada da suíte Node e documentação coerente com cinco skills implementadas. Os quatro targets e as outras treze skills scaffold permanecem fora deste fechamento.

## Scope

- Executar os cenários da spec contra as instruções publicadas, gravando specs apenas em diretório temporário.
- Registrar evidência de teste e relatório de implementação.
- Reconciliar proveniência, README, arquitetura, padrões, estado do projeto, resultado de validação e handoff.
- Revisar Standards e Spec antes do fechamento.

## Out of Scope

- Alterar o comportamento aprovado no ticket 01, salvo desvio encontrado na matriz.
- Implementar outra skill.
- Criar executor, issue remota, target ou dependência.
- Tratar os cenários agent-driven como testes determinísticos de Node.
- Estender o ADR `0001`.

## Dependencies

- Ticket 01 concluído.

## Implementation Notes

Cada cenário usa um diretório temporário. Registrar entrada, evidência consultada, spec observada ou ausência de arquivo, status, autorização do próximo passo e divergência. Cenário divergente bloqueia o fechamento até a correção permanecer dentro da v1-A6. A suíte Node não executa a skill. A publicação remota continua pendente enquanto `gh` estiver ausente.

## Acceptance Criteria

- [ ] Conjunto `ready` e contexto do projeto produzem spec `ready` e não invocam a skill seguinte.
- [ ] Relatório de pesquisa `ready` é incorporado; recomendação não adotada não vira requisito; relatório ausente não bloqueia quando não resta fato externo.
- [ ] Questão aberta que não altera o próximo passo permanece em spec `ready`.
- [ ] A continuação do mesmo objetivo atualiza o mesmo arquivo e incrementa `version`.
- [ ] Conjunto ausente, `draft`, `blocked` ou `superseded` não grava spec e recomenda `clarify`.
- [ ] Premissa não vira requisito. Ambiguidade material e conflito com decisão existente recomendam `clarify` e preservam a decisão existente.
- [ ] Fato externo que ainda altera a spec, ou relatório não pronto cujas incógnitas ainda a alteram, recomenda `research`.
- [ ] Contexto ausente recomenda `context-engineering` e não compõe essa skill.
- [ ] Vários bloqueios cabem num único relatório, com a skill do bloqueio mais cedo, e não deixam arquivo de spec.
- [ ] Segredo não aparece na spec gravada.
- [ ] Exatamente 5 skills estão `implemented`, 13 estão `scaffold` e os quatro targets permanecem inalterados.
- [ ] Documentação, evidências e handoff refletem a v1-A6 sem declarar capacidades não verificadas.
- [ ] `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
- [ ] Review não tem achado bloqueante de Standards ou Spec.

## Validation

Ainda não executada. Depende do ticket 01. No fechamento, a matriz agent-driven fica em evidência separada da suíte Node. A suíte, a validação estrutural e `git diff --check` devem terminar com código zero, e o review de Standards e Spec não pode ter achado bloqueante.

## Definition of Done

- [ ] Todos os critérios possuem evidência verificável.
- [ ] Suíte, validação e `git diff --check` passam com código zero.
- [ ] A frontier de `SPEC-20261008-003` fica vazia.
- [ ] Limites não verificados permanecem explícitos.

# 02: Validar e fechar v1-A6

**Status:** completed

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

- [x] Conjunto `ready` e contexto do projeto produzem spec `ready` e não invocam a skill seguinte.
- [x] Relatório de pesquisa `ready` é incorporado; recomendação não adotada não vira requisito; relatório ausente não bloqueia quando não resta fato externo.
- [x] Questão aberta que não altera o próximo passo permanece em spec `ready`.
- [x] A continuação do mesmo objetivo atualiza o mesmo arquivo e incrementa `version`.
- [x] Conjunto ausente, `draft`, `blocked` ou `superseded` não grava spec e recomenda `clarify`.
- [x] Premissa não vira requisito. Ambiguidade material e conflito com decisão existente recomendam `clarify` e preservam a decisão existente.
- [x] Fato externo que ainda altera a spec, ou relatório não pronto cujas incógnitas ainda a alteram, recomenda `research`.
- [x] Contexto ausente recomenda `context-engineering` e não compõe essa skill.
- [x] Vários bloqueios cabem num único relatório, com a skill do bloqueio mais cedo, e não deixam arquivo de spec.
- [x] Segredo não aparece na spec gravada.
- [x] Exatamente 5 skills estão `implemented`, 13 estão `scaffold` e os quatro targets permanecem inalterados.
- [x] Documentação, evidências e handoff refletem a v1-A6 sem declarar capacidades não verificadas.
- [x] `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
- [x] Review não tem achado bloqueante de Standards ou Spec.

## Validation

- Matriz 16/16 em `TEST-20261008-003`, com os resultados em `.ai/artifacts/tests/2026-10-08-to-spec-scenarios/`.
- `npm test`: PASS, 48/48. `npm run validate`, `npm run skills:validate` e `git diff --check`: PASS.
- `REVIEW-20261008-003`: Standards e Spec sem achado bloqueante depois das correções.
- Ambiente: macOS 26.6.2 (Darwin 25.6.0), Node.js v26.5.0, npm 11.17.0.

## Definition of Done

- [x] Todos os critérios possuem evidência verificável.
- [x] Suíte, validação e `git diff --check` passam com código zero.
- [x] A frontier de `SPEC-20261008-003` fica vazia.
- [x] Limites não verificados permanecem explícitos.

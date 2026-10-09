# 02 — Validar e fechar v1-A5

**Status:** completed

## Title

Validar e fechar v1-A5

## Goal

Comprovar o comportamento de `clarify` nos cenários de ambiguidade, bloqueio e conjunto de decisões, reconciliar a documentação e fechar a emenda v1-A5.

## Context

O ticket 01 torna o workflow operacional. A SPEC exige evidência semântica separada da suíte Node e documentação coerente com quatro skills implementadas.

## Scope

- Executar os cenários da SPEC contra as instruções publicadas, gravando conjuntos apenas em diretório temporário.
- Registrar evidência de teste e relatório de implementação.
- Reconciliar proveniência, README, arquitetura, padrões, resultado de validação e handoff.
- Revisar Standards e Spec antes do fechamento.

## Out of Scope

- Alterar o comportamento aprovado no ticket 01, salvo desvio encontrado na matriz.
- Implementar outra skill.
- Criar executor, issue remota, target ou dependência.
- Tratar os cenários agent-driven como testes determinísticos de Node.

## Dependencies

- Ticket 01 concluído.

## Implementation Notes

Cada cenário usa um diretório temporário. Registrar entrada, evidência consultada, conjunto observado, status, autorização do próximo passo e divergência. Cenário divergente bloqueia o fechamento até a correção permanecer dentro de v1-A5.

## Acceptance Criteria

- [x] Solicitação já decidida produz conjunto `ready` e não invoca `to-spec`.
- [x] Ambiguidade sem resposta produz conjunto `blocked` com as questões juntas.
- [x] Resposta parcial permanece `blocked` e a continuação atualiza o mesmo arquivo até `ready`.
- [x] Contexto material ausente compõe `context-engineering`; preferência ausente do repositório não compõe.
- [x] Premissa não fecha o gate e conflito não substitui decisão existente.
- [x] Fato externo recomenda `research` e não vira decisão resolvida.
- [x] Entrada bloqueada não autoriza implementação.
- [x] Questão aberta pode permanecer em conjunto `ready`.
- [x] Segredo não aparece no arquivo gravado.
- [x] Exatamente 4 skills estão `implemented`, 14 estão `scaffold` e os quatro targets permanecem inalterados.
- [x] Documentação, evidências e handoff refletem v1-A5.
- [x] Review não tem achado bloqueante.

## Validation

- Matriz 11/11 em `TEST-20261008-002`, com os conjuntos em `.ai/artifacts/tests/2026-10-08-clarify-scenarios/`.
- `npm test`: PASS, 48/48. `npm run validate`, `npm run skills:validate` e `git diff --check`: PASS.
- `REVIEW-20261008-002`: Standards e Spec sem achado bloqueante depois das correções.
- Ambiente: macOS 26.6.2 (Darwin 25.6.0), Node.js v26.5.0, npm 11.17.0.

## Definition of Done

- [x] Todos os critérios possuem evidência verificável.
- [x] Suíte, validação e `git diff --check` passam com código zero.
- [x] A frontier de `SPEC-20261008-002` fica vazia.
- [x] Limites não verificados permanecem explícitos.

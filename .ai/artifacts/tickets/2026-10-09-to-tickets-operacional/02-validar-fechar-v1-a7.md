# 02: Validar e fechar v1-A7

**What to build:** a emenda v1-A7 fica comprovada por cenários agent-driven, com a documentação coerente com seis skills implementadas e o review sem achado bloqueante.

**Blocked by:** 01 — Operacionalizar to-tickets.

**Status:** completed

## Title

Validar e fechar v1-A7

## Goal

Comprovar o comportamento de `to-tickets` nos cenários de conjunto pronto, atualização, artefato opcional, bloqueio e sigilo, reconciliar a documentação e fechar a emenda v1-A7.

## Context

O ticket 01 torna o workflow operacional. `SPEC-20261009-001` exige evidência semântica separada da suíte Node e documentação coerente com seis skills implementadas. Os quatro targets e as outras doze skills scaffold permanecem fora deste fechamento.

## Scope

- Executar os cenários da spec contra as instruções publicadas, gravando conjuntos apenas em diretório temporário.
- Registrar evidência de teste e relatório de implementação.
- Reconciliar proveniência, README, arquitetura, padrões, estado do projeto, resultado de validação e handoff.
- Revisar Standards e Spec antes do fechamento.

## Out of Scope

- Alterar o comportamento aprovado no ticket 01, salvo desvio encontrado na matriz.
- Implementar outra skill.
- Criar executor, arquivo de teste novo, issue remota, target ou dependência.
- Tratar os cenários agent-driven como testes determinísticos de Node.
- Estender o ADR `0001`.
- Reformatar conjuntos históricos em diretório.

## Dependencies

- Ticket 01 concluído.

## Implementation Notes

Cada cenário usa um diretório temporário. Registrar entrada, evidência consultada, conjunto observado ou ausência de arquivo, status, autorização de `implement` e divergência. Cenário divergente bloqueia o fechamento até a correção permanecer dentro da v1-A7. A suíte Node não executa a skill. A publicação remota continua pendente enquanto `gh` estiver ausente.

## Acceptance Criteria

- [x] Spec `ready`, sem R8 nem R9, produz conjunto `ready` e não invoca `implement`. Modelo e desenho ausentes não bloqueiam.
- [x] Modelo ou desenho `ready` é incorporado sem ampliar a spec. Recomendação não adotada pela spec não vira requisito de ticket.
- [x] A continuação do mesmo objetivo atualiza o mesmo arquivo e incrementa `version`.
- [x] Spec ausente, `draft`, `blocked` ou `superseded` não grava conjunto e recomenda `to-spec`.
- [x] Artefato opcional presente e não `ready`, ou exigido por R8 ou R9 e ausente, recomenda o produtor correspondente e não grava conjunto.
- [x] Premissa não vira ticket. Ambiguidade material e conflito com decisão existente recomendam `clarify` e preservam a decisão existente.
- [x] Fato externo que ainda altera os tickets recomenda `research`, sem acesso à rede.
- [x] Vários bloqueios cabem num único relatório, com a skill do bloqueio mais cedo, e não deixam arquivo.
- [x] Segredo não aparece no conjunto gravado.
- [x] Exatamente 6 skills estão `implemented`, 12 estão `scaffold` e os quatro targets permanecem inalterados.
- [x] Documentação, evidências e handoff refletem a v1-A7 sem declarar capacidades não verificadas.
- [x] `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
- [x] Review não tem achado bloqueante de Standards ou Spec.

## Validation

- Matriz 18/18 em `TEST-20261009-001`, com os resultados em `.ai/artifacts/tests/2026-10-09-to-tickets-scenarios/`.
- `npm test`: PASS, 48/48. `npm run validate`, `npm run skills:validate` e `git diff --check`: PASS.
- Ambiente: macOS 26.6.2 (Darwin 25.6.0), Node.js v26.5.0, npm 11.17.0.
- Review: `REVIEW-20261009-001`, PASS após correções. Nenhum achado bloqueante remanescente.

## Definition of Done

- [x] Todos os critérios possuem evidência verificável.
- [x] Suíte, validação e `git diff --check` passam com código zero.
- [x] A frontier de `SPEC-20261009-001` fica vazia.
- [x] Limites não verificados permanecem explícitos.

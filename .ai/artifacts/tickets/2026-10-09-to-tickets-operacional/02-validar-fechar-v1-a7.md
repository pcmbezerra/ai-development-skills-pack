# 02: Validar e fechar v1-A7

**What to build:** a emenda v1-A7 fica comprovada por cenários agent-driven, com a documentação coerente com seis skills implementadas e o review sem achado bloqueante.

**Blocked by:** 01 — Operacionalizar to-tickets.

**Status:** ready-for-agent

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

- [ ] Spec `ready`, sem R8 nem R9, produz conjunto `ready` e não invoca `implement`. Modelo e desenho ausentes não bloqueiam.
- [ ] Modelo ou desenho `ready` é incorporado sem ampliar a spec. Recomendação não adotada pela spec não vira requisito de ticket.
- [ ] A continuação do mesmo objetivo atualiza o mesmo arquivo e incrementa `version`.
- [ ] Spec ausente, `draft`, `blocked` ou `superseded` não grava conjunto e recomenda `to-spec`.
- [ ] Artefato opcional presente e não `ready`, ou exigido por R8 ou R9 e ausente, recomenda o produtor correspondente e não grava conjunto.
- [ ] Premissa não vira ticket. Ambiguidade material e conflito com decisão existente recomendam `clarify` e preservam a decisão existente.
- [ ] Fato externo que ainda altera os tickets recomenda `research`, sem acesso à rede.
- [ ] Vários bloqueios cabem num único relatório, com a skill do bloqueio mais cedo, e não deixam arquivo.
- [ ] Segredo não aparece no conjunto gravado.
- [ ] Exatamente 6 skills estão `implemented`, 12 estão `scaffold` e os quatro targets permanecem inalterados.
- [ ] Documentação, evidências e handoff refletem a v1-A7 sem declarar capacidades não verificadas.
- [ ] `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
- [ ] Review não tem achado bloqueante de Standards ou Spec.

## Validation

- Matriz agent-driven separada da suíte Node, cobrindo conjunto pronto, atualização, artefato opcional, bloqueio e sigilo.
- `npm test`, `npm run validate`, `npm run skills:validate` e `git diff --check` com código zero no fechamento.
- Review de Standards e Spec sem achado bloqueante.

## Definition of Done

- [ ] Todos os critérios possuem evidência verificável.
- [ ] Suíte, validação e `git diff --check` passam com código zero.
- [ ] A frontier de `SPEC-20261009-001` fica vazia.
- [ ] Limites não verificados permanecem explícitos.

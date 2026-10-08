# 02 — Validar e fechar v1-A4

**Status:** ready-for-agent

## Title

Validar e fechar v1-A4

## Goal

Comprovar o comportamento de `workflow` nos nove cenários acordados, reconciliar documentação e evidências e fechar a emenda v1-A4 sem alegar execução automática ou capacidade não verificada.

## Context

O ticket 01 entrega a migração estrutural e as instruções operacionais. Este ticket valida semanticamente o roteamento por agente, consolida a regressão do repositório e atualiza o estado documental.

## Scope

- Executar e registrar os nove cenários adversariais da SPEC.
- Separar resultados conduzidos por agente dos testes determinísticos de Node.js.
- Confirmar ausência de execução, escrita e persistência pelo próprio `workflow`.
- Atualizar proveniência, README, estado arquitetural, resultado de validação e handoff.
- Produzir evidências de teste e implementação para v1-A4.
- Executar review final de Standards e Spec.
- Reexecutar toda a validação e fechar a frontier do conjunto.

## Out of Scope

- Corrigir ou implementar skills scaffold encontradas pelos cenários.
- Criar executor, persistência de plano, schema, template, target ou integração externa.
- Alterar responsabilidades, dependências ou regras R1–R17.
- Publicar issues, pacote ou release.

## Dependencies

Dependência satisfeita: **01 — Operacionalizar workflow**, concluído nos commits `9a252e6` e `cf7b39e`.

## Implementation Notes

Cada cenário deve registrar entrada, evidência consultada, rota observada, bloqueio e divergência em relação à SPEC. Cenário que revele desvio bloqueia o fechamento; a correção deve permanecer no limite de v1-A4. Não converter avaliações semânticas de agente em alegações de teste determinístico.

## Acceptance Criteria

- [ ] Invocação explícita com pré-requisitos satisfeitos respeita R1.
- [ ] Solicitação ambígua roteia para `clarify`.
- [ ] Falha com causa desconhecida roteia para `diagnose`.
- [ ] Mudança clara e delimitada roteia para `implement`.
- [ ] Fato externo desconhecido roteia para `research` antes da decisão.
- [ ] Contexto material ausente roteia para `context-engineering`.
- [ ] Artefato `draft`, `blocked`, incompleto ou incompatível retorna ao produtor.
- [ ] Skill necessária em `scaffold` produz rota completa e `Status: BLOCKED` na primeira indisponibilidade.
- [ ] O próprio `workflow` não executa skills, escreve arquivos, modifica código nem persiste o plano.
- [ ] Exatamente 3 skills estão `implemented`, 15 estão `scaffold` e os quatro targets permanecem inalterados.
- [ ] Não existem novos schemas/templates, dependências, comandos CLI ou regras de routing.
- [ ] Documentação, evidências e handoff refletem o estado final de v1-A4.
- [ ] `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` passam.
- [ ] Reviews de Standards e Spec não possuem achado bloqueante.

## Validation

- Executar a matriz adversarial em isolamento e registrar evidência por cenário.
- Executar suíte integral, validação estrutural e alias.
- Inspecionar manifest, registro de artefatos, dependências, targets e diff final.
- Comparar a entrega com todos os critérios de `SPEC-20261008-001`.
- Registrar limitações de ambiente e capacidades não executadas.

## Definition of Done

- [ ] Todos os critérios da SPEC possuem evidência rastreável.
- [ ] Não há falha, skip inexplicado ou mudança fora do escopo.
- [ ] v1-A4, documentação e handoff estão coerentes.
- [ ] O ticket 02 e o conjunto estão concluídos com frontier vazia.

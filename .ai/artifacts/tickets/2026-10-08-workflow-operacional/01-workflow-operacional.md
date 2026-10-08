# 01 — Operacionalizar workflow

**Status:** ready-for-agent

## Title

Operacionalizar workflow

## Goal

Implementar a skill `workflow` como roteador consultivo que produz uma sequência mínima e justificada sem executar etapas, persistir o plano ou modificar código da aplicação.

## Context

`SPEC-20261008-001` define a emenda v1-A4. O catálogo já possui lifecycle misto validado, mas `workflow` permanece scaffold apesar de R1–R17 e das sequências canônicas estarem contratadas.

## Scope

- Criar regressões estruturais em RED para a migração de `workflow`.
- Alterar o status de `workflow` para `implemented` no manifest, contrato e fonte.
- Substituir o placeholder por workflow operacional consistente nas duas fontes.
- Instruir leitura da solicitação, manifest, routing, artefatos e contexto quando material.
- Produzir uma rota única, mínima e condicional, com motivos, pré-requisitos, disponibilidade, bloqueio e próxima ação.
- Tratar contexto ausente, prontidão de artefatos e skills scaffold conforme a SPEC.
- Preservar o formato `BLOCKED` contratado e todas as restrições existentes.

## Out of Scope

- Executar skills recomendadas ou alterar código da aplicação.
- Criar schema/template ou persistir `WORKFLOW_PLAN`.
- Criar router JavaScript, comando CLI ou dependência.
- Alterar routing, sequências canônicas, catálogo, targets ou outras skills.
- Atualizar documentação de fechamento ou executar a matriz adversarial completa, reservadas ao ticket 02.

## Dependencies

Nenhuma — pode iniciar imediatamente.

## Implementation Notes

Começar pelos testes. A fonte e o contrato devem expressar o mesmo comportamento sem duplicar texto desnecessário. O formato visual do plano é orientativo, não um schema. A presença de uma skill scaffold não invalida a identificação da rota, mas impede execução além do primeiro ponto indisponível.

## Acceptance Criteria

- [ ] Regressões falham antes da migração pelos motivos esperados.
- [ ] `workflow` está `implemented` no manifest, contrato e fonte.
- [ ] O catálogo contém exatamente 3 skills `implemented` e 15 `scaffold`.
- [ ] Contrato e fonte possuem workflow operacional não vazio e sem linguagem de indisponibilidade.
- [ ] A sequência recomendada é mínima, justificada e respeita R1–R17.
- [ ] Contexto é incluído apenas quando material para a rota.
- [ ] Artefatos não prontos retornam ao produtor responsável.
- [ ] Skill scaffold causa `BLOCKED` na primeira indisponibilidade sem ocultar a rota completa.
- [ ] `workflow` não executa etapas, não escreve arquivos e não persiste `WORKFLOW_PLAN`.
- [ ] Nenhuma dependência, schema, template, target, CLI ou regra de routing é alterada.

## Validation

- Executar os testes focados adicionados e demonstrar RED/GREEN.
- Executar `npm run validate`, `npm run skills:validate` e `npm test`.
- Inspecionar o diff para confirmar o limite do ticket e as contagens 3/15.
- Executar `git diff --check`.

## Definition of Done

- [ ] Todos os critérios possuem evidência verificável.
- [ ] Suíte e validação passam com código zero.
- [ ] O ticket 02 está desbloqueado.
- [ ] Nenhuma mudança fora do escopo foi incluída.

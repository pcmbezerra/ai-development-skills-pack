# 01 — Operacionalizar workflow

**Status:** completed

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

- [x] Regressões falham antes da migração pelos motivos esperados.
- [x] `workflow` está `implemented` no manifest, contrato e fonte.
- [x] O catálogo contém exatamente 3 skills `implemented` e 15 `scaffold`.
- [x] Contrato e fonte possuem workflow operacional não vazio e sem linguagem de indisponibilidade.
- [x] A sequência recomendada é mínima, justificada e respeita R1–R17.
- [x] Contexto é incluído apenas quando material para a rota.
- [x] Artefatos não prontos retornam ao produtor responsável.
- [x] Skill scaffold causa `BLOCKED` na primeira indisponibilidade sem ocultar a rota completa.
- [x] `workflow` não executa etapas, não escreve arquivos e não persiste `WORKFLOW_PLAN`.
- [x] Nenhuma dependência, schema, template, target, CLI ou regra de routing é alterada.

## Validation

- RED: `node --test --test-name-pattern='current catalogue implements workflow' tests/validate-skills.test.mjs` falhou porque `workflow` não integrava a lista de skills implementadas.
- GREEN focado: o mesmo comando passou após a migração consistente.
- `npm run validate` e `npm run skills:validate`: PASS, 18 skills e quatro targets.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs.
- `git diff --check`: PASS; dependências, schemas/templates, targets, CLI e R1–R17 permaneceram inalterados.
- Review após `cf7b39e`: Standards PASS e Spec PASS, sem achados restantes.

## Commits

- `9a252e6` — operacionalizar roteamento e registrar SPEC/tickets v1-A4.
- `cf7b39e` — corrigir sigilo, auditabilidade, consistência normativa e duplicação apontados no review.

## Definition of Done

- [x] Todos os critérios possuem evidência verificável.
- [x] Suíte e validação passam com código zero.
- [x] O ticket 02 está desbloqueado.
- [x] Nenhuma mudança fora do escopo foi incluída.

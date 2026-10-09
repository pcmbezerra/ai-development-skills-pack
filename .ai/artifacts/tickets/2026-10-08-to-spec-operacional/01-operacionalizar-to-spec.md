# 01: Operacionalizar to-spec

**Status:** completed

**What to build:** `to-spec` passa a converter um conjunto de decisões `ready` e o contexto do projeto numa `SPEC` `ready`, ou a devolver o relatório `BLOCKED` sem gravar spec, e encerra sem invocar a skill seguinte.

**Blocked by:** None (can start immediately).

## Title

Operacionalizar to-spec

## Goal

Implementar a skill `to-spec` para gravar uma especificação `ready` quando o gate de especificação passa, e para devolver o relatório `BLOCKED` quando o conjunto, o contexto ou um fato externo impedem esse gate.

## Context

`SPEC-20261008-003` define a emenda v1-A6. O mantenedor confirmou um único seam de comportamento, com a suíte Node acompanhando o catálogo e o esquema definido de `SPEC`. `to-spec` permanece scaffold. O ADR `0001` continua restrito ao conjunto de decisões.

## Scope

- Criar a regressão estrutural em RED para a migração de `to-spec`.
- Alterar o status de `to-spec` para `implemented` no manifest, no contrato e na fonte.
- Substituir o placeholder por workflow operacional idêntico nas duas fontes.
- Gravar somente spec `ready` no diretório de specs já usado pelo pacote, com o template e as seções atuais, atualizando o mesmo arquivo do mesmo objetivo.
- Devolver o relatório `BLOCKED` contratado, sem arquivo de spec, quando o gate não passa.
- Preservar esquema, template, dependência condicional de `clarify` e a ausência de dependência de `context-engineering`.
- Atualizar a frase normativa de lifecycle para cinco skills implementadas.

## Out of Scope

- Executar `domain-modelling`, `architecture-design`, `to-tickets`, `research`, `implement` ou outra skill scaffold.
- Estender o ADR `0001`, gravar spec `draft` ou `blocked`, ou alterar código de aplicação.
- Criar executor JavaScript, comando CLI, dependência, schema ou template.
- Alterar routing, sequências canônicas, catálogo, targets ou outras skills.
- Executar a matriz semântica e reconciliar a documentação de fechamento, reservadas ao ticket 02.

## Dependencies

Nenhuma. Pode iniciar imediatamente.

## Implementation Notes

Começar pela regressão do catálogo. A fonte e o contrato devem expressar o mesmo comportamento. A única escrita da skill é a spec `ready`. Recomendação de `clarify`, `research` ou `context-engineering` não é composição. O bloqueio mais cedo segue a ordem da spec: contexto ausente, problema no conjunto, fato externo. A frase de lifecycle entra neste ticket para o manifest, o contrato e a fonte permanecerem coerentes. A execução de `to-spec` não grava o glossário.

## Acceptance Criteria

- [x] A regressão falha antes da migração pelo motivo esperado.
- [x] `to-spec` está `implemented` no manifest, no contrato e na fonte.
- [x] O catálogo contém exatamente 5 skills `implemented` e 13 `scaffold`.
- [x] Contrato e fonte possuem workflow operacional não vazio e sem linguagem de indisponibilidade.
- [x] Conjunto `ready` e contexto do projeto produzem uma spec `ready`, com as seções obrigatórias e o gate de especificação satisfeito.
- [x] Relatório de pesquisa `ready` entra como evidência; recomendação não adotada por decisão resolvida não vira requisito.
- [x] Questão aberta que não altera o próximo passo coexiste com spec `ready`.
- [x] O mesmo objetivo atualiza o mesmo arquivo e incrementa `version`.
- [x] Conjunto ausente ou que não está `ready` produz `BLOCKED`, recomenda `clarify` e não grava spec.
- [x] Premissa, ambiguidade material e conflito com decisão existente produzem `BLOCKED` e recomendam `clarify`.
- [x] Fato externo que ainda altera a spec produz `BLOCKED` e recomenda `research`.
- [x] Contexto ausente produz `BLOCKED`, recomenda `context-engineering` e não executa essa skill.
- [x] O relatório bloqueado traz os cinco campos contratados e não deixa arquivo de spec.
- [x] A skill informa a autorização do próximo passo e recomenda no máximo a primeira skill aplicável, sem invocá-la.
- [x] Segredo não é copiado para a spec.
- [x] Nenhuma dependência, schema, template, target, CLI, regra de routing ou extensão do ADR `0001` é introduzida.

## Validation

- RED: `node --test --test-name-pattern='current catalogue implements to-spec' tests/validate-skills.test.mjs` falhou porque o catálogo observado era `setup-ai-development-skills`, `workflow`, `clarify`, `context-engineering`.
- GREEN focado: o mesmo comando passou após a migração.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs.
- `npm run validate` e `npm run skills:validate`: PASS.
- `git diff --check`: PASS.
- Ambiente: macOS 26.6.2 (Darwin 25.6.0), Node.js v26.5.0, npm 11.17.0.
- Review de `e1c00b4` corrigiu a ordem do bloqueio: os bloqueios são acumulados e o relatório único recomenda a skill do bloqueio mais cedo. A observação agent-driven desses critérios permanece no ticket 02.

## Definition of Done

- [x] Todos os critérios possuem evidência verificável.
- [x] Suíte e validação passam com código zero.
- [x] O ticket 02 está desbloqueado.
- [x] Nenhuma mudança fora do escopo foi incluída.

# 01 — Operacionalizar clarify

**Status:** completed

## Title

Operacionalizar clarify

## Goal

Implementar a skill `clarify` para resolver ambiguidade material e gravar um conjunto de decisões `ready` ou `blocked`, sem inventar decisão nem executar a skill seguinte.

## Context

`SPEC-20261008-002` define a emenda v1-A5. O glossário e o ADR `0001` fecham a linguagem e a persistência do conjunto bloqueado. `clarify` permanece scaffold.

## Scope

- Criar a regressão estrutural em RED para a migração de `clarify`.
- Alterar o status de `clarify` para `implemented` no manifest, contrato e fonte.
- Substituir o placeholder por workflow operacional consistente nas duas fontes.
- Distinguir decisão resolvida, premissa, questão aberta, questão bloqueante e fato externo.
- Gravar ambos os status em `.ai/artifacts/decisions/`, atualizando o arquivo do mesmo objetivo.
- Compor `context-engineering` apenas na condição aprovada.
- Preservar esquema, template, dependência opcional e formato `BLOCKED`.
- Atualizar a frase normativa de lifecycle em `contracts/skill-contract.md` para quatro skills implementadas.

## Out of Scope

- Executar `to-spec`, `research`, `implement` ou outra skill scaffold.
- Alterar código de aplicação, `CONTEXT.md` de produto ou ADR fora do registro já aceito.
- Criar executor JavaScript, comando CLI, dependência, schema ou template.
- Alterar routing, sequências canônicas, catálogo, targets ou outras skills.
- Executar a matriz semântica e reconciliar a documentação de fechamento, reservadas ao ticket 02.

## Dependencies

Nenhuma — pode iniciar imediatamente.

## Implementation Notes

Começar pelo teste do catálogo. A fonte e o contrato devem expressar o mesmo comportamento. A escrita própria da skill é somente o conjunto de decisões. `context-engineering` permanece dependência opcional e só é composta quando a evidência do repositório pode responder. O glossário do pacote foi fechado na modelagem; a execução de `clarify` não grava `CONTEXT.md`.

## Acceptance Criteria

- [x] A regressão falha antes da migração pelo motivo esperado.
- [x] `clarify` está `implemented` no manifest, contrato e fonte.
- [x] O catálogo contém exatamente 4 skills `implemented` e 14 `scaffold`.
- [x] Contrato e fonte possuem workflow operacional não vazio e sem linguagem de indisponibilidade.
- [x] Decisão resolvida, premissa, questão aberta, questão bloqueante e fato externo permanecem distintos.
- [x] Conjuntos `ready` e `blocked` são gravados; o bloqueado não autoriza `to-spec` nem `implement`.
- [x] O mesmo objetivo atualiza o mesmo arquivo.
- [x] `context-engineering` só entra quando evidência do repositório pode responder.
- [x] A skill encerra no conjunto e não invoca a próxima skill.
- [x] Nenhuma dependência, schema, template, target, CLI ou regra de routing é alterada.

## Validation

- RED: `node --test --test-name-pattern='current catalogue implements clarify' tests/validate-skills.test.mjs` falhou porque o catálogo observado era `setup-ai-development-skills`, `workflow`, `context-engineering`.
- GREEN focado: o mesmo comando passou após a migração.
- `npm test`: PASS, 48/48.
- `npm run validate` e `npm run skills:validate`: PASS.
- Working tree ainda sem commit.

## Definition of Done

- [x] Todos os critérios possuem evidência verificável.
- [x] Suíte e validação passam com código zero.
- [x] O ticket 02 está desbloqueado.
- [x] Nenhuma mudança fora do escopo foi incluída.

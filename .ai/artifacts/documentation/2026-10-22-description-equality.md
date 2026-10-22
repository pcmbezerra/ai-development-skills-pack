---
artifact: doc_update
id: DOC-20261022-001
version: 1
status: ready
created_by: docs
inputs:
  - SPEC-20261022-001
  - REVIEW-20261022-002
  - TEST-20261022-002
---

## Documentation Scope

Narrar a igualdade exata de `description` já presente em `validate()`. O objetivo é a documentação pública do validador, no `README.md` existente. R14 se aplica ao comportamento visível do comando de validação. `REVIEW-20261022-002` está `PASS`.

## Sources of Truth

`scripts/validate-skills.mjs` compara cada par `i < j` com `!==` e emite `<nome i>: identical manifest description <nome j>`. Não aplica `trim`, mudança de caixa, `normalizeNewlines` nem normalização Unicode. `validateTarget` em `scripts/distribute-skills.mjs` compara diretórios e não faz essa verificação. `TEST-20261022-002` registra `npm test` 64/64. Nesta execução, depois da correção de caminho, `npm test` passou 64/64 e `npm run validate` passou com 18 skills, em Darwin 25.6.0, Node.js v26.5.0 e npm 11.17.0. `.ai/config.json` define `docsPath` como `docs`.

## Files Created

Nenhum arquivo novo sob `docs/`.

## Files Updated

`README.md`. A abertura cita a v1-A24. A seção Validação descreve a rejeição de duas `description` idênticas, sem normalização e sem análise semântica. A seção Limites fixa o formato do erro, a distinção de caixa, espaço e forma Unicode, e que `validateTarget` não faz essa comparação. `sync` e os demais itens fora da emenda continuam ausentes. O identificador `1.0.0-scaffold` permanece.

## Files Considered but Unchanged

`docs/agents/domain.md`, `docs/agents/issue-tracker.md` e `docs/agents/triage-labels.md` não descrevem o validador. Não havia frase verificada para mudar.

## Known Documentation Gaps

`.ai/project.md`, `.ai/architecture.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md` ainda não narravam a v1-A24 quando esta atualização foi escrita. O contrato de `docs` proíbe escrever contexto de projeto, contratos e esses registros fora de `docsPath`. Esta execução de `docs` não os alterou. O pedido desta sessão autoriza o alinhamento pontual desses arquivos fora desta skill.

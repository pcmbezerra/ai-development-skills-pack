---
artifact: doc_update
id: DOC-20261022-002
version: 1
status: ready
created_by: docs
inputs:
  - SPEC-20261022-002
  - REVIEW-20261022-003
  - TEST-20261022-004
  - IMPL-20261022-002
---

## Documentation Scope

Narrar o diagnóstico exato de `name` duplicado já presente em `validate()`. O objetivo é a documentação pública do validador, no `README.md` existente. R14 se aplica ao comportamento visível do comando de validação. `REVIEW-20261022-003` está `PASS_WITH_NOTES`. A nota não muda o comportamento: o laço emite os pares em ordem `i < j`.

## Sources of Truth

`scripts/validate-skills.mjs` compara cada par `i < j` com `!==` e emite `<nome i>: duplicate manifest name <nome j>`. Não aplica `trim`, mudança de caixa nem normalização Unicode. A condição que produz `Invalid canonical catalogue` permanece. A comparação de `description` permanece na linha seguinte. `validateTarget` em `scripts/distribute-skills.mjs` compara diretórios e não faz essa verificação. `TEST-20261022-004` registra `npm test` 69/69 e `npm run validate` com 18 skills. `.ai/config.json` define `docsPath` como `docs`.

## Files Created

Nenhum arquivo novo sob `docs/`.

## Files Updated

`README.md`. A abertura cita a v1-A25 e conserva as frases da v1-A22, da v1-A23 e da v1-A24. A seção Validação descreve o erro adicional de `name` idêntico, sem normalização, e a permanência de `Invalid canonical catalogue`. A seção Limites fixa o formato `<nome anterior>: duplicate manifest name <nome posterior>`, a distinção de caixa, espaço e forma Unicode, e que `validateTarget` não faz essa comparação. `sync` e os demais itens fora da emenda continuam ausentes. O identificador `1.0.0-scaffold` permanece.

## Files Considered but Unchanged

`docs/agents/domain.md`, `docs/agents/issue-tracker.md` e `docs/agents/triage-labels.md` não descrevem o validador. Não havia frase verificada para mudar. ADR `0001`, ADR `0002`, ADR `0003` e ADR `0004` não foram reescritos. Código, testes e os treze caminhos de fim de linha não foram alterados por esta execução.

## Known Documentation Gaps

`.ai/project.md`, `.ai/architecture.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md` ainda não narram a v1-A25. O contrato de `docs` proíbe escrever contexto de projeto, contratos e esses registros fora de `docsPath`. Esta execução não os alterou. A frase do `README.md` que aponta a suíte de 53 testes em `.ai/project.md` permanece, porque esse arquivo ainda registra esse número. Atualizar esses cinco caminhos exige autorização pontual fora desta skill.

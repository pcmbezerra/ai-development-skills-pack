---
artifact: doc_update
id: DOC-20261022-003
version: 1
status: ready
created_by: docs
inputs:
  - SPEC-20261022-003
  - REVIEW-20261022-004
  - EDGE-CASE-20261022-001
  - TEST-20261022-006
  - IMPL-20261022-003
---

## Documentation Scope

Narrar o diagnóstico exato de `name` duplicado em `manifest.targets` já presente em `validate()`. O objetivo é a documentação pública do validador, no `README.md` existente. R14 se aplica ao comportamento visível do comando de validação. `REVIEW-20261022-004` está `PASS`. `EDGE-CASE-20261022-001` está `ready` e não pede teste novo.

## Sources of Truth

`scripts/validate-skills.mjs` compara cada par `i < j` de `manifest.targets` com `!==` e emite `<nome i>: duplicate target name <nome j>`. Não aplica `trim`, mudança de caixa nem normalização Unicode. As condições que produzem `Invalid targets` e `Duplicate targets` permanecem. `validateTarget` em `scripts/distribute-skills.mjs` compara diretórios e não faz essa verificação. `TEST-20261022-006` registra `npm test` 78/78 e `npm run validate` com 18 skills. `.ai/config.json` define `docsPath` como `docs`.

## Files Created

Nenhum arquivo novo sob `docs/`.

## Files Updated

`README.md`. A abertura cita a v1-A26 e conserva as frases da v1-A22, da v1-A23, da v1-A24 e da v1-A25. A seção Validação descreve o erro adicional de `name` de target idêntico, sem normalização, e a permanência de `Invalid targets` e de `Duplicate targets`. A seção Limites fixa o formato `<nome anterior>: duplicate target name <nome posterior>`, a distinção de caixa, espaço e forma Unicode, e que `validateTarget` não faz essa comparação. `sync` e os demais itens fora da emenda continuam ausentes. O identificador `1.0.0-scaffold` permanece.

## Files Considered but Unchanged

`docs/agents/domain.md`, `docs/agents/issue-tracker.md` e `docs/agents/triage-labels.md` não descrevem o validador. Não havia frase verificada para mudar. ADR `0001`, ADR `0002`, ADR `0003` e ADR `0004` não foram reescritos. Código, testes e os treze caminhos de fim de linha não foram alterados por esta execução.

## Known Documentation Gaps

`.ai/project.md`, `.ai/architecture.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md` ainda não narram a v1-A26. O contrato de `docs` proíbe escrever contexto de projeto, contratos e esses registros fora de `docsPath`. Esta execução não os alterou. A frase do `README.md` que aponta a suíte de 53 testes em `.ai/project.md` permanece, porque esse arquivo ainda registra esse número. Atualizar esses cinco caminhos exige autorização pontual fora desta skill.

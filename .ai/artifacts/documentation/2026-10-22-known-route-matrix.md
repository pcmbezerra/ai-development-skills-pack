---
artifact: doc_update
id: DOC-20261022-004
version: 1
status: ready
created_by: docs
inputs:
  - SPEC-20261022-004
  - REVIEW-20261022-005
  - IMPL-20261022-004
  - TEST-20261022-008
---

## Documentation Scope

Narrar a matriz de referência K1–K8 já presente em `.ai/artifacts/quality/2026-10-22-known-route-matrix.md`, com as limitações verificadas, no `README.md` existente. O objetivo nomeia esse arquivo. R14 se aplica ao registro público das emendas. `REVIEW-20261022-005` está `PASS`. As frases da v1-A22, da v1-A23, da v1-A24, da v1-A25 e da v1-A26 permanecem.

## Sources of Truth

A matriz declara K1–K8, a frase de que valida casos conhecidos e não mede automaticamente toda a similaridade semântica entre skills, a regra de que par ou skill fora dessa lista não é falha, e a permanência da igualdade exata de `description`. `SPEC-20261022-004` fixa os doze critérios. `TEST-20261022-008` registra a leitura com zero falhas. `contracts/routing.md` e `scripts/validate-skills.mjs` não foram alterados. `.ai/config.json` define `docsPath` como `docs`.

## Files Created

Nenhum arquivo novo sob `docs/`.

## Files Updated

`README.md`. A abertura cita a v1-A27 e conserva as frases da v1-A22, da v1-A23, da v1-A24, da v1-A25 e da v1-A26. A seção Validação diz que a matriz não faz parte do validador. A seção Limites registra K1–K8, as rotas proibidas dos casos negativos e os limites: sem classificador, sem score, sem modelo, sem execução de skill, sem alteração de R1–R17 e sem comparação semântica em `validate()`. O identificador `1.0.0-scaffold` permanece. `sync` e os demais itens fora da emenda continuam ausentes.

## Files Considered but Unchanged

`docs/agents/domain.md`, `docs/agents/issue-tracker.md` e `docs/agents/triage-labels.md` não descrevem a matriz. Não havia frase verificada para mudar. ADR `0001`, ADR `0002`, ADR `0003` e ADR `0004` não foram reescritos. Código, testes e os treze caminhos de fim de linha não foram alterados por esta execução.

## Known Documentation Gaps

`.ai/project.md`, `.ai/architecture.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md` ainda não narram a v1-A27. O contrato de `docs` proíbe escrever contexto de projeto, contratos e esses registros fora de `docsPath`. Esta execução não os alterou. A frase do `README.md` que aponta a suíte de 53 testes em `.ai/project.md` permanece, porque esse arquivo ainda registra esse número. Atualizar esses cinco caminhos exige autorização pontual fora desta skill.

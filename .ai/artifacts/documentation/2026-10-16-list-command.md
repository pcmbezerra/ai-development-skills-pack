---
artifact: doc_update
id: DOC-20261016-001
version: 1
status: ready
created_by: docs
inputs:
  - SPEC-20261016-001
  - ARCHITECTURE-20261016-001
  - TEST-20261016-002
  - REVIEW-20261016-001
---

## Documentation Scope

Narrar o comando `list` já executado. O objetivo nomeia `README.md`. R14 se aplica ao comportamento visível da CLI.

## Sources of Truth

`bin/ai-dev-skills.mjs` contém `ai-dev-skills list` e o laço que imprime `skill.name`. `node bin/ai-dev-skills.mjs list` saiu 0 com 18 nomes. `list --target cursor`, `doctor`, `sync` e `bootstrap` saíram 1. `TEST-20261016-002` registra `npm test` 53/53, `npm run validate` PASS e os quatro targets. `REVIEW-20261016-001` está `PASS_WITH_NOTES`. `.ai/config.json` define `docsPath` como `docs`.

## Files Created

Nenhum arquivo de documentação novo sob `docs/`.

## Files Updated

`README.md`. A abertura cita a v1-A22 como a emenda que adiciona `list`. O exemplo de instalação inclui `node bin/ai-dev-skills.mjs list`. A seção Limites descreve a stdout verificada e mantém `doctor`, `sync`, desinstalação, instalação global, detecção de plataforma, roteador automático e `meta-skills/skill-authoring` como ausentes. O identificador `1.0.0-scaffold` permanece.

## Files Considered but Unchanged

A ajuda da CLI já foi alterada por `implement`. `docs` não edita código de aplicação.

`docs/agents/domain.md`, `docs/agents/issue-tracker.md` e `docs/agents/triage-labels.md` não descrevem a CLI. Não havia frase verificada para mudar.

## Known Documentation Gaps

`.ai/project.md` ainda contém a exclusão de 2026-10-15 e diz que a v1-A22 não se abre para `list`. O contrato de `docs` proíbe escrever arquivo de contexto do projeto. Esta execução não o alterou.

`contracts/skill-contract.md` ainda diz que sync, doctor e list não estão implementados e que o próximo identificador livre é v1-A21. O contrato de `docs` proíbe escrever contratos. Esta execução não o alterou.

`references/provenance.md` não está sob `docsPath`. O contrato de `docs` só permite documentação sob `docs/` e, quando o objetivo nomeia o arquivo, `README.md` na raiz. Esta execução não alterou a proveniência.

Nenhuma dessas lacunas foi escrita como comportamento atual no README.

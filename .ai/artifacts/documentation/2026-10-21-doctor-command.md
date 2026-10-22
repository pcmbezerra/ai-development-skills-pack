---
artifact: doc_update
id: DOC-20261021-001
version: 1
status: ready
created_by: docs
inputs:
  - SPEC-20261019-001
  - ARCHITECTURE-20261019-001
  - ADR-0004
  - REVIEW-20261021-001
  - TEST-20261019-006
---

## Documentation Scope

Narrar o comando `doctor` já presente no working tree. O objetivo é a documentação pública da CLI, no `README.md` existente. R14 se aplica ao comportamento visível. `REVIEW-20261021-001` está `PASS_WITH_NOTES`.

## Sources of Truth

`bin/ai-dev-skills.mjs` contém `ai-dev-skills doctor`, `nodeLine`, `gitLine` e o ramo que não chama `validate` nem `validateTarget`. Nesta execução, `node bin/ai-dev-skills.mjs --help` saiu 0 e a stdout contém `ai-dev-skills doctor`. `node bin/ai-dev-skills.mjs doctor` saiu 0, com stdout `node pass 26.5.0` e `git pass`. `TEST-20261019-006` registra `npm test` 60/60, inclusive `git fail`, `git.exe`, argumento posicional e opção sem valor. `.ai/config.json` define `docsPath` como `docs`.

## Files Created

Nenhum arquivo novo sob `docs/`.

## Files Updated

`README.md`. A abertura inclui a v1-A23 e o comando `doctor`. O exemplo de instalação inclui `node bin/ai-dev-skills.mjs doctor`. A seção Limites descreve as duas linhas, a saída 0, a stderr vazia, o nome `git`, a recusa de `git.exe`, a ausência de execução de `git` e de gravação de arquivo, e a saída 1 com `ERROR:` para opção ou argumento. `sync` e os demais itens fora da emenda continuam ausentes. O identificador `1.0.0-scaffold` permanece.

## Files Considered but Unchanged

`docs/agents/domain.md`, `docs/agents/issue-tracker.md` e `docs/agents/triage-labels.md` não descrevem a CLI. Não havia frase verificada para mudar.

A ajuda em `bin/ai-dev-skills.mjs` já contém `ai-dev-skills doctor`. `docs` não edita código de aplicação.

## Known Documentation Gaps

`.ai/project.md` ainda descreve `doctor` como exclusão. O contrato de `docs` proíbe escrever arquivo de contexto do projeto. Esta execução não o alterou.

`.ai/architecture.md` descreve a CLI como ajuda, validação, empacotamento e instalação, sem `list` nem `doctor`. É arquivo de contexto do projeto. Esta execução não o alterou.

`contracts/skill-contract.md` ainda diz que `doctor` não está implementado. O contrato de `docs` proíbe escrever contratos. Esta execução não o alterou.

`references/provenance.md` não está sob `docsPath`. Esta execução não o alterou.

Nenhuma dessas lacunas foi escrita como comportamento atual no README.

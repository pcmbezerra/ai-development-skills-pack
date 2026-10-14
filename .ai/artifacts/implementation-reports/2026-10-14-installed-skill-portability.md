---
artifact: implementation_report
id: IMPLEMENTATION-20261013-016
version: 1
status: ready
created_by: implement
inputs:
  - SPEC-20261013-009
  - TICKET-SET-20261013-009
  - TEST-20261013-016
---

## Input

`SPEC-20261013-009` e `TICKET-SET-20261013-009`, a partir de `origin/main` em `754849f`.

## Plan

Gravar a projeção dentro dos 18 diretórios, apontar o `SKILL.md` só para esses arquivos, rejeitar link que escape e cópia que divirja, e instalar os quatro targets num destino sem o repositório de origem.

## Files Changed

Dezoito `SKILL.md`, `references/` e `assets/` em cada skill que a spec nomeia, `scripts/validate-skills.mjs`, `tests/validate-skills.test.mjs`, `tests/distribute-skills.test.mjs`, `contracts/skill-contract.md`, `references/provenance.md`, `references/validation-result.md`, `README.md`, `.ai/architecture.md`, `.ai/project.md` e os artefatos desta execução. `scripts/distribute-skills.mjs` não mudou. `manifest/skills.json` não mudou. O ADR `0001` não mudou. `contracts/artifacts.md` não mudou.

## Behaviour Changed

O `SKILL.md` deixa de pedir `contracts/` e `manifest/skills.json`. O validador passa a falhar quando um link Markdown sai do diretório da skill ou quando a projeção não acompanha a fonte. `install` e `package` continuam copiando o diretório sem transformar arquivo. Goals, status, dependências e os passos de workflow permanecem.

`references/contract.md` só troca `](../failure.md)`, `](../quality-gates.md)` e `](../artifacts.md)` pelo nome do irmão. `failure.md`, `quality-gates.md`, `routing.md` e os templates são comparados com a fonte depois de normalizar `\r\n` para `\n`, a mesma regra já usada para ler contratos e templates. `contracts/artifacts.md` tem um link, `](../manifest/skills.json)`. Cópia byte a byte em `references/` não aponta para um arquivo dentro da skill, e o manifesto não entra no diretório. A cópia troca só esse href por `#machine-readable-catalogue-and-named-outputs`. A frase normativa permanece. `context-engineering` não recebe `routing.md`. `workflow` recebe `references/catalogue.json` com `name`, `status`, `primaryInvocation` e `dependencies`.

## Validation Performed

Suíte Node, validação estrutural, alias, `git diff --check` e a ajuda da CLI, registradas em `TEST-20261013-016`.

## Tests

53/53. Validação estrutural PASS, 18 skills.

## Known Limitations

A suíte não abre Cursor, Codex, Gemini Antigravity nem Claude Code. Arquivo no disco não prova que o host leu `references/` ou `assets/`. O contrato compartilhado e o manifesto inteiro continuam fora da skill. A comparação da projeção normaliza fim de linha; diferença só de CR/LF não é deriva.

## Remaining Work

Validação ao vivo nos quatro hosts, abertura prática de `references/` e `assets/`, e reconciliação com GitHub Issues ficam fora desta emenda.

## Change Reference

Working tree desta emenda. `CHANGE_SET` continua named-only.

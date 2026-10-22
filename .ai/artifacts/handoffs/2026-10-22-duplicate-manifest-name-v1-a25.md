---
artifact: handoff
id: HANDOFF-20261022-002
version: 2
status: ready
created_by: handoff
inputs:
  - HANDOFF-20261022-001
  - DECISION-SET-20261022-002
  - SPEC-20261022-002
  - TICKET-SET-20261022-002
  - TEST-20261022-003
  - TEST-20261022-004
  - IMPL-20261022-002
  - REVIEW-20261022-003
  - DOC-20261022-002
---

## Objective

Transferir o estado verificado da v1-A25, pronta para publicação mediante autorização de commit, para que outra sessão não reabra o diagnóstico exato de `name` duplicado.

## Current State

`HEAD` é `eaec330` (`eaec3301e8c33bbec672a1443dee93ba4dcee716`) em `main`, igual a `origin/main`. O remoto `origin` é `https://github.com/pcmbezerra/ai-development-skills-pack.git`. Dezoito skills seguem `implemented`. A versão permanece `1.0.0-scaffold`. A v1-A21 permanece `OBSERVED`. Claude Code permanece `NOT_RUN`. A v1-A25 está implementada neste working tree e ainda não está publicada. O próximo identificador livre é v1-A26.

`validate()` emite um erro adicional por par `i < j` de `manifest.skills` cujo `name` é a mesma string: `<nome i>: duplicate manifest name <nome j>`. A comparação não aplica `trim`, mudança de caixa nem normalização Unicode. A condição que produz `Invalid canonical catalogue` permanece. A comparação de `description` permanece. `validateTarget` não faz a comparação de `name`. `list` e `doctor` saem 0. `sync` e `bootstrap` saem 1.

ADR `0001`, ADR `0002`, ADR `0003` e ADR `0004` não foram reescritos.

## Completed Work

O mantenedor aceitou o diagnóstico de nomes duplicados como único objetivo. `DECISION-SET-20261022-002` versão 2 e `SPEC-20261022-002` estão `ready`. O vermelho está em `TEST-20261022-003`. A comparação está em `scripts/validate-skills.mjs`. `REVIEW-20261022-003` ficou `PASS_WITH_NOTES`: o teste de três pares usa três strings iguais e não distingue uma emissão invertida; a ordem `i < j` está no laço. `DOC-20261022-002` atualizou o `README.md` e não alcançou os cinco registros internos. A versão 1 deste handoff registrou essa ausência. A autorização pontual posterior alinhou `.ai/project.md`, `.ai/architecture.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`, sem reescrever as frases históricas nem os ADRs. Esta versão 2 não apaga esse registro.

## Decisions

`DECISION-SET-20261022-002` versão 2 está `ready`. A v1-A25 cobre só o diagnóstico exato de `name` duplicado, mantendo `Invalid canonical catalogue`. As outras exclusões continuam fora. Esta transferência não estende ADR `0001` e não abre a v1-A26.

## Artifacts

- `HANDOFF-20261022-001`, `ready`. Estado da v1-A24 antes da publicação `eaec330`. Não foi reescrito.
- `DECISION-SET-20261022-002`, `ready`, versão 2.
- `SPEC-20261022-002` e `TICKET-SET-20261022-002`, `ready`.
- `IMPL-20261022-002`, `ready`.
- `TEST-20261022-003` e `TEST-20261022-004`, `ready`.
- `REVIEW-20261022-003`, `ready`, `PASS_WITH_NOTES`.
- `DOC-20261022-002`, `ready`. Registra só a atualização do `README.md`.
- Este arquivo, `HANDOFF-20261022-002`.

Um artefato fora de `ready` não autoriza implementação. Nenhum input citado está fora de `ready`.

## Files Changed

Observado com `git status --short` e `git diff --ignore-cr-at-eol --stat` na versão 1, antes deste arquivo. `HEAD` `eaec330`. Aquele diff de conteúdo era 3 files changed, 70 insertions(+), 2 deletions(-), em `README.md`, `scripts/validate-skills.mjs` e `tests/validate-skills.test.mjs`. A versão 2 observa, depois do alinhamento pontual, 8 files changed, 88 insertions(+), 6 deletions(-). Os cinco caminhos acrescentados são `.ai/project.md`, `.ai/architecture.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`.

Não rastreados nesse mesmo status:

- `.ai/artifacts/decisions/2026-10-22-v1-a25-scope.md`
- `.ai/artifacts/documentation/2026-10-22-duplicate-manifest-name.md`
- `.ai/artifacts/implementation/2026-10-22-duplicate-manifest-name.md`
- `.ai/artifacts/reviews/2026-10-22-duplicate-manifest-name.md`
- `.ai/artifacts/specs/2026-10-22-duplicate-manifest-name.md`
- `.ai/artifacts/tests/2026-10-22-duplicate-manifest-name-tdd.md`
- `.ai/artifacts/tests/2026-10-22-duplicate-manifest-name.md`
- `.ai/artifacts/tickets/2026-10-22-duplicate-manifest-name.md`

Este handoff ainda não entra nesse estado.

Treze artefatos anteriores permanecem modificados. `git diff --ignore-cr-at-eol` nesses caminhos fica vazio. São fim de linha, não conteúdo. Esta transferência não os inclui.

## Validation

Na versão 1, em Darwin 25.6.0, Node.js v26.5.0 e npm 11.17.0, fora do sandbox, depois do `README.md`: `npm test` passou 69/69, duração 7925 ms. Depois do alinhamento dos cinco registros, a repetição passou 69/69, zero falhas, skips ou todos, duração 7713 ms; `npm run validate` passou com 18 skills. `git diff --check` passou. `list` saiu 0. `doctor` saiu 0. `sync` e `bootstrap` saíram 1 com `ERROR: Unsupported command`. `bin/ai-dev-skills.mjs` e `scripts/distribute-skills.mjs` não estão no diff de conteúdo.

## Known Issues

`REVIEW-20261022-003` registra que o teste de três pares não distingue a ordem porque as três mensagens são a mesma string. O laço em `scripts/validate-skills.mjs` emite `i < j`. Essa nota não pede correção antes da publicação.

A abertura de `.ai/project.md` ainda registra a suíte de 53 testes em 2026-10-14. Essa frase permanece. A seção nova de `references/validation-result.md` registra os 69 testes desta emenda. As frases anteriores que ainda chamam v1-A25 de identificador livre são o estado anterior a esta seção.

`OBSERVED` não é certificação. Claude Code permanece `NOT_RUN`.

O hash do commit que publicar este arquivo não é conhecido aqui. `eaec330` já está em `origin/main`. A v1-A25 ainda não está.

## Open Questions

Nenhuma pergunta aberta bloqueia a publicação do comportamento já implementado. Permanecem as exclusões já decididas: `sync`, desinstalação, instalação global, detecção de plataforma, roteador automático, `meta-skills/skill-authoring` e testes semânticos de overlap. A escolha de alinhar os cinco registros internos foi aceita nesta autorização pontual.

## Next Actions

O mantenedor autorizou o commit e o push desta emenda, sem os treze arquivos de fim de linha. Isso não é uma skill. Não autoriza a v1-A26 nem outra implementação. O hash desse commit não é conhecido antes de ele existir.

## Constraints

Não estender ADR `0001` nem reescrever ADR `0002`, ADR `0003` ou ADR `0004`. Não reescrever `HANDOFF-20261022-001`. Não abrir a v1-A26 neste arquivo. Não implementar `sync`, desinstalação, instalação global, detecção de plataforma, roteador automático, `meta-skills/skill-authoring` nem testes semânticos de overlap. Não tratar `OBSERVED` como certificação. Não tratar as diferenças de fim de linha como conteúdo a publicar. Não tratar frases anteriores a esta transferência como erro a reescrever. Não fazer commit nem push sem autorização explícita.

---
artifact: handoff
id: HANDOFF-20261022-003
version: 1
status: ready
created_by: handoff
inputs:
  - HANDOFF-20261022-002
  - DECISION-SET-20261022-003
  - SPEC-20261022-003
  - TICKET-SET-20261022-003
  - TEST-20261022-005
  - TEST-20261022-006
  - IMPL-20261022-003
  - REVIEW-20261022-004
  - EDGE-CASE-20261022-001
  - DOC-20261022-003
---

## Objective

Transferir o estado verificado da v1-A26, pronta para publicação mediante o commit e o push autorizados nesta mensagem, para que outra sessão não reabra o diagnóstico exato de `name` duplicado em `manifest.targets`.

## Current State

`HEAD` é `f1deb2b` (`f1deb2b6166e6236994e92cb4181242f43fa60d7`) em `main`, igual a `origin/main`. O remoto `origin` é `https://github.com/pcmbezerra/ai-development-skills-pack.git`. Dezoito skills seguem `implemented`. A versão permanece `1.0.0-scaffold`. A v1-A21 permanece `OBSERVED`. Claude Code permanece `NOT_RUN`. A v1-A26 está implementada neste working tree e ainda não está publicada. O próximo identificador livre, depois desta emenda, é v1-A27. Esta transferência não abre a v1-A27.

`validate()` emite um erro adicional por par `i < j` de `manifest.targets` cujo `name` é a mesma string: `<nome i>: duplicate target name <nome j>`. A comparação não aplica `trim`, mudança de caixa nem normalização Unicode. As condições que produzem `Invalid targets` e `Duplicate targets` permanecem. A comparação de `name` de skill e a de `description` permanecem. `validateTarget` não faz a comparação de `name` de target. `list` e `doctor` saíram 0 na implementação. `sync` e `bootstrap` saíram 1.

ADR `0001`, ADR `0002`, ADR `0003` e ADR `0004` não foram reescritos.

## Completed Work

O mantenedor aceitou o diagnóstico de nomes duplicados em `manifest.targets` como único objetivo. `DECISION-SET-20261022-003` versão 2 e `SPEC-20261022-003` estão `ready`. O vermelho está em `TEST-20261022-005`. A comparação está em `scripts/validate-skills.mjs`. A suíte do ticket 02 está em `tests/validate-skills.test.mjs`. `REVIEW-20261022-004` ficou `PASS`. `EDGE-CASE-20261022-001` ficou `ready` e não pediu teste novo. `DOC-20261022-003` atualizou o `README.md`. A autorização pontual posterior alinhou `.ai/project.md`, `.ai/architecture.md`, `contracts/skill-contract.md`, `references/provenance.md` e `references/validation-result.md`, sem reescrever as frases históricas nem os ADRs.

## Decisions

`DECISION-SET-20261022-003` versão 2 está `ready`. A v1-A26 cobre só o diagnóstico exato de `name` duplicado em `manifest.targets`, mantendo `Invalid targets` e `Duplicate targets`. As outras exclusões continuam fora. Esta transferência não estende ADR `0001` e não abre a v1-A27.

## Artifacts

- `HANDOFF-20261022-002`, `ready`. Estado da v1-A25 antes desta emenda. Não foi reescrito.
- `DECISION-SET-20261022-003`, `ready`, versão 2.
- `SPEC-20261022-003` e `TICKET-SET-20261022-003`, `ready`.
- `IMPL-20261022-003`, `ready`.
- `TEST-20261022-005` e `TEST-20261022-006`, `ready`.
- `REVIEW-20261022-004`, `ready`, `PASS`.
- `EDGE-CASE-20261022-001`, `ready`. Não recomenda teste novo.
- `DOC-20261022-003`, `ready`. Registra só a atualização do `README.md`.
- Este arquivo, `HANDOFF-20261022-003`.

Um artefato fora de `ready` não autoriza implementação. Nenhum input citado está fora de `ready`.

## Files Changed

Observado com `git status --short` e `git diff --ignore-cr-at-eol --stat` antes deste arquivo. `HEAD` `f1deb2b`. O diff de conteúdo era 8 files changed, 130 insertions(+), 8 deletions(-), em `.ai/architecture.md`, `.ai/project.md`, `README.md`, `contracts/skill-contract.md`, `references/provenance.md`, `references/validation-result.md`, `scripts/validate-skills.mjs` e `tests/validate-skills.test.mjs`.

Não rastreados nesse mesmo status, e que entram no commit:

- `.ai/artifacts/decisions/2026-10-22-v1-a26-scope.md`
- `.ai/artifacts/documentation/2026-10-22-duplicate-target-name.md`
- `.ai/artifacts/implementation/2026-10-22-duplicate-target-name.md`
- `.ai/artifacts/quality/2026-10-22-duplicate-target-name.md`
- `.ai/artifacts/reviews/2026-10-22-duplicate-target-name.md`
- `.ai/artifacts/specs/2026-10-22-duplicate-target-name.md`
- `.ai/artifacts/tests/2026-10-22-duplicate-target-name-tdd.md`
- `.ai/artifacts/tests/2026-10-22-duplicate-target-name.md`
- `.ai/artifacts/tickets/2026-10-22-duplicate-target-name.md`

Este handoff entra no mesmo commit. Ele ainda não estava no status observado acima.

Treze artefatos anteriores permanecem modificados. `git diff --ignore-cr-at-eol` nesses caminhos fica vazio. São fim de linha, não conteúdo. Esta transferência não os inclui:

- `.ai/artifacts/documentation/2026-10-21-doctor-command.md`
- `.ai/artifacts/handoffs/2026-10-18-list-v1-a22.md`
- `.ai/artifacts/handoffs/2026-10-18-v1-a22-closed.md`
- `.ai/artifacts/handoffs/2026-10-21-doctor-v1-a23.md`
- `.ai/artifacts/implementation/2026-10-19-doctor-review-notes.md`
- `.ai/artifacts/implementation/2026-10-19-doctor-ticket-02.md`
- `.ai/artifacts/quality/2026-10-19-doctor-command.md`
- `.ai/artifacts/reviews/2026-10-19-doctor-ticket-02.md`
- `.ai/artifacts/reviews/2026-10-21-doctor-v1-a23.md`
- `.ai/artifacts/tests/2026-10-19-doctor-edge-tdd.md`
- `.ai/artifacts/tests/2026-10-19-doctor-review-notes.md`
- `.ai/artifacts/tests/2026-10-19-doctor-ticket-02-tdd.md`
- `.ai/artifacts/tests/2026-10-19-doctor-ticket-02.md`

## Validation

Em Darwin 25.6.0, Node.js v26.5.0 e npm 11.17.0, fora do sandbox, depois do alinhamento dos cinco registros: `npm test` passou 78/78, duração 9003 ms, zero falhas, skips ou todos. `npm run validate` passou com 18 skills. `git diff --check` passou de novo depois de `references/validation-result.md`. Na implementação, `list` saiu 0, `doctor` saiu 0, e `sync` e `bootstrap` saíram 1 com `ERROR: Unsupported command`. `bin/ai-dev-skills.mjs` e `scripts/distribute-skills.mjs` não estão no diff de conteúdo.

## Known Issues

O teste de três `cursor` compara três strings iguais e não distingue uma emissão invertida. `REVIEW-20261022-004` registra que o critério 4 da spec declara isso e que a ordem está no teste de dois pares. Essa nota não pede correção.

A abertura de `.ai/project.md` ainda registra a suíte de 53 testes em 2026-10-14. Essa frase permanece. A seção nova de `references/validation-result.md` registra os 78 testes desta emenda. As frases anteriores que ainda chamam v1-A26 de identificador livre são o estado anterior a esta seção. As contagens 60, 64 e 69 permanecem as suítes da v1-A23, da v1-A24 e da v1-A25.

`OBSERVED` não é certificação. Claude Code permanece `NOT_RUN`.

O hash do commit que publicar este arquivo não é conhecido aqui. `f1deb2b` já está em `origin/main`. A v1-A26 ainda não está.

## Open Questions

Nenhuma pergunta aberta bloqueia a publicação do comportamento já implementado. Permanecem as exclusões já decididas: `sync`, desinstalação, instalação global, detecção de plataforma, roteador automático, `meta-skills/skill-authoring` e testes semânticos de overlap. A escolha de alinhar os cinco registros internos foi aceita nesta autorização pontual.

## Next Actions

O mantenedor autorizou o commit e o push desta emenda, sem os treze arquivos de fim de linha. Isso não é uma skill. Não autoriza a v1-A27 nem outra implementação. O hash desse commit não é conhecido antes de ele existir.

## Constraints

Não estender ADR `0001` nem reescrever ADR `0002`, ADR `0003` ou ADR `0004`. Não reescrever `HANDOFF-20261022-002`. Não abrir a v1-A27 neste arquivo. Não implementar `sync`, desinstalação, instalação global, detecção de plataforma, roteador automático, `meta-skills/skill-authoring` nem testes semânticos de overlap. Não tratar `OBSERVED` como certificação. Não tratar as diferenças de fim de linha como conteúdo a publicar. Não tratar frases anteriores a esta transferência como erro a reescrever. Não incluir no commit caminho que não esteja na lista de Files Changed.

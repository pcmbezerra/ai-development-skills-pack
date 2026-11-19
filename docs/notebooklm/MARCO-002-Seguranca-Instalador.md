# MARCO-002 — Segurança do instalador

**Abertura:** 19 de novembro de 2026  
**Aceite:** 19 de novembro de 2026  
**Status:** ACCEPTED

A P0.2 foi aceita depois da execução na `main`. O head do PR #19 permaneceu `0ad6fb0485950251e6cf3a424bfe1bffce68aec9`. O merge `376e4e2392218165f95e129c98c8cbed2114ec10` tem pais `5c1b3f2` e `0ad6fb0` e preserva os commits `ead2825` e `0ad6fb0`.

## 1. Objetivo

Impedir que `installTarget` grave fora do destino por causa de caminho absoluto entre unidades ou de um junction/symlink no meio desse destino.

A referência é a Issue #18. Não foi criado ADR.

## 2. Entregas realizadas

Correção em `inside()`, usada por `installTarget` e `validateTarget`:

- `path.relative` absoluto passa a ser escape. No Windows, esse é o retorno entre unidades diferentes.
- O `realpath` do ancestral que já existe também é comparado com a base. Um junction ou symlink intermediário que saia do destino é recusado.
- Se o próprio destino escolhido pelo chamador for um symlink, a base comparada é o caminho real desse destino.

A recusa ocorre antes de `mkdir` e de `cp`.

Três testes foram acrescentados em `tests/distribute-skills.test.mjs`:

- travessia relativa e caminho absoluto na mesma unidade;
- nome de skill em outra unidade Windows;
- componente do destino que é junction ou symlink para outro diretório.

Skills, manifesto, CLI, contratos e workflow não foram alterados.

## 3. Validações e evidências

Ambiente local, antes do merge: Windows NT 10.0.26300, Node.js v22.23.4, npm 10.9.9.

Antes da correção, no mesmo ambiente:

- `..` e absoluto na mesma unidade já eram recusados, sem gravação fora do destino.
- `Z:\...` não era recusado. A cópia seguia e o `mkdir` falhava com `ENOENT`.
- Um junction intermediário era seguido. A skill aparecia no diretório real, fora do destino.

Depois da correção, os três testes passaram. No checkout temporário com bytes LF:

- `npm test`: PASS, 89/89, duração 66725.4524 ms.
- `npm run validate`: PASS, 18 skills.

No working tree com `core.autocrlf=true`, a mesma suíte ficou 82/89. Os sete FAIL são da asserção SPDX por bytes CR e não fazem parte desta correção.

A evidência de aceite é a execução nova na `main`, no merge `376e4e2392218165f95e129c98c8cbed2114ec10`:

- Actions: https://github.com/pcmbezerra/ai-development-skills-pack/actions/runs/44607521220
- Ubuntu: `npm test` success e `npm run validate` success.
- Windows: `npm test` success e `npm run validate` success.
- Node.js 22 nos dois runners.

## 4. Decisões relevantes

A rejeição de `path.relative` absoluto é a correção do escape entre unidades. A comparação com `realpath` é a correção do junction ou symlink intermediário. As duas ficam em `inside()`.

A abertura da P0.2, antes dessa implementação, só tinha demonstrado o caso entre unidades e ainda não tinha teste nem correção. Esse era o estado do registro inicial.

O aceite foi registrado na Issue #18 depois da validação da `main`. A issue foi encerrada em seguida. Não foi criado ADR.

## 5. Riscos e pendências

A homologação remota desta correção está concluída. Permanecem três riscos residuais, fora deste aceite:

- A cópia continua sequencial. Se `cp` falhar no meio da lista, as skills anteriores permanecem gravadas. Não há rollback.
- A checagem e a cópia não são atômicas. Uma troca no destino entre as duas etapas, incluindo TOCTOU, não está coberta.
- Symlink criado exatamente no caminho final da skill, depois da checagem, não foi reproduzido como defeito corrigido.

## 6. Referências GitHub

- Issue encerrada: https://github.com/pcmbezerra/ai-development-skills-pack/issues/18
- PR incorporado: https://github.com/pcmbezerra/ai-development-skills-pack/pull/19
- Merge: `376e4e2392218165f95e129c98c8cbed2114ec10`
- Actions da `main`: https://github.com/pcmbezerra/ai-development-skills-pack/actions/runs/44607521220
- Baseline da abertura: `58683bb1a62ff99407a1fe49067e770f5d476246`
- Registro anterior, substituído por este marco e ainda recuperável no Git: `docs/notebooklm/P0.2 Segurança do Instalador.md`

## 7. Status e próximo marco

Status: ACCEPTED.

Nenhum marco seguinte foi aberto. Os três riscos residuais da seção 5 permanecem fora deste aceite.

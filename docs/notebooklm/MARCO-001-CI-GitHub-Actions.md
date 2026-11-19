# MARCO-001 — CI no GitHub Actions

**Período:** 1º a 19 de novembro de 2026  
**Status:** ACCEPTED

O registro de 01/11/2026 descrevia o workflow como ainda não publicado e os testes do `doctor` como três falhas locais. Esse era o estado daquela data. O estado aceito é o deste marco.

## 1. Objetivo

Executar `npm test` e `npm run validate` automaticamente em Linux e Windows.

## 2. Entregas realizadas

- Workflow `.github/workflows/ci.yml`.
- Disparo em `push` e `pull_request` para `main`.
- Matriz `ubuntu-latest` e `windows-latest`, Node.js 22, permissão `contents: read` e checkout com finais de linha LF.
- P0.1b, emenda v1-A33: no Windows, o `doctor` reconhece um arquivo regular chamado `git.exe` e não usa o bit POSIX `0o111`. No Unix, o arquivo continua sendo `git` com esse bit. A decisão vigente está no ADR-0005. O ADR-0004 permanece o registro histórico.
- P0.1c: o teste de links instalados aceita o caminho absoluto que `path.relative` devolve quando a origem e o destino estão em unidades diferentes. O instalador não foi alterado nessa correção.

Os dois commits da integração foram preservados no merge: `f4a55d8` e `be8406339029bfa515efee4ad499225935dd14b0`.

## 3. Validações e evidências

Em 01/11/2026, na baseline `89ca6ee`, a verificação local em Windows com Node.js 24.22.1 registrou actionlint PASS, validação de 18 skills PASS e suíte 83/86, com três falhas do `doctor`. O Actions ainda estava `NOT_RUN`.

Depois das correções, a `main` executou o Actions no merge:

- Ubuntu: `npm test` 86/86 e `npm run validate` com 18 skills.
- Windows: `npm test` 86/86 e `npm run validate` com 18 skills.
- Node.js 22 nos dois runners.

## 4. Decisões relevantes

A P0.1 foi aceita em 19/11/2026. O bloqueio do `doctor` no Windows foi tratado pela v1-A33, não pelo bit de escrita `0o222`. O falso negativo de `path.relative` entre unidades foi tratado só no teste da P0.1c.

O PR #16, que continha apenas a v1-A33, foi encerrado sem merge porque o PR #17 já reunia as duas correções.

Não havia Issue P0.1. A evidência ficou no PR #17 e na execução da `main`.

## 5. Riscos e pendências

A P0.1 não cobre segurança do instalador. O próximo marco é a P0.2.

O commit de governança posterior ao merge, `5c1b3f2b240edd49b8db987ef896a58453a6f651`, só atualizou o registro documental. A evidência de aceite é a execução do merge, não esse commit.

## 6. Referências GitHub

- PR incorporado: https://github.com/pcmbezerra/ai-development-skills-pack/pull/17
- Merge: `58683bb1a62ff99407a1fe49067e770f5d476246`
- Actions da `main`: https://github.com/pcmbezerra/ai-development-skills-pack/actions/runs/44592435141
- PR encerrado sem merge: https://github.com/pcmbezerra/ai-development-skills-pack/pull/16
- Governança posterior: `5c1b3f2b240edd49b8db987ef896a58453a6f651`

## 7. Status e próximo marco

Status: ACCEPTED.

Próximo marco: `MARCO-002-Seguranca-Instalador.md`.

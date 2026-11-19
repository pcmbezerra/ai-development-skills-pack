# P0.1 — Automação CI | Registro de Governança

**Projeto:** ai-development-skills-pack  
**Fase:** Produção Mínima Viável — MVP Beta  
**Prioridade:** P0  
**Status:** ACCEPTED  
**Data de atualização:** 19/11/2026

## 1. Objetivo

Implantar GitHub Actions para executar automaticamente os testes e a validação estrutural do projeto em Linux e Windows.

## 2. Implementação

**Implementado localmente:**

- Arquivo `.github/workflows/ci.yml`.
- Triggers `push` e `pull_request` para `main`.
- Matriz `ubuntu-latest` e `windows-latest`.
- Node.js 22.
- Execução de `npm test` e `npm run validate`.
- Permissão `contents: read`.
- Preservação de finais de linha LF no checkout.

Nenhum commit, push, Pull Request ou merge foi realizado.

## 3. Evidências de validação

**Baseline testada:** `89ca6ee`  
**Ambiente local:** Windows, Node.js 24.22.1.

| Verificação | Resultado |
|---|---|
| Sintaxe do workflow — actionlint | PASS |
| Validação estrutural | PASS — 18 Skills |
| Testes automatizados | 83/86 PASS |
| Testes do `doctor` | 3 FAIL |
| GitHub Actions — Linux | NOT_RUN |
| GitHub Actions — Windows | NOT_RUN |

Os testes foram executados localmente utilizando o runtime Node.js disponibilizado pelo Cursor, e não o Node.js 22 configurado no workflow.

## 4. Bloqueio identificado

O comando `doctor` utiliza bits POSIX de execução (`mode & 0o111`) para verificar a presença de Git.

No Windows, essa implementação não apresenta comportamento compatível com os três testes que exigem `git pass`.

A correção pode exigir revisão do contrato existente do `doctor`, que atualmente não reconhece `git.exe`.

**Pendência proposta:** P0.1b — Compatibilidade Windows do `doctor`.

A P0.1b ainda precisa de formalização e definição de escopo.

## 5. Critérios de aceite

- [x] Workflow criado localmente.
- [x] Validação sintática aprovada.
- [x] Matriz Linux/Windows configurada.
- [x] Código das Skills e contratos preservado.
- [x] Workflow versionado em branch e submetido por PR.
- [x] Todos os testes aprovados em Linux e Windows.
- [x] Validação estrutural aprovada no GitHub Actions.
- [x] PR revisado e incorporado à `main`.
- [x] Execução automatizada bem-sucedida na `main`.
- [x] Evidências registradas no PR #17. Não havia Issue P0.1.

## 6. Decisão atual

**ACCEPTED em 19/11/2026.**

O PR #17 foi incorporado à `main` por merge commit `58683bb1a62ff99407a1fe49067e770f5d476246`, preservando `f4a55d8` (v1-A33) e `be8406339029bfa515efee4ad499225935dd14b0` (P0.1c). O PR #16 foi encerrado sem merge, substituído pelo #17.

A execução nova na `main` está em https://github.com/pcmbezerra/ai-development-skills-pack/actions/runs/44592435141. Ubuntu e Windows passaram em `npm test` (86/86) e em `npm run validate` (18 skills), com Node.js 22. A seção 3 permanece o registro anterior, de 01/11/2026.

## 7. Próximas ações

1. P0.1 está encerrada.
2. P0.2 — Testes de Segurança do Instalador está aberta. O registro inicial está em `P0.2 Segurança do Instalador.md`.

## 8. Governança

GitHub permanece a fonte oficial de código, decisões, Issues e evidências de release.

NotebookLM permanece como ambiente de análise e acompanhamento.

**Não gerar novamente o YAML:** o arquivo já foi implementado no Cursor.
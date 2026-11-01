# P0.1 — Automação CI | Registro de Governança

**Projeto:** ai-development-skills-pack  
**Fase:** Produção Mínima Viável — MVP Beta  
**Prioridade:** P0  
**Status:** IMPLEMENTED / BLOCKED FOR ACCEPTANCE  
**Data de atualização:** 01/11/2026

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
- [ ] Workflow versionado em branch e submetido por PR.
- [ ] Todos os testes aprovados em Linux e Windows.
- [ ] Validação estrutural aprovada no GitHub Actions.
- [ ] PR revisado e incorporado à `main`.
- [ ] Execução automatizada bem-sucedida na `main`.
- [ ] Evidências anexadas à Issue P0.1.

## 6. Decisão atual

**GO WITH CONDITIONS para continuidade da P0.1.**

A implementação local do workflow está concluída, mas a iniciativa não pode ser encerrada.

Não alterar silenciosamente CLI, testes ou contratos dentro da P0.1.

## 7. Próximas ações

1. Formalizar a Issue P0.1 no GitHub.
2. Abrir uma pendência separada para avaliação da compatibilidade Windows do `doctor`.
3. Definir a menor correção compatível com os contratos vigentes.
4. Validar os resultados no GitHub Actions.
5. Encerrar P0.1 somente após todos os critérios de aceite.
6. Avançar para P0.2 — Segurança do Instalador.

## 8. Governança

GitHub permanece a fonte oficial de código, decisões, Issues e evidências de release.

NotebookLM permanece como ambiente de análise e acompanhamento.

**Não gerar novamente o YAML:** o arquivo já foi implementado no Cursor.
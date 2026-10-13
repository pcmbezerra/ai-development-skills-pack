# Projeto

Estado verificado em 2026-10-13. Pacote privado `ai-development-skills-pack`, versão `1.0.0-scaffold`, baseline arquitetural v1 + emendas v1-A1 (Claude Code), v1-A2 (contexto e bootstrap), v1-A3 (distribuição), v1-A4 (workflow consultivo), v1-A5 (`clarify`), v1-A6 (`to-spec`), v1-A7 (`to-tickets`), v1-A8 (`domain-modelling`), v1-A9 (`architecture-design`), v1-A10 (`implement`) e v1-A11 (`tdd` e `code-review`). Repositório: `pcmbezerra/ai-development-skills-pack`. `HEAD` e `origin/main` coincidem em `3fcf258`.

Objetivo: manter 18 skills reutilizáveis de engenharia para Cursor, Codex, Gemini Antigravity e Claude Code. Entrega atual: catálogo, contratos, templates, descritores declarativos, CLI de ajuda, validação, empacotamento e instalação em projeto, e testes do validador e da distribuição.

`context-engineering`, `setup-ai-development-skills`, `workflow`, `clarify`, `to-spec`, `to-tickets`, `domain-modelling`, `architecture-design`, `implement`, `tdd` e `code-review` possuem workflows operacionais. As outras 7 permanecem scaffold: `handoff`, `research`, `diagnose`, `refactor`, `edge-case-analysis`, `docs` e `modernize`. Sync, doctor, list e routing automático não estão implementados. A distribuição por target está implementada.

GitHub Issues com fallback local e os cinco rótulos padrão foram confirmados pelo mantenedor. A configuração deste repositório foi preenchida manualmente; a conformidade do bootstrap foi demonstrada separadamente em fixtures locais.

Continuidade: `.ai/artifacts/handoffs/2026-10-06-project-state.md`. O handoff de sessão `.ai/artifacts/handoffs/2026-10-12-session-handoff-v1-a11.md` registra o envio de v1-A11.

## Pendências

- Descoberta e execução reais em Cursor, Codex, Gemini Antigravity e Claude Code.
- Issues e labels remotas ainda não reconciliadas. Em 2026-10-13, `gh` está no PATH e a listagem de issues deste repositório foi recusada pela integração.
- Licença placeholder e pacote privado.

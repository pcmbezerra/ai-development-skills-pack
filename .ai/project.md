# Projeto

Estado verificado em 2026-10-13. A suíte estrutural passou neste Linux com Node.js v22.14.0 e npm 10.9.9, 50/50. Pacote privado `ai-development-skills-pack`, versão `1.0.0-scaffold`, baseline arquitetural v1 + emendas v1-A1 (Claude Code) a v1-A18 (`modernize`), com a v1-A19 (descoberta documentada) encerrada em `origin/main` no commit `52c35d7`. A v1-A20 está aberta como análise de skill autocontida; os `SKILL.md` ainda não carregam a projeção. Repositório: `pcmbezerra/ai-development-skills-pack`; commit inicial inspecionado: `347b05a`.

Objetivo: manter 18 skills reutilizáveis de engenharia para Cursor, Codex, Gemini Antigravity e Claude Code. Entrega atual: catálogo, contratos, templates, descritores declarativos, CLI de ajuda/validação e testes do validador.

`context-engineering`, `setup-ai-development-skills`, `workflow`, `clarify`, `handoff`, `research`, `to-spec`, `to-tickets`, `domain-modelling`, `architecture-design`, `implement`, `tdd`, `refactor`, `edge-case-analysis`, `code-review`, `diagnose`, `docs` e `modernize` possuem workflows operacionais; nenhuma skill permanece scaffold. Sync, doctor, list e routing automático não estão implementados. A distribuição por target está implementada.

GitHub Issues com fallback local e rótulos padrão foram confirmados pelo mantenedor. A configuração deste repositório foi preenchida manualmente; a conformidade do bootstrap foi demonstrada separadamente em fixtures locais.

Continuidade: `.ai/artifacts/handoffs/2026-10-06-project-state.md`.

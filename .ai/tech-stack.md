# Stack e ambiente

- JavaScript ESM, módulos nativos do Node.js, npm scripts e `node:test`.
- Node.js >=22 declarado em `package.json`; sem dependências npm.
- Git como pré-requisito; configuração e catálogo em JSON; contratos e skills em Markdown.
- Licença do pacote: `UNLICENSED`. Pacote `private`.

## Fatos observados

- 2026-10-06, Windows/PowerShell, Node.js v25.2.0, Git 2.53.0.windows.1. Antes da correção LF/CRLF, a validação falhou e 17 de 20 testes passaram. O working tree Windows daquela sessão mostrava CRLF em contratos e templates, com índice Git em LF.
- 2026-10-10, macOS 26.6.2 (Darwin 25.6.0), Node.js v26.5.0, npm 11.17.0: `npm run validate` e `npm test` PASS, 48/48, no fechamento de v1-A11.
- 2026-10-13, Linux 6.12.94+, Node.js v22.14.0, npm 10.9.9: `npm run validate` PASS, `npm test` PASS 48/48 e `git diff --check` limpo, sobre `3fcf258`. Neste checkout, índice e working tree dos contratos e templates inspecionados estão em LF. `SPEC-20261010-001` e `TICKET-SET-20261010-001` estão em LF desde `6dd8671`.
- 2026-10-13: `gh` está no PATH, autenticado como a integração `cursor`. `gh issue list` em `pcmbezerra/ai-development-skills-pack` retornou `Resource not accessible by integration`.

## Pendências

- Descoberta e execução reais em Cursor, Codex, Gemini Antigravity e Claude Code.
- Issues e labels remotas ainda não reconciliadas.

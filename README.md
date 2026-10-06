# AI - Development Skills Pack

Scaffold arquitetural v1 + emenda v1-A1 com exatamente 18 skills para Cursor, Codex, Gemini Antigravity e Claude Code, reconciliado com o [contrato completo](references/architecture-contract-v1.md), seções 1–27. Requer Node.js >=22 e Git; sem dependências npm e sem necessidade de npm install.

```sh
npm run validate
npm run skills:validate
npm test
node bin/ai-dev-skills.mjs validate
node bin/ai-dev-skills.mjs --help
```

O [manifest](manifest/skills.json) declara classificação primária, entradas/saídas, artefatos definidos e apenas nomeados, dependências obrigatórias, condicionais e opcionais. As SKILL.md são esqueletos; contratos e templates preservam os formatos do baseline. Targets são descritores e a CLI oferece apenas ajuda e validação.

Consulte [proveniência e limitações](references/provenance.md), [contrato compartilhado](contracts/skill-contract.md), [artefatos](contracts/artifacts.md), [routing R1–R17](contracts/routing.md), [gates de qualidade](contracts/quality-gates.md), [falha e fallback](contracts/failure.md) e [sequências de workflow](contracts/workflows.md).

O validador verifica catálogo físico, nomes, frontmatter no subconjunto emitido pelo scaffold, classificação, dependências, referências locais, artefatos/templates, ciclos obrigatórios e condicionais, descritores dos targets e limites do scaffold. Não executa skills, valida prontidão semântica de artefatos de projetos nem certifica compatibilidade real com os targets. Testes de sobreposição semântica de routing permanecem futuros.

Templates são rascunhos: substitua placeholders e valide evidências antes de marcar ready. LICENSE permanece placeholder e o pacote está privado. Não há instalador ou workflows de produção.

Estado da análise em 2026-10-06: `.ai/artifacts/handoffs/2026-10-06-project-state.md`. Contexto local em `.ai/`, glossário em `CONTEXT.md` e configuração das skills auxiliares em `docs/agents/`. Validação e CLI aprovadas no checkout Windows com CRLF; 26/26 testes passam, incluindo regressões LF/CRLF. A primeira etapa futura dos workflows está delimitada no handoff. Consulte `references/validation-result.md` para evidências e limites.

# Arquitetura atual

- `skills/`: 18 esqueletos, divididos em core, discovery, development, quality, documentation e modernization.
- `manifest/skills.json`: catálogo, classificação de invocação, artefatos e dependências tipadas.
- `contracts/`: contratos compartilhados e por skill; routing R1–R17, gates e falhas.
- `templates/`: 15 templates de artefatos e modelos de contexto do projeto.
- `targets/`: quatro descritores declarativos (Cursor, Codex, Gemini Antigravity e Claude Code); instalação desabilitada.
- `scripts/validate-skills.mjs`: validação estrutural, referências e ciclos obrigatórios/condicionais.
- `bin/ai-dev-skills.mjs`: CLI limitada a ajuda e validação.
- `tests/validate-skills.test.mjs`: 20 testes com fixtures isoladas.

Fontes normativas: `references/architecture-contract-v1.md`, `references/provenance.md` e contratos operacionais. O snapshot recovered é histórico.

Dados específicos deste repositório ficam em `.ai/`; regras para helpers externos ficam em `docs/agents/`; vocabulário fica em `CONTEXT.md`. ADRs futuros usarão `.ai/decisions`, criados apenas quando houver decisão que os justifique.

O validador não verifica prontidão semântica, compatibilidade real dos targets ou execução dos workflows. Contratos/templates aceitam LF e CRLF por normalização apenas em memória; validação Windows e 26 testes aprovados: ver handoff e resultado de validação.

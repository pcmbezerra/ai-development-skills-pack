# Arquitetura atual

- `skills/`: 18 skills divididas em core, discovery, development, quality, documentation e modernization; contexto e bootstrap estão operacionais e as outras 16 permanecem scaffold.
- `manifest/skills.json`: catálogo, classificação de invocação, artefatos e dependências tipadas.
- `contracts/`: contratos compartilhados e por skill; routing R1–R17, gates e falhas.
- `templates/`: 15 templates de artefatos e modelos de contexto do projeto.
- `targets/`: quatro descritores declarativos implementados com paths de projeto por target.
- `scripts/validate-skills.mjs`: validação estrutural, referências, targets e ciclos obrigatórios/condicionais.
- `scripts/distribute-skills.mjs`: empacotamento, instalação idempotente e validação contra a fonte canônica.
- `bin/ai-dev-skills.mjs`: CLI de ajuda, validação, empacotamento e instalação.
- `tests/`: 48 testes com fixtures isoladas.

Fontes normativas: `references/architecture-contract-v1.md`, `references/provenance.md` e contratos operacionais. O snapshot recovered é histórico.

Dados específicos deste repositório ficam em `.ai/`; regras para helpers externos ficam em `docs/agents/`; vocabulário fica em `CONTEXT.md`. ADRs futuros usarão `.ai/decisions`, criados apenas quando houver decisão que os justifique.

O validador por target verifica integridade byte a byte do pacote instalado, mas não executa o produto de destino. Contratos/templates aceitam LF e CRLF por normalização apenas em memória; validação Windows e 48 testes aprovados: ver handoff e resultado de validação.

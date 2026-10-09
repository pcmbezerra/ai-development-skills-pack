# Arquitetura atual

- `skills/`: 18 skills divididas em core, discovery, development, quality, documentation e modernization; contexto, bootstrap, workflow, clarify, to-spec, to-tickets, domain-modelling e architecture-design estão operacionais e as outras 10 permanecem scaffold.
- `manifest/skills.json`: catálogo, classificação de invocação, artefatos e dependências tipadas.
- `contracts/`: contratos compartilhados e por skill; routing R1–R17, gates e falhas.
- `templates/`: 15 templates de artefatos e modelos de contexto do projeto.
- `targets/`: quatro descritores declarativos implementados com paths de projeto por target.
- `scripts/validate-skills.mjs`: validação estrutural, referências, targets e ciclos obrigatórios/condicionais.
- `scripts/distribute-skills.mjs`: empacotamento, instalação idempotente e validação contra a fonte canônica.
- `bin/ai-dev-skills.mjs`: CLI de ajuda, validação, empacotamento e instalação.
- `tests/`: 48 testes com fixtures isoladas.

Fontes normativas: `references/architecture-contract-v1.md`, `references/provenance.md` e contratos operacionais. O snapshot recovered é histórico.

Dados específicos deste repositório ficam em `.ai/`; regras para helpers externos ficam em `docs/agents/`; vocabulário fica em `CONTEXT.md`. ADRs ficam em `.ai/decisions`; o primeiro registra a persistência de conjunto de decisões bloqueado.

O validador por target verifica integridade byte a byte do pacote instalado, mas não executa o produto de destino. Contratos/templates aceitam LF e CRLF por normalização apenas em memória; validação Windows e 48 testes aprovados: ver handoff e resultado de validação.

`workflow` é um roteador consultivo baseado em instruções: produz um `WORKFLOW_PLAN` named-only na conversa, sem executor, persistência ou alteração de código. `clarify` resolve ambiguidade material e grava `DECISION_SET` ready ou blocked com o template existente. `to-spec` grava `SPEC` ready quando o gate de especificação passa e devolve `BLOCKED` sem arquivo quando não passa. `to-tickets` grava `TICKET_SET` ready quando o gate de ticket passa e devolve `BLOCKED` sem arquivo quando não passa. `domain-modelling` grava `DOMAIN_MODEL` ready quando o insumo justifica o modelo e devolve `BLOCKED` sem arquivo quando não justifica. `architecture-design` grava `ARCHITECTURE_DESIGN` ready quando R9 se aplica e devolve `BLOCKED` sem arquivo quando o gate não passa; o ADR adicional só é gravado quando a spec já registra a decisão durável. A cobertura semântica dessas skills é agent-driven e permanece separada dos 48 testes Node.js.

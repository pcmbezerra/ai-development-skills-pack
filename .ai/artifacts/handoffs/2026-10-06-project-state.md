---
artifact: handoff
id: HANDOFF-20261006-001
version: 4
status: ready
created_by: handoff
inputs: ["baseline-v1", "amendment-v1-A1", "347b05a", "maintainer-confirmations-2026-10-06", "lf-crlf-fix-2026-10-06"]
---

## Objective

Corrigir a incompatibilidade LF/CRLF do validador, registrar regressões e validação, e definir a primeira etapa futura dos workflows. Preservar o histórico de configuração e continuidade. Documento consolidado pela skill externa `handoff` a partir de evidências verificadas. Não representa execução da skill scaffold homônima deste pacote.

## Current State

Baseline v1 reconciliado + emenda v1-A1 (2026-10-06), commit inspecionado `347b05a`, branch inicial `main`, working tree inicialmente limpo. Pacote privado `1.0.0-scaffold`, licença ainda placeholder.

18 skills: 13 com invocação primária user e 5 model. Todas permanecem esqueletos. O registro contém 20 nomes de artefatos: 15 com templates, TICKET contido em TICKET_SET e quatro saídas apenas nomeadas. Quatro targets declarativos: Cursor, Codex, Gemini Antigravity e Claude Code; sem instalação implementada.

Validação estrutural, alias e CLI aprovados neste checkout Windows com CRLF; 26/26 testes passam. O parser normaliza apenas as strings de contratos/templates de artefatos em memória. A fase operacional não começou; sua primeira etapa está definida em Next Actions. A configuração de manutenção está documentada localmente; não foram criadas issues ou labels remotas.

## Completed Work

- Correção LF/CRLF em duas leituras do parser, sem regravar contratos/templates ou normalizar o checkout. Seis regressões explícitas: aceitação e rejeição de seções ausentes de SPEC/ADR em LF e CRLF. Antes da correção, três casos LF passaram e três CRLF falharam; depois, todos passaram na suíte completa.
- Reexecução de validação, testes, alias e CLI; atualização das evidências, README, nota de proveniência, contexto de arquitetura e handoff. Definição da primeira etapa futura dos workflows após validação verde.
- Solicitação posterior atendida: inclusão de Claude Code como quarto target Tier 1, versionada como emenda v1-A1 no contrato, proveniência, manifest, descritor, validador e documentação. Três testes adicionados e aprovados.

- Inspeção do README, instruções, package.json, Git, baseline completo e proveniência, contratos compartilhados e das 18 skills, manifest, esqueletos, templates, CLI, descritores, validador e testes.
- Leitura das skills externas setup-matt-pocock-skills, domain-modeling e grill-with-docs, incluindo grilling e templates pertinentes.
- Confirmação sequencial do rastreador, rótulos e proposta de documentação pelo mantenedor.
- Criação de configuração, contexto local, glossário e regras de consumo para helpers.
- Execução da validação, testes e CLI; isolamento da incompatibilidade LF/CRLF por comparação em memória.
- Atualização da documentação de validação sem apagar o histórico de macOS.

## Decisions

Confirmadas pelo mantenedor nesta sessão:

- GitHub Issues em `pcmbezerra/ai-development-skills-pack`, com fallback Markdown local.
- Rótulos needs-triage, needs-info, ready-for-agent, ready-for-human e wontfix.
- Contexto único; CONTEXT.md restrito a glossário; ADRs futuros em `.ai/decisions`, preservando o contrato do projeto.
- Escopo inicial: documentação e configuração. Solicitações posteriores autorizaram Claude Code no contrato/scaffold e a correção LF/CRLF com regressões e definição da primeira etapa futura dos workflows.
- Claude Code é o quarto target Tier 1, com identificador `claude-code` e descritor `targets/claude-code.mjs`. A emenda v1-A1 preserva as 18 skills, esquemas de artefatos, routing e dependências.

A ampliação de targets foi registrada diretamente no contrato e na proveniência como emenda v1-A1, sem ADR duplicado. A solicitação atual define o próximo recorte de workflows, mas não implementa workflows operacionais ou instalador.

## Artifacts

`CONTEXT.md`; `.ai/config.json`; `.ai/project.md`; `.ai/architecture.md`; `.ai/standards.md`; `.ai/tech-stack.md`; `.ai/business-rules.md`; `docs/agents/issue-tracker.md`; `docs/agents/triage-labels.md`; `docs/agents/domain.md`; este handoff.

Os diretórios de specs, tickets e ADRs são caminhos configurados e serão criados quando houver conteúdo real. Não há SPEC ou TICKET_SET pronto para uma nova fase. Não foram inventados esquemas ou alterados templates normativos.

## Files Changed

Histórico: criados os arquivos listados em Artifacts; atualizados `AGENTS.md`, `README.md` e `references/validation-result.md`. Na emenda v1-A1, atualizados também `references/architecture-contract-v1.md`, `references/provenance.md`, `contracts/skill-contract.md`, `manifest/skills.json`, `scripts/validate-skills.mjs` e `tests/validate-skills.test.mjs`; criado `targets/claude-code.mjs`.

Nesta correção: `scripts/validate-skills.mjs`, `tests/validate-skills.test.mjs`, `references/validation-result.md`, `references/provenance.md`, `README.md`, `.ai/architecture.md` e este handoff. Skills, manifest, targets, contratos e templates não foram alterados nesta etapa. Alterações locais anteriores preservadas; nenhum commit criado.

## Validation

Windows/PowerShell; Node.js v25.2.0; npm 11.6.2; HEAD `347b05a` mais alterações locais.

- Reprodução antes da correção: `npm run validate` falhou com 15 erros; `npm test` teve 17 aprovados e 3 falhos em 20 testes.
- RED das novas regressões: `node --test --test-name-pattern='with (LF|CRLF)' tests/validate-skills.test.mjs`: 3 LF aprovadas e 3 CRLF falhas.
- GREEN: `npm run validate` e `npm run skills:validate` PASS, 18 skills e quatro targets declarativos.
- `npm test`: PASS, 26 testes, zero falhas ou testes ignorados.
- `node bin/ai-dev-skills.mjs --help` e `node bin/ai-dev-skills.mjs validate`: PASS, saída 0.
- `git ls-files --eol contracts/artifacts.md templates/artifacts/spec.md`: ambos continuam i/lf e w/crlf.
- Dependências de produção permanecem vazias; testes de dependências required/conditional/optional continuam aprovados.

Evidência detalhada e histórico preservados em `references/validation-result.md`. Fixtures LF no Windows não comprovam execução em Linux/macOS.

## Known Issues

1. **Limite intencional do scaffold:** workflows, instalação, sync, doctor, list e routing automático inexistentes; sem testes de sobreposição semântica de routing ou validação de prontidão de artefatos de projetos.
2. **Plataformas não verificadas nesta correção:** Linux, nova execução macOS, Node.js 22 e execução real nos quatro targets. LF/CRLF cobertos em fixtures Windows.
3. **Integrações não verificadas:** `gh` ausente no PATH na sessão anterior; issues/labels remotas não verificadas.
4. **Publicação futura:** licença placeholder e pacote privado exigirão decisão própria antes de distribuir.

## Open Questions

Nenhuma questão bloqueia a correção concluída. A futura implementação precisa formalizar a transição de status: hoje o validador exige `scaffold` para todas as skills. Essa mudança deve ser delimitada na SPEC antes de executar workflows; não relaxar a validação global nem inventar esquemas para saídas apenas nomeadas.

## Next Actions

Primeira etapa de implementação definida após validação verde: **contexto e bootstrap local**, começando por `context-engineering` (sem dependências), seguido de `setup-ai-development-skills` (dependência obrigatória de contexto). Esta é uma definição de trabalho futuro, não evidência de execução.

1. Escrever SPEC no caminho configurado usando o template existente, com o recorte abaixo e a transição explícita do estado scaffold para as duas skills. Gerar tickets somente quando a SPEC estiver ready, conforme R10.
2. Implementar as instruções operacionais de `context-engineering`: descobrir evidências do repositório e manter `.ai/project.md`, `.ai/architecture.md`, `.ai/standards.md`, `.ai/tech-stack.md` e `.ai/business-rules.md`; separar fatos, hipóteses e lacunas, preservar decisões existentes e manter estado fora das skills.
3. Implementar `setup-ai-development-skills`: preservar configuração existente, criar configuração mínima ausente conforme o contrato, compor obrigatoriamente contexto e reportar readiness ou BLOCKED. Não alterar código da aplicação nem sobrescrever decisões.

Critérios de aceitação do recorte:

- Repositório sem `.ai/`: produzir configuração mínima e os cinco documentos de contexto fundamentados em fontes locais; lacunas materiais devem ser explícitas.
- Repositório com configuração/decisões: preservar valores e decisões; segunda execução sem novas evidências não deve duplicar nem reescrever conteúdo sem necessidade.
- Entrada inacessível, configuração inválida ou conflito material: relatar BLOCKED com Reason, Evidence, Missing prerequisite e Recommended next skill/action, sem afirmar prontidão ou sobrescrever arquivos inválidos.
- Fixtures verificáveis para bootstrap novo, estado existente, repetição e bloqueios; manter verdes validação, suíte LF/CRLF e CLI.
- Preservar 18 skills, quatro targets, sem dependências novas, fonte independente de ferramenta e sem novo schema/template canônico de PROJECT_CONTEXT ou BOOTSTRAP_READINESS.

Fora do recorte: instalador, sync/doctor/list, roteador automático, integrações remotas e demais workflows. A CLI continua help/validate; execução real nos targets exige evidência própria futura.

Prompt de retomada: "Leia AGENTS.md e o handoff de 2026-10-06, confirme a validação verde e escreva a SPEC da primeira etapa contexto/bootstrap conforme Next Actions. Delimite a transição de status das duas skills antes da implementação."

## Suggested Skills

- `research`, apenas se a SPEC depender de compatibilidade externa ainda não documentada.
- `domain-modeling`, se o vocabulário de contexto/bootstrap revelar conflito com `CONTEXT.md`.
- `tdd`, para implementar os casos de bootstrap novo, estado existente, repetição e bloqueios antes do workflow.

## Constraints

Preservar as 18 skills e os quatro targets da emenda v1-A1. Nesta correção, não implementar workflows/instalador, adicionar dependências ou ampliar contratos. A primeira etapa futura está delimitada acima. Helpers externos de manutenção não integram o runtime. Não interpretar configuração local como validação de integração remota ou compatibilidade de targets. Manter decisões e estado fora das skills; registrar fatos e planos futuros separadamente.

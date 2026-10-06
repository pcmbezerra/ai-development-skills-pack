---
artifact: handoff
id: HANDOFF-20261006-001
version: 6
status: ready
created_by: handoff
inputs: ["baseline-v1", "amendment-v1-A1", "347b05a", "maintainer-confirmations-2026-10-06", "lf-crlf-fix-2026-10-06", "SPEC-20261006-001", "TICKET-SET-20261006-001"]
---

## Objective

Corrigir a incompatibilidade LF/CRLF do validador, registrar regressões e validação, e definir a primeira etapa futura dos workflows. Preservar o histórico de configuração e continuidade. Documento consolidado pela skill externa `handoff` a partir de evidências verificadas. Não representa execução da skill scaffold homônima deste pacote.

## Current State

Baseline v1 reconciliado + emenda v1-A1 (2026-10-06), commit inspecionado `347b05a`, branch inicial `main`, working tree inicialmente limpo. Pacote privado `1.0.0-scaffold`, licença ainda placeholder.

18 skills: 13 com invocação primária user e 5 model. Todas permanecem esqueletos. O registro contém 20 nomes de artefatos: 15 com templates, TICKET contido em TICKET_SET e quatro saídas apenas nomeadas. Quatro targets declarativos: Cursor, Codex, Gemini Antigravity e Claude Code; sem instalação implementada.

Validação estrutural, alias e CLI aprovados neste checkout Windows com CRLF; 38/38 testes passam. O parser normaliza apenas as strings de contratos/templates de artefatos em memória. A fase operacional não começou; o validador já admite ciclo de vida misto consistente, mas o catálogo permanece com 18 skills `scaffold`. `SPEC-20261006-001` foi decomposta no `TICKET-SET-20261006-001`. A frontier contém somente o ticket 01. A configuração de manutenção está documentada localmente; não foram criadas issues ou labels remotas.

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
- Criação da SPEC pronta de contexto/bootstrap e decomposição aprovada em quatro tickets lineares, todos `ready-for-agent`, com fallback Markdown local.

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

SPEC pronta: `.ai/artifacts/specs/2026-10-06-context-bootstrap.md`. TICKET_SET pronto: `.ai/artifacts/tickets/2026-10-06-context-bootstrap/`, com manifesto e quatro registros. O diretório de ADRs será criado quando houver conteúdo real. Não foram inventados esquemas ou alterados templates normativos.

## Files Changed

Histórico: criados os arquivos listados em Artifacts; atualizados `AGENTS.md`, `README.md` e `references/validation-result.md`. Na emenda v1-A1, atualizados também `references/architecture-contract-v1.md`, `references/provenance.md`, `contracts/skill-contract.md`, `manifest/skills.json`, `scripts/validate-skills.mjs` e `tests/validate-skills.test.mjs`; criado `targets/claude-code.mjs`.

Na correção LF/CRLF: `scripts/validate-skills.mjs`, `tests/validate-skills.test.mjs`, `references/validation-result.md`, `references/provenance.md`, `README.md`, `.ai/architecture.md` e este handoff. Essas mudanças foram versionadas no commit `0d3b98e`. Na etapa atual, foram criados a SPEC e o TICKET_SET de contexto/bootstrap; este handoff foi atualizado. Skills, manifest, targets, contratos e templates ainda não foram alterados para a fase operacional.

## Validation

Windows/PowerShell; Node.js v25.2.0; npm 11.6.2; HEAD `347b05a` mais alterações locais.

- Reprodução antes da correção: `npm run validate` falhou com 15 erros; `npm test` teve 17 aprovados e 3 falhos em 20 testes.
- RED das novas regressões: `node --test --test-name-pattern='with (LF|CRLF)' tests/validate-skills.test.mjs`: 3 LF aprovadas e 3 CRLF falhas.
- GREEN: `npm run validate` e `npm run skills:validate` PASS, 18 skills e quatro targets declarativos.
- `npm test`: PASS, 38 testes, zero falhas ou testes ignorados; doze regressões cobrem ciclo de vida misto, status inválido, divergências, ausência, placeholder e negação de workflow operacional.
- `node bin/ai-dev-skills.mjs --help` e `node bin/ai-dev-skills.mjs validate`: PASS, saída 0.
- `git ls-files --eol contracts/artifacts.md templates/artifacts/spec.md`: ambos continuam i/lf e w/crlf.
- Dependências de produção permanecem vazias; testes de dependências required/conditional/optional continuam aprovados.

Evidência detalhada e histórico preservados em `references/validation-result.md`. Fixtures LF no Windows não comprovam execução em Linux/macOS.

- Após criar `SPEC-20261006-001`, `npm run validate`: PASS, 18 skills e quatro targets. A SPEC contém todos os campos canônicos, está `ready` e não contém placeholders.
- Após criar `TICKET-SET-20261006-001`, validação estrutural reexecutada. Os quatro tickets têm escopo delimitado, dependências explícitas e acíclicas e critérios verificáveis.

## Known Issues

1. **Limite intencional do scaffold:** workflows, instalação, sync, doctor, list e routing automático inexistentes; sem testes de sobreposição semântica de routing ou validação de prontidão de artefatos de projetos.
2. **Plataformas não verificadas nesta correção:** Linux, nova execução macOS, Node.js 22 e execução real nos quatro targets. LF/CRLF cobertos em fixtures Windows.
3. **Integrações não verificadas:** `gh` ausente no PATH na sessão anterior; issues/labels remotas não verificadas.
4. **Publicação futura:** licença placeholder e pacote privado exigirão decisão própria antes de distribuir.

## Open Questions

Nenhuma questão bloqueante. A transição de status, os limites de schema e os critérios de validação estão definidos em `SPEC-20261006-001`; a ordem executável está no `TICKET-SET-20261006-001`.

## Next Actions

1. Implementar o ticket 01, único item na frontier atual.
2. Prosseguir em ordem linear pelos tickets 02, 03 e 04 somente após os respectivos bloqueadores concluírem.
3. Reconciliar os arquivos locais com GitHub Issues e aplicar `ready-for-agent` quando `gh` estiver disponível, sem criar duplicatas.

Prompt de retomada: "Leia AGENTS.md, o handoff de 2026-10-06, `SPEC-20261006-001` e `TICKET-SET-20261006-001`. Implemente o ticket 01 e não avance para tickets bloqueados."

## Suggested Skills

- `research`, apenas se a SPEC depender de compatibilidade externa ainda não documentada.
- `domain-modeling`, se o vocabulário de contexto/bootstrap revelar conflito com `CONTEXT.md`.
- `tdd`, para implementar os casos de bootstrap novo, estado existente, repetição e bloqueios antes do workflow.

## Constraints

Preservar as 18 skills e os quatro targets da emenda v1-A1. Nesta correção, não implementar workflows/instalador, adicionar dependências ou ampliar contratos. A primeira etapa futura está delimitada acima. Helpers externos de manutenção não integram o runtime. Não interpretar configuração local como validação de integração remota ou compatibilidade de targets. Manter decisões e estado fora das skills; registrar fatos e planos futuros separadamente.

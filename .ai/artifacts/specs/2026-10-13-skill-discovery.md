---
artifact: spec
id: SPEC-20261013-008
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261013-008
  - RESEARCH-20261013-401
  - HANDOFF-20261013-007
---

# Descoberta documentada de skills — emenda v1-A19

## Problem

O pacote instala skills nos diretórios que Cursor, Codex, Gemini Antigravity e Claude Code documentam, mas a `description` não diz quando usar a skill. A seleção implícita desses hosts depende dessa frase. Não existe descoberta além desse arquivo, e o validador não exige o formato que a especificação Agent Skills pede para o gatilho.

## Goal

Fazer a v1-A19 deixar cada skill pronta para a descoberta documentada: descrição com uso, validação estrutural e instalação inalterada no caminho já declarado.

## Scope

- Reescrever as dezoito descrições no manifest e no frontmatter, sem mudar goal, workflow, status, dependência ou routing.
- Exigir uma linha, a cláusula `Use when` e no máximo 240 caracteres.
- Rejeitar na suíte Node a ausência da cláusula e o excesso de orçamento.
- Registrar a emenda na proveniência, no contrato compartilhado e no README, separando fato de hipótese.
- Manter o instalador copiando o diretório canônico.

## Non-goals

- Executar Cursor, Codex, Antigravity ou Claude Code.
- Adicionar `list`, `doctor`, `sync`, detecção de plataforma, instalação global ou desinstalação.
- Adicionar frontmatter de fornecedor ou `agents/openai.yaml`.
- Criar índice, plugin ou marketplace.
- Reescrever workflows ou copiar contratos para dentro de cada skill.
- Alterar R1–R17, o ADR `0001` ou o baseline histórico em `references/architecture-contract-v1.md`.
- Afirmar que um host selecionou a skill.

## Actors

- Mantenedor do pacote.
- Agente do produto de destino, que lê a skill só se o host implementar a documentação citada.
- Validador estrutural do pacote.

## Functional Requirements

1. Cada uma das dezoito skills tem a mesma `description` no manifest e no frontmatter.
2. A descrição diz o que a skill faz e contém `Use when`.
3. A descrição tem no máximo 240 caracteres e permanece numa linha.
4. O frontmatter não ganha outro campo.
5. `install` e `package` continuam gravando `<projectSkillsPath>/<nome>/SKILL.md` com os mesmos bytes da fonte.
6. Descrição sem `Use when`, ou com mais de 240 caracteres, faz `npm run validate` falhar.
7. A documentação da emenda distingue páginas lidas de comportamento não executado.

## Business Rules

- Invocação primária continua sendo classificação de routing, não proibição de descoberta.
- Skill de invocação `model` continua aceitando pedido explícito.
- O orçamento de 240 caracteres é regra do pacote. O teto de 1024 caracteres pertence à especificação Agent Skills e não foi imposto como segunda checagem porque 240 já é menor.
- Recomendar uma skill na descrição não cria dependência nem executa a skill.

## Non-functional Requirements

- Determinismo: a mesma fonte produz o mesmo diretório instalado.
- Auditabilidade: a proveniência cita as URLs lidas em 2026-10-13.
- Portabilidade da fonte: nenhum caminho `.cursor`, `.claude` ou `.agents` entra no corpo da skill.
- Compatibilidade: Node.js >= 22, zero dependências npm, dezoito skills, quatro targets.

## Technical Constraints

- Não ampliar as chaves do descritor de target.
- Não alterar `scripts/distribute-skills.mjs`.
- Não tratar cenário agent-driven como execução de produto.

## Security / Privacy

A descrição não inclui segredo, credencial nem concessão de ferramenta.

## Acceptance Criteria

- `npm run validate` e `npm run skills:validate` passam com dezoito skills.
- `npm test` passa, incluindo a rejeição de descrição sem gatilho e a rejeição de descrição acima do orçamento.
- `git diff --check` passa.
- Nenhuma skill muda goal, status ou dependência.
- A ajuda da CLI não passa a oferecer `list`, `doctor` ou `sync`.

## Risks

O projeto consumidor ainda recebe links relativos que apontam para fora do diretório instalado. A seleção implícita pode falhar mesmo com a descrição válida. O orçamento de 240 pode ficar frouxo ou apertado quando o formato da lista do Codex for medido.

## Open Questions

Nenhuma questão bloqueante. A verificação ao vivo nos quatro produtos permanece aberta e fora deste aceite.

---
artifact: decision_set
id: DECISION-SET-20261013-008
version: 1
status: ready
created_by: clarify
inputs:
  - RESEARCH-20261013-401
  - HANDOFF-20261013-007
  - HANDOFF-20261006-001
---

## Objective

Definir a emenda v1-A19 para descoberta de skills pelos agentes já suportados, sem runtime próprio e sem integração não documentada.

## Resolved Decisions

- A emenda livre é v1-A19. Os identificadores novos são `RESEARCH-20261013-401`, `DECISION-SET-20261013-008`, `ARCHITECTURE-20261013-001`, `SPEC-20261013-008`, `TICKET-SET-20261013-008`, `TEST-20261013-015`, `IMPLEMENTATION-20261013-015`, `REVIEW-20261013-011` e `HANDOFF-20261013-008`. Não reutilizar identificadores da v1-A16, da v1-A17 nem da v1-A18.
- Descoberta suportada significa colocar `SKILL.md` no `projectSkillsPath` já declarado e escrever `description` com o que a skill faz e quando usá-la. Evidência: `RESEARCH-20261013-401`.
- O frontmatter permanece só `name` e `description`. `primaryInvocation` não gera flag de fornecedor. Evidência: o contrato compartilhado e o recorte comum dos quatro documentos.
- A descrição fica numa linha, contém `Use when` e respeita o orçamento de 240 caracteres do pacote. O limite de 1024 caracteres da especificação Agent Skills continua sendo o teto externo. O orçamento de 240 é política do pacote, derivada do teto publicado de 8.000 caracteres da lista inicial do Codex, e não é um limite medido nesse produto.
- Instalação, empacotamento, igualdade de bytes, colisão divergente e os quatro caminhos permanecem. Não há `list`, `doctor`, `sync`, desinstalação, instalação global nem detecção de plataforma.
- O validador passa a rejeitar descrição sem `Use when` ou acima de 240 caracteres. Ele não executa os quatro produtos.
- Goals, workflows, dependências, routing R1–R17 e o ADR `0001` permanecem. Nenhuma skill muda de status.
- Links relativos para contratos do pacote continuam como estão. Portabilidade da skill instalada fica fora desta emenda.
- R9 se aplica à fronteira de integração com os hosts. O desenho fica em `ARCHITECTURE-20261013-001`. Não há ADR novo: a emenda versiona a decisão na proveniência, no mesmo precedente da v1-A1 e da v1-A3.

## Constraints

- Dezoito skills e quatro targets. Evidência: `AGENTS.md`.
- Nenhuma dependência npm. Evidência: `package.json`.
- Skills continuam workflows do agente, não de um executor do pacote.

## Assumptions

- As páginas lidas em 2026-10-13 descrevem o comportamento que os hosts pretendem. A sessão não confirmou esse comportamento num processo desses produtos.
- Dezoito descrições de até 240 caracteres, mais nome e caminho, cabem na lista inicial do Codex na maior parte dos caminhos de projeto. O overhead exato é hipótese.

## Rejected Alternatives

- Índice de skills escrito pelo instalador. Não há documento dos quatro hosts que trate esse arquivo como catálogo.
- `disable-model-invocation` para skills de invocação `user`. Isso desligaria a descoberta automática que a emenda busca e usaria campo que Codex e Antigravity não declaram como comum.
- `agents/openai.yaml` só para o Codex. A fonte deixaria de ser independente de ferramenta.
- Comando `list`. O teste da CLI rejeita `list`, `doctor` e `sync`, e o comando não faz o host carregar a skill.
- Empacotar as dezoito skills como plugin de marketplace. Cada produto tem manifesto próprio e isso amplia targets.

## Open Questions

Nenhuma questão aberta muda o recorte. A medição ao vivo nos quatro produtos continua por fazer e não bloqueia a mudança estrutural.

## Blocking Questions

Nenhuma.

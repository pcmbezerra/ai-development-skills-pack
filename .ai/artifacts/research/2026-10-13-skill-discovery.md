---
artifact: research_report
id: RESEARCH-20261013-401
version: 1
status: ready
created_by: research
inputs:
  - HANDOFF-20261006-001
  - HANDOFF-20261013-007
---

## Research Question

Quais mecanismos documentados permitem que Cursor, Codex, Gemini Antigravity e Claude Code descubram uma skill deste pacote sem API privada, e o que continua hipótese?

## Findings

Os quatro hosts descobrem skills por varredura de diretórios que contêm `SKILL.md`. A seleção implícita usa `name` e `description`. O pacote já instala o diretório canônico de cada skill em `projectSkillsPath`. Não há API de registro documentada que este pacote precise chamar.

Cursor, em https://cursor.com/docs/skills, carrega `.cursor/skills/`, `.agents/skills/`, `.claude/skills/`, `.codex/skills/` e os equivalentes no diretório do usuário. O agente decide relevância pela `description`. `/nome` invoca a skill. `disable-model-invocation: true` desliga a seleção automática. Esse campo é extensão do Cursor, não do subconjunto comum.

Codex, em https://developers.openai.com/codex/skills, lê `.agents/skills` do diretório de trabalho até a raiz do repositório, além de locais de usuário, admin e sistema. A invocação implícita casa o pedido com `description`. A lista inicial cabe em 2% da janela ou em 8.000 caracteres quando a janela é desconhecida. `agents/openai.yaml` com `policy.allow_implicit_invocation` é opcional e específico do Codex. O padrão documentado é invocação implícita ligada.

Antigravity, em https://antigravity.google/docs/skills/ e no codelab de 25 de setembro de 2026, usa `<workspace>/.agents/skills/<skill>/SKILL.md` no Antigravity 2.0, no CLI e no IDE. O agente vê nome e descrição e pode seguir a skill sem comando. O CLI também expõe a skill como slash command. Plugins usam `skills/<skill-name>/SKILL.md` dentro do plugin, em https://antigravity.google/docs/plugins.

Claude Code, em https://code.claude.com/docs/en/skills, carrega `.claude/skills/<skill>/SKILL.md` no projeto e nos pais até a raiz do repositório. A `description` decide o carregamento automático. `disable-model-invocation` e `user-invocable` são extensões do Claude Code. O documento separa os campos do Agent Skills spec dos campos exclusivos do Claude Code.

A especificação em https://agentskills.io/specification exige `name` e `description`. A descrição tem no máximo 1024 caracteres e deve dizer o que a skill faz e quando usá-la. O nome deve coincidir com o diretório pai. Campos opcionais do spec incluem `license`, `compatibility`, `metadata` e `allowed-tools`.

## Evidence

As páginas acima foram lidas em 2026-10-13. Os descritores do pacote já declaram `.cursor/skills`, `.agents/skills` para Codex e Antigravity, e `.claude/skills`. O instalador copia o diretório da skill e o validador exige igualdade de bytes com a fonte. As descrições anteriores eram uma frase curta, sem cláusula de uso. Nenhum dos quatro produtos foi executado nesta sessão.

## Alternatives

Um índice markdown extra no diretório de skills não está documentado como superfície de descoberta. Flags de invocação por produto tornariam a fonte dependente do host e contradizem a regra de não inferir flags a partir de `primaryInvocation`. Comandos `list`, `doctor` e `sync` informam o catálogo do pacote e não fazem o host descobrir a skill. Marketplace e plugin exigem manifesto de plugin que nenhum dos quatro contratos atuais do pacote declara.

## Constraints

Não usar API privada nem recurso não documentado. Não criar runtime que execute a skill no lugar do agente. Não certificar comportamento de produto sem executar o produto. Manter frontmatter em `name` e `description`. Manter dezoito skills e quatro targets.

## Risks

A descrição longa demais pode ser encurtada ou omitida na lista inicial do Codex. Links relativos para `contracts/` resolvem neste repositório e não resolvem depois da instalação num projeto consumidor. Cursor descobre `.cursor/skills` e `.agents/skills`; instalar os dois targets no mesmo projeto pode listar a mesma skill duas vezes. A página de plugins do Antigravity e o codelab concordam com o diretório `SKILL.md`; um snippet de busca anterior falava em arquivo markdown solto, e a página buscada em 2026-10-13 não confirma esse layout.

## Unknowns

O formato exato da linha que o Codex conta nos 8.000 caracteres não foi medido. A precedência quando a mesma skill existe em `.cursor/skills` e `.agents/skills` não foi medida. Não se verificou se o Claude Code ignora em silêncio um campo de frontmatter desconhecido em todas as versões citadas na documentação. A execução real nos quatro produtos continua sem observação.

## Sources

- https://cursor.com/docs/skills
- https://developers.openai.com/codex/skills
- https://antigravity.google/docs/skills/
- https://antigravity.google/docs/plugins
- https://codelabs.developers.google.com/antigravity/how-to-create-agent-skills-for-antigravity-cli
- https://code.claude.com/docs/en/skills
- https://agentskills.io/specification
- `targets/cursor.mjs`, `targets/codex.mjs`, `targets/antigravity.mjs`, `targets/claude-code.mjs`
- `scripts/distribute-skills.mjs`

## Recommendation

Seguir com a emenda v1-A19 limitada à descrição que declara o uso e à validação estrutural desse formato. Não tratar a instalação atual como certificação de descoberta ao vivo. Deixar links portáteis, flags de fornecedor e comandos `list`/`doctor`/`sync` para um recorte posterior.

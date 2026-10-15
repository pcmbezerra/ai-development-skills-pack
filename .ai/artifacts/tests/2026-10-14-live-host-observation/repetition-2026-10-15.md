# Repetição das células abertas — 2026-10-15

Esta repetição não reabre a v1-A21 e não muda o veredito `OBSERVED` de `REPORT.md`. Não houve `FAIL`. Skills, contratos, targets, instalador e CLI do pacote não foram alterados. ADR `0001` e ADR `0002` não foram estendidos. A suíte Node não foi reexecutada nesta sessão.

## Máquina

macOS darwin 25.6.0. Node.js v26.5.0. Baseline funcional `b86f41d`. Consumidores Git fora do pacote: `~/v1-a21-consumers-20261015/codex` e `~/v1-a21-consumers-20261015/cursor`. `install` e `validate --target` passaram, 18 skills em cada um. Nenhum workflow gravou arquivo; não há `.ai/` nos consumidores.

Sete skills pessoais com o mesmo nome do pacote foram retiradas de `~/.agents/skills` só durante as sondas e restauradas ao final: `research`, `handoff`, `code-review`, `to-tickets`, `to-spec`, `implement` e `tdd`. Sobra da quarentena: zero. Sem esse isolamento, o Codex mostrava `research`, `tdd` e `code-review` duas vezes, uma em `~/.agents/skills` e outra no consumidor.

## Codex CLI

Host: Codex CLI 0.162.0-alpha.17.2, sessão autenticada. Superfície: `codex exec --ephemeral --sandbox read-only`. A lista visível ao modelo veio de `codex debug prompt-input`, sem chamada de modelo. As 18 descrições do consumidor coincidiram com o frontmatter e mantiveram `Use when`. Não houve aviso de omissão ou de descrição encurtada. A invocação explícita usou `$nome`.

| Gate | Estado | Evidência |
| --- | --- | --- |
| Descoberta das 18 skills | `PASS` | cada nome do pacote apareceu uma vez, raiz do consumidor |
| Descrição apresentada ao modelo | `PASS` | 18/18 iguais ao frontmatter, com `Use when` |
| Seleção automática das quatro sondas | `PASS` | as quatro citaram frase do corpo que não estava no pedido e apontaram o `SKILL.md` do consumidor |
| Invocação explícita `$nome` | `PASS` | `$clarify`, `$context-engineering`, `$workflow` e `$research` |
| Abertura de `references/` | `PASS` | as quatro citaram `Status: implemented. Primary invocation:` no `references/contract.md` do consumidor; `workflow` citou `"when": "external facts affect decisions"` |
| Abertura de `assets/` | `PASS` | `clarify` citou `artifact: decision_set`; `research` citou `artifact: research_report`; `context-engineering` e `workflow` declararam ausência de `assets/` |

Frases de carga, ausentes do pedido: `clarify` citou a definição de ambiguidade material que altera o critério de aceitação; `context-engineering` citou `Write only the five canonical documents.`; `workflow` citou `Return one preferred minimal sequence.`; `research` citou `Do not invent a fact, a business decision or an architectural decision.`

## Cursor

A célula inconclusiva da IDE Windows permanece o registro daquela janela. Nesta máquina a repetição usou a CLI `cursor agent` 2026.10.14, modo `ask`, sandbox ligado, no consumidor Cursor. A IDE local é 3.25.6. Só as duas seleções automáticas que tinham ficado em `Thinking` foram repetidas.

| Sonda | Estado | Evidência |
| --- | --- | --- |
| contexto ausente | `PASS` | carregou `.cursor/skills/context-engineering/SKILL.md` e citou `Write only the five canonical documents.` |
| fato externo de API | `PASS` | carregou `.cursor/skills/research/SKILL.md` e citou `Prefer repository evidence and project context.` |

As duas respostas foram finais. Não houve stall. Descoberta, descrição, invocação explícita e abertura de arquivo do Cursor não foram repetidas; continuam `PASS` na matriz Windows.

## Claude Code

O mantenedor mandou deixar o target no projeto e não validar este host: o serviço não está disponível nesta máquina. Nenhuma sonda foi executada. O estado continua `NOT_RUN`. Isso não é `FAIL` e não entra como aprovação.

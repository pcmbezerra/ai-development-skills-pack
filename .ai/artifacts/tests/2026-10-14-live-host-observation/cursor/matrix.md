# Cursor — matriz

A repetição de 2026-10-15 das duas seleções automáticas `INCONCLUSIVE` está em [../repetition-2026-10-15.md](../repetition-2026-10-15.md) e não muda o veredito `OBSERVED`. O registro abaixo é a IDE Windows.

Host: Cursor IDE 3.24.18. Consumidor: `...\v1-a21-consumers-20261014-windows\cursor`. Superfície: IDE. Resultado do host: `PASS`, com seleção automática `INCONCLUSIVE` aceita pela spec e sem gate em `FAIL`.

| Gate | Estado | Evidência observada |
| --- | --- | --- |
| Descoberta das 18 skills | `PASS` | os 18 nomes do manifesto apareceram uma vez no seletor `/`; nenhuma duplicata de nome do pacote |
| Descrição apresentada ao modelo | `PASS` | as 18 descrições corresponderam ao frontmatter e mantiveram `Use when` |
| Seleção automática das quatro sondas | `INCONCLUSIVE` | `clarify` e `workflow` passaram; `context-engineering` e `research` carregaram arquivos, mas o modelo permaneceu em `Thinking` sem resposta final dentro da janela de observação |
| Invocação explícita `/nome` | `PASS` | `/clarify`, `/context-engineering`, `/workflow` e `/research` carregaram a skill correspondente em conversas novas |
| Abertura de `references/` | `PASS` | as quatro sondas leram os arquivos esperados dentro de `.cursor\skills`; `workflow` também leu `references\catalogue.json` |
| Abertura de `assets/` | `PASS` | `clarify` citou `artifact: decision_set`; `research` citou `artifact: research_report`; `context-engineering` e `workflow` confirmaram ausência de `assets/` sem inventar arquivo |

## Seleção automática

| Sonda | Estado | Texto distintivo / comportamento |
| --- | --- | --- |
| ambiguidade material | `PASS` | escolheu `clarify`, citou `R3 — Material ambiguity` e a regra que altera critérios de aceite |
| contexto ausente | `INCONCLUSIVE` | abriu a skill, mas não publicou resposta final após mais de 75 s |
| ordem incerta | `PASS` | escolheu `workflow`, retornou `research → to-spec → implement (compõe tdd) → code-review` e citou `Return one preferred minimal sequence.` |
| fato externo de API | `INCONCLUSIVE` | abriu `research` e arquivos associados, mas não publicou resposta final após mais de 100 s |

Os dois estados inconclusivos são stalls do host/modelo, não erro de arquivo ou evidência de seleção incorreta.

## Invocação explícita e abertura de arquivos

| Skill | `references/contract.md` | Arquivo adicional | Estado |
| --- | --- | --- | --- |
| `clarify` | `Status: implemented. Primary invocation: user.` | `assets/decision-set.md`: `artifact: decision_set` | `PASS` |
| `context-engineering` | `Status: implemented. Primary invocation: model.` | confirmou que `assets/` não existe | `PASS` |
| `workflow` | `Status: implemented. Primary invocation: user.` | `references/catalogue.json`: `"when": "external facts affect decisions"`; confirmou ausência de `assets/` | `PASS` |
| `research` | `Status: implemented. Primary invocation: user.` | `assets/research-report.md`: `artifact: research_report` | `PASS` |

Nenhuma sonda gravou artefato no consumidor.

# Gemini Antigravity — matriz

Host: Antigravity IDE 2.5.5, modelo Gemini 3.8 Flash High. Consumidor: `...\v1-a21-consumers-20261014-windows\antigravity`. Resultado da superfície IDE: `PASS`. App e CLI: `NOT_RUN`.

| Gate | Estado | Evidência observada |
| --- | --- | --- |
| Descoberta das 18 skills | `PASS` | os 18 nomes do manifesto apareceram uma vez no menu `/`; nenhuma duplicata de nome do pacote |
| Descrição apresentada ao modelo | `PASS` | as 18 descrições completas corresponderam ao frontmatter e mantiveram `Use when` |
| Seleção automática das quatro sondas | `PASS` | as quatro sondas carregaram o `SKILL.md` esperado ou citaram frase distintiva do corpo |
| Invocação explícita `/nome` | `PASS` | as quatro invocações explícitas carregaram a skill correspondente |
| Abertura de `references/` | `PASS` | `contract.md` foi lido nas quatro skills; `workflow` também abriu `catalogue.json` |
| Abertura de `assets/` | `PASS` | `clarify` e `research` abriram os assets esperados; as duas skills sem assets não inventaram arquivo |

## Seleção automática

| Sonda | Estado | Texto distintivo / comportamento |
| --- | --- | --- |
| ambiguidade material | `PASS` | escolheu `clarify` e citou `A material ambiguity can change ... acceptance criteria` |
| contexto ausente | `PASS` | carregou `context-engineering/SKILL.md` e citou `context-engineering owns discovery and maintenance of: project.md, architecture.md, standards.md, tech-stack.md, business-rules.md`; por o consumidor não possuir `.ai/config.json`, recomendou primeiro `setup-ai-development-skills`, que compõe `context-engineering` |
| ordem incerta | `PASS` | escolheu `workflow`, retornou `research → to-spec → implement (compondo tdd) → code-review` e citou `Recommends the smallest skill sequence and does not execute it.` |
| fato externo de API | `PASS` | escolheu `research` e citou `Establishes external technical facts and leaves unsupported claims unresolved.` |

A sonda de contexto atende ao critério FR6 porque houve leitura direta e citação distintiva de `context-engineering/SKILL.md`; a recomendação de bootstrap foi coerente com o estado vazio do consumidor.

## Invocação explícita e abertura de arquivos

| Skill | `references/contract.md` | Arquivo adicional | Estado |
| --- | --- | --- | --- |
| `clarify` | `Status: implemented. Primary invocation: user.` | `assets/decision-set.md`: `artifact: decision_set` | `PASS` |
| `context-engineering` | `Status: implemented. Primary invocation: model.` | confirmou que `assets/` não existe | `PASS` |
| `workflow` | `Status: implemented. Primary invocation: user.` | `references/catalogue.json`: `"when": "external facts affect decisions"`; confirmou ausência de `assets/` | `PASS` |
| `research` | `Status: implemented. Primary invocation: user.` | `assets/research-report.md`: `artifact: research_report` | `PASS` |

Todos os caminhos lidos estavam sob `.agents\skills` do consumidor. O IDE abriu `references/` e `assets/` diretamente; a nomenclatura documentada `resources/` não impediu essas leituras. Nenhum arquivo foi gravado pela sondagem.

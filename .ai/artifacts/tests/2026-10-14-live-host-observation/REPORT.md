---
artifact: test_evidence
id: TEST-20261014-002
version: 4
status: ready
created_by: handoff
inputs:
  - SPEC-20261014-001
  - TICKET-SET-20261014-001
  - TEST-20261014-001
  - TEST-20261015-001
---

# Relatório da v1-A21

Veredito: `OBSERVED`.

Ao menos um host passou todas as gates: o Antigravity IDE. O Cursor também não apresentou `FAIL`; sua seleção automática ficou parcialmente `INCONCLUSIVE`, estado aceito pela spec. Codex e Claude Code permanecem `NOT_RUN` nas gates do modelo. Nenhuma falha do pacote, da distribuição ou da instalação dos targets foi identificada.

## Baseline preservada

- baseline funcional: `b86f41d`;
- HEAD e `origin/main`: `4cfad4f`, descendente documental sem mudança de produto;
- 18 skills em estado `implemented`;
- v1-A19 e v1-A20 concluídas;
- v1-A21 agora contém evidência real de host;
- v1-A22 não foi aberta.

## Resultado por host

| Host | Sessão | Resultado | Resumo |
| --- | --- | --- | --- |
| Cursor 3.24.18 | executada | `PASS`, com seleção automática `INCONCLUSIVE` | descoberta 18/18, descrições 18/18, explícitas 4/4, `references/` 4/4 e assets 2/2; seleção automática 2 `PASS` e 2 stalls sem resposta final |
| Codex CLI 0.146.0-alpha.3 | não iniciada no modelo | `NOT_RUN` | binário disponível, mas sem login; `codex exec` recebeu `401 Unauthorized` antes de resposta |
| Antigravity IDE 2.5.5 | executada | `PASS` | descoberta 18/18, descrições 18/18, seleção automática 4/4, explícitas 4/4, `references/` 4/4 e assets 2/2 |
| Claude Code | não executada | `NOT_RUN` | fora do conjunto autorizado nesta repetição; layout instalado continua validado |

O veredito segue o ticket 06: Antigravity passou todas as gates; Cursor não tem gate em `FAIL` e a spec aceita seleção automática `INCONCLUSIVE`; os demais hosts não produziram sessão do modelo e ficam `NOT_RUN`.

## Fatos observados

- Cursor e Antigravity descobriram uma única ocorrência de cada uma das 18 skills instaladas no projeto consumidor.
- Ambos apresentaram descrições compatíveis com o frontmatter e preservaram `Use when`.
- As oito invocações explícitas, quatro em cada IDE, carregaram a skill correspondente.
- Os dois IDEs leram `references/contract.md` nas quatro sondas.
- `clarify` abriu `assets/decision-set.md` e citou `artifact: decision_set`.
- `research` abriu `assets/research-report.md` e citou `artifact: research_report`.
- `workflow` abriu `references/catalogue.json` e citou `"when": "external facts affect decisions"`.
- `context-engineering` e `workflow` confirmaram ausência de `assets/` sem inventar arquivo.
- Antigravity abriu `references/` e `assets/` apesar de a documentação do produto nomear `resources/`; essa diferença não foi obstáculo nesta versão/superfície.
- O Codex instalado não possui sessão autenticada. A falha `401` ocorreu antes do modelo e não demonstra problema no pacote.
- Nenhum workflow gravou arquivo nos consumidores. Só os diretórios dos targets instalados permanecem nas árvores.
- A quarentena temporária foi revertida: 14 diretórios restaurados e zero remanescente.

## Estados inconclusivos

No Cursor, as sondas automáticas de `context-engineering` e `research` abriram material da skill, mas permaneceram em `Thinking` sem resposta final dentro da janela de observação. Elas ficam `INCONCLUSIVE`, não `FAIL`. As sondas automáticas de `clarify` e `workflow` passaram.

No Antigravity, a sonda de contexto carregou e citou `context-engineering`, mas recomendou `setup-ai-development-skills` como primeiro comando porque o consumidor vazio não continha `.ai/config.json`. Isso satisfaz o critério de carga da FR6 e é coerente com o roteamento do pacote.

## Limites

- O Codex exige autenticação do usuário para que suas gates possam ser observadas.
- Claude Code não foi incluído na autorização desta repetição.
- A execução não mede taxa futura de acerto da seleção automática.
- Não foi feito controle com diretório `resources/`, pois ele está fora do escopo da v1-A21.

## Validação estrutural final

- `npm test`: `PASS`, 53/53, zero falhas, skips ou TODOs.
- `npm run validate`: `PASS`, 18 skills.
- `npm run skills:validate`: `PASS`, 18 skills.
- `git diff --check`: `PASS`.
- Nenhum diff em `skills/`, `contracts/`, `manifest/`, `scripts/`, `targets/`, `bin/` ou `package.json`.

## Decisão

O pacote permanece estável e sem regressões conhecidas. Nenhuma correção estrutural, mudança de descrição, ajuste de diretório ou mudança de comportamento é autorizada por esta coleta, pois não houve `FAIL` reproduzível. Não abrir a v1-A22 neste momento.

Uma repetição futura pode completar Codex após login e as duas sondas automáticas do Cursor que ficaram em `Thinking`. Claude Code fica de fora enquanto o mantenedor não tiver esse ambiente. Isso não invalida a evidência positiva já coletada em Cursor e Antigravity.

## Retomada em 2026-10-15

`TEST-20261015-001` procurou só as células ainda abertas neste Linux. `codex`, `cursor` e `agent` não estão no PATH. Codex permanece `NOT_RUN`. As sondas automáticas de `context-engineering` e `research` permanecem `INCONCLUSIVE`. Claude Code não foi sondado, por exclusão do mantenedor, e permanece `NOT_RUN`. O veredito continua `OBSERVED`. A v1-A22 continua fechada.

# Codex — matriz

Estado do host: `NOT_RUN`. Evidência de lançamento: `environment.md`. Nenhuma sessão foi aberta. Nenhuma célula abaixo é `PASS`, `FAIL` ou `INCONCLUSIVE`.

| Gate | Estado | Evidência |
| --- | --- | --- |
| Descoberta das 18 skills | `NOT_RUN` | `codex --version` saiu 127 |
| Descrição apresentada ao modelo | `NOT_RUN` | sem sessão |
| Seleção automática das quatro sondas | `NOT_RUN` | sem sessão |
| Invocação explícita `$nome` ou `/skills` | `NOT_RUN` | sem sessão |
| Abertura de `references/` | `NOT_RUN` | sem sessão |
| Abertura de `assets/` | `NOT_RUN` | sem sessão |

O install em `/tmp/v1-a21-consumers/codex/.agents/skills` gravou 18 `SKILL.md` e `validate --target codex` passou. Esse resultado é layout em disco. O aviso de orçamento do Codex não foi observado.

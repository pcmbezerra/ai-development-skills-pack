---
artifact: ticket_set
id: TICKET-SET-20261019-001
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261019-001
  - ARCHITECTURE-20261019-001
  - ADR-0004
---

# Comando doctor — emenda v1-A23

Conjunto executável derivado de `SPEC-20261019-001` e de `ARCHITECTURE-20261019-001`. Cada bloco é um TICKET. O Markdown local é a fonte. Nenhum ticket publica issue remota. Esta execução não inicia os tickets.

## Title

01 — Comando doctor na CLI

## Goal

Fazer `ai-dev-skills doctor` emitir as duas linhas de diagnóstico, sem opção, sem arquivo e sem executar `git`.

## Context

`SPEC-20261019-001` define as duas verificações, os códigos de saída e a ajuda. `ARCHITECTURE-20261019-001` coloca o despacho em `bin/ai-dev-skills.mjs`. `ADR-0004` é a exceção só para esse comando. A spec não autoriza implementação. Este conjunto descreve o trabalho e não o executa.

## Scope

- Acrescentar `doctor` sem opção no despacho da CLI.
- Comparar o primeiro número de `process.versions.node` com 22.
- Resolver no `PATH` somente um arquivo de nome `git` com bit de execução.
- Imprimir `node pass|fail <versão>` e `git pass|fail`, nesta ordem.
- Incluir `ai-dev-skills doctor` na ajuda.
- Executar `main` só quando o arquivo é a entrada do processo.

## Out of Scope

- `sync`, `bootstrap`, desinstalação, instalação global, detecção de plataforma, localização de instalações, roteador automático, `meta-skills/skill-authoring` e testes semânticos de overlap. Evidência: Non-goals da spec.
- Chamar `validate` ou `validateTarget`. Evidência: requisito 8 da spec.
- Executar `git`, aceitar `git.exe`, ler `PATHEXT` ou usar a rede. Evidência: `ADR-0004` e o risco de Windows em `ARCHITECTURE-20261019-001`.
- Mudança de manifesto, targets, instalador, `package.json`, frontmatter ou dependência npm. Evidência: `ADR-0004`.
- Alterar `tests/validate-skills.test.mjs`. Isso é o ticket 02.

## Dependencies

Nenhuma. A spec, o desenho e `ADR-0004` já estão `ready`.

## Implementation Notes

Calcular as duas linhas e usar `console.log`. Falha de diagnóstico atribui `process.exitCode = 1` sem `throw`. Argumento ou opção permanece no parser atual. A observação de Git usa `node:path` e `node:fs`, com `path.delimiter`, e trata lançamento como `git fail`. O guarda de entrada segue `scripts/validate-skills.mjs`. Não reescrever ADR `0001`, ADR `0002` nem ADR `0003`.

## Acceptance Criteria

- Sem argumentos, as duas linhas saem na stdout e a stderr fica vazia. Saída 0 só quando as duas passam. Evidência: critérios 1 e 6 da spec.
- A função de versão rejeita `21.9.9` e aceita `22.0.0` e `23.1.0` sem outro binário Node.js. Evidência: critério 2 da spec.
- `PATH` sem executável `git`, arquivo não executável ou observação que lança erro produz `git fail` e conserva a linha de Node. Evidência: critérios 3, 4, 5 e 6 da spec.
- `doctor --target cursor` termina com saída 1, escreve `ERROR:` na stderr e não escreve as duas linhas. Evidência: critério 7 da spec.
- `--help` contém `ai-dev-skills doctor`. Evidência: critério 10 da spec.
- O comando não cria arquivo e não chama `validate` nem `validateTarget`. Evidência: critérios 8 e 9 da spec.

## Validation

Invocar `node bin/ai-dev-skills.mjs doctor` e `--help`. Importar a comparação de versão sem disparar a CLI. Confirmar que o ramo de `doctor` não referencia `validate` nem `validateTarget`.

## Definition of Done

Os critérios acima são observados na CLI e o working tree de manifesto, targets, instalador e contratos permanece sem essa mudança.

## Title

02 — Testes de doctor separados de sync e bootstrap

## Goal

Fixar na suíte o diagnóstico de `doctor` e manter `sync` e `bootstrap` rejeitados.

## Context

`tests/validate-skills.test.mjs` exige saída 1 e `ERROR:` para `bootstrap`, `doctor` e `sync` no mesmo laço. `ARCHITECTURE-20261019-001` manda separar só `doctor`. A Validation Strategy do desenho e os critérios 1 a 12 da spec são a evidência.

## Scope

- Tirar `doctor` do laço que rejeita comando não suportado.
- Afirmar as duas linhas, a stderr vazia, o `PATH` controlado e a regra de versão.
- Afirmar saída 1 para `doctor --target cursor`, para `sync` e para `bootstrap`.
- Afirmar que `list` continua imprimindo os 18 nomes e que a ajuda contém `ai-dev-skills doctor`.

## Out of Scope

- Novo arquivo de teste, dependência npm ou outro binário Node.js.
- Aceitar `git.exe` ou `PATHEXT` para contornar o Windows. Evidência: Risks de `ARCHITECTURE-20261019-001`.
- Mudança de `scripts/distribute-skills.mjs` ou dos quatro targets.
- Implementar o comando. O comando é o ticket 01.

## Dependencies

Ticket 01. Sem ciclo.

## Implementation Notes

O `PATH` do `spawn` aponta para um diretório do teste com um arquivo de nome `git`. A versão `21.9.9` entra na função pura, não num segundo Node.js. Não lançar Cursor, Codex, Antigravity nem Claude Code.

## Acceptance Criteria

- `npm test` cobre saída 0 com `node pass` e `git pass` quando o `PATH` do teste tem `git` executável. Evidência: critério 1 da spec.
- A suíte cobre `git fail` sem executável, com arquivo não executável e com observação que lança erro. Evidência: critérios 3 e 6 da spec.
- `sync` e `bootstrap` terminam com saída 1. `list` imprime 18 nomes. Evidência: critério 11 da spec.
- Nenhuma dependência npm é adicionada e o catálogo permanece em 18 skills. Evidência: critério 12 da spec.

## Validation

`npm test` e `npm run validate` depois do ticket 01.

## Definition of Done

A suíte passa com `doctor` separado de `sync` e `bootstrap`, e `git status` não mostra manifesto, targets, instalador nem contratos alterados por este ticket.

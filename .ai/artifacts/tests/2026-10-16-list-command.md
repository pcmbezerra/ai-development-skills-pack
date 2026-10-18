---
artifact: test_evidence
id: TEST-20261016-002
version: 1
status: ready
created_by: implement
inputs:
  - TICKET-SET-20261016-001
  - SPEC-20261016-001
  - TEST-20261016-001
---

## Tests Added

As asserções de `list` no teste já existente da CLI. Nenhum arquivo de teste novo.

## Tests Executed

`npm test`. `npm run validate`. `node bin/ai-dev-skills.mjs list`. `node bin/ai-dev-skills.mjs list --target cursor`. `doctor`, `sync` e `bootstrap`. `package --target all` e `install` com `validate --target` nos quatro targets.

## Expected Failure / RED

Registrado em `TEST-20261016-001`, antes da edição de `bin/ai-dev-skills.mjs`. A ajuda não continha `ai-dev-skills list`. O processo de teste saiu 1.

## Passing Evidence / GREEN

`list` saiu 0 e imprimiu, nesta ordem: `setup-ai-development-skills`, `workflow`, `clarify`, `context-engineering`, `handoff`, `research`, `to-spec`, `domain-modelling`, `architecture-design`, `to-tickets`, `diagnose`, `implement`, `tdd`, `refactor`, `edge-case-analysis`, `code-review`, `docs`, `modernize`. `list --target cursor` saiu 1 com `Unsupported option: --target`. `doctor`, `sync` e `bootstrap` saíram 1 com `Unsupported command`.

## Regression Suite

`npm test`: 53 aprovados, 0 falhas, 0 ignorados, 0 todos. `npm run validate`: PASS, 18 skills. Pacotes de `claude-code`, `cursor`, `codex` e `antigravity` PASS. Cada install copiou 18 skills e cada `validate --target` passou. Diretório temporário removido.

## Failures

Nenhuma na execução verde.

## Skipped Tests

Nenhum.

## Environment Limitations

`npm test` desta execução não reimprimiu `node -v`. A versão impressa mais cedo nesta sequência foi Node.js v26.5.0 e npm 11.17.0. Os quatro produtos não foram lançados. Claude Code permanece `NOT_RUN` como veredito de host, não como falha desta suíte.

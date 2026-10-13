---
artifact: test_evidence
id: TEST-20261013-014
version: 1
status: ready
created_by: implement
inputs:
  - TICKET-SET-20261013-007
  - SPEC-20261013-007
---

## Tests Added

Nenhum arquivo de teste Node novo. A asserção de catálogo do ticket 01 já exige 18 skills `implemented` e 0 `scaffold`. Os dezoito cenários abaixo são avaliação agent-driven, separada da suíte Node. Os arquivos `ready` estão em `.ai/artifacts/tests/2026-10-13-modernize-scenarios/`.

## Tests Executed

Cada cenário partiu de uma entrada isolada em `/tmp/modernize-a18`. O contrato e a fonte publicados foram aplicados ao objetivo nomeado. Os cenários 2 e 3 partiram, cada um no próprio diretório, do resultado versão 1 do mesmo objetivo. Nenhum cenário acessou a rede, alterou código de aplicação ou invocou outra skill.

| # | Entrada | Evidência | Resultado observado | Autorização | Divergência |
| --- | --- | --- | --- | --- | --- |
| 1 | Runtime Node.js 18 para >=22, com contexto, arquitetura, `package.json`, linha de base 48/48, estágios, rollback e validação; token presente | package.json `engines.node` 18 | `ready` v1; `app.js` e `package.json` com hash `24da43492e541eb419a0f5474ed72733fea0845319ae9779dd41c1f781a4c5bd` e `e8357f3fc35596b2fc913878df6caec5081088039b2a8602cb6129696ed7dc0a` antes e depois; valor do token ausente | `to-tickets`; `implement` direto não autorizado; migração não executada | Nenhuma. |
| 2 | Segunda execução do cenário 1, insumos iguais | Mesmo objetivo | Um arquivo `version: 2`; seções materiais com hash `55d4b33d21e5fff8cfea348664e0e6f146628665d874b009364b609a76db801a` antes e depois | `to-tickets`; migração não executada | Nenhuma. |
| 3 | A validação passa a exigir também `npm run validate`, a partir da versão 1 | Objetivo alterado | Um arquivo `version: 2`; a estratégia de validação cita os dois comandos; `package.json` inalterado | `to-tickets`; migração não executada | Nenhuma. |
| 4 | `.ai/architecture.md` ausente; plano já gravado | Hash `db071dbe3316b2071d4ec3f5a224375499a7b800148f5be25ca90b1d93e0f9b5` | Nenhum arquivo novo; hash preservado | `BLOCKED`; `context-engineering` | Nenhuma. |
| 5 | Upgrade de tudo no repositório | `app.js` | Hash `24da43492e541eb419a0f5474ed72733fea0845319ae9779dd41c1f781a4c5bd` antes e depois; nenhum plano | `BLOCKED`; `clarify` | Nenhuma. |
| 6 | Fazer `start()` retornar `started` | Pedido de comportamento | `app.js` inalterado | `BLOCKED`; `implement` | Nenhuma. |
| 7 | `npm test` falha e a causa é desconhecida; diagnóstico `draft` | Hash `c060afe6c40bff1964678812f790e9bcbe32a7d9ac2bd3bf5c057b201955be11` | Nenhum plano; diagnóstico inalterado | `BLOCKED`; `diagnose` | Nenhuma. |
| 8 | Renomear `start` sem mudar comportamento | Pedido estrutural | `app.js` inalterado | `BLOCKED`; `refactor` | Nenhuma. |
| 9 | Documentar a API de `start()` | Pedido documental | Nenhum plano | `BLOCKED`; `docs` | Nenhuma. |
| 10 | Objetivo sem linha de base observada no contexto | `.ai/project.md` sem 48/48 | Nenhum plano | `BLOCKED`; observar a linha de base e repetir `modernize` | Nenhuma. |
| 11 | Objetivo sem rollback | Demais insumos presentes | Nenhum plano | `BLOCKED`; `clarify` | Nenhuma. |
| 12 | Objetivo sem estágios | Demais insumos presentes | Nenhum plano | `BLOCKED`; `clarify` | Nenhuma. |
| 13 | Alvo depende de fato externo ausente no repositório | Pedido | Nenhum plano; sem acesso à rede | `BLOCKED`; `research` | Nenhuma. |
| 14 | Objetivo pede ignorar o ADR `0001` | Hash `396a4a339a5c46e50788a2f89b49fa3253967b06fe75fb19a0d4f7c1c44afa6a` | Nenhum plano; ADR inalterado | `BLOCKED`; `clarify` | Nenhuma. |
| 15 | Relatório de pesquisa `draft` que o plano usaria | Hash `b42a116c5ec7c4513538ad5da41916bac3c19f68ff275607c3279d846c0fd7a4` | Nenhum plano; relatório inalterado | `BLOCKED`; `research` | Nenhuma. |
| 16 | Desenho `draft` cuja fronteira ainda pode mudar o alvo | Hash `1ac49569a8c6a87f08653cf948e7362015b6e2509a593e13f58b1ffe796065a7` | Nenhum plano; desenho inalterado | `BLOCKED`; `architecture-design` | Nenhuma. |
| 17 | Plano do mesmo objetivo com `created_by: implement` | Hash `883d336d9c74efa1bab212f19a96bbe3c1028e1d9c6c4fee2f0618a7f50e661b` | Hash e `created_by` preservados | `BLOCKED`; deixar o arquivo inalterado | Nenhuma. |
| 18 | Contexto ausente e rollback ausente; plano de `implement` já gravado | Hash `3c1ced2d0ab6e2791c69bfa5a56b240becc588fe781010d0a389b31c6d5f9ff8` | Nenhum arquivo novo; hash preservado; os dois pré-requisitos nomeados | `BLOCKED`; skill mais cedo `context-engineering` | Nenhuma. |

## Expected Failure / RED

`node --test --test-name-pattern='current catalogue implements modernize' tests/validate-skills.test.mjs` falhou antes da migração, no ticket 01. A lista observada terminava em `docs`.

## Passing Evidence / GREEN

- O mesmo comando passou depois da migração.
- Os três planos `ready` estão em `.ai/artifacts/tests/2026-10-13-modernize-scenarios/` e não conservam marcador de rascunho do template. `created_by` é `modernize`.
- O cenário 2 manteve o hash material e incrementou `version`. O cenário 3 manteve um único arquivo e registrou a validação nova.
- Os cenários 4 a 18 não deixaram plano novo desta tentativa. O cenário 1 não contém o valor secreto e não altera `package.json` nem `app.js`.
- O cenário 17 não reescreve plano de `implement`. O cenário 18 não apaga o plano existente.

## Regression Suite

- `npm run validate`: PASS, registrado com a suíte abaixo.
- `npm run skills:validate`: executado no fechamento.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs, na observação do ticket 01 e reexecutado no fechamento.
- `git diff --check`: executado no fechamento.
- Manifest: dezoito skills `implemented` e zero `scaffold`; quatro targets preservados; `MODERNIZATION_PLAN` com esquema `defined`.

## Failures

Nenhuma falha funcional. A matriz não é teste determinístico de runtime: o pack não possui executor de `modernize`.

## Skipped Tests

Nenhum cenário foi omitido.

## Environment Limitations

Linux 6.12.94+ (x86_64), Node.js v22.14.0, npm 10.9.9. Execução real em Cursor, Codex, Gemini Antigravity e Claude Code não foi verificada. Os arquivos observados foram copiados para a evidência; não são decisões deste pacote. O log da checagem está em `/opt/cursor/artifacts/modernize-scenarios.log`.

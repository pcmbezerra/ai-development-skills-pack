---
artifact: test_evidence
id: TEST-20261013-010
version: 1
status: ready
created_by: implement
inputs:
  - TICKET-SET-20261013-005
  - SPEC-20261013-005
---

## Tests Added

Nenhum arquivo de teste Node novo. A asserção de catálogo do ticket 01 já exige 16 skills `implemented` e 2 `scaffold`. Os dezoito cenários abaixo são avaliação agent-driven, separada da suíte Node. Os arquivos `ready` estão em `.ai/artifacts/tests/2026-10-13-docs-scenarios/`.

## Tests Executed

Cada cenário partiu de uma entrada isolada em `/tmp/docs-a16`. O contrato e a fonte publicados foram aplicados ao objetivo nomeado. Os cenários 2 e 3 partiram, cada um no próprio diretório, do resultado versão 1 do mesmo objetivo. Nenhum cenário acessou a rede, escreveu fora da raiz ou invocou outra skill.

| # | Entrada | Evidência | Resultado observado | Autorização | Divergência |
| --- | --- | --- | --- | --- | --- |
| 1 | `docs/setup.md` diz Node.js 18; `package.json` declara `>=22`; token presente | package.json | `ready` v1; setup atualizado para `>=22`; valor do token ausente | Implementação não autorizada | Nenhuma. |
| 2 | Segunda execução do cenário 1, insumos iguais | Mesmo package.json | Um arquivo `version: 2`; setup com hash `6f7010f9d83564e0d02467d0a71764adb89554144ae9a1096830ba5cbe6947d6` antes e depois | Implementação não autorizada | Nenhuma. |
| 3 | `engines.node` passa a `>=22 <25` a partir da versão 1 | package.json alterado | Um arquivo `version: 2`; intervalo novo | Implementação não autorizada | Nenhuma. |
| 4 | Contexto ausente e pedido para o login retornar 401; arquivos já gravados | Diretório sem `.ai/project.md` | Nenhum arquivo novo; hashes `486fa636ce94514090773fe453f78b8f38cb3a9c507d7c673e31988c15151130` e `4d5c461b6130d341bb54184054b4d41c1e8d0ebfd9a559daf443fc57c2826644` preservados | `BLOCKED`; skill mais cedo `context-engineering`; `implement` nomeado | Nenhuma. |
| 5 | `docsPath` é `../outside` | config.json | Nenhum arquivo fora da raiz | `BLOCKED`; `setup-ai-development-skills` | Nenhuma. |
| 6 | Contexto presente e objetivo ausente | Diretório | Nenhum arquivo novo | `BLOCKED`; `clarify` | Nenhuma. |
| 7 | Fazer `login()` retornar 401 | Pedido de comportamento | Nenhum arquivo novo | `BLOCKED`; `implement` | Nenhuma. |
| 8 | Login falha e a causa é desconhecida | Pedido de diagnóstico | Nenhum arquivo novo | `BLOCKED`; `diagnose` | Nenhuma. |
| 9 | Renomear `parseConfig` sem mudar comportamento | Pedido estrutural | Nenhum arquivo novo | `BLOCKED`; `refactor` | Nenhuma. |
| 10 | Migrar o framework legado | Pedido de modernização | Nenhum arquivo novo | `BLOCKED`; `modernize` | Nenhuma. |
| 11 | Documentar que conjunto bloqueado não é persistido | ADR com hash `8c2344dc0b26bd0bf648f1d76ad63b99d2f6eb5386cb685292c6863c4f402253` | Nenhum arquivo novo; hash igual | `BLOCKED`; `clarify` | Nenhuma. |
| 12 | Documentar que a API pública aceita Pix | Repositório sem essa evidência | Nenhum arquivo novo; sem acesso à rede | `BLOCKED`; `research` | Nenhuma. |
| 13 | Spec nomeada com status `draft` | Hash `b9951fa8d379b8ca640d8ed4a64b19b4676a38777a1005716f0622bee41b1931` | Nenhum arquivo novo; spec inalterada | `BLOCKED`; `to-spec` | Nenhuma. |
| 14 | SPEC-WIDGETS `ready` marca POST /widgets como desenho futuro | Spec e ausência de implementação | `ready`; `docs/widgets.md` marca future design e nega comportamento atual | Implementação não autorizada | Nenhuma. |
| 15 | Desenho de arquitetura `draft` | Hash `07cf6dbca55e8632d1cc53fce80c29b286a7be1f5ea2b0f9ffe749b55f94a76e` | Nenhum arquivo novo; desenho inalterado | `BLOCKED`; `architecture-design` | Nenhuma. |
| 16 | Relatório de pesquisa `draft` | Hash `5b95b51c16f6b07be170a2e8b177db43326d91bbd376332dd5ff7c1408e0fb6e` | Nenhum arquivo novo; relatório inalterado | `BLOCKED`; `research` | Nenhuma. |
| 17 | `docs/setup.md` já diz `>=22` | package.json | `ready`; hash `6f7010f9d83564e0d02467d0a71764adb89554144ae9a1096830ba5cbe6947d6` antes e depois; arquivo listado como inalterado | Implementação não autorizada | Nenhuma. |
| 18 | Atualização do mesmo objetivo com `created_by: implement` | Hash `07881ff2ca83946bc4620a4f60043306be7b0c54d67d61c7eecc0faab4ff2314` | Nenhum arquivo novo; hash e `created_by` preservados | `BLOCKED`; deixar o arquivo inalterado | Nenhuma. |

## Expected Failure / RED

`node --test --test-name-pattern='current catalogue implements docs' tests/validate-skills.test.mjs` falhou antes da migração, no ticket 01. O valor observado terminava em `code-review` sem `docs`.

## Passing Evidence / GREEN

- O mesmo comando passou depois da migração.
- Os cinco `DOC_UPDATE` `ready` estão em `.ai/artifacts/tests/2026-10-13-docs-scenarios/` e não conservam marcador de rascunho do template. `created_by` é `docs`.
- O cenário 2 manteve o hash da documentação e incrementou `version`. O cenário 3 manteve um único arquivo e registrou o intervalo novo.
- Os cenários 4 a 13, 15, 16 e 18 não deixaram arquivo novo. O cenário 5 não criou diretório fora da raiz. O cenário 12 não acessou a rede.
- O cenário 1 não contém o valor secreto. O cenário 14 não descreve POST /widgets como comportamento atual.
- O cenário 17 não reescreve documentação que já confere. O cenário 18 não reescreve atualização de `implement`.

## Regression Suite

- `npm run validate`: PASS, registrado com a suíte abaixo.
- `npm run skills:validate`: executado no fechamento.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs, na observação do ticket 01 e reexecutado no fechamento.
- `git diff --check`: executado no fechamento.
- Manifest: dezesseis skills `implemented` e duas `scaffold`; quatro targets preservados; `DOC_UPDATE` com esquema `defined`.

## Failures

Nenhuma falha funcional. A matriz não é teste determinístico de runtime: o pack não possui executor de `docs`.

## Skipped Tests

Nenhum cenário foi omitido.

## Environment Limitations

Linux 6.12.94+ (x86_64), Node.js v22.14.0, npm 10.9.9. Execução real em Cursor, Codex, Gemini Antigravity e Claude Code não foi verificada. Os arquivos observados foram copiados para a evidência; não são decisões deste pacote. O log da checagem está em `/opt/cursor/artifacts/docs-scenarios.log`.

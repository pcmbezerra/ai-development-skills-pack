---
artifact: test_evidence
id: TEST-20261009-003
version: 1
status: ready
created_by: tdd
inputs:
  - TICKET-SET-20261009-003
  - SPEC-20261009-003
---

## Tests Added

A asserção de catálogo passou a exigir `architecture-design` implementada no ticket 01: oito skills `implemented`, dez `scaffold`, as dependências condicionais já declaradas e `ARCHITECTURE_DESIGN` e `ADR` com esquema `defined` e os templates existentes. Nenhum teste Node novo foi criado neste fechamento. Os dezoito cenários abaixo são avaliação agent-driven, separada da suíte Node.

## Tests Executed

Cada cenário partiu de uma entrada isolada em `/tmp/architecture-design-a9`, aplicou o contrato e a fonte publicados e comparou status, seções, autorização e arquivos vizinhos com a spec. Os cenários 3 e 4 partiram, cada um no próprio diretório, do desenho versão 1 do cenário 1. Nenhum cenário invocou `to-tickets`, `research`, `domain-modelling` ou `implement`.

| # | Entrada | Evidência | Desenho observado | Autorização | Divergência |
| --- | --- | --- | --- | --- | --- |
| 1 | Spec `ready` divide o validador em parser e reporter; `validate(root)` permanece; sem R8 e sem decisão durável | Spec | `ready`; um arquivo; treze seções; nenhum ADR | `to-tickets` autorizado e não invocado | Nenhuma. |
| 2 | Spec `ready` registra um descritor declarativo por target, alternativas e a rejeição do instalador global | Spec e ADR `0001` | `ready`; desenho sem o instalador global; ADR `ready` com a alternativa rejeitada | `to-tickets` autorizado e não invocado | Nenhuma. |
| 3 | Segunda execução do objetivo do cenário 1, insumos iguais | Mesma spec | Um arquivo `version: 2`; seções materiais iguais às da versão 1; nenhum ADR | `to-tickets` autorizado e não invocado | Nenhuma. |
| 4 | A spec do mesmo objetivo acrescenta que o reporter escreve só em stdout | Mesmo objetivo, a partir da versão 1 | Um arquivo `version: 2`; `validate(root)` preservado; impacto operacional novo | `to-tickets` autorizado e não invocado | Nenhuma. |
| 5 | Spec `ready` limitada a renomear uma variável local privada | Spec | Nenhum arquivo | `BLOCKED`; `to-tickets` | Nenhuma. |
| 6 | A mesma mudança, com o glossário nomeando "public interface" | Glossário não dispara R9 | Nenhum arquivo | `BLOCKED`; `to-tickets` | Nenhuma. |
| 7 | Spec `ready` do cenário 1 sem contexto do projeto | Diretório sem contexto | Nenhum arquivo | `BLOCKED`; `context-engineering` | Nenhuma. |
| 8 | Contexto presente, sem spec | Diretório | Nenhum arquivo | `BLOCKED`; `to-spec` | Nenhuma. |
| 9 | Spec `ready` de implantação cita o valor do token | Spec | `ready`; existência e efeito registrados; valor omitido; nenhum ADR | `to-tickets` autorizado sem o valor | Nenhuma. Busca no desenho: zero ocorrências do valor. |
| 10 | Spec `ready` com invariante de cancelamento e divisão de módulo, sem modelo | R8 | Nenhum arquivo | `BLOCKED`; `domain-modelling` | Nenhuma. |
| 11 | Spec `ready` só com fronteira de módulo; modelo presente `draft` | Status do modelo | Nenhum arquivo | `BLOCKED`; `domain-modelling` | Nenhuma. |
| 12 | Spec adota só a divisão parser/reporter; modelo recomenda agregado Charge; pesquisa recomenda Zod | Spec, modelo e pesquisa `ready` | `ready`; os três insumos citados; Charge e Zod ausentes | `to-tickets` autorizado e não invocado | Nenhuma. |
| 13 | Premissa de buffer compartilhado que ainda altera a divisão | Premissa | Nenhum arquivo; a premissa não vira componente | `BLOCKED`; `clarify` | Nenhuma. |
| 14 | Interface `validate(root)` ou `validate(root, options)` | Spec sem escolha | Nenhum arquivo; interface não inventada | `BLOCKED`; `clarify` | Nenhuma. |
| 15 | Spec manda parar de persistir conjunto bloqueado, contra o ADR `0001` | ADR | Nenhum arquivo; hash `89a6a6dfcf7e4c25ce46a8fd3ddebe1ff8b356044d246f65f12d29f169aa256c` igual antes e depois | `BLOCKED`; `clarify`; decisão existente preservada | Nenhuma. |
| 16 | O CLI do target suporta descoberta de skill em 2026? | Fato fora do repositório | Nenhum arquivo; o fato não vira decisão; sem rede | `BLOCKED`; `research` | Nenhuma. |
| 17 | Relatório de pesquisa presente com status `draft` | Status do relatório | Nenhum arquivo | `BLOCKED`; `research` | Nenhuma. |
| 18 | Sem contexto, spec `draft`, fato externo e invariante sem modelo | Quatro bloqueios | Nenhum arquivo; um relatório nomeia os quatro | `BLOCKED`; skill mais cedo `context-engineering` | Nenhuma. |

## Expected Failure / RED

`node --test --test-name-pattern='current catalogue implements architecture-design' tests/validate-skills.test.mjs` falhou antes da migração, no ticket 01. O valor observado foi `setup-ai-development-skills`, `workflow`, `clarify`, `context-engineering`, `to-spec`, `domain-modelling`, `to-tickets`.

## Passing Evidence / GREEN

- O mesmo comando passou depois da migração consistente de manifest, contrato e fonte. As seções Workflow são idênticas.
- Os seis desenhos `ready` estão em `.ai/artifacts/tests/2026-10-09-architecture-design-scenarios/` e não conservam marcador de rascunho do template. O ADR do cenário 2 também está lá.
- O cenário 3 manteve as seções materiais e incrementou `version`. O cenário 4 manteve um único arquivo, preservou `validate(root)` e acrescentou o impacto operacional.
- Os cenários 5 a 8 e 10, 11 e 13 a 18 não deixaram desenho nem ADR. O cenário 15 preservou o hash do ADR `0001`. O cenário 16 não acessou a rede.
- O cenário 9 não contém o valor secreto. O cenário 2 não contém o instalador global no desenho; o ADR o registra como alternativa rejeitada. O cenário 12 não contém Charge nem Zod.

## Regression Suite

- `npm run validate`: PASS.
- `npm run skills:validate`: PASS.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs.
- `git diff --check`: PASS.
- Manifest: `setup-ai-development-skills`, `workflow`, `clarify`, `context-engineering`, `to-spec`, `domain-modelling`, `architecture-design` e `to-tickets` implementadas; 10 scaffold; quatro targets preservados; `ARCHITECTURE_DESIGN` e `ADR` com esquema `defined`.

## Failures

Nenhuma falha funcional. A matriz não é teste determinístico de runtime: o pack não possui executor de `architecture-design`.

## Skipped Tests

Nenhum cenário foi omitido.

## Environment Limitations

Node.js 22, Linux e descoberta real nos quatro produtos não foram verificados. Ambiente desta evidência: macOS 26.6.2 (Darwin 25.6.0), Node.js v26.5.0, npm 11.17.0.

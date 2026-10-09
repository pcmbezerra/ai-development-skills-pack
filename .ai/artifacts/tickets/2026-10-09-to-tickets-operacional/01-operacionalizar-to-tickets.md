# 01: Operacionalizar to-tickets

**What to build:** `to-tickets` passa a converter uma spec `ready` num conjunto de tickets `ready`, ou a devolver o relatório `BLOCKED` sem gravar conjunto, e encerra sem invocar a skill seguinte.

**Blocked by:** None (can start immediately).

**Status:** workflow published

## Title

Operacionalizar to-tickets

## Goal

Implementar a skill `to-tickets` para gravar um conjunto `ready` quando o gate de ticket passa, e para devolver o relatório `BLOCKED` quando a spec, a decisão, o artefato opcional ou o próprio gate impedem essa gravação.

## Context

`SPEC-20261009-001` define a emenda v1-A7. O mantenedor confirmou um único seam de comportamento, com a suíte Node acompanhando o catálogo, as dependências vazias e o esquema definido de `TICKET_SET`. Este ticket publica o workflow e migra `to-tickets` para `implemented`. O ADR `0001` continua restrito ao conjunto de decisões. A observação agent-driven do comportamento fica no ticket 02.

## Scope

- Criar a regressão estrutural em RED para a migração de `to-tickets` na asserção de catálogo já existente.
- Alterar o status de `to-tickets` para `implemented` no manifest, no contrato e na fonte.
- Substituir o placeholder por workflow operacional idêntico nas duas fontes.
- Gravar somente conjunto `ready` no diretório de tickets já configurado, com o template existente, um arquivo por objetivo e um bloco completo por ticket.
- Atualizar o mesmo arquivo e incrementar `version` numa execução posterior do mesmo objetivo.
- Devolver o relatório `BLOCKED` contratado, sem arquivo, quando o gate não passa.
- Preservar esquema, template, dependências vazias e a ausência de layout em diretório para a escrita da skill.
- Atualizar a frase normativa de lifecycle para seis skills implementadas.

## Out of Scope

- Executar `domain-modelling`, `architecture-design`, `research`, `implement` ou outra skill scaffold.
- Estender o ADR `0001`, gravar conjunto `draft` ou `blocked`, ou alterar código de aplicação.
- Criar executor JavaScript, arquivo de teste novo, comando CLI, dependência, schema ou template.
- Alterar routing, sequências canônicas, catálogo, targets ou outras skills.
- Reformatar conjuntos históricos que já usam diretório.
- Executar a matriz semântica e reconciliar a documentação de fechamento, reservadas ao ticket 02.

## Dependencies

Nenhuma. Pode iniciar imediatamente.

## Implementation Notes

Começar pela regressão do catálogo. A fonte e o contrato devem expressar o mesmo comportamento. A única escrita da skill é o conjunto `ready`. Recomendação de `to-spec`, `clarify`, `domain-modelling`, `architecture-design` ou `research` não é composição. O bloqueio mais cedo segue a ordem da spec: spec ausente ou não pronta, problema de decisão, modelo de domínio, desenho de arquitetura, fato externo. Modelo ou desenho ausente não bloqueia quando R8 ou R9 não se aplica. A frase de lifecycle entra neste ticket para o manifest, o contrato e a fonte permanecerem coerentes. A execução de `to-tickets` não grava o glossário.

## Acceptance Criteria

- [x] A regressão falha antes da migração pelo motivo esperado.
- [x] `to-tickets` está `implemented` no manifest, no contrato e na fonte.
- [x] O catálogo contém exatamente 6 skills `implemented` e 12 `scaffold`.
- [x] As dependências de `to-tickets` permanecem vazias.
- [x] Contrato e fonte possuem workflow operacional não vazio e sem linguagem de indisponibilidade.
- [ ] Spec `ready`, sem R8 nem R9, produz um conjunto `ready`, com o template existente, um bloco completo por ticket e o gate de ticket satisfeito. Modelo e desenho ausentes não bloqueiam.
- [ ] Modelo ou desenho `ready` entra como evidência e não amplia a spec. Recomendação não adotada pela spec não vira requisito de ticket.
- [ ] O mesmo objetivo atualiza o mesmo arquivo, incrementa `version` e não cria duplicata. Conjunto histórico em diretório não é reformatado.
- [ ] Spec ausente, `draft`, `blocked` ou `superseded` produz `BLOCKED`, recomenda `to-spec` e não grava conjunto.
- [ ] Artefato opcional presente e não `ready`, ou exigido por R8 ou R9 e ausente, produz `BLOCKED` e recomenda o produtor correspondente.
- [ ] Premissa não vira ticket. Ambiguidade material e conflito com decisão existente produzem `BLOCKED` e recomendam `clarify`.
- [ ] Fato externo que ainda altera os tickets produz `BLOCKED` e recomenda `research`, sem acesso à rede.
- [ ] O relatório bloqueado traz os cinco campos contratados, nomeia cada pré-requisito ausente e recomenda a skill do bloqueio mais cedo. Não deixa arquivo.
- [ ] A skill informa se `implement` está autorizado e não o invoca. Conjunto `ready` autoriza somente `implement`.
- [ ] Segredo não é copiado. O arquivo gravado não conserva marcador de rascunho do template.
- [x] Nenhuma dependência, schema, template, target, CLI, regra de routing ou extensão do ADR `0001` é introduzida.

## Validation

- RED: `node --test --test-name-pattern='current catalogue implements to-tickets' tests/validate-skills.test.mjs` falhou porque o catálogo observado era `setup-ai-development-skills`, `workflow`, `clarify`, `context-engineering`, `to-spec`.
- GREEN focado: o mesmo comando passou após a migração. O workflow do contrato e o da fonte são idênticos.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs.
- `npm run validate` e `npm run skills:validate`: PASS.
- `git diff --check`: PASS.
- Ambiente: macOS 26.6.2 (Darwin 25.6.0), Node.js v26.5.0, npm 11.17.0.
- A observação agent-driven dos critérios de comportamento permanece aberta no ticket 02. Esses critérios estão especificados no workflow e não foram marcados como observados.

## Definition of Done

- [x] Os critérios estruturais possuem evidência da suíte.
- [ ] Os critérios de comportamento aguardam a matriz do ticket 02.
- [x] Suíte e validação passam com código zero.
- [x] O ticket 02 está desbloqueado para essa matriz.
- [x] Nenhuma mudança fora do escopo foi incluída.

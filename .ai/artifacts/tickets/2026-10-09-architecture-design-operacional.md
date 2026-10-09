---
artifact: ticket_set
id: TICKET-SET-20261009-003
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261009-003
---

# architecture-design operacional — emenda v1-A9

Conjunto executável derivado de `SPEC-20261009-003`. Cada bloco abaixo é um registro TICKET com as seções exigidas pelo contrato. R8 e R9 não se aplicam a esta spec: a emenda operacionaliza uma skill e não muda o domínio de um produto consumidor nem uma fronteira de arquitetura do pacote. Evidência: a própria spec e o precedente de `SPEC-20261009-002`.

Triagem local: `ready-for-agent`. Publicação remota pendente: `gh` não está no PATH. O Markdown local é a fonte de verdade até reconciliação com GitHub Issues, sem criação de duplicatas.

## Title

01 — Operacionalizar architecture-design

## Goal

Implementar a skill `architecture-design` para gravar um desenho `ready` quando o gate passa, gravar um ADR `ready` somente quando a spec já registra a decisão durável, e devolver o relatório `BLOCKED` quando o contexto, a spec, a decisão, o fato externo, o modelo ou a ausência de R9 impedem essa gravação.

## Context

`SPEC-20261009-003` define a emenda v1-A9. `DECISION-SET-20261009-002` confirma um único seam de comportamento, com a suíte Node acompanhando o catálogo, as dependências condicionais existentes e os esquemas definidos de `ARCHITECTURE_DESIGN` e `ADR`. Este ticket publica o workflow e migra `architecture-design` para `implemented`. O ADR `0001` continua restrito ao conjunto de decisões. A observação agent-driven do comportamento fica no ticket 02. Evidência: `SPEC-20261009-003`, requisitos 1–11 e critérios 1–15.

## Scope

- Criar a regressão estrutural em RED para a migração de `architecture-design` na asserção de catálogo já existente.
- Alterar o status de `architecture-design` para `implemented` no manifest, no contrato e na fonte.
- Substituir o placeholder por workflow operacional idêntico nas duas fontes.
- Gravar somente desenho `ready` no diretório `.ai/artifacts/architecture/`, com o template existente e um arquivo por objetivo.
- Gravar ADR `ready` em `.ai/decisions/` somente quando a spec já registra a decisão durável. Não modificar o ADR `0001`. Não apagar ADR.
- Atualizar o mesmo arquivo e incrementar `version` numa execução posterior do mesmo objetivo.
- Devolver o relatório `BLOCKED` contratado, sem arquivo desta tentativa, quando o gate não passa.
- Preservar esquema, templates e as dependências condicionais já declaradas.
- Atualizar a frase normativa de lifecycle para oito skills implementadas.

## Out of Scope

- Executar `research`, `implement` ou outra skill scaffold.
- Estender o ADR `0001`, gravar desenho `draft` ou `blocked`, ou alterar código de aplicação.
- Criar executor JavaScript, arquivo de teste novo, comando CLI, dependência, schema ou template.
- Alterar routing, sequências canônicas, catálogo de nomes, targets ou outras skills.
- Executar a matriz semântica e reconciliar a documentação de fechamento, reservadas ao ticket 02.
- Gravar o glossário como saída da skill.

## Dependencies

Nenhuma. Pode iniciar imediatamente.

## Implementation Notes

Começar pela regressão do catálogo. A fonte e o contrato devem expressar o mesmo comportamento. As escritas da skill são o desenho `ready` e, somente com decisão durável já na spec, o ADR `ready`. Recomendação de `context-engineering`, `to-spec`, `clarify`, `research`, `domain-modelling` ou `to-tickets` não é composição. O bloqueio mais cedo segue a ordem da spec: contexto ausente, problema de spec, problema de decisão, fato externo ou pesquisa não pronta, modelo exigido ou presente e não pronto, mudança que não justifica desenho. As dependências condicionais já declaradas permanecem. A frase de lifecycle entra neste ticket para o manifest, o contrato e a fonte permanecerem coerentes. Evidência: `SPEC-20261009-003`, requisitos 2–11 e Testing Decisions.

## Acceptance Criteria

- [x] A regressão falha antes da migração pelo motivo esperado.
- [x] `architecture-design` está `implemented` no manifest, no contrato e na fonte.
- [x] O catálogo contém exatamente 8 skills `implemented` e 10 `scaffold`.
- [x] As dependências condicionais de `architecture-design` permanecem as já declaradas.
- [x] Contrato e fonte possuem workflow operacional não vazio, idêntico, e sem linguagem de indisponibilidade.
- [x] Spec `ready` que justifica R9 e não traz decisão durável produz um desenho `ready`, com o template existente e as treze seções obrigatórias, e não produz ADR.
- [x] Spec `ready` com decisão durável produz o desenho e um ADR `ready`, sem modificar o ADR `0001`.
- [x] O mesmo objetivo atualiza o mesmo arquivo e incrementa `version`.
- [x] Contexto ausente produz `BLOCKED`, recomenda `context-engineering` e não grava arquivo.
- [x] Spec ausente ou não `ready` produz `BLOCKED` e recomenda `to-spec`.
- [x] Mudança sem justificativa de R9 produz `BLOCKED`, nenhum arquivo e nenhuma fronteira inventada.
- [x] Modelo exigido ausente, ou modelo presente que não está `ready`, produz `BLOCKED` e recomenda `domain-modelling`. Recomendação não adotada fica fora do desenho.
- [x] Premissa não vira elemento do desenho. Ambiguidade material e conflito com decisão existente produzem `BLOCKED` e recomendam `clarify`.
- [x] Fato externo que ainda altera o desenho, ou pesquisa presente que não está `ready`, produz `BLOCKED` e recomenda `research`, sem acesso à rede.
- [x] O relatório bloqueado traz os cinco campos contratados, nomeia cada pré-requisito ausente e recomenda a skill do bloqueio mais cedo. Não deixa arquivo desta tentativa.
- [x] A skill informa se `to-tickets` está autorizado e não o invoca. Desenho `ready` autoriza somente `to-tickets`.
- [x] Segredo não é copiado. O arquivo gravado não conserva marcador de rascunho do template.
- [x] Nenhuma dependência, schema, template, target, CLI, regra de routing ou extensão do ADR `0001` é introduzida.

## Validation

- RED: `node --test --test-name-pattern='current catalogue implements architecture-design' tests/validate-skills.test.mjs` falhou porque o catálogo observado era `setup-ai-development-skills`, `workflow`, `clarify`, `context-engineering`, `to-spec`, `domain-modelling`, `to-tickets`.
- GREEN focado: o mesmo comando passou após a migração. O workflow do contrato e o da fonte são idênticos.
- `npm run validate`: PASS, 18 skills.

## Definition of Done

- [x] Critérios de aceitação marcados.
- [x] `npm run validate` e o teste focado de catálogo com código de saída zero.
- [x] Workflow idêntico no contrato e na fonte.

## Title

02 — Validar e fechar v1-A9

## Goal

Comprovar o comportamento de `architecture-design` nos cenários de desenho pronto, ADR opcional, atualização, R9 não aplicável, bloqueio e sigilo, reconciliar a documentação e fechar a emenda v1-A9.

## Context

O ticket 01 torna o workflow operacional. `SPEC-20261009-003` exige evidência semântica separada da suíte Node e documentação coerente com oito skills implementadas. Os quatro targets e as outras dez skills scaffold permanecem fora deste fechamento. Evidência: `SPEC-20261009-003`, critérios 16–19.

## Scope

- Aplicar o contrato e a fonte publicados a dezoito cenários isolados.
- Registrar a matriz e os resultados observados fora da suíte Node.
- Reconciliar proveniência, README, estado de arquitetura, padrões, estado do projeto, frase de lifecycle, evidência de validação e handoff.
- Executar `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check`.
- Registrar o review final de Standards e Spec.

## Out of Scope

- Implementar outra skill scaffold.
- Criar executor, arquivo de teste Node novo, dependência, schema, template, target ou comando CLI.
- Certificar Node.js 22, Linux ou descoberta real nos quatro produtos.
- Publicar issue remota ou enviar a branch.

## Dependencies

Ticket 01 concluído.

## Implementation Notes

Os cenários aplicam a skill; não a reimplementam. Desenho `ready` e ADR `ready` são os únicos arquivos gravados nos caminhos que passam. O caminho bloqueado não deixa arquivo desta tentativa. A documentação declara oito skills implementadas e dez scaffold, sem capability não verificada. Evidência: `SPEC-20261009-003`, critérios 16–19.

## Acceptance Criteria

- [x] A matriz agent-driven cobre os dezoito cenários da spec e fica separada da suíte Node.
- [x] Nenhum cenário invoca `to-tickets`, `research`, `domain-modelling` ou `implement`.
- [x] A documentação declara oito skills `implemented` e dez `scaffold`, sem capability não verificada.
- [x] `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
- [x] O review final não contém achado bloqueante de Standards ou Spec.

## Validation

- Matriz agent-driven: 18/18, em `TEST-20261009-003`. Nenhum cenário invocou `to-tickets`, `research`, `domain-modelling` ou `implement`.
- `npm run validate` e `npm run skills:validate`: PASS, 18 skills; 8 `implemented` e 10 `scaffold`.
- `npm test`: PASS, 48/48, sem falhas, skips ou TODOs.
- `git diff --check`: PASS.
- Review: `REVIEW-20261009-003`, PASS.

## Definition of Done

- [x] Evidência `TEST-20261009-003` registrada.
- [x] Review `REVIEW-20261009-003` com veredito PASS.
- [x] Handoff de sessão e estado do projeto atualizados. Frontier de `SPEC-20261009-003` vazia.

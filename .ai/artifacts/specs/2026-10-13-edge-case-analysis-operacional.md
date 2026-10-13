---
artifact: spec
id: SPEC-20261013-005
version: 2
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261013-005
  - HANDOFF-20261006-001
  - HANDOFF-20261013-003
  - SPEC-20261013-003
  - CONTEXT.md
  - ADR-0001
---

# edge-case-analysis operacional — emenda v1-A16

## Problem

A skill `edge-case-analysis` existe apenas como scaffold. O contrato, o template de `EDGE_CASE_REPORT`, a regra R12 e a seção 7.10 já definem o objetivo e os campos de cada achado, mas a skill não tem instruções operacionais para gravar o relatório `ready` e parar sem invocar a skill seguinte. `implement` já está fechada e continua sem executá-la.

## Goal

Tornar `edge-case-analysis` operacional na emenda v1-A16. Quando invocada, a skill identifica cenários de fronteira ou adversariais ainda sem teste, grava um `EDGE_CASE_REPORT` `ready` e devolve `BLOCKED` sem arquivo desta tentativa quando o insumo não autoriza o relatório.

## Scope

- Implementar o workflow de `edge-case-analysis` no contrato e na fonte, com o mesmo texto operacional nos dois lugares. Evidência: `DECISION-SET-20261013-005` e a regra de status `implemented` em `contracts/skill-contract.md`.
- Migrar `edge-case-analysis` de `scaffold` para `implemented` no manifest, no contrato e na fonte.
- Consumir a spec, a mudança citada como `working tree`, o modelo de domínio quando existir e os testes existentes. Gravar um único relatório `ready` por objetivo em `.ai/artifacts/quality/`, com o template existente e `created_by: edge-case-analysis`.
- Em cada achado, informar comportamento esperado, cobertura existente e cobertura ausente. O teste recomendado permanece no comportamento já especificado. Proposta que alargaria o produto fica fora de Recommended Test.
- Uma execução posterior do mesmo objetivo atualiza o mesmo arquivo e incrementa `version`.
- O caminho bloqueado devolve o relatório `BLOCKED` contratado, sem arquivo desta tentativa e sem apagar relatório existente.
- Um relatório `ready` não autoriza `implement` a mudar comportamento. Risco de R12 autoriza `code-review` sem invocá-lo. Ausência evidenciada de risco de R12 informa que `code-review` pode ser omitido.
- Manter o ADR `0001` restrito ao conjunto de decisões e sem modificação. Não reabrir `SPEC-20261013-003`.
- Preservar as listas de dependência vazias de `edge-case-analysis` e a dependência opcional já declarada em `implement`.
- Estender a regressão estrutural de catálogo já existente e executar os cenários por agente, separados da suíte Node.
- Registrar a mudança como emenda v1-A16 e reconciliar a documentação que declara a contagem de skills.

## Non-goals

- Criar executor JavaScript, redator automático ou nova dependência npm.
- Criar arquivo de teste novo. A suíte Node só acompanha o catálogo, as listas de dependência vazias e o esquema já definido de `EDGE_CASE_REPORT`.
- Alterar o esquema, o template, as seções de cada achado ou o produtor já declarado de `EDGE_CASE_REPORT`.
- Acrescentar chave de caminho em `.ai/config.json`. O diretório usado é o layout já recomendado, `quality/`.
- Alterar R1–R17, sequências canônicas ou as dependências do manifest.
- Fazer `implement` passar a invocar `edge-case-analysis`.
- Estender ou modificar o ADR `0001`. Reabrir `SPEC-20261013-003`.
- Gravar relatório `draft`, `blocked` ou parcial.
- Apagar relatório existente.
- Gravar o teste proposto ou alterar código de produto.
- Invocar `tdd`, `code-review`, `implement`, `to-spec`, `domain-modelling`, `clarify` ou qualquer outra skill a partir de `edge-case-analysis`.
- Alterar `research`, fechada na v1-A14, ou `refactor`, fechada na v1-A15. Implementar `docs`, `modernize` ou qualquer outra skill scaffold.
- Adicionar comando CLI ou target.
- Certificar execução real em Cursor, Codex, Gemini Antigravity ou Claude Code.

## Actors

- Solicitante que invoca `edge-case-analysis`.
- Agente de IA que executa a skill invocada.
- Spec, mudança no working tree, modelo de domínio quando existir e testes existentes.

## Functional Requirements

1. `edge-case-analysis`, quando invocada, lê o objetivo, a spec, a mudança citada como `working tree`, o modelo presente e os testes existentes, e não copia valor secreto. Evidência: `DECISION-SET-20261013-005`.
2. Quando o gate passa, a skill grava um relatório `ready` em `.ai/artifacts/quality/`, com o template existente, `created_by: edge-case-analysis`, as sete seções de cada achado preenchidas e os identificadores consumidos em `inputs`. O arquivo não conserva marcador de rascunho. Achados repetem as sete seções. Evidência: `DECISION-SET-20261013-005` e a seção 7.10.
3. Comportamento esperado vem da spec `ready` e, quando a spec usa o modelo, do modelo `ready`. Cobertura existente cita o teste observado ou a ausência observada. Evidência: o contrato de `edge-case-analysis`.
4. Teste recomendado não alarga o produto. Proposta fora do comportamento já especificado fica registrada como não autorizada e não entra em Recommended Test. A skill não grava o teste. Evidência: `DECISION-SET-20261013-005`.
5. Spec ausente ou que não está `ready` produz `BLOCKED`, recomenda `to-spec` e não grava arquivo. Evidência: R7 e o seam do produtor do insumo ausente.
6. Mudança ausente produz `BLOCKED`, recomenda `implement`, não grava arquivo de change set e não grava relatório. Evidência: `CHANGE_SET` named-only.
7. Modelo presente que não está `ready` produz `BLOCKED` e recomenda `domain-modelling`. Modelo ausente não bloqueia. Evidência: o insumo opcional já declarado.
8. Testes não observados produzem `BLOCKED` e recomendam ler os testes existentes. Ausência observada de testes não bloqueia. Evidência: o insumo `existing tests`.
9. Conflito entre spec e modelo `ready`, ou conflito com decisão existente, inclusive o ADR `0001`, produz `BLOCKED`, recomenda `clarify`, preserva a decisão e não grava arquivo. Evidência: `DECISION-SET-20261013-005` e o ADR `0001`.
10. Mudança que não expõe risco de R12 produz relatório `ready` com ausência evidenciada. Missing Coverage e Recommended Test ficam `none`. A skill não inventa risco. Evidência: R12.
11. A execução seguinte do mesmo objetivo, com insumos iguais, atualiza o mesmo arquivo e incrementa `version`. Insumos alterados atualizam o mesmo arquivo e preservam o objetivo. Evidência: o seam de atualização no lugar.
12. `edge-case-analysis` não invoca outra skill e não grava spec, modelo, ADR, glossário, `CONTEXT.md`, teste ou código de produto. Evidência: `DECISION-SET-20261013-005`.
13. O catálogo final contém exatamente dezesseis skills `implemented` e duas `scaffold`. `edge-case-analysis` junta-se às quinze já implementadas, inclusive `refactor` da v1-A15. As listas de dependência de `edge-case-analysis` permanecem vazias. A dependência opcional de `implement` permanece. Evidência: `DECISION-SET-20261013-005`.

## Business Rules

- R12 permanece a rota por risco. Esta emenda não altera o texto de R12.
- Comportamento esperado, cobertura existente, cobertura ausente e teste recomendado permanecem distintos. Proposta que alarga o produto não é teste recomendado.
- Decisão existente prevalece. Conflito com o ADR `0001` bloqueia e preserva o ADR.
- Artefato que não está `ready` não autoriza a etapa que o exige. Relatório `ready` não autoriza mudança de comportamento do produto.
- `EDGE_CASE_REPORT` continua com esquema definido e o mesmo template. `CHANGE_SET` continua named-only.
- O ADR `0001` continua valendo apenas para a persistência de conjunto de decisões `ready` e `blocked`.
- Recomendar `to-spec`, `implement`, `domain-modelling`, `clarify`, `code-review` ou `tdd` não cria dependência nem executa a skill.
- Esta emenda operacionaliza uma skill do pacote. Ela não exige `DOMAIN_MODEL` nem `ARCHITECTURE_DESIGN` como produto desta mudança, no mesmo precedente de `SPEC-20261013-003`.

## Non-functional Requirements

- Determinismo: os mesmos insumos produzem as mesmas seções materiais. A `version` muda numa execução posterior.
- Auditabilidade: cada bloqueio cita o insumo usado. O frontmatter lista os identificadores consumidos.
- Portabilidade: a fonte permanece independente de ferramenta e sistema operacional.
- Segurança: o relatório não reproduz segredo.
- Compatibilidade: preservar Node.js >=22, zero dependências npm, 18 skills e quatro targets.

## Technical Constraints

- Alterar somente o necessário para operacionalizar `edge-case-analysis` e registrar a emenda v1-A16.
- Não alterar o contrato de routing, o contrato de artefatos, as sequências canônicas nem o template de edge-case report.
- Não alterar o workflow operacional das skills já fechadas, inclusive `implement`.
- Não criar runtime nem executor da skill.
- A única escrita própria de `edge-case-analysis` é o relatório `ready`.
- A regressão determinística estende a asserção de catálogo já existente. Não há arquivo de teste novo.
- Manter LF e CRLF aceitos pelo validador.
- O texto da seção Workflow do contrato e o da fonte são o mesmo.

## Security / Privacy

- Não incluir tokens, credenciais, connection strings nem valores de arquivos de ambiente no relatório.
- Referenciar apenas a existência e o efeito de evidências potencialmente sensíveis.
- Os cenários desta emenda não acessam a rede.

## Acceptance Criteria

1. `edge-case-analysis` está `implemented` de forma consistente no manifest, no contrato e na fonte. O catálogo contém 16 skills `implemented` e 2 `scaffold`. As listas de dependência da skill permanecem vazias. `EDGE_CASE_REPORT` permanece com esquema `defined` e o template existente. A dependência opcional de `implement` permanece. `refactor` permanece `implemented` como v1-A15.
2. Invocação com spec `ready`, mudança que expõe entrada externa e lacuna observada produz relatório `ready` com `created_by: edge-case-analysis`, as sete seções repetidas por achado e teste recomendado dentro da spec. Nenhum arquivo de teste é gravado. `code-review` fica indicado e não é invocado. `implement` não fica autorizado a mudar comportamento.
3. A execução seguinte do mesmo objetivo, com insumos iguais, atualiza o mesmo arquivo, incrementa `version` e preserva as seções materiais.
4. O mesmo objetivo, com a cobertura alterada, atualiza o mesmo arquivo a partir da versão 1 e registra a cobertura nova.
5. Mudança sem risco de R12 produz relatório `ready` com ausência evidenciada, Missing Coverage `none`, Recommended Test `none`, e informa que `code-review` pode ser omitido. `implement` não fica autorizado.
6. Spec ausente produz `BLOCKED`, recomenda `to-spec` e não grava arquivo.
7. Spec que não está `ready` produz `BLOCKED`, recomenda `to-spec`, não autoriza implementação e não grava arquivo.
8. Mudança ausente produz `BLOCKED`, recomenda `implement` e não grava relatório nem arquivo de change set.
9. Modelo presente que não está `ready` produz `BLOCKED`, recomenda `domain-modelling` e não grava arquivo.
10. Modelo ausente não bloqueia. O relatório `ready` sai da spec e da mudança.
11. Modelo `ready` usado pela spec fornece o comportamento esperado e é citado.
12. Testes não observados produzem `BLOCKED`, recomendam ler os testes existentes e não gravam arquivo.
13. Repositório sem testes produz relatório `ready`. A cobertura existente é a ausência observada. O teste recomendado permanece na spec.
14. Conflito com o ADR `0001` produz `BLOCKED`, recomenda `clarify`, preserva o ADR e não grava relatório.
15. Proposta que alargaria o produto não entra em Recommended Test. O relatório `ready` não grava teste e não autoriza implementação dessa proposta.
16. Vários bloqueios saem num único relatório. O mais cedo é `to-spec` quando a spec falta. Todos os pré-requisitos ausentes são nomeados.
17. Valor secreto citado no insumo não aparece no relatório.
18. O caminho pronto não grava spec, modelo, ADR, glossário, `CONTEXT.md`, teste nem código de produto.
19. Uma execução posterior bloqueada não apaga o relatório existente e não grava arquivo desta tentativa.
20. Esquema, template, R1–R17, dependências, targets, CLI e as outras skills permanecem inalterados. O ADR `0001` não é estendido. Nenhuma chave nova entra em `.ai/config.json`. O workflow de `implement` não passa a invocar esta skill.
21. A regressão determinística cobre a migração 15/3, as listas de dependência vazias e a preservação de `EDGE_CASE_REPORT` como esquema definido. Nenhum arquivo de teste novo é adicionado.
22. Os cenários de achado, ausência, atualização, bloqueio, proposta não autorizada e sigilo ficam em evidência separada dos testes Node.
23. `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
24. Proveniência, README, estado arquitetural, padrões, estado do projeto, frase de lifecycle, evidências e handoff refletem a v1-A16 sem declarar capacidades não verificadas.

## Risks

- Deixar um relatório `ready` pode ser lido como autorização para mudar o produto. O passo final distingue relatório `ready` de autorização de `implement`.
- Propor um teste pode ser lido como gravação desse teste. A skill para no relatório.
- Não gravar o caminho bloqueado pode parecer perda de trabalho. O relatório `BLOCKED` e o insumo conservam a fronteira para a sessão seguinte.
- Testes estruturais podem ser confundidos com execução da skill. A evidência agent-driven fica registrada separadamente e não certifica os quatro produtos.

## Open Questions

Nenhuma questão bloqueante. Descoberta real nos quatro produtos e reconciliação com GitHub Issues continuam sem verificação e não alteram este recorte. Executor automático, arquivo de teste novo, alteração de esquema, extensão do ADR `0001` e implementação das outras duas skills scaffold permanecem fora deste recorte.

## Testing Decisions

- Um bom teste observa comportamento externo: insumos entram e relatório `ready` sai, ou o relatório `BLOCKED` sai sem arquivo desta tentativa. Não afirma redação interna da skill além do resultado observável.
- O teste determinístico, no seam de catálogo já existente, passa a exigir `edge-case-analysis` entre as skills `implemented`, dezesseis no total e duas `scaffold`, preserva as listas de dependência vazias e `EDGE_CASE_REPORT` com esquema `defined` e o template atual. Nenhum executor Node será criado. Nenhum arquivo de teste novo será criado.
- Os cenários conduzidos por agente aplicam o contrato e a fonte em diretório temporário e inspecionam o relatório, ou a ausência de arquivo junto com o relatório `BLOCKED`.
- O precedente é a asserção de catálogo da v1-A14 e a evidência separada da suíte Node naquela emenda.
- Asserções não serão relaxadas para acomodar a implementação.

## Further Notes

Esta spec satisfaz o gate de especificação: escopo delimitado, critérios verificáveis e nenhuma ambiguidade bloqueante. R8 e R9 não se aplicam. O conjunto de tickets é `TICKET-SET-20261013-005`. Os tickets 01 e 02 estão concluídos. A frontier desta spec está vazia. A versão 2 reemite o recorte como v1-A16 porque `origin/main` publicou `refactor` como v1-A15.

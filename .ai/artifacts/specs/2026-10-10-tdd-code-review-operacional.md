---
artifact: spec
id: SPEC-20261010-001
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261010-001
  - HANDOFF-20261009-006
  - HANDOFF-20261006-001
  - SPEC-20261009-004
  - CONTEXT.md
  - ADR-0001
---

# tdd e code-review operacionais — emenda v1-A11

## Problem

As skills `tdd` e `code-review` existem apenas como scaffold. O contrato de cada uma, os templates de evidência e de review, o gate de review e as regras R11 e R13 já definem o ciclo e o veredito, mas nenhuma das duas tem instruções operacionais para gravar o artefato `ready` e parar sem invocar a skill seguinte. `implement` já está fechada em `SPEC-20261009-004` e continua sem invocá-las.

## Goal

Tornar `tdd` e `code-review` operacionais na emenda v1-A11. `tdd`, quando invocada, executa RED, depois GREEN, depois REFACTOR, grava evidência `ready` própria e aplica mudança de teste no working tree. `code-review`, quando invocada, revisa a mudança citada como `working tree` e grava um relatório `ready` com veredito. As duas devolvem `BLOCKED` sem arquivo e sem mudança desta tentativa quando o gate não passa.

## Scope

- Implementar o workflow de `tdd` e o de `code-review` no contrato e na fonte de cada skill, com o mesmo texto operacional nos dois lugares. Evidência: `DECISION-SET-20261010-001` e a regra de status `implemented` em `contracts/skill-contract.md`.
- Migrar `tdd` e `code-review` de `scaffold` para `implemented` no manifest, no contrato e na fonte.
- `tdd` consome o objetivo invocado: critério de aceite, ticket ou spec, e os testes existentes quando houver. Executa RED, depois GREEN, depois REFACTOR. Quando o TDD foi pedido de forma explícita, demonstra o RED antes de qualquer mudança de implementação.
- `tdd` grava um único `TEST_EVIDENCE` `ready` por objetivo em `.ai/artifacts/tests/`, com o template existente e `created_by: tdd`. A mudança de teste fica no working tree. A evidência é um arquivo próprio e não reescreve evidência cujo `created_by` é `implement`.
- Mudança de implementação feita por `tdd` só ocorre quando `implement` compõe essa execução. Uma invocação direta não faz `implement` compor `tdd`.
- `code-review` revisa a mudança citada como `working tree`. Spec, ticket e evidência de teste permanecem opcionais. Grava um único `REVIEW_REPORT` `ready` por objetivo em `.ai/artifacts/reviews/`, com o template existente, `created_by: code-review` e um veredito `PASS`, `PASS_WITH_NOTES`, `CHANGES_REQUIRED` ou `BLOCKED`.
- Uma execução posterior do mesmo objetivo atualiza o mesmo arquivo daquela skill e incrementa `version`. Não apaga evidência nem relatório.
- O caminho bloqueado devolve o relatório `BLOCKED` contratado, sem arquivo e sem mudança desta tentativa.
- Manter o ADR `0001` restrito ao conjunto de decisões e sem modificação. Não reabrir `SPEC-20261009-004`.
- Preservar as listas de dependência vazias de `tdd` e de `code-review`, e as dependências opcionais já declaradas em `implement`.
- Estender a regressão estrutural de catálogo já existente e executar os cenários das duas skills por agente, separados da suíte Node.
- Registrar a mudança como emenda v1-A11 e reconciliar a documentação que declara a contagem de skills.

## Non-goals

- Criar executor JavaScript, redator automático ou nova dependência npm.
- Criar arquivo de teste novo. A suíte Node só acompanha o catálogo, as listas de dependência vazias, os esquemas já definidos de `TEST_EVIDENCE` e `REVIEW_REPORT`, e `CHANGE_SET` named-only.
- Alterar o esquema, os templates, as seções obrigatórias ou os produtores já declarados de `TEST_EVIDENCE` e `REVIEW_REPORT`.
- Acrescentar chave de caminho em `.ai/config.json`. Os diretórios usados são o layout já recomendado.
- Alterar R1–R17, sequências canônicas ou as dependências do manifest.
- Fazer `implement` invocar `tdd` ou `code-review`, ou reescrever evidência cujo `created_by` é `implement`.
- Estender ou modificar o ADR `0001`. Reabrir `SPEC-20261009-004`.
- Gravar evidência ou relatório `draft`, `blocked` ou parcial. Gravar arquivo de `CHANGE_SET`.
- Apagar evidência ou relatório existente.
- Invocar `implement`, `code-review`, `tdd`, `refactor`, `docs` ou qualquer outra skill a partir destas duas.
- Implementar `handoff`, `research`, `diagnose`, `refactor`, `edge-case-analysis`, `docs`, `modernize` ou qualquer outra skill scaffold.
- Adicionar comando CLI ou target.
- Certificar execução real em Cursor, Codex, Gemini Antigravity ou Claude Code.
- Produzir modelo de domínio ou desenho de arquitetura desta emenda.

## Actors

- Solicitante que invoca `tdd` ou `code-review`.
- Agente de IA que executa a skill invocada.
- Critério de aceite, ticket ou spec, e testes existentes, para `tdd`.
- Contexto do projeto e mudança no working tree, para `code-review`.
- Spec, ticket e evidência de teste, opcionais para `code-review`.

## Functional Requirements

1. `tdd`, quando invocada, lê o objetivo e não copia valor secreto; a evidência registra só existência e efeito. Executa RED, depois GREEN, depois REFACTOR. O passo REFACTOR permanece dentro de `tdd` e não invoca a skill `refactor`. Evidência: `DECISION-SET-20261010-001` e o contrato de `tdd`.
2. Quando o TDD foi pedido de forma explícita, o RED fica demonstrado na evidência antes de qualquer mudança de implementação. Evidência: `DECISION-SET-20261010-001`.
3. Quando o gate de `tdd` passa, a skill aplica a mudança de teste no working tree e grava uma evidência `ready` em `.ai/artifacts/tests/`, com o template existente, `created_by: tdd`, as seções obrigatórias preenchidas e os identificadores consumidos em `inputs`. O arquivo não conserva marcador de rascunho. A evidência não reescreve arquivo cujo `created_by` é `implement`. Mudança de implementação só entra no working tree quando `implement` compõe essa execução. Evidência: `DECISION-SET-20261010-001`.
4. Ausência de testes existentes não bloqueia `tdd`. O RED parte dessa ausência. Evidência: `DECISION-SET-20261010-001`.
5. Critério de aceite ausente, ou ticket ou spec ausente ou fora de `ready`, quando esse insumo é o que define o objetivo, produz `BLOCKED` e não grava arquivo nem aplica mudança desta tentativa. Ticket que define o objetivo recomenda `to-tickets`. Spec que define o objetivo recomenda `to-spec`. Evidência: `DECISION-SET-20261010-001` e o seam que recomenda o produtor do insumo ausente.
6. Uma execução posterior do mesmo objetivo de `tdd` atualiza o mesmo arquivo de evidência e incrementa `version`. Não cria duplicata e não apaga evidência. Insumos iguais preservam as seções materiais e não reaplicam a mudança. Evidência: `DECISION-SET-20261010-001` e o seam de atualização no lugar.
7. `tdd` não invoca `implement` nem `code-review`. Evidência: `DECISION-SET-20261010-001`.
8. `code-review`, quando invocada, lê o contexto do projeto e a mudança citada como `working tree`. Não grava arquivo de `CHANGE_SET` e não altera código. Spec, ticket e evidência de teste ausentes não bloqueiam. Evidência: `DECISION-SET-20261010-001`.
9. Quando o gate de `code-review` passa, a skill grava um relatório `ready` em `.ai/artifacts/reviews/`, com o template existente, `created_by: code-review`, as seções obrigatórias preenchidas e os identificadores consumidos em `inputs`. O arquivo não conserva marcador de rascunho. A seção `Verdict` é `PASS`, `PASS_WITH_NOTES`, `CHANGES_REQUIRED` ou `BLOCKED`. O status do arquivo permanece `ready`. Evidência: `DECISION-SET-20261010-001`.
10. Contexto do projeto ausente produz `BLOCKED`, recomenda `context-engineering`, não grava arquivo e não autoriza implementação. Mudança ausente produz `BLOCKED`, recomenda `implement`, não grava arquivo e não autoriza implementação. A skill não executa a recomendada. Evidência: `DECISION-SET-20261010-001` e o seam que recomenda o produtor do insumo ausente.
11. Uma execução posterior do mesmo objetivo de `code-review` atualiza o mesmo relatório e incrementa `version`. Não cria duplicata e não apaga relatório. Insumos iguais preservam as seções materiais. Evidência: `DECISION-SET-20261010-001` e o seam de atualização no lugar.
12. `code-review` não invoca `implement`, `tdd` nem `docs`. A ordem de prioridade já escrita no contrato de `code-review` permanece na revisão. Evidência: `DECISION-SET-20261010-001` e o contrato de `code-review`.
13. O contrato e a fonte de `implement` não passam a invocar `tdd` nem `code-review`. Evidência produzida por `implement` conserva `created_by: implement`. Evidência: `DECISION-SET-20261010-001` e `SPEC-20261009-004`.
14. O catálogo final contém exatamente onze skills `implemented` e sete `scaffold`. `tdd` e `code-review` juntam-se a `setup-ai-development-skills`, `context-engineering`, `workflow`, `clarify`, `to-spec`, `to-tickets`, `domain-modelling`, `architecture-design` e `implement`. As sete que permanecem `scaffold` são `handoff`, `research`, `diagnose`, `refactor`, `edge-case-analysis`, `docs` e `modernize`. As listas de dependência de `tdd` e de `code-review` permanecem vazias. Evidência: `DECISION-SET-20261010-001`.

## Business Rules

- R11 permanece SHOULD. `implement` registra quando `tdd` se aplica e não o invoca. A evidência desse registro continua produzida por `implement`.
- R13 permanece SHOULD. Mudança não trivial autoriza `code-review` sem que `implement` o invoque. Mudança trivial pode omiti-lo.
- `tdd` invocada executa o ciclo mesmo quando R11 não é o motivo da invocação. R11 não vira gate interno de `tdd`.
- Premissa, questão aberta, questão bloqueante e fato externo permanecem distintos.
- Decisão existente prevalece. Conflito com o ADR `0001` bloqueia e preserva o ADR.
- Artefato que não está `ready` não autoriza a etapa que o exige. Spec, ticket e evidência de teste continuam opcionais para `code-review`.
- `TEST_EVIDENCE` e `REVIEW_REPORT` continuam com esquema definido e os mesmos templates. `CHANGE_SET` continua named-only.
- O ADR `0001` continua valendo apenas para a persistência de conjunto de decisões `ready` e `blocked`.
- Recomendar `context-engineering`, `to-tickets`, `to-spec` ou `implement` não cria dependência nem executa a skill.
- Esta emenda operacionaliza duas skills do pacote. Ela não exige `DOMAIN_MODEL` nem `ARCHITECTURE_DESIGN`, no mesmo precedente de `SPEC-20261009-002`, `SPEC-20261009-003` e `SPEC-20261009-004`.

## Non-functional Requirements

- Determinismo: os mesmos insumos produzem as mesmas seções materiais. A `version` muda numa execução posterior.
- Auditabilidade: cada bloqueio cita o insumo usado. O frontmatter lista os identificadores consumidos.
- Portabilidade: a fonte permanece independente de ferramenta e sistema operacional.
- Segurança: evidência, relatório e mudança de teste não reproduzem segredo.
- Compatibilidade: preservar Node.js >=22, zero dependências npm, 18 skills e quatro targets.

## Technical Constraints

- Alterar somente o necessário para operacionalizar `tdd` e `code-review` e registrar a emenda v1-A11.
- Não alterar o contrato de routing, o contrato de artefatos, as sequências canônicas nem os templates de evidência e de review.
- Não alterar o workflow operacional de `implement`.
- Não criar runtime nem executor das skills.
- As únicas escritas próprias de `tdd` são a evidência `ready` e a mudança de teste no working tree, mais a mudança de implementação somente quando `implement` compõe a execução.
- A única escrita própria de `code-review` é o relatório `ready`. A mudança revista é o working tree citado, não um arquivo de `CHANGE_SET`.
- A regressão determinística estende a asserção de catálogo já existente. Não há arquivo de teste novo.
- Manter LF e CRLF aceitos pelo validador.
- O texto da seção Workflow de cada contrato e o da fonte correspondente são o mesmo.

## Security / Privacy

- Não incluir tokens, credenciais, connection strings nem valores de arquivos de ambiente na evidência, no relatório nem na mudança de teste.
- Referenciar apenas a existência e o efeito de evidências potencialmente sensíveis.
- Não executar ações externas. Nenhuma das duas skills acessa a rede.

## Acceptance Criteria

1. `tdd` e `code-review` estão `implemented` de forma consistente no manifest, no contrato e na fonte. O catálogo contém 11 skills `implemented` e 7 `scaffold`. As listas de dependência das duas skills permanecem vazias. As dependências opcionais de `implement` permanecem.
2. Invocação de `tdd` com critério de aceite ou ticket ou spec `ready`, sem testes existentes, produz evidência `ready` com `created_by: tdd`, registra RED, depois GREEN, depois REFACTOR, aplica a mudança de teste no working tree e não reescreve evidência cujo `created_by` é `implement`. Sem composição por `implement`, o working tree não recebe mudança de implementação desta tentativa.
3. Pedido explícito de TDD demonstra o RED na evidência antes de qualquer mudança de implementação.
4. A execução seguinte do mesmo objetivo de `tdd`, com insumos iguais, atualiza o mesmo arquivo, incrementa `version` e não reaplica a mudança.
5. O mesmo objetivo de `tdd`, com o insumo alterado, atualiza o mesmo arquivo a partir da versão 1 e aplica somente o acréscimo.
6. Objetivo de `tdd` sem critério de aceite e sem ticket ou spec que o defina produz `BLOCKED`, não grava arquivo e não aplica mudança. Ticket ausente ou fora de `ready` recomenda `to-tickets`. Spec ausente ou fora de `ready` recomenda `to-spec`.
7. `tdd` não invoca `implement`, `code-review` nem `refactor`.
8. Invocação de `code-review` com contexto do projeto e mudança no working tree, sem spec, sem ticket e sem evidência de teste, produz relatório `ready` com `created_by: code-review`, um dos quatro vereditos, nenhum arquivo de `CHANGE_SET` e nenhum diff de código desta tentativa.
9. A execução seguinte do mesmo objetivo de `code-review`, com insumos iguais, atualiza o mesmo arquivo e incrementa `version`.
10. Contexto do projeto ausente na review produz `BLOCKED`, recomenda `context-engineering` e não grava arquivo.
11. Mudança ausente na review produz `BLOCKED`, recomenda `implement`, não grava arquivo e não autoriza implementação.
12. `code-review` não invoca `implement`, `tdd` nem `docs`.
13. Valor secreto citado no insumo não aparece na evidência, no relatório nem na mudança de teste.
14. O workflow de `implement` permanece o de `SPEC-20261009-004`: quando R11 se aplica, o relatório de `implement` registra que `tdd` se aplica e não foi invocado; mudança não trivial autoriza `code-review` sem invocá-lo.
15. Conflito com o ADR `0001` produz `BLOCKED`, recomenda `clarify` e preserva o ADR.
16. Esquema, templates, R1–R17, dependências, targets, CLI e as outras skills permanecem inalterados. O ADR `0001` não é estendido. Nenhuma chave nova entra em `.ai/config.json`. `CHANGE_SET` permanece named-only.
17. A regressão determinística cobre a migração 11/7, as listas de dependência vazias de `tdd` e de `code-review`, a preservação de `TEST_EVIDENCE` e `REVIEW_REPORT` como esquemas definidos e a preservação de `CHANGE_SET` named-only. Nenhum arquivo de teste novo é adicionado.
18. Os cenários de ciclo, evidência própria, review concluída, atualização, bloqueio e sigilo ficam em evidência separada dos testes Node.
19. `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
20. Proveniência, README, estado arquitetural, padrões, estado do projeto, frase de lifecycle, evidências e handoff refletem a v1-A11 sem declarar capacidades não verificadas.

## Risks

- O ciclo RED, GREEN e REFACTOR e a regra de não mudar implementação fora de composição por `implement` podem ser lidos como passos incompatíveis. A evidência precisa mostrar a mudança de teste no caminho pronto e nenhuma mudança de implementação quando `implement` não compõe a execução.
- Não gravar o caminho bloqueado pode parecer perda de trabalho. O relatório `BLOCKED` e o insumo conservam a fronteira para a sessão seguinte.
- Um agente pode reescrever a evidência de `implement` ou gravar arquivo de `CHANGE_SET`. Os cenários precisam mostrar o arquivo de `tdd` separado e a review sem arquivo de change set.
- Testes estruturais podem ser confundidos com execução das skills. A evidência agent-driven fica registrada separadamente e não certifica os quatro produtos.
- Tratar a operacionalização como autorização para `implement` passar a invocar as duas skills reabriria `SPEC-20261009-004`. O contrato de `implement` permanece como está.

## Open Questions

Nenhuma questão bloqueante. Node.js 22, Linux, descoberta real nos quatro produtos e reconciliação com GitHub Issues continuam sem verificação e não alteram este recorte. Executor automático, arquivo de teste novo, alteração de esquema, extensão do ADR `0001` e implementação das outras sete skills scaffold permanecem fora deste recorte.

## Testing Decisions

- Um bom teste observa comportamento externo: insumos entram, evidência `ready` e mudança de teste saem de `tdd`, ou relatório `ready` sai de `code-review`, ou o relatório `BLOCKED` sai sem arquivo. Não afirma redação interna da skill além do resultado observável.
- O teste determinístico, no seam de catálogo já existente, passa a exigir `tdd` e `code-review` entre as skills `implemented`, onze no total e sete `scaffold`, preserva as listas de dependência vazias e preserva `TEST_EVIDENCE` e `REVIEW_REPORT` com esquema `defined` e os templates atuais, e `CHANGE_SET` com esquema `named-only`. Nenhum executor Node será criado. Nenhum arquivo de teste novo será criado.
- Os cenários conduzidos por agente aplicam o contrato e a fonte em diretório temporário e inspecionam a evidência, a mudança de teste, o relatório, ou a ausência de arquivo junto com o relatório `BLOCKED`. Cobrem ciclo, evidência própria, review concluída, atualização do mesmo arquivo, bloqueio e sigilo.
- O precedente é a asserção de catálogo da v1-A10 e a evidência separada da suíte Node naquela emenda.
- Asserções não serão relaxadas para acomodar a implementação.

## Further Notes

Esta spec satisfaz o gate de especificação: escopo delimitado, critérios verificáveis e nenhuma ambiguidade bloqueante. R8 e R9 não se aplicam. O consumidor canônico seguinte é `to-tickets`. Esta spec ainda não foi decomposta.

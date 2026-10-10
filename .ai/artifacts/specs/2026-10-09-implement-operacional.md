---
artifact: spec
id: SPEC-20261009-004
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261009-003
  - HANDOFF-20261009-005
  - HANDOFF-20261006-001
  - CONTEXT.md
  - ADR-0001
---

# implement operacional — emenda v1-A10

## Problem

A skill `implement` existe apenas como scaffold. O contrato de artefatos, os templates de relatório e de evidência, o gate de implementação e as regras R6, R11 e R13 já definem o que uma mudança precisa cumprir, mas a skill ainda não tem instruções operacionais para aplicar a menor mudança correta, gravar o relatório e parar sem inventar comportamento nem executar a skill seguinte.

## Goal

Tornar `implement` operacional para converter um objetivo delimitado e pronto, com contexto do projeto, em um relatório `ready` e uma evidência `ready`, ou devolver o relatório `BLOCKED` sem gravar arquivo e sem aplicar mudança quando o gate não puder passar.

## Scope

- Implementar o workflow de implementação no contrato e na fonte da skill, com o mesmo texto operacional nos dois lugares.
- Migrar `implement` de `scaffold` para `implemented` no manifest, no contrato e na fonte.
- Consumir o objetivo nomeado pelo solicitante: ticket `ready`, diagnóstico `ready` com causa confirmada, pedido explícito claro e delimitado, ou spec `ready` que nomeia uma única mudança delimitada.
- Aplicar a menor mudança correta no working tree. `CHANGE_SET` permanece nomeado e é citado como `working tree`.
- Gravar um único relatório `ready` por objetivo em `.ai/artifacts/implementation/` e uma única evidência `ready` em `.ai/artifacts/tests/`, reutilizando os templates e o frontmatter existentes.
- Atualizar os mesmos dois arquivos e incrementar `version` numa execução posterior do mesmo objetivo. Não apagar relatório nem evidência.
- Encerrar no resultado, informando caminhos, status, se o working tree mudou e se `code-review` está autorizado, sem invocá-lo.
- Devolver o relatório `BLOCKED` contratado, sem arquivo e sem mudança desta tentativa, quando o contexto faltar, quando o insumo definidor não estiver `ready`, quando restar decisão ou fato externo, quando a spec não for uma única mudança delimitada, ou quando o gate não puder passar sem invenção, edição alheia ou abstração especulativa.
- Manter o ADR `0001` restrito ao conjunto de decisões e sem modificação.
- Preservar as dependências opcionais já declaradas. Recomendação não acrescenta dependência nem executa a skill.
- Estender a regressão estrutural de catálogo já existente e executar os cenários da skill por agente, separados da suíte Node.
- Registrar a mudança como emenda v1-A10 e reconciliar a documentação que declara a contagem de skills.

## Non-goals

- Criar executor JavaScript, redator automático de mudança ou nova dependência npm.
- Criar arquivo de teste novo. A suíte Node só acompanha o catálogo, as dependências opcionais existentes, os esquemas já definidos de `IMPLEMENTATION_REPORT` e `TEST_EVIDENCE`, e `CHANGE_SET` named-only.
- Alterar o esquema, os templates, as seções obrigatórias ou o produtor de `IMPLEMENTATION_REPORT` e de `TEST_EVIDENCE`.
- Acrescentar chave de caminho em `.ai/config.json`. Os diretórios usados são o layout já recomendado.
- Alterar R1–R17, sequências canônicas, responsabilidades das outras skills ou as dependências do manifest.
- Acrescentar ou remover dependência obrigatória, condicional ou opcional. Recomendação não é composição.
- Estender ou modificar o ADR `0001`.
- Gravar relatório ou evidência `draft`, `blocked` ou parcial. Gravar arquivo de `CHANGE_SET`.
- Apagar relatório ou evidência existente.
- Implementar `tdd`, `diagnose`, `code-review` ou qualquer outra skill scaffold.
- Invocar a skill recomendada.
- Gravar `CONTEXT.md`, spec, desenho, conjunto de tickets ou glossário como saída de `implement`.
- Adicionar comando CLI ou target.
- Certificar execução real em Cursor, Codex, Gemini Antigravity ou Claude Code.
- Produzir o desenho de arquitetura ou o modelo de domínio desta emenda. A emenda operacionaliza uma skill e não muda o domínio nem a fronteira de arquitetura de um produto consumidor, no mesmo precedente de `SPEC-20261009-002` e `SPEC-20261009-003`.

## Actors

- Solicitante que já tem um objetivo delimitado e pronto e quer a mudança aplicada.
- Agente de IA que executa a skill `implement`.
- Ticket `ready`, spec `ready`, diagnóstico `ready` ou pedido explícito.
- Contexto do projeto.
- Consumidor posterior `code-review`, somente quando a mudança não é trivial.

## Functional Requirements

1. A skill lê o contexto do projeto e cada insumo definidor presente. Verbete de glossário não é pedido de mudança nem autoriza mudança. Valor secreto não é copiado; a evidência registra existência e efeito.
2. Contexto do projeto ausente produz o relatório `BLOCKED` e recomenda `context-engineering`. A skill não executa essa skill e não passa a declará-la como dependência.
3. A skill aplica mudança somente para o objetivo nomeado. Ticket `ready`, com escopo delimitado e critérios mensuráveis, é esse objetivo quando o solicitante nomeia o ticket; outro ticket do conjunto não é implementado. Diagnóstico `ready`, com causa confirmada e correção delimitada, é esse objetivo quando o solicitante nomeia o diagnóstico. Pedido explícito claro e delimitado dispensa spec. Spec `ready` autoriza implementação somente quando nomeia uma única mudança delimitada, com critérios testáveis.
4. Ticket nomeado ausente ou ticket presente que não está `ready` produz `BLOCKED` e recomenda `to-tickets`. Spec nomeada ausente, `draft`, `blocked` ou `superseded`, quando não há ticket `ready` nem pedido explícito claro e delimitado para o mesmo objetivo, produz `BLOCKED` e recomenda `to-spec`. Diagnóstico presente sem causa confirmada, ou falha de causa desconhecida, produz `BLOCKED` e recomenda `diagnose`, sem modificar código para descobrir a causa. Ausência de insumo definidor, ou pedido que não é claro ou não é delimitado, produz `BLOCKED` e recomenda `clarify`.
5. Relatório de pesquisa presente que não está `ready`, ou fato externo que ainda altera a mudança, produz `BLOCKED` e recomenda `research`, sem acesso à rede. Recomendação de pesquisa entra na mudança somente quando o insumo definidor já a adotou. A skill não executa a recomendada e não acrescenta dependência.
6. A skill não inventa comportamento, decisão nem correção. Ambiguidade material, premissa que ainda altera a mudança e conflito com decisão existente produzem `BLOCKED` e recomendam `clarify`. A decisão existente permanece. Premissa não vira comportamento. Alternativa rejeitada não reentra na mudança. A skill não reabre pergunta que o insumo, a evidência do repositório ou o contexto do projeto já responde. Seção obrigatória sem conteúdo no insumo registra a ausência e cita o insumo. A menor mudança correta exclui edição alheia e abstração especulativa.
7. Quando o gate passa, a skill aplica a menor mudança correta no working tree, não grava arquivo de `CHANGE_SET` e cita `working tree` no relatório. Grava um relatório `ready` em `.ai/artifacts/implementation/` e uma evidência `ready` em `.ai/artifacts/tests/`, com os templates existentes, `created_by: implement` e as seções obrigatórias preenchidas. O frontmatter lista os identificadores dos artefatos consumidos. Os arquivos não conservam marcador de rascunho do template. Quando já existe harness de teste, o teste relevante entra na menor mudança e o resultado é registrado. Quando não existe harness, a evidência registra a ausência e a validação é a checagem nomeada pelo insumo. Quando R11 se aplica, o relatório registra que `tdd` se aplica e não foi invocado.
8. Uma execução posterior do mesmo objetivo atualiza os mesmos dois arquivos e incrementa `version`. Não cria duplicata. Insumos iguais preservam as seções materiais e o conteúdo registrado, e não reaplicam a mudança. Insumos alterados aplicam somente o acréscimo mínimo. A skill não apaga relatório nem evidência. Se um teste relevante falha, a skill reverte a mudança desta tentativa e trata o gate como falho. Causa desconhecida recomenda `diagnose`.
9. Quando o gate não passa, a skill não grava relatório nem evidência `draft`, `blocked` ou parcial, e não aplica mudança desta tentativa. O relatório único traz `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` e `Recommended next skill/action`, e nomeia cada pré-requisito ausente. A skill recomendada é a do bloqueio mais cedo, nesta ordem: contexto do projeto ausente; diagnóstico sem causa confirmada ou falha desconhecida; problema de ticket; problema de spec; problema de decisão; fato externo ou pesquisa presente e não `ready`; spec `ready` que não é uma única mudança delimitada; mudança que não pode permanecer a menor.
10. A skill encerra no resultado. Informa os dois caminhos e o status quando houve gravação, se o working tree mudou e se `code-review` está autorizado. Mudança não trivial `ready` autoriza somente `code-review`. Mudança trivial, clara, local e de risco negligível, informa que `code-review` pode ser omitido e não autoriza outra skill. Quando R12 ou R14 se aplica, `edge-case-analysis` ou `docs` aparece em Remaining Work como aplicável e não invocado. A skill não invoca a recomendada.
11. O catálogo final contém exatamente nove skills `implemented` e nove `scaffold`. `implement` é a nona, ao lado de `setup-ai-development-skills`, `context-engineering`, `workflow`, `clarify`, `to-spec`, `domain-modelling`, `architecture-design` e `to-tickets`. As dependências opcionais existentes permanecem, sem itens obrigatórios nem condicionais novos.

## Business Rules

- R6 permanece: comportamento desejado claro e escopo delimitado autorizam `implement`. Spec é recomendada e não obrigatória para mudança trivial bem definida.
- R11 permanece SHOULD. A skill registra quando `tdd` se aplica e não o invoca. A evidência é produzida por `implement`.
- R13 permanece SHOULD. Mudança não trivial autoriza `code-review` sem invocá-lo. Mudança trivial pode omiti-lo.
- Premissa, questão aberta, questão bloqueante e fato externo permanecem distintos.
- Decisão existente prevalece até que uma nova decisão a substitua explicitamente. Conflito bloqueia a mudança.
- Artefato que não está `ready` não autoriza etapa posterior. Artefato presente que não está `ready` bloqueia quando é o insumo definidor ou uma pesquisa presente.
- `IMPLEMENTATION_REPORT` e `TEST_EVIDENCE` continuam com esquema definido e os mesmos templates. `CHANGE_SET` continua named-only.
- O ADR `0001` continua valendo apenas para a persistência de conjunto de decisões `ready` e `blocked`.
- Dependências opcionais permanecem as já declaradas. Recomendar `context-engineering`, `to-tickets`, `to-spec`, `diagnose`, `clarify`, `research`, `tdd`, `code-review`, `edge-case-analysis` ou `docs` não cria dependência nem executa a skill.
- Esta emenda é mudança de workflow de uma skill do pacote. Ela não é, por si, uma mudança de domínio ou de arquitetura de produto que exija `DOMAIN_MODEL` ou `ARCHITECTURE_DESIGN` antes da decomposição, no mesmo precedente de `SPEC-20261009-002` e `SPEC-20261009-003`.

## Non-functional Requirements

- Determinismo: os mesmos insumos produzem a mesma mudança material e as mesmas seções materiais. A `version` muda numa execução posterior.
- Auditabilidade: cada elemento do relatório e cada bloqueio cita o insumo usado.
- Portabilidade: a fonte permanece independente de ferramenta e sistema operacional.
- Segurança: o relatório, a evidência e a mudança não reproduzem segredo.
- Compatibilidade: preservar Node.js >=22, zero dependências npm, 18 skills e quatro targets.

## Technical Constraints

- Alterar somente o necessário para operacionalizar `implement` e registrar a emenda v1-A10.
- Não alterar o contrato de routing, o contrato de artefatos, as sequências canônicas nem os templates de relatório e de evidência.
- Não criar runtime de implementação nem executor da skill.
- As únicas escritas próprias de `implement` são o relatório `ready` e a evidência `ready`. A mudança de código é o working tree citado, não um arquivo de `CHANGE_SET`.
- A regressão determinística estende a asserção de catálogo já existente. Não há arquivo de teste novo.
- Manter LF e CRLF aceitos pelo validador.
- O texto da seção Workflow do contrato e o da fonte são o mesmo.

## Security / Privacy

- Não incluir tokens, credenciais, connection strings nem valores de arquivos de ambiente no relatório, na evidência nem na mudança.
- Referenciar apenas a existência e o efeito de evidências potencialmente sensíveis.
- Não executar ações externas. Recomendar `research` não acessa a rede.

## Acceptance Criteria

1. `implement` está `implemented` de forma consistente no manifest, no contrato e na fonte; o catálogo contém 9 skills `implemented` e 9 `scaffold`, e as dependências opcionais existentes permanecem.
2. Ticket `ready` delimitado, com contexto do projeto e risco de regressão, produz relatório `ready`, evidência `ready` com `created_by: implement`, a menor mudança no working tree e nenhum arquivo de `CHANGE_SET`. `tdd` não é invocado. `code-review` fica autorizado e não é invocado.
3. A execução seguinte do mesmo objetivo, com insumos iguais, atualiza os mesmos dois arquivos, incrementa `version` e não reaplica a mudança.
4. O mesmo objetivo, com o insumo alterado, atualiza os mesmos arquivos a partir da versão 1 e aplica somente o acréscimo.
5. Pedido explícito trivial, claro e local, sem spec, produz relatório `ready` e informa que `code-review` pode ser omitido.
6. Spec `ready` com mais de uma mudança independente, sem ticket, produz `BLOCKED`, recomenda `to-tickets` e não altera o working tree.
7. Contexto do projeto ausente produz `BLOCKED`, recomenda `context-engineering` e não grava arquivo.
8. Ticket que não está `ready` produz `BLOCKED` e recomenda `to-tickets`.
9. Spec que não está `ready`, sem outro insumo definidor, produz `BLOCKED` e recomenda `to-spec`.
10. Diagnóstico sem causa confirmada produz `BLOCKED`, recomenda `diagnose` e não modifica código.
11. Diagnóstico `ready` com causa confirmada e correção delimitada produz relatório `ready` e autoriza `code-review`.
12. Pedido que não é claro produz `BLOCKED` e recomenda `clarify`.
13. Fato externo que ainda altera a mudança produz `BLOCKED` e recomenda `research`, sem acesso à rede.
14. Valor secreto citado no insumo não aparece no relatório, na evidência nem na mudança.
15. Ticket que exige edição alheia produz `BLOCKED`, recomenda `to-tickets` e deixa os arquivos intocados.
16. Spec `ready` com uma única mudança delimitada, sem ticket, produz relatório `ready` e autoriza `code-review`.
17. Conflito com o ADR `0001` produz `BLOCKED`, recomenda `clarify` e preserva o ADR.
18. Pesquisa presente que não está `ready` produz `BLOCKED` e recomenda `research`.
19. Vários bloqueios cabem num único relatório, com a skill do bloqueio mais cedo. O caminho bloqueado não deixa arquivo nem mudança desta tentativa.
20. Esquema, templates, R1–R17, dependências, targets, CLI e as outras skills permanecem inalterados. O ADR `0001` não é estendido. Nenhuma chave nova entra em `.ai/config.json`. `CHANGE_SET` permanece named-only.
21. A regressão determinística cobre a migração 9/9, as dependências opcionais existentes, a preservação de `IMPLEMENTATION_REPORT` e `TEST_EVIDENCE` como esquemas definidos e a preservação de `CHANGE_SET` named-only. Nenhum arquivo de teste novo é adicionado.
22. Os cenários de mudança pronta, atualização, trivialidade, bloqueio e sigilo ficam em evidência separada dos testes Node.
23. `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
24. Proveniência, README, estado arquitetural, padrões, estado do projeto, frase de lifecycle, evidências e handoff refletem a v1-A10 sem declarar capacidades não verificadas.
25. Review final não contém achado bloqueante de Standards ou Spec.

## Risks

- Instruções em linguagem natural podem delimitar a menor mudança de modo diferente entre agentes. A citação do insumo e os cenários reduzem essa variação.
- Não gravar o caminho bloqueado pode parecer perda de trabalho. O relatório `BLOCKED` e o insumo conservam a fronteira para a sessão seguinte.
- Um agente pode ainda assim deixar mudança parcial ou gravar arquivo de `CHANGE_SET`. Os cenários precisam mostrar a mudança no caminho pronto e nenhum arquivo novo no caminho bloqueado.
- Testes estruturais podem ser confundidos com execução da skill. A evidência agent-driven fica registrada separadamente e não certifica os quatro produtos.
- Tratar R11 como invocação de `tdd` executaria uma skill scaffold. O registro de que `tdd` se aplica, sem invocação, preserva o SHOULD e o seam.

## Open Questions

Nenhuma questão bloqueante. Executor automático, arquivo de teste novo, alteração de esquema, extensão do ADR `0001` e implementação das outras skills scaffold permanecem fora deste recorte.

## Implementation Decisions

- A mudança será registrada como emenda v1-A10.
- `DECISION-SET-20261009-003` confirma o seam: um único seam de comportamento, a aplicação agent-driven da skill, com a suíte Node apenas acompanhando o catálogo, as dependências opcionais existentes, os esquemas definidos de `IMPLEMENTATION_REPORT` e `TEST_EVIDENCE`, e `CHANGE_SET` named-only.
- O relatório `ready` e a evidência `ready` são os artefatos persistidos em todo caminho que passa no gate. A mudança vive no working tree.
- O caminho bloqueado devolve o relatório contratado, não persiste arquivo e não aplica mudança desta tentativa.
- A implementação desta emenda foi decomposta em `TICKET-SET-20261009-004`. Os tickets 01 e 02 estão concluídos. A frontier desta spec está vazia.

## Testing Decisions

- Um bom teste observa comportamento externo: insumos entram, mudança e relatório `ready` ou relatório `BLOCKED` saem. Não afirma redação interna da skill além do resultado observável.
- O teste determinístico, no seam de catálogo já existente, passa a exigir `implement` entre as skills `implemented`, nove no total e nove `scaffold`, preserva as dependências opcionais e preserva `IMPLEMENTATION_REPORT` e `TEST_EVIDENCE` com esquema `defined` e os templates atuais, e `CHANGE_SET` com esquema `named-only`. Nenhum executor Node será criado para tornar as instruções executáveis. Nenhum arquivo de teste novo será criado.
- Os cenários conduzidos por agente aplicam o contrato e a fonte em diretório temporário e inspecionam o relatório gravado, a evidência, a mudança, ou a ausência de arquivo junto com o relatório. Cobrem mudança pronta, atualização do mesmo arquivo, pedido trivial, spec única, bloqueio e sigilo.
- O precedente é a asserção de catálogo da v1-A9 e a evidência separada da suíte Node naquela emenda.
- Asserções não serão relaxadas para acomodar a implementação.

## Further Notes

Esta spec satisfaz o gate de especificação: escopo delimitado, critérios verificáveis e nenhuma ambiguidade bloqueante. O conjunto de tickets é `TICKET-SET-20261009-004`. Os tickets 01 e 02 estão concluídos. A frontier desta spec está vazia.

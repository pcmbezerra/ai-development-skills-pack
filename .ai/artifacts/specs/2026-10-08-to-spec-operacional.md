---
artifact: spec
id: SPEC-20261008-003
version: 1
status: ready
created_by: to-spec
inputs:
  - HANDOFF-20261008-002
  - maintainer-confirmation-2026-10-08-to-spec-seam
  - CONTEXT.md
  - ADR-0001
---

# to-spec operacional — emenda v1-A6

## Problem

A skill `to-spec` existe apenas como scaffold. O contrato de artefatos, o template de `SPEC`, a regra R7 e o gate de especificação já definem o que a spec precisa conter para ficar pronta, mas a skill ainda não tem instruções operacionais para consumir um conjunto de decisões pronto, gravar a spec e parar sem inventar decisão nem executar a skill seguinte.

## Goal

Tornar `to-spec` operacional para converter um conjunto de decisões `ready` e o contexto do projeto em uma `SPEC` `ready`, ou devolver o relatório `BLOCKED` quando o gate de especificação não puder passar.

## Scope

- Implementar o workflow de especificação no contrato e na fonte da skill.
- Migrar `to-spec` de `scaffold` para `implemented` no manifest, no contrato e na fonte.
- Consumir conjunto de decisões `ready`, contexto do projeto e, quando existir e estiver `ready`, relatório de pesquisa.
- Gravar uma única `SPEC` `ready` por objetivo em `.ai/artifacts/specs/`, reutilizando o template e o frontmatter existentes.
- Atualizar o mesmo arquivo e incrementar `version` numa execução posterior do mesmo objetivo.
- Encerrar na spec, informando caminho, status, autorização do próximo passo pedido e a próxima skill recomendada, sem invocá-la.
- Devolver o relatório `BLOCKED` contratado, sem gravar spec, quando faltar pré-requisito ou restar ambiguidade material.
- Manter o ADR `0001` restrito ao conjunto de decisões.
- Atualizar a regressão estrutural do catálogo e executar os cenários da skill por agente, separados da suíte Node.
- Registrar a mudança como emenda v1-A6 e reconciliar a documentação que declara a contagem de skills.

## Non-goals

- Criar executor JavaScript, redator automático de spec ou nova dependência npm.
- Alterar o esquema, o template, as seções obrigatórias ou o produtor de `SPEC`.
- Alterar R1–R17, sequências canônicas, responsabilidades das outras skills ou dependências do manifest.
- Acrescentar `context-engineering` como dependência de `to-spec`.
- Estender o ADR `0001` para spec bloqueada, rascunho ou spec ausente.
- Gravar spec `draft`, `blocked` ou parcial.
- Implementar `to-tickets`, `domain-modelling`, `architecture-design`, `research`, `implement` ou qualquer outra skill scaffold.
- Invocar a skill recomendada.
- Gravar `CONTEXT.md`, ADR ou código da aplicação como saída de `to-spec`.
- Adicionar comando CLI ou target.
- Certificar execução real em Cursor, Codex, Gemini Antigravity ou Claude Code.
- Produzir o conjunto de tickets desta emenda. Isso fica para o passo seguinte, depois desta spec.

## Actors

- Solicitante que já tem um conjunto de decisões `ready` e quer uma spec.
- Agente de IA que executa a skill `to-spec`.
- Conjunto de decisões `ready` e decisões existentes em ADR, conjunto anterior e contexto do projeto.
- Contexto do projeto.
- Relatório de pesquisa `ready`, quando existir.
- Consumidor posterior cuja regra de routing já exige spec pronta.

## User Stories

1. Como solicitante com conjunto de decisões `ready` e contexto do projeto, quero receber uma `SPEC` `ready`, para que o próximo passo consuma escopo delimitado e critérios testáveis.
2. Como solicitante, quero as seções obrigatórias da spec preenchidas a partir do conjunto, do contexto e do relatório de pesquisa quando ele existir, para que o gate de especificação possa ser avaliado no artefato.
3. Como solicitante, quero o relatório de pesquisa `ready` incorporado quando existir, para que um fato externo já estabelecido não seja pedido de novo.
4. Como solicitante, quero fatos e recomendações do relatório mantidos distintos, para que uma recomendação só vire requisito quando uma decisão resolvida já a tiver adotado.
5. Como solicitante, quero uma questão aberta que não altera o próximo passo registrada na spec, com a spec ainda `ready`, para que incerteza irrelevante não impeça a especificação.
6. Como solicitante, quero a seção de questões abertas de uma spec `ready` declarando que não resta questão bloqueante, para que o gate fique visível no artefato.
7. Como solicitante, quero uma segunda execução do mesmo objetivo atualizando o mesmo arquivo e incrementando `version`, para que a rastreabilidade permaneça num único artefato.
8. Como solicitante, quero requisitos alterados somente quando o conjunto, o contexto ou o relatório consumido tiver mudado, para que requisito já sustentado pelos insumos não seja reescrito em silêncio.
9. Como solicitante, quero o frontmatter da spec citando os identificadores dos artefatos consumidos, para que a proveniência seja inspecionável.
10. Como solicitante, quero a skill encerrando na spec e informando caminho, status e se o próximo passo pedido está autorizado, para que eu decida a etapa seguinte.
11. Como solicitante, quero a próxima skill recomendada pelas regras R8, R9 e R10 já existentes, sem ser invocada, para que `to-spec` não execute `domain-modelling`, `architecture-design`, `to-tickets` nem `implement`.
12. Como solicitante que só pediu a spec, quero o relatório de que ela está `ready` e de qual consumidor posterior a sequência canônica indicaria, para que a recomendação não vire execução.
13. Como solicitante sem conjunto de decisões, quero o relatório `BLOCKED` recomendando `clarify`, para que a skill não invente as decisões ausentes.
14. Como solicitante com conjunto `draft`, `blocked` ou `superseded`, quero o relatório `BLOCKED` recomendando `clarify` e nenhum arquivo de spec, para que só um conjunto `ready` autorize a especificação.
15. Como solicitante, quero uma premissa permanecendo premissa e fora dos requisitos e dos critérios de aceitação, para que uma suposição não feche o gate.
16. Como solicitante, quero uma premissa que ainda altera a spec produzindo `BLOCKED` e a recomendação de `clarify`, para que a ambiguidade material volte ao conjunto de decisões.
17. Como solicitante, quero uma ambiguidade material descoberta durante a especificação produzindo `BLOCKED` e a recomendação de `clarify`, para que o agente não escolha no lugar do solicitante.
18. Como solicitante, quero um fato externo que ainda altera a spec produzindo `BLOCKED` e a recomendação de `research`, para que a spec não invente esse fato.
19. Como solicitante, quero um relatório de pesquisa ausente sem efeito quando o conjunto `ready` não depende de fato externo em aberto, para que o insumo opcional continue opcional.
20. Como solicitante, quero um relatório que não está `ready`, e cujas incógnitas ainda alteram a spec, produzindo `BLOCKED` e a recomendação de `research`, para que achado não verificado não vire requisito.
21. Como solicitante sem contexto do projeto, quero o relatório `BLOCKED` recomendando `context-engineering`, sem compor essa skill, para que `to-spec` não ganhe dependência que o manifest não declara.
22. Como solicitante, quero conflito entre o conjunto e uma decisão existente produzindo `BLOCKED` e a recomendação de `clarify`, para que a spec não substitua essa decisão.
23. Como solicitante, quero alternativa rejeitada fora dos requisitos, para que opção descartada não reentre na spec.
24. Como solicitante, quero verbete de glossário tratado como vocabulário e não como decisão, para que o glossário não feche ambiguidade.
25. Como solicitante, quero pergunta já respondida pelo conjunto, pelo repositório ou pelo contexto do projeto sem ser reaberta, para que a especificação não repita `clarify`.
26. Como solicitante, quero escopo, comportamento, arquitetura, modelo de dados, segurança e critérios de aceitação limitados ao que a decisão resolvida, o contexto verificado ou o relatório `ready` já sustentam, para que a spec não amplie o pedido.
27. Como solicitante, quero valores secretos omitidos, com registro apenas de existência e efeito arquitetural, para que a spec não copie credencial.
28. Como solicitante, quero no caminho bloqueado os campos `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` e `Recommended next skill/action`, para que a falha seja auditável.
29. Como solicitante, quero um único relatório `BLOCKED` nomeando cada pré-requisito ausente e recomendando a skill do bloqueio mais cedo, para que contexto ausente, decisão e fato externo não gerem specs parciais.
30. Como solicitante, quero nenhum arquivo de spec quando o gate falha, inclusive depois de entendimento parcial, para que rascunho ou spec bloqueada não fique disponível ao consumidor posterior.
31. Como consumidor posterior, quero autorização apenas a partir de spec `ready`, quando a regra de routing desse passo já exige spec pronta, para que `to-tickets` não receba artefato bloqueado.
32. Como mantenedor, quero `to-spec` `implemented` de forma consistente no manifest, no contrato e na fonte, para que o lifecycle não divirja.
33. Como mantenedor, quero exatamente cinco skills `implemented` e treze `scaffold`, para que o catálogo permaneça fechado em 18.
34. Como mantenedor, quero esquema, template, routing, dependências, targets e CLI preservados, para que a emenda não abra outro recorte.
35. Como mantenedor, quero o ADR `0001` continuando a tratar só do conjunto de decisões, para que a ausência de spec bloqueada não seja lida como extensão dessa decisão.
36. Como mantenedor, quero a suíte determinística protegendo o catálogo e o esquema definido de `SPEC`, para que a migração fique coberta sem executor novo.
37. Como mantenedor, quero os cenários conduzidos por agente registrados fora da suíte Node, para que a cobertura semântica não seja confundida com certificação dos quatro produtos.
38. Como mantenedor, quero proveniência, README, estado de arquitetura, padrões, estado do projeto e a frase de lifecycle reconciliados com cinco skills implementadas, para que a documentação não continue declarando quatorze scaffolds.
39. Como revisor, quero validação estrutural, suíte e verificação de espaços em branco com código de saída zero, para que a emenda esteja estruturalmente íntegra.
40. Como revisor, quero o review final sem achado bloqueante de Standards ou Spec, para que a emenda possa fechar.

## Functional Requirements

1. A skill lê o conjunto de decisões, o contexto do projeto e o relatório de pesquisa quando ele existe. Verbete de glossário não é decisão. Valor secreto não é copiado; a evidência registra existência e efeito arquitetural.
2. Somente conjunto com status `ready` autoriza gravar spec. Conjunto ausente, `draft`, `blocked` ou `superseded` produz o relatório `BLOCKED` e recomenda `clarify`.
3. Contexto do projeto ausente produz o relatório `BLOCKED` e recomenda `context-engineering`. A skill não executa `context-engineering` e não passa a declará-la como dependência.
4. Relatório de pesquisa é insumo opcional. Relatório `ready` tem seus achados usados como evidência. Recomendação do relatório vira requisito somente quando uma decisão resolvida já a adotou. Relatório ausente não bloqueia quando o conjunto `ready` não deixa fato externo que altere a spec. Fato externo ainda relevante, ou relatório que não está `ready` e cujas incógnitas ainda alteram a spec, produz `BLOCKED` e recomenda `research`.
5. A skill não inventa decisão de negócio nem decisão de arquitetura. Ambiguidade material, premissa que ainda altera a spec e conflito com decisão existente produzem `BLOCKED` e recomendam `clarify`. A decisão existente permanece. Premissa não vira requisito nem critério de aceitação. Alternativa rejeitada não reentra nos requisitos.
6. A skill não reabre pergunta que o conjunto, a evidência do repositório ou o contexto do projeto já responde. Escopo, comportamento, arquitetura, modelo de dados, segurança e critérios de aceitação ficam limitados a esses insumos.
7. Quando o gate passa, a skill grava uma spec em `.ai/artifacts/specs/`, com o template e o frontmatter existentes e com todas as seções obrigatórias preenchidas. O status é `ready`. Questão aberta que não altera o próximo passo permanece na seção correspondente, e essa seção declara que não resta questão bloqueante. O frontmatter lista os identificadores dos artefatos consumidos.
8. Uma execução posterior do mesmo objetivo atualiza o mesmo arquivo e incrementa `version`. O objetivo é o do conjunto de decisões; a spec que já cita esse conjunto é a spec desse objetivo. Não cria duplicata. Requisito só muda quando o conjunto, o contexto ou o relatório consumido mudou.
9. Quando o gate não passa, a skill não grava spec `draft`, `blocked` nem parcial. O relatório único traz `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` e `Recommended next skill/action`, e nomeia cada pré-requisito ausente. A skill recomendada é a do bloqueio mais cedo, nesta ordem: contexto do projeto ausente, problema no conjunto de decisões, fato externo.
10. A skill encerra no resultado. Informa caminho e status quando houve gravação, e se o próximo passo pedido está autorizado. Spec `ready` autoriza o passo cujo pré-requisito de routing já é uma spec pronta. A recomendação escolhe, no máximo, a primeira skill aplicável entre `domain-modelling` quando R8 se aplica, `architecture-design` quando R9 se aplica e `to-tickets` quando o próximo passo pedido é a decomposição. Se o solicitante não pediu passo além da spec, a skill informa que ela está `ready` e qual consumidor a sequência canônica indicaria. A skill não invoca a recomendada.
11. O catálogo final contém exatamente cinco skills `implemented` e treze `scaffold`. `to-spec` é a quinta skill `implemented`, ao lado de `setup-ai-development-skills`, `context-engineering`, `workflow` e `clarify`.

## Business Rules

- Decisão resolvida precede especificação. R7 permanece: a skill não inventa decisão ausente.
- Conjunto que não está `ready` não autoriza spec.
- Premissa, questão aberta, questão bloqueante e fato externo permanecem distintos.
- Decisão existente prevalece até que uma nova decisão a substitua explicitamente. Conflito bloqueia a spec.
- Artefato que não está `ready` não autoriza etapa posterior.
- O gate aplicável é o gate de especificação: escopo delimitado, critérios de aceitação testáveis e nenhuma ambiguidade bloqueante.
- `SPEC` continua com esquema definido e o mesmo template.
- O ADR `0001` continua valendo apenas para a persistência de conjunto de decisões `ready` e `blocked`.
- `clarify` continua dependência condicional quando existe ambiguidade material. A condição produz bloqueio e recomendação, sem invocação.

## Non-functional Requirements

- Determinismo: a mesma versão do conjunto, o mesmo contexto do projeto e o mesmo relatório de pesquisa produzem a mesma spec material. Seções, status, escopo, requisitos e critérios não variam.
- Auditabilidade: cada requisito e cada bloqueio cita o insumo usado.
- Portabilidade: a fonte permanece independente de ferramenta e sistema operacional.
- Segurança: a spec não reproduz segredo.
- Compatibilidade: preservar Node.js >=22, zero dependências npm, 18 skills e quatro targets.

## Technical Constraints

- Alterar somente o necessário para operacionalizar `to-spec` e registrar a emenda v1-A6.
- Não alterar o contrato de routing, o contrato de artefatos, as sequências canônicas nem o template de spec.
- Não criar runtime de redação nem executor da skill.
- A única escrita própria de `to-spec` é a spec `ready`.
- Manter LF e CRLF aceitos pelo validador.

## Security / Privacy

- Não incluir tokens, credenciais, connection strings nem valores de arquivos de ambiente na spec.
- Referenciar apenas a existência e o efeito arquitetural de evidências potencialmente sensíveis.
- Não executar ações externas. Recomendar `research` não acessa a rede.

## Acceptance Criteria

1. `to-spec` está `implemented` de forma consistente no manifest, no contrato e na fonte; o catálogo contém 5 skills `implemented` e 13 `scaffold`.
2. Conjunto `ready` e contexto do projeto produzem uma spec `ready` em `.ai/artifacts/specs/`, com o template existente, todas as seções obrigatórias e o gate de especificação satisfeito.
3. Relatório de pesquisa `ready` entra como evidência. Recomendação não adotada por decisão resolvida não vira requisito. Relatório ausente não bloqueia quando não resta fato externo relevante.
4. Questão aberta que não altera o próximo passo coexiste com spec `ready`, e a seção declara que não resta questão bloqueante.
5. A execução seguinte do mesmo objetivo atualiza o mesmo arquivo, incrementa `version` e não cria duplicata. Requisito sustentado pelos mesmos insumos permanece.
6. Conjunto ausente, `draft`, `blocked` ou `superseded` produz `BLOCKED`, recomenda `clarify` e não grava spec.
7. Premissa não vira requisito. Premissa que ainda altera a spec, ambiguidade material e conflito com decisão existente produzem `BLOCKED`, recomendam `clarify` e preservam a decisão existente.
8. Fato externo que ainda altera a spec, ou relatório não pronto cujas incógnitas ainda a alteram, produz `BLOCKED` e recomenda `research`.
9. Contexto do projeto ausente produz `BLOCKED`, recomenda `context-engineering` e não executa essa skill.
10. O caminho bloqueado não deixa arquivo de spec e traz os cinco campos contratados de falha. Vários bloqueios cabem num único relatório, com a skill do bloqueio mais cedo.
11. A skill informa autorização do próximo passo pedido e recomenda no máximo a primeira skill aplicável entre `domain-modelling`, `architecture-design` e `to-tickets`, sem invocá-la.
12. Segredo não aparece na spec gravada.
13. Esquema, template, R1–R17, dependências, targets, CLI e as outras skills permanecem inalterados. O ADR `0001` não é estendido.
14. A regressão determinística cobre a migração 5/13 e a preservação de `SPEC` como esquema definido, com o template existente.
15. Os cenários de spec pronta, atualização, bloqueio e sigilo ficam em evidência separada dos testes Node.
16. `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
17. Proveniência, README, estado arquitetural, padrões, estado do projeto, frase de lifecycle, evidências e handoff refletem a v1-A6 sem declarar capacidades não verificadas.
18. Review final não contém achado bloqueante de Standards ou Spec.

## Risks

- Instruções em linguagem natural podem preencher seções de modo diferente entre agentes. O glossário, a citação do insumo e os cenários reduzem essa variação.
- Não gravar spec bloqueada pode parecer perda de trabalho. O relatório `BLOCKED` e o conjunto de decisões conservam a fronteira para a sessão seguinte.
- Um agente pode ainda assim deixar spec parcial. Os cenários precisam mostrar o diretório sem arquivo novo nesse caminho.
- Testes estruturais podem ser confundidos com execução da skill. A evidência agent-driven fica registrada separadamente e não certifica os quatro produtos.

## Open Questions

Nenhuma questão bloqueante. Executor automático, alteração de esquema, extensão do ADR `0001` e implementação das outras skills scaffold permanecem fora deste recorte.

## Implementation Decisions

- A mudança será registrada como emenda v1-A6.
- O mantenedor confirmou o seam em 2026-10-08: um único seam de comportamento, a aplicação agent-driven da skill, com a suíte Node apenas acompanhando o catálogo e o esquema definido de `SPEC`.
- A spec `ready` é o único artefato persistido pela skill, no diretório já usado pelas specs do pacote, com o template existente.
- O caminho bloqueado devolve o relatório contratado e não persiste spec. Essa escolha não altera o ADR `0001`.
- A dependência condicional de `clarify` e a ausência de dependência de `context-engineering` permanecem como estão no manifest. Recomendação não é composição.
- A implementação será dividida em dois passos lineares: operacionalização e, em seguida, fechamento com validação. O conjunto de tickets correspondente não faz parte desta spec.
- Publicação remota ficou pendente: `gh` não está no PATH. O Markdown local é a fonte de verdade. Triagem local: `ready-for-agent`.

## Testing Decisions

- Um bom teste observa comportamento externo: insumos entram, spec `ready` ou relatório `BLOCKED` sai. Não afirma redação interna da skill além do resultado observável.
- O teste determinístico, no seam de catálogo já existente, passa a exigir `to-spec` entre as skills `implemented`, cinco no total e treze `scaffold`, e preserva `SPEC` com esquema definido e o template atual. Nenhum executor Node será criado para tornar as instruções executáveis.
- Os cenários conduzidos por agente aplicam o contrato e a fonte em diretório temporário e inspecionam a spec gravada ou a ausência de arquivo junto com o relatório. Cobrem spec pronta, relatório incorporado, questão aberta com spec `ready`, atualização do mesmo arquivo, premissa, conjunto ausente ou não pronto, ambiguidade material, fato externo, contexto ausente, conflito com decisão existente, sigilo e ausência de invocação.
- O precedente é a asserção de catálogo da v1-A5 e a evidência `TEST-20261008-002`, separada da suíte Node.
- Asserções não serão relaxadas para acomodar a implementação.

## Further Notes

Esta spec satisfaz o gate de especificação: escopo delimitado, critérios verificáveis e nenhuma ambiguidade bloqueante. O conjunto de tickets é `TICKET-SET-20261008-003`. O ticket 01 está concluído. O ticket 02 permanece a frontier.

A issue remota em `pcmbezerra/ai-development-skills-pack` não foi criada nesta sessão. Quando `gh` estiver disponível, publicar este corpo com o rótulo `ready-for-agent`, reconciliando o número da issue com este arquivo para não duplicar.

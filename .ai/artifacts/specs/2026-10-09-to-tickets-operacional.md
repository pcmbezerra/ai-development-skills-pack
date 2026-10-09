---
artifact: spec
id: SPEC-20261009-001
version: 1
status: ready
created_by: to-spec
inputs:
  - maintainer-confirmation-2026-10-09-to-tickets-seam
  - HANDOFF-20261009-001
  - HANDOFF-20261006-001
  - CONTEXT.md
  - ADR-0001
---

# to-tickets operacional — emenda v1-A7

## Problem

A skill `to-tickets` existe apenas como scaffold. O contrato de artefatos, o template de conjunto de tickets, a regra R10 e o gate de ticket já definem o que um conjunto precisa conter para ficar executável, mas a skill ainda não tem instruções operacionais para consumir uma spec pronta, gravar o conjunto e parar sem inventar decisão nem executar a skill seguinte.

## Goal

Tornar `to-tickets` operacional para converter uma `SPEC` `ready` em um conjunto de tickets `ready`, ou devolver o relatório `BLOCKED` sem gravar arquivo quando o gate de ticket não puder passar.

## Scope

- Implementar o workflow de decomposição no contrato e na fonte da skill, com o mesmo texto operacional nos dois lugares.
- Migrar `to-tickets` de `scaffold` para `implemented` no manifest, no contrato e na fonte.
- Consumir `SPEC` `ready`. Consumir `DOMAIN_MODEL` e `ARCHITECTURE_DESIGN` somente quando existirem e estiverem `ready`.
- Gravar um único conjunto `ready` por objetivo em `.ai/artifacts/tickets/`, reutilizando o template e o frontmatter existentes e repetindo o bloco de ticket para cada ticket.
- Atualizar o mesmo arquivo e incrementar `version` numa execução posterior do mesmo objetivo.
- Encerrar no conjunto, informando caminho, status e se `implement` está autorizado, sem invocá-lo.
- Devolver o relatório `BLOCKED` contratado, sem gravar conjunto, quando a spec não estiver pronta, quando um artefato opcional exigido ou presente não estiver `ready`, quando restar decisão ausente, ou quando o gate de ticket não puder passar sem invenção.
- Manter o ADR `0001` restrito ao conjunto de decisões.
- Estender a regressão estrutural de catálogo já existente e executar os cenários da skill por agente, separados da suíte Node.
- Registrar a mudança como emenda v1-A7 e reconciliar a documentação que declara a contagem de skills.

## Non-goals

- Criar executor JavaScript, redator automático de tickets ou nova dependência npm.
- Criar arquivo de teste novo. A suíte Node só acompanha o catálogo e o esquema já definido de `TICKET_SET`.
- Alterar o esquema, o template, as seções obrigatórias, o produtor de `TICKET_SET` ou o registro de `TICKET` dentro do conjunto.
- Alterar R1–R17, sequências canônicas, responsabilidades das outras skills ou dependências do manifest.
- Acrescentar dependência obrigatória, condicional ou opcional a `to-tickets`. Recomendação não é composição.
- Estender o ADR `0001` para conjunto bloqueado, rascunho ou conjunto ausente.
- Gravar conjunto `draft`, `blocked` ou parcial.
- Gravar um diretório por ticket, um arquivo por ticket, ou reformatar os conjuntos históricos que já usam diretório.
- Implementar `domain-modelling`, `architecture-design`, `research`, `implement`, `tdd`, `code-review` ou qualquer outra skill scaffold.
- Invocar a skill recomendada ou iniciar o ticket da frontier.
- Publicar issue remota como parte da skill. O fallback local permanece a escrita da skill.
- Gravar `CONTEXT.md`, ADR, spec ou código da aplicação como saída de `to-tickets`.
- Adicionar comando CLI ou target.
- Certificar execução real em Cursor, Codex, Gemini Antigravity ou Claude Code.
- Produzir o conjunto de tickets desta emenda. Isso fica para o passo seguinte, depois desta spec.

## Actors

- Solicitante que já tem uma `SPEC` `ready` e quer trabalho executável.
- Agente de IA que executa a skill `to-tickets`.
- `SPEC` `ready`.
- `DOMAIN_MODEL` e `ARCHITECTURE_DESIGN`, quando existirem e estiverem `ready`.
- Decisões existentes em ADR, em conjunto de decisões e no contexto do projeto.
- Consumidor posterior `implement`, cuja sequência canônica segue o conjunto pronto.

## User Stories

1. Como solicitante com `SPEC` `ready`, quero receber um conjunto de tickets `ready`, para que o próximo passo consuma trabalho delimitado e verificável.
2. Como solicitante, quero cada ticket com Title, Goal, Context, Scope, Out of Scope, Dependencies, Implementation Notes, Acceptance Criteria, Validation e Definition of Done, para que o gate de ticket possa ser avaliado no artefato.
3. Como solicitante, quero um bloco repetido para cada ticket dentro do mesmo arquivo, para que `TICKET` continue registro do conjunto e não um artefato separado.
4. Como solicitante, quero as dependências entre tickets explícitas e sem ciclo, para que a ordem de execução seja inspecionável.
5. Como solicitante, quero cada ticket verificável por si quando as dependências declaradas estiverem concluídas, para que a frontier possa ser lida sem executar a skill seguinte.
6. Como solicitante, quero o escopo de cada ticket limitado ao que a spec e os artefatos opcionais `ready` já sustentam, para que a decomposição não amplie o pedido.
7. Como solicitante, quero critérios de aceitação mensuráveis herdados da spec, para que ticket executável não nasça de intenção vaga.
8. Como solicitante, quero `DOMAIN_MODEL` ausente sem efeito quando a spec não dispara R8, para que modelo de domínio continue insumo opcional.
9. Como solicitante, quero `ARCHITECTURE_DESIGN` ausente sem efeito quando a spec não dispara R9, para que desenho de arquitetura continue insumo opcional.
10. Como solicitante, quero um modelo de domínio `ready` usado como evidência quando existir, para que invariante já registrada não seja redescoberta.
11. Como solicitante, quero um desenho de arquitetura `ready` usado como evidência quando existir, para que fronteira já registrada restrinja os tickets.
12. Como solicitante, quero recomendação de artefato opcional fora dos requisitos do ticket, salvo quando a spec já a tiver adotado, para que o insumo opcional não crie escopo.
13. Como solicitante, quero um modelo de domínio presente que não está `ready` produzindo `BLOCKED`, a recomendação de `domain-modelling` e nenhum arquivo, para que rascunho não autorize ticket.
14. Como solicitante, quero um desenho de arquitetura presente que não está `ready` produzindo `BLOCKED`, a recomendação de `architecture-design` e nenhum arquivo, para que rascunho não autorize ticket.
15. Como solicitante, quero R8 aplicável e modelo ausente produzindo `BLOCKED` e a recomendação de `domain-modelling`, para que vocabulário, invariante, transição, evento ou fronteira de contexto não sejam inventados no ticket.
16. Como solicitante, quero R9 aplicável e desenho ausente produzindo `BLOCKED` e a recomendação de `architecture-design`, para que fronteira de módulo, interface, dado, integração, infraestrutura, segurança, concorrência, implantação ou alto raio de impacto não sejam inventados no ticket.
17. Como solicitante, quero verbete de glossário sem disparar R8, para que vocabulário do pacote não vire exigência de modelo de domínio.
18. Como solicitante, quero mudança que a spec declara como CRUD ou só de infraestrutura sem modelo de domínio forçado, para que R8 continue condicional.
19. Como solicitante, quero uma segunda execução do mesmo objetivo atualizando o mesmo arquivo e incrementando `version`, para que a rastreabilidade permaneça num único artefato.
20. Como solicitante, quero tickets alterados somente quando a spec ou um artefato opcional consumido tiver mudado, para que ticket já sustentado pelos insumos não seja reescrito em silêncio.
21. Como solicitante, quero o frontmatter do conjunto citando os identificadores dos artefatos consumidos, para que a proveniência seja inspecionável.
22. Como solicitante, quero a skill encerrando no conjunto e informando caminho, status e se `implement` está autorizado, para que eu decida a etapa seguinte.
23. Como solicitante que só pediu os tickets, quero o relatório de que o conjunto está `ready` e de que o consumidor canônico é `implement`, para que a recomendação não vire execução.
24. Como solicitante, quero `implement` não invocado, para que `to-tickets` não comece a implementação.
25. Como solicitante sem spec, quero o relatório `BLOCKED` recomendando `to-spec` e nenhum arquivo, para que a skill não invente a spec ausente.
26. Como solicitante com spec `draft`, `blocked` ou `superseded`, quero o relatório `BLOCKED` recomendando `to-spec` e nenhum arquivo, para que só spec `ready` autorize decomposição.
27. Como solicitante, quero uma premissa permanecendo premissa e fora dos tickets, para que uma suposição não feche o gate.
28. Como solicitante, quero uma premissa que ainda altera os tickets produzindo `BLOCKED` e a recomendação de `clarify`, para que a ambiguidade material volte à decisão.
29. Como solicitante, quero uma ambiguidade material descoberta durante a decomposição produzindo `BLOCKED` e a recomendação de `clarify`, para que o agente não escolha no lugar do solicitante.
30. Como solicitante, quero conflito entre a spec e uma decisão existente produzindo `BLOCKED` e a recomendação de `clarify`, para que o conjunto não substitua essa decisão.
31. Como solicitante, quero alternativa rejeitada fora dos tickets, para que opção descartada não reentre na decomposição.
32. Como solicitante, quero pergunta já respondida pela spec, pelo repositório ou pelo contexto do projeto sem ser reaberta, para que a decomposição não repita `clarify` nem `to-spec`.
33. Como solicitante, quero um fato externo que ainda altera os tickets produzindo `BLOCKED` e a recomendação de `research`, para que o conjunto não invente esse fato nem acesse a rede.
34. Como solicitante, quero um único relatório `BLOCKED` nomeando cada pré-requisito ausente e recomendando a skill do bloqueio mais cedo, para que spec, decisão, domínio, arquitetura e fato externo não gerem conjuntos parciais.
35. Como solicitante, quero nenhum arquivo quando o gate falha, inclusive depois de entendimento parcial, para que rascunho ou conjunto bloqueado não fique disponível a `implement`.
36. Como solicitante, quero ciclo de dependência impedindo a gravação, para que conjunto inválido não passe no gate.
37. Como solicitante, quero a skill recusando ticket que não seja delimitado, verificável ou com critério mensurável, para que o gate de ticket não seja contornado por invenção.
38. Como solicitante, quero valores secretos omitidos, com registro apenas de existência e efeito arquitetural, para que o conjunto não copie credencial.
39. Como solicitante, quero no caminho bloqueado os campos `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` e `Recommended next skill/action`, para que a falha seja auditável.
40. Como consumidor posterior, quero autorização de `implement` apenas a partir de conjunto `ready`, para que ticket bloqueado não autorize implementação.
41. Como mantenedor, quero `to-tickets` `implemented` de forma consistente no manifest, no contrato e na fonte, para que o lifecycle não divirja.
42. Como mantenedor, quero exatamente seis skills `implemented` e doze `scaffold`, para que o catálogo permaneça fechado em 18.
43. Como mantenedor, quero as dependências de `to-tickets` continuando vazias, para que a emenda não crie composição obrigatória.
44. Como mantenedor, quero esquema, template, routing, targets e CLI preservados, para que a emenda não abra outro recorte.
45. Como mantenedor, quero o ADR `0001` continuando a tratar só do conjunto de decisões, para que a ausência de conjunto bloqueado não seja lida como extensão dessa decisão.
46. Como mantenedor, quero a suíte determinística protegendo o catálogo e o esquema definido de `TICKET_SET`, para que a migração fique coberta sem executor novo.
47. Como mantenedor, quero os cenários conduzidos por agente registrados fora da suíte Node, para que a cobertura semântica não seja confundida com certificação dos quatro produtos.
48. Como mantenedor, quero proveniência, README, estado de arquitetura, padrões, estado do projeto e a frase de lifecycle reconciliados com seis skills implementadas, para que a documentação não continue declarando treze scaffolds.
49. Como revisor, quero validação estrutural, suíte e verificação de espaços em branco com código de saída zero, para que a emenda esteja estruturalmente íntegra.
50. Como revisor, quero o review final sem achado bloqueante de Standards ou Spec, para que a emenda possa fechar.

## Functional Requirements

1. A skill lê a spec e, quando existem, o modelo de domínio e o desenho de arquitetura. Verbete de glossário não é decisão nem dispara R8. Valor secreto não é copiado; a evidência registra existência e efeito arquitetural.
2. Somente spec com status `ready` autoriza gravar conjunto. Spec ausente, `draft`, `blocked` ou `superseded` produz o relatório `BLOCKED` e recomenda `to-spec`.
3. Modelo de domínio ausente não bloqueia quando a spec não envolve vocabulário de negócio, invariante, transição de estado, evento de negócio ou fronteira de contexto. Desenho de arquitetura ausente não bloqueia quando a spec não afeta fronteira de módulo, interface pública, modelo de dados, contrato de integração, infraestrutura, fronteira de segurança, concorrência, implantação ou comportamento de alto raio de impacto. A skill não executa o produtor ausente e não passa a declará-lo como dependência.
4. Artefato opcional presente só é evidência quando está `ready`. Recomendação desse artefato vira requisito de ticket somente quando a spec já a adotou. Artefato presente com outro status produz `BLOCKED` e recomenda o produtor: `domain-modelling` ou `architecture-design`. R8 aplicável sem modelo, ou R9 aplicável sem desenho, produz o mesmo bloqueio. Mudança que a spec limita a CRUD ou infraestrutura não força modelo de domínio.
5. A skill não inventa decisão de negócio nem decisão de arquitetura. Ambiguidade material, premissa que ainda altera os tickets e conflito com decisão existente produzem `BLOCKED` e recomendam `clarify`. A decisão existente permanece. Premissa não vira ticket. Alternativa rejeitada não reentra nos tickets. Fato externo que ainda altera os tickets produz `BLOCKED` e recomenda `research`, sem acesso à rede e sem nova dependência.
6. A skill não reabre pergunta que a spec, a evidência do repositório ou o contexto do projeto já responde. Escopo, critérios, dependências e notas ficam limitados à spec e aos artefatos opcionais `ready`.
7. Quando o gate passa, a skill grava um único arquivo em `.ai/artifacts/tickets/`, com o template e o frontmatter existentes. O status do conjunto é `ready`. Cada ticket repete o bloco canônico, com todas as seções preenchidas, dependências explícitas e sem ciclo, e é verificável quando essas dependências estiverem concluídas. O frontmatter lista os identificadores dos artefatos consumidos. O arquivo não conserva marcador de rascunho do template.
8. Uma execução posterior do mesmo objetivo atualiza o mesmo arquivo e incrementa `version`. O objetivo é o da spec; o conjunto que já cita essa spec é o conjunto desse objetivo. Não cria duplicata. Ticket só muda quando a spec ou um artefato opcional consumido mudou. Conjuntos históricos em diretório não são reformatados.
9. Quando o gate não passa, a skill não grava conjunto `draft`, `blocked` nem parcial. O relatório único traz `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` e `Recommended next skill/action`, e nomeia cada pré-requisito ausente. A skill recomendada é a do bloqueio mais cedo, nesta ordem: spec ausente ou não pronta; problema de decisão; modelo de domínio exigido ou presente e não pronto; desenho de arquitetura exigido ou presente e não pronto; fato externo. Se os insumos estão prontos e ainda assim não há decomposição válida sem invenção, spec que não fornece fatias verificáveis recomenda `to-spec`; decisão ainda aberta recomenda `clarify`.
10. A skill encerra no resultado. Informa caminho e status quando houve gravação, e se `implement` está autorizado. Conjunto `ready` autoriza `implement` e não autoriza outra skill. Se o solicitante não pediu passo além dos tickets, a skill informa que o conjunto está `ready` e que o consumidor canônico é `implement`. A skill não invoca `implement` nem inicia ticket.
11. O catálogo final contém exatamente seis skills `implemented` e doze `scaffold`. `to-tickets` é a sexta, ao lado de `setup-ai-development-skills`, `context-engineering`, `workflow`, `clarify` e `to-spec`. As dependências de `to-tickets` permanecem sem itens obrigatórios, condicionais ou opcionais.

## Business Rules

- Spec pronta precede conjunto executável. R10 permanece: spec que não está `ready` não produz ticket de implementação.
- O gate aplicável é o gate de ticket: escopo delimitado, dependências explícitas e acíclicas, critérios mensuráveis e ticket verificável por si.
- R8 e R9 permanecem condicionais. Ausência do artefato opcional não bloqueia quando a condição não se aplica. Presença sem status `ready` bloqueia.
- Premissa, questão aberta, questão bloqueante e fato externo permanecem distintos.
- Decisão existente prevalece até que uma nova decisão a substitua explicitamente. Conflito bloqueia o conjunto.
- Artefato que não está `ready` não autoriza etapa posterior.
- `TICKET_SET` continua com esquema definido e o mesmo template. `TICKET` continua registro interno do conjunto.
- O ADR `0001` continua valendo apenas para a persistência de conjunto de decisões `ready` e `blocked`.
- Dependências vazias permanecem vazias. Recomendar `to-spec`, `clarify`, `domain-modelling`, `architecture-design` ou `research` não cria dependência nem executa a skill.

## Non-functional Requirements

- Determinismo: a mesma spec e os mesmos artefatos opcionais produzem o mesmo conjunto material. Seções, status, escopo, tickets e critérios não variam.
- Auditabilidade: cada ticket e cada bloqueio cita o insumo usado.
- Portabilidade: a fonte permanece independente de ferramenta e sistema operacional.
- Segurança: o conjunto não reproduz segredo.
- Compatibilidade: preservar Node.js >=22, zero dependências npm, 18 skills e quatro targets.

## Technical Constraints

- Alterar somente o necessário para operacionalizar `to-tickets` e registrar a emenda v1-A7.
- Não alterar o contrato de routing, o contrato de artefatos, as sequências canônicas nem o template de conjunto de tickets.
- Não criar runtime de redação nem executor da skill.
- A única escrita própria de `to-tickets` é o conjunto `ready`.
- A regressão determinística estende a asserção de catálogo já existente. Não há arquivo de teste novo.
- Manter LF e CRLF aceitos pelo validador.

## Security / Privacy

- Não incluir tokens, credenciais, connection strings nem valores de arquivos de ambiente no conjunto.
- Referenciar apenas a existência e o efeito arquitetural de evidências potencialmente sensíveis.
- Não executar ações externas. Recomendar `research` não acessa a rede. A skill não publica issue remota.

## Acceptance Criteria

1. `to-tickets` está `implemented` de forma consistente no manifest, no contrato e na fonte; o catálogo contém 6 skills `implemented` e 12 `scaffold`, e as dependências de `to-tickets` continuam vazias.
2. Spec `ready`, sem R8 nem R9, produz um conjunto `ready` em `.ai/artifacts/tickets/`, com o template existente, um bloco completo por ticket, dependências explícitas e acíclicas e o gate de ticket satisfeito. Modelo e desenho ausentes não bloqueiam.
3. Modelo ou desenho `ready` entra como evidência e não amplia a spec. Recomendação não adotada pela spec não vira requisito de ticket.
4. A execução seguinte do mesmo objetivo atualiza o mesmo arquivo, incrementa `version` e não cria duplicata. Ticket sustentado pelos mesmos insumos permanece. Conjunto histórico em diretório não é reformatado.
5. Spec ausente, `draft`, `blocked` ou `superseded` produz `BLOCKED`, recomenda `to-spec` e não grava conjunto.
6. Artefato opcional presente e não `ready`, ou exigido por R8 ou R9 e ausente, produz `BLOCKED`, recomenda o produtor correspondente e não grava conjunto.
7. Premissa não vira ticket. Premissa que ainda altera os tickets, ambiguidade material e conflito com decisão existente produzem `BLOCKED`, recomendam `clarify` e preservam a decisão existente.
8. Fato externo que ainda altera os tickets produz `BLOCKED` e recomenda `research`, sem acesso à rede.
9. O caminho bloqueado não deixa arquivo e traz os cinco campos contratados de falha. Vários bloqueios cabem num único relatório, com a skill do bloqueio mais cedo: spec, decisão, modelo de domínio, desenho de arquitetura, fato externo.
10. A skill informa se `implement` está autorizado e não o invoca. Conjunto `ready` autoriza somente `implement`.
11. Segredo não aparece no conjunto gravado. O arquivo gravado não conserva marcador de rascunho do template.
12. Esquema, template, R1–R17, dependências, targets, CLI e as outras skills permanecem inalterados. O ADR `0001` não é estendido.
13. A regressão determinística cobre a migração 6/12, as dependências vazias e a preservação de `TICKET_SET` como esquema definido, com o template existente. Nenhum arquivo de teste novo é adicionado.
14. Os cenários de conjunto pronto, atualização, artefato opcional, bloqueio e sigilo ficam em evidência separada dos testes Node.
15. `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
16. Proveniência, README, estado arquitetural, padrões, estado do projeto, frase de lifecycle, evidências e handoff refletem a v1-A7 sem declarar capacidades não verificadas.
17. Review final não contém achado bloqueante de Standards ou Spec.

## Risks

- Instruções em linguagem natural podem cortar tickets de modo diferente entre agentes. O glossário, a citação do insumo e os cenários reduzem essa variação.
- Não gravar conjunto bloqueado pode parecer perda de trabalho. O relatório `BLOCKED` e a spec conservam a fronteira para a sessão seguinte.
- Um agente pode ainda assim deixar conjunto parcial ou repetir o layout histórico em diretório. Os cenários precisam mostrar um único arquivo novo no caminho pronto e nenhum arquivo novo no caminho bloqueado.
- Testes estruturais podem ser confundidos com execução da skill. A evidência agent-driven fica registrada separadamente e não certifica os quatro produtos.
- Julgar R8 ou R9 a partir do glossário, e não da spec, exigiria modelo ou desenho em mudança que não os envolve. A spec é o insumo que dispara a condição.

## Open Questions

Nenhuma questão bloqueante. Executor automático, arquivo de teste novo, alteração de esquema, layout em diretório, extensão do ADR `0001` e implementação das outras skills scaffold permanecem fora deste recorte.

## Implementation Decisions

- A mudança será registrada como emenda v1-A7.
- O mantenedor confirmou o seam em 2026-10-09: um único seam de comportamento, a aplicação agent-driven da skill, com a suíte Node apenas acompanhando o catálogo, as dependências vazias e o esquema definido de `TICKET_SET`.
- O conjunto `ready` é o único artefato persistido pela skill, no diretório de tickets já configurado, com o template existente e um arquivo por objetivo.
- O caminho bloqueado devolve o relatório contratado e não persiste conjunto. Essa escolha não altera o ADR `0001`.
- Ausência de modelo de domínio ou de desenho de arquitetura não bloqueia. Presença sem `ready`, ou exigência pela spec com artefato faltante, bloqueia e recomenda o produtor, sem nova dependência.
- A implementação desta emenda foi decomposta em `TICKET-SET-20261009-001`. Esse conjunto não faz parte deste arquivo de spec.
- Publicação remota ficou pendente: `gh` não está no PATH. O Markdown local é a fonte de verdade. Triagem local: `ready-for-agent`.

## Testing Decisions

- Um bom teste observa comportamento externo: insumos entram, conjunto `ready` ou relatório `BLOCKED` sai. Não afirma redação interna da skill além do resultado observável.
- O teste determinístico, no seam de catálogo já existente, passa a exigir `to-tickets` entre as skills `implemented`, seis no total e doze `scaffold`, preserva as dependências vazias e preserva `TICKET_SET` com esquema definido e o template atual. Nenhum executor Node será criado para tornar as instruções executáveis. Nenhum arquivo de teste novo será criado.
- Os cenários conduzidos por agente aplicam o contrato e a fonte em diretório temporário e inspecionam o conjunto gravado ou a ausência de arquivo junto com o relatório. Cobrem conjunto pronto sem artefato opcional, artefato opcional incorporado, artefato opcional ausente, artefato opcional não pronto, R8 e R9, atualização do mesmo arquivo, spec ausente ou não pronta, ambiguidade material, fato externo, conflito com decisão existente, sigilo e ausência de invocação.
- O precedente é a asserção de catálogo da v1-A6 e a evidência separada da suíte Node naquela emenda.
- Asserções não serão relaxadas para acomodar a implementação.

## Further Notes

Esta spec satisfaz o gate de especificação: escopo delimitado, critérios verificáveis e nenhuma ambiguidade bloqueante. O conjunto de tickets é `TICKET-SET-20261009-001`. Os tickets 01 e 02 estão concluídos. A frontier desta spec está vazia.

A issue remota em `pcmbezerra/ai-development-skills-pack` não foi criada nesta sessão. Quando `gh` estiver disponível, publicar este corpo com o rótulo `ready-for-agent`, reconciliando o número da issue com este arquivo para não duplicar.

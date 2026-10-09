---
artifact: spec
id: SPEC-20261009-003
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261009-002
  - HANDOFF-20261009-004
  - HANDOFF-20261006-001
  - CONTEXT.md
  - ADR-0001
---

# architecture-design operacional — emenda v1-A9

## Problem

A skill `architecture-design` existe apenas como scaffold. O contrato de artefatos, o template de desenho, o template de ADR, a regra R9 e o gate de arquitetura já definem o que um desenho precisa conter, mas a skill ainda não tem instruções operacionais para consumir uma spec pronta, gravar o desenho e parar sem inventar decisão nem executar a skill seguinte.

## Goal

Tornar `architecture-design` operacional para converter uma `SPEC` `ready`, com contexto do projeto, em um desenho de arquitetura `ready`, ou devolver o relatório `BLOCKED` sem gravar arquivo quando o gate não puder passar.

## Scope

- Implementar o workflow de desenho no contrato e na fonte da skill, com o mesmo texto operacional nos dois lugares.
- Migrar `architecture-design` de `scaffold` para `implemented` no manifest, no contrato e na fonte.
- Consumir uma `SPEC` `ready` e o contexto do projeto. Usar `DOMAIN_MODEL` e `RESEARCH_REPORT` somente quando estiverem `ready`.
- Gravar um único desenho `ready` por objetivo em `.ai/artifacts/architecture/`, reutilizando o template e o frontmatter existentes e preenchendo as seções obrigatórias.
- Gravar também um ADR `ready` em `.ai/decisions/`, com o template existente, somente quando a spec `ready` já registrar uma decisão arquitetural durável, com alternativas e consequências.
- Atualizar o mesmo desenho e incrementar `version` numa execução posterior do mesmo objetivo. Atualizar o ADR da mesma decisão da mesma forma. Não apagar ADR.
- Encerrar no desenho, informando caminho, status, se houve ADR e se `to-tickets` está autorizado, sem invocá-lo.
- Devolver o relatório `BLOCKED` contratado, sem gravar desenho nem ADR, quando o contexto faltar, quando a spec não estiver `ready`, quando restar decisão, fato externo ou modelo exigido, quando R9 não se aplicar, ou quando o gate não puder passar sem invenção.
- Manter o ADR `0001` restrito ao conjunto de decisões e sem modificação.
- Preservar as dependências condicionais já declaradas. Recomendação não acrescenta dependência nem executa a skill.
- Estender a regressão estrutural de catálogo já existente e executar os cenários da skill por agente, separados da suíte Node.
- Registrar a mudança como emenda v1-A9 e reconciliar a documentação que declara a contagem de skills.

## Non-goals

- Criar executor JavaScript, redator automático de desenho ou nova dependência npm.
- Criar arquivo de teste novo. A suíte Node só acompanha o catálogo, as dependências condicionais existentes e os esquemas já definidos de `ARCHITECTURE_DESIGN` e `ADR`.
- Alterar o esquema, os templates, as seções obrigatórias ou o produtor de `ARCHITECTURE_DESIGN` e de `ADR`.
- Acrescentar chave de caminho em `.ai/config.json`. Os diretórios usados são o layout já recomendado e o `adrPath` já configurado.
- Alterar R1–R17, sequências canônicas, responsabilidades das outras skills ou as dependências do manifest.
- Acrescentar ou remover dependência obrigatória, condicional ou opcional. Recomendação não é composição.
- Estender ou modificar o ADR `0001`.
- Gravar desenho `draft`, `blocked` ou parcial. Gravar ADR sem decisão durável já presente na spec.
- Apagar um ADR existente.
- Implementar `research`, `implement` ou qualquer outra skill scaffold.
- Invocar a skill recomendada.
- Gravar `CONTEXT.md`, spec, modelo de domínio, conjunto de tickets ou código da aplicação como saída de `architecture-design`.
- Adicionar comando CLI ou target.
- Certificar execução real em Cursor, Codex, Gemini Antigravity ou Claude Code.
- Produzir o desenho de arquitetura desta emenda. A emenda operacionaliza uma skill e não muda a fronteira de arquitetura de um produto consumidor, no mesmo precedente de `SPEC-20261009-002`.

## Actors

- Solicitante que já tem uma `SPEC` `ready` e quer um desenho de arquitetura.
- Agente de IA que executa a skill `architecture-design`.
- `SPEC` `ready`.
- Contexto do projeto.
- `DOMAIN_MODEL` e `RESEARCH_REPORT` opcionais.
- Decisões existentes em ADR, em conjunto de decisões e no contexto do projeto.
- Consumidor posterior `to-tickets`.

## User Stories

1. Como solicitante com `SPEC` `ready` que afeta fronteira de módulo ou interface pública, quero receber um desenho `ready`, para que o próximo passo consuma a solução já registrada.
2. Como solicitante, quero as treze seções obrigatórias preenchidas, para que o contrato de artefato possa ser avaliado no arquivo.
3. Como solicitante, quero ausência de conteúdo numa seção obrigatória registrada como ausência evidenciada, para que a seção não seja inventada.
4. Como solicitante, quero um ADR somente quando a spec já registra decisão durável, com alternativas e consequências, para que o ADR adicional continue opcional.
5. Como solicitante, quero o ADR `0001` intocado, para que a persistência de conjunto de decisões não seja reescrita.
6. Como solicitante, quero uma segunda execução do mesmo objetivo atualizando o mesmo desenho e incrementando `version`, para que a rastreabilidade permaneça num único artefato.
7. Como solicitante, quero o desenho alterado somente quando o insumo consumido tiver mudado, para que conteúdo já sustentado não seja reescrito em silêncio. A `version` incrementa mesmo assim.
8. Como solicitante, quero o frontmatter citando os identificadores dos artefatos consumidos, para que a proveniência seja inspecionável.
9. Como solicitante, quero a skill encerrando no desenho e informando caminho, status, se houve ADR e se `to-tickets` está autorizado, para que eu decida a etapa seguinte.
10. Como solicitante que só pediu o desenho, quero o relatório de que ele está `ready` e de que o consumidor canônico é `to-tickets`, para que a recomendação não vire execução.
11. Como solicitante, quero `to-tickets` não invocado, para que `architecture-design` não comece os tickets.
12. Como solicitante sem contexto do projeto, quero o relatório `BLOCKED` recomendando `context-engineering` e nenhum arquivo, para que a skill não invente o contexto nem passe a depender dessa skill.
13. Como solicitante com spec ausente, `draft`, `blocked` ou `superseded`, quero o relatório `BLOCKED` recomendando `to-spec` e nenhum arquivo.
14. Como solicitante cuja mudança a spec limita de modo que R9 não se aplica, quero `BLOCKED`, nenhum arquivo e a recomendação de `to-tickets`, para que a skill não force um desenho.
15. Como solicitante, quero verbete de glossário sem justificar desenho, para que o glossário local não dispare R9.
16. Como solicitante, quero modelo de domínio ausente sem bloquear quando a spec não envolve vocabulário, invariante, transição, evento ou fronteira de contexto.
17. Como solicitante, quero modelo ausente ou não `ready` bloqueando quando R8 se aplica, ou quando um modelo presente não está `ready`, com recomendação de `domain-modelling` e nenhum arquivo.
18. Como solicitante, quero recomendação de modelo ou de pesquisa que a spec não adotou fora do desenho.
19. Como solicitante, quero uma premissa permanecendo premissa e fora do desenho, para que uma suposição não vire componente, interface, trade-off nem risco.
20. Como solicitante, quero uma premissa que ainda altera o desenho, uma ambiguidade material ou um conflito com decisão existente produzindo `BLOCKED` e a recomendação de `clarify`, com a decisão existente preservada.
21. Como solicitante, quero alternativa rejeitada fora do desenho.
22. Como solicitante, quero pergunta já respondida pela spec, pelo repositório ou pelo contexto do projeto sem ser reaberta.
23. Como solicitante, quero um fato externo que ainda altera o desenho, ou um relatório de pesquisa presente que não está `ready`, produzindo `BLOCKED` e a recomendação de `research`, sem acesso à rede.
24. Como solicitante, quero um único relatório `BLOCKED` nomeando cada pré-requisito ausente e recomendando a skill do bloqueio mais cedo, nesta ordem: contexto do projeto, spec, decisão, fato externo ou pesquisa não pronta, modelo exigido ou presente e não pronto, mudança que não justifica desenho.
25. Como solicitante, quero nenhum arquivo quando o gate falha, inclusive depois de entendimento parcial. A skill não apaga ADR já existente.
26. Como solicitante, quero valores secretos omitidos, com registro apenas de existência e efeito arquitetural.
27. Como solicitante, quero no caminho bloqueado os campos `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` e `Recommended next skill/action`.
28. Como mantenedor, quero `architecture-design` `implemented` de forma consistente no manifest, no contrato e na fonte.
29. Como mantenedor, quero exatamente oito skills `implemented` e dez `scaffold`.
30. Como mantenedor, quero as dependências condicionais de `architecture-design` preservadas e nenhuma dependência nova.
31. Como mantenedor, quero esquema, template, routing, targets e CLI preservados.
32. Como mantenedor, quero o ADR `0001` continuando a tratar só do conjunto de decisões.
33. Como mantenedor, quero a suíte determinística protegendo o catálogo e os esquemas definidos, sem arquivo de teste novo.
34. Como mantenedor, quero os cenários conduzidos por agente registrados fora da suíte Node.
35. Como mantenedor, quero proveniência, README, estado de arquitetura, padrões, estado do projeto e a frase de lifecycle reconciliados com oito skills implementadas.
36. Como revisor, quero validação estrutural, suíte e verificação de espaços em branco com código de saída zero.
37. Como revisor, quero o review final sem achado bloqueante de Standards ou Spec.

## Functional Requirements

1. A skill lê a spec, o contexto do projeto e, quando existem, o modelo de domínio e o relatório de pesquisa. Verbete de glossário não é decisão nem justifica desenho. Valor secreto não é copiado; a evidência registra existência e efeito arquitetural.
2. Contexto do projeto ausente produz o relatório `BLOCKED` e recomenda `context-engineering`. A skill não executa essa skill e não passa a declará-la como dependência.
3. Somente spec com status `ready` autoriza gravar desenho. Spec ausente, `draft`, `blocked` ou `superseded` produz `BLOCKED` e recomenda `to-spec`.
4. O desenho só é gravado quando a spec `ready` afeta fronteira de módulo, interface pública, modelo de dados, contrato de integração, infraestrutura, fronteira de segurança, concorrência, implantação ou comportamento de alto raio de impacto. Mudança que a spec limita de modo que nenhum desses temas se aplica produz `BLOCKED`, não introduz fronteira arquitetural e recomenda `to-tickets`.
5. Modelo de domínio ausente não bloqueia quando a spec não envolve vocabulário de negócio, invariante, transição de estado, evento de negócio ou fronteira de contexto. Quando a spec envolve esses temas e o modelo falta, ou quando um modelo presente não está `ready`, o relatório recomenda `domain-modelling`. Relatório de pesquisa presente que não está `ready`, ou fato externo que ainda altera o desenho, recomenda `research`, sem acesso à rede. Recomendação de modelo ou de pesquisa entra no desenho somente quando a spec já a adotou. A skill não executa a recomendada e não acrescenta dependência. As dependências condicionais já declaradas permanecem.
6. A skill não inventa decisão de negócio nem decisão de arquitetura. Ambiguidade material, premissa que ainda altera o desenho e conflito com decisão existente produzem `BLOCKED` e recomendam `clarify`. A decisão existente permanece. Premissa não vira componente, interface, trade-off nem risco. Alternativa rejeitada não reentra no desenho. A skill não reabre pergunta que a spec, a evidência do repositório ou o contexto do projeto já responde. Seção obrigatória sem conteúdo no insumo registra a ausência e cita o insumo. Ausência evidenciada não é preenchida com exemplo. Decisão durável vira ADR somente quando a spec já registra a decisão, as alternativas e as consequências.
7. Quando o gate passa, a skill grava um único desenho em `.ai/artifacts/architecture/`, com o template e o frontmatter existentes. O status é `ready`. As treze seções obrigatórias estão preenchidas. O frontmatter lista os identificadores dos artefatos consumidos. O arquivo não conserva marcador de rascunho do template. O gate passa quando as restrições existentes foram consideradas, as interfaces estão explícitas, os trade-offs estão documentados, os riscos estão identificados e a estratégia de validação está definida, inclusive por ausência evidenciada.
8. Uma execução posterior do mesmo objetivo atualiza o mesmo desenho e incrementa `version`. O objetivo é o da spec. O desenho que já cita essa spec é o desenho desse objetivo. Não cria duplicata. O conteúdo material só muda quando o insumo consumido mudou. Quando a spec já registra a decisão durável, a skill também grava ou atualiza um ADR `ready` em `.ai/decisions/`, com o template existente, sem modificar o ADR `0001` nem ADR que este objetivo não produziu. Quando a spec não registra essa decisão, a skill não grava ADR e não apaga ADR existente.
9. Quando o gate não passa, a skill não grava desenho `draft`, `blocked` nem parcial, e não grava ADR nesta tentativa. O relatório único traz `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` e `Recommended next skill/action`, e nomeia cada pré-requisito ausente. A skill recomendada é a do bloqueio mais cedo, nesta ordem: contexto do projeto ausente; problema de spec; problema de decisão; fato externo ou pesquisa presente e não `ready`; modelo exigido ou presente e não `ready`; mudança que não justifica desenho. Se os insumos estão `ready` e o gate ainda exige invenção, spec que não fornece a fronteira afetada recomenda `to-spec`; decisão em aberto recomenda `clarify`.
10. A skill encerra no resultado. Informa caminho e status quando houve gravação, se um ADR foi gravado e se `to-tickets` está autorizado. Desenho `ready` autoriza `to-tickets` e não autoriza outra skill. Se o solicitante não pediu passo além do desenho, a skill informa que ele está `ready` e que o consumidor canônico é `to-tickets`. A skill não invoca a recomendada.
11. O catálogo final contém exatamente oito skills `implemented` e dez `scaffold`. `architecture-design` é a oitava, ao lado de `setup-ai-development-skills`, `context-engineering`, `workflow`, `clarify`, `to-spec`, `domain-modelling` e `to-tickets`. As dependências condicionais existentes permanecem, sem itens obrigatórios nem opcionais novos.

## Business Rules

- R9 permanece condicional. A skill não grava desenho quando a mudança não justifica arquitetura.
- R8 permanece condicional. Modelo ausente não bloqueia quando a spec não dispara R8.
- Premissa, questão aberta, questão bloqueante e fato externo permanecem distintos.
- Decisão existente prevalece até que uma nova decisão a substitua explicitamente. Conflito bloqueia o desenho.
- Artefato que não está `ready` não autoriza etapa posterior. Artefato opcional presente que não está `ready` bloqueia.
- `ARCHITECTURE_DESIGN` e `ADR` continuam com esquema definido e os mesmos templates.
- O ADR `0001` continua valendo apenas para a persistência de conjunto de decisões `ready` e `blocked`.
- Dependências condicionais permanecem as já declaradas. Recomendar `context-engineering`, `to-spec`, `clarify`, `research`, `domain-modelling` ou `to-tickets` não cria dependência nem executa a skill.
- Esta emenda é mudança de workflow de uma skill do pacote. Ela não é, por si, uma mudança de arquitetura de produto que exija outro `ARCHITECTURE_DESIGN` antes da decomposição, no mesmo precedente de `SPEC-20261009-002`.

## Non-functional Requirements

- Determinismo: os mesmos insumos produzem o mesmo desenho material. Seções, status e conteúdo registrado não variam. A `version` muda numa execução posterior.
- Auditabilidade: cada elemento do desenho e cada bloqueio cita o insumo usado.
- Portabilidade: a fonte permanece independente de ferramenta e sistema operacional.
- Segurança: o desenho e o ADR não reproduzem segredo.
- Compatibilidade: preservar Node.js >=22, zero dependências npm, 18 skills e quatro targets.

## Technical Constraints

- Alterar somente o necessário para operacionalizar `architecture-design` e registrar a emenda v1-A9.
- Não alterar o contrato de routing, o contrato de artefatos, as sequências canônicas nem os templates de desenho e de ADR.
- Não criar runtime de redação nem executor da skill.
- As únicas escritas próprias de `architecture-design` são o desenho `ready` e, somente quando a spec já registra a decisão durável, o ADR `ready`.
- A regressão determinística estende a asserção de catálogo já existente. Não há arquivo de teste novo.
- Manter LF e CRLF aceitos pelo validador.
- O texto da seção Workflow do contrato e o da fonte são o mesmo.

## Security / Privacy

- Não incluir tokens, credenciais, connection strings nem valores de arquivos de ambiente no desenho nem no ADR.
- Referenciar apenas a existência e o efeito arquitetural de evidências potencialmente sensíveis.
- Não executar ações externas. Recomendar `research` não acessa a rede.

## Acceptance Criteria

1. `architecture-design` está `implemented` de forma consistente no manifest, no contrato e na fonte; o catálogo contém 8 skills `implemented` e 10 `scaffold`, e as dependências condicionais existentes permanecem.
2. Spec `ready` que afeta fronteira de módulo ou interface pública, com contexto do projeto e sem decisão durável, produz um desenho `ready` em `.ai/artifacts/architecture/`, com o template existente e as treze seções obrigatórias preenchidas, e não produz ADR.
3. Spec `ready` que já registra decisão durável, com alternativas e consequências, produz o desenho e um ADR `ready` em `.ai/decisions/`. O ADR `0001` permanece intocado.
4. A execução seguinte do mesmo objetivo atualiza o mesmo desenho, incrementa `version` e não cria duplicata. Conteúdo sustentado pelos mesmos insumos permanece. O ADR da mesma decisão, quando gravado, segue a mesma regra. A skill não apaga ADR.
5. Contexto do projeto ausente produz `BLOCKED`, recomenda `context-engineering` e não grava arquivo.
6. Spec ausente ou não `ready` produz `BLOCKED` e recomenda `to-spec`.
7. Mudança que a spec limita de modo que R9 não se aplica produz `BLOCKED`, nenhum arquivo e a recomendação de `to-tickets`. Verbete de glossário não justifica desenho.
8. Modelo ausente não bloqueia quando R8 não se aplica. Modelo exigido ausente, ou modelo presente que não está `ready`, produz `BLOCKED` e recomenda `domain-modelling`. Recomendação não adotada pela spec fica fora do desenho.
9. Premissa não vira componente, interface, trade-off nem risco. Premissa que ainda altera o desenho, ambiguidade material e conflito com decisão existente produzem `BLOCKED`, recomendam `clarify` e preservam a decisão existente.
10. Fato externo que ainda altera o desenho, ou relatório de pesquisa presente que não está `ready`, produz `BLOCKED` e recomenda `research`, sem acesso à rede.
11. O caminho bloqueado não deixa desenho nem ADR desta tentativa e traz os cinco campos contratados de falha. Vários bloqueios cabem num único relatório, com a skill do bloqueio mais cedo: contexto, spec, decisão, fato externo ou pesquisa não pronta, modelo, mudança que não justifica desenho.
12. A skill informa se `to-tickets` está autorizado e não o invoca. Desenho `ready` autoriza somente `to-tickets`.
13. Segredo não aparece no desenho nem no ADR. O arquivo gravado não conserva marcador de rascunho do template.
14. Esquema, templates, R1–R17, dependências, targets, CLI e as outras skills permanecem inalterados. O ADR `0001` não é estendido. Nenhuma chave nova entra em `.ai/config.json`.
15. A regressão determinística cobre a migração 8/10, as dependências condicionais existentes e a preservação de `ARCHITECTURE_DESIGN` e `ADR` como esquemas definidos, com os templates existentes. Nenhum arquivo de teste novo é adicionado.
16. Os cenários de desenho pronto, ADR opcional, atualização, R9 não aplicável, bloqueio e sigilo ficam em evidência separada dos testes Node.
17. `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
18. Proveniência, README, estado arquitetural, padrões, estado do projeto, frase de lifecycle, evidências e handoff refletem a v1-A9 sem declarar capacidades não verificadas.
19. Review final não contém achado bloqueante de Standards ou Spec.

## Risks

- Instruções em linguagem natural podem delimitar o desenho de modo diferente entre agentes. A citação do insumo e os cenários reduzem essa variação.
- Não gravar desenho bloqueado pode parecer perda de trabalho. O relatório `BLOCKED` e a spec conservam a fronteira para a sessão seguinte.
- Um agente pode ainda assim deixar desenho parcial ou gravar ADR sem decisão durável. Os cenários precisam mostrar o desenho no caminho pronto, o ADR somente no caminho da decisão durável e nenhum arquivo novo no caminho bloqueado.
- Testes estruturais podem ser confundidos com execução da skill. A evidência agent-driven fica registrada separadamente e não certifica os quatro produtos.
- Julgar R9 a partir do glossário, e não da spec `ready`, gravaria desenho para qualquer projeto que tenha `CONTEXT.md`. A spec `ready` é o que dispara a condição.

## Open Questions

Nenhuma questão bloqueante. Executor automático, arquivo de teste novo, alteração de esquema, extensão do ADR `0001` e implementação das outras skills scaffold permanecem fora deste recorte.

## Implementation Decisions

- A mudança será registrada como emenda v1-A9.
- `DECISION-SET-20261009-002` confirma o seam: um único seam de comportamento, a aplicação agent-driven da skill, com a suíte Node apenas acompanhando o catálogo, as dependências condicionais existentes e os esquemas definidos de `ARCHITECTURE_DESIGN` e `ADR`.
- O desenho `ready` é o artefato persistido em todo caminho que passa no gate, no diretório `.ai/artifacts/architecture/` já previsto no contrato de artefatos, com o template existente e um arquivo por objetivo.
- O ADR `ready` é o único arquivo adicional, e somente quando a spec já registra a decisão durável. Essa escolha não altera o ADR `0001`.
- O caminho bloqueado devolve o relatório contratado e não persiste desenho nem ADR.
- A implementação desta emenda foi decomposta em `TICKET-SET-20261009-003`. Os tickets 01 e 02 estão concluídos. A frontier desta spec está vazia.
- Publicação remota fica pendente: `gh` não está no PATH. O Markdown local é a fonte de verdade. Triagem local: `ready-for-agent`.

## Testing Decisions

- Um bom teste observa comportamento externo: insumos entram, desenho `ready` ou relatório `BLOCKED` sai. Não afirma redação interna da skill além do resultado observável.
- O teste determinístico, no seam de catálogo já existente, passa a exigir `architecture-design` entre as skills `implemented`, oito no total e dez `scaffold`, preserva as dependências condicionais e preserva `ARCHITECTURE_DESIGN` e `ADR` com esquema `defined` e os templates atuais. Nenhum executor Node será criado para tornar as instruções executáveis. Nenhum arquivo de teste novo será criado.
- Os cenários conduzidos por agente aplicam o contrato e a fonte em diretório temporário e inspecionam o desenho gravado, o ADR quando couber, ou a ausência de arquivo junto com o relatório. Cobrem desenho pronto, ADR opcional, atualização do mesmo arquivo, R9 não aplicável, contexto ausente, spec não pronta, modelo exigido, pesquisa não pronta, ambiguidade material, fato externo, conflito com decisão existente, sigilo e ausência de invocação.
- O precedente é a asserção de catálogo da v1-A8 e a evidência separada da suíte Node naquela emenda.
- Asserções não serão relaxadas para acomodar a implementação.

## Further Notes

Esta spec satisfaz o gate de especificação: escopo delimitado, critérios verificáveis e nenhuma ambiguidade bloqueante. O conjunto de tickets é `TICKET-SET-20261009-003`. Os tickets 01 e 02 estão concluídos. A frontier desta spec está vazia.

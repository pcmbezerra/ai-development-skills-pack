---
artifact: spec
id: SPEC-20261009-002
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261009-001
  - HANDOFF-20261009-003
  - HANDOFF-20261006-001
  - CONTEXT.md
  - ADR-0001
---

# domain-modelling operacional — emenda v1-A8

## Problem

A skill `domain-modelling` existe apenas como scaffold. O contrato de artefatos, o template de modelo de domínio, a regra R8 e o anti-padrão que proíbe DDD forçado já definem o que um modelo precisa conter, mas a skill ainda não tem instruções operacionais para consumir uma spec ou um conjunto de decisões pronto, gravar o modelo e parar sem inventar decisão nem executar a skill seguinte.

## Goal

Tornar `domain-modelling` operacional para converter uma `SPEC` `ready` ou um `DECISION_SET` `ready`, com contexto do projeto, em um modelo de domínio `ready`, ou devolver o relatório `BLOCKED` sem gravar arquivo quando o gate não puder passar.

## Scope

- Implementar o workflow de modelagem no contrato e na fonte da skill, com o mesmo texto operacional nos dois lugares.
- Migrar `domain-modelling` de `scaffold` para `implemented` no manifest, no contrato e na fonte.
- Consumir uma `SPEC` `ready` ou um `DECISION_SET` `ready`, mais o contexto do projeto. Um dos dois artefatos `ready` basta. O outro, quando ausente, não bloqueia.
- Gravar um único modelo `ready` por objetivo em `.ai/artifacts/domain/`, reutilizando o template e o frontmatter existentes e preenchendo as seções obrigatórias.
- Atualizar o mesmo arquivo e incrementar `version` numa execução posterior do mesmo objetivo.
- Encerrar no modelo, informando caminho, status e se o próximo consumidor canônico está autorizado, sem invocá-lo.
- Devolver o relatório `BLOCKED` contratado, sem gravar modelo, quando o contexto do projeto faltar, quando nem spec nem conjunto estiverem `ready`, quando o insumo `ready` não justificar modelo, quando restar decisão ausente ou fato externo, ou quando o modelo não puder ser preenchido sem invenção.
- Incluir seção opcional de DDD somente quando o insumo `ready` já a justificar.
- Manter o ADR `0001` restrito ao conjunto de decisões.
- Estender a regressão estrutural de catálogo já existente e executar os cenários da skill por agente, separados da suíte Node.
- Registrar a mudança como emenda v1-A8 e reconciliar a documentação que declara a contagem de skills.

## Non-goals

- Criar executor JavaScript, redator automático de modelo ou nova dependência npm.
- Criar arquivo de teste novo. A suíte Node só acompanha o catálogo e o esquema já definido de `DOMAIN_MODEL`.
- Alterar o esquema, o template, as seções obrigatórias ou o produtor de `DOMAIN_MODEL`.
- Acrescentar chave de caminho em `.ai/config.json`. O diretório usado é o layout já recomendado em `contracts/artifacts.md`.
- Alterar R1–R17, sequências canônicas, responsabilidades das outras skills ou dependências do manifest.
- Acrescentar dependência obrigatória, condicional ou opcional a `domain-modelling`. Recomendação não é composição.
- Estender o ADR `0001` para modelo bloqueado, rascunho ou modelo ausente.
- Gravar modelo `draft`, `blocked` ou parcial.
- Forçar entidade, objeto de valor, agregado, serviço de domínio, evento de domínio ou bounded context.
- Implementar `architecture-design`, `research`, `to-tickets`, `implement` ou qualquer outra skill scaffold.
- Invocar a skill recomendada.
- Gravar `CONTEXT.md`, ADR, spec, conjunto de decisões ou código da aplicação como saída de `domain-modelling`.
- Adicionar comando CLI ou target.
- Certificar execução real em Cursor, Codex, Gemini Antigravity ou Claude Code.
- Produzir o modelo de domínio desta emenda. O glossário local não substitui `DOMAIN_MODEL`.

## Actors

- Solicitante que já tem uma `SPEC` `ready` ou um `DECISION_SET` `ready` e quer um modelo de domínio.
- Agente de IA que executa a skill `domain-modelling`.
- `SPEC` `ready` ou `DECISION_SET` `ready`.
- Contexto do projeto.
- Decisões existentes em ADR, em conjunto de decisões e no contexto do projeto.
- Consumidores posteriores `architecture-design`, quando R9 se aplica, e `to-tickets`, quando não se aplica.

## User Stories

1. Como solicitante com `SPEC` `ready` que envolve vocabulário de negócio ou invariante, quero receber um modelo `ready`, para que o próximo passo consuma conceitos já registrados.
2. Como solicitante com `DECISION_SET` `ready` e sem spec, quero o mesmo resultado, para que o contrato continue aceitando qualquer um dos dois insumos.
3. Como solicitante, quero as seções Ubiquitous Language, Business Concepts, Relationships, Invariants, State Transitions, Business Events, Context Boundaries e Ambiguities preenchidas, para que o contrato de artefato possa ser avaliado no arquivo.
4. Como solicitante, quero ausência de transição, evento ou fronteira registrada como ausência evidenciada, para que a seção obrigatória não seja inventada.
5. Como solicitante, quero seção opcional de DDD somente quando o insumo `ready` já justificar o constructo, para que o anti-padrão de DDD forçado continue valendo.
6. Como solicitante, quero uma segunda execução do mesmo objetivo atualizando o mesmo arquivo e incrementando `version`, para que a rastreabilidade permaneça num único artefato.
7. Como solicitante, quero o modelo alterado somente quando o insumo consumido tiver mudado, para que conteúdo já sustentado não seja reescrito em silêncio.
8. Como solicitante, quero o frontmatter citando os identificadores dos artefatos consumidos, para que a proveniência seja inspecionável.
9. Como solicitante, quero a skill encerrando no modelo e informando caminho, status e se o próximo consumidor está autorizado, para que eu decida a etapa seguinte.
10. Como solicitante que só pediu o modelo, quero o relatório de que ele está `ready` e de qual é o consumidor canônico, para que a recomendação não vire execução.
11. Como solicitante, quero `architecture-design` recomendada quando R9 se aplica, e `to-tickets` quando não se aplica, para que a skill recomende no máximo o primeiro consumidor aplicável.
12. Como solicitante, quero a skill recomendada não invocada, para que `domain-modelling` não comece o desenho nem os tickets.
13. Como solicitante sem contexto do projeto, quero o relatório `BLOCKED` recomendando `context-engineering` e nenhum arquivo, para que a skill não invente o contexto nem passe a depender dessa skill.
14. Como solicitante sem spec e sem conjunto `ready`, quero o relatório `BLOCKED` recomendando `clarify` e nenhum arquivo, para que o bloqueio mais cedo seja o conjunto de decisões.
15. Como solicitante com spec ausente, `draft`, `blocked` ou `superseded` e sem conjunto `ready`, quero o relatório `BLOCKED` recomendando `clarify`, nomeando também a spec, e nenhum arquivo.
16. Como solicitante com conjunto ausente, `draft`, `blocked` ou `superseded` e sem spec `ready`, quero o relatório `BLOCKED` recomendando `clarify` e nenhum arquivo.
17. Como solicitante com um insumo `ready` e o outro ausente, quero o modelo gravado, para que a alternativa ausente não bloqueie.
18. Como solicitante cuja mudança o insumo limita a CRUD ou infraestrutura, ou que não envolve vocabulário, invariante, transição, evento ou fronteira, quero `BLOCKED`, nenhum arquivo e a recomendação do próximo consumidor, para que a skill não force um modelo.
19. Como solicitante, quero verbete de glossário sem justificar modelo, para que o glossário local não dispare R8.
20. Como solicitante, quero uma premissa permanecendo premissa e fora do modelo, para que uma suposição não vire conceito nem invariante.
21. Como solicitante, quero uma premissa que ainda altera o modelo produzindo `BLOCKED` e a recomendação de `clarify`.
22. Como solicitante, quero uma ambiguidade material produzindo `BLOCKED` e a recomendação de `clarify`.
23. Como solicitante, quero conflito com decisão existente produzindo `BLOCKED`, a recomendação de `clarify` e a decisão preservada.
24. Como solicitante, quero alternativa rejeitada fora do modelo.
25. Como solicitante, quero pergunta já respondida pelo insumo, pelo repositório ou pelo contexto do projeto sem ser reaberta.
26. Como solicitante, quero um fato externo que ainda altera o modelo produzindo `BLOCKED` e a recomendação de `research`, sem acesso à rede.
27. Como solicitante, quero um único relatório `BLOCKED` nomeando cada pré-requisito ausente e recomendando a skill do bloqueio mais cedo, nesta ordem: contexto do projeto, conjunto de decisões, spec, fato externo, mudança que não justifica modelo.
28. Como solicitante, quero nenhum arquivo quando o gate falha, inclusive depois de entendimento parcial.
29. Como solicitante, quero valores secretos omitidos, com registro apenas de existência e efeito arquitetural.
30. Como solicitante, quero no caminho bloqueado os campos `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` e `Recommended next skill/action`.
31. Como mantenedor, quero `domain-modelling` `implemented` de forma consistente no manifest, no contrato e na fonte.
32. Como mantenedor, quero exatamente sete skills `implemented` e onze `scaffold`.
33. Como mantenedor, quero as dependências de `domain-modelling` continuando vazias.
34. Como mantenedor, quero esquema, template, routing, targets e CLI preservados.
35. Como mantenedor, quero o ADR `0001` continuando a tratar só do conjunto de decisões.
36. Como mantenedor, quero a suíte determinística protegendo o catálogo e o esquema definido de `DOMAIN_MODEL`, sem arquivo de teste novo.
37. Como mantenedor, quero os cenários conduzidos por agente registrados fora da suíte Node.
38. Como mantenedor, quero proveniência, README, estado de arquitetura, padrões, estado do projeto e a frase de lifecycle reconciliados com sete skills implementadas.
39. Como revisor, quero validação estrutural, suíte e verificação de espaços em branco com código de saída zero.
40. Como revisor, quero o review final sem achado bloqueante de Standards ou Spec.

## Functional Requirements

1. A skill lê a spec ou o conjunto de decisões, e o contexto do projeto. Verbete de glossário não é decisão nem justifica modelo. Valor secreto não é copiado; a evidência registra existência e efeito arquitetural.
2. Contexto do projeto ausente produz o relatório `BLOCKED` e recomenda `context-engineering`. A skill não executa essa skill e não passa a declará-la como dependência.
3. Somente spec ou conjunto com status `ready` autoriza gravar modelo. Se nenhum dos dois está `ready`, o relatório `BLOCKED` recomenda o bloqueio mais cedo: problema de conjunto recomenda `clarify`; problema de spec recomenda `to-spec`. Insumo ausente não bloqueia quando o outro está `ready`.
4. O modelo só é gravado quando o insumo `ready` envolve vocabulário de negócio, invariante, transição de estado, evento de negócio ou fronteira de contexto. Mudança que o insumo limita a CRUD ou infraestrutura, ou que não envolve esses temas, produz `BLOCKED`, não introduz constructo de DDD e recomenda `architecture-design` quando R9 se aplica, senão `to-tickets`.
5. A skill não inventa decisão de negócio nem decisão de arquitetura. Ambiguidade material, premissa que ainda altera o modelo e conflito com decisão existente produzem `BLOCKED` e recomendam `clarify`. A decisão existente permanece. Premissa não vira conceito, relação nem invariante. Alternativa rejeitada não reentra no modelo. Fato externo que ainda altera o modelo produz `BLOCKED` e recomenda `research`, sem acesso à rede e sem nova dependência.
6. A skill não reabre pergunta que o insumo `ready`, a evidência do repositório ou o contexto do projeto já responde. Linguagem, conceitos, relações, invariantes, transições, eventos, fronteiras e ambiguidades ficam limitados a esses insumos. Seção opcional de DDD entra somente quando o insumo `ready` já justifica o constructo. Ausência não evidenciada não é preenchida com exemplo.
7. Quando o gate passa, a skill grava um único arquivo em `.ai/artifacts/domain/`, com o template e o frontmatter existentes. O status é `ready`. As oito seções obrigatórias estão preenchidas. O frontmatter lista os identificadores dos artefatos consumidos. O arquivo não conserva marcador de rascunho do template.
8. Uma execução posterior do mesmo objetivo atualiza o mesmo arquivo e incrementa `version`. O objetivo é o da spec `ready` ou, na ausência dela, o do conjunto `ready`. O modelo que já cita esse insumo é o modelo desse objetivo. Não cria duplicata. O conteúdo material só muda quando o insumo consumido mudou.
9. Quando o gate não passa, a skill não grava modelo `draft`, `blocked` nem parcial. O relatório único traz `Status: BLOCKED`, `Reason`, `Evidence`, `Missing prerequisite` e `Recommended next skill/action`, e nomeia cada pré-requisito ausente. A skill recomendada é a do bloqueio mais cedo, nesta ordem: contexto do projeto ausente; problema de conjunto de decisões; problema de spec; fato externo; mudança que não justifica modelo.
10. A skill encerra no resultado. Informa caminho e status quando houve gravação, e se o próximo consumidor está autorizado. Modelo `ready` autoriza `architecture-design` quando R9 se aplica e, caso contrário, `to-tickets`. Se o solicitante não pediu passo além do modelo, a skill informa que ele está `ready` e qual é o consumidor canônico. A skill não invoca a recomendada.
11. O catálogo final contém exatamente sete skills `implemented` e onze `scaffold`. `domain-modelling` é a sétima, ao lado de `setup-ai-development-skills`, `context-engineering`, `workflow`, `clarify`, `to-spec` e `to-tickets`. As dependências de `domain-modelling` permanecem sem itens obrigatórios, condicionais ou opcionais.

## Business Rules

- R8 permanece condicional. A skill não grava modelo quando a mudança não justifica modelagem.
- O anti-padrão permanece: `domain-modelling` não força padrão de DDD.
- Premissa, questão aberta, questão bloqueante e fato externo permanecem distintos.
- Decisão existente prevalece até que uma nova decisão a substitua explicitamente. Conflito bloqueia o modelo.
- Artefato que não está `ready` não autoriza etapa posterior.
- `DOMAIN_MODEL` continua com esquema definido e o mesmo template. As seções opcionais continuam opcionais.
- O ADR `0001` continua valendo apenas para a persistência de conjunto de decisões `ready` e `blocked`.
- Dependências vazias permanecem vazias. Recomendar `context-engineering`, `clarify`, `to-spec`, `research`, `architecture-design` ou `to-tickets` não cria dependência nem executa a skill.
- Esta emenda é mudança de workflow de uma skill do pacote. Ela não é, por si, uma mudança de domínio de produto que exija outro `DOMAIN_MODEL` antes da decomposição, no mesmo precedente de `SPEC-20261009-001`.

## Non-functional Requirements

- Determinismo: os mesmos insumos produzem o mesmo modelo material. Seções, status e conteúdo registrado não variam.
- Auditabilidade: cada conceito e cada bloqueio cita o insumo usado.
- Portabilidade: a fonte permanece independente de ferramenta e sistema operacional.
- Segurança: o modelo não reproduz segredo.
- Compatibilidade: preservar Node.js >=22, zero dependências npm, 18 skills e quatro targets.

## Technical Constraints

- Alterar somente o necessário para operacionalizar `domain-modelling` e registrar a emenda v1-A8.
- Não alterar o contrato de routing, o contrato de artefatos, as sequências canônicas nem o template de modelo de domínio.
- Não criar runtime de redação nem executor da skill.
- A única escrita própria de `domain-modelling` é o modelo `ready`.
- A regressão determinística estende a asserção de catálogo já existente. Não há arquivo de teste novo.
- Manter LF e CRLF aceitos pelo validador.
- O texto da seção Workflow do contrato e o da fonte são o mesmo.

## Security / Privacy

- Não incluir tokens, credenciais, connection strings nem valores de arquivos de ambiente no modelo.
- Referenciar apenas a existência e o efeito arquitetural de evidências potencialmente sensíveis.
- Não executar ações externas. Recomendar `research` não acessa a rede.

## Acceptance Criteria

1. `domain-modelling` está `implemented` de forma consistente no manifest, no contrato e na fonte; o catálogo contém 7 skills `implemented` e 11 `scaffold`, e as dependências de `domain-modelling` continuam vazias.
2. Spec `ready` que envolve vocabulário ou invariante, com contexto do projeto e sem R9, produz um modelo `ready` em `.ai/artifacts/domain/`, com o template existente e as oito seções obrigatórias preenchidas. Conjunto ausente não bloqueia.
3. Conjunto `ready` sem spec produz o mesmo tipo de modelo. Spec ausente não bloqueia.
4. Seção opcional de DDD aparece somente quando o insumo `ready` já justifica o constructo. Mudança limitada a CRUD ou infraestrutura, ou sem tema de R8, produz `BLOCKED`, nenhum arquivo e nenhuma seção de DDD.
5. A execução seguinte do mesmo objetivo atualiza o mesmo arquivo, incrementa `version` e não cria duplicata. Conteúdo sustentado pelos mesmos insumos permanece.
6. Contexto do projeto ausente produz `BLOCKED`, recomenda `context-engineering` e não grava modelo.
7. Nenhum insumo `ready` produz `BLOCKED` e recomenda o bloqueio mais cedo. Conjunto ausente ou não `ready`, com a spec também não `ready`, recomenda `clarify` e nomeia os dois. `to-spec` só é recomendado quando a spec é o bloqueio mais cedo que resta.
8. Premissa não vira conceito nem invariante. Premissa que ainda altera o modelo, ambiguidade material e conflito com decisão existente produzem `BLOCKED`, recomendam `clarify` e preservam a decisão existente.
9. Fato externo que ainda altera o modelo produz `BLOCKED` e recomenda `research`, sem acesso à rede.
10. O caminho bloqueado não deixa arquivo e traz os cinco campos contratados de falha. Vários bloqueios cabem num único relatório, com a skill do bloqueio mais cedo: contexto, conjunto, spec, fato externo, mudança que não justifica modelo.
11. A skill informa se o próximo consumidor está autorizado e não o invoca. Modelo `ready` autoriza `architecture-design` quando R9 se aplica e, caso contrário, somente `to-tickets`.
12. Segredo não aparece no modelo gravado. O arquivo gravado não conserva marcador de rascunho do template. Verbete de glossário não justifica modelo.
13. Esquema, template, R1–R17, dependências, targets, CLI e as outras skills permanecem inalterados. O ADR `0001` não é estendido. Nenhuma chave nova entra em `.ai/config.json`.
14. A regressão determinística cobre a migração 7/11, as dependências vazias e a preservação de `DOMAIN_MODEL` como esquema definido, com o template existente. Nenhum arquivo de teste novo é adicionado.
15. Os cenários de modelo pronto, atualização, insumo alternativo, DDD não forçado, bloqueio e sigilo ficam em evidência separada dos testes Node.
16. `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
17. Proveniência, README, estado arquitetural, padrões, estado do projeto, frase de lifecycle, evidências e handoff refletem a v1-A8 sem declarar capacidades não verificadas.
18. Review final não contém achado bloqueante de Standards ou Spec.

## Risks

- Instruções em linguagem natural podem delimitar o modelo de modo diferente entre agentes. O glossário, a citação do insumo e os cenários reduzem essa variação.
- Não gravar modelo bloqueado pode parecer perda de trabalho. O relatório `BLOCKED` e o insumo conservam a fronteira para a sessão seguinte.
- Um agente pode ainda assim deixar modelo parcial ou preencher seção opcional sem justificativa. Os cenários precisam mostrar um único arquivo novo no caminho pronto e nenhum arquivo novo no caminho bloqueado.
- Testes estruturais podem ser confundidos com execução da skill. A evidência agent-driven fica registrada separadamente e não certifica os quatro produtos.
- Julgar R8 a partir do glossário, e não do insumo `ready`, gravaria modelo para qualquer projeto que tenha `CONTEXT.md`. O insumo `ready` é o que dispara a condição.

## Open Questions

Nenhuma questão bloqueante. Executor automático, arquivo de teste novo, alteração de esquema, extensão do ADR `0001` e implementação das outras skills scaffold permanecem fora deste recorte.

## Implementation Decisions

- A mudança será registrada como emenda v1-A8.
- `DECISION-SET-20261009-001` confirma o seam: um único seam de comportamento, a aplicação agent-driven da skill, com a suíte Node apenas acompanhando o catálogo, as dependências vazias e o esquema definido de `DOMAIN_MODEL`.
- O modelo `ready` é o único artefato persistido pela skill, no diretório `.ai/artifacts/domain/` já previsto no contrato de artefatos, com o template existente e um arquivo por objetivo.
- O caminho bloqueado devolve o relatório contratado e não persiste modelo. Essa escolha não altera o ADR `0001`.
- Spec e conjunto são insumos alternativos. Ausência de um não bloqueia quando o outro está `ready`.
- A implementação desta emenda foi decomposta em `TICKET-SET-20261009-002`. Os tickets 01 e 02 estão concluídos. A frontier desta spec está vazia.
- Publicação remota ficou pendente: `gh` não está no PATH. O Markdown local é a fonte de verdade. Triagem local: `ready-for-agent`.

## Testing Decisions

- Um bom teste observa comportamento externo: insumos entram, modelo `ready` ou relatório `BLOCKED` sai. Não afirma redação interna da skill além do resultado observável.
- O teste determinístico, no seam de catálogo já existente, passa a exigir `domain-modelling` entre as skills `implemented`, sete no total e onze `scaffold`, preserva as dependências vazias e preserva `DOMAIN_MODEL` com esquema definido e o template atual. Nenhum executor Node será criado para tornar as instruções executáveis. Nenhum arquivo de teste novo será criado.
- Os cenários conduzidos por agente aplicam o contrato e a fonte em diretório temporário e inspecionam o modelo gravado ou a ausência de arquivo junto com o relatório. Cobrem modelo pronto a partir de spec, modelo pronto a partir de conjunto, atualização do mesmo arquivo, DDD não forçado, CRUD ou infraestrutura, contexto ausente, insumos não prontos, ambiguidade material, fato externo, conflito com decisão existente, sigilo e ausência de invocação.
- O precedente é a asserção de catálogo da v1-A7 e a evidência separada da suíte Node naquela emenda.
- Asserções não serão relaxadas para acomodar a implementação.

## Further Notes

Esta spec satisfaz o gate de especificação: escopo delimitado, critérios verificáveis e nenhuma ambiguidade bloqueante. O conjunto de tickets é `TICKET-SET-20261009-002`. Os tickets 01 e 02 estão concluídos. A frontier desta spec está vazia.

O review `REVIEW-20261009-002` reconciliou a história 15 com o bloqueio mais cedo: conjunto ausente e spec não pronta recomendam `clarify` e nomeiam os dois. `to-spec` permanece a recomendação somente quando a spec é o bloqueio mais cedo que resta.

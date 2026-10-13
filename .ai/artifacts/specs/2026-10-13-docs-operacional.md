---
artifact: spec
id: SPEC-20261013-005
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261013-005
  - HANDOFF-20261013-004
  - HANDOFF-20261006-001
  - SPEC-20261013-004
  - CONTEXT.md
  - ADR-0001
---

# docs operacional — emenda v1-A16

## Problem

A skill `docs` existe apenas como scaffold. O contrato, o gate de documentação e a regra R14 já separam documentação verificada de estado inventado, mas a skill não tem instruções operacionais para gravar `DOC_UPDATE` `ready` e para devolver `BLOCKED` sem arquivo quando o gate não passa.

## Goal

Tornar `docs` operacional na emenda v1-A16. Quando invocada, a skill cria ou atualiza documentação a partir de evidência, grava `DOC_UPDATE` `ready` e devolve `BLOCKED` sem arquivo e sem mudança desta tentativa quando o gate não passa.

## Scope

- Implementar o workflow de `docs` no contrato e na fonte, com o mesmo texto operacional nos dois lugares. Evidência: `DECISION-SET-20261013-005` e a regra de status `implemented` em `contracts/skill-contract.md`.
- Migrar `docs` de `scaffold` para `implemented` no manifest, no contrato e na fonte.
- Consumir evidência do repositório, `CHANGE_SET` citado como working tree, spec opcional, desenho de arquitetura opcional e documentação existente.
- Atualizar documentação sob o `docsPath` seguro, e `README.md` na raiz somente quando o objetivo nomeia esse arquivo.
- Gravar um `DOC_UPDATE` `ready` por objetivo, com o template existente, `created_by: docs` e as seções obrigatórias preenchidas, em `.ai/artifacts/documentation/`.
- Não inventar estado de implementação. Comportamento atual sai só da evidência. Desenho futuro fica marcado como desenho futuro.
- Uma execução posterior do mesmo objetivo atualiza o mesmo arquivo e incrementa `version`. Não apaga atualização existente e não reescreve arquivo cujo `created_by` não seja `docs`.
- O caminho bloqueado devolve o relatório `BLOCKED` contratado, sem arquivo e sem mudança desta tentativa. Mudança de documentação já aplicada nesta tentativa é revertida antes do retorno.
- Manter o produtor, o esquema, o template e as seções obrigatórias de `DOC_UPDATE`.
- Manter as listas de dependência vazias de `docs`.
- Estender a regressão estrutural de catálogo já existente e executar os cenários da skill por agente, separados da suíte Node.
- Registrar a mudança como emenda v1-A16 e reconciliar a documentação que declara a contagem de skills.

## Non-goals

- Criar executor JavaScript, redator automático ou nova dependência npm.
- Criar arquivo de teste novo. A suíte Node só acompanha o catálogo, as listas de dependência vazias e o esquema já definido de `DOC_UPDATE`.
- Alterar o esquema, o template ou as seções obrigatórias de `DOC_UPDATE`.
- Alterar a linha de produtor de `DOC_UPDATE`. O produtor já é `docs`.
- Acrescentar chave de caminho em `.ai/config.json`. O diretório usado é o layout já recomendado `.ai/artifacts/documentation/`.
- Alterar R1–R17, sequências canônicas ou as dependências do manifest.
- Fazer `implement` ou `refactor` invocarem `docs`, ou reabrir `SPEC-20261013-004`, `SPEC-20261013-003`, `SPEC-20261013-002`, `SPEC-20261013-001`, `SPEC-20261010-001` ou `SPEC-20261009-004`.
- Estender ou modificar o ADR `0001`.
- Reescrever `references/architecture-contract-v1.md`.
- Gravar `DOC_UPDATE` `draft`, `blocked` ou parcial.
- Apagar atualização ou documentação existente.
- Invocar `implement`, `code-review`, `handoff` ou qualquer outra skill a partir de `docs`.
- Implementar `edge-case-analysis`, `modernize` ou qualquer outra skill scaffold.
- Adicionar comando CLI ou target.
- Certificar descoberta real em Cursor, Codex, Gemini Antigravity ou Claude Code.
- Produzir modelo de domínio ou desenho de arquitetura desta emenda.

## Actors

- Solicitante que invoca `docs`.
- Agente de IA que executa a skill invocada.
- Objetivo documental, evidência do repositório, contexto do projeto e documentação existente.

## Functional Requirements

1. `docs`, quando invocada, lê o contexto do projeto, o objetivo, a evidência, o working tree, a spec quando presente, o desenho quando presente e a documentação existente. Não copia valor secreto. A invocação é um impacto documental delimitado sob R14. Evidência: `DECISION-SET-20261013-005` e R14.
2. Quando o gate passa, a skill atualiza a documentação para o estado verificado, não grava arquivo de `CHANGE_SET` e cita `working tree`. Grava um `DOC_UPDATE` `ready`, com o template existente, `created_by: docs` e as seções obrigatórias. Evidência: `DECISION-SET-20261013-005`.
3. A execução seguinte do mesmo objetivo, com insumos iguais, atualiza o mesmo arquivo, incrementa `version` e não reescreve documentação que já confere. Evidência: `DECISION-SET-20261013-005`.
4. O mesmo objetivo, com o insumo alterado, atualiza o mesmo arquivo a partir da versão 1 e aplica só o acréscimo documental. Evidência: `DECISION-SET-20261013-005`.
5. Contexto do projeto ausente produz `BLOCKED`, recomenda `context-engineering` e não grava arquivo. Configuração ausente, inválida ou com `docsPath` que escapa da raiz produz `BLOCKED`, recomenda `setup-ai-development-skills` e não escreve fora da raiz. Evidência: `DECISION-SET-20261013-005`.
6. Objetivo ausente ou não delimitado produz `BLOCKED` e recomenda `clarify`. Pedido cujo propósito é mudar comportamento produz `BLOCKED` e recomenda `implement`. Falha de causa desconhecida produz `BLOCKED` e recomenda `diagnose`. Pedido estrutural com comportamento estável produz `BLOCKED` e recomenda `refactor`. Pedido de modernização produz `BLOCKED` e recomenda `modernize`. Evidência: `DECISION-SET-20261013-005`, R5, R6, R15 e R16.
7. Conflito com decisão existente, inclusive o ADR `0001`, produz `BLOCKED`, recomenda `clarify` e preserva a decisão. Pesquisa presente fora de `ready`, ou fato externo que ainda pode mudar a documentação, produz `BLOCKED` e recomenda `research`, sem acesso à rede. Evidência: `DECISION-SET-20261013-005`.
8. Spec ausente não bloqueia quando a evidência do repositório já mostra o que documentar. Spec nomeada ou presente que a documentação usaria, e que não está `ready`, produz `BLOCKED` e recomenda `to-spec`. O mesmo vale para desenho de arquitetura e `architecture-design`. Evidência: `DECISION-SET-20261013-005`.
9. Alegação sem evidência não entra como comportamento atual. Quando nenhuma afirmação verificada permanece, o resultado é `BLOCKED` e não grava arquivo. Desenho futuro de spec ou desenho `ready` entra só marcado como desenho futuro. Evidência: a seção 7.12 e `DECISION-SET-20261013-005`.
10. Documentação que já confere com a evidência permanece byte a byte. O `DOC_UPDATE` `ready` lista o arquivo em Files Considered but Unchanged. Evidência: o gate de documentação.
11. Valor secreto citado no insumo não aparece na documentação nem no `DOC_UPDATE`. Evidência: o contrato compartilhado.
12. Bloqueios combinados nomeiam cada pré-requisito e recomendam o mais cedo. A tentativa bloqueada não apaga atualização ou documentação já existente. A skill não reescreve arquivo cujo `created_by` não seja `docs`. Evidência: o contrato de falha e `DECISION-SET-20261013-005`.
13. `docs` não invoca outra skill. Atualização pronta não autoriza implementação. A skill não grava o glossário, `CONTEXT.md` nem outro artefato, e não estende o ADR `0001`. Evidência: `DECISION-SET-20261013-005`.
14. O catálogo final contém exatamente dezesseis skills `implemented` e duas `scaffold`. `docs` junta-se às quinze já implementadas. As duas que permanecem `scaffold` são `edge-case-analysis` e `modernize`. As listas de dependência de `docs` permanecem vazias. Evidência: `DECISION-SET-20261013-005`.

## Business Rules

- R14 permanece a regra de uso. O anti-padrão que proíbe descrição de arquitetura inventada permanece.
- Premissa, questão aberta, questão bloqueante e fato externo permanecem distintos.
- Decisão existente prevalece. Conflito com o ADR `0001` bloqueia e preserva o ADR.
- Artefato que não está `ready` não autoriza a documentação que dependeria dele.
- `DOC_UPDATE` continua com esquema definido e o mesmo template. `CHANGE_SET` continua named-only.
- O ADR `0001` continua valendo apenas para a persistência de conjunto de decisões `ready` e `blocked`.
- Recomendar outra skill não cria dependência nem executa a skill.
- Esta emenda operacionaliza uma skill do pacote. Ela não exige `DOMAIN_MODEL` nem `ARCHITECTURE_DESIGN`, no mesmo precedente de `SPEC-20261013-004`.

## Non-functional Requirements

- Determinismo: os mesmos insumos produzem as mesmas seções materiais. A `version` muda numa execução posterior.
- Auditabilidade: cada bloqueio cita o insumo usado. O frontmatter lista os identificadores consumidos.
- Portabilidade: a fonte permanece independente de ferramenta e sistema operacional.
- Segurança: a documentação e o `DOC_UPDATE` não reproduzem segredo e não escrevem fora da raiz.
- Compatibilidade: preservar Node.js >=22, zero dependências npm, 18 skills e quatro targets.

## Technical Constraints

- Alterar somente o necessário para operacionalizar `docs` e registrar a emenda v1-A16.
- Não alterar o contrato de routing, as sequências canônicas, o template nem `contracts/artifacts.md`.
- Não criar runtime nem executor da skill.
- A escrita própria de `docs` é o `DOC_UPDATE` `ready` e a mudança de documentação sob o caminho seguro.
- A regressão determinística estende a asserção de catálogo já existente. Não há arquivo de teste novo.
- Manter LF e CRLF aceitos pelo validador.
- O texto da seção Workflow do contrato e o da fonte são o mesmo.

## Security / Privacy

- Não incluir tokens, credenciais, connection strings nem valores de arquivos de ambiente na documentação ou no `DOC_UPDATE`.
- Referenciar apenas a existência e o efeito de evidências potencialmente sensíveis.
- Não executar ações externas. A skill não acessa a rede e não escreve fora da raiz.

## Acceptance Criteria

1. `docs` está `implemented` de forma consistente no manifest, no contrato e na fonte. O catálogo contém 16 skills `implemented` e 2 `scaffold`. As listas de dependência permanecem vazias.
2. Objetivo documental delimitado, com contexto, configuração segura e evidência que diverge da documentação, produz `DOC_UPDATE` `ready` com `created_by: docs`, a documentação atualizada, nenhum arquivo de `CHANGE_SET` e nenhuma autorização de implementação.
3. A execução seguinte do mesmo objetivo, com insumos iguais, atualiza o mesmo arquivo e incrementa `version`, sem segunda edição da documentação.
4. O mesmo objetivo, com o insumo alterado, atualiza o mesmo arquivo a partir da versão 1 e aplica só o acréscimo documental.
5. Contexto ausente produz `BLOCKED`, recomenda `context-engineering` e não grava arquivo.
6. Configuração com `docsPath` que escapa da raiz produz `BLOCKED`, recomenda `setup-ai-development-skills` e não escreve fora da raiz.
7. Objetivo ausente produz `BLOCKED` e recomenda `clarify`.
8. Pedido de mudança de comportamento produz `BLOCKED` e recomenda `implement`.
9. Falha de causa desconhecida produz `BLOCKED` e recomenda `diagnose`.
10. Pedido estrutural produz `BLOCKED` e recomenda `refactor`.
11. Pedido de modernização produz `BLOCKED` e recomenda `modernize`.
12. Conflito com o ADR `0001` produz `BLOCKED`, recomenda `clarify` e preserva o ADR.
13. Alegação sem evidência produz `BLOCKED` e recomenda `research`, sem acesso à rede.
14. Spec nomeada que não está `ready` produz `BLOCKED` e recomenda `to-spec`.
15. Desenho futuro de spec `ready`, pedido pelo objetivo, fica marcado como desenho futuro e não como comportamento atual.
16. Desenho de arquitetura que não está `ready` produz `BLOCKED` e recomenda `architecture-design`.
17. Pesquisa presente que não está `ready` produz `BLOCKED` e recomenda `research`.
18. Documentação que já confere permanece byte a byte, e o `DOC_UPDATE` a lista como inalterada.
19. Valor secreto citado no insumo não aparece na documentação nem no `DOC_UPDATE`.
20. Bloqueios combinados nomeiam cada pré-requisito e recomendam o mais cedo. A tentativa bloqueada não apaga arquivo existente nem altera documentação desta tentativa.
21. `docs` não invoca outra skill. Atualização pronta não autoriza implementação.
22. A skill não reescreve atualização de outro `created_by`, não grava glossário nem `CONTEXT.md`, e não estende o ADR `0001`.
23. Esquema, template, R1–R17, dependências, targets, CLI, a linha de produtor e as outras skills permanecem inalterados. O ADR `0001` não é estendido. Nenhuma chave nova entra em `.ai/config.json`. `implement` e `refactor` não passam a invocar `docs`.
24. A regressão determinística cobre a migração 16/2, as listas de dependência vazias e a preservação do esquema e do template de `DOC_UPDATE`. Nenhum arquivo de teste novo é adicionado.
25. Os cenários de atualização, desenho futuro, bloqueio e sigilo ficam em evidência separada dos testes Node.
26. `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
27. Proveniência, README, estado arquitetural, padrões, estado do projeto, frase de lifecycle, evidências e handoff refletem a v1-A16 sem declarar capacidades não verificadas.

## Risks

- Tratar desenho futuro como comportamento atual inventaria estado. O texto precisa da marcação explícita.
- Um `docsPath` que escapa da raiz escreveria fora do repositório. A tentativa bloqueia antes de escrever.
- Um agente pode copiar segredo, gravar arquivo de `CHANGE_SET` ou reescrever contexto do projeto. Os cenários precisam mostrar a omissão e a única escrita.
- Testes estruturais podem ser confundidos com execução da skill. A evidência agent-driven fica registrada separadamente e não certifica os quatro produtos.

## Open Questions

Nenhuma questão bloqueante. Descoberta real nos quatro produtos e reconciliação com GitHub Issues continuam sem verificação e não alteram este recorte. Executor automático, arquivo de teste novo, alteração de esquema, extensão do ADR `0001` e implementação das outras duas skills scaffold permanecem fora deste recorte.

## Testing Decisions

- Um bom teste observa comportamento externo: insumos entram, `DOC_UPDATE` `ready` sai com a documentação atualizada, ou o relatório `BLOCKED` sai sem arquivo e sem mudança desta tentativa. Não afirma redação interna da skill além do resultado observável.
- O teste determinístico, no seam de catálogo já existente, passa a exigir `docs` entre as skills `implemented`, dezesseis no total e duas `scaffold`, preserva as listas de dependência vazias e preserva o esquema e o template atuais de `DOC_UPDATE`. Os casos negativos que usavam `docs` como amostra scaffold passam a usar `edge-case-analysis`, que permanece scaffold. Nenhum executor Node será criado. Nenhum arquivo de teste novo será criado.
- Os cenários conduzidos por agente aplicam o contrato e a fonte em diretório temporário e inspecionam o `DOC_UPDATE` e a árvore, ou a ausência de arquivo junto com o relatório `BLOCKED`. Cobrem atualização, repetição, desenho futuro, bloqueio e sigilo.
- O precedente é a asserção de catálogo da v1-A15 e a evidência separada da suíte Node naquela emenda.
- Asserções não serão relaxadas para acomodar a implementação.

## Further Notes

Esta spec satisfaz o gate de especificação: escopo delimitado, critérios verificáveis e nenhuma ambiguidade bloqueante. R8 e R9 não se aplicam. O conjunto de tickets é `TICKET-SET-20261013-005`. Os tickets 01 e 02 estão concluídos. A frontier desta spec está vazia.

---
artifact: spec
id: SPEC-20261013-007
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261013-007
  - HANDOFF-20261013-006
  - HANDOFF-20261006-001
  - SPEC-20261013-006
  - CONTEXT.md
  - ADR-0001
---

# modernize operacional — emenda v1-A18

## Problem

A skill `modernize` existe apenas como scaffold. O contrato, o gate de modernização e a regra R16 já separam modernização de refactor e de implementação, mas a skill não tem instruções operacionais para gravar `MODERNIZATION_PLAN` `ready` e para devolver `BLOCKED` sem arquivo quando o gate não passa.

## Goal

Tornar `modernize` operacional na emenda v1-A18. Quando invocada, a skill grava um plano de modernização a partir do objetivo delimitado e da evidência, e devolve `BLOCKED` sem arquivo e sem mudança de aplicação desta tentativa quando o gate não passa.

## Scope

- Implementar o workflow de `modernize` no contrato e na fonte, com o mesmo texto operacional nos dois lugares. Evidência: `DECISION-SET-20261013-007` e a regra de status `implemented` em `contracts/skill-contract.md`.
- Migrar `modernize` de `scaffold` para `implemented` no manifest, no contrato e na fonte.
- Consumir contexto do projeto, objetivo de modernização, arquitetura existente e informação de runtime ou dependência.
- Gravar um `MODERNIZATION_PLAN` `ready` por objetivo, com o template existente, `created_by: modernize` e as seções obrigatórias preenchidas, em `.ai/artifacts/modernization/`.
- Não executar a migração e não alterar código de aplicação.
- Uma execução posterior do mesmo objetivo atualiza o mesmo arquivo e incrementa `version`. Não apaga plano existente e não reescreve arquivo cujo `created_by` não seja `modernize`.
- O caminho bloqueado devolve o relatório `BLOCKED` contratado, sem arquivo e sem mudança de aplicação desta tentativa.
- Manter o produtor, o esquema, o template, as seções obrigatórias e as dependências opcionais de `MODERNIZATION_PLAN` e de `modernize`.
- Estender a regressão estrutural de catálogo já existente. Os casos negativos de scaffold restauram `modernize` dentro do fixture. Executar os cenários da skill por agente, separados da suíte Node.
- Registrar a mudança como emenda v1-A18 e reconciliar a documentação que declara a contagem de skills.

## Non-goals

- Criar executor JavaScript, migrador automático ou nova dependência npm.
- Criar arquivo de teste novo. A suíte Node só acompanha o catálogo, as dependências opcionais e o esquema já definido de `MODERNIZATION_PLAN`.
- Alterar o esquema, o template ou as seções obrigatórias de `MODERNIZATION_PLAN`.
- Alterar a linha de produtor. O produtor já é `modernize`.
- Acrescentar chave de caminho em `.ai/config.json`. O diretório usado é o layout já recomendado `.ai/artifacts/modernization/`.
- Alterar R1–R17, sequências canônicas ou as dependências do manifest.
- Fazer `docs`, `refactor` ou `implement` invocarem `modernize`, ou reabrir `SPEC-20261013-006` ou specs anteriores.
- Estender ou modificar o ADR `0001`.
- Reescrever `references/architecture-contract-v1.md`.
- Gravar plano `draft`, `blocked` ou parcial.
- Apagar plano existente ou alterar código de aplicação.
- Invocar `to-tickets`, `implement` ou qualquer outra skill a partir de `modernize`.
- Adicionar comando CLI ou target.
- Certificar descoberta real em Cursor, Codex, Gemini Antigravity ou Claude Code.
- Produzir modelo de domínio ou desenho de arquitetura desta emenda.

## Actors

- Solicitante que invoca `modernize`.
- Agente de IA que executa a skill invocada.
- Objetivo de modernização, contexto do projeto, arquitetura existente e evidência de runtime ou dependência.

## Functional Requirements

1. `modernize`, quando invocada, lê o contexto do projeto, o objetivo, a arquitetura existente e a evidência de runtime ou dependência. Não copia valor secreto. A invocação é uma modernização delimitada sob R16. Evidência: `DECISION-SET-20261013-007` e R16.
2. Quando o gate passa, a skill grava um `MODERNIZATION_PLAN` `ready`, com o template existente, `created_by: modernize` e as seções obrigatórias. Não altera código de aplicação. Evidência: `DECISION-SET-20261013-007`.
3. A execução seguinte do mesmo objetivo, com insumos iguais, atualiza o mesmo arquivo, incrementa `version` e preserva as seções materiais. Evidência: `DECISION-SET-20261013-007`.
4. O mesmo objetivo, com a validação alterada, atualiza o mesmo arquivo a partir da versão 1 e aplica só esse acréscimo. Evidência: `DECISION-SET-20261013-007`.
5. Contexto do projeto ausente produz `BLOCKED` e recomenda `context-engineering`. Arquitetura existente ausente, ou evidência de runtime citada ausente, produz `BLOCKED` e recomenda `context-engineering`. Evidência: `DECISION-SET-20261013-007`.
6. Objetivo ausente, não delimitado ou de upgrade sem controle produz `BLOCKED`, recomenda `clarify` e não reescreve o repositório. Pedido cujo propósito é mudar comportamento produz `BLOCKED` e recomenda `implement`. Falha de causa desconhecida produz `BLOCKED` e recomenda `diagnose`. Pedido estrutural com comportamento estável produz `BLOCKED` e recomenda `refactor`. Pedido documental produz `BLOCKED` e recomenda `docs`. Evidência: `DECISION-SET-20261013-007`, R5, R14, R15 e R16.
7. Linha de base não observada produz `BLOCKED` e recomenda observar a linha de base e repetir `modernize`. Estágios, rollback ou validação ausentes no objetivo produzem `BLOCKED` e recomendam `clarify`. Evidência: o gate de modernização.
8. Conflito com decisão existente, inclusive o ADR `0001`, produz `BLOCKED`, recomenda `clarify` e preserva a decisão. Pesquisa presente fora de `ready`, ou fato externo que ainda pode mudar o alvo, produz `BLOCKED` e recomenda `research`, sem acesso à rede. Desenho presente fora de `ready`, ou fronteira aberta que ainda pode mudar o alvo, produz `BLOCKED` e recomenda `architecture-design`. Diagnóstico presente fora de `ready` produz `BLOCKED` e recomenda `diagnose`. Evidência: `DECISION-SET-20261013-007`.
9. Plano existente do mesmo objetivo cujo `created_by` não é `modernize` não é reescrito. Bloqueios combinados nomeiam cada pré-requisito e recomendam o mais cedo. A tentativa bloqueada não apaga plano existente nem altera código de aplicação. Evidência: o contrato de falha.
10. Dívida técnica não nomeada fica como ausência evidenciada. Valor secreto citado no insumo não aparece no plano. Evidência: o contrato compartilhado e a seção 7.13.
11. `modernize` não invoca outra skill. Plano pronto autoriza `to-tickets` e não autoriza `implement` direto nem reescrita do repositório. A skill não grava o glossário, `CONTEXT.md` nem outro artefato, e não estende o ADR `0001`. Evidência: `DECISION-SET-20261013-007`.
12. O catálogo contém exatamente dezoito skills `implemented` e zero `scaffold`. As dependências opcionais de `modernize` permanecem `diagnose`, `research`, `architecture-design`, `tdd` e `to-tickets`. Evidência: `DECISION-SET-20261013-007`.

## Business Rules

- R16 permanece a regra de uso. O anti-padrão que proíbe reescrita sem controle permanece.
- Premissa, questão aberta, questão bloqueante e fato externo permanecem distintos.
- Decisão existente prevalece. Conflito com o ADR `0001` bloqueia e preserva o ADR.
- Artefato que não está `ready` não autoriza o plano que dependeria dele.
- `MODERNIZATION_PLAN` continua com esquema definido e o mesmo template.
- O ADR `0001` continua valendo apenas para a persistência de conjunto de decisões `ready` e `blocked`.
- Recomendar outra skill não cria dependência nem executa a skill.
- Esta emenda operacionaliza uma skill do pacote. Ela não exige `DOMAIN_MODEL` nem `ARCHITECTURE_DESIGN`, no mesmo precedente de `SPEC-20261013-006`.

## Non-functional Requirements

- Determinismo: os mesmos insumos produzem as mesmas seções materiais. A `version` muda numa execução posterior.
- Auditabilidade: cada bloqueio cita o insumo usado. O frontmatter lista os identificadores consumidos.
- Portabilidade: a fonte permanece independente de ferramenta e sistema operacional.
- Segurança: o plano não reproduz segredo e não altera código de aplicação para cumprir o objetivo.
- Compatibilidade: preservar Node.js >=22, zero dependências npm, 18 skills e quatro targets.

## Technical Constraints

- Alterar somente o necessário para operacionalizar `modernize` e registrar a emenda v1-A18.
- Não alterar o contrato de routing, as sequências canônicas, o template nem `contracts/artifacts.md`.
- Não criar runtime nem executor da skill.
- A escrita própria de `modernize` é o `MODERNIZATION_PLAN` `ready`.
- A regressão determinística estende a asserção de catálogo já existente. Não há arquivo de teste novo.
- Manter LF e CRLF aceitos pelo validador.
- O texto da seção Workflow do contrato e o da fonte são o mesmo.

## Security / Privacy

- Não incluir tokens, credenciais, connection strings nem valores de arquivos de ambiente no plano.
- Referenciar apenas a existência e o efeito de evidências potencialmente sensíveis.
- Não executar ações externas. A skill não acessa a rede e não altera código de aplicação.

## Acceptance Criteria

1. `modernize` está `implemented` de forma consistente no manifest, no contrato e na fonte. O catálogo contém 18 skills `implemented` e 0 `scaffold`. As dependências opcionais permanecem as cinco já declaradas.
2. Objetivo de migração de runtime delimitado, com contexto, arquitetura, evidência de runtime, linha de base, estágios, rollback e validação, produz plano `ready` com `created_by: modernize`, sem alterar `package.json` nem código de aplicação, e autoriza `to-tickets` sem autorizar `implement` direto.
3. A execução seguinte do mesmo objetivo, com insumos iguais, atualiza o mesmo arquivo e incrementa `version`, com seções materiais iguais.
4. O mesmo objetivo, com a validação alterada, atualiza o mesmo arquivo a partir da versão 1 e registra só esse acréscimo.
5. Arquitetura existente ausente produz `BLOCKED`, recomenda `context-engineering` e preserva plano já gravado.
6. Pedido de upgrade sem controle produz `BLOCKED`, recomenda `clarify` e não altera código de aplicação.
7. Pedido de mudança de comportamento produz `BLOCKED` e recomenda `implement`.
8. Falha de causa desconhecida, com diagnóstico presente fora de `ready`, produz `BLOCKED`, recomenda `diagnose` e preserva o diagnóstico.
9. Pedido estrutural produz `BLOCKED` e recomenda `refactor`.
10. Pedido documental produz `BLOCKED` e recomenda `docs`.
11. Linha de base não observada produz `BLOCKED` e recomenda observar a linha de base e repetir `modernize`.
12. Rollback ausente produz `BLOCKED` e recomenda `clarify`.
13. Estágios ausentes produzem `BLOCKED` e recomendam `clarify`.
14. Fato externo que ainda pode mudar o alvo produz `BLOCKED` e recomenda `research`, sem acesso à rede.
15. Conflito com o ADR `0001` produz `BLOCKED`, recomenda `clarify` e preserva o ADR.
16. Pesquisa presente que não está `ready` produz `BLOCKED`, recomenda `research` e preserva o relatório.
17. Desenho presente que não está `ready` produz `BLOCKED`, recomenda `architecture-design` e preserva o desenho.
18. Plano existente do mesmo objetivo com `created_by` diferente de `modernize` permanece byte a byte.
19. Valor secreto citado no objetivo não aparece no plano. Dívida técnica não nomeada fica como ausência evidenciada.
20. Bloqueios combinados de contexto ausente e rollback ausente nomeiam os dois pré-requisitos e recomendam `context-engineering`. O plano existente não é apagado.
21. `modernize` não invoca outra skill. Plano pronto não executa a migração.
22. A skill não grava glossário nem `CONTEXT.md` e não estende o ADR `0001`.
23. Esquema, template, R1–R17, dependências, targets, CLI e a linha de produtor permanecem inalterados. O ADR `0001` não é estendido. Nenhuma chave nova entra em `.ai/config.json`.
24. A regressão determinística cobre a migração 18/0, as dependências opcionais e a preservação do esquema e do template de `MODERNIZATION_PLAN`. Nenhum arquivo de teste novo é adicionado. Os casos negativos de scaffold restauram a amostra dentro do fixture.
25. Os cenários de plano, repetição, bloqueio e sigilo ficam em evidência separada dos testes Node.
26. `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
27. Proveniência, README, estado arquitetural, padrões, estado do projeto, frase de lifecycle, evidências e handoff refletem a v1-A18 sem declarar capacidades não verificadas.

## Risks

- Tratar o plano pronto como autorização para reescrever o repositório executaria a migração. O texto precisa dizer que `to-tickets` é o consumidor e que `implement` direto não está autorizado.
- Um agente pode copiar segredo ou editar `package.json`. Os cenários precisam mostrar a omissão e a ausência de mudança de aplicação.
- Sem skill scaffold restante, os casos negativos precisam restaurar a amostra. A restauração fica no fixture e não volta o catálogo publicado para scaffold.
- Testes estruturais podem ser confundidos com execução da skill. A evidência agent-driven fica registrada separadamente e não certifica os quatro produtos.

## Open Questions

Nenhuma questão bloqueante. Descoberta real nos quatro produtos e reconciliação com GitHub Issues continuam sem verificação e não alteram este recorte. Executor automático, arquivo de teste novo, alteração de esquema e extensão do ADR `0001` permanecem fora deste recorte.

## Testing Decisions

- Um bom teste observa comportamento externo: insumos entram, plano `ready` sai sem mudança de aplicação, ou o relatório `BLOCKED` sai sem arquivo desta tentativa. Não afirma redação interna da skill além do resultado observável.
- O teste determinístico, no seam de catálogo já existente, passa a exigir `modernize` entre as skills `implemented`, dezoito no total e zero `scaffold`, preserva as dependências opcionais e preserva o esquema e o template atuais de `MODERNIZATION_PLAN`. Os casos negativos que usavam `modernize` como amostra scaffold passam a restaurar esse estado no fixture antes da mutação. Nenhum executor Node será criado. Nenhum arquivo de teste novo será criado.
- Os cenários conduzidos por agente aplicam o contrato e a fonte em diretório temporário e inspecionam o plano e a árvore, ou a ausência de arquivo junto com o relatório `BLOCKED`. Cobrem plano, repetição, bloqueio e sigilo.
- O precedente é a asserção de catálogo da v1-A17 e a evidência separada da suíte Node naquela emenda.
- Asserções não serão relaxadas para acomodar a implementação.

## Further Notes

Esta spec satisfaz o gate de especificação: escopo delimitado, critérios verificáveis e nenhuma ambiguidade bloqueante. R8 e R9 não se aplicam. O conjunto de tickets é `TICKET-SET-20261013-007`. Os tickets 01 e 02 estão concluídos. A frontier desta spec está vazia. O identificador desta spec é `SPEC-20261013-007` e a emenda é v1-A18. Nenhuma skill permanece scaffold. A próxima emenda livre é v1-A19. Não reutilizar os identificadores de `edge-case-analysis` nem os de `docs`.

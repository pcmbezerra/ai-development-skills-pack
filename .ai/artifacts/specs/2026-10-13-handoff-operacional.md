---
artifact: spec
id: SPEC-20261013-001
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261013-001
  - HANDOFF-20261012-001
  - HANDOFF-20261006-001
  - SPEC-20261010-001
  - CONTEXT.md
  - ADR-0001
---

# handoff operacional — emenda v1-A12

## Problem

A skill `handoff` existe apenas como scaffold. O contrato, o template, as seções obrigatórias e a regra R17 já definem a transferência de estado verificado, mas a skill não tem instruções operacionais para gravar o `HANDOFF` `ready` e parar sem invocar a skill seguinte.

## Goal

Tornar `handoff` operacional na emenda v1-A12. Quando invocada, a skill transfere somente estado verificado, grava um handoff `ready` e devolve `BLOCKED` sem arquivo desta tentativa quando o gate não passa. Insumo fora de `ready` fica registrado e não autoriza implementação.

## Scope

- Implementar o workflow de `handoff` no contrato e na fonte, com o mesmo texto operacional nos dois lugares. Evidência: `DECISION-SET-20261013-001` e a regra de status `implemented` em `contracts/skill-contract.md`.
- Migrar `handoff` de `scaffold` para `implemented` no manifest, no contrato e na fonte.
- Consumir estado atual, inventário de artefatos existentes e estado da mudança. Árvore limpa observada conta como estado da mudança. Inventário vazio observado conta como inventário.
- Gravar um único `HANDOFF` `ready` por objetivo em `.ai/artifacts/handoffs/`, com o template existente, `created_by: handoff` e as seções obrigatórias preenchidas.
- Registrar validação, problemas conhecidos, restrições e próximas ações. Insumo `blocked`, `draft` ou fora de `ready` não autoriza implementação.
- Uma execução posterior do mesmo objetivo atualiza o mesmo arquivo e incrementa `version`. Não apaga handoff existente.
- O caminho bloqueado devolve o relatório `BLOCKED` contratado, sem arquivo e sem mudança de código desta tentativa.
- Manter o ADR `0001` restrito ao conjunto de decisões e sem modificação. Não reabrir `SPEC-20261010-001`.
- Preservar as listas de dependência vazias de `handoff`.
- Estender a regressão estrutural de catálogo já existente e executar os cenários da skill por agente, separados da suíte Node.
- Registrar a mudança como emenda v1-A12 e reconciliar a documentação que declara a contagem de skills.

## Non-goals

- Criar executor JavaScript, redator automático ou nova dependência npm.
- Criar arquivo de teste novo. A suíte Node só acompanha o catálogo, as listas de dependência vazias e o esquema já definido de `HANDOFF`.
- Alterar o esquema, o template, as seções obrigatórias ou o produtor já declarado de `HANDOFF`.
- Acrescentar chave de caminho em `.ai/config.json`. O diretório usado é o layout já recomendado.
- Alterar R1–R17, sequências canônicas ou as dependências do manifest.
- Fazer outra skill invocar `handoff`, ou reabrir `SPEC-20261010-001`.
- Estender ou modificar o ADR `0001`.
- Gravar handoff `draft`, `blocked` ou parcial.
- Apagar handoff existente.
- Invocar `context-engineering`, `clarify`, `research`, `implement` ou qualquer outra skill a partir de `handoff`.
- Implementar `research`, `diagnose`, `refactor`, `edge-case-analysis`, `docs`, `modernize` ou qualquer outra skill scaffold.
- Adicionar comando CLI ou target.
- Certificar descoberta real em Cursor, Codex, Gemini Antigravity ou Claude Code.
- Produzir modelo de domínio ou desenho de arquitetura desta emenda.

## Actors

- Solicitante que invoca `handoff`.
- Agente de IA que executa a skill invocada.
- Estado atual, artefatos existentes e estado da mudança.

## Functional Requirements

1. `handoff`, quando invocada, lê o estado atual, o inventário de artefatos e o estado da mudança. Não copia valor secreto; o handoff registra só existência e efeito. A invocação é transferência explícita sob R17. Evidência: `DECISION-SET-20261013-001` e R17.
2. Quando o gate passa, a skill grava um handoff `ready` em `.ai/artifacts/handoffs/`, com o template existente, `created_by: handoff`, as seções obrigatórias preenchidas e os identificadores consumidos em `inputs`. O arquivo não conserva marcador de rascunho. Inclui validação, problemas conhecidos, restrições e próximas ações. Evidência: `DECISION-SET-20261013-001`.
3. Frontier vazia, com os três insumos observados, produz handoff `ready`. Trabalho incompleto também produz handoff `ready`. Evidência: `DECISION-SET-20261013-001` e R17.
4. Insumo `blocked`, `draft` ou fora de `ready` permanece registrado com esse status. O handoff não autoriza implementação e a próxima ação recomenda o produtor desse insumo, não `implement`. Evidência: `DECISION-SET-20261013-001`.
5. Estado atual ausente produz `BLOCKED` e não grava arquivo. Quando a lacuna é o contexto do projeto, a recomendação é `context-engineering`. A skill não executa a recomendada. Evidência: `DECISION-SET-20261013-001`.
6. Estado da mudança não observado produz `BLOCKED`, recomenda capturar o working tree e repetir `handoff`, e não grava arquivo. Inventário não observado produz `BLOCKED`, recomenda inventariar e repetir `handoff`, e não grava arquivo. Árvore limpa observada e inventário vazio observado não bloqueiam. Evidência: `DECISION-SET-20261013-001`.
7. Uma execução posterior do mesmo objetivo atualiza o mesmo arquivo e incrementa `version`. Não cria duplicata e não apaga handoff. Insumos iguais preservam as seções materiais. Evidência: `DECISION-SET-20261013-001` e o seam de atualização no lugar.
8. Conflito com decisão existente, inclusive o ADR `0001`, produz `BLOCKED`, recomenda `clarify` e preserva o ADR. Fato externo que teria de ser declarado verificado produz `BLOCKED` e recomenda `research`, sem acesso à rede. Evidência: `DECISION-SET-20261013-001`.
9. O relatório bloqueado traz os cinco campos contratados, nomeia cada pré-requisito ausente e recomenda a skill ou ação do bloqueio mais cedo: estado atual, estado da mudança, inventário, decisão, fato externo. Uma tentativa bloqueada não apaga handoff já existente e não altera código de aplicação. Evidência: o contrato de falha e `DECISION-SET-20261013-001`.
10. `handoff` não invoca a próxima skill, não grava o glossário, `CONTEXT.md` nem outro artefato, e não estende o ADR `0001`. Evidência: `DECISION-SET-20261013-001`.
11. O catálogo final contém exatamente doze skills `implemented` e seis `scaffold`. `handoff` junta-se a `setup-ai-development-skills`, `context-engineering`, `workflow`, `clarify`, `to-spec`, `to-tickets`, `domain-modelling`, `architecture-design`, `implement`, `tdd` e `code-review`. As seis que permanecem `scaffold` são `research`, `diagnose`, `refactor`, `edge-case-analysis`, `docs` e `modernize`. As listas de dependência de `handoff` permanecem vazias. Evidência: `DECISION-SET-20261013-001`.

## Business Rules

- R17 permanece a regra de uso. A invocação satisfaz a transferência explícita.
- Premissa, questão aberta, questão bloqueante e fato externo permanecem distintos.
- Decisão existente prevalece. Conflito com o ADR `0001` bloqueia e preserva o ADR.
- Artefato que não está `ready` não autoriza implementação. O handoff pode registrá-lo.
- `HANDOFF` continua com esquema definido e o mesmo template.
- O ADR `0001` continua valendo apenas para a persistência de conjunto de decisões `ready` e `blocked`.
- Recomendar `context-engineering`, `clarify`, `research` ou outra skill não cria dependência nem executa a skill.
- Esta emenda operacionaliza uma skill do pacote. Ela não exige `DOMAIN_MODEL` nem `ARCHITECTURE_DESIGN`, no mesmo precedente de `SPEC-20261009-002`, `SPEC-20261009-003`, `SPEC-20261009-004` e `SPEC-20261010-001`.

## Non-functional Requirements

- Determinismo: os mesmos insumos produzem as mesmas seções materiais. A `version` muda numa execução posterior.
- Auditabilidade: cada bloqueio cita o insumo usado. O frontmatter lista os identificadores consumidos.
- Portabilidade: a fonte permanece independente de ferramenta e sistema operacional.
- Segurança: o handoff não reproduz segredo.
- Compatibilidade: preservar Node.js >=22, zero dependências npm, 18 skills e quatro targets.

## Technical Constraints

- Alterar somente o necessário para operacionalizar `handoff` e registrar a emenda v1-A12.
- Não alterar o contrato de routing, o contrato de artefatos, as sequências canônicas nem o template de handoff.
- Não criar runtime nem executor da skill.
- A única escrita própria de `handoff` é o handoff `ready`.
- A regressão determinística estende a asserção de catálogo já existente. Não há arquivo de teste novo.
- Manter LF e CRLF aceitos pelo validador.
- O texto da seção Workflow do contrato e o da fonte são o mesmo.

## Security / Privacy

- Não incluir tokens, credenciais, connection strings nem valores de arquivos de ambiente no handoff.
- Referenciar apenas a existência e o efeito de evidências potencialmente sensíveis.
- Não executar ações externas. A skill não acessa a rede.

## Acceptance Criteria

1. `handoff` está `implemented` de forma consistente no manifest, no contrato e na fonte. O catálogo contém 12 skills `implemented` e 6 `scaffold`. As listas de dependência permanecem vazias.
2. Invocação com estado atual, inventário e estado da mudança observados, inclusive frontier vazia, produz handoff `ready` com `created_by: handoff`, as seções obrigatórias e nenhum marcador de rascunho.
3. Insumo `blocked` ou `draft` fica registrado e o handoff não autoriza `implement`.
4. A execução seguinte do mesmo objetivo, com insumos iguais, atualiza o mesmo arquivo e incrementa `version`.
5. O mesmo objetivo, com o insumo alterado, atualiza o mesmo arquivo a partir da versão 1 e registra o acréscimo.
6. Estado atual ausente, quando a lacuna é o contexto do projeto, produz `BLOCKED`, recomenda `context-engineering` e não grava arquivo.
7. Estado da mudança não observado produz `BLOCKED` e não grava arquivo. Inventário não observado produz `BLOCKED` e não grava arquivo.
8. Valor secreto citado no insumo não aparece no handoff.
9. Conflito com o ADR `0001` produz `BLOCKED`, recomenda `clarify` e preserva o ADR.
10. Fato externo não verificado, se tivesse de constar como verificado, produz `BLOCKED` e recomenda `research`, sem acesso à rede.
11. Bloqueios combinados nomeiam cada pré-requisito e recomendam o mais cedo. A tentativa bloqueada não apaga handoff existente nem altera código de aplicação.
12. `handoff` não invoca outra skill e não grava glossário, `CONTEXT.md` nem outro artefato.
13. Esquema, template, R1–R17, dependências, targets, CLI e as outras skills permanecem inalterados. O ADR `0001` não é estendido. Nenhuma chave nova entra em `.ai/config.json`.
14. A regressão determinística cobre a migração 12/6, as listas de dependência vazias e a preservação de `HANDOFF` como esquema definido com o template atual. Nenhum arquivo de teste novo é adicionado.
15. Os cenários de transferência, atualização, insumo não pronto, bloqueio e sigilo ficam em evidência separada dos testes Node.
16. `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
17. Proveniência, README, estado arquitetural, padrões, estado do projeto, frase de lifecycle, evidências e handoff refletem a v1-A12 sem declarar capacidades não verificadas.

## Risks

- Recusar arquivo diante de insumo bloqueado apagaria a continuidade de trabalho incompleto. O handoff precisa registrar o status e negar a autorização de implementação.
- Não gravar o caminho bloqueado pode parecer perda de trabalho. O relatório `BLOCKED` e o handoff já existente conservam a fronteira.
- Um agente pode copiar segredo ou gravar artefato extra. Os cenários precisam mostrar a omissão e a única escrita.
- Testes estruturais podem ser confundidos com execução da skill. A evidência agent-driven fica registrada separadamente e não certifica os quatro produtos.

## Open Questions

Nenhuma questão bloqueante. Descoberta real nos quatro produtos e reconciliação com GitHub Issues continuam sem verificação e não alteram este recorte. Executor automático, arquivo de teste novo, alteração de esquema, extensão do ADR `0001` e implementação das outras seis skills scaffold permanecem fora deste recorte.

## Testing Decisions

- Um bom teste observa comportamento externo: insumos entram, handoff `ready` sai, ou o relatório `BLOCKED` sai sem arquivo. Não afirma redação interna da skill além do resultado observável.
- O teste determinístico, no seam de catálogo já existente, passa a exigir `handoff` entre as skills `implemented`, doze no total e seis `scaffold`, preserva as listas de dependência vazias e preserva `HANDOFF` com esquema `defined` e o template atual. Nenhum executor Node será criado. Nenhum arquivo de teste novo será criado.
- Os cenários conduzidos por agente aplicam o contrato e a fonte em diretório temporário e inspecionam o handoff, ou a ausência de arquivo junto com o relatório `BLOCKED`. Cobrem transferência, atualização do mesmo arquivo, insumo não pronto, bloqueio e sigilo.
- O precedente é a asserção de catálogo da v1-A11 e a evidência separada da suíte Node naquela emenda.
- Asserções não serão relaxadas para acomodar a implementação.

## Further Notes

Esta spec satisfaz o gate de especificação: escopo delimitado, critérios verificáveis e nenhuma ambiguidade bloqueante. R8 e R9 não se aplicam. O conjunto de tickets é `TICKET-SET-20261013-001`. Os tickets 01 e 02 estão concluídos. A frontier desta spec está vazia.

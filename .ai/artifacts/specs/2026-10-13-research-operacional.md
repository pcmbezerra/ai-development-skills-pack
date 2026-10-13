---
artifact: spec
id: SPEC-20261013-001
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261013-001
  - HANDOFF-20261006-001
  - SPEC-20261010-001
  - CONTEXT.md
  - ADR-0001
---

# research operacional — emenda v1-A12

## Problem

A skill `research` existe apenas como scaffold. O contrato, o template de `RESEARCH_REPORT`, a regra R4 e a capability opcional `external-research` já definem o objetivo e o fallback, mas a skill não tem instruções operacionais para gravar o relatório `ready` e parar sem invocar a skill seguinte. `clarify` e `to-spec` já estão fechadas e continuam sem executá-la.

## Goal

Tornar `research` operacional na emenda v1-A12. Quando invocada, a skill estabelece fatos verificáveis, grava um `RESEARCH_REPORT` `ready` e devolve `BLOCKED` sem arquivo quando o insumo não autoriza o relatório.

## Scope

- Implementar o workflow de `research` no contrato e na fonte, com o mesmo texto operacional nos dois lugares. Evidência: `DECISION-SET-20261013-001` e a regra de status `implemented` em `contracts/skill-contract.md`.
- Migrar `research` de `scaffold` para `implemented` no manifest, no contrato e na fonte.
- Consumir a pergunta, o contexto do projeto e o contexto de decisão quando existir. Gravar um único relatório `ready` por pergunta em `.ai/artifacts/research/`, com o template existente e `created_by: research`.
- Separar findings de recomendação. Citar a evidência de cada finding. Deixar alegação sem fonte em Unknowns.
- Quando o acesso externo não pode ser usado, o relatório continua `ready` e a alegação permanece não resolvida. Uma premissa fica rotulada em Unknowns e não vira finding.
- Uma execução posterior da mesma pergunta atualiza o mesmo arquivo e incrementa `version`.
- O caminho bloqueado devolve o relatório `BLOCKED` contratado, sem arquivo desta tentativa.
- Um relatório cujos unknowns ainda podem mudar o próximo passo não autoriza nem recomenda o consumidor.
- Manter o ADR `0001` restrito ao conjunto de decisões e sem modificação. Não reabrir `SPEC-20261010-001`.
- Preservar as listas de dependência vazias e a capability opcional `external-research`.
- Estender a regressão estrutural de catálogo já existente e executar os cenários por agente, separados da suíte Node.
- Registrar a mudança como emenda v1-A12 e reconciliar a documentação que declara a contagem de skills.

## Non-goals

- Criar executor JavaScript, redator automático ou nova dependência npm.
- Criar arquivo de teste novo. A suíte Node só acompanha o catálogo, as listas de dependência vazias, a capability opcional e o esquema já definido de `RESEARCH_REPORT`.
- Alterar o esquema, o template, as seções obrigatórias ou o produtor já declarado de `RESEARCH_REPORT`.
- Acrescentar chave de caminho em `.ai/config.json`. O diretório usado é o layout já recomendado.
- Alterar R1–R17, sequências canônicas ou as dependências do manifest.
- Fazer `clarify`, `to-spec`, `architecture-design` ou `implement` passarem a invocar `research`.
- Estender ou modificar o ADR `0001`. Reabrir `SPEC-20261010-001`.
- Gravar relatório `draft`, `blocked` ou parcial.
- Apagar relatório existente.
- Invocar `to-spec`, `clarify`, `context-engineering` ou qualquer outra skill a partir de `research`.
- Implementar `handoff`, `diagnose`, `refactor`, `edge-case-analysis`, `docs`, `modernize` ou qualquer outra skill scaffold.
- Adicionar comando CLI ou target.
- Certificar execução real em Cursor, Codex, Gemini Antigravity ou Claude Code.
- Acessar a rede para responder os cenários desta emenda.

## Actors

- Solicitante que invoca `research`.
- Agente de IA que executa a skill invocada.
- Pergunta de fato externo, contexto do projeto e contexto de decisão quando existir.

## Functional Requirements

1. `research`, quando invocada, lê a pergunta, o contexto do projeto e o contexto de decisão presente, e não copia valor secreto. Evidência: `DECISION-SET-20261013-001`.
2. Quando o gate passa, a skill grava um relatório `ready` em `.ai/artifacts/research/`, com o template existente, `created_by: research`, as seções obrigatórias preenchidas e os identificadores consumidos em `inputs`. O arquivo não conserva marcador de rascunho. Findings e recomendação ficam separados. Evidência: `DECISION-SET-20261013-001`.
3. Fato já presente no repositório ou no contexto do projeto é citado sem acesso externo. Evidência: o contrato de `research`.
4. Acesso externo que não pode ser usado deixa a alegação em Unknowns. O relatório fica `ready` e não autoriza o próximo passo. Evidência: a capability `external-research`.
5. Contexto do projeto ausente produz `BLOCKED`, recomenda `context-engineering` e não grava arquivo. Evidência: o seam que recomenda o produtor do insumo ausente.
6. Pergunta ausente, ou pergunta que escolhe escopo, comportamento, arquitetura, modelo de dados, segurança ou critério de aceite, produz `BLOCKED`, recomenda `clarify` e não grava arquivo. Evidência: R3 e R4.
7. Conflito com decisão existente produz `BLOCKED`, recomenda `clarify`, preserva a decisão e não grava arquivo. Evidência: `DECISION-SET-20261013-001` e o ADR `0001`.
8. Conjunto de decisões que não está `ready` não bloqueia quando a questão bloqueante é o fato que a pergunta pede para estabelecer. A skill não edita o conjunto. Uma ambiguidade diferente, que muda qual fato estabelecer, produz `BLOCKED` e recomenda `clarify`. Evidência: o contrato de `research`.
9. Premissa não vira finding e não bloqueia o relatório por si. Fica rotulada em Unknowns. Evidência: `DECISION-SET-20261013-001`.
10. Alternativa rejeitada não entra em Findings. Ausência evidenciada preenche a seção correspondente. Evidência: o contrato de artefatos.
11. A execução seguinte da mesma pergunta, com insumos iguais, atualiza o mesmo arquivo e incrementa `version`. Insumos alterados atualizam o mesmo arquivo e preservam a pergunta. Evidência: o seam de atualização no lugar.
12. `research` não invoca outra skill e não grava spec, conjunto de decisões, ADR, glossário ou `CONTEXT.md`. Evidência: `DECISION-SET-20261013-001`.
13. O catálogo final contém exatamente doze skills `implemented` e seis `scaffold`. `research` junta-se às onze já implementadas. As listas de dependência de `research` permanecem vazias. A capability opcional permanece. Evidência: `DECISION-SET-20261013-001`.

## Business Rules

- R4 permanece a rota de fato externo desconhecido. Esta emenda não altera o texto de R4.
- Premissa, questão aberta, questão bloqueante e fato externo permanecem distintos.
- Decisão existente prevalece. Conflito com o ADR `0001` bloqueia e preserva o ADR.
- Artefato que não está `ready` não autoriza a etapa que o exige. Um relatório `ready` com unknown que ainda muda o próximo passo também não autoriza essa etapa.
- `RESEARCH_REPORT` continua com esquema definido e o mesmo template.
- O ADR `0001` continua valendo apenas para a persistência de conjunto de decisões `ready` e `blocked`.
- Recomendar `context-engineering` ou `clarify` não cria dependência nem executa a skill.
- Esta emenda operacionaliza uma skill do pacote. Ela não exige `DOMAIN_MODEL` nem `ARCHITECTURE_DESIGN`, no mesmo precedente de `SPEC-20261010-001`.

## Non-functional Requirements

- Determinismo: os mesmos insumos produzem as mesmas seções materiais. A `version` muda numa execução posterior.
- Auditabilidade: cada bloqueio cita o insumo usado. O frontmatter lista os identificadores consumidos.
- Portabilidade: a fonte permanece independente de ferramenta e sistema operacional.
- Segurança: o relatório não reproduz segredo.
- Compatibilidade: preservar Node.js >=22, zero dependências npm, 18 skills e quatro targets.

## Technical Constraints

- Alterar somente o necessário para operacionalizar `research` e registrar a emenda v1-A12.
- Não alterar o contrato de routing, o contrato de artefatos, as sequências canônicas nem o template de research report.
- Não alterar o workflow operacional das skills já fechadas.
- Não criar runtime nem executor da skill.
- A única escrita própria de `research` é o relatório `ready`.
- A regressão determinística estende a asserção de catálogo já existente. Não há arquivo de teste novo.
- Manter LF e CRLF aceitos pelo validador.
- O texto da seção Workflow do contrato e o da fonte são o mesmo.

## Security / Privacy

- Não incluir tokens, credenciais, connection strings nem valores de arquivos de ambiente no relatório.
- Referenciar apenas a existência e o efeito de evidências potencialmente sensíveis.
- Os cenários desta emenda não acessam a rede.

## Acceptance Criteria

1. `research` está `implemented` de forma consistente no manifest, no contrato e na fonte. O catálogo contém 12 skills `implemented` e 6 `scaffold`. As listas de dependência permanecem vazias. A capability `external-research` permanece.
2. Invocação com contexto do projeto e fato já registrado no repositório produz relatório `ready` com `created_by: research`, findings citados e recomendação separada. `to-spec` fica indicado e não é invocado.
3. A execução seguinte da mesma pergunta, com insumos iguais, atualiza o mesmo arquivo, incrementa `version` e preserva as seções materiais.
4. A mesma pergunta, com o insumo alterado, atualiza o mesmo arquivo a partir da versão 1 e registra o fato novo.
5. Alegação fora do repositório, sem acesso externo, produz relatório `ready` com a alegação em Unknowns, sem apresentá-la como finding, e não autoriza o próximo passo.
6. Contexto do projeto ausente produz `BLOCKED`, recomenda `context-engineering` e não grava arquivo.
7. Pergunta ausente produz `BLOCKED`, recomenda `clarify` e não grava arquivo.
8. Pergunta que é escolha de projeto produz `BLOCKED`, recomenda `clarify` e não grava arquivo.
9. Conflito com decisão existente produz `BLOCKED`, recomenda `clarify`, preserva o arquivo da decisão e não grava relatório.
10. Premissa não aparece como finding. O relatório `ready` deixa a premissa em Unknowns e não autoriza o próximo passo.
11. Conjunto bloqueado somente pelo fato pesquisado não é editado. O relatório `ready` cita o conjunto.
12. Conjunto bloqueado por ambiguidade que muda o fato produz `BLOCKED`, recomenda `clarify` e não grava relatório.
13. Ausência evidenciada preenche Findings e as seções obrigatórias, e autoriza o próximo passo sem invocá-lo.
14. O caminho pronto não grava spec, conjunto, ADR, glossário nem `CONTEXT.md`.
15. Vários bloqueios saem num único relatório. O mais cedo é `context-engineering` quando o contexto falta. Todos os pré-requisitos ausentes são nomeados.
16. Alternativa rejeitada não entra em Findings.
17. Valor secreto citado no insumo não aparece no relatório.
18. A segunda execução da alegação sem fonte incrementa `version`, preserva o unknown e não inventa fonte.
19. Esquema, template, R1–R17, dependências, targets, CLI e as outras skills permanecem inalterados. O ADR `0001` não é estendido. Nenhuma chave nova entra em `.ai/config.json`.
20. A regressão determinística cobre a migração 12/6, as listas de dependência vazias, a capability opcional e a preservação de `RESEARCH_REPORT` como esquema definido. Nenhum arquivo de teste novo é adicionado.
21. Os cenários de fato citado, unknown, atualização, bloqueio e sigilo ficam em evidência separada dos testes Node.
22. `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
23. Proveniência, README, estado arquitetural, padrões, estado do projeto, frase de lifecycle, evidências e handoff refletem a v1-A12 sem declarar capacidades não verificadas.

## Risks

- Deixar a alegação sem fonte em um relatório `ready` pode ser lido como autorização do próximo passo. O passo 9 distingue relatório `ready` de autorização do consumidor.
- Não gravar o caminho bloqueado pode parecer perda de trabalho. O relatório `BLOCKED` e o insumo conservam a fronteira para a sessão seguinte.
- Um agente pode transformar recomendação ou premissa em decisão. Os cenários separam as seções.
- Testes estruturais podem ser confundidos com execução da skill. A evidência agent-driven fica registrada separadamente e não certifica os quatro produtos.

## Open Questions

Nenhuma questão bloqueante. Descoberta real nos quatro produtos e reconciliação com GitHub Issues continuam sem verificação e não alteram este recorte. Executor automático, arquivo de teste novo, alteração de esquema, extensão do ADR `0001` e implementação das outras seis skills scaffold permanecem fora deste recorte.

## Testing Decisions

- Um bom teste observa comportamento externo: insumos entram e relatório `ready` sai, ou o relatório `BLOCKED` sai sem arquivo. Não afirma redação interna da skill além do resultado observável.
- O teste determinístico, no seam de catálogo já existente, passa a exigir `research` entre as skills `implemented`, doze no total e seis `scaffold`, preserva as listas de dependência vazias, a capability opcional e `RESEARCH_REPORT` com esquema `defined` e o template atual. Nenhum executor Node será criado. Nenhum arquivo de teste novo será criado.
- Os cenários conduzidos por agente aplicam o contrato e a fonte em diretório temporário e inspecionam o relatório, ou a ausência de arquivo junto com o relatório `BLOCKED`.
- O precedente é a asserção de catálogo da v1-A11 e a evidência separada da suíte Node naquela emenda.
- Asserções não serão relaxadas para acomodar a implementação.

## Further Notes

Esta spec satisfaz o gate de especificação: escopo delimitado, critérios verificáveis e nenhuma ambiguidade bloqueante. R8 e R9 não se aplicam. O conjunto de tickets é `TICKET-SET-20261013-001`. Os tickets 01 e 02 estão concluídos. A frontier desta spec está vazia.

---
artifact: spec
id: SPEC-20261013-004
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261013-004
  - HANDOFF-20261013-001
  - HANDOFF-20261006-001
  - SPEC-20261013-001
  - SPEC-20261010-001
  - SPEC-20261009-004
  - CONTEXT.md
  - ADR-0001
---

# refactor operacional — emenda v1-A15

## Problem

A skill `refactor` existe apenas como scaffold. O contrato, o invariante, o gate de implementação e a regra R15 já separam refactor de mudança intencional de comportamento, mas a skill não tem instruções operacionais para gravar o relatório e a evidência `ready` e para devolver `BLOCKED` sem arquivo quando o gate não passa.

## Goal

Tornar `refactor` operacional na emenda v1-A15. Quando invocada, a skill melhora a estrutura interna sem mudar o comportamento externo, salvo autorização explícita de uma mudança nomeada, grava relatório e evidência `ready` e devolve `BLOCKED` sem arquivo e sem mudança desta tentativa quando o gate não passa.

## Scope

- Implementar o workflow de `refactor` no contrato e na fonte, com o mesmo texto operacional nos dois lugares. Evidência: `DECISION-SET-20261013-004` e a regra de status `implemented` em `contracts/skill-contract.md`.
- Migrar `refactor` de `scaffold` para `implemented` no manifest, no contrato e na fonte.
- Consumir objetivo de refactor, linha de base de comportamento, contexto do projeto e testes.
- Aplicar a menor mudança estrutural no working tree. Citar `CHANGE_SET` como `working tree`. Não gravar arquivo de `CHANGE_SET`.
- Gravar um `IMPLEMENTATION_REPORT` `ready` e uma `TEST_EVIDENCE` `ready` por objetivo, com os templates existentes, `created_by: refactor` e as seções obrigatórias preenchidas, em `.ai/artifacts/implementation/` e `.ai/artifacts/tests/`.
- Manter o comportamento externo, salvo a mudança nomeada que o mesmo objetivo autorizar explicitamente.
- Uma execução posterior do mesmo objetivo atualiza os mesmos dois arquivos e incrementa `version`. Não apaga relatório ou evidência existente e não reescreve arquivo cujo `created_by` seja `implement` ou `tdd`.
- O caminho bloqueado devolve o relatório `BLOCKED` contratado, sem arquivo e sem mudança desta tentativa. Mudança já aplicada nesta tentativa é revertida antes do retorno.
- Nomear `refactor` como produtor adicional de `IMPLEMENTATION_REPORT` e de `TEST_EVIDENCE` no contrato operacional de artefatos. Não alterar esquema, template nem seções obrigatórias.
- Manter as listas de dependência vazias de `refactor`.
- Estender a regressão estrutural de catálogo já existente e executar os cenários da skill por agente, separados da suíte Node.
- Registrar a mudança como emenda v1-A15 e reconciliar a documentação que declara a contagem de skills.

## Non-goals

- Criar executor JavaScript, redator automático ou nova dependência npm.
- Criar arquivo de teste novo. A suíte Node só acompanha o catálogo, as listas de dependência vazias, os esquemas já definidos e as linhas de produtor.
- Alterar o esquema, os templates ou as seções obrigatórias de `IMPLEMENTATION_REPORT` e de `TEST_EVIDENCE`.
- Acrescentar chave de caminho em `.ai/config.json`. Os diretórios usados são o layout já recomendado.
- Alterar R1–R17, sequências canônicas ou as dependências do manifest.
- Fazer `implement` ou `tdd` invocarem `refactor`, ou reabrir `SPEC-20261009-004`, `SPEC-20261010-001`, `SPEC-20261013-001`, `SPEC-20261013-002` ou `SPEC-20261013-003`.
- Estender ou modificar o ADR `0001`.
- Reescrever `references/architecture-contract-v1.md`.
- Gravar relatório ou evidência `draft`, `blocked` ou parcial.
- Apagar relatório ou evidência existente.
- Invocar `implement`, `tdd`, `diagnose`, `code-review`, `modernize`, `research` ou qualquer outra skill a partir de `refactor`.
- Implementar `edge-case-analysis`, `docs`, `modernize` ou qualquer outra skill scaffold. `diagnose` e `research` já estão operacionais nas emendas v1-A13 e v1-A14.
- Adicionar comando CLI ou target.
- Certificar descoberta real em Cursor, Codex, Gemini Antigravity ou Claude Code.
- Produzir modelo de domínio ou desenho de arquitetura desta emenda.

## Actors

- Solicitante que invoca `refactor`.
- Agente de IA que executa a skill invocada.
- Objetivo estrutural, linha de base, contexto do projeto e testes.

## Functional Requirements

1. `refactor`, quando invocada, lê o contexto do projeto, o objetivo, a linha de base e os testes. Não copia valor secreto; o relatório e a evidência registram só existência e efeito. A invocação é objetivo estrutural sob R15. Evidência: `DECISION-SET-20261013-004` e R15.
2. Quando o gate passa, a skill aplica a menor mudança estrutural no working tree, não grava arquivo de `CHANGE_SET` e cita `working tree`. Grava um relatório `ready` e uma evidência `ready`, com os templates existentes, `created_by: refactor` e as seções obrigatórias. O comportamento externo permanece. Evidência: `DECISION-SET-20261013-004`.
3. A execução seguinte do mesmo objetivo, com insumos iguais, atualiza os mesmos dois arquivos, incrementa `version` e não reaplica a mudança. Evidência: `DECISION-SET-20261013-004`.
4. O mesmo objetivo, com o insumo alterado, atualiza os mesmos arquivos a partir da versão 1 e aplica só o acréscimo estrutural. Evidência: `DECISION-SET-20261013-004`.
5. Contexto do projeto ausente produz `BLOCKED`, recomenda `context-engineering` e não grava arquivo. A skill não executa a recomendada. Evidência: `DECISION-SET-20261013-004`.
6. Linha de base não observada produz `BLOCKED`, recomenda observá-la e repetir `refactor`, e não grava arquivo. Teste que falha antes da mudança, com causa desconhecida, produz `BLOCKED`, recomenda `diagnose` e não altera código. Evidência: `DECISION-SET-20261013-004`.
7. Objetivo ausente, não delimitado ou não estrutural produz `BLOCKED` e recomenda `clarify`. Pedido cujo propósito é mudar comportamento, sem objetivo estrutural e sem autorização explícita, produz `BLOCKED` e recomenda `implement`. Pedido de modernização sob R16 produz `BLOCKED` e recomenda `modernize`. Evidência: `DECISION-SET-20261013-004`, R15 e R16.
8. Objetivo estrutural que autoriza explicitamente uma mudança de comportamento nomeada produz artefatos `ready`. A seção Behaviour Changed registra essa autorização e afirma que o restante do comportamento externo não mudou. Evidência: o invariante da skill e `DECISION-SET-20261013-004`.
9. Pesquisa presente fora de `ready`, ou fato externo que ainda pode mudar o refactor, produz `BLOCKED` e recomenda `research`, sem acesso à rede. Conflito com decisão existente, inclusive o ADR `0001`, produz `BLOCKED`, recomenda `clarify` e preserva a decisão. Evidência: `DECISION-SET-20261013-004`.
10. Mudança que não permanece estrutural, inclusive abstração especulativa, produz `BLOCKED` e não altera código. Teste relevante que falha depois da mudança faz a skill reverter a mudança desta tentativa e devolver `BLOCKED`, sem arquivo desta tentativa. Evidência: o gate de implementação e `DECISION-SET-20261013-004`.
11. Bloqueios combinados nomeiam cada pré-requisito e recomendam o mais cedo. A tentativa bloqueada não apaga relatório ou evidência já existente e não altera código de aplicação desta tentativa. A skill não reescreve arquivo cujo `created_by` seja `implement` ou `tdd`. Evidência: o contrato de falha e `DECISION-SET-20261013-004`.
12. `refactor` não invoca outra skill. Refatoração pronta e não trivial autoriza `code-review` e não o invoca. Refatoração trivial registra que `code-review` pode ser omitido. A skill não grava o glossário, `CONTEXT.md` nem outro artefato, e não estende o ADR `0001`. Evidência: `DECISION-SET-20261013-004` e R13.
13. O catálogo final contém exatamente quinze skills `implemented` e três `scaffold`. `refactor` junta-se às quatorze já implementadas. As três que permanecem `scaffold` são `edge-case-analysis`, `docs` e `modernize`. As listas de dependência de `refactor` permanecem vazias. Evidência: `DECISION-SET-20261013-004`.
14. O contrato operacional de artefatos nomeia `refactor` como produtor de `IMPLEMENTATION_REPORT`, ao lado de `implement`, e de `TEST_EVIDENCE`, ao lado de `tdd` e `implement`. Esquema, template e seções obrigatórias permanecem. Evidência: `DECISION-SET-20261013-004`.

## Business Rules

- R15 permanece a regra de uso. R16 continua a separar modernização de refactor comum. O passo REFACTOR de `tdd` continua dentro de `tdd`.
- Premissa, questão aberta, questão bloqueante e fato externo permanecem distintos.
- Decisão existente prevalece. Conflito com o ADR `0001` bloqueia e preserva o ADR.
- Artefato que não está `ready` não autoriza o refactor.
- `IMPLEMENTATION_REPORT` e `TEST_EVIDENCE` continuam com esquema definido e os mesmos templates. `CHANGE_SET` continua named-only.
- O ADR `0001` continua valendo apenas para a persistência de conjunto de decisões `ready` e `blocked`.
- Recomendar outra skill não cria dependência nem executa a skill.
- Esta emenda operacionaliza uma skill do pacote. Ela não exige `DOMAIN_MODEL` nem `ARCHITECTURE_DESIGN`, no mesmo precedente de `SPEC-20261009-004`, `SPEC-20261010-001` e `SPEC-20261013-001`.

## Non-functional Requirements

- Determinismo: os mesmos insumos produzem as mesmas seções materiais. A `version` muda numa execução posterior.
- Auditabilidade: cada bloqueio cita o insumo usado. O frontmatter lista os identificadores consumidos.
- Portabilidade: a fonte permanece independente de ferramenta e sistema operacional.
- Segurança: o relatório e a evidência não reproduzem segredo.
- Compatibilidade: preservar Node.js >=22, zero dependências npm, 18 skills e quatro targets.

## Technical Constraints

- Alterar somente o necessário para operacionalizar `refactor` e registrar a emenda v1-A15.
- Não alterar o contrato de routing, as sequências canônicas nem os templates.
- A única alteração em `contracts/artifacts.md` são as duas linhas de produtor.
- Não criar runtime nem executor da skill.
- A única escrita própria de `refactor` são o relatório `ready` e a evidência `ready`.
- A regressão determinística estende a asserção de catálogo já existente. Não há arquivo de teste novo.
- Manter LF e CRLF aceitos pelo validador.
- O texto da seção Workflow do contrato e o da fonte são o mesmo.

## Security / Privacy

- Não incluir tokens, credenciais, connection strings nem valores de arquivos de ambiente no relatório ou na evidência.
- Referenciar apenas a existência e o efeito de evidências potencialmente sensíveis.
- Não executar ações externas. A skill não acessa a rede.

## Acceptance Criteria

1. `refactor` está `implemented` de forma consistente no manifest, no contrato e na fonte. O catálogo contém 15 skills `implemented` e 3 `scaffold`. As listas de dependência permanecem vazias.
2. Objetivo estrutural delimitado, com contexto do projeto e linha de base observada que passa, produz relatório `ready`, evidência `ready` com `created_by: refactor`, a mudança estrutural no working tree, comportamento externo inalterado e nenhum arquivo de `CHANGE_SET`.
3. A execução seguinte do mesmo objetivo, com insumos iguais, atualiza os mesmos arquivos e incrementa `version`, sem segunda edição.
4. O mesmo objetivo, com o insumo alterado, atualiza os mesmos arquivos a partir da versão 1 e aplica só o acréscimo estrutural.
5. Contexto ausente produz `BLOCKED`, recomenda `context-engineering` e não grava arquivo.
6. Linha de base não observada produz `BLOCKED` e não grava arquivo.
7. Teste que falha antes da mudança, com causa desconhecida, produz `BLOCKED`, recomenda `diagnose` e não altera código.
8. Objetivo ausente ou não delimitado produz `BLOCKED` e recomenda `clarify`.
9. Pedido de mudança de comportamento, sem objetivo estrutural, produz `BLOCKED` e recomenda `implement`.
10. Autorização explícita de uma mudança nomeada, dentro do objetivo estrutural, produz artefatos `ready` e registra essa autorização, com o restante do comportamento externo inalterado.
11. Pedido de modernização produz `BLOCKED` e recomenda `modernize`.
12. Pesquisa fora de `ready` ou fato externo produz `BLOCKED` e recomenda `research`, sem acesso à rede.
13. Conflito com o ADR `0001` produz `BLOCKED`, recomenda `clarify` e preserva o ADR.
14. Valor secreto citado no insumo não aparece no relatório, na evidência nem no código alterado.
15. Mudança que exige abstração especulativa produz `BLOCKED` e não altera código.
16. Teste que falha depois da mudança reverte a mudança desta tentativa e produz `BLOCKED`, sem arquivo desta tentativa.
17. Bloqueios combinados nomeiam cada pré-requisito e recomendam o mais cedo. A tentativa bloqueada não apaga arquivo existente nem altera código de aplicação.
18. `refactor` não invoca outra skill. Refatoração não trivial autoriza `code-review` e não o invoca. Refatoração trivial registra que `code-review` pode ser omitido.
19. A skill não reescreve relatório ou evidência de `implement` ou `tdd`, não grava glossário nem `CONTEXT.md`, e não estende o ADR `0001`.
20. Esquema, templates, R1–R17, dependências, targets, CLI e as outras skills permanecem inalterados, salvo as duas linhas de produtor. O ADR `0001` não é estendido. Nenhuma chave nova entra em `.ai/config.json`. `tdd` e `implement` não passam a invocar `refactor`.
21. A regressão determinística cobre a migração 15/3, as listas de dependência vazias, a preservação dos esquemas e templates e as linhas de produtor. Nenhum arquivo de teste novo é adicionado.
22. Os cenários de estrutura, atualização, autorização, bloqueio e sigilo ficam em evidência separada dos testes Node.
23. `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
24. Proveniência, README, estado arquitetural, padrões, estado do projeto, frase de lifecycle, evidências e handoff refletem a v1-A15 sem declarar capacidades não verificadas.

## Risks

- Confundir refactor com `implement` apagaria R15. O pedido de mudança de comportamento precisa bloquear e recomendar `implement`.
- Não reverter um teste que falhou depois da mudança deixaria comportamento alterado. A tentativa bloqueada reverte a própria mudança.
- Um agente pode copiar segredo, gravar arquivo de `CHANGE_SET` ou reescrever evidência de outra skill. Os cenários precisam mostrar a omissão e a única escrita.
- Testes estruturais podem ser confundidos com execução da skill. A evidência agent-driven fica registrada separadamente e não certifica os quatro produtos.
- Ampliar o produtor sem manter template e seções pareceria esquema novo. A emenda só acrescenta o nome nas duas linhas de produtor.

## Open Questions

Nenhuma questão bloqueante. Descoberta real nos quatro produtos e reconciliação com GitHub Issues continuam sem verificação e não alteram este recorte. Executor automático, arquivo de teste novo, alteração de esquema, extensão do ADR `0001` e implementação das outras três skills scaffold permanecem fora deste recorte.

## Testing Decisions

- Um bom teste observa comportamento externo: insumos entram, relatório e evidência `ready` saem com a mudança estrutural, ou o relatório `BLOCKED` sai sem arquivo e sem mudança desta tentativa. Não afirma redação interna da skill além do resultado observável.
- O teste determinístico, no seam de catálogo já existente, passa a exigir `refactor` entre as skills `implemented`, quinze no total e três `scaffold`, preserva as listas de dependência vazias, preserva os esquemas e os templates atuais e passa a exigir as linhas de produtor com `refactor`. Nenhum executor Node será criado. Nenhum arquivo de teste novo será criado.
- Os cenários conduzidos por agente aplicam o contrato e a fonte em diretório temporário e inspecionam o relatório, a evidência e a árvore, ou a ausência de arquivo junto com o relatório `BLOCKED`. Cobrem estrutura estável, atualização do mesmo arquivo, autorização nomeada, bloqueio e sigilo.
- O precedente é a asserção de catálogo da v1-A12 e a evidência separada da suíte Node naquela emenda.
- Asserções não serão relaxadas para acomodar a implementação.

## Further Notes

Esta spec satisfaz o gate de especificação: escopo delimitado, critérios verificáveis e nenhuma ambiguidade bloqueante. R8 e R9 não se aplicam. O conjunto de tickets é `TICKET-SET-20261013-004`. Os tickets 01 e 02 estão concluídos. A frontier desta spec está vazia.

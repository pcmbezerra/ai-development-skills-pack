---
artifact: spec
id: SPEC-20261013-002
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261013-002
  - HANDOFF-20261013-001
  - HANDOFF-20261006-001
  - SPEC-20261013-001
  - CONTEXT.md
  - ADR-0001
---

# diagnose operacional — emenda v1-A13

## Problem

A skill `diagnose` existe apenas como scaffold. O contrato, o template, as seções obrigatórias e a regra R5 já definem o diagnóstico de uma falha cuja causa é desconhecida, mas a skill não tem instruções operacionais para gravar o `DIAGNOSIS_REPORT` `ready` e parar sem aplicar a correção.

## Goal

Tornar `diagnose` operacional na emenda v1-A13. Quando invocada, a skill classifica a causa a partir de evidência observada, grava um diagnóstico `ready` e devolve `BLOCKED` sem arquivo desta tentativa quando o gate não passa. Causa que não está confirmada, ou causa confirmada sem evidência de regressão, não autoriza implementação.

## Scope

- Implementar o workflow de `diagnose` no contrato e na fonte, com o mesmo texto operacional nos dois lugares. Evidência: `DECISION-SET-20261013-002` e a regra de status `implemented` em `contracts/skill-contract.md`.
- Migrar `diagnose` de `scaffold` para `implemented` no manifest, no contrato e na fonte.
- Consumir sintoma, repositório, contexto do projeto e, quando existirem, logs, testes ou evidência de runtime. Ausência desses registros não bloqueia.
- Gravar um único `DIAGNOSIS_REPORT` `ready` por sintoma em `.ai/artifacts/diagnosis/`, com o template existente, `created_by: diagnose` e as seções obrigatórias preenchidas.
- Classificar a causa como `confirmed root cause`, `probable root cause` ou `unconfirmed hypothesis`. Causa confirmada exige reprodução observada que isole uma causa.
- Autorizar a recomendação de correção somente quando a causa está confirmada, a reprodução foi observada e já existe evidência de regressão. Sem essa evidência, a próxima ação nomeia `tdd` e não o executa.
- Uma execução posterior do mesmo sintoma atualiza o mesmo arquivo e incrementa `version`. Não apaga diagnóstico existente.
- O caminho bloqueado devolve o relatório `BLOCKED` contratado, sem arquivo, sem mudança de código e sem teste desta tentativa.
- Manter o ADR `0001` restrito ao conjunto de decisões e sem modificação. Não reabrir `SPEC-20261013-001`.
- Preservar a dependência opcional `tdd`. A frase de invocação passa a "Optional, not invoked".
- Mover as regressões que mutam uma skill `scaffold` de `diagnose` para `research`. Não criar arquivo de teste novo.
- Registrar a mudança como emenda v1-A13 e reconciliar a documentação que declara a contagem de skills.

## Non-goals

- Criar executor JavaScript, redator automático ou nova dependência npm.
- Criar arquivo de teste novo. A suíte Node só acompanha o catálogo, a dependência opcional `tdd` e o esquema já definido de `DIAGNOSIS_REPORT`.
- Alterar o esquema, o template, as seções obrigatórias ou o produtor já declarado de `DIAGNOSIS_REPORT`.
- Acrescentar chave de caminho em `.ai/config.json`. O diretório usado é o layout já recomendado.
- Alterar R1–R17, sequências canônicas ou as listas de dependência do manifest.
- Fazer `diagnose` invocar `tdd`, `implement` ou `research`, ou reabrir `SPEC-20261013-001`.
- Estender ou modificar o ADR `0001`.
- Gravar diagnóstico `draft`, `blocked` ou parcial.
- Apagar diagnóstico existente.
- Alterar código de aplicação ou gravar teste a partir de `diagnose`.
- Implementar `research`, `refactor`, `edge-case-analysis`, `docs`, `modernize` ou qualquer outra skill scaffold.
- Adicionar comando CLI ou target.
- Certificar descoberta real em Cursor, Codex, Gemini Antigravity ou Claude Code.
- Produzir modelo de domínio ou desenho de arquitetura desta emenda.

## Actors

- Solicitante que invoca `diagnose`.
- Agente de IA que executa a skill invocada.
- Sintoma, repositório, contexto do projeto e evidência disponível.

## Functional Requirements

1. `diagnose`, quando invocada, lê o sintoma, o repositório, o contexto do projeto e a evidência de logs, testes ou runtime quando ela existe. Não copia valor secreto; o diagnóstico registra só existência e efeito. A invocação é falha desconhecida sob R5. Evidência: `DECISION-SET-20261013-002` e R5.
2. Quando o gate passa, a skill grava um diagnóstico `ready` em `.ai/artifacts/diagnosis/`, com o template existente, `created_by: diagnose`, as seções obrigatórias preenchidas e os identificadores consumidos em `inputs`. O arquivo não conserva marcador de rascunho. A seção Root Cause usa exatamente uma das três classificações. Evidência: `DECISION-SET-20261013-002`.
3. Causa confirmada, com reprodução observada e teste existente que falha, produz diagnóstico `ready` cuja correção recomendada é a menor correção e cuja próxima ação nomeia `implement` sem executá-lo. Evidência: `DECISION-SET-20261013-002`.
4. Causa provável, com alternativa restante, produz diagnóstico `ready` e não autoriza `implement`. Hipótese não confirmada, inclusive quando logs estão ausentes, produz diagnóstico `ready`, não inventa linhas de log e não autoriza `implement`. Evidência: a seção 7.7 e `DECISION-SET-20261013-002`.
5. Causa confirmada sem evidência de regressão produz diagnóstico `ready`, não autoriza a correção e nomeia `tdd` sem gravar teste e sem executar `tdd`. Evidência: `DECISION-SET-20261013-002`.
6. Uma execução posterior do mesmo sintoma atualiza o mesmo arquivo e incrementa `version`. Não cria duplicata e não apaga diagnóstico. Insumos iguais preservam as seções materiais. Evidência: `DECISION-SET-20261013-002` e o seam de atualização no lugar.
7. Contexto do projeto ausente ou fora de `ready` produz `BLOCKED`, recomenda `context-engineering` e não grava arquivo. Sintoma desconhecido produz `BLOCKED` e recomenda fornecê-lo e repetir `diagnose`. Repositório não observado produz `BLOCKED` e recomenda observá-lo e repetir `diagnose`. Evidência: `DECISION-SET-20261013-002`.
8. Conflito com decisão existente, inclusive o ADR `0001`, produz `BLOCKED`, recomenda `clarify` e preserva o ADR. Fato externo que teria de ser declarado como causa produz `BLOCKED` e recomenda `research`, sem acesso à rede. Evidência: `DECISION-SET-20261013-002`.
9. O relatório bloqueado traz os cinco campos contratados, nomeia cada pré-requisito ausente e recomenda a skill ou ação do bloqueio mais cedo: contexto do projeto, sintoma, repositório, decisão, fato externo. Uma tentativa bloqueada não apaga diagnóstico já existente, não altera código de aplicação e não grava teste. Evidência: o contrato de falha e `DECISION-SET-20261013-002`.
10. `diagnose` não invoca a próxima skill, não grava o glossário, `CONTEXT.md` nem outro artefato, e não estende o ADR `0001`. Evidência: `DECISION-SET-20261013-002`.
11. O catálogo final contém exatamente treze skills `implemented` e cinco `scaffold`. `diagnose` junta-se a `setup-ai-development-skills`, `context-engineering`, `workflow`, `clarify`, `to-spec`, `to-tickets`, `domain-modelling`, `architecture-design`, `implement`, `tdd`, `code-review` e `handoff`. As cinco que permanecem `scaffold` são `research`, `refactor`, `edge-case-analysis`, `docs` e `modernize`. A dependência opcional `tdd` permanece. Evidência: `DECISION-SET-20261013-002`.

## Business Rules

- R5 permanece a regra de uso. A invocação exige sintoma conhecido e causa desconhecida.
- Premissa, questão aberta, questão bloqueante e fato externo permanecem distintos.
- Decisão existente prevalece. Conflito com o ADR `0001` bloqueia e preserva o ADR.
- Artefato que não está `ready` não autoriza implementação. Contexto fora de `ready` bloqueia o diagnóstico.
- `DIAGNOSIS_REPORT` continua com esquema definido e o mesmo template.
- O ADR `0001` continua valendo apenas para a persistência de conjunto de decisões `ready` e `blocked`.
- Recomendar `context-engineering`, `clarify`, `research`, `tdd` ou `implement` não cria dependência nem executa a skill.
- Esta emenda operacionaliza uma skill do pacote. Ela não exige `DOMAIN_MODEL` nem `ARCHITECTURE_DESIGN`, no mesmo precedente de `SPEC-20261009-002`, `SPEC-20261009-003`, `SPEC-20261009-004`, `SPEC-20261010-001` e `SPEC-20261013-001`.

## Non-functional Requirements

- Determinismo: os mesmos insumos produzem as mesmas seções materiais. A `version` muda numa execução posterior.
- Auditabilidade: cada bloqueio cita o insumo usado. O frontmatter lista os identificadores consumidos.
- Portabilidade: a fonte permanece independente de ferramenta e sistema operacional.
- Segurança: o diagnóstico não reproduz segredo. Medição de desempenho não observada não é inventada.
- Compatibilidade: preservar Node.js >=22, zero dependências npm, 18 skills e quatro targets.

## Technical Constraints

- Alterar somente o necessário para operacionalizar `diagnose` e registrar a emenda v1-A13.
- Não alterar o contrato de routing, o contrato de artefatos, as sequências canônicas nem o template de diagnóstico.
- Não criar runtime nem executor da skill.
- A única escrita própria de `diagnose` é o diagnóstico `ready`.
- A regressão determinística estende a asserção de catálogo já existente e move o fixture de skill `scaffold` para `research`. Não há arquivo de teste novo.
- Manter LF e CRLF aceitos pelo validador.
- O texto da seção Workflow do contrato e o da fonte são o mesmo.

## Security / Privacy

- Não incluir tokens, credenciais, connection strings nem valores de arquivos de ambiente no diagnóstico.
- Referenciar apenas a existência e o efeito de evidências potencialmente sensíveis.
- Não executar ações externas. A skill não acessa a rede.

## Acceptance Criteria

1. `diagnose` está `implemented` de forma consistente no manifest, no contrato e na fonte. O catálogo contém 13 skills `implemented` e 5 `scaffold`. A dependência opcional continua sendo somente `tdd`.
2. Invocação com contexto `ready`, sintoma conhecido, repositório observado, reprodução observada e teste existente que falha produz diagnóstico `ready` com `created_by: diagnose`, as seções obrigatórias, causa confirmada e nenhum marcador de rascunho. A próxima ação nomeia `implement` e não o executa.
3. Causa provável não autoriza `implement`. Hipótese não confirmada não inventa log e não autoriza `implement`.
4. Causa confirmada sem evidência de regressão não autoriza a correção, nomeia `tdd` e não grava teste.
5. A execução seguinte do mesmo sintoma, com insumos iguais, atualiza o mesmo arquivo e incrementa `version`.
6. O mesmo sintoma, com evidência nova, atualiza o mesmo arquivo a partir da versão 1 e registra o acréscimo.
7. Contexto ausente e contexto fora de `ready` produzem `BLOCKED`, recomendam `context-engineering` e não gravam arquivo.
8. Sintoma desconhecido produz `BLOCKED` e não grava arquivo. Repositório não observado produz `BLOCKED` e não grava arquivo.
9. Valor secreto citado no insumo não aparece no diagnóstico.
10. Conflito com o ADR `0001` produz `BLOCKED`, recomenda `clarify` e preserva o ADR.
11. Fato externo não verificado, se tivesse de constar como causa, produz `BLOCKED` e recomenda `research`, sem acesso à rede.
12. Bloqueios combinados nomeiam cada pré-requisito e recomendam o mais cedo. A tentativa bloqueada não apaga diagnóstico existente, não altera código de aplicação e não grava teste.
13. `diagnose` não invoca outra skill e não grava glossário, `CONTEXT.md` nem outro artefato.
14. Esquema, template, R1–R17, listas de dependência, targets, CLI e as outras skills permanecem inalterados. O ADR `0001` não é estendido. Nenhuma chave nova entra em `.ai/config.json`.
15. A regressão determinística cobre a migração 13/5, a dependência opcional `tdd` e a preservação de `DIAGNOSIS_REPORT` como esquema definido com o template atual. As mutações de skill `scaffold` usam `research`. Nenhum arquivo de teste novo é adicionado.
16. Os cenários de classificação, atualização, bloqueio e sigilo ficam em evidência separada dos testes Node.
17. `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
18. Proveniência, README, estado arquitetural, padrões, estado do projeto, frase de lifecycle, evidências e handoff refletem a v1-A13 sem declarar capacidades não verificadas.

## Risks

- Tratar hipótese não confirmada como causa confirmada autorizaria correção sem isolamento. A classificação e a autorização da correção precisam ficar separadas.
- Não gravar o caminho bloqueado pode parecer perda de trabalho. O relatório `BLOCKED` e o diagnóstico já existente conservam a fronteira.
- Um agente pode copiar segredo, gravar teste ou alterar código. Os cenários precisam mostrar a omissão e a única escrita.
- Testes estruturais podem ser confundidos com execução da skill. A evidência agent-driven fica registrada separadamente e não certifica os quatro produtos.

## Open Questions

Nenhuma questão bloqueante. Descoberta real nos quatro produtos e reconciliação com GitHub Issues continuam sem verificação e não alteram este recorte. Executor automático, arquivo de teste novo, alteração de esquema, extensão do ADR `0001` e implementação das outras cinco skills scaffold permanecem fora deste recorte.

## Testing Decisions

- Um bom teste observa comportamento externo: insumos entram, diagnóstico `ready` sai, ou o relatório `BLOCKED` sai sem arquivo. Não afirma redação interna da skill além do resultado observável.
- O teste determinístico, no seam de catálogo já existente, passa a exigir `diagnose` entre as skills `implemented`, treze no total e cinco `scaffold`, preserva a dependência opcional `tdd` e preserva `DIAGNOSIS_REPORT` com esquema `defined` e o template atual. As mutações que exigem uma skill `scaffold` passam a usar `research`. Nenhum executor Node será criado. Nenhum arquivo de teste novo será criado.
- Os cenários conduzidos por agente aplicam o contrato e a fonte em diretório temporário e inspecionam o diagnóstico, ou a ausência de arquivo junto com o relatório `BLOCKED`. Cobrem classificação, atualização do mesmo arquivo, bloqueio e sigilo.
- O precedente é a asserção de catálogo da v1-A12 e a evidência separada da suíte Node naquela emenda.
- Asserções não serão relaxadas para acomodar a implementação.

## Further Notes

Esta spec satisfaz o gate de especificação: escopo delimitado, critérios verificáveis e nenhuma ambiguidade bloqueante. R8 e R9 não se aplicam. O conjunto de tickets é `TICKET-SET-20261013-002`. Os tickets 01 e 02 estão concluídos. A frontier desta spec está vazia.

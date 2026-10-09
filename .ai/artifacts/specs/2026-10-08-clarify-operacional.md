---
artifact: spec
id: SPEC-20261008-002
version: 1
status: ready
created_by: to-spec
inputs:
  - HANDOFF-20261008-001
  - maintainer-decision-2026-10-08-clarify
  - CONTEXT.md
  - ADR-0001
---

# Clarify operacional — emenda v1-A5

## Problem

A skill `clarify` existe apenas como scaffold. R3, o contrato de artefatos e o template de `DECISION_SET` já definem o que é ambiguidade material e quais seções o conjunto de decisões possui, mas a skill ainda não tem instruções operacionais para distinguir decisão, premissa, questão aberta, questão bloqueante e fato externo, nem para gravar o resultado.

## Goal

Tornar `clarify` operacional para resolver ambiguidades materiais, gravar um conjunto de decisões `ready` ou `blocked` e encerrar sem executar a skill seguinte.

## Scope

- Implementar o workflow de resolução no contrato e na fonte da skill.
- Migrar `clarify` de `scaffold` para `implemented` no manifest, contrato e fonte.
- Consultar decisão existente e contexto do projeto antes de perguntar.
- Compor `context-engineering` somente quando evidência do repositório puder responder ou reclassificar uma ambiguidade material e o contexto estiver ausente ou insuficiente.
- Perguntar, na mesma resposta, todas as questões bloqueantes que a evidência não responde.
- Gravar conjunto `ready` e conjunto `blocked` em `.ai/artifacts/decisions/`, reutilizando o template existente e atualizando o arquivo do mesmo objetivo.
- Registrar a escolha de persistir o conjunto bloqueado no ADR `0001`.
- Registrar no glossário do pacote os termos fechados na modelagem. A skill, ao executar, não grava `CONTEXT.md`.
- Adicionar a regressão estrutural do catálogo e executar cenários de ambiguidade, bloqueio e conjunto de decisões por agente.
- Registrar a mudança como emenda v1-A5 e reconciliar a documentação que declara a contagem de skills.

## Non-goals

- Criar executor JavaScript, entrevistador automático ou nova dependência npm.
- Alterar o esquema, o template, as seções obrigatórias ou o produtor de `DECISION_SET`.
- Alterar R1–R17, sequências canônicas, responsabilidades das outras skills ou dependências do manifest.
- Implementar `to-spec`, `research`, `domain-modelling` ou qualquer outra skill scaffold.
- Gravar ADR de produto, `CONTEXT.md` ou código da aplicação como saída de `clarify`.
- Adicionar comando CLI ou target.
- Certificar execução real em Cursor, Codex, Gemini Antigravity ou Claude Code.

## Actors

- Usuário ou mantenedor que precisa fechar uma ambiguidade material.
- Agente de IA que executa a skill `clarify`.
- Decisões existentes em ADR, conjunto de decisões anterior e contexto do projeto.
- `context-engineering`, quando a evidência do repositório pode responder à pergunta.

## Functional Requirements

1. A skill deve ler a solicitação, as decisões existentes e o contexto do projeto. Verbete de glossário não é decisão existente.
2. A skill deve classificar cada incógnita como ambiguidade material, fato externo ou questão aberta.
3. Ambiguidade material é uma pergunta sem resposta que pode alterar escopo, comportamento, arquitetura, modelo de dados, segurança ou critérios de aceitação do próximo passo pedido.
4. Decisão resolvida exige escolha explícita do solicitante, decisão existente ou evidência do repositório que já responda à pergunta, com essa evidência identificável. A skill não inventa essa escolha.
5. Premissa não fecha ambiguidade material. Pedir que o agente assuma uma premissa não é aceitação. Quando o solicitante declara a premissa como decisão sua, essa aceitação é uma decisão resolvida e a premissa permanece rotulada como premissa.
6. Alternativa rejeitada só entra no conjunto quando uma decisão resolvida ou existente a descarta.
7. Conflito entre a solicitação e uma decisão existente preserva a decisão existente e vira questão bloqueante. A skill não a substitui.
8. Fato externo não vira decisão resolvida. A skill recomenda `research` e mantém o conjunto bloqueado enquanto o fato alterar o próximo passo.
9. A skill não faz pergunta cuja resposta já esteja na solicitação, no repositório ou no contexto do projeto.
10. Quando evidência do repositório puder responder ou reclassificar a ambiguidade e o contexto estiver ausente ou insuficiente, a skill executa `context-engineering` antes de perguntar. Preferência que o repositório não contém não aciona essa composição.
11. As questões bloqueantes restantes são perguntadas juntas na mesma resposta.
12. O conjunto é gravado em `.ai/artifacts/decisions/` com o template e o frontmatter existentes. Status `ready` quando não resta questão bloqueante, ainda que existam questões abertas. Status `blocked` quando resta ao menos uma, inclusive em resposta parcial.
13. Uma segunda execução do mesmo objetivo atualiza o mesmo arquivo e incrementa `version`. Não cria duplicata nem altera decisão resolvida em silêncio.
14. Conjunto `blocked`, entrada `blocked` e premissa sem aceitação explícita não autorizam `to-spec` nem `implement`.
15. A skill encerra no conjunto. Informa caminho, status, autorização do próximo passo e a próxima skill recomendada, sem invocá-la.
16. Valores secretos não são copiados; a evidência registra existência e efeito arquitetural.
17. O catálogo final contém exatamente quatro skills `implemented` e quatorze `scaffold`.

## Business Rules

- Ambiguidade material precede especificação e implementação.
- Decisão resolvida, premissa, questão aberta, questão bloqueante e fato externo permanecem distintos.
- Decisão existente prevalece até que uma nova decisão a substitua explicitamente.
- Artefato bloqueado não autoriza etapa downstream.
- `context-engineering` continua dependência opcional.
- `DECISION_SET` continua com esquema definido e o mesmo template.

## Non-functional Requirements

- Determinismo: a mesma solicitação, as mesmas decisões e o mesmo contexto produzem o mesmo conjunto material.
- Auditabilidade: cada decisão resolvida e cada questão bloqueante cita a evidência usada.
- Portabilidade: a fonte permanece independente de ferramenta e sistema operacional.
- Segurança: o conjunto não reproduz segredo.
- Compatibilidade: preservar Node.js >=22, zero dependências npm, 18 skills e quatro targets.

## Technical Constraints

- Alterar somente o necessário para operacionalizar `clarify` e registrar/validar v1-A5.
- Não alterar `contracts/routing.md`, `contracts/artifacts.md`, `contracts/workflows.md` nem `templates/artifacts/decision-set.md`.
- Não criar runtime de entrevista.
- A única escrita própria de `clarify` é o conjunto de decisões. A composição opcional de `context-engineering` preserva o limite de escrita já definido por essa skill e só ocorre quando a evidência do repositório pode responder.
- Manter LF/CRLF aceitos pelo validador.

## Security / Privacy

- Não incluir tokens, credenciais, connection strings ou valores de arquivos de ambiente no conjunto.
- Referenciar apenas a existência e o efeito arquitetural de evidências potencialmente sensíveis.
- Não executar ações externas. A recomendação de `research` não acessa a rede.

## Acceptance Criteria

1. `clarify` está `implemented` de forma consistente no manifest, contrato e fonte; o catálogo contém 4 skills `implemented` e 14 `scaffold`.
2. A skill distingue decisão resolvida, premissa, questão aberta, questão bloqueante e fato externo.
3. Solicitação que já contém a decisão produz conjunto `ready`, sem pergunta supérflua e sem invocar `to-spec`.
4. Ambiguidade material sem resposta produz conjunto `blocked`, com todas as questões bloqueantes na mesma resposta.
5. Resposta parcial permanece `blocked`; a resposta seguinte do mesmo objetivo atualiza o mesmo arquivo.
6. Evidência já disponível não é perguntada. Contexto ausente e material aciona `context-engineering` antes da pergunta; preferência ausente do repositório não aciona.
7. Premissa não fecha o gate. Conflito com decisão existente não a substitui.
8. Fato externo recomenda `research` e não é registrado como decisão resolvida.
9. Entrada bloqueada não autoriza implementação.
10. Questão aberta pode coexistir com conjunto `ready`.
11. Segredo não aparece no conjunto gravado.
12. Esquema, template, R1–R17, dependências, targets, CLI e as outras skills permanecem inalterados.
13. A regressão determinística cobre a migração 4/14 e a preservação de `DECISION_SET` como esquema definido.
14. Os cenários de ambiguidade, bloqueio e conjunto de decisões ficam em evidência separada dos testes Node.
15. `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
16. Proveniência, README, estado arquitetural, evidências e handoff refletem v1-A5 sem declarar capacidades não verificadas.
17. Review final não contém achado bloqueante de Standards ou Spec.

## Risks

- Instruções em linguagem natural podem classificar de modo diferente entre agentes; as definições do glossário e os cenários reduzem essa variação.
- Gravar conjunto bloqueado pode parecer autorização; o status `blocked` e o relatório de falha obrigatório mitigam essa leitura.
- Compor `context-engineering` pode escrever os cinco documentos de contexto; a condição restrita evita essa escrita para preferência do usuário.
- Testes estruturais podem ser confundidos com execução da skill; a evidência agent-driven será registrada separadamente.

## Open Questions

Nenhuma questão bloqueante. Executor automático, alteração de esquema e implementação de `to-spec` permanecem fora deste recorte.

## Implementation Decisions

- A mudança será registrada como emenda v1-A5.
- A persistência de conjunto `ready` e `blocked` segue o ADR `0001`, aceito pelo mantenedor em 2026-10-08.
- O seam determinístico é o catálogo público já coberto por `tests/validate-skills.test.mjs`. O seam semântico é a aplicação agent-driven do workflow, com inspeção do conjunto gravado em diretório temporário.
- A implementação será dividida em dois tickets lineares: operacionalização e fechamento/validação.
- Publicação no GitHub não foi solicitada; o Markdown local permanece a fonte de verdade.

## Testing Decisions

- O teste determinístico verifica lifecycle, contagem 4/14 e a preservação do esquema definido de `DECISION_SET`.
- Cenários conduzidos por agente verificam ambiguidade, bloqueio, atualização do mesmo arquivo, contexto condicional, premissa, conflito, fato externo, entrada bloqueada, questão aberta e sigilo.
- Não será criado executor apenas para tornar as instruções testáveis em Node.js.

## Further Notes

Esta SPEC satisfaz o specification gate: escopo delimitado, critérios verificáveis e nenhuma ambiguidade bloqueante. O `TICKET-SET-20261008-002` pode ser executado na ordem declarada.

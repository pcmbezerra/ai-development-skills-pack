---
artifact: spec
id: SPEC-20261008-001
version: 1
status: ready
created_by: to-spec
inputs:
  - HANDOFF-20261006-001
  - maintainer-decisions-2026-10-08
  - CONTEXT.md
---

# Workflow operacional — emenda v1-A4

## Problem

A skill `workflow` existe apenas como scaffold. As regras R1–R17, o catálogo e as sequências canônicas permitem inferir rotas, mas a skill ainda não possui instruções operacionais para produzir um `WORKFLOW_PLAN`, reconhecer pré-requisitos, respeitar o ciclo de vida das skills ou bloquear uma execução indisponível.

## Goal

Tornar `workflow` operacional como roteador consultivo: interpretar uma solicitação e recomendar uma sequência mínima, justificada e executável de skills, sem executar etapas, modificar código ou inventar schema para `WORKFLOW_PLAN`.

## Scope

- Implementar o workflow de roteamento no contrato e na fonte da skill.
- Migrar `workflow` de `scaffold` para `implemented` no manifest, contrato e fonte.
- Aplicar R1–R17, o estado dos artefatos, os pré-requisitos e o lifecycle das skills.
- Produzir um único plano preferencial, mínimo e condicional, diretamente na conversa.
- Bloquear a execução na primeira skill indisponível, sem ocultar a rota completa.
- Adicionar regressões estruturais e executar nove cenários adversariais por agente.
- Registrar a mudança como emenda v1-A4 e atualizar documentação e handoff.

## Non-goals

- Criar router, executor ou orquestrador em JavaScript.
- Executar automaticamente qualquer skill recomendada.
- Persistir `WORKFLOW_PLAN` ou criar schema/template para ele.
- Alterar R1–R17, sequências canônicas, responsabilidades, dependências ou artefatos.
- Implementar qualquer outra skill scaffold.
- Adicionar comando CLI, target ou dependência npm.
- Certificar execução real em Cursor, Codex, Gemini Antigravity ou Claude Code.

## Actors

- Usuário ou mantenedor que solicita orientação de workflow.
- Agente de IA que executa a skill `workflow`.
- Skills do catálogo, cada uma com lifecycle e pré-requisitos declarados.
- Artefatos disponíveis, usados como evidência de prontidão e continuidade.

## Functional Requirements

1. A skill deve ler a solicitação, o manifest, as regras de routing, os artefatos disponíveis e o contexto do projeto quando material para a decisão.
2. A skill deve respeitar a precedência R1–R17, incluindo invocação explícita, ambiguidade, fatos externos desconhecidos, falhas sem causa e mudanças delimitadas.
3. O resultado deve conter uma única sequência preferencial e somente as etapas necessárias para a solicitação.
4. Para cada etapa, o resultado deve informar motivo, pré-requisitos, disponibilidade e condição aplicável, sem transformar essa apresentação em schema canônico.
5. O resultado deve indicar a próxima ação executável e qualquer ponto de bloqueio.
6. A skill não deve executar etapas do plano, modificar código ou produzir artefatos downstream.
7. Quando fatos do repositório puderem alterar materialmente a rota e `PROJECT_CONTEXT` estiver ausente ou insuficiente, a sequência deve começar por `context-engineering`.
8. Quando a solicitação for autocontida, a ausência de `PROJECT_CONTEXT` não deve bloquear o roteamento nem criar dependência global nova.
9. Antes de recomendar consumo de um artefato, a skill deve verificar apenas metadados, seções obrigatórias e quality gate pertinentes.
10. Artefato `draft`, `blocked`, incompleto ou incompatível deve encaminhar a rota de volta à skill produtora responsável.
11. Quando uma etapa necessária estiver `scaffold`, a skill deve apresentar a rota completa, identificar a primeira etapa indisponível e retornar o formato contratado de `Status: BLOCKED`.
12. Alternativas só devem aparecer quando uma decisão material precisa ser resolvida; nesse caso, `clarify` deve ser a primeira etapa aplicável.
13. `WORKFLOW_PLAN` deve permanecer uma saída apenas nomeada, comunicada na resposta da execução e não persistida por `workflow`.
14. O catálogo final deve conter exatamente três skills `implemented` e quinze `scaffold`.

## Business Rules

- **Plano de workflow** é uma recomendação mínima e justificada; não é execução automática.
- Invocação explícita prevalece, salvo pré-requisito bloqueante.
- Ambiguidade material deve ser resolvida antes de especificação ou implementação.
- Fato externo desconhecido deve ser pesquisado antes de orientar decisão dependente dele.
- Falha com causa desconhecida deve ser diagnosticada antes da correção.
- Artefato bloqueado não autoriza etapa downstream.
- Skill scaffold pode integrar a rota, mas não pode ser apresentada como executável.
- Estado de skill é independente da prontidão dos targets.

## Non-functional Requirements

- Determinismo: entradas equivalentes e o mesmo estado do catálogo devem gerar a mesma rota material.
- Minimalidade: nenhuma etapa sem justificativa deve entrar no plano.
- Auditabilidade: decisões de roteamento e bloqueios devem citar a regra ou evidência pertinente.
- Portabilidade: a fonte da skill deve permanecer independente de ferramenta e sistema operacional.
- Segurança: o plano não deve reproduzir segredos encontrados em contexto ou artefatos.
- Compatibilidade: preservar Node.js >=22, zero dependências npm e os quatro targets atuais.

## Technical Constraints

- Alterar somente o necessário para operacionalizar `workflow` e registrar/validar v1-A4.
- Manter `WORKFLOW_PLAN` como `named-only` no registro de artefatos.
- Não alterar `contracts/routing.md`, `contracts/workflows.md` ou `contracts/artifacts.md`, salvo contradição comprovada com esta SPEC.
- Não criar arquivos de runtime para roteamento.
- Manter LF/CRLF aceitos pelo validador.
- Preservar exatamente 18 skills e quatro targets.

## Security / Privacy

- Não incluir tokens, credenciais, connection strings ou valores de arquivos de ambiente no plano.
- Referenciar apenas a existência e o efeito arquitetural de evidências potencialmente sensíveis.
- Não executar ações externas nem persistir conteúdo da solicitação por efeito da skill.

## Acceptance Criteria

1. `workflow` está `implemented` de forma consistente no manifest, contrato e fonte; o catálogo contém 3 skills `implemented` e 15 `scaffold`.
2. A skill produz uma única rota mínima, justificada e condicional, com próxima ação, pré-requisitos, disponibilidade e bloqueios.
3. Invocação explícita com pré-requisitos satisfeitos preserva a precedência R1.
4. Solicitação materialmente ambígua roteia primeiro para `clarify`.
5. Falha com causa desconhecida roteia primeiro para `diagnose`.
6. Mudança clara e delimitada roteia diretamente para `implement`, com composições somente quando justificadas.
7. Fato externo desconhecido roteia para `research` antes da decisão dependente.
8. Contexto material ausente roteia primeiro para `context-engineering`; solicitações autocontidas não recebem essa etapa automaticamente.
9. Artefato `draft`, `blocked`, incompleto ou incompatível retorna à skill produtora e não libera consumo downstream.
10. Quando uma skill necessária está `scaffold`, a rota completa é apresentada, a primeira indisponibilidade é marcada e a execução termina em `Status: BLOCKED` no formato contratado.
11. `workflow` não executa skills, não modifica código e não persiste `WORKFLOW_PLAN`.
12. Nenhum schema, template, dependência, target, comando CLI ou regra R1–R17 é adicionado ou alterado.
13. Regressões automatizadas cobrem a migração consistente, a contagem 3/15 e os limites estruturais pertinentes.
14. Os nove cenários adversariais aprovados possuem evidência separada dos testes determinísticos.
15. `npm run validate`, `npm run skills:validate`, `npm test` e `git diff --check` terminam com código zero.
16. Proveniência, README, estado arquitetural, evidências e handoff refletem v1-A4 sem declarar capacidades não verificadas.
17. Review final não contém achado bloqueante de Standards ou Spec.

## Risks

- Instruções em linguagem natural podem gerar rotas diferentes entre agentes; precedência explícita e cenários adversariais reduzem essa variação.
- Um plano que inclua skills scaffold pode parecer executável; disponibilidade e bloqueio obrigatório mitigam essa interpretação.
- Validar artefatos em profundidade duplicaria responsabilidades; a verificação fica limitada ao contrato e ao gate necessários para roteamento.
- Testes estruturais podem ser confundidos com execução real; evidências determinísticas e conduzidas por agente serão registradas separadamente.

## Open Questions

Nenhuma questão bloqueante. Persistência de `WORKFLOW_PLAN`, roteamento automático e implementação das demais skills permanecem fora deste recorte.

## Implementation Decisions

- A mudança será registrada como emenda v1-A4, sem ADR.
- O plano será não persistido e não normativo quanto à apresentação.
- `context-engineering` será condicional à necessidade material de contexto, sem nova dependência no manifest.
- A implementação será dividida em dois tickets lineares: operacionalização e fechamento/validação.
- Publicação no GitHub não foi solicitada; o conjunto local será a fonte de verdade até eventual reconciliação remota.

## Testing Decisions

- Testes automatizados verificarão lifecycle, consistência entre fontes, contagens e invariantes estruturais.
- Cenários conduzidos por agente verificarão semântica de routing, artefatos, contexto e bloqueio por scaffold.
- Não será criado executor apenas para tornar instruções de agente testáveis em Node.js.
- A matriz adversarial conterá os nove cenários acordados, incluindo a proibição de execução e escrita.

## Further Notes

Esta SPEC satisfaz o specification gate: escopo delimitado, critérios verificáveis e nenhuma ambiguidade bloqueante. O `TICKET-SET-20261008-001` pode ser executado na ordem declarada.

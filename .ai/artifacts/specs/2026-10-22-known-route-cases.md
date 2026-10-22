---
artifact: spec
id: SPEC-20261022-004
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261022-004
---

# Casos conhecidos de roteamento — emenda v1-A27

## Problem

A seção 22 de `references/architecture-contract-v1.md` aponta testes futuros de overlap semântico entre descrições. `DECISION-SET-20261022-004` versão 2 aceita uma matriz de rotas esperadas como primeiro passo e fixa o limite: a matriz valida casos conhecidos e não mede automaticamente toda a similaridade semântica entre skills. A versão 1 do conjunto não nomeava os casos. Sem a lista, um critério de aceite inventaria rotas. Evidência: `DECISION-SET-20261022-004` versão 2 e a seção 22.

## Goal

Transformar os oito casos conhecidos K1–K8 em critérios de aceite verificáveis, cada um com a solicitação de entrada, a skill esperada e a justificativa contratual já registradas no conjunto de decisões.

## Scope

- Os critérios de aceite desta spec são somente K1–K8, como estão em `DECISION-SET-20261022-004` versão 2.
- Cada critério verifica três campos: solicitação de entrada, skill esperada e justificativa contratual.
- Nos casos negativos, o critério também verifica a rota proibida nomeada no conjunto.
- O texto que acompanhar a matriz declara que ela valida esses casos conhecidos e não mede automaticamente toda a similaridade semântica entre skills.
- A matriz permanece fora de `npm test`. A comparação automática de `description` continua a igualdade exata da v1-A24.

## Non-goals

- Medir automaticamente toda a similaridade semântica entre as 18 skills.
- Tratar skill ou par ausente de K1–K8 como overlap ou como prova de que não há overlap.
- Acrescentar os gatilhos de R2 que não são `multiple skills plausibly apply`, a invocação explícita de `/to-spec` ou de `/diagnose`, R4, R7 a R14, R16, R17, spec bloqueada, tickets, `docs` ou `domain-modelling`.
- Usar score, embedding, modelo ou normalização.
- Criar comando, skill, chave de target, dependência npm ou campo de frontmatter.
- Alterar `scripts/validate-skills.mjs`, a suíte Node, o manifesto, os targets, o instalador ou os contratos de roteamento.
- Implementar a matriz nesta spec. `DECISION-SET-20261022-004` versão 2 não autoriza `implement`.
- Reescrever ADR-0001, ADR-0002, ADR-0003 ou ADR-0004.
- Renomear `1.0.0-scaffold` ou abrir `sync`, `bootstrap` na CLI, desinstalação, instalação global, detecção de plataforma, roteador automático, `skill-authoring` ou licença.

## Actors

- Mantenedor, que aceitou o limite e pediu a lista mínima.
- Leitor que confere um caso contra o contrato citado. `workflow` continua consultivo e não é um executor desta matriz.

## Functional Requirements

1. A matriz declara exatamente K1, K2, K3, K4, K5, K6, K7 e K8. Evidência: `DECISION-SET-20261022-004` versão 2.
2. K1 entra como positivo. A solicitação é o usuário invocar explicitamente `/implement` quando a execução não violaria um pré-requisito bloqueante. A skill esperada é `implement`. A justificativa é R1. Evidência: o conjunto e R1 em `contracts/routing.md`.
3. K2 entra como positivo. A solicitação é `multiple skills plausibly apply`. A skill esperada é `workflow`. A justificativa é R2, inclusive a exigência de recomendar uma sequência e não executar a tarefa inteira. Evidência: o conjunto e R2.
4. K3 entra como positivo. A solicitação é `desired behaviour is clear` e `scope is bounded`. A skill esperada é `implement`. A justificativa é R6. Evidência: o conjunto e R6.
5. K4 entra como positivo. A solicitação é `behaviour must remain stable`. A skill esperada é `refactor`. A justificativa é R15. Evidência: o conjunto e R15.
6. K5 entra como negativo. A solicitação é `behaviour is intentionally changing`. A skill esperada é `implement`. A rota proibida é `refactor`. A justificativa é R15. Evidência: o conjunto e R15.
7. K6 entra como negativo. A solicitação é `ambiguous request` sem resolver ambiguidade material, quando uma pergunta sem resposta pode mudar `scope`, `behaviour`, `architecture`, `data model`, `security` ou `acceptance criteria`. A skill esperada é `clarify`. A rota proibida é `implement`. A justificativa é o anti-pattern de `contracts/routing.md` e R3. Evidência: o conjunto, o anti-pattern e R3.
8. K7 entra como negativo. A solicitação é `symptom is known` e `root cause is not known`. A skill esperada é `diagnose`. A rota proibida é `implement`. A justificativa é R5. Evidência: o conjunto e R5.
9. K8 entra como negativo. A solicitação é `the request is to upgrade everything or rewrite the repository without that bound`. A skill esperada é `clarify`. A rota proibida é `modernize`. A justificativa é o passo 3 do workflow em `contracts/skills/modernize.md` e o anti-pattern `modernize → uncontrolled repository-wide rewrite`. Evidência: o conjunto, esse passo e o anti-pattern.
10. Um caso fora de K1–K8 não gera falha desta matriz e não entra como overlap. Evidência: a decisão de que caso não declarado não é overlap para esse artefato.
11. A matriz não afirma que as skills fora de um caso conhecido são semanticamente disjuntas. Evidência: a decisão de que a matriz não mede automaticamente toda a similaridade semântica.

## Business Rules

- R1 a R17 e os anti-patterns de `contracts/routing.md` continuam sendo o roteamento. Esta spec não cria precedência nova.
- R1, neste conjunto, só é critério para `/implement` sem pré-requisito bloqueante. `/to-spec` e `/diagnose` seguem nomeados em R1 e não são casos desta lista.
- `workflow` recomenda a sequência e não executa a tarefa. Evidência: R2.
- A igualdade exata de `description` da v1-A24 permanece a única comparação automática entre descrições. Evidência: `DECISION-SET-20261022-001` e `DECISION-SET-20261022-004` versão 2.

## Non-functional Requirements

- Cada critério é verificável por leitura: a entrada, a skill esperada e a citação contratual batem com K1–K8, e a rota proibida bate com K5–K8.
- A verificação não chama modelo, não calcula score e não altera arquivo de produção.
- A matriz fica fora da suíte `npm test`. Evidência: a premissa aceita em `DECISION-SET-20261022-004` versão 2.

## Technical Constraints

- Fonte normativa dos casos: `contracts/routing.md` e `contracts/skills/modernize.md`, já condensados em `DECISION-SET-20261022-004` versão 2.
- `scripts/validate-skills.mjs` não recebe comparação semântica nem estes oito casos.
- Nenhuma dependência npm de produção é adicionada.
- A versão do pacote permanece `1.0.0-scaffold`. `schemaVersion` e `architectureVersion` permanecem 1.
- O catálogo permanece em 18 skills.

## Security / Privacy

- A matriz não executa skill, não grava instalação e não acrescenta comando.
- A matriz não copia segredo. Os casos não contêm valor secreto. Evidência: as entradas são condições de contrato, e o contrato de `workflow` proíbe reproduzir segredo.
- ADR-0002 continua sem exceção nova. `list` e `doctor` permanecem as únicas exceções de comando, por ADR-0003 e ADR-0004.

## Acceptance Criteria

1. Um conferidor encontra os oito identificadores K1–K8 e não encontra um nono caso declarado pela matriz.
2. K1 só passa quando a rota prefere `implement` para a invocação explícita de `/implement` sem pré-requisito bloqueante, com justificativa R1.
3. K2 só passa quando a rota espera `workflow` para `multiple skills plausibly apply` e o caso registra que `workflow` não executa a tarefa, com justificativa R2.
4. K3 só passa quando a rota espera `implement` para comportamento desejado claro e escopo limitado, com justificativa R6.
5. K4 só passa quando a rota espera `refactor` para comportamento que deve permanecer estável, com justificativa R15.
6. K5 só passa quando a rota espera `implement` e não `refactor` para comportamento que muda de propósito, com justificativa R15.
7. K6 só passa quando a rota espera `clarify` e não `implement` para o pedido ambíguo sem resolução da ambiguidade material definida em R3, com justificativa no anti-pattern e em R3.
8. K7 só passa quando a rota espera `diagnose` e não `implement` para sintoma conhecido e causa desconhecida, com justificativa R5.
9. K8 só passa quando a rota espera `clarify` e não `modernize` para o pedido de atualizar tudo ou reescrever o repositório sem limite, com justificativa no passo 3 de `modernize` e no anti-pattern.
10. A matriz contém a frase de que valida casos conhecidos e não mede automaticamente toda a similaridade semântica entre skills. Sem essa frase, a matriz falha.
11. Par ou skill não declarado em K1–K8 não é falha da matriz.
12. `validate()` não ganha, por esta spec, comparação semântica nem estes casos. A rejeição de `description` idêntica da v1-A24 permanece igualdade exata da string armazenada.

## Risks

- K1–K8 deixam de fora a maior parte de R1–R17. Uma rota real pode cair nesse vazio e a matriz não falha. Esse falso negativo é o limite aceito, não uma cobertura completa.
- Ler K4 e K5 como medição de todas as frases parecidas com “refactor” ou “implement” alargaria o critério. O critério vale só para as entradas escritas.
- R10 proíbe `to-tickets` a partir de spec bloqueada e não nomeia a skill substituta. Esse anti-pattern ficou de fora. A matriz não o verifica.
- Tratar esta spec como autorização de `implement` gravaria teste ou validador que o conjunto não autorizou.

## Open Questions

Nenhuma questão bloqueante permanece.

- Quando `.ai/project.md`, o contrato compartilhado, a proveniência e o `README.md` passam a narrar a v1-A27. Esta spec não os altera.
- Claude Code permanece `NOT_RUN`. Isso não muda K1–K8.

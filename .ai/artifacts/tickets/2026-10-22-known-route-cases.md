---
artifact: ticket_set
id: TICKET-SET-20261022-004
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261022-004
---

# Casos conhecidos de roteamento — emenda v1-A27

Conjunto executável derivado de `SPEC-20261022-004`. Cada bloco é um TICKET. O Markdown local é a fonte. Nenhum ticket publica issue remota. Esta execução não inicia os tickets e não invoca `implement`.

A matriz é um documento de referência. A verificação é leitura desse documento. Não há classificador semântico automático. R1–R17 não são alterados. O arquivo da matriz é `.ai/artifacts/quality/2026-10-22-known-route-matrix.md`. Ele não substitui `contracts/routing.md`.

Rastreio dos doze critérios de aceite da spec:

| Critério | Ticket |
|---|---|
| 1. Exatamente K1–K8, sem nono caso | 10 |
| 2. K1 | 02 |
| 3. K2 | 03 |
| 4. K3 | 04 |
| 5. K4 | 05 |
| 6. K5 | 06 |
| 7. K6 | 07 |
| 8. K7 | 08 |
| 9. K8 | 09 |
| 10. Frase do limite | 01, conferido de novo no 10 |
| 11. Caso não declarado não é falha | 01, conferido de novo no 10 |
| 12. `validate()` sem comparação semântica e sem estes casos | 01, conferido de novo no 10 |

## Title

01 — Forma de verificação da matriz de referência

## Goal

Definir o documento de referência e a verificação por leitura, com a frase do limite, a regra do caso não declarado e a permanência da igualdade exata de `description`.

## Context

`SPEC-20261022-004` está `ready`. Os critérios 10, 11 e 12 pedem a frase do limite, a ausência de falha para par não declarado e a não inclusão destes casos em `validate()`. A verificação da spec é leitura, sem modelo e sem score, fora de `npm test`. R8 não se aplica: não há termo de negócio, invariante, transição, evento ou fronteira de contexto novos. R9 não se aplica: a spec não muda fronteira de módulo, interface pública, modelo de dados, contrato de integração, infraestrutura, fronteira de segurança, concorrência, implantação nem o texto de R1–R17. Não há modelo de domínio nem desenho de arquitetura para este objetivo. A mensagem desta execução autoriza somente `to-tickets`.

## Scope

- Criar `.ai/artifacts/quality/2026-10-22-known-route-matrix.md`.
- Declarar que a matriz valida casos conhecidos e não mede automaticamente toda a similaridade semântica entre skills.
- Declarar que par ou skill não listado em K1–K8 não é falha e não prova ausência de similaridade.
- Declarar a verificação: um conferidor lê cada seção e compara entrada, skill esperada, justificativa e, nos negativos, rota proibida, com o texto de `SPEC-20261022-004`. A leitura não chama modelo, não calcula score e não executa skill.
- Declarar que `validate()` não recebe estes casos nem comparação semântica, e que a rejeição de `description` idêntica permanece igualdade exata da string armazenada.

## Out of Scope

- Escrever K1–K8. Isso é os tickets 02 a 09.
- Classificador semântico automático, score, embedding, modelo ou normalização. Evidência: Non-goals da spec e a mensagem desta execução.
- Editar R1–R17 ou `contracts/routing.md`. Evidência: Business Rules da spec e a mensagem desta execução.
- Editar `scripts/validate-skills.mjs`, a suíte Node, o manifesto, os targets, o instalador ou os contratos. Evidência: Non-goals e Technical Constraints da spec.
- Comando, skill, chave de target, dependência npm ou campo de frontmatter.
- `sync`, `bootstrap` na CLI, desinstalação, instalação global, detecção de plataforma, roteador automático, `skill-authoring`, licença e renomeação de `1.0.0-scaffold`.

## Dependencies

Nenhuma. `SPEC-20261022-004` já está `ready`.

## Implementation Notes

O arquivo é evidência de referência. `contracts/routing.md` e `contracts/skills/modernize.md` continuam sendo a fonte normativa. Não reescrever ADR `0001`, ADR `0002`, ADR `0003` nem ADR `0004`. Não copiar segredo. Não lançar Cursor, Codex, Antigravity nem Claude Code.

## Acceptance Criteria

- O arquivo existe e contém a frase de que a matriz valida casos conhecidos e não mede automaticamente toda a similaridade semântica entre skills. Evidência: critério 10 da spec.
- O arquivo diz que par ou skill não declarado em K1–K8 não é falha da matriz. Evidência: critério 11 da spec.
- O arquivo diz que a verificação é leitura contra a spec, sem modelo, sem score e sem execução de skill. Evidência: Non-functional Requirements da spec.
- O arquivo diz que `validate()` não ganha comparação semântica nem K1–K8, e que a `description` idêntica continua igualdade exata. Evidência: critério 12 da spec.

## Validation

Leitura do arquivo. `git diff` de `contracts/routing.md` e de `scripts/validate-skills.mjs` não faz parte da mudança deste ticket. `npm test` não é a verificação desta matriz.

## Definition of Done

O arquivo de referência existe, traz a frase do limite, a regra do caso não declarado e a forma de verificação por leitura, e este ticket não altera R1–R17, `validate()` nem a suíte Node.

## Title

02 — Caso K1

## Goal

Representar K1 na matriz: invocação explícita de `/implement`, sem pré-requisito bloqueante, com skill esperada `implement` e justificativa R1.

## Context

Requisito 2 e critério 2 de `SPEC-20261022-004`. K1 é positivo. A forma de verificação é a do ticket 01.

## Scope

- Acrescentar uma seção K1, e só essa, no arquivo do ticket 01.
- Registrar a entrada: o usuário invoca explicitamente `/implement` e a execução não violaria um pré-requisito bloqueante.
- Registrar a skill esperada `implement` e a justificativa R1 em `contracts/routing.md`.
- Registrar que o caso é positivo.

## Out of Scope

- K2–K8, classificador semântico, edição de R1–R17 e alteração de `validate()`.
- Tratar `/to-spec` ou `/diagnose` como casos. A spec limita R1, nesta lista, a `/implement`.

## Dependencies

Ticket 01. Sem ciclo.

## Implementation Notes

Copiar a solicitação do requisito 2 da spec. Não parafrasear a condição de R1 para outra invocação. Não executar `implement`.

## Acceptance Criteria

- A seção K1 traz essa entrada, a skill `implement` e a justificativa R1. Evidência: critério 2 da spec.
- Este ticket não acrescenta outro identificador de caso.

## Validation

Leitura da seção K1 contra o requisito 2 e o critério 2 da spec. Sem modelo e sem `npm test`.

## Definition of Done

K1 está na matriz, só com os três campos exigidos, e o restante do arquivo criado pelo ticket 01 permanece.

## Title

03 — Caso K2

## Goal

Representar K2 na matriz: `multiple skills plausibly apply`, com skill esperada `workflow`, que recomenda a sequência e não executa a tarefa, e justificativa R2.

## Context

Requisito 3 e critério 3 de `SPEC-20261022-004`. K2 é positivo. A forma de verificação é a do ticket 01.

## Scope

- Acrescentar uma seção K2, e só essa, no arquivo do ticket 01.
- Registrar a entrada `multiple skills plausibly apply`.
- Registrar a skill esperada `workflow` e a justificativa R2, inclusive a exigência de recomendar uma sequência e não executar a tarefa inteira.
- Registrar que o caso é positivo.

## Out of Scope

- Os outros dois gatilhos de R2. Evidência: Non-goals da spec.
- K1 e K3–K8, classificador semântico, edição de R1–R17 e alteração de `validate()`.
- Fazer `workflow` executar skill.

## Dependencies

Ticket 01. Sem ciclo.

## Implementation Notes

Copiar a solicitação do requisito 3 da spec. A seção registra o limite de não execução. Não transformar `workflow` em roteador automático.

## Acceptance Criteria

- A seção K2 traz essa entrada, a skill `workflow`, o registro de que `workflow` não executa a tarefa e a justificativa R2. Evidência: critério 3 da spec.
- Este ticket não acrescenta outro identificador de caso.

## Validation

Leitura da seção K2 contra o requisito 3 e o critério 3 da spec. Sem modelo e sem `npm test`.

## Definition of Done

K2 está na matriz com a entrada, a skill, o limite de não execução e a justificativa R2, e as seções dos outros tickets permanecem.

## Title

04 — Caso K3

## Goal

Representar K3 na matriz: comportamento desejado claro e escopo limitado, com skill esperada `implement` e justificativa R6.

## Context

Requisito 4 e critério 4 de `SPEC-20261022-004`. K3 é positivo. A forma de verificação é a do ticket 01.

## Scope

- Acrescentar uma seção K3, e só essa, no arquivo do ticket 01.
- Registrar a entrada `desired behaviour is clear` e `scope is bounded`.
- Registrar a skill esperada `implement` e a justificativa R6.
- Registrar que o caso é positivo.

## Out of Scope

- K1, K2 e K4–K8, classificador semântico, edição de R1–R17 e alteração de `validate()`.
- Tratar este caso como autorização para executar `implement`.

## Dependencies

Ticket 01. Sem ciclo.

## Implementation Notes

Copiar a solicitação do requisito 4 da spec. Não fundir K3 com K5.

## Acceptance Criteria

- A seção K3 traz essa entrada, a skill `implement` e a justificativa R6. Evidência: critério 4 da spec.
- Este ticket não acrescenta outro identificador de caso.

## Validation

Leitura da seção K3 contra o requisito 4 e o critério 4 da spec. Sem modelo e sem `npm test`.

## Definition of Done

K3 está na matriz com a entrada, a skill e a justificativa R6, e as seções dos outros tickets permanecem.

## Title

05 — Caso K4

## Goal

Representar K4 na matriz: comportamento que deve permanecer estável, com skill esperada `refactor` e justificativa R15.

## Context

Requisito 5 e critério 5 de `SPEC-20261022-004`. K4 é positivo. A forma de verificação é a do ticket 01.

## Scope

- Acrescentar uma seção K4, e só essa, no arquivo do ticket 01.
- Registrar a entrada `behaviour must remain stable`.
- Registrar a skill esperada `refactor` e a justificativa R15.
- Registrar que o caso é positivo.

## Out of Scope

- K5. A mudança intencional de comportamento é o ticket 06.
- K1–K3 e K6–K8, classificador semântico, edição de R1–R17 e alteração de `validate()`.
- Generalizar K4 para qualquer frase parecida com refactor. Evidência: Risks da spec.

## Dependencies

Ticket 01. Sem ciclo.

## Implementation Notes

Copiar a solicitação do requisito 5 da spec. A entrada é só essa condição, não um pedido de produto inventado.

## Acceptance Criteria

- A seção K4 traz essa entrada, a skill `refactor` e a justificativa R15. Evidência: critério 5 da spec.
- Este ticket não acrescenta outro identificador de caso.

## Validation

Leitura da seção K4 contra o requisito 5 e o critério 5 da spec. Sem modelo e sem `npm test`.

## Definition of Done

K4 está na matriz com a entrada, a skill e a justificativa R15, e as seções dos outros tickets permanecem.

## Title

06 — Caso K5

## Goal

Representar K5 na matriz: comportamento que muda de propósito, com skill esperada `implement`, rota proibida `refactor` e justificativa R15.

## Context

Requisito 6 e critério 6 de `SPEC-20261022-004`. K5 é negativo. A forma de verificação é a do ticket 01.

## Scope

- Acrescentar uma seção K5, e só essa, no arquivo do ticket 01.
- Registrar a entrada `behaviour is intentionally changing`.
- Registrar a skill esperada `implement`, a rota proibida `refactor` e a justificativa R15.
- Registrar que o caso é negativo.

## Out of Scope

- K4 e os demais casos, classificador semântico, edição de R1–R17 e alteração de `validate()`.
- Tratar K5 como medida de todas as frases parecidas com implement. Evidência: Risks da spec.

## Dependencies

Ticket 01. Sem ciclo.

## Implementation Notes

Copiar a solicitação do requisito 6 da spec. A verificação falha se a rota do caso for `refactor`.

## Acceptance Criteria

- A seção K5 traz essa entrada, a skill `implement`, a rota proibida `refactor` e a justificativa R15. Evidência: critério 6 da spec.
- Este ticket não acrescenta outro identificador de caso.

## Validation

Leitura da seção K5 contra o requisito 6 e o critério 6 da spec. Sem modelo e sem `npm test`.

## Definition of Done

K5 está na matriz com a entrada, a skill esperada, a rota proibida e a justificativa R15, e as seções dos outros tickets permanecem.

## Title

07 — Caso K6

## Goal

Representar K6 na matriz: pedido ambíguo sem resolução da ambiguidade material, com skill esperada `clarify`, rota proibida `implement` e justificativa no anti-pattern e em R3.

## Context

Requisito 7 e critério 7 de `SPEC-20261022-004`. K6 é negativo. A forma de verificação é a do ticket 01.

## Scope

- Acrescentar uma seção K6, e só essa, no arquivo do ticket 01.
- Registrar a entrada: `ambiguous request` sem resolver ambiguidade material, quando uma pergunta sem resposta pode mudar `scope`, `behaviour`, `architecture`, `data model`, `security` ou `acceptance criteria`.
- Registrar a skill esperada `clarify`, a rota proibida `implement` e a justificativa no anti-pattern de `contracts/routing.md` e em R3.
- Registrar que o caso é negativo.

## Out of Scope

- Os outros casos, classificador semântico, edição de R1–R17 e alteração de `validate()`.
- Inventar a pergunta material que o contrato não escreve.

## Dependencies

Ticket 01. Sem ciclo.

## Implementation Notes

Copiar a solicitação do requisito 7 da spec. A verificação falha se a rota do caso for `implement`.

## Acceptance Criteria

- A seção K6 traz essa entrada, a skill `clarify`, a rota proibida `implement` e a justificativa no anti-pattern e em R3. Evidência: critério 7 da spec.
- Este ticket não acrescenta outro identificador de caso.

## Validation

Leitura da seção K6 contra o requisito 7 e o critério 7 da spec. Sem modelo e sem `npm test`.

## Definition of Done

K6 está na matriz com a entrada, a skill esperada, a rota proibida e a justificativa, e as seções dos outros tickets permanecem.

## Title

08 — Caso K7

## Goal

Representar K7 na matriz: sintoma conhecido e causa desconhecida, com skill esperada `diagnose`, rota proibida `implement` e justificativa R5.

## Context

Requisito 8 e critério 8 de `SPEC-20261022-004`. K7 é negativo. A forma de verificação é a do ticket 01.

## Scope

- Acrescentar uma seção K7, e só essa, no arquivo do ticket 01.
- Registrar a entrada `symptom is known` e `root cause is not known`.
- Registrar a skill esperada `diagnose`, a rota proibida `implement` e a justificativa R5.
- Registrar que o caso é negativo.

## Out of Scope

- Os outros casos, classificador semântico, edição de R1–R17 e alteração de `validate()`.
- O anti-pattern de spec bloqueada. A spec o deixa fora porque R10 não nomeia a skill substituta.

## Dependencies

Ticket 01. Sem ciclo.

## Implementation Notes

Copiar a solicitação do requisito 8 da spec. A verificação falha se a rota do caso for `implement`. Não executar `diagnose`.

## Acceptance Criteria

- A seção K7 traz essa entrada, a skill `diagnose`, a rota proibida `implement` e a justificativa R5. Evidência: critério 8 da spec.
- Este ticket não acrescenta outro identificador de caso.

## Validation

Leitura da seção K7 contra o requisito 8 e o critério 8 da spec. Sem modelo e sem `npm test`.

## Definition of Done

K7 está na matriz com a entrada, a skill esperada, a rota proibida e a justificativa R5, e as seções dos outros tickets permanecem.

## Title

09 — Caso K8

## Goal

Representar K8 na matriz: pedido de atualizar tudo ou reescrever o repositório sem limite, com skill esperada `clarify`, rota proibida `modernize` e justificativa no passo 3 de `modernize` e no anti-pattern.

## Context

Requisito 9 e critério 9 de `SPEC-20261022-004`. K8 é negativo. A forma de verificação é a do ticket 01.

## Scope

- Acrescentar uma seção K8, e só essa, no arquivo do ticket 01.
- Registrar a entrada `the request is to upgrade everything or rewrite the repository without that bound`.
- Registrar a skill esperada `clarify`, a rota proibida `modernize` e a justificativa no passo 3 do workflow de `contracts/skills/modernize.md` e no anti-pattern `modernize → uncontrolled repository-wide rewrite`.
- Registrar que o caso é negativo.

## Out of Scope

- Os outros casos, classificador semântico, edição de R1–R17 e alteração de `validate()`.
- R16 como caso positivo. A spec não o inclui nesta lista.

## Dependencies

Ticket 01. Sem ciclo.

## Implementation Notes

Copiar a solicitação do requisito 9 da spec. A verificação falha se a rota do caso for `modernize`. Não executar `modernize` nem `clarify`.

## Acceptance Criteria

- A seção K8 traz essa entrada, a skill `clarify`, a rota proibida `modernize` e a justificativa no passo 3 de `modernize` e no anti-pattern. Evidência: critério 9 da spec.
- Este ticket não acrescenta outro identificador de caso.

## Validation

Leitura da seção K8 contra o requisito 9 e o critério 9 da spec. Sem modelo e sem `npm test`.

## Definition of Done

K8 está na matriz com a entrada, a skill esperada, a rota proibida e a justificativa, e as seções dos outros tickets permanecem.

## Title

10 — Rastreio dos doze critérios

## Goal

Conferir, por leitura, que a matriz fechada cobre os doze critérios de `SPEC-20261022-004` e que a implementação não introduziu classificador semântico nem alterou R1–R17.

## Context

O critério 1 da spec só pode passar quando K1–K8 existem e não há nono caso. Os critérios 2 a 9 são os tickets 02 a 09. Os critérios 10 a 12 nascem no ticket 01 e são conferidos de novo aqui. A mensagem desta execução pede esse rastreio. A verificação continua sendo leitura.

## Scope

- Ler `.ai/artifacts/quality/2026-10-22-known-route-matrix.md` depois dos tickets 01 a 09.
- Confirmar os oito identificadores e a ausência de um nono caso.
- Confirmar a frase do limite, a regra do caso não declarado e a permanência da igualdade exata de `description`.
- Confirmar que `contracts/routing.md` e `scripts/validate-skills.mjs` não foram alterados por estes tickets.

## Out of Scope

- Acrescentar caso, teste Node, classificador, score, embedding, modelo ou normalização.
- Editar R1–R17, o validador, o manifesto, os targets, o instalador, os contratos ou os ADR.
- Publicar issue remota ou iniciar `implement` a partir deste ticket.

## Dependencies

Tickets 02, 03, 04, 05, 06, 07, 08 e 09. Sem ciclo. O ticket 01 entra por esses oito.

## Implementation Notes

A conferência usa a tabela de rastreio deste conjunto. Cada critério 2 a 9 aponta para uma seção. Os critérios 1, 10, 11 e 12 são a leitura do documento inteiro e o diff vazio dos dois arquivos normativos. Não chamar modelo.

## Acceptance Criteria

- O documento tem K1–K8 e não tem nono caso. Evidência: critério 1 da spec.
- As seções K1–K8 satisfazem os critérios 2 a 9 da spec. Evidência: tickets 02 a 09.
- A frase do limite está no documento. Evidência: critério 10 da spec.
- Par ou skill fora de K1–K8 não é falha declarada pela matriz. Evidência: critério 11 da spec.
- `validate()` não recebeu comparação semântica nem estes casos, e a igualdade exata de `description` permanece. Evidência: critério 12 da spec.
- `contracts/routing.md` permanece com R1–R17 na forma anterior a estes tickets. Evidência: Business Rules da spec e a mensagem desta execução.

## Validation

Leitura da matriz contra os doze critérios. `git diff` de `contracts/routing.md` e de `scripts/validate-skills.mjs` vazio para esta mudança. `npm test` não é a verificação da matriz.

## Definition of Done

Os doze critérios têm ticket de origem, a matriz tem só K1–K8, a verificação registrada é leitura, e não há classificador semântico nem edição de R1–R17.

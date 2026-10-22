# Matriz de rotas esperadas

A matriz valida casos conhecidos e não mede automaticamente toda a similaridade semântica entre skills.

Este arquivo é referência. Não substitui `contracts/routing.md`. Não altera R1–R17. Não é um classificador semântico. Não calcula score, não chama modelo e não executa skill.

## Caso não declarado

Par ou skill não declarado em K1–K8 não é falha da matriz. A matriz não afirma que as skills fora de um caso conhecido são semanticamente disjuntas.

## Verificação

Um conferidor lê cada seção e compara a solicitação de entrada, a skill esperada, a justificativa contratual e, nos casos negativos, a rota proibida com o texto de `SPEC-20261022-004`. A leitura não chama modelo, não calcula score e não executa skill. `npm test` não é a verificação desta matriz.

## validate()

`validate()` não ganha, por esta matriz, comparação semântica nem os casos K1–K8. A rejeição de `description` idêntica da v1-A24 permanece igualdade exata da string armazenada.

## K1

- Tipo: positivo
- Solicitação de entrada: o usuário invoca explicitamente `/implement` e a execução não violaria um pré-requisito bloqueante
- Skill esperada: `implement`
- Justificativa contratual: R1 em `contracts/routing.md`

## K2

- Tipo: positivo
- Solicitação de entrada: `multiple skills plausibly apply`
- Skill esperada: `workflow`
- Limite: `workflow` recomenda uma sequência e não executa a tarefa inteira
- Justificativa contratual: R2 em `contracts/routing.md`

## K3

- Tipo: positivo
- Solicitação de entrada: `desired behaviour is clear` e `scope is bounded`
- Skill esperada: `implement`
- Justificativa contratual: R6 em `contracts/routing.md`

## K4

- Tipo: positivo
- Solicitação de entrada: `behaviour must remain stable`
- Skill esperada: `refactor`
- Justificativa contratual: R15 em `contracts/routing.md`

## K5

- Tipo: negativo
- Solicitação de entrada: `behaviour is intentionally changing`
- Skill esperada: `implement`
- Rota proibida: `refactor`
- Justificativa contratual: R15 em `contracts/routing.md`

## K6

- Tipo: negativo
- Solicitação de entrada: `ambiguous request` sem resolver ambiguidade material, quando uma pergunta sem resposta pode mudar `scope`, `behaviour`, `architecture`, `data model`, `security` ou `acceptance criteria`
- Skill esperada: `clarify`
- Rota proibida: `implement`
- Justificativa contratual: anti-pattern de `contracts/routing.md` e R3

## K7

- Tipo: negativo
- Solicitação de entrada: `symptom is known` e `root cause is not known`
- Skill esperada: `diagnose`
- Rota proibida: `implement`
- Justificativa contratual: R5 em `contracts/routing.md`

## K8

- Tipo: negativo
- Solicitação de entrada: `the request is to upgrade everything or rewrite the repository without that bound`
- Skill esperada: `clarify`
- Rota proibida: `modernize`
- Justificativa contratual: passo 3 do workflow em `contracts/skills/modernize.md` e o anti-pattern `modernize → uncontrolled repository-wide rewrite`

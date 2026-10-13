---
artifact: ticket_set
id: TICKET-SET-20261013-009
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261013-009
  - ARCHITECTURE-20261013-002
---

# Skill instalada autocontida — emenda v1-A20

Conjunto executável derivado de `SPEC-20261013-009`. Cada bloco é um TICKET. Publicação remota pendente. O Markdown local é a fonte até reconciliação com GitHub Issues.

## Title

01 — Projetar o feixe dentro do diretório da skill

## Goal

Gravar, em cada uma das 18 skills, a projeção nomeada na spec e apontar o `SKILL.md` só para arquivos desse diretório.

## Context

`RESEARCH-20261013-402` mede 108 links que saem do diretório instalado. `SPEC-20261013-009` fixa quais arquivos entram e quais ficam de fora. `ARCHITECTURE-20261013-002` mantém a cópia do instalador sem transformação.

## Scope

- Criar `references/contract.md`, as cópias byte a byte citadas e os templates em `assets/`, segundo os requisitos 1 a 7 da spec.
- Trocar os links de leitura do `SKILL.md` por caminhos internos. Manter caminhos `.ai/` de escrita.
- Não alterar frase de workflow, goal, status ou dependência.

## Out of Scope

- Regras novas do validador e o teste de destino vazio. Isso é o ticket 02 e o ticket 03.
- Edição do texto normativo em `contracts/` e em `templates/artifacts/`.
- Comando de CLI, chave de target e execução dos quatro produtos.

## Dependencies

Nenhuma. Depende apenas de `SPEC-20261013-009` e de `ARCHITECTURE-20261013-002`.

## Implementation Notes

A transformação permitida na projeção do contrato é só a dos três links relativos já nomeados. `context-engineering` não recebe `routing.md`. `workflow` recebe o catálogo sem caminhos. Saída apenas nomeada não recebe template.

## Acceptance Criteria

- Os requisitos 1 a 8 de `SPEC-20261013-009` valem na árvore fonte.
- Nenhuma outra chave do manifesto muda.
- O diff dos corpos não altera os passos de workflow, só a navegação para os arquivos projetados.

## Validation

`npm run validate` depois do ticket 02. Este ticket sozinho deixa o validador antigo verde se os arquivos novos não violarem as checagens atuais.

## Definition of Done

Os 18 diretórios contêm a projeção e nenhum link Markdown interno aponta para fora.

## Title

02 — Validar projeção e registrar a emenda

## Goal

Fazer o validador rejeitar link que escape e cópia que divirja, e registrar a emenda sem afirmar leitura ao vivo.

## Context

O ticket 01 produz os arquivos. O validador atual confere o contrato canônico e não percorre links dentro do diretório da skill. A CLI já rejeita `list`, `doctor` e `sync`.

## Scope

- Regras em `scripts/validate-skills.mjs`.
- Rejeições em `tests/validate-skills.test.mjs` para link que sai do diretório e para projeção diferente da fonte.
- Notas em `contracts/skill-contract.md`, `references/provenance.md`, `README.md` e na evidência de validação.

## Out of Scope

- Mudança de comportamento em `scripts/distribute-skills.mjs`.
- Comando novo.
- Execução dos quatro produtos.

## Dependencies

Ticket 01.

## Implementation Notes

A comparação de `failure.md`, `quality-gates.md`, `artifacts.md`, `routing.md` e dos templates é igualdade de bytes com a fonte canônica. A comparação de `references/contract.md` aplica só a transformação de link nomeada na spec. A mensagem de falha não afirma que um host abriu o arquivo.

## Acceptance Criteria

- A suíte falha nos dois casos novos quando a mutação está presente.
- A suíte passa no catálogo desta emenda.
- A ajuda da CLI continua sem `list`.
- O ADR `0001` não é modificado.

## Validation

`npm test`, `npm run validate`, `npm run skills:validate` e `git diff --check`.

## Definition of Done

Evidência com o ambiente e a contagem reais da execução. A nota de proveniência separa a projeção no disco da leitura ao vivo.

## Title

03 — Instalação sem o repositório de origem

## Goal

Provar que os quatro targets instalam num projeto que não tem `contracts/` nem `manifest/` e que cada link da skill resolve dentro do diretório instalado.

## Context

`install` copia o diretório e recusa colisão divergente. O requisito 10 da spec pede um destino temporário sem a árvore de origem. `ARCHITECTURE-20261013-002` não acrescenta transformação ao instalador.

## Scope

- Um teste em `tests/distribute-skills.test.mjs` que instala os quatro targets num diretório temporário vazio de contratos e percorre os links Markdown de cada skill instalada.
- A asserção de igualdade de bytes com a fonte canônica permanece.

## Out of Scope

- Novo comando de CLI.
- Execução de Cursor, Codex, Antigravity ou Claude Code.
- Alteração de `scripts/distribute-skills.mjs`, salvo se o teste mostrar que a cópia atual perde arquivo do diretório. Nesse caso a correção fica limitada a copiar o diretório que o ticket 01 já formou.

## Dependencies

Ticket 01. Não depende do ticket 02.

## Implementation Notes

O destino do teste não contém `contracts/` nem `manifest/skills.json`. Um link que resolva só porque o teste rodou dentro deste repositório não satisfaz o critério. A asserção usa o diretório instalado como raiz.

## Acceptance Criteria

- Os quatro targets instalam as 18 skills.
- Cada link Markdown no diretório instalado resolve para um arquivo dentro desse mesmo diretório.
- A segunda instalação no mesmo destino permanece idempotente.
- Conteúdo divergente continua bloqueado, sem sobrescrita.

## Validation

`npm test` no teste novo e `git diff --check`.

## Definition of Done

O teste falha se qualquer link instalado depender de `contracts/` ou de `manifest/` no destino.

---
artifact: decision_set
id: DECISION-SET-20261014-001
version: 1
status: ready
created_by: clarify
inputs:
  - RESEARCH-20261014-403
  - RESEARCH-20261013-401
  - RESEARCH-20261013-402
  - HANDOFF-20261014-001
  - HANDOFF-20261006-001
---

## Objective

Abrir a emenda v1-A21 para observar descoberta e uso real das skills nos quatro hosts, e fixar o protocolo antes de qualquer sessão nesses produtos.

## Resolved Decisions

- A emenda v1-A19 está encerrada em `52c35d7`. A emenda v1-A20 está implementada em `origin/main` no commit `b86f41d`. A baseline desta emenda é esse commit. Evidência: `git fetch origin main` e `git log -1 origin/main` nesta sessão.
- Os identificadores novos são `RESEARCH-20261014-403`, `DECISION-SET-20261014-001`, `SPEC-20261014-001`, `TICKET-SET-20261014-001` e `HANDOFF-20261014-002`. `HANDOFF-20261014-001` permanece com a implementação da v1-A20. Não reutilizar identificadores da v1-A19 nem da v1-A20.
- Esta sessão grava o protocolo, os critérios e os tickets. Não executa os tickets e não altera `skills/`, `scripts/`, `targets/`, o manifesto nem os contratos canônicos.
- A v1-A21 não altera produto. Achado de observação vira registro. Correção de skill, descrição, pasta ou instalador fica para outra emenda.
- Cada host é observado num projeto consumidor fora deste repositório, com um único `install --target`. Cursor, Codex e Claude Code não compartilham a árvore durante a prova. Codex e Antigravity usam o mesmo caminho `.agents/skills` em árvores separadas.
- A contagem de descoberta cobre as 18 skills. A sondagem de seleção, invocação e abertura de arquivo cobre quatro skills: `clarify`, `context-engineering`, `workflow` e `research`. As outras quatorze não ficam certificadas por essa sondagem.
- Seleção automática é tentativa obrigatória e não é gate binário de uma única sessão. Zero cargas nas quatro sondas, depois de uma repetição, é falha do host. Uma ou duas cargas é `INCONCLUSIVE` e não reprova o host. Três ou quatro é aprovação desse critério.
- Invocação explícita das quatro sondas é gate do host. Abertura de `references/` nas quatro sondas é gate. Abertura de `assets/` é gate só onde a pasta existe. Ausência de `assets/` em `context-engineering` e `workflow` é `N/A`, não falha.
- Host que não puder ser lançado fica `NOT_RUN`, com comando ou superfície procurados, data e sistema. `NOT_RUN` não aprova e não reprova. A emenda só fecha como observada se ao menos um host passar e todos os demais estiverem aprovados ou `NOT_RUN`.
- R8 não se aplica. R9 não se aplica: o protocolo não muda fronteira, interface, dado, integração, segurança, concorrência nem implantação. Não há ADR novo. O ADR `0001` e o ADR `0002` não são estendidos.
- A publicação remota dos tickets continua pendente. O Markdown local é a fonte até a integração de issues ter leitura.

## Constraints

- Dezoito skills e quatro targets. Evidência: `AGENTS.md` e o manifesto em `b86f41d`.
- Nenhuma dependência npm e nenhuma ampliação da CLI. `list`, `doctor` e `sync` continuam rejeitados pelo pacote. Os comandos homônimos de um produto, se existirem, não são comandos deste pacote.
- Frontmatter permanece `name` e `description`. Nenhuma flag de fornecedor é adicionada para a prova.
- A observação não autoriza `implement` a mudar o pacote.

## Assumptions

- O observador consegue uma sessão nova por sonda. Essa premissa é condição do protocolo, não um fato já observado.
- A página lida em 2026-10-14 ainda descreve o produto que o observador vai abrir. A versão do produto entra no registro e pode invalidar essa premissa.

## Rejected Alternatives

- Certificar os quatro hosts a partir da suíte Node ou da presença dos arquivos. Rejeitada porque `REVIEW-20261013-012` já separa arquivo no disco de abertura pelo produto.
- Exigir os quatro hosts para fechar a emenda. Rejeitada porque a ausência de um produto na máquina do observador não é defeito do pacote.
- Instalar os quatro targets no mesmo projeto. Rejeitada porque o Cursor documenta leitura de `.agents/skills` e `.claude/skills`.
- Acrescentar `resources/` ou uma frase-sentinela nova para facilitar a prova. Rejeitada porque seria mudança de produto.
- Gravar ADR do protocolo. Rejeitada porque o protocolo não altera a arquitetura do pacote.

## Open Questions

Nenhuma questão bloqueante do protocolo. Qual superfície do Antigravity estará disponível só se sabe na execução. O texto exato que cada host entrega ao modelo só se sabe na execução.

## Blocking Questions

Nenhuma.

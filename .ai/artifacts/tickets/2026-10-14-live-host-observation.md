---
artifact: ticket_set
id: TICKET-SET-20261014-001
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261014-001
  - DECISION-SET-20261014-001
---

# Observação ao vivo nos hosts — emenda v1-A21

Conjunto executável derivado de `SPEC-20261014-001`. Cada bloco é um TICKET. Rótulo local: `ready-for-human`. Publicação remota pendente. O Markdown local é a fonte até reconciliação com GitHub Issues.

Nenhum ticket altera `skills/`, `contracts/`, `manifest/`, `scripts/`, `targets/` ou `package.json`. A execução grava evidência em `.ai/artifacts/tests/2026-10-14-live-host-observation/`.

## Title

01 — Preparar o consumidor e registrar disponibilidade

## Goal

Deixar quatro diretórios consumidores prontos, um por host, e registrar quais produtos podem ser lançados na máquina do observador.

## Context

`SPEC-20261014-001` exige um repositório fora deste pacote e um único target por árvore. `RESEARCH-20261014-403` lista as raízes documentadas em 2026-10-14. O PATH vazio da sessão de planejamento não conta como `NOT_RUN`.

## Scope

- Criar quatro repositórios Git temporários, irmãos deste pacote, sem `contracts/` e sem `manifest/`.
- Instalar só `cursor`, só `codex`, só `antigravity` e só `claude-code`, cada um no seu destino, com a CLI já existente.
- Rodar `validate --target` em cada destino.
- Registrar versão, sistema, superfície e a busca dos 18 nomes nas outras raízes daquele host.
- Se o produto não abrir, gravar `NOT_RUN` com o comando ou a superfície procurados.

## Out of Scope

- Conversar com o agente do host. Isso é o ticket do host.
- Mudança de skill ou de descrição.
- Marcar `NOT_RUN` só porque a sessão de planejamento não tinha o binário no PATH.

## Dependencies

Nenhuma. Depende de `SPEC-20261014-001`.

## Implementation Notes

O destino não pode ser ancestral nem descendente deste repositório. Codex e Antigravity recebem árvores diferentes, embora o caminho relativo seja `.agents/skills` nos dois. Se a pré-checagem achar um dos 18 nomes, a árvore fica `INVALID` e o install recomeça depois da limpeza.

## Acceptance Criteria

- Quatro destinos, ou menos se o sistema de arquivos impedir, cada um com um target e `validate --target` aprovado.
- Cada host da máquina está `READY` ou `NOT_RUN`.
- Nenhum arquivo do pacote fora da pasta de evidência foi alterado.

## Validation

`validate --target` no consumidor. `git status` no pacote sem diff de skill, contrato, script ou target.

## Definition of Done

A pasta de evidência contém `environment.md` com caminhos, versões e a classificação `READY` ou `NOT_RUN`.

## Title

02 — Observar Cursor

## Goal

Preencher a matriz do Cursor com as 18 skills na lista e as quatro sondas em sessão nova.

## Context

O target grava `.cursor/skills`. A página lida em 2026-10-14 diz que o Cursor também lê `.agents/skills`, `.claude/skills` e `.codex/skills`. A invocação explícita documentada é `/nome`.

## Scope

- Lista dos 18 nomes e a descrição que o modelo recebe, mais a descrição da interface se forem diferentes.
- Seleção automática, invocação explícita, `references/` e `assets/` para `clarify`, `context-engineering`, `workflow` e `research`, segundo a spec.
- Captura ou transcript sem segredo.

## Out of Scope

- Instalar outro target na mesma árvore.
- Alterar a skill se a descrição vier truncada. O texto truncado é o achado.

## Dependencies

Ticket 01, com Cursor `READY`. Se o ticket 01 marcou `NOT_RUN`, este ticket fecha sem sessão e aponta para esse registro.

## Implementation Notes

Sessão nova por sonda. Pedidos sem o nome da skill na seleção automática. Frases-sentinela já presentes: `Primary invocation` no contrato, `artifact: decision_set` no asset de `clarify`, `"when": "external facts affect decisions"` no catálogo de `workflow`. `context-engineering` e `workflow` não têm `assets/`.

## Acceptance Criteria

- Matriz do Cursor em `cursor/matrix.md`, com uma célula por critério e o texto observado.
- Gate de descoberta, descrição, invocação explícita e abertura de arquivo julgadas como na spec.
- Seleção automática classificada como `PASS`, `INCONCLUSIVE` ou `FAIL`, com a repetição feita se a primeira rodada foi 0/4.

## Validation

Leitura humana do transcript contra as frases-sentinela. Nenhuma suíte Node nova.

## Definition of Done

`cursor/matrix.md` existe e cada célula tem estado e evidência, ou o host permanece `NOT_RUN` pelo ticket 01.

## Title

03 — Observar Codex

## Goal

Preencher a matriz do Codex, incluindo o aviso de omissão ou de descrição encurtada se o produto o mostrar.

## Context

O target grava `.agents/skills`. A página lida em 2026-10-14 diz que a lista inicial inclui nome, descrição e caminho, com teto de 2% ou 8000 caracteres, encurtando a descrição antes de omitir a skill. A invocação explícita documentada no CLI é `$nome` ou `/skills`.

## Scope

- A mesma matriz das quatro sondas e a contagem dos 18 nomes.
- Cópia do aviso de orçamento, se aparecer.
- Diferença entre a lista da interface e o texto que o modelo declara ter recebido.

## Out of Scope

- `agents/openai.yaml` ou `allow_implicit_invocation`.
- Subir `skills.max_context_tokens` para fazer a prova passar.

## Dependencies

Ticket 01, com Codex `READY`. `NOT_RUN` encerra o ticket sem sessão.

## Implementation Notes

O consumidor do Codex não é o consumidor do Antigravity. Não lançar o Cursor nesse mesmo diretório durante a prova.

## Acceptance Criteria

- `codex/matrix.md` com células e textos.
- Se uma skill sumir da lista, a célula de descoberta é `FAIL` e o aviso, se houve, fica citado.
- Invocação explícita registra se o mecanismo usado foi `$nome`, `/skills` ou outro.

## Validation

Transcript comparado com o frontmatter das 18 descrições. Suíte Node inalterada.

## Definition of Done

A matriz existe, ou o host permanece `NOT_RUN`.

## Title

04 — Observar Claude Code

## Goal

Preencher a matriz do Claude Code e registrar se alguma descrição foi descartada pelo orçamento de listagem.

## Context

O target grava `.claude/skills`. A página lida em 2026-10-14 diz que os nomes permanecem, que o orçamento é 1% da janela e que descrições excedentes caem a partir das skills menos invocadas. O teto por descrição citado na página é 1536 caracteres. A invocação explícita é `/nome`. Skill pessoal com o mesmo nome precede a de projeto.

## Scope

- Lista dos 18 nomes e o destino de cada descrição: completa, encurtada ou ausente.
- As quatro sondas, em sessão nova.
- Se `/context` ou o log de debug forem usados, o registro diz isso e não cria comando no pacote.

## Out of Scope

- `disable-model-invocation`, `when_to_use` e `skillOverrides`.
- Plugin ou marketplace.

## Dependencies

Ticket 01, com Claude Code `READY`. `NOT_RUN` encerra o ticket sem sessão.

## Implementation Notes

A pré-checagem inclui `~/.claude/skills`. Nome deste pacote encontrado lá torna a árvore `INVALID` até a skill pessoal sair do caminho da prova.

## Acceptance Criteria

- `claude-code/matrix.md` com células e textos.
- Descrição ausente no texto do modelo, com o nome presente, é `FAIL` dessa descrição.
- `/nome` das quatro sondas carrega o `SKILL.md` do projeto consumidor, não uma skill pessoal.

## Validation

Transcript e, se existir, a linha de orçamento do produto. Suíte Node inalterada.

## Definition of Done

A matriz existe, ou o host permanece `NOT_RUN`.

## Title

05 — Observar Gemini Antigravity

## Goal

Preencher a matriz de uma superfície do Antigravity e deixar as outras duas como `NOT_RUN` se não forem abertas.

## Context

O target grava `.agents/skills`. A página lida em 2026-10-14 descreve app, CLI e IDE, com diretórios globais diferentes, e nomeia `resources/` em vez de `references/` e `assets/`. A invocação explícita documentada é `/nome`. A página não diz que outro nome de pasta é ignorado.

## Scope

- Uma superfície, nomeada no registro, com a matriz completa.
- As outras superfícies só entram se o observador as abrir. Senão, `NOT_RUN` por superfície.
- Abertura de `references/` e `assets/` julgada pelo arquivo, sem acrescentar `resources/`.

## Out of Scope

- Criar `resources/` para obter um controle. Isso seria outra emenda.
- Concluir que o nome da pasta é a causa sem um controle que esta emenda proíbe. A causa fica hipótese.

## Dependencies

Ticket 01, com Antigravity `READY` em ao menos uma superfície. Se nenhuma superfície abrir, o host fica `NOT_RUN`.

## Implementation Notes

O consumidor não é o do Codex. A pré-checagem inclui `~/.gemini/config/skills/`, `~/.gemini/antigravity-cli/skills/` e o legado `~/.gemini/antigravity/skills/` quando esses caminhos existirem na máquina.

## Acceptance Criteria

- `antigravity/matrix.md` identifica a superfície.
- Falha de abertura cita o caminho pedido e a mensagem do produto.
- O relatório não afirma que `resources/` é a causa.

## Validation

Transcript contra as sentinelas. Suíte Node inalterada.

## Definition of Done

A matriz da superfície executada existe, ou o host permanece `NOT_RUN`.

## Title

06 — Consolidar o relatório sem alterar o produto

## Goal

Reunir as matrizes num único relatório, aplicar os critérios da spec e deixar o pacote sem mudança de comportamento.

## Context

Os tickets 02 a 05 podem terminar em `PASS`, `FAIL` ou `NOT_RUN`. A spec não trata `NOT_RUN` como aprovação nem como falha. Zero hosts executados deixa a emenda incompleta.

## Scope

- `REPORT.md` na pasta de evidência, com uma linha por host e o veredito.
- Separação explícita entre fato, hipótese e limite da coleta.
- Handoff de sessão da execução, sem editar skill ou contrato.
- `npm test`, `npm run validate` e `npm run skills:validate` reexecutados para confirmar que a observação não mudou a suíte.

## Out of Scope

- Abrir a emenda de correção.
- Reclassificar `FAIL` como `INCONCLUSIVE` para fechar a emenda.
- Publicar issue remota se a integração não tiver leitura.

## Dependencies

Tickets 02, 03, 04 e 05. Cada um pode ter fechado como `NOT_RUN`.

## Implementation Notes

Veredito `OBSERVED` só se ao menos um host passou as gates e todos os outros passaram ou estão `NOT_RUN`. Veredito `FAIL` se algum host executado reprovou uma gate. Veredito `INCOMPLETE` se nenhum host foi executado. Não existe veredito `CERTIFIED`.

## Acceptance Criteria

- O relatório cobre os quatro hosts.
- `git diff` não mostra `skills/`, `contracts/`, `manifest/`, `scripts/`, `targets/` nem `package.json`.
- A suíte permanece 53/53, salvo se uma emenda posterior já tiver entrado por outro motivo; nesse caso o relatório cita o commit e não atribui a diferença a esta observação.

## Validation

`npm test` e `git diff --check` no pacote. Leitura do relatório contra `SPEC-20261014-001`.

## Definition of Done

`REPORT.md` publica um dos três vereditos e lista as hipóteses que a observação não fechou.

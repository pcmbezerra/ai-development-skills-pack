---
artifact: spec
id: SPEC-20261014-001
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261014-001
  - RESEARCH-20261014-403
  - HANDOFF-20261014-001
---

# Observação ao vivo nos hosts — emenda v1-A21

## Problem

As 18 skills estão `implemented`, as descrições declaram `Use when` e cada diretório instalado resolve os próprios links. Isso foi provado em disco e na suíte Node, 53/53, em `b86f41d`. Nenhum processo de Cursor, Codex, Gemini Antigravity ou Claude Code foi observado lendo essas skills. Arquivo presente não é descoberta.

## Goal

Definir e, quando os tickets forem executados, registrar o que cada host disponível faz com o catálogo instalado: lista as 18 skills, mostra a descrição, seleciona sem o nome, aceita invocação explícita e abre `references/` e `assets/` nas sondas. A emenda fecha com evidência, não com mudança de produto.

## Scope

- Protocolo de um projeto consumidor por host, fora deste repositório, com um único target instalado.
- Contagem das 18 skills e comparação da descrição visível ao modelo com o frontmatter.
- Sondas `clarify`, `context-engineering`, `workflow` e `research` para seleção automática, invocação explícita e abertura de arquivo.
- Registro `PASS`, `FAIL`, `INCONCLUSIVE`, `N/A` ou `NOT_RUN` por célula, com o texto observado.
- Relatório final que separa fato, hipótese e host não executado.

## Non-goals

- Alterar skill, descrição, contrato, manifesto, target, instalador, validador ou CLI.
- Adicionar `list`, `doctor`, `sync`, flag de fornecedor, `resources/`, sentinela nova ou roteamento automático.
- Certificar as quatorze skills que não entram na sondagem profunda.
- Exigir as três superfícies do Antigravity. Uma superfície nomeada basta; as outras ficam `NOT_RUN`.
- Corrigir um defeito encontrado. O achado fica no relatório.
- Tratar cenário agent-driven ou a suíte Node como execução de produto.
- Reabrir `SPEC-20261013-008` ou `SPEC-20261013-009`.

## Actors

- Observador humano, porque a sessão ocorre dentro do produto.
- Processo do host, que lista e carrega a skill.
- Mantenedor, que lê o relatório e decide se uma emenda posterior corrige algum achado.

## Functional Requirements

1. O consumidor é um repositório Git cujo caminho real não é este pacote nem um ancestral ou descendente dele. Não contém `contracts/` nem `manifest/skills.json` antes do install.
2. Antes do install, o observador registra a versão do host, o sistema, a superfície e a busca pelas 18 nomes nas outras raízes de descoberta documentadas para esse host, inclusive diretórios de usuário. Se um nome já existir, o resultado dessa árvore é `INVALID` e a prova recomeça numa árvore limpa.
3. O install usa a CLI já existente: `node bin/ai-dev-skills.mjs install --target <nome> --destination <consumidor>`. Um target por consumidor. Em seguida, `validate --target` nesse destino.
4. Cada host disponível produz a lista das skills que ele enxerga. A célula de descoberta passa se os 18 nomes aparecem uma vez. Nome ausente ou repetido é `FAIL`.
5. Para cada nome listado, o registro guarda a descrição que o modelo recebe. Se o host só mostrar a descrição na interface, isso fica numa coluna separada e não substitui o texto do modelo. `Use when` ausente no texto do modelo é `FAIL` dessa skill. Descrição igual ao frontmatter é `PASS`. Descrição encurtada com `Use when` ainda presente é `PASS`, com o texto encurtado citado.
6. A seleção automática usa um pedido novo, sem o nome da skill e sem o caminho do arquivo. `clarify`: ambiguidade material que muda o aceite. `context-engineering`: contexto de projeto ausente. `workflow`: várias skills possíveis e ordem incerta. `research`: comportamento de API externa que muda o próximo passo. Carga significa leitura de ferramenta do `SKILL.md` dessa skill ou citação verbatim de uma frase do corpo que não estava no pedido.
7. A invocação explícita usa o mecanismo documentado para a superfície: Cursor `/nome`; Codex `$nome` ou `/skills`; Claude Code `/nome`; Antigravity `/nome`. O registro diz qual mecanismo foi usado. As quatro sondas precisam carregar o `SKILL.md` correspondente.
8. A abertura de `references/` pede citação, sem executar o workflow e sem gravar arquivo. A frase esperada em `references/contract.md` contém `Primary invocation`. Em `workflow`, a sonda também pede `"when": "external facts affect decisions"` de `references/catalogue.json`. Arquivo não encontrado, ou caminho que saia para `contracts/` ou para este pacote, é `FAIL`. Paráfrase sem leitura de ferramenta, depois de uma segunda tentativa, é `INCONCLUSIVE`.
9. A abertura de `assets/` pede `artifact: decision_set` em `clarify` e `artifact: research_report` em `research`. `context-engineering` e `workflow` ficam `N/A` nesse critério. Inventar arquivo em `assets/` para essas duas é `FAIL`.
10. Host não lançado produz `NOT_RUN` com o que foi procurado. Não entra no numerador nem no denominador de aprovação.
11. O relatório final não altera arquivos do pacote fora de `.ai/artifacts/tests/` e do handoff de evidência. Não abre emenda de correção.

## Business Rules

- `primaryInvocation` não é flag do host. Skill `model` continua obrigada a aparecer na lista e a aceitar invocação explícita.
- Uma carga automática não mede taxa de acerto futura. O critério numérico está em `DECISION-SET-20261014-001`.
- `INCONCLUSIVE` não reprova o host. `FAIL` numa gate reprova o host. `INVALID` não é `FAIL` do pacote; é prova contaminada.
- `NOT_RUN` de todos os hosts deixa a emenda incompleta. Não é aprovação.
- Comando `/doctor` ou `/skill-doctor` dentro do Claude Code, se usado como evidência de listagem, é comando do produto. Não cria `doctor` na CLI do pacote.
- A sondagem não autoriza a skill a gravar artefato. Se ela gravar mesmo assim, o registro descreve o fato e não o converte em falha de descoberta.

## Non-functional Requirements

- Rastreabilidade: cada célula cita sessão, data, versão do host e caminho do consumidor.
- Sigilo: log e captura não incluem segredo, token nem conteúdo de `.env`.
- Isolamento: sessões novas por sonda. Sonda anterior não permanece no contexto.
- Repetibilidade: o consumidor pode ser apagado. O pacote permanece em `b86f41d` ou num descendente que não altere skills.

## Technical Constraints

- Não ampliar as chaves do descritor de target.
- Não alterar `scripts/distribute-skills.mjs` nem `scripts/validate-skills.mjs`.
- Não tratar o PATH vazio desta sessão de planejamento como `NOT_RUN` dos quatro hosts.
- A evidência de execução, quando existir, fica em `.ai/artifacts/tests/2026-10-14-live-host-observation/`.

## Security / Privacy

O consumidor não recebe segredo. Captura de tela e transcript passam por revisão antes de entrarem no repositório. A prova não pede à skill que chame rede, apague arquivo ou leia credencial.

## Acceptance Criteria

- Os quatro hosts disponíveis, e somente eles, têm registro completo. Host ausente tem `NOT_RUN` com a checagem.
- Em cada host `PASS`: 18 nomes únicos; descrições do modelo registradas; invocação explícita das quatro sondas; `references/` das quatro sondas; `assets/` de `clarify` e `research`; `N/A` de assets para `context-engineering` e `workflow`.
- Seleção automática do host não está em `FAIL`. `INCONCLUSIVE` é aceito e fica explícito.
- Nenhum diff em `skills/`, `contracts/`, `manifest/`, `scripts/`, `targets/` ou `package.json` nasce desta observação.
- `npm test` continua 53/53 no pacote, sem teste novo de produto.
- O relatório separa fato observado de hipótese, inclusive a hipótese de que o nome `resources/` causou uma falha de abertura no Antigravity.

## Risks

O orçamento do Codex e o do Claude Code podem omitir ou encurtar descrições mesmo com o teto de 240 caracteres do pacote. A página do Antigravity não nomeia `references/` nem `assets/`. Seleção automática depende do modelo. Citação verbatim pode ser alucinação se não houver leitura de ferramenta. Skill de usuário com o mesmo nome pode mascarar a instalação.

## Open Questions

Nenhuma questão bloqueante do protocolo. A superfície disponível do Antigravity e o texto real da listagem ficam para a execução.

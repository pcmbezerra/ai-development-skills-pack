---
artifact: research_report
id: RESEARCH-20261014-403
version: 1
status: ready
created_by: research
inputs:
  - RESEARCH-20261013-401
  - RESEARCH-20261013-402
  - HANDOFF-20261014-001
  - HANDOFF-20261006-001
---

## Research Question

O que a documentação pública dos quatro hosts, relida em 2026-10-14, permite exigir de uma observação ao vivo das 18 skills, e o que continua hipótese até um processo desses produtos abrir a skill?

## Findings

Fato de repositório, medido neste checkout em `b86f41d`: as 18 descrições têm de 132 a 183 caracteres, todas com `Use when`. Uma listagem sintética no formato `- nome: descrição` soma 3016 caracteres, incluindo as quebras de linha. Esse formato não é o do Codex nem o do Claude Code. A projeção em `references/` e `assets/` tem 84 arquivos e 263465 bytes. Três skills não têm `assets/`: `context-engineering`, `setup-ai-development-skills` e `workflow`. `context-engineering` também não tem `routing.md`. `workflow` tem `references/catalogue.json`. A suíte estrutural não lança os produtos.

Fato de ambiente desta sessão: Linux 6.12.94+ x86_64, Node.js v22.14.0, npm 10.9.9. `cursor`, `agent`, `codex`, `claude`, `agy` e `antigravity` não estão no PATH. Ausência no PATH não prova que o produto não exista na máquina do mantenedor. Esta sessão não marca nenhum host como `NOT_RUN` da emenda.

Fato das páginas lidas em 2026-10-14, que não é execução:

- Cursor, em https://cursor.com/docs/skills, descobre `.cursor/skills/`, `.agents/skills/`, `.claude/skills/`, `.codex/skills/` e os equivalentes no diretório do usuário. A seleção usa `description`. A invocação explícita é `/` seguido do nome. `references/` e `assets/` estão nomeados. A página não publica orçamento de caracteres da listagem.
- Codex, em https://developers.openai.com/codex/skills, lê `.agents/skills` do diretório de trabalho até a raiz. A lista inicial inclui nome, descrição e caminho do arquivo. O teto documentado é 2% da janela ou 8000 caracteres quando a janela é desconhecida. Se o conjunto não cabe, o Codex encurta descrições primeiro e pode omitir skills, com aviso. A invocação explícita no CLI ou na extensão é `/skills` ou `$nome`. `references/` e `assets/` estão nomeados. Nomes duplicados não são fundidos: os dois podem aparecer.
- Antigravity, em https://antigravity.google/docs/skills/, usa `<workspace>/.agents/skills/<skill>/SKILL.md` no app, no CLI e no IDE, com compatibilidade para `.agent/skills`. A invocação explícita documentada é o comando `/nome` no app e no CLI. O desenho de diretório nomeia `scripts/`, `examples/` e `resources/`. Não nomeia `references/` nem `assets/`. Não diz que um arquivo fora desses nomes é ignorado. Os diretórios globais diferem entre app, CLI e IDE.
- Claude Code, em https://code.claude.com/docs/en/skills, carrega `.claude/skills/<skill>/SKILL.md` no projeto e nos pais até a raiz. A invocação explícita é `/nome`. A listagem mantém todos os nomes. O orçamento documentado é 1% da janela de contexto; descrições excedentes são descartadas a partir das skills menos invocadas. Cada descrição, somada a `when_to_use`, é cortada em 1536 caracteres. As 18 descrições deste pacote estão abaixo desse teto por skill. O documento não mede se dezoito descrições cabem no orçamento de 1%. Arquivos de apoio ficam no diretório da skill e são citados por caminho relativo; o exemplo é `reference.md` ao lado de `SKILL.md`, não a pasta `references/`. Skill pessoal com o mesmo nome precede a skill de projeto.
- A especificação em https://agentskills.io/specification continua recomendando `references/` e `assets/`, com carga progressiva: metadados, depois o corpo, depois o recurso citado.

`RESEARCH-20261013-401` e `RESEARCH-20261013-402` continuam válidos no que descrevem instalação e links. A página do Codex agora declara que a lista inclui o caminho e que a descrição é encurtada antes da omissão. A página do Claude Code agora declara o orçamento de 1% e o descarte de descrições. Essas duas frases não existiam como medição no relatório de 2026-10-13.

## Evidence

Inventário executado sobre os 18 `SKILL.md` e as pastas `references/` e `assets/` em `b86f41d`. As cinco páginas externas foram lidas em 2026-10-14. `npm test` passou 53/53 na mesma sessão. Nenhum host foi executado. A frase `Status: implemented. Primary invocation:` está nos contratos projetados e não está no corpo dos `SKILL.md` sondados. `artifact: decision_set` e `artifact: research_report` estão nos templates e não estão nos `SKILL.md` correspondentes. `"when": "external facts affect decisions"` está em `workflow/references/catalogue.json`.

## Alternatives

Observar as 18 skills em profundidade nos quatro hosts multiplica sessões sem cobrir um mecanismo novo: a descoberta é propriedade do diretório e do frontmatter. Observar só quatro skills sem contar os 18 nomes deixa passar omissão por orçamento, que o Codex e o Claude Code documentam como comportamento de catálogo. Instalar os quatro targets no mesmo projeto confunde a leitura do Cursor, que também varre `.agents/skills` e `.claude/skills`. Tratar a suíte Node ou o arquivo no disco como abertura pelo produto repete o limite já registrado.

## Constraints

Não usar API privada. Não criar runtime que execute a skill no lugar do agente. Não certificar comportamento sem executar o produto. Não alterar frontmatter, skill, contrato, target ou CLI para facilitar a observação. Manter dezoito skills e quatro targets.

## Risks

A descrição deste pacote coloca `Use when` no fim. O Codex documenta encurtamento da descrição e o Claude Code documenta descarte de descrições inteiras. Um corte no fim remove o gatilho sem remover o nome. A página do Antigravity usa `resources/` onde a projeção usa `references/` e `assets/`. Um fracasso de abertura não identifica sozinho a causa. Skill pessoal ou de outro target no mesmo projeto pode ser contada como descoberta da instalação sob teste. Uma citação parafraseada não prova leitura do arquivo.

## Unknowns

Não se observou, num processo de Cursor, Codex, Antigravity ou Claude Code, a lista real das 18 skills, o texto de descrição entregue ao modelo, a seleção sem nomear a skill, a invocação explícita, nem a abertura de `references/` ou `assets/`. Não se observou qual das três superfícies do Antigravity o mantenedor tem. Não se observou a ordem em que o Claude Code descarta descrições quando nenhuma skill deste pacote foi invocada antes. O formato exato da linha que o Codex conta nos 8000 caracteres continua por medir, embora a página diga que a linha inclui nome, descrição e caminho.

## Sources

- https://cursor.com/docs/skills
- https://developers.openai.com/codex/skills
- https://antigravity.google/docs/skills/
- https://code.claude.com/docs/en/skills
- https://agentskills.io/specification
- `RESEARCH-20261013-401`
- `RESEARCH-20261013-402`
- `targets/cursor.mjs`, `targets/codex.mjs`, `targets/antigravity.mjs`, `targets/claude-code.mjs`
- os 18 `skills/**/SKILL.md` neste checkout

## Recommendation

Abrir a v1-A21 como observação, sem mudança de produto. Exigir a lista das 18 skills em cada host disponível e sondar em profundidade só `clarify`, `context-engineering`, `workflow` e `research`. Registrar host ausente como `NOT_RUN`, com a checagem que falhou, sem convertê-lo em aprovação nem em falha. Não tratar esta sessão como essa observação.

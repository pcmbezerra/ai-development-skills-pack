---
artifact: research_report
id: RESEARCH-20261013-402
version: 1
status: ready
created_by: research
inputs:
  - RESEARCH-20261013-401
  - HANDOFF-20261013-008
  - HANDOFF-20261006-001
---

## Research Question

Quais arquivos um diretório de skill pode carregar, segundo os documentos públicos dos quatro hosts e da especificação Agent Skills, e quais referências dos `SKILL.md` deste pacote deixam de resolver depois da instalação?

## Findings

Os 18 `SKILL.md` contêm 108 links Markdown. Nenhum é URL. Todos usam `../../../` e resolvem dentro deste repositório em `cf74225` ancestral e no fechamento `52c35d7`. Os alvos são `contracts/failure.md` (19 ocorrências; `context-engineering` liga esse arquivo duas vezes), `contracts/artifacts.md` (18), `contracts/skill-contract.md` (18), `manifest/skills.json` (18), `contracts/routing.md` (17) e o contrato da própria skill (18, um por arquivo). `context-engineering` não liga `contracts/routing.md`. Nenhum `SKILL.md` liga `templates/`.

O instalador copia o diretório pai de cada `skill.path`, isto é `skills/<categoria>/<nome>/`, para `<destino>/<projectSkillsPath>/<nome>/`. Não copia `contracts/` nem `manifest/`. Os quatro `projectSkillsPath` têm dois segmentos: `.cursor/skills`, `.agents/skills` e `.claude/skills`. A partir do diretório instalado, `../../../` cai na raiz do projeto consumidor. Nesse projeto os alvos não existem, salvo se o destino for este próprio repositório.

A especificação em https://agentskills.io/specification, lida em 2026-10-13, define a skill como diretório com `SKILL.md` obrigatório e quaisquer outros arquivos. Recomenda `scripts/`, `references/` e `assets/`. O agente carrega metadados, depois o corpo, depois os recursos citados. O caminho relativo parte da raiz da skill e fica a um nível de `SKILL.md`.

Cursor, em https://cursor.com/docs/skills, repete esse diretório opcional dentro de `.cursor/skills/<skill>/` e de `.agents/skills/<skill>/`, e diz que o agente usa as ferramentas para agir sobre scripts, referências e assets. Codex, em https://developers.openai.com/codex/skills, descreve o mesmo trio opcional e a revelação progressiva. Claude Code, em https://code.claude.com/docs/en/skills, diz que a skill pode ter arquivos de apoio no próprio diretório, citados por caminho relativo a partir de `SKILL.md`, com exemplo `reference.md` ao lado do arquivo principal. Antigravity, em https://antigravity.google/docs/skills/, descreve o pacote como diretório e nomeia `scripts/`, `examples/` e `resources/`. Não nomeia `references/` nem `assets/`. Não diz que um arquivo com outro nome é ignorado.

Nenhum desses documentos, nem `RESEARCH-20261013-401`, descreve um índice ao lado das skills, uma API de registro ou a leitura de `contracts/` fora do diretório da skill. A igualdade de bytes entre a fonte canônica e o diretório instalado continua sendo o comportamento de `scripts/distribute-skills.mjs`.

Medição no disco deste checkout: os 18 contratos por skill somam 120979 bytes; `contracts/artifacts.md` tem 7957; `contracts/skill-contract.md` tem 8548; `contracts/routing.md` tem 4453; `contracts/failure.md` tem 610; `contracts/quality-gates.md` tem 1023; `manifest/skills.json` tem 23819; os 15 templates de artefato somam 9418. Copiar manifesto, contrato compartilhado, artefatos, routing, falha e gates para as 18 skills, mais uma segunda cópia dos contratos por skill, passa de 950000 bytes. Os contratos por skill ligam só `../failure.md` (18), `../quality-gates.md` (8: `architecture-design`, `code-review`, `docs`, `implement`, `modernize`, `refactor`, `to-spec`, `to-tickets`) e `../artifacts.md` (3: `domain-modelling`, `edge-case-analysis`, `research`).

## Evidence

Inventário executado sobre os 18 `SKILL.md` e os 18 `contracts/skills/*.md` neste checkout. Os links foram resolvidos com a raiz do repositório e, em simulação, com `.cursor/skills/<nome>/`. Tamanhos vieram de leitura dos arquivos. As páginas externas foram lidas em 2026-10-13. Nenhum host foi executado.

## Alternatives

Copiar todos os contratos e o manifesto para dentro de cada skill torna o link local, e multiplica o mesmo texto. Um diretório irmão compartilhado, com um único `routing.md`, exige um caminho `../` que a especificação não usa como referência de skill e que não resolve ao mesmo tempo na árvore `skills/<categoria>/<nome>/` e na árvore instalada de dois segmentos. Reescrever o link na instalação quebra a igualdade de bytes que a v1-A19 manteve. Um symlink para `contracts/` deixa de apontar para o repositório de origem depois da cópia.

## Constraints

Não usar API privada nem recurso que os quatro documentos não descrevem. Não criar runtime que execute a skill no lugar do agente. Não certificar leitura ao vivo. Manter dezoito skills, quatro targets e frontmatter só com `name` e `description`.

## Risks

Um host pode não seguir um arquivo que esteja no diretório mas fora do nome de pasta que o próprio documento exemplifica. Essa possibilidade não foi medida. A página do Antigravity usa `resources/` onde a especificação recomenda `assets/`. Tratar a checagem de caminho no disco como prova de que o produto carregou o arquivo repetiria o limite já registrado em `RESEARCH-20261013-401`.

## Unknowns

Não se observou, num processo de Cursor, Codex, Antigravity ou Claude Code, se o agente abre um arquivo citado dentro do diretório da skill. Não se observou se o Antigravity deixa de ler um arquivo só porque ele está em `references/` ou `assets/` em vez de `resources/`. Essas duas ausências não mudam o fato de repositório: o link `../../../contracts/` não está no diretório instalado. A escolha de qual subconjunto copiar é decisão do pacote, registrada à parte.

## Sources

- https://agentskills.io/specification
- https://cursor.com/docs/skills
- https://developers.openai.com/codex/skills
- https://code.claude.com/docs/en/skills
- https://antigravity.google/docs/skills/
- `RESEARCH-20261013-401`
- `scripts/distribute-skills.mjs`
- `targets/cursor.mjs`, `targets/codex.mjs`, `targets/antigravity.mjs`, `targets/claude-code.mjs`
- os 18 `skills/**/SKILL.md` e os 18 `contracts/skills/*.md` neste checkout

## Recommendation

Tratar o diretório da skill como a unidade que viaja na instalação. Levar para dentro dele só o contrato da skill, os alvos que esse contrato liga, o template do artefato que a skill grava e, quando o texto cita regra de routing, `routing.md`. Deixar o manifesto completo e o contrato compartilhado no repositório de origem. Não reescrever links na hora de instalar.

---
artifact: research_report
id: RESEARCH-20261016-404
version: 1
status: ready
created_by: research
inputs: []
---

## Research Question

Quais práticas de estrutura e apresentação estão no README público de `pcmbezerra/PRDC` e de `mattpocock/skills` em 2026-10-16, e quais delas podem reorganizar o `README.md` deste pacote sem declarar funcionalidade, métrica, licença, compatibilidade ou característica que o repositório não verifica?

## Findings

O README de `pcmbezerra/PRDC`, em `main`, abre com uma frase do que o programa é, um índice de âncoras, requisitos, comandos de build, uma lista curta de capacidades, a árvore real dos arquivos principais e um índice da documentação que existe no repositório. A licença MIT aparece porque o arquivo `LICENSE` e a API do GitHub declaram MIT. O roadmap diz que os itens são direção, não data de release. Há `CONTRIBUTING.md`, `SECURITY.md`, `CHANGELOG.md` e README em português em `docs/readme/README_pt-BR.md`.

O README de `mattpocock/skills`, em `main`, abre com o propósito em linguagem comum, um caminho de instalação numerado por agente e um catálogo agrupado. Cada skill tem o nome em link para o `SKILL.md` e uma frase do que faz. A separação user-invoked / model-invoked desse repositório trata a invocação do usuário como exclusiva. A licença na API do GitHub é MIT. O README também documenta instalação por plugin de Claude Code, Codex, Copilot e Gemini CLI, além de `npx skills`.

Neste pacote, o catálogo fechado tem 18 skills `implemented` em `manifest/skills.json`, nas categorias core, discovery, development, quality, documentation e modernization. A invocação primária é classificação: 13 skills `user` e 5 `model` (`context-engineering`, `domain-modelling`, `tdd`, `edge-case-analysis`, `code-review`). O glossário em `CONTEXT.md` recusa tratar essa classificação como exclusividade.

A CLI em `bin/ai-dev-skills.mjs` implementa `validate`, `validate --target --path`, `install --target --destination`, `package --target --output` e `--help`. Os descritores declaram Cursor em `.cursor/skills`, Codex e Gemini Antigravity em `.agents/skills`, e Claude Code em `.claude/skills`. `package.json` exige Node.js `>=22`, `private: true`, `license` `UNLICENSED` e dependências vazias. O arquivo `LICENSE` é um placeholder que não concede permissão de uso, distribuição ou sublicenciamento.

Não há `.github/`, `CONTRIBUTING.md`, `SECURITY.md` nem `CHANGELOG.md`. A documentação versionada sob `docs/` é `docs/agents/domain.md`, `docs/agents/issue-tracker.md` e `docs/agents/triage-labels.md`. `.ai/project.md` registra o veredito `OBSERVED` da v1-A21, Claude Code `NOT_RUN`, a versão `1.0.0-scaffold` como identificador congelado e a v1-A22 fechada. `list`, `doctor` e `sync` não existem na CLI.

A API não autenticada `https://api.github.com/repos/pcmbezerra/ai-development-skills-pack` respondeu 404 em 2026-10-16. Os outros dois repositórios responderam `visibility: public`.

## Evidence

As páginas brutas dos dois READMEs e as listagens de raiz foram lidas em 2026-10-16. A metadata de licença e visibilidade veio da API pública dos dois repositórios de referência na mesma data. O estado local veio de `README.md`, `package.json`, `LICENSE`, `manifest/skills.json`, `bin/ai-dev-skills.mjs`, `targets/*.mjs`, `CONTEXT.md` e `.ai/project.md`. Nenhum desses comandos de instalação dos repositórios de referência foi executado.

## Alternatives

Manter o README atual preserva o detalhe das emendas, mas a primeira tela é a lista v1-A1–v1-A18, enquanto o corpo já chega à v1-A21. Traduzir o README para o inglês, como a página principal do PRDC, troca o idioma já usado por este `README.md`. Copiar badges, plugin marketplace, `npx skills`, newsletter ou a exclusividade de invocação do `mattpocock/skills` declararia superfície que este repositório não tem.

## Constraints

Não inventar licença, badge de CI, estrela, download ou compatibilidade de host. Não apresentar `OBSERVED` como certificação. Não abrir a v1-A22 nem descrever `list`, `doctor`, `sync`, desinstalação, instalação global ou detecção de plataforma como roadmap. Não tratar `primaryInvocation` como exclusividade. Não exigir `npm install`: `dependencies` está vazio. ADR `0001` permanece limitado a conjunto de decisões.

## Risks

Um README curto demais omite que `workflow` não executa o plano e que artefato fora de `ready` não autoriza o passo seguinte. Tratar Codex e Gemini Antigravity como diretórios diferentes esconde que os dois descritores usam `.agents/skills`. Repetir “requer Git” a partir do README atual vai além do que a CLI inspecionada executa; o uso de Git visto no repositório é evidência de `git diff --check`, não uma dependência da CLI.

## Unknowns

A resposta 404 não distingue repositório privado de repositório inexistente para um cliente sem autenticação. Premissa, não achado: o texto sugerido permanece em português porque esse é o idioma do `README.md` atual. Não se mediu, nesta sessão, uma suíte nova; as contagens 53/53 já registradas em `.ai/project.md` não foram reexecutadas aqui.

## Sources

- https://raw.githubusercontent.com/pcmbezerra/PRDC/main/README.md
- https://api.github.com/repos/pcmbezerra/PRDC
- https://api.github.com/repos/pcmbezerra/PRDC/contents/
- https://raw.githubusercontent.com/mattpocock/skills/main/README.md
- https://api.github.com/repos/mattpocock/skills
- https://api.github.com/repos/mattpocock/skills/contents/
- https://api.github.com/repos/pcmbezerra/ai-development-skills-pack
- `README.md`
- `package.json`
- `LICENSE`
- `manifest/skills.json`
- `bin/ai-dev-skills.mjs`
- `targets/cursor.mjs`
- `targets/codex.mjs`
- `targets/antigravity.mjs`
- `targets/claude-code.mjs`
- `CONTEXT.md`
- `.ai/project.md`

## Recommendation

Reorganizar o README local no formato verificável dos dois exemplos: frase de propósito, índice, requisitos reais, comandos da CLI, tabela de targets, catálogo com as descrições do manifest e links para `SKILL.md`, limites explícitos e índice só de documentos que existem. Não copiar MIT, badges, CI, contributing, security, changelog, plugin ou `npx skills`. Não afirmar que o GitHub deste pacote está público. A recomendação não grava `README.md` e não autoriza commit nem push.

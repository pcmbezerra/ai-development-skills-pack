---
artifact: spec
id: SPEC-20261013-009
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261013-009
  - RESEARCH-20261013-402
  - HANDOFF-20261013-008
---

# Skill instalada autocontida — emenda v1-A20

## Problem

Depois do `install`, cada `SKILL.md` ainda manda o agente abrir `contracts/` e `manifest/skills.json` por um caminho `../../../` que só existe neste repositório. O instalador copia o diretório da skill e não copia esses arquivos. Uma skill instalada num projeto consumidor não resolve 108 links.

## Goal

Fazer a v1-A20 deixar cada skill instalada utilizável sem o repositório de origem: todo link de execução aponta para um arquivo dentro do próprio diretório, e esse diretório continua igual, byte a byte, entre a fonte canônica e os quatro targets.

## Scope

- Projetar, dentro de cada `skills/<categoria>/<nome>/`, o contrato da skill, as cópias byte a byte que esse contrato ou o `SKILL.md` citam, e o template de cada artefato de esquema definido que a skill grava.
- Trocar, no `SKILL.md`, os links `../../../contracts/` e `../../../manifest/skills.json` por caminhos que não saem do diretório da skill.
- Fazer o validador rejeitar link que escape do diretório e projeção que divirja da fonte canônica.
- Provar, num destino temporário sem `contracts/` nem `manifest/`, que os quatro targets instalam e que cada link resolve.
- Registrar a emenda na proveniência, no contrato compartilhado e no README, separando arquivo presente de leitura ao vivo.

## Non-goals

- Executar Cursor, Codex, Antigravity ou Claude Code.
- Adicionar `list`, `doctor`, `sync`, detecção de plataforma, instalação global ou desinstalação.
- Adicionar frontmatter, chave de target, dependência npm ou comando de CLI.
- Alterar goal, status, dependência, routing R1–R17 ou o texto normativo dos contratos canônicos.
- Achatar `skills/<categoria>/`, criar diretório irmão compartilhado ou reescrever arquivo durante o `install`.
- Copiar o manifesto inteiro, o contrato compartilhado, a proveniência ou os templates de projeto.
- Modelar domínio. R8 não se aplica: não há terminologia de negócio, invariante, transição, evento nem fronteira de contexto novos.
- Reabrir `SPEC-20261013-008` ou o ADR `0001`.

## Actors

- Mantenedor do pacote, que edita a fonte canônica.
- Validador estrutural, que compara a projeção com essa fonte.
- Agente do projeto consumidor, que lê só o diretório instalado se o host implementar o documento citado em `RESEARCH-20261013-402`.

## Functional Requirements

1. Cada uma das 18 skills passa a ter `references/contract.md`. O arquivo é o contrato canônico com uma única transformação: `../failure.md`, `../quality-gates.md` e `../artifacts.md` viram o nome do irmão em `references/`. Nenhuma frase normativa muda. Evidência: `DECISION-SET-20261013-009`.
2. `references/failure.md` acompanha as 18 skills e é byte a byte `contracts/failure.md`. Evidência: os 18 contratos ligam esse arquivo.
3. `references/quality-gates.md` acompanha só a skill cujo contrato liga `../quality-gates.md`, e é byte a byte `contracts/quality-gates.md`. O inventário nomeia oito skills. Evidência: `RESEARCH-20261013-402`.
4. `references/artifacts.md` acompanha a skill cujo contrato liga `../artifacts.md` e também `workflow`, e é byte a byte `contracts/artifacts.md`. O inventário nomeia `domain-modelling`, `edge-case-analysis` e `research`, além de `workflow`. Evidência: `DECISION-SET-20261013-009`.
5. `references/routing.md` acompanha a skill cujo `SKILL.md` ou contrato cita `routing.md` ou uma regra `R1`–`R17`, e é byte a byte `contracts/routing.md`. `context-engineering` não recebe esse arquivo. Evidência: `RESEARCH-20261013-402`.
6. Para cada artefato de esquema `defined` com template em `artifactOutputs`, a skill recebe `assets/<arquivo>` byte a byte igual ao template canônico. `PROJECT_CONTEXT`, `WORKFLOW_PLAN`, `CHANGE_SET`, `BOOTSTRAP_READINESS` e `TICKET` não ganham arquivo de template. Evidência: o manifesto e a classificação já validada de saídas apenas nomeadas.
7. `workflow` recebe `references/catalogue.json` com as 18 skills e somente `name`, `status`, `primaryInvocation` e `dependencies`. O arquivo não contém caminho de contrato, manifesto, target ou `projectSkillsPath`. Evidência: o contrato de `workflow` lê o manifesto para ciclo de vida e dependência.
8. Nenhum link Markdown em `SKILL.md` ou em arquivo dentro do diretório da skill resolve fora desse diretório. O corpo deixa de citar `contracts/`, `manifest/skills.json` e `templates/artifacts/` como caminho de leitura. Caminhos `.ai/` de escrita no projeto consumidor permanecem.
9. `install` e `package` continuam copiando o diretório canônico sem transformação. `validate --target` continua exigindo igualdade de bytes com esse diretório, agora incluindo `references/` e `assets/`.
10. Um destino temporário sem `contracts/` e sem `manifest/` ainda resolve todos os links das 18 skills nos quatro targets.

## Business Rules

- A fonte autoritativa do pacote continua sendo o contrato em `contracts/` e o manifesto. A projeção não é uma segunda redação.
- Invocação primária, dependências e status não mudam.
- Recomendar uma skill no texto continua sem criar dependência e sem executar a skill.
- A checagem de caminho no disco não afirma que um host abriu o arquivo.

## Non-functional Requirements

- Determinismo: a mesma fonte produz o mesmo diretório instalado.
- Auditabilidade: a projeção é comparável à fonte por igualdade de bytes ou pela transformação de link já nomeada.
- Duplicação limitada ao subconjunto citado. A estimativa, pela aritmética dos tamanhos medidos em `RESEARCH-20261013-402`, fica em torno de 259000 bytes adicionados, contra mais de 950000 bytes se manifesto, contrato compartilhado e contratos gerais fossem copiados nas 18 skills. O validador não impõe um teto numérico novo.
- Compatibilidade: Node.js >= 22, zero dependências npm, dezoito skills, quatro targets.

## Technical Constraints

Decisão durável já registrada em `DECISION-SET-20261013-009`: a unidade instalada é o diretório da skill; os arquivos normativos mínimos são projeção dentro dele; o instalador não reescreve links.

Alternativas já rejeitadas: cópia integral do manifesto e do contrato compartilhado; diretório irmão com link `../`; reescrita na instalação; symlink para `contracts/`; texto integral embutido no `SKILL.md`.

Consequências: o diretório da skill cresce com cópias verificáveis; o mantenedor edita a fonte canônica e o validador acusa deriva; os quatro targets continuam recebendo o mesmo diretório; um projeto consumidor não precisa deste repositório para seguir os links.

Não ampliar as chaves do descritor de target. Não alterar o comportamento de `scripts/distribute-skills.mjs` além de passar a copiar os arquivos que já estarão no diretório. Não tratar cenário de teste como execução de produto. R8 não se aplica. R9 se aplica e o desenho está autorizado.

## Security / Privacy

A projeção não inclui segredo, credencial, caminho de instalação de target nem concessão `allowed-tools`. O catálogo de `workflow` não inclui caminho de arquivo do pacote.

## Acceptance Criteria

- `npm run validate` e `npm run skills:validate` passam com dezoito skills.
- `npm test` passa, incluindo rejeição de link que sai do diretório da skill e rejeição de projeção diferente da fonte canônica.
- Um teste de instalação em diretório temporário sem `contracts/` e sem `manifest/` resolve os links nos quatro targets e falha se algum link escapar.
- `git diff --check` passa.
- Nenhuma skill muda goal, status ou dependência.
- A ajuda da CLI não passa a oferecer `list`, `doctor` ou `sync`.
- O ADR `0001` permanece intacto.

## Risks

A leitura ao vivo pode não abrir `references/` ou `assets/` mesmo com o arquivo no disco. O Antigravity documenta outro nome de pasta. Uma regra que exista só em `contracts/skill-contract.md` ou só numa seção de `artifacts.md` não viaja para a skill que não recebeu esse arquivo. A cópia de `routing.md` em 17 skills ainda é texto repetido; a alternativa de uma cópia única foi rejeitada porque o caminho sairia do diretório.

## Open Questions

Nenhuma questão bloqueante. A verificação ao vivo nos quatro produtos permanece aberta e fora deste aceite.

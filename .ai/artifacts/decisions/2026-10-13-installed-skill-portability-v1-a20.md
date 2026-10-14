---
artifact: decision_set
id: DECISION-SET-20261013-009
version: 1
status: ready
created_by: clarify
inputs:
  - RESEARCH-20261013-402
  - RESEARCH-20261013-401
  - DECISION-SET-20261013-008
  - HANDOFF-20261013-008
  - HANDOFF-20261006-001
---

## Objective

Abrir a emenda v1-A20 para que uma skill instalada continue utilizável sem o repositório de origem, e fixar o desenho antes de alterar o instalador ou os `SKILL.md`.

## Resolved Decisions

- A emenda v1-A19 está encerrada. A baseline desta emenda é `origin/main` em `52c35d7`, o merge da v1-A19. `cf74225` é o commit da v1-A18 e ancestral de `52c35d7`. Ramificar em `cf74225` omitiria a emenda encerrada. Evidência: `git log cf74225..origin/main` neste checkout, depois de `git fetch origin main`.
- Os identificadores novos são `RESEARCH-20261013-402`, `DECISION-SET-20261013-009`, `SPEC-20261013-009`, `ARCHITECTURE-20261013-002`, `ADR-0002`, `TICKET-SET-20261013-009` e `HANDOFF-20261013-009`. Não reutilizar identificadores da v1-A16, da v1-A17, da v1-A18 nem da v1-A19.
- Esta sessão grava a análise, o desenho, os critérios de aceite e o conjunto de tickets. Não executa esses tickets e não altera `skills/`, `scripts/`, `targets/` nem o manifesto.
- A unidade portátil é o diretório da skill. Cada arquivo de que o `SKILL.md` ou o contrato da skill precisa para executar entra nesse diretório, com caminho relativo que não sobe acima dele. Evidência: `RESEARCH-20261013-402`.
- O contrato canônico permanece em `contracts/skills/<nome>.md`. A cópia em `references/contract.md` é projeção: o texto normativo fica igual e só os links `../failure.md`, `../quality-gates.md` e `../artifacts.md` passam a apontar para o irmão dentro de `references/`.
- Entram como cópia byte a byte, e só quando o contrato projetado ou o `SKILL.md` os cita: `references/failure.md`, `references/quality-gates.md`, `references/artifacts.md` e `references/routing.md`. Routing entra quando o texto cita `routing.md` ou uma regra `R1`–`R17`. Pelo inventário, `context-engineering` não cita routing.
- Cada artefato de esquema definido que a skill declara em `artifactOutputs` leva o template canônico para `assets/`, com o mesmo nome de arquivo. Saída apenas nomeada e `TICKET` não ganham template. `workflow` não grava template; leva `references/artifacts.md` porque o corpo manda inspecionar as seções exigidas, e leva `references/catalogue.json` com `name`, `status`, `primaryInvocation` e `dependencies` das 18 skills, sem caminhos de contrato, manifesto ou target.
- Não entram no diretório instalado: `manifest/skills.json` inteiro, `contracts/skill-contract.md`, `references/provenance.md`, `references/architecture-contract-v1.md`, contratos de outras skills e `templates/project/`. O campo `references` do manifesto continua apontando para a fonte canônica do pacote.
- Caminhos `.ai/` no corpo continuam sendo destinos de escrita no projeto consumidor. Não são referências ao repositório de origem.
- Instalação, empacotamento, igualdade de bytes, colisão divergente, os quatro caminhos, o frontmatter e a CLI permanecem. Não há reescrita de link na instalação, diretório irmão compartilhado, symlink para `contracts/`, `list`, `doctor`, `sync`, flag de fornecedor nem dependência npm.
- R8 não se aplica: a mudança não introduz terminologia de negócio, invariante, transição, evento ou fronteira de contexto. R9 se aplica à fronteira entre o diretório canônico e o diretório instalado. O desenho fica em `ARCHITECTURE-20261013-002`. A decisão durável também fica em `ADR-0002`. O ADR `0001` não é estendido.
- A publicação remota dos tickets continua pendente. O Markdown local é a fonte até a integração de issues ter leitura.

## Constraints

- Dezoito skills e quatro targets. Evidência: `AGENTS.md` e `DECISION-SET-20261013-008`.
- Nenhuma dependência npm. Evidência: `package.json`.
- A descrição de descoberta, o orçamento de 240 caracteres e a cláusula `Use when` permanecem. Evidência: `DECISION-SET-20261013-008`.
- Skills continuam workflows do agente. Este pacote não ganha executor.

## Assumptions

- As páginas lidas em 2026-10-13 descrevem o comportamento que os hosts pretendem. A sessão não confirmou, num processo desses produtos, que o agente abre o arquivo citado dentro do diretório.
- O nome de pasta `references/` e `assets/` é a recomendação da especificação, repetida por Cursor e Codex. O Antigravity documenta `resources/` e não afirma que outro nome seja ignorado. A premissa é que o mecanismo aceito é o arquivo dentro do diretório, citado por caminho relativo, e não um nome de pasta exclusivo de um host.

## Rejected Alternatives

- Copiar manifesto, contrato compartilhado e `artifacts.md` para as 18 skills. A medição em `RESEARCH-20261013-402` passa de 950000 bytes e inclui caminhos do repositório de origem.
- Diretório irmão único, com link `../`. A especificação pede caminho a partir da raiz da skill. A profundidade `skills/<categoria>/<nome>/` e a profundidade instalada não compartilham o mesmo relativo sem achatar a fonte ou reescrever o arquivo na instalação.
- Reescrever links em `install`. Isso contradiz a igualdade de bytes registrada em `DECISION-SET-20261013-008`.
- Symlink para `contracts/`. O alvo deixa de existir no projeto consumidor.
- Embutir contratos inteiros no corpo do `SKILL.md`. A especificação recomenda corpo abaixo de 500 linhas e recurso carregado só quando citado.
- Certificar a leitura ao vivo nos quatro produtos nesta emenda. Continua fora de alcance, como na v1-A19.

## Open Questions

Nenhuma questão aberta muda o recorte. A leitura ao vivo de um arquivo de apoio nos quatro produtos continua por fazer e não bloqueia a projeção estrutural.

## Blocking Questions

Nenhuma.

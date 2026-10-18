---
artifact: decision_set
id: DECISION-SET-20261016-001
version: 3
status: ready
created_by: clarify
inputs:
  - HANDOFF-20261016-001
  - RESEARCH-20261016-404
---

## Objective

Registrar a autorização do mantenedor para a emenda v1-A22 do comando `list`, e deixar o conjunto pronto para especificação somente quando nenhuma questão material dessa especificação permanecer aberta.

## Resolved Decisions

- Em 2026-10-16 o mantenedor revisou a decisão de 2026-10-15 em `.ai/project.md` exclusivamente para permitir a implementação futura do comando `list`. As outras oito exclusões permanecem fora de escopo: `doctor`, `sync`, roteador automático, desinstalação, instalação global, detecção de plataforma, `meta-skills/skill-authoring` e testes semânticos de overlap. Evidência: a mensagem do mantenedor nesta sessão. A versão 1 deste conjunto registrava que o pedido anterior não revogava essa decisão; esta versão substitui esse ponto porque o mantenedor decidiu a revisão limitada.
- O mantenedor autorizou abrir a emenda v1-A22 especificamente para `list`, mesmo sem `FAIL` de host. A v1-A21 permanece `OBSERVED`. Claude Code permanece `NOT_RUN`. `OBSERVED` não é certificação. Evidência: a mesma mensagem e `.ai/project.md`.
- O mantenedor autorizou uma exceção controlada à restrição de ADR `0002` exclusivamente para adicionar o comando `list` à CLI. A exceção não cobre outro comando, chave de target, dependência npm nem campo de frontmatter. O arquivo `.ai/decisions/0002-installed-skill-directory-is-the-portable-unit.md` não foi reescrito nesta execução. ADR `0001` não foi estendido. Evidência: a mensagem do mantenedor e ADR `0002`.
- Esta versão não autoriza `implement`. O mantenedor manteve a implementação condicionada a autorização posterior. Evidência: a restrição desta sessão.
- A fonte de `list` é o manifesto canônico. A seção 21 de `references/architecture-contract-v1.md` determina que o manifesto conduz `list`. O comando não recebe `--target`, `--path`, `--destination` nem `--output`: essas opções pertencem a `validate`, `install` e `package`. Evidência: a seção 21, `bin/ai-dev-skills.mjs` e o limite de escopo desta sessão.
- O comando bem-sucedido escreve texto na stdout e termina com saída 0. Argumento ou opção faz a CLI existente terminar com saída 1. `doctor`, `sync` e `bootstrap` continuam com saída 1. Evidência: `bin/ai-dev-skills.mjs` e o teste `CLI exposes distribution commands while rejecting unsupported commands`.
- A ajuda já documenta cada comando implementado. `list`, quando implementado, entra nessa ajuda. Evidência: a constante `HELP` em `bin/ai-dev-skills.mjs`.
- O catálogo permanece em 18 skills `implemented`. A ordem das entradas é a ordem de `skills` em `manifest/skills.json`. O identificador de cada entrada é `name`. Evidência: `manifest/skills.json`.
- `install` continua exigindo destino explícito, permanece idempotente quando o conteúdo é idêntico e continua recusando skill divergente. `list` não copia nem apaga arquivo. Evidência: `scripts/distribute-skills.mjs` e a emenda v1-A3.
- A versão `1.0.0-scaffold` permanece o identificador congelado. Nenhuma dependência npm de produção é adicionada. Node.js exigido: `>=22`.
- A stdout de `list` tem uma linha por skill, na ordem de `manifest.skills`, e o texto da linha é somente `name`. Evidência: o mantenedor escolheu essa alternativa nesta sessão, depois da versão 2.
- `.ai/project.md` conserva o parágrafo de 2026-10-15. `context-engineering` não foi executado: a revisão é escolha do mantenedor e esse skill não substitui uma decisão explícita já gravada. Este conjunto, versão 3, é o registro dessa revisão.

## Constraints

- Não implementar, não commitar e não fazer push nesta execução.
- Não modificar `README.md`, skills, contratos, manifesto, targets, CLI nem ADR.
- Preservar o working tree anterior: `README.md` modificado; `HANDOFF-20261016-001` e `RESEARCH-20261016-404` não rastreados. `HEAD` observado na versão 1: `2ef0b3d` em `main`.
- Esta versão está `ready` e autoriza `to-spec`. Não autoriza `implement`.
- `primaryInvocation` é classificação, não exclusividade.
- `RESEARCH-20261016-404` está `ready` e não define o comportamento de `list`.

## Assumptions

- Observado nesta sessão, em Node.js v26.5.0 e npm 11.17.0: `npm test` terminou 45/53. As oito falhas vêm de links do `README.md` local para `CONTEXT.md`, `.ai/architecture.md`, `.ai/project.md` e `docs/agents/`, ausentes na fixture que copia o README e não copia esses arquivos. O teste que valida a árvore real passou. `npm run validate` passou, 18 skills. `package --target all` e `install` dos quatro targets em diretório temporário passaram, com `validate --target` também passando. `list`, `doctor` e `sync` saíram 1. O temporário foi removido. `git status` depois disso manteve só o `README.md` modificado e os três artefatos não rastreados já existentes, mais este conjunto.

## Rejected Alternatives

- Manter `list` na exclusão de 2026-10-15. Rejeitada pela revisão explícita do mantenedor.
- Abrir a v1-A22 para as outras oito exclusões ou para renomear `1.0.0-scaffold`. Rejeitada pela mesma mensagem, que limita a emenda a `list`.
- Estender a exceção de ADR `0002` a `doctor`, `sync` ou a outro comando. Rejeitada porque a exceção nomeia somente `list`.
- Estender ADR `0001`. A decisão existente limita esse ADR à persistência de conjunto de decisões.
- Imprimir `status`, `category`, `primaryInvocation` ou `path` em `list`. Rejeitada pela escolha do mantenedor de uma linha somente com `name`.

## Open Questions

Nenhuma destas questões muda a especificação de `list`. O conteúdo da stdout já está decidido.

- Qual diferença `doctor` teria em relação a `validate`.
- Se `sync` poderia escrever conteúdo.
- Qual o escopo de uma desinstalação.
- Quais caminhos globais cada host documenta. Fato externo. `research` continua recomendado antes de qualquer spec de instalação global.
- Como distinguir Codex de Antigravity por diretório, já que os dois descritores declaram `.agents/skills`.
- Se um roteador automático seria um executor.
- Se `skill-authoring` permaneceria fora de `manifest/skills.json`.
- Qual oráculo determinístico decidiria overlap semântico.
- Quando `.ai/project.md`, o contrato compartilhado, a proveniência e o `README.md` passam a narrar a v1-A22. Esta execução não os altera.

## Blocking Questions

Nenhuma.

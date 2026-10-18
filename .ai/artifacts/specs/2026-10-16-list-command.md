---
artifact: spec
id: SPEC-20261016-001
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261016-001
  - RESEARCH-20261016-404
---

# Comando list — emenda v1-A22

## Problem

A CLI implementa `validate`, `install`, `package` e `--help`. `list` termina com saída 1 e `Unsupported command`. O manifesto já é a fonte canônica do catálogo, e a seção 21 de `references/architecture-contract-v1.md` determina que ele conduz `list`. Não há comando que imprima esse catálogo.

## Goal

Fazer `ai-dev-skills list` imprimir o nome de cada skill do manifesto canônico, na ordem do arquivo, sem escrever arquivo e sem alterar os outros comandos.

## Scope

- Acrescentar o comando `list` em `bin/ai-dev-skills.mjs`, sem argumentos e sem opções.
- Incluir a linha de uso na ajuda já existente.
- Ajustar o teste que hoje exige saída 1 para `list`, mantendo essa exigência para `doctor`, `sync` e `bootstrap`.
- Acrescentar asserções da stdout, da saída 0 e da rejeição de argumento ou opção.

## Non-goals

- Implementar `doctor`, `sync`, desinstalação, instalação global, detecção de plataforma, roteador automático, `meta-skills/skill-authoring` ou testes semânticos de overlap.
- Ler árvore instalada, aceitar `--target`, `--path`, `--destination` ou `--output`, ou lançar Cursor, Codex, Antigravity ou Claude Code.
- Mudar `scripts/distribute-skills.mjs`, descritores de target, manifesto, frontmatter, projeção das skills ou o catálogo de 18 skills.
- Renomear `1.0.0-scaffold`.
- Reescrever ADR `0001` ou ADR `0002`.
- Alterar `README.md`, `.ai/project.md`, `contracts/skill-contract.md` ou `references/provenance.md`. O momento dessa narrativa continua em aberto em `DECISION-SET-20261016-001`.
- Corrigir as oito falhas de fixture observadas em `npm test` nesta sessão. Elas vêm dos links do `README.md` local e não do comportamento de `list`.

## Actors

- Mantenedor do pacote, que executa a CLI no repositório.
- Suíte Node, que compara a stdout com `manifest/skills.json`.

## Functional Requirements

1. `ai-dev-skills list`, sem argumentos, termina com saída 0. Evidência: `DECISION-SET-20261016-001`.
2. A stdout contém uma linha por entrada de `manifest.skills`, na ordem do array. O texto de cada linha é somente o `name` dessa entrada, seguido da quebra de linha que `console.log` já usa nos outros comandos. Não há prefixo, coluna extra nem linha em branco adicional. Evidência: a escolha do mantenedor na versão 3 do conjunto e `bin/ai-dev-skills.mjs`.
3. No manifesto atual, essa saída tem 18 linhas e os nomes coincidem com as 18 skills. Evidência: `manifest/skills.json`.
4. Qualquer argumento ou opção faz o processo terminar com saída 1, pelo tratamento já existente de opção inválida ou não suportada. Evidência: `DECISION-SET-20261016-001` e `bin/ai-dev-skills.mjs`.
5. `--help`, `help` e `-h` continuam com saída 0 e passam a incluir a linha de uso de `list`. Evidência: a constante `HELP`.
6. `doctor`, `sync` e `bootstrap` continuam com saída 1 e `Unsupported command`. Evidência: `DECISION-SET-20261016-001`.
7. `list` não cria, copia nem apaga arquivo. `validate`, `install` e `package` conservam o comportamento atual. Evidência: `scripts/distribute-skills.mjs` e a emenda v1-A3.
8. A execução desta especificação não está autorizada. `DECISION-SET-20261016-001` autoriza a especificação e condiciona `implement` a autorização posterior.

## Business Rules

- O catálogo de runtime permanece em 18 skills. `primaryInvocation` continua sendo classificação, não exclusividade.
- A v1-A22 cobre somente `list`. A v1-A21 permanece `OBSERVED`. Claude Code permanece `NOT_RUN`.
- A versão do pacote permanece `1.0.0-scaffold`.

## Non-functional Requirements

- Determinismo: a mesma ordem de `manifest.skills` produz a mesma stdout.
- Compatibilidade: Node.js >= 22 e nenhuma dependência npm nova.
- Os quatro targets não mudam. `list` não recebe target.

## Technical Constraints

Decisão durável, alternativas e consequências, para o consumidor `architecture-design`:

- Decisão: a v1-A22 adiciona o comando `list` à CLI. Essa é a exceção controlada à restrição de ADR `0002` que proíbe acrescentar comando de CLI. A exceção não cobre outro comando, chave de target, dependência npm nem campo de frontmatter.
- Alternativas: manter `list` rejeitado; incluir `status`, `category`, `primaryInvocation` e `path` na mesma linha; aceitar `--target`. As três foram rejeitadas em `DECISION-SET-20261016-001`.
- Consequências: a ajuda e o despacho da CLI mudam. ADR `0002` não é reescrito por esta especificação. ADR `0001` não é estendido. Um ADR novo só cabe na execução posterior de `architecture-design`, porque esta especificação já registra a decisão.

R8 não se aplica: o comando não introduz termo de negócio, invariante, transição, evento nem fronteira de contexto. R9 se aplica: `list` é interface pública da CLI.

## Security / Privacy

`list` lê o manifesto do pacote e escreve nomes de skill na stdout. Não lê segredo, credencial, variável de ambiente nem caminho fora do repositório.

## Acceptance Criteria

1. `node bin/ai-dev-skills.mjs list` termina com saída 0.
2. A stdout é igual à lista de `skills[].name` do manifesto, uma por linha, na ordem do arquivo, sem outro texto.
3. `node bin/ai-dev-skills.mjs list --target cursor` termina com saída 1.
4. `node bin/ai-dev-skills.mjs --help` termina com saída 0 e a stdout contém `ai-dev-skills list`.
5. `doctor`, `sync` e `bootstrap` terminam com saída 1.
6. Depois de `list`, o working tree de código, manifesto, targets, contratos e skills permanece sem alteração causada pelo comando.
7. `package` e `install` em diretório temporário continuam instalando e validando as 18 skills nos quatro targets.
8. Nenhuma dependência npm é adicionada.

## Risks

- O teste `CLI exposes distribution commands while rejecting unsupported commands` hoje exige saída 1 para `list`. A implementação que não separar `list` de `doctor`, `sync` e `bootstrap` deixa a suíte vermelha ou libera comando fora de escopo.
- `npm test` nesta sessão terminou 45/53 antes de qualquer mudança de `list`. As oito falhas citam links do `README.md` local para arquivos que a fixture não copia. `npm run validate` na árvore real passou. Uma execução de `implement` que exija a suíte inteira verde encontra essa falha prévia. Corrigi-la não faz parte desta especificação.
- `.ai/project.md` e `contracts/skill-contract.md` ainda descrevem `list` como ausente. Esta especificação não os atualiza. Quem ler só esses arquivos não vê a v1-A22.

## Open Questions

Nenhuma questão bloqueante. As oito exclusões restantes e o momento de narrar a v1-A22 em `.ai/project.md`, no contrato compartilhado, na proveniência e no `README.md` continuam abertos em `DECISION-SET-20261016-001` e não mudam os critérios acima.

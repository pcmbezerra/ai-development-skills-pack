---
artifact: spec
id: SPEC-20261019-001
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261019-001
---

# Comando doctor — emenda v1-A23

## Problem

A CLI implementa `validate`, `install`, `package`, `list` e `--help`. `doctor` termina com saída 1 e `Unsupported command`. `validate` confere a fonte canônica e, com destino explícito, a instalação. Nenhum comando confere os pré-requisitos de runtime que o pacote já nomeia: Node.js `>=22` e o executável Git. Evidência: `DECISION-SET-20261019-001` versão 2, `bin/ai-dev-skills.mjs`, `package.json` e `contracts/skill-contract.md`.

## Goal

Fazer `ai-dev-skills doctor` informar se o processo Node.js que executa a CLI é `>=22` e se o executável Git está disponível, sem escrever arquivo, sem rede e sem repetir `validate`.

## Scope

- Acrescentar o comando `doctor` em `bin/ai-dev-skills.mjs`, sem argumentos e sem opções.
- Incluir a linha de uso na ajuda já existente. A ajuda documenta cada comando implementado. Evidência: a constante `HELP` e `SPEC-20261016-001`.
- Ajustar o teste que hoje exige saída 1 para `doctor`, mantendo essa exigência para `sync` e `bootstrap`.
- Verificar as duas condições e imprimir o resultado das duas, também quando uma falha.

## Non-goals

- Implementar `sync`, `bootstrap` na CLI, desinstalação, instalação global, detecção de plataforma, localização automática de instalações, roteador automático, `meta-skills/skill-authoring` ou testes semânticos de overlap.
- Repetir `validate` sem opção ou `validate --target --path`.
- Aceitar `--target`, `--path`, `--destination`, `--output` ou qualquer outra opção.
- Exigir repositório Git, executar o binário `git`, alterar manifesto, targets, instalador, contratos ou a versão `1.0.0-scaffold`.
- Reescrever ADR `0001`, ADR `0002` ou ADR `0003`.
- Gravar o ADR novo nesta especificação. Ele cabe em `architecture-design`.
- Alterar `.ai/project.md` ou `.ai/architecture.md`.
- Autorizar `implement`.

## Actors

- Mantenedor do pacote, que executa a CLI.
- Suíte Node, que observa código de saída e stdout sem depender do Git instalado na máquina.

## Functional Requirements

1. `ai-dev-skills doctor`, sem argumentos, executa as duas verificações e termina com saída 0 somente quando as duas passam. Evidência: `DECISION-SET-20261019-001` versão 2.
2. A versão observada é `process.versions.node` do processo que executa a CLI. A verificação passa quando o primeiro número dessa versão é maior ou igual a 22. `22.0.0` passa. `21.9.9` falha. Evidência: o conjunto, `bin/ai-dev-skills.mjs` e `package.json`.
3. Git passa quando um executável de nome `git` é resolvido no `PATH` desse processo. Git falha quando não é resolvido, quando o arquivo encontrado não é executável, ou quando a observação lança erro. A observação não executa `git`, não exige repositório e não usa a rede. Evidência: o conjunto, que pede disponibilidade do executável, somente leitura e ausência de rede. O mecanismo de API permanece em Open Questions.
4. As duas verificações sempre produzem resultado. A falha de uma não suprime a outra. Uma falha inesperada na observação de Git é `git fail`, não um terceiro resultado.
5. A stdout, nesse caminho, tem exatamente duas linhas, nesta ordem, sem prefixo e sem linha extra: `node pass <versão>` ou `node fail <versão>`, depois `git pass` ou `git fail`. `<versão>` é o texto de `process.versions.node`. A quebra de linha é a de `console.log`. O conjunto deixou o texto em aberto e esta especificação o fixa só para tornar o critério testável. Evidência: `DECISION-SET-20261019-001` e a autorização desta execução de `to-spec`.
6. Saída 1 quando Node falha, quando Git falha, ou quando os dois falham. A stderr fica vazia nesses três caminhos e no caminho de saída 0.
7. Argumento ou opção não entra nas verificações. O processo termina com saída 1 pelo tratamento já existente de opção inválida ou não suportada, com `ERROR:` na stderr. Evidência: `options` e `requireOnly` em `bin/ai-dev-skills.mjs`, no mesmo desenho de `list`.
8. `doctor` não chama `validate` nem `validateTarget`, não cria, não modifica e não apaga arquivo, e não abre conexão de rede.
9. `--help`, `help` e `-h` continuam com saída 0 e passam a incluir a linha `ai-dev-skills doctor`.
10. `sync` e `bootstrap` continuam com saída 1 e `Unsupported command`. `validate`, `install`, `package` e `list` conservam o comportamento atual.
11. Esta especificação não autoriza implementação.

## Business Rules

- O catálogo de runtime permanece em 18 skills. `primaryInvocation` continua sendo classificação, não exclusividade.
- A v1-A23 cobre somente `doctor`. A v1-A22 permanece encerrada. A v1-A21 permanece `OBSERVED`. Claude Code permanece `NOT_RUN`.
- A versão do pacote permanece `1.0.0-scaffold`.

## Non-functional Requirements

- Determinismo: a mesma versão observada e o mesmo `PATH` produzem a mesma stdout e o mesmo código de saída.
- A regra de versão é verificável com versões fornecidas ao critério, sem instalar outro Node.js. O comando em si lê a versão do próprio processo.
- A disponibilidade de Git é verificável com um `PATH` controlado pelo teste, sem desinstalar o Git da máquina e sem usar a rede.
- Nenhuma dependência npm nova. Node.js exigido pelo pacote permanece `>=22`.

## Technical Constraints

Decisão durável, alternativas e consequências, para o consumidor `architecture-design`:

- Decisão: a v1-A23 adiciona o comando `doctor` à CLI. Essa é a exceção pontual à restrição de ADR `0002` que proíbe acrescentar comando de CLI. A exceção não cobre outro comando, chave de target, dependência npm nem campo de frontmatter. ADR `0003` continua restrito a `list`.
- Alternativas: manter `doctor` rejeitado; repetir `validate`; localizar instalações ou detectar plataforma. As três foram rejeitadas em `DECISION-SET-20261019-001` versão 2.
- Consequências: a ajuda e o despacho da CLI mudam. ADR `0001`, ADR `0002` e ADR `0003` não são reescritos por esta especificação. Um ADR novo só cabe na execução posterior de `architecture-design`, porque esta especificação já registra a decisão.

R8 não se aplica: o comando não introduz termo de negócio, invariante, transição, evento nem fronteira de contexto. R9 se aplica: `doctor` é interface pública da CLI.

## Security / Privacy

`doctor` lê a versão do processo e resolve o nome `git` no `PATH`. Não grava arquivo, não usa a rede e não executa `git`. Não imprime `PATH`, diretório pessoal, variável de ambiente nem o objeto do erro. Falha inesperada na observação de Git aparece só como `git fail`.

## Acceptance Criteria

1. Com versão observada cujo primeiro número é `>=22` e com `git` executável no `PATH`, `node bin/ai-dev-skills.mjs doctor` termina com saída 0 e a stdout é `node pass <versão>` seguida de `git pass`.
2. A regra de versão rejeita `21.9.9` e aceita `22.0.0` e `23.1.0`. No comando, `<versão>` é `process.versions.node` do processo executado. A rejeição de `21.9.9` não exige outro binário Node.js na máquina.
3. Com `PATH` sem executável `git`, a segunda linha é `git fail`. Se a primeira linha é `node pass`, a saída é 1.
4. Com versão rejeitada e `PATH` sem `git`, a stdout é `node fail <versão>` seguida de `git fail`, e a saída é 1.
5. Com versão rejeitada e `git` disponível, a stdout é `node fail <versão>` seguida de `git pass`, e a saída é 1.
6. Erro lançado pela observação de Git produz `git fail`, conserva a linha de Node e termina com saída 1.
7. `node bin/ai-dev-skills.mjs doctor --target cursor` termina com saída 1, escreve `ERROR:` na stderr e não escreve as duas linhas de resultado.
8. Nos caminhos dos critérios 1 a 6, a stderr fica vazia e o comando não cria nem altera arquivo.
9. O comando não chama `validate` nem `validateTarget`.
10. `node bin/ai-dev-skills.mjs --help` termina com saída 0 e a stdout contém `ai-dev-skills doctor`.
11. `sync` e `bootstrap` terminam com saída 1. `list` continua imprimindo os 18 nomes. `validate`, `install` e `package` conservam o comportamento atual.
12. Nenhuma dependência npm é adicionada. O catálogo permanece em 18 skills. ADR `0001`, ADR `0002` e ADR `0003` permanecem intactos.

## Risks

- Tratar `doctor` como segundo nome de `validate` viola a decisão 1. O teste que hoje rejeita `doctor`, `sync` e `bootstrap` juntos precisa separar só `doctor`.
- Executar `git` para decidir disponibilidade pode usar rede ou exigir repositório. Esta especificação proíbe essa execução.
- O texto das duas linhas foi fixado aqui porque o conjunto o deixou em aberto sem bloquear a especificação. Outro texto exigiria revisão desta spec.
- `.ai/project.md` ainda descreve `doctor` como exclusão vigente. Esta especificação não o atualiza.

## Open Questions

Nenhuma questão bloqueante.

- Qual API local resolve o executável `git` no `PATH`. A resolução não pode gravar arquivo, usar a rede, executar `git` nem exigir repositório. Essa escolha não muda os critérios acima.
- Quando `.ai/project.md` narrará `doctor`, e quando `.ai/architecture.md` citará `list` na descrição da CLI.
- Claude Code permanece `NOT_RUN`. Isso não muda `doctor`.

---
artifact: spec
id: SPEC-20261022-001
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261022-001
---

# Igualdade exata de description — emenda v1-A24

## Problem

`validate()` em `scripts/validate-skills.mjs` lê `manifest/skills.json` com `JSON.parse` e percorre `manifest.skills`. Para cada skill exige `description` não vazia, com no máximo 240 caracteres e com `Use when`, e confere o frontmatter de `SKILL.md` com a `description` daquela mesma entrada. Não compara a `description` de uma entrada com a de outra. O catálogo atual tem 18 skills e 18 strings distintas nesse campo. Evidência: `DECISION-SET-20261022-001` versão 2, `scripts/validate-skills.mjs` e a leitura do manifesto nesta execução.

## Goal

Fazer o validador rejeitar duas entradas de `manifest.skills` cuja `description` seja a mesma string, comparando exatamente o texto já obtido de cada entrada, sem normalização e sem análise semântica.

## Scope

- Acrescentar essa comparação em `validate()` de `scripts/validate-skills.mjs`, sobre as entradas já parseadas de `manifest.skills`.
- Cobrir a falha e a ausência de falha em `tests/validate-skills.test.mjs`, no mesmo desenho dos testes que já alteram o manifesto e o frontmatter.
- Manter o relatório já existente: `validate()` devolve `{ ok, errors }` e `report()` escreve `FAIL:` com uma linha `- ` por erro.

## Non-goals

- Medir overlap semântico, semelhança, tokens ou embeddings.
- Normalizar a `description` antes da comparação: sem `trim`, sem mudança de caixa, sem colapso de espaço, sem `normalizeNewlines` e sem normalização Unicode.
- Alterar o texto das descrições do catálogo atual.
- Comparar o corpo de `SKILL.md`, o `goal` ou a projeção da skill. O frontmatter continua sujeito só à conferência já existente com a própria entrada.
- Estender `validateTarget`. Essa função compara diretórios instalados com a fonte e não lê a igualdade de `description`.
- Implementar `sync`, `bootstrap` na CLI, desinstalação, instalação global, detecção de plataforma, roteador automático ou `meta-skills/skill-authoring`.
- Ampliar `doctor`. Acrescentar comando, skill, chave de target, dependência npm ou campo de frontmatter.
- Reescrever ADR `0001`, ADR `0002`, ADR `0003` ou ADR `0004`. Nenhum ADR novo cabe nesta emenda.
- Alterar `.ai/project.md` ou `.ai/architecture.md`.
- Autorizar `implement`.

## Actors

- Mantenedor do pacote, que executa `node scripts/validate-skills.mjs` ou `ai-dev-skills validate`.
- Suíte Node, que chama `validate()` sobre uma fixture e observa `ok` e `errors`.

## Functional Requirements

1. Para cada par de índices `i < j` em `manifest.skills`, a comparação usa `skills[i].description` e `skills[j].description` como saem de `JSON.parse`. As duas strings são iguais somente quando são a mesma sequência de caracteres. Evidência: `DECISION-SET-20261022-001` versão 2 e a autorização desta execução de `to-spec`, que exige o texto armazenado, sem normalização e sem análise semântica.
2. `JSON.parse` permanece a leitura que o validador já faz do arquivo. Nenhuma transformação posterior incide sobre as duas strings. `trim`, mudança de caixa, colapso de espaço, `normalizeNewlines` e normalização Unicode não participam desta comparação. Evidência: o mesmo conjunto, a mesma autorização e a função `normalizeNewlines` já presente em `scripts/validate-skills.mjs` para outro uso.
3. Quando as duas strings são iguais, `validate()` inclui um erro por par, nesta forma: `<nome i>: identical manifest description <nome j>`. `<nome i>` é o `name` da entrada anterior no array e `<nome j>` o da posterior. O conjunto deixou o texto do erro em aberto e esta especificação o fixa só para tornar o critério testável. Evidência: `DECISION-SET-20261022-001` versão 2, o formato `${nome}: ...` já usado por `validate()` e a autorização desta execução.
4. Quando as duas strings diferem, esse par não gera esse erro. Diferença só de caixa, de espaço no fim ou de forma Unicode continua sendo diferença. Evidência: o requisito 1.
5. Uma entrada não é comparada com ela mesma. As demais conferências de `description` permanecem: presença depois de `trim` só nessa conferência já existente, teto de 240 caracteres, `Use when` e igualdade do frontmatter com a própria entrada. Evidência: `scripts/validate-skills.mjs`.
6. `ok` é falso quando existe ao menos um par igual. `report()` e o código de saída de `node scripts/validate-skills.mjs` conservam o comportamento atual: saída 1 e `FAIL:` na stderr quando `ok` é falso. `ai-dev-skills validate` sem opção continua chamando `validate()`. Evidência: `report()` e `bin/ai-dev-skills.mjs`.
7. O catálogo atual, com 18 `description` distintas, continua com `ok` verdadeiro quanto a este critério. Evidência: a leitura do manifesto nesta execução.
8. `validate`, `install`, `package`, `list` e `doctor` conservam o comportamento atual fora deste critério. `sync` e `bootstrap` continuam com saída 1.
9. Esta especificação não autoriza implementação.

## Business Rules

- O catálogo de runtime permanece em 18 skills. `primaryInvocation` continua sendo classificação, não exclusividade.
- A v1-A24 cobre somente a igualdade exata de `description` no manifesto. A v1-A23 e a v1-A22 permanecem encerradas. A v1-A21 permanece `OBSERVED`. Claude Code permanece `NOT_RUN`.
- A versão do pacote permanece `1.0.0-scaffold`.
- Testes semânticos de overlap continuam fora. Esta comparação não é esse teste.

## Non-functional Requirements

- Determinismo: o mesmo manifesto parseado produz o mesmo `ok` e os mesmos erros deste critério, na ordem crescente dos pares `i < j`.
- A falha é verificável numa fixture, sem rede e sem alterar o catálogo permanente.
- A passagem do catálogo atual é verificável com o manifesto já versionado.
- Nenhuma dependência npm nova. Node.js exigido pelo pacote permanece `>=22`.

## Technical Constraints

- A comparação vive em `validate()`. `validateTarget` não a recebe.
- Os operandos são as strings já parseadas. A especificação não introduz outro leitor do arquivo.
- ADR `0001`, ADR `0002`, ADR `0003` e ADR `0004` permanecem intactos. A emenda não acrescenta comando e não cria exceção ao ADR `0002`.

R8 não se aplica: a comparação não introduz termo de negócio, transição, evento nem fronteira de contexto. R9 não se aplica: não há comando novo, módulo novo, modelo de dados novo, contrato de integração novo nem fronteira de segurança nova. O resultado de `validate()` continua `{ ok, errors }`.

## Security / Privacy

A comparação lê as `description` que `validate()` já lê do manifesto. Não grava arquivo, não usa a rede e não imprime o texto da `description`. O erro nomeia só os dois `name`.

## Acceptance Criteria

1. No manifesto versionado, `validate()` retorna `ok` verdadeiro. As 18 `description` são distintas e nenhum erro `identical manifest description` aparece.
2. Numa fixture, duas entradas com a mesma `description` parseada, e com o frontmatter de cada uma igual à própria entrada, fazem `validate()` retornar `ok` falso. O erro desse par é exatamente `<nome anterior>: identical manifest description <nome posterior>`, na ordem do array. As conferências já existentes de teto, `Use when` e frontmatter não disparam para esse par quando a string copiada as satisfaz.
3. Três entradas com a mesma `description` produzem um erro para cada par `i < j`, cada um no formato do critério 2. Três nomes iguais geram três erros deste critério.
4. Duas strings que diferem só pela caixa, como `Use when alpha.` e `Use when Alpha.`, não geram erro deste critério. O frontmatter de cada skill acompanha a própria entrada.
5. Duas strings que diferem só por um espaço final, como `Use when alpha.` e `Use when alpha. `, não geram erro deste critério. O espaço permanece na string comparada.
6. Duas strings que diferem só pela forma Unicode, uma em NFC e a outra em NFD, não geram erro deste critério.
7. A string vazia ou só com espaço continua sujeita à conferência de presença já existente. Esta comparação não aplica `trim` para decidir igualdade. Duas entradas cujo texto armazenado é ` ` continuam iguais entre si; ` ` e `  ` continuam diferentes.
8. `node scripts/validate-skills.mjs`, no catálogo versionado, termina com saída 0. Na fixture do critério 2, termina com saída 1 e a stderr contém a linha `- <nome anterior>: identical manifest description <nome posterior>`.
9. `validateTarget`, `install`, `package`, `list` e `doctor` conservam o comportamento atual. `sync` e `bootstrap` terminam com saída 1.
10. Nenhuma dependência npm é adicionada. O catálogo permanece em 18 skills. ADR `0001`, ADR `0002`, ADR `0003` e ADR `0004` permanecem intactos.

## Risks

- Reusar `normalizeNewlines` ou `trim` nesta comparação aceitaria strings que a decisão trata como diferentes.
- Alterar só o manifesto, sem alinhar o frontmatter da skill editada, também dispara o erro já existente de frontmatter. O critério 2 separa as duas falhas.
- Outro texto de erro exigiria revisão desta spec. O conjunto o havia deixado em aberto.
- `.ai/project.md` ainda não narra a v1-A24. Esta especificação não o atualiza.

## Open Questions

Nenhuma questão bloqueante.

- Qual oráculo determinístico mediria overlap semântico. A seção 22 de `references/architecture-contract-v1.md` continua sem esse oráculo, e os testes semânticos continuam fora.
- Se `sync` gravaria conteúdo, qual o escopo de uma desinstalação, quais caminhos globais cada host documenta e como distinguir Codex de Antigravity pelo diretório.
- Quando `.ai/project.md` narrará a v1-A24. Esta especificação não o altera.
- Claude Code permanece `NOT_RUN`. Isso não muda a comparação.

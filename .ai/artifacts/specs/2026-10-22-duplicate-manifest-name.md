---
artifact: spec
id: SPEC-20261022-002
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261022-002
---

# Diagnóstico de name duplicado — emenda v1-A25

## Problem

`validate()` em `scripts/validate-skills.mjs` lê `manifest/skills.json` com `JSON.parse`. Exige, numa única condição, `skills.length === 18`, `new Set(names).size === 18` e a presença dos nomes esperados. A falha dessa condição é só `Invalid canonical catalogue`. Dois `name` iguais já fazem essa condição falhar, porque o conjunto fica menor que o comprimento, mas o erro não identifica o par. A comparação de `description` da v1-A24 é outra condição. O manifesto versionado tem 18 entradas, 18 `name` distintos e `skillCount` 18. Evidência: `DECISION-SET-20261022-002` versão 2, `scripts/validate-skills.mjs` e a leitura de `manifest/skills.json` nesta execução.

## Goal

Fazer `validate()` emitir um erro adicional para cada par `i < j` de `manifest.skills` cujo `name` seja a mesma string, comparando exatamente o texto já obtido de cada entrada, e manter o erro `Invalid canonical catalogue`.

## Scope

- Acrescentar essa comparação em `validate()` de `scripts/validate-skills.mjs`, sobre as entradas já parseadas de `manifest.skills`.
- Cobrir a falha, a ausência de falha e a permanência de `Invalid canonical catalogue` em `tests/validate-skills.test.mjs`, no mesmo desenho dos testes que já alteram o manifesto.
- Manter o relatório já existente: `validate()` devolve `{ ok, errors }` e `report()` escreve `FAIL:` com uma linha `- ` por erro.

## Non-goals

- Remover, reescrever ou fundir o erro `Invalid canonical catalogue`.
- Normalizar o `name` antes da comparação: sem `trim`, sem mudança de caixa e sem normalização Unicode.
- Alterar a comparação de `description` da v1-A24, inclusive o texto `identical manifest description`.
- Alterar o texto dos `name` do catálogo atual.
- Comparar `goal`, `description`, caminho, categoria ou frontmatter para decidir este par. Essas conferências permanecem as que já existem.
- Estender `validateTarget`. Essa função compara diretórios instalados com a fonte e não emite erro de `name` duplicado.
- Alterar `install`, `package`, `list` ou `doctor`.
- Implementar `sync`, `bootstrap` na CLI, desinstalação, instalação global, detecção de plataforma, roteador automático ou `meta-skills/skill-authoring`.
- Ampliar `doctor`. Acrescentar comando, skill, chave de target, dependência npm ou campo de frontmatter.
- Reescrever ADR `0001`, ADR `0002`, ADR `0003` ou ADR `0004`. Nenhum ADR novo cabe nesta emenda.
- Alterar `.ai/project.md` ou `.ai/architecture.md`.
- Adicionar, restaurar ou normalizar os treze caminhos cujo working tree difere só no fim de linha.
- Medir overlap semântico.
- Autorizar `implement`.

## Actors

- Mantenedor do pacote, que executa `node scripts/validate-skills.mjs` ou `ai-dev-skills validate`.
- Suíte Node, que chama `validate()` sobre uma fixture e observa `ok` e `errors`.

## Functional Requirements

1. Para cada par de índices `i < j` em `manifest.skills`, a comparação usa `skills[i].name` e `skills[j].name` como saem de `JSON.parse`. As duas strings são iguais somente quando são a mesma sequência de caracteres. Evidência: `DECISION-SET-20261022-002` versão 2 e a autorização desta execução de `to-spec`, que pede a comparação exata.
2. `JSON.parse` permanece a leitura que o validador já faz do arquivo. Nenhuma transformação posterior incide sobre as duas strings. `trim`, mudança de caixa e normalização Unicode não participam desta comparação. Evidência: o mesmo conjunto e a mesma autorização.
3. Quando as duas strings são iguais, `validate()` inclui um erro adicional por par, nesta forma: `<nome i>: duplicate manifest name <nome j>`. `<nome i>` é o `name` da entrada anterior no array e `<nome j>` o da posterior. O conjunto deixou o texto do erro em aberto e esta especificação o fixa só para tornar o critério testável, no formato `${nome}: ...` que `validate()` já usa para `description`. Evidência: `DECISION-SET-20261022-002` versão 2, a linha da `description` em `scripts/validate-skills.mjs` e a autorização desta execução, que pede a mensagem.
4. Quando as duas strings diferem, esse par não gera esse erro. Diferença só de caixa, de espaço ou de forma Unicode continua sendo diferença para este critério. Evidência: o requisito 1.
5. Uma entrada não é comparada com ela mesma. A condição composta que produz exatamente `Invalid canonical catalogue` permanece no lugar e com esse texto. A regex já existente `^[a-z0-9]+(?:-[a-z0-9]+)*$`, o teto de 64 caracteres, a categoria, o caminho, a invocação e o frontmatter permanecem conferências separadas. Evidência: `DECISION-SET-20261022-002` versão 2 e `scripts/validate-skills.mjs`.
6. Os erros deste critério saem na ordem crescente dos pares `i < j`. Entre si, essa é a ordem. Outros erros já existentes podem aparecer no mesmo `errors` e esta emenda não os remove. Evidência: o requisito 3 e a condição composta já existente.
7. `ok` é falso quando existe ao menos um par de `name` igual, porque a condição composta também falha: um duplicado torna o tamanho do conjunto menor que o comprimento, e o comprimento 18 com os nomes esperados deixa de valer junto. `report()` e o código de saída de `node scripts/validate-skills.mjs` conservam o comportamento atual: saída 1 e `FAIL:` na stderr quando `ok` é falso. `ai-dev-skills validate` sem opção continua chamando `validate()`. Evidência: `report()`, `bin/ai-dev-skills.mjs` e a condição em `scripts/validate-skills.mjs`.
8. O catálogo atual, com 18 `name` distintos, continua com `ok` verdadeiro quanto a este critério e quanto à condição composta. Nenhum erro `duplicate manifest name` aparece. Evidência: a leitura do manifesto nesta execução.
9. `validateTarget`, `install`, `package`, `list` e `doctor` conservam o comportamento atual. `sync` e `bootstrap` continuam com saída 1. A comparação de `description` conserva o erro `<nome i>: identical manifest description <nome j>`. Evidência: `DECISION-SET-20261022-002` versão 2, `scripts/distribute-skills.mjs` e `bin/ai-dev-skills.mjs`.
10. Esta especificação não autoriza implementação.

## Business Rules

- O catálogo de runtime permanece em 18 skills. `primaryInvocation` continua sendo classificação, não exclusividade.
- A v1-A25 cobre somente o diagnóstico exato de `name` duplicado no manifesto, além da condição composta que já existe. A v1-A24, a v1-A23 e a v1-A22 permanecem encerradas. A v1-A21 permanece `OBSERVED`. Claude Code permanece `NOT_RUN`.
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
- A condição de `Invalid canonical catalogue` não é substituída por este erro.
- ADR `0001`, ADR `0002`, ADR `0003` e ADR `0004` permanecem intactos. A emenda não acrescenta comando e não cria exceção ao ADR `0002`.

R8 não se aplica: a comparação não introduz termo de negócio, transição, evento nem fronteira de contexto. R9 não se aplica: não há comando novo, módulo novo, modelo de dados novo, contrato de integração novo nem fronteira de segurança nova. O resultado de `validate()` continua `{ ok, errors }`.

## Security / Privacy

A comparação lê os `name` que `validate()` já lê do manifesto. Não grava arquivo e não usa a rede. O erro deste critério imprime os dois `name` e nenhum outro campo do manifesto.

## Acceptance Criteria

1. No manifesto versionado, `validate()` retorna `ok` verdadeiro. Os 18 `name` são distintos. Nenhum erro `duplicate manifest name` aparece e `Invalid canonical catalogue` não aparece.
2. Numa fixture, a entrada posterior recebe exatamente o `name` da anterior. `validate()` retorna `ok` falso. `errors` contém `<nome anterior>: duplicate manifest name <nome posterior>` e contém `Invalid canonical catalogue`. Os outros erros já provocados pela troca de `name`, como caminho, categoria ou frontmatter, podem continuar presentes.
3. Três entradas com o mesmo `name` produzem um erro deste critério para cada par `i < j`, na ordem crescente desses pares. Três nomes iguais geram três erros deste critério, e `errors` contém `Invalid canonical catalogue`.
4. Dois `name` que diferem só pela caixa não geram erro deste critério. O valor que falha `^[a-z0-9]+(?:-[a-z0-9]+)*$` continua sujeito ao erro já existente `Invalid name`.
5. Dois `name` que diferem só por um espaço final não geram erro deste critério. O valor com espaço continua sujeito a `Invalid name`.
6. Dois `name` que diferem só pela forma Unicode, uma em NFC e a outra em NFD, não geram erro deste critério.
7. Dois `name` cujo texto armazenado é idêntico e contém espaço, como `workflow ` e `workflow `, geram o erro deste critério para esse par. A comparação não aplica `trim`. Cada um continua sujeito a `Invalid name`, e `errors` contém `Invalid canonical catalogue`.
8. Duas entradas com `name` distintos e a mesma `description` continuam gerando só o erro já existente de `description` para esse par. Não geram `duplicate manifest name`.
9. `node scripts/validate-skills.mjs`, no catálogo versionado, termina com saída 0. Na fixture do critério 2, termina com saída 1 e a stderr contém a linha `- <nome anterior>: duplicate manifest name <nome posterior>` e a linha `- Invalid canonical catalogue`.
10. `validateTarget`, `install`, `package`, `list` e `doctor` conservam o comportamento atual. `sync` e `bootstrap` terminam com saída 1.
11. Nenhuma dependência npm é adicionada. O catálogo permanente permanece em 18 skills. ADR `0001`, ADR `0002`, ADR `0003` e ADR `0004` permanecem intactos. Os treze caminhos de fim de linha não entram na mudança.

## Risks

- Tratar este erro como substituto de `Invalid canonical catalogue` apagaria o erro que a decisão manda preservar.
- Reusar `trim`, mudança de caixa ou normalização Unicode nesta comparação aceitaria strings que a decisão trata como diferentes.
- Uma fixture que troca `name` também dispara caminho, categoria e frontmatter. Um teste que exija `errors` só com o erro novo falha por causa dessas conferências já existentes.
- Outro texto de erro exigiria revisão desta spec. O conjunto o havia deixado em aberto.
- `.ai/project.md` ainda não narra a v1-A25. Esta especificação não o atualiza.

## Open Questions

Nenhuma questão bloqueante.

- Qual licença substituiria o placeholder. `README.md` registra que nenhuma foi escolhida.
- Qual oráculo determinístico mediria overlap semântico. A seção 22 de `references/architecture-contract-v1.md` continua sem esse oráculo, e os testes semânticos continuam fora.
- Quando `.ai/project.md` narrará a v1-A25. Esta especificação não o altera.
- Claude Code permanece `NOT_RUN`. Isso não muda a comparação.

---
artifact: spec
id: SPEC-20261022-003
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261022-003
---

# Diagnóstico de name duplicado em targets — emenda v1-A26

## Problem

`validate()` em `scripts/validate-skills.mjs` lê `manifest/skills.json` com `JSON.parse`. Para `manifest.targets` exige, numa condição, `targets.length === 4` e a presença de `cursor`, `codex`, `antigravity` e `claude-code`. A falha dessa condição é só `Invalid targets`. Outra condição exige `new Set(names).size === 4` e emite só `Duplicate targets`. Essa segunda condição não nomeia o par. Ela também não compara pares: um alvo ausente, sem nome repetido, deixa o conjunto com tamanho diferente de 4 e recebe `Duplicate targets`; cinco entradas com um nome repetido e os quatro nomes esperados mantêm o conjunto em 4 e não recebem `Duplicate targets`. O teste `duplicate target` só casa `/Duplicate targets/`. O manifesto versionado tem quatro entradas, nesta ordem: `claude-code`, `cursor`, `codex`, `antigravity`. Evidência: `DECISION-SET-20261022-003` versão 2, `scripts/validate-skills.mjs` e a leitura de `manifest/skills.json` nesta execução.

## Goal

Fazer `validate()` emitir um erro adicional para cada par `i < j` de `manifest.targets` cujo `name` seja a mesma string, comparando exatamente o texto já obtido de cada entrada, e manter os erros `Invalid targets` e `Duplicate targets`.

## Scope

- Acrescentar essa comparação em `validate()` de `scripts/validate-skills.mjs`, sobre as entradas já parseadas de `manifest.targets`.
- Cobrir a falha, a ausência de falha, a ordem observável e a permanência de `Invalid targets` e de `Duplicate targets` em `tests/validate-skills.test.mjs`, no mesmo desenho dos testes que já alteram o manifesto.
- Manter o relatório já existente: `validate()` devolve `{ ok, errors }` e `report()` escreve `FAIL:` com uma linha `- ` por erro.

## Non-goals

- Remover, reescrever, fundir ou mudar o disparo de `Invalid targets` ou de `Duplicate targets`.
- Normalizar o `name` antes da comparação: sem `trim`, sem mudança de caixa e sem normalização Unicode.
- Alterar a comparação de `name` de skill da v1-A25, inclusive o texto `duplicate manifest name`.
- Alterar a comparação de `description` da v1-A24, inclusive o texto `identical manifest description`.
- Alterar o texto dos `name` do catálogo atual, de skills ou de targets.
- Comparar `goal`, `description`, caminho, categoria, frontmatter ou o conteúdo do descritor para decidir este par. Essas conferências permanecem as que já existem.
- Estender `validateTarget`. Essa função compara diretórios instalados com a fonte e não emite erro de `name` de target duplicado.
- Alterar `install`, `package`, `list` ou `doctor`.
- Implementar `sync`, `bootstrap` na CLI, desinstalação, instalação global, detecção de plataforma, roteador automático ou `meta-skills/skill-authoring`.
- Ampliar `doctor`. Acrescentar comando, skill, chave de target, dependência npm ou campo de frontmatter.
- Reescrever ADR `0001`, ADR `0002`, ADR `0003` ou ADR `0004`. Nenhum ADR novo cabe nesta emenda.
- Alterar `.ai/project.md` ou `.ai/architecture.md`.
- Adicionar, restaurar ou normalizar os treze caminhos cujo working tree difere só no fim de linha.
- Medir overlap semântico.
- Fazer o teste de três pares de `name` de skill distinguir uma emissão invertida.
- Autorizar `implement`.

## Actors

- Mantenedor do pacote, que executa `node scripts/validate-skills.mjs` ou `ai-dev-skills validate`.
- Suíte Node, que chama `validate()` sobre uma fixture e observa `ok` e `errors`.

## Functional Requirements

1. Para cada par de índices `i < j` em `manifest.targets`, a comparação usa `targets[i].name` e `targets[j].name` como saem de `JSON.parse`. As duas strings são iguais somente quando são a mesma sequência de caracteres. Evidência: `DECISION-SET-20261022-003` versão 2 e a autorização desta execução de `to-spec`, que pede a comparação exata e a preservação dos erros existentes.
2. `JSON.parse` permanece a leitura que o validador já faz do arquivo. Nenhuma transformação posterior incide sobre as duas strings. `trim`, mudança de caixa e normalização Unicode não participam desta comparação. Evidência: o mesmo conjunto e a mesma autorização.
3. Quando as duas strings são iguais, `validate()` inclui um erro adicional por par, nesta forma: `<nome i>: duplicate target name <nome j>`. `<nome i>` é o `name` da entrada anterior no array e `<nome j>` o da posterior. O conjunto deixou o texto do erro em aberto e esta especificação o fixa só para tornar o critério testável, no formato `${nome}: ...` que `validate()` já usa. O texto é distinto de `Duplicate targets` e de `duplicate manifest name`. Evidência: `DECISION-SET-20261022-003` versão 2, as linhas de `description` e de `name` de skill em `scripts/validate-skills.mjs` e a autorização desta execução, que pede a mensagem.
4. Quando as duas strings diferem, esse par não gera esse erro. Diferença só de caixa, de espaço ou de forma Unicode continua sendo diferença para este critério. Evidência: o requisito 1.
5. Uma entrada não é comparada com ela mesma. A condição que produz exatamente `Invalid targets` permanece no lugar, com esse texto e com o mesmo disparo. A condição que produz exatamente `Duplicate targets` permanece no lugar, com esse texto e com o mesmo disparo. O caminho `targets/${name}.mjs`, a leitura do descritor e a compatibilidade do descritor permanecem conferências separadas. Evidência: `DECISION-SET-20261022-003` versão 2 e `scripts/validate-skills.mjs`.
6. Os erros deste critério saem na ordem crescente dos pares `i < j`: `i` cresce e `j` começa em `i + 1`. Entre si, essa é a ordem. Outros erros já existentes podem aparecer no mesmo `errors` e esta emenda não os remove nem os reordena. Evidência: o requisito 3 e as duas condições já existentes.
7. `ok` é falso quando existe ao menos um par de `name` de target igual, porque a condição de `Invalid targets` também falha: ou o comprimento deixa de ser 4, ou um nome esperado deixa de estar presente. `report()` e o código de saída de `node scripts/validate-skills.mjs` conservam o comportamento atual: saída 1 e `FAIL:` na stderr quando `ok` é falso. `ai-dev-skills validate` sem opção continua chamando `validate()`. Evidência: `report()`, `bin/ai-dev-skills.mjs` e as condições em `scripts/validate-skills.mjs`.
8. O catálogo atual, com quatro `name` de target distintos, continua com `ok` verdadeiro quanto a este critério e quanto às duas condições de target. Nenhum erro `duplicate target name` aparece. Evidência: a leitura do manifesto nesta execução.
9. `validateTarget`, `install`, `package`, `list` e `doctor` conservam o comportamento atual. `sync` e `bootstrap` continuam com saída 1. A comparação de `name` de skill conserva o erro `<nome i>: duplicate manifest name <nome j>`. A comparação de `description` conserva o erro `<nome i>: identical manifest description <nome j>`. Evidência: `DECISION-SET-20261022-003` versão 2, `scripts/distribute-skills.mjs` e `bin/ai-dev-skills.mjs`.
10. Esta especificação não autoriza implementação.

## Business Rules

- O catálogo de runtime permanece em 18 skills. Os quatro targets permanecem `cursor`, `codex`, `antigravity` e `claude-code`. `primaryInvocation` continua sendo classificação, não exclusividade.
- A v1-A26 cobre somente o diagnóstico exato de `name` duplicado em `manifest.targets`, além das duas condições de target que já existem. A v1-A25, a v1-A24, a v1-A23 e a v1-A22 permanecem encerradas. A v1-A21 permanece `OBSERVED`. Claude Code permanece `NOT_RUN`.
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
- As condições de `Invalid targets` e de `Duplicate targets` não são substituídas por este erro.
- ADR `0001`, ADR `0002`, ADR `0003` e ADR `0004` permanecem intactos. A emenda não acrescenta comando e não cria exceção ao ADR `0002`.

R8 não se aplica: a comparação não introduz termo de negócio, transição, evento nem fronteira de contexto. R9 não se aplica: não há comando novo, módulo novo, modelo de dados novo, contrato de integração novo nem fronteira de segurança nova. O resultado de `validate()` continua `{ ok, errors }`.

## Security / Privacy

A comparação lê os `name` de target que `validate()` já lê do manifesto. Não grava arquivo e não usa a rede. O erro deste critério imprime os dois `name` e nenhum outro campo do manifesto.

## Acceptance Criteria

1. No manifesto versionado, `validate()` retorna `ok` verdadeiro. Os quatro `name` de target são distintos, na ordem `claude-code`, `cursor`, `codex`, `antigravity`. Nenhum erro `duplicate target name` aparece. `Invalid targets` não aparece e `Duplicate targets` não aparece.
2. Numa fixture, `targets[2]` recebe o objeto `targets[1]`. O array fica `claude-code`, `cursor`, `cursor`, `antigravity`. `validate()` retorna `ok` falso. `errors` contém `cursor: duplicate target name cursor`, contém `Invalid targets` e contém `Duplicate targets`. Não contém `duplicate manifest name`.
3. Numa fixture, `targets[2]` recebe o objeto `targets[0]` e `targets[3]` recebe o objeto `targets[1]`. O array fica `claude-code`, `cursor`, `claude-code`, `cursor`. `errors` contém, nesta ordem entre si, `claude-code: duplicate target name claude-code` e depois `cursor: duplicate target name cursor`. Contém `Invalid targets` e `Duplicate targets`.
4. Numa fixture, os índices 0 e 2 recebem o objeto do índice 1. O array fica `cursor`, `cursor`, `cursor`, `antigravity`. Há três erros `cursor: duplicate target name cursor`, um por par `i < j`. `errors` contém `Invalid targets` e `Duplicate targets`. As três strings são iguais, então essa lista, sozinha, não distingue uma emissão invertida. A ordem exigida é a do critério 3.
5. Numa fixture, o array recebe no fim uma cópia do objeto `targets[0]`. Fica `claude-code`, `cursor`, `codex`, `antigravity`, `claude-code`. `errors` contém `claude-code: duplicate target name claude-code` e contém `Invalid targets`. Não contém `Duplicate targets`.
6. Numa fixture, a entrada `claude-code` é removida e nenhum `name` se repete. `errors` contém `Invalid targets` e contém `Duplicate targets`. Não contém `duplicate target name`.
7. Dois `name` de target que diferem só pela caixa não geram erro deste critério. Os erros já existentes de caminho ou de descritor podem continuar presentes.
8. Dois `name` de target que diferem só por um espaço final não geram erro deste critério.
9. Dois `name` de target que diferem só pela forma Unicode, uma em NFC e a outra em NFD, não geram erro deste critério.
10. Dois `name` cujo texto armazenado é idêntico e contém espaço, como `cursor ` e `cursor `, geram `cursor : duplicate target name cursor ` para esse par. A comparação não aplica `trim`. Os erros já existentes de caminho, de descritor, `Invalid targets` e `Duplicate targets` podem continuar presentes.
11. Duas skills com o mesmo `name` continuam gerando só o erro já existente `duplicate manifest name` para esse par, mais `Invalid canonical catalogue`. Não geram `duplicate target name`.
12. Duas skills com `name` distintos e a mesma `description` continuam gerando só o erro já existente de `description` para esse par. Não geram `duplicate target name`.
13. `node scripts/validate-skills.mjs`, no catálogo versionado, termina com saída 0. Na fixture do critério 2, termina com saída 1 e a stderr contém a linha `- cursor: duplicate target name cursor`, a linha `- Invalid targets` e a linha `- Duplicate targets`.
14. `validateTarget`, `install`, `package`, `list` e `doctor` conservam o comportamento atual. `sync` e `bootstrap` terminam com saída 1. `validate --target` não emite `duplicate target name`.
15. Nenhuma dependência npm é adicionada. O catálogo permanente permanece em 18 skills e em quatro targets. ADR `0001`, ADR `0002`, ADR `0003` e ADR `0004` permanecem intactos. Os treze caminhos de fim de linha não entram na mudança.

## Risks

- Tratar este erro como substituto de `Invalid targets` ou de `Duplicate targets` apagaria os erros que a decisão manda preservar.
- Mudar o disparo de `Duplicate targets` faria um alvo ausente deixar de receber esse erro. A decisão deixa esse disparo como está.
- Reusar `trim`, mudança de caixa ou normalização Unicode nesta comparação aceitaria strings que a decisão trata como diferentes.
- Uma fixture que troca o objeto de target também pode disparar caminho e descritor quando o `name` deixa de bater com o arquivo. Um teste que exija `errors` só com o erro novo falha por causa dessas conferências já existentes.
- Três `name` iguais produzem três strings iguais. Essa lista não prova a ordem. O critério 3 usa dois pares com textos diferentes para a ordem ser observável.
- Outro texto de erro exigiria revisão desta spec. O conjunto o havia deixado em aberto.
- `.ai/project.md` ainda não narra a v1-A26. Esta especificação não o atualiza.

## Open Questions

Nenhuma questão bloqueante.

- Qual licença substituiria o placeholder. `README.md` registra que nenhuma foi escolhida.
- Qual oráculo determinístico mediria overlap semântico. A seção 22 de `references/architecture-contract-v1.md` continua sem esse oráculo, e os testes semânticos continuam fora.
- Se uma emenda posterior deve fazer `Duplicate targets` disparar só quando um `name` se repete. Esta especificação não muda esse disparo.
- Quando `.ai/project.md` narrará a v1-A26. Esta especificação não o altera.
- Claude Code permanece `NOT_RUN`. Isso não muda a comparação.

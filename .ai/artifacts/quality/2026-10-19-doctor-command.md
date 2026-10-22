---
artifact: edge_case_report
id: EDGE-CASE-20261019-001
version: 1
status: ready
created_by: edge-case-analysis
inputs:
  - SPEC-20261019-001
  - ARCHITECTURE-20261019-001
  - ADR-0004
  - TEST-20261019-005
  - REVIEW-20261019-002
---

# Comando doctor — limites da v1-A23

Objetivo: limites de `doctor` no working tree de `bin/ai-dev-skills.mjs` e `tests/validate-skills.test.mjs`. A spec `SPEC-20261019-001` está `ready`. Não há modelo de domínio; a própria spec declara que R8 não se aplica. Esta execução não alterou produção nem teste. O comportamento esperado citado abaixo vem da spec.

## Scenario

`PATH` vazio, ausente ou formado só pelo separador, sem executável `git`. Evidência: requisito 3 e critério 3 de `SPEC-20261019-001`.

## Category

boundaries

## Risk

Entrada externa. O processo lê `PATH` para resolver `git`. Evidência: Security / Privacy e requisito 3 de `SPEC-20261019-001`.

## Expected Behaviour

A segunda linha é `git fail`. Com a primeira linha `node pass`, a saída é 1 e a stderr fica vazia. Evidência: critérios 3, 6 e 8 e requisito 5 de `SPEC-20261019-001`.

## Existing Coverage

`doctor reports node and git without calling validate` usa um diretório vazio como `PATH` e afirma `git fail`, saída 1, a linha de Node e stderr vazia. Evidência: `tests/validate-skills.test.mjs`.

## Missing Coverage

Não há caso com `PATH` `""`, com `PATH` omitido nem só com o separador. Evidência: o mesmo teste.

## Recommended Test

Afirmar esses três `PATH` no `spawn` de `doctor`: `node pass <versão>`, `git fail`, saída 1 e stderr vazia. Evidência: critério 3 de `SPEC-20261019-001`.

## Scenario

`PATH` com dois segmentos e o executável `git` só no segundo. Evidência: requisito 3 e critério 1 de `SPEC-20261019-001`.

## Category

boundaries

## Risk

Entrada externa. A resolução percorre o `PATH`, não um único diretório. Evidência: requisito 3 de `SPEC-20261019-001`.

## Expected Behaviour

Saída 0, stderr vazia, `node pass <versão>` e `git pass`. Evidência: critério 1 de `SPEC-20261019-001`.

## Existing Coverage

O `PATH` de sucesso é um único diretório com arquivo `git` executável. Evidência: `tests/validate-skills.test.mjs`.

## Missing Coverage

Nenhum `spawn` junta dois segmentos com `path.delimiter`. Evidência: o mesmo teste.

## Recommended Test

`spawn` com o executável apenas no segundo segmento, afirmando o critério 1. Evidência: requisito 3 de `SPEC-20261019-001`.

## Scenario

O único nome `git` no `PATH` é um diretório. Evidência: requisito 3 de `SPEC-20261019-001`.

## Category

boundaries

## Risk

Entrada externa. Diretório não é executável de nome `git`. Evidência: requisito 3 de `SPEC-20261019-001`.

## Expected Behaviour

`git fail`, linha de Node conservada, saída 1 quando Node passa, stderr vazia. Evidência: critérios 3 e 8 de `SPEC-20261019-001`.

## Existing Coverage

Os arquivos de nome `git` são arquivo executável, arquivo modo `0o644` ou segmento que não é diretório. Não há diretório de nome `git`. Evidência: `tests/validate-skills.test.mjs`.

## Missing Coverage

O caso do diretório não é afirmado. Evidência: o mesmo teste.

## Recommended Test

`PATH` cujo `git` é diretório, com `git fail`, saída 1, linha de Node e stderr vazia. Evidência: requisito 3 de `SPEC-20261019-001`.

## Scenario

O `PATH` só contém um arquivo executável de nome `git.exe`. Evidência: requisito 3 de `SPEC-20261019-001`. `ADR-0004` impede aceitar esse nome.

## Category

boundaries

## Risk

Entrada externa. O nome especificado é `git`. Tratar `git.exe` como sucesso ampliaria o comando. Evidência: requisito 3 de `SPEC-20261019-001` e `ADR-0004`.

## Expected Behaviour

O executável de nome `git` não está resolvido: `git fail`, linha de Node, saída 1 se Node passa, stderr vazia. Evidência: critério 3 de `SPEC-20261019-001`.

## Existing Coverage

Nenhum teste cria `git.exe`. Evidência: `tests/validate-skills.test.mjs`.

## Missing Coverage

O nome `git.exe` não é afirmado como falha. Evidência: o mesmo teste.

## Recommended Test

Arquivo executável só de nome `git.exe`, com as asserções do critério 3. O teste não pode esperar `git pass`. Evidência: requisito 3 de `SPEC-20261019-001`.

## Scenario

Versão rejeitada junto com `git` ausente, e versão rejeitada junto com `git` disponível. Evidência: critérios 4 e 5 de `SPEC-20261019-001`.

## Category

boundaries

## Risk

Entrada da versão e do `PATH` ao mesmo tempo. A falha de uma verificação não pode suprimir a outra. Evidência: requisito 4 de `SPEC-20261019-001`.

## Expected Behaviour

`node fail 21.9.9` seguido de `git fail`, ou `node fail 21.9.9` seguido de `git pass`. Nos dois, saída 1 e stderr vazia. `<versão>` no comando real continua `process.versions.node`. Evidência: critérios 2, 4, 5 e 8 de `SPEC-20261019-001`.

## Existing Coverage

`nodeLine('21.9.9')`, `nodeLine('22.0.0')` e `nodeLine('23.1.0')` estão no teste. Os `spawn` de `git fail` usam o Node do processo, que passa. Evidência: `tests/validate-skills.test.mjs` e `TEST-20261019-005`.

## Missing Coverage

As duas linhas juntas não são afirmadas. A saída 1 do processo quando só Node falha também não. Evidência: o mesmo teste.

## Recommended Test

Afirmar as duas linhas com `nodeLine('21.9.9')` e `gitLine` num `PATH` sem `git` e num `PATH` com `git` executável, sem outro binário Node.js. Evidência: critério 2 de `SPEC-20261019-001`.

## Scenario

Argumento posicional, ou opção sem valor, em `doctor`. Evidência: requisito 7 de `SPEC-20261019-001`.

## Category

boundaries

## Risk

Entrada externa. Opção ou argumento não entra nas duas verificações. Evidência: requisito 7 de `SPEC-20261019-001`.

## Expected Behaviour

Saída 1, `ERROR:` na stderr e ausência das duas linhas. Evidência: requisito 7 e critério 7 de `SPEC-20261019-001`.

## Existing Coverage

`doctor --target cursor` afirma saída 1, `ERROR:` e ausência das linhas. Evidência: `tests/validate-skills.test.mjs`.

## Missing Coverage

`doctor extra` e `doctor --target` sem valor não são afirmados. Evidência: o mesmo teste.

## Recommended Test

Esses dois `spawn`, com saída 1, `ERROR:` e sem as duas linhas. Evidência: requisito 7 de `SPEC-20261019-001`.

## Scenario

`doctor` nos caminhos de diagnóstico não cria, não modifica e não apaga arquivo. Evidência: critério 8 e requisito 8 de `SPEC-20261019-001`.

## Category

data integrity

## Risk

O comando lê `PATH` e a versão. A spec proíbe efeito em arquivo. Evidência: requisito 8 de `SPEC-20261019-001`.

## Expected Behaviour

Nos caminhos dos critérios 1 a 6, a stderr fica vazia e o conjunto de arquivos anterior ao comando permanece. Evidência: critério 8 de `SPEC-20261019-001`.

## Existing Coverage

Depois do `spawn` de sucesso, o diretório temporário do `PATH` contém só `empty` e `git`. A stderr dos `spawn` de diagnóstico exercitados está vazia. O diretório de trabalho do processo não é comparado. Evidência: `tests/validate-skills.test.mjs` e `REVIEW-20261019-001`.

## Missing Coverage

Não há snapshot do diretório de trabalho, nem do diretório de `PATH`, nos `spawn` de `git fail` e de exceção. Evidência: o mesmo teste.

## Recommended Test

Comparar o diretório de trabalho e o diretório de `PATH` antes e depois dos `spawn` dos critérios 1, 3 e 6, antes de o próprio teste gravar outro arquivo. Evidência: critério 8 de `SPEC-20261019-001`.

## Scenario

A observação de Git lança erro. Evidência: requisito 3, requisito 4 e critério 6 de `SPEC-20261019-001`.

## Category

failure modes

## Risk

Falha externa na leitura do `PATH`. O resultado não pode ser um terceiro estado nem omitir a linha de Node. Evidência: requisito 4 e Security / Privacy de `SPEC-20261019-001`.

## Expected Behaviour

`git fail`, linha de Node conservada, saída 1, stderr vazia, sem imprimir `PATH`, diretório pessoal nem o objeto do erro. Evidência: critério 6, critério 8 e Security / Privacy de `SPEC-20261019-001`.

## Existing Coverage

`gitLine` com lookup que lança devolve `git fail`. Um segmento de `PATH` que é arquivo faz `stat` lançar erro diferente de `ENOENT`; o `spawn` afirma saída 1, stderr vazia e `node pass <versão>` seguido de `git fail`. Evidência: `tests/validate-skills.test.mjs` e `TEST-20261019-005`.

## Missing Coverage

none

## Recommended Test

none

## Scenario

`doctor` não executa `git` e não abre conexão de rede. Evidência: requisitos 3 e 8 de `SPEC-20261019-001`.

## Category

external dependencies

## Risk

Integração externa. Executar `git` pode usar rede ou exigir repositório. Evidência: Risks e requisito 3 de `SPEC-20261019-001`.

## Expected Behaviour

Arquivo executável de nome `git` basta para `git pass`. Não há execução do binário nem conexão de rede. Evidência: requisitos 3 e 8 de `SPEC-20261019-001`.

## Existing Coverage

O arquivo `git` do sucesso está vazio e mesmo assim a stdout é `git pass`. Isso é o critério 1 sem um binário Git funcional. Não há asserção de ausência de rede. Evidência: `tests/validate-skills.test.mjs`.

## Missing Coverage

O ramo delimitado de `doctor` não é afirmado quanto a rede. Evidência: o mesmo teste.

## Recommended Test

No recorte já delimitado do ramo, afirmar ausência de `child_process`, `fetch(`, `node:net` e `node:http`. Evidência: requisitos 3 e 8 de `SPEC-20261019-001`.

## Proposals Not Authorized

Estas propostas não são Recommended Test. Cada uma alargaria comportamento que a spec não fixa, ou mudaria a CLI que esta execução preserva.

- Outro texto de versão além de `21.9.9`, `22.0.0`, `23.1.0` e de `process.versions.node`. A spec não define `22`, string vazia nem prefixo `v`. Evidência: critério 2 de `SPEC-20261019-001`.
- Continuar a busca depois de um `git` não executável, ou depois de um lançamento, quando um segmento posterior tem `git` executável. A API de resolução permanece em Open Questions e não muda os critérios. Evidência: Open Questions de `SPEC-20261019-001`.
- Seguir symlink ou tratar o bit de execução do Windows como regra nova. Evidência: Non-goals de `SPEC-20261019-001` e `ADR-0004`.
- Observar a saída 1 do processo quando Node falha por meio de outro binário Node.js ou de uma função nova de produção. O critério 2 dispensa outro binário, e o relatório não autoriza mudança de comportamento. Evidência: critério 2 de `SPEC-20261019-001`.
- Concorrência, volume de segmentos do `PATH` e detecção de plataforma. Não estão na spec. Evidência: Non-goals de `SPEC-20261019-001`.

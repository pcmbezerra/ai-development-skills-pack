---
artifact: ticket_set
id: TICKET-SET-20261022-008
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261022-008
  - DECISION-SET-20261022-008
---

# Asserção SPDX da licença MIT — emenda v1-A31

Conjunto executável derivado de `SPEC-20261022-008` versão 1 e de `DECISION-SET-20261022-008` versão 2. Cada bloco é um TICKET. O Markdown local é a fonte. Nenhum ticket publica issue remota. Esta execução não inicia os tickets e não invoca `implement`.

O único objetivo é a asserção determinística e offline. A v1-A31 não está implementada. R8 não se aplica. R9 não se aplica. Não há modelo de domínio nem desenho de arquitetura para este objetivo. A spec deixa o nome exato em aberto e já fixa o diretório, o sufixo e a exclusão do nome `LICENSE`. Esta decomposição propõe dois caminhos que ainda não existem:

- Módulo: `tests/spdx-mit.test.mjs`
- Template: `tests/spdx-mit.txt`

A cadeia é 01, 02, 03, 04, 05, 06, 07, 08. Cada ticket depende só do anterior. Não há ciclo.

Rastreio dos treze critérios de aceite da spec:

| Critério | Ticket |
|---|---|
| 1. Diff de conteúdo só no módulo, no template e em `package.json` | 08; 01 grava só o template, 02–06 gravam só o módulo, 07 grava só `scripts.test` |
| 2. `scripts.test` conserva os dois caminhos e acrescenta o módulo no fim; demais campos intactos | 07, conferido de novo no 08 |
| 3. Template com 1078 bytes, hash oficial, sem `0x0D`, fim `0x0A` e placeholder na linha 3 | 01, conferido de novo no 08 |
| 4. Hash do template antes de `LICENSE`; byte alterado falha como `template` | 02, conferido de novo no 08 |
| 5. Sem normalização; `LICENSE` canônico passa | 02, conferido de novo no 08 |
| 6. Aviso divergente falha como `aviso` | 03, conferido de novo no 08 |
| 7. Corpo alterado falha como `corpo`; linha extra ou removida falha como `extensao` | 04, conferido de novo no 08 |
| 8. CRLF e newline final removido falham como `extensao` | 05, conferido de novo no 08 |
| 9. Campos incorretos, ausentes ou JSON inválido falham como `campo` | 06, conferido de novo no 08 |
| 10. Cenários em cópia temporária; bytes canônicos intactos depois da execução | 02 estabelece a cópia; 03–06 reutilizam; 08 confere os bytes depois da suíte |
| 11. Sem rede e sem dependência npm nova | 02 e 07; conferido de novo no 08 |
| 12. `No SPDX assertion was added` permanece; os registros não entram no diff | 08; exclusão também nos tickets 01–07 |
| 13. Treze caminhos de fim de linha fora do diff | 08; exclusão também nos tickets 01–07 |

## Title

01 — Template oficial `tests/spdx-mit.txt`

## Goal

Gravar o texto oficial SPDX `MIT` em `tests/spdx-mit.txt`, com o hash já decidido, sem alterar `LICENSE`.

## Context

Critério 3 de `SPEC-20261022-008`. O template tem 1078 bytes, SHA-256 `b05785f9f18e6716bab63424b11454513b9943a222595b70411009202fc592b5`, nenhum byte `0x0D`, termina com `0x0A` e a linha 3 é `Copyright (c) <year> <copyright holders>`. O conjunto registrou que recolocar só essa linha no `LICENSE` atual recupera esses bytes. Evidência: Functional Requirement 1 e Acceptance Criterion 3 da spec; decisão 1 de `DECISION-SET-20261022-008` versão 2.

## Scope

- Criar somente `tests/spdx-mit.txt`.
- Obter os bytes recolocando, em memória, a linha 3 de `LICENSE` por `Copyright (c) <year> <copyright holders>`, preservando LF e o newline final.
- Conferir comprimento 1078 e o SHA-256 oficial antes de considerar o arquivo pronto.
- Não gravar paráfrase. Se o hash divergir, parar.

## Out of Scope

- `tests/spdx-mit.test.mjs` e `package.json`.
- Editar `LICENSE`, `README.md`, manifesto, CLI, `validate()`, contratos, skills, R1–R17 ou ADRs.
- Os treze caminhos de fim de linha.
- Apagar `No SPDX assertion was added`.
- Rede, dependência npm e publicação no npm.

## Dependencies

Nenhuma. `SPEC-20261022-008` já está `ready`.

## Implementation Notes

O arquivo proposto ainda não existe. O nome não é `LICENSE`. A recolocação da linha 3 é o método já conferido no conjunto, não uma licença nova. Evidência: critério 3 da spec e a reprodução registrada na decisão.

## Acceptance Criteria

- `tests/spdx-mit.txt` tem 1078 bytes e SHA-256 `b05785f9f18e6716bab63424b11454513b9943a222595b70411009202fc592b5`. Evidência: critério 3 da spec.
- Os bytes não contêm `0x0D`, terminam com `0x0A` e a linha 3 é `Copyright (c) <year> <copyright holders>`. Evidência: critério 3 da spec.
- `LICENSE` permanece com a linha 3 `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. Evidência: Non-goals da spec.

## Validation

Leitura dos bytes, comprimento e SHA-256 de `tests/spdx-mit.txt`, mais a linha 3 de `LICENSE`. Sem `npm test`. Esta decomposição não executa essa leitura sobre um arquivo que ainda não foi criado.

## Definition of Done

O template proposto existe com o hash oficial. `LICENSE` não foi editado. Nenhum outro caminho deste ticket muda.

## Title

02 — Módulo, caso positivo e classe `template`

## Goal

Criar `tests/spdx-mit.test.mjs` com a comparação byte a byte, o caso positivo em cópia temporária e a falha `template` antes de aceitar `LICENSE`.

## Context

Critérios 4, 5, 10 e 11 de `SPEC-20261022-008`. O hash do template é conferido antes da comparação. Um byte alterado no template falha como `template` mesmo com `LICENSE` aprovado. O `LICENSE` canônico passa sem normalização. Evidência: Functional Requirements 2, 3, 4 e 9 e Acceptance Criteria 4, 5, 10 e 11 da spec.

## Scope

- Criar somente `tests/spdx-mit.test.mjs`.
- Ler os bytes do template e calcular SHA-256 com a cripto do Node. Exigir `b05785f9f18e6716bab63424b11454513b9943a222595b70411009202fc592b5` e 1078 bytes antes de comparar `LICENSE`.
- Não converter CRLF em LF, não remover CR, não aplicar `trim`, não mudar capitalização e não ignorar newline final ausente.
- O caso positivo copia, sem mutação, `LICENSE`, `package.json` e `tests/spdx-mit.txt` para um diretório temporário e passa: 18 linhas de conteúdo, newline final, linha 3 `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)` e as outras linhas iguais às do template.
- Um byte alterado na cópia do template, com a cópia de `LICENSE` aprovada, falha e a mensagem contém `template`.
- Remover o diretório temporário ao fim. Não gravar os três arquivos canônicos.
- Usar só módulos nativos do Node. Não abrir rede.

## Out of Scope

- Casos `aviso`, `corpo`, `extensao` e `campo`.
- Alterar `scripts.test`.
- Editar o template canônico, `LICENSE` ou os outros campos de `package.json`.
- `README.md`, manifesto, CLI, `validate()`, contratos, skills, R1–R17, ADRs e os treze caminhos de fim de linha.
- Dependência npm e a frase histórica.

## Dependencies

01. O template proposto precisa existir para o caso positivo copiá-lo.

## Implementation Notes

A ordem é hash do template, depois linhas de `LICENSE`. Hash divergente não pode ser aprovado pela comparação do `LICENSE`. O padrão de temporário da suíte é `mkdtemp`. Evidência: Non-functional Requirements da spec e `tests/validate-skills.test.mjs`.

## Acceptance Criteria

- O módulo confere o hash oficial antes da comparação. Evidência: critério 4 da spec.
- A mutação de um byte no template da cópia falha com `template`, com `LICENSE` aprovado. Evidência: critério 4 da spec.
- A cópia intacta passa, sem normalização, com o aviso aprovado na linha 3. Evidência: critério 5 da spec.
- Depois do cenário, os bytes canônicos de `LICENSE`, `package.json` e `tests/spdx-mit.txt` são os mesmos. Evidência: critério 10 da spec.
- O módulo não realiza I/O de rede e `package.json` não ganha dependência. Evidência: critério 11 da spec.

## Validation

Executar só `node --test tests/spdx-mit.test.mjs` depois que o arquivo existir. Conferir os hashes canônicos antes e depois. Sem inventar contagem de suíte. Esta decomposição não executa o teste.

## Definition of Done

O módulo proposto cobre o positivo e a classe `template`. Os arquivos canônicos não são gravados pelo teste. `scripts.test` ainda não muda.

## Title

03 — Falhas da classe `aviso`

## Goal

Acrescentar ao módulo os casos em que só a linha 3 diverge e a falha se chama `aviso`.

## Context

Critério 6 de `SPEC-20261022-008`. Espaço extra, placeholder, outro ano ou outro nome falham. O restante igual não esconde a falha. Evidência: Functional Requirement 5 e Acceptance Criterion 6 da spec.

## Scope

- Editar somente `tests/spdx-mit.test.mjs`.
- Em cópias temporárias, com o template intacto, fazer a linha 3 falhar nestes quatro textos: o aviso aprovado mais um espaço no fim; `Copyright (c) <year> <copyright holders>`; um ano diferente; um nome diferente.
- Cada falha contém `aviso`.
- Não gravar `LICENSE` canônico.

## Out of Scope

- Classes `corpo`, `extensao`, `campo` e `template`.
- Normalizar espaço ou capitalização para fazer o caso passar.
- `package.json`, `tests/spdx-mit.txt`, `LICENSE`, `README.md` e os caminhos excluídos no ticket 02.

## Dependencies

02. Os casos entram no módulo que já compara bytes e já usa cópia temporária.

## Implementation Notes

A comparação continua sem `trim` e sem troca global do placeholder. Evidência: Functional Requirement 3 da spec.

## Acceptance Criteria

- Os quatro textos da linha 3 falham com `aviso`. Evidência: critério 6 da spec.
- As outras linhas iguais não tornam o cenário verde. Evidência: critério 6 da spec.
- `LICENSE` canônico permanece com o aviso aprovado. Evidência: critério 10 da spec.

## Validation

Executar `node --test tests/spdx-mit.test.mjs` e ler que cada um dos quatro cenários falha com `aviso`. Esta decomposição não executa o teste.

## Definition of Done

O módulo cobre os quatro avisos divergentes. Nenhum outro caminho deste ticket muda.

## Title

04 — Falhas `corpo` e linha acrescentada ou removida

## Goal

Acrescentar a falha `corpo` para texto MIT alterado fora da linha 3 e a falha `extensao` para linha extra ou linha removida.

## Context

Critério 7 de `SPEC-20261022-008`. Uma palavra alterada fora da linha 3 é `corpo`. Linha removida ou linha extra é `extensao`. Evidência: Functional Requirement 6 e Acceptance Criterion 7 da spec.

## Scope

- Editar somente `tests/spdx-mit.test.mjs`.
- Numa cópia, mudar uma palavra de uma linha que não é a 3, com a linha 3 correta. A falha contém `corpo`.
- Numa cópia, remover uma linha de conteúdo. A falha contém `extensao`.
- Numa cópia, acrescentar uma linha de conteúdo. A falha contém `extensao`.
- Não gravar os arquivos canônicos.

## Out of Scope

- CRLF e newline final ausente. Esses casos são o ticket 05.
- Classes `aviso`, `campo` e `template`.
- `package.json`, o template canônico, `LICENSE` e os caminhos excluídos no ticket 02.

## Dependencies

03. O módulo já contém os casos de aviso; este ticket só acrescenta blocos.

## Implementation Notes

Não tratar linha extra como aviso só porque a linha 3 continua correta. Evidência: critério 7 da spec.

## Acceptance Criteria

- A palavra alterada fora da linha 3 falha com `corpo`. Evidência: critério 7 da spec.
- A linha removida e a linha extra falham com `extensao`. Evidência: critério 7 da spec.
- Os bytes canônicos permanecem. Evidência: critério 10 da spec.

## Validation

Executar `node --test tests/spdx-mit.test.mjs` e ler as três falhas nomeadas. Esta decomposição não executa o teste.

## Definition of Done

O módulo distingue `corpo` de `extensao` nesses três cenários. Nenhum outro caminho deste ticket muda.

## Title

05 — Falhas `extensao` de CRLF e newline final

## Goal

Acrescentar as falhas em que o fim de linha deixa de ser LF com newline final, sem normalizar esses bytes.

## Context

Critério 8 de `SPEC-20261022-008`. CRLF no lugar de LF, e newline final removido, falham com `extensao`. Uma comparação que normalize esses casos não atende. Evidência: Functional Requirement 7 e Acceptance Criterion 8 da spec.

## Scope

- Editar somente `tests/spdx-mit.test.mjs`.
- Numa cópia de `LICENSE`, trocar LF por CRLF. A falha contém `extensao`.
- Numa cópia, remover o newline final. A falha contém `extensao`.
- Não remover CR nem recolocar o newline final antes de decidir a falha.

## Out of Scope

- Classe `campo`.
- Alterar o template canônico ou o `LICENSE` canônico para CRLF.
- `package.json`, `README.md` e os caminhos excluídos no ticket 02.

## Dependencies

04. O módulo já nomeia `extensao` para linha extra ou removida; este ticket acrescenta os dois fins de linha.

## Implementation Notes

Separar linhas sem apagar `0x0D` e sem tratar arquivo sem `0x0A` final como equivalente ao aprovado. Evidência: Functional Requirement 3 da spec.

## Acceptance Criteria

- CRLF falha com `extensao`. Evidência: critério 8 da spec.
- Newline final removido falha com `extensao`. Evidência: critério 8 da spec.
- O `LICENSE` canônico continua em LF com newline final. Evidência: critério 5 da spec.

## Validation

Executar `node --test tests/spdx-mit.test.mjs` e ler as duas falhas. Esta decomposição não executa o teste.

## Definition of Done

Os dois cenários de fim de linha falham com `extensao`. O `LICENSE` canônico não muda.

## Title

06 — Falhas da classe `campo`

## Goal

Acrescentar a leitura estrita de `license`, `private` e `version` na cópia de `package.json`.

## Context

Critério 9 de `SPEC-20261022-008`. A string `MIT`, o booleano `true` e a string `1.0.0-scaffold` são o estado vigente. Valor ausente, capitalização diferente, JSON inválido e `private` como string `true` falham como `campo`. Evidência: Functional Requirement 8 e Acceptance Criterion 9 da spec; decisão 2 do conjunto.

## Scope

- Editar somente `tests/spdx-mit.test.mjs`.
- Em cópias de `package.json`, falhar com `campo` para: `license` `UNLICENSED`, `Apache-2.0`, `mit` e `MIT `; `license` ausente; JSON inválido; `private` `false`; `private` igual à string `true`; `version` diferente de `1.0.0-scaffold`.
- Não mudar `license`, `private` nem `version` no `package.json` canônico.

## Out of Scope

- Alterar `scripts.test`.
- Publicar no npm ou renomear a versão.
- `LICENSE`, o template, `README.md` e os caminhos excluídos no ticket 02.

## Dependencies

05. O módulo já cobre as classes anteriores; este ticket acrescenta os campos.

## Implementation Notes

`JSON.parse` e comparação estrita. A string `true` não substitui o booleano `true`. A falha não autoriza editar o campo canônico. Evidência: Business Rules da spec.

## Acceptance Criteria

- Cada valor listado em Scope falha com `campo`. Evidência: critério 9 da spec.
- O `package.json` canônico continua com `license` `MIT`, `private` booleano `true` e `version` `1.0.0-scaffold`. Evidência: critério 2 da spec e a decisão 2.

## Validation

Executar `node --test tests/spdx-mit.test.mjs` e ler a classe `campo` em cada cenário. Esta decomposição não executa o teste.

## Definition of Done

O módulo rejeita os campos divergentes. O `package.json` canônico não muda neste ticket.

## Title

07 — Acréscimo em `scripts.test`

## Goal

Incluir `tests/spdx-mit.test.mjs` no fim da lista atual de `scripts.test`, sem alterar outro campo.

## Context

Critério 2 de `SPEC-20261022-008`. O valor atual é `node --test tests/validate-skills.test.mjs tests/distribute-skills.test.mjs`. Evidência: Functional Requirement 10 e Acceptance Criterion 2 da spec; decisão 3 do conjunto.

## Scope

- Editar somente a entrada `scripts.test` de `package.json`.
- O valor fica `node --test tests/validate-skills.test.mjs tests/distribute-skills.test.mjs tests/spdx-mit.test.mjs`.
- `license`, `private`, `version`, `dependencies` e os demais campos permanecem.

## Out of Scope

- Reordenar ou remover os dois caminhos atuais.
- Acrescentar dependência npm.
- Editar o módulo, o template, `LICENSE` ou `README.md`.
- Manifesto, CLI, `validate()`, contratos, skills, R1–R17, ADRs e os treze caminhos de fim de linha.

## Dependencies

06. O módulo já contém as cinco classes antes de entrar na lista de `npm test`.

## Implementation Notes

Um espaço separa o caminho novo do caminho de `tests/distribute-skills.test.mjs`. Nenhum outro texto de `package.json` muda. Evidência: critério 2 da spec.

## Acceptance Criteria

- `scripts.test` é exatamente `node --test tests/validate-skills.test.mjs tests/distribute-skills.test.mjs tests/spdx-mit.test.mjs`. Evidência: critério 2 da spec.
- `license` permanece `MIT`, `private` permanece o booleano `true`, `version` permanece `1.0.0-scaffold` e `dependencies` permanece vazio. Evidência: critério 2 da spec.
- O diff de `package.json`, ignorando fim de linha, não mostra outro campo. Evidência: critério 2 da spec.

## Validation

Leitura de `package.json` e `git diff --ignore-cr-at-eol -- package.json`. Sem publicar no npm. Esta decomposição não edita o arquivo.

## Definition of Done

A lista de `scripts.test` termina no módulo proposto. Os outros campos de `package.json` permanecem.

## Title

08 — Releitura dos 13 critérios e do diff

## Goal

Conferir, depois dos sete tickets, os treze critérios de `SPEC-20261022-008` e o diff de conteúdo.

## Context

Critérios 1, 12 e 13, e a releitura dos critérios 2 a 11. A frase `No SPDX assertion was added` permanece em `references/provenance.md` e em `references/validation-result.md`. Os treze caminhos de fim de linha ficam fora. Evidência: Acceptance Criteria 1, 12 e 13 e Technical Constraints da spec.

## Scope

- Não criar caminho novo.
- Ler o diff de conteúdo com `git diff --ignore-cr-at-eol`.
- Confirmar que esse diff contém só `tests/spdx-mit.txt`, `tests/spdx-mit.test.mjs` e `package.json`.
- Reler os critérios 2 a 11 nos três caminhos.
- Confirmar a frase histórica nos dois registros e a ausência desses registros no diff.
- Confirmar que os treze caminhos de fim de linha não entram no diff e que `git diff --ignore-cr-at-eol` neles fica vazio.
- Executar `npm test` só como verificação da lista já alterada. Não escrever contagem em `references/validation-result.md`.

## Out of Scope

- Corrigir falha de implementação dentro deste ticket. Falha volta ao ticket do critério.
- Narrar a v1-A31 nos registros internos.
- Alterar `README.md`, manifesto, CLI, `validate()`, contratos, skills, R1–R17 ou ADRs.
- Incluir os treze caminhos de fim de linha.
- Commit e push.

## Dependencies

07. Os três caminhos da implementação já estão no working tree.

## Implementation Notes

Os artefatos já gravados por `clarify`, `to-spec` e `to-tickets` não são caminho de produto deste critério. O diff exigido pelo critério 1 é o dos três caminhos de implementação. Evidência: critérios 1 e 12 da spec.

## Acceptance Criteria

- O diff de conteúdo, ignorando fim de linha, mostra só `tests/spdx-mit.txt`, `tests/spdx-mit.test.mjs` e `package.json`. Evidência: critério 1 da spec.
- `LICENSE`, `README.md`, `tests/validate-skills.test.mjs`, `tests/distribute-skills.test.mjs`, manifesto, CLI, validador, contratos, skills e ADR-0001 a ADR-0004 não aparecem. Evidência: critério 1 da spec.
- Os critérios 2 a 11 continuam verdadeiros nos três caminhos. Evidência: a tabela deste conjunto.
- `references/provenance.md` e `references/validation-result.md` ainda contêm `No SPDX assertion was added` e não aparecem no diff. Evidência: critério 12 da spec.
- Os treze caminhos listados em Technical Constraints da spec não aparecem no diff. Evidência: critério 13 da spec.
- Depois de `npm test`, os bytes de `LICENSE`, de `tests/spdx-mit.txt` e dos campos de `package.json` fora de `scripts.test` são os mesmos de antes da execução. Evidência: critério 10 da spec.

## Validation

`git diff --ignore-cr-at-eol --stat`, leitura da frase histórica e `npm test`. O resultado numérico da suíte, quando existir, fica na evidência da implementação futura. Esta decomposição não executa `npm test` e não inventa esse resultado.

## Definition of Done

Os treze critérios foram relidos. O diff de implementação tem só os três caminhos propostos. Nenhum arquivo a mais foi editado por este ticket.

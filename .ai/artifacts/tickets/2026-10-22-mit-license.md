---
artifact: ticket_set
id: TICKET-SET-20261022-005
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261022-005
---

# Adoção da licença MIT — emenda v1-A28

Conjunto executável derivado de `SPEC-20261022-005`. Cada bloco é um TICKET. O Markdown local é a fonte. Nenhum ticket publica issue remota. Esta execução não inicia os tickets e não invoca `implement`.

O aviso aprovado é `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. O corpo da licença não está nesta spec nem neste conjunto. A conferência usa o texto oficial publicado para o identificador SPDX `MIT`. R8 não se aplica: não há termo de negócio, invariante, transição, evento ou fronteira de contexto novos. R9 não se aplica: a spec não muda fronteira de módulo, interface pública, modelo de dados, contrato de integração, infraestrutura, fronteira de segurança, concorrência nem implantação. Não há modelo de domínio nem desenho de arquitetura para este objetivo.

Rastreio dos nove critérios de aceite da spec:

| Critério | Ticket |
|---|---|
| 1. `LICENSE` sem placeholder | 01, conferido de novo no 04 |
| 2. Aviso exato | 01, conferido de novo no 04 |
| 3. Corpo igual ao texto oficial SPDX `MIT`, com só o aviso de diferença | 01, conferido de novo no 04 |
| 4. `license` igual a `MIT` | 02, conferido de novo no 04 |
| 5. `private` `true` e `version` `1.0.0-scaffold` | 02, conferido de novo no 04 |
| 6. Nenhum outro campo de `package.json` | 02, conferido de novo no 04 |
| 7. README sem placeholder, sem ausência de licença e sem `UNLICENSED` | 03, conferido de novo no 04 |
| 8. README registra MIT e mantém `private: true` | 03, conferido de novo no 04 |
| 9. Manifesto, contratos, ADRs, skills, R1–R17, CLI, validador e os treze caminhos intactos | 04 |

## Title

01 — `LICENSE` conferida contra o texto oficial SPDX `MIT`

## Goal

Substituir o placeholder de `LICENSE` pelo texto oficial da licença SPDX `MIT`, com o aviso aprovado no lugar do aviso de copyright desse texto.

## Context

`SPEC-20261022-005` está `ready`. Os critérios 1, 2 e 3 pedem a saída do placeholder, a linha exata `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)` e a comparação com o texto oficial SPDX `MIT`. A spec não copia o corpo. `LICENSE` hoje começa com `LICENSE PLACEHOLDER` e diz que nenhuma licença foi selecionada. R8 e R9 não se aplicam.

## Scope

- Editar somente `LICENSE`.
- Obter o texto oficial publicado para o identificador SPDX `MIT`.
- Gravar esse texto, trocando só o aviso de copyright pelo aviso aprovado `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`.
- Remover `LICENSE PLACEHOLDER` e `No license has been selected.`

## Out of Scope

- `package.json` e `README.md`. Isso é os tickets 02 e 03.
- Paráfrase, tradução ou texto de memória. Evidência: critério 3 e Non-functional Requirements da spec.
- Título, cláusula ou parágrafo que o texto oficial não tenha.
- Conclusão sobre sociedade, sócio ou titularidade jurídica de LAB-IT. Evidência: Business Rules e Security / Privacy da spec.
- `NOTICE`, `CONTRIBUTING`, manifesto, contratos, ADRs, skills, CLI, validador e os treze caminhos de fim de linha.

## Dependencies

Nenhuma. `SPEC-20261022-005` já está `ready`.

## Implementation Notes

A fonte da comparação é o texto oficial do identificador SPDX `MIT`, lido na implementação. Este conjunto não traz esse corpo. O aviso aprovado entra inteiro, com o ano 2026, o nome Paulo César Melo Bezerra e o trecho `(LAB-IT)`. Esse trecho não vira qualificação societária. Não publicar no npm.

## Acceptance Criteria

- `LICENSE` não contém `LICENSE PLACEHOLDER` nem `No license has been selected.` Evidência: critério 1 da spec.
- `LICENSE` contém a linha exata `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. Evidência: critério 2 da spec.
- Fora esse aviso, `LICENSE` não acrescenta cláusula e não remove cláusula do texto oficial SPDX `MIT`. Texto memorizado ou parafraseado falha. Evidência: critério 3 da spec.

## Validation

Comparação de `LICENSE` com o texto oficial publicado para o identificador SPDX `MIT`. A única diferença admitida é o aviso aprovado no lugar do aviso de copyright desse texto. A leitura confirma a ausência das duas frases do placeholder.

## Definition of Done

`LICENSE` passou na comparação com a fonte oficial, traz o aviso exato e não é mais o placeholder. Este ticket não altera `package.json` nem `README.md`.

## Title

02 — Campo `license` de `package.json`

## Goal

Trocar somente `license` de `UNLICENSED` para `MIT`, conservando `private`, `version` e os demais campos.

## Context

Critérios 4, 5 e 6 de `SPEC-20261022-005`. O arquivo hoje tem `license` `UNLICENSED`, `private` `true` e `version` `1.0.0-scaffold`. A spec autoriza um único campo.

## Scope

- Em `package.json`, alterar o valor de `license` para `MIT`.
- Manter `private` `true`.
- Manter `version` `1.0.0-scaffold`.
- Manter os outros campos como estão.

## Out of Scope

- `LICENSE` e `README.md`.
- Publicação no npm e `private` `false`. Evidência: Business Rules da spec.
- Dependência npm, script, `bin`, `engines` ou `description`.
- `NOTICE`, `CONTRIBUTING` e os treze caminhos de fim de linha.

## Dependencies

Nenhuma. Sem ciclo com o ticket 01.

## Implementation Notes

O diff deste ticket mostra uma linha: `license`. Não reformatar o JSON além dessa troca. Não acrescentar `author`.

## Acceptance Criteria

- `package.json` tem `license` igual a `MIT`. Evidência: critério 4 da spec.
- `package.json` tem `private` igual a `true` e `version` igual a `1.0.0-scaffold`. Evidência: critério 5 da spec.
- Nenhum outro campo de `package.json` muda. Evidência: critério 6 da spec.

## Validation

Leitura de `package.json` e diff limitado à linha `license`. `private` e `version` permanecem os valores atuais.

## Definition of Done

`license` é `MIT`, `private` continua `true`, `version` continua `1.0.0-scaffold` e o restante do arquivo está igual.

## Title

03 — Parágrafo de licença do `README.md`

## Goal

Registrar a licença MIT no `README.md` e retirar a descrição de ausência de licença, sem reescrever as narrativas históricas.

## Context

Critérios 7 e 8 de `SPEC-20261022-005`. A seção Limites hoje diz que `LICENSE` é placeholder, que nenhuma licença foi escolhida e que `package.json` declara `private: true` e `license` `UNLICENSED`. As seções anteriores narram as emendas até a v1-A27. A spec não pede narrar a v1-A28 em outros documentos.

## Scope

- Editar o parágrafo da seção Limites que descreve `LICENSE` e `license`.
- Retirar as frases de placeholder, de licença não escolhida e de `UNLICENSED`.
- Registrar que a licença é MIT.
- Manter a declaração `private: true` nesse registro.

## Out of Scope

- Reescrever as narrativas das emendas v1-A1 a v1-A27, a estrutura, os comandos ou os limites de `list`, `doctor` e da matriz K1–K8.
- `.ai/project.md`, `references/provenance.md` e `contracts/skill-contract.md`. Evidência: Non-goals e Open Questions da spec.
- `LICENSE`, `package.json`, `NOTICE`, `CONTRIBUTING` e os treze caminhos de fim de linha.
- Copiar o corpo da licença para o README.

## Dependencies

Nenhuma. Sem ciclo com os tickets 01 e 02.

## Implementation Notes

A troca fica no parágrafo atual da seção Limites. O restante do `README.md` permanece. `private: true` continua escrito. LAB-IT não ganha frase societária. Se o aviso aprovado não for necessário para os critérios 7 e 8, este ticket não o acrescenta.

## Acceptance Criteria

- `README.md` não contém as frases de que `LICENSE` é placeholder, de que nenhuma licença foi escolhida e de que `license` é `UNLICENSED`. Evidência: critério 7 da spec.
- `README.md` registra que a licença é MIT e continua a declarar `private: true`. Evidência: critério 8 da spec.
- As narrativas históricas do README permanecem. Evidência: o escopo da spec limita a mudança desse arquivo à descrição da licença.

## Validation

Leitura da seção Limites e diff do `README.md`. O diff não reescreve os parágrafos das emendas anteriores. `private: true` continua presente.

## Definition of Done

O parágrafo de licença registra MIT, não descreve ausência de licença nem `UNLICENSED`, mantém `private: true` e o restante histórico do README permanece.

## Title

04 — Conferência dos nove critérios e do escopo

## Goal

Conferir os nove critérios de `SPEC-20261022-005` e confirmar que a emenda alterou somente `LICENSE`, `package.json` e `README.md`.

## Context

Os critérios 1 a 3 nascem no ticket 01, os critérios 4 a 6 no ticket 02 e os critérios 7 e 8 no ticket 03. O critério 9 só pode passar depois desses três. A spec lista manifesto, contratos, ADR-0001 a ADR-0004, as 18 skills, R1–R17, a CLI, o validador e treze caminhos de fim de linha como intactos.

## Scope

- Reler `LICENSE` contra o texto oficial SPDX `MIT` e contra o aviso aprovado.
- Reler `package.json` quanto a `license`, `private`, `version` e os demais campos.
- Reler o parágrafo de licença do `README.md`.
- Confirmar que o diff desta emenda não inclui outro caminho.

## Out of Scope

- Nova alteração de cláusula, de campo ou de narrativa.
- Criar `NOTICE`, `CONTRIBUTING` ou relatório fora dos artefatos que `implement` já grava quando for executado.
- Publicar no npm, executar host, invocar `tdd` ou `docs` a partir deste conjunto.
- Alterar os treze caminhos:
  - `.ai/artifacts/documentation/2026-10-21-doctor-command.md`
  - `.ai/artifacts/handoffs/2026-10-18-list-v1-a22.md`
  - `.ai/artifacts/handoffs/2026-10-18-v1-a22-closed.md`
  - `.ai/artifacts/handoffs/2026-10-21-doctor-v1-a23.md`
  - `.ai/artifacts/implementation/2026-10-19-doctor-review-notes.md`
  - `.ai/artifacts/implementation/2026-10-19-doctor-ticket-02.md`
  - `.ai/artifacts/quality/2026-10-19-doctor-command.md`
  - `.ai/artifacts/reviews/2026-10-19-doctor-ticket-02.md`
  - `.ai/artifacts/reviews/2026-10-21-doctor-v1-a23.md`
  - `.ai/artifacts/tests/2026-10-19-doctor-edge-tdd.md`
  - `.ai/artifacts/tests/2026-10-19-doctor-review-notes.md`
  - `.ai/artifacts/tests/2026-10-19-doctor-ticket-02-tdd.md`
  - `.ai/artifacts/tests/2026-10-19-doctor-ticket-02.md`

## Dependencies

Tickets 01, 02 e 03. Sem ciclo.

## Implementation Notes

A conferência usa a tabela de rastreio deste conjunto. `git diff --ignore-cr-at-eol` nos treze caminhos continua vazio. O diff com conteúdo desta emenda fica em `LICENSE`, `package.json` e `README.md`. Não tratar `(LAB-IT)` como condição societária.

## Acceptance Criteria

- Os critérios 1, 2 e 3 da spec passam de novo na `LICENSE`. Evidência: ticket 01.
- Os critérios 4, 5 e 6 da spec passam de novo no `package.json`. Evidência: ticket 02.
- Os critérios 7 e 8 da spec passam de novo no `README.md`. Evidência: ticket 03.
- Manifesto, contratos, ADR-0001, ADR-0002, ADR-0003, ADR-0004, as 18 skills, R1–R17, a CLI, o validador e os treze caminhos permanecem sem mudança desta emenda. Evidência: critério 9 da spec.

## Validation

Leitura dos três arquivos contra os nove critérios. Diff limitado a `LICENSE`, `package.json` e `README.md`. Diff de fim de linha ignorado nos treze caminhos permanece vazio. Sem publicação e sem execução de host.

## Definition of Done

Os nove critérios têm ticket de origem, a conferência final os relê e o escopo da emenda é só `LICENSE`, `package.json` e `README.md`.

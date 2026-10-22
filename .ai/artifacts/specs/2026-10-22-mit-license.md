---
artifact: spec
id: SPEC-20261022-005
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261022-005
---

# Adoção da licença MIT — emenda v1-A28

## Problem

`LICENSE` é um placeholder. `package.json` declara `license` `UNLICENSED`. `README.md` diz que nenhuma licença foi escolhida. `DECISION-SET-20261022-005` versão 4 está `ready` e escolhe a licença MIT, com o aviso `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. Sem esta spec, a implementação teria de inventar o texto ou a lista de arquivos. Evidência: `LICENSE`, `package.json`, a seção Limites de `README.md` e `DECISION-SET-20261022-005` versão 4.

## Goal

Especificar a substituição futura do placeholder e da declaração `UNLICENSED` pela licença MIT, no escopo já decidido, sem aplicar a licença nesta spec.

## Scope

- `LICENSE` passa a ser a licença identificada pelo identificador SPDX `MIT`. A única informação do projeto nesse texto é o aviso aprovado `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`.
- Em `package.json`, o único campo alterado é `license`, de `UNLICENSED` para `MIT`.
- Em `README.md`, a descrição de ausência de licença sai e o texto passa a registrar a licença MIT. A declaração `private: true` permanece.
- A versão permanece `1.0.0-scaffold`.
- Esta spec não edita esses arquivos.

## Non-goals

- Publicar no npm, mudar `private` para `false` ou tratar a MIT como autorização de distribuição.
- Alterar manifesto, contratos, ADR-0001, ADR-0002, ADR-0003, ADR-0004, as 18 skills, R1–R17, a CLI ou o validador.
- Acrescentar skill, comando, target, dependência npm ou campo de frontmatter.
- Mudar `schemaVersion` ou `architectureVersion`.
- Narrar a v1-A28 em `.ai/project.md`, `references/provenance.md` ou `contracts/skill-contract.md`.
- Criar `NOTICE`, `CONTRIBUTING` ou campo `license` no frontmatter das skills.
- Inferir condição societária, titularidade ou natureza jurídica de LAB-IT além do texto aprovado.
- Reproduzir nesta spec o corpo da licença. O conjunto registra que a página SPDX não foi lida e que o corpo não é escolha do projeto.
- Alterar os treze caminhos que só diferem no fim de linha.
- Implementar a licença nesta spec. O conjunto autoriza `to-spec` e não autoriza `implement`.

## Actors

- Mantenedor, que aprovou a MIT e o aviso.
- Quem implementar depois confere `LICENSE` contra o texto oficial do identificador SPDX `MIT`. Esta spec não executa essa conferência.

## Functional Requirements

1. `LICENSE` deixa de ser o placeholder que começa com `LICENSE PLACEHOLDER` e que diz que nenhuma licença foi selecionada. Evidência: o arquivo atual e a decisão de substituir o placeholder.
2. `LICENSE` contém o aviso exatamente `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. Evidência: `DECISION-SET-20261022-005` versão 4.
3. Fora esse aviso, `LICENSE` reproduz o texto oficial da licença identificada por SPDX `MIT`, sem cláusula acrescentada e sem cláusula removida. O aviso aprovado ocupa o lugar do aviso de copyright desse texto. Evidência: a restrição do conjunto de que o corpo é a licença SPDX `MIT` sem modificação arbitrária de cláusula.
4. A conferência do corpo usa o texto oficial publicado para o identificador SPDX `MIT`. Memória, paráfrase ou outra licença não satisfazem o critério. Evidência: a mesma restrição e o pedido de conferência contra fonte oficial.
5. Em `package.json`, `license` passa de `UNLICENSED` para `MIT`. Nenhum outro campo desse arquivo muda. Evidência: a decisão de trocar somente a declaração `UNLICENSED` pelo identificador SPDX `MIT`, e o `package.json` atual.
6. `README.md` deixa de dizer que `LICENSE` é placeholder, que nenhuma licença foi escolhida e que `license` é `UNLICENSED`. Passa a registrar que a licença é MIT. Evidência: a decisão sobre `README.md` e a frase atual na seção Limites.
7. `README.md` continua a declarar `private: true`. Evidência: a decisão de preservar esse campo.

## Business Rules

- A licença desta emenda é a MIT. Outra licença não atende. Evidência: a escolha explícita no conjunto.
- O aviso aprovado é uma linha de copyright. LAB-IT faz parte dessa linha. A linha não é conclusão sobre sociedade, sócio ou titularidade jurídica de LAB-IT. Evidência: a decisão de que a aprovação é do texto e não acrescenta conclusão sobre a natureza jurídica de LAB-IT.
- `private: true` permanece. A MIT não autoriza publicação no npm. Evidência: a decisão que recusou mudar `private`.

## Non-functional Requirements

- Cada critério é verificável por leitura ou por comparação de arquivo, sem executar host e sem publicar pacote.
- O corpo de `LICENSE` só passa quando a diferença contra o texto oficial SPDX `MIT` é o aviso aprovado no lugar do aviso de copyright desse texto.
- Esta spec não copia o corpo. A comparação ocorre na implementação, contra a fonte oficial, não contra um texto memorizado aqui.

## Technical Constraints

- Arquivos autorizados na implementação futura: `LICENSE`, `package.json` e `README.md`.
- `package.json` conserva `version` `1.0.0-scaffold` e `private` `true`.
- `schemaVersion` e `architectureVersion` permanecem 1. O catálogo permanece em 18 skills `implemented`.
- Nenhuma dependência npm de produção é adicionada.
- Manifesto, contratos, CLI, validador e ADR-0001 a ADR-0004 permanecem.
- Os treze caminhos abaixo permanecem fora da alteração:
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

## Security / Privacy

- A mudança não abre publicação, não altera fronteira de segurança e não acrescenta comando.
- O aviso não é segredo. A spec reproduz somente o texto aprovado.
- Nenhuma condição societária de LAB-IT é inferida.

## Acceptance Criteria

1. `LICENSE` não contém `LICENSE PLACEHOLDER` nem `No license has been selected.`
2. `LICENSE` contém a linha exata `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`.
3. Comparada ao texto oficial da licença SPDX `MIT`, `LICENSE` não acrescenta cláusula e não remove cláusula. A única diferença admitida é esse aviso no lugar do aviso de copyright do texto oficial. Texto memorizado ou parafraseado falha.
4. `package.json` tem `license` igual a `MIT`.
5. `package.json` tem `private` igual a `true` e `version` igual a `1.0.0-scaffold`.
6. Nenhum outro campo de `package.json` muda.
7. `README.md` não contém as frases de que `LICENSE` é placeholder, de que nenhuma licença foi escolhida e de que `license` é `UNLICENSED`.
8. `README.md` registra que a licença é MIT e continua a declarar `private: true`.
9. Manifesto, contratos, ADR-0001, ADR-0002, ADR-0003, ADR-0004, as 18 skills, R1–R17, a CLI, o validador e os treze caminhos de fim de linha permanecem sem mudança desta emenda.

## Risks

- Gravar um texto de MIT de memória introduz cláusula que a fonte oficial não tem. O critério 3 exige a comparação com a fonte SPDX.
- Tratar `(LAB-IT)` como qualificação societária acrescenta decisão que o conjunto recusou.
- Incluir os treze caminhos de fim de linha, ou outro arquivo além dos três, alarga a emenda.
- Tratar esta spec como autorização de `implement` ou de publicação no npm aplica mudança que o conjunto não autorizou.

## Open Questions

Nenhuma questão bloqueante permanece.

- Quando `.ai/project.md`, `references/provenance.md` e `contracts/skill-contract.md` passam a narrar a v1-A28. Esses arquivos estão fora dos três caminhos. Esta spec não os altera.

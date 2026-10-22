---
artifact: spec
id: SPEC-20261022-008
version: 1
status: ready
created_by: to-spec
inputs:
  - DECISION-SET-20261022-008
---

# Asserção SPDX da licença MIT — emenda v1-A31

## Problem

`package.json` declara `license` `MIT`, `private` `true` e `version` `1.0.0-scaffold`. `LICENSE` tem o aviso `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)`. A suíte Node não confere esse estado. `npm test` executa só `tests/validate-skills.test.mjs` e `tests/distribute-skills.test.mjs`. `DECISION-SET-20261022-008` versão 2 está `ready` e escolhe o texto oficial SPDX `MIT` versionado como oráculo. Sem esta spec, a implementação teria de inventar a comparação, a lista de falhas ou os arquivos. Evidência: `package.json`, `LICENSE`, os dois módulos em `tests/` e `DECISION-SET-20261022-008` versão 2.

## Goal

Especificar a asserção determinística e offline que protege esse estado de licenciamento, sem implementar o teste nesta spec.

## Scope

- Um módulo novo em `tests/`, no padrão `tests/*.test.mjs` já usado pela suíte, diferente dos dois módulos atuais.
- Um arquivo versionado sob `tests/`, ao lado desse módulo, com os bytes do texto oficial SPDX `MIT`. O nome desse arquivo não é `LICENSE`.
- `package.json` muda só em `scripts.test`: a lista atual recebe o caminho do módulo novo no fim. Os dois caminhos atuais permanecem, nessa ordem.
- A asserção lê `LICENSE`, `package.json` e o template. O caso positivo é o conteúdo canônico desses arquivos. Cada cenário, positivo ou negativo, executa numa cópia temporária e não grava o repositório canônico.
- Esta spec não cria esses arquivos e não edita `package.json`.

## Non-goals

- Publicar no npm, renomear `1.0.0-scaffold` ou mudar `private`.
- Usar o hash `3520fb2f00d9a636d4d5af85339a116a865143f6807ab8db19dd78e7b8dc9ad1` como oráculo.
- Normalizar CRLF, LF, espaços, capitalização ou newline final.
- Alterar `LICENSE`, `README.md`, o manifesto, a CLI, `validate()`, contratos, as 18 skills, R1–R17 ou ADR-0001 a ADR-0004.
- Embutir a asserção em `tests/validate-skills.test.mjs` ou `tests/distribute-skills.test.mjs`.
- Acrescentar dependência npm, comando, skill, target ou roteamento.
- Implementar `sync`, `bootstrap`, desinstalação, instalação global, detecção de plataforma ou roteador automático.
- Apagar a frase `No SPDX assertion was added` ou narrar a v1-A31 em `.ai/project.md`, `contracts/skill-contract.md`, `references/provenance.md`, `references/validation-result.md` ou `.ai/architecture.md`.
- Reproduzir nesta spec o corpo da MIT. O oráculo é o arquivo cujo SHA-256 já foi decidido.
- Alterar os treze caminhos que só diferem no fim de linha.
- Implementar a asserção nesta spec. O conjunto autoriza `to-spec` e não autoriza `implement`.

## Actors

- Mantenedor, que aceitou o oráculo, as três falhas de `package.json` e o módulo separado.
- A suíte `npm test`, que passa a executar o módulo novo.
- Quem implementar depois grava o template e o módulo. Esta spec não os grava.

## Functional Requirements

1. O template versionado tem 1078 bytes e SHA-256 `b05785f9f18e6716bab63424b11454513b9943a222595b70411009202fc592b5`. A linha 3, contada a partir de 1, é `Copyright (c) <year> <copyright holders>`. Evidência: a decisão 1 e a reprodução registrada no conjunto.
2. A suíte calcula esse SHA-256 dos bytes do template antes de comparar `LICENSE`. Hash diferente falha como template, ainda que `LICENSE` esteja aprovado. Evidência: a decisão 1 e o caso negativo de template.
3. A comparação usa os bytes lidos. Não converte CRLF em LF, não remove CR, não aplica `trim`, não muda capitalização e não descarta newline final para ignorar a ausência dele. Não substitui o placeholder em todas as ocorrências. Evidência: a decisão 1.
4. `LICENSE` aprovado tem 18 linhas de conteúdo, newline final LF, nenhum byte CR, a linha 3 igual a `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)` e cada uma das outras dezessete linhas igual à linha de mesmo índice do template. Evidência: a decisão 1 e a leitura registrada no conjunto.
5. Linha 3 diferente falha como aviso, inclusive um espaço a mais, o placeholder deixado no lugar, outro ano ou outro nome. Linhas iguais no restante não escondem essa falha. Evidência: a decisão 1 e o caso negativo de aviso.
6. Palavra alterada numa linha que não é a 3 falha como corpo. Linha de conteúdo removida ou acrescentada falha. Evidência: a decisão 1 e os casos de corpo e de extensão.
7. CRLF, ou ausência do newline final, falha. A falha não é contornada por normalização. Evidência: a decisão 1.
8. `package.json` é lido com parse JSON. `license` precisa ser a string `MIT`. `private` precisa ser o booleano `true`. `version` precisa ser a string `1.0.0-scaffold`. Valor ausente, JSON inválido, `mit`, `MIT `, `UNLICENSED`, `Apache-2.0`, `private` `false` ou a string `true`, e outra `version`, falham como campo. Evidência: a decisão 2.
9. O caso positivo copia, sem alteração, o `LICENSE` canônico, o `package.json` canônico e o template canônico para um diretório temporário e passa. Cada caso negativo parte dessa cópia, aplica uma mutação e falha nomeando a classe `aviso`, `corpo`, `template`, `extensao` ou `campo`. O processo de teste não grava os três arquivos canônicos. Evidência: o conjunto e a instrução de cópia temporária desta spec.
10. `scripts.test` passa a ser `node --test tests/validate-skills.test.mjs tests/distribute-skills.test.mjs` seguido de um espaço e do caminho do módulo novo. Nenhum outro campo de `package.json` muda. `dependencies` permanece vazio. Evidência: a decisão 3 e o script atual.

## Business Rules

- A licença protegida é a MIT já adotada na v1-A28. Outro identificador SPDX não atende. Evidência: `DECISION-SET-20261022-005` versão 4 e a decisão 2.
- O aviso aprovado é uma linha. `(LAB-IT)` faz parte dessa linha. A asserção não conclui sociedade, sócio ou titularidade jurídica. Evidência: `DECISION-SET-20261022-005` versão 4.
- Falhar em `private` ou `version` protege o valor vigente. Não autoriza mudá-lo nem publicar no npm. Evidência: a decisão 2.
- A frase `No SPDX assertion was added` descreve a v1-A28 e o alinhamento da v1-A29. Esta emenda não a apaga. Evidência: `DECISION-SET-20261022-007` e o conjunto desta emenda.

## Non-functional Requirements

- A asserção é determinística e offline. Não baixa `license-list-data`, não consulta `spdx.org` e não abre rede. O hash é calculado no processo com a biblioteca cripto do Node. Evidência: a decisão 1 e `IMPL-20261022-005`, que registrou HTTP 403 em `spdx.org`.
- Nenhuma dependência npm é adicionada. O módulo usa o executor `node --test` já declarado em `package.json`. Evidência: `package.json` e a decisão 3.
- Cada falha nomeia uma classe observável: `aviso`, `corpo`, `template`, `extensao` ou `campo`. Evidência: o conjunto, que exige a classe nomeada.
- O diretório temporário é removido ao fim do cenário. O padrão já usado pela suíte é `mkdtemp` sob o temporário do sistema. Evidência: `tests/validate-skills.test.mjs` e `tests/distribute-skills.test.mjs`.

## Technical Constraints

- Arquivos autorizados na implementação futura: o módulo novo em `tests/`, o template novo em `tests/` e a linha `scripts.test` de `package.json`.
- `tests/validate-skills.test.mjs` e `tests/distribute-skills.test.mjs` permanecem.
- `LICENSE`, `README.md`, `manifest/skills.json`, `bin/ai-dev-skills.mjs`, `scripts/validate-skills.mjs`, `contracts/`, `skills/`, `contracts/routing.md` e `.ai/decisions/0001` a `0004` permanecem.
- R8 não se aplica: não há termo de negócio, invariante, transição, evento ou fronteira de contexto novos. R9 não se aplica: a CLI, `validate()` e as fronteiras das skills permanecem; o acréscimo em `scripts.test` já está decidido. Evidência: o conjunto e `contracts/routing.md`.
- Os treze caminhos abaixo permanecem fora da alteração. `git diff --ignore-cr-at-eol` neles fica vazio:
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

- A asserção não publica o pacote e não abre rede.
- O aviso de copyright não é segredo. Esta spec reproduz somente a linha aprovada e o placeholder oficial.
- Nenhuma condição societária de LAB-IT é inferida.

## Acceptance Criteria

1. O diff de conteúdo, ignorando fim de linha, contém só três caminhos: um módulo novo `tests/*.test.mjs`, um template novo sob `tests/` que não se chama `LICENSE`, e `package.json`. `LICENSE`, `README.md`, os dois módulos de teste já existentes, o manifesto, a CLI, o validador, contratos, skills, R1–R17 e ADR-0001 a ADR-0004 não aparecem.
2. Em `package.json`, o único trecho alterado é `scripts.test`. O valor fica `node --test tests/validate-skills.test.mjs tests/distribute-skills.test.mjs` mais um espaço e o caminho do módulo novo. `license`, `private`, `version` e os demais campos permanecem. `dependencies` permanece `{}`.
3. Os bytes do template têm comprimento 1078 e SHA-256 `b05785f9f18e6716bab63424b11454513b9943a222595b70411009202fc592b5`. Não contêm o byte `0x0D`, terminam com `0x0A` e a linha 3 é `Copyright (c) <year> <copyright holders>`.
4. O módulo confere esse hash antes da comparação com `LICENSE`. Um byte alterado no template, com `LICENSE` aprovado, falha com a classe `template`.
5. A comparação não converte fim de linha, não remove espaços, não muda capitalização e não ignora newline final. `LICENSE` canônico passa: 18 linhas de conteúdo, newline final, linha 3 igual a `Copyright (c) 2026 Paulo César Melo Bezerra (LAB-IT)` e as outras linhas iguais às do template.
6. Espaço extra na linha 3, placeholder no lugar do aviso, outro ano ou outro nome falham com a classe `aviso`.
7. Uma palavra alterada fora da linha 3 falha com a classe `corpo`. Linha removida ou linha extra falha com a classe `extensao`.
8. CRLF no lugar de LF, e newline final removido, falham com a classe `extensao`. Uma comparação que normalize esses casos não atende.
9. `license` diferente de `MIT`, campo ausente, `mit`, `MIT `, JSON inválido, `private` diferente do booleano `true` e `version` diferente de `1.0.0-scaffold` falham com a classe `campo`. A string `true` em `private` falha.
10. O caso positivo e cada caso negativo rodam numa cópia temporária. Ao terminar, os bytes canônicos de `LICENSE`, `package.json` e do template são os mesmos de antes da execução do teste.
11. O módulo novo não realiza I/O de rede. Nenhuma dependência npm é adicionada.
12. `references/provenance.md` e `references/validation-result.md` continuam contendo `No SPDX assertion was added`. Esses arquivos não entram no diff.
13. Os treze caminhos de Technical Constraints não entram no diff. `git diff --ignore-cr-at-eol` em cada um fica vazio.

Cobertura: o critério 3 cobre o template oficial; o 4, template adulterado; o 5, o positivo; o 6, aviso; o 7, corpo e linha extra ou ausente; o 8, CRLF e newline final; o 9, campo ausente, capitalização, JSON inválido e os três campos; os 10 e 11, cópia temporária e ausência de rede; os 1, 2, 12 e 13, o escopo.

## Risks

- Gravar uma paráfrase da MIT cujo hash não seja `b05785f9f18e6716bab63424b11454513b9943a222595b70411009202fc592b5`. O critério 3 rejeita esses bytes.
- Usar o hash do `LICENSE` substituído como oráculo. O critério 5 compara linhas com o template e o critério 3 fixa o outro hash.
- Normalizar CRLF ou newline final e fazer o critério 8 passar. O critério 8 exige a falha.
- Alterar `license`, `private` ou `version` ao editar `scripts.test`. O critério 2 rejeita outro campo.
- Apagar `No SPDX assertion was added` ao narrar a asserção. Os critérios 1 e 12 deixam esses registros fora do diff.
- Tratar a falha de `private` como autorização de publicação. A business rule recusa essa leitura.

## Open Questions

Nenhuma questão bloqueante permanece.

- O nome exato do módulo em `tests/` e o nome exato do template. Os critérios 1 e 2 já fixam o diretório, o sufixo `*.test.mjs`, a exclusão do nome `LICENSE` e o acréscimo no fim de `scripts.test`.
- Quando uma emenda posterior narrará `6e4173b` e a v1-A31. Esta spec não edita os registros.
- Qual contagem `npm test` mostrará depois da asserção. Esta spec não inventa esse número.

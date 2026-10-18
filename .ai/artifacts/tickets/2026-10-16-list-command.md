---
artifact: ticket_set
id: TICKET-SET-20261016-001
version: 1
status: ready
created_by: to-tickets
inputs:
  - SPEC-20261016-001
  - ARCHITECTURE-20261016-001
  - ADR-0003
---

# Comando list — emenda v1-A22

Conjunto executável derivado de `SPEC-20261016-001` e de `ARCHITECTURE-20261016-001`. Cada bloco é um TICKET. O Markdown local é a fonte. Nenhum ticket publica issue remota.

## Title

01 — Comando list, ajuda e testes da CLI

## Goal

Fazer `ai-dev-skills list` imprimir só o `name` de cada skill, na ordem do manifesto, e manter `doctor`, `sync` e `bootstrap` rejeitados.

## Context

`SPEC-20261016-001` define a stdout, a saída 0, a rejeição de opção e a linha de ajuda. `ARCHITECTURE-20261016-001` coloca o despacho em `bin/ai-dev-skills.mjs` e a asserção em `tests/validate-skills.test.mjs`. `ADR-0003` é a exceção só para esse comando. O mantenedor autorizou `implement` com `tdd` depois dos gates desta sessão.

## Scope

- Acrescentar `list` sem opção no despacho da CLI.
- Incluir `ai-dev-skills list` na ajuda.
- Separar `list` do teste que rejeita `bootstrap`, `doctor` e `sync`.
- Afirmar saída 0, os nomes na ordem de `manifest.skills` e saída 1 para `list --target cursor`.

## Out of Scope

- `doctor`, `sync`, desinstalação, instalação global, detecção de plataforma, roteador automático, `meta-skills/skill-authoring` e testes semânticos de overlap. Evidência: Non-goals da spec.
- Mudança de manifesto, targets, instalador, frontmatter ou dependência npm. Evidência: `ADR-0003`.
- Correção da fixture do README. Essa correção é anterior e independente.

## Dependencies

Nenhuma. A spec e o desenho já estão `ready`.

## Implementation Notes

Ler `manifest/skills.json` na raiz do pacote, a mesma de `validate` sem opções. Usar `console.log` por nome. Argumento ou opção permanece no parser atual. O ciclo pedido é vermelho, verde e refatoração. Não reescrever ADR `0001` nem ADR `0002`.

## Acceptance Criteria

- `node bin/ai-dev-skills.mjs list` termina com saída 0.
- A stdout é `skills[].name` na ordem do arquivo, uma por linha, sem outro texto. Evidência: critérios 1 e 2 da spec.
- `list --target cursor` termina com saída 1. Evidência: critério 3.
- `--help` contém `ai-dev-skills list`. Evidência: critério 4.
- `doctor`, `sync` e `bootstrap` terminam com saída 1. Evidência: critério 5.
- O comando não cria arquivo. Evidência: critério 6.

## Validation

`npm test` e `npm run validate` depois do verde. O vermelho fica registrado antes da mudança de `bin/ai-dev-skills.mjs`.

## Definition of Done

Os critérios acima passam na suíte e o relatório de implementação cita o working tree.

## Title

02 — Regressão de package e install nos quatro targets

## Goal

Mostrar que `list` não altera empacotamento nem instalação de Cursor, Codex, Antigravity e Claude Code.

## Context

O critério 7 da spec e a Validation Strategy de `ARCHITECTURE-20261016-001` exigem `package` e `install` em diretório temporário. O desenho não muda `scripts/distribute-skills.mjs` nem `targets/*.mjs`.

## Scope

- `package --target all` em diretório temporário.
- `install` e `validate --target` para `cursor`, `codex`, `antigravity` e `claude-code`.
- Remover o diretório temporário ao fim.

## Out of Scope

- Instalar no repositório, no Agent-Career ou num diretório global de skills.
- Lançar os quatro produtos.
- Mudança de código de distribuição.

## Dependencies

Ticket 01. Sem ciclo.

## Implementation Notes

Usar destino vazio fora do repositório. Cada target recebe a própria árvore. Codex e Antigravity compartilham o caminho relativo `.agents/skills`, não o mesmo destino.

## Acceptance Criteria

- Os quatro pacotes são gravados.
- Cada install copia 18 skills.
- Cada `validate --target` passa.
- O working tree do pacote não ganha arquivo desses destinos.

## Validation

Saída dos comandos da CLI e `git status` depois da remoção do temporário.

## Definition of Done

A evidência de teste registra os quatro PASS e o temporário removido.

## Title

03 — Revisão técnica do comando list

## Goal

Revisar a mudança do ticket 01 contra a spec, o ADR `0003` e a suíte, sem editar código.

## Context

R13 recomenda revisão para mudança não trivial de interface pública. O pedido desta sessão ordena `code-review` depois da implementação.

## Scope

- Conferir conformidade com `SPEC-20261016-001`.
- Conferir que a exceção de `ADR-0003` não cobre outro comando.
- Conferir testes, segurança e compatibilidade dos quatro targets.

## Out of Scope

- Nova funcionalidade.
- Edição de código durante a revisão.

## Dependencies

Tickets 01 e 02. Sem ciclo.

## Implementation Notes

A revisão lê o working tree. Achado sem evidência não entra no relatório.

## Acceptance Criteria

- Existe um relatório `ready` com veredito `PASS`, `PASS_WITH_NOTES`, `CHANGES_REQUIRED` ou `BLOCKED`.
- O veredito cita a stdout, a ajuda, a rejeição de `doctor`, `sync` e `bootstrap`, e a ausência de dependência npm.

## Validation

Leitura do diff de `bin/ai-dev-skills.mjs` e de `tests/validate-skills.test.mjs`, mais a evidência dos tickets 01 e 02.

## Definition of Done

O relatório está em `.ai/artifacts/reviews/` com `created_by` `code-review`.

## Title

04 — Narrar list na documentação permitida

## Goal

Atualizar a documentação que o contrato de `docs` permite escrever, para que ela descreva `list` já verificado.

## Context

R14 se aplica: `list` é comportamento visível da CLI. A spec deixa `README.md`, `.ai/project.md`, `contracts/skill-contract.md` e `references/provenance.md` fora da mudança de código. O pedido desta sessão pede `docs` depois da revisão. `.ai/config.json` define `docsPath` como `docs`.

## Scope

- Atualizar `README.md` na raiz, se o comportamento verificado divergir do texto atual.
- Gravar o `DOC_UPDATE` em `.ai/artifacts/documentation/`.

## Out of Scope

- Escrever `.ai/project.md`, contrato ou `references/provenance.md` se o contrato de `docs` impedir esses caminhos.
- Alterar a ajuda da CLI de novo. Ela pertence ao ticket 01.
- Documentar `doctor` ou `sync` como implementados.

## Dependencies

Ticket 03. Sem ciclo.

## Implementation Notes

Só afirmar o que a CLI e a suíte tiverem mostrado. Lacuna de caminho proibido fica em Known Documentation Gaps. Não apresentar desenho futuro como comportamento atual.

## Acceptance Criteria

- O `README.md` deixa de dizer que `list` está ausente e que a v1-A22 não está aberta para esse comando, se a implementação tiver passado.
- `doctor`, `sync` e as outras exclusões continuam descritos como ausentes.
- O identificador `1.0.0-scaffold` permanece.

## Validation

Leitura do README contra `node bin/ai-dev-skills.mjs list` e `--help`.

## Definition of Done

O `DOC_UPDATE` está `ready` e cita os arquivos alterados e os que o contrato não deixou alterar.

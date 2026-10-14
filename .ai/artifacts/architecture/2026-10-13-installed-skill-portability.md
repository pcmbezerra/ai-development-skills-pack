---
artifact: architecture_design
id: ARCHITECTURE-20261013-002
version: 1
status: ready
created_by: architecture-design
inputs:
  - DECISION-SET-20261013-009
  - RESEARCH-20261013-402
  - SPEC-20261013-009
---

## Context

O pacote instala dezoito diretórios de skill nos caminhos de projeto de Cursor, Codex, Gemini Antigravity e Claude Code. Cada `SKILL.md` aponta para contratos e para o manifesto por um relativo que só resolve na raiz deste repositório. A v1-A19 deixou essa portabilidade de fora e manteve a cópia byte a byte.

## Drivers

- Uma skill instalada precisa ser seguida sem este repositório.
- O mecanismo tem de ser o diretório documentado, não uma API privada.
- A duplicação fica no subconjunto que o contrato ou o `SKILL.md` realmente cita.
- Os quatro targets continuam recebendo o mesmo diretório.

## Existing Constraints

- Frontmatter limitado a `name` e `description`.
- Descritores de target só aceitam as chaves já validadas.
- Instalação explícita, idempotente e sem sobrescrita divergente.
- Igualdade de bytes entre a fonte canônica e o diretório instalado.
- CLI sem `list`, `doctor` ou `sync`.
- Zero dependências npm e Node.js >= 22.
- Categoria da fonte permanece em `skills/<categoria>/<nome>/`. O instalador continua achatando para `<projectSkillsPath>/<nome>/`.

## Proposed Design

A fonte canônica dos contratos não muda de lugar. Cada diretório de skill ganha a projeção que `SPEC-20261013-009` nomeia: `references/contract.md`, as cópias byte a byte citadas e os templates em `assets/`. Os links do `SKILL.md` passam a ser relativos internos. O instalador não transforma arquivo; ele já copia o diretório inteiro. O validador compara a projeção com a fonte e rejeita link que escape.

Não há modelo de domínio. A spec limita a mudança a layout de distribuição. R8 não se aplica.

## Components

- `contracts/skills/*.md`, `contracts/failure.md`, `contracts/quality-gates.md`, `contracts/artifacts.md`, `contracts/routing.md` e `templates/artifacts/*.md`: fonte canônica, sem segunda redação.
- `skills/<categoria>/<nome>/references/` e `assets/`: projeção instalável.
- `skills/**/SKILL.md`: links internos no lugar de `../../../contracts/` e `../../../manifest/skills.json`.
- `scripts/validate-skills.mjs`: checagem de escape e de deriva.
- `scripts/distribute-skills.mjs`: sem regra nova de cópia. O diretório maior entra na cópia que já existe.
- `references/catalogue.json` só em `workflow`: projeção do ciclo de vida e das dependências.
- `targets/*.mjs`: sem chave nova.

## Interfaces

O contrato externo novo é o conteúdo do diretório da skill. Goals, workflows, `primaryInvocation` e o campo `contract` do manifesto não mudam. A CLI conserva `validate`, `install` e `package`. O ADR desta decisão é `ADR-0002`. O ADR `0001` não muda.

## Data Flow

O mantenedor edita o contrato canônico ou o template. A projeção no diretório da skill é atualizada para continuar igual, com a transformação de link já nomeada. A validação lê as duas árvores. O instalador copia `skills/<categoria>/<nome>/` para `<destino>/<projectSkillsPath>/<nome>/`. O host, fora deste processo, lê esse diretório se o produto implementar o documento citado em `RESEARCH-20261013-402`.

## Data Model Impact

Nenhuma entidade de artefato muda. Não há schema novo. `workflow` ganha um JSON de catálogo que não é artefato do contrato de artefatos e não é persistido no projeto consumidor. Saídas apenas nomeadas continuam sem template.

## Security Impact

A projeção não carrega segredo, caminho `.cursor`, `.claude` ou `.agents`, nem concessão de ferramenta. O catálogo de `workflow` omite caminhos do pacote.

## Operational Impact

`npm run validate` e `npm test` passam a falhar se um link sair do diretório da skill ou se uma cópia divergir da fonte. Operadores continuam escolhendo o target no `install`. O diretório instalado fica maior na ordem estimada em `SPEC-20261013-009`. Descoberta ao vivo e abertura ao vivo dos arquivos de apoio continuam não verificadas.

## Trade-offs

Cópia seletiva dentro do diretório repete `routing.md` nas skills que citam regra e evita repetir o manifesto e o contrato compartilhado. Uma cópia única fora do diretório economizaria bytes e deixaria o link dependente de uma profundidade que a instalação não preserva. Manter a igualdade de bytes impede o instalador de ajustar o caminho na hora.

## Risks

Deriva se a projeção for editada à mão e o validador não comparar o arquivo. Regra que viva só no contrato compartilhado não acompanha a skill. O Antigravity exemplifica `resources/` e esta projeção usa `references/` e `assets/`, que são os nomes da especificação. Um host pode ignorar o arquivo mesmo com o link válido. Cursor pode continuar listando a mesma skill duas vezes se `.cursor/skills` e `.agents/skills` estiverem ambos instalados.

## Validation Strategy

A suíte Node cobre o catálogo positivo, a rejeição de link que escapa e a rejeição de byte diferente da fonte. Um teste de `install` usa um destino sem `contracts/` e sem `manifest/` e percorre os links dos quatro targets. `validate --target` continua provando o layout por igualdade de bytes. Não há cenário que finja execução de Cursor, Codex, Antigravity ou Claude Code.

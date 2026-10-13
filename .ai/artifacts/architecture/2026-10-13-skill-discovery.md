---
artifact: architecture_design
id: ARCHITECTURE-20261013-001
version: 1
status: ready
created_by: architecture-design
inputs:
  - DECISION-SET-20261013-008
  - RESEARCH-20261013-401
  - SPEC-20261013-008
---

## Context

O pacote instala dezoito diretórios de skill nos caminhos de projeto de Cursor, Codex, Gemini Antigravity e Claude Code. Os hosts documentam a descoberta desses diretórios. As descrições curtas não diziam quando usar a skill. Não existe roteador no pacote.

## Drivers

- Reduzir configuração manual além do `install` explícito.
- Usar só o mecanismo que os quatro documentos públicos descrevem.
- Preservar a skill como workflow executado pelo agente.
- Não certificar produto que esta sessão não executou.

## Existing Constraints

- Frontmatter limitado a `name` e `description`.
- Descritores de target só aceitam as chaves já validadas.
- Instalação explícita, idempotente e sem sobrescrita divergente.
- CLI sem `list`, `doctor` ou `sync`.
- Zero dependências npm e Node.js >= 22.
- Igualdade de bytes entre a fonte canônica e o diretório instalado.

## Proposed Design

A superfície de descoberta é o próprio `SKILL.md` instalado. A `description` do manifest e a do frontmatter continuam iguais e passam a incluir o trabalho e a cláusula `Use when`. O validador aplica o orçamento de 240 caracteres e a presença de `Use when`. O instalador não ganha transformação, índice nem arquivo específico de host.

## Components

- `manifest/skills.json`: descrição de descoberta de cada skill.
- `skills/**/SKILL.md`: o mesmo texto no frontmatter.
- `scripts/validate-skills.mjs`: regras de orçamento e de cláusula de uso.
- `scripts/distribute-skills.mjs`: sem mudança de comportamento.
- `targets/*.mjs`: sem chave nova.

## Interfaces

O contrato externo novo é a frase de descoberta. Goals, workflows e `primaryInvocation` não mudam. A CLI conserva `validate`, `install` e `package`.

## Data Flow

O manifest é a fonte da descrição. A validação compara o frontmatter com o manifest. O instalador copia o diretório da skill para `<destino>/<projectSkillsPath>/<nome>/`. O host, fora deste processo, lê esse `SKILL.md` se o produto implementar o documento citado em `RESEARCH-20261013-401`.

## Data Model Impact

Nenhuma entidade de negócio muda. O campo `description` continua string. Não há schema de artefato novo.

## Security Impact

A descrição não carrega segredo, caminho de instalação nem instrução de ferramenta. Não há concessão `allowed-tools`.

## Operational Impact

`npm run validate` e `npm test` passam a falhar se uma descrição perder a cláusula de uso ou passar de 240 caracteres. Operadores continuam escolhendo o target no `install`. Descoberta ao vivo continua não verificada.

## Trade-offs

Descrições mais específicas melhoram a seleção implícita e aumentam o texto da lista inicial. O orçamento de 240 deixa margem para dezoito skills e recusa texto longo demais para o teto publicado do Codex. Não medir o formato da lista deixa o orçamento como política, não como fato do produto.

## Risks

Links de contrato quebrados no projeto consumidor. Duplicidade se Cursor enxergar `.cursor/skills` e `.agents/skills` ao mesmo tempo. Um host pode ignorar a skill por orçamento de contexto mesmo com a descrição válida.

## Validation Strategy

A suíte Node cobre o catálogo positivo e duas rejeições: descrição sem `Use when` e descrição acima de 240 caracteres. `validate --target` continua provando o layout instalado por igualdade de bytes. Não há cenário que finja execução de Cursor, Codex, Antigravity ou Claude Code.

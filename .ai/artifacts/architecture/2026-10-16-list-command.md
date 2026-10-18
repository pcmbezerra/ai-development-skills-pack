---
artifact: architecture_design
id: ARCHITECTURE-20261016-001
version: 1
status: ready
created_by: architecture-design
inputs:
  - SPEC-20261016-001
  - DECISION-SET-20261016-001
  - RESEARCH-20261016-404
---

## Context

A CLI em `bin/ai-dev-skills.mjs` implementa `validate`, `install`, `package` e `--help`. `list` termina com saída 1. A seção 21 de `references/architecture-contract-v1.md` determina que o manifesto conduz `list`. `SPEC-20261016-001` limita a v1-A22 a esse comando. Não há modelo de domínio: a spec declara que R8 não se aplica. `RESEARCH-20261016-404` está `ready` e a spec não adota recomendação dele como requisito de `list`.

## Drivers

- O mantenedor precisa ver os nomes do catálogo sem abrir `manifest/skills.json`.
- A interface nova é pública e fica na CLI já existente.
- Os quatro targets continuam recebendo o mesmo diretório, sem caminho novo.

## Existing Constraints

- Dezoito skills, frontmatter `name` e `description`, zero dependências npm, Node.js >= 22.
- `install` exige destino explícito, é idempotente quando o conteúdo é idêntico e recusa skill divergente. Evidência: `scripts/distribute-skills.mjs`.
- Cursor usa `.cursor/skills`. Codex e Antigravity usam `.agents/skills`. Claude Code usa `.claude/skills`.
- ADR `0002` proíbe acrescentar comando de CLI, chave de target, dependência npm e campo de frontmatter. A spec registra a exceção somente para `list` e proíbe reescrever ADR `0001` e ADR `0002`.
- `.ai/project.md` ainda contém a exclusão de 2026-10-15. `DECISION-SET-20261016-001` versão 3 é a revisão posterior, limitada a `list`. Esta execução não reabre essa questão e não reescreve `.ai/project.md`.
- A spec deixa de fora `doctor`, `sync`, desinstalação, instalação global, detecção de plataforma, roteador automático, `meta-skills/skill-authoring` e testes semânticos de overlap.

## Proposed Design

`list` entra no despacho de `bin/ai-dev-skills.mjs`. Sem argumentos, lê `manifest/skills.json` pela mesma raiz que `validate` sem opções usa, percorre `skills` na ordem do array e escreve cada `name` com `console.log`. Não chama `install`, `package` nem `validateTarget`. Argumento ou opção cai no parser já existente e termina com saída 1. A constante `HELP` ganha a linha `ai-dev-skills list`. `doctor`, `sync` e `bootstrap` continuam no ramo de comando não suportado.

O teste que hoje rejeita `list` passa a exigir saída 0 e a stdout dos nomes. `doctor`, `sync` e `bootstrap` permanecem com saída 1.

Não há modelo de domínio. R9 se aplica porque o comando é interface pública. A decisão durável já está em `SPEC-20261016-001` e produz `ADR-0003`. ADR `0001` e ADR `0002` não são editados.

## Components

- `bin/ai-dev-skills.mjs`: despacho e ajuda.
- `manifest/skills.json`: fonte lida, sem mudança de esquema.
- `tests/validate-skills.test.mjs`: asserção de `list` separada da rejeição de `doctor`, `sync` e `bootstrap`.
- `scripts/distribute-skills.mjs` e `targets/*.mjs`: sem regra nova.

## Interfaces

`ai-dev-skills list` não aceita opção. Sucesso: saída 0 e uma linha por `skills[].name`, somente o nome. Falha de argumento ou opção: saída 1. `--help`, `help` e `-h` continuam com saída 0 e passam a conter `ai-dev-skills list`. `validate`, `install` e `package` conservam opções e efeitos. Nenhum target ganha chave. `primaryInvocation` não vira flag.

## Data Flow

O processo lê o JSON do manifesto na raiz do pacote. Emite os nomes na stdout. Não escreve arquivo, não copia diretório e não consulta diretório instalado. O host de destino não participa.

## Data Model Impact

Nenhum. A spec não altera esquema do manifesto, frontmatter, artefato nem descritor de target. A ausência está em `SPEC-20261016-001`, Non-goals.

## Security Impact

`list` não lê segredo, credencial, variável de ambiente nem caminho fora do repositório. A stdout contém só nomes de skill. Evidência: Security / Privacy da spec.

## Operational Impact

Os quatro targets permanecem compatíveis porque o comando não escolhe target e não muda o diretório instalado. `package` e `install` continuam sendo o caminho de distribuição. A ajuda da CLI muda. `README.md`, `.ai/project.md`, `contracts/skill-contract.md` e `references/provenance.md` ficam para a skill `docs`, fora dos arquivos deste desenho. A spec registra que a execução da implementação estava condicionada a autorização posterior. O pedido desta sessão autoriza `implement` somente depois dos gates e somente para `list`. Este desenho não aplica essa mudança.

## Trade-offs

Uma linha só com `name` é menor do que incluir `status`, `category`, `primaryInvocation` e `path`. A spec rejeita essas colunas. Não aceitar `--target` evita tratar Codex e Antigravity como destinos diferentes no mesmo path `.agents/skills`. Manter `doctor` e `sync` rejeitados preserva a exceção de ADR `0002` num único comando.

## Risks

- O teste atual exige saída 1 para `list`. Separar esse caso de `doctor`, `sync` e `bootstrap` é obrigatório. Liberar os três comandos sai do escopo.
- As oito falhas de fixture citadas na spec vêm do `README.md` e não deste comando. A spec as deixa fora da v1-A22.
- Quem ler só `.ai/project.md` ou `contracts/skill-contract.md` ainda vê `list` como ausente até a documentação posterior.

## Validation Strategy

Confirmar saída 0, dezoito nomes na ordem do manifesto, rejeição de `list --target cursor`, ajuda com `ai-dev-skills list`, e saída 1 para `doctor`, `sync` e `bootstrap`. Repetir `package` e `install` em diretório temporário para os quatro targets, com `validate --target` em cada um. Não lançar os produtos. Não acrescentar dependência npm.

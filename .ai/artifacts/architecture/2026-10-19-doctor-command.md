---
artifact: architecture_design
id: ARCHITECTURE-20261019-001
version: 1
status: ready
created_by: architecture-design
inputs:
  - SPEC-20261019-001
  - DECISION-SET-20261019-001
---

## Context

A CLI em `bin/ai-dev-skills.mjs` implementa `validate`, `install`, `package`, `list` e `--help`. `doctor` termina com saída 1. `SPEC-20261019-001` limita a v1-A23 a verificar Node.js `>=22` no processo que executa a CLI e a disponibilidade do executável `git` no `PATH`. Não há modelo de domínio: a spec declara que R8 não se aplica. Não há relatório de pesquisa consumido. `.ai/project.md` e `.ai/architecture.md` existem e ainda descrevem `doctor` como ausente. Esta execução não os reescreve.

## Drivers

- O mantenedor precisa saber se o runtime do processo atende Node.js `>=22` e se o executável Git está disponível, sem repetir `validate`.
- A interface nova é pública e fica na CLI já existente. R9 se aplica.
- A exceção a ADR `0002` já está registrada na spec, com alternativas e consequências, e produz um ADR novo sem editar ADR `0001`, ADR `0002` nem ADR `0003`.

## Existing Constraints

- Dezoito skills, frontmatter `name` e `description`, zero dependências npm, Node.js `>=22`. Evidência: `package.json` e `SPEC-20261019-001`.
- `validate` sem opção lê a fonte canônica. `validate --target --path` compara a instalação no destino explícito. `doctor` não chama nenhuma das duas. Evidência: `scripts/validate-skills.mjs`, `scripts/distribute-skills.mjs` e a spec.
- ADR `0002` proíbe acrescentar comando de CLI. ADR `0003` abre exceção só para `list`. A spec registra a exceção somente para `doctor` e proíbe reescrever os três ADRs.
- O comando não aceita opção, não grava arquivo, não usa a rede, não executa `git` e não exige repositório. Evidência: `SPEC-20261019-001`.
- `.ai/project.md` ainda contém a exclusão de 2026-10-15, revista para `list` na v1-A22 e para a análise de `doctor` em `DECISION-SET-20261019-001` versão 2. Esta execução não reabre essa narrativa.
- A spec deixa de fora `sync`, `bootstrap` na CLI, desinstalação, instalação global, detecção de plataforma, localização de instalações, roteador automático, `meta-skills/skill-authoring`, testes semânticos de overlap e a renomeação de `1.0.0-scaffold`.

## Proposed Design

`doctor` entra no despacho de `bin/ai-dev-skills.mjs`, no mesmo ponto em que `list` já desvia antes do ramo de comando não suportado. Sem argumentos, `requireOnly` recebe a lista vazia. O ramo calcula as duas linhas, escreve as duas com `console.log` e, se alguma for falha, atribui `process.exitCode = 1` sem lançar erro. Lançar erro cairia no `catch` já existente e escreveria `ERROR:` na stderr, o que a spec proíbe nos caminhos de diagnóstico.

A linha de Node usa `process.versions.node`. Passa quando o primeiro número é inteiro e maior ou igual a 22. Ausência desse número é falha. A comparação é função pura da string, para o teste fornecer `21.9.9`, `22.0.0` e `23.1.0` sem outro binário Node.js.

A linha de Git consulta o `PATH` do processo. O separador é `path.delimiter` de `node:path`. Cada segmento é unido ao nome `git`. A verificação passa só quando a entrada é arquivo e o modo tem bit de execução. Não há `child_process`, não há execução de `git`, não há leitura de `PATHEXT` e não há segundo nome `git.exe`. Qualquer lançamento da observação vira `git fail`, e a linha de Node continua presente. A API concreta de `stat` permanece a questão aberta da spec e não muda a interface.

Argumento ou opção continua no parser já existente e termina com saída 1 e `ERROR:` na stderr, antes das duas linhas. A constante `HELP` ganha a linha `ai-dev-skills doctor`. `sync` e `bootstrap` continuam no ramo de comando não suportado.

O módulo só executa `main` quando o arquivo é a entrada do processo, no mesmo guarda de `scripts/validate-skills.mjs`. Assim o teste importa a comparação de versão e a observação de Git sem disparar a CLI. O campo `bin` de `package.json` não muda.

Não há modelo de domínio. A decisão durável já está em `SPEC-20261019-001` e produz `ADR-0004`. ADR `0001`, ADR `0002` e ADR `0003` não são editados. Esta execução não implementa o comando.

## Components

- `bin/ai-dev-skills.mjs`: despacho, ajuda, comparação de versão e observação de `git` no `PATH`.
- `tests/validate-skills.test.mjs`: o teste que hoje rejeita `doctor` passa a cobrir as duas linhas, os códigos de saída, o `PATH` controlado e a rejeição de opção. `sync` e `bootstrap` permanecem com saída 1.
- `scripts/validate-skills.mjs` e `scripts/distribute-skills.mjs`: sem chamada nova a partir de `doctor`.
- `manifest/skills.json`, `targets/*.mjs` e `package.json`: sem regra nova.

## Interfaces

`ai-dev-skills doctor` não aceita opção. Sucesso: saída 0, stderr vazia, stdout `node pass <versão>` e `git pass`. Falha de Node, de Git ou das duas: saída 1, stderr vazia, as duas linhas sempre presentes, com `fail` na que não passou. `<versão>` é o texto de `process.versions.node`. Opção ou argumento: saída 1, stderr com `ERROR:`, sem as duas linhas. `--help`, `help` e `-h` continuam com saída 0 e passam a conter `ai-dev-skills doctor`. `validate`, `install`, `package` e `list` conservam opções e efeitos. Nenhum target ganha chave.

## Data Flow

O processo lê a própria versão e o `PATH`. Resolve entradas de nome `git` só em memória, com `node:fs` e `node:path`. Emite duas linhas na stdout. Não escreve arquivo, não abre socket e não consulta diretório de skill instalada. O host de destino não participa.

## Data Model Impact

Nenhum. A spec não altera esquema do manifesto, frontmatter, artefato nem descritor de target. A ausência está em `SPEC-20261019-001`, Non-goals.

## Security Impact

O ramo não imprime `PATH`, diretório pessoal, variável de ambiente nem o objeto do erro. Não grava arquivo, não usa a rede e não executa `git`. Evidência: Security / Privacy de `SPEC-20261019-001`.

## Operational Impact

Os quatro targets permanecem compatíveis porque o comando não escolhe target e não muda o diretório instalado. `package` e `install` continuam sendo o caminho de distribuição. A ajuda da CLI muda numa implementação futura. `.ai/project.md` e `.ai/architecture.md` ficam fora dos arquivos deste desenho. A spec não autoriza `implement`. Este desenho autoriza `to-tickets` e não aplica a mudança.

## Trade-offs

Duas linhas fixas são menores do que um relatório livre. A spec as fixou para o critério ser testável. Não executar `git` evita rede e repositório, e deixa de provar que o binário responde a `--version`. Procurar só o nome `git` cumpre a spec e não acrescenta `git.exe`. Usar `path.delimiter` separa segmentos do `PATH`. Isso não é a detecção de plataforma excluída, que escolhe host ou diretório de instalação. O guarda de entrada permite testar a versão `21.9.9` sem outro Node.js. Uma variável de ambiente para simular a versão não entra, porque a spec não a autoriza.

## Risks

- O teste atual exige saída 1 e `ERROR:` para `doctor`. A implementação que não separar `doctor` de `sync` e `bootstrap` libera comando fora de escopo ou deixa a suíte vermelha.
- Tratar falha de Git com `throw` escreve `ERROR:` e pode omitir a linha de Node. A spec exige as duas linhas e stderr vazia.
- No Windows, o bit de execução visto por `node:fs` não é o mesmo sinal do POSIX, e o arquivo instalado costuma chamar-se `git.exe`. Aceitar `git.exe` ou `PATHEXT` ampliaria o nome decidido na spec. Esta arquitetura não cria essa exceção. Os testes controlam um `PATH` com um arquivo de nome `git`.
- Quem ler só `.ai/project.md` ainda vê `doctor` como exclusão até a documentação posterior.

## Validation Strategy

Confirmar saída 0 com as duas linhas `pass` quando a versão do processo passa e o `PATH` do teste contém um executável de nome `git`. Confirmar a regra pura com `21.9.9`, `22.0.0` e `23.1.0`. Confirmar `git fail` com `PATH` sem esse executável, com arquivo não executável e com observação que lança erro, sempre conservando a linha de Node e a stderr vazia. Confirmar saída 1 e `ERROR:` para `doctor --target cursor`, sem as duas linhas. Confirmar `ai-dev-skills doctor` na ajuda, saída 1 para `sync` e `bootstrap`, e `list` com os 18 nomes. Não chamar `validate` nem `validateTarget` a partir de `doctor`. Não acrescentar dependência npm. Não lançar os quatro produtos.

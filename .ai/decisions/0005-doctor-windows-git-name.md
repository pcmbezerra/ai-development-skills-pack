---
artifact: adr
id: ADR-0005
version: 1
status: ready
created_by: architecture-design
inputs:
  - ADR-0004
  - amendment-v1-A33
---

## Context

ADR `0004` registra o comando `doctor` da v1-A23. Esse registro exige um arquivo regular chamado `git` com o bit POSIX `0o111` e recusa `git.exe` e `PATHEXT`. No Windows, `stat` não expõe esse bit: arquivo comum e `git.exe` ficam sem `0o111`. O bit `0o222` indica escrita, não execução. Usá-lo aceitaria um arquivo comum chamado `git`. A emenda v1-A33 revisa somente esse reconhecimento.

## Decision

No Unix, Linux e macOS, `doctor` continua passando quando resolve um arquivo regular chamado `git` com algum bit `0o111`. No Windows, `doctor` passa somente quando resolve um arquivo regular chamado `git.exe` no `PATH`. Nesse sistema o modo do arquivo não prova execução: o arquivo regular com esse nome passa, inclusive quando o bit de escrita está ausente. O Windows não reconhece `git`, `git.cmd` nem `git.bat`. O comando não lê `PATHEXT` e não executa `git`.

`ENOENT` continua significando ausência, e a busca segue para o próximo segmento. Qualquer outro erro da observação continua virando `git fail`. No Windows, um segmento de `PATH` que é arquivo produz `ENOENT` para o nome procurado; a saída permanece `git fail`, com stderr vazia. Saída, códigos de retorno e as demais restrições de ADR `0004` permanecem. ADR `0004` não é reescrito.

## Alternatives

Tratar `0o222` como sinal de execução no Windows. Rejeitada: o bit é de escrita e produz falso positivo para um arquivo chamado `git`.

Ler `PATHEXT` ou aceitar `git`, `git.cmd` e `git.bat` no Windows. Rejeitada: o nome aceito nesse sistema é somente `git.exe`.

Executar `git`. Rejeitada por ADR `0004`.

## Consequences

`observeGit` em `bin/ai-dev-skills.mjs` escolhe o nome pela plataforma e, no Windows, não consulta o modo. Os testes positivos usam `git` executável no Unix e `git.exe` no Windows. Um `git.exe` somente leitura passa no Windows. `git`, `git.cmd` e `git.bat` falham no Windows. `git.exe` continua falhando no Unix. Manifesto, targets, catálogo de 18 skills, dependências npm e o workflow de CI não mudam. Esta escolha de nome não é detecção de target nem a detecção de plataforma excluída do produto. A suíte local não homologa o GitHub Actions nem conclui a P0.1.

## Constraints for AI Agents

Não reescrever ADR `0004`. Não usar `0o222` nem ler `PATHEXT`. Não aceitar `git`, `git.cmd` ou `git.bat` no Windows. Não aceitar `git.exe` no Unix. Não executar `git`. Não acrescentar comando, dependência npm, chave de target ou skill. Não tratar teste local como aceite da P0.1.

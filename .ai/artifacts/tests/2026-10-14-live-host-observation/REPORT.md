---
artifact: test_evidence
id: TEST-20261014-002
version: 1
status: ready
created_by: handoff
inputs:
  - SPEC-20261014-001
  - TICKET-SET-20261014-001
  - TEST-20261014-001
---

# Relatório da v1-A21

Veredito: `INCOMPLETE`.

Nenhum host foi executado. O veredito não aprova e não reprova descoberta, descrição, seleção, invocação ou abertura de arquivo.

Baseline conferida nesta sessão: `b86f41d`, 18 skills `implemented`, suíte 53/53 em Linux 6.12.94+ com Node.js v22.14.0 e npm 10.9.9. `npm run validate` e `npm run skills:validate` passaram depois dos installs externos. `git diff` não mostra `skills/`, `contracts/`, `manifest/`, `scripts/`, `targets/`, `bin/` nem `package.json`.

## Evidência por host

| Host | Lançamento | Layout instalado | Sessão no produto |
| --- | --- | --- | --- |
| Cursor | `NOT_RUN`, `cursor` e `agent` saída 127 | 18 skills em `.cursor/skills`, validate PASS | nenhuma |
| Codex | `NOT_RUN`, `codex` saída 127 | 18 skills em `.agents/skills`, validate PASS | nenhuma |
| Antigravity | `NOT_RUN` em app, CLI e IDE | 18 skills em `.agents/skills`, árvore separada da do Codex, validate PASS | nenhuma |
| Claude Code | `NOT_RUN`, `claude` saída 127 | 18 skills em `.claude/skills`, validate PASS | nenhuma |

Detalhe em `environment.md` e nas matrizes `cursor/matrix.md`, `codex/matrix.md`, `antigravity/matrix.md` e `claude-code/matrix.md`.

## Gates

Para os quatro hosts, as seis gates ficaram `NOT_RUN`: descoberta, descrição, seleção automática, invocação explícita, `references/` e `assets/`. Nenhuma gate ficou `PASS`, `FAIL` ou `INCONCLUSIVE`.

`N/A` de `assets/` para `context-engineering` e `workflow` também não foi avaliado, porque a sonda não rodou.

## Diferenças observadas entre os hosts

Nenhuma diferença de comportamento foi observada. Os quatro produtos não abriram.

Fato de documentação, relido em 2026-10-14 e não reexecutado aqui: os caminhos de install diferem, o Codex documenta encurtamento de descrição, o Claude Code documenta descarte de descrição acima de 1% da janela, e o Antigravity documenta a pasta `resources/`. Essas frases continuam hipótese de comportamento até uma sessão existir.

## Fatos

- Os comandos `cursor`, `agent`, `codex`, `claude`, `agy`, `antigravity` e `gemini` não estão no PATH e saíram 127.
- As raízes de usuário documentadas para os 18 nomes estão ausentes, salvo `/home/ubuntu/.cursor/skills-cursor`, cuja interseção com o pacote é vazia.
- O install e o `validate --target` passaram nos quatro consumidores fora do pacote.
- A suíte do pacote permanece 53/53.
- Nenhum arquivo de skill, contrato, target ou CLI foi editado.

## Hipóteses

- Uma máquina com o binário no PATH pode listar as 18 skills a partir desses consumidores.
- O orçamento do Codex ou do Claude Code pode cortar `Use when`.
- O Antigravity pode ou não abrir `references/` e `assets/`.
- O agente de nuvem desta sessão, se apontado para um workspace que já contivesse `.cursor/skills`, poderia ver as skills. Esta sessão não fez esse teste. O workspace do pacote não contém essa pasta.

Nenhuma hipótese acima entra como resultado.

## Resultados NOT_RUN

Cursor, Codex, Antigravity (app, CLI e IDE) e Claude Code. A checagem está em `environment.md`.

## Recomendações para a v1-A22

1. Não abrir a v1-A22 como correção de skill, descrição, pasta, contrato, target ou CLI. Esta execução não produziu `FAIL`.
2. Manter a v1-A21 como a emenda de observação. Repetir os tickets 02 a 05 numa máquina em que o produto saia de 127, reutilizando `SPEC-20261014-001`.
3. Só criar a v1-A22 depois de uma gate `FAIL` registrada com transcript. O escopo dessa emenda futura deve ser o achado citado, não uma hipótese desta lista.
4. Enquanto o veredito for `INCOMPLETE`, o pacote permanece o de `b86f41d` mais este registro.

## Limitações da coleta

Não há transcript, captura de lista nem leitura de ferramenta de `references/` ou `assets/` por um produto. O validate do consumidor não substitui essa leitura. Os diretórios em `/tmp/v1-a21-consumers` não estão no Git; os comandos em `environment.md` os recriam.

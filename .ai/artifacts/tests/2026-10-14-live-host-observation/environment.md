---
artifact: test_evidence
id: TEST-20261014-001
version: 1
status: ready
created_by: handoff
inputs:
  - SPEC-20261014-001
  - TICKET-SET-20261014-001
---

# Ambiente da observação — ticket 01

Data: 2026-10-14. Baseline do pacote: `b86f41d`. Máquina: Linux 6.12.94+ x86_64. `node` resolvido em `/exec-daemon/node`, versão v22.14.0. npm 10.9.9.

O caminho real de `/tmp/v1-a21-consumers` não está dentro de `/workspace` e `/workspace` não está dentro dele.

## Fatos

Cada destino é um repositório Git sem `contracts/` e sem `manifest/`. O install usou a CLI já existente. `validate --target` conferiu os bytes contra a fonte canônica. Isso prova o layout instalado. Não prova que um host listou a skill.

| Host | Destino | Install | Validate | SKILL.md |
| --- | --- | --- | --- | --- |
| cursor | `/tmp/v1-a21-consumers/cursor` | `PASS: cursor; 18 installed, 0 unchanged at /tmp/v1-a21-consumers/cursor/.cursor/skills.` saída 0 | `PASS: cursor; 18 canonical skills validated at /tmp/v1-a21-consumers/cursor.` saída 0 | 18 |
| codex | `/tmp/v1-a21-consumers/codex` | `PASS: codex; 18 installed, 0 unchanged at /tmp/v1-a21-consumers/codex/.agents/skills.` saída 0 | `PASS: codex; 18 canonical skills validated` saída 0 | 18 |
| antigravity | `/tmp/v1-a21-consumers/antigravity` | `PASS: antigravity; 18 installed, 0 unchanged at /tmp/v1-a21-consumers/antigravity/.agents/skills.` saída 0 | `PASS: antigravity; 18 canonical skills validated` saída 0 | 18 |
| claude-code | `/tmp/v1-a21-consumers/claude-code` | `PASS: claude-code; 18 installed, 0 unchanged at /tmp/v1-a21-consumers/claude-code/.claude/skills.` saída 0 | `PASS: claude-code; 18 canonical skills validated` saída 0 | 18 |

Comandos:

```sh
node bin/ai-dev-skills.mjs install --target <target> --destination /tmp/v1-a21-consumers/<target>
node bin/ai-dev-skills.mjs validate --target <target> --path /tmp/v1-a21-consumers/<target>
```

## Pré-checagem dos 18 nomes

Nenhum dos 18 nomes do manifesto apareceu nestes diretórios:

| Caminho | Estado |
| --- | --- |
| `/home/ubuntu/.cursor/skills` | ausente |
| `/home/ubuntu/.agents/skills` | ausente |
| `/home/ubuntu/.codex/skills` | ausente |
| `/home/ubuntu/.claude/skills` | ausente |
| `/home/ubuntu/.gemini/config/skills` | ausente |
| `/home/ubuntu/.gemini/antigravity-cli/skills` | ausente |
| `/home/ubuntu/.gemini/antigravity/skills` | ausente |
| `/etc/codex/skills` | ausente |
| `/workspace/.cursor` | ausente |
| `/workspace/.agents` | ausente |
| `/workspace/.claude` | ausente |
| `/workspace/.codex` | ausente |

`/home/ubuntu/.cursor/skills-cursor` existe e contém 16 diretórios de skill do agente de nuvem. A interseção com os 18 nomes do pacote é vazia. Esse diretório não é o `projectSkillsPath` do target Cursor.

## Lançamento

| Comando | Resultado |
| --- | --- |
| `cursor --version` | `cursor: command not found`, saída 127 |
| `agent --version` | `agent: command not found`, saída 127 |
| `codex --version` | `codex: command not found`, saída 127 |
| `claude --version` | `claude: command not found`, saída 127 |
| `agy --version` | `agy: command not found`, saída 127 |
| `antigravity --version` | `antigravity: command not found`, saída 127 |
| `gemini --version` | `gemini: command not found`, saída 127 |

Não há arquivo `.desktop` com esses nomes em `/usr/share/applications` nem em `/home/ubuntu/.local/share/applications`. `/opt/cursor` não contém o binário do produto. `/home/ubuntu/.cursor/bin` contém só `cursor-git-ssh-keygen`. `/usr/local/bin/cursor-agent-store-fuse` existe e não foi usado como host: o nome não é `cursor`, `codex`, `claude`, `agy` nem `antigravity`.

## Classificação

| Host | Estado | Motivo |
| --- | --- | --- |
| Cursor | `NOT_RUN` | `cursor` e `agent` saíram 127. Nenhuma superfície de IDE foi aberta. |
| Codex | `NOT_RUN` | `codex` saiu 127. |
| Antigravity | `NOT_RUN` | `agy`, `antigravity` e `gemini` saíram 127. App, CLI e IDE ficaram sem sessão. |
| Claude Code | `NOT_RUN` | `claude` saiu 127. |

Esta sessão roda como agente de nuvem do Cursor no workspace `/workspace`. Esse fato não entra como descoberta: o workspace não tem `.cursor/skills`, o consumidor está fora do workspace, e o pedido desta sessão já nomeia o protocolo e as skills.

## Limite

Os quatro diretórios em `/tmp/v1-a21-consumers` ficam fora do Git do pacote. A reprodução é repetir os dois comandos acima a partir de `b86f41d` ou de um descendente que não altere skills.

---
artifact: test_evidence
id: TEST-20261014-001
version: 2
status: ready
created_by: handoff
inputs:
  - SPEC-20261014-001
  - TICKET-SET-20261014-001
---

# Ambiente da observação — ticket 01

Data: 2026-10-14. Baseline funcional: `b86f41d`. HEAD e `origin/main`: `4cfad4f`, descendente documental sem alteração das skills. Máquina da repetição: Microsoft Windows NT 10.0.26200.0, Node.js v25.2.0 e npm 11.6.2.

## Consumidores isolados

Raiz: `C:\Users\paulo.bezerra\OneDrive - capta.com.br\Outros\Projetos\DBA\v1-a21-consumers-20261014-windows`.

| Host | Destino | Target | Layout | Validate |
| --- | --- | --- | --- | --- |
| Cursor | `...\cursor` | `cursor` | 18 skills em `.cursor\skills` | `PASS` |
| Codex | `...\codex` | `codex` | 18 skills em `.agents\skills` | `PASS` |
| Antigravity | `...\antigravity` | `antigravity` | 18 skills em `.agents\skills` | `PASS` |
| Claude Code | `...\claude-code` | `claude-code` | 18 skills em `.claude\skills` | `PASS` |

Cada destino é um repositório Git separado e contém somente o diretório do target além de `.git`. O pacote não é ancestral nem descendente dos consumidores. Nenhum workflow observado criou arquivo adicional; o arquivo acidental `cursor\.cursor\skills\Untitled` foi removido e sua ausência foi verificada.

## Quarentena de nomes globais

Para impedir precedência de skills pessoais, sete nomes presentes nas raízes globais foram movidos temporariamente para `C:\Users\paulo.bezerra\.v1-a21-quarantine-20261014`: `handoff`, `research`, `to-spec`, `to-tickets`, `implement`, `tdd` e `code-review`.

Ao término da coleta, os 14 diretórios foram restaurados aos destinos originais:

- 7 em `C:\Users\paulo.bezerra\.agents\skills`;
- 7 em `C:\Users\paulo.bezerra\.claude\skills`.

Verificação final: `Restored = 14`; `RemainingInQuarantine = 0`.

## Hosts

| Host/superfície | Versão | Resultado de lançamento |
| --- | --- | --- |
| Cursor IDE | 3.24.18 | sessão isolada aberta; probes executados |
| Codex CLI | 0.146.0-alpha.3 | binário abriu, mas `codex login status` retornou `Not logged in`; `codex exec` terminou em `401 Unauthorized: Missing bearer or basic authentication` antes de uma resposta do modelo |
| Antigravity IDE | 2.5.5, Gemini 3.8 Flash High | sessão isolada aberta; probes executados |
| Antigravity app/CLI | 2.5.5 / não usada | `NOT_RUN`; somente a superfície IDE entrou na prova |
| Claude Code | não coletada | `NOT_RUN`; fora do conjunto autorizado nesta repetição |

O Codex foi localizado dentro da extensão OpenAI ChatGPT do Antigravity. A ausência de autenticação impediu a criação de sessão do modelo; nenhuma credencial foi solicitada, lida ou modificada.

## Isolamento da execução

- Cursor: somente a janela do consumidor `cursor` foi automatizada; outra janela existente não foi usada.
- Antigravity: foi criada uma janela separada para o consumidor `antigravity`; a janela existente do usuário não foi automatizada.
- Cada sonda foi enviada em conversa nova.
- Os pedidos proibiram execução do workflow e gravação de arquivos quando o critério era apenas leitura.
- Nenhum segredo, token ou `.env` entrou na evidência.

## Evidência anterior

A primeira execução em Linux 6.12.94+ validou instalação e integridade, mas deixou todos os hosts `NOT_RUN`. Esta repetição em Windows substitui apenas o estado observacional dos hosts efetivamente abertos; não altera a baseline funcional nem o resultado 53/53.

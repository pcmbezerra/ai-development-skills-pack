# 03 — Operacionalizar bootstrap local

**Status:** ready-for-agent

## Title

Operacionalizar bootstrap local

## Goal

Permitir que um agente prepare um repositório novo com configuração mínima, componha obrigatoriamente `context-engineering` e declare `READY` somente quando configuração e contexto estiverem utilizáveis.

## Context

O bootstrap é a entrada explícita do usuário para preparar um repositório. Seu contrato proíbe modificar código da aplicação ou sobrescrever decisões e exige `context-engineering` como dependência obrigatória.

## Scope

- Substituir o scaffold por um workflow operacional de inspeção, criação mínima de configuração e composição de contexto.
- Criar o modelo mínimo com tracker local quando a configuração estiver ausente e nenhuma evidência explícita determinar valores diferentes.
- Preservar integralmente configuração válida existente, inclusive extensões desconhecidas.
- Bloquear configuração sintaticamente inválida, versão incompatível ou caminho fora do repositório antes de escrever.
- Propagar bloqueio ou falha de `context-engineering`.
- Declarar `READY` apenas após validar configuração e presença dos cinco documentos de contexto.
- Migrar a skill para `implemented`, mantendo `BOOTSTRAP_READINESS` como saída apenas nomeada.
- Cobrir o caminho completo de sucesso para repositório novo e o bloqueio básico de configuração inválida.

## Out of Scope

- Implementar comando CLI, instalador, distribuição ou integração remota.
- Criar schema/template persistido para readiness.
- Certificar comportamento nos quatro targets.
- Cobrir neste ticket toda a matriz adversarial e de portabilidade, que pertence ao ticket 04.

## Dependencies

Bloqueado por: **02 — Operacionalizar context-engineering**.

## Implementation Notes

O bootstrap deve inspecionar antes de escrever. O default local é aplicado somente na ausência de configuração e de evidência contrária. `Status: READY` é resultado de execução, distinto de status `ready` de artefato. O formato de falha continua sendo o contrato `BLOCKED`; não criar um novo modelo persistido.

## Acceptance Criteria

- [ ] Em repositório sem estado do pack, a execução cria a configuração mínima e os cinco documentos de contexto.
- [ ] A configuração criada usa versão suportada, tracker local e caminhos canônicos dentro do repositório.
- [ ] O bootstrap invoca `context-engineering`; sem conclusão válida da dependência, não retorna `READY`.
- [ ] Ao concluir com sucesso, retorna `Status: READY` sem persistir novo artefato/schema de readiness.
- [ ] Configuração JSON inválida produz `BLOCKED` e permanece inalterada.
- [ ] Nenhum arquivo da aplicação, decisão existente ou configuração de build é modificado.
- [ ] As duas skills deste recorte estão `implemented`; as outras 16 permanecem `scaffold`.
- [ ] As 18 skills, os quatro targets e a dependência obrigatória original são preservados.
- [ ] Nenhuma dependência ou comando CLI novo é adicionado.

## Validation

- Executar bootstrap em fixture vazia e verificar somente os arquivos autorizados no diff.
- Executar cenário em que `context-engineering` retorna `BLOCKED` e confirmar propagação.
- Executar cenário mínimo de JSON inválido e confirmar preservação byte a byte.
- Executar suíte, validação estrutural, alias e CLI.

## Definition of Done

- [ ] O caminho completo de repositório novo termina em `READY` com evidência.
- [ ] Os bloqueios mínimos impedem sucesso indevido ou sobrescrita.
- [ ] Todos os critérios de aceitação foram demonstrados.
- [ ] O repositório permanece verde e pronto para o endurecimento do ticket 04.

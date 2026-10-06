# 01 — Aceitar ciclo de vida misto das skills

**Status:** ready-for-agent

## Title

Aceitar ciclo de vida misto das skills

## Goal

Permitir que o catálogo represente skills `scaffold` e `implemented` simultaneamente, mantendo validação estrita e sem migrar nenhuma skill neste ticket.

## Context

`SPEC-20261006-001` autoriza a primeira implementação operacional. O validador e a documentação atual presumem que todas as 18 skills são scaffolds, o que impede uma migração incremental com a suíte verde.

## Scope

- Admitir somente os estados `scaffold` e `implemented` para skills do catálogo.
- Verificar consistência do estado entre manifest, contrato e fonte da skill.
- Rejeitar uma skill `implemented` que ainda declare workflow pendente ou negue capacidade operacional.
- Preservar a semântica distinta dos targets, que continuam `scaffold`.
- Adicionar regressões para estado misto válido, status desconhecido e divergências entre as três fontes.
- Manter o catálogo atual integralmente scaffold ao concluir este ticket.

## Out of Scope

- Implementar ou migrar qualquer workflow.
- Alterar responsabilidades, dependências, routing, artefatos ou targets.
- Criar comando CLI ou dependência nova.

## Dependencies

Nenhuma — pode iniciar imediatamente.

## Implementation Notes

Este é o prefactor que permite migração incremental. A validação deve derivar a expectativa do status declarado por skill, em vez de trocar uma exigência global por uma verificação permissiva. O estado `implemented` significa que existe workflow operacional verificável; não significa instalação em target nem certificação de plataforma.

## Acceptance Criteria

- [ ] O catálogo atual com 18 skills `scaffold` continua válido.
- [ ] Uma fixture consistente com uma skill `implemented` e 17 `scaffold` é aceita.
- [ ] Status diferente de `scaffold` ou `implemented` é rejeitado.
- [ ] Divergência de status entre manifest, contrato e fonte é rejeitada com mensagem que identifica a skill.
- [ ] Uma skill `implemented` com aviso de workflow pendente é rejeitada.
- [ ] Os quatro targets continuam obrigatoriamente declarativos, com instalação desabilitada e status `scaffold`.
- [ ] A cobertura LF/CRLF e as regras de dependência continuam verdes.
- [ ] Nenhuma dependência npm é adicionada.

## Validation

- Executar a suíte de testes do validador, incluindo as novas fixtures de ciclo de vida.
- Executar validação estrutural pelo script e pela CLI.
- Confirmar exatamente 18 skills e quatro targets.
- Confirmar diff sem alterações em responsabilidades, dependências e schemas de artefatos.

## Definition of Done

- [ ] Todos os critérios de aceitação foram demonstrados.
- [ ] Suíte e validação passam com código zero.
- [ ] O repositório permanece integralmente scaffold, pronto para a migração do ticket 02.
- [ ] Limitações conhecidas foram registradas sem afirmar implementação de workflow.

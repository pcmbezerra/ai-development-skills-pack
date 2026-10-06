# 01 — Aceitar ciclo de vida misto das skills

**Status:** completed

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

- [x] O catálogo atual com 18 skills `scaffold` continua válido.
- [x] Uma fixture consistente com uma skill `implemented` e 17 `scaffold` é aceita.
- [x] Status diferente de `scaffold` ou `implemented` é rejeitado.
- [x] Divergência de status entre manifest, contrato e fonte é rejeitada com mensagem que identifica a skill.
- [x] Uma skill `implemented` com aviso de workflow pendente é rejeitada.
- [x] Os quatro targets continuam obrigatoriamente declarativos, com instalação desabilitada e status `scaffold`.
- [x] A cobertura LF/CRLF e as regras de dependência continuam verdes.
- [x] Nenhuma dependência npm é adicionada.

## Validation

- `npm.cmd test`: PASS, 38/38, sem falhas ou skips; 12 regressões cobrem ciclo de vida misto, status inválido, divergências, ausência, placeholder e negação de workflow operacional.
- `npm.cmd run validate` e `npm.cmd run skills:validate`: PASS, 18 skills e quatro targets.
- `node bin/ai-dev-skills.mjs validate` e `node bin/ai-dev-skills.mjs --help`: PASS, saída 0.
- Catálogo confirmado com 18 skills `scaffold`; quatro descritores de target declarativos, `scaffold` e com instalação desabilitada; dependências npm vazias.
- Revisões finais de Standards e Spec: nenhum achado remanescente.
- Limite registrado: a validação de lifecycle é estrutural e por sentinelas explícitas; não interpreta paráfrases arbitrárias em linguagem natural nem executa workflows.

## Commits

- `105307a` — aceitar ciclo de vida misto e validar consistência entre as três fontes.
- `adb3261` — exigir evidência estrutural de workflow operacional.
- `f027f29` — rejeitar placeholders e capacidade operacional indisponível.
- `dd28f12` — ampliar regressões para linguagem de pendência e não operacionalidade.

## Definition of Done

- [x] Todos os critérios de aceitação foram demonstrados.
- [x] Suíte e validação passam com código zero.
- [x] O repositório permanece integralmente scaffold, pronto para a migração do ticket 02.
- [x] Limitações conhecidas foram registradas sem afirmar implementação de workflow.

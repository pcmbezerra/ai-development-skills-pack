# 02 — Operacionalizar context-engineering

**Status:** completed

## Title

Operacionalizar context-engineering

## Goal

Entregar um workflow utilizável de descoberta e manutenção do contexto do projeto, fundamentado em evidência local, preservando conteúdo existente e produzindo resultado idempotente ou `BLOCKED`.

## Context

`context-engineering` não possui dependências e é pré-requisito obrigatório do bootstrap. A SPEC define cinco documentos canônicos como composição de `PROJECT_CONTEXT`, que permanece uma saída apenas nomeada.

## Scope

- Substituir o scaffold por instruções operacionais concisas para localizar a raiz, coletar evidências e manter contexto.
- Aplicar a precedência: decisões/configuração explícitas; evidência executável ou estrutural; documentação atual; inferências identificadas.
- Criar ou atualizar somente os cinco documentos canônicos de contexto.
- Preservar conteúdo não contradito, distinguir fatos, inferências e lacunas e bloquear conflitos materiais não resolvidos.
- Exigir idempotência para entradas inalteradas e impedir cópia de segredos.
- Migrar somente esta skill para `implemented` nas fontes contratuais e no catálogo.
- Registrar o início da emenda v1-A2 e o estado parcialmente implementado.
- Adicionar regressões estruturais e cenários de conformidade para criação, preservação, repetição, conflito e sigilo.

## Out of Scope

- Criar configuração de bootstrap.
- Persistir schema/template de `PROJECT_CONTEXT`.
- Implementar as demais skills, targets ou CLI.
- Automatizar inferência semântica com um runtime próprio.

## Dependencies

Bloqueado por: **01 — Aceitar ciclo de vida misto das skills**.

## Implementation Notes

O workflow é executado pelo agente. Automação auxiliar só se justifica para operações determinísticas; interpretação arquitetural e de regras de negócio permanece orientada por instruções. Escritas devem ser mínimas e revisáveis. Ausência de evidência produz lacuna explícita; conflito material produz o formato `BLOCKED` contratado antes de qualquer sobrescrita destrutiva.

## Acceptance Criteria

- [x] Em fixture sem contexto, a execução cria os cinco documentos canônicos com afirmações baseadas em evidência local.
- [x] Em fixture com contexto e decisões existentes, valores e conteúdo não contradito são preservados.
- [x] Uma segunda execução sem mudança de entrada produz diff vazio.
- [x] Conflito material com decisão explícita retorna `BLOCKED` com os quatro campos obrigatórios e não sobrescreve a decisão.
- [x] Segredos presentes em fixture não aparecem nas saídas.
- [x] `PROJECT_CONTEXT` continua sem schema ou template canônico novo.
- [x] Somente `context-engineering` está `implemented`; as outras 17 skills permanecem `scaffold`.
- [x] A validação identifica corretamente qualquer inconsistência dessa migração.
- [x] Nenhum arquivo de aplicação é alterado pelos cenários de conformidade.

## Validation

- `TEST-20261006-002`: cenários isolados de criação, preservação, repetição, conflito e sigilo aprovados; a repetição preservou os cinco hashes e o conflito manteve os documentos intactos.
- `npm.cmd test`: PASS, 40/40; teste RED inicial falhou pela ausência da migração e passou após o GREEN.
- `npm.cmd run validate`, `npm.cmd run skills:validate`, ajuda e validação da CLI: PASS.
- Confirmados: nenhum schema/template novo, nenhuma dependência, nenhum caminho específico de target/sistema operacional e nenhuma alteração de aplicação pelas fixtures.

## Definition of Done

- [x] O workflow pode ser seguido por um agente sem decisões operacionais ausentes.
- [x] Todos os critérios de aceitação foram demonstrados.
- [x] Evidência automatizada e de conformidade está separada claramente.
- [x] Documentação deixa explícitas as 17 skills ainda scaffold e a compatibilidade não certificada.

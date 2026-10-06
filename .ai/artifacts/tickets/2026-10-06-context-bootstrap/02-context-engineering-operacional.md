# 02 — Operacionalizar context-engineering

**Status:** ready-for-agent

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

- [ ] Em fixture sem contexto, a execução cria os cinco documentos canônicos com afirmações baseadas em evidência local.
- [ ] Em fixture com contexto e decisões existentes, valores e conteúdo não contradito são preservados.
- [ ] Uma segunda execução sem mudança de entrada produz diff vazio.
- [ ] Conflito material com decisão explícita retorna `BLOCKED` com os quatro campos obrigatórios e não sobrescreve a decisão.
- [ ] Segredos presentes em fixture não aparecem nas saídas.
- [ ] `PROJECT_CONTEXT` continua sem schema ou template canônico novo.
- [ ] Somente `context-engineering` está `implemented`; as outras 17 skills permanecem `scaffold`.
- [ ] A validação identifica corretamente qualquer inconsistência dessa migração.
- [ ] Nenhum arquivo de aplicação é alterado pelos cenários de conformidade.

## Validation

- Executar os cenários de conformidade em repositórios temporários isolados e registrar `TEST_EVIDENCE`.
- Comparar o diff da primeira e da segunda execução.
- Executar suíte, validação estrutural, alias e CLI.
- Verificar ausência de novos schemas, dependências e caminhos específicos de target ou sistema operacional.

## Definition of Done

- [ ] O workflow pode ser seguido por um agente sem decisões operacionais ausentes.
- [ ] Todos os critérios de aceitação foram demonstrados.
- [ ] Evidência automatizada e de conformidade está separada claramente.
- [ ] Documentação deixa explícitas as 17 skills ainda scaffold e a compatibilidade não certificada.

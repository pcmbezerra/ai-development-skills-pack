# 04 — Endurecer bootstrap e fechar v1-A2

**Status:** completed

## Title

Endurecer bootstrap e fechar v1-A2

## Goal

Fechar todos os critérios de `SPEC-20261006-001` com cenários adversariais, prova de idempotência e segurança de escrita, documentação coerente e evidência final da emenda v1-A2.

## Context

Os tickets anteriores entregam o ciclo de vida misto, contexto operacional e o caminho principal do bootstrap. Este ticket comprova os limites que impedem perda de dados, vazamento de segredos e alegações indevidas de compatibilidade.

## Scope

- Cobrir configuração válida com extensões desconhecidas e valores explicitamente escolhidos pelo projeto.
- Cobrir versão incompatível, caminhos que escapem do repositório e configuração inválida sem alteração do arquivo original.
- Verificar repetição idempotente do fluxo completo e limite exato dos arquivos alterados.
- Verificar ausência de segredos nas saídas e bloqueio de conflitos materiais.
- Consolidar regressões do estado misto, LF/CRLF, dependências, artifacts e targets.
- Finalizar proveniência, documentação de estado e evidência de validação da emenda v1-A2.
- Registrar separadamente testes determinísticos, conformidade por agente e plataformas/targets não verificados.

## Out of Scope

- Ampliar o workflow além de contexto e bootstrap local.
- Implementar integração GitHub, instalador, distribuição, novos comandos ou outras skills.
- Alterar schema de artefato, routing, dependências ou targets.
- Declarar certificação multiplataforma sem execução correspondente.

## Dependencies

Bloqueado por: **03 — Operacionalizar bootstrap local**.

## Implementation Notes

Este ticket fecha o recorte, mas não deve mascarar limitações com documentação genérica. Cada afirmação de compatibilidade precisa de execução. A evidência deve distinguir o que foi validado automaticamente do que foi observado em cenários conduzidos por agente. Nenhuma correção fora dos critérios da SPEC entra neste ticket.

## Acceptance Criteria

- [x] Configuração válida existente, inclusive campos opcionais desconhecidos, é preservada integralmente.
- [x] Versão incompatível, JSON inválido e caminho fora da raiz retornam `BLOCKED` sem modificar a configuração.
- [x] A segunda execução completa sem mudança de entradas produz diff vazio.
- [x] O diff de uma execução bem-sucedida não contém alteração em código ou configuração de build da aplicação.
- [x] Valores secretos usados nas fixtures não aparecem em contexto, readiness, logs ou evidências.
- [x] Bloqueio de `context-engineering` impede `READY` do bootstrap.
- [x] Exatamente duas skills estão `implemented`, 16 estão `scaffold` e quatro targets permanecem `scaffold`.
- [x] Não existem schemas/templates novos para `PROJECT_CONTEXT` ou `BOOTSTRAP_READINESS`.
- [x] Dependências npm permanecem vazias e a CLI continua limitada a ajuda/validação.
- [x] Toda a suíte, validação, alias e CLI terminam com código zero.
- [x] Documentação e handoff descrevem o estado parcial real e listam plataformas/targets não verificados.
- [x] Todos os 14 critérios da SPEC possuem evidência rastreável.

## Validation

- Executar a matriz completa de fixtures e registrar resultados, diffs e limitações ambientais.
- Executar a suíte integral, validação estrutural, alias, ajuda da CLI e validação pela CLI.
- Inspecionar catálogo, targets, dependências e registro de artefatos.
- Comparar a implementação final com `SPEC-20261006-001` e registrar qualquer desvio como bloqueio.

## Definition of Done

- [x] Todos os critérios desta unidade e da SPEC estão cobertos por evidência.
- [x] Não há falha, skip não explicado ou modificação fora do escopo.
- [x] Emenda v1-A2, estado do projeto e handoff estão coerentes com o comportamento validado.
- [x] O próximo trabalho pode iniciar a partir de uma frontier vazia, sem pendência desta SPEC.

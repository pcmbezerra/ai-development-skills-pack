---
status: accepted
date: 2026-10-08
---

# Persistir conjunto de decisões bloqueado

`clarify` produz um conjunto de decisões com esquema e template já definidos. `context-engineering` recusa escrever quando o resultado está bloqueado. O mantenedor escolheu gravar o conjunto tanto quando está pronto quanto quando está bloqueado, em `.ai/artifacts/decisions/`.

O arquivo bloqueado conserva a fronteira entre decisão resolvida e questão bloqueante para a sessão seguinte. Persistir só o conjunto pronto seguiria `context-engineering`. Não persistir seguiria `WORKFLOW_PLAN`, que é saída apenas nomeada.

Um conjunto bloqueado continua sem autorizar especificação ou implementação. A gravação não autoriza apagar o arquivo para imitar o limite de escrita de `context-engineering`.

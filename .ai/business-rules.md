# Invariantes do pack

Fonte: baseline v1, contratos compartilhados e manifest existentes.

- Catálogo de runtime fechado em 18 skills; helpers externos não são novas skills do pack.
- Invocação primária não impede solicitação explícita ou composição.
- Dependências obrigatórias e potencialmente obrigatórias não podem formar ciclos; composição opcional pode.
- Artefatos admitem draft, ready, blocked e superseded. Artefato blocked não autoriza implementação.
- SPEC pronta exige escopo delimitado, aceitação testável e ausência de ambiguidade bloqueante; tickets executáveis exigem SPEC pronta.
- Estado e conhecimento de projeto ficam fora das skills. Integrações externas são opcionais, com fallback local.
- WORKFLOW_PLAN, PROJECT_CONTEXT, CHANGE_SET e BOOTSTRAP_READINESS são saídas apenas nomeadas; TICKET é registro de TICKET_SET.
- Routing explícito tem precedência, respeitando pré-requisitos; workflow recomenda sequência sem implementar o trabalho.
- R13 mantém SHOULD no corpo normativo apesar do título “mandatory”.
- Handoff registra estado verificado; nenhum scaffold pode declarar execução operacional bem-sucedida.

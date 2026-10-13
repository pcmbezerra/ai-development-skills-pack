# Invariantes do pack

Fonte: baseline v1, contratos compartilhados e manifest existentes.

- Catálogo de runtime fechado em 18 skills; helpers externos não são novas skills do pack.
- Invocação primária não impede solicitação explícita ou composição.
- Dependências obrigatórias e potencialmente obrigatórias não podem formar ciclos; composição opcional pode.
- Artefatos admitem draft, ready, blocked e superseded. Artefato blocked não autoriza implementação.
- `clarify` grava conjunto de decisões ready e blocked. Premissa não fecha ambiguidade material. Fato externo não é decisão resolvida.
- SPEC pronta exige escopo delimitado, aceitação testável e ausência de ambiguidade bloqueante; tickets executáveis exigem SPEC pronta.
- Estado e conhecimento de projeto ficam fora das skills. Integrações externas são opcionais, com fallback local.
- WORKFLOW_PLAN, PROJECT_CONTEXT, CHANGE_SET e BOOTSTRAP_READINESS são saídas apenas nomeadas; TICKET é registro de TICKET_SET.
- Routing explícito tem precedência, respeitando pré-requisitos; workflow recomenda sequência sem implementar o trabalho.
- R13 mantém SHOULD no corpo normativo apesar do título “mandatory”.
- Handoff registra estado verificado; nenhum scaffold pode declarar execução operacional bem-sucedida.
- `to-spec` grava somente spec `ready` e devolve `BLOCKED` sem arquivo quando o gate não passa.
- `to-tickets` grava somente conjunto `ready` e devolve `BLOCKED` sem arquivo quando o gate não passa.
- `domain-modelling` grava somente modelo `ready` e devolve `BLOCKED` sem arquivo quando o insumo não justifica o modelo.
- `architecture-design` grava desenho `ready` e, quando a spec já registra a decisão durável, um ADR `ready`. Devolve `BLOCKED` sem arquivo desta tentativa quando o gate não passa. O ADR `0001` permanece limitado a conjuntos de decisões.
- `implement` aplica a menor mudança correta, grava relatório `ready` e evidência `ready`, cita `CHANGE_SET` como working tree e não invoca `tdd` nem `code-review`.
- `tdd` grava evidência `ready` própria e a mudança de teste. Alteração de implementação só ocorre quando `implement` compõe a execução.
- `code-review` grava somente relatório `ready` e não altera código.
- Distribuição escreve no diretório nativo do projeto de destino. Conteúdo idêntico é idempotente. Conteúdo divergente bloqueia a operação sem sobrescrita.

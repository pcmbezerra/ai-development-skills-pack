# AI Development Skills Pack

Vocabulário do pacote de workflows de engenharia para agentes de IA, com fonte reutilizável independente de ferramenta e continuidade por artefatos.

## Language

**Skill**:
Unidade reutilizável de responsabilidade de engenharia, com entradas, saídas, restrições e critérios de qualidade definidos.
_Avoid_: comando de instalação, agente autônomo

**Catálogo de runtime**:
Conjunto fechado das 18 skills integrantes do pack v1.
_Avoid_: todas as skills instaladas no ambiente

**Scaffold**:
Estrutura que expressa contratos e pontos de extensão, sem implementar os workflows operacionais das skills.
_Avoid_: produto operacional, workflow concluído

**Artefato**:
Registro estruturado de trabalho que permite transferir decisões, evidências e resultados entre etapas.
_Avoid_: contexto apenas conversacional

**Template de artefato**:
Modelo ainda não preenchido de um artefato, sem evidência de prontidão para consumo.
_Avoid_: artefato pronto

**Saída apenas nomeada**:
Resultado reconhecido pelo contrato sem esquema completo definido no baseline.
_Avoid_: esquema implícito

**Invocação primária**:
Classificação da entrada preferencial de uma skill pelo usuário ou pelo modelo, sem proibir composição ou solicitação explícita.
_Avoid_: exclusividade de invocação

**Dependência obrigatória**:
Pré-requisito que precisa estar presente para a skill dependente.

**Dependência condicional**:
Pré-requisito exigível somente quando sua condição declarada se aplica.

**Dependência opcional**:
Possibilidade de composição que não obriga a execução da outra skill.

**Routing**:
Regras de seleção e precedência das skills conforme intenção e pré-requisitos do trabalho.
_Avoid_: execução automática de todo o trabalho

**Quality gate**:
Critério para aceitar uma etapa com base em evidências e ausência dos bloqueios relevantes.
_Avoid_: mera presença de seções

**Contexto do projeto**:
Conhecimento específico do projeto consumidor, separado da fonte reutilizável das skills.

**Target**:
Ambiente de destino para distribuição do mesmo catálogo de skills.
_Avoid_: skill específica de IDE

**Handoff**:
Registro verificável do estado do trabalho, suas pendências e próximos passos para continuidade.
_Avoid_: promessa de conclusão

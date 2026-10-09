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

**Modelo de domínio**:
Registro dos conceitos de negócio, das relações e das invariantes de um contexto consumidor.
_Avoid_: glossário local, especificação, desenho de arquitetura

**Desenho de arquitetura**:
Registro da solução técnica, das interfaces e dos trade-offs quando a mudança afeta uma fronteira arquitetural.
_Avoid_: modelo de domínio, especificação, ADR de conjunto de decisões

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

**Plano de workflow**:
Sequência mínima e justificada de skills recomendada para uma solicitação, com pré-requisitos, disponibilidade, bloqueios e próxima ação executável.
_Avoid_: execução do workflow, pipeline automático

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

## Decisões

**Ambiguidade material**:
Pergunta sem resposta que pode alterar o escopo, o comportamento, a arquitetura, o modelo de dados, a segurança ou os critérios de aceitação do próximo passo pedido.
_Avoid_: dúvida genérica, preferência irrelevante ao próximo passo

**Conjunto de decisões**:
Registro das escolhas que desbloqueiam o próximo passo, separado das questões que ainda não o afetam e das que o impedem.
_Avoid_: especificação, modelo de domínio, plano de workflow

**Decisão resolvida**:
Escolha explícita do solicitante, decisão já registrada, ou resposta já presente na evidência do repositório, que fecha uma ambiguidade material.
_Avoid_: premissa, inferência do agente, fato externo

**Decisão existente**:
Escolha já registrada em ADR, em conjunto de decisões anterior ou no contexto do projeto.
_Avoid_: verbete de glossário

**Questão bloqueante**:
Pergunta sem resposta que impede o conjunto de decisões de ficar pronto, seja ambiguidade material ou fato externo que altera o próximo passo.
_Avoid_: questão aberta

**Questão aberta**:
Pergunta sem resposta que não altera o próximo passo pedido.
_Avoid_: questão bloqueante

**Premissa**:
Condição rotulada como aceita que não fecha, por si só, uma ambiguidade material.
_Avoid_: decisão resolvida

**Alternativa rejeitada**:
Opção descartada por uma decisão resolvida ou por uma decisão existente.
_Avoid_: sugestão ainda não decidida

**Fato externo**:
Informação de fora do repositório que não é uma escolha do projeto.
_Avoid_: decisão resolvida

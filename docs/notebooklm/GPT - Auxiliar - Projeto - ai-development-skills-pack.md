# Auditoria Estratégica, Técnica e de Produto

AI Development Skills Pack · 1º de novembro de 2026 · Repositório `pcmbezerra/ai-development-skills-pack`

## 1. Resumo executivo

Diagnóstico inicial: o projeto já possui uma arquitetura funcional e um catálogo expressivo de Skills, mas ainda não reúne evidências suficientes para ser declarado pronto para produção corporativa ou para um lançamento Open Source público.

A auditoria do GitHub confirmou uma base mais avançada do que um protótipo conceitual: existem 18 Skills implementadas, contratos documentados, templates, uma CLI de distribuição e validação, testes automatizados e registros arquiteturais.

Entretanto, existem diferenças importantes entre ter uma implementação, ter uma implementação validada e ter um produto apto para adoção externa.

O repositório permanece privado, utiliza a versão interna `1.0.0-scaffold`, não apresenta GitHub Releases publicados e não possui execuções de GitHub Actions registradas. Esses pontos representam obstáculos concretos à publicação e à demonstração contínua de qualidade.

A estratégia recomendada é estabilizar, validar e publicar o núcleo existente, evitando transformar a preparação da primeira versão em um novo ciclo de expansão do framework.

Escopo auditado: branch `main`, commit `df1ee5c8ffba`, de 22/10/2026. Consultei a árvore completa do repositório, com 678 arquivos, além de metadados, histórico de commits, Pull Requests, Issues, Releases e documentação disponível. A confirmação de implementação não equivale à execução independente dos testes.

NO-GO para GA corporativa

Veredito condicionado aos controles de release e validação externa

Maturidade global estimada

# 54%

Índice heurístico

Skills implementadas

# 18/18

Status do catálogo

Testes registrados

# 86/86

Última execução documentada

## 2. Entendimento do projeto e posicionamento

O projeto resolve um problema real: agentes de desenvolvimento recebem instruções de engenharia diferentes conforme a ferramenta, o usuário e a sessão. Isso pode gerar processos inconsistentes, decisões perdidas, artefatos incompatíveis e implementações sem critérios verificáveis.

O AI Development Skills Pack procura resolver essa fragmentação oferecendo um conjunto de instruções reutilizáveis, contratos de entrada e saída, regras de roteamento e mecanismos de validação.

### Distinção fundamental

| Dimensão                                | Estado identificado                        |
| --------------------------------------- | ------------------------------------------ |
| Catálogo de Skills                      | Implementado                               |
| Framework de contratos                  | Implementado para o catálogo existente     |
| Distribuição entre ferramentas          | Implementada                               |
| Validação estrutural                    | Implementada                               |
| Harness de avaliação semântica          | Parcial: matriz manual de casos conhecidos |
| Framework genérico de autoria de Skills | Não implementado                           |
| Runtime/orquestrador de agentes         | Fora do escopo atual                       |
| Plataforma de governança corporativa    | Não implementada                           |

O posicionamento que melhor corresponde à implementação atual é:

> Um pacote Open Source de Skills de engenharia de software e IA, independente de ferramenta, com contratos de artefatos, qualidade verificável e distribuição reproduzível.

Essa proposta é mais precisa do que classificá-lo, neste momento, como um framework completo de Engenharia de IA.

A generalização para criação arbitrária de novas Skills deve ser uma evolução posterior, não condição para o lançamento inicial.

### Diferencial competitivo

O maior diferencial não é a quantidade de Skills. É a combinação de:

- Contratos explícitos: artefatos com metadados, status e critérios de prontidão.
- Governança de execução: regras R1–R17, gates e comportamento `BLOCKED`.
- Fonte canônica: uma implementação distribuída para vários clientes.
- Portabilidade: diretórios de Skills autocontidos.
- Validação determinística: verificações sem dependências externas de runtime.

A distinção comercial importante é vender a ideia de engenharia reproduzível e auditável com agentes, não apenas uma coleção de prompts.

### Comparação com frameworks e projetos semelhantes

| Projeto               | Categoria principal                  | Relação com o Skills Pack                                          |
| --------------------- | ------------------------------------ | ------------------------------------------------------------------ |
| LangChain / LangGraph | Aplicações e workflows agentic       | Complementar: Skills orientam engenharia; LangGraph executa fluxos |
| AutoGen               | Multiagentes                         | Complementar; projeto em transição para sucessor Microsoft         |
| CrewAI                | Agents, crews e flows                | Complementar, embora exista sobreposição nas práticas de processo  |
| Semantic Kernel       | Integração e orquestração            | Complementar; evolução estratégica para Microsoft Agent Framework  |
| OpenAI Agents SDK     | Agent runtime, ferramentas e tracing | Complementar; referência em guardrails e observabilidade           |
| DSPy                  | Programação e otimização de LLMs     | Referência para avaliações e otimização futura                     |
| PydanticAI            | Agentes tipados, evals e harnesses   | Complementar e referência em testes                                |
| PocketFlow            | Orquestração minimalista             | Referência de simplicidade e composição                            |
| AgentOps              | Observabilidade e benchmarking       | Complementar; não concorre diretamente                             |

As documentações atuais confirmam essa separação: LangGraph organiza execução e estado, OpenAI Agents SDK integra execução, guardrails e tracing, PydanticAI oferece componentes de avaliação e harness, enquanto DSPy concentra-se em programação e otimização de sistemas com LLMs.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://docs.langchain.com\&sz=32)

Docs by LangChain

+3



Também há uma mudança relevante no ecossistema Microsoft: AutoGen encontra-se em manutenção e o Microsoft Agent Framework tornou-se seu sucessor estratégico, assim como do Semantic Kernel para novos projetos.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

microsoft/autogen at toolcenter · GitHub

+1



Os concorrentes mais próximos são diferentes dos nove frameworks citados: a especificação [Agent Skills](https://github.com/agentskills/agentskills?utm_source=chatgpt.com) e ferramentas de distribuição de Skills como [skillpack](https://github.com/nordicnode/skillpack?utm_source=chatgpt.com). São referências mais diretas para compatibilidade, empacotamento, experiência de instalação e governança de Skills.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

GitHub

+1



Minha recomendação é posicionar o projeto como uma camada complementar a essas ferramentas, e não tentar substituir seus runtimes.

## 3. Arquitetura atual

### Componentes confirmados

| Componente                      | Responsabilidade                                               |
| ------------------------------- | -------------------------------------------------------------- |
| `manifest/skills.json`          | Catálogo canônico, status, invocação, dependências e artefatos |
| `skills/`                       | Implementação das 18 Skills em seis categorias                 |
| `contracts/`                    | Contratos compartilhados e específicos por Skill               |
| `templates/`                    | Modelos de artefatos e contexto do projeto                     |
| `targets/`                      | Descritores declarativos dos quatro clientes                   |
| `scripts/validate-skills.mjs`   | Validação estrutural e consistência                            |
| `scripts/distribute-skills.mjs` | Instalação, empacotamento e validação das cópias               |
| `bin/ai-dev-skills.mjs`         | CLI do produto                                                 |
| `tests/`                        | Testes Node.js, distribuição, validação e licença              |
| `.ai/`                          | Contexto, decisões, evidências e histórico de desenvolvimento  |
| `references/`                   | Arquitetura normativa, proveniência e histórico de validações  |

Fonte: [manifest](https://github.com/pcmbezerra/ai-development-skills-pack/blob/main/manifest/skills.json?utm_source=chatgpt.com), [CLI](https://github.com/pcmbezerra/ai-development-skills-pack/blob/main/bin/ai-dev-skills.mjs?utm_source=chatgpt.com) e [arquitetura](https://github.com/pcmbezerra/ai-development-skills-pack/blob/main/.ai/architecture.md?utm_source=chatgpt.com).

### Fluxo arquitetural

Fluxo lógico existente. A distribuição copia diretórios de Skills; não executa nem certifica automaticamente o comportamento dos agentes de destino.

### Fluxo de engenharia das Skills

O processo de trabalho pode ser composto da seguinte forma:

```
Solicitação
    ↓
workflow / clarify / research
    ↓
SPEC (ready)
    ↓
DOMAIN_MODEL / ARCHITECTURE_DESIGN
    ↓
TICKET_SET (ready)
    ↓
implement + tdd
    ↓
IMPLEMENTATION_REPORT + TEST_EVIDENCE
    ↓
code-review + docs
    ↓
HANDOFF
```

Esse é um fluxo recomendado, não um pipeline obrigatório executado automaticamente. O `workflow` indica a sequência; as dependências podem ser obrigatórias, condicionais ou opcionais. Os contratos não exigem a cadeia inteira para toda alteração.

### Contratos e gates existentes

Foram identificados:

- 20 tipos de artefato declarados no manifesto, incluindo saídas apenas nomeadas e o tipo `TICKET`, contido em `TICKET_SET`.
- 15 templates de artefatos persistidos.
- 17 regras de roteamento, de R1 a R17.
- Sete grupos de quality gates: especificação, arquitetura, tickets, implementação, revisão, documentação e modernização.
- Quatro ADRs canônicos em `.ai/decisions/`.

Os artefatos persistidos suportam os estados `draft`, `ready`, `blocked` e `superseded`. Isso cria uma boa base para rastreabilidade, mas ainda não demonstra que os agentes cumpram esses contratos em todos os cenários reais.

### Acoplamentos e gargalos

| Achado                                                 | Consequência                                                                         |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Catálogo fixado em 18 Skills                           | Excelente para integridade do pacote atual; limita autoria genérica                  |
| Quatro targets definidos estaticamente                 | Compatibilidade controlada, porém extensão exige manutenção do código                |
| Validação centrada em estrutura e igualdade            | Não comprova qualidade semântica ou resultado final dos agentes                      |
| `workflow` consultivo                                  | Não existe orquestrador automático; isso deve permanecer explícito                   |
| `install` copia arquivos no destino                    | Exige testes adicionais de filesystem, concorrência e falhas parciais                |
| Codex e Antigravity usam `.agents/skills`              | Compartilhamento intencional de destino; merece teste de coexistência                |
| `doctor` procura executável literalmente chamado `git` | Pode falhar no Windows mesmo com `git.exe` instalado; comportamento está documentado |
| Arquivos históricos acumulados em `.ai/`               | Risco crescente de informação redundante e desatualizada                             |

Conclusão arquitetural: a divisão entre fonte, contratos, distribuição e estado do projeto é adequada. Não recomendo uma reescrita arquitetural para chegar à primeira versão pública.

## 4. Avaliação de maturidade

Os percentuais abaixo são estimativas de auditoria, não cobertura de código ou métricas extraídas de um sistema de medição. Considerei existência da implementação, evidência de validação, capacidade de reprodução e prontidão de consumo externo. Os 12 domínios têm peso igual neste índice.

Maturidade por domínio

0–100

Arquitetura

80%

Documentação

69%

Testes

70%

Governança

58%

Observabilidade

25%

Segurança

55%

DX

68%

CI/CD

8%

Escalabilidade

65%

Reutilização

82%

Open Source

24%

Prontidão produção

45%

Média aritmética: 54,1%, arredondada para 54%. Baixas notas de observabilidade consideram a falta de uma camada de evidências operacionais; não pressupõem que este pacote estático precise de telemetria de SaaS.

### Justificativas por domínio

| Domínio               | Fundamentação                                                                                                                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Arquitetura — 80%     | Separação consistente, contratos, descritores e ADRs. Penalização pela extensibilidade ainda limitada do catálogo.                                                                            |
| Documentação — 69%    | README completo, contratos e histórico substancial. Existem referências a resultados antigos e alto volume de registros sobrepostos.                                                          |
| Testes — 70%          | Suíte determinística, fixtures e testes de distribuição. Faltam cobertura instrumentada, CI e avaliações comportamentais reproduzíveis.                                                       |
| Governança — 58%      | ADRs e gates definidos; pouca governança operacional no GitHub e ausência de processo público de release.                                                                                     |
| Observabilidade — 25% | Saídas de CLI e evidências em Markdown; faltam formato padronizado de execução, métricas consolidadas e rastreamento de resultados entre versões.                                             |
| Segurança — 55%       | Sem dependências npm, proteção contra colisões, validação de caminhos e licença formal. Hardening de filesystem, política de vulnerabilidades e evidências automatizadas ainda insuficientes. |
| DX — 68%              | CLI enxuta, instalação por target, README e pacotes autocontidos. Falta validar o onboarding de novos usuários e a experiência completa no Windows.                                           |
| CI/CD — 8%            | Não foi identificado workflow em `.github/workflows/`, nem execuções do Actions. Os comandos existem, mas o gate não é automático.                                                            |
| Escalabilidade — 65%  | Boa reutilização para o catálogo atual; ausência de mecanismo genérico para novos catálogos e análise de evolução dos contratos.                                                              |
| Reutilização — 82%    | Fonte canônica, projeções autocontidas e quatro destinos são forças concretas. Falta comprovar interoperabilidade integral em todos os hosts.                                                 |
| Open Source — 24%     | MIT e README existentes, mas repositório privado, sem release publicado e sem documentação formal de contribuição.                                                                            |
| Produção — 45%        | Funcionalidade principal implementada; faltam release engineering, segurança comprovada, CI e homologação externa suficiente.                                                                 |

A maior diferença está entre maturidade da engenharia interna e maturidade de distribuição e adoção. A primeira é relativamente alta. A segunda ainda precisa ser construída.

## 5. Estado atual: o que está comprovado

| Área                 | Concluído                                                   | Evidência                                    |
| -------------------- | ----------------------------------------------------------- | -------------------------------------------- |
| Catálogo             | 18 Skills com status `implemented`                          | `manifest/skills.json`                       |
| Organização          | Seis categorias de Skills                                   | Árvore de `skills/`                          |
| Contratos            | Compartilhados e por Skill                                  | `contracts/`                                 |
| Artefatos            | Catálogo e templates                                        | `manifest/` e `templates/`                   |
| CLI                  | `validate`, `install`, `package`, `list`, `doctor`          | `bin/ai-dev-skills.mjs`                      |
| Distribuição         | Quatro targets declarados e mecanismo de cópia              | `targets/` e `scripts/distribute-skills.mjs` |
| Testes automatizados | Suíte Node.js implementada                                  | Três arquivos `.test.mjs`                    |
| Testes registrados   | Última execução documentada de 86/86, sem falhas            | `REVIEW-20261022-009`                        |
| Validação estática   | Verificação de catálogo, projeções, referências e regras    | `scripts/validate-skills.mjs`                |
| Licenciamento        | MIT                                                         | `LICENSE`, `package.json` e teste SPDX       |
| ADRs                 | Quatro decisões canônicas                                   | `.ai/decisions/0001` a `0004`                |
| Experiência de hosts | Observações registradas em Cursor, Codex e Antigravity      | `.ai/project.md` e registros v1-A21          |
| Pull Requests        | Histórico de 13 merges, um PR fechado sem merge e um aberto | GitHub PRs #1–#15                            |

A evidência de 86/86 vem do registro de revisão de 22/10/2026. Não executei novamente essa suíte nesta auditoria. Também não há relatório atual de cobertura percentual de linhas ou branches.

O registro de validação dos clientes indica `OBSERVED`, não certificação. Claude Code permanece `NOT_RUN`. Isso impede afirmar que os quatro ambientes estão homologados de ponta a ponta.

### Inventário adicional do GitHub

| Superfície                  | Resultado                                                                                                |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| Branch principal            | `main`, commit `df1ee5c8ffba`                                                                            |
| Repositório                 | Privado                                                                                                  |
| GitHub Releases             | Nenhum publicado                                                                                         |
| GitHub Actions              | Zero execuções retornadas                                                                                |
| GitHub Issues independentes | Nenhuma identificada                                                                                     |
| Pull Requests abertos       | Um draft, [#15](https://github.com/pcmbezerra/ai-development-skills-pack/pull/15?utm_source=chatgpt.com) |
| GitHub Wiki                 | Desabilitada                                                                                             |
| GitHub Discussions          | Desabilitadas                                                                                            |
| Proteção da `main`          | API da branch retornou `protected: false`                                                                |
| Projects/Milestones         | Não foi possível auditar completamente                                                                   |
| Tags                        | Não confirmadas pela consulta disponibilizada                                                            |

Há aproximadamente 505 arquivos sob `.ai/`, em um total de 678 arquivos versionados. Isso representa cerca de 74,5% do inventário e evidencia a intensidade da rastreabilidade do projeto, mas não necessariamente sua qualidade ou custo de manutenção.

Ponto de atenção documental: o README ainda menciona 53 testes, enquanto o registro posterior da v1-A31 apresenta 86. A referência mais recente deve prevalecer, após reexecução no commit de release.

Fontes de verificação: [README](https://github.com/pcmbezerra/ai-development-skills-pack/blob/main/README.md?utm_source=chatgpt.com), [estado do projeto](https://github.com/pcmbezerra/ai-development-skills-pack/blob/main/.ai/project.md?utm_source=chatgpt.com) e [revisão v1-A31](https://github.com/pcmbezerra/ai-development-skills-pack/blob/main/.ai/artifacts/reviews/2026-10-22-v1-a31-spdx-assertion.md?utm_source=chatgpt.com).

## 6. Lacunas e pendências

As lacunas foram priorizadas pelo risco que representam para o lançamento, e não simplesmente pela quantidade de funcionalidades ausentes.

| Item                                                     | Impacto                                             | Prioridade   | Esforço |
| -------------------------------------------------------- | --------------------------------------------------- | ------------ | ------- |
| CI automatizado em PRs e `main`                          | Sem qualidade continuamente reproduzível            | Crítico      | 6–10 h  |
| Homologação de distribuição em repositórios consumidores | Falhas de instalação podem afetar terceiros         | Crítico      | 8–12 h  |
| Hardening de caminhos, symlinks e falhas parciais        | Risco de escrita fora do destino pretendido         | Crítico      | 8–14 h  |
| Validação comportamental das Skills                      | Estrutura válida não garante execução correta       | Crítico      | 12–20 h |
| Release público versionado                               | Impede consumo externo estável                      | Crítico      | 4–8 h   |
| Documentação de segurança e contribuição                 | Reduz confiança e capacidade de manutenção          | Alto         | 4–8 h   |
| Compatibilidade efetiva no Windows                       | Pode afetar DX e diagnóstico de ambiente            | Alto         | 3–6 h   |
| Harmonização do README e documentos atuais               | Pode induzir novos usuários a conclusões incorretas | Alto         | 4–6 h   |
| Backlog e roadmap públicos rastreáveis                   | Dificulta priorização e colaboração                 | Alto         | 3–5 h   |
| Métricas de cobertura automatizadas                      | Lacuna na mensuração objetiva de qualidade          | Alto         | 4–6 h   |
| Versionamento dos contratos e compatibilidade            | Risco de mudanças incompatíveis no futuro           | Médio        | 6–12 h  |
| Harness semântico automatizado mais amplo                | Falta medição de seleção e qualidade dos resultados | Médio        | 16–30 h |
| Framework de autoria de novas Skills                     | Limita evolução para plataforma extensível          | Médio        | 24–40 h |
| Marketplace e descoberta remota                          | Expande alcance, mas não resolve o MVP              | Baixo, agora | 40+ h   |

Estimativas em horas-pessoa, para planejamento; não são medições de execução. Dependem da complexidade revelada pelos testes e da disponibilidade do mantenedor.

### Dois riscos de engenharia merecem destaque

1\. Proteção do filesystem. O instalador utiliza resolução lexical de caminhos e pré-verificação de conflitos. Isso é positivo, mas não constitui demonstração completa de resistência a diretórios de destino manipulados por links simbólicos ou a alterações concorrentes. Recomendo um teste de segurança específico antes de considerar esse comportamento homologado. Não estou afirmando que uma exploração tenha sido reproduzida.

2\. Validação semântica. O projeto possui a matriz K1–K8, mas ela é uma referência manual. Não está integrada ao `npm test` e não mede automaticamente a seleção correta das Skills em diferentes modelos e ferramentas.

Essa lacuna é mais relevante para a qualidade real dos agentes do que aumentar indefinidamente as verificações de igualdade textual do manifesto.

## 7. Roadmap para produção

Minha recomendação é usar três fases com critérios de saída verificáveis. Datas devem ser tratadas como previsão de planejamento, não compromisso incondicional.

### Fase 1 — Produção Mínima Viável

Janela sugerida: novembro a dezembro de 2026

Objetivo: publicar uma versão beta utilizável do catálogo existente, sem ampliar o escopo de funcionalidades.

| Entrega                                      | Motivo e impacto                      | Dependência             | Estimativa |
| -------------------------------------------- | ------------------------------------- | ----------------------- | ---------- |
| Congelar o escopo das 18 Skills              | Evitar retrabalho; preservar baseline | Nenhuma                 | 2–4 h      |
| Implantar CI                                 | Garantir regressão automática         | Testes existentes       | 6–10 h     |
| Testar instalação e empacotamento end-to-end | Provar portabilidade da distribuição  | CI básico               | 8–12 h     |
| Validar segurança de instalação              | Controlar efeitos indesejados         | Testes de filesystem    | 8–14 h     |
| Homologar cenários representativos de hosts  | Medir funcionamento real              | Instalação reproduzível | 10–16 h    |
| Consolidar README, onboarding e exemplos     | Viabilizar consumo externo            | Comportamento estável   | 4–8 h      |
| Formalizar contribuição, segurança e versão  | Preparar publicação Open Source       | Escopo congelado        | 4–6 h      |
| Publicar release beta                        | Tornar o produto consumível           | Gates anteriores        | 2–4 h      |

Critério de saída: um terceiro consegue instalar, validar e utilizar o pacote em um repositório novo, seguindo instruções reproduzíveis, sem depender do ambiente do mantenedor.

### Fase 2 — Produção Corporativa

Janela sugerida: janeiro a março de 2027

| Entrega                                       | Motivo e impacto                    | Dependência               | Estimativa |
| --------------------------------------------- | ----------------------------------- | ------------------------- | ---------- |
| Harness automatizado de cenários              | Evitar regressões comportamentais   | Matriz de referência      | 16–24 h    |
| Versionamento e compatibilidade dos contratos | Proteger consumidores               | Política de versionamento | 6–10 h     |
| Homologação mais ampla dos quatro hosts       | Melhorar confiança de portabilidade | Ambientes disponíveis     | 12–20 h    |
| Hardening adicional de distribuição           | Melhorar integridade operacional    | Threat model              | 8–12 h     |
| Evidências de qualidade por release           | Tornar a evolução auditável         | CI                        | 6–10 h     |
| Validação por consumidores independentes      | Revelar problemas reais de adoção   | Beta público              | 10–16 h    |

Critério de saída: versão `1.0.0` tecnicamente estável, com contratos de compatibilidade e evidência de uso independente.

Isso representa prontidão do pacote para consumo corporativo supervisionado, não certificação de todas as decisões tomadas por qualquer agente que utilize as Skills.

### Fase 3 — Referência de Mercado

Janela sugerida: segundo semestre de 2027

| Entrega                         | Motivo e impacto                        | Dependência             | Estimativa |
| ------------------------------- | --------------------------------------- | ----------------------- | ---------- |
| Skill Authoring Kit             | Permitir criação de novas Skills        | Contratos estabilizados | 24–40 h    |
| Evaluation Framework            | Avaliar resultados em modelos distintos | Harness consolidado     | 30–50 h    |
| Integrações de governança de IA | Ampliar aplicação corporativa           | Contratos versionados   | 30–60 h    |
| Catálogo e descoberta de Skills | Melhorar reutilização                   | Modelo de extensão      | 20–40 h    |
| Marketplace comunitário         | Expandir ecossistema                    | Adoção comprovada       | 60+ h      |

Critério de saída: consumidores externos desenvolvem, validam e compartilham Skills próprias com os mesmos contratos e critérios de qualidade.

Essa é a fase em que a denominação framework de desenvolvimento de Skills passa a corresponder mais amplamente ao produto.

## 8. Plano de produção e critérios de Go Live

### Definição de MVP de produção

O menor produto disponibilizável é:

> Uma distribuição versionada das 18 Skills existentes, com contratos íntegros, instalação segura, validação reproduzível e documentação suficiente para adoção externa.

Não é necessário criar um servidor, banco de dados, dashboard, agente autônomo ou arquitetura de microserviços.

A distribuição inicial pode utilizar o próprio GitHub Releases. Publicação no npm não precisa ser condição para o MVP.

O `private: true` do `package.json` pode continuar enquanto a distribuição ocorrer pelo GitHub; tornar o repositório público e publicar um pacote npm são decisões diferentes.

### Critérios verificáveis de Go Live

Checklist para liberação

0/21 critérios revisados

Integridade e testes

100% dos testes automatizados passando no commit candidato

Cobertura de linhas ≥85% e branches ≥75% nos módulos executáveis, após instrumentação

Matriz CI em Linux e Windows; macOS para compatibilidade adicional

Nenhuma regressão conhecida classificada como bloqueante

Comportamento e interoperabilidade

18/18 Skills estruturalmente válidas e instaláveis

Instalação idempotente, validação de cópia e detecção de divergência

Oito cenários K1–K8 verificados, com evidências por host testado

Ao menos dois hosts homologados ponta a ponta; os demais explicitamente experimentais

Segurança

Sem achados Críticos ou Altos abertos no escopo distribuído

Teste de symlink, traversal, colisão e falha parcial do instalador

Proteção de credenciais e revisão dos caminhos alterados pela CLI

Política SECURITY.md e procedimento de divulgação responsável

Produto e publicação

README reproduzível por novo usuário

Pelo menos dois exemplos completos de aplicação

CONTRIBUTING.md, licença e changelog coerentes

Tag e release com checklist, commit SHA e evidência de validação

Nenhum conteúdo confidencial exposto ao tornar o repositório público

Evidências operacionais

CI com histórico de resultados consultável

Relatório de validação e ambiente por release

Saídas e códigos de erro da CLI documentados

Procedimento de rollback via versão ou tag anterior

Limpar marcações

Critérios propostos para o MVP. A marcação é um controle de planejamento, não executa testes nem consulta o GitHub.

Os limites de cobertura são metas de aceite propostas; não devem ser apresentados como níveis já atingidos. Para o futuro `1.0.0`, acrescentaria a exigência de pelo menos três consumidores-piloto independentes, revisão de compatibilidade e ciclos de atualização sem regressões bloqueantes.

### Fluxo de release recomendado

```
PR
 └─ CI obrigatória
     ├─ validate
     ├─ unit tests + coverage
     ├─ distribution tests
     └─ security regression
             ↓
       Candidate Release
             ↓
        Host Smoke Tests
             ↓
        Release Checklist
             ↓
        Tag + GitHub Release
             ↓
        Consumer Validation
```

A primeira versão pública pode ser `v0.9.0`, identificada como beta. O `1.0.0` só deve ser publicado quando o contrato público estiver estável.

A mudança do identificador atual `1.0.0-scaffold` precisa ocorrer juntamente com os testes e documentos que o verificam. Evite apenas alterar uma string e deixar as demais evidências inconsistentes.

## 9. Estratégia de aceleração — análise 80/20

A análise abaixo usa a regra 80/20 como heurística de priorização, não como resultado estatisticamente medido.

### Iniciativas de maior retorno

1

CI e regressão automática

Transforma testes existentes em evidência contínua.

2

Instalação segura e homologação E2E

Reduz risco operacional ao distribuir o pacote.

3

Golden tests comportamentais

Valida o que realmente importa: seleção e execução correta.

4

Onboarding reproduzível

Reduz atrito para adoção e feedback externo.

5

Release beta público

Cria o primeiro ponto real de validação de produto.

### O que simplificar imediatamente

A maior oportunidade de aceleração é deixar de tratar cada evolução pequena como uma nova expansão arquitetural do produto.

O histórico v1-A24 a v1-A32 demonstra forte disciplina documental, mas também mostra que alterações pequenas podem produzir muitos registros complementares. Parte dessa rastreabilidade é valiosa; parte do custo pode ser reduzida sem sacrificar auditoria.

Recomendo:

1. Um único documento curto de estado atual, com versão e links para evidências.
2. ADR somente para decisões arquiteturais duráveis, não para cada mudança operacional.
3. Histórico detalhado preservado, mas fora das fontes ativas de trabalho cotidiano.
4. Backlog executável no GitHub Issues, com escopo limitado à versão em preparação.
5. Automatizar primeiro o que já existe, antes de desenvolver validadores adicionais.

### O que pode ser adiado

`sync`, uninstall, instalação global, marketplace, roteador automático, detecção extensiva de plataforma, dashboards, agentes coordenadores, RAG interno e integração com múltiplos frameworks de execução.

Esses recursos podem gerar valor futuramente, mas nenhum deles é uma condição técnica necessária para publicar o catálogo atual com qualidade.

A meta da aceleração deve ser diminuir o caminho crítico do release, e não diminuir a exigência dos testes.

## 10. Avaliação Open Source

O projeto possui uma base forte de documentação técnica, mas ainda carece das superfícies fundamentais para participação externa.

| Área               | Situação                                                    | Recomendação                                      |
| ------------------ | ----------------------------------------------------------- | ------------------------------------------------- |
| README             | Bom conteúdo técnico; referências históricas desatualizadas | Acrescentar quickstart validado e status por host |
| LICENSE            | MIT implementada                                            | Manter                                            |
| CONTRIBUTING.md    | Não identificado                                            | Criar guia curto de contribuições e testes        |
| CODE_OF_CONDUCT.md | Não identificado                                            | Adotar modelo simples                             |
| SECURITY.md        | Não identificado                                            | Criar política de disclosure                      |
| CHANGELOG.md       | Não identificado                                            | Consolidar alterações relevantes por release      |
| Governance         | ADRs e regras internas                                      | Publicar política de mantenedor e decisão         |
| Releases           | Nenhum GitHub Release                                       | Estabelecer versão beta e changelog               |
| Onboarding         | Documentação existente                                      | Testar com usuário sem contexto prévio            |
| Exemplos           | Skills e templates disponíveis                              | Criar exemplos completos de adoção                |
| Issues             | Processo documentado; sem issues independentes verificadas  | Publicar backlog mínimo priorizado                |
| Discussions        | Desabilitadas                                               | Opcional após lançamento                          |
| Wiki               | Desabilitada                                                | Desnecessária; manter docs versionados no repo    |

Projetos como [PydanticAI](https://github.com/pydantic/pydantic-ai?utm_source=chatgpt.com) e [Agent Skills](https://github.com/agentskills/agentskills?utm_source=chatgpt.com) são boas referências de documentação orientada a adoção, exemplos, contratos públicos e trilhas de contribuição.

Não recomendo reproduzir toda a infraestrutura de governança desses projetos. Para um mantenedor individual, um README, CONTRIBUTING, SECURITY, changelog e um processo claro de releases são suficientes para começar.

### Estratégia de adoção

Nos primeiros 60 dias após a publicação, a métrica de sucesso não deve ser o número de estrelas no GitHub.

É preferível encontrar três consumidores que:

- instalem o pacote sem intervenção;
- executem um fluxo real de engenharia;
- identifiquem problemas concretos;
- realizem uma segunda utilização.

Esse processo oferece uma evidência de Product-Market Fit mais forte do que crescimento inicial de visibilidade.

## 11. Backlog priorizado — MoSCoW

| Categoria   | Item                                 | Benefício                          | Esforço    | Risco | Prioridade |
| ----------- | ------------------------------------ | ---------------------------------- | ---------- | ----- | ---------- |
| Must        | CI automatizado                      | Confiança contínua                 | Baixo      | Baixo | P0         |
| Must        | Testes de instalação segura          | Prevenir efeitos indesejados       | Médio      | Médio | P0         |
| Must        | E2E de distribuição                  | Validar portabilidade              | Médio      | Baixo | P0         |
| Must        | Homologação de cenários              | Validar comportamento real         | Médio      | Médio | P0         |
| Must        | Release e versionamento              | Disponibilizar produto             | Baixo      | Baixo | P0         |
| Must        | SECURITY e CONTRIBUTING              | Preparar publicação                | Baixo      | Baixo | P0         |
| Must        | README e exemplos                    | Reduzir atrito de adoção           | Baixo      | Baixo | P0         |
| Should      | Cobertura instrumentada              | Melhorar visibilidade da qualidade | Baixo      | Baixo | P1         |
| Should      | Automatizar matriz K1–K8             | Prevenir regressões de roteamento  | Médio      | Médio | P1         |
| Should      | Homologar Claude Code                | Completar matriz de hosts          | Médio      | Médio | P1         |
| Should      | Estabilizar compatibilidade Windows  | Melhorar DX                        | Baixo      | Médio | P1         |
| Should      | Versionar contratos                  | Preparar evolução segura           | Médio      | Médio | P1         |
| Could       | Skill Authoring Kit                  | Ampliar extensibilidade            | Alto       | Médio | P2         |
| Could       | Benchmarks por modelo                | Quantificar desempenho semântico   | Alto       | Médio | P2         |
| Could       | Integração com frameworks de agentes | Expandir casos de uso              | Alto       | Alto  | P3         |
| Won't agora | Marketplace                          | Não necessário para o MVP          | Muito alto | Alto  | Adiar      |
| Won't agora | Orquestrador multiagente próprio     | Duplica soluções existentes        | Muito alto | Alto  | Adiar      |
| Won't agora | Plataforma SaaS de gestão            | Aumenta custo e escopo             | Muito alto | Alto  | Adiar      |

A ordem de execução do Must Have deve priorizar segurança e testes antes de modificar a visibilidade do repositório.

## 12. Funcionalidades futuras — próximos 12 meses

| Funcionalidade        | Valor estratégico                                              | Complexidade | Horizonte  |
| --------------------- | -------------------------------------------------------------- | ------------ | ---------- |
| AI Governance         | Políticas, responsabilidade, aprovação e rastreabilidade       | Alta         | 3–6 meses  |
| LLMOps                | Versionamento de prompts, modelos e evidências                 | Média        | 3–6 meses  |
| Evaluation Framework  | Comparar fidelidade aos contratos e qualidade de saída         | Alta         | 3–6 meses  |
| Benchmarking          | Comparações reproduzíveis entre clientes/modelos               | Alta         | 6–9 meses  |
| Multi-Agent           | Contratos de delegação e handoff entre agentes                 | Alta         | 6–9 meses  |
| RAG Skills            | Padrões de ingestão, recuperação e avaliação                   | Média        | 6–9 meses  |
| Knowledge Management  | Captura, validade e recuperação de decisões                    | Média        | 3–6 meses  |
| Security Controls     | Políticas de acesso, avaliação de inputs e limites de execução | Alta         | 3–9 meses  |
| Marketplace de Skills | Publicação, descoberta e validação comunitária                 | Muito alta   | 9–12 meses |

Para o eixo de avaliação, vale utilizar como referência o modelo de tracing, guardrails e avaliações de SDKs existentes, em vez de criar um novo runtime.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.openai.com\&sz=32)

OpenAI API

+2



### Evolução arquitetural proposta

```
2026 — Curated Skills Pack
         |
2027 Q1 — Validated Skills Pack 1.0
         |
2027 Q2 — Skill Authoring + Evaluation
         |
2027 Q3 — Governance + LLMOps Extensions
         |
2027 Q4 — Skill Registry / Marketplace
```

A regra para expandir deve ser: cada novo módulo precisa resolver uma necessidade demonstrada por consumidores.

## 13. Estratégia NotebookLM / Gemini Notebook

Há uma atualização relevante: em 16 de julho de 2026, o Google anunciou a mudança de nome de NotebookLM para Gemini Notebook. O produto continua sendo o ambiente de pesquisa e organização de fontes que você pretende utilizar.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://blog.google\&sz=32)

blog.google

+1



A recomendação é preservar o GitHub como fonte de verdade e usar Gemini Notebook como ambiente de análise, acompanhamento e apoio a decisões.

GitHub — Sistema de registro

Código, contratos, ADRs, Issues, testes, releases e histórico versionado

Fontes selecionadas e sincronizadas

Snapshots identificados por commit SHA, documentos do Drive e evidências de release

Gemini Notebook — Análise e governança

Consultas, auditorias, comparações, riscos e recomendações fundamentadas

GitHub — Decisões aprovadas

Issue, ADR, roadmap ou PR com responsável e evidência de aceite

### 13.1 Organização dos cinco notebooks

NB-01 — Governança do Projeto

Notebook principal. Estado executivo, decisões, riscos, indicadores, releases e evolução semanal.

Fontes: `README.md`, `.ai/project.md`, índice de ADRs, roadmap, decisões de release e snapshot de issues.

NB-02 — Arquitetura Técnica

Contratos, componentes, dependências, fluxos, compatibilidade e revisões arquiteturais.

Fontes: `.ai/architecture.md`, `manifest/skills.json`, `contracts/`, `targets/`, ADRs e decisões arquiteturais.

NB-03 — Produto e Roadmap

MVP, definição de produto, backlog, público-alvo, adoção e priorização.

Fontes: visão do produto, issues priorizadas, critérios de Go Live, roadmap e resultados de pilotos.

NB-04 — Qualidade e Harnesses

Evidências de testes, K1–K8, segurança, regressões e validações dos hosts.

Fontes: relatórios de CI, `references/validation-result.md`, contratos de gates, matriz de rotas e resultados de homologação.

NB-05 — Pesquisa e Benchmarking

Concorrentes, padrões Agent Skills, pesquisas LLMOps, ferramentas e oportunidades futuras.

Fontes: documentação oficial dos frameworks, especificação Agent Skills, análises comparativas e registros de experimentos.

### 13.2 Política de fontes

Não recomendo adicionar os 678 arquivos individualmente. Muitos são históricos e podem gerar respostas com versões conflitantes.

Use pacotes de fontes por finalidade, com:

- identificação do repositório, branch, commit SHA e data;
- distinção entre documento normativo e histórico;
- status `current`, `historical` ou `superseded`;
- links para evidências originais;
- remoção de segredos e informações não destinadas à circulação.

O Gemini Notebook aceita Markdown, arquivos de texto, Google Docs, PDFs e outros tipos de fontes. Documentos no Google Drive podem receber atualizações sincronizadas, conforme disponibilidade do recurso.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://support.google.com\&sz=32)

Gemini Notebook Help

+1



Para a primeira configuração, não é necessário construir um sincronizador GitHub–Drive. Exporte manualmente os documentos principais. Automatize somente quando a atualização manual se tornar um custo recorrente.

Como o repositório é privado, não trate links privados do GitHub como fontes web públicas. Revise também o conteúdo antes de compartilhar notebooks.

### 13.3 Instrução-base para os chats

Configure o seguinte texto como orientação analítica dos notebooks, onde houver suporte a instruções personalizadas:

```
Atue como analista técnico independente do projeto
ai-development-skills-pack.

Use prioritariamente as fontes selecionadas neste notebook.

Regras:
1. Diferencie fatos verificados, inferências e propostas.
2. Cite a fonte e, quando disponível, o commit SHA e a data.
3. Prefira a fonte normativa vigente ao histórico.
4. Identifique evidências conflitantes ou desatualizadas.
5. Nunca transforme intenção, plano ou teste não executado
   em funcionalidade comprovada.
6. Não invente versões, releases, métricas ou resultados.
7. Apresente impacto, risco, dependência e recomendação.
8. Recomende a menor mudança que resolva o problema.
9. Não amplie o escopo sem justificativa.
10. Registre decisões aprovadas no GitHub, não apenas no chat.

Formato de resposta:
- Diagnóstico
- Evidências
- Lacunas
- Impacto
- Recomendação
- Próxima ação verificável
```

O Gemini Notebook permite configurar estilo e extensão das respostas. Não dependa do histórico de chat para registrar decisões duráveis; o suporte oficial indica que perguntas e respostas precisam ser salvas como notas quando se deseja preservá-las.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://workspace.google.im\&sz=32)

Google Workspace



### 13.4 Prompts prontos por papel

Os oito prompts abaixo foram desenhados para serem utilizados com o conjunto de fontes apropriado de cada notebook.

1\. PMO do Projeto

```
Atue como PMO independente do ai-development-skills-pack.

Com base nas fontes vigentes, consolide:
- estágio do projeto e entregas concluídas;
- backlog por prioridade e dependência;
- riscos e impedimentos;
- progresso contra o roadmap;
- decisões pendentes;
- próximas cinco ações com maior valor.

Não confunda artefatos históricos com trabalho em aberto.
Indique evidência para cada conclusão e sinalize dados
indisponíveis. Não invente percentuais de execução.
```

2\. Arquiteto do Projeto

```
Atue como Principal Software Architect.

Avalie o estado atual da arquitetura do projeto,
priorizando contratos, componentes, acoplamentos,
dependências, portabilidade e segurança.

Compare as decisões propostas com manifest, contracts,
ADRs e arquitetura vigentes.

Classifique cada achado por severidade. Proponha somente
alterações necessárias, com impacto, trade-offs,
risco de regressão e validação esperada.
```

3\. Revisor de Código

```
Atue como Principal Software Engineer e Code Reviewer.

Analise as alterações fornecidas contra o contrato
vigente e os critérios de aceite.

Priorize correção, integridade, segurança, regressão,
compatibilidade, testes e manutenção.

Não invente linhas de código ou resultados de execução.
Diferencie achados comprovados de hipóteses.
Apresente severidade, evidência e menor correção possível.

Veredito: PASS, PASS_WITH_NOTES, CHANGES_REQUIRED
ou BLOCKED.
```

4\. Especialista em Documentação

```
Atue como Technical Documentation Lead.

Compare README, documentação normativa, manifesto,
contratos e registros de validação.

Identifique:
- conteúdo desatualizado ou contraditório;
- explicações ausentes;
- problemas de onboarding;
- redundâncias e documentação histórica;
- melhorias na navegação e exemplos.

Priorize alterações sem modificar contratos ou
comportamento do produto. Cite o texto e a versão
que fundamentam cada proposta.
```

5\. Especialista Open Source

```
Atue como Open Source Maintainer e DX Lead.

Audite a prontidão de publicação do projeto:
licença, contribuição, governança, segurança,
versionamento, releases, onboarding e exemplos.

Compare o estado verificado com práticas de projetos
Open Source consolidados.

Separe Must Have de melhorias opcionais.
Priorize ações viáveis para um mantenedor individual.
Não recomende infraestrutura sem necessidade comprovada.
```

6\. Especialista QA

```
Atue como Quality Engineering Lead.

Avalie os testes, quality gates, evidências de validação,
cobertura mensurada e riscos de regressão.

Identifique cenários ausentes, especialmente:
- instalação e segurança de filesystem;
- contratos e artefatos;
- diferenças entre sistemas operacionais;
- compatibilidade dos targets;
- falhas e resultados BLOCKED.

Produza um plano mínimo de testes com critérios
objetivos de aceite e prioridade por risco.
```

7\. Especialista em Harnesses

```
Atue como Evaluation and Harness Architect.

Use as regras R1-R17, os contratos e a matriz K1-K8
para propor um conjunto de avaliações reproduzíveis.

Para cada caso, defina:
- entrada;
- contexto;
- skill esperada;
- rotas proibidas;
- artefato esperado;
- critérios de aprovação;
- evidência coletada;
- custo e dependência de modelo.

Separe validação determinística de avaliação semântica.
Não declare que um caso passou sem execução observada.
```

8\. Comitê Técnico Virtual

```
Simule uma revisão independente com os papéis:
Principal Architect, Principal Engineer, PM,
Security Engineer, QA Lead e Open Source Maintainer.

Avalie a proposta ou release apresentado.

Cada papel deve identificar:
- evidências suficientes;
- objeções fundamentadas;
- riscos bloqueantes;
- alternativas de menor custo.

Depois consolide divergências e apresente uma decisão:
GO, GO WITH CONDITIONS ou NO-GO.

Não favoreça a solução existente por ela já estar
implementada. Distinga consenso de discordância
e liste as condições de aceite.
```

Esses prompts são orientações de análise. Eles não fazem os notebooks executar CI, modificar código ou publicar decisões no GitHub.

### 13.5 Templates de governança

Recomendo manter modelos curtos, versionados no GitHub. O Gemini Notebook pode utilizá-los como referência e auxiliar no preenchimento.

| Template             | Campos obrigatórios                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| Registro de Decisão  | ID, data, contexto, alternativas, decisão, justificativa, consequências, responsável, status, evidências |
| Evolução Semanal     | Semana, commit base, concluído, validado, bloqueado, riscos, mudanças no escopo, próximas ações          |
| Registro de Riscos   | ID, descrição, causa, probabilidade, impacto, mitigação, responsável, prazo, status                      |
| Lições Aprendidas    | Contexto, expectativa, resultado observado, causa, recomendação, aplicação futura                        |
| Roadmap              | Fase, objetivo, entregáveis, dependências, esforço, critério de aceite, status                           |
| Registro de Release  | Versão, commit SHA, alterações, compatibilidade, testes, riscos conhecidos, rollback, aprovação          |
| Revisão Arquitetural | Escopo, baseline, componentes afetados, contratos, trade-offs, segurança, validação, veredito            |
| Indicadores          | KPI, definição, fórmula, baseline, meta, período, fonte, responsável                                     |

Exemplo de template para revisão semanal:

```
# Evolução Semanal — AI Development Skills Pack

Semana: AAAA-WNN
Branch/Commit: main / SHA
Versão: ...
Responsável: ...

## Objetivo da semana
...

## Concluído
- Entrega / Issue / Commit

## Validação
- Teste:
- Ambiente:
- Resultado:
- Evidência:

## Bloqueios
- Problema:
- Impacto:
- Responsável:

## Riscos novos ou alterados
...

## Decisões
- ID / Decisão / Evidência

## Próximas ações
- Ação / Prioridade / Critério de aceite
```

Exemplo para decisão arquitetural:

```
# ADR-NNNN — Título

Status: proposed | accepted | superseded
Data:
Commit de referência:
Responsável:

## Contexto
## Problema
## Alternativas consideradas
## Decisão
## Justificativa e evidências
## Consequências
## Riscos
## Compatibilidade
## Plano de validação
## Decisões relacionadas
```

Os outros templates podem seguir a tabela de campos, sem criar um segundo sistema paralelo aos contratos existentes.

### 13.6 KPIs de governança

| KPI                          | Definição                                                         | Baseline auditado                     | Meta sugerida                 |
| ---------------------------- | ----------------------------------------------------------------- | ------------------------------------- | ----------------------------- |
| Maturidade global            | Média dos 12 domínios desta auditoria                             | 54% estimados                         | ≥75% para GA                  |
| Cobertura documental         | Itens obrigatórios revisados / total obrigatório                  | Não mensurada                         | 100% dos itens de release     |
| Cobertura de testes          | Linhas e branches exercitados                                     | Não mensurada                         | ≥85% linhas; ≥75% branches    |
| Sucesso da suíte             | Testes aprovados / executados                                     | 86/86 documentados                    | 100% no release               |
| Skills implementadas         | Skills `implemented` / total                                      | 18/18                                 | Manter 18/18                  |
| Skills prontas para produção | Skills que passam critérios estruturais e comportamentais / total | Não mensurado                         | 18/18 para GA                 |
| Golden cases                 | Casos K1–K8 aprovados / executados                                | Matriz manual; sem execução integrada | 8/8                           |
| Dívida técnica crítica       | Issues Críticas/Altas abertas                                     | Não consolidada                       | Zero bloqueantes              |
| Adoção independente          | Consumidores que completaram fluxo real                           | Não comprovada                        | 3 pilotos até GA              |
| Cadência de releases         | Releases publicados por período                                   | Zero                                  | Release beta e GA rastreáveis |
| Qualidade da publicação      | Gates aprovados / gates exigidos                                  | Sem processo automatizado             | 100%                          |

A distinção entre `implemented` e production-ready deve aparecer nos indicadores. Hoje, `18/18 implemented` é verdadeiro, mas não permite concluir que `18/18` estejam homologadas em todos os hosts.

## 14. Matriz de riscos

| Risco                                             | Probabilidade estimada  | Impacto    | Mitigação                                |
| ------------------------------------------------- | ----------------------- | ---------- | ---------------------------------------- |
| Publicação com comportamento não homologado       | Alta                    | Alto       | Golden cases e testes de hosts           |
| Falhas de segurança na distribuição               | Indeterminada           | Crítico    | Threat model e testes adversariais       |
| Regressão sem detecção no PR                      | Alta, na ausência de CI | Alto       | Workflows e checks obrigatórios          |
| Posicionamento de produto excessivamente amplo    | Alta                    | Alto       | Definir produto v0.9 como pacote curado  |
| Complexidade documental crescente                 | Alta                    | Médio      | Índice canônico e arquivamento histórico |
| Divergência entre documentação e implementação    | Média                   | Alto       | Revisão documental no release            |
| Baixa adoção apesar da qualidade técnica          | Média                   | Alto       | Pilotos e feedback orientado a tarefas   |
| Dependência de comportamento específico dos hosts | Alta                    | Médio/Alto | Matriz de compatibilidade por versão     |

A probabilidade dos riscos não corresponde a uma estatística operacional. É uma classificação preliminar baseada na arquitetura e na evidência disponível.

A prioridade é reduzir riscos que possam causar perda de integridade, falsa confiança nos resultados ou dano ao repositório consumidor.

## 15. Plano de execução — próximos 30, 60 e 90 dias

## 30

dias

Até 1º de dezembro de 2026 — Estabilização

Escopo congelado, CI implantado, cobertura instrumentada, riscos de instalação avaliados, documentação revisada e cenários críticos definidos.

Saída: release candidate interno, com relatório de qualidade reproduzível.

## 60

dias

Até 31 de dezembro de 2026 — MVP público

Publicação beta, instalação documentada, exemplos reais, testes de consumidores e processo inicial de contribuição.

Saída: `v0.9.0` disponível como release, desde que os gates sejam aprovados.

## 90

dias

Até 30 de janeiro de 2027 — Candidato a 1.0

Regressão semântica mais abrangente, compatibilidade consolidada, pilotos externos e versão estável dos contratos.

Saída: decisão formal de Go/No-Go para `v1.0.0`.

A sequência pressupõe dedicação média aproximada de 10–15 horas semanais. Ela é viável apenas se o escopo de novos recursos permanecer congelado e não surgirem falhas estruturais significativas.

### Marcos de aprovação

| Marco               | Critério                                             |
| ------------------- | ---------------------------------------------------- |
| M1 — Estabilização  | CI e testes reproduzíveis                            |
| M2 — Segurança      | Instalação sem achados bloqueantes                   |
| M3 — Funcionalidade | Hosts e cenários essenciais validados                |
| M4 — Publicação     | Release beta com onboarding completo                 |
| M5 — Adoção         | Pilotos independentes concluídos                     |
| M6 — GA             | Contratos estáveis, regressão e governança aprovadas |

## 16. Recomendações finais

### Percentual de conclusão e previsão

Conclusão estimada até MVP público

# 65%

Estimativa por entregáveis restantes, considerando o escopo congelado

Maturidade global

# 54%

Índice heurístico desta auditoria

Previsão do MVP

## 13 dez. 2026

v0.9.0 beta, condicionada aos gates

Previsão da versão 1.0

## 31 jan. 2027

Após pilotos e decisão de Go/No-Go

As duas porcentagens não são equivalentes. A conclusão até o MVP mede o progresso estimado dentro do escopo reduzido de lançamento. A maturidade global considera também áreas que continuarão evoluindo após a primeira publicação.

### As 10 ações de maior ROI esperado

| Ordem | Ação                                              | Retorno principal                                           |
| ----- | ------------------------------------------------- | ----------------------------------------------------------- |
| 1     | Implementar GitHub Actions                        | Detectar regressões continuamente                           |
| 2     | Testar instalação segura em cenários adversariais | Reduzir riscos de integridade                               |
| 3     | Homologar fluxos reais em hosts prioritários      | Demonstrar qualidade funcional                              |
| 4     | Automatizar os casos essenciais de roteamento     | Reduzir erros de escolha das Skills                         |
| 5     | Consolidar README e quickstart                    | Acelerar adoção                                             |
| 6     | Publicar dois exemplos completos                  | Demonstrar valor do produto                                 |
| 7     | Criar SECURITY, CONTRIBUTING e changelog          | Preparar o ecossistema Open Source                          |
| 8     | Definir versão e política de compatibilidade      | Reduzir risco para consumidores                             |
| 9     | Publicar beta no GitHub Releases                  | Obter validação externa                                     |
| 10    | Executar três pilotos independentes               | Identificar necessidades reais antes de ampliar o framework |

ROI aqui é relativo ao impacto técnico e de produto esperado, não uma taxa financeira calculada.

### Caminho mais curto para produção

O caminho recomendado é:

```
Manter 18 Skills e 4 targets
          ↓
Congelar novas funcionalidades
          ↓
Implantar CI e medir cobertura
          ↓
Validar segurança do instalador
          ↓
Executar Golden Cases e Host Smoke Tests
          ↓
Atualizar documentação e exemplos
          ↓
Formalizar release e contribuição
          ↓
Publicar v0.9.0 beta
          ↓
Validar com consumidores independentes
          ↓
Corrigir somente regressões e bloqueantes
          ↓
Publicar v1.0.0
```

### Decisão estratégica

Recomendo avançar para a preparação de produção, mas não ampliar o framework agora.

Há três decisões fundamentais:

1. Produto atual: lançar um pacote curado de 18 Skills com contratos e distribuição reproduzível.
2. Qualidade: transformar a validação estrutural e os registros manuais em gates verificáveis de release, incluindo comportamento dos hosts.
3. Evolução: reservar o framework genérico de autoria, Evaluation Framework avançado, governança corporativa e marketplace para etapas posteriores.

O projeto já tem a base técnica necessária para iniciar o processo de publicação. O trabalho de maior valor agora está em comprovar segurança, comportamento, compatibilidade e adoção.

O marco que realmente sinalizará a chegada à produção não será uma nova emenda arquitetural nem a contagem de Skills. Será o primeiro release que um desenvolvedor externo consegue instalar, validar, usar e atualizar sem depender do contexto ou da intervenção do mantenedor.

Veredito final: GO para estabilização e beta; NO-GO para declarar GA ou produção corporativa neste momento.
# MARCO-000 — Diagnóstico inicial

**Data da avaliação:** 1º de novembro de 2026  
**Escopo auditado:** `main`, commit `df1ee5c8ffba`, de 22/10/2026  
**Status:** HISTORICAL BASELINE

Este registro consolida a auditoria inicial. Não é o estado atual do projeto. O texto completo permanece no histórico Git do arquivo `docs/notebooklm/GPT - Auxiliar - Projeto - ai-development-skills-pack.md`.

## 1. Objetivo

Avaliar se o pacote já podia ser declarado pronto para produção corporativa ou para um lançamento Open Source público.

O posicionamento identificado foi um pacote Open Source de skills de engenharia de software e IA, independente de ferramenta, com contratos de artefatos, qualidade verificável e distribuição reproduzível. A auditoria recomendou não tratá-lo, naquele momento, como um framework completo de engenharia de IA.

## 2. Entregas já existentes

- 18 skills com status `implemented`, em seis categorias.
- Quatro targets declarativos: Cursor, Codex, Gemini Antigravity e Claude Code.
- Manifesto, contratos, templates, CLI (`validate`, `install`, `package`, `list`, `doctor`) e distribuição por cópia de diretório.
- Suíte Node.js. A última execução então documentada era 86/86, em `REVIEW-20261022-009`, de 22/10/2026. A auditoria não reexecutou essa suíte.
- Licença MIT.
- Quatro ADRs, de `0001` a `0004`.
- 20 tipos de artefato no manifesto, 15 templates e regras de roteamento R1–R17.
- Observação de hosts com veredito `OBSERVED`. Claude Code permanecia `NOT_RUN`.

A árvore consultada tinha 678 arquivos. Cerca de 505 estavam sob `.ai/`.

## 3. Validações e evidências

Estimativas da auditoria, não medições de cobertura nem indicadores atuais:

- Maturidade global heurística: 54%, média de doze domínios de peso igual. A média aritmética registrada foi 54,1%.
- Avanço estimado até o MVP público, com escopo congelado: 65%.
- CI/CD: 8%. Open Source: 24%. Observabilidade: 25%. Prontidão de produção: 45%.
- Arquitetura: 80%. Reutilização: 82%. Testes: 70%. Documentação: 69%.

Superfície GitHub observada naquela data: repositório privado, versão interna `1.0.0-scaffold`, nenhum GitHub Release, nenhuma execução de Actions retornada, nenhuma Issue independente, Wiki e Discussions desabilitadas. Havia um PR aberto em rascunho, o #15. A API da `main` retornou `protected: false`.

Veredito da auditoria: NO-GO para disponibilidade geral corporativa. O lançamento público ficava condicionado a controles de release e validação externa.

## 4. Decisões relevantes

Estabilizar, validar e publicar o núcleo existente, sem transformar a primeira versão em um novo ciclo de expansão.

O menor produto então definido era uma distribuição versionada das 18 skills, com contratos íntegros, instalação segura, validação reproduzível e documentação suficiente para adoção externa. Não se recomendou servidor, banco, dashboard, agente autônomo nem microserviços.

O roadmap sugerido tinha três fases, com datas tratadas como previsão e não como compromisso:

1. MVP, novembro a dezembro de 2026: congelar as 18 skills, implantar CI, testar instalação, validar segurança do instalador, homologar hosts, consolidar onboarding e publicar um beta.
2. Produção corporativa, janeiro a março de 2027: harness, compatibilidade de contratos, hosts, evidência por release e consumidores independentes. Saída prevista: `1.0.0` estável.
3. Referência de mercado, segundo semestre de 2027: autoria de skills, avaliação, governança e descoberta.

Previsões registradas na auditoria: beta `v0.9.0` em 13/12/2026 e decisão de Go/No-Go para `v1.0.0` em 31/01/2027, condicionadas aos gates e a cerca de 10–15 horas semanais sem novas funcionalidades.

## 5. Riscos e pendências daquela data

Lacunas classificadas como críticas: CI, homologação da distribuição, hardening de caminhos e symlinks, validação comportamental das skills e release público.

Dois riscos de engenharia foram destacados, sem exploração reproduzida na auditoria:

- O instalador usava resolução lexical e pré-verificação de conflitos, sem demonstração contra symlinks nem alterações concorrentes.
- A matriz K1–K8 era referência manual e não entrava no `npm test`.

O `doctor` procurava um executável chamado `git`, com risco conhecido no Windows quando o arquivo é `git.exe`.

## 6. Referências GitHub

- Repositório: https://github.com/pcmbezerra/ai-development-skills-pack
- Commit auditado: `df1ee5c8ffba`
- PR em rascunho na data: https://github.com/pcmbezerra/ai-development-skills-pack/pull/15
- Texto integral da auditoria: histórico Git de `docs/notebooklm/GPT - Auxiliar - Projeto - ai-development-skills-pack.md`

## 7. Status e próximo marco

Status: HISTORICAL BASELINE.

O marco seguinte registrado é a automação de CI, em `MARCO-001-CI-GitHub-Actions.md`.

# AI Development Skills Pack

Dezoito skills de engenharia para Cursor, Codex, Gemini Antigravity e Claude Code. A fonte é a mesma; cada target recebe o catálogo no diretório nativo do projeto.

Baseline arquitetural v1, emendas v1-A1 a v1-A22. A v1-A22 adiciona o comando `list`. O identificador de versão permanece `1.0.0-scaffold`.

**[Instalação](#instalação) · [Catálogo](#catálogo) · [Validação](#validação) · [Limites](#limites) · [Documentação](#documentação)**

## Instalação

Requer Node.js >= 22. Não há dependências npm e não é necessário `npm install`.

```sh
git clone https://github.com/pcmbezerra/ai-development-skills-pack.git
cd ai-development-skills-pack
node bin/ai-dev-skills.mjs --help
node bin/ai-dev-skills.mjs list
node bin/ai-dev-skills.mjs package --target all --output ./dist
node bin/ai-dev-skills.mjs install --target codex --destination ../consumer-repo
node bin/ai-dev-skills.mjs validate --target codex --path ../consumer-repo
```

`package` cria um subdiretório por target em `--output`. `install` grava no diretório nativo do projeto de destino. `validate --target` exige igualdade com a fonte canônica. Reinstalação idêntica é idempotente. Uma skill existente e divergente bloqueia a operação antes da cópia.

| Target | Nome na CLI | Diretório no projeto |
| --- | --- | --- |
| Cursor | `cursor` | `.cursor/skills` |
| Codex | `codex` | `.agents/skills` |
| Gemini Antigravity | `antigravity` | `.agents/skills` |
| Claude Code | `claude-code` | `.claude/skills` |

Codex e Gemini Antigravity usam o mesmo caminho.

## Catálogo

As 18 skills estão `implemented`. Nenhuma permanece `scaffold`. `primaryInvocation` classifica a entrada preferencial e não impede pedido explícito nem composição.

`context-engineering`, `domain-modelling`, `tdd`, `edge-case-analysis` e `code-review` estão classificadas como `model`. As outras treze estão classificadas como `user`.

As frases abaixo traduzem a `description` de `manifest/skills.json`. O texto em inglês do manifest permanece a descrição canônica.

### core

- [setup-ai-development-skills](skills/core/setup-ai-development-skills/SKILL.md) — Cria a configuração local do pacote e o contexto do projeto. Use quando um repositório não tem configuração `.ai` pronta e o pacote deve ser inicializado.
- [workflow](skills/core/workflow/SKILL.md) — Recomenda a menor sequência de skills e não a executa. Use quando várias skills puderem se aplicar ou a ordem do trabalho não estiver clara.
- [clarify](skills/core/clarify/SKILL.md) — Resolve ambiguidade material antes de uma especificação ou mudança. Use quando uma pergunta em aberto puder alterar escopo, comportamento, arquitetura, dados, segurança ou aceitação.
- [context-engineering](skills/core/context-engineering/SKILL.md) — Descobre e mantém o contexto do projeto a partir da evidência do repositório. Use quando o contexto do projeto estiver ausente ou desatualizado e uma skill posterior precisar dele.
- [handoff](skills/core/handoff/SKILL.md) — Transfere o estado verificado do trabalho para outro agente ou outra sessão. Use quando o trabalho estiver incompleto, o contexto puder se perder ou uma transferência explícita tiver sido pedida.

### discovery

- [research](skills/discovery/research/SKILL.md) — Estabelece fatos técnicos externos e deixa alegações sem suporte sem resolução. Use quando o comportamento de uma API, a capacidade de uma biblioteca, a compatibilidade ou um limite de plataforma puder alterar o próximo passo.
- [to-spec](skills/discovery/to-spec/SKILL.md) — Escreve uma especificação `ready` a partir de decisões resolvidas e do contexto do projeto. Use quando as decisões estiverem resolvidas e o próximo passo for uma especificação, não código.
- [domain-modelling](skills/discovery/domain-modelling/SKILL.md) — Modela conceitos de negócio e invariantes quando eles importam. Use quando terminologia, invariantes, transições de estado, eventos ou fronteiras de contexto estiverem em jogo.
- [architecture-design](skills/discovery/architecture-design/SKILL.md) — Define a solução técnica e as decisões arquiteturais duráveis. Use quando fronteiras, interfaces, dados, integrações, segurança, concorrência ou deploy mudarem.
- [to-tickets](skills/discovery/to-tickets/SKILL.md) — Divide uma especificação `ready` em um conjunto executável de tickets. Use quando uma especificação estiver `ready` e o próximo passo forem tickets, não código.

### development

- [diagnose](skills/development/diagnose/SKILL.md) — Identifica a causa de uma falha desconhecida. Use quando o sintoma for conhecido e a causa não. Não use para alterar código primeiro.
- [implement](skills/development/implement/SKILL.md) — Aplica a menor mudança correta de comportamento para um objetivo delimitado. Use quando o comportamento desejado e o escopo já estiverem claros.
- [tdd](skills/development/tdd/SKILL.md) — Aplica um ciclo red, green e refactor para um comportamento. Use quando um teste de regressão, um comportamento complexo ou um pedido explícito de teste primeiro for necessário.
- [refactor](skills/development/refactor/SKILL.md) — Melhora a estrutura interna enquanto o comportamento externo permanece estável. Use quando o objetivo for estrutural e o comportamento não deva mudar, salvo autorização de uma mudança nomeada.

### quality

- [edge-case-analysis](skills/quality/edge-case-analysis/SKILL.md) — Encontra fronteiras não testadas dentro de comportamento já especificado. Use quando houver risco de entrada, estado, tempo, concorrência, integração, segurança ou integridade.
- [code-review](skills/quality/code-review/SKILL.md) — Revisa uma mudança não trivial e não edita código. Use quando uma implementação ou um refactor deva ser revisado antes de ser tratado como concluído.

### documentation

- [docs](skills/documentation/docs/SKILL.md) — Atualiza a documentação para que ela confira com o estado verificado do repositório. Use quando uma mudança afetar API, arquitetura, configuração, operação, onboarding ou comportamento visível.

### modernization

- [modernize](skills/modernization/modernize/SKILL.md) — Planeja uma migração delimitada de runtime, framework ou arquitetura e não a aplica. Use quando o trabalho for modernização, e não um refactor comum.

`workflow` recomenda a rota e não executa skills nem persiste `WORKFLOW_PLAN`. As demais skills gravam somente artefato `ready` e devolvem `BLOCKED` sem arquivo desta tentativa quando o gate não passa. `implement` e `refactor` aplicam a mudança no working tree; `tdd` altera implementação somente quando `implement` compõe a execução. Artefato fora de `ready` não autoriza implementação.

## Validação

```sh
npm run validate
npm run skills:validate
npm test
node bin/ai-dev-skills.mjs validate
```

O validador confere catálogo, nomes, frontmatter, status, dependências, projeção dentro do diretório da skill e descritores dos targets. Ele não executa Cursor, Codex, Gemini Antigravity nem Claude Code.

`.ai/project.md` registra a suíte estrutural em 53 testes.

## Limites

A observação de host da v1-A21 tem veredito `OBSERVED`: Antigravity IDE passou as gates; Cursor não apresentou `FAIL`; em 2026-10-15 o Codex CLI autenticado passou as gates abertas e as duas seleções automáticas do Cursor que estavam `INCONCLUSIVE` passaram na CLI. Claude Code permanece `NOT_RUN`. `OBSERVED` não certifica os hosts.

`list` imprime o nome de cada skill do manifesto, uma por linha, na ordem de `skills`. Não aceita opção e não grava arquivo. Continuam ausentes: `doctor`, `sync`, desinstalação, instalação global, detecção de plataforma, roteador automático e `meta-skills/skill-authoring`. A v1-A22 cobre somente `list`.

O arquivo `LICENSE` é um placeholder. Nenhuma licença foi escolhida e ele não concede permissão de uso, distribuição ou sublicenciamento. `package.json` declara `private: true` e `license` `UNLICENSED`.

## Estrutura

```text
manifest/skills.json     catálogo, invocação, artefatos e dependências
contracts/               contratos compartilhados e por skill
skills/                  fonte das 18 skills
targets/                 descritores dos quatro targets
scripts/                 validação e distribuição
bin/ai-dev-skills.mjs    CLI
templates/               templates de artefatos
docs/agents/             issue tracker, rótulos e domínio
.ai/                     contexto e artefatos deste repositório
```

Cada diretório de skill carrega `SKILL.md`, `references/` e `assets/`. O contrato canônico continua em `contracts/`. O instalador copia o diretório e não reescreve links.

## Documentação

- [Proveniência e limitações](references/provenance.md)
- [Contrato arquitetural v1](references/architecture-contract-v1.md)
- [Evidência de validação](references/validation-result.md)
- [Contrato compartilhado](contracts/skill-contract.md)
- [Artefatos](contracts/artifacts.md)
- [Routing R1–R17](contracts/routing.md)
- [Gates](contracts/quality-gates.md)
- [Falha e fallback](contracts/failure.md)
- [Sequências de workflow](contracts/workflows.md)
- [Glossário](CONTEXT.md)
- [Arquitetura deste repositório](.ai/architecture.md)
- [Estado do projeto](.ai/project.md)
- [Domínio para agentes](docs/agents/domain.md)
- [Issue tracker](docs/agents/issue-tracker.md)
- [Rótulos de triagem](docs/agents/triage-labels.md)

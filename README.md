# AI - Development Skills Pack

Baseline arquitetural v1 + emendas v1-A1/v1-A2/v1-A3/v1-A4/v1-A5/v1-A6/v1-A7/v1-A8/v1-A9/v1-A10/v1-A11/v1-A12/v1-A13/v1-A14/v1-A15/v1-A16 com exatamente 18 skills para Cursor, Codex, Gemini Antigravity e Claude Code, reconciliado com o [contrato completo](references/architecture-contract-v1.md), seções 1–27. Requer Node.js >=22 e Git; sem dependências npm e sem necessidade de `npm install`.

```sh
npm run validate
npm run skills:validate
npm test
node bin/ai-dev-skills.mjs validate
node bin/ai-dev-skills.mjs package --target all --output ./dist
node bin/ai-dev-skills.mjs install --target codex --destination ../consumer-repo
node bin/ai-dev-skills.mjs validate --target codex --path ../consumer-repo
node bin/ai-dev-skills.mjs --help
```

O [manifest](manifest/skills.json) declara classificação primária, entradas/saídas, artefatos definidos e apenas nomeados, dependências obrigatórias, condicionais e opcionais. Cada skill pode estar `scaffold` ou `implemented`, com o mesmo estado no manifest, contrato e fonte; `context-engineering`, `setup-ai-development-skills`, `workflow`, `clarify`, `handoff`, `research`, `to-spec`, `to-tickets`, `domain-modelling`, `architecture-design`, `implement`, `tdd`, `refactor`, `code-review`, `diagnose` e `edge-case-analysis` estão `implemented` e as outras 2 permanecem `scaffold`. Os quatro targets têm descritores declarativos `implemented`, independentes do ciclo de vida das skills.

A CLI empacota, instala e valida o catálogo completo por target. `package` sempre cria um subdiretório por target sob `--output`; `install` escreve no diretório nativo do projeto de destino; `validate --target` exige igualdade com a fonte canônica. Reinstalação idêntica é idempotente. Uma skill existente e divergente bloqueia toda a operação antes da cópia e nunca é sobrescrita.

| Target | Diretório no projeto |
| --- | --- |
| Codex | `.agents/skills` |
| Cursor | `.cursor/skills` |
| Gemini Antigravity | `.agents/skills` |
| Claude Code | `.claude/skills` |

Consulte [proveniência e limitações](references/provenance.md), [contrato compartilhado](contracts/skill-contract.md), [artefatos](contracts/artifacts.md), [routing R1–R17](contracts/routing.md), [gates de qualidade](contracts/quality-gates.md), [falha e fallback](contracts/failure.md) e [sequências de workflow](contracts/workflows.md).

O validador verifica catálogo físico, nomes, frontmatter no subconjunto emitido, ciclo de vida e consistência de status, classificação, dependências, referências locais, artefatos/templates, ciclos obrigatórios e condicionais e descritores dos targets. Uma skill `implemented` deve definir uma seção `Workflow` não vazia no contrato e na fonte, sem avisos de workflow pendente ou indisponível. O validador por target compara todas as pastas instaladas com a fonte canônica. Ele não executa as skills nem certifica o comportamento dos produtos de destino.

Templates são rascunhos: substitua placeholders e valide evidências antes de marcar `ready`. `LICENSE` permanece placeholder e o pacote está privado. Contexto, bootstrap local, roteamento consultivo por `workflow`, `clarify`, `to-spec`, `to-tickets`, `domain-modelling`, `architecture-design` e distribuição por target estão operacionais. `workflow` recomenda a rota e não executa skills nem persiste `WORKFLOW_PLAN`. `clarify` grava conjunto de decisões `ready` ou `blocked` e não executa a skill seguinte. `to-spec` grava somente spec `ready`. `to-tickets` grava somente conjunto `ready`. `domain-modelling` grava somente modelo `ready`. `architecture-design` grava somente desenho `ready` e, quando a spec já registra a decisão durável, um ADR `ready`. `implement` aplica a menor mudança correta, grava somente relatório `ready` e evidência `ready`, e cita `CHANGE_SET` como working tree. `tdd` grava evidência `ready` própria e a mudança de teste, e só altera implementação quando `implement` compõe a execução. `code-review` grava somente relatório `ready` e não altera código. `handoff` grava somente handoff `ready` com estado verificado e devolve `BLOCKED` sem arquivo desta tentativa quando o gate não passa. Insumo fora de `ready` não autoriza implementação. `research` grava somente relatório `ready`; alegação sem fonte fica em Unknowns e não autoriza o próximo passo. `diagnose` grava somente diagnóstico `ready`, distingue causa confirmada, causa provável e hipótese não confirmada, e devolve `BLOCKED` sem arquivo desta tentativa quando o gate não passa. Causa que não está confirmada, ou causa confirmada sem evidência de regressão, não autoriza implementação. `diagnose` não invoca `tdd`. `refactor` aplica a menor mudança estrutural, grava somente relatório `ready` e evidência `ready`, cita `CHANGE_SET` como working tree e devolve `BLOCKED` sem arquivo e sem mudança desta tentativa quando o gate não passa. O comportamento externo permanece, salvo autorização explícita de uma mudança nomeada. `edge-case-analysis` grava somente relatório `ready`. Cada achado informa comportamento esperado e cobertura. O teste recomendado não alarga o produto. Relatório `ready` não autoriza `implement` a mudar comportamento. Risco de R12 autoriza `code-review` sem invocá-lo. Ausência evidenciada de risco de R12 informa que `code-review` pode ser omitido. O caminho bloqueado não grava arquivo desta tentativa.

Estado atualizado em 2026-10-13: `.ai/artifacts/handoffs/2026-10-06-project-state.md`. Contexto local em `.ai/`, glossário em `CONTEXT.md` e configuração das skills auxiliares em `docs/agents/`. A suíte determinística passou no checkout Windows, em macOS e, nesta emenda, em Linux com Node.js v22.14.0; 48/48 testes passam. Nove cenários agent-driven cobrem o roteamento, onze cobrem `clarify`, dezesseis cobrem `to-spec`, dezoito cobrem `to-tickets`, dezoito cobrem `domain-modelling`, dezoito cobrem `architecture-design`, dezoito cobrem `implement`, treze cobrem `tdd` e `code-review`, doze cobrem `handoff`, dezoito cobrem `research`, quatorze cobrem `diagnose`, dezoito cobrem `refactor` e dezoito cobrem `edge-case-analysis`, sem substituir a suíte determinística. Consulte [references/validation-result.md](references/validation-result.md) para evidências e limites.

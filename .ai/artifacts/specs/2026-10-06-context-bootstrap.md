---
artifact: spec
id: SPEC-20261006-001
version: 1
status: ready
created_by: to-spec
inputs:
  - HANDOFF-20261006-001
  - 0d3b98e
---

# Contexto e bootstrap local

## Problem

O pack define `context-engineering` e `setup-ai-development-skills`, mas ambas ainda são scaffolds. Um agente consegue consultar seus contratos, porém não recebe um workflow operacional para descobrir o contexto de um repositório, criar a configuração mínima, preservar decisões existentes ou decidir entre `READY` e `BLOCKED`. Hoje esse trabalho depende de intervenção manual e não é repetível nem verificável como comportamento das skills.

## Goal

Tornar `context-engineering` e `setup-ai-development-skills` as duas primeiras skills operacionais do pack. O bootstrap deve preparar o estado local mínimo, compor obrigatoriamente a descoberta de contexto e emitir prontidão somente quando configuração e contexto forem utilizáveis. A implementação deve permanecer independente dos quatro targets, sem dependências npm novas e sem alterar código da aplicação consumidora.

## Scope

- Implementar o workflow operacional de `context-engineering` para descobrir e manter os cinco documentos canônicos de contexto do projeto.
- Implementar o workflow operacional de `setup-ai-development-skills` para validar ou criar a configuração mínima e compor `context-engineering`.
- Definir precedência de evidências, preservação de conteúdo existente, idempotência, bloqueios e critérios de prontidão.
- Introduzir no manifest o estado de skill `implemented`, mantendo `scaffold` para as outras 16 skills.
- Ajustar contratos, proveniência, documentação e validador para admitir e verificar um catálogo parcialmente implementado.
- Adicionar validação estrutural automatizada e cenários de conformidade em repositórios-fixture.
- Versionar a mudança de fase como emenda v1-A2, sem alterar responsabilidades, schemas de artefatos, routing, dependências ou targets.

## Non-goals

- Implementar qualquer uma das outras 16 skills.
- Implementar instalador, distribuição, `sync`, `doctor`, `list`, roteamento automático ou detecção de plataforma.
- Adicionar comando de bootstrap à CLI nesta etapa.
- Criar schema ou template canônico para `PROJECT_CONTEXT` ou `BOOTSTRAP_READINESS`, que permanecem saídas apenas nomeadas.
- Alterar o modelo mínimo de configuração, a dependência obrigatória entre as duas skills ou os quatro targets.
- Publicar pacote, definir licença ou certificar compatibilidade real com Cursor, Codex, Gemini Antigravity ou Claude Code.
- Ler serviços externos, criar integrações remotas ou armazenar credenciais.

## Actors

- Mantenedor do pack, que implementa e valida os workflows.
- Agente de IA, que executa as skills sobre um repositório consumidor.
- Repositório consumidor, cuja configuração, documentação, decisões e código devem ser preservados.
- Skill `setup-ai-development-skills`, entrada explícita para bootstrap.
- Skill `context-engineering`, componente obrigatório de descoberta e manutenção de contexto.

## User Stories

1. Como mantenedor, quero que somente as duas skills deste recorte sejam marcadas como implementadas, para que o catálogo represente a capacidade real do pack.
2. Como agente, quero identificar a raiz do repositório antes de ler ou escrever contexto, para que o estado seja criado no projeto correto.
3. Como agente, quero reutilizar configuração válida já existente, para que preferências do projeto não sejam sobrescritas.
4. Como agente, quero criar a configuração mínima quando ela estiver ausente, para que um repositório novo possa usar o pack.
5. Como agente, quero bloquear diante de configuração inválida, para que dados existentes não sejam silenciosamente substituídos.
6. Como mantenedor, quero que o bootstrap invoque obrigatoriamente `context-engineering`, para que `READY` sempre implique contexto inicial disponível.
7. Como agente, quero fundamentar o contexto em evidências locais, para que fatos não sejam inventados.
8. Como agente, quero distinguir fatos, inferências e lacunas, para que consumidores saibam o grau de confiança do contexto.
9. Como mantenedor, quero preservar decisões e documentação existentes, para que o bootstrap não apague conhecimento do projeto.
10. Como agente, quero atualizar somente os documentos de contexto afetados por nova evidência, para reduzir diffs e evitar ruído.
11. Como agente, quero repetir o workflow sem mudanças quando as entradas forem as mesmas, para que a execução seja idempotente.
12. Como mantenedor, quero cenários verificáveis para repositório novo, estado existente, repetição e bloqueios, para que regressões sejam detectáveis.
13. Como mantenedor, quero manter as 18 skills e os quatro targets, para que a primeira implementação operacional não altere o catálogo contratado.
14. Como mantenedor, quero continuar sem dependências npm de produção, para preservar a portabilidade do pack.
15. Como agente, quero um resultado `BLOCKED` com evidência e próximo passo quando não for seguro continuar, para que falhas não sejam apresentadas como sucesso.
16. Como agente, quero que arquivos da aplicação permaneçam intocados, para que o bootstrap se limite ao estado do pack.
17. Como mantenedor, quero que as saídas apenas nomeadas continuem sem schema inventado, para preservar o baseline v1.
18. Como mantenedor, quero que limitações de plataforma sejam registradas, para que fixtures em um sistema operacional não sejam tratadas como certificação multiplataforma.

## Functional Requirements

### Context engineering

1. A skill deve localizar e operar na raiz do repositório fornecido ou do workspace ativo. Se não houver uma raiz acessível e inequívoca, deve retornar `BLOCKED`.
2. A skill deve consultar, quando presentes, configuração do pack, decisões, manifestos de build/dependências, estrutura de código, documentação mantida e testes relevantes.
3. A precedência deve ser: decisões e configuração explícitas; evidência executável ou estrutural do repositório; documentação atual; inferências do agente. Inferências devem ser identificadas como tais e não podem substituir evidência conflitante.
4. A skill deve criar ou manter os documentos `project.md`, `architecture.md`, `standards.md`, `tech-stack.md` e `business-rules.md` sob o diretório de estado `.ai`.
5. Cada afirmação material deve ser rastreável a evidência local ou marcada como hipótese/lacuna. Fatos, recomendações e pendências não podem ser misturados.
6. Conteúdo existente deve ser preservado quando não for contradito por evidência mais forte. Conflito material sem resolução deve produzir `BLOCKED` antes de qualquer sobrescrita destrutiva.
7. Arquivos ausentes devem ser criados com conteúdo mínimo baseado em evidência. Se não houver evidência para uma seção, a lacuna deve ser registrada em vez de preenchida por suposição.
8. Uma segunda execução com as mesmas entradas não deve produzir mudanças.
9. `PROJECT_CONTEXT` continua sendo a composição dos cinco documentos canônicos; nenhum artefato ou template adicional deve ser criado para representá-lo.

### Setup AI development skills

10. A skill deve inspecionar a configuração existente antes de escrever qualquer arquivo.
11. Quando a configuração estiver ausente, a skill deve criar o modelo mínimo versionado com tracker local e os caminhos canônicos de specs, tickets, ADRs e documentação, salvo quando evidência explícita do repositório determinar valores diferentes.
12. Quando a configuração existente for válida, todos os valores existentes devem ser preservados, inclusive integrações opcionais desconhecidas pela implementação.
13. Quando a configuração estiver sintaticamente inválida, tiver versão incompatível ou caminhos inseguros fora do repositório, a skill deve retornar `BLOCKED` e não substituir o arquivo.
14. Após obter configuração válida, a skill deve compor `context-engineering`; falha ou bloqueio da dependência deve bloquear o bootstrap.
15. O bootstrap só pode declarar `READY` quando a configuração for válida e os cinco documentos de contexto existirem e estiverem fundamentados no nível possível pelas evidências disponíveis.
16. `BOOTSTRAP_READINESS` deve permanecer um resultado de execução apenas nomeado. A implementação pode emitir `Status: READY` ou o formato `BLOCKED` já contratado, mas não deve persistir um novo schema/template canônico.
17. A skill não pode modificar código da aplicação, configuração de build da aplicação, decisões existentes ou arquivos fora do estado/documentação autorizados pelo workflow.

### Estado e validação do catálogo

18. O status `implemented` deve ser aceito para skills operacionais; `scaffold` deve continuar sendo o estado das skills sem workflow implementado.
19. `context-engineering` e `setup-ai-development-skills` devem mudar para `implemented` de forma consistente no manifest, contrato e fonte da skill. As outras 16 skills devem permanecer `scaffold`.
20. O validador deve rejeitar divergência entre o status do manifest, o contrato e a fonte da skill, bem como uma skill `implemented` que ainda contenha o aviso de workflow não implementado.
21. O status dos targets continua `scaffold`, pois implementação de skill não significa instalação ou compatibilidade do target.
22. A contagem de skills, os nomes, as classes de invocação e as dependências existentes devem permanecer inalterados.

## Business Rules

- Estado e conhecimento específicos do projeto consumidor ficam fora da fonte reutilizável das skills.
- Uma dependência ou entrada bloqueada não pode autorizar prontidão.
- Configuração e decisões existentes têm precedência sobre defaults do pack.
- O workflow deve preservar conteúdo desconhecido que não viole o contrato.
- `READY` do bootstrap e status `ready` de um artefato são conceitos distintos.
- `PROJECT_CONTEXT` e `BOOTSTRAP_READINESS` permanecem saídas apenas nomeadas.
- A implementação não muda a semântica required/conditional/optional: `context-engineering` continua dependência obrigatória do bootstrap.
- As 18 skills e os quatro targets constituem conjuntos fechados neste recorte.

## Non-functional Requirements

- Idempotência: entradas inalteradas devem resultar em diff vazio na segunda execução.
- Segurança de escrita: falhas não podem truncar configuração ou documentos existentes.
- Portabilidade: instruções e caminhos devem funcionar conceitualmente em Windows, macOS e Linux, sem caminhos específicos de target ou sistema operacional.
- Auditabilidade: alterações e bloqueios devem indicar as evidências que os motivaram.
- Minimalidade: produzir somente arquivos necessários e evitar diretórios vazios ou conteúdo genérico sem evidência.
- Compatibilidade: manter Node.js >=22, módulos nativos e dependências de produção vazias.
- Legibilidade: `SKILL.md` deve permanecer conciso; orientação detalhada pode ir para referências da própria skill quando necessária.

## Technical Constraints

- A implementação deve usar a estrutura de skills já contratada e permanecer independente de Cursor, Codex, Gemini Antigravity e Claude Code.
- Não adicionar dependências npm de produção ou desenvolvimento.
- Não criar um executor de workflows nem ampliar a CLI nesta etapa.
- Scripts sob uma skill somente podem ser adicionados para operações determinísticas claramente justificadas; descoberta semântica continua descrita como workflow do agente.
- A emenda v1-A2 deve registrar a passagem de scaffold integral para catálogo parcialmente implementado. O pacote pode manter a versão privada `1.0.0-scaffold`; o status por skill passa a ser a fonte de verdade da prontidão operacional.
- O validador deve continuar aceitando LF e CRLF sem normalizar o checkout.
- Nenhum novo schema de artefato, regra de routing, dependência obrigatória ou interface de target será introduzido.

## Implementation Decisions

- O recorte implementa instruções operacionais nas duas skills e atualiza seus contratos; não cria serviço, biblioteca de runtime ou comando novo.
- A configuração mínima usa tracker local por padrão. Configuração válida preexistente, inclusive tracker remoto, é preservada.
- A descoberta de contexto usa precedência explícita de evidências e bloqueia conflitos materiais que não possam ser resolvidos localmente.
- O catálogo passa a aceitar ciclo de vida misto por skill: `scaffold` ou `implemented`. A prontidão de targets continua independente.
- A mudança será documentada como emenda v1-A2 porque altera a fronteira de implementação, mas não altera as responsabilidades arquiteturais existentes.
- O resultado pronto do bootstrap será comunicado durante a execução; não será criado artefato persistido adicional para readiness.
- Publicação desta SPEC no GitHub fica pendente porque `gh` não está disponível no ambiente atual. O rótulo pretendido é `ready-for-agent`; o Markdown local é a fonte de verdade até reconciliação remota.

## Security / Privacy

- Não registrar segredos, tokens, credenciais, conteúdo de arquivos de ambiente ou dados pessoais nos documentos de contexto.
- Não seguir caminhos configurados que escapem da raiz do repositório.
- Não substituir configuração inválida como forma de recuperação automática.
- Não ler ou publicar dados externos durante o bootstrap.
- Quando uma evidência puder conter segredo, registrar apenas sua existência e o efeito arquitetural necessário, sem copiar o valor.

## Testing Decisions

- O seam principal é a execução completa de cada skill contra repositórios-fixture e a inspeção do resultado observável: arquivos criados ou preservados, diff e status `READY`/`BLOCKED`.
- Os cenários de conformidade devem cobrir repositório novo, configuração e decisões existentes, segunda execução idempotente, configuração inválida, caminho inseguro e conflito material de evidências.
- Os testes devem verificar comportamento externo e conteúdo material; não devem acoplar-se à ordem interna de leitura ou à redação exata das instruções.
- A validação automatizada existente continuará exercitando `validate(root)` em cópias temporárias. Novas regressões devem cobrir estados `scaffold` e `implemented`, inconsistência entre fontes e preservação das 18 skills/quatro targets.
- Cenários que dependem de interpretação do agente devem gerar `TEST_EVIDENCE` a partir de execução isolada; não serão apresentados como testes determinísticos do Node.js.
- A suíte atual de LF/CRLF, ciclos de dependência, artefatos, targets e scaffold permanece como baseline de regressão.

## Acceptance Criteria

1. Dado um repositório sem diretório `.ai`, ao executar o bootstrap, a configuração mínima e os cinco documentos canônicos de contexto são criados somente com evidências locais, e o resultado é `READY`.
2. Dado um repositório com configuração válida, decisões e contexto existente, a execução preserva valores desconhecidos, decisões e conteúdo não contradito.
3. Dada uma segunda execução sem mudança nas entradas, o diff do repositório é vazio.
4. Dada configuração JSON inválida, versão incompatível ou caminho que escape do repositório, a execução retorna `BLOCKED` com Reason, Evidence, Missing prerequisite e Recommended next skill/action, sem modificar o arquivo inválido.
5. Dado conflito material entre decisão explícita e outra evidência, `context-engineering` retorna `BLOCKED` e não sobrescreve a decisão.
6. Quando `context-engineering` bloqueia ou falha, o bootstrap não retorna `READY`.
7. Após bootstrap bem-sucedido, nenhuma mudança existe fora da configuração, dos cinco documentos de contexto e de diretórios estritamente necessários para esses arquivos.
8. Nenhum segredo ou valor de credencial presente nas fixtures aparece nas saídas geradas.
9. O manifest contém exatamente 18 skills: as duas deste recorte com status `implemented` e as outras 16 com status `scaffold`; os quatro targets permanecem declarativos e `scaffold`.
10. O validador rejeita cada inconsistência de status entre manifest, contrato e fonte da skill e aceita o estado misto correto.
11. `PROJECT_CONTEXT` e `BOOTSTRAP_READINESS` permanecem sem template/schema canônico novo.
12. `package.json` continua sem dependências; nenhum comando novo é adicionado à CLI.
13. `npm run validate`, `npm test`, `npm run skills:validate`, ajuda da CLI e validação pela CLI terminam com código zero.
14. Evidências de execução registram ambiente e distinguem claramente cobertura por fixtures de compatibilidade real nos quatro targets e sistemas operacionais não executados.

## Risks

- A interpretação semântica por agentes pode variar; a precedência de evidências e os cenários de conformidade reduzem, mas não eliminam, essa variação.
- Atualização de contexto existente pode apagar nuances; preservação por padrão, diffs mínimos e bloqueio em conflito material mitigam o risco.
- Um estado misto de catálogo pode ser confundido com produto totalmente operacional; manifest, documentação e validação devem deixar explícitas as 16 skills ainda scaffold.
- O default de tracker local pode divergir de uma integração desejada; configuração existente e evidência explícita sempre prevalecem.
- Testes estruturais podem dar falsa confiança sobre execução por agentes; evidência de conformidade deve ser separada dos testes determinísticos.

## Open Questions

Nenhuma questão bloqueante. Publicação remota e certificação nos quatro targets permanecem trabalho futuro e não alteram os critérios desta SPEC.

## Out of Scope

Instalação e distribuição nos targets, execução automática de cadeia completa, integração com GitHub, geração de tickets, implementação das demais skills, release e compatibilidade multiplataforma certificada.

## Further Notes

Esta SPEC satisfaz o specification gate: o escopo está delimitado, os critérios são verificáveis e não há ambiguidade bloqueante. O próximo artefato permitido por R10 é um `TICKET_SET` derivado desta SPEC pronta.

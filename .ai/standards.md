# Convenções

Preservar exatamente as 18 skills do manifest. Fonte reutilizável independente da ferramenta; estado específico fora de `skills/`. Sem dependências npm de produção ou implementação de instalador. Contexto, bootstrap, workflow, clarify, to-spec, to-tickets, domain-modelling, architecture-design, implement, tdd, code-review e handoff estão operacionais nesta etapa; as outras 6 skills permanecem scaffold.

Antes de alterar contratos, ler proveniência e contrato da skill; para artefatos ou routing, ler os contratos compartilhados correspondentes. Alterações arquiteturais exigem tratamento explícito de versão.

Executar `npm run validate` após mudanças estruturais. Usar `npm test` para alterações no comportamento do validador. Reportar falhas e limites de plataforma sem convertê-los em sucesso.

Manter dependências obrigatórias, condicionais e opcionais distintas. Não inventar esquemas para saídas apenas nomeadas. Templates permanecem draft; prontidão de artefatos exige evidência.

Documentar fatos verificados separadamente de recomendações. Não criar ADR para mera descrição de estado. Não publicar issues, labels ou alterações remotas sem solicitação.

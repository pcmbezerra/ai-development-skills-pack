# Cross-cutting concerns and integrations

17. Cross-cutting concerns
The following are NOT separate v1 skills:
security-review
performance-review
test-generation
codebase-design
dependency-upgrade
They are cross-cutting capabilities.
Security SHALL be considered by:
to-spec
architecture-design
implement
code-review
modernize
Performance SHALL be considered by:
architecture-design
diagnose
implement
code-review
modernize
Testing SHALL be covered by:
tdd
implement
edge-case-analysis
code-review

18. External integrations
The pack SHALL NOT depend on a specific:
issue tracker
CI platform
Git provider
LLM provider
MCP server
documentation platform
Optional adapters MAY support:
GitHub
Azure DevOps
Linear
Jira
MCP
external search
documentation systems
Fallback SHALL remain local artifacts.

See [principles](architecture-contract-v1.md) section 2 for security, privacy and Responsible AI obligations. This reconciliation records obligations without inventing detailed security policies or implementing adapters.

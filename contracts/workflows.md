# Canonical workflow sequences — design only

These are artifact-flow sequences, not mandatory dependency edges or executable workflows. Conditions in [routing](routing.md) govern omitted phases.

```text
Repository Bootstrap
setup-ai-development-skills
        ↓
context-engineering
        ↓
READY
New Feature
workflow
   ↓
clarify
   ↓
research (when needed)
   ↓
to-spec
   ↓
domain-modelling (when needed)
   ↓
architecture-design (when needed)
   ↓
to-tickets
   ↓
implement
   ├── tdd
   ├── edge-case-analysis
   └── code-review
   ↓
docs
Bug
diagnose
   ↓
regression test
   ↓
implement
   ↓
code-review
Refactoring
behaviour baseline
   ↓
refactor
   ↓
tests
   ↓
code-review
Modernization
context-engineering
   ↓
modernize
   ↓
research / diagnose
   ↓
architecture-design
   ↓
to-tickets
   ↓
implement incrementally
   ↓
code-review
   ↓
docs
Session Continuity
current state
   ↓
handoff
   ↓
new agent/session
   ↓
resume from verified artifacts
```

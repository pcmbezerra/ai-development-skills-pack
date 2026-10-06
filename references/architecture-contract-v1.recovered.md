# AI - Development Skills Pack v1
## Architecture Contract

**Status:** Baseline v1  
**Targets Tier 1:** Cursor, Codex, Gemini Antigravity  
**Architecture:** Multi-agent, tool-agnostic, artifact-driven  
**Principle:** Skills implement reusable workflows; project knowledge and state remain outside the skills.

---

# 1. Purpose

The **AI - Development Skills Pack** provides a consistent software-engineering workflow for AI coding agents.

The pack SHALL support:

- project bootstrap;
- context engineering;
- requirements clarification;
- technical research;
- specification;
- domain modelling;
- architecture design;
- work decomposition;
- implementation;
- TDD;
- debugging;
- refactoring;
- edge-case analysis;
- code review;
- documentation;
- modernization;
- session/agent handoff.

The same source skills SHALL be distributable to:

- Cursor;
- Codex;
- Gemini Antigravity.

Skills SHALL NOT contain project-specific knowledge.

---

# 2. Architectural principles

All v1 skills SHALL follow these rules:

1. Prefer repository evidence over assumptions.
2. Never invent project conventions, APIs, architecture or business rules.
3. Existing project decisions override generic recommendations.
4. Make the smallest correct change.
5. Do not modify unrelated code.
6. Do not introduce dependencies without justification.
7. Separate facts, assumptions, decisions and recommendations.
8. Persist durable decisions as artifacts.
9. Validate work before declaring completion.
10. Preserve traceability between request → decision → spec → ticket → change → review.
11. Security, privacy and Responsible AI are cross-cutting concerns.
12. Skills SHALL remain tool-agnostic whenever possible.
13. Integrations SHALL be optional capabilities, not hard dependencies.
14. Skills SHOULD compose other skills instead of duplicating their responsibilities.

---

# 3. Skill classes

Every skill has a **primary invocation class**.

## 3.1 User-invoked

These skills are valid entry points for a user request:

| Skill | Responsibility |
|---|---|
| `setup-ai-development-skills` | Bootstrap repository for the pack |
| `workflow` | Route work to the correct skill/workflow |
| `clarify` | Resolve material ambiguities |
| `research` | Establish externally verifiable technical facts |
| `to-spec` | Convert resolved requirements into implementation-ready specification |
| `architecture-design` | Define technical solution and architectural decisions |
| `to-tickets` | Decompose specification into executable work |
| `diagnose` | Identify root cause of unknown failures |
| `implement` | Execute a defined change |
| `refactor` | Improve internal structure without changing external behaviour |
| `docs` | Create/update documentation from evidence |
| `modernize` | Plan and orchestrate legacy modernization |
| `handoff` | Transfer verified work state between agents/sessions |

## 3.2 Model-invoked / composable

These skills are primarily called by other skills or selected automatically:

| Skill | Responsibility |
|---|---|
| `context-engineering` | Discover and maintain project context |
| `domain-modelling` | Model business concepts and invariants when warranted |
| `tdd` | Execute Red → Green → Refactor workflow |
| `edge-case-analysis` | Identify untested boundary/adversarial scenarios |
| `code-review` | Perform semantic review of a change |

All model-invoked skills MAY still be explicitly requested by a user.

Primary classification controls routing; it does not prohibit manual invocation.

---

# 4. Canonical skill catalogue

```text
skills/
├── core/
│   ├── setup-ai-development-skills/
│   ├── workflow/
│   ├── clarify/
│   ├── context-engineering/
│   └── handoff/
│
├── discovery/
│   ├── research/
│   ├── to-spec/
│   ├── domain-modelling/
│   ├── architecture-design/
│   └── to-tickets/
│
├── development/
│   ├── diagnose/
│   ├── implement/
│   ├── tdd/
│   └── refactor/
│
├── quality/
│   ├── edge-case-analysis/
│   └── code-review/
│
├── documentation/
│   └── docs/
│
└── modernization/
    └── modernize/
```

Runtime skill count:

```text
18
```

---

# 5. Skill contract

Every skill SHALL define:

```text
name
description
primary invocation
goal
accepted inputs
produced outputs
required dependencies
optional dependencies
workflow
constraints
quality gates
failure behaviour
```

Recommended structure:

```text
skill-name/
├── SKILL.md
├── references/
├── assets/
└── scripts/        # only when deterministic automation is justified
```

`SKILL.md` SHALL remain concise.

Detailed guidance belongs in:

```text
references/
```

Reusable templates belong in:

```text
assets/
```

Deterministic operations MAY use:

```text
scripts/
```

---

# 6. Shared artifact model

Skills SHALL exchange structured artifacts instead of relying exclusively on conversational context.

Every persisted artifact SHALL contain metadata equivalent to:

```yaml
---
artifact: spec
id: SPEC-001
version: 1
status: draft
created_by: to-spec
inputs:
  - DEC-001
  - RES-002
---
```

Supported statuses:

```text
draft
ready
blocked
superseded
```

No downstream skill SHALL treat a `blocked` artifact as implementation-ready.

---

# 7. Canonical artifacts

## 7.1 Decision Set

**Producer:** `clarify`

```text
DECISION_SET
```

Required sections:

```text
Objective
Resolved Decisions
Constraints
Assumptions
Rejected Alternatives
Open Questions
Blocking Questions
```

A Decision Set is `ready` only when no unresolved question materially affects the requested next step.

---

## 7.2 Research Report

**Producer:** `research`

```text
RESEARCH_REPORT
```

Required sections:

```text
Research Question
Findings
Evidence
Alternatives
Constraints
Risks
Unknowns
Sources
Recommendation
```

Facts and recommendations SHALL be clearly separated.

---

## 7.3 Specification

**Producer:** `to-spec`

```text
SPEC
```

Required sections:

```text
Problem
Goal
Scope
Non-goals
Actors
Functional Requirements
Business Rules
Non-functional Requirements
Technical Constraints
Security / Privacy
Acceptance Criteria
Risks
Open Questions
```

A SPEC is `ready` only when:

- scope is bounded;
- acceptance criteria are testable;
- no blocking requirement ambiguity remains.

---

## 7.4 Domain Model

**Producer:** `domain-modelling`

```text
DOMAIN_MODEL
```

Required sections:

```text
Ubiquitous Language
Business Concepts
Relationships
Invariants
State Transitions
Business Events
Context Boundaries
Ambiguities
```

DDD constructs SHALL only be introduced when justified.

Optional:

```text
Entities
Value Objects
Aggregates
Domain Services
Domain Events
Bounded Contexts
```

---

## 7.5 Architecture Design

**Producer:** `architecture-design`

```text
ARCHITECTURE_DESIGN
```

Required sections:

```text
Context
Drivers
Existing Constraints
Proposed Design
Components
Interfaces
Data Flow
Data Model Impact
Security Impact
Operational Impact
Trade-offs
Risks
Validation Strategy
```

Durable architectural decisions MAY additionally produce:

```text
ADR
```

ADR format:

```text
Context
Decision
Alternatives
Consequences
Constraints for AI Agents
```

---

## 7.6 Ticket Set

**Producer:** `to-tickets`

```text
TICKET_SET
```

Each ticket SHALL contain:

```text
Title
Goal
Context
Scope
Out of Scope
Dependencies
Implementation Notes
Acceptance Criteria
Validation
Definition of Done
```

A ticket SHOULD be independently verifiable.

Ticket dependencies SHALL be explicit.

Circular dependencies are invalid.

---

## 7.7 Diagnosis Report

**Producer:** `diagnose`

```text
DIAGNOSIS_REPORT
```

Required sections:

```text
Symptom
Reproduction
Observed Behaviour
Expected Behaviour
Evidence
Hypotheses Tested
Root Cause
Affected Components
Regression Risk
Recommended Fix
Regression Test
```

A diagnosis SHALL distinguish:

```text
confirmed root cause
probable root cause
unconfirmed hypothesis
```

---

## 7.8 Test Evidence

**Producer:** `tdd` or `implement`

```text
TEST_EVIDENCE
```

Required information:

```text
Tests Added
Tests Executed
Expected Failure / RED
Passing Evidence / GREEN
Regression Suite
Failures
Skipped Tests
Environment Limitations
```

---

## 7.9 Implementation Report

**Producer:** `implement`

```text
IMPLEMENTATION_REPORT
```

Required sections:

```text
Input
Plan
Files Changed
Behaviour Changed
Validation Performed
Tests
Known Limitations
Remaining Work
Change Reference
```

`Change Reference` MAY point to:

```text
working tree
commit SHA
branch
PR
change-set identifier
```

---

## 7.10 Edge Case Report

**Producer:** `edge-case-analysis`

```text
EDGE_CASE_REPORT
```

Each finding:

```text
Scenario
Category
Risk
Expected Behaviour
Existing Coverage
Missing Coverage
Recommended Test
```

Categories MAY include:

```text
boundaries
state transitions
concurrency
time/date
encoding
volume
failure modes
security
external dependencies
data integrity
```

---

## 7.11 Review Report

**Producer:** `code-review`

```text
REVIEW_REPORT
```

Required sections:

```text
Scope Reviewed
Blocking Findings
High Severity Findings
Medium Severity Findings
Low Severity Findings
Security Findings
Architecture Findings
Test Coverage Findings
Positive Evidence
Verdict
```

Verdicts:

```text
PASS
PASS_WITH_NOTES
CHANGES_REQUIRED
BLOCKED
```

---

## 7.12 Documentation Update

**Producer:** `docs`

```text
DOC_UPDATE
```

Required sections:

```text
Documentation Scope
Sources of Truth
Files Created
Files Updated
Files Considered but Unchanged
Known Documentation Gaps
```

Documentation SHALL describe verified current behaviour unless explicitly marked as future design.

---

## 7.13 Modernization Plan

**Producer:** `modernize`

```text
MODERNIZATION_PLAN
```

Required sections:

```text
Current State
Target State
Technical Debt
Risk Map
Characterization Strategy
Migration Strategy
Migration Sequence
Compatibility Constraints
Rollback Strategy
Validation Strategy
Milestones
```

---

## 7.14 Handoff

**Producer:** `handoff`

```text
HANDOFF
```

Required sections:

```text
Objective
Current State
Completed Work
Decisions
Artifacts
Files Changed
Validation
Known Issues
Open Questions
Next Actions
Constraints
```

Handoff SHALL contain verified state only.

---

# 8. Project context

Project-specific information SHALL live outside skills.

Canonical structure:

```text
.ai/
├── config.json
├── project.md
├── architecture.md
├── standards.md
├── tech-stack.md
├── business-rules.md
├── decisions/
└── artifacts/
```

`context-engineering` owns discovery and maintenance of:

```text
project.md
architecture.md
standards.md
tech-stack.md
business-rules.md
```

---

# 9. Artifact persistence

Recommended layout:

```text
.ai/artifacts/
├── decisions/
├── research/
├── specs/
├── domain/
├── architecture/
├── tickets/
├── diagnosis/
├── implementation/
├── tests/
├── quality/
├── reviews/
├── documentation/
├── modernization/
└── handoffs/
```

Artifacts MAY instead live in an external issue tracker or documentation system when configured.

Local Markdown SHALL always be a supported fallback.

---

# 10. Project configuration

`.ai/config.json` SHALL provide repository-level configuration.

Minimum model:

```json
{
  "version": 1,
  "issueTracker": "local",
  "specPath": ".ai/artifacts/specs",
  "ticketPath": ".ai/artifacts/tickets",
  "adrPath": ".ai/decisions",
  "docsPath": "docs"
}
```

Optional integrations MAY extend the file.

Secrets SHALL NOT be stored in `.ai/config.json`.

---

# 11. Skill dependency contract

## `setup-ai-development-skills`

Consumes:

```text
repository
existing configuration
```

Produces:

```text
.ai/config.json
initial project context
bootstrap readiness result
```

Dependencies:

```text
context-engineering
```

Restrictions:

```text
MUST NOT modify application code
MUST NOT overwrite existing project decisions
```

---

## `workflow`

Consumes:

```text
user request
project context
available artifacts
skill manifest
```

Produces:

```text
WORKFLOW_PLAN
```

Dependencies:

```text
none
```

Restrictions:

```text
MUST NOT perform implementation
MUST NOT modify application code
```

---

## `clarify`

Consumes:

```text
request
project context
existing decisions
```

Produces:

```text
DECISION_SET
```

Optional dependency:

```text
context-engineering
```

---

## `context-engineering`

Consumes:

```text
repository evidence
project configuration
existing documentation
```

Produces/updates:

```text
PROJECT_CONTEXT
```

Dependencies:

```text
none
```

---

## `handoff`

Consumes:

```text
current state
existing artifacts
change state
```

Produces:

```text
HANDOFF
```

Dependencies:

```text
none
```

---

## `research`

Consumes:

```text
research question
project context
decision context
```

Produces:

```text
RESEARCH_REPORT
```

Dependencies:

```text
external research capability when required
```

External access SHALL be optional.

If unavailable, unsupported claims SHALL remain explicitly unresolved.

---

## `to-spec`

Consumes:

```text
DECISION_SET
PROJECT_CONTEXT
RESEARCH_REPORT optional
```

Produces:

```text
SPEC
```

Dependencies:

```text
clarify when material ambiguity exists
```

---

## `domain-modelling`

Consumes:

```text
SPEC or DECISION_SET
PROJECT_CONTEXT
```

Produces:

```text
DOMAIN_MODEL
```

Dependencies:

```text
none
```

Invoked only when domain complexity justifies it.

---

## `architecture-design`

Consumes:

```text
SPEC
PROJECT_CONTEXT
DOMAIN_MODEL optional
RESEARCH_REPORT optional
```

Produces:

```text
ARCHITECTURE_DESIGN
ADR optional
```

Dependencies:

```text
research when external facts affect decisions
domain-modelling when business invariants affect design
```

---

## `to-tickets`

Consumes:

```text
SPEC
ARCHITECTURE_DESIGN optional
DOMAIN_MODEL optional
```

Produces:

```text
TICKET_SET
```

Dependencies:

```text
none
```

A blocked SPEC SHALL NOT produce implementation-ready tickets.

---

## `diagnose`

Consumes:

```text
symptom
repository
PROJECT_CONTEXT
logs/tests/runtime evidence when available
```

Produces:

```text
DIAGNOSIS_REPORT
```

May invoke:

```text
tdd
```

to establish regression/reproduction tests.

Diagnosis SHALL precede a fix when root cause is unknown.

---

## `implement`

Consumes one or more:

```text
TICKET
SPEC
DIAGNOSIS_REPORT
explicit change request
```

Also consumes:

```text
PROJECT_CONTEXT
```

Produces:

```text
CHANGE_SET
IMPLEMENTATION_REPORT
TEST_EVIDENCE
```

May invoke:

```text
tdd
edge-case-analysis
code-review
context-engineering
```

Restrictions:

```text
smallest correct change
no unrelated changes
no speculative abstractions
```

---

## `tdd`

Consumes:

```text
acceptance criteria
ticket/spec
existing tests
```

Produces:

```text
TEST_EVIDENCE
test changes
implementation changes when composed by implement
```

Workflow:

```text
RED
↓
GREEN
↓
REFACTOR
```

When explicit TDD is requested, RED SHALL be demonstrated before implementation.

---

## `refactor`

Consumes:

```text
refactor objective
behaviour baseline
PROJECT_CONTEXT
tests
```

Produces:

```text
CHANGE_SET
IMPLEMENTATION_REPORT
TEST_EVIDENCE
```

Invariant:

```text
external behaviour MUST NOT change
```

unless explicitly authorized.

---

## `edge-case-analysis`

Consumes:

```text
SPEC
CHANGE_SET
DOMAIN_MODEL optional
existing tests
```

Produces:

```text
EDGE_CASE_REPORT
```

May propose tests.

It SHALL NOT silently broaden product behaviour.

---

## `code-review`

Consumes:

```text
CHANGE_SET
SPEC/TICKET optional
PROJECT_CONTEXT
TEST_EVIDENCE optional
```

Produces:

```text
REVIEW_REPORT
```

Review priority:

```text
1. correctness
2. regressions
3. security
4. requirements
5. architecture
6. project conventions
7. maintainability
8. tests
9. style
```

---

## `docs`

Consumes:

```text
repository evidence
CHANGE_SET
SPEC optional
ARCHITECTURE_DESIGN optional
existing documentation
```

Produces:

```text
documentation changes
DOC_UPDATE
```

Documentation SHALL NOT invent implementation state.

---

## `modernize`

Consumes:

```text
PROJECT_CONTEXT
modernization objective
existing architecture
runtime/dependency information
```

Produces:

```text
MODERNIZATION_PLAN
```

May invoke:

```text
diagnose
research
architecture-design
tdd
to-tickets
```

Implementation SHOULD subsequently flow through:

```text
to-tickets
→ implement
```

`modernize` SHALL NOT perform an uncontrolled "upgrade everything" operation.

---

# 12. Canonical dependency graph

```text
setup-ai-development-skills
          │
          ▼
 context-engineering
          │
          ▼

       workflow
          │
   ┌──────┼──────────┐
   │      │          │
   ▼      ▼          ▼
clarify diagnose  known-change
   │      │          │
   │      └─────┐    │
   ▼            │    │
research        │    │
   │            │    │
   ▼            │    │
to-spec ◄───────┘    │
   │                 │
   ├──────────┐      │
   ▼          ▼      │
domain     architecture-design
modelling      │
   └────┬──────┘
        ▼
    to-tickets
        │
        ▼
     implement ◄──────────── known-change
        │
        ├── tdd
        ├── edge-case-analysis
        └── code-review
        │
        ▼
       docs
        │
        ▼
     handoff
```

Modernization is a parallel orchestration path:

```text
modernize
    │
    ├── research
    ├── diagnose
    ├── architecture-design
    ├── tdd
    ▼
to-tickets
    ▼
implement
```

---

# 13. Routing rules

Routing SHALL obey this precedence.

## R1 — Explicit invocation wins

If the user explicitly invokes:

```text
/to-spec
/implement
/diagnose
```

that skill SHALL be preferred unless execution would violate a blocking prerequisite.

---

## R2 — Unknown intent routes to `/workflow`

Use `/workflow` when:

- multiple skills plausibly apply;
- request spans several lifecycle phases;
- execution sequence is unclear.

`workflow` SHALL recommend a sequence, not perform the entire task itself.

---

## R3 — Material ambiguity routes to `/clarify`

Route to `clarify` if an unanswered question can materially change:

```text
scope
behaviour
architecture
data model
security
acceptance criteria
```

Do NOT ask questions whose answers are already available from repository evidence or project context.

---

## R4 — Unknown external facts route to `/research`

Examples:

```text
current API behaviour
library capabilities
version compatibility
platform limits
standards
framework behaviour
```

Research SHALL precede architectural decisions when such facts materially affect them.

---

## R5 — Unknown failure routes to `/diagnose`

Use:

```text
diagnose
```

when:

```text
symptom is known
root cause is not known
```

Do NOT jump directly to `implement`.

---

## R6 — Known required change routes to `/implement`

If:

```text
desired behaviour is clear
scope is bounded
```

route directly to `implement`.

A SPEC is recommended but not mandatory for trivial, well-defined changes.

---

## R7 — `/to-spec` requires resolved decisions

`to-spec` SHALL NOT invent missing business or architectural decisions.

Blocking ambiguity routes back to:

```text
clarify
```

---

## R8 — Domain modelling is conditional

Invoke `domain-modelling` only when the change involves meaningful:

```text
business terminology
invariants
state transitions
business events
context boundaries
```

Do not force DDD into CRUD or infrastructure-only changes.

---

## R9 — Architecture design is conditional

Invoke `architecture-design` when a change materially affects one or more:

```text
module boundaries
public interfaces
data model
integration contracts
infrastructure
security boundaries
concurrency
deployment
high blast-radius behaviour
```

---

## R10 — `/to-tickets` requires a ready specification

Do not generate executable ticket sets from a block

# Shared artifact contract



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

**Producer:** `tdd`, `implement` or `refactor`

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

**Producer:** `implement` or `refactor`

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

## Machine-readable catalogue and named outputs

The artifact registry in [manifest](#machine-readable-catalogue-and-named-outputs) distinguishes defined schemas and named-only outputs. artifactInputs/artifactOutputs index known artifacts; the per-skill inputs/outputs retain alternatives, optionality and non-artifact resources. These indexes do not make optional inputs mandatory.

WORKFLOW_PLAN, PROJECT_CONTEXT, CHANGE_SET and bootstrap readiness (registry key BOOTSTRAP_READINESS) remain named-only: even the complete baseline supplies no full schemas for them. PROJECT_CONTEXT follows the section 8 ownership/layout. Bootstrap also produces .ai/config.json using the section 10 model. No invented canonical templates are supplied for named-only outputs. TICKET is a record inside TICKET_SET; each record requires all section 7.6 fields. Repeat the ticket block for each ticket and preserve explicit dependencies.

The registry does not validate user project artifact readiness or ticket dependency graphs at runtime. Templates remain draft placeholders until evidence and semantic gates are satisfied.

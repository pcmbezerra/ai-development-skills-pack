# Normative baseline v1 — complete user-supplied contract

The text below preserves the full supplied contract, sections 1–27. Repository adaptations are documented in [provenance](provenance.md).

AI - Development Skills Pack v1
Architecture Contract
Status: Baseline v1Targets Tier 1: Cursor, Codex, Gemini AntigravityArchitecture: Multi-agent, tool-agnostic, artifact-drivenPrinciple: Skills implement reusable workflows; project knowledge and state remain outside the skills.

1. Purpose
The AI - Development Skills Pack provides a consistent software-engineering workflow for AI coding agents.
The pack SHALL support:
	•	project bootstrap;
	•	context engineering;
	•	requirements clarification;
	•	technical research;
	•	specification;
	•	domain modelling;
	•	architecture design;
	•	work decomposition;
	•	implementation;
	•	TDD;
	•	debugging;
	•	refactoring;
	•	edge-case analysis;
	•	code review;
	•	documentation;
	•	modernization;
	•	session/agent handoff.
The same source skills SHALL be distributable to:
	•	Cursor;
	•	Codex;
	•	Gemini Antigravity.
Skills SHALL NOT contain project-specific knowledge.

2. Architectural principles
All v1 skills SHALL follow these rules:
	1	Prefer repository evidence over assumptions.
	2	Never invent project conventions, APIs, architecture or business rules.
	3	Existing project decisions override generic recommendations.
	4	Make the smallest correct change.
	5	Do not modify unrelated code.
	6	Do not introduce dependencies without justification.
	7	Separate facts, assumptions, decisions and recommendations.
	8	Persist durable decisions as artifacts.
	9	Validate work before declaring completion.
	10	Preserve traceability between request → decision → spec → ticket → change → review.
	11	Security, privacy and Responsible AI are cross-cutting concerns.
	12	Skills SHALL remain tool-agnostic whenever possible.
	13	Integrations SHALL be optional capabilities, not hard dependencies.
	14	Skills SHOULD compose other skills instead of duplicating their responsibilities.

3. Skill classes
Every skill has a primary invocation class.
3.1 User-invoked
These skills are valid entry points for a user request:
Skill
Responsibility
setup-ai-development-skills
Bootstrap repository for the pack
workflow
Route work to the correct skill/workflow
clarify
Resolve material ambiguities
research
Establish externally verifiable technical facts
to-spec
Convert resolved requirements into implementation-ready specification
architecture-design
Define technical solution and architectural decisions
to-tickets
Decompose specification into executable work
diagnose
Identify root cause of unknown failures
implement
Execute a defined change
refactor
Improve internal structure without changing external behaviour
docs
Create/update documentation from evidence
modernize
Plan and orchestrate legacy modernization
handoff
Transfer verified work state between agents/sessions
3.2 Model-invoked / composable
These skills are primarily called by other skills or selected automatically:
Skill
Responsibility
context-engineering
Discover and maintain project context
domain-modelling
Model business concepts and invariants when warranted
tdd
Execute Red → Green → Refactor workflow
edge-case-analysis
Identify untested boundary/adversarial scenarios
code-review
Perform semantic review of a change
All model-invoked skills MAY still be explicitly requested by a user.
Primary classification controls routing; it does not prohibit manual invocation.

4. Canonical skill catalogue
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
Runtime skill count:
18

5. Skill contract
Every skill SHALL define:
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
Recommended structure:
skill-name/
├── SKILL.md
├── references/
├── assets/
└── scripts/        # only when deterministic automation is justified
SKILL.md SHALL remain concise.
Detailed guidance belongs in:
references/
Reusable templates belong in:
assets/
Deterministic operations MAY use:
scripts/

6. Shared artifact model
Skills SHALL exchange structured artifacts instead of relying exclusively on conversational context.
Every persisted artifact SHALL contain metadata equivalent to:
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
Supported statuses:
draft
ready
blocked
superseded
No downstream skill SHALL treat a blocked artifact as implementation-ready.

7. Canonical artifacts
7.1 Decision Set
Producer: clarify
DECISION_SET
Required sections:
Objective
Resolved Decisions
Constraints
Assumptions
Rejected Alternatives
Open Questions
Blocking Questions
A Decision Set is ready only when no unresolved question materially affects the requested next step.

7.2 Research Report
Producer: research
RESEARCH_REPORT
Required sections:
Research Question
Findings
Evidence
Alternatives
Constraints
Risks
Unknowns
Sources
Recommendation
Facts and recommendations SHALL be clearly separated.

7.3 Specification
Producer: to-spec
SPEC
Required sections:
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
A SPEC is ready only when:
	•	scope is bounded;
	•	acceptance criteria are testable;
	•	no blocking requirement ambiguity remains.

7.4 Domain Model
Producer: domain-modelling
DOMAIN_MODEL
Required sections:
Ubiquitous Language
Business Concepts
Relationships
Invariants
State Transitions
Business Events
Context Boundaries
Ambiguities
DDD constructs SHALL only be introduced when justified.
Optional:
Entities
Value Objects
Aggregates
Domain Services
Domain Events
Bounded Contexts

7.5 Architecture Design
Producer: architecture-design
ARCHITECTURE_DESIGN
Required sections:
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
Durable architectural decisions MAY additionally produce:
ADR
ADR format:
Context
Decision
Alternatives
Consequences
Constraints for AI Agents

7.6 Ticket Set
Producer: to-tickets
TICKET_SET
Each ticket SHALL contain:
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
A ticket SHOULD be independently verifiable.
Ticket dependencies SHALL be explicit.
Circular dependencies are invalid.

7.7 Diagnosis Report
Producer: diagnose
DIAGNOSIS_REPORT
Required sections:
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
A diagnosis SHALL distinguish:
confirmed root cause
probable root cause
unconfirmed hypothesis

7.8 Test Evidence
Producer: tdd or implement
TEST_EVIDENCE
Required information:
Tests Added
Tests Executed
Expected Failure / RED
Passing Evidence / GREEN
Regression Suite
Failures
Skipped Tests
Environment Limitations

7.9 Implementation Report
Producer: implement
IMPLEMENTATION_REPORT
Required sections:
Input
Plan
Files Changed
Behaviour Changed
Validation Performed
Tests
Known Limitations
Remaining Work
Change Reference
Change Reference MAY point to:
working tree
commit SHA
branch
PR
change-set identifier

7.10 Edge Case Report
Producer: edge-case-analysis
EDGE_CASE_REPORT
Each finding:
Scenario
Category
Risk
Expected Behaviour
Existing Coverage
Missing Coverage
Recommended Test
Categories MAY include:
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

7.11 Review Report
Producer: code-review
REVIEW_REPORT
Required sections:
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
Verdicts:
PASS
PASS_WITH_NOTES
CHANGES_REQUIRED
BLOCKED

7.12 Documentation Update
Producer: docs
DOC_UPDATE
Required sections:
Documentation Scope
Sources of Truth
Files Created
Files Updated
Files Considered but Unchanged
Known Documentation Gaps
Documentation SHALL describe verified current behaviour unless explicitly marked as future design.

7.13 Modernization Plan
Producer: modernize
MODERNIZATION_PLAN
Required sections:
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

7.14 Handoff
Producer: handoff
HANDOFF
Required sections:
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
Handoff SHALL contain verified state only.

8. Project context
Project-specific information SHALL live outside skills.
Canonical structure:
.ai/
├── config.json
├── project.md
├── architecture.md
├── standards.md
├── tech-stack.md
├── business-rules.md
├── decisions/
└── artifacts/
context-engineering owns discovery and maintenance of:
project.md
architecture.md
standards.md
tech-stack.md
business-rules.md

9. Artifact persistence
Recommended layout:
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
Artifacts MAY instead live in an external issue tracker or documentation system when configured.
Local Markdown SHALL always be a supported fallback.

10. Project configuration
.ai/config.json SHALL provide repository-level configuration.
Minimum model:
{
  "version": 1,
  "issueTracker": "local",
  "specPath": ".ai/artifacts/specs",
  "ticketPath": ".ai/artifacts/tickets",
  "adrPath": ".ai/decisions",
  "docsPath": "docs"
}
Optional integrations MAY extend the file.
Secrets SHALL NOT be stored in .ai/config.json.

11. Skill dependency contract
setup-ai-development-skills
Consumes:
repository
existing configuration
Produces:
.ai/config.json
initial project context
bootstrap readiness result
Dependencies:
context-engineering
Restrictions:
MUST NOT modify application code
MUST NOT overwrite existing project decisions

workflow
Consumes:
user request
project context
available artifacts
skill manifest
Produces:
WORKFLOW_PLAN
Dependencies:
none
Restrictions:
MUST NOT perform implementation
MUST NOT modify application code

clarify
Consumes:
request
project context
existing decisions
Produces:
DECISION_SET
Optional dependency:
context-engineering

context-engineering
Consumes:
repository evidence
project configuration
existing documentation
Produces/updates:
PROJECT_CONTEXT
Dependencies:
none

handoff
Consumes:
current state
existing artifacts
change state
Produces:
HANDOFF
Dependencies:
none

research
Consumes:
research question
project context
decision context
Produces:
RESEARCH_REPORT
Dependencies:
external research capability when required
External access SHALL be optional.
If unavailable, unsupported claims SHALL remain explicitly unresolved.

to-spec
Consumes:
DECISION_SET
PROJECT_CONTEXT
RESEARCH_REPORT optional
Produces:
SPEC
Dependencies:
clarify when material ambiguity exists

domain-modelling
Consumes:
SPEC or DECISION_SET
PROJECT_CONTEXT
Produces:
DOMAIN_MODEL
Dependencies:
none
Invoked only when domain complexity justifies it.

architecture-design
Consumes:
SPEC
PROJECT_CONTEXT
DOMAIN_MODEL optional
RESEARCH_REPORT optional
Produces:
ARCHITECTURE_DESIGN
ADR optional
Dependencies:
research when external facts affect decisions
domain-modelling when business invariants affect design

to-tickets
Consumes:
SPEC
ARCHITECTURE_DESIGN optional
DOMAIN_MODEL optional
Produces:
TICKET_SET
Dependencies:
none
A blocked SPEC SHALL NOT produce implementation-ready tickets.

diagnose
Consumes:
symptom
repository
PROJECT_CONTEXT
logs/tests/runtime evidence when available
Produces:
DIAGNOSIS_REPORT
May invoke:
tdd
to establish regression/reproduction tests.
Diagnosis SHALL precede a fix when root cause is unknown.

implement
Consumes one or more:
TICKET
SPEC
DIAGNOSIS_REPORT
explicit change request
Also consumes:
PROJECT_CONTEXT
Produces:
CHANGE_SET
IMPLEMENTATION_REPORT
TEST_EVIDENCE
May invoke:
tdd
edge-case-analysis
code-review
context-engineering
Restrictions:
smallest correct change
no unrelated changes
no speculative abstractions

tdd
Consumes:
acceptance criteria
ticket/spec
existing tests
Produces:
TEST_EVIDENCE
test changes
implementation changes when composed by implement
Workflow:
RED
↓
GREEN
↓
REFACTOR
When explicit TDD is requested, RED SHALL be demonstrated before implementation.

refactor
Consumes:
refactor objective
behaviour baseline
PROJECT_CONTEXT
tests
Produces:
CHANGE_SET
IMPLEMENTATION_REPORT
TEST_EVIDENCE
Invariant:
external behaviour MUST NOT change
unless explicitly authorized.

edge-case-analysis
Consumes:
SPEC
CHANGE_SET
DOMAIN_MODEL optional
existing tests
Produces:
EDGE_CASE_REPORT
May propose tests.
It SHALL NOT silently broaden product behaviour.

code-review
Consumes:
CHANGE_SET
SPEC/TICKET optional
PROJECT_CONTEXT
TEST_EVIDENCE optional
Produces:
REVIEW_REPORT
Review priority:
1. correctness
2. regressions
3. security
4. requirements
5. architecture
6. project conventions
7. maintainability
8. tests
9. style

docs
Consumes:
repository evidence
CHANGE_SET
SPEC optional
ARCHITECTURE_DESIGN optional
existing documentation
Produces:
documentation changes
DOC_UPDATE
Documentation SHALL NOT invent implementation state.

modernize
Consumes:
PROJECT_CONTEXT
modernization objective
existing architecture
runtime/dependency information
Produces:
MODERNIZATION_PLAN
May invoke:
diagnose
research
architecture-design
tdd
to-tickets
Implementation SHOULD subsequently flow through:
to-tickets
→ implement
modernize SHALL NOT perform an uncontrolled "upgrade everything" operation.

12. Canonical dependency graph
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
Modernization is a parallel orchestration path:
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

13. Routing rules
Routing SHALL obey this precedence.
R1 — Explicit invocation wins
If the user explicitly invokes:
/to-spec
/implement
/diagnose
that skill SHALL be preferred unless execution would violate a blocking prerequisite.

R2 — Unknown intent routes to /workflow
Use /workflow when:
	•	multiple skills plausibly apply;
	•	request spans several lifecycle phases;
	•	execution sequence is unclear.
workflow SHALL recommend a sequence, not perform the entire task itself.

R3 — Material ambiguity routes to /clarify
Route to clarify if an unanswered question can materially change:
scope
behaviour
architecture
data model
security
acceptance criteria
Do NOT ask questions whose answers are already available from repository evidence or project context.

R4 — Unknown external facts route to /research
Examples:
current API behaviour
library capabilities
version compatibility
platform limits
standards
framework behaviour
Research SHALL precede architectural decisions when such facts materially affect them.

R5 — Unknown failure routes to /diagnose
Use:
diagnose
when:
symptom is known
root cause is not known
Do NOT jump directly to implement.

R6 — Known required change routes to /implement
If:
desired behaviour is clear
scope is bounded
route directly to implement.
A SPEC is recommended but not mandatory for trivial, well-defined changes.

R7 — /to-spec requires resolved decisions
to-spec SHALL NOT invent missing business or architectural decisions.
Blocking ambiguity routes back to:
clarify

R8 — Domain modelling is conditional
Invoke domain-modelling only when the change involves meaningful:
business terminology
invariants
state transitions
business events
context boundaries
Do not force DDD into CRUD or infrastructure-only changes.

R9 — Architecture design is conditional
Invoke architecture-design when a change materially affects one or more:
module boundaries
public interfaces
data model
integration contracts
infrastructure
security boundaries
concurrency
deployment
high blast-radius behaviour

R10 — /to-tickets requires a ready specification
Do not generate executable ticket sets from a blocked SPEC.

R11 — TDD is composed by /implement
implement SHOULD invoke tdd when:
	•	TDD was explicitly requested;
	•	behaviour is complex;
	•	regression risk is material;
	•	a bug requires a regression test;
	•	domain invariants are changing.
TDD is not mandatory for every trivial change.

R12 — Edge case analysis is risk-driven
Invoke when changes expose:
external input
state transitions
date/time logic
concurrency
external integrations
security-sensitive data
high-volume processing
data integrity risk

R13 — Code review is mandatory for non-trivial changes
A non-trivial implementation SHOULD receive code-review before completion.
Trivial changes MAY omit it if validation is sufficient and risk is negligible.

R14 — Documentation follows documentation impact
Invoke docs when changes affect:
public API
architecture
configuration
operations
deployment
developer workflow
onboarding
business-visible behaviour

R15 — Refactor and implement are different intents
Use:
refactor
when behaviour must remain stable.
Use:
implement
when behaviour is intentionally changing.

R16 — Modernization is not ordinary refactoring
Use modernize when work involves:
runtime migrations
framework migrations
platform migrations
legacy replacement
large dependency modernization
architecture transformation

R17 — Handoff preserves continuity
Use handoff when:
	•	work is incomplete;
	•	another agent/session will continue;
	•	explicit transfer was requested;
	•	context is at risk of being lost.

14. Routing anti-patterns
The following routes are prohibited:
ambiguous request
→ implement
without resolving material ambiguity.
unknown bug
→ random code modification
without diagnosis.
blocked spec
→ to-tickets
tickets
→ large unrelated refactor
modernize
→ uncontrolled repository-wide rewrite
docs
→ invented architecture description
domain-modelling
→ forced DDD patterns

15. Quality gates
Specification gate
Pass when:
scope defined
acceptance criteria testable
blocking ambiguity resolved

Architecture gate
Pass when:
existing constraints considered
interfaces explicit
trade-offs documented
risks identified
validation strategy defined

Ticket gate
Pass when:
scope bounded
dependencies explicit
acceptance criteria measurable
ticket independently verifiable

Implementation gate
Pass when:
requested behaviour implemented
relevant tests pass
validation evidence exists
no unrelated changes
known limitations reported

Review gate
Pass when:
no blocking correctness issue
no blocking security issue
requirements satisfied
architecture not unintentionally violated

Documentation gate
Pass when:
documentation matches verified repository state

Modernization gate
Pass when:
current state understood
behaviour baseline exists
migration stages defined
rollback strategy exists
validation defined

16. Failure and fallback contract
A skill SHALL NOT fabricate a successful result.
When blocked, it SHALL report:
Status: BLOCKED

Reason
Evidence
Missing prerequisite
Recommended next skill/action
Examples:
to-spec
→ BLOCKED
→ clarify
implement
→ BLOCKED: root cause unknown
→ diagnose
architecture-design
→ BLOCKED: external compatibility unknown
→ research

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

19. Runtime dependencies
Required:
Node.js
Git
Initial npm production dependencies SHOULD be:
{}
Prefer Node.js standard modules:
node:fs
node:path
node:os
node:process
node:child_process
Do not add dependencies unless a concrete need exists.

20. Target architecture
The canonical skill source SHALL remain independent of target IDE/agent.
                 skills/
                    │
             Skill Distributor
                    │
       ┌────────────┼────────────┐
       ▼            ▼            ▼
     Cursor        Codex      Antigravity
Target-specific logic belongs under:
targets/
├── cursor.mjs
├── codex.mjs
└── antigravity.mjs
Skills SHALL NOT contain hardcoded target-specific installation paths.

21. Skill manifest
The pack SHALL maintain a machine-readable catalogue:
manifest/skills.json
Conceptual format:
{
  "version": 1,
  "skills": {
    "to-spec": {
      "invocation": "user",
      "consumes": [
        "decision-set",
        "project-context",
        "research-report"
      ],
      "produces": [
        "spec"
      ]
    },
    "tdd": {
      "invocation": "model",
      "consumes": [
        "acceptance-criteria"
      ],
      "produces": [
        "test-evidence"
      ]
    }
  }
}
The manifest SHALL drive:
list
doctor
validation
documentation
routing tests

22. Validation contract
The repository SHALL expose:
npm run skills:validate
Validation SHALL check at minimum:
unique skill names
SKILL.md presence
valid frontmatter
non-empty description
valid invocation class
declared artifacts exist
declared skill dependencies exist
referenced files exist
no broken references
no circular mandatory dependency graph
target compatibility
Future routing tests SHOULD validate semantic overlap between skill descriptions.

23. Meta skill
The repository MAY contain:
meta-skills/
└── skill-authoring/
skill-authoring SHALL NOT be part of the default runtime catalogue.
Its purpose:
create skills
review skills
validate skill contracts
identify routing overlap
validate progressive disclosure
validate references/assets/scripts

24. Canonical repository architecture
ai-development-skills-pack/
│
├── skills/
│   ├── core/
│   ├── discovery/
│   ├── development/
│   ├── quality/
│   ├── documentation/
│   └── modernization/
│
├── meta-skills/
│   └── skill-authoring/
│
├── contracts/
│   ├── decision-set.md
│   ├── research-report.md
│   ├── spec.md
│   ├── domain-model.md
│   ├── architecture-design.md
│   ├── ticket.md
│   ├── diagnosis-report.md
│   ├── test-evidence.md
│   ├── implementation-report.md
│   ├── edge-case-report.md
│   ├── review-report.md
│   ├── modernization-plan.md
│   └── handoff.md
│
├── references/
│   ├── security-baseline.md
│   ├── codebase-design.md
│   ├── testing.md
│   └── responsible-ai.md
│
├── templates/
│   └── project-context/
│
├── targets/
│   ├── cursor.mjs
│   ├── codex.mjs
│   └── antigravity.mjs
│
├── manifest/
│   └── skills.json
│
├── scripts/
│   └── validate-skills.mjs
│
├── bin/
│   └── ai-dev-skills.mjs
│
├── AGENTS.md
├── package.json
├── LICENSE
└── README.md

25. Canonical end-to-end workflows
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

26. v1 architectural boundary
The following are explicitly OUT OF SCOPE for v1:
prototype
resolve-conflicts
large-work decision mapping
triage
PR automation
release management
deployment automation
security-review as standalone skill
performance-review as standalone skill
dependency-upgrade as standalone skill
They MAY be reconsidered for v1.1+.

27. Definition of architectural readiness
The v1 architecture is considered ready for implementation when:
✓ 18 skills have unique responsibilities
✓ invocation classes are defined
✓ inputs and outputs are defined
✓ shared artifacts have contracts
✓ dependency graph is non-circular
✓ routing precedence is defined
✓ failure/fallback rules are defined
✓ quality gates are defined
✓ project context ownership is defined
✓ target abstraction is defined
✓ manifest contract is defined
✓ validation contract is defined
This document is the normative architectural baseline for AI - Development Skills Pack v1.
Changes that alter:
skill responsibility
artifact schema
routing precedence
mandatory dependencies
target architecture
SHOULD be treated as architectural changes and explicitly versioned.

---
artifact: modernization_plan
id: MODERNIZATION-20261013-401
version: 1
status: ready
created_by: modernize
inputs:
  - .ai/project.md
  - .ai/architecture.md
  - .ai/tech-stack.md
  - package.json
---

## Current State

Objective: Migrate the runtime from Node.js 18 to Node.js >=22. Current item: Node.js 18, cited from package.json engines.node. Target state: Node.js >=22, cited from .ai/tech-stack.md. Stages: 1) change engines.node to >=22; 2) rerun npm test. Rollback: restore engines.node to 18. Validation: npm test exits 0. Behaviour baseline: npm test passed, 48/48, on 2026-10-13, cited from .ai/project.md. The objective names no technical debt. Risk: an engines change can reject older Node. Characterization: the existing npm test suite is the characterization. Migration strategy: one bounded engines change. Compatibility: Node >=22 is the only supported runtime after the migration. Milestones: engines updated, then the suite is green. A variable named BILLING_TOKEN exists; omit its value.
.ai/project.md is the project context. .ai/architecture.md says the service runs on Node.js 18. package.json engines.node is 18. A variable named BILLING_TOKEN exists. Its value is omitted.

## Target State

Node.js >=22, cited from .ai/tech-stack.md and from the objective.

## Technical Debt

The objective names no technical debt. Evidenced absence: the objective.

## Risk Map

An engines change can reject older Node. Cited from the objective.

## Characterization Strategy

The existing npm test suite is the characterization. Behaviour baseline: npm test passed, 48/48, on 2026-10-13, cited from .ai/project.md.

## Migration Strategy

One bounded engines change. Cited from the objective. This plan does not perform the migration.

## Migration Sequence

1. Change engines.node to >=22.
2. Rerun npm test.
Cited from the objective.

## Compatibility Constraints

Node >=22 is the only supported runtime after the migration. Cited from the objective.

## Rollback Strategy

Restore engines.node to 18. Cited from the objective.

## Validation Strategy

npm test exits 0. Cited from the objective.

## Milestones

Engines updated, then the suite is green. Cited from the objective. The canonical consumer is to-tickets. implement is not authorized directly. No repository-wide rewrite is authorized.

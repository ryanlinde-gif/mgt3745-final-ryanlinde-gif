# Recruiting Reality Check

**One sentence:** A tool for high school soccer players and their parents that turns the vague question "am I being recruited?" into a record they can read, so interest becomes a conversation instead of going quiet.

**Deployed:** not yet. The deployment milestone is 2026-11-19 and the URL lands here.  
**Status:** framing, specification and architecture carried forward from HW1 to HW5; ADR-001 accepted; the first sourcing audit complete with four passing evals. **No product is deployed yet**, which is what the next milestone is for.  
**Hours spent:** 4.5

## See It Work

Nothing to show yet. The build starts after the 2026-11-12 check-in and the GIF
lands here when there is a product to record. Saying so is more useful than a
broken image link.

## Who It Is For

A high school soccer player who has had some contact with college coaches and
cannot tell whether any of it means anything, and the parent deciding whether to
pay for camps and showcases on the strength of it. Today they judge interest by
replies, which rewards the loudest programme rather than the most interested one,
and they lose track of who they contacted. The full job statements, taken from
recorded interviews, are in [context/USERS.md](context/USERS.md).

## Run It

```bash
npm install
npm test                 # code evals in evals/
npx wrangler dev         # only if the project has a worker/ backend
```

## The Record

| Artifact | Link |
|---|---|
| Problem and success measures | [context/PROJECT.md](context/PROJECT.md) |
| Users and jobs | [context/USERS.md](context/USERS.md) |
| Features (EARS rows) | [context/FEATURES.md](context/FEATURES.md) |
| Architecture and ADRs | [context/ARCHITECTURE.md](context/ARCHITECTURE.md), [docs/ADR-001.md](docs/ADR-001.md) |
| Evals, RAT, Stakes, production verdict | [context/EVALS.md](context/EVALS.md) |
| Delegation log | [docs/DDR-LOG.md](docs/DDR-LOG.md) |
| Decision memo | [docs/DECISION-001.md](docs/DECISION-001.md) |
| Real-user feedback | [docs/FEEDBACK.md](docs/FEEDBACK.md) |
| Scaffold audits | [docs/AUDIT.md](docs/AUDIT.md) |
| **Sourcing audit** (dependencies, rings, exit plans) | [docs/SOURCING-AUDIT.md](docs/SOURCING-AUDIT.md) |
| Dependency ledger with rings and limits | [context/TOOLS.md](context/TOOLS.md) |
| Deployment notes | [docs/DEPLOY.md](docs/DEPLOY.md) |
| Self-review with Homogenization Check | [docs/SELF-REVIEW.md](docs/SELF-REVIEW.md) |

## AI Use

Claude Opus 5 drafted the sourcing audit and the supply-chain evals; the
weights, the Prediction Stake, every score and every ring are mine, and
[docs/DDR-001.md](docs/DDR-001.md) records that split along with the one place
the tool's first attempt was wrong. GitHub Copilot and, in earlier assignments,
bolt.new and Google AI Studio were used and are carried in
[context/TOOLS.md](context/TOOLS.md) with a ring each. Every delegation has a
row in [docs/DDR-LOG.md](docs/DDR-LOG.md).

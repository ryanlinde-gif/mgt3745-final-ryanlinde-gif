# AUDIT.md

Two dated audits of the context scaffold: one before 2026-11-12, one in the
final-iteration window. Each says what each file is for, whether it earns its
keep, and what changed.

## Audit 1 — 2026-11-11

**What was carried forward.** The eleven `context/` files came from my HW5
repository (`ryanlinde-gif/mgt3745-hw5`) rather than being written fresh. The
final project continues the HW1-to-HW5 problem, Recruiting Reality Check, as the
brief allows by default, so the framing, users, features and architecture
already existed and had been through five assignments of review.

Carried over the template stubs, unchanged at the moment of this audit:

| File | Lines | Why it earns its keep |
|---|---|---|
| `PROJECT.md` | 113 | The problem and its reframe. Written 2026-09-01, moved here 2026-09-15. Still the thing every other file traces to |
| `USERS.md` | 86 | Job statements from real interviews. The users are the same people this project still has to reach |
| `FEATURES.md` | 292 | EARS rows, Kano categories, exclusions. The largest single asset carried forward |
| `ARCHITECTURE.md` | 434 | Two Gates with sensitivity analysis, and the trust boundary. ADR-001 draws on this |
| `EVALS.md` | 156 | Existing evals and stakes. The RAT for the final project goes here |
| `STANDARDS.md` | 195 | My own HW5 standards. Normative for this repository |
| `STYLE.md` | 109 | Design tokens with their WCAG contrast ratios computed per pair |
| `SKILLS.md` | 55 | Reusable patterns and what the builders get reliably wrong |
| `TOOLS.md` | 24 | The trust-boundary ledger. **Rewritten by the sourcing audit, see docs/SOURCING-AUDIT.md** |
| `CLAUDE.md` | 103 | AI instructions for this repository |
| `AGENTS.md` | 5 | Pointer to CLAUDE.md |

**Kept from the template rather than carried forward:** `DESIGN.md`. HW5 had no
equivalent, and this project has a visual interface, so the brief requires it.

**Not carried forward:** HW5's `context/README.md`, a 20-line index of the
other files. The template has no such file and a directory listing does the same
job. A file nobody reads is a file that drifts.

**What this audit did not do.** It did not re-verify that each carried file is
still accurate against the build, because at this date there is no build in this
repository to check against. That is Audit 2's job in the final-iteration window.

## Audit 2 — final-iteration window

To be written after deployment, per the Module 12 milestone.

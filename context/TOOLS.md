# TOOLS.md

The ledger of Trust Boundary crossings, one row per dependency this repository
actually depends on. Rings, limits and exits come from
[docs/SOURCING-AUDIT.md](../docs/SOURCING-AUDIT.md), Audit 1, 2026-11-11.

**No credential appears in this file or anywhere in this repository.** The
`database_id` in `wrangler.toml` is an address, not a key, and
`evals/supply-chain.test.js` fails if that stops being true.

| Tool | Purpose | Ring | Checked on | Limit or price | Exit |
|---|---|---|---|---|---|
| **Node.js + `node:test`** | Runs every eval | Adopt | 2026-11-11 | Free, built in | None needed. Nothing to leave |
| **Claude (Claude Code)** | Drafting under review. Never decides | Adopt | 2026-11-11 | Subscription | Stop using it. Every use is under a DDR |
| **Cloudflare D1** | Holds every entry a user types | Adopt | 2026-11-11 | 5,000,000 rows read/day; 100,000 written/day; 500 MB/database; 10 databases | `wrangler d1 export` to plain SQL. **Tested 2026-11-11**, 1,096 bytes with schema |
| **GitHub + Pages** | Hosts the repository and serves the page | Adopt | 2026-11-11 | Free for public repositories | Push the history to GitLab or Codeberg; serve from Cloudflare Pages. 1 to 2 hours |
| **GitHub Codespaces** | Development environment | Adopt | 2026-11-11 | Free monthly core-hours, can run out mid-month | Develop locally. Costs an afternoon |
| **Cloudflare Workers** | Serves every request | Adopt | 2026-11-11 | 100,000 requests/day; 10 ms CPU per invocation; 64 MiB | Rewrite as a small Node server. 8 to 12 hours |
| **Google AI Studio** | One comparison run in HW6. Nothing retained | Assess | 2026-11-11 | Free tier quota | Nothing depends on it |
| **GitHub Copilot** | Editor suggestions | Trial | 2026-11-11 | Free on the student licence, **which ends at graduation** | Claude, already in use |
| **wrangler** | The only supported way to deploy a Worker | Adopt | 2026-11-11 | Free. **Pinned to 4.160.1** | **High in practice.** Leaving wrangler means leaving Cloudflare |
| **esbuild + workerd** | Arrive with wrangler, not chosen | Assess | 2026-11-11 | Free | None separately. **Both run `postinstall` scripts on my machine** |
| **bolt.new** | Used in HW5 and HW6. Nothing kept | Hold | 2026-11-11 | Token allowance | Already out. Nothing of its output ships |

**What crosses, stated plainly.** Entries a user types leave the browser and are
stored in Cloudflare's D1 under free-tier terms, in a region Cloudflare chose. If
that data is exposed, the person answering for it is me. The users are high
school athletes, some of them minors, which is why exit cost carries a weight of
30 in the audit.

## Revisit triggers

- A new service is added to the repository.
- A vendor changes pricing, terms, or region.
- A credential moves.
- **`wrangler` is upgraded off 4.160.1**, which is now a decision rather than an install.
- This repository stops being public, which changes the Copilot row.

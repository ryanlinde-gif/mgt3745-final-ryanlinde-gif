# Sourcing Audit

## Audit 1, November 2026

### Prediction Stake (commit before any evidence)

**Tight.** ADR-001 says this project has "no runtime dependencies and no build
step," and that is true of what ships to a user. But `wrangler` sits in
`devDependencies` and I have never looked at what it drags in.

**I predict `npm ls --all` will report more than 100 packages in the tree, from
that one declared dependency.** Resolution is a count: over 100 and the
prediction holds, 100 or fewer and it does not.

**Why it is worth staking.** If it is true, then "this project has no
dependencies" is a claim about the deployed page and not about my machine or my
deploy path, and the audit should say so in those words rather than letting the
shorter sentence stand. A supply-chain problem in that tree reaches my deploy
even though it never reaches a user.

### Weights (commit in their own commit, before scoring)

| Criterion | Weight | Why this weight for this project |
|---|---|---|
| Stability | 35 | This is the risk that already happened to this course. GitHub Classroom closed three days into the term and GitHub Models was withdrawn from every customer, both mid-semester. The project has to survive a vendor's decision I do not get a vote on, and that is the single most likely way it breaks |
| Exit cost | 30 | The product holds information about high school athletes, who are minors, and their recruiting situations. If a vendor changes its terms I need to be able to leave quickly rather than negotiate. D1 would hold the only copy of that data, which makes the cost of leaving a safety question and not only an engineering one |
| Pricing predictability | 20 | A student project dies at the first unexpected bill. Every service here is on a free tier, so what matters is not the price but whether the limit is published, numeric, and unlikely to move |
| Institutional fit | 15 | Lowest, because the course fixes most of the stack. Cloudflare, GitHub and Codespaces are not choices I am free to re-litigate, so this criterion is mostly a check that I have not added something outside what the course supports |

**Total: 100**

### Inventory

Twelve rows. `npm ls --all` reports **35 packages** in the tree, all pulled in by
one declared dependency; the three that matter get full rows below and the other
32 are counted rather than listed.

| Dependency | Kind | Where it is recorded | Ships to users? |
|---|---|---|---|
| wrangler | dev package | `package.json` devDependencies | No. Deploy-time only |
| esbuild | transitive package | `package-lock.json`, via wrangler | No |
| workerd | transitive package | `package-lock.json`, via wrangler | No |
| *32 other transitive packages* | transitive | `package-lock.json` | No |
| Cloudflare Workers | platform | `worker/wrangler.toml`, ADR-001 | **Yes.** Serves every request |
| Cloudflare D1 | platform | `worker/wrangler.toml` binding | **Yes.** Holds the data |
| GitHub (repository and Pages) | platform | the repository itself; README | **Yes.** Pages serves the page |
| GitHub Codespaces | platform | `.devcontainer/devcontainer.json` | No. Development only |
| Node.js and `node:test` | platform / runtime | `package.json` scripts | No. Evals only |
| Claude (Claude Code) | AI builder | `docs/DDR-LOG.md`, `context/CLAUDE.md` | No. Drafting under review |
| GitHub Copilot | AI builder | `context/TOOLS.md`, carried from HW5 | No |
| bolt.new | AI builder | `context/TOOLS.md`, carried from HW5 | No. Nothing of its output was kept |
| Google AI Studio | AI builder | `context/TOOLS.md`, carried from HW5 | No. Used once for comparison |

**No `<script src=`
 tags.** `grep -rn "<script src=" *.html` returns nothing. The page loads no CDN
script, which is what ADR-001 commits to.

### Evidence (each fact with its source and the date you read it)

| Dependency | Latest version and date | Maintainers or vendor | License or terms | Limits or price | Other notes | Checked on |
|---|---|---|---|---|---|---|
| wrangler | 4.160.1, published 2026-11-11 | **One npm account**, `wrangler-publisher <workers-devprod@cloudflare.com>` | MIT OR Apache-2.0 | Free | `npm view wrangler`. Published the same day I audited it, which is release churn, not staleness. **One publishing account is the single point of compromise for my deploy path** | 2026-11-11 |
| esbuild | 0.28.2, published 2026-08-08 | evanw | MIT | Free | **Runs a `postinstall` script: `node install.js`.** npm flagged it under `allow-scripts` during install | 2026-11-11 |
| workerd | 1.20261110.1, published 2026-11-10 | Cloudflare | Apache-2.0 | Free | **Also runs `postinstall: node install.js`.** Cloudflare's own runtime, downloaded as a binary | 2026-11-11 |
| Cloudflare Workers | n/a, hosted | Cloudflare | Free plan terms, accepted at signup | **100,000 requests/day**, resetting midnight UTC; **10 ms CPU per invocation**; 64 MiB worker size; 100 Workers/account | developers.cloudflare.com/workers/platform/limits | 2026-11-11 |
| Cloudflare D1 | n/a, hosted | Cloudflare | Free plan terms | **5,000,000 rows read/day; 100,000 rows written/day**; 500 MB per database; 10 databases; 5 GB per account; 50 queries per Worker invocation | developers.cloudflare.com/d1/platform/limits and /pricing | 2026-11-11 |
| GitHub + Pages | n/a, hosted | GitHub (Microsoft) | Free for public repositories | Pages soft limits apply; repository is public | **GitHub Classroom closed three days into this term and GitHub Models was withdrawn from every customer this semester.** Same vendor, both mid-term | 2026-11-11 |
| GitHub Codespaces | n/a, hosted | GitHub (Microsoft) | Free monthly core-hours for individuals | Core-hours are consumed and can run out mid-month | Development only. Losing it costs time, not the product | 2026-11-11 |
| Node.js + `node:test` | Node 24 LTS line | OpenJS Foundation | MIT | Free | `node:test` is **built in**, not a package. Nothing to compromise and nothing to update | 2026-11-11 |
| Claude (Claude Code) | Opus 5 | Anthropic | Consumer terms | Subscription | Drafting only, every use under a DDR | 2026-11-11 |
| GitHub Copilot | n/a | GitHub (Microsoft) | Student licence | Free while enrolled | **The licence ends when I graduate.** Carried from HW5 TOOLS.md | 2026-11-11 |
| bolt.new | n/a | StackBlitz | Free tier | Token allowance | HW5 and HW6. Shipped 18 dependencies and a hidden instruction file unasked, and once reported "the page is complete and meets every acceptance criterion" while rendering blank | 2026-11-11 |
| Google AI Studio | Gemini | Google | Free tier | Quota per day | Used once for the HW6 comparison. Nothing retained | 2026-11-11 |


### Scores and Rings

Each criterion 1 to 5. Weighted total is the sum of score times weight, **out of
500**. The total informs the ring; where my judgment points the other way, the
reason says why.

| Dependency | Stability | Exit cost | Pricing | Fit | Weighted | Ring | Reason in one line |
|---|---|---|---|---|---|---|---|
| Node.js + `node:test` | 5 | 5 | 5 | 5 | **500** | **Adopt** | Built into the runtime, so there is no package to compromise, no version to pin, and nothing to exit |
| Claude (Claude Code) | 3 | 5 | 4 | 5 | **410** | **Adopt** | Drafts a lot and decides nothing; every use is under a DDR and nothing it writes ships unreviewed |
| Cloudflare D1 | 4 | 3 | 5 | 5 | **405** | **Adopt** | Published numeric limits and `wrangler d1 export` is a real exit, which is why it scores above the Worker that reads it |
| GitHub + Pages | 3 | 4 | 5 | 5 | **400** | **Adopt** | Stability 3 is not a guess: this vendor closed Classroom and withdrew Models mid-semester, and I still depend on it |
| GitHub Codespaces | 3 | 5 | 3 | 5 | **390** | **Adopt** | Core-hours can run out mid-month, but losing it costs me an afternoon, not the product |
| Cloudflare Workers | 4 | 2 | 5 | 5 | **375** | **Adopt** | ADR-001 chose it and it serves every request; exit cost 2 is the honest price of that |
| Google AI Studio | 3 | 5 | 3 | 3 | **360** | **Assess** | Used once for the HW6 comparison and nothing was retained; it has no role in this project unless I need a second opinion again |
| GitHub Copilot | 3 | 5 | 2 | 4 | **355** | **Trial** | Pricing 2 because the student licence ends when I graduate. That is a dated, certain price change, not a risk |
| wrangler | 4 | 1 | 5 | 5 | **345** | **Adopt** | **Score and judgment disagree.** 345 is low because exit cost is 1, and that is accurate: it is the only supported way to deploy a Worker, so leaving it means leaving Cloudflare. Adopt anyway, because the alternative is not a different tool, it is a different architecture |
| esbuild + workerd | 4 | 1 | 5 | 4 | **330** | **Assess** | Two packages I did not choose that **run `postinstall` scripts on my machine**. I cannot remove them without removing wrangler, so Assess means watch, not replace |
| bolt.new | 2 | 5 | 3 | 2 | **310** | **Hold** | Fit 2 and stability 2. It produced output that violates ADR-001 directly, 18 dependencies and a hosted database, and once reported every acceptance criterion met while rendering a blank page |

**What the table says that I did not expect.** The three lowest rows are not the
ones I would have named before scoring. `wrangler`, `esbuild` and `workerd` all
sit at the bottom, and all three arrive from the same decision: choosing
Cloudflare. **My deploy path is the least exitable part of this project**, while
the thing that actually serves users, the hand-written page, depends on nothing
at all.


### Exit Plans (every critical dependency, every Trial)

Every row that holds data or serves users, plus every Trial and Assess row.

| Dependency | Trigger that would start an exit | Substitute | Hours to swap | Tested? (date and how) |
|---|---|---|---|---|
| **Cloudflare D1** | A terms change covering stored data, a region change, or the free tier dropping below 100,000 rows written per day | SQLite on any host, or Postgres. The export is plain SQL with the schema in it | 6 to 10 | **Yes, 2026-11-11.** Ran `npx wrangler d1 export mgt3745-entries --remote --output=backup.sql` against my live HW4/HW5 database. 15 lines, 1,096 bytes, `CREATE TABLE entries` and the rows present. Not committed; `.gitignore` excludes `*-backup.sql` |
| **Cloudflare Workers** | The same trigger as D1, or the 100,000 requests/day limit becoming a real ceiling | A small Node or Deno server on any host. The Worker is one file and uses no Cloudflare-specific API beyond the D1 binding | 8 to 12 | No. Tested indirectly: the D1 export above is the half that holds data, and the Worker is the half I can rewrite |
| **GitHub + Pages** | Another withdrawal like Classroom or Models, or the repository having to go private | Push the full history to GitLab or Codeberg; serve the page from Cloudflare Pages, which I already have an account for | 1 to 2 | No. `git remote add` and a push is a known path, not a risk |
| **GitHub Copilot** | **Graduation.** The student licence ends on a known date, not an uncertain one | Claude, already in use and already under DDRs | 0 | No test needed. Stopping is the exit |
| **esbuild + workerd** | A compromise of either package, or a postinstall script changing what it fetches | None available separately. The exit is the wrangler exit, which is the Cloudflare exit | n/a | No. Recorded as Assess precisely because there is no exit short of leaving the platform |
| **Google AI Studio** | Any. Nothing depends on it | Nothing. It was a second opinion once | 0 | No test needed |

**The honest gap.** Three of the six have no tested exit, and two of those cannot
have one, because leaving `wrangler`, `esbuild` and `workerd` means leaving
Cloudflare entirely. The exit I did test is the one that matters most: the data.

### Changes Caused by This Audit

- **Pinned `wrangler` from `^4` to exactly `4.160.1`** (commit on this branch).
  The audit found wrangler publishes from a **single npm account**,
  `wrangler-publisher <workers-devprod@cloudflare.com>`, and that its tree runs
  **two `postinstall` scripts** on my machine. `^4` means any future 4.x
  installs silently. Pinned, an upgrade is a decision I make and review rather
  than something `npm install` does for me.
- **Added `evals/supply-chain.test.js`**, four checks that keep ADR-001's
  commitments true rather than restating them: no runtime dependencies, wrangler
  pinned exactly, no CDN `<script src>` on any page, and no credential assigned
  a value in anything that ships. **`npm test` passes 4 of 4.** It replaced the
  template's placeholder eval, which failed by design.
  - Worth recording: the credential check's **first version failed on
    `worker/wrangler.toml`**, matching the comments that correctly explain how
    to set the secret with `wrangler secret put`. The test was wrong, not the
    repository, and it now strips comments and looks for a value actually
    assigned.
- **Added `*-backup.sql` to `.gitignore`** before running the export test, so
  the exit test could not accidentally commit a database dump.
- **ADR-001 amended**: a Related section now points at this audit.
- **`context/TOOLS.md` rewritten** with the ring, limits and exit columns this
  audit produced.
- **DDR line added** to `docs/DDR-LOG.md` for the AI assistance with this audit.

### Prediction Stake Resolution

**The prediction was wrong.**

I predicted `npm ls --all` would report **more than 100** packages from
`wrangler` alone. The actual count on 2026-11-11, after `npm install`, is
**35**.

```
$ npm ls --all --parseable | tail -n +2 | wc -l
35
```

The full list is 35 packages, most of them Cloudflare's own
(`@cloudflare/kv-asset-handler`, `workerd`, `miniflare`, `@cloudflare/unenv-preset`)
or platform binaries (`@esbuild/darwin-arm64`, `@img/sharp-darwin-arm64`).

**What I got right underneath the wrong number.** The reason for the stake was
that "this project has no dependencies" might be a claim about the deployed page
rather than about my deploy path, and that is exactly what it is. 35 packages is
fewer than I guessed and it is not zero, and **two of them run `postinstall`
scripts on my laptop with my permissions**. I did not predict that and it is a
worse finding than the count would have been. A supply-chain problem in that
tree reaches my deploy even though it never reaches a user.

**What the wrong prediction cost.** Nothing, and that is the point of staking a
number. Had I written "wrangler probably pulls in a lot," the audit would have
confirmed a feeling. The number forced me to run the command, and running the
command is what surfaced the postinstall scripts.

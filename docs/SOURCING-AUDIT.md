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

*To be filled after this commit.*

### Evidence (each fact with its source and the date you read it)

*To be filled after this commit.*

### Scores and Rings

*To be filled after this commit.*

### Exit Plans (every critical dependency, every Trial)

*To be filled after this commit.*

### Changes Caused by This Audit

*To be filled after this commit.*

### Prediction Stake Resolution

*To be filled after the evidence is gathered. The prediction above is not edited.*

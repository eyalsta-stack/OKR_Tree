# OKR Tree Builder — Memory File

**Created:** March 9, 2026
**Framework:** Continuous Discovery Habits (Teresa Torres) — outcome-oriented OKRs
**Structure:** Strategic Objectives > Team Objectives > 3 Key Results each
**Artifacts:**
- `okr-tree.html` — Communications team interactive D3.js visualization (standalone, original version)
- `okr-builder.html` — Multi-department OKR tree builder (pre-stored data + AI fallback)

---

## OKR Framework (Continuous Discovery Habits)

### Core Principle
OKRs define what **outcome** we want. Key Results define how we know we achieved it. Discovery experiments define what we try to get there.

### Rules
1. Objectives must describe desired **outcomes** (behavior change, experience improvement, business impact) — NEVER features, deliverables, or solutions
2. Key Results must measure **observable outcomes** — adoption, engagement, task success, efficiency, or business impact
3. Key Results should follow: `[Increase/Reduce] [metric] from [baseline] to [target] within [time]`
4. Each Objective should have 2-5 Key Results
5. OKRs must NOT reference features, technologies, or implementation methods
6. Solutions, experiments, and features belong **outside** the OKR structure

### Hierarchy
```
North Star Outcome
  → Strategic Objectives (initiatives)
    → Team Objectives
      → Key Results (quantitative signals)
        → Experiments / Solutions (outside OKR)
```

### Outcome vs Output
| Outcome (correct for OKRs) | Output (wrong for OKRs) |
|---|---|
| Increase successful support resolution | Build an AI assistant |
| Reduce time to first value | Ship onboarding wizard |
| Improve task completion rate | Deploy recommendation engine |

---

## Project Overview

A self-service tool for viewing and generating OKR trees. Pre-stored trees load instantly; departments without stored data can upload strategy docs for AI-powered generation (OpenAI GPT-4o).

### Departments & Sub-Departments

| Department | Sub-Departments | Color |
|---|---|---|
| FEF | Communications, Baseline, Reports | #f26127 |
| FEF - Communications | — | #f59e0b |
| FEF - Baseline | — | #34d399 |
| FEF - Reports | — | #c084fc |
| Mobile | — | #a78bfa |
| Pricing & Packaging | — | #fb923c |

**UI Theme:** Payoneer brand palette — primary accent `#f26127` (Payoneer orange), warm dark backgrounds, orange gradients in header.

### Key Features (okr-builder.html)

- **Dual mode:** Pre-stored data loads instantly; no-data departments get upload + AI generation
- **OKR Guide panel:** In-app reference of the Continuous Discovery framework rules (toggle from header)
- **Visualization:** Interactive D3.js tree with expand/collapse, zoom, pan, tooltips
- **Fit to screen:** Auto-scales tree to fit viewport on load and orientation toggle
- **Edge-connected links:** Curves connect box edges, not centers
- **Tree switcher:** Dropdown in toolbar to toggle between Company Overview and any department tree
- **Gallery view:** Card grid of all saved trees with stats
- **Company Overview:** Merged tree of all department trees
- **Local storage:** Saved trees persistence (up to 20)
- **Export:** JSON export per tree

### Data Storage (temporary — until a different solution is provided)

OKR tree data is stored directly in `okr-builder.html` in the `STORED_TREES` object, keyed by department label (e.g., `"FEF - Communications"`). To add data for a new department:

1. Add the tree JSON to `STORED_TREES` in `okr-builder.html`
2. Update this `memory.md` file with the corresponding structured data
3. The key format is `"Department"` or `"Department - SubDepartment"`

**Currently stored (outcome-based, Continuous Discovery framework):**
- `FEF - Communications` — 5 strategic objectives, 14 team objectives, 42 KRs

**Not yet stored (will show upload form):**
- `FEF` (all), `FEF - Baseline`, `FEF - Reports`
- `Mobile`
- `Pricing & Packaging`

---

## Company OKRs

Every department objective maps to one of these company-level OKRs:

| Company OKR | Focus | Color |
|---|---|---|
| Grow Up‑Market | Build Payoneer for multi-entity SMB/Es with more complex financial and operational needs; focus on True ICPs | #22d3ee |
| Flawless at the Fundamentals | Improve business resiliency, stability, and health to deliver better, faster, more relevant customer experiences | #e879f9 |
| Strengthen the P&L | Protect revenue and strengthen profitability by improving funnel efficiency and monetizing non-core segments | #f59e0b |
| Invest and Innovate | Reinforce our right to win by becoming AI-first, advancing stablecoin strategy, and upgrading platform infrastructure | #34d399 |

---

## Communications Team OKR Tree (Outcome-Based)

**Source:** `2026Strategy_Communications.docx`
**Framework:** Continuous Discovery Habits — all objectives describe behavior/experience changes, no solutions

---

## North Star Outcome

Customers receive the right message, at the right time, through the right channel — driving action, building trust, and reducing operational cost.

---

## Strategic Objective: Accelerate Customer Lifecycle Progression
**Company OKR: Grow Up‑Market**

Customers move faster through onboarding, activation, adoption, and growth because communications guide them at the right moment.

### Increase customer action completion

| Key Result | Timeline |
|-----------|----------|
| Action completion rate from ~50% to 65-70% | 2028 |
| Increase click-through rate by +3% | 2026 |
| +20-30% uplift across lifecycle journeys | 2028 |

### Reduce time to first customer value

| Key Result | Timeline |
|-----------|----------|
| Reduce median days to first payout | 2026 |
| Increase onboarding completion rate | 2026 |
| Reduce onboarding support tickets by 10-15% | 2027 |

### Increase reactivation of dormant customers

| Key Result | Timeline |
|-----------|----------|
| Reactivation rate increase from baseline | 2027 |
| Reduce 90-day churn rate | 2028 |
| +15-20% sustained action completion post-reactivation | 2028 |

---

## Strategic Objective: Strengthen Customer Trust & Control
**Company OKR: Flawless at the Fundamentals**

Customers trust the communications they receive because messages are consistent, respectful of preferences, and never confusing or excessive.

### Reduce customer confusion from communications

| Key Result | Timeline |
|-----------|----------|
| Reduce how-to/status support tickets by 10-15% | 2028 |
| Reduce message collision rate by 50% | 2026 |
| Collision rate down 80% | 2028 |

### Increase customer communication preference adoption

| Key Result | Timeline |
|-----------|----------|
| Opt-down vs unsubscribe ratio from 60% to 70% | 2026-27 |
| Digest adoption from 25% to 40% | 2026-27 |
| Reduce overall unsubscribe rates | 2027 |

### Ensure zero compliance breaches

| Key Result | Timeline |
|-----------|----------|
| 99.9% preference compliance at send-time | 2026 |
| 0 critical compliance breaches | 2028 |
| Audit-ready consent records with full lineage | 2026 |

---

## Strategic Objective: Reduce Operational Cost & Complexity
**Company OKR: Flawless at the Fundamentals**

The organization spends less time, money, and engineering effort creating, maintaining, and troubleshooting communications.

### Reduce engineering effort per communication

| Key Result | Timeline |
|-----------|----------|
| Reduce eng effort per new comm by 75% | 2028 |
| 80% of changes backed by experiment data | 2026 |
| Time-to-publish from 15 days to 10 days | 2026-27 |

### Reduce legacy system maintenance burden

| Key Result | Timeline |
|-----------|----------|
| Net savings of $4K-$121K/year | 2026-27 |
| 90% legacy communications deprecated | 2026 |
| 100% eligible comms consolidated | 2028 |

### Reduce communication defect rate

| Key Result | Timeline |
|-----------|----------|
| 98% governance pass rate at creation | 2026 |
| 100% metadata completeness on live comms | 2026 |
| 90% underperformers retired within 90 days | Ongoing |

---

## Strategic Objective: Improve Internal Communication Transparency
**Company OKR: Flawless at the Fundamentals**

Internal teams can instantly understand what any customer received and why, reducing investigation time.

### Reduce communication investigation time

| Key Result | Timeline |
|-----------|----------|
| Reduce comms ticket resolve time by 30-50% | 2027 |
| 95% of sends traceable with <1% error | 2026 |
| Increase monthly active internal users | 2027 |

### Enable customer communication explainability

| Key Result | Timeline |
|-----------|----------|
| Explainability available on communications | 2028 |
| 0 compliance exceptions on assisted content | 2028 |
| 10-15% uplift on optimized journeys | 2027 |

---

## Strategic Objective: Improve Organizational Execution Speed
**Company OKR: Flawless at the Fundamentals**

The communications team delivers faster with fewer handoffs because ownership and resolution paths are clear.

### Reduce request resolution friction

| Key Result | Timeline |
|-----------|----------|
| Request-to-resolution consistently meets SLA | 2026 |
| Increase first-contact resolution rate | 2026 |
| Reduce handoffs per ticket | 2026 |

### Maintain execution velocity on plan

| Key Result | Timeline |
|-----------|----------|
| Quarterly legacy deprecation on plan | 2026 |
| Quarterly new journey creation on target | 2026 |
| Reduce active templates, increase reuse | 2026-27 |

---

## Communications Summary Stats

- **5 Strategic Objectives** (outcome-focused, no solutions)
- **14 Team Objectives** (behavior/experience changes)
- **42 Key Results** (exactly 3 per objective)

---

## Communications Cost Summary

| Item | Amount |
|------|--------|
| Current Braze annual cost | $350K |
| Realistic cost increase | +$40K-$120K |
| Cost decrease levers | $124K-$161K + 1 eng/yr |
| **Net expected outcome** | **~$4K-$121K net savings/year** |
| Acoustic savings (ends Oct 2026) | $80K/year hard saving |

---

## Communications Data & Event SLA Tiers

| Tier | Latency | Examples |
|------|---------|---------|
| Tier 0 (critical) | ≤5 seconds | Payment failed/received, document required, KYC step completed |
| Tier 1 (journey) | ≤60 seconds | Onboarding step completed, usage threshold, reactivation trigger |
| Tier 2 (audiences) | ≤15 minutes | Segments, usage percentages, computed audiences |

---

## Technical Architecture

### okr-builder.html Stack

- **D3.js v7** — Tree layout & rendering
- **Pre-stored data** — Outcome-based OKR trees in `STORED_TREES` (Continuous Discovery framework)
- **AI fallback** — OpenAI GPT-4o with Continuous Discovery system prompt (for departments without stored data)
- **Mammoth.js + PDF.js** — Client-side document parsing (for AI generation mode)
- **OKR Guide panel** — In-app reference of framework rules (toggle from header)
- **localStorage** — Persistence for saved trees (up to 20)

### OKR Tree JSON Schema

```json
{
  "name": "Department Strategy",
  "type": "vision",
  "color": "#hex",
  "detail": "One-sentence description",
  "children": [
    {
      "name": "Strategic Objective (qualitative outcome)",
      "type": "initiative",
      "color": "#hex",
      "detail": "Desired change in behavior/experience",
      "children": [
        {
          "name": "Team Objective (qualitative outcome)",
          "type": "objective",
          "color": "#hex (same as parent)",
          "detail": "Customer/business behavior change targeted",
          "children": [
            {
              "name": "Key Result (metric from baseline to target)",
              "type": "kr",
              "timeline": "2026",
              "color": "#hex (same as parent)",
              "detail": "What this metric measures and why it signals the outcome"
            }
          ]
        }
      ]
    }
  ]
}
```

### OKR Structure Rules (Continuous Discovery Habits)

1. Objectives describe **outcomes** (behavior change, experience improvement, business impact) — NEVER features or solutions
2. Key Results measure **observable outcomes** — adoption, engagement, task success, efficiency, or business impact
3. Key Results follow: `[Increase/Reduce] [metric] from [baseline] to [target]`
4. Each Strategic Objective has 2-4 Team Objectives
5. Each Team Objective has exactly 3 Key Results
6. Every node has a `detail` field explaining the intended behavior change
7. Names under 50 characters; details carry context
8. Solutions, technologies, and features belong **outside** the OKR tree

### Views

| View | Route | Description |
|------|-------|-------------|
| Input | Default | Select dept + sub-dept; load stored tree or upload for AI generation |
| Tree | After load | Interactive D3.js tree for one department |
| Gallery | "All Trees" button | Card grid of all saved trees with stats |
| Company Overview | "Company Overview" button | Merged tree with all departments as branches |

### Navigation

- **Header buttons:** All Trees, Company Overview, + New Tree, OKR Guide
- **OKR Guide:** Slide-out panel with Continuous Discovery framework rules, examples, and creation guidelines
- **Tree switcher dropdown:** In tree/company toolbar, toggle between any saved tree and company overview
- **Gallery cards:** Click to open any saved tree

---
title: "FAIR Monte Carlo for Red Team Programmes: Mapping TTPs to Risk Distributions"
date: 2025-01-14
tags: ["FAIR", "Monte Carlo", "Red Team", "Risk", "CT-ASF"]
description: "Most red team reports deliver a CVSS score with no connection to financial exposure. FAIR changes that. Here's how CT-ASF maps adversary TTPs to loss exceedance curves."
---

Most red team reports deliver a finding, a CVSS score, and a remediation recommendation. The business receives a number between 1 and 10 with no connection to financial exposure, board-level risk appetite, or the cost of remediation versus acceptance. FAIR (Factor Analysis of Information Risk) changes that by grounding risk in loss event frequency and loss magnitude distributions — both of which we can anchor to actual adversary TTP data.

## Why CVSS Fails the Business

CVSS was designed for vulnerability severity, not organisational risk. A 9.8 CVSS score on an internet-facing system with no sensitive data is less important than a 5.5 score on a system containing your customer database. CVSS has no concept of likelihood, exposure, or business context.

When a CISO presents red team findings to a board using CVSS scores, they are presenting technical severity dressed as business risk. The board cannot make a rational investment decision from that data.

## The FAIR Framework

FAIR decomposes risk into two primary factors:

- **Loss Event Frequency (LEF)**: How often is a loss event likely to occur? Derived from Threat Event Frequency (TEF) and Vulnerability (the probability a threat agent succeeds when attempting).
- **Loss Magnitude (LM)**: How much does a loss event cost? Broken down into primary loss (direct costs) and secondary loss (regulatory, legal, reputational).

Both factors are expressed as distributions, not point estimates. This is the key insight: we don't know exactly how often an attacker will attempt a technique, or exactly what a breach will cost. We know ranges, and we can express uncertainty honestly.

## The CT-ASF Approach

Each engagement phase in CT-ASF produces structured outputs mapped to ATT&CK techniques. For each technique successfully executed, we estimate TEF using a **PERT distribution** seeded from threat intelligence:

```python
import numpy as np
from scipy.stats import beta

def pert_sample(minimum, most_likely, maximum, samples=100_000, lam=4):
    """Sample from a PERT distribution."""
    r = maximum - minimum
    alpha = 1 + lam * (most_likely - minimum) / r
    beta_param = 1 + lam * (maximum - most_likely) / r
    return minimum + r * beta.rvs(alpha, beta_param, size=samples)

# Example: Phishing TEF for financial sector
# Min: 0.5/year, Most likely: 2/year, Max: 8/year
tef_samples = pert_sample(0.5, 2.0, 8.0)
```

The minimum, most-likely, and maximum values are drawn from sector-specific CTI feeds, with time-decay weighting applied (a data point loses half its weight after 180 days, retired at 365).

## Loss Magnitude Modelling

Loss magnitude uses the same PERT approach. Primary loss factors:

| Factor | Typical Range (SME financial) | Notes |
|--------|-------------------------------|-------|
| Response & investigation | £50K–£500K | IR firm day rates × estimated duration |
| Productivity loss | £20K–£2M | Depends on systems affected |
| Competitive advantage | £0–£5M | Difficult to bound; often the largest factor |

Secondary loss factors (regulatory fines, legal exposure) feed from a separate table updated quarterly against enforcement actions in the client's jurisdiction.

## Running the Simulation

The Monte Carlo run is 100,000 iterations in Python with NumPy. For each iteration, we sample TEF, vulnerability, primary LM, and secondary LM from their distributions and compute annualised loss expectancy (ALE):

```python
def simulate_ale(tef_samples, vuln_samples, primary_lm_samples, secondary_lm_samples):
    """Monte Carlo ALE simulation."""
    n = len(tef_samples)

    # Loss event frequency = TEF × Vulnerability
    lef = tef_samples * vuln_samples

    # Total loss magnitude per event
    lm = primary_lm_samples + secondary_lm_samples

    # Annualised loss expectancy
    ale = lef * lm

    return ale

ale = simulate_ale(tef_samples, vuln_samples, primary_lm, secondary_lm)

# Key outputs
print(f"10th percentile ALE: £{np.percentile(ale, 10):,.0f}")
print(f"50th percentile ALE: £{np.percentile(ale, 50):,.0f}")
print(f"80th percentile ALE: £{np.percentile(ale, 80):,.0f}")
print(f"95th percentile ALE: £{np.percentile(ale, 95):,.0f}")
```

The 80th percentile figure goes into the executive summary. The full loss exceedance curve goes to the risk team.

## What Goes in the Report

Rather than "CRITICAL — CVSS 9.1", the executive summary reads:

> *Successful exploitation of the identified credential access technique (T1110.003) is estimated to occur 1.8 times per year (80th percentile). The expected annual loss from a single exploitation event is £340,000–£1.2M (10th–80th percentile), driven primarily by investigation costs and potential regulatory exposure under UK GDPR Article 83.*

That is a sentence a board member can act on.

## Limitations and Honest Caveats

This approach is only as good as the threat intelligence inputs. Garbage in, garbage out — if your TEF estimates are pulled from the air rather than anchored to actual CTI, the output is pseudoprecision dressed up as rigour.

The model also assumes loss factors are independent, which they are not. A regulatory fine often follows a breach that also incurs productivity losses. Correlation between factors is an area for improvement in CT-ASF v2.

Despite these limitations, FAIR Monte Carlo produces more useful outputs for business decision-making than CVSS scoring, and the improvement in executive communication alone justifies the additional modelling effort.

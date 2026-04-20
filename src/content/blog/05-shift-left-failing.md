---
title: "Shift Left Security Is Failing — An Adversary Simulation Operator's View"
date: 2024-11-08
tags: ["Red Team", "AppSec", "DevSecOps", "CT-ASF", "Strategy"]
description: "Enterprise programmes have SAST, SCA, and secrets scanning baked into CI/CD. Breach rates haven't declined. The adversary doesn't care about your pipeline — and here's why."
---

"Shift left" entered the security lexicon as a straightforward proposition: find bugs earlier in the SDLC and they cost less to fix. Fifteen years of maturation later, most enterprise programmes have SAST, SCA, secrets scanning, and IaC review baked into CI/CD pipelines. Security tooling vendors have never been more profitable.

Breach rates have not meaningfully declined.

## What Shift Left Actually Secured

Shift left has unambiguously improved *application-layer* security. SQL injection in new code is rarer than it was in 2010. Memory safety vulnerabilities in managed-language applications are largely caught at the linter stage. Hardcoded credentials in application repositories are flagged within seconds of a push.

This is genuinely good. We should acknowledge it.

The problem is that application-layer vulnerabilities represent a shrinking fraction of the actual attack surface. Adversaries optimise for the path of least resistance. When application-layer defences improve, they move elsewhere.

## Where the Adversary Actually Operates

The dominant initial access vector in 2024 is phishing for valid credentials, followed by exploitation of internet-facing appliances running vendor code that your SAST scanner never touched. After that: trusted relationships, supply chain, and misconfigured cloud infrastructure.

Notice what is absent: web application vulnerabilities, memory corruption, injection attacks. These exist and are exploited — but they are not the primary path to domain compromise in the organisations we test against.

In CT-ASF engagements across multiple verticals, **application-layer findings represent less than 20% of the critical path to domain compromise.** The rest is:

- **Identity**: Phished credentials, MFA bypass (EvilProxy, Modlishka), token theft from memory or disk
- **Misconfiguration**: Cloud IAM overpermissioning, exposed S3 buckets, misconfigured service accounts
- **Privilege escalation via legitimate tooling**: Living-off-the-land with LOLBins, abusing built-in Windows features, exploiting trusted admin tools
- **M365 / OAuth abuse**: Consent phishing, token theft via device code flow, legacy authentication protocols that bypass MFA

Not a single one of these attack classes is addressed by shifting application security testing left.

## The Threat Model Has Moved

Shift left secured the application layer of a threat model that largely expired around 2018. The actual attack surface has migrated to:

**Cloud IAM**: Identity is the new perimeter. An overpermissioned service account or a developer with `iam:PassRole` on the wrong resource is more valuable to an attacker than a remote code execution vulnerability in most cases.

**M365 OAuth and conditional access**: Organisations with mature network security controls routinely have gaps in their Microsoft 365 conditional access policies that allow token theft and session hijacking. This bypasses MFA entirely.

**Supply chain via update mechanisms**: Not the headline SolarWinds-style attacks, but the quieter cases — compromised NPM packages, poisoned PyPI dependencies, update infrastructure with insufficient signing validation. Shift left tooling flags *known malicious* packages via SCA; it cannot detect a novel compromise of a trusted package.

**Initial access brokers**: Credentials for your organisation's VPN, RDP, or email are for sale. The initial access step is already solved before your security team is involved.

## What Continuous Red Team Reveals

CT-ASF engagements are designed to test the actual threat model, not the application-layer model. Seven-phase engagements run continuously against production infrastructure, with findings fed back into the risk model in near-real-time.

The consistent finding: organisations with mature shift-left programmes have well-hardened applications and porous identity, cloud, and email security. The ROI on the next pound of application security investment is marginal. The ROI on identity hygiene, cloud IAM review, and conditional access hardening is substantial.

This is not an argument against shift left. It is an argument for treating shift left as *necessary but not sufficient*, and for funding adversary simulation programmes that test the attack surface that actually matters in 2025.

## A Framework for Prioritisation

From CT-ASF findings, a rough prioritisation for organisations that have mature application security:

1. **Identity hardening**: Phishing-resistant MFA (FIDO2/passkeys), conditional access, privileged access workstations for admin tasks
2. **Cloud IAM audit**: Automated detection of overpermissioned roles and service accounts, enforced least-privilege
3. **Email security**: Anti-phishing controls (DMARC/DKIM/SPF enforcement, sandboxing, O365 conditional access policies)
4. **Supply chain**: Dependency pinning with hash verification, private registry mirroring, software composition analysis beyond CVE matching
5. **Detection engineering**: Detection coverage for the ATT&CK techniques most relevant to your threat profile — not generic coverage, targeted coverage

Application security stays in the programme. It moves down the priority list.

## The Uncomfortable Conclusion

Shift left is a success story that the industry has over-generalised into a complete strategy. It secured the application layer. The application layer is no longer the primary attack surface.

The adversary does not care about your SAST pipeline. They care about your IT help desk's password reset procedure, your DevOps team's AWS permissions, and the fact that your legacy VPN appliance hasn't been patched in eight months.

Continuous adversary simulation — operating at the pace of the actual threat, against actual production infrastructure, with realistic TTP coverage — is the mechanism for keeping the threat model current. Shift left is one input to that model, not the whole model.

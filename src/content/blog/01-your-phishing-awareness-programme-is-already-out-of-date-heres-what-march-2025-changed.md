---
title: "Your phishing awareness programme is already out of date. Here's what March 2025 changed."
date: 2026-04-21
tags: ["AI", "Phishing", "Social Engineering"]
description: "In March 2025, something happened that most security awareness programmes haven't yet caught up to: AI agents became more effective than elite human red teams at crafting spear-phishing campaigns."
draft: true
---

In March 2025, something quietly shifted in the cyber security landscape that most organisations have not yet absorbed into their defences.
For two years, Hoxhunt had been running a controlled experiment: AI-generated spear-phishing campaigns against millions of real users, benchmarked against campaigns crafted by elite human red teams. In November 2024, the humans were still winning by a comfortable margin — especially against trained users.
By March 2025, that had reversed. AI agents were crafting spear-phishing that outperformed the human red teams across the full spectrum of user skill levels. Not marginally. Conclusively.
Harvard Business Review, in parallel research, measured something even more striking: AI-automated spear-phishing was achieving click-through rates of around 54%. For context, traditional mass phishing typically sits in the low single digits, and even well-targeted human-crafted spear-phishing rarely exceeds 30%.
The threat didn't evolve. It changed category.
And most organisations — including many I would consider mature — are still running awareness programmes designed for a world that no longer exists.
## What traditional awareness training was built to defend against
If you have worked in cyber security for any length of time, you know the playbook we've all been teaching staff for a decade. Look for bad grammar. Watch out for generic greetings. Be suspicious of urgency. Hover over links before clicking. Check the sender's domain carefully.
This advice was genuinely useful — when attackers were mass-producing phishing at scale with limited linguistic resources and crude personalisation. It gave users heuristics that worked against a large portion of threats they would realistically encounter.
Those heuristics are now actively misleading.
AI-generated lures have:

- Impeccable grammar. Often better than the legitimate emails sitting next to them in your inbox.
- Accurate contextual detail. The attacker knows your industry, your role, your recent LinkedIn activity, the conference you attended, the paper your colleague just published.
- Native stylistic fluency. The email reads like it came from someone in your organisation because it is linguistically indistinguishable from one.
- Personalisation at scale. The thing that used to make spear-phishing expensive, researching each target individually, has collapsed to near-zero cost.

A user trained on the traditional heuristics will now look at a well-crafted AI-generated lure, find nothing to flag, and click. Not because the training failed. Because the training was correct for a different threat model.
## The four shifts that actually matter in 2026
If you are responsible for human-risk defence in your organisation, these are the four things that have materially changed and need addressing:
1. LLM-generated phishing indistinguishable from legitimate internal communication. The attacker no longer needs to impersonate your CEO with clumsy phrasing. They can produce an email that sounds exactly like someone in your HR team, finance team, or IT helpdesk — tone, cadence, structural conventions, all matched. Staff cannot reliably tell the difference by reading.
2. Voice cloning (vishing) at commodity pricing. Three seconds of audio from any public-facing senior executive — a conference talk, a podcast, a recorded earnings call — is enough to generate a convincing voice clone. "Your CFO" can now leave you a voicemail asking you to urgently action a payment. The FBI and NCSC have both flagged this as a rising attack pattern. Voice was always a trusted channel. It isn't anymore.
3. Deepfake video impersonation for high-value interactions. The Hong Kong finance worker who transferred $25 million after a deepfake video call featuring what looked like his CFO and several senior colleagues is no longer an outlier. The technology is cheaper, faster, and more accessible every quarter. Video is no longer a verification layer.
4. Adversary-in-the-middle phishing that defeats MFA. This one deserves particular attention because it directly invalidates the control that many organisations rely on as their primary phishing defence. AiTM attacks surged 146% in 2024. The technique: instead of trying to steal credentials, the attacker sits between the user and the legitimate service, relays the authentication in real time, and hijacks the resulting session cookie. The user completes MFA successfully. The attacker now has an authenticated session. MFA didn't fail — it was bypassed.
## Why research and scientific organisations are particularly exposed
There is a specific reason this new landscape hits research organisations harder than, say, a financial services firm.
Research environments have a naturally rich attack surface for AI-generated lures. Scientists routinely receive emails from unfamiliar international collaborators, unknown funding bodies, niche conference organisers, novel journal editors, paper peer-review systems, and visiting researcher coordinators. Every one of these is a legitimate pattern of communication. Every one of them is also a perfect phishing pretext.
The problem is worse than a simple numerical target density. The signal-to-noise ratio of legitimate-but-unfamiliar emails in a scientist's inbox is fundamentally different from a corporate knowledge worker's. They are trained, professionally and culturally, to engage with unfamiliar external communication. That is how science works.
Layer on top of that the growing use of AI-assisted writing in legitimate correspondence — the paper review request that was genuinely polished by ChatGPT, the funding body that now uses AI to draft outreach — and the tell-tale signs users were taught to look for are becoming common markers of entirely legitimate communication.
The old model was: assume suspicion, verify trust. That model is breaking down in environments where the baseline rate of unfamiliar, AI-polished, contextually accurate communication is rising for entirely benign reasons.
## What modern human-risk defence actually looks like
I want to be direct here, because the prescription matters.
If your awareness programme in 2026 still consists of an annual compliance module and a quarterly phishing simulation using 2019-era templates, you do not have a human-risk defence. You have a record of having tried.
Modern human-risk defence has five components, and they work together — removing any one of them weakens the rest.
Behaviour change, not awareness. The goal is not to make staff knowledgeable about phishing. The goal is to make them reflexively report it. Industry data consistently shows that organisations running behavioural programmes achieve sustained reporting rates around 20%. Organisations running traditional compliance-based awareness achieve around 10%. Doubling your early-warning signal is not a marginal improvement — it is often the difference between catching a compromise in hours versus weeks.
Realistic, current simulations. Stop running phishing simulations that look nothing like what attackers are actually sending. Simulate the current threat: Teams voice-message lures, OAuth consent prompts, QR-code delivery, SaaS impersonation. If your users have never seen a simulation that reflects modern tradecraft, your metrics are telling you a reassuring fiction.
Phishing-resistant authentication where it matters most. FIDO2 / passkeys for privileged users, admin accounts, and high-risk populations. This is the only class of authentication that structurally defeats AiTM session hijacking. Universal deployment is a multi-year programme for most organisations; targeted deployment to the users who matter most is achievable in months.
Process-level defences for high-value transactions. Voice calls and video meetings can no longer be standalone verification layers for payments, access grants, or sensitive data requests. Build out-of-band verification into the process itself — a callback to a known number, a second-channel confirmation, a dual-approval workflow. These controls don't require user vigilance; they require process design.
Tabletop exercises that include AI-era scenarios. When did your organisation last run a tabletop exercise covering a deepfake video call requesting a payment, or a voice clone of your CEO requesting access to a system? If the answer is "never," your incident response team has not rehearsed the scenarios that are statistically most likely to hit you in the next 24 months.
The honest conclusion
The staff in your organisation are about to be phished with content indistinguishable from the real thing, by attackers operating at effectively unlimited scale, using tradecraft that outperforms professional red teams.
The question is no longer whether your staff will be fooled. A meaningful percentage of them will be, and no training programme in existence can prevent that against the best of the current threats.
The question is whether your programme can:

Detect the compromise fast, through high reporting rates and behaviour-led early warning;
Contain the compromise, through phishing-resistant authentication on the accounts that matter most;
Respond to the compromise, through process controls and exercised incident response that doesn't depend on spotless user judgement.

Most awareness programmes are still optimising for prevention. The ones that work in 2026 are optimising for resilience.
If you haven't reviewed yours since March 2025, it's time.

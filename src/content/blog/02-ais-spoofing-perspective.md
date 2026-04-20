---
title: "AIS Spoofing in the Wild: A Threat Emulation Perspective"
date: 2025-02-07
tags: ["Maritime", "AIS", "SIGINT", "Threat Emulation", "MSASP"]
description: "The Automatic Identification System has no authentication. Three decades of maritime tracking infrastructure rely on transmissions any SDR operator can forge. Here's what threat emulation reveals."
---

The Automatic Identification System was designed in the 1990s for collision avoidance between vessels. Authentication was never in scope. Three decades later, the entire global maritime tracking infrastructure still relies on unauthenticated VHF transmissions that any SDR operator can forge with roughly 30 lines of Python and a £35 SDR dongle.

This is not a theoretical concern. AIS spoofing events are documented, reported to the IMO, and mostly ignored.

## How AIS Works

AIS operates on two VHF channels (161.975 MHz and 162.025 MHz) using TDMA. Each vessel broadcasts its **MMSI** (Maritime Mobile Service Identity), position, speed, heading, and vessel type at intervals ranging from 2 seconds (when underway at speed) to 3 minutes (at anchor).

The protocol has no cryptographic signing, no sequence number validation, and no replay protection. A valid-looking packet with any MMSI will be accepted by receivers, charting systems, and displayed on other vessel bridges.

## Attack Classes in MSASP

In our threat emulation programme, we model several AIS attack classes. Each has different detection difficulty and operational impact.

### Ghost Ship Injection

Creating fictitious MMSI entries that appear on MarineTraffic, VesselFinder, and vessel bridge AIS displays. The injected vessel can be given any characteristics — VLCC, naval vessel, pilot boat — and positioned anywhere within range of the transmitter.

**Operational impact**: Confusion in vessel traffic services, false CPA (Closest Point of Approach) alerts, navigation distraction.

**Detection**: Correlation against radar (if the injected position has no radar return, it's a ghost). Satellite AIS provides a secondary truth source that cannot be spoofed locally.

### Position Spoofing of Real Vessels

Transmitting fake position updates for an existing MMSI, effectively relocating a real vessel on all displays. The real vessel continues broadcasting — the attack works by transmitting at higher power or by timing transmissions to collide with the genuine broadcast.

**Operational impact**: Obscuring actual transit routes, creating false alibis for vessel positions, disrupting traffic separation scheme compliance monitoring.

**Difficulty**: Higher than ghost injection because the real vessel continues broadcasting. Sustained spoofing requires persistent interference.

### AIS Suppression

Targeted RF interference on the AIS channels to deny broadcast entirely. This requires the attacker to be within range of the target vessel and can be detected by shore-based monitoring systems watching for MMSI dropouts.

**Use case in adversary simulation**: Testing whether maritime operations centres detect and respond to vessel disappearances, and how quickly.

## What Defenders Should Do

The IMO has known about AIS spoofing since at least 2015. The response has been advisories recommending that navigators treat AIS as *advisory only*. This is a policy failure dressed up as technical guidance.

More useful defensive measures:

**Radar correlation**: Every vessel on AIS should correspond to a radar return. Automated correlation engines can flag discrepancies in near-real-time. Most integrated bridge systems do not do this by default.

**Trajectory physics validation**: Vessels that teleport, exceed hull speed, or appear in physically impossible locations (landlocked, changing position instantaneously) are trivial to detect algorithmically. This catches the unsophisticated attacks.

**Satellite AIS**: S-AIS receivers on LEO satellites provide coverage globally and cannot be jammed or spoofed locally. Cross-referencing terrestrial and satellite AIS catches location discrepancies.

**LRIT correlation**: Long-Range Identification and Tracking is a separate IMO system using satellite communications. Comparing LRIT and AIS positions for vessels required to carry both provides a secondary truth source.

## The Authentication Problem

The fundamental issue is that AIS was designed for a threat model that did not include deliberate falsification. Adding authentication requires a protocol change that every AIS transponder in the world (estimated 400,000+ units) would need to support.

There are proposals — including a public-key infrastructure approach — but the pace of maritime standards bodies makes implementation a decade away at minimum. In the meantime, treat AIS as you would any unauthenticated data source: useful signal, not ground truth.

For threat emulation purposes, AIS spoofing is one of the more accessible maritime attack vectors to demonstrate to clients — the equipment is cheap, the technique is documented, and the impact on vessel displays is immediate and visible.

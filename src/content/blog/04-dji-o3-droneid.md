---
title: "Intercepting DJI O3 — DroneID Beacons, Replay Attacks, and GPS Spoofing"
date: 2024-12-21
tags: ["DJI", "DroneID", "SDR", "GPS Spoofing", "Hardware"]
description: "DJI OcuSync 3.0 broadcasts operator and drone GPS in the clear. No encryption, no authentication. Here's what that means for interception, replay, and GPS spoofing against the flight controller."
---

DJI OcuSync 3.0 is the video and control link used across the Mavic 3, Mini 3, and Air 3 product families. It operates across 2.4 and 5.8 GHz, switching dynamically under interference. DroneID is the identification layer broadcast over this link — a brief OFDM burst every 3 seconds carrying operator GPS coordinates, drone GPS coordinates, serial number, and flight state.

This post covers what DroneID looks like on a spectrum analyser, how to demodulate the frames, and what you can do (and what defenders can detect) with the data.

*All testing was conducted in a controlled RF environment under appropriate authorisation.*

## The Regulatory Context

DroneID exists because regulators require remote identification of drones. The EU's Commission Implementing Regulation (EU) 2019/947 and the UK CAA's equivalent mandated that drones over 250g broadcast operator identity and position. DJI implemented this via their proprietary DroneID protocol rather than the open ASTM F3411 standard used by other manufacturers.

The result is a system that technically complies with remote ID requirements while using a proprietary format that makes third-party monitoring harder — but not impossible.

## Capturing DroneID Frames

DroneID frames are visible with any SDR capable of 2.4 GHz reception. I used a **HackRF One** with a 10 MHz capture window centred on the active O3 channel. A USRP B200mini or RTL-SDR with upconverter also works, though the RTL-SDR's ADC noise at this frequency is noticeable.

In GNU Radio, the capture setup:

```
HackRF Source (2.4G centre, 10M sample rate)
  → DC Blocker
  → Low Pass Filter (cutoff 5M, transition 1M)
  → Complex to Real
  → File Sink (capture .iq for offline analysis)
```

The burst is approximately 1.6ms wide and appears as a brief spectral hump every 3 seconds. In the waterfall display, it looks like a narrow flash roughly 6 MHz wide with the characteristic rectangular spectral shape of OFDM.

## Frame Structure

Once demodulated, the DroneID payload structure (as documented by Bräunig et al. and others doing OTA reverse engineering):

| Field | Size | Format | Notes |
|-------|------|--------|-------|
| Serial number | 16 bytes | ASCII | Drone serial, not operator |
| Latitude (drone) | 4 bytes | int32 × 10⁷ | WGS84 |
| Longitude (drone) | 4 bytes | int32 × 10⁷ | WGS84 |
| Altitude | 2 bytes | int16, metres × 10 | Relative to home point |
| Latitude (operator) | 4 bytes | int32 × 10⁷ | From controller GPS |
| Longitude (operator) | 4 bytes | int32 × 10⁷ | From controller GPS |
| Flight state | 2 bytes | enum | Ground/Hover/Flying/RTH |

No encryption. No authentication. No sequence number. The entire payload broadcasts in the clear, by design — it's intended to be readable by any compliant receiver.

## Replay Attacks

Replaying a captured DroneID beacon at elevated power causes some monitoring receivers to report a ghost drone at the original captured position. This is relevant for:

- Confusing drone monitoring systems at sensitive sites
- Creating false positives in counter-UAS detection arrays
- Obscuring real drone activity with ghost traffic

The attack is trivial: capture a 3-second IQ window containing a beacon, replay at +10 dB above ambient. Duration of the ghost effect depends on how aggressively the monitoring system ages out stale detections.

**Detection**: Monitoring systems that cross-reference DroneID serial numbers against registered databases will see a serial number that doesn't match current flight conditions. Systems using RF direction finding will see the signal coming from the replay transmitter location, not the reported operator position.

## GPS Spoofing the Flight Controller

The more operationally significant attack vector is GPS spoofing the drone itself, causing the flight controller to believe it is in a different location than its actual position.

DJI consumer drones use GPS for:

- **Position hold** in hovering
- **Return-to-home (RTH)**: the drone flies back to the GPS-recorded home point
- **Geofencing**: restricted zones are enforced by GPS coordinates

Spoofing the drone's GPS causes the flight controller to update its believed position, which:

1. Triggers RTH to the *spoofed* home point if the drone believes it has drifted
2. Activates geofence landing if the spoofed position is within a restricted zone
3. Causes position hold to drift as the FC compensates for the spoofed position

The spoofing equipment used in testing was a GPS signal generator (bench tool, not disclosed) broadcasting L1 C/A signals at power levels sufficient to capture the drone's GPS receiver. Capture requires being within approximately 50–100m of the target and transmitting 20–40 dB above ambient GPS signal levels.

**Mitigations**: DJI's newer firmware includes basic GPS anti-spoofing checks (satellite count validation, signal quality monitoring). These catch naive spoofing attacks but can be bypassed by generating plausible satellite constellations rather than a single strong fake signal.

## Defensive Takeaways

For operators deploying drones in security-sensitive environments:

- **DroneID data is public**: Your operator GPS coordinates are broadcasting in the clear every 3 seconds. Plan accordingly.
- **Geofencing is not a security control**: It is a compliance tool that is trivially defeated by GPS spoofing.
- **Monitoring for your own drones**: RF direction finding on the DroneID frequency provides a secondary position source that is harder to spoof than GPS.
- **Firmware patching**: DJI's anti-spoofing improvements are meaningful, even if not complete.

The fundamental limitation is that consumer drone platforms were not designed for adversarial environments. Using them in those environments requires accepting significant residual risk.

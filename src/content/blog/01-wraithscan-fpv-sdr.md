---
title: "Building WRAITHSCAN: Passive FPV Drone Detection with RTL-SDR and ESP32"
date: 2025-03-19
tags: ["SDR", "Hardware", "SIGINT", "FPV", "GNU Radio"]
description: "A deep dive into building a passive RF detection system for analog FPV drone transmissions using ESP32, RTL-SDR, and GNU Radio — no transmission required."
---

The FPV racing and surveillance drone market has exploded. Consumer 5.8 GHz analog video transmitters flood the RF spectrum at race tracks, construction sites, and increasingly, in contexts operators would prefer remained unmonitored. WRAITHSCAN is my answer to the question: can we passively detect and fingerprint these transmissions without transmitting anything ourselves?

The short answer is yes, and the hardware cost is under £80.

## Hardware Stack

The core is an **RTL-SDR v3** dongle tuned to the 5.65–5.95 GHz band, fed by a cloverleaf antenna with roughly 3 dBi omnidirectional gain. Signal processing runs on a **Raspberry Pi Zero 2W**. An **ESP32** handles the lower-level RF scanning loop and reports channel energy via serial, offloading the Pi for FFT work in GNU Radio.

The cloverleaf antenna choice matters here. FPV video transmitters are designed to pair with cloverleaf or pagoda antennas — both are circularly polarised. Using a matched polarisation on the receive side gives you a 3 dB advantage over a linear antenna, which matters at range.

Full parts list:

- RTL-SDR v3 Blog (£35)
- 5.8 GHz cloverleaf receive antenna (£12)
- Raspberry Pi Zero 2W (£18)
- ESP32 DevKit (£6)
- USB OTG cable + power bank

## Detection Methodology

Analog FPV transmitters have a characteristic spectral signature: **broadband noise floor elevation** across the occupied 8 MHz channel, with sync burst periodicity at 50 or 60 Hz depending on the video standard.

The detector watches for power spikes exceeding a rolling baseline by **12 dB or more**, then validates by checking for the sync periodicity before logging the event. A single power spike could be interference — the periodicity check filters out most false positives.

### GNU Radio Pipeline

```
RTL-SDR Source → Low Pass Filter → FFT → Power Spectral Density
                                              ↓
                              Rolling baseline comparator
                                              ↓
                              Sync periodicity validator
                                              ↓
                                     Event logger → MQTT
```

The FFT block runs with 1024 points at 2 MSps, giving approximately 2 kHz frequency resolution. The rolling baseline uses a 10-second exponential moving average — long enough to settle on background noise, short enough to track slow environmental changes.

## DroneID Capture

DroneID beacon capture is a separate pipeline targeting DJI's proprietary 2.4 GHz telemetry bursts. These are short-duration OFDM frames (~1.6 ms wide) carrying operator GPS coordinates, drone GPS coordinates, serial number, and flight state.

Frames are detectable with the RTL-SDR in a 10 MHz capture window centred on the active channel. Demodulation requires a custom GNU Radio flowgraph — no off-the-shelf decoder handles the full framing. Once demodulated, the payload is straightforward:

- Operator GPS: fixed-point integers (lat/lon × 10⁷)
- Drone GPS: same format
- Serial: 16-byte ASCII field
- Flight state: 2-byte enum (ground, hover, flying, return-to-home)

No encryption. No authentication. The data broadcasts in the clear to comply with remote ID regulations.

## Results and Limitations

**Range**: ~300m line-of-sight with the cloverleaf antenna in open terrain. Drops significantly in urban environments with multipath.

**False positive rate**: <2% in testing with the sync periodicity validator enabled. Without it, interference from Wi-Fi and cordless phones creates significant noise on the 5.8 GHz band.

**Detection latency**: ~200ms from first transmission to logged event. The ESP32 scanning loop polls channels at 40ms intervals.

**Limitations**: The detector cannot distinguish between different drone models based on the analog video signal alone — that requires correlating the DroneID data when available. Frequency hopping transmitters (rare in FPV but used in some surveillance systems) would evade detection on a fixed-channel scan.

## Next Steps

The current prototype is operational. Planned improvements include:

- Direction-finding using a switched antenna array (4-element switched diversity)
- Integration with OpenStreetMap for live position plotting
- Detection of digital FPV systems (DJI O3, Walksnail) via their OFDM spectral signatures
- Weatherproof enclosure for field deployment

Code and schematics will be published once the hardware is stable. The GNU Radio flowgraph is already on GitHub.

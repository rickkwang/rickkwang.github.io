---
id: lamp-post
title: Automatic Adaptive Lamp Post
year: "2024"
tech: "ANALOGUE ELECTRONICS,EMBEDDED SYSTEMS (RP2040),PYTHON"
description: "Design and optimize an automatic lamp post circuit that detects the proximity of subjects and adjusts luminous intensity via PWM control."
github: "https://github.com/rickkwang"
figure_id: "FIG 1.2"
figure_label: "HYSTERESIS"
figure_src: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Operational_amplifier_hysteresis.svg"
---
# Automatic Adaptive Lamp Post

Energy efficiency in municipal infrastructure is a critical challenge. This project proposes a decentralized control system for street lighting that adapts to pedestrian and vehicular traffic in real-time.

## Hardware Architecture
The core controller is an **RP2040 microcontroller**, chosen for its dual-core ARM Cortex-M0+ architecture and flexible PIO (Programmable I/O) state machines.

### Sensing Layer
- **PIR Sensors:** Used for coarse motion detection.
- **Ultrasonic Rangefinders:** Implemented for precise distance measurement to modulate light intensity proportionally.

### Power Control
The lighting element is driven by a high-power MOSFET switched via Pulse Width Modulation (PWM). To prevent flickering and visual discomfort, the PWM frequency was set to 20kHz, well above the human flicker fusion threshold.

### Hysteresis Implementation
To prevent rapid toggling when a subject is at the detection threshold, a Schmitt Trigger mechanism was implemented in software, adding a hysteresis band to the sensor input logic.

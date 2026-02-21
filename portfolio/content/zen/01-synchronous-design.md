---
id: synchronous-design
title: The Elegance of Synchronous Design
date: OCTOBER 12, 2024
description: "Reflections on FPGA clocks and the cost of a nanosecond."
---
# The Elegance of Synchronous Design

Working on FPGA clocks reminded me that time is the most expensive resource in hardware. A single nanosecond of skew can invalidate a complex state machine.

There is something profoundly satisfying about seeing thousands of flip-flops switching in perfect unison, orchestrated by a crystal oscillator beating 50 million times per second. It is the closest humanity has come to manifesting pure logic as a physical force.

In software, time is often an abstraction - a "tick" or a "timestamp". In hardware, time is physical distance. It is the speed of light through copper traces. It is the setup and hold time of a transistor gate. To build a system is to understand these physical limits, not just the logical ones.

> "The simplicity is the ultimate sophistication." - Leonardo da Vinci

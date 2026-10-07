---
id: synchronous-design
title: The Elegance of Synchronous Design
date: OCTOBER 12, 2024
tag: "Engineering"
description: "On FPGA clocks, and what a single nanosecond costs."
---
# The Elegance of Synchronous Design

Building a clock on an FPGA taught me that time is the scarcest resource in hardware. A single nanosecond of skew is enough to unravel a carefully built state machine.

And yet there is a deep satisfaction in watching thousands of flip-flops change state in perfect unison, all keeping time to one crystal that beats fifty million times a second. It is as close as we have come to turning pure logic into a physical force.

In software, time is an abstraction — a tick, a timestamp, a number that only grows. In hardware, time is distance. It is the speed of light along a copper trace; it is the setup and hold window of a single gate. To build a system is to respect these physical limits, not only the logical ones.

Synchrony, in the end, is a kind of humility: every part agrees to wait for the same beat.

> "Simplicity is the ultimate sophistication." — often attributed to Leonardo da Vinci

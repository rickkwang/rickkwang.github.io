
import { NewsItem, Project, Publication, Experience, ZenPost } from './types';

export const PROFILE = {
  name: "Myrick Wang",
  title: "Electrical & Electronic Engineering / University of Bristol",
  bio: "Specializing in semiconductor physics, analog & digital circuit design, communication systems, signal processing, and power conversion technologies. Currently pursuing a BEng in Electrical and Electronic Engineering (Class of 2027).",
  email: "myrickwan9@gmail.com",
  phone: "+86 15160733691",
  location: "Bristol, UK / Xiamen, China",
  avatar: "/avatar.jpg",
  socials: {
    github: "github.com/rickkwang",
    linkedin: "linkedin.com/in/myrick-wang",
    scholar: "scholar.google.com/citations?user=PS_CX0AAAAAJ",
    twitter: "twitter.com/rickMygod",
    bluesky: "bsky.app/profile/myrwang.bsky.social"
  }
};

export const CV_MARKDOWN = `
## Education
### University of Bristol (2023 - 2027)
- **Degree:** BEng in Electrical and Electronic Engineering
- **GPA:** 1st Class Honours (Expected)
- **Key Coursework:** 
    - Circuit Analysis & Design
    - Digital Systems & Computer Architecture
    - Signals and Systems
    - Semiconductor Electronics
    - Engineering Mathematics

## Research & Projects
### Social Network Simulation Framework (2024)
- Developed a Python-based engine for modeling information entropy in scale-free networks.
- Analyzed network properties (clustering, paths) using NumPy and Matplotlib.

### Automatic Adaptive Lamp Post (2024)
- Developed an energy-efficient municipal lighting system using RP2040.
- Implemented real-time proximity sensing and PWM intensity control.

### FPGA Digital Clock (2023)
- Designed a synchronous digital clock system on a Cyclone IV FPGA.
- Achieved precise timing through frequency division of 50MHz oscillator.
- Implemented 7-segment display multiplexing in Verilog.

## Skills
- **Programming:** C/C++, Python (NumPy, SciPy), MATLAB, Verilog
- **Tools:** Altium Designer, Intel Quartus, Fusion 360, LTSpice
- **Languages:** Mandarin (Native), English (Fluent)
`;

export const NEWS: NewsItem[] = [
  { date: "Sep 2024", content: "Started Year 2 of BEng Electrical and Electronic Engineering at University of Bristol." },
  { date: "Jun 2024", content: "Completed 'Social Network Simulation' independent research project." },
  { date: "May 2024", content: "Presented 'Optimizing Graph Traversal' at the Undergraduate Research Symposium." },
  { date: "Sep 2023", content: "Joined the Automatic Lamp Post design group as Lead Hardware Engineer." }
];

export const FOCUS_AREAS = [
  "Signal Processing & Analysis",
  "Embedded Systems Design",
  "Machine Learning in Hardware",
  "Circuit Analysis & Simulation",
  "Network Topology Simulation"
];

export const PROFICIENCY = [
  {
    category: "PROGRAMMING",
    skills: [
      { name: "Python", desc: "Data analysis, simulation, and automation (NumPy, Matplotlib, argparse)" },
      { name: "C / C++", desc: "Embedded firmware, microcontroller programming (ARM/RISC-V)" },
      { name: "MATLAB", desc: "Signal processing, numerical computation, and control system design" }
    ]
  },
  {
    category: "ENGINEERING TOOLS",
    skills: [
      { name: "Arduino / RP2040", desc: "Hardware prototyping, sensor integration & control logic" },
      { name: "Intel Quartus / FPGA", desc: "Digital logic design, Verilog implementation & timing analysis" },
      { name: "Fusion 360", desc: "3D modeling, enclosure design & mechanical simulation" }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "social-network",
    title: "Social Network Simulation Framework",
    year: "2024",
    tech: ["PYTHON", "NUMPY", "MATPLOTLIB", "NETWORKX"],
    description: "This project implements a simulation engine to model information propagation across various network topologies. By simulating the 'Six Degrees of Separation' phenomenon.",
    content: `
# Social Network Simulation Framework

This project explores the mathematical properties of information propagation across scale-free and small-world networks. By leveraging Python's NetworkX and NumPy libraries, the engine simulates how data packets (representing rumors, diseases, or packets) move through a graph topology.

## Core Mechanics
The simulation utilizes a probabilistic model where nodes act as agents with defined susceptibility and transmission rates.

- **Small World Property:** Implemented the Watts-Strogatz algorithm to generate graphs that exhibit high clustering coefficients.
- **Scale-Free Networks:** Used Barabási-Albert preferential attachment to model realistic social graph distributions.

## Key Findings
The analysis confirmed that in scale-free networks, the presence of "hubs" (nodes with high degrees of connectivity) significantly reduces the average path length, thereby accelerating the rate of propagation. Removing these hubs causes network fragmentation far faster than random node removal.

## Visualization
The framework includes a Matplotlib-based real-time visualizer that colors nodes based on their state (Susceptible, Infected, Recovered), allowing for visual debugging of propagation algorithms.
    `,
    links: { github: "https://github.com/rickkwang" },
    figure: {
        id: "FIG 1.0",
        label: "TOPOLOGY",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Small-world-network-example.png/440px-Small-world-network-example.png"
    }
  },
  {
    id: "lamp-post",
    title: "Automatic Adaptive Lamp Post",
    year: "2024",
    tech: ["ANALOGUE ELECTRONICS", "EMBEDDED SYSTEMS (RP2040)", "PYTHON"],
    description: "Design and optimize an automatic lamp post circuit that detects the proximity of subjects and adjusts luminous intensity via PWM control.",
    content: `
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
    `,
    links: { github: "https://github.com/rickkwang" },
    figure: {
        id: "FIG 1.2",
        label: "HYSTERESIS",
        src: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Operational_amplifier_hysteresis.svg"
    }
  },
  {
    id: "fpga-clock",
    title: "FPGA Digital Clock",
    year: "2023",
    tech: ["VERILOG", "INTEL QUARTUS"],
    description: "Designed a synchronous digital clock system on a Cyclone IV FPGA. The system utilizes a cascade of frequency dividers.",
    content: `
# FPGA Synchronous Digital Clock

This project involves the design and implementation of a 24-hour digital clock on an Intel Cyclone IV FPGA board using Verilog HDL.

## Clock Domain Design
The board provides a 50MHz crystal oscillator. To achieve a 1Hz timebase for the seconds counter, a 26-bit frequency divider counter was implemented.

\`\`\`verilog
always @(posedge clk) begin
    if (counter == 24999999) begin
        counter <= 0;
        clk_1hz <= ~clk_1hz;
    end else begin
        counter <= counter + 1;
    end
end
\`\`\`

## Display Multiplexing
To drive the 4-digit 7-segment display with limited I/O pins, time-division multiplexing (TDM) was used. The active digit is switched at 1kHz, relying on the persistence of vision (POV) to create the illusion of a continuous display.

## Challenges
One significant challenge was **switch bounce** on the user input buttons (used for setting time). A debouncing circuit was modeled in Verilog using a shift register approach to filter out transient noise.
    `,
    links: { github: "https://github.com/rickkwang" },
    figure: {
        id: "FIG 1.3",
        label: "WAVEFORM",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Digital_Clock_Circuit.svg/500px-Digital_Clock_Circuit.svg.png"
    }
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: "pub-1",
    title: "Efficiency Optimization in PWM-driven Municipal Lighting",
    authors: "Wang, M., et al.",
    venue: "Undergraduate Engineering Journal",
    year: "2024",
    status: "In Preparation",
    content: `
# Efficiency Optimization in PWM-driven Municipal Lighting

**Abstract:**
This paper presents a novel approach to reducing energy consumption in urban lighting grids. By utilizing local sensing nodes rather than a centralized timer-based control, we demonstrate a potential energy saving of 40% in low-traffic residential zones.

## Introduction
Conventional street lighting operates on fixed schedules or ambient light sensors. This leads to significant energy waste during late-night hours when streets are empty.

## Methodology
We constructed a scale model utilizing high-efficiency LEDs driven by Pulse Width Modulation (PWM). The duty cycle of the PWM signal is functionally related to the distance of the nearest detected object, following an inverse-square law mapping to simulate natural illumination requirements.

## Results
Experimental data suggests that the idle power consumption can be reduced to <10% of peak power while maintaining safety standards for instant-on brightness when motion is detected.

## Conclusion
The proposed adaptive system offers a viable retrofit solution for existing lighting poles, requiring minimal infrastructure changes while offering substantial operational cost reductions.
    `
  }
];

export const ZEN_POSTS: ZenPost[] = [
  {
    id: "synchronous-design",
    title: "The Elegance of Synchronous Design",
    date: "OCTOBER 12, 2024",
    description: "Reflections on FPGA clocks and the cost of a nanosecond.",
    content: `
# The Elegance of Synchronous Design

Working on FPGA clocks reminded me that time is the most expensive resource in hardware. A single nanosecond of skew can invalidate a complex state machine. 

There is something profoundly satisfying about seeing thousands of flip-flops switching in perfect unison, orchestrated by a crystal oscillator beating 50 million times per second. It is the closest humanity has come to manifesting pure logic as a physical force.

In software, time is often an abstraction—a 'tick' or a 'timestamp'. In hardware, time is physical distance. It is the speed of light through copper traces. It is the setup and hold time of a transistor gate. To build a system is to understand these physical limits, not just the logical ones.

> "The simplicity is the ultimate sophistication." — Leonardo da Vinci
    `
  },
  {
    id: "analog-decay",
    title: "Analog Decay",
    date: "SEPTEMBER 05, 2024",
    description: "Why the imperfections of analog signals are more beautiful than digital precision.",
    content: `
# Analog Decay

We spend so much effort digitizing the world. ADC (Analog to Digital Converters) are the gatekeepers of modern processing. We crave the clean, discrete 0s and 1s.

But the real world is messy. It's a continuous sine wave, not a square wave. Noise isn't just an error; it's information about the environment (thermal noise, electromagnetic interference). 

In my recent work with operational amplifiers, I've come to appreciate the 'decay'. The way a capacitor discharges is a perfect exponential curve, defined by physics, not code. There is a truth in that curve that a digital approximation can only asymptotically approach, never truly touch.
    `
  }
];

export const EDUCATION = [
  {
    institution: "University of Bristol",
    degree: "BEng Electrical & Electronic Engineering",
    period: "2023 – 2027",
    details: "Year 2 Undergraduate. Studying Semiconductor Physics, Analog/Digital Circuits, and Embedded Systems."
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "University of Bristol",
    role: "Lead Hardware Engineer (Project Group)",
    period: "2023 – Present",
    description: [
      "Coordinated hardware specifications for autonomous sensor networks and robotic platforms.",
      "Optimized power consumption in embedded units for municipal infrastructure applications.",
      "Documented technical specifications and managed sensor integration workflows."
    ]
  }
];

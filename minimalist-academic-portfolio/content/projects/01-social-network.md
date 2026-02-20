---
id: social-network
title: Social Network Simulation Framework
year: "2024"
tech: "PYTHON,NUMPY,MATPLOTLIB,NETWORKX"
description: "This project implements a simulation engine to model information propagation across various network topologies. By simulating the 'Six Degrees of Separation' phenomenon."
github: "https://github.com/rickkwang"
figure_id: "FIG 1.0"
figure_label: "TOPOLOGY"
figure_src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Small-world-network-example.png/440px-Small-world-network-example.png"
---
# Social Network Simulation Framework

This project explores the mathematical properties of information propagation across scale-free and small-world networks. By leveraging Python's NetworkX and NumPy libraries, the engine simulates how data packets (representing rumors, diseases, or packets) move through a graph topology.

## Core Mechanics
The simulation utilizes a probabilistic model where nodes act as agents with defined susceptibility and transmission rates.

- **Small World Property:** Implemented the Watts-Strogatz algorithm to generate graphs that exhibit high clustering coefficients.
- **Scale-Free Networks:** Used Barabasi-Albert preferential attachment to model realistic social graph distributions.

## Key Findings
The analysis confirmed that in scale-free networks, the presence of "hubs" (nodes with high degrees of connectivity) significantly reduces the average path length, thereby accelerating the rate of propagation. Removing these hubs causes network fragmentation far faster than random node removal.

## Visualization
The framework includes a Matplotlib-based real-time visualizer that colors nodes based on their state (Susceptible, Infected, Recovered), allowing for visual debugging of propagation algorithms.

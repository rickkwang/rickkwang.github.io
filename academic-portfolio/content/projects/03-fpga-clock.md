---
id: fpga-clock
title: FPGA Digital Clock
year: "2023"
tech: "VERILOG,INTEL QUARTUS"
description: "Designed a synchronous digital clock system on a Cyclone IV FPGA. The system utilizes a cascade of frequency dividers."
github: "https://github.com/rickkwang"
figure_id: "FIG 1.3"
figure_label: "WAVEFORM"
figure_src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Digital_Clock_Circuit.svg/500px-Digital_Clock_Circuit.svg.png"
---
# FPGA Synchronous Digital Clock

This project involves the design and implementation of a 24-hour digital clock on an Intel Cyclone IV FPGA board using Verilog HDL.

## Clock Domain Design
The board provides a 50MHz crystal oscillator. To achieve a 1Hz timebase for the seconds counter, a 26-bit frequency divider counter was implemented.

```verilog
always @(posedge clk) begin
    if (counter == 24999999) begin
        counter <= 0;
        clk_1hz <= ~clk_1hz;
    end else begin
        counter <= counter + 1;
    end
end
```

## Display Multiplexing
To drive the 4-digit 7-segment display with limited I/O pins, time-division multiplexing (TDM) was used. The active digit is switched at 1kHz, relying on the persistence of vision (POV) to create the illusion of a continuous display.

## Challenges
One significant challenge was **switch bounce** on the user input buttons (used for setting time). A debouncing circuit was modeled in Verilog using a shift register approach to filter out transient noise.

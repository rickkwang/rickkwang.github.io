---
id: deskling
title: "Deskling"
year: "2026"
kind: "macOS App"
tagline: "A desktop pet that is also a local AI assistant — Clippy is back."
cover: ""
url: "https://github.com/rickkwang/Deskling/releases"
github: "https://github.com/rickkwang/Deskling"
---
# Deskling

*A little creature that lives on your desktop.* Deskling brings Clawd and the classic Microsoft Agent characters — Clippy, Merlin, Rover, Genie and friends — back to life as a lightweight desktop pet. You can talk to it, and every reply comes from a model running in your own Ollama, so nothing leaves your machine.

## Why I built it

Desktop assistants from the late '90s had something today's AI tools lack: personality and presence. They lived on your screen, reacted to what you did, and were a little bit charming. I wanted to see what that idea feels like with a modern local model behind it — and to make it genuinely useful while I work.

## Talking to it

- **Local AI chat** — Deskling uses a model you already have in Ollama (for example `qwen2.5:1.5b`); it never downloads models on its own
- **Manages Ollama for you** — when chat is turned on it starts Ollama if needed, and stops it again when chat goes off or the app quits; an Ollama you started yourself keeps running
- **Response styles** — Concise, Chatty, Detailed, Friendly, Professional, Playful and more, plus up to 500 characters of your own instructions
- **Speech** — replies can be read aloud

## Focus timer

A built-in Pomodoro cycle: a focus session, then a break that starts on its own, then it waits for you to begin the next round. A small pill above the pet's head counts down in the same style as its speech balloon — click it to pause or resume. When a phase ends, a sound plays and the character says a line written by the model (or a preset line when the model is unavailable).

## Working alongside Claude Code

Turn on *Work along* and the pet keeps you company while Claude Code works. It shows its thinking animation during a session, and its balloon surfaces only what needs you:

- Claude waiting for a permission or an answer
- a turn that stopped with an error
- a long turn (20 seconds or more) that has finished, with the first line of the reply

The most urgent notice is shown with a count of the rest, and each one clears once you've seen it. Under the hood, Deskling adds hooks to Claude Code's settings — backing up the file first — that post events to a local port; they stay silent when Deskling isn't running and are removed when you switch the feature off.

## Characters and style

- **Bundled characters** — Clawd (the default), Clippy, Links, Rover, Merlin, Genie, Peedy, Genius, Rocky, F1 and Office Logo
- **Make your own** — generate a sprite sheet with an image model (Deskling gives you the prompt), import it, name it and optionally describe who it is, so the character knows itself in conversation
- **Balloon themes** — Classic, Aqua, macOS, Windows 98, System 7 and Claude, following each platform's own guidelines and system colours

## How it's built

- **Electron shell** with transparent windows for the pet and its balloon, drag handling, menus and a tray icon
- **Data-only characters** — each character is a `character.json` plus a sprite sheet, validated against a shared schema
- **Animation runtime** — an AnimationPlayer that handles frames, branching and exit branches, and a CharacterRuntime that queues actions and moves between idle levels
- **Automated QA** — an end-to-end self-test (idle → listening → thinking → speaking → idle), an audit that checks every animation of every character, and unit tests for the runtime, assistant, timer, updater and Claude Code integration
- **Self-updating without a Developer ID** — CI builds and publishes each release; installed copies download the update, verify its SHA-512 and swap the app in place, sidestepping Squirrel.Mac's signing requirement

Started in September 2026 · latest release v0.3.14 · Apple Silicon Macs

---
id: noa
title: "Noa"
year: "2026"
kind: "Notes App"
tagline: "A private, local-first writing space for scattered, connected ideas."
cover: ""
url: ""
github: "https://github.com/rickkwang/Noa"
---
# Noa

*Notes on Anything.* Noa is a private, local-first notes space. No account, no server, no subscription — your writing lives only on your device. It runs in the browser and as a macOS desktop app.

> Simple enough to write in at any moment; structured enough to be worth keeping for years.

## Why I built it

Most note tools fall into one of two traps. Some are too heavy: you spend more time designing folders, templates and plugins than actually thinking. Others are too light: quick to open, quick to forget, and nothing accumulates. I wanted a third kind — a tool that gets out of the way while I write, but quietly builds a network of ideas I can come back to.

Privacy was a starting constraint, not a feature to bolt on later. Notes are personal, so Noa has no backend at all.

## Writing

- **Markdown-native editor** built on CodeMirror 6, with edit, preview and split views
- **Mermaid diagrams and KaTeX math** rendered inline
- **Image attachments** — paste or drag images straight into a note; they are stored as local blobs and referenced with `![[filename]]`
- **Focus mode** (`⌘ ⇧ F`) and a command palette (`⌘ K`) for a keyboard-first flow; everything autosaves

## Connecting ideas

- **Wiki links** — type `[[Another note]]` to link two notes
- **Backlinks** — a side panel shows every note that points to the one you're reading
- **Knowledge graph** — a force-directed graph of the whole vault, where node size reflects how connected a note is
- **Tags** — any `#tag` in the text is collected into a tag browser for filtering

## Daily notes and tasks

`⌘ ⇧ K` opens today's note, created from a template you can customise. Any `- [ ] todo` written in any note is gathered into a single Tasks panel; ticking it there writes the change back into the original note.

## Your data, your way

Local-first only works if leaving is easy, so Noa puts a lot of care into getting data in and out:

- **Import from Obsidian** — bring in a whole vault in one go, keeping frontmatter tags and links
- **Folder sync** — mirror an existing folder of Markdown files; edits in Noa are written back to disk, and external changes are picked up on focus and every 60 seconds
- **Three export formats** — a full JSON snapshot for backup, a Markdown + attachments ZIP for moving to other tools, and static HTML for reading
- **Automatic backups** — pick a folder and Noa snapshots your vault at most once a day; a health indicator turns to a warning after 7 days without a backup and to risk after 14

## How it's built

- **Stack:** React + Vite, CodeMirror 6, IndexedDB via localForage, react-force-graph-2d, and Electron for the macOS build
- **Quality gates:** TypeScript + ESLint, Vitest unit tests, Playwright smoke tests, a bundle-size budget enforced at build time, and dependency-cruiser rules that keep the module structure honest
- **Desktop:** an Apple Silicon build distributed through GitHub Releases, with automatic update checks

## Where it's going

Noa is free and open source under AGPL-3.0. If it ever needs to sustain itself, the plan is a one-time purchase or offline add-ons — never charging for cloud sync or for privacy.

Started in March 2026 · ~350 commits · latest release v1.0.26

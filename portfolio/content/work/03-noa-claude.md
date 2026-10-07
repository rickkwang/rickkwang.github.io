---
id: noa-claude
title: "Noa Claude"
year: "2026"
kind: "CLI Agent"
tagline: "A local-first coding agent that remembers where you left off."
cover: ""
url: ""
github: "https://github.com/rickkwang/Noa-Claude"
---
# Noa Claude

A local-first coding agent for long-running software work. Noa focuses on what matters once an agent becomes part of your daily routine: continuity across sessions, freedom to pick the model, and privacy defaults that work without configuration.

## Why I built it

Real engineering work rarely fits into one sitting or one line of thought. I wanted an agent that remembers where I left off, lets me branch off to test an idea without losing the main thread, and doesn't lock me into a single model provider.

## Continuity

- **`/fork`** — split the current conversation into a resumable branch
- **Background sessions** — `/background` hands a conversation to a background agent and frees the terminal; a dedicated view lists running agents, and they can be attached to, replied to, stopped or restarted from the shell
- **`/rewind`** — restore both the code and the conversation to an earlier checkpoint, not just the transcript
- **`/goal`** — keep a long-running objective alive across turns with an evaluator loop, turn and token limits, and an optional shell command to verify success
- **`/summary` and `/share`** — produce structured session summaries and shareable snapshots

## Any model, any provider

Noa supports Anthropic, OpenAI-compatible endpoints, AWS Bedrock, Google Vertex and Microsoft Foundry. Saved provider profiles make it easy to switch to services such as Kimi, MiniMax or DeepSeek, and each profile can declare context windows, output limits, effort levels and which model each tier maps to. Sub-agents can be routed to different models from the main thread.

## Cost and context awareness

- **Compact prompts for newer models** — models that already know most of what a long system prompt explains get a head roughly 90% shorter
- **Prompt-cache tooling** — `/cache-probe` measures cache hit rates, and an opt-in 1-hour cache TTL comes with a documented break-even analysis of when it actually saves money
- **MCP result compaction** — tool results from MCP servers can always be compacted, cutting token use in tool-heavy sessions
- **Usage views** — `/usage`, `/stats` and `/cost` show tokens and spend over time

## Reliability and safety

- **One-command install and self-update** — each new build is smoke-tested after install, and the previous version is restored if it fails
- **`/doctor`** — an agentic health check that finds unused plugins, bloated memory files, slow hooks and permission issues, and proposes fixes behind a confirmation step
- **Auto-fix hook** — run configured lint and test commands automatically after file edits
- **SSRF protection** — outbound URLs are checked against private IPv4/IPv6 ranges
- **Privacy by default** — remote feature-flag services are disabled, and feedback reports are drafted locally and never sent on their own

## How it's built

TypeScript on Bun, with a React-based terminal UI. A query engine drives the agent loop, which calls into tools (files, shell, web, tasks, MCP), services (API, OAuth, LSP, auto-fix) and shared state. It builds to a single JS bundle or a standalone binary.

Started in April 2026 · ~870 commits · latest release v1.18.0

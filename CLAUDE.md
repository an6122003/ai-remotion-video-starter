# Claude Code Instructions

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This project uses [AGENTS.md](AGENTS.md) as the main source of truth for AI coding instructions.

## Primary Reference

Before creating or editing videos, read [AGENTS.md](AGENTS.md).

When a user asks for a new video:

1. Create the video under `src/projects/`.
2. Register the composition in `src/Root.tsx`.
3. Keep the project runnable with `npm run dev`.
4. Tell the user the composition ID, preview command, and render command.

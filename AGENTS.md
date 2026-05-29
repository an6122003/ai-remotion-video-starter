# AI Agent Instructions

This is a Remotion video starter project, not the full Remotion monorepo.

Follow these instructions when using Codex, Claude Code, Cursor, Gemini CLI, or another AI coding agent to create or edit videos in this repository.

## Project Overview

- This project creates videos with Remotion, React, and TypeScript.
- Existing videos are registered in `src/Root.tsx`.
- Video projects live in `src/projects/`.
- Shared styling helpers live in `src/design-system/`.
- Optional local sound-effect helpers live in `src/local-sfx.ts`.

## Setup Commands

Use npm for this starter project.

```bash
# Install dependencies
npm install

# Start Remotion Studio
npm run dev

# Check TypeScript and linting
npm run lint

# Bundle the Remotion project
npm run build

# Render a specific composition
npx remotion render <composition-id> out/video.mp4

# List available compositions
npx remotion compositions
```

Do not use the Remotion monorepo commands such as `bunx turbo run make` in this project.

## Creating a New Video

When asked to create a new video:

1. Create a new folder under `src/projects/<project-name>/`.
2. Add the main composition component in that folder.
3. Add an `index.ts` file that exports the composition component.
4. Add a `PROJECT.md` file with a short description, target audience, format, and composition ID.
5. Register the composition in `src/Root.tsx`.
6. Use the existing design system from `src/design-system/` when useful.
7. Keep existing videos working unless the user explicitly asks to change them.
8. After finishing, tell the user:
   - the composition ID
   - the preview command
   - the render command

## Recommended Composition Defaults

For vertical social videos:

- Width: `1080`
- Height: `1920`
- FPS: `30`
- Duration: usually `210` to `450` frames
- Good for TikTok, YouTube Shorts, Instagram Reels

For landscape videos:

- Width: `1280`
- Height: `720`
- FPS: `30`
- Duration: depends on the topic
- Good for YouTube, courses, presentations

## Remotion Authoring Rules

- Import `Audio` from `remotion`, not from `@remotion/sfx`.
- Named sound effects, if used, come from `@remotion/sfx`.
- Do not add `durationInFrames` to `Audio` sequences.
- Avoid CSS `filter: blur()` on animated elements. Use gradients, shadows, opacity, scale, or transforms instead.
- For full-composition animations, use `durationInFrames - 1` from `useVideoConfig()` as the upper interpolation input bound.
- Do not scatter text with many unrelated absolute positions. Prefer a single flex container with grouped content and proportional spacing.
- For standalone short-form text, use larger typography than normal UI text.
- Keep text readable on a phone screen.
- Prefer clear visual storytelling over decorative complexity.

## Code Style

- Use TypeScript and React functional components.
- Keep each video project self-contained inside its folder.
- Reuse existing helpers before creating new styling systems.
- Keep edits focused on the requested video.
- Do not delete generated examples unless the user asks.
- Avoid adding new dependencies unless they clearly improve the result.

## Verification

Before saying the work is finished:

1. Run `npm run lint` if the change touched TypeScript.
2. Run `npm run dev` when the user needs to preview the video locally.
3. If a render is requested, run:

```bash
npx remotion render <composition-id> out/video.mp4
```

If a command fails, explain what failed and what the user can do next.

## Prompt Handling

Even though this file contains project rules, users may repeat important requirements in their prompt. Treat repeated prompt details as the task-specific priority for that request.

# Prompt Examples

Copy one of these prompts into Codex, Claude Code, Cursor, Gemini CLI, or another AI coding tool.

## English

### Create A New Vertical Short

```text
Read AGENTS.md first.

Create a new vertical short video about [YOUR TOPIC].

Audience: [WHO WILL WATCH THIS]
Style: [FRIENDLY / PREMIUM TECH / EDUCATIONAL / FUN / MINIMAL]
Length: around 9 to 15 seconds
Format: 1080x1920, 30fps

Use the existing project structure and design system.
Add the new video under src/projects.
Register it in src/Root.tsx.
When finished, tell me the composition ID, preview command, and render command.
```

### Example: Business Explainer

```text
Read AGENTS.md first.

Create a new vertical short video about how AI helps small businesses save time.

Audience: non-technical small business owners
Style: friendly, modern, clear, optimistic
Length: around 12 seconds
Format: 1080x1920, 30fps

Use bold typography, simple animated scenes, and clear visual storytelling.
Add the new video under src/projects.
Register it in src/Root.tsx.
When finished, tell me the composition ID, preview command, and render command.
```

### Example: Tech Explainer

```text
Read AGENTS.md first.

Create a new vertical short video explaining how passkeys are safer than passwords.

Audience: normal phone users, not engineers
Style: premium tech, clean, high contrast, easy to understand
Length: around 15 seconds
Format: 1080x1920, 30fps

Use simple diagrams and short text. Avoid long paragraphs.
Add the new video under src/projects.
Register it in src/Root.tsx.
When finished, tell me the composition ID, preview command, and render command.
```

### Improve An Existing Video

```text
Read AGENTS.md first.

Improve the existing composition [COMPOSITION_ID].

Goal: make it easier to understand for non-technical viewers.

Please:
- keep the same video format and duration
- improve text clarity
- improve visual hierarchy
- keep the existing project structure
- do not delete other videos

When finished, tell me what changed and how to preview it.
```

### Render A Video

```text
Read AGENTS.md first.

Render the composition [COMPOSITION_ID] to out/video.mp4.
If the render fails, explain the error in simple language and suggest the next step.
```

## Tiếng Việt

### Tạo Video Dọc Mới

```text
Read AGENTS.md first.

Create a new vertical short video about [CHỦ ĐỀ CỦA BẠN].

Audience: [AI SẼ XEM VIDEO NÀY]
Style: [THÂN THIỆN / CÔNG NGHỆ CAO CẤP / GIÁO DỤC / VUI / TỐI GIẢN]
Length: around 9 to 15 seconds
Format: 1080x1920, 30fps

Use the existing project structure and design system.
Add the new video under src/projects.
Register it in src/Root.tsx.
When finished, tell me the composition ID, preview command, and render command.
```

### Ví Dụ: Video Cho Chủ Shop

```text
Read AGENTS.md first.

Create a new vertical short video about how AI helps small businesses save time.

Audience: Vietnamese small business owners who are not technical
Style: friendly, modern, clear, optimistic
Length: around 12 seconds
Format: 1080x1920, 30fps

Use bold typography, simple animated scenes, and clear visual storytelling.
Add the new video under src/projects.
Register it in src/Root.tsx.
When finished, tell me the composition ID, preview command, and render command.
```

### Ví Dụ: Giải Thích Công Nghệ

```text
Read AGENTS.md first.

Create a new vertical short video explaining why passkeys are safer than passwords.

Audience: normal Vietnamese phone users, not engineers
Style: premium tech, clean, high contrast, easy to understand
Length: around 15 seconds
Format: 1080x1920, 30fps

Use simple diagrams and short text. Avoid long paragraphs.
Add the new video under src/projects.
Register it in src/Root.tsx.
When finished, tell me the composition ID, preview command, and render command.
```

### Sửa Video Có Sẵn

```text
Read AGENTS.md first.

Improve the existing composition [COMPOSITION_ID].

Goal: make it easier to understand for non-technical Vietnamese viewers.

Please:
- keep the same video format and duration
- improve text clarity
- improve visual hierarchy
- keep the existing project structure
- do not delete other videos

When finished, tell me what changed and how to preview it.
```

### Xuất Video

```text
Read AGENTS.md first.

Render the composition [COMPOSITION_ID] to out/video.mp4.
If the render fails, explain the error in simple language and suggest the next step.
```

## Notes

You do not need to write perfect prompts.

The most important details are:

- topic
- audience
- style
- vertical or landscape
- approximate length
- what result you want at the end

# 0505 — Xiaomi Mimo V2.5 Pro

## About This Video
Vietnamese tech news animations covering Xiaomi's Mimo V2.5 Pro AI model
announcements and benchmark results. Each sequence is a self-contained
animation for a single talking point.

## Target Audience
Vietnamese tech community — AI/ML enthusiasts, Xiaomi followers.

## Visual Identity
- **Mood**: Bold tech, confident, data-driven — Xiaomi orange energy
- **Background**: Deep warm black (#0C0A09) with subtle orange glow spots
- **Card Style**: Glassmorphism with orange-tinted borders
- **Accents**: Xiaomi orange (#F97316) primary, lighter orange (#FB923C) secondary
- **Typography**: SF Pro / system stack, gradient text (orange→white) for titles

## Color Palette
| Role | Color | Hex |
|------|-------|-----|
| Primary | Xiaomi Orange | #F97316 |
| Secondary | Light Orange | #FB923C |
| Positive | Emerald | #10b981 |
| Warning | Amber | #fbbf24 |
| Negative | Red | #ef4444 |
| Highlight | Light Orange | #FB923C |
| Text Primary | Warm White | #fafaf9 |
| Text Secondary | Stone-400 | #a8a29e |
| Text Muted | Stone-500 | #78716c |
| Background | Stone-950 | #0C0A09 |
| Background Alt | Stone-900 | #1c1917 |
| Surface | Dark frosted | rgba(28,25,23,0.85) |

## Layout Rules
- Shorts format only (1080×1920)
- Always use `useLayout()` for sizing — never hardcode pixel values
- Always use `useTypography()` for font sizes
- Title/brand name: prominent center placement
- Text blocks: centered, max width 85% of content area
- Keep ~25% vertical space free as breathing room

## Animation Style
- **Entrance**: `EASING.smooth` (ease-out-expo) for text blocks
- **Title**: `EASING.bounce` for brand name pop-in
- **Stagger**: `DURATION.stagger` between sequential text reveals
- **Slide distance**: `SLIDE.normal` for text, `SLIDE.dramatic` for title
- **Energy**: Bold and confident, not too fast

## Sound Effects
- Title entrance: `whoosh` (vol 0.6)
- Text block reveals: `pageTurn` (vol 0.4)
- Keyword highlight: `ding` (vol 0.35)
- Final emphasis: `whoosh` (vol 0.5)

## Constraints
- Font never below `caption` size from typography scale
- All Vietnamese text — use proper diacritics
- Max 3 text blocks visible simultaneously
- Text blocks must not exceed 85% of content area width

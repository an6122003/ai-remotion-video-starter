# M5 MacBook Comparison — Project Spec

## About This Video
Comparing GPU core counts across M5 and M4 MacBook Air models. The key message:
the base 13" M5 MacBook Air (256GB) ships with only 8 GPU cores — 2 fewer than
the 15" M5 and the 512GB M4 13". Viewers should know this before buying.

## Target Audience
Vietnamese tech community — MacBook buyers evaluating which model gives them
full GPU performance.

## Visual Identity
- **Mood**: Premium tech, dark & sleek, Apple-inspired
- **Background**: Near-black (#020617) with subtle indigo grid pattern + slow rotating gradient
- **Card Style**: Glassmorphism (frosted blur, 0.8 opacity dark surface, colored borders)
- **Accents**: Indigo (#6366f1) primary, emerald (#10b981) for "full GPU", orange (#f97316) for "deficient"
- **Typography**: SF Pro / system stack, gradient text for titles (white→slate)

## Color Palette
| Role | Color | Hex |
|------|-------|-----|
| Primary | Indigo | #6366f1 |
| Secondary | Emerald | #10b981 |
| Positive | Emerald | #10b981 |
| Warning | Orange | #f97316 |
| Negative | Red | #ef4444 |
| Highlight | Amber | #fbbf24 |
| Text Primary | Slate-50 | #f8fafc |
| Text Secondary | Slate-400 | #94a3b8 |
| Text Muted | Slate-500 | #64748b |
| Background | Slate-950 | #020617 |
| Background Alt | Slate-900 | #0f172a |
| Surface | Dark frosted | rgba(15,23,42,0.8) |

## Layout Rules
- Always use `useLayout()` for sizing — never hardcode pixel values
- Always use `useTypography()` for font sizes
- Title block: top of safe zone, horizontally centered
- Cards: centered in content area vertically, full width minus safe zone padding
- Max 3 model cards visible at once
- Keep ~20% vertical space free as breathing room between sections
- Cards should never overlap — use flexbox column with gaps from `useSpacing()`

## Animation Style
- **Entrance**: `EASING.smooth` (ease-out-expo) for cards and text
- **Badges**: `EASING.bounce` (overshoot) for ✓/⚠ badge pop-ins
- **Stagger**: `DURATION.stagger` (0.12s) between sequential core squares
- **Slide distance**: `SLIDE.dramatic` for card entrances, `SLIDE.subtle` for text
- **Energy**: Smooth and elegant, not too fast

## Sound Effects
- Card entrance: `whoosh` (vol 0.6)
- Deficient card entrance: `uiSwitch` (vol 0.7) — draws extra attention
- Badge pop-in: `ding` (vol 0.4)
- Conclusion reveal: `pageTurn` (vol 0.5)

## Constraints
- No more than 3 model cards on screen simultaneously
- Font never below `caption` size from typography scale
- Cards must not exceed 90% of content area width
- Core squares must be equal-sized, max 10 per row
- All Vietnamese text — use proper diacritics

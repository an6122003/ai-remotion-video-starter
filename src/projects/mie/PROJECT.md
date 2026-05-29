# Scene 2 — Memory Integrity Enforcement

## About This Video
Vietnamese tech explainer scene describing Apple Memory Integrity Enforcement
as hardware-level memory protection. The scene uses a security-vault metaphor:
memory is a guarded grid, and every process must pass a hardware tag check
before touching protected data.

## Target Audience
Vietnamese Apple and cybersecurity viewers who need an intuitive mental model
for hardware-backed memory access checks.

## Visual Identity
- **Mood**: Premium Apple security, calm but high-stakes
- **Background**: Deep near-black with subtle blue/cyan glow fields
- **Main metaphor**: Apple chip opening into a glowing memory vault grid
- **Cards and cells**: Frosted glass, thin white outlines, cyan scan beams
- **Accents**: Neon cyan for allowed checks, red for blocked attempts
- **Typography**: SF Pro / system stack, clean and restrained

## Color Palette
| Role | Color | Hex |
|------|-------|-----|
| Primary | Security Cyan | #22d3ee |
| Secondary | Electric Blue | #60a5fa |
| Positive | Emerald | #34d399 |
| Warning | Amber | #fbbf24 |
| Negative | Red | #f43f5e |
| Highlight | Pale Cyan | #a5f3fc |
| Text Primary | Cool White | #f8fafc |
| Text Secondary | Blue Gray | #cbd5e1 |
| Text Muted | Slate | #64748b |
| Background | Near Black | #020617 |
| Background Alt | Blue Black | #07111f |

## Layout Rules
- Shorts format, 1080x1920
- Use design-system viewport helpers for dimensions and typography
- Keep text grouped, centered, and readable
- Memory grid is the primary first-viewport signal
- No more than two text overlays visible at once

## Animation Style
- Smooth Apple-like motion, no aggressive camera shakes
- Chip reveal flows into a vault/grid map
- Process packets move with clear intent
- Scanner line is thin, bright, and repeatable
- Blocked cells flash red briefly, then relock

## Sound Effects
- Chip entrance: soft `whoosh`
- Chip opening / vault reveal: subtle `pageTurn`
- Scanner sweep: quick `whip`
- Allowed tag match: light `ding`
- Wrong tag blocks: restrained `uiSwitch` / error hit

## On-Screen Text
- MEMORY INTEGRITY ENFORCEMENT
- Hardware-level memory checking
- MIE kiểm tra việc truy cập bộ nhớ ở cấp độ phần cứng.
- Wrong tag = blocked.

# Scene 3 — Exploit Chain

## About This Video
Vietnamese tech explainer scene describing how two separate vulnerabilities and
abstract techniques can be connected into a conceptual exploit path. The scene
intentionally avoids exploit code, commands, or operational details.

## Visual Metaphor
- Two isolated red vulnerability nodes pulse apart from each other
- Mythos/researcher energy draws a circuit-like connection through technique nodes
- The connected chain becomes a narrow abstract path through a protected wall

## Animation Flow
- Shot 1: Bug 1 and Bug 2 float separately with limited effect
- Shot 2: A blue-white circuit line links Bug 1, Technique, Memory Confusion, and Bug 2
- Shot 3: The chain routes toward a protected system layer and opens a narrow access path

## On-Screen Text
- Bug 1
- Bug 2
- One bug is noise.
- Individually: limited impact
- But chained together...
- ...they become an exploit chain.
- Chained: privilege escalation path

# Scene 4 — Privilege Escalation

## About This Video
Vietnamese tech explainer scene showing a low-permission local user becoming a
root user through privilege escalation. The metaphor is a locked vertical
permission tower, not a technical walkthrough.

## Visual Metaphor
- A tall tower of permission floors: Normal User, App Level, System Services, Kernel, Root
- The user starts at the bottom with limited permissions
- Upper floors are visibly locked
- The exploit chain becomes a glowing key-like energy line into the elevator controls
- The user elevator jumps upward and reaches Root

## Animation Flow
- Shot 1: Normal User floor lights up at the bottom, Root is locked at the top
- Shot 2: The user attempts to move upward and gets Access denied
- Shot 3: Exploit chain energy activates the control panel and glitches the lock
- Shot 4: The elevator shoots upward; Root lights up and the user gains an admin/crown badge

## On-Screen Text
- Starts as: Normal User
- Protected levels above
- Exploit chain activates
- Ends as: Root
- Normal User -> Root

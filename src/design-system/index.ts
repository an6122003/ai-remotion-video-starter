// ── Design System ──
// Global utilities for layout, typography, spacing, animation, and theming.
// Import from here in all composition components.

// Layout
export { useLayout, detectFormat, vw, vh, vmin, safeZone, contentArea, safeContainerStyle } from './layout';
export type { VideoFormat, SafeZone, ContentArea, Layout } from './layout';

// Typography
export { useTypography, fontSize, FONT_SCALE } from './typography';
export type { FontStep } from './typography';

// Spacing
export { useSpacing, space } from './spacing';
export type { Spacing } from './spacing';

// Animations
export { EASING, DURATION, SLIDE, CLAMP, staggerDelay } from './animations';

// Backgrounds
export { animatedGradientBg, glowSpots, gridPatternStyle } from './backgrounds';

// Glass / Cards
export { glassCard, cardTopGlow } from './glass';

// Types
export type { ProjectTheme } from './types';

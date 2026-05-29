import { Easing } from 'remotion';

// ── Easing curves ──

export const EASING = {
  /** Smooth deceleration — default for most entrances */
  smooth: Easing.bezier(0.16, 1, 0.3, 1),
  /** Overshoot bounce — badges, counters, small reveals */
  bounce: Easing.bezier(0.34, 1.56, 0.64, 1),
  /** Material Design standard ease — general purpose */
  gentle: Easing.bezier(0.4, 0, 0.2, 1),
  /** Symmetric ease-in-out — looping, breathing animations */
  sharp: Easing.bezier(0.4, 0, 0.6, 1),
  /** Quick snap — UI switches, toggles */
  snap: Easing.bezier(0.68, -0.55, 0.27, 1.55),
} as const;

// ── Duration presets (in seconds) ──
// Multiply by fps to get frame count: DURATION.normal * fps

export const DURATION = {
  /** Quick micro-interactions — 0.25s */
  fast: 0.25,
  /** Standard transitions — 0.5s */
  normal: 0.5,
  /** Deliberate reveals — 0.8s */
  slow: 0.8,
  /** Very dramatic — 1.2s */
  dramatic: 1.2,
  /** Delay between sequential items — 0.12s */
  stagger: 0.12,
} as const;

// ── Slide distances (in vh%) ──
// Use with vh() to get pixel values: vh(SLIDE.normal, height)

export const SLIDE = {
  /** Barely perceptible movement — 1vh */
  subtle: 1,
  /** Standard slide distance — 3vh */
  normal: 3,
  /** Big dramatic entrance — 6vh */
  dramatic: 6,
} as const;

/**
 * Compute stagger delay in frames for item at given index.
 *
 * ```ts
 * const delay = staggerDelay(2, 30); // 3rd item, 30fps → ~7 frames
 * ```
 */
export function staggerDelay(index: number, fps: number): number {
  return Math.round(index * DURATION.stagger * fps);
}

/**
 * Helper to create clamped interpolate extrapolation config.
 * Saves repeating the same options object everywhere.
 */
export const CLAMP = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

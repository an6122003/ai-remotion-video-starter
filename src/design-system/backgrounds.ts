import type React from 'react';

/**
 * Generate an animated gradient background string.
 *
 * @param angle - Current rotation angle (animate with interpolate)
 * @param colors - Array of [color, stop%] pairs for the linear gradient
 *
 * ```tsx
 * const bg = animatedGradientBg(gradientAngle, [
 *   ['#020617', '0%'],
 *   ['#0f172a', '50%'],
 *   ['#020617', '100%'],
 * ]);
 * ```
 */
export function animatedGradientBg(
  angle: number,
  colors: Array<[color: string, stop: string]>,
): string {
  const stops = colors.map(([c, s]) => `${c} ${s}`).join(', ');
  return `linear-gradient(${angle}deg, ${stops})`;
}

/**
 * Generate radial glow spots as a CSS background string.
 * Layer this on top of a base gradient for depth.
 *
 * ```tsx
 * const bg = `${glowSpots(spots)}, ${baseBg}`;
 * ```
 */
export function glowSpots(
  spots: Array<{ x: string; y: string; color: string; opacity: number }>,
): string {
  return spots
    .map(
      (s) =>
        `radial-gradient(ellipse at ${s.x} ${s.y}, ${withAlpha(s.color, s.opacity)} 0%, transparent 50%)`,
    )
    .join(', ');
}

/**
 * Returns a CSS properties object for a subtle grid pattern overlay.
 *
 * ```tsx
 * <div style={gridPatternStyle('#6366f1', 48, 0.03)} />
 * ```
 */
export function gridPatternStyle(
  color: string,
  size: number,
  lineOpacity: number,
): React.CSSProperties {
  const lineColor = withAlpha(color, lineOpacity);
  return {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(${lineColor} 1px, transparent 1px),
      linear-gradient(90deg, ${lineColor} 1px, transparent 1px)
    `,
    backgroundSize: `${size}px ${size}px`,
    pointerEvents: 'none',
  };
}

// ── Helpers ──

/**
 * Apply alpha to a hex color → rgba string.
 */
function withAlpha(hex: string, opacity: number): string {
  // Handle rgba() pass-through
  if (hex.startsWith('rgba') || hex.startsWith('rgb')) return hex;

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${opacity})`;
}

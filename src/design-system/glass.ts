import type React from 'react';

type GlassCardOptions = {
  /** Background color with alpha. Default: 'rgba(15, 23, 42, 0.8)' */
  bg?: string;
  /** Backdrop blur in px. Default: 24 */
  blur?: number;
  /** Border radius in px (use spacing.radiusMd). Default: 24 */
  borderRadius?: number;
  /** Border color. Default: 'rgba(255,255,255,0.06)' */
  borderColor?: string;
  /** Border width in px. Default: 2 */
  borderWidth?: number;
};

/**
 * Returns a CSSProperties object for a glassmorphism card.
 * Combine with your own padding, gap, etc.
 *
 * ```tsx
 * <div style={{
 *   ...glassCard({ borderColor: theme.colors.primary + '30' }),
 *   padding: sp.lg,
 * }}>
 * ```
 */
export function glassCard(opts: GlassCardOptions = {}): React.CSSProperties {
  const {
    bg = 'rgba(15, 23, 42, 0.8)',
    blur = 24,
    borderRadius = 24,
    borderColor = 'rgba(255,255,255,0.06)',
    borderWidth = 2,
  } = opts;

  return {
    background: bg,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    borderRadius,
    border: `${borderWidth}px solid ${borderColor}`,
    position: 'relative',
    overflow: 'hidden',
  };
}

type GlowOptions = {
  /** Glow color. */
  color: string;
  /** Glow width in px. Default: 500 */
  width?: number;
  /** Glow height in px. Default: 120 */
  height?: number;
  /** Glow opacity. Default: 0.18 */
  opacity?: number;
};

/**
 * Returns a CSSProperties object for a top-edge glow effect inside a card.
 * Place this as a child `<div>` at the top of the card.
 *
 * ```tsx
 * <div style={cardTopGlow({ color: '#6366f1' })} />
 * ```
 */
export function cardTopGlow(opts: GlowOptions): React.CSSProperties {
  const { color, width = 500, height = 120, opacity = 0.18 } = opts;
  return {
    position: 'absolute',
    top: -(height / 2),
    left: '50%',
    transform: 'translateX(-50%)',
    width,
    height,
    background: `radial-gradient(ellipse, rgba(${hexToRgb(color)},${opacity}) 0%, transparent 70%)`,
    pointerEvents: 'none',
  };
}

function hexToRgb(hex: string): string {
  if (!hex.startsWith('#')) return hex;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

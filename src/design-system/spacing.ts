import { useVideoConfig } from 'remotion';

// ── Spacing system ──
// Based on a 4px grid at 1080px min dimension.
// Scales proportionally with the smaller dimension (vmin).

const BASE_UNIT_PX = 4;
const REFERENCE_SIZE = 1080;

/**
 * Compute a spacing value from a multiplier.
 * `space(1)` = 4px equivalent at 1080, `space(4)` = 16px equivalent.
 *
 * ```ts
 * space(4, 1080) // → 16
 * space(4, 1920) // → 28
 * ```
 */
export function space(multiplier: number, minDimension: number): number {
  return Math.round((BASE_UNIT_PX * multiplier * minDimension) / REFERENCE_SIZE);
}

export type Spacing = {
  /** 4px equiv — hairline gaps */
  xs: number;
  /** 8px equiv — tight gaps */
  sm: number;
  /** 16px equiv — standard gaps */
  md: number;
  /** 24px equiv — section gaps */
  lg: number;
  /** 32px equiv — large section gaps */
  xl: number;
  /** 48px equiv — major section padding */
  xxl: number;
  /** Border radius — small (buttons, badges) */
  radiusSm: number;
  /** Border radius — medium (cards) */
  radiusMd: number;
  /** Border radius — large (panels) */
  radiusLg: number;
  /** Compute any spacing value: space(n) */
  space: (n: number) => number;
};

/**
 * All spacing tokens resolved for the current composition.
 *
 * ```tsx
 * const sp = useSpacing();
 * <div style={{ padding: sp.lg, gap: sp.md, borderRadius: sp.radiusMd }}>
 * ```
 */
export function useSpacing(): Spacing {
  const { width, height } = useVideoConfig();
  const min = Math.min(width, height);

  return {
    xs:       space(1, min),
    sm:       space(2, min),
    md:       space(4, min),
    lg:       space(6, min),
    xl:       space(8, min),
    xxl:      space(12, min),
    radiusSm: space(3, min),
    radiusMd: space(6, min),
    radiusLg: space(8, min),
    space:    (n: number) => space(n, min),
  };
}

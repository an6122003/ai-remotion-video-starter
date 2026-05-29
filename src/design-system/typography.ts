import { useVideoConfig } from 'remotion';
import { detectFormat, vh, type VideoFormat } from './layout';

// ── Font scale ──
// Each step is defined as a percentage of viewport height.
// This ensures text is proportional to the composition regardless of resolution.
// Shorts (tall) use smaller vh% since height is large; landscape uses larger vh%.

export const FONT_SCALE = {
  /** Biggest text on screen — hero numbers, key figures */
  hero:     { shorts: 3.8, landscape: 5.0, square: 4.2 },
  /** Main title — composition heading */
  title:    { shorts: 3.0, landscape: 3.8, square: 3.4 },
  /** Section headings, card names */
  heading:  { shorts: 2.2, landscape: 3.0, square: 2.6 },
  /** Supporting text under titles */
  subtitle: { shorts: 1.6, landscape: 2.2, square: 1.9 },
  /** Regular text — descriptions, explanations */
  body:     { shorts: 1.5, landscape: 2.0, square: 1.7 },
  /** Small labels — tags, badges, categories */
  label:    { shorts: 1.3, landscape: 1.5, square: 1.4 },
  /** Smallest readable text — footnotes, fine print */
  caption:  { shorts: 1.0, landscape: 1.3, square: 1.1 },
} as const;

export type FontStep = keyof typeof FONT_SCALE;

/**
 * Resolve a font scale step to pixel size for the given format/height.
 *
 * ```ts
 * const px = fontSize('title', 1920, 'shorts'); // → ~58px
 * ```
 */
export function fontSize(step: FontStep, height: number, format: VideoFormat): number {
  const scale = FONT_SCALE[step];
  return Math.round(vh(scale[format], height));
}

/**
 * All font sizes resolved for the current composition.
 *
 * ```tsx
 * const font = useTypography();
 * <div style={{ fontSize: font.title }}>Hello</div>
 * ```
 */
export function useTypography(): Record<FontStep, number> {
  const { width, height } = useVideoConfig();
  const format = detectFormat(width, height);

  return {
    hero:     fontSize('hero', height, format),
    title:    fontSize('title', height, format),
    heading:  fontSize('heading', height, format),
    subtitle: fontSize('subtitle', height, format),
    body:     fontSize('body', height, format),
    label:    fontSize('label', height, format),
    caption:  fontSize('caption', height, format),
  };
}

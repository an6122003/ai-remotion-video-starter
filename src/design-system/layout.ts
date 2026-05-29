import type React from 'react';

// ── Types ──

export type VideoFormat = 'shorts' | 'landscape' | 'square';

export type SafeZone = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type ContentArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Layout = {
  /** Detected format based on aspect ratio */
  format: VideoFormat;
  /** Viewport-relative width unit: vw(5) = 5% of composition width */
  vw: (percent: number) => number;
  /** Viewport-relative height unit: vh(5) = 5% of composition height */
  vh: (percent: number) => number;
  /** Viewport-relative min unit: vmin(5) = 5% of min(width, height) */
  vmin: (percent: number) => number;
  /** Safe zone insets in pixels */
  safe: SafeZone;
  /** Usable content area after safe zone insets */
  content: ContentArea;
  /** Composition width in px */
  width: number;
  /** Composition height in px */
  height: number;
  /** Frames per second */
  fps: number;
};

// ── Safe zone defaults per format ──
// Shorts: extra bottom for mobile nav/swipe zone, extra top for status bar
// Landscape: more horizontal padding for widescreen
// Square: uniform padding

const SAFE_ZONE_PERCENT: Record<VideoFormat, { top: number; bottom: number; left: number; right: number }> = {
  shorts:    { top: 5,   bottom: 8,   left: 4.5, right: 4.5 },
  landscape: { top: 4,   bottom: 4,   left: 5,   right: 5   },
  square:    { top: 4,   bottom: 4,   left: 4,   right: 4   },
};

// ── Pure functions ──

/**
 * Detect the video format from dimensions.
 * - Aspect ratio < 0.7  → shorts (9:16, 3:4)
 * - Aspect ratio > 1.4  → landscape (16:9, 2:1)
 * - Otherwise           → square (1:1, 4:3-ish)
 */
export function detectFormat(width: number, height: number): VideoFormat {
  const ratio = width / height;
  if (ratio < 0.7) return 'shorts';
  if (ratio > 1.4) return 'landscape';
  return 'square';
}

/** Returns `percent`% of `width` in pixels. */
export function vw(percent: number, width: number): number {
  return Math.round((percent / 100) * width);
}

/** Returns `percent`% of `height` in pixels. */
export function vh(percent: number, height: number): number {
  return Math.round((percent / 100) * height);
}

/** Returns `percent`% of `min(width, height)` in pixels. */
export function vmin(percent: number, width: number, height: number): number {
  return Math.round((percent / 100) * Math.min(width, height));
}

/** Compute safe zone insets in pixels for the given dimensions. */
export function safeZone(width: number, height: number): SafeZone {
  const format = detectFormat(width, height);
  const pct = SAFE_ZONE_PERCENT[format];
  return {
    top:    vh(pct.top, height),
    bottom: vh(pct.bottom, height),
    left:   vw(pct.left, width),
    right:  vw(pct.right, width),
  };
}

/** Compute the usable content area (after safe zone insets). */
export function contentArea(width: number, height: number): ContentArea {
  const safe = safeZone(width, height);
  return {
    x: safe.left,
    y: safe.top,
    width:  width - safe.left - safe.right,
    height: height - safe.top - safe.bottom,
  };
}

/**
 * Returns a style object for a safe-zone-aware container.
 * Apply this to a wrapper div inside AbsoluteFill to keep content
 * within the safe zone.
 */
export function safeContainerStyle(
  width: number,
  height: number,
): React.CSSProperties {
  const safe = safeZone(width, height);
  return {
    position: 'absolute',
    top: safe.top,
    left: safe.left,
    right: safe.right,
    bottom: safe.bottom,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };
}

// ── Hook ──

import { useVideoConfig } from 'remotion';

/**
 * One-stop layout hook. Call from any Remotion component.
 *
 * ```tsx
 * const { vw, vh, safe, content, format } = useLayout();
 * ```
 */
export function useLayout(): Layout {
  const { width, height, fps } = useVideoConfig();
  const format = detectFormat(width, height);

  return {
    format,
    vw:   (pct: number) => vw(pct, width),
    vh:   (pct: number) => vh(pct, height),
    vmin: (pct: number) => vmin(pct, width, height),
    safe: safeZone(width, height),
    content: contentArea(width, height),
    width,
    height,
    fps,
  };
}

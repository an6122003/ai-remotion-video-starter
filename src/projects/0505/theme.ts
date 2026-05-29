import type { ProjectTheme } from '../../design-system';

export const theme: ProjectTheme = {
  name: '0505 — Xiaomi Mimo V2.5 Pro',

  colors: {
    // Brand — derived from Xiaomi benchmark chart
    primary:    '#F97316',  // Xiaomi orange — titles, accents, highlights
    secondary:  '#FB923C',  // Lighter orange — secondary emphasis

    // Semantic
    positive:   '#10b981',  // Emerald — positive indicators
    warning:    '#fbbf24',  // Amber — caution callouts
    negative:   '#ef4444',  // Red — negative indicators
    highlight:  '#FB923C',  // Light orange — inline keyword highlights

    // Text
    textPrimary:   '#fafaf9',  // Stone-50 — main text, hero numbers
    textSecondary: '#a8a29e',  // Stone-400 — subtitles, descriptions
    textMuted:     '#78716c',  // Stone-500 — labels, fine print

    // Surfaces
    surface:       'rgba(28, 25, 23, 0.85)',  // Frosted card background
    background:    '#0C0A09',                  // Stone-950 — composition bg
    backgroundAlt: '#1c1917',                  // Stone-900 — gradient mid-point

    // Project-specific extras
    primaryGlow:    'rgba(249, 115, 22, 0.15)',
    primaryBorder:  'rgba(249, 115, 22, 0.35)',
    secondaryBorder:'rgba(251, 146, 60, 0.3)',
    barGray:        '#4B5563',   // Competitor bar gray from chart
    barLightGray:   '#9CA3AF',   // Lighter competitor gray
  },

  gradients: {
    title:          'linear-gradient(135deg, #FB923C 0%, #F97316 40%, #fafaf9 100%)',
    subtitle:       'linear-gradient(135deg, #a8a29e 0%, #78716c 100%)',
    primarySurface: 'linear-gradient(135deg, rgba(249,115,22,0.20), rgba(251,146,60,0.12))',
    brandGlow:      'radial-gradient(ellipse at center, rgba(249,115,22,0.25) 0%, transparent 70%)',
  },

  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
};

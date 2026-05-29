import type { ProjectTheme } from '../../design-system';

export const theme: ProjectTheme = {
  name: 'M5 MacBook Comparison',

  colors: {
    // Brand
    primary:    '#6366f1',  // Indigo — chip badges, grid lines, primary accents
    secondary:  '#10b981',  // Emerald — positive indicators, full GPU count

    // Semantic
    positive:   '#10b981',  // "Đủ 10 GPU" — has all cores
    warning:    '#f97316',  // Orange — deficient GPU card border/accents
    negative:   '#ef4444',  // Red — core count text when deficient
    highlight:  '#fbbf24',  // Amber — inline highlights in body text

    // Text
    textPrimary:   '#f8fafc',  // Slate-50 — card names, hero numbers
    textSecondary: '#94a3b8',  // Slate-400 — subtitles, descriptions
    textMuted:     '#64748b',  // Slate-500 — labels (CPU/GPU), fine print

    // Surfaces
    surface:       'rgba(15, 23, 42, 0.8)',  // Frosted card background
    background:    '#020617',                 // Slate-950 — composition bg
    backgroundAlt: '#0f172a',                 // Slate-900 — gradient mid-point

    // Project-specific extras
    primaryBorder:  'rgba(99,102,241,0.35)',
    warningBorder:  'rgba(249,115,22,0.35)',
    positiveBorder: 'rgba(52,211,153,0.3)',
    highlightBorder: 'rgba(251,191,36,0.3)',
  },

  gradients: {
    title:          'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)',
    subtitle:       'linear-gradient(135deg, #cbd5e1 0%, #64748b 100%)',
    primarySurface: 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(139,92,246,0.18))',
    warningSurface: 'linear-gradient(135deg, rgba(249,115,22,0.25), rgba(239,68,68,0.18))',
  },

  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
};

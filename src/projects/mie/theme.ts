import type { ProjectTheme } from '../../design-system';

export const theme: ProjectTheme = {
  name: 'Memory Integrity Enforcement',

  colors: {
    primary: '#22d3ee',
    secondary: '#60a5fa',

    positive: '#34d399',
    warning: '#fbbf24',
    negative: '#f43f5e',
    highlight: '#a5f3fc',

    textPrimary: '#f8fafc',
    textSecondary: '#cbd5e1',
    textMuted: '#64748b',

    surface: 'rgba(8, 18, 33, 0.78)',
    background: '#020617',
    backgroundAlt: '#07111f',

    chipSurface: 'rgba(15, 23, 42, 0.86)',
    vaultSurface: 'rgba(14, 36, 58, 0.48)',
    scanner: '#67e8f9',
    lock: '#e0f2fe',
    allowedGlow: 'rgba(52, 211, 153, 0.36)',
    deniedGlow: 'rgba(244, 63, 94, 0.36)',
    cyanBorder: 'rgba(34, 211, 238, 0.42)',
    whiteBorder: 'rgba(248, 250, 252, 0.22)',
  },

  gradients: {
    title: 'linear-gradient(135deg, #f8fafc 0%, #a5f3fc 46%, #22d3ee 100%)',
    subtitle: 'linear-gradient(135deg, #cbd5e1 0%, #64748b 100%)',
    vault: 'linear-gradient(135deg, rgba(34,211,238,0.18), rgba(96,165,250,0.08))',
    chip: 'linear-gradient(145deg, rgba(15,23,42,0.98), rgba(8,18,33,0.88))',
  },

  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
};

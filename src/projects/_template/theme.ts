import type { ProjectTheme } from '../../design-system';

/**
 * Project theme — TEMPLATE
 *
 * Copy this file into your new project folder and fill in the values.
 * The onboarding flow will generate this for you automatically.
 *
 * All compositions in this project should import colors/gradients from
 * this file to maintain visual consistency.
 */
export const theme: ProjectTheme = {
  name: 'My Project',

  colors: {
    // Brand / primary
    primary:    '#6366f1',  // TODO: Replace with your primary color
    secondary:  '#10b981',  // TODO: Replace with your secondary color

    // Semantic
    positive:   '#10b981',
    warning:    '#f97316',
    negative:   '#ef4444',
    highlight:  '#fbbf24',

    // Text
    textPrimary:   '#f8fafc',
    textSecondary: '#94a3b8',
    textMuted:     '#64748b',

    // Surfaces
    surface:       'rgba(15, 23, 42, 0.8)',
    background:    '#020617',
    backgroundAlt: '#0f172a',
  },

  gradients: {
    title:    'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)',
    subtitle: 'linear-gradient(135deg, #cbd5e1 0%, #64748b 100%)',
  },

  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
};

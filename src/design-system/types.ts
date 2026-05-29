/**
 * Type definition for a per-project theme.
 * Every project must export a `theme` object conforming to this type.
 */
export type ProjectTheme = {
  /** Human-readable project name */
  name: string;

  colors: {
    // Brand
    primary: string;
    secondary: string;

    // Semantic
    positive: string;
    warning: string;
    negative: string;
    highlight: string;

    // Text
    textPrimary: string;
    textSecondary: string;
    textMuted: string;

    // Surfaces
    surface: string;
    background: string;
    backgroundAlt: string;

    // Extensible — projects can add extra colors
    [key: string]: string;
  };

  gradients: {
    title: string;
    subtitle: string;
    // Extensible
    [key: string]: string;
  };

  /** CSS font-family string */
  fontFamily: string;
};

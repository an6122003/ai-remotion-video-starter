import React from 'react';
import {
  useCurrentFrame,
  interpolate,
} from 'remotion';
import {
  useLayout,
  useTypography,
  useSpacing,
  EASING,
  CLAMP,
} from '../../design-system';
import { theme } from './theme';

type CoreGridProps = {
  label: string;
  total: number;
  maxCores: number;
  color: string;
  dimColor: string;
  accentColor: string;
  staggerDelay: number;
  highlightMissing?: boolean;
};

export const CoreGrid: React.FC<CoreGridProps> = ({
  label,
  total,
  maxCores,
  color,
  dimColor,
  accentColor,
  staggerDelay,
  highlightMissing = false,
}) => {
  const frame = useCurrentFrame();
  const { fps, vw } = useLayout();
  const font = useTypography();
  const sp = useSpacing();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: sp.sm,
      }}
    >
      <div
        style={{
          fontSize: font.caption,
          fontWeight: 600,
          color: theme.colors.textSecondary,
          textTransform: 'uppercase',
          letterSpacing: 2,
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: sp.xs,
          justifyContent: 'center',
          maxWidth: vw(14),
        }}
      >
        {Array.from({ length: maxCores }).map((_, i) => {
          const isActive = i < total;
          const isMissing = !isActive && highlightMissing;

          const enterProgress = interpolate(
            frame,
            [staggerDelay + i * 2, staggerDelay + i * 2 + 10],
            [0, 1],
            { easing: EASING.bounce, ...CLAMP },
          );

          // Pulsing for missing cores
          const pulsePhase = interpolate(
            frame,
            [staggerDelay + maxCores * 2 + 15, staggerDelay + maxCores * 2 + 15 + 2 * fps],
            [0, Math.PI * 6],
            CLAMP,
          );

          const pulseOpacity = isMissing
            ? interpolate(Math.sin(pulsePhase), [-1, 1], [0.3, 0.8])
            : 1;

          const coreSize = vw(2.2);

          return (
            <div
              key={i}
              style={{
                width: coreSize,
                height: coreSize,
                borderRadius: sp.xs,
                transform: `scale(${enterProgress})`,
                opacity: isActive ? enterProgress : pulseOpacity * enterProgress,
                background: isActive
                  ? color
                  : isMissing
                    ? 'transparent'
                    : dimColor,
                border: isMissing
                  ? `2px dashed ${accentColor}`
                  : isActive
                    ? `1px solid ${accentColor}`
                    : '1px solid rgba(255,255,255,0.05)',
                boxShadow: isActive
                  ? `0 0 12px ${accentColor}40`
                  : 'none',
              }}
            />
          );
        })}
      </div>
      <div
        style={{
          fontSize: font.subtitle,
          fontWeight: 700,
          color: total < maxCores && highlightMissing ? theme.colors.negative : '#e2e8f0',
          opacity: interpolate(
            frame,
            [staggerDelay + maxCores * 2, staggerDelay + maxCores * 2 + 15],
            [0, 1],
            { easing: EASING.smooth, ...CLAMP },
          ),
        }}
      >
        {total} cores
      </div>
    </div>
  );
};

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
  glassCard,
  cardTopGlow,
} from '../../design-system';
import { theme } from './theme';
import { CoreGrid } from './CoreGrid';
import type { MacbookModel } from './types';

type ModelCardProps = {
  model: MacbookModel;
  index: number;
  baseDelay: number;
  maxGpuCores: number;
};

export const ModelCard: React.FC<ModelCardProps> = ({
  model,
  index,
  baseDelay,
  maxGpuCores,
}) => {
  const frame = useCurrentFrame();
  const { vh, vw } = useLayout();
  const font = useTypography();
  const sp = useSpacing();

  const enterDelay = baseDelay + index * 15;

  const slideUp = interpolate(
    frame,
    [enterDelay, enterDelay + 20],
    [vh(3), 0],
    { easing: EASING.smooth, ...CLAMP },
  );

  const fadeIn = interpolate(
    frame,
    [enterDelay, enterDelay + 20],
    [0, 1],
    { easing: EASING.smooth, ...CLAMP },
  );

  const isDeficient = model.gpuCores < maxGpuCores;

  const borderColor = isDeficient
    ? `rgba(239, 68, 68, ${interpolate(frame, [enterDelay + 40, enterDelay + 55], [0, 0.6], CLAMP)})`
    : `rgba(99, 102, 241, ${interpolate(frame, [enterDelay + 40, enterDelay + 55], [0, 0.3], CLAMP)})`;

  const glowOpacity = interpolate(
    frame,
    [enterDelay + 40, enterDelay + 60],
    [0, 1],
    CLAMP,
  );

  const coreStaggerBase = enterDelay + 25;

  return (
    <div
      style={{
        ...glassCard({
          bg: 'rgba(15, 23, 42, 0.7)',
          blur: 20,
          borderRadius: sp.radiusMd,
          borderColor,
          borderWidth: 1.5,
        }),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: sp.lg,
        padding: `${sp.xl}px ${sp.lg}px`,
        transform: `translateY(${slideUp}px)`,
        opacity: fadeIn,
        width: vw(20),
      }}
    >
      {/* Glow effect */}
      <div
        style={{
          ...cardTopGlow({
            color: isDeficient ? theme.colors.negative : theme.colors.primary,
            width: vw(16),
            height: vh(5),
            opacity: 0.15,
          }),
          opacity: glowOpacity,
        }}
      />

      {/* Header */}
      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <div
          style={{
            fontSize: font.caption,
            fontWeight: 500,
            color: theme.colors.primary,
            marginBottom: sp.xs,
            letterSpacing: 1,
          }}
        >
          {model.chip} • {model.storage}
        </div>
        <div
          style={{
            fontSize: font.subtitle,
            fontWeight: 700,
            color: theme.colors.textPrimary,
          }}
        >
          {model.name}
        </div>
      </div>

      {/* Core grids */}
      <div
        style={{
          display: 'flex',
          gap: sp.lg,
          justifyContent: 'center',
        }}
      >
        <CoreGrid
          label="CPU"
          total={model.cpuCores}
          maxCores={model.cpuCores}
          color={`linear-gradient(135deg, ${theme.colors.primary}, #818cf8)`}
          dimColor="rgba(99,102,241,0.1)"
          accentColor={theme.colors.primary}
          staggerDelay={coreStaggerBase}
        />
        <CoreGrid
          label="GPU"
          total={model.gpuCores}
          maxCores={maxGpuCores}
          color={
            isDeficient
              ? `linear-gradient(135deg, ${theme.colors.warning}, #fb923c)`
              : `linear-gradient(135deg, ${theme.colors.positive}, #34d399)`
          }
          dimColor="rgba(239,68,68,0.1)"
          accentColor={isDeficient ? theme.colors.warning : theme.colors.positive}
          staggerDelay={coreStaggerBase + 22}
          highlightMissing={isDeficient}
        />
      </div>

      {/* Deficiency badge */}
      {isDeficient && (
        <div
          style={{
            fontSize: font.caption,
            fontWeight: 600,
            color: theme.colors.highlight,
            background: 'rgba(251,191,36,0.1)',
            border: `1px solid ${theme.colors.highlightBorder}`,
            borderRadius: sp.radiusSm,
            padding: `${sp.xs}px ${sp.sm}px`,
            opacity: interpolate(
              frame,
              [coreStaggerBase + 50, coreStaggerBase + 65],
              [0, 1],
              { easing: EASING.smooth, ...CLAMP },
            ),
            transform: `scale(${interpolate(
              frame,
              [coreStaggerBase + 50, coreStaggerBase + 65],
              [0.8, 1],
              { easing: EASING.bounce, ...CLAMP },
            )})`,
          }}
        >
          ⚠ {maxGpuCores - model.gpuCores} GPU cores less
        </div>
      )}
    </div>
  );
};

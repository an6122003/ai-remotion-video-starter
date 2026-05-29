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
import type { MacbookModel } from './types';

type ShortsModelCardProps = {
  model: MacbookModel;
  enterFrame: number;
  maxGpuCores: number;
  badgeText?: string;
};

export const ShortsModelCard: React.FC<ShortsModelCardProps> = ({
  model,
  enterFrame,
  maxGpuCores,
  badgeText,
}) => {
  const frame = useCurrentFrame();
  const { vh, fps } = useLayout();
  const font = useTypography();
  const sp = useSpacing();

  const isDeficient = model.gpuCores < maxGpuCores;

  // ── Card entrance ──
  const cardProgress = interpolate(
    frame,
    [enterFrame, enterFrame + 20],
    [0, 1],
    { easing: EASING.smooth, ...CLAMP },
  );
  const slideUp = interpolate(cardProgress, [0, 1], [vh(4), 0]);
  const fadeIn = cardProgress;

  const borderAlpha = interpolate(
    frame,
    [enterFrame + 20, enterFrame + 35],
    [0, 1],
    CLAMP,
  );
  const borderColor = isDeficient
    ? `rgba(239, 68, 68, ${0.6 * borderAlpha})`
    : `rgba(99, 102, 241, ${0.3 * borderAlpha})`;

  // ── Core animation ──
  const coreStart = enterFrame + 10;

  // ── Badge ──
  const badgeDelay = enterFrame + Math.round(1.8 * fps);
  const badgeFade = interpolate(
    frame,
    [badgeDelay, badgeDelay + 12],
    [0, 1],
    { easing: EASING.smooth, ...CLAMP },
  );
  const badgeScale = interpolate(
    frame,
    [badgeDelay, badgeDelay + 12],
    [0.7, 1],
    { easing: EASING.bounce, ...CLAMP },
  );

  return (
    <div
      style={{
        ...glassCard({
          borderColor,
          borderRadius: sp.radiusLg,
        }),
        display: 'flex',
        flexDirection: 'column',
        gap: sp.lg,
        padding: `${sp.xl}px ${sp.xl}px`,
        transform: `translateY(${slideUp}px)`,
        opacity: fadeIn,
        width: '100%',
      }}
    >
      {/* Top glow */}
      <div
        style={cardTopGlow({
          color: isDeficient ? theme.colors.negative : theme.colors.primary,
          width: vh(26),
          height: vh(6),
          opacity: 0.18 * borderAlpha,
        })}
      />

      {/* ── Header row ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: sp.lg,
          zIndex: 1,
        }}
      >
        {/* Chip badge */}
        <div
          style={{
            background: isDeficient
              ? theme.gradients.warningSurface
              : theme.gradients.primarySurface,
            border: `1px solid ${isDeficient ? theme.colors.warningBorder : theme.colors.primaryBorder}`,
            borderRadius: sp.radiusMd,
            padding: `${sp.sm}px ${sp.lg}px`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: vh(5),
          }}
        >
          <div style={{ fontSize: font.heading, fontWeight: 800, color: theme.colors.textPrimary, lineHeight: 1 }}>
            {model.chip}
          </div>
          <div style={{ fontSize: font.label, fontWeight: 500, color: theme.colors.textSecondary, marginTop: 2 }}>
            {model.storage}
          </div>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: font.heading,
            fontWeight: 700,
            color: theme.colors.textPrimary,
            lineHeight: 1.15,
            flex: 1,
          }}
        >
          {model.name}
        </div>

        {/* Inline badge */}
        {badgeText && (
          <div
            style={{
              fontSize: font.label,
              fontWeight: 700,
              color: isDeficient ? theme.colors.highlight : theme.colors.positive,
              background: isDeficient
                ? 'rgba(251,191,36,0.12)'
                : 'rgba(52,211,153,0.12)',
              border: `1.5px solid ${isDeficient ? theme.colors.highlightBorder : theme.colors.positiveBorder}`,
              borderRadius: sp.radiusSm,
              padding: `${sp.sm}px ${sp.lg}px`,
              opacity: badgeFade,
              transform: `scale(${badgeScale})`,
              whiteSpace: 'nowrap',
            }}
          >
            {badgeText}
          </div>
        )}
      </div>

      {/* ── Core bars ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: sp.md }}>
        <CoreBar
          label="CPU"
          total={model.cpuCores}
          maxCores={model.cpuCores}
          color={theme.colors.primary}
          accentColor="#818cf8"
          enterFrame={coreStart}
        />
        <CoreBar
          label="GPU"
          total={model.gpuCores}
          maxCores={maxGpuCores}
          color={isDeficient ? theme.colors.warning : theme.colors.positive}
          accentColor={isDeficient ? '#fb923c' : '#34d399'}
          enterFrame={coreStart + 6}
          highlightMissing={isDeficient}
        />
      </div>
    </div>
  );
};

// ── Horizontal core bar ──

type CoreBarProps = {
  label: string;
  total: number;
  maxCores: number;
  color: string;
  accentColor: string;
  enterFrame: number;
  highlightMissing?: boolean;
};

const CoreBar: React.FC<CoreBarProps> = ({
  label,
  total,
  maxCores,
  color,
  accentColor,
  enterFrame,
  highlightMissing = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useLayout();
  const font = useTypography();
  const sp = useSpacing();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: sp.md }}>
      {/* Label */}
      <div
        style={{
          fontSize: font.label,
          fontWeight: 700,
          color: theme.colors.textMuted,
          width: sp.space(14),
          textAlign: 'right',
          letterSpacing: 1,
        }}
      >
        {label}
      </div>

      {/* Core squares in a row */}
      <div style={{ display: 'flex', gap: sp.sm, flex: 1 }}>
        {Array.from({ length: maxCores }).map((_, i) => {
          const isActive = i < total;
          const isMissing = !isActive && highlightMissing;

          const enterProgress = interpolate(
            frame,
            [enterFrame + i * 2, enterFrame + i * 2 + 8],
            [0, 1],
            { easing: EASING.bounce, ...CLAMP },
          );

          const pulsePhase = interpolate(
            frame,
            [
              enterFrame + maxCores * 2 + 8,
              enterFrame + maxCores * 2 + 8 + 3 * fps,
            ],
            [0, Math.PI * 8],
            CLAMP,
          );
          const pulseOpacity = isMissing
            ? interpolate(Math.sin(pulsePhase), [-1, 1], [0.25, 0.85])
            : 1;

          return (
            <div
              key={i}
              style={{
                flex: 1,
                aspectRatio: '1',
                borderRadius: sp.radiusSm,
                transform: `scale(${enterProgress})`,
                opacity: isActive
                  ? enterProgress
                  : pulseOpacity * enterProgress,
                background: isActive
                  ? `linear-gradient(135deg, ${color}, ${accentColor})`
                  : isMissing
                    ? 'transparent'
                    : 'rgba(255,255,255,0.03)',
                border: isMissing
                  ? `3px dashed ${color}`
                  : isActive
                    ? `1px solid ${accentColor}50`
                    : '1px solid rgba(255,255,255,0.04)',
                boxShadow: isActive
                  ? `0 0 16px ${color}30`
                  : 'none',
              }}
            />
          );
        })}
      </div>

      {/* Count */}
      <div
        style={{
          fontSize: font.heading,
          fontWeight: 800,
          color:
            total < maxCores && highlightMissing ? theme.colors.negative : '#e2e8f0',
          minWidth: sp.space(25),
          textAlign: 'right',
          opacity: interpolate(
            frame,
            [enterFrame + maxCores * 2, enterFrame + maxCores * 2 + 12],
            [0, 1],
            { easing: EASING.smooth, ...CLAMP },
          ),
        }}
      >
        {total} nhân
      </div>
    </div>
  );
};

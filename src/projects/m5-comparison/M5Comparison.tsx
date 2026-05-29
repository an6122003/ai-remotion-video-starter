import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Sequence,
} from 'remotion';
import {
  useLayout,
  useTypography,
  useSpacing,
  EASING,
  CLAMP,
  glowSpots,
  animatedGradientBg,
  gridPatternStyle,
} from '../../design-system';
import { theme } from './theme';
import { ModelCard } from './ModelCard';
import { MODELS } from './types';

export const M5Comparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { vh, vw, fps } = useLayout();
  const font = useTypography();
  const sp = useSpacing();

  // ── Phase 1: Title entrance ──
  const titleFade = interpolate(frame, [0, 20], [0, 1], {
    easing: EASING.smooth, ...CLAMP,
  });
  const titleSlide = interpolate(frame, [0, 20], [-vh(1.5), 0], {
    easing: EASING.smooth, ...CLAMP,
  });

  // ── Phase 2: Subtitle ──
  const subtitleFade = interpolate(frame, [12, 28], [0, 1], {
    easing: EASING.smooth, ...CLAMP,
  });

  // ── Animated background gradient rotation ──
  const gradientAngle = interpolate(frame, [0, 10 * fps], [0, 360], CLAMP);

  const bgGlows = glowSpots([
    { x: '20%', y: '50%', color: theme.colors.primary,   opacity: 0.08 },
    { x: '80%', y: '50%', color: theme.colors.secondary, opacity: 0.06 },
    { x: '50%', y: '0%',  color: '#8b5cf6',             opacity: 0.06 },
  ]);

  const bgGradient = animatedGradientBg(gradientAngle, [
    [theme.colors.background, '0%'],
    [theme.colors.backgroundAlt, '50%'],
    [theme.colors.background, '100%'],
  ]);

  // ── Phase 3: Conclusion text ──
  const conclusionDelay = 5.5 * fps;
  const conclusionFade = interpolate(
    frame,
    [conclusionDelay, conclusionDelay + 20],
    [0, 1],
    { easing: EASING.smooth, ...CLAMP },
  );
  const conclusionSlide = interpolate(
    frame,
    [conclusionDelay, conclusionDelay + 20],
    [vh(1), 0],
    { easing: EASING.smooth, ...CLAMP },
  );

  const maxGpuCores = 10;

  return (
    <AbsoluteFill
      style={{
        background: `${bgGlows}, ${bgGradient}`,
        fontFamily: theme.fontFamily,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Animated grid pattern */}
      <div
        style={{
          ...gridPatternStyle(theme.colors.primary, sp.xl, 0.03),
          opacity: interpolate(frame, [0, 30], [0, 1], CLAMP),
        }}
      />

      {/* Title */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: sp.md,
          transform: `translateY(${titleSlide}px)`,
          opacity: titleFade,
        }}
      >
        <div
          style={{
            fontSize: font.caption,
            fontWeight: 600,
            color: theme.colors.primary,
            textTransform: 'uppercase',
            letterSpacing: 3,
            marginBottom: sp.sm,
          }}
        >
          Apple Silicon Comparison
        </div>
        <div
          style={{
            fontSize: font.title,
            fontWeight: 800,
            background: theme.gradients.title,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.2,
          }}
        >
          MacBook Air M5 GPU Cores
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: font.body,
          color: theme.colors.textSecondary,
          textAlign: 'center',
          marginBottom: sp.xxl,
          opacity: subtitleFade,
          maxWidth: vw(55),
          lineHeight: 1.5,
        }}
      >
        The base 13" M5 ships with <span style={{ color: theme.colors.highlight, fontWeight: 700 }}>only 8 GPU cores</span> —
        2 fewer than the 15" M5 and the 512GB M4
      </div>

      {/* Cards */}
      {/* @ts-expect-error premountFor exists at runtime */}
      <Sequence from={Math.round(0.8 * fps)} premountFor={Math.round(0.5 * fps)} layout="none">
        <div
          style={{
            display: 'flex',
            gap: sp.xl,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          {MODELS.map((model, i) => (
            <ModelCard
              key={`${model.chip}-${model.size}-${model.storage}`}
              model={model}
              index={i}
              baseDelay={0}
              maxGpuCores={maxGpuCores}
            />
          ))}
        </div>
      </Sequence>

      {/* Conclusion */}
      <div
        style={{
          marginTop: sp.xxl,
          textAlign: 'center',
          opacity: conclusionFade,
          transform: `translateY(${conclusionSlide}px)`,
        }}
      >
        <div
          style={{
            fontSize: font.body,
            color: theme.colors.textSecondary,
            maxWidth: vw(48),
            lineHeight: 1.6,
          }}
        >
          Consider the{' '}
          <span style={{ color: theme.colors.positive, fontWeight: 700 }}>15" M5</span> or{' '}
          <span style={{ color: theme.colors.positive, fontWeight: 700 }}>512GB M4 13"</span>{' '}
          for full 10-core GPU performance
        </div>
      </div>
    </AbsoluteFill>
  );
};

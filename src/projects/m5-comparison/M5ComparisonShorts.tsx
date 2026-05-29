import React from 'react';
import {
  AbsoluteFill,
  Audio,
  useCurrentFrame,
  interpolate,
  Sequence,
} from 'remotion';
import { whoosh, uiSwitch, ding, pageTurn } from '@remotion/sfx';
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
import { ShortsModelCard } from './ShortsModelCard';
import { MODELS } from './types';

/**
 * Script beats (Vietnamese, ~12s spoken + 3s hold):
 *
 * Beat 1 (0–4s, f0–120):
 *   "M5 MacBook Air 15 inch bản base có 10 nhân CPU + 10 nhân GPU"
 *   → Title + Card 1 appears
 *
 * Beat 2 (4–8s, f120–240):
 *   "nhưng bản base M5 13 inch chỉ có 10 nhân CPU + 8 nhân GPU"
 *   → Card 2 slides in below
 *
 * Beat 3 (8–12s, f240–360):
 *   "ít hơn 2 nhân GPU so với 15 inch và cả M4 MacBook Air 512GB"
 *   → Card 3 slides in below
 *
 * Beat 4 (12–15s, f360–450): hold + conclusion
 */

const FPS = 30;
const BEAT_1_CARD = Math.round(0.5 * FPS); // 15 – card 1 entrance
const BEAT_2 = 4 * FPS;   // 120
const BEAT_3 = 8 * FPS;   // 240
const BEAT_4 = 12 * FPS;  // 360

// Badge pop-in delay (matches ShortsModelCard: enterFrame + 1.8s)
const BADGE_DELAY = Math.round(1.8 * FPS); // 54 frames

export const M5ComparisonShorts: React.FC = () => {
  const frame = useCurrentFrame();
  const { vh, fps } = useLayout();
  const font = useTypography();
  const sp = useSpacing();

  // ── Background ──
  const gradientAngle = interpolate(frame, [0, 15 * fps], [0, 360], CLAMP);

  const bgGlows = glowSpots([
    { x: '50%', y: '10%', color: theme.colors.primary,   opacity: 0.1  },
    { x: '30%', y: '60%', color: theme.colors.secondary, opacity: 0.07 },
    { x: '70%', y: '85%', color: theme.colors.negative,  opacity: 0.05 },
  ]);

  const bgGradient = animatedGradientBg(gradientAngle, [
    [theme.colors.background, '0%'],
    [theme.colors.backgroundAlt, '50%'],
    [theme.colors.background, '100%'],
  ]);

  // ── Title ──
  const titleFade = interpolate(frame, [0, 15], [0, 1], {
    easing: EASING.smooth, ...CLAMP,
  });
  const titleSlide = interpolate(frame, [0, 15], [-vh(1), 0], {
    easing: EASING.smooth, ...CLAMP,
  });

  // ── Subtitle ──
  const subtitleFade = interpolate(frame, [8, 22], [0, 1], {
    easing: EASING.smooth, ...CLAMP,
  });

  // ── Conclusion ──
  const conclusionFade = interpolate(
    frame,
    [BEAT_4, BEAT_4 + 18],
    [0, 1],
    { easing: EASING.smooth, ...CLAMP },
  );
  const conclusionSlide = interpolate(
    frame,
    [BEAT_4, BEAT_4 + 18],
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
        overflow: 'hidden',
      }}
    >
      {/* Grid pattern */}
      <div
        style={{
          ...gridPatternStyle(theme.colors.primary, sp.xxl, 0.03),
          opacity: interpolate(frame, [0, 20], [0, 1], CLAMP),
        }}
      />

      {/* ── Title block (fixed, never moves/shrinks) ── */}
      <div
        style={{
          textAlign: 'center',
          paddingTop: vh(4),
          paddingLeft: sp.xxl,
          paddingRight: sp.xxl,
          transform: `translateY(${titleSlide}px)`,
          opacity: titleFade,
          zIndex: 2,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: font.subtitle,
            fontWeight: 600,
            color: theme.colors.primary,
            textTransform: 'uppercase',
            letterSpacing: 5,
            marginBottom: sp.sm,
          }}
        >
          So sánh Apple Silicon
        </div>
        <div
          style={{
            fontSize: font.hero,
            fontWeight: 800,
            background: theme.gradients.title,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.1,
          }}
        >
          Nhân GPU
        </div>
        <div
          style={{
            fontSize: font.title,
            fontWeight: 800,
            background: theme.gradients.subtitle,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.1,
            marginTop: sp.xs,
          }}
        >
          MacBook Air
        </div>
      </div>

      {/* ── Subtitle (fixed) ── */}
      <div
        style={{
          fontSize: font.body,
          color: theme.colors.textSecondary,
          textAlign: 'center',
          padding: `${sp.lg}px ${sp.xxl}px 0`,
          opacity: subtitleFade,
          lineHeight: 1.45,
          zIndex: 2,
          flexShrink: 0,
        }}
      >
        Bản base 13" M5 chỉ có{' '}
        <span style={{ color: theme.colors.highlight, fontWeight: 700 }}>8 nhân GPU</span>
        <br />
        ít hơn 2 nhân so với 15" M5 và M4 512GB
      </div>

      {/* ── Cards area ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: `${sp.lg}px ${sp.xxl}px`,
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: sp.lg,
            width: '100%',
          }}
        >
          {/* Beat 1: 15" M5 */}
          <Sequence
            from={Math.round(0.5 * fps)}
            layout="none"
          >
            <ShortsModelCard
              model={MODELS[0]}
              enterFrame={0}
              maxGpuCores={maxGpuCores}
              badgeText="✓ Đủ 10 GPU"
            />
          </Sequence>

          {/* Beat 2: 13" M5 — deficient */}
          <Sequence
            from={BEAT_2}
            layout="none"
          >
            <ShortsModelCard
              model={MODELS[1]}
              enterFrame={0}
              maxGpuCores={maxGpuCores}
              badgeText="⚠ Thiếu 2 GPU"
            />
          </Sequence>

          {/* Beat 3: 13" M4 512GB */}
          <Sequence
            from={BEAT_3}
            layout="none"
          >
            <ShortsModelCard
              model={MODELS[2]}
              enterFrame={0}
              maxGpuCores={maxGpuCores}
              badgeText="✓ Đủ 10 GPU"
            />
          </Sequence>
        </div>
      </div>

      {/* ── Conclusion ── */}
      <div
        style={{
          padding: `0 ${sp.xxl}px ${vh(3)}px`,
          textAlign: 'center',
          opacity: conclusionFade,
          transform: `translateY(${conclusionSlide}px)`,
          zIndex: 2,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: font.subtitle,
            color: theme.colors.textSecondary,
            lineHeight: 1.5,
          }}
        >
          Cần đủ{' '}
          <span style={{ color: theme.colors.positive, fontWeight: 700 }}>10 nhân GPU</span>?
          Chọn{' '}
          <span style={{ color: '#818cf8', fontWeight: 700 }}>M5 15"</span> hoặc{' '}
          <span style={{ color: '#818cf8', fontWeight: 700 }}>M4 13" 512GB</span>
        </div>
      </div>

      {/* ── Sound effects layer ── */}

      {/* Card 1 whoosh */}
      <Sequence from={BEAT_1_CARD} layout="none">
        <Audio src={whoosh} volume={0.6} />
      </Sequence>

      {/* Card 1 badge ding */}
      <Sequence from={BEAT_1_CARD + BADGE_DELAY} layout="none">
        <Audio src={ding} volume={0.4} />
      </Sequence>

      {/* Card 2 switch (deficient – more attention-grabbing) */}
      <Sequence from={BEAT_2} layout="none">
        <Audio src={uiSwitch} volume={0.7} />
      </Sequence>

      {/* Card 2 badge ding */}
      <Sequence from={BEAT_2 + BADGE_DELAY} layout="none">
        <Audio src={ding} volume={0.4} />
      </Sequence>

      {/* Card 3 whoosh */}
      <Sequence from={BEAT_3} layout="none">
        <Audio src={whoosh} volume={0.6} />
      </Sequence>

      {/* Card 3 badge ding */}
      <Sequence from={BEAT_3 + BADGE_DELAY} layout="none">
        <Audio src={ding} volume={0.4} />
      </Sequence>

      {/* Conclusion page-turn */}
      <Sequence from={BEAT_4} layout="none">
        <Audio src={pageTurn} volume={0.5} />
      </Sequence>

    </AbsoluteFill>
  );
};

import React from 'react';
import {
  AbsoluteFill,
  Audio,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
} from 'remotion';
import { whip, pageTurn, uiSwitch } from '../../local-sfx';
import {
  useLayout,
  useTypography,
  useSpacing,
  EASING,
  CLAMP,
  SLIDE,
  glowSpots,
  animatedGradientBg,
  gridPatternStyle,
} from '../../design-system';
import { theme } from './theme';

/**
 * Sequence 1 — Mimo V2.5 Pro Intelligence
 *
 * Script (Vietnamese, ~7s):
 *   "Xiaomi họ cho biết là Mimo V2.5 Pro đạt được một mức độ thông minh
 *    nó tốt đến mức các researcher của chính Xiaomi phải suy nghĩ lại
 *    cái cách họ làm việc với nó."
 *
 * Canvas: 1080 × 1920 (Shorts)
 * Duration: 210 frames @ 30fps (7s)
 *
 * Layout: single centered flex container spanning 20%–80% of canvas height.
 * Title group + text blocks flow naturally with proportional gaps.
 */

const FPS = 30;
const BEAT_2 = Math.round(1.8 * FPS);  // 54
const BEAT_3 = Math.round(3.8 * FPS);  // 114
const BEAT_4 = Math.round(5.5 * FPS);  // 165

export const MimoIntelligence: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const { vh, width, height } = useLayout();
  const font = useTypography();
  const sp = useSpacing();

  // ── Background ──
  const gradientAngle = interpolate(
    frame, [0, durationInFrames - 1], [0, 180], CLAMP,
  );

  const bgGlows = glowSpots([
    { x: '50%', y: '20%', color: theme.colors.primary, opacity: 0.14 },
    { x: '25%', y: '55%', color: theme.colors.secondary, opacity: 0.07 },
    { x: '75%', y: '75%', color: theme.colors.primary, opacity: 0.05 },
  ]);

  const bgGradient = animatedGradientBg(gradientAngle, [
    [theme.colors.background, '0%'],
    [theme.colors.backgroundAlt, '50%'],
    [theme.colors.background, '100%'],
  ]);

  // ── Grid fade-in ──
  const gridOpacity = interpolate(frame, [0, 25], [0, 1], CLAMP);

  // ── Beat 1: Brand label ──
  const labelFade = interpolate(frame, [0, 15], [0, 1], {
    easing: EASING.smooth, ...CLAMP,
  });
  const labelSlide = interpolate(frame, [0, 15], [-vh(SLIDE.subtle), 0], {
    easing: EASING.smooth, ...CLAMP,
  });

  // ── Beat 1: Hero title "Mimo V2.5 Pro" ──
  const heroScale = interpolate(frame, [8, 28], [0.7, 1], {
    easing: EASING.bounce, ...CLAMP,
  });
  const heroFade = interpolate(frame, [8, 22], [0, 1], {
    easing: EASING.smooth, ...CLAMP,
  });

  // ── Beat 2: First text block ──
  const text1Fade = interpolate(frame, [BEAT_2, BEAT_2 + 18], [0, 1], {
    easing: EASING.smooth, ...CLAMP,
  });
  const text1Slide = interpolate(frame, [BEAT_2, BEAT_2 + 18], [vh(SLIDE.normal), 0], {
    easing: EASING.smooth, ...CLAMP,
  });

  // ── Beat 3: Second text block ──
  const text2Fade = interpolate(frame, [BEAT_3, BEAT_3 + 18], [0, 1], {
    easing: EASING.smooth, ...CLAMP,
  });
  const text2Slide = interpolate(frame, [BEAT_3, BEAT_3 + 18], [vh(SLIDE.normal), 0], {
    easing: EASING.smooth, ...CLAMP,
  });

  // Keyword highlight reveal for "researcher"
  const highlightWidth1 = interpolate(
    frame,
    [BEAT_3 + 12, BEAT_3 + 28],
    [0, 100],
    { easing: EASING.smooth, ...CLAMP },
  );

  // ── Beat 4: Final text block ──
  const text3Fade = interpolate(frame, [BEAT_4, BEAT_4 + 18], [0, 1], {
    easing: EASING.smooth, ...CLAMP,
  });
  const text3Slide = interpolate(frame, [BEAT_4, BEAT_4 + 18], [vh(SLIDE.normal), 0], {
    easing: EASING.smooth, ...CLAMP,
  });

  // Keyword highlight for "suy nghĩ lại"
  const highlightWidth2 = interpolate(
    frame,
    [BEAT_4 + 12, BEAT_4 + 28],
    [0, 100],
    { easing: EASING.smooth, ...CLAMP },
  );

  // ── Decorative orange line ──
  const lineWidth = interpolate(frame, [5, 30], [0, 100], {
    easing: EASING.smooth, ...CLAMP,
  });

  // Proportional spacing based on canvas height
  const padX = width * 0.08;
  const titleGap = height * 0.015;       // gap between label, line, hero
  const sectionGap = height * 0.045;     // gap between hero and text blocks
  const textGap = height * 0.03;         // gap between text blocks

  return (
    <AbsoluteFill
      style={{
        background: `${bgGlows}, ${bgGradient}`,
        fontFamily: theme.fontFamily,
        overflow: 'hidden',
      }}
    >
      {/* Grid pattern */}
      <div
        style={{
          ...gridPatternStyle(theme.colors.primary, sp.xxl, 0.025),
          opacity: gridOpacity,
        }}
      />

      {/* ═══════════════ MAIN CONTAINER ═══════════════
           Positioned from 15% to 85% of canvas height,
           flex-column with center justification so content
           groups naturally with proportional gaps */}
      <div
        style={{
          position: 'absolute',
          top: height * 0.15,
          bottom: height * 0.15,
          left: padX,
          right: padX,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        {/* ── Title group: label + line + hero ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: sectionGap,
          }}
        >
          {/* Brand label */}
          <div
            style={{
              fontSize: font.body,
              fontWeight: 600,
              color: theme.colors.primary,
              textTransform: 'uppercase',
              letterSpacing: 6,
              marginBottom: titleGap,
              opacity: labelFade,
              transform: `translateY(${labelSlide}px)`,
            }}
          >
            Xiaomi cho biết
          </div>

          {/* Decorative line */}
          <div
            style={{
              width: `${lineWidth * 0.3}%`,
              minWidth: 2,
              maxWidth: width * 0.25,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${theme.colors.primary}, transparent)`,
              marginBottom: titleGap * 1.5,
              opacity: labelFade,
            }}
          />

          {/* Hero title: Mimo V2.5 Pro */}
          <div
            style={{
              fontSize: font.hero * 1.3,
              fontWeight: 800,
              background: theme.gradients.title,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
              textAlign: 'center',
              opacity: heroFade,
              transform: `scale(${heroScale})`,
            }}
          >
            Mimo V2.5 Pro
          </div>
        </div>

        {/* ── Text blocks group ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: textGap,
            width: '100%',
          }}
        >
          {/* Beat 2: "đạt được một mức độ thông minh" */}
          <div
            style={{
              fontSize: font.title,
              fontWeight: 500,
              color: theme.colors.textPrimary,
              textAlign: 'center',
              lineHeight: 1.5,
              opacity: text1Fade,
              transform: `translateY(${text1Slide}px)`,
            }}
          >
            đạt được một mức độ{' '}
            <span style={{ color: theme.colors.primary, fontWeight: 700 }}>
              thông minh
            </span>
          </div>

          {/* Beat 3: "tốt đến mức các researcher của chính Xiaomi" */}
          <div
            style={{
              fontSize: font.title,
              fontWeight: 500,
              color: theme.colors.textPrimary,
              textAlign: 'center',
              lineHeight: 1.5,
              opacity: text2Fade,
              transform: `translateY(${text2Slide}px)`,
            }}
          >
            tốt đến mức các{' '}
            <span
              style={{
                position: 'relative',
                display: 'inline',
                fontWeight: 700,
                color: theme.colors.textPrimary,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: -4,
                  width: `${highlightWidth1}%`,
                  height: '35%',
                  background: `${theme.colors.primary}40`,
                  borderRadius: sp.radiusSm / 2,
                }}
              />
              researcher
            </span>
            {' '}của chính Xiaomi
          </div>

          {/* Beat 4: "phải suy nghĩ lại cái cách họ làm việc với nó" */}
          <div
            style={{
              fontSize: font.title,
              fontWeight: 500,
              color: theme.colors.textSecondary,
              textAlign: 'center',
              lineHeight: 1.5,
              opacity: text3Fade,
              transform: `translateY(${text3Slide}px)`,
            }}
          >
            phải{' '}
            <span
              style={{
                position: 'relative',
                display: 'inline',
                fontWeight: 700,
                color: theme.colors.primary,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: -4,
                  width: `${highlightWidth2}%`,
                  height: '35%',
                  background: `${theme.colors.primary}30`,
                  borderRadius: sp.radiusSm / 2,
                }}
              />
              suy nghĩ lại
            </span>
            {' '}cái cách họ làm việc với nó
          </div>
        </div>
      </div>

      {/* ── Sound effects (local files — see src/local-sfx.ts) ── */}
      <Sequence from={8} layout="none">
        <Audio src={whip} volume={0.6} />
      </Sequence>
      <Sequence from={BEAT_2} layout="none">
        <Audio src={pageTurn} volume={0.5} />
      </Sequence>
      <Sequence from={BEAT_3} layout="none">
        <Audio src={pageTurn} volume={0.5} />
      </Sequence>
      <Sequence from={BEAT_3 + 12} layout="none">
        <Audio src={uiSwitch} volume={0.5} />
      </Sequence>
      <Sequence from={BEAT_4} layout="none">
        <Audio src={whip} volume={0.5} />
      </Sequence>
    </AbsoluteFill>
  );
};

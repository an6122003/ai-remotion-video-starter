import React from 'react';
import {
  AbsoluteFill,
  Audio,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
} from 'remotion';
import { whip, pageTurn, uiSwitch, ding } from '../../local-sfx';
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
 * Sequence 2 — Free Token Usage
 *
 * Script (Vietnamese, ~9s):
 *   "Mọi người có thể dùng token này cắm thẳng API vào OpenCode,
 *    Claude Code, build app riêng dùng LLM, hay đơn giản là có
 *    một đống token miễn phí để nghịch cũng được."
 *
 * Canvas: 1080 × 1920 (Shorts)
 * Duration: 270 frames @ 30fps (9s)
 *
 * Layout: grouped flex container
 * Beat 1 (0–2s):     Title "Dùng token này" + subtitle
 * Beat 2 (2–4s):     "cắm thẳng API vào" + OpenCode, Claude Code tags
 * Beat 3 (4–6.5s):   "build app riêng dùng LLM"
 * Beat 4 (6.5–9s):   "hay đơn giản là... token miễn phí để nghịch"
 */

const FPS = 30;
const BEAT_2 = Math.round(2.0 * FPS);   // 60
const BEAT_3 = Math.round(4.0 * FPS);   // 120
const BEAT_4 = Math.round(6.5 * FPS);   // 195

export const TokenUsage: React.FC = () => {
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
    { x: '50%', y: '30%', color: theme.colors.primary, opacity: 0.12 },
    { x: '20%', y: '65%', color: theme.colors.secondary, opacity: 0.08 },
    { x: '80%', y: '50%', color: theme.colors.primary, opacity: 0.05 },
  ]);

  const bgGradient = animatedGradientBg(gradientAngle, [
    [theme.colors.background, '0%'],
    [theme.colors.backgroundAlt, '50%'],
    [theme.colors.background, '100%'],
  ]);

  const gridOpacity = interpolate(frame, [0, 25], [0, 1], CLAMP);

  // ── Beat 1: Title ──
  const titleFade = interpolate(frame, [0, 18], [0, 1], {
    easing: EASING.smooth, ...CLAMP,
  });
  const titleSlide = interpolate(frame, [0, 18], [-vh(SLIDE.subtle), 0], {
    easing: EASING.smooth, ...CLAMP,
  });
  const subtitleFade = interpolate(frame, [10, 25], [0, 1], {
    easing: EASING.smooth, ...CLAMP,
  });

  // ── Beat 2: API tools ──
  const text1Fade = interpolate(frame, [BEAT_2, BEAT_2 + 18], [0, 1], {
    easing: EASING.smooth, ...CLAMP,
  });
  const text1Slide = interpolate(frame, [BEAT_2, BEAT_2 + 18], [vh(SLIDE.normal), 0], {
    easing: EASING.smooth, ...CLAMP,
  });

  // Tag pop-in stagger
  const tag1Scale = interpolate(frame, [BEAT_2 + 12, BEAT_2 + 24], [0.5, 1], {
    easing: EASING.bounce, ...CLAMP,
  });
  const tag1Fade = interpolate(frame, [BEAT_2 + 12, BEAT_2 + 20], [0, 1], {
    easing: EASING.smooth, ...CLAMP,
  });
  const tag2Scale = interpolate(frame, [BEAT_2 + 18, BEAT_2 + 30], [0.5, 1], {
    easing: EASING.bounce, ...CLAMP,
  });
  const tag2Fade = interpolate(frame, [BEAT_2 + 18, BEAT_2 + 26], [0, 1], {
    easing: EASING.smooth, ...CLAMP,
  });

  // ── Beat 3: Build app ──
  const text2Fade = interpolate(frame, [BEAT_3, BEAT_3 + 18], [0, 1], {
    easing: EASING.smooth, ...CLAMP,
  });
  const text2Slide = interpolate(frame, [BEAT_3, BEAT_3 + 18], [vh(SLIDE.normal), 0], {
    easing: EASING.smooth, ...CLAMP,
  });

  // ── Beat 4: Free tokens ──
  const text3Fade = interpolate(frame, [BEAT_4, BEAT_4 + 18], [0, 1], {
    easing: EASING.smooth, ...CLAMP,
  });
  const text3Slide = interpolate(frame, [BEAT_4, BEAT_4 + 18], [vh(SLIDE.normal), 0], {
    easing: EASING.smooth, ...CLAMP,
  });
  // Highlight for "miễn phí"
  const highlightWidth = interpolate(
    frame,
    [BEAT_4 + 14, BEAT_4 + 30],
    [0, 100],
    { easing: EASING.smooth, ...CLAMP },
  );

  // Proportional spacing
  const padX = width * 0.08;
  const titleGap = height * 0.012;
  const sectionGap = height * 0.04;
  const textGap = height * 0.03;

  // Tag pill style
  const tagStyle = (color: string): React.CSSProperties => ({
    display: 'inline-block',
    fontSize: font.body,
    fontWeight: 700,
    color: theme.colors.textPrimary,
    background: `${color}25`,
    border: `2px solid ${color}50`,
    borderRadius: sp.radiusMd,
    padding: `${sp.xs}px ${sp.md}px`,
  });

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

      {/* ═══════════════ MAIN CONTAINER ═══════════════ */}
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
        {/* ── Title group ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: sectionGap,
          }}
        >
          {/* Main title */}
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
              opacity: titleFade,
              transform: `translateY(${titleSlide}px)`,
              marginBottom: titleGap,
            }}
          >
            Dùng token này
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: font.body,
              fontWeight: 500,
              color: theme.colors.textSecondary,
              textAlign: 'center',
              opacity: subtitleFade,
            }}
          >
            cắm thẳng API vào
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
          {/* Beat 2: Tool tags */}
          <div
            style={{
              display: 'flex',
              gap: sp.md,
              justifyContent: 'center',
              flexWrap: 'wrap',
              opacity: text1Fade,
              transform: `translateY(${text1Slide}px)`,
            }}
          >
            <span
              style={{
                ...tagStyle(theme.colors.primary),
                opacity: tag1Fade,
                transform: `scale(${tag1Scale})`,
              }}
            >
              OpenCode
            </span>
            <span
              style={{
                ...tagStyle(theme.colors.secondary),
                opacity: tag2Fade,
                transform: `scale(${tag2Scale})`,
              }}
            >
              Claude Code
            </span>
          </div>

          {/* Beat 3: "build app riêng dùng LLM" */}
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
            build app riêng dùng{' '}
            <span style={{ color: theme.colors.primary, fontWeight: 700 }}>
              LLM
            </span>
          </div>

          {/* Beat 4: "hay đơn giản là có một đống token miễn phí để nghịch" */}
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
            hay đơn giản là có một đống token{' '}
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
                  width: `${highlightWidth}%`,
                  height: '35%',
                  background: `${theme.colors.primary}30`,
                  borderRadius: sp.radiusSm / 2,
                }}
              />
              miễn phí
            </span>
            {' '}để nghịch cũng được
          </div>
        </div>
      </div>

      {/* ── Sound effects (local files — see src/local-sfx.ts) ── */}
      <Sequence from={5} layout="none">
        <Audio src={whip} volume={0.6} />
      </Sequence>
      <Sequence from={BEAT_2} layout="none">
        <Audio src={pageTurn} volume={0.5} />
      </Sequence>
      <Sequence from={BEAT_2 + 12} layout="none">
        <Audio src={uiSwitch} volume={0.5} />
      </Sequence>
      <Sequence from={BEAT_2 + 18} layout="none">
        <Audio src={uiSwitch} volume={0.5} />
      </Sequence>
      <Sequence from={BEAT_3} layout="none">
        <Audio src={pageTurn} volume={0.5} />
      </Sequence>
      <Sequence from={BEAT_4} layout="none">
        <Audio src={whip} volume={0.5} />
      </Sequence>
      <Sequence from={BEAT_4 + 14} layout="none">
        <Audio src={ding} volume={0.35} />
      </Sequence>
    </AbsoluteFill>
  );
};

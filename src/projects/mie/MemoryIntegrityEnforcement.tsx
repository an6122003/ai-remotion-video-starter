import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  ding,
  pageTurn,
  uiSwitch,
  whip,
  whoosh,
  windowsXpError,
} from '../../local-sfx';
import {
  CLAMP,
  EASING,
  SLIDE,
  animatedGradientBg,
  glassCard,
  glowSpots,
  gridPatternStyle,
  useLayout,
  useSpacing,
  useTypography,
} from '../../design-system';
import { theme } from './theme';

const FPS = 30;
const SHOT_2 = Math.round(3.0 * FPS);
const SHOT_3 = Math.round(6.1 * FPS);

type MemoryCell = {
  label: string;
  tag: string;
  color: string;
  denied?: boolean;
};

const cells: MemoryCell[] = [
  { label: 'User Data', tag: 'U-17', color: theme.colors.secondary },
  { label: 'Kernel Data', tag: 'K-02', color: theme.colors.primary },
  { label: 'Sensitive', tag: 'S-91', color: theme.colors.warning, denied: true },
  { label: 'App State', tag: 'A-44', color: theme.colors.positive },
  { label: 'Keys', tag: 'S-91', color: theme.colors.warning, denied: true },
  { label: 'Runtime', tag: 'R-08', color: theme.colors.secondary },
  { label: 'Buffers', tag: 'B-12', color: theme.colors.primary },
  { label: 'Private', tag: 'P-64', color: theme.colors.warning, denied: true },
  { label: 'Sandbox', tag: 'X-10', color: theme.colors.positive },
];

const clampProgress = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], { easing: EASING.smooth, ...CLAMP });

const LockIcon: React.FC<{ size: number; color: string; opacity?: number }> = ({
  size,
  color,
  opacity = 1,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={{ opacity }}
  >
    <rect
      x="5"
      y="10"
      width="14"
      height="10"
      rx="2.5"
      stroke={color}
      strokeWidth="1.7"
    />
    <path
      d="M8 10V7.8C8 5.45 9.7 4 12 4s4 1.45 4 3.8V10"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const MemoryCellBlock: React.FC<{
  cell: MemoryCell;
  index: number;
  frame: number;
}> = ({ cell, index, frame }) => {
  const { vmin } = useLayout();
  const font = useTypography();
  const sp = useSpacing();
  const intro = clampProgress(frame, 40 + index * 4, 72 + index * 4);
  const isAllowedTarget = index === 4;
  const allowedOpen = interpolate(frame, [SHOT_2 + 55, SHOT_2 + 78], [0, 1], {
    easing: EASING.bounce,
    ...CLAMP,
  });
  const deniedFlash = cell.denied
    ? Math.max(
        interpolate(frame, [SHOT_2 + 90, SHOT_2 + 100, SHOT_2 + 116], [0, 1, 0], CLAMP),
        interpolate(frame, [SHOT_3 + index * 5, SHOT_3 + index * 5 + 7, SHOT_3 + index * 5 + 20], [0, 1, 0], CLAMP),
      )
    : 0;
  const scale = isAllowedTarget
    ? interpolate(allowedOpen, [0, 1], [1, 1.06], CLAMP)
    : interpolate(deniedFlash, [0, 1], [1, 0.96], CLAMP);
  const borderColor = deniedFlash > 0.1
    ? theme.colors.negative
    : isAllowedTarget && allowedOpen > 0.5
      ? theme.colors.positive
      : theme.colors.cyanBorder;

  return (
    <div
      style={{
        ...glassCard({
          borderColor,
          borderRadius: sp.radiusMd,
        }),
        position: 'relative',
        aspectRatio: '1 / 1',
        padding: sp.md,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity: intro,
        transform: `translateY(${interpolate(intro, [0, 1], [vmin(5), 0], CLAMP)}px) scale(${scale})`,
        background: deniedFlash > 0.1
          ? `linear-gradient(135deg, rgba(244,63,94,${0.28 * deniedFlash}), rgba(8,18,33,0.76))`
          : isAllowedTarget && allowedOpen > 0.45
            ? `linear-gradient(135deg, rgba(52,211,153,${0.2 * allowedOpen}), rgba(8,18,33,0.72))`
            : theme.gradients.vault,
        boxShadow: deniedFlash > 0.1
          ? `0 0 ${vmin(5)}px ${theme.colors.deniedGlow}`
          : isAllowedTarget && allowedOpen > 0.45
            ? `0 0 ${vmin(5)}px ${theme.colors.allowedGlow}`
            : `0 0 ${vmin(3)}px rgba(34,211,238,0.12)`,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: sp.xs,
        }}
      >
        <div
          style={{
            width: vmin(4),
            height: vmin(1.2),
            borderRadius: sp.radiusSm,
            background: cell.color,
            boxShadow: `0 0 ${vmin(2)}px ${cell.color}80`,
          }}
        />
        <LockIcon
          size={vmin(5)}
          color={deniedFlash > 0.1 ? theme.colors.negative : theme.colors.lock}
          opacity={0.9}
        />
      </div>
      <div>
        <div
          style={{
            color: theme.colors.textPrimary,
            fontSize: font.caption,
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          {cell.label}
        </div>
        <div
          style={{
            color: cell.color,
            fontSize: font.caption * 0.82,
            fontWeight: 700,
            marginTop: sp.xs,
            letterSpacing: 0,
          }}
        >
          TAG {cell.tag}
        </div>
      </div>
    </div>
  );
};

const ProcessPacket: React.FC<{
  frame: number;
  start: number;
  top: number;
  allowed?: boolean;
  label?: string;
}> = ({ frame, start, top, allowed = false, label = 'Process' }) => {
  const { vw, vmin } = useLayout();
  const font = useTypography();
  const sp = useSpacing();
  const progress = interpolate(frame, [start, start + 58], [0, 1], {
    easing: EASING.gentle,
    ...CLAMP,
  });
  const blocked = interpolate(frame, [start + 42, start + 58, start + 75], [0, 1, 0], CLAMP);
  const x = allowed
    ? interpolate(progress, [0, 1], [vw(6), vw(51)], CLAMP)
    : interpolate(progress, [0, 0.72, 1], [vw(6), vw(55), vw(42)], CLAMP);
  const opacity = interpolate(frame, [start, start + 10, start + 84], [0, 1, allowed ? 1 : 0], CLAMP);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top,
        opacity,
        display: 'flex',
        alignItems: 'center',
        gap: sp.xs,
        padding: `${sp.xs}px ${sp.sm}px`,
        borderRadius: sp.radiusMd,
        background: allowed
          ? 'rgba(34, 211, 238, 0.18)'
          : `rgba(244, 63, 94, ${0.16 + blocked * 0.14})`,
        border: `1px solid ${allowed ? theme.colors.primary : theme.colors.negative}`,
        color: theme.colors.textPrimary,
        fontSize: font.caption,
        fontWeight: 700,
        boxShadow: `0 0 ${vmin(3)}px ${allowed ? 'rgba(34,211,238,0.35)' : 'rgba(244,63,94,0.35)'}`,
        transform: `scale(${interpolate(blocked, [0, 1], [1, 0.88], CLAMP)})`,
        zIndex: 8,
      }}
    >
      <span
        style={{
          width: vmin(2.3),
          height: vmin(2.3),
          borderRadius: '50%',
          background: allowed ? theme.colors.primary : theme.colors.negative,
          boxShadow: `0 0 ${vmin(2)}px ${allowed ? theme.colors.primary : theme.colors.negative}`,
        }}
      />
      {label}
    </div>
  );
};

export const MemoryIntegrityEnforcement: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const { vh, vw, vmin } = useLayout();
  const font = useTypography();
  const sp = useSpacing();

  const gradientAngle = interpolate(frame, [0, durationInFrames - 1], [0, 160], CLAMP);
  const bg = animatedGradientBg(gradientAngle, [
    [theme.colors.background, '0%'],
    [theme.colors.backgroundAlt, '48%'],
    [theme.colors.background, '100%'],
  ]);
  const glows = glowSpots([
    { x: '52%', y: '18%', color: theme.colors.primary, opacity: 0.14 },
    { x: '18%', y: '64%', color: theme.colors.secondary, opacity: 0.09 },
    { x: '86%', y: '70%', color: theme.colors.primary, opacity: 0.06 },
  ]);

  const chipIntro = clampProgress(frame, 0, 32);
  const chipOpen = clampProgress(frame, 36, 78);
  const gridReveal = clampProgress(frame, 56, 96);
  const chipExit = interpolate(frame, [62, 94], [1, 0], {
    easing: EASING.smooth,
    ...CLAMP,
  });
  const cameraZoom = interpolate(frame, [0, 86], [0.84, 1], {
    easing: EASING.smooth,
    ...CLAMP,
  });
  const titleFade = interpolate(frame, [10, 30, durationInFrames - 28, durationInFrames - 8], [0, 1, 1, 0], CLAMP);
  const conceptFade = interpolate(frame, [SHOT_2 + 20, SHOT_2 + 42, durationInFrames - 28, durationInFrames - 8], [0, 1, 1, 0], CLAMP);
  const blockedFade = interpolate(frame, [SHOT_3 + 14, SHOT_3 + 34], [0, 1], {
    easing: EASING.smooth,
    ...CLAMP,
  });
  const scannerSweep = interpolate(frame, [SHOT_2 + 20, SHOT_2 + 58], [vw(22), vw(74)], {
    easing: EASING.gentle,
    ...CLAMP,
  });
  const scannerOpacity = Math.max(
    interpolate(frame, [SHOT_2 + 10, SHOT_2 + 24, SHOT_2 + 70, SHOT_2 + 84], [0, 1, 1, 0], CLAMP),
    interpolate(frame, [SHOT_3, SHOT_3 + 18, SHOT_3 + 80], [0, 1, 0.45], CLAMP),
  );
  const scannerLoop = vw(23) + ((frame - SHOT_3) % 58) / 58 * vw(52);
  const scannerX = frame < SHOT_3 ? scannerSweep : scannerLoop;

  return (
    <AbsoluteFill
      style={{
        background: `${glows}, ${bg}`,
        fontFamily: theme.fontFamily,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          ...gridPatternStyle(theme.colors.primary, sp.xxl, 0.03),
          opacity: interpolate(frame, [0, 30], [0, 1], CLAMP),
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${cameraZoom})`,
          transformOrigin: '50% 48%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: vw(18),
            right: vw(18),
            top: vh(26),
            height: vh(24),
            borderRadius: sp.radiusLg,
            background: theme.gradients.chip,
            border: `1px solid ${theme.colors.whiteBorder}`,
            boxShadow: `0 ${vmin(3)}px ${vmin(10)}px rgba(0,0,0,0.45), inset 0 0 ${vmin(8)}px rgba(34,211,238,0.08)`,
            opacity: chipIntro * chipExit,
            transform: `translateY(${interpolate(chipIntro, [0, 1], [vh(4), 0], CLAMP)}px) perspective(${vw(100)}px) rotateX(${interpolate(chipOpen, [0, 1], [0, 70], CLAMP)}deg) scale(${interpolate(chipExit, [0, 1], [1.08, 1], CLAMP)})`,
            transformOrigin: '50% 100%',
            zIndex: 2,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: sp.lg,
              border: `1px solid ${theme.colors.cyanBorder}`,
              borderRadius: sp.radiusMd,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: sp.xl,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.colors.textPrimary,
              fontSize: font.heading,
              fontWeight: 800,
              letterSpacing: 0,
            }}
          >
            A19
          </div>
          <div
            style={{
              position: 'absolute',
              left: sp.xl,
              bottom: sp.lg,
              color: theme.colors.textMuted,
              fontSize: font.caption,
              fontWeight: 700,
              letterSpacing: 0,
            }}
          >
            hardware memory tags
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: vw(11),
            right: vw(11),
            top: vh(29),
            height: vh(45),
            borderRadius: sp.radiusLg,
            padding: sp.lg,
            background: 'rgba(2, 6, 23, 0.44)',
            border: `1px solid ${theme.colors.cyanBorder}`,
            boxShadow: `0 0 ${vmin(8)}px rgba(34,211,238,0.13), inset 0 0 ${vmin(8)}px rgba(96,165,250,0.05)`,
            opacity: gridReveal,
            transform: `translateY(${interpolate(gridReveal, [0, 1], [vh(6), 0], CLAMP)}px)`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: sp.md,
              left: sp.lg,
              right: sp.lg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: theme.colors.textMuted,
              fontSize: font.caption,
              fontWeight: 700,
              letterSpacing: 0,
            }}
          >
            <span>MEMORY VAULT GRID</span>
            <span>TAG CHECK ACTIVE</span>
          </div>

          <div
            style={{
              position: 'absolute',
              left: scannerX,
              top: vh(5),
              bottom: vh(4),
              width: vmin(0.6),
              opacity: scannerOpacity,
              background: `linear-gradient(180deg, transparent, ${theme.colors.scanner}, transparent)`,
              boxShadow: `0 0 ${vmin(4)}px ${theme.colors.scanner}`,
              zIndex: 7,
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: sp.md,
              height: '100%',
              paddingTop: sp.xxl,
            }}
          >
            {cells.map((cell, index) => (
              <MemoryCellBlock
                key={`${cell.label}-${cell.tag}`}
                cell={cell}
                index={index}
                frame={frame}
              />
            ))}
          </div>
        </div>

        <ProcessPacket
          frame={frame}
          start={SHOT_2 + 6}
          top={vh(52)}
          allowed
          label="Process TAG S-91"
        />
        <ProcessPacket
          frame={frame}
          start={SHOT_2 + 66}
          top={vh(43)}
          label="Process TAG U-17"
        />
        <ProcessPacket
          frame={frame}
          start={SHOT_3 + 10}
          top={vh(39)}
          label="Wrong tag"
        />
        <ProcessPacket
          frame={frame}
          start={SHOT_3 + 32}
          top={vh(57)}
          label="Wrong tag"
        />
      </div>

      <div
        style={{
          position: 'absolute',
          top: vh(7),
          left: vw(8),
          right: vw(8),
          opacity: titleFade,
          transform: `translateY(${interpolate(titleFade, [0, 1], [-vh(SLIDE.normal), 0], CLAMP)}px)`,
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: font.title,
            fontWeight: 850,
            lineHeight: 1.05,
            background: theme.gradients.title,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          MEMORY INTEGRITY ENFORCEMENT
        </div>
        <div
          style={{
            marginTop: sp.sm,
            color: theme.colors.textSecondary,
            fontSize: font.body,
            fontWeight: 600,
          }}
        >
          Hardware-level memory checking
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: vw(8),
          right: vw(8),
          bottom: vh(10),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: sp.sm,
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        <div
          style={{
            color: theme.colors.textPrimary,
            fontSize: font.heading,
            fontWeight: 760,
            lineHeight: 1.18,
            opacity: conceptFade,
            transform: `translateY(${interpolate(conceptFade, [0, 1], [vh(SLIDE.normal), 0], CLAMP)}px)`,
            textShadow: `0 0 ${vmin(4)}px rgba(34,211,238,0.22)`,
          }}
        >
          MIE kiểm tra việc truy cập bộ nhớ
          <br />
          <span style={{ color: theme.colors.highlight }}>ở cấp độ phần cứng.</span>
        </div>
        <div
          style={{
            ...glassCard({
              borderColor: theme.colors.negative,
              borderRadius: sp.radiusMd,
            }),
            padding: `${sp.sm}px ${sp.lg}px`,
            color: theme.colors.textPrimary,
            fontSize: font.body,
            fontWeight: 800,
            opacity: blockedFade,
            background: 'rgba(244, 63, 94, 0.14)',
            boxShadow: `0 0 ${vmin(5)}px rgba(244,63,94,0.25)`,
          }}
        >
          Wrong tag = blocked.
        </div>
      </div>

      <Sequence layout="none">
        <Audio src={whoosh} volume={0.48} />
      </Sequence>
      <Sequence from={36} layout="none">
        <Audio src={pageTurn} volume={0.32} />
      </Sequence>
      <Sequence from={SHOT_2 + 18} layout="none">
        <Audio src={whip} volume={0.36} />
      </Sequence>
      <Sequence from={SHOT_2 + 58} layout="none">
        <Audio src={ding} volume={0.34} />
      </Sequence>
      <Sequence from={SHOT_2 + 96} layout="none">
        <Audio src={uiSwitch} volume={0.42} />
      </Sequence>
      <Sequence from={SHOT_3 + 18} layout="none">
        <Audio src={windowsXpError} volume={0.18} />
      </Sequence>
      <Sequence from={SHOT_3 + 42} layout="none">
        <Audio src={uiSwitch} volume={0.38} />
      </Sequence>
    </AbsoluteFill>
  );
};

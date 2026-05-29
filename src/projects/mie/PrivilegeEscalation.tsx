import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { ding, pageTurn, uiSwitch, whip, whoosh } from '../../local-sfx';
import {
  CLAMP,
  EASING,
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
const SHOT_2 = Math.round(2.35 * FPS);
const SHOT_3 = Math.round(4.7 * FPS);
const SHOT_4 = Math.round(7.45 * FPS);

type Floor = {
  label: string;
  caption: string;
  locked?: boolean;
};

const floors: Floor[] = [
  { label: 'Root', caption: 'Full control', locked: true },
  { label: 'Kernel', caption: 'Protected core', locked: true },
  { label: 'System Services', caption: 'Privileged layer', locked: true },
  { label: 'App Level', caption: 'Allowed apps' },
  { label: 'Normal User', caption: 'Limited permissions' },
];

const progress = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], { easing: EASING.smooth, ...CLAMP });

const LockIcon: React.FC<{
  size: number;
  color: string;
  open?: boolean;
  opacity?: number;
}> = ({ size, color, open = false, opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ opacity }}>
    <rect
      x="5"
      y="10"
      width="14"
      height="10"
      rx="2.5"
      stroke={color}
      strokeWidth="1.8"
    />
    <path
      d={open ? 'M9 10V7.8C9 5.5 10.4 4 12.6 4c1.05 0 1.95.28 2.65.82' : 'M8 10V7.8C8 5.45 9.7 4 12 4s4 1.45 4 3.8V10'}
      stroke={color}
      strokeLinecap="round"
      strokeWidth="1.8"
    />
  </svg>
);

const UserIcon: React.FC<{
  size: number;
  color: string;
}> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <circle
      cx="32"
      cy="23"
      r="10"
      stroke={color}
      strokeWidth="4"
    />
    <path
      d="M15 53C18.2 42.8 23.7 38 32 38s13.8 4.8 17 15"
      stroke={color}
      strokeLinecap="round"
      strokeWidth="4"
    />
  </svg>
);

const CrownBadge: React.FC<{
  size: number;
  reveal: number;
}> = ({ size, reveal }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 28"
    fill="none"
    style={{
      opacity: reveal,
      transform: `translateY(${interpolate(reveal, [0, 1], [8, 0], CLAMP)}px) scale(${interpolate(reveal, [0, 1], [0.55, 1], {
        easing: EASING.bounce,
        ...CLAMP,
      })})`,
    }}
  >
    <path
      d="M5 24h30l-3-13-8 8-4-13-4 13-8-8-3 13Z"
      fill={theme.colors.warning}
      stroke={theme.colors.textPrimary}
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const FloorRow: React.FC<{
  floor: Floor;
  index: number;
  frame: number;
}> = ({ floor, index, frame }) => {
  const { vmin, vh } = useLayout();
  const font = useTypography();
  const sp = useSpacing();
  const intro = progress(frame, index * 5, 28 + index * 5);
  const rootReached = progress(frame, SHOT_4, SHOT_4 + 22);
  const chainActive = progress(frame, SHOT_3 + 18, SHOT_3 + 44);
  const isRoot = index === 0;
  const isNormal = index === floors.length - 1;
  const isLocked = floor.locked && !(isRoot && rootReached > 0.55);
  const activeGlow = isRoot ? rootReached : isNormal ? interpolate(frame, [18, 36, SHOT_3, SHOT_3 + 20], [0, 1, 1, 0.28], CLAMP) : 0;
  const warningPulse = floor.locked
    ? interpolate(Math.sin((frame + index * 9) / 7), [-1, 1], [0.12, 0.32], CLAMP)
    : 0;

  return (
    <div
      style={{
        ...glassCard({
          borderRadius: sp.radiusMd,
          borderColor: isRoot && rootReached > 0.5
            ? theme.colors.warning
            : isLocked
              ? `${theme.colors.negative}80`
              : theme.colors.cyanBorder,
          bg: isRoot && rootReached > 0.45
            ? 'rgba(62, 42, 9, 0.54)'
            : isNormal
              ? 'rgba(8, 28, 42, 0.74)'
              : 'rgba(8, 18, 33, 0.74)',
        }),
        height: vh(10.6),
        padding: `${sp.sm}px ${sp.md}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        opacity: intro,
        transform: `translateX(${interpolate(intro, [0, 1], [-vmin(6), 0], CLAMP)}px)`,
        boxShadow: `0 0 ${vmin(5)}px rgba(${isRoot ? '251,191,36' : isNormal ? '34,211,238' : '244,63,94'},${Math.max(activeGlow * 0.3, warningPulse)})`,
      }}
    >
      <div>
        <div
          style={{
            color: isRoot && rootReached > 0.4 ? theme.colors.warning : theme.colors.textPrimary,
            fontSize: isRoot ? font.heading : font.body,
            fontWeight: 850,
            lineHeight: 1,
          }}
        >
          {floor.label}
        </div>
        <div
          style={{
            color: isRoot && rootReached > 0.5 ? theme.colors.textPrimary : theme.colors.textMuted,
            fontSize: font.caption,
            fontWeight: 750,
            marginTop: sp.xs,
          }}
        >
          {floor.caption}
        </div>
      </div>
      <LockIcon
        size={vmin(5.5)}
        color={
          isRoot && rootReached > 0.5
            ? theme.colors.warning
            : isLocked
              ? theme.colors.negative
              : theme.colors.primary
        }
        open={chainActive > 0.65 || rootReached > 0.45}
        opacity={floor.locked || isRoot ? 1 : 0.35}
      />
    </div>
  );
};

export const PrivilegeEscalation: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const { vh, vw, vmin } = useLayout();
  const font = useTypography();
  const sp = useSpacing();

  const gradientAngle = interpolate(frame, [0, durationInFrames - 1], [0, 150], CLAMP);
  const bg = animatedGradientBg(gradientAngle, [
    [theme.colors.background, '0%'],
    [theme.colors.backgroundAlt, '52%'],
    [theme.colors.background, '100%'],
  ]);
  const glows = glowSpots([
    { x: '50%', y: '22%', color: theme.colors.warning, opacity: 0.08 },
    { x: '32%', y: '64%', color: theme.colors.primary, opacity: 0.11 },
    { x: '76%', y: '76%', color: theme.colors.secondary, opacity: 0.08 },
  ]);

  const towerIntro = progress(frame, 0, 34);
  const denied = interpolate(frame, [SHOT_2, SHOT_2 + 18, SHOT_3 - 10, SHOT_3 + 10], [0, 1, 1, 0], CLAMP);
  const chainActive = progress(frame, SHOT_3, SHOT_3 + 34);
  const chainLabel = interpolate(frame, [SHOT_3, SHOT_3 + 34, SHOT_4 - 10, SHOT_4 + 8], [0, 1, 1, 0], CLAMP);
  const lockGlitch = interpolate(frame, [SHOT_3 + 34, SHOT_3 + 39, SHOT_3 + 44, SHOT_3 + 49], [0, 1, -1, 0], CLAMP);
  const jump = interpolate(frame, [SHOT_3 + 40, SHOT_4 + 6], [0, 1], {
    easing: EASING.smooth,
    ...CLAMP,
  });
  const rootReached = progress(frame, SHOT_4, SHOT_4 + 20);
  const blockedAttempt = interpolate(frame, [SHOT_2 - 8, SHOT_2 + 18, SHOT_2 + 34], [0, 1, 0], {
    easing: EASING.gentle,
    ...CLAMP,
  });

  const floorGap = vh(1.5);
  const floorHeight = vh(10.6);
  const stackTop = vh(20.5);
  const stackLeft = vw(18);
  const stackWidth = vw(64);
  const normalY = stackTop + (floors.length - 1) * (floorHeight + floorGap) + floorHeight / 2;
  const rootY = stackTop + floorHeight / 2;
  const deniedY = stackTop + 2.15 * (floorHeight + floorGap) + floorHeight / 2;
  const attemptY = interpolate(blockedAttempt, [0, 0.72, 1], [normalY, deniedY, normalY + vh(0.8)], CLAMP);
  const elevatorY = jump > 0.01 ? interpolate(jump, [0, 1], [normalY, rootY], CLAMP) : attemptY;
  const userX = stackLeft + stackWidth / 2;
  const elevatorSize = vmin(17);
  const iconColor = rootReached > 0.35 ? theme.colors.warning : theme.colors.primary;

  const shot1Text = interpolate(frame, [14, 30, SHOT_2 - 10, SHOT_2 + 8], [0, 1, 1, 0], CLAMP);
  const shot2Text = interpolate(frame, [SHOT_2 + 5, SHOT_2 + 18, SHOT_3 - 10, SHOT_3 + 8], [0, 1, 1, 0], CLAMP);
  const shot3Text = interpolate(frame, [SHOT_3 + 8, SHOT_3 + 26, SHOT_4 - 8, SHOT_4 + 8], [0, 1, 1, 0], CLAMP);
  const shot4Text = interpolate(frame, [SHOT_4, SHOT_4 + 24], [0, 1], {
    easing: EASING.smooth,
    ...CLAMP,
  });

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
          ...gridPatternStyle(theme.colors.primary, sp.xxl, 0.026),
          opacity: interpolate(frame, [0, 28], [0, 1], CLAMP),
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: vh(6.5),
          left: vw(8),
          right: vw(8),
          textAlign: 'center',
          opacity: progress(frame, 6, 24),
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: font.title,
            fontWeight: 880,
            lineHeight: 1.05,
            background: theme.gradients.title,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          PRIVILEGE ESCALATION
        </div>
        <div
          style={{
            marginTop: sp.sm,
            color: theme.colors.textSecondary,
            fontSize: font.body,
            fontWeight: 650,
          }}
        >
          Normal User to Root
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: stackLeft,
          top: stackTop,
          width: stackWidth,
          display: 'flex',
          flexDirection: 'column',
          gap: floorGap,
          opacity: towerIntro,
          transform: `translateY(${interpolate(towerIntro, [0, 1], [vh(4), 0], CLAMP)}px)`,
        }}
      >
        {floors.map((floor, index) => (
          <FloorRow key={floor.label} floor={floor} index={index} frame={frame} />
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          left: userX - elevatorSize / 2,
          top: elevatorY - elevatorSize / 2,
          width: elevatorSize,
          height: elevatorSize,
          borderRadius: sp.radiusLg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${rootReached > 0.4 ? theme.colors.warning : theme.colors.cyanBorder}`,
          background: rootReached > 0.35 ? 'rgba(62, 42, 9, 0.62)' : 'rgba(8, 18, 33, 0.72)',
          boxShadow: `0 0 ${vmin(6)}px rgba(${rootReached > 0.35 ? '251,191,36' : '34,211,238'},${0.22 + rootReached * 0.28})`,
          transform: `translateX(${lockGlitch * vmin(1.2)}px) scale(${interpolate(rootReached, [0, 1], [1, 1.08], CLAMP)})`,
          zIndex: 8,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: vmin(1.25),
            left: '50%',
            transform: 'translateX(-50%)',
            filter: `drop-shadow(0 0 ${vmin(1.5)}px rgba(251,191,36,0.7))`,
          }}
        >
          <CrownBadge size={vmin(5.7)} reveal={rootReached} />
        </div>
        <UserIcon size={vmin(10.8)} color={iconColor} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: userX - vmin(0.5),
          top: rootY + vmin(8),
          width: vmin(1),
          height: normalY - rootY - vmin(16),
          borderRadius: vmin(1),
          background: `linear-gradient(180deg, rgba(34,211,238,${0.08 + chainActive * 0.22}), rgba(251,191,36,${0.06 + rootReached * 0.3}))`,
          boxShadow: `0 0 ${vmin(5)}px rgba(34,211,238,${0.12 + chainActive * 0.25})`,
          opacity: towerIntro,
          zIndex: 3,
        }}
      />

      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${vw(100)} ${vh(100)}`}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 7,
          opacity: chainActive,
        }}
      >
        <path
          d={`M ${vw(17)} ${vh(68)} C ${vw(31)} ${vh(62)}, ${vw(25)} ${vh(48)}, ${vw(39)} ${vh(46)} S ${vw(43)} ${vh(41)}, ${vw(50)} ${vh(41)}`}
          fill="none"
          pathLength={1}
          stroke={theme.colors.warning}
          strokeDasharray={1}
          strokeDashoffset={1 - chainActive}
          strokeLinecap="round"
          strokeWidth={vmin(0.65)}
          style={{
            filter: `drop-shadow(0 0 ${vmin(1.6)}px rgba(251,191,36,0.7))`,
          }}
        />
        <path
          d={`M ${vw(17)} ${vh(68)} C ${vw(31)} ${vh(62)}, ${vw(25)} ${vh(48)}, ${vw(39)} ${vh(46)} S ${vw(43)} ${vh(41)}, ${vw(50)} ${vh(41)}`}
          fill="none"
          pathLength={1}
          stroke={theme.colors.textPrimary}
          strokeDasharray="0.025 0.1"
          strokeDashoffset={1 - ((frame * 0.018) % 1)}
          strokeLinecap="round"
          strokeWidth={vmin(0.32)}
          opacity={chainActive}
        />
      </svg>

      <div
        style={{
          ...glassCard({
            borderColor: chainActive > 0.5 ? theme.colors.warning : theme.colors.cyanBorder,
            borderRadius: sp.radiusMd,
            bg: 'rgba(8, 18, 33, 0.76)',
          }),
          position: 'absolute',
          left: vw(7),
          top: vh(64),
          width: vw(27),
          padding: `${sp.sm}px ${sp.md}px`,
          opacity: chainLabel,
          transform: `translateY(${interpolate(chainLabel, [0, 1], [vh(2), 0], CLAMP)}px)`,
          boxShadow: `0 0 ${vmin(5)}px rgba(251,191,36,${0.16 + chainActive * 0.16})`,
          zIndex: 8,
        }}
      >
        <div
          style={{
            color: theme.colors.warning,
            fontSize: font.caption,
            fontWeight: 850,
            textTransform: 'uppercase',
          }}
        >
          exploit chain
        </div>
        <div
          style={{
            color: theme.colors.textPrimary,
            fontSize: font.body,
            fontWeight: 820,
            lineHeight: 1.1,
            marginTop: sp.xs,
          }}
        >
          activates
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          right: vw(12),
          top: vh(41),
          opacity: denied,
          transform: `translateX(${interpolate(denied, [0, 1], [vw(3), 0], CLAMP)}px)`,
          zIndex: 9,
        }}
      >
        <div
          style={{
            ...glassCard({
              borderColor: theme.colors.negative,
              borderRadius: sp.radiusMd,
              bg: 'rgba(49, 12, 22, 0.76)',
            }),
            padding: `${sp.sm}px ${sp.md}px`,
            color: theme.colors.textPrimary,
            fontSize: font.body,
            fontWeight: 850,
            boxShadow: `0 0 ${vmin(5)}px rgba(244,63,94,0.28)`,
          }}
        >
          Access denied
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: vw(8),
          right: vw(8),
          bottom: vh(9.5),
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        <div
          style={{
            color: theme.colors.textPrimary,
            fontSize: font.heading,
            fontWeight: 850,
            lineHeight: 1.14,
            opacity: shot1Text,
          }}
        >
          Starts as: <span style={{ color: theme.colors.primary }}>Normal User</span>
        </div>
        <div
          style={{
            color: theme.colors.textPrimary,
            fontSize: font.heading,
            fontWeight: 850,
            lineHeight: 1.14,
            opacity: shot2Text,
            marginTop: -vh(4.2),
          }}
        >
          Protected levels above
        </div>
        <div
          style={{
            color: theme.colors.warning,
            fontSize: font.heading,
            fontWeight: 850,
            lineHeight: 1.14,
            opacity: shot3Text,
            marginTop: -vh(4.2),
            textShadow: `0 0 ${vmin(4)}px rgba(251,191,36,0.28)`,
          }}
        >
          Exploit chain activates
        </div>
        <div
          style={{
            color: theme.colors.textPrimary,
            fontSize: font.heading,
            fontWeight: 900,
            lineHeight: 1.12,
            opacity: shot4Text,
            marginTop: -vh(4.2),
            transform: `scale(${interpolate(shot4Text, [0, 1], [0.92, 1], {
              easing: EASING.bounce,
              ...CLAMP,
            })})`,
          }}
        >
          Ends as: <span style={{ color: theme.colors.warning }}>Root</span>
          <div
            style={{
              marginTop: sp.sm,
              color: theme.colors.highlight,
              fontSize: font.body,
              fontWeight: 850,
            }}
          >
            Normal User {'->'} Root
          </div>
        </div>
      </div>

      <Sequence layout="none">
        <Audio src={whoosh} volume={0.38} />
      </Sequence>
      <Sequence from={SHOT_2 - 8} layout="none">
        <Audio src={uiSwitch} volume={0.38} />
      </Sequence>
      <Sequence from={SHOT_3 + 6} layout="none">
        <Audio src={whip} volume={0.36} />
      </Sequence>
      <Sequence from={SHOT_3 + 40} layout="none">
        <Audio src={pageTurn} volume={0.34} />
      </Sequence>
      <Sequence from={SHOT_4 + 4} layout="none">
        <Audio src={ding} volume={0.42} />
      </Sequence>
    </AbsoluteFill>
  );
};

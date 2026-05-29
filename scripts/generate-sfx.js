/**
 * Generate high-quality SFX WAV files for Remotion compositions.
 * 
 * These are designed for modern motion graphics / UI animations:
 * - Deep whoosh-hit (sub-bass drop for hero titles)
 * - Airy swoosh variants (smooth digital air for text slides)
 * - UI tick (mechanical tap for highlights)
 * - Digital thud/lock (satisfying completion sound)
 * - Clean digital sweep (fast modern title entrance)
 * - Soft UI pop variants (tactile tag/pill pop-ins)
 * - Double-tick (quick attention-catch for keywords)
 * - Synth swell (subtle glow for keyword highlights)
 *
 * Run: node scripts/generate-sfx.js
 * Output: public/sfx/*.wav
 */
const fs = require('fs');
const path = require('path');

const SR = 44100;
const outDir = path.join(__dirname, '..', 'public', 'sfx');
fs.mkdirSync(outDir, { recursive: true });

// ── WAV Writer ──
function writeWav(filename, samples) {
  const n = samples.length;
  const buf = Buffer.alloc(44 + n * 2);
  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + n * 2, 4);
  buf.write('WAVE', 8);
  buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write('data', 36);
  buf.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) {
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, samples[i])) * 32767), 44 + i * 2);
  }
  fs.writeFileSync(path.join(outDir, filename), buf);
  console.log(`  ✓ ${filename} (${(n / SR).toFixed(2)}s)`);
}

// ── DSP Primitives ──
const rand = () => Math.random() * 2 - 1;
const sin = (t, f) => Math.sin(2 * Math.PI * f * t);

// Simple one-pole lowpass filter state
function lpf(cutoff) {
  const rc = 1 / (2 * Math.PI * cutoff);
  const dt = 1 / SR;
  const a = dt / (rc + dt);
  let y = 0;
  return (x) => { y += a * (x - y); return y; };
}

// Simple one-pole highpass
function hpf(cutoff) {
  const rc = 1 / (2 * Math.PI * cutoff);
  const dt = 1 / SR;
  const a = rc / (rc + dt);
  let prevX = 0, y = 0;
  return (x) => { y = a * (y + x - prevX); prevX = x; return y; };
}

// Bandpass = lowpass → highpass
function bpf(lo, hi) {
  const lp = lpf(hi);
  const hp = hpf(lo);
  return (x) => hp(lp(x));
}

// Exponential decay
const decay = (t, rate) => Math.exp(-t * rate);

// Smooth bell envelope
const bell = (t, dur) => Math.sin(Math.PI * t / dur);

// ADSR-ish envelope
function adsr(t, a, d, s, r, dur) {
  if (t < a) return t / a;
  if (t < a + d) return 1 - (1 - s) * ((t - a) / d);
  if (t < dur - r) return s;
  return s * ((dur - t) / r);
}

// ════════════════════════════════════════════
// SFX Generators
// ════════════════════════════════════════════

/**
 * 1. DEEP WHOOSH-HIT
 * Sub-bass transient + filtered noise sweep + tonal body.
 * For hero title entrances. Heavy, premium feel.
 */
function deepWhooshHit(dur = 0.55) {
  const n = Math.floor(SR * dur);
  const out = new Float64Array(n);
  const lp1 = lpf(300);  // filter the noise layer
  const lp2 = lpf(120);  // sub-bass filter

  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const p = t / dur;

    // Sub-bass hit: 40-60Hz with fast attack, medium decay
    const subFreq = 50 - 15 * p;
    const subEnv = decay(t, 6) * (t < 0.02 ? t / 0.02 : 1);
    const sub = sin(t, subFreq) * subEnv * 0.7;

    // Noise layer: filtered sweep from high to low
    const noiseCutoff = 2000 * decay(t, 8);
    const noiseEnv = bell(t, dur) * 0.5;
    const noise = lp1(rand()) * noiseEnv;

    // Tonal body: mid-frequency sine for warmth
    const body = sin(t, 80) * decay(t, 4) * 0.3;

    // Transient click at start
    const click = (t < 0.005) ? rand() * (1 - t / 0.005) * 0.6 : 0;

    out[i] = lp2(sub) + noise + body + click;
  }
  // Normalize
  const peak = out.reduce((m, v) => Math.max(m, Math.abs(v)), 0);
  for (let i = 0; i < n; i++) out[i] = (out[i] / peak) * 0.85;
  return out;
}

/**
 * 2. AIRY SWOOSH
 * Bandpass-filtered noise with smooth envelope.
 * For text slide-in animations. Light, digital feel.
 */
function airySwoosh(dur = 0.35, pitchMult = 1.0) {
  const n = Math.floor(SR * dur);
  const out = new Float64Array(n);
  const bp = bpf(400 * pitchMult, 3000 * pitchMult);
  const lp1 = lpf(6000);

  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const p = t / dur;

    // Smooth bell envelope, slightly front-loaded
    const env = Math.pow(Math.sin(Math.PI * p), 0.7);

    // Filtered noise with pitch sweep
    const raw = rand();
    const filtered = bp(raw);
    const smoothed = lp1(filtered);

    // Subtle tonal component for "air" quality
    const tone = sin(t, 800 * pitchMult + 400 * p) * 0.08;

    out[i] = (smoothed + tone) * env * 0.6;
  }
  const peak = out.reduce((m, v) => Math.max(m, Math.abs(v)), 0);
  for (let i = 0; i < n; i++) out[i] = (out[i] / peak) * 0.7;
  return out;
}

/**
 * 3. UI TICK
 * Very short mechanical tap. Like a keyboard key bottoming out.
 * For keyword highlight moments. Precise, non-lingering.
 */
function uiTick(dur = 0.06) {
  const n = Math.floor(SR * dur);
  const out = new Float64Array(n);
  const hp1 = hpf(2000);

  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const env = decay(t, 80);

    // Two layers: filtered noise transient + short resonant ping
    const noiseHit = hp1(rand()) * decay(t, 120) * 0.5;
    const ping = sin(t, 3500) * decay(t, 60) * 0.3;
    const body = sin(t, 1200) * decay(t, 50) * 0.2;

    out[i] = (noiseHit + ping + body) * env;
  }
  const peak = out.reduce((m, v) => Math.max(m, Math.abs(v)), 0);
  for (let i = 0; i < n; i++) out[i] = (out[i] / peak) * 0.75;
  return out;
}

/**
 * 4. DIGITAL THUD / LOCK
 * Low-mid "lock" sound with satisfying weight.
 * For final text emphasis. Grounds the message.
 */
function digitalThud(dur = 0.3) {
  const n = Math.floor(SR * dur);
  const out = new Float64Array(n);
  const lp1 = lpf(400);

  for (let i = 0; i < n; i++) {
    const t = i / SR;

    // Low thud: descending sine
    const freq = 150 - 80 * (t / dur);
    const thud = sin(t, freq) * decay(t, 10) * 0.6;

    // Mechanical click layer
    const click = (t < 0.008) ? rand() * (1 - t / 0.008) * 0.4 : 0;

    // Filtered noise for texture
    const texture = lp1(rand()) * decay(t, 20) * 0.15;

    // Subtle resonance
    const res = sin(t, 200) * decay(t, 15) * 0.2;

    out[i] = thud + click + texture + res;
  }
  const peak = out.reduce((m, v) => Math.max(m, Math.abs(v)), 0);
  for (let i = 0; i < n; i++) out[i] = (out[i] / peak) * 0.8;
  return out;
}

/**
 * 5. CLEAN DIGITAL SWEEP
 * Fast rising filtered noise. Modern, tech feel.
 * For secondary title entrances.
 */
function digitalSweep(dur = 0.4) {
  const n = Math.floor(SR * dur);
  const out = new Float64Array(n);

  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const p = t / dur;

    // Rising bandpass center frequency
    const centerFreq = 300 + 4000 * p * p;
    const bp = bpf(centerFreq * 0.5, centerFreq * 1.5);

    // Envelope: fast attack, smooth tail
    const env = (t < 0.03 ? t / 0.03 : 1) * decay(t, 4);

    const raw = rand();
    // Since bpf creates new filter each sample (bad), let's do it differently
    const tone = sin(t, centerFreq) * 0.3 + rand() * 0.7;
    const filtered = tone * env * 0.4;

    out[i] = filtered;
  }
  // Apply a proper bandpass across the whole signal
  const bp = bpf(200, 6000);
  for (let i = 0; i < n; i++) out[i] = bp(out[i]);

  const peak = out.reduce((m, v) => Math.max(m, Math.abs(v)), 0);
  for (let i = 0; i < n; i++) out[i] = (out[i] / peak) * 0.7;
  return out;
}

/**
 * 6. SOFT UI POP
 * Short resonant chirp. Like a water drop / bubble.
 * For tag/pill pop-in animations.
 */
function uiPop(dur = 0.12, pitchMult = 1.0) {
  const n = Math.floor(SR * dur);
  const out = new Float64Array(n);

  for (let i = 0; i < n; i++) {
    const t = i / SR;

    // Descending chirp — the "pop" quality
    const freq = (900 + 200 * decay(t, 30)) * pitchMult;
    const chirp = sin(t, freq) * decay(t, 25) * 0.5;

    // Soft noise transient
    const transient = rand() * decay(t, 80) * 0.15;

    // Harmonic overtone
    const overtone = sin(t, freq * 2.5) * decay(t, 40) * 0.15;

    out[i] = chirp + transient + overtone;
  }
  const peak = out.reduce((m, v) => Math.max(m, Math.abs(v)), 0);
  for (let i = 0; i < n; i++) out[i] = (out[i] / peak) * 0.75;
  return out;
}

/**
 * 7. DOUBLE-TICK
 * Two rapid ticks in succession. Catches the ear instantly.
 * For high-value keyword highlights.
 */
function doubleTick(dur = 0.15) {
  const n = Math.floor(SR * dur);
  const out = new Float64Array(n);
  const hp1 = hpf(1500);

  // Two tick positions
  const tick1Start = 0;
  const tick2Start = 0.06;

  for (let i = 0; i < n; i++) {
    const t = i / SR;
    let sig = 0;

    // Tick 1
    if (t >= tick1Start && t < tick1Start + 0.04) {
      const lt = t - tick1Start;
      sig += (hp1(rand()) * 0.4 + sin(lt, 3000) * 0.3) * decay(lt, 100);
    }

    // Tick 2 (slightly higher pitch)
    if (t >= tick2Start && t < tick2Start + 0.04) {
      const lt = t - tick2Start;
      sig += (rand() * 0.3 + sin(lt, 3800) * 0.3) * decay(lt, 100);
    }

    out[i] = sig;
  }
  const peak = out.reduce((m, v) => Math.max(m, Math.abs(v)), 0);
  for (let i = 0; i < n; i++) out[i] = (out[i] / peak) * 0.7;
  return out;
}

/**
 * 8. SYNTH SWELL
 * Subtle tonal swell for keyword "glow" effect.
 * Grows in then fades — like the word is shining.
 */
function synthSwell(dur = 0.5) {
  const n = Math.floor(SR * dur);
  const out = new Float64Array(n);
  const lp1 = lpf(4000);

  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const p = t / dur;

    // Swell envelope: slow attack, medium sustain, gentle fade
    const env = adsr(t, dur * 0.35, dur * 0.15, 0.7, dur * 0.3, dur);

    // Chord: root + fifth + octave
    const root = sin(t, 440) * 0.35;
    const fifth = sin(t, 660) * 0.2;
    const oct = sin(t, 880) * 0.15;

    // Subtle shimmer (amplitude modulation)
    const shimmer = 1 + 0.1 * sin(t, 6);

    // Noise texture for "air"
    const air = lp1(rand()) * 0.05;

    out[i] = (root + fifth + oct + air) * env * shimmer;
  }
  const peak = out.reduce((m, v) => Math.max(m, Math.abs(v)), 0);
  for (let i = 0; i < n; i++) out[i] = (out[i] / peak) * 0.6;
  return out;
}

// ════════════════════════════════════════════
// Generate all SFX
// ════════════════════════════════════════════

console.log('\nGenerating SFX to public/sfx/...\n');

// Keep the original remotion.media files as-is, just add new ones
writeWav('deep-whoosh-hit.wav', deepWhooshHit());
writeWav('airy-swoosh.wav', airySwoosh(0.35, 1.0));
writeWav('airy-swoosh-high.wav', airySwoosh(0.30, 1.3));
writeWav('ui-tick.wav', uiTick());
writeWav('digital-thud.wav', digitalThud());
writeWav('digital-sweep.wav', digitalSweep());
writeWav('ui-pop.wav', uiPop(0.12, 1.0));
writeWav('ui-pop-high.wav', uiPop(0.10, 1.25));
writeWav('double-tick.wav', doubleTick());
writeWav('synth-swell.wav', synthSwell());

console.log('\nDone! Custom SFX generated alongside existing remotion.media files.\n');

/**
 * Lightweight Web Audio API sound effects for Solitaire.
 * No external files — all sounds are synthesised on the fly.
 */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

export function playCardClick(): void {
  try {
    const ac = getCtx();
    const now = ac.currentTime;
    const bufferSize = ac.sampleRate * 0.04;
    const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3);
    }
    const source = ac.createBufferSource();
    source.buffer = buffer;
    const bp = ac.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 1800;
    bp.Q.value = 0.8;
    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.55, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    source.connect(bp);
    bp.connect(gain);
    gain.connect(ac.destination);
    source.start(now);
    source.stop(now + 0.05);
  } catch { /* non-critical */ }
}

export function playCardDrop(): void {
  try {
    const ac = getCtx();
    const now = ac.currentTime;
    const bufferSize = Math.floor(ac.sampleRate * 0.06);
    const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
    }
    const source = ac.createBufferSource();
    source.buffer = buffer;
    const lp = ac.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 900;
    lp.Q.value = 0.5;
    const bp = ac.createBiquadFilter();
    bp.type = 'peaking';
    bp.frequency.value = 300;
    bp.gain.value = 6;
    bp.Q.value = 1.2;
    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    source.connect(lp);
    lp.connect(bp);
    bp.connect(gain);
    gain.connect(ac.destination);
    source.start(now);
    source.stop(now + 0.07);
  } catch { /* non-critical */ }
}

export function playFoundationDrop(): void {
  try {
    const ac = getCtx();
    const now = ac.currentTime;
    const freqs = [880, 1320];
    freqs.forEach((freq, i) => {
      const osc = ac.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const gain = ac.createGain();
      const start = now + i * 0.04;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.25, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(start);
      osc.stop(start + 0.36);
    });
  } catch { /* non-critical */ }
}

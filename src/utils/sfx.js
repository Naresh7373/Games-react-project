// Tiny WebAudio SFX (no audio files)
let ctx;
const ensure = () => (ctx ??= new (window.AudioContext || window.webkitAudioContext)());

function tone(freq = 660, dur = 0.08, type = "sine", vol = 0.2) {
  const ac = ensure();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = vol;
  osc.connect(gain);
  gain.connect(ac.destination);
  const t = ac.currentTime;
  osc.start(t);
  gain.gain.setValueAtTime(vol, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.stop(t + dur);
}

export const sfx = {
  click() { tone(520, 0.06, "triangle", 0.2); },
  hover() { tone(900, 0.03, "sawtooth", 0.05); },
  flip()  { tone(740, 0.07, "square", 0.15); },
  match() { tone(540, 0.07); setTimeout(() => tone(760, 0.07), 80); },
  win()   { tone(660, 0.12); setTimeout(() => tone(880, 0.12), 120); setTimeout(() => tone(990, 0.14), 260); },
  lose()  { tone(260, 0.12); setTimeout(() => tone(180, 0.14), 130); },
  draw()  { tone(400, 0.08); },
};

// Simple audio context synthesizer to avoid external assets for strict offline capabilities
const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

export const playSound = (type: 'correct' | 'incorrect' | 'win' | 'select') => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  const now = audioCtx.currentTime;

  if (type === 'correct') {
    // Cheerful major chord arpeggio
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, now); // C5
    oscillator.frequency.setValueAtTime(659.25, now + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, now + 0.2); // G5
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    oscillator.start(now);
    oscillator.stop(now + 0.4);
  } else if (type === 'incorrect') {
    // Low buzzer
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(150, now);
    oscillator.frequency.linearRampToValueAtTime(100, now + 0.3);
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    oscillator.start(now);
    oscillator.stop(now + 0.3);
  } else if (type === 'select') {
    // Subtle click
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, now);
    gainNode.gain.setValueAtTime(0.05, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    oscillator.start(now);
    oscillator.stop(now + 0.05);
  } else if (type === 'win') {
    // Victory sequence
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gn = audioCtx.createGain();
      osc.connect(gn);
      gn.connect(audioCtx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.1);
      gn.gain.setValueAtTime(0.1, now + i * 0.1);
      gn.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.3);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.3);
    });
  }
};
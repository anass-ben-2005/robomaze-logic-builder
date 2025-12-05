// Web Audio API-based sound manager for pixel-perfect retro sounds
class SoundManager {
  private audioContext: AudioContext | null = null;
  private initialized = false;

  init() {
    if (this.initialized) return;
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.initialized = true;
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'square', volume = 0.3) {
    if (!this.audioContext) this.init();
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  playMove() {
    this.playTone(200, 0.1, 'square', 0.2);
  }

  playStar() {
    // Ascending arpeggio for star collection
    this.playTone(523, 0.1, 'square', 0.3); // C5
    setTimeout(() => this.playTone(659, 0.1, 'square', 0.3), 50); // E5
    setTimeout(() => this.playTone(784, 0.15, 'square', 0.3), 100); // G5
  }

  playWin() {
    // Victory fanfare
    const notes = [523, 659, 784, 1047]; // C E G C
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.2, 'square', 0.3), i * 150);
    });
  }

  playLose() {
    // Descending sad tones
    this.playTone(300, 0.2, 'sawtooth', 0.3);
    setTimeout(() => this.playTone(200, 0.3, 'sawtooth', 0.3), 150);
    setTimeout(() => this.playTone(100, 0.4, 'sawtooth', 0.2), 300);
  }

  playClick() {
    this.playTone(400, 0.05, 'square', 0.2);
  }

  playDrop() {
    this.playTone(150, 0.1, 'square', 0.2);
  }
}

export const soundManager = new SoundManager();

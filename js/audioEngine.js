/**
 * Melovia - Advanced Audio Engine v3
 * Karplus-Strong + Sustain/Release + Distortion + Efektler
 * Melovia v0.1 | Son güncelleme: 14 Şubat 2026
 */

class AudioEngine {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.compressor = null;
        this.reverb = null;
        this.distortion = null;
        this.isInitialized = false;

        // Active sustained notes (key -> {source, gainNode})
        this.sustainedNotes = new Map();
        this.activeNotes = new Map();

        // Effect settings
        this.settings = {
            volume: 0.75,
            reverbMix: 0.15,
            distortionAmount: 0,
            sustainEnabled: true,
            // Effect panel settings (UI only - no audio processing)
            chorusEnabled: false,
            chorusRate: 1.5,
            chorusDepth: 0.002,
            chorusMix: 0.3,
            delayEnabled: false,
            delayTime: 0.35,
            delayFeedback: 0.3,
            delayMix: 0.25,
            eqLow: 0,
            eqMid: 0,
            eqHigh: 0,
            ampPreset: 'clean'
        };

        // Amp presets (for UI display)
        this.ampPresets = {
            clean: { distortion: 0, eqLow: 2, eqMid: 0, eqHigh: 3, reverb: 0.2 },
            crunch: { distortion: 0.3, eqLow: 4, eqMid: 2, eqHigh: 4, reverb: 0.15 },
            highgain: { distortion: 0.7, eqLow: 6, eqMid: -2, eqHigh: 5, reverb: 0.1 },
            acoustic: { distortion: 0, eqLow: -2, eqMid: 3, eqHigh: 5, reverb: 0.25 },
            jazz: { distortion: 0.05, eqLow: 3, eqMid: -1, eqHigh: -2, reverb: 0.3 },
            metal: { distortion: 0.85, eqLow: 8, eqMid: -4, eqHigh: 6, reverb: 0.05 }
        };

        // String parameters
        this.stringParams = {
            1: { decay: 0.998, blend: 0.5, brightness: 1.0, attack: 0.8, bassBoost: 0 },
            2: { decay: 0.997, blend: 0.5, brightness: 0.9, attack: 0.7, bassBoost: 0 },
            3: { decay: 0.996, blend: 0.48, brightness: 0.8, attack: 0.6, bassBoost: 2 },
            4: { decay: 0.994, blend: 0.45, brightness: 0.6, attack: 0.5, bassBoost: 4 },
            5: { decay: 0.992, blend: 0.42, brightness: 0.4, attack: 0.4, bassBoost: 6 },
            6: { decay: 0.990, blend: 0.40, brightness: 0.3, attack: 0.35, bassBoost: 8 }
        };
    }

    async init() {
        if (this.isInitialized) return;

        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

            // === EFFECT CHAIN ===
            // Source -> Distortion -> Compressor -> [Dry + Reverb] -> Master -> Output

            // Distortion (waveshaper)
            this.distortion = this.createDistortion(0);

            // Compressor
            this.compressor = this.audioContext.createDynamicsCompressor();
            this.compressor.threshold.value = -18;
            this.compressor.knee.value = 20;
            this.compressor.ratio.value = 6;
            this.compressor.attack.value = 0.003;
            this.compressor.release.value = 0.15;

            // Master gain
            this.masterGain = this.audioContext.createGain();
            this.masterGain.gain.value = this.settings.volume;

            // Reverb
            this.reverb = await this.createReverb(2.0, 0.4);
            this.reverbGain = this.audioContext.createGain();
            this.reverbGain.gain.value = this.settings.reverbMix;

            // Dry path
            this.dryGain = this.audioContext.createGain();
            this.dryGain.gain.value = 1 - this.settings.reverbMix;

            // Connect chain
            this.distortion.connect(this.compressor);
            this.compressor.connect(this.dryGain);
            this.compressor.connect(this.reverb);

            this.dryGain.connect(this.masterGain);
            this.reverb.connect(this.reverbGain);
            this.reverbGain.connect(this.masterGain);

            this.masterGain.connect(this.audioContext.destination);

            this.isInitialized = true;
            console.log('🔊 Audio Engine v3 initialized (Sustain + Distortion)');
        } catch (error) {
            console.error('Audio init failed:', error);
        }
    }

    // === DISTORTION ===
    createDistortion(amount = 0) {
        const waveshaper = this.audioContext.createWaveShaper();
        waveshaper.curve = this.makeDistortionCurve(amount * 400);
        waveshaper.oversample = '4x';
        return waveshaper;
    }

    makeDistortionCurve(amount) {
        const samples = 44100;
        const curve = new Float32Array(samples);
        const deg = Math.PI / 180;

        for (let i = 0; i < samples; i++) {
            const x = (i * 2) / samples - 1;
            if (amount === 0) {
                curve[i] = x; // Clean signal
            } else {
                curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
            }
        }
        return curve;
    }

    setDistortion(amount) {
        this.settings.distortionAmount = amount;
        if (this.distortion) {
            this.distortion.curve = this.makeDistortionCurve(amount * 400);
        }
    }

    // === REVERB ===
    async createReverb(duration = 2.0, decay = 0.4) {
        const convolver = this.audioContext.createConvolver();
        const sampleRate = this.audioContext.sampleRate;
        const length = sampleRate * duration;
        const impulse = this.audioContext.createBuffer(2, length, sampleRate);

        for (let channel = 0; channel < 2; channel++) {
            const data = impulse.getChannelData(channel);
            for (let i = 0; i < length; i++) {
                const t = i / length;
                // More natural reverb decay
                data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay * 4) * Math.cos(t * Math.PI * 0.5);
            }
        }

        convolver.buffer = impulse;
        return convolver;
    }

    setReverbMix(value) {
        this.settings.reverbMix = value;
        if (this.reverbGain) this.reverbGain.gain.value = value;
        if (this.dryGain) this.dryGain.gain.value = 1 - value;
    }

    setVolume(value) {
        this.settings.volume = value / 100;
        if (this.masterGain) {
            this.masterGain.gain.value = this.settings.volume;
        }
    }

    // === SUSTAIN NOTE (hold key) ===
    startSustainedNote(noteKey, frequency, stringNum = 3) {
        if (!this.isInitialized) return;

        // Stop existing note on same key
        this.stopSustainedNote(noteKey);

        const params = this.stringParams[stringNum] || this.stringParams[3];
        const now = this.audioContext.currentTime;

        // Create oscillator-based sustained note
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        // Sawtooth for guitar-like harmonics
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(frequency, now);

        // Low-pass filter for warmth
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(frequency * 4 + 500, now);
        filter.Q.value = 1;

        // Attack envelope
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.3 * params.attack, now + 0.02);

        // Connect
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.distortion);

        oscillator.start(now);

        // Store for release
        this.sustainedNotes.set(noteKey, {
            oscillator,
            gainNode,
            filter,
            frequency,
            stringNum
        });

        return { oscillator, gainNode };
    }

    stopSustainedNote(noteKey) {
        const note = this.sustainedNotes.get(noteKey);
        if (note) {
            const now = this.audioContext.currentTime;

            // Release envelope (fade out)
            note.gainNode.gain.cancelScheduledValues(now);
            note.gainNode.gain.setValueAtTime(note.gainNode.gain.value, now);
            note.gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

            // Stop oscillator after release
            note.oscillator.stop(now + 0.35);

            this.sustainedNotes.delete(noteKey);
        }
    }

    // === KARPLUS-STRONG (single pluck) ===
    playGuitarNote(frequency, duration = 2.5, stringNum = 3) {
        if (!this.isInitialized) return;

        if (!stringNum) {
            stringNum = this.guessStringFromFrequency(frequency);
        }

        const params = this.stringParams[stringNum] || this.stringParams[3];
        const sampleRate = this.audioContext.sampleRate;
        const adjustedDuration = frequency < 150 ? duration * 1.5 : duration;
        const periodSamples = Math.round(sampleRate / frequency);
        const totalSamples = Math.round(sampleRate * adjustedDuration);

        const buffer = this.audioContext.createBuffer(1, totalSamples, sampleRate);
        const data = buffer.getChannelData(0);

        // Initial excitation
        const noiseBuffer = new Float32Array(periodSamples);

        if (frequency < 120) {
            for (let i = 0; i < periodSamples; i++) {
                const t = i / periodSamples;
                const fundamental = Math.sin(2 * Math.PI * t);
                const second = 0.5 * Math.sin(4 * Math.PI * t);
                const third = 0.25 * Math.sin(6 * Math.PI * t);
                const noise = (Math.random() * 2 - 1) * 0.15;
                noiseBuffer[i] = (fundamental + second + third + noise) * params.attack;
            }
        } else if (frequency < 250) {
            for (let i = 0; i < periodSamples; i++) {
                const t = i / periodSamples;
                const pluck = Math.sin(Math.PI * t) * 0.6;
                const noise = (Math.random() * 2 - 1) * 0.4;
                noiseBuffer[i] = (pluck + noise) * params.attack;
            }
        } else {
            for (let i = 0; i < periodSamples; i++) {
                const t = i / periodSamples;
                const pluck = Math.sin(Math.PI * t);
                const brightness = Math.sin(3 * Math.PI * t) * 0.3;
                const noise = (Math.random() * 2 - 1) * 0.5;
                noiseBuffer[i] = (pluck + brightness + noise) * params.attack;
            }
        }

        // Low-pass smoothing
        for (let pass = 0; pass < 2; pass++) {
            for (let i = 1; i < periodSamples - 1; i++) {
                noiseBuffer[i] = 0.25 * noiseBuffer[i - 1] + 0.5 * noiseBuffer[i] + 0.25 * noiseBuffer[i + 1];
            }
        }

        // Karplus-Strong loop
        for (let i = 0; i < totalSamples; i++) {
            if (i < periodSamples) {
                data[i] = noiseBuffer[i];
            } else {
                const prev = data[i - periodSamples];
                const next = data[i - periodSamples + 1] || prev;
                data[i] = params.decay * (params.blend * prev + (1 - params.blend) * next);

                if (frequency < 150 && i > periodSamples * 2) {
                    const idx3 = i - periodSamples - 1;
                    if (idx3 >= 0) {
                        data[i] = 0.7 * data[i] + 0.3 * data[idx3];
                    }
                }
            }
        }

        // Envelope
        for (let i = 0; i < totalSamples; i++) {
            const t = i / totalSamples;
            const decayRate = frequency < 150 ? 2 : 3.5;
            data[i] *= Math.exp(-decayRate * t);
        }

        // Play buffer
        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;

        const lowShelf = this.audioContext.createBiquadFilter();
        lowShelf.type = 'lowshelf';
        lowShelf.frequency.value = 200;
        lowShelf.gain.value = params.bassBoost;

        const highShelf = this.audioContext.createBiquadFilter();
        highShelf.type = 'highshelf';
        highShelf.frequency.value = 3000;
        highShelf.gain.value = params.brightness * 4 - 2;

        const highPass = this.audioContext.createBiquadFilter();
        highPass.type = 'highpass';
        highPass.frequency.value = frequency < 100 ? 40 : 60;

        const noteGain = this.audioContext.createGain();
        noteGain.gain.value = frequency < 120 ? 1.0 : 0.85;

        source.connect(highPass);
        highPass.connect(lowShelf);
        lowShelf.connect(highShelf);
        highShelf.connect(noteGain);
        noteGain.connect(this.distortion);

        source.start();

        const noteId = Date.now() + Math.random();
        this.activeNotes.set(noteId, source);
        source.onended = () => this.activeNotes.delete(noteId);

        return source;
    }

    guessStringFromFrequency(freq) {
        if (freq >= 330) return 1;
        if (freq >= 247) return 2;
        if (freq >= 196) return 3;
        if (freq >= 147) return 4;
        if (freq >= 110) return 5;
        return 6;
    }

    // Play by string and fret
    playGuitarString(stringNum, fret) {
        const openNotes = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'];
        const openNote = openNotes[stringNum - 1];
        const note = NoteMapping.transpose(openNote, fret);
        const frequency = NoteMapping.getFrequency(note);

        if (frequency) {
            return this.playGuitarNote(frequency, 2.5, stringNum);
        }
    }

    // Piano note
    playPianoNote(frequency, duration = 2) {
        if (!this.isInitialized) return;

        const now = this.audioContext.currentTime;
        const noteGain = this.audioContext.createGain();

        const harmonics = [
            { ratio: 1, amp: 1.0 },
            { ratio: 2, amp: 0.6 },
            { ratio: 3, amp: 0.4 },
            { ratio: 4, amp: 0.25 },
            { ratio: 5, amp: 0.15 },
            { ratio: 6, amp: 0.1 }
        ];

        const oscillators = [];

        harmonics.forEach(h => {
            const osc = this.audioContext.createOscillator();
            const oscGain = this.audioContext.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(frequency * h.ratio, now);

            const harmonicDecay = Math.pow(0.85, h.ratio - 1);
            oscGain.gain.setValueAtTime(h.amp * 0.25 * harmonicDecay, now);
            oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration * harmonicDecay);

            osc.connect(oscGain);
            oscGain.connect(noteGain);
            oscillators.push(osc);
        });

        noteGain.gain.setValueAtTime(0, now);
        noteGain.gain.linearRampToValueAtTime(0.7, now + 0.005);
        noteGain.gain.exponentialRampToValueAtTime(0.4, now + 0.08);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(Math.min(frequency * 10, 12000), now);

        noteGain.connect(filter);
        filter.connect(this.distortion);

        oscillators.forEach(osc => {
            osc.start(now);
            osc.stop(now + duration);
        });

        return oscillators[0];
    }

    playNoteName(noteName, duration = 2.5, type = 'guitar', stringNum = null) {
        const frequency = NoteMapping.getFrequency(noteName);
        if (!frequency) return null;

        if (type === 'guitar') {
            return this.playGuitarNote(frequency, duration, stringNum);
        } else {
            return this.playPianoNote(frequency, duration);
        }
    }

    playChord(notes, type = 'guitar') {
        const delay = 0.025;
        notes.forEach((note, i) => {
            setTimeout(() => {
                this.playNoteName(note, 2.5, type);
            }, i * delay * 1000);
        });
    }

    stopAll() {
        // Stop metronome
        this.stopMetronome();

        // Stop sustained notes
        this.sustainedNotes.forEach((note, key) => {
            this.stopSustainedNote(key);
        });

        // Stop buffer sources
        this.activeNotes.forEach((source) => {
            try { source.stop(); } catch (e) { }
        });
        this.activeNotes.clear();
    }

    // === EFFECT PANEL CONTROL FUNCTIONS ===

    setAmpPreset(presetName) {
        const preset = this.ampPresets[presetName];
        if (!preset) return;
        this.settings.ampPreset = presetName;
        this.setDistortion(preset.distortion);
        this.setReverbMix(preset.reverb);
        console.log(`🎸 Amp preset: ${presetName}`);
    }

    getAmpPresets() {
        return Object.keys(this.ampPresets);
    }

    // Chorus controls (UI state only)
    setChorusEnabled(enabled) {
        this.settings.chorusEnabled = enabled;
    }

    setChorusRate(rate) {
        this.settings.chorusRate = rate;
    }

    setChorusDepth(depth) {
        this.settings.chorusDepth = depth;
    }

    setChorusMix(mix) {
        this.settings.chorusMix = mix;
    }

    // Delay controls (UI state only)
    setDelayEnabled(enabled) {
        this.settings.delayEnabled = enabled;
    }

    setDelayTime(time) {
        this.settings.delayTime = time;
    }

    setDelayFeedback(feedback) {
        this.settings.delayFeedback = Math.min(feedback, 0.9);
    }

    setDelayMix(mix) {
        this.settings.delayMix = mix;
    }

    // EQ controls (UI state only)
    setEQ(low, mid, high) {
        this.settings.eqLow = low;
        this.settings.eqMid = mid;
        this.settings.eqHigh = high;
    }

    // === METRONOME ===
    metronomePlaying = false;
    metronomeInterval = null;
    metronomeBPM = 120;

    startMetronome(bpm = 120) {
        if (this.metronomePlaying) this.stopMetronome();

        this.metronomeBPM = bpm;
        this.metronomePlaying = true;
        const intervalMs = (60 / bpm) * 1000;
        let beat = 0;

        const playTick = () => {
            if (!this.isInitialized) return;

            const now = this.audioContext.currentTime;
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.frequency.value = beat % 4 === 0 ? 1000 : 800;
            gain.gain.setValueAtTime(beat % 4 === 0 ? 0.3 : 0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(now);
            osc.stop(now + 0.05);

            beat++;
        };

        playTick();
        this.metronomeInterval = setInterval(playTick, intervalMs);
    }

    stopMetronome() {
        this.metronomePlaying = false;
        if (this.metronomeInterval) {
            clearInterval(this.metronomeInterval);
            this.metronomeInterval = null;
        }
    }

    setMetronomeBPM(bpm) {
        if (this.metronomePlaying) {
            this.stopMetronome();
            this.startMetronome(bpm);
        } else {
            this.metronomeBPM = bpm;
        }
    }
}

const audioEngine = new AudioEngine();

// Resume audio context on interaction
['click', 'keydown', 'touchstart'].forEach(event => {
    document.addEventListener(event, () => {
        if (audioEngine.audioContext?.state === 'suspended') {
            audioEngine.audioContext.resume();
        }
    }, { once: false });
});

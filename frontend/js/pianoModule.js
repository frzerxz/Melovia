/**
 * Melovia - Piano Module
 */

const PianoModule = {
    currentOctave: 4,

    // White keys: C, D, E, F, G, A, B
    // Black keys: C#, D#, F#, G#, A#
    keyLayout: [
        { note: 'C', black: false, key: 'a' },
        { note: 'C#', black: true, key: 'w' },
        { note: 'D', black: false, key: 's' },
        { note: 'D#', black: true, key: 'e' },
        { note: 'E', black: false, key: 'd' },
        { note: 'F', black: false, key: 'f' },
        { note: 'F#', black: true, key: 't' },
        { note: 'G', black: false, key: 'g' },
        { note: 'G#', black: true, key: 'y' },
        { note: 'A', black: false, key: 'h' },
        { note: 'A#', black: true, key: 'u' },
        { note: 'B', black: false, key: 'j' },
        // Next octave
        { note: 'C', black: false, key: 'k', octaveUp: true },
        { note: 'C#', black: true, key: 'o', octaveUp: true },
        { note: 'D', black: false, key: 'l', octaveUp: true },
        { note: 'D#', black: true, key: 'p', octaveUp: true },
        { note: 'E', black: false, key: 'ş', octaveUp: true }
    ],

    init() {
        this.generateKeyboard();
        console.log('🎹 Piano Module initialized');
    },

    generateKeyboard() {
        const container = document.getElementById('pianoKeyboard');
        if (!container) return;

        let html = '';

        this.keyLayout.forEach((key, index) => {
            const octave = key.octaveUp ? this.currentOctave + 1 : this.currentOctave;
            const noteName = `${key.note}${octave}`;
            const blackClass = key.black ? 'black' : '';

            html += `
                <div class="piano-key ${blackClass}" 
                     data-note="${noteName}" 
                     data-key="${key.key}">
                    <span class="piano-key-label">${key.key.toUpperCase()}</span>
                </div>
            `;
        });

        container.innerHTML = html;
        this.bindEvents();
    },

    bindEvents() {
        document.querySelectorAll('.piano-key').forEach(key => {
            key.addEventListener('mousedown', () => {
                this.playNote(key.dataset.note);
                key.classList.add('active');
            });

            key.addEventListener('mouseup', () => {
                key.classList.remove('active');
            });

            key.addEventListener('mouseleave', () => {
                key.classList.remove('active');
            });
        });
    },

    handleKeyPress(key) {
        const keyData = this.keyLayout.find(k => k.key === key.toLowerCase());
        if (keyData) {
            const octave = keyData.octaveUp ? this.currentOctave + 1 : this.currentOctave;
            const noteName = `${keyData.note}${octave}`;
            this.playNote(noteName);

            // Highlight key
            const keyEl = document.querySelector(`.piano-key[data-key="${key.toLowerCase()}"]`);
            if (keyEl) {
                keyEl.classList.add('active');
                setTimeout(() => keyEl.classList.remove('active'), 200);
            }
        }
    },

    playNote(noteName) {
        if (typeof audioEngine !== 'undefined') {
            audioEngine.playNoteName(noteName, 2, 'piano');
        }
    },

    changeOctave(direction) {
        if (direction === 'up' && this.currentOctave < 6) {
            this.currentOctave++;
        } else if (direction === 'down' && this.currentOctave > 2) {
            this.currentOctave--;
        }
        this.generateKeyboard();
    }
};

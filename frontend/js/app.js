/**
 * Melovia - App Controller v3
 */

class MeloviaApp {
    constructor() {
        this.currentMode = 'guitar';
        this.audioReady = false;
    }

    async init() {
        console.log('🎵 Melovia starting...');

        GuitarModule.init();
        if (typeof PianoModule !== 'undefined') PianoModule.init();
        if (typeof LessonsModule !== 'undefined') LessonsModule.init();

        this.bindNav();
        this.bindKeys();
        this.bindControls();
        this.bindModals();

        console.log('✅ Ready!');
    }

    async initAudio() {
        if (this.audioReady) return;
        if (typeof audioEngine !== 'undefined') {
            await audioEngine.init();
            this.audioReady = true;
        }
    }

    bindNav() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.dataset.mode;
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.querySelectorAll('.mode-section').forEach(s => s.classList.remove('active'));
                document.getElementById(`${mode}Mode`)?.classList.add('active');
                this.currentMode = mode;
            });
        });
    }

    bindKeys() {
        document.addEventListener('keydown', async (e) => {
            if (!this.audioReady) await this.initAudio();

            const key = e.key;

            if (this.currentMode === 'guitar') {
                if (key === ' ') {
                    e.preventDefault();
                    audioEngine?.stopAll();
                    return;
                }
                if (key === '+' || key === '=') {
                    this.changeZone(1);
                    return;
                }
                if (key === 'ArrowRight') {
                    GuitarModule.shiftFrets('next');
                    return;
                }
                if (key === 'ArrowLeft') {
                    GuitarModule.shiftFrets('prev');
                    return;
                }
                GuitarModule.handleKeyPress(key);
            }
        });
    }

    changeZone(delta) {
        const newPair = Math.max(1, Math.min(3, GuitarModule.currentZonePair + delta));
        GuitarModule.setZonePair(newPair);
    }

    bindControls() {
        document.getElementById('prevZone')?.addEventListener('click', () => this.changeZone(-1));
        document.getElementById('nextZone')?.addEventListener('click', () => this.changeZone(1));

        document.querySelectorAll('.pair-card').forEach(card => {
            card.addEventListener('click', () => {
                GuitarModule.setZonePair(parseInt(card.dataset.pair));
            });
        });

        document.getElementById('prevFrets')?.addEventListener('click', () => GuitarModule.shiftFrets('prev'));
        document.getElementById('nextFrets')?.addEventListener('click', () => GuitarModule.shiftFrets('next'));

        document.getElementById('guitarType')?.addEventListener('change', (e) => {
            GuitarModule.currentType = e.target.value;
            GuitarModule.currentFretStart = 0;
            GuitarModule.generateFretboard();
            GuitarModule.updateFretRange();
        });

        document.getElementById('bentUpBtn')?.addEventListener('click', () => this.changeZone(1));
        document.getElementById('bentDownBtn')?.addEventListener('click', () => this.changeZone(-1));
        document.getElementById('muteBtn')?.addEventListener('click', () => audioEngine?.stopAll());
    }

    bindModals() {
        document.getElementById('settingsBtn')?.addEventListener('click', () => {
            document.getElementById('settingsModal')?.classList.add('active');
        });
        document.getElementById('closeSettings')?.addEventListener('click', () => {
            document.getElementById('settingsModal')?.classList.remove('active');
        });
        document.getElementById('helpBtn')?.addEventListener('click', () => {
            document.getElementById('helpModal')?.classList.add('active');
        });
        document.getElementById('closeHelp')?.addEventListener('click', () => {
            document.getElementById('helpModal')?.classList.remove('active');
        });

        document.querySelectorAll('.modal').forEach(m => {
            m.addEventListener('click', (e) => {
                if (e.target === m) m.classList.remove('active');
            });
        });

        document.getElementById('masterVolume')?.addEventListener('input', (e) => {
            audioEngine?.setVolume(e.target.value);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MeloviaApp().init();
});

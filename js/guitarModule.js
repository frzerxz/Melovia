/**
 * Melovia - Guitar Module v4
 * Advanced features: Chords, Alternate Tunings, Capo, Strum Mode
 */

const GuitarModule = {
    tuning: ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'],
    tuningLabels: ['E', 'B', 'G', 'D', 'A', 'E'],

    // Alternate tunings
    tunings: {
        standard: { notes: ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'], labels: ['E', 'B', 'G', 'D', 'A', 'E'] },
        dropD: { notes: ['E4', 'B3', 'G3', 'D3', 'A2', 'D2'], labels: ['E', 'B', 'G', 'D', 'A', 'D'] },
        openG: { notes: ['D4', 'B3', 'G3', 'D3', 'G2', 'D2'], labels: ['D', 'B', 'G', 'D', 'G', 'D'] },
        openD: { notes: ['D4', 'A3', 'F#3', 'D3', 'A2', 'D2'], labels: ['D', 'A', 'F#', 'D', 'A', 'D'] },
        dadgad: { notes: ['D4', 'A3', 'G3', 'D3', 'A2', 'D2'], labels: ['D', 'A', 'G', 'D', 'A', 'D'] },
        halfStepDown: { notes: ['D#4', 'A#3', 'F#3', 'C#3', 'G#2', 'D#2'], labels: ['Eb', 'Bb', 'Gb', 'Db', 'Ab', 'Eb'] }
    },
    currentTuning: 'standard',

    // Capo position (0 = no capo)
    capoPosition: 0,

    // Chord library - [string6, string5, string4, string3, string2, string1] (-1 = mute, 0 = open)
    chords: {
        // Major chords
        'C': { frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0], name: 'C Major' },
        'D': { frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2], name: 'D Major' },
        'E': { frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0], name: 'E Major' },
        'F': { frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1], name: 'F Major', barre: 1 },
        'G': { frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, 0, 0, 0, 3], name: 'G Major' },
        'A': { frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0], name: 'A Major' },
        'B': { frets: [-1, 2, 4, 4, 4, 2], fingers: [0, 1, 2, 3, 4, 1], name: 'B Major', barre: 2 },

        // Minor chords
        'Am': { frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0], name: 'A Minor' },
        'Bm': { frets: [-1, 2, 4, 4, 3, 2], fingers: [0, 1, 3, 4, 2, 1], name: 'B Minor', barre: 2 },
        'Cm': { frets: [-1, 3, 5, 5, 4, 3], fingers: [0, 1, 3, 4, 2, 1], name: 'C Minor', barre: 3 },
        'Dm': { frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1], name: 'D Minor' },
        'Em': { frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0], name: 'E Minor' },
        'Fm': { frets: [1, 3, 3, 1, 1, 1], fingers: [1, 3, 4, 1, 1, 1], name: 'F Minor', barre: 1 },
        'Gm': { frets: [3, 5, 5, 3, 3, 3], fingers: [1, 3, 4, 1, 1, 1], name: 'G Minor', barre: 3 },

        // 7th chords
        'A7': { frets: [-1, 0, 2, 0, 2, 0], fingers: [0, 0, 1, 0, 2, 0], name: 'A7' },
        'B7': { frets: [-1, 2, 1, 2, 0, 2], fingers: [0, 2, 1, 3, 0, 4], name: 'B7' },
        'C7': { frets: [-1, 3, 2, 3, 1, 0], fingers: [0, 3, 2, 4, 1, 0], name: 'C7' },
        'D7': { frets: [-1, -1, 0, 2, 1, 2], fingers: [0, 0, 0, 2, 1, 3], name: 'D7' },
        'E7': { frets: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0], name: 'E7' },
        'G7': { frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1], name: 'G7' },

        // Major 7th
        'Amaj7': { frets: [-1, 0, 2, 1, 2, 0], fingers: [0, 0, 2, 1, 3, 0], name: 'Amaj7' },
        'Cmaj7': { frets: [-1, 3, 2, 0, 0, 0], fingers: [0, 3, 2, 0, 0, 0], name: 'Cmaj7' },
        'Dmaj7': { frets: [-1, -1, 0, 2, 2, 2], fingers: [0, 0, 0, 1, 1, 1], name: 'Dmaj7' },
        'Fmaj7': { frets: [-1, -1, 3, 2, 1, 0], fingers: [0, 0, 3, 2, 1, 0], name: 'Fmaj7' },
        'Gmaj7': { frets: [3, 2, 0, 0, 0, 2], fingers: [2, 1, 0, 0, 0, 3], name: 'Gmaj7' }
    },

    guitarTypes: {
        'classical': { frets: 19 },
        'acoustic': { frets: 20 },
        'electric22': { frets: 22 }
    },

    inlayFrets: [3, 5, 7, 9, 12, 15, 17, 19, 21],
    doubleInlayFrets: [12],

    currentType: 'electric22',
    currentFretStart: 0,
    visibleFrets: 12,

    // Keyboard map - 4 rows x 6 columns = 24 keys for 6 strings x 4 frets
    keyRows: [
        ['1', '2', '3', '4', '5', '6'],      // Fret 0 (open strings)
        ['Q', 'W', 'E', 'R', 'T', 'Y'],      // Fret 1
        ['A', 'S', 'D', 'F', 'G', 'H'],      // Fret 2
        ['Z', 'X', 'C', 'V', 'B', 'N'],      // Fret 3
        ['7', '8', '9', '0', '*', '-'],      // Fret 4
        ['U', 'I', 'O', 'P', 'Ğ', 'Ü'],      // Fret 5
        ['J', 'K', 'L', 'Ş', 'İ', ','],      // Fret 6
        ['M', 'Ö', 'Ç', '.', '-', '"']       // Fret 7
    ],

    // Internal key mappings
    keyMappings: {},

    currentZonePair: 1,
    zonePairOffsets: { 1: 0, 2: 8, 3: 16 },

    init() {
        this.buildKeyMappings();
        this.generateFretboard();
        this.updateFretRange();
        console.log('🎸 Guitar Module v4 initialized (Chords + Tunings + Capo)');
    },

    // === TUNING METHODS ===
    setTuning(tuningName) {
        const tuning = this.tunings[tuningName];
        if (tuning) {
            this.currentTuning = tuningName;
            this.tuning = tuning.notes;
            this.tuningLabels = tuning.labels;
            this.generateFretboard();
            console.log(`🎵 Tuning changed to: ${tuningName}`);
        }
    },

    // === CAPO METHODS ===
    setCapo(fret) {
        this.capoPosition = Math.max(0, Math.min(fret, 12));
        this.generateFretboard();
        console.log(`🔧 Capo set to fret: ${this.capoPosition}`);
    },

    // === CHORD METHODS ===
    getChord(chordName) {
        return this.chords[chordName] || null;
    },

    playChord(chordName, strumDirection = 'down') {
        const chord = this.chords[chordName];
        if (!chord || typeof audioEngine === 'undefined') return;

        const notes = [];
        chord.frets.forEach((fret, i) => {
            if (fret >= 0) {
                const stringNum = 6 - i;
                const actualFret = fret + this.capoPosition;
                notes.push({ string: stringNum, fret: actualFret });
            }
        });

        audioEngine.playStrum(notes, strumDirection, 35);
        this.highlightChord(chord);
    },

    highlightChord(chord) {
        // Clear previous highlights
        document.querySelectorAll('.string-cell.chord-highlight').forEach(el => {
            el.classList.remove('chord-highlight');
        });

        // Highlight chord positions
        chord.frets.forEach((fret, i) => {
            if (fret >= 0) {
                const stringNum = 6 - i;
                const actualFret = fret + this.capoPosition;
                const cell = document.querySelector(`.string-cell[data-string="${stringNum}"][data-fret="${actualFret}"]`);
                if (cell) {
                    cell.classList.add('chord-highlight', 'active');
                    setTimeout(() => {
                        cell.classList.remove('active');
                    }, 500);
                }
            }
        });
    },

    getChordDiagramSVG(chordName, size = 100) {
        const chord = this.chords[chordName];
        if (!chord) return '';

        const padding = 10;
        const fretWidth = (size - padding * 2) / 5;
        const stringSpacing = (size - padding * 2) / 5;

        let svg = `<svg width="${size}" height="${size + 20}" viewBox="0 0 ${size} ${size + 20}">`;

        // Background
        svg += `<rect x="0" y="0" width="${size}" height="${size + 20}" fill="#1a1a24" rx="8"/>`;

        // Chord name
        svg += `<text x="${size / 2}" y="15" fill="#fff" font-size="12" text-anchor="middle" font-weight="bold">${chordName}</text>`;

        // Fret lines (horizontal)
        for (let f = 0; f <= 4; f++) {
            const y = 25 + f * fretWidth;
            svg += `<line x1="${padding}" y1="${y}" x2="${size - padding}" y2="${y}" stroke="#666" stroke-width="1"/>`;
        }

        // String lines (vertical)
        for (let s = 0; s < 6; s++) {
            const x = padding + s * stringSpacing;
            svg += `<line x1="${x}" y1="25" x2="${x}" y2="${25 + 4 * fretWidth}" stroke="#888" stroke-width="${1 + (5 - s) * 0.3}"/>`;
        }

        // Finger positions
        chord.frets.forEach((fret, i) => {
            const x = padding + i * stringSpacing;
            if (fret === -1) {
                // Muted string (X)
                svg += `<text x="${x}" y="22" fill="#f44" font-size="10" text-anchor="middle">✕</text>`;
            } else if (fret === 0) {
                // Open string (O)
                svg += `<circle cx="${x}" cy="22" r="3" fill="none" stroke="#4f4" stroke-width="1.5"/>`;
            } else {
                // Fretted note
                const y = 25 + (fret - 0.5) * fretWidth;
                svg += `<circle cx="${x}" cy="${y}" r="5" fill="#8b5cf6"/>`;
            }
        });

        svg += '</svg>';
        return svg;
    },

    buildKeyMappings() {
        this.keyMappings = {};
        this.keyRows.forEach((row, fretOffset) => {
            row.forEach((key, stringIndex) => {
                // String: 6=low E (index 5), 1=high E (index 0)
                // So string number = 6 - stringIndex
                const stringNum = 6 - stringIndex;
                this.keyMappings[key.toLowerCase()] = { string: stringNum, fret: fretOffset };
            });
        });
    },

    getNoteAtPosition(stringNum, fret) {
        const openNote = this.tuning[stringNum - 1];
        return NoteMapping.transpose(openNote, fret);
    },

    getKeyLabelForPosition(relativeFret, stringNum) {
        // relativeFret: 0-7, stringNum: 1-6
        // Convert stringNum to column index (1=high E -> column 5, 6=low E -> column 0)
        if (relativeFret < 0 || relativeFret >= this.keyRows.length) return '';
        const row = this.keyRows[relativeFret];
        const colIndex = 6 - stringNum;
        return row[colIndex] || '';
    },

    generateFretboard() {
        const container = document.getElementById('fretboard');
        if (!container) return;

        const guitarType = this.guitarTypes[this.currentType];
        const endFret = Math.min(this.currentFretStart + this.visibleFrets, guitarType.frets);
        const zoneOffset = this.zonePairOffsets[this.currentZonePair] || 0;

        let html = '';

        // String labels (left side)
        html += '<div class="string-labels">';
        this.tuningLabels.forEach(label => {
            html += `<div class="string-label">${label}</div>`;
        });
        html += '</div>';

        // Frets
        html += '<div class="frets-wrap">';

        for (let fret = this.currentFretStart; fret <= endFret; fret++) {
            const hasInlay = this.inlayFrets.includes(fret);
            const isDouble = this.doubleInlayFrets.includes(fret);
            const relativeFret = fret - zoneOffset;

            html += `<div class="fret" data-fret="${fret}">`;

            // Inlay dots (centered between strings)
            if (hasInlay && fret > 0) {
                if (isDouble) {
                    html += '<div class="inlay double-top"></div>';
                    html += '<div class="inlay double-bottom"></div>';
                } else {
                    html += '<div class="inlay single"></div>';
                }
            }

            // 6 String cells
            for (let string = 1; string <= 6; string++) {
                const note = this.getNoteAtPosition(string, fret);
                const noteDisplay = note ? note.replace(/[0-9]/g, '') : '';

                // Get key label
                let keyLabel = '';
                if (relativeFret >= 0 && relativeFret < this.keyRows.length) {
                    keyLabel = this.getKeyLabelForPosition(relativeFret, string);
                }

                html += `<div class="string-cell" data-string="${string}" data-fret="${fret}" data-note="${note}">`;

                // Key hint (only show if in current zone range)
                if (keyLabel && fret > 0) {
                    html += `<span class="key-hint">${keyLabel}</span>`;
                }

                html += `<div class="note-dot">${noteDisplay}</div>`;
                html += '</div>';
            }

            // Fret number - only on inlay frets
            if (hasInlay) {
                const highlight = fret === 12 ? 'highlight' : '';
                html += `<div class="fret-num ${highlight}">${fret}</div>`;
            }

            html += '</div>';
        }

        html += '</div>';

        container.innerHTML = html;
        this.bindEvents();
    },

    bindEvents() {
        document.querySelectorAll('.string-cell').forEach(cell => {
            cell.addEventListener('click', () => {
                const string = parseInt(cell.dataset.string);
                const fret = parseInt(cell.dataset.fret);
                this.playNote(string, fret);
            });
        });
    },

    playNote(string, fret) {
        const note = this.getNoteAtPosition(string, fret);
        if (note && typeof audioEngine !== 'undefined') {
            audioEngine.playGuitarString(string, fret);
        }
        this.showActive(string, fret);
        this.updateDisplay(note, string, fret);
    },

    showActive(string, fret) {
        document.querySelectorAll('.string-cell.active').forEach(el => el.classList.remove('active'));
        const cell = document.querySelector(`.string-cell[data-string="${string}"][data-fret="${fret}"]`);
        if (cell) {
            cell.classList.add('active');
            setTimeout(() => cell.classList.remove('active'), 400);
        }
    },

    updateDisplay(note, string, fret) {
        const nameEl = document.getElementById('currentNoteName');
        const freqEl = document.getElementById('currentNoteFreq');
        const posEl = document.getElementById('currentPosition');

        if (nameEl && typeof NoteMapping !== 'undefined') {
            const turkish = NoteMapping.getTurkishName(note);
            nameEl.textContent = `${note} (${turkish})`;
        }
        if (freqEl && typeof NoteMapping !== 'undefined') {
            const freq = NoteMapping.getFrequency(note);
            freqEl.textContent = `${freq?.toFixed(1) || '--'} Hz`;
        }
        if (posEl) {
            posEl.textContent = `Tel ${string}, Perde ${fret}`;
        }
    },

    handleKeyPress(key) {
        const mapping = this.keyMappings[key.toLowerCase()];
        if (mapping) {
            const zoneOffset = this.zonePairOffsets[this.currentZonePair] || 0;
            const actualFret = mapping.fret + zoneOffset;
            this.playNote(mapping.string, actualFret);
        }
    },

    setZonePair(pairNum) {
        this.currentZonePair = pairNum;

        document.querySelectorAll('.pair-card').forEach(el => {
            el.classList.toggle('active', parseInt(el.dataset.pair) === pairNum);
        });

        // Update zone display
        const zoneNames = {
            1: { num: '1', title: 'Zone 1 (0-3)' },
            2: { num: '3', title: 'Zone 3 (8-11)' },
            3: { num: '5', title: 'Zone 5 (16-19)' }
        };

        const info = zoneNames[pairNum];
        document.getElementById('zoneNumber').textContent = info.num;
        document.getElementById('zoneName').textContent = info.title;

        this.generateFretboard();
    },

    shiftFrets(direction) {
        const guitarType = this.guitarTypes[this.currentType];
        const maxStart = guitarType.frets - this.visibleFrets;

        if (direction === 'next') {
            this.currentFretStart = Math.min(this.currentFretStart + 4, maxStart);
        } else {
            this.currentFretStart = Math.max(this.currentFretStart - 4, 0);
        }

        this.generateFretboard();
        this.updateFretRange();
    },

    updateFretRange() {
        const el = document.getElementById('fretRange');
        if (el) {
            const end = this.currentFretStart + this.visibleFrets - 1;
            el.textContent = `Perde ${this.currentFretStart}-${end}`;
        }
    }
};

/**
 * Melovia - Guitar Module v3
 * Referans görsele uygun fretboard
 */

const GuitarModule = {
    tuning: ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'],
    tuningLabels: ['E', 'B', 'G', 'D', 'A', 'E'],

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
        console.log('🎸 Guitar Module v3 initialized');
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

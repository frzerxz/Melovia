/**
 * Melovia Full Song Data v2.0
 * Her şarkı için tam uzunlukta nota verileri
 * Intro + Verse + Chorus + Bridge + Outro
 * Bu dosya yüklendikten sonra tablatures ve lessonsData objelerini genişletir.
 */

(function() {
    'use strict';

    // Helper: Nota tekrarı oluştur
    function repeat(arr, times) {
        let result = [];
        for (let i = 0; i < times; i++) result = result.concat(arr);
        return result;
    }

    // ============================
    // FULL TABLATURE DATA
    // ============================

    const fullTablatureNotes = {

        // ─── SMOKE ON THE WATER ─── Full: Intro riff x4 + Verse x2 + Chorus + Outro
        'smoke': [
            // INTRO RIFF x1 (0-3-5 | 0-3-6-5 | 0-3-5-3-0)
            {s:4,f:0},{s:4,f:3},{s:4,f:5},
            {s:4,f:0},{s:4,f:3},{s:4,f:6},{s:4,f:5},
            {s:4,f:0},{s:4,f:3},{s:4,f:5},{s:4,f:3},{s:4,f:0},
            // INTRO RIFF x2
            {s:4,f:0},{s:4,f:3},{s:4,f:5},
            {s:4,f:0},{s:4,f:3},{s:4,f:6},{s:4,f:5},
            {s:4,f:0},{s:4,f:3},{s:4,f:5},{s:4,f:3},{s:4,f:0},
            // INTRO RIFF x3
            {s:4,f:0},{s:4,f:3},{s:4,f:5},
            {s:4,f:0},{s:4,f:3},{s:4,f:6},{s:4,f:5},
            {s:4,f:0},{s:4,f:3},{s:4,f:5},{s:4,f:3},{s:4,f:0},
            // INTRO RIFF x4
            {s:4,f:0},{s:4,f:3},{s:4,f:5},
            {s:4,f:0},{s:4,f:3},{s:4,f:6},{s:4,f:5},
            {s:4,f:0},{s:4,f:3},{s:4,f:5},{s:4,f:3},{s:4,f:0},
            // VERSE 1 - Power chords G5-Bb5-C5 progression
            {s:6,f:3},{s:5,f:5},{s:6,f:3},{s:5,f:5},
            {s:6,f:6},{s:5,f:8},{s:6,f:6},{s:5,f:8},
            {s:6,f:8},{s:5,f:10},{s:6,f:8},{s:5,f:10},
            {s:6,f:3},{s:5,f:5},{s:6,f:3},{s:5,f:5},
            // VERSE 1 riff reprise
            {s:4,f:0},{s:4,f:3},{s:4,f:5},
            {s:4,f:0},{s:4,f:3},{s:4,f:6},{s:4,f:5},
            {s:4,f:0},{s:4,f:3},{s:4,f:5},{s:4,f:3},{s:4,f:0},
            // VERSE 2 - same pattern
            {s:6,f:3},{s:5,f:5},{s:6,f:3},{s:5,f:5},
            {s:6,f:6},{s:5,f:8},{s:6,f:6},{s:5,f:8},
            {s:6,f:8},{s:5,f:10},{s:6,f:8},{s:5,f:10},
            {s:6,f:3},{s:5,f:5},{s:6,f:3},{s:5,f:5},
            // CHORUS - heavier power chords
            {s:6,f:3},{s:5,f:5},{s:4,f:5},
            {s:6,f:6},{s:5,f:8},{s:4,f:8},
            {s:6,f:8},{s:5,f:10},{s:4,f:10},
            {s:6,f:3},{s:5,f:5},{s:4,f:5},
            // OUTRO RIFF x2
            {s:4,f:0},{s:4,f:3},{s:4,f:5},
            {s:4,f:0},{s:4,f:3},{s:4,f:6},{s:4,f:5},
            {s:4,f:0},{s:4,f:3},{s:4,f:5},{s:4,f:3},{s:4,f:0},
            {s:4,f:0},{s:4,f:3},{s:4,f:5},
            {s:4,f:0},{s:4,f:3},{s:4,f:6},{s:4,f:5},
            {s:4,f:0},{s:4,f:3},{s:4,f:5},{s:4,f:3},{s:4,f:0}
        ],

        // ─── SEVEN NATION ARMY ─── Full: Riff x6 + Pre-chorus + Chorus + Outro
        'seven-nation': [
            // VERSE 1 - Riff x1
            {s:5,f:7},{s:5,f:7},{s:5,f:10},{s:5,f:7},{s:5,f:5},{s:5,f:3},{s:5,f:2},
            // Riff x2
            {s:5,f:7},{s:5,f:7},{s:5,f:10},{s:5,f:7},{s:5,f:5},{s:5,f:3},{s:5,f:2},
            // Riff x3
            {s:5,f:7},{s:5,f:7},{s:5,f:10},{s:5,f:7},{s:5,f:5},{s:5,f:3},{s:5,f:2},
            // Riff x4
            {s:5,f:7},{s:5,f:7},{s:5,f:10},{s:5,f:7},{s:5,f:5},{s:5,f:3},{s:5,f:2},
            // PRE-CHORUS - G5 A5 power chords
            {s:5,f:5},{s:5,f:5},{s:5,f:5},{s:5,f:5},
            {s:5,f:7},{s:5,f:7},{s:5,f:7},{s:5,f:7},
            // CHORUS - octave down
            {s:6,f:7},{s:6,f:7},{s:6,f:10},{s:6,f:7},{s:6,f:5},{s:6,f:3},{s:6,f:2},
            {s:6,f:7},{s:6,f:7},{s:6,f:10},{s:6,f:7},{s:6,f:5},{s:6,f:3},{s:6,f:2},
            // VERSE 2 - back to A string
            {s:5,f:7},{s:5,f:7},{s:5,f:10},{s:5,f:7},{s:5,f:5},{s:5,f:3},{s:5,f:2},
            {s:5,f:7},{s:5,f:7},{s:5,f:10},{s:5,f:7},{s:5,f:5},{s:5,f:3},{s:5,f:2},
            // PRE-CHORUS 2
            {s:5,f:3},{s:5,f:3},{s:5,f:5},{s:5,f:5},{s:5,f:7},{s:5,f:7},
            {s:5,f:3},{s:5,f:3},{s:5,f:2},{s:5,f:2},
            // CHORUS 2
            {s:6,f:7},{s:6,f:7},{s:6,f:10},{s:6,f:7},{s:6,f:5},{s:6,f:3},{s:6,f:2},
            {s:6,f:7},{s:6,f:7},{s:6,f:10},{s:6,f:7},{s:6,f:5},{s:6,f:3},{s:6,f:2},
            // OUTRO
            {s:5,f:7},{s:5,f:7},{s:5,f:10},{s:5,f:7},{s:5,f:5},{s:5,f:3},{s:5,f:2},
            {s:5,f:3},{s:5,f:2},{s:5,f:0}
        ],

        // ─── COME AS YOU ARE ─── Full: Intro x4 + Verse x2 + Chorus + Bridge + Outro
        'come-as': [
            // INTRO RIFF x1
            {s:1,f:0},{s:1,f:0},{s:1,f:1},{s:1,f:2},{s:2,f:2},{s:1,f:2},{s:1,f:1},{s:1,f:0},
            // INTRO x2
            {s:1,f:0},{s:1,f:0},{s:1,f:1},{s:1,f:2},{s:2,f:2},{s:1,f:2},{s:1,f:1},{s:1,f:0},
            // INTRO x3
            {s:1,f:0},{s:1,f:0},{s:1,f:1},{s:1,f:2},{s:2,f:2},{s:1,f:2},{s:1,f:1},{s:1,f:0},
            // INTRO x4
            {s:1,f:0},{s:1,f:0},{s:1,f:1},{s:1,f:2},{s:2,f:2},{s:1,f:2},{s:1,f:1},{s:1,f:0},
            // VERSE 1 - same riff x2
            {s:1,f:0},{s:1,f:0},{s:1,f:1},{s:1,f:2},{s:2,f:2},{s:1,f:2},{s:1,f:1},{s:1,f:0},
            {s:1,f:0},{s:1,f:0},{s:1,f:1},{s:1,f:2},{s:2,f:2},{s:1,f:2},{s:1,f:1},{s:1,f:0},
            // CHORUS - F#5 A5 power chords
            {s:6,f:2},{s:5,f:4},{s:4,f:4},{s:6,f:2},{s:5,f:4},{s:4,f:4},
            {s:5,f:0},{s:4,f:2},{s:3,f:2},{s:5,f:0},{s:4,f:2},{s:3,f:2},
            {s:6,f:2},{s:5,f:4},{s:4,f:4},{s:6,f:2},{s:5,f:4},{s:4,f:4},
            {s:5,f:0},{s:4,f:2},{s:3,f:2},{s:5,f:0},{s:4,f:2},{s:3,f:2},
            // VERSE 2 riff x2
            {s:1,f:0},{s:1,f:0},{s:1,f:1},{s:1,f:2},{s:2,f:2},{s:1,f:2},{s:1,f:1},{s:1,f:0},
            {s:1,f:0},{s:1,f:0},{s:1,f:1},{s:1,f:2},{s:2,f:2},{s:1,f:2},{s:1,f:1},{s:1,f:0},
            // BRIDGE - Bsus4 D
            {s:5,f:2},{s:4,f:4},{s:3,f:4},{s:2,f:4},
            {s:4,f:0},{s:3,f:2},{s:2,f:3},{s:1,f:2},
            {s:5,f:2},{s:4,f:4},{s:3,f:4},{s:2,f:4},
            {s:4,f:0},{s:3,f:2},{s:2,f:3},{s:1,f:2},
            // OUTRO riff x2
            {s:1,f:0},{s:1,f:0},{s:1,f:1},{s:1,f:2},{s:2,f:2},{s:1,f:2},{s:1,f:1},{s:1,f:0},
            {s:1,f:0},{s:1,f:0},{s:1,f:1},{s:1,f:2},{s:2,f:2},{s:1,f:2},{s:1,f:1},{s:1,f:0}
        ],

        // ─── WISH YOU WERE HERE ─── Full: Intro solo + Verse x2 + Chorus + Outro
        'wish-you-were-here': [
            // INTRO SOLO - Em7 picking
            {s:6,f:0},{s:1,f:3},{s:2,f:3},{s:3,f:0},{s:4,f:0},{s:4,f:2},{s:5,f:2},
            {s:6,f:0},{s:1,f:3},{s:2,f:3},{s:3,f:0},{s:4,f:0},{s:4,f:2},{s:5,f:2},
            // G picking
            {s:6,f:3},{s:1,f:3},{s:2,f:3},{s:3,f:0},{s:4,f:0},{s:4,f:2},{s:5,f:2},
            {s:6,f:3},{s:1,f:3},{s:2,f:3},{s:3,f:0},{s:4,f:0},{s:4,f:2},{s:5,f:2},
            // A7sus4
            {s:5,f:0},{s:2,f:0},{s:2,f:1},{s:2,f:0},{s:3,f:0},{s:4,f:2},
            {s:5,f:0},{s:2,f:0},{s:2,f:1},{s:2,f:0},{s:3,f:0},{s:4,f:2},
            // Solo melody - ascending lick
            {s:1,f:0},{s:1,f:3},{s:1,f:0},{s:2,f:0},{s:2,f:3},{s:3,f:0},{s:3,f:2},
            // VERSE 1 - Em7 strum pattern
            {s:6,f:0},{s:5,f:2},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:6,f:0},{s:5,f:2},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            // G strum
            {s:6,f:3},{s:5,f:2},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:6,f:3},{s:5,f:2},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            // Em7 → A7sus4
            {s:6,f:0},{s:5,f:2},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:5,f:0},{s:4,f:2},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            // CHORUS - C → D → Am → G
            {s:5,f:3},{s:4,f:2},{s:3,f:0},{s:2,f:1},{s:1,f:0},
            {s:4,f:0},{s:3,f:2},{s:2,f:3},{s:1,f:2},
            {s:5,f:0},{s:4,f:2},{s:3,f:2},{s:2,f:1},{s:1,f:0},
            {s:6,f:3},{s:5,f:2},{s:4,f:0},{s:3,f:0},{s:2,f:0},{s:1,f:3},
            // VERSE 2 - repeat verse pattern
            {s:6,f:0},{s:5,f:2},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:6,f:3},{s:5,f:2},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:6,f:0},{s:5,f:2},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:5,f:0},{s:4,f:2},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            // OUTRO - solo melody
            {s:1,f:0},{s:1,f:3},{s:1,f:5},{s:1,f:3},{s:1,f:0},{s:2,f:0},{s:2,f:3},
            {s:6,f:0},{s:1,f:3},{s:2,f:3},{s:3,f:0},{s:4,f:0},{s:4,f:2},
            {s:6,f:3},{s:1,f:3},{s:2,f:3},{s:3,f:0},{s:4,f:0}
        ],

        // ─── NOTHING ELSE MATTERS ─── Full: Intro x6 + Verse + Pre-chorus + Chorus + Outro
        'nothing-else-matters': [
            // INTRO - Em arpeggio pattern x6
            {s:6,f:0},{s:1,f:0},{s:2,f:0},{s:3,f:0},{s:5,f:2},{s:4,f:2},
            {s:6,f:0},{s:1,f:0},{s:2,f:0},{s:3,f:0},{s:5,f:0},{s:4,f:2},
            {s:6,f:0},{s:1,f:0},{s:2,f:0},{s:3,f:0},{s:5,f:2},{s:4,f:0},
            {s:6,f:0},{s:1,f:0},{s:2,f:0},{s:3,f:0},{s:5,f:0},{s:4,f:2},
            {s:6,f:0},{s:1,f:0},{s:2,f:0},{s:3,f:0},{s:5,f:2},{s:4,f:2},
            {s:6,f:0},{s:1,f:0},{s:2,f:0},{s:3,f:0},{s:5,f:0},{s:4,f:0},
            // VERSE 1 - Em
            {s:6,f:0},{s:1,f:0},{s:2,f:0},{s:3,f:0},{s:5,f:0},{s:4,f:0},
            {s:6,f:0},{s:1,f:0},{s:2,f:0},{s:3,f:0},{s:5,f:2},{s:4,f:2},
            // Verse - Am
            {s:5,f:0},{s:1,f:0},{s:2,f:1},{s:3,f:2},{s:4,f:2},
            {s:5,f:0},{s:1,f:0},{s:2,f:1},{s:3,f:2},{s:4,f:2},
            // Verse - C
            {s:5,f:3},{s:1,f:0},{s:2,f:1},{s:3,f:0},{s:4,f:2},
            {s:5,f:3},{s:1,f:0},{s:2,f:1},{s:3,f:0},{s:4,f:2},
            // Verse - D
            {s:4,f:0},{s:1,f:2},{s:2,f:3},{s:3,f:2},
            {s:4,f:0},{s:1,f:2},{s:2,f:3},{s:3,f:2},
            // PRE-CHORUS - Em → D → C
            {s:6,f:0},{s:5,f:2},{s:4,f:2},{s:3,f:0},{s:2,f:0},{s:1,f:0},
            {s:4,f:0},{s:3,f:2},{s:2,f:3},{s:1,f:2},
            {s:5,f:3},{s:4,f:2},{s:3,f:0},{s:2,f:1},{s:1,f:0},
            // CHORUS - G → B7 → Em
            {s:6,f:3},{s:5,f:2},{s:4,f:0},{s:3,f:0},{s:2,f:0},{s:1,f:3},
            {s:6,f:3},{s:5,f:2},{s:4,f:0},{s:3,f:0},{s:2,f:0},{s:1,f:3},
            {s:5,f:2},{s:4,f:1},{s:3,f:2},{s:2,f:0},{s:1,f:2},
            {s:5,f:2},{s:4,f:1},{s:3,f:2},{s:2,f:0},{s:1,f:2},
            {s:6,f:0},{s:5,f:2},{s:4,f:2},{s:3,f:0},{s:2,f:0},{s:1,f:0},
            // OUTRO - return to intro arpeggio
            {s:6,f:0},{s:1,f:0},{s:2,f:0},{s:3,f:0},{s:5,f:2},{s:4,f:2},
            {s:6,f:0},{s:1,f:0},{s:2,f:0},{s:3,f:0},{s:5,f:0},{s:4,f:2},
            {s:6,f:0},{s:1,f:0},{s:2,f:0},{s:3,f:0},{s:5,f:2},{s:4,f:0},
            {s:6,f:0},{s:1,f:0},{s:2,f:0},{s:3,f:0},{s:5,f:0},{s:4,f:0}
        ],

        // ─── WONDERWALL ─── Full: Intro + Verse x2 + Pre-chorus + Chorus x2 + Outro
        'wonderwall': [
            // INTRO Em7→G
            {s:6,f:0},{s:5,f:2},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:6,f:3},{s:5,f:0},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:5,f:0},{s:4,f:2},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:5,f:0},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            // VERSE 1 Em7→G→Dsus4→A7sus4 (x2)
            {s:6,f:0},{s:5,f:2},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:6,f:3},{s:5,f:0},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:5,f:0},{s:4,f:2},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:5,f:0},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:6,f:0},{s:5,f:2},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:6,f:3},{s:5,f:0},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:5,f:0},{s:4,f:2},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:5,f:0},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            // PRE-CHORUS Cadd9→Dsus4→Em7
            {s:5,f:3},{s:4,f:2},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:5,f:0},{s:4,f:2},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:6,f:0},{s:5,f:2},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:5,f:3},{s:4,f:2},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:5,f:0},{s:4,f:2},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:6,f:0},{s:5,f:2},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            // CHORUS Cadd9→Em7→G→Em7
            {s:5,f:3},{s:4,f:2},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:6,f:0},{s:5,f:2},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:6,f:3},{s:5,f:0},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:6,f:0},{s:5,f:2},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            // CHORUS repeat
            {s:5,f:3},{s:4,f:2},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:6,f:0},{s:5,f:2},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:6,f:3},{s:5,f:0},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:6,f:0},{s:5,f:2},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            // OUTRO Em7→G→Em7
            {s:6,f:0},{s:5,f:2},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:6,f:3},{s:5,f:0},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3},
            {s:6,f:0},{s:5,f:2},{s:4,f:0},{s:3,f:0},{s:2,f:3},{s:1,f:3}
        ],

        // ─── STAIRWAY TO HEAVEN ─── Full: Intro arpej x2 + Verse + Interlude + Solo hints
        'stairway': [
            // INTRO Am arpeggio
            {s:5,f:0},{s:4,f:7},{s:3,f:5},{s:2,f:5},{s:1,f:5},{s:2,f:5},{s:3,f:5},
            // Am(maj7)/G#
            {s:5,f:4},{s:4,f:6},{s:3,f:5},{s:2,f:5},{s:1,f:5},{s:2,f:5},{s:3,f:5},
            // Am7/G
            {s:5,f:5},{s:4,f:5},{s:3,f:5},{s:2,f:5},{s:1,f:5},{s:2,f:5},{s:3,f:5},
            // D/F#
            {s:5,f:0},{s:4,f:0},{s:3,f:2},{s:2,f:3},{s:1,f:2},{s:2,f:3},{s:3,f:2},
            // Fmaj7
            {s:4,f:3},{s:3,f:2},{s:2,f:1},{s:1,f:0},{s:2,f:1},{s:3,f:2},
            // G/B → Am
            {s:4,f:0},{s:3,f:0},{s:2,f:0},{s:1,f:3},{s:2,f:0},{s:3,f:0},
            {s:5,f:0},{s:4,f:2},{s:3,f:2},{s:2,f:1},{s:1,f:0},
            // INTRO REPEAT (x2)
            {s:5,f:0},{s:4,f:7},{s:3,f:5},{s:2,f:5},{s:1,f:5},{s:2,f:5},{s:3,f:5},
            {s:5,f:4},{s:4,f:6},{s:3,f:5},{s:2,f:5},{s:1,f:5},{s:2,f:5},{s:3,f:5},
            {s:5,f:5},{s:4,f:5},{s:3,f:5},{s:2,f:5},{s:1,f:5},{s:2,f:5},{s:3,f:5},
            {s:5,f:0},{s:4,f:0},{s:3,f:2},{s:2,f:3},{s:1,f:2},{s:2,f:3},{s:3,f:2},
            {s:4,f:3},{s:3,f:2},{s:2,f:1},{s:1,f:0},{s:2,f:1},{s:3,f:2},
            {s:4,f:0},{s:3,f:0},{s:2,f:0},{s:1,f:3},{s:2,f:0},{s:3,f:0},
            {s:5,f:0},{s:4,f:2},{s:3,f:2},{s:2,f:1},{s:1,f:0},
            // VERSE - Am E+/G# C/G D/F#
            {s:5,f:0},{s:4,f:2},{s:3,f:2},{s:2,f:1},{s:1,f:0},
            {s:5,f:4},{s:4,f:2},{s:3,f:1},{s:2,f:0},{s:1,f:0},
            {s:5,f:3},{s:4,f:2},{s:3,f:0},{s:2,f:1},{s:1,f:0},
            {s:4,f:0},{s:3,f:2},{s:2,f:3},{s:1,f:2},
            // INTERLUDE - D→Dsus4→D C(add9)→C
            {s:4,f:0},{s:3,f:2},{s:2,f:3},{s:1,f:2},{s:1,f:3},{s:1,f:2},
            {s:5,f:3},{s:4,f:2},{s:3,f:0},{s:2,f:3},{s:2,f:1},
            // Am7 → Dsus4 → Am → Am7/G
            {s:5,f:0},{s:4,f:0},{s:3,f:0},{s:2,f:1},{s:1,f:0},
            {s:4,f:0},{s:3,f:2},{s:2,f:3},{s:1,f:3},
            {s:5,f:0},{s:4,f:2},{s:3,f:2},{s:2,f:1},{s:1,f:0},
            {s:6,f:3},{s:5,f:0},{s:4,f:0},{s:3,f:0},{s:2,f:1},{s:1,f:0}
        ],

        // ─── HOTEL CALIFORNIA ─── Full: Intro + Verse + Chorus + Solo section + Outro
        'hotel-california': [
            // INTRO - Em (Bm) arpeggio
            {s:6,f:0},{s:5,f:2},{s:4,f:2},{s:3,f:0},{s:2,f:0},{s:1,f:0},{s:2,f:0},{s:3,f:0},
            // B7 (F#7)
            {s:5,f:2},{s:4,f:2},{s:3,f:4},{s:2,f:0},{s:1,f:0},{s:2,f:0},{s:3,f:4},
            // D (A)
            {s:4,f:0},{s:3,f:2},{s:2,f:3},{s:1,f:2},{s:2,f:3},{s:3,f:2},
            // A (E)
            {s:5,f:0},{s:4,f:2},{s:3,f:2},{s:2,f:2},{s:1,f:0},{s:2,f:2},{s:3,f:2},
            // C (G)
            {s:5,f:3},{s:4,f:2},{s:3,f:0},{s:2,f:1},{s:1,f:0},{s:2,f:1},{s:3,f:0},
            // G (D)
            {s:6,f:3},{s:4,f:0},{s:3,f:0},{s:2,f:0},{s:1,f:3},{s:2,f:0},{s:3,f:0},
            // Am (Em)
            {s:5,f:0},{s:4,f:2},{s:3,f:2},{s:2,f:1},{s:1,f:0},{s:2,f:1},{s:3,f:2},
            // B7 (F#7)
            {s:5,f:2},{s:4,f:1},{s:3,f:2},{s:2,f:0},{s:1,f:2},{s:2,f:0},{s:3,f:2},
            // VERSE - repeat progression with strum
            {s:6,f:0},{s:5,f:2},{s:4,f:2},{s:3,f:0},{s:2,f:0},{s:1,f:0},{s:2,f:0},{s:3,f:0},
            {s:5,f:2},{s:4,f:2},{s:3,f:4},{s:2,f:0},{s:1,f:0},{s:2,f:0},{s:3,f:4},
            {s:4,f:0},{s:3,f:2},{s:2,f:3},{s:1,f:2},{s:2,f:3},{s:3,f:2},
            {s:5,f:0},{s:4,f:2},{s:3,f:2},{s:2,f:2},{s:1,f:0},{s:2,f:2},{s:3,f:2},
            {s:5,f:3},{s:4,f:2},{s:3,f:0},{s:2,f:1},{s:1,f:0},{s:2,f:1},{s:3,f:0},
            {s:6,f:3},{s:4,f:0},{s:3,f:0},{s:2,f:0},{s:1,f:3},{s:2,f:0},{s:3,f:0},
            {s:5,f:0},{s:4,f:2},{s:3,f:2},{s:2,f:1},{s:1,f:0},{s:2,f:1},{s:3,f:2},
            {s:5,f:2},{s:4,f:1},{s:3,f:2},{s:2,f:0},{s:1,f:2},{s:2,f:0},{s:3,f:2},
            // CHORUS - same chords, heavier strum
            {s:6,f:0},{s:5,f:2},{s:4,f:2},{s:3,f:0},{s:2,f:0},{s:1,f:0},
            {s:5,f:2},{s:4,f:2},{s:3,f:4},{s:2,f:0},{s:1,f:0},
            {s:4,f:0},{s:3,f:2},{s:2,f:3},{s:1,f:2},
            {s:5,f:0},{s:4,f:2},{s:3,f:2},{s:2,f:2},{s:1,f:0},
            {s:5,f:3},{s:4,f:2},{s:3,f:0},{s:2,f:1},{s:1,f:0},
            {s:6,f:3},{s:4,f:0},{s:3,f:0},{s:2,f:0},{s:1,f:3},
            {s:5,f:0},{s:4,f:2},{s:3,f:2},{s:2,f:1},{s:1,f:0},
            {s:5,f:2},{s:4,f:1},{s:3,f:2},{s:2,f:0},{s:1,f:2}
        ]
    };

    // ============================
    // FULL LESSON SONG DATA
    // ============================

    const fullLessonNotes = {
        // Smoke on the Water (lesson 6) - expand to full
        6: [
            // RIFF x1
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'DO (C4)',s:3,f:5,key:'O'},
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'REb (Db4)',s:3,f:6,key:'L'},{note:'DO (C4)',s:3,f:5,key:'O'},
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'DO (C4)',s:3,f:5,key:'O'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            // RIFF x2
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'DO (C4)',s:3,f:5,key:'O'},
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'REb (Db4)',s:3,f:6,key:'L'},{note:'DO (C4)',s:3,f:5,key:'O'},
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'DO (C4)',s:3,f:5,key:'O'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            // RIFF x3
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'DO (C4)',s:3,f:5,key:'O'},
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'REb (Db4)',s:3,f:6,key:'L'},{note:'DO (C4)',s:3,f:5,key:'O'},
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'DO (C4)',s:3,f:5,key:'O'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            // RIFF x4
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'DO (C4)',s:3,f:5,key:'O'},
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'REb (Db4)',s:3,f:6,key:'L'},{note:'DO (C4)',s:3,f:5,key:'O'},
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'DO (C4)',s:3,f:5,key:'O'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            // VERSE power chords
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'RE (D3)',s:5,f:5,key:'Ğ'},
            {note:'Sİb (Bb2)',s:6,f:6,key:','},{note:'FA (F3)',s:5,f:8,key:'5'},
            {note:'DO (C3)',s:6,f:8,key:'6'},{note:'SOL (G3)',s:5,f:10,key:'G'},
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'RE (D3)',s:5,f:5,key:'Ğ'},
            // OUTRO riff x2
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'DO (C4)',s:3,f:5,key:'O'},
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'REb (Db4)',s:3,f:6,key:'L'},{note:'DO (C4)',s:3,f:5,key:'O'},
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'DO (C4)',s:3,f:5,key:'O'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            // VERSE 2 - Power chord ikinci ayet
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'RE (D3)',s:5,f:5,key:'Ğ'},
            {note:'Sİb (Bb2)',s:6,f:6,key:','},{note:'FA (F3)',s:5,f:8,key:'5'},
            {note:'DO (C3)',s:6,f:8,key:'6'},{note:'SOL (G3)',s:5,f:10,key:'G'},
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'RE (D3)',s:5,f:5,key:'Ğ'},
            // RIFF reprise x2
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'DO (C4)',s:3,f:5,key:'O'},
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'REb (Db4)',s:3,f:6,key:'L'},{note:'DO (C4)',s:3,f:5,key:'O'},
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'DO (C4)',s:3,f:5,key:'O'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            // GUITAR SOLO - Basit melodi (3. tel üzerinde)
            {note:'DO (C4)',s:3,f:5,key:'O'},{note:'REb (Db4)',s:3,f:6,key:'L'},{note:'DO (C4)',s:3,f:5,key:'O'},
            {note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},
            {note:'DO (C4)',s:3,f:5,key:'O'},{note:'REb (Db4)',s:3,f:6,key:'L'},{note:'DO (C4)',s:3,f:5,key:'O'},
            {note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            // FINAL RIFF x2 - kapanış
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'DO (C4)',s:3,f:5,key:'O'},
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'REb (Db4)',s:3,f:6,key:'L'},{note:'DO (C4)',s:3,f:5,key:'O'},
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'DO (C4)',s:3,f:5,key:'O'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'DO (C4)',s:3,f:5,key:'O'},
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'REb (Db4)',s:3,f:6,key:'L'},{note:'DO (C4)',s:3,f:5,key:'O'},
            {note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'DO (C4)',s:3,f:5,key:'O'},{note:'Sİb (Bb3)',s:3,f:3,key:'X'},{note:'SOL (G3)',s:3,f:0,key:'3'}
        ],

        // Seven Nation Army (lesson 7) - expand to full
        7: [
            // RIFF x1-4
            {note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'RE (D3)',s:5,f:5,key:'Ğ'},{note:'DO (C3)',s:5,f:3,key:'V'},{note:'Sİ (B2)',s:5,f:2,key:'G'},
            {note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'RE (D3)',s:5,f:5,key:'Ğ'},{note:'DO (C3)',s:5,f:3,key:'V'},{note:'Sİ (B2)',s:5,f:2,key:'G'},
            {note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'RE (D3)',s:5,f:5,key:'Ğ'},{note:'DO (C3)',s:5,f:3,key:'V'},{note:'Sİ (B2)',s:5,f:2,key:'G'},
            {note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'RE (D3)',s:5,f:5,key:'Ğ'},{note:'DO (C3)',s:5,f:3,key:'V'},{note:'Sİ (B2)',s:5,f:2,key:'G'},
            // PRE-CHORUS
            {note:'RE (D3)',s:5,f:5,key:'Ğ'},{note:'RE (D3)',s:5,f:5,key:'Ğ'},{note:'RE (D3)',s:5,f:5,key:'Ğ'},{note:'RE (D3)',s:5,f:5,key:'Ğ'},
            {note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'Mİ (E3)',s:5,f:7,key:'.'},
            // CHORUS octave lower
            {note:'Sİ (B2)',s:6,f:7,key:'"'},{note:'Sİ (B2)',s:6,f:7,key:'"'},{note:'RE (D3)',s:6,f:10,key:'H'},{note:'Sİ (B2)',s:6,f:7,key:'"'},{note:'LA (A2)',s:6,f:5,key:'Ü'},{note:'SOL (G2)',s:6,f:3,key:'B'},{note:'FA# (F#2)',s:6,f:2,key:'H'},
            {note:'Sİ (B2)',s:6,f:7,key:'"'},{note:'Sİ (B2)',s:6,f:7,key:'"'},{note:'RE (D3)',s:6,f:10,key:'H'},{note:'Sİ (B2)',s:6,f:7,key:'"'},{note:'LA (A2)',s:6,f:5,key:'Ü'},{note:'SOL (G2)',s:6,f:3,key:'B'},{note:'FA# (F#2)',s:6,f:2,key:'H'},
            // OUTRO
            {note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'RE (D3)',s:5,f:5,key:'Ğ'},{note:'DO (C3)',s:5,f:3,key:'V'},{note:'Sİ (B2)',s:5,f:2,key:'G'},
            {note:'DO (C3)',s:5,f:3,key:'V'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'LA (A2)',s:5,f:0,key:'5'},
            // VERSE 3 - Riff x4 devam
            {note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'RE (D3)',s:5,f:5,key:'Ğ'},{note:'DO (C3)',s:5,f:3,key:'V'},{note:'Sİ (B2)',s:5,f:2,key:'G'},
            {note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'RE (D3)',s:5,f:5,key:'Ğ'},{note:'DO (C3)',s:5,f:3,key:'V'},{note:'Sİ (B2)',s:5,f:2,key:'G'},
            {note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'RE (D3)',s:5,f:5,key:'Ğ'},{note:'DO (C3)',s:5,f:3,key:'V'},{note:'Sİ (B2)',s:5,f:2,key:'G'},
            {note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'RE (D3)',s:5,f:5,key:'Ğ'},{note:'DO (C3)',s:5,f:3,key:'V'},{note:'Sİ (B2)',s:5,f:2,key:'G'},
            // PRE-CHORUS 3
            {note:'RE (D3)',s:5,f:5,key:'Ğ'},{note:'RE (D3)',s:5,f:5,key:'Ğ'},{note:'RE (D3)',s:5,f:5,key:'Ğ'},{note:'RE (D3)',s:5,f:5,key:'Ğ'},
            {note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'Mİ (E3)',s:5,f:7,key:'.'},
            // FINAL CHORUS - yüksek seste (s6 derin ton)
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'SOL (G2)',s:6,f:3,key:'B'},{note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'DO (C3)',s:5,f:3,key:'V'},{note:'Sİ (B2)',s:5,f:2,key:'G'},
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'SOL (G2)',s:6,f:3,key:'B'},{note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'DO (C3)',s:5,f:3,key:'V'},{note:'Sİ (B2)',s:5,f:2,key:'G'},
            // OUTRO EXTENDED
            {note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Mİ (E3)',s:5,f:7,key:'.'},{note:'RE (D3)',s:5,f:5,key:'Ğ'},{note:'DO (C3)',s:5,f:3,key:'V'},{note:'Sİ (B2)',s:5,f:2,key:'G'},
            {note:'RE (D3)',s:5,f:5,key:'Ğ'},{note:'DO (C3)',s:5,f:3,key:'V'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'LA (A2)',s:5,f:0,key:'5'}
        ],

        // Come As You Are (lesson 8) - expand to full
        8: [
            // INTRO x4
            {note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'FA (F4)',s:1,f:1,key:'Q'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'FA (F4)',s:1,f:1,key:'Q'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'Sİ (B3)',s:2,f:0,key:'2'},
            {note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'FA (F4)',s:1,f:1,key:'Q'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'FA (F4)',s:1,f:1,key:'Q'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'Sİ (B3)',s:2,f:0,key:'2'},
            {note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'FA (F4)',s:1,f:1,key:'Q'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'FA (F4)',s:1,f:1,key:'Q'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'Sİ (B3)',s:2,f:0,key:'2'},
            {note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'FA (F4)',s:1,f:1,key:'Q'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'FA (F4)',s:1,f:1,key:'Q'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'Sİ (B3)',s:2,f:0,key:'2'},
            // CHORUS power chords
            {note:'FA# (F#2)',s:6,f:2,key:'H'},{note:'DO# (C#3)',s:5,f:4,key:'*'},{note:'FA# (F#2)',s:6,f:2,key:'H'},{note:'DO# (C#3)',s:5,f:4,key:'*'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'LA (A2)',s:5,f:0,key:'5'},{note:'Mİ (E3)',s:4,f:2,key:'F'},
            {note:'FA# (F#2)',s:6,f:2,key:'H'},{note:'DO# (C#3)',s:5,f:4,key:'*'},{note:'FA# (F#2)',s:6,f:2,key:'H'},{note:'DO# (C#3)',s:5,f:4,key:'*'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'LA (A2)',s:5,f:0,key:'5'},{note:'Mİ (E3)',s:4,f:2,key:'F'},
            // OUTRO riff x2
            {note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'FA (F4)',s:1,f:1,key:'Q'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'FA (F4)',s:1,f:1,key:'Q'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'Sİ (B3)',s:2,f:0,key:'2'},
            {note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'FA (F4)',s:1,f:1,key:'Q'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'Sİ (B3)',s:2,f:0,key:'2'},
            // VERSE 3 - riff x4
            {note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'FA (F4)',s:1,f:1,key:'Q'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'FA (F4)',s:1,f:1,key:'Q'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'Sİ (B3)',s:2,f:0,key:'2'},
            {note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'FA (F4)',s:1,f:1,key:'Q'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'FA (F4)',s:1,f:1,key:'Q'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'Sİ (B3)',s:2,f:0,key:'2'},
            // CHORUS 3 power chords
            {note:'FA# (F#2)',s:6,f:2,key:'H'},{note:'DO# (C#3)',s:5,f:4,key:'*'},{note:'FA# (F#2)',s:6,f:2,key:'H'},{note:'DO# (C#3)',s:5,f:4,key:'*'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'LA (A2)',s:5,f:0,key:'5'},{note:'Mİ (E3)',s:4,f:2,key:'F'},
            {note:'FA# (F#2)',s:6,f:2,key:'H'},{note:'DO# (C#3)',s:5,f:4,key:'*'},{note:'FA# (F#2)',s:6,f:2,key:'H'},{note:'DO# (C#3)',s:5,f:4,key:'*'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'LA (A2)',s:5,f:0,key:'5'},{note:'Mİ (E3)',s:4,f:2,key:'F'},
            // FADE OUT riff
            {note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'FA (F4)',s:1,f:1,key:'Q'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'FA (F4)',s:1,f:1,key:'Q'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'Sİ (B3)',s:2,f:0,key:'2'}
        ],

        // Wish You Were Here (lesson 9)
        9: [
            // INTRO Em7 arpeggio x2
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'Sİ (B2)',s:5,f:2,key:'G'},
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'Sİ (B2)',s:5,f:2,key:'G'},
            // G arpeggio x2
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'Sİ (B2)',s:5,f:2,key:'G'},
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'Sİ (B2)',s:5,f:2,key:'G'},
            // A7sus4
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Mİ (E3)',s:4,f:2,key:'F'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Mİ (E3)',s:4,f:2,key:'F'},
            // Solo melody
            {note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Mİ (E3)',s:4,f:2,key:'F'},
            // VERSE 1 Em7→G strum
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},
            // OUTRO
            {note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'LA (A4)',s:1,f:5,key:'U'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'Mİ (E3)',s:4,f:2,key:'F'},
            // CHORUS 2 - C→D→Am→G
            {note:'DO (C3)',s:5,f:3,key:'V'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'Mİ (E4)',s:1,f:0,key:'1'},
            {note:'RE (D3)',s:4,f:0,key:'4'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'RE (D4)',s:2,f:3,key:'Z'},{note:'FA# (F#4)',s:1,f:2,key:'A'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'Mİ (E4)',s:1,f:0,key:'1'},
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G4)',s:1,f:3,key:'<'},
            // VERSE 2 - Em7→G strum pattern
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},
            // OUTRO SOLO - son melodi
            {note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'LA (A4)',s:1,f:5,key:'U'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'Mİ (E4)',s:1,f:0,key:'1'},
            {note:'RE (D4)',s:2,f:3,key:'Z'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'}
        ],

        // Nothing Else Matters (lesson 10) — Gemini-verified, 119 notes
        10: [
            // INTRO × 4 — Em open-string arpeggio (6/8: s6→s3→s2→s1→s2→s3)
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            // TIRMANIŞ — s1 tırmanış G4→A4→B4 (s1f3=G4, s1f5=A4, s1f7=B4)
            {note:'SOL (G4)',s:1,f:3,key:'<'},{note:'LA (A4)',s:1,f:5,key:'U'},{note:'Sİ (B4)',s:1,f:7,key:'N'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B4)',s:1,f:7,key:'N'},
            // İNİŞ — s1 iniş A4→G4→E4
            {note:'LA (A4)',s:1,f:5,key:'U'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            // VERSE 1 — Em (s4f2=E3)
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            // VERSE 1 — D (s3f2=A3, s2f3=D4, s1f2=F#4)
            {note:'RE (D3)',s:4,f:0,key:'4'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'RE (D4)',s:2,f:3,key:'Z'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'RE (D4)',s:2,f:3,key:'Z'},{note:'LA (A3)',s:3,f:2,key:'D'},
            // VERSE 1 — C (s5f3=C3, s2f1=C4)
            {note:'DO (C3)',s:5,f:3,key:'V'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            // VERSE 1 — G (s6f3=G2)
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'RE (D3)',s:4,f:0,key:'4'},
            // VERSE 2 — Em
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            // VERSE 2 — D
            {note:'RE (D3)',s:4,f:0,key:'4'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'RE (D4)',s:2,f:3,key:'Z'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'RE (D4)',s:2,f:3,key:'Z'},{note:'LA (A3)',s:3,f:2,key:'D'},
            // VERSE 2 — C
            {note:'DO (C3)',s:5,f:3,key:'V'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            // VERSE 2 — G
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'RE (D3)',s:4,f:0,key:'4'},
            // CHORUS — Em open
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            // CHORUS — Tırmanış tekrar
            {note:'SOL (G4)',s:1,f:3,key:'<'},{note:'LA (A4)',s:1,f:5,key:'U'},{note:'Sİ (B4)',s:1,f:7,key:'N'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B4)',s:1,f:7,key:'N'},
            // OUTRO × 4 — Em open kapanış
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'}
        ],

        // Wonderwall (lesson 11)
        11: [
            // INTRO Em7→G→Dsus4→A7sus4
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'LA (A2)',s:5,f:0,key:'5'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            // VERSE x2
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'LA (A2)',s:5,f:0,key:'5'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'LA (A2)',s:5,f:0,key:'5'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            // PRE-CHORUS Cadd9→Dsus4→Em7 x2
            {note:'DO (C3)',s:5,f:3,key:'V'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            // CHORUS Cadd9→Em7→G→Em7 x2
            {note:'DO (C3)',s:5,f:3,key:'V'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'LA (A2)',s:5,f:0,key:'5'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},
            // VERSE 3 - Em7→G→Dsus4→A7sus4 x2
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'LA (A2)',s:5,f:0,key:'5'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'LA (A2)',s:5,f:0,key:'5'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            // PRE-CHORUS + CHORUS tekrar
            {note:'DO (C3)',s:5,f:3,key:'V'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'DO (C3)',s:5,f:3,key:'V'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'LA (A2)',s:5,f:0,key:'5'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'RE (D4)',s:2,f:3,key:'Z'},
            // OUTRO Em7→G kapanış
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'SOL (G4)',s:1,f:3,key:'<'},
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'LA (A2)',s:5,f:0,key:'5'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'}
        ],

        // Stairway to Heaven (lesson 12)
        12: [
            // Am arpeggio
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'LA (A4)',s:1,f:5,key:'U'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'LA (A4)',s:1,f:5,key:'U'},{note:'DO (C4)',s:2,f:1,key:'W'},
            // Am(maj7)/G#
            {note:'DO# (C#3)',s:5,f:4,key:'*'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'LA (A4)',s:1,f:5,key:'U'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'LA (A4)',s:1,f:5,key:'U'},{note:'DO (C4)',s:2,f:1,key:'W'},
            // Am7/G
            {note:'RE (D3)',s:5,f:5,key:'Ğ'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'LA (A4)',s:1,f:5,key:'U'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'LA (A4)',s:1,f:5,key:'U'},{note:'DO (C4)',s:2,f:1,key:'W'},
            // D/F#
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'RE (D4)',s:2,f:3,key:'Z'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'RE (D4)',s:2,f:3,key:'Z'},{note:'LA (A3)',s:3,f:2,key:'D'},
            // Fmaj7
            {note:'FA (F3)',s:4,f:3,key:'C'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'LA (A3)',s:3,f:2,key:'D'},
            // G/B → Am
            {note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'Mİ (E4)',s:1,f:0,key:'1'},
            // REPEAT intro
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'LA (A4)',s:1,f:5,key:'U'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'LA (A4)',s:1,f:5,key:'U'},{note:'DO (C4)',s:2,f:1,key:'W'},
            {note:'DO# (C#3)',s:5,f:4,key:'*'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'LA (A4)',s:1,f:5,key:'U'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'LA (A4)',s:1,f:5,key:'U'},{note:'DO (C4)',s:2,f:1,key:'W'},
            {note:'RE (D3)',s:5,f:5,key:'Ğ'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'LA (A4)',s:1,f:5,key:'U'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'LA (A4)',s:1,f:5,key:'U'},{note:'DO (C4)',s:2,f:1,key:'W'},
            {note:'FA (F3)',s:4,f:3,key:'C'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'LA (A3)',s:3,f:2,key:'D'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'Mİ (E4)',s:1,f:0,key:'1'},
            // VERSE 2 - Am, C, G strum chords
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'Mİ (E4)',s:1,f:0,key:'1'},
            {note:'DO (C3)',s:5,f:3,key:'V'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'Mİ (E4)',s:1,f:0,key:'1'},
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G4)',s:1,f:3,key:'<'},
            {note:'RE (D3)',s:4,f:0,key:'4'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'RE (D4)',s:2,f:3,key:'Z'},{note:'FA# (F#4)',s:1,f:2,key:'A'},
            // BUILD section - D→Dsus4→C→Am→G (Stairway rock build)
            {note:'RE (D3)',s:4,f:0,key:'4'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'RE (D4)',s:2,f:3,key:'Z'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'FA# (F#4)',s:1,f:2,key:'A'},
            {note:'DO (C3)',s:5,f:3,key:'V'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'Mİ (E4)',s:1,f:0,key:'1'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'Mİ (E4)',s:1,f:0,key:'1'},
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G4)',s:1,f:3,key:'<'},
            // Am finale
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'LA (A3)',s:3,f:2,key:'D'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'Mİ (E4)',s:1,f:0,key:'1'}
        ],

        // Hotel California (lesson 13)
        13: [
            // Em arpeggio
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            // B7
            {note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'Sİ (B3)',s:3,f:4,key:'9'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Sİ (B3)',s:3,f:4,key:'9'},
            // D
            {note:'RE (D3)',s:4,f:0,key:'4'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'RE (D4)',s:2,f:3,key:'Z'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'RE (D4)',s:2,f:3,key:'Z'},{note:'LA (A3)',s:3,f:2,key:'D'},
            // A
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'DO# (C#4)',s:2,f:2,key:'S'},
            // C
            {note:'DO (C3)',s:5,f:3,key:'V'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'DO (C4)',s:2,f:1,key:'W'},
            // G
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'Sİ (B3)',s:2,f:0,key:'2'},
            // Am
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'DO (C4)',s:2,f:1,key:'W'},
            // B7
            {note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'RE# (D#3)',s:4,f:1,key:'R'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E4)',s:1,f:0,key:'1'},
            // VERSE repeat
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            {note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'Sİ (B3)',s:3,f:4,key:'9'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Sİ (B3)',s:3,f:4,key:'9'},
            {note:'RE (D3)',s:4,f:0,key:'4'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'RE (D4)',s:2,f:3,key:'Z'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'RE (D4)',s:2,f:3,key:'Z'},{note:'LA (A3)',s:3,f:2,key:'D'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'DO# (C#4)',s:2,f:2,key:'S'},
            {note:'DO (C3)',s:5,f:3,key:'V'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'DO (C4)',s:2,f:1,key:'W'},
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'Sİ (B3)',s:2,f:0,key:'2'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'DO (C4)',s:2,f:1,key:'W'},
            {note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'RE# (D#3)',s:4,f:1,key:'R'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E4)',s:1,f:0,key:'1'},
            // CHORUS 2 - full chord progression tekrar
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            {note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'Sİ (B3)',s:3,f:4,key:'9'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Sİ (B3)',s:3,f:4,key:'9'},
            {note:'RE (D3)',s:4,f:0,key:'4'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'RE (D4)',s:2,f:3,key:'Z'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'RE (D4)',s:2,f:3,key:'Z'},{note:'LA (A3)',s:3,f:2,key:'D'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'DO# (C#4)',s:2,f:2,key:'S'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'DO# (C#4)',s:2,f:2,key:'S'},
            {note:'DO (C3)',s:5,f:3,key:'V'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'DO (C4)',s:2,f:1,key:'W'},
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'RE (D3)',s:4,f:0,key:'4'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'Sİ (B3)',s:2,f:0,key:'2'},
            {note:'LA (A2)',s:5,f:0,key:'5'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'DO (C4)',s:2,f:1,key:'W'},
            {note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'RE# (D#3)',s:4,f:1,key:'R'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E4)',s:1,f:0,key:'1'},
            // GUITAR SOLO simplified - Em-D-C-G arpeggios
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},
            {note:'RE (D3)',s:4,f:0,key:'4'},{note:'LA (A3)',s:3,f:2,key:'D'},{note:'FA# (F#4)',s:1,f:2,key:'A'},{note:'RE (D4)',s:2,f:3,key:'Z'},{note:'LA (A3)',s:3,f:2,key:'D'},
            {note:'DO (C3)',s:5,f:3,key:'V'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Mİ (E4)',s:1,f:0,key:'1'},{note:'DO (C4)',s:2,f:1,key:'W'},{note:'SOL (G3)',s:3,f:0,key:'3'},
            {note:'SOL (G2)',s:6,f:3,key:'B'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'SOL (G4)',s:1,f:3,key:'<'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},
            // OUTRO - Em arpeggio fade
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E4)',s:1,f:0,key:'1'},
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'Sİ (B2)',s:5,f:2,key:'G'},{note:'Mİ (E3)',s:4,f:2,key:'F'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},
            {note:'Mİ (E2)',s:6,f:0,key:'6'},{note:'SOL (G3)',s:3,f:0,key:'3'},{note:'Sİ (B3)',s:2,f:0,key:'2'},{note:'Mİ (E2)',s:6,f:0,key:'6'}
        ]
    };

    // ============================
    // APPLY FULL DATA ON LOAD
    // ============================

    window.addEventListener('DOMContentLoaded', function() {
        // Expand tablature notes
        if (typeof tablatures !== 'undefined') {
            Object.keys(fullTablatureNotes).forEach(function(key) {
                if (tablatures[key]) {
                    tablatures[key].notes = fullTablatureNotes[key];
                    console.log('🎵 Full tab loaded:', key, '→', fullTablatureNotes[key].length, 'notes');
                }
            });
            if (typeof loadTablature === 'function' && typeof currentTab !== 'undefined') {
                loadTablature(currentTab);
            }
        }

        // Expand lesson songData
        if (typeof lessonsData !== 'undefined') {
            Object.keys(fullLessonNotes).forEach(function(id) {
                if (lessonsData[id]) {
                    lessonsData[id].songData = fullLessonNotes[id];
                    console.log('📚 Full lesson loaded:', id, '→', fullLessonNotes[id].length, 'notes');
                }
            });
        }

        console.log('✅ Full Song Data v2.0 loaded successfully');
    });

})();

// UniversalNoteCore.cpp
// Melovia - Universal Note Core Implementation
//
// 12-TET (12-Tone Equal Temperament) sistemi kullanılır.
// Referans: A4 = 440 Hz
// Formül: f(n) = 440 × 2^((n-69)/12)
// n = MIDI nota numarası

#include "UniversalNoteCore.h"

// A4 referans frekansı (Hz) - statik değişken tanımı
float UUniversalNoteCore::A4ReferenceFrequency = 440.0f;

// ============================================================
// CONSTRUCTOR
// ============================================================
UUniversalNoteCore::UUniversalNoteCore()
{
}

// ============================================================
// FREKANS HESAPLAMA
// ============================================================

float UUniversalNoteCore::GetFrequency(ENoteName Note, int32 Octave)
{
    // MIDI nota numarasını hesapla, sonra frekansa çevir
    const int32 MidiNote = GetMidiNote(Note, Octave);
    return GetFrequencyFromMidi(MidiNote);
}

float UUniversalNoteCore::GetFrequencyFromMidi(int32 MidiNote)
{
    // 12-TET formülü: f = 440 × 2^((midi - 69) / 12)
    // MIDI 69 = A4 = 440 Hz
    return A4ReferenceFrequency * FMath::Pow(2.0f, (MidiNote - 69.0f) / 12.0f);
}

float UUniversalNoteCore::TransposeFrequency(float BaseFrequency, int32 Semitones)
{
    // f_new = f_base × 2^(semitones / 12)
    return BaseFrequency * FMath::Pow(2.0f, Semitones / 12.0f);
}

// ============================================================
// NOTA BİLGİSİ
// ============================================================

FNoteInfo UUniversalNoteCore::GetNoteInfo(ENoteName Note, int32 Octave)
{
    const float Freq = GetFrequency(Note, Octave);
    const int32 Midi = GetMidiNote(Note, Octave);
    const FString Turkish = GetTurkishNoteName(Note);
    const FString International = GetInternationalNoteName(Note) + FString::FromInt(Octave);

    return FNoteInfo(Note, Octave, Freq, Midi, Turkish, International);
}

FNoteInfo UUniversalNoteCore::FindClosestNote(float Frequency)
{
    if (Frequency <= 0.0f)
    {
        return FNoteInfo();
    }

    // Frekansı MIDI numarasına çevir: n = 69 + 12 × log2(f / 440)
    const float MidiFloat = 69.0f + 12.0f * FMath::Log2(Frequency / A4ReferenceFrequency);
    const int32 MidiNote = FMath::RoundToInt(MidiFloat);

    // MIDI numarasından nota ve oktav çıkar
    const int32 NoteIndex = ((MidiNote % 12) + 12) % 12; // 0-11 arası, C=0
    const int32 Octave = (MidiNote / 12) - 1;
    const ENoteName Note = static_cast<ENoteName>(NoteIndex);

    return GetNoteInfo(Note, Octave);
}

FNoteInfo UUniversalNoteCore::GetNoteInfoFromMidi(int32 MidiNote)
{
    const int32 NoteIndex = ((MidiNote % 12) + 12) % 12;
    const int32 Octave = (MidiNote / 12) - 1;
    const ENoteName Note = static_cast<ENoteName>(NoteIndex);

    return GetNoteInfo(Note, Octave);
}

// ============================================================
// TRANSPOZISYON
// ============================================================

FTransposeResult UUniversalNoteCore::Transpose(ENoteName Note, int32 Octave, int32 Semitones)
{
    FTransposeResult Result;
    Result.OriginalNote = Note;
    Result.OriginalOctave = Octave;

    // Orijinal MIDI numarası
    const int32 OriginalMidi = GetMidiNote(Note, Octave);

    // Transpose edilmiş MIDI
    const int32 TransposedMidi = OriginalMidi + Semitones;

    // Yeni nota ve oktav
    const int32 NewNoteIndex = ((TransposedMidi % 12) + 12) % 12;
    Result.TransposedNote = static_cast<ENoteName>(NewNoteIndex);
    Result.TransposedOctave = (TransposedMidi / 12) - 1;
    Result.TransposedFrequency = GetFrequencyFromMidi(TransposedMidi);

    return Result;
}

// ============================================================
// NOTA İSİMLERİ
// ============================================================

FString UUniversalNoteCore::GetTurkishNoteName(ENoteName Note)
{
    const TArray<FString>& Names = GetTurkishNoteNames();
    const int32 Index = static_cast<int32>(Note);

    if (Names.IsValidIndex(Index))
    {
        return Names[Index];
    }

    return TEXT("?");
}

FString UUniversalNoteCore::GetInternationalNoteName(ENoteName Note)
{
    const TArray<FString>& Names = GetInternationalNoteNames();
    const int32 Index = static_cast<int32>(Note);

    if (Names.IsValidIndex(Index))
    {
        return Names[Index];
    }

    return TEXT("?");
}

FString UUniversalNoteCore::GetNoteDisplayString(ENoteName Note, int32 Octave)
{
    // Format: "LA (A4) - 440.0 Hz"
    // Web versiyonundaki noteDisplay formatıyla uyumlu
    const FString Turkish = GetTurkishNoteName(Note);
    const FString International = GetInternationalNoteName(Note);
    const float Freq = GetFrequency(Note, Octave);

    return FString::Printf(TEXT("%s (%s%d) - %.1f Hz"), 
        *Turkish, *International, Octave, Freq);
}

// ============================================================
// MIDI DÖNÜŞÜM
// ============================================================

int32 UUniversalNoteCore::GetMidiNote(ENoteName Note, int32 Octave)
{
    // MIDI: C-1 = 0, C0 = 12, C4 = 60, A4 = 69
    // Formül: midi = (Octave + 1) × 12 + NoteIndex
    const int32 NoteIndex = static_cast<int32>(Note);
    return (Octave + 1) * 12 + NoteIndex;
}

// ============================================================
// YARDIMCI FONKSİYONLAR
// ============================================================

float UUniversalNoteCore::GetSemitoneDifference(float Freq1, float Freq2)
{
    if (Freq1 <= 0.0f || Freq2 <= 0.0f) return 0.0f;

    // Yarım ton farkı = 12 × log2(f2 / f1)
    return 12.0f * FMath::Log2(Freq2 / Freq1);
}

float UUniversalNoteCore::GetCentDifference(float Freq1, float Freq2)
{
    // 1 yarım ton = 100 cent
    // Cent farkı = 1200 × log2(f2 / f1)
    return GetSemitoneDifference(Freq1, Freq2) * 100.0f;
}

// ============================================================
// PRİVATE: NOTA İSİMLERİ TABLOLARI
// ============================================================

const TArray<FString>& UUniversalNoteCore::GetTurkishNoteNames()
{
    // Sıra: C, C#, D, D#, E, F, F#, G, G#, A, A#, B
    static const TArray<FString> Names = {
        TEXT("DO"),         // C
        TEXT("DO#"),        // C#
        TEXT("RE"),         // D
        TEXT("RE#"),        // D# (Mİb)
        TEXT("Mİ"),         // E
        TEXT("FA"),         // F
        TEXT("FA#"),        // F#
        TEXT("SOL"),        // G
        TEXT("SOL#"),       // G#
        TEXT("LA"),         // A
        TEXT("LA#"),        // A# (Sİb)
        TEXT("Sİ")          // B
    };
    return Names;
}

const TArray<FString>& UUniversalNoteCore::GetInternationalNoteNames()
{
    static const TArray<FString> Names = {
        TEXT("C"),
        TEXT("C#"),
        TEXT("D"),
        TEXT("D#"),
        TEXT("E"),
        TEXT("F"),
        TEXT("F#"),
        TEXT("G"),
        TEXT("G#"),
        TEXT("A"),
        TEXT("A#"),
        TEXT("B")
    };
    return Names;
}

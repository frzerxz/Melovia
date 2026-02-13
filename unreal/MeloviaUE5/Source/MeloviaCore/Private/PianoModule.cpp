// PianoModule.cpp
// Melovia - Piyano Modülü Implementation
//
// Standart piyano: 88 tuş
// En düşük: A0 (27.50 Hz) - MIDI 21
// En yüksek: C8 (4186.01 Hz) - MIDI 108
// Orta DO: C4 (261.63 Hz) - MIDI 60

#include "PianoModule.h"

// ============================================================
// CONSTRUCTOR
// ============================================================

UPianoModule::UPianoModule()
    : bSustainActive(false)
{
}

// ============================================================
// BAŞLATMA
// ============================================================

void UPianoModule::Initialize()
{
    bSustainActive = false;
    BuildKeys();
    
    UE_LOG(LogTemp, Log, TEXT("Melovia PianoModule baslatildi. %d tus olusturuldu."), Keys.Num());
}

void UPianoModule::BuildKeys()
{
    Keys.Empty();
    Keys.Reserve(88);

    // Piyano tuşları: A0 (MIDI 21) → C8 (MIDI 108)
    for (int32 MidiNote = 21; MidiNote <= 108; MidiNote++)
    {
        FPianoKey Key;
        Key.KeyNumber = MidiNote - 20; // 1-88 arası
        Key.MidiNote = MidiNote;
        Key.Note = UUniversalNoteCore::GetNoteInfoFromMidi(MidiNote);
        Key.Color = IsBlackKey(Key.Note.NoteName) ? EKeyColor::Black : EKeyColor::White;
        Key.bIsPressed = false;

        Keys.Add(Key);
    }
}

// ============================================================
// NOTA ÇALMA
// ============================================================

FPianoPlayedNote UPianoModule::GetNote(int32 KeyNumber, float Velocity) const
{
    FPianoPlayedNote Result;

    if (KeyNumber < 1 || KeyNumber > Keys.Num())
    {
        UE_LOG(LogTemp, Warning, TEXT("Melovia Piano: Gecersiz tus: %d"), KeyNumber);
        return Result;
    }

    const FPianoKey& Key = Keys[KeyNumber - 1];

    Result.KeyNumber = KeyNumber;
    Result.Frequency = Key.Note.Frequency;
    Result.NoteInfo = Key.Note;
    Result.Velocity = FMath::Clamp(Velocity, 0.0f, 1.0f);

    // Display: "DO (C4) - 261.6 Hz"
    Result.DisplayString = FString::Printf(TEXT("%s (%s) - %.1f Hz"),
        *Key.Note.TurkishName,
        *Key.Note.InternationalName,
        Key.Note.Frequency);

    return Result;
}

// ============================================================
// TUŞ BİLGİSİ
// ============================================================

FPianoKey UPianoModule::GetKey(int32 KeyNumber) const
{
    if (KeyNumber >= 1 && KeyNumber <= Keys.Num())
    {
        return Keys[KeyNumber - 1];
    }

    return FPianoKey();
}

int32 UPianoModule::MidiToKeyNumber(int32 MidiNote) const
{
    // MIDI 21 (A0) = Tuş 1, MIDI 108 (C8) = Tuş 88
    const int32 KeyNum = MidiNote - 20;
    
    if (KeyNum >= 1 && KeyNum <= 88)
    {
        return KeyNum;
    }

    return -1;
}

// ============================================================
// SİYAH TUŞ KONTROLÜ
// ============================================================

bool UPianoModule::IsBlackKey(ENoteName Note)
{
    // Siyah tuşlar: C#, D#, F#, G#, A#
    switch (Note)
    {
    case ENoteName::CSharp:
    case ENoteName::DSharp:
    case ENoteName::FSharp:
    case ENoteName::GSharp:
    case ENoteName::ASharp:
        return true;
    default:
        return false;
    }
}

// ============================================================
// SUSTAIN PEDAL
// ============================================================

void UPianoModule::SetSustainPedal(bool bEnabled)
{
    bSustainActive = bEnabled;
    UE_LOG(LogTemp, Log, TEXT("Melovia Piano: Sustain pedal %s"), 
        bEnabled ? TEXT("ACIK") : TEXT("KAPALI"));
}

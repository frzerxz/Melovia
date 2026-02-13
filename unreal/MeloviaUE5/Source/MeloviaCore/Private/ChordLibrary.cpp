// ChordLibrary.cpp
// Melovia - Akor Kütüphanesi Implementation
//
// Web versiyonundaki chordLibrary ile birebir uyumlu.
// Tüm parmak pozisyonları: Tel6-Tel5-Tel4-Tel3-Tel2-Tel1
// x = çalınmaz (muted), 0 = açık tel, 1+ = perde numarası

#include "ChordLibrary.h"

UChordLibrary::UChordLibrary()
{
}

void UChordLibrary::InitializeLibrary()
{
    ChordDatabase.Empty();

    // ===================== MAJOR AKORLAR =====================

    AddChord(TEXT("C"), EChordType::Major, ENoteName::C,
        TEXT("x-3-2-0-1-0"),
        { ENoteName::C, ENoteName::E, ENoteName::G },
        false, 0, 2);

    AddChord(TEXT("D"), EChordType::Major, ENoteName::D,
        TEXT("x-x-0-2-3-2"),
        { ENoteName::D, ENoteName::FSharp, ENoteName::A },
        false, 0, 2);

    AddChord(TEXT("E"), EChordType::Major, ENoteName::E,
        TEXT("0-2-2-1-0-0"),
        { ENoteName::E, ENoteName::GSharp, ENoteName::B },
        false, 0, 1);

    AddChord(TEXT("F"), EChordType::Major, ENoteName::F,
        TEXT("1-3-3-2-1-1"),
        { ENoteName::F, ENoteName::A, ENoteName::C },
        true, 1, 4); // Barre akoru - en zor başlangıç akoru

    AddChord(TEXT("G"), EChordType::Major, ENoteName::G,
        TEXT("3-2-0-0-0-3"),
        { ENoteName::G, ENoteName::B, ENoteName::D },
        false, 0, 1);

    AddChord(TEXT("A"), EChordType::Major, ENoteName::A,
        TEXT("x-0-2-2-2-0"),
        { ENoteName::A, ENoteName::CSharp, ENoteName::E },
        false, 0, 1);

    AddChord(TEXT("B"), EChordType::Major, ENoteName::B,
        TEXT("x-2-4-4-4-2"),
        { ENoteName::B, ENoteName::DSharp, ENoteName::FSharp },
        true, 2, 4);

    // ===================== MİNÖR AKORLAR =====================

    AddChord(TEXT("Am"), EChordType::Minor, ENoteName::A,
        TEXT("x-0-2-2-1-0"),
        { ENoteName::A, ENoteName::C, ENoteName::E },
        false, 0, 1);

    AddChord(TEXT("Bm"), EChordType::Minor, ENoteName::B,
        TEXT("x-2-4-4-3-2"),
        { ENoteName::B, ENoteName::D, ENoteName::FSharp },
        true, 2, 4);

    AddChord(TEXT("Cm"), EChordType::Minor, ENoteName::C,
        TEXT("x-3-5-5-4-3"),
        { ENoteName::C, ENoteName::DSharp, ENoteName::G },
        true, 3, 4);

    AddChord(TEXT("Dm"), EChordType::Minor, ENoteName::D,
        TEXT("x-x-0-2-3-1"),
        { ENoteName::D, ENoteName::F, ENoteName::A },
        false, 0, 2);

    AddChord(TEXT("Em"), EChordType::Minor, ENoteName::E,
        TEXT("0-2-2-0-0-0"),
        { ENoteName::E, ENoteName::G, ENoteName::B },
        false, 0, 1); // En kolay akor

    AddChord(TEXT("Fm"), EChordType::Minor, ENoteName::F,
        TEXT("1-3-3-1-1-1"),
        { ENoteName::F, ENoteName::GSharp, ENoteName::C },
        true, 1, 4);

    AddChord(TEXT("Gm"), EChordType::Minor, ENoteName::G,
        TEXT("3-5-5-3-3-3"),
        { ENoteName::G, ENoteName::ASharp, ENoteName::D },
        true, 3, 4);

    // ===================== 7'Lİ AKORLAR =====================

    AddChord(TEXT("A7"), EChordType::Seventh, ENoteName::A,
        TEXT("x-0-2-0-2-0"),
        { ENoteName::A, ENoteName::CSharp, ENoteName::E, ENoteName::G },
        false, 0, 2);

    AddChord(TEXT("B7"), EChordType::Seventh, ENoteName::B,
        TEXT("x-2-1-2-0-2"),
        { ENoteName::B, ENoteName::DSharp, ENoteName::FSharp, ENoteName::A },
        false, 0, 3);

    AddChord(TEXT("C7"), EChordType::Seventh, ENoteName::C,
        TEXT("x-3-2-3-1-0"),
        { ENoteName::C, ENoteName::E, ENoteName::G, ENoteName::ASharp },
        false, 0, 3);

    AddChord(TEXT("D7"), EChordType::Seventh, ENoteName::D,
        TEXT("x-x-0-2-1-2"),
        { ENoteName::D, ENoteName::FSharp, ENoteName::A, ENoteName::C },
        false, 0, 2);

    AddChord(TEXT("E7"), EChordType::Seventh, ENoteName::E,
        TEXT("0-2-0-1-0-0"),
        { ENoteName::E, ENoteName::GSharp, ENoteName::B, ENoteName::D },
        false, 0, 1);

    AddChord(TEXT("G7"), EChordType::Seventh, ENoteName::G,
        TEXT("3-2-0-0-0-1"),
        { ENoteName::G, ENoteName::B, ENoteName::D, ENoteName::F },
        false, 0, 2);

    // ===================== MAJ7 AKORLAR =====================

    AddChord(TEXT("Amaj7"), EChordType::MajorSeventh, ENoteName::A,
        TEXT("x-0-2-1-2-0"),
        { ENoteName::A, ENoteName::CSharp, ENoteName::E, ENoteName::GSharp },
        false, 0, 2);

    AddChord(TEXT("Cmaj7"), EChordType::MajorSeventh, ENoteName::C,
        TEXT("x-3-2-0-0-0"),
        { ENoteName::C, ENoteName::E, ENoteName::G, ENoteName::B },
        false, 0, 2);

    AddChord(TEXT("Dmaj7"), EChordType::MajorSeventh, ENoteName::D,
        TEXT("x-x-0-2-2-2"),
        { ENoteName::D, ENoteName::FSharp, ENoteName::A, ENoteName::CSharp },
        false, 0, 2);

    AddChord(TEXT("Fmaj7"), EChordType::MajorSeventh, ENoteName::F,
        TEXT("1-x-2-2-1-0"),
        { ENoteName::F, ENoteName::A, ENoteName::C, ENoteName::E },
        false, 0, 3);

    AddChord(TEXT("Gmaj7"), EChordType::MajorSeventh, ENoteName::G,
        TEXT("3-2-0-0-0-2"),
        { ENoteName::G, ENoteName::B, ENoteName::D, ENoteName::FSharp },
        false, 0, 2);

    // ===================== POWER CHORDS =====================

    AddChord(TEXT("E5"), EChordType::PowerChord, ENoteName::E,
        TEXT("0-2-2-x-x-x"),
        { ENoteName::E, ENoteName::B },
        false, 0, 1);

    AddChord(TEXT("A5"), EChordType::PowerChord, ENoteName::A,
        TEXT("x-0-2-2-x-x"),
        { ENoteName::A, ENoteName::E },
        false, 0, 1);

    AddChord(TEXT("D5"), EChordType::PowerChord, ENoteName::D,
        TEXT("x-x-0-2-3-x"),
        { ENoteName::D, ENoteName::A },
        false, 0, 1);

    AddChord(TEXT("G5"), EChordType::PowerChord, ENoteName::G,
        TEXT("3-5-5-x-x-x"),
        { ENoteName::G, ENoteName::D },
        false, 0, 2);

    UE_LOG(LogTemp, Log, TEXT("Melovia ChordLibrary: %d akor yuklendi."), ChordDatabase.Num());
}

// ============================================================
// AKOR SORGULAMA
// ============================================================

FChordDefinition UChordLibrary::GetChord(const FString& ChordName) const
{
    const FChordDefinition* Found = ChordDatabase.Find(ChordName);
    if (Found)
    {
        return *Found;
    }

    UE_LOG(LogTemp, Warning, TEXT("Melovia: '%s' akoru bulunamadi."), *ChordName);
    return FChordDefinition();
}

TArray<FChordDefinition> UChordLibrary::GetChordsByType(EChordType Type) const
{
    TArray<FChordDefinition> Result;
    for (const auto& Pair : ChordDatabase)
    {
        if (Pair.Value.Type == Type)
        {
            Result.Add(Pair.Value);
        }
    }
    return Result;
}

TArray<FChordDefinition> UChordLibrary::GetChordsByRoot(ENoteName Root) const
{
    TArray<FChordDefinition> Result;
    for (const auto& Pair : ChordDatabase)
    {
        if (Pair.Value.RootNote == Root)
        {
            Result.Add(Pair.Value);
        }
    }
    return Result;
}

TArray<FString> UChordLibrary::GetAllChordNames() const
{
    TArray<FString> Names;
    ChordDatabase.GetKeys(Names);
    return Names;
}

bool UChordLibrary::HasChord(const FString& ChordName) const
{
    return ChordDatabase.Contains(ChordName);
}

// ============================================================
// PARMAK DİZGİSİ PARSE
// ============================================================

TArray<FFingerPosition> UChordLibrary::ParseFingerString(const FString& FingerString)
{
    TArray<FFingerPosition> Positions;
    TArray<FString> Parts;

    // "x-0-2-2-1-0" → ["x", "0", "2", "2", "1", "0"]
    FingerString.ParseIntoArray(Parts, TEXT("-"), true);

    for (int32 i = 0; i < Parts.Num() && i < 6; i++)
    {
        const int32 StringNum = 6 - i; // Tel6'dan Tel1'e doğru
        const FString& Part = Parts[i];

        if (Part == TEXT("x") || Part == TEXT("X"))
        {
            Positions.Add(FFingerPosition(StringNum, -1, true));
        }
        else
        {
            const int32 Fret = FCString::Atoi(*Part);
            Positions.Add(FFingerPosition(StringNum, Fret, false));
        }
    }

    return Positions;
}

// ============================================================
// YARDIMCI: AKOR EKLEME
// ============================================================

void UChordLibrary::AddChord(const FString& Name, EChordType Type, ENoteName Root,
                              const FString& Fingers, const TArray<ENoteName>& Notes,
                              bool bBarre, int32 BarreFret, int32 Diff)
{
    FChordDefinition Chord;
    Chord.Name = Name;
    Chord.Type = Type;
    Chord.RootNote = Root;
    Chord.FingerString = Fingers;
    Chord.Positions = ParseFingerString(Fingers);
    Chord.ChordNotes = Notes;
    Chord.bIsBarre = bBarre;
    Chord.BarreFret = BarreFret;
    Chord.Difficulty = Diff;

    ChordDatabase.Add(Name, Chord);
}

// GuitarModule.cpp
// Melovia - Gitar Modülü Implementation
//
// Standart akort frekansları (Hz):
// Tel 6 (en kalın): E2 = 82.41
// Tel 5: A2 = 110.00
// Tel 4: D3 = 146.83
// Tel 3: G3 = 196.00
// Tel 2: B3 = 246.94
// Tel 1 (en ince): E4 = 329.63

#include "GuitarModule.h"

// ============================================================
// CONSTRUCTOR
// ============================================================

UGuitarModule::UGuitarModule()
    : GuitarType(EGuitarType::Classic)
    , CurrentTuning(ETuningType::Standard)
    , CapoPosition(0)
    , TotalFrets(24)
{
}

// ============================================================
// BAŞLATMA
// ============================================================

void UGuitarModule::Initialize(EGuitarType Type, ETuningType Tuning)
{
    GuitarType = Type;
    CurrentTuning = Tuning;
    CapoPosition = 0;

    ApplyTuning();
    InitializeStringParameters();

    UE_LOG(LogTemp, Log, TEXT("Melovia GuitarModule baslatildi. Tip: %d, Akort: %d"), 
        static_cast<int32>(Type), static_cast<int32>(Tuning));
}

// ============================================================
// NOTA ÇALMA
// ============================================================

FPlayedNote UGuitarModule::GetNote(int32 StringNumber, int32 Fret) const
{
    FPlayedNote Result;

    if (StringNumber < 1 || StringNumber > 6 || Fret < 0 || Fret > TotalFrets)
    {
        UE_LOG(LogTemp, Warning, TEXT("Melovia: Gecersiz tel/perde: Tel %d, Perde %d"), 
            StringNumber, Fret);
        return Result;
    }

    Result.StringNumber = StringNumber;
    Result.FretNumber = Fret;
    Result.Frequency = GetFrequencyAtFret(StringNumber, Fret);
    Result.NoteInfo = UUniversalNoteCore::FindClosestNote(Result.Frequency);

    // Display string: "LA (A2) - 110.0 Hz" (web formatıyla uyumlu)
    Result.DisplayString = FString::Printf(TEXT("%s (%s) - %.1f Hz"),
        *Result.NoteInfo.TurkishName,
        *Result.NoteInfo.InternationalName,
        Result.Frequency);

    // Position string: "Tel 5, Perde 0" (web formatıyla uyumlu)
    Result.PositionString = FString::Printf(TEXT("Tel %d, Perde %d"),
        StringNumber, Fret);

    return Result;
}

float UGuitarModule::GetFrequencyAtFret(int32 StringNumber, int32 Fret) const
{
    if (StringNumber < 1 || StringNumber > 6)
    {
        return 0.0f;
    }

    // OpenStrings dizisi: index 0 = Tel 6 (en kalın), index 5 = Tel 1 (en ince)
    const int32 Index = 6 - StringNumber;
    
    if (!OpenStrings.IsValidIndex(Index))
    {
        return 0.0f;
    }

    const float OpenFreq = OpenStrings[Index];

    // Capo + perde birleşimi
    const int32 ActualFret = Fret + CapoPosition;

    // f = açık_tel_frekansı × 2^(perde / 12)
    return OpenFreq * FMath::Pow(2.0f, ActualFret / 12.0f);
}

// ============================================================
// AKORT
// ============================================================

void UGuitarModule::SetTuning(ETuningType NewTuning)
{
    CurrentTuning = NewTuning;
    ApplyTuning();
    
    UE_LOG(LogTemp, Log, TEXT("Melovia: Akort degistirildi: %d"), static_cast<int32>(NewTuning));
}

TArray<float> UGuitarModule::GetOpenStringFrequencies(ETuningType Tuning)
{
    // Sıra: Tel 6 (en kalın) → Tel 1 (en ince)
    switch (Tuning)
    {
    case ETuningType::Standard:
        // E2 - A2 - D3 - G3 - B3 - E4
        return { 82.41f, 110.00f, 146.83f, 196.00f, 246.94f, 329.63f };

    case ETuningType::DropD:
        // D2 - A2 - D3 - G3 - B3 - E4
        return { 73.42f, 110.00f, 146.83f, 196.00f, 246.94f, 329.63f };

    case ETuningType::OpenG:
        // D2 - G2 - D3 - G3 - B3 - D4
        return { 73.42f, 98.00f, 146.83f, 196.00f, 246.94f, 293.66f };

    case ETuningType::OpenD:
        // D2 - A2 - D3 - F#3 - A3 - D4
        return { 73.42f, 110.00f, 146.83f, 185.00f, 220.00f, 293.66f };

    case ETuningType::DADGAD:
        // D2 - A2 - D3 - G3 - A3 - D4
        return { 73.42f, 110.00f, 146.83f, 196.00f, 220.00f, 293.66f };

    case ETuningType::HalfStepDown:
        // Eb2 - Ab2 - Db3 - Gb3 - Bb3 - Eb4
        // Her tel yarım ton aşağı
        return { 77.78f, 103.83f, 138.59f, 185.00f, 233.08f, 311.13f };

    default:
        return { 82.41f, 110.00f, 146.83f, 196.00f, 246.94f, 329.63f };
    }
}

void UGuitarModule::ApplyTuning()
{
    OpenStrings = GetOpenStringFrequencies(CurrentTuning);
}

// ============================================================
// CAPO
// ============================================================

void UGuitarModule::SetCapo(int32 Fret)
{
    CapoPosition = FMath::Clamp(Fret, 0, 12);
    UE_LOG(LogTemp, Log, TEXT("Melovia: Capo perde %d'e ayarlandi."), CapoPosition);
}

// ============================================================
// TEL PARAMETRELERİ
// ============================================================

FStringParams UGuitarModule::GetStringParams(int32 StringNumber) const
{
    const int32 Index = StringNumber - 1;
    if (StringParameters.IsValidIndex(Index))
    {
        return StringParameters[Index];
    }

    return FStringParams();
}

void UGuitarModule::InitializeStringParameters()
{
    StringParameters.Empty();
    StringParameters.SetNum(6);

    // Web versiyonundaki tel parametreleriyle birebir uyumlu
    // Kaynak: PROJECT_REPORT.md "Tel Parametreleri" tablosu

    // Tel 1 (E4 - en ince)
    StringParameters[0].StringNumber = 1;
    StringParameters[0].OpenFrequency = OpenStrings.IsValidIndex(5) ? OpenStrings[5] : 329.63f;
    StringParameters[0].NoteName = TEXT("E4");
    StringParameters[0].Decay = 0.998f;
    StringParameters[0].Blend = 0.50f;
    StringParameters[0].Brightness = 1.0f;
    StringParameters[0].AttackStrength = 0.8f;
    StringParameters[0].BassBoostDB = 0.0f;

    // Tel 2 (B3)
    StringParameters[1].StringNumber = 2;
    StringParameters[1].OpenFrequency = OpenStrings.IsValidIndex(4) ? OpenStrings[4] : 246.94f;
    StringParameters[1].NoteName = TEXT("B3");
    StringParameters[1].Decay = 0.997f;
    StringParameters[1].Blend = 0.50f;
    StringParameters[1].Brightness = 0.9f;
    StringParameters[1].AttackStrength = 0.7f;
    StringParameters[1].BassBoostDB = 0.0f;

    // Tel 3 (G3)
    StringParameters[2].StringNumber = 3;
    StringParameters[2].OpenFrequency = OpenStrings.IsValidIndex(3) ? OpenStrings[3] : 196.00f;
    StringParameters[2].NoteName = TEXT("G3");
    StringParameters[2].Decay = 0.996f;
    StringParameters[2].Blend = 0.48f;
    StringParameters[2].Brightness = 0.8f;
    StringParameters[2].AttackStrength = 0.6f;
    StringParameters[2].BassBoostDB = 2.0f;

    // Tel 4 (D3)
    StringParameters[3].StringNumber = 4;
    StringParameters[3].OpenFrequency = OpenStrings.IsValidIndex(2) ? OpenStrings[2] : 146.83f;
    StringParameters[3].NoteName = TEXT("D3");
    StringParameters[3].Decay = 0.994f;
    StringParameters[3].Blend = 0.45f;
    StringParameters[3].Brightness = 0.6f;
    StringParameters[3].AttackStrength = 0.5f;
    StringParameters[3].BassBoostDB = 4.0f;

    // Tel 5 (A2)
    StringParameters[4].StringNumber = 5;
    StringParameters[4].OpenFrequency = OpenStrings.IsValidIndex(1) ? OpenStrings[1] : 110.00f;
    StringParameters[4].NoteName = TEXT("A2");
    StringParameters[4].Decay = 0.992f;
    StringParameters[4].Blend = 0.42f;
    StringParameters[4].Brightness = 0.4f;
    StringParameters[4].AttackStrength = 0.4f;
    StringParameters[4].BassBoostDB = 6.0f;

    // Tel 6 (E2 - en kalın)
    StringParameters[5].StringNumber = 6;
    StringParameters[5].OpenFrequency = OpenStrings.IsValidIndex(0) ? OpenStrings[0] : 82.41f;
    StringParameters[5].NoteName = TEXT("E2");
    StringParameters[5].Decay = 0.990f;
    StringParameters[5].Blend = 0.40f;
    StringParameters[5].Brightness = 0.3f;
    StringParameters[5].AttackStrength = 0.35f;
    StringParameters[5].BassBoostDB = 8.0f;
}

// ============================================================
// GİTAR TİPİ
// ============================================================

void UGuitarModule::SetGuitarType(EGuitarType NewType)
{
    GuitarType = NewType;

    // Bas gitar için farklı parametreler
    if (NewType == EGuitarType::Bass)
    {
        TotalFrets = 22;
        // Bas gitar: sadece 4 tel kullanır (genellikle E1-A1-D2-G2)
    }
    else
    {
        TotalFrets = 24;
    }

    UE_LOG(LogTemp, Log, TEXT("Melovia: Gitar tipi degistirildi: %d"), static_cast<int32>(NewType));
}

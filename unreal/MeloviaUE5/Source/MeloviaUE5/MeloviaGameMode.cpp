// MeloviaGameMode.cpp
// Melovia - Ana Oyun Modu Implementation

#include "MeloviaGameMode.h"

AMeloviaGameMode::AMeloviaGameMode()
{
    // UObject'ler constructor'da NewObject ile oluşturulmaz,
    // BeginPlay'de oluşturulacak
    GuitarModule = nullptr;
    PianoModule = nullptr;
    ChordLibrary = nullptr;
}

void AMeloviaGameMode::BeginPlay()
{
    Super::BeginPlay();

    // Modülleri oluştur ve başlat
    GuitarModule = NewObject<UGuitarModule>(this, TEXT("GuitarModule"));
    PianoModule = NewObject<UPianoModule>(this, TEXT("PianoModule"));
    ChordLibrary = NewObject<UChordLibrary>(this, TEXT("ChordLibrary"));

    if (GuitarModule)
    {
        GuitarModule->Initialize(EGuitarType::Classic, ETuningType::Standard);
    }

    if (PianoModule)
    {
        PianoModule->Initialize();
    }

    if (ChordLibrary)
    {
        ChordLibrary->InitializeLibrary();
    }

    UE_LOG(LogTemp, Log, TEXT("========================================"));
    UE_LOG(LogTemp, Log, TEXT("  MELOVIA - Dijital Enstruman Simulasyonu"));
    UE_LOG(LogTemp, Log, TEXT("  Universal Note Core v1.0 AKTIF"));
    UE_LOG(LogTemp, Log, TEXT("  Gitar: 6 tel, %d perde"), GuitarModule ? GuitarModule->TotalFrets : 0);
    UE_LOG(LogTemp, Log, TEXT("  Piyano: %d tus"), PianoModule ? PianoModule->GetTotalKeys() : 0);
    UE_LOG(LogTemp, Log, TEXT("  Akorlar: %d adet"), ChordLibrary ? ChordLibrary->GetAllChordNames().Num() : 0);
    UE_LOG(LogTemp, Log, TEXT("========================================"));
}

// ============================================================
// HIZLI ERİŞİM FONKSİYONLARI
// ============================================================

FPlayedNote AMeloviaGameMode::PlayGuitarNote(int32 StringNumber, int32 Fret)
{
    if (GuitarModule)
    {
        return GuitarModule->GetNote(StringNumber, Fret);
    }
    return FPlayedNote();
}

FPianoPlayedNote AMeloviaGameMode::PlayPianoNote(int32 KeyNumber, float Velocity)
{
    if (PianoModule)
    {
        return PianoModule->GetNote(KeyNumber, Velocity);
    }
    return FPianoPlayedNote();
}

FChordDefinition AMeloviaGameMode::GetChordInfo(const FString& ChordName)
{
    if (ChordLibrary)
    {
        return ChordLibrary->GetChord(ChordName);
    }
    return FChordDefinition();
}

void AMeloviaGameMode::ChangeGuitarTuning(ETuningType NewTuning)
{
    if (GuitarModule)
    {
        GuitarModule->SetTuning(NewTuning);
    }
}

void AMeloviaGameMode::SetGuitarCapo(int32 Fret)
{
    if (GuitarModule)
    {
        GuitarModule->SetCapo(Fret);
    }
}

// MeloviaGameMode.cpp
// Melovia - Ana Oyun Modu Implementation

#include "MeloviaGameMode.h"

AMeloviaGameMode::AMeloviaGameMode()
{
    // Modül nesnelerini oluştur
    GuitarModule = CreateDefaultSubobject<UGuitarModule>(TEXT("GuitarModule"));
    PianoModule = CreateDefaultSubobject<UPianoModule>(TEXT("PianoModule"));
    ChordLibrary = CreateDefaultSubobject<UChordLibrary>(TEXT("ChordLibrary"));
}

void AMeloviaGameMode::BeginPlay()
{
    Super::BeginPlay();

    // Tüm modülleri başlat
    if (GuitarModule)
    {
        GuitarModule->Initialize(EGuitarType::Classic, ETuningType::Standard);
        UE_LOG(LogTemp, Log, TEXT("Melovia: Gitar Modulu baslatildi."));
    }

    if (PianoModule)
    {
        PianoModule->Initialize();
        UE_LOG(LogTemp, Log, TEXT("Melovia: Piyano Modulu baslatildi."));
    }

    if (ChordLibrary)
    {
        ChordLibrary->InitializeLibrary();
        UE_LOG(LogTemp, Log, TEXT("Melovia: Akor Kutuphanesi yuklendi."));
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
        FPlayedNote Note = GuitarModule->GetNote(StringNumber, Fret);
        UE_LOG(LogTemp, Verbose, TEXT("Melovia Gitar: %s"), *Note.DisplayString);
        return Note;
    }

    return FPlayedNote();
}

FPianoPlayedNote AMeloviaGameMode::PlayPianoNote(int32 KeyNumber, float Velocity)
{
    if (PianoModule)
    {
        FPianoPlayedNote Note = PianoModule->GetNote(KeyNumber, Velocity);
        UE_LOG(LogTemp, Verbose, TEXT("Melovia Piyano: %s"), *Note.DisplayString);
        return Note;
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

// MeloviaGameMode.h
// Melovia - Ana Oyun Modu
//
// Oyunun başlangıcında Universal Note Core, 
// Gitar Modülü ve Piyano Modülünü başlatır.
// Web Browser Widget ile iletişimi yönetir.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/GameModeBase.h"
#include "UniversalNoteCore.h"
#include "ChordLibrary.h"
#include "GuitarModule.h"
#include "PianoModule.h"
#include "MeloviaGameMode.generated.h"

UCLASS()
class MELOVIAUE5_API AMeloviaGameMode : public AGameModeBase
{
    GENERATED_BODY()

public:
    AMeloviaGameMode();

    virtual void BeginPlay() override;

    // ----------------------------------------------------------
    // MODÜL ERİŞİMİ
    // ----------------------------------------------------------

    /** Gitar modülüne erişim */
    UFUNCTION(BlueprintCallable, Category = "Melovia")
    UGuitarModule* GetGuitarModule() const { return GuitarModule; }

    /** Piyano modülüne erişim */
    UFUNCTION(BlueprintCallable, Category = "Melovia")
    UPianoModule* GetPianoModule() const { return PianoModule; }

    /** Akor kütüphanesine erişim */
    UFUNCTION(BlueprintCallable, Category = "Melovia")
    UChordLibrary* GetChordLibrary() const { return ChordLibrary; }

    // ----------------------------------------------------------
    // HIZLI ERİŞİM FONKSİYONLARI
    // ----------------------------------------------------------

    /** Gitar notası çal (Blueprint'ten kolayca çağrılabilir) */
    UFUNCTION(BlueprintCallable, Category = "Melovia|QuickAccess")
    FPlayedNote PlayGuitarNote(int32 StringNumber, int32 Fret);

    /** Piyano notası çal */
    UFUNCTION(BlueprintCallable, Category = "Melovia|QuickAccess")
    FPianoPlayedNote PlayPianoNote(int32 KeyNumber, float Velocity = 0.75f);

    /** Akor bilgisi al */
    UFUNCTION(BlueprintCallable, Category = "Melovia|QuickAccess")
    FChordDefinition GetChordInfo(const FString& ChordName);

    /** Gitar akordunu değiştir */
    UFUNCTION(BlueprintCallable, Category = "Melovia|QuickAccess")
    void ChangeGuitarTuning(ETuningType NewTuning);

    /** Capo ayarla */
    UFUNCTION(BlueprintCallable, Category = "Melovia|QuickAccess")
    void SetGuitarCapo(int32 Fret);

protected:
    // Universal Note Core modülleri
    UPROPERTY()
    UGuitarModule* GuitarModule;

    UPROPERTY()
    UPianoModule* PianoModule;

    UPROPERTY()
    UChordLibrary* ChordLibrary;
};

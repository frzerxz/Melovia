// PianoModule.h
// Melovia - Piyano Modülü
//
// Piyano enstrüman simülasyonu:
// - 88 tuş (A0 - C8)
// - Tuş-nota eşleşmesi
// - Velocity (basma şiddeti) desteği
// - Sustain pedal

#pragma once

#include "CoreMinimal.h"
#include "UniversalNoteCore.h"
#include "PianoModule.generated.h"

// ============================================================
// ENUM: Piyano Tuş Rengi
// ============================================================
UENUM(BlueprintType)
enum class EKeyColor : uint8
{
    White   UMETA(DisplayName = "Beyaz Tus"),
    Black   UMETA(DisplayName = "Siyah Tus")
};

// ============================================================
// STRUCT: Piyano Tuşu
// ============================================================
USTRUCT(BlueprintType)
struct MELOVIACORE_API FPianoKey
{
    GENERATED_BODY()

    // Tuş numarası (1-88)
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Piano")
    int32 KeyNumber;

    // Nota bilgisi
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Piano")
    FNoteInfo Note;

    // Tuş rengi
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Piano")
    EKeyColor Color;

    // MIDI nota numarası
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Piano")
    int32 MidiNote;

    // Basılı mı?
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Piano")
    bool bIsPressed;

    FPianoKey()
        : KeyNumber(1), Color(EKeyColor::White), MidiNote(21), bIsPressed(false)
    {}
};

// ============================================================
// STRUCT: Çalınan Piyano Notası
// ============================================================
USTRUCT(BlueprintType)
struct MELOVIACORE_API FPianoPlayedNote
{
    GENERATED_BODY()

    UPROPERTY(BlueprintReadOnly, Category = "Piano")
    int32 KeyNumber;

    UPROPERTY(BlueprintReadOnly, Category = "Piano")
    float Frequency;

    UPROPERTY(BlueprintReadOnly, Category = "Piano")
    FNoteInfo NoteInfo;

    UPROPERTY(BlueprintReadOnly, Category = "Piano")
    float Velocity; // 0.0 - 1.0

    UPROPERTY(BlueprintReadOnly, Category = "Piano")
    FString DisplayString;

    FPianoPlayedNote()
        : KeyNumber(0), Frequency(0.0f), Velocity(0.75f)
    {}
};

// ============================================================
// CLASS: Piyano Modülü
// ============================================================
UCLASS(BlueprintType, Blueprintable)
class MELOVIACORE_API UPianoModule : public UObject
{
    GENERATED_BODY()

public:
    UPianoModule();

    /**
     * Piyano modülünü başlat
     * 88 tuşu oluşturur (A0 - C8)
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Piano")
    void Initialize();

    /**
     * Belirli tuş numarasındaki nota bilgisini al
     * @param KeyNumber - Tuş numarası (1-88)
     * @return Çalınan nota bilgisi
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Piano")
    FPianoPlayedNote GetNote(int32 KeyNumber, float Velocity = 0.75f) const;

    /**
     * MIDI notasından tuş numarasını al
     * @param MidiNote - MIDI numarası (21-108)
     * @return Tuş numarası (1-88)
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Piano")
    int32 MidiToKeyNumber(int32 MidiNote) const;

    /**
     * Belirli tuşun bilgisini al
     * @param KeyNumber - Tuş numarası
     * @return Tuş yapısı
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Piano")
    FPianoKey GetKey(int32 KeyNumber) const;

    /**
     * Toplam tuş sayısını al
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Piano")
    int32 GetTotalKeys() const { return Keys.Num(); }

    /**
     * Belirli notanın siyah tuş olup olmadığını kontrol et
     * @param Note - Nota adı
     * @return Siyah tuş mu?
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Piano")
    static bool IsBlackKey(ENoteName Note);

    /**
     * Sustain pedal durumunu ayarla
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Piano")
    void SetSustainPedal(bool bEnabled);

    UPROPERTY(BlueprintReadOnly, Category = "Melovia|Piano")
    bool bSustainActive;

private:
    // 88 tuşun tanımları
    UPROPERTY()
    TArray<FPianoKey> Keys;

    // Tuşları oluştur
    void BuildKeys();
};

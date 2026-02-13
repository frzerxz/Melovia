// GuitarModule.h
// Melovia - Gitar Modülü
//
// 6 telli gitar simülasyonu:
// - Standart ve alternatif akortlar
// - Capo desteği (1-12 perde)
// - Tel-perde-frekans hesaplama
// - Tel fiziksel parametreleri (decay, brightness vb.)
// - Strum (tarama) sistemi

#pragma once

#include "CoreMinimal.h"
#include "UniversalNoteCore.h"
#include "ChordLibrary.h"
#include "GuitarModule.generated.h"

// ============================================================
// ENUM: Akort Tipleri
// ============================================================
UENUM(BlueprintType)
enum class ETuningType : uint8
{
    Standard        UMETA(DisplayName = "Standard (E-A-D-G-B-E)"),
    DropD           UMETA(DisplayName = "Drop D (D-A-D-G-B-E)"),
    OpenG           UMETA(DisplayName = "Open G (D-G-D-G-B-D)"),
    OpenD           UMETA(DisplayName = "Open D (D-A-D-F#-A-D)"),
    DADGAD          UMETA(DisplayName = "DADGAD (D-A-D-G-A-D)"),
    HalfStepDown    UMETA(DisplayName = "Half Step Down (Eb-Ab-Db-Gb-Bb-Eb)")
};

// ============================================================
// ENUM: Gitar Tipleri
// ============================================================
UENUM(BlueprintType)
enum class EGuitarType : uint8
{
    Classic     UMETA(DisplayName = "Klasik Gitar"),
    Electric    UMETA(DisplayName = "Elektro Gitar"),
    Bass        UMETA(DisplayName = "Bas Gitar")
};

// ============================================================
// STRUCT: Tel Parametreleri
// Karplus-Strong algoritması için fiziksel parametreler
// ============================================================
USTRUCT(BlueprintType)
struct MELOVIACORE_API FStringParams
{
    GENERATED_BODY()

    // Tel numarası (1-6)
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Guitar")
    int32 StringNumber;

    // Açık tel frekansı (Hz)
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Guitar")
    float OpenFrequency;

    // Açık tel nota bilgisi
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Guitar")
    FString NoteName;

    // Sönümleme katsayısı (0.99-1.0 arası, 1'e yakın = uzun ses)
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Guitar|Karplus-Strong")
    float Decay;

    // Karışım oranı (0.4-0.5 arası)
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Guitar|Karplus-Strong")
    float Blend;

    // Parlaklık (0.0-1.0, yüksek = tiz)
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Guitar|Karplus-Strong")
    float Brightness;

    // Atak şiddeti (0.0-1.0)
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Guitar|Karplus-Strong")
    float AttackStrength;

    // Bass boost (dB)
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Guitar|Karplus-Strong")
    float BassBoostDB;

    FStringParams()
        : StringNumber(1), OpenFrequency(329.63f), NoteName(TEXT("E4"))
        , Decay(0.998f), Blend(0.5f), Brightness(1.0f)
        , AttackStrength(0.8f), BassBoostDB(0.0f)
    {}
};

// ============================================================
// STRUCT: Çalınan Nota Sonucu
// ============================================================
USTRUCT(BlueprintType)
struct MELOVIACORE_API FPlayedNote
{
    GENERATED_BODY()

    UPROPERTY(BlueprintReadOnly, Category = "Guitar")
    int32 StringNumber;

    UPROPERTY(BlueprintReadOnly, Category = "Guitar")
    int32 FretNumber;

    UPROPERTY(BlueprintReadOnly, Category = "Guitar")
    float Frequency;

    UPROPERTY(BlueprintReadOnly, Category = "Guitar")
    FNoteInfo NoteInfo;

    UPROPERTY(BlueprintReadOnly, Category = "Guitar")
    FString DisplayString;

    // Pozisyon gösterim metni (ör: "Tel 5, Perde 0")
    UPROPERTY(BlueprintReadOnly, Category = "Guitar")
    FString PositionString;

    FPlayedNote()
        : StringNumber(0), FretNumber(0), Frequency(0.0f)
    {}
};

// ============================================================
// CLASS: Gitar Modülü
// ============================================================
UCLASS(BlueprintType, Blueprintable)
class MELOVIACORE_API UGuitarModule : public UObject
{
    GENERATED_BODY()

public:
    UGuitarModule();

    // ----------------------------------------------------------
    // BAŞLATMA
    // ----------------------------------------------------------

    /**
     * Gitar modülünü başlat
     * @param Type - Gitar tipi (Klasik, Elektro, Bas)
     * @param Tuning - Akort tipi
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Guitar")
    void Initialize(EGuitarType Type = EGuitarType::Classic, 
                    ETuningType Tuning = ETuningType::Standard);

    // ----------------------------------------------------------
    // NOTA ÇALMA
    // ----------------------------------------------------------

    /**
     * Belirli tel ve perdedeki notanın bilgilerini al
     * @param StringNumber - Tel (1-6)
     * @param Fret - Perde (0-24)
     * @return Çalınan nota bilgisi
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Guitar")
    FPlayedNote GetNote(int32 StringNumber, int32 Fret) const;

    /**
     * Belirli tel ve perdedeki frekansı hesapla
     * Capo varsa capo pozisyonu eklenir
     * @param StringNumber - Tel (1-6)
     * @param Fret - Perde (0-24)
     * @return Frekans (Hz)
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Guitar")
    float GetFrequencyAtFret(int32 StringNumber, int32 Fret) const;

    // ----------------------------------------------------------
    // AKORT
    // ----------------------------------------------------------

    /**
     * Akort tipini değiştir
     * @param NewTuning - Yeni akort tipi
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Guitar")
    void SetTuning(ETuningType NewTuning);

    /**
     * Mevcut akortu al
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Guitar")
    ETuningType GetCurrentTuning() const { return CurrentTuning; }

    /**
     * Belirli akorttaki açık tel frekanslarını al
     * @param Tuning - Akort tipi
     * @return 6 elemanlı frekans dizisi (Tel 6'dan 1'e)
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Guitar")
    static TArray<float> GetOpenStringFrequencies(ETuningType Tuning);

    // ----------------------------------------------------------
    // CAPO
    // ----------------------------------------------------------

    /**
     * Capo pozisyonunu ayarla
     * @param Fret - Capo perdesi (0=kapalı, 1-12)
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Guitar")
    void SetCapo(int32 Fret);

    /**
     * Capo pozisyonunu al
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Guitar")
    int32 GetCapoPosition() const { return CapoPosition; }

    // ----------------------------------------------------------
    // TEL PARAMETRELERİ
    // ----------------------------------------------------------

    /**
     * Belirli telin Karplus-Strong parametrelerini al
     * @param StringNumber - Tel (1-6)
     * @return Tel parametreleri
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Guitar")
    FStringParams GetStringParams(int32 StringNumber) const;

    /**
     * Tüm tel parametrelerini al
     * @return 6 elemanlı parametre dizisi
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Guitar")
    TArray<FStringParams> GetAllStringParams() const { return StringParameters; }

    // ----------------------------------------------------------
    // GİTAR TİPİ
    // ----------------------------------------------------------

    UFUNCTION(BlueprintCallable, Category = "Melovia|Guitar")
    EGuitarType GetGuitarType() const { return GuitarType; }

    UFUNCTION(BlueprintCallable, Category = "Melovia|Guitar")
    void SetGuitarType(EGuitarType NewType);

    // ----------------------------------------------------------
    // TOPLAM PERDE SAYISI
    // ----------------------------------------------------------

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Melovia|Guitar")
    int32 TotalFrets;

private:
    // Mevcut gitar tipi
    UPROPERTY()
    EGuitarType GuitarType;

    // Mevcut akort
    UPROPERTY()
    ETuningType CurrentTuning;

    // Capo pozisyonu (0 = yok)
    UPROPERTY()
    int32 CapoPosition;

    // 6 telin açık frekansları (index 0 = Tel 6 en kalın)
    UPROPERTY()
    TArray<float> OpenStrings;

    // 6 telin fiziksel parametreleri
    UPROPERTY()
    TArray<FStringParams> StringParameters;

    // Karplus-Strong parametrelerini başlat
    void InitializeStringParameters();

    // Açık tel frekanslarını akorda göre ayarla
    void ApplyTuning();
};

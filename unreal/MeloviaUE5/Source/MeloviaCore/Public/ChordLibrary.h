// ChordLibrary.h
// Melovia - Akor Kütüphanesi
//
// 20+ akorun tanımları, parmak pozisyonları ve nota bileşenleri.
// Web versiyonundaki chordLibrary ile senkronize.
//
// Akor tipleri:
// - Major (Majör): Parlak, neşeli ses
// - Minor (Minör): Hüzünlü, duygusal ses
// - 7th (Yedili): Blues/Jazz karakteri
// - Maj7 (Majör Yedili): Yumuşak, sofistike ses
// - Power Chord: Sadece kök + 5li (rock/metal)

#pragma once

#include "CoreMinimal.h"
#include "UniversalNoteCore.h"
#include "ChordLibrary.generated.h"

// ============================================================
// ENUM: Akor Tipi
// ============================================================
UENUM(BlueprintType)
enum class EChordType : uint8
{
    Major       UMETA(DisplayName = "Majör"),
    Minor       UMETA(DisplayName = "Minör"),
    Seventh     UMETA(DisplayName = "7li"),
    MajorSeventh UMETA(DisplayName = "Maj7"),
    PowerChord  UMETA(DisplayName = "Power Chord"),
    Diminished  UMETA(DisplayName = "Diminished"),
    Augmented   UMETA(DisplayName = "Augmented"),
    Sus2        UMETA(DisplayName = "Sus2"),
    Sus4        UMETA(DisplayName = "Sus4")
};

// ============================================================
// STRUCT: Parmak Pozisyonu (tek tel için)
// ============================================================
USTRUCT(BlueprintType)
struct MELOVIACORE_API FFingerPosition
{
    GENERATED_BODY()

    // Tel numarası (1=en ince e, 6=en kalın E)
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Chord")
    int32 StringNumber;

    // Perde numarası (0=açık tel, -1=çalınmaz/muted)
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Chord")
    int32 FretNumber;

    // Bu tel çalınacak mı?
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Chord")
    bool bIsMuted;

    FFingerPosition()
        : StringNumber(1), FretNumber(0), bIsMuted(false)
    {}

    FFingerPosition(int32 InString, int32 InFret, bool InMuted = false)
        : StringNumber(InString), FretNumber(InFret), bIsMuted(InMuted)
    {}
};

// ============================================================
// STRUCT: Akor Tanımı
// ============================================================
USTRUCT(BlueprintType)
struct MELOVIACORE_API FChordDefinition
{
    GENERATED_BODY()

    // Akor adı (ör: "Am", "G", "F")
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Chord")
    FString Name;

    // Akor tipi
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Chord")
    EChordType Type;

    // Kök nota
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Chord")
    ENoteName RootNote;

    // Parmak pozisyonları dizgisi (web formatı: "x-0-2-2-1-0")
    // Sıra: Tel6-Tel5-Tel4-Tel3-Tel2-Tel1
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Chord")
    FString FingerString;

    // Her tel için perde pozisyonları (-1=muted, 0=açık, 1+=perde)
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Chord")
    TArray<FFingerPosition> Positions;

    // Akorun içerdiği notalar
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Chord")
    TArray<ENoteName> ChordNotes;

    // Barre akoru mu? (işaret parmağı tüm telleri kapatır)
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Chord")
    bool bIsBarre;

    // Barre perdesi (eğer barre ise)
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Chord")
    int32 BarreFret;

    // Zorluk seviyesi (1=kolay, 5=çok zor)
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Chord")
    int32 Difficulty;

    FChordDefinition()
        : Type(EChordType::Major)
        , RootNote(ENoteName::C)
        , bIsBarre(false)
        , BarreFret(0)
        , Difficulty(1)
    {}
};

// ============================================================
// CLASS: Akor Kütüphanesi
// ============================================================
UCLASS(BlueprintType, Blueprintable)
class MELOVIACORE_API UChordLibrary : public UObject
{
    GENERATED_BODY()

public:
    UChordLibrary();

    /**
     * Tüm akor kütüphanesini başlat
     * 20+ akor tanımını yükler
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Chords")
    void InitializeLibrary();

    /**
     * Akor adına göre akor bilgisi al
     * @param ChordName - "Am", "G", "E7" gibi
     * @return Akor tanımı
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Chords")
    FChordDefinition GetChord(const FString& ChordName) const;

    /**
     * Belirli tipteki tüm akorları al
     * @param Type - Major, Minor, 7th vb.
     * @return Akor listesi
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Chords")
    TArray<FChordDefinition> GetChordsByType(EChordType Type) const;

    /**
     * Belirli kök notadaki tüm akorları al
     * @param Root - Kök nota (A, C, D vb.)
     * @return Akor listesi
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Chords")
    TArray<FChordDefinition> GetChordsByRoot(ENoteName Root) const;

    /**
     * Tüm akor isimlerini al
     * @return Akor isimleri listesi
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Chords")
    TArray<FString> GetAllChordNames() const;

    /**
     * Akor var mı kontrol et
     * @param ChordName - Aranacak akor adı
     * @return Var mı?
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Chords")
    bool HasChord(const FString& ChordName) const;

    /**
     * Parmak dizgisini pozisyon dizisine çevir
     * "x-0-2-2-1-0" → [(-1), (0), (2), (2), (1), (0)]
     * @param FingerString - Web formatındaki parmak dizgisi
     * @return Pozisyon dizisi
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Chords")
    static TArray<FFingerPosition> ParseFingerString(const FString& FingerString);

private:
    // Akor veritabanı: Akor adı → Tanım
    UPROPERTY()
    TMap<FString, FChordDefinition> ChordDatabase;

    // Yardımcı: Akor ekleme
    void AddChord(const FString& Name, EChordType Type, ENoteName Root,
                  const FString& Fingers, const TArray<ENoteName>& Notes,
                  bool bBarre = false, int32 BarreFret = 0, int32 Diff = 1);
};

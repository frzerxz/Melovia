// UniversalNoteCore.h
// Melovia - Universal Note Core
// Tüm enstrümanlar için ortak nota-frekans altyapısı
//
// Bu sınıf, müzik teorisinin temel yapı taşlarını içerir:
// - Nota isimleri (Türkçe ve uluslararası)
// - Frekans hesaplama (12-TET eşit temperli akort sistemi)
// - Oktav yönetimi
// - Transpozisyon (ton değiştirme)
// - MIDI nota numaraları
//
// TÜBİTAK 2209-A Projesi - Melovia
// Geliştirici: Firuze Eroğlu
// Balıkesir Üniversitesi / Mühendislik Fakültesi

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "UniversalNoteCore.generated.h"

// ============================================================
// ENUM: Nota İsimleri (Yarım ton dahil, 12 nota)
// ============================================================
UENUM(BlueprintType)
enum class ENoteName : uint8
{
    C       UMETA(DisplayName = "DO (C)"),
    CSharp  UMETA(DisplayName = "DO# (C#)"),
    D       UMETA(DisplayName = "RE (D)"),
    DSharp  UMETA(DisplayName = "RE# (D#)"),
    E       UMETA(DisplayName = "Mİ (E)"),
    F       UMETA(DisplayName = "FA (F)"),
    FSharp  UMETA(DisplayName = "FA# (F#)"),
    G       UMETA(DisplayName = "SOL (G)"),
    GSharp  UMETA(DisplayName = "SOL# (G#)"),
    A       UMETA(DisplayName = "LA (A)"),
    ASharp  UMETA(DisplayName = "LA# (A#)"),
    B       UMETA(DisplayName = "Sİ (B)")
};

// ============================================================
// STRUCT: Nota Bilgisi
// Bir notanın tüm bilgilerini tutar
// ============================================================
USTRUCT(BlueprintType)
struct MELOVIACORE_API FNoteInfo
{
    GENERATED_BODY()

    // Nota adı (enum)
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Note")
    ENoteName NoteName;

    // Oktav (0-8 arası)
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Note")
    int32 Octave;

    // Frekans (Hz)
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Note")
    float Frequency;

    // MIDI nota numarası (0-127)
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Note")
    int32 MidiNote;

    // Türkçe nota adı (görüntüleme için)
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Note")
    FString TurkishName;

    // Uluslararası nota adı
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Note")
    FString InternationalName;

    // Varsayılan constructor
    FNoteInfo()
        : NoteName(ENoteName::A)
        , Octave(4)
        , Frequency(440.0f)
        , MidiNote(69)
        , TurkishName(TEXT("LA"))
        , InternationalName(TEXT("A4"))
    {}

    // Parametreli constructor
    FNoteInfo(ENoteName InNote, int32 InOctave, float InFreq, int32 InMidi, 
              const FString& InTurkish, const FString& InInternational)
        : NoteName(InNote)
        , Octave(InOctave)
        , Frequency(InFreq)
        , MidiNote(InMidi)
        , TurkishName(InTurkish)
        , InternationalName(InInternational)
    {}
};

// ============================================================
// STRUCT: Transpozisyon Sonucu
// ============================================================
USTRUCT(BlueprintType)
struct MELOVIACORE_API FTransposeResult
{
    GENERATED_BODY()

    UPROPERTY(BlueprintReadOnly, Category = "Transpose")
    ENoteName OriginalNote;

    UPROPERTY(BlueprintReadOnly, Category = "Transpose")
    int32 OriginalOctave;

    UPROPERTY(BlueprintReadOnly, Category = "Transpose")
    ENoteName TransposedNote;

    UPROPERTY(BlueprintReadOnly, Category = "Transpose")
    int32 TransposedOctave;

    UPROPERTY(BlueprintReadOnly, Category = "Transpose")
    float TransposedFrequency;

    FTransposeResult()
        : OriginalNote(ENoteName::C)
        , OriginalOctave(4)
        , TransposedNote(ENoteName::C)
        , TransposedOctave(4)
        , TransposedFrequency(261.63f)
    {}
};

// ============================================================
// CLASS: Universal Note Core
// Tüm enstrümanların paylaştığı temel nota/frekans sistemi
// ============================================================
UCLASS(BlueprintType, Blueprintable)
class MELOVIACORE_API UUniversalNoteCore : public UObject
{
    GENERATED_BODY()

public:
    UUniversalNoteCore();

    // ----------------------------------------------------------
    // FREKANS HESAPLAMA
    // ----------------------------------------------------------

    /**
     * Nota adı ve oktavdan frekans hesapla
     * Formül: f = 440 × 2^((n-69)/12)
     * n = MIDI nota numarası
     * 
     * @param Note - Nota adı (DO, RE, Mİ, ...)
     * @param Octave - Oktav numarası (0-8)
     * @return Frekans (Hz)
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|NoteCore")
    static float GetFrequency(ENoteName Note, int32 Octave);

    /**
     * MIDI nota numarasından frekans hesapla
     * Formül: f = 440 × 2^((midi-69)/12)
     * 
     * @param MidiNote - MIDI nota numarası (0-127)
     * @return Frekans (Hz)
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|NoteCore")
    static float GetFrequencyFromMidi(int32 MidiNote);

    /**
     * Yarım ton (semitone) kaymasından frekans hesapla
     * Formül: f = baseFreq × 2^(semitones/12)
     * 
     * @param BaseFrequency - Başlangıç frekansı (Hz)
     * @param Semitones - Yarım ton kaydırma miktarı (negatif = aşağı)
     * @return Yeni frekans (Hz)
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|NoteCore")
    static float TransposeFrequency(float BaseFrequency, int32 Semitones);

    // ----------------------------------------------------------
    // NOTA BİLGİSİ
    // ----------------------------------------------------------

    /**
     * Nota adı ve oktavdan tam nota bilgisi oluştur
     * 
     * @param Note - Nota adı
     * @param Octave - Oktav
     * @return FNoteInfo yapısı
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|NoteCore")
    static FNoteInfo GetNoteInfo(ENoteName Note, int32 Octave);

    /**
     * Frekansa en yakın notayı bul
     * 
     * @param Frequency - Aranan frekans (Hz)
     * @return En yakın nota bilgisi
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|NoteCore")
    static FNoteInfo FindClosestNote(float Frequency);

    /**
     * MIDI nota numarasından nota bilgisi al
     * 
     * @param MidiNote - MIDI numarası (0-127)
     * @return FNoteInfo
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|NoteCore")
    static FNoteInfo GetNoteInfoFromMidi(int32 MidiNote);

    // ----------------------------------------------------------
    // TRANSPOZISYON
    // ----------------------------------------------------------

    /**
     * Bir notayı belirli yarım ton kaydır
     * Örnek: LA(A4) + 3 yarım ton = DO(C5)
     * 
     * @param Note - Orijinal nota
     * @param Octave - Orijinal oktav
     * @param Semitones - Kaydırma miktarı
     * @return Transpozisyon sonucu
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|NoteCore")
    static FTransposeResult Transpose(ENoteName Note, int32 Octave, int32 Semitones);

    // ----------------------------------------------------------
    // NOTA İSİMLERİ
    // ----------------------------------------------------------

    /**
     * Nota adının Türkçe karşılığını al
     * @param Note - Nota enum değeri
     * @return Türkçe isim (DO, RE, Mİ, FA, SOL, LA, Sİ)
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|NoteCore")
    static FString GetTurkishNoteName(ENoteName Note);

    /**
     * Nota adının uluslararası karşılığını al
     * @param Note - Nota enum değeri
     * @return Uluslararası isim (C, D, E, F, G, A, B)
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|NoteCore")
    static FString GetInternationalNoteName(ENoteName Note);

    /**
     * Nota adını tam gösterim formatında al
     * Örnek: "LA (A4) - 440.0 Hz"
     * 
     * @param Note - Nota adı
     * @param Octave - Oktav
     * @return Formatlanmış metin
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|NoteCore")
    static FString GetNoteDisplayString(ENoteName Note, int32 Octave);

    // ----------------------------------------------------------
    // MIDI DÖNÜŞÜM
    // ----------------------------------------------------------

    /**
     * Nota ve oktavdan MIDI numarası hesapla
     * MIDI: C4 = 60, A4 = 69
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|NoteCore")
    static int32 GetMidiNote(ENoteName Note, int32 Octave);

    // ----------------------------------------------------------
    // YARDIMCI FONKSİYONLAR
    // ----------------------------------------------------------

    /**
     * İki frekans arasındaki yarım ton farkını hesapla
     * Formül: 12 × log2(f2/f1)
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|NoteCore")
    static float GetSemitoneDifference(float Freq1, float Freq2);

    /**
     * İki frekans arasındaki cent farkını hesapla
     * 1 yarım ton = 100 cent
     * Formül: 1200 × log2(f2/f1)
     */
    UFUNCTION(BlueprintCallable, Category = "Melovia|NoteCore")
    static float GetCentDifference(float Freq1, float Freq2);

    /**
     * A4 referans frekansı (varsayılan 440 Hz)
     * Bazı orkestralarda 442 Hz kullanılır
     */
    static float A4ReferenceFrequency;

private:
    // Türkçe nota isimleri tablosu
    static const TArray<FString>& GetTurkishNoteNames();
    
    // Uluslararası nota isimleri tablosu
    static const TArray<FString>& GetInternationalNoteNames();
};

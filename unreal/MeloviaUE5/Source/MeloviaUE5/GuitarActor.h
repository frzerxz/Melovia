// GuitarActor.h
// Melovia v0.2 - 3D Gitar Aktörü
// 
// Sahnede yerleştirilecek 3D gitar modeli.
// Tel titreşim animasyonları ve fret vurgulama içerir.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "ProceduralMeshComponent.h"
#include "GuitarModule.h"
#include "UniversalNoteCore.h"
#include "GuitarActor.generated.h"

// Tel titreşim durumu
USTRUCT(BlueprintType)
struct FStringVibrationState
{
    GENERATED_BODY()

    UPROPERTY(BlueprintReadOnly)
    bool bIsVibrating = false;

    UPROPERTY(BlueprintReadOnly)
    float Frequency = 0.0f;

    UPROPERTY(BlueprintReadOnly)
    float Amplitude = 1.0f;

    UPROPERTY(BlueprintReadOnly)
    float TimeElapsed = 0.0f;

    UPROPERTY(BlueprintReadOnly)
    float Duration = 2.0f;

    UPROPERTY(BlueprintReadOnly)
    int32 Fret = 0;
};

UCLASS(Blueprintable)
class MELOVIAUE5_API AGuitarActor : public AActor
{
    GENERATED_BODY()

public:
    AGuitarActor();

    virtual void Tick(float DeltaTime) override;

protected:
    virtual void BeginPlay() override;

public:
    // ==================================================
    // MESH BİLEŞENLERİ
    // ==================================================

    /** Gitar gövdesi mesh */
    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Melovia|Guitar")
    UStaticMeshComponent* BodyMesh;

    /** Gitar sapı mesh */
    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Melovia|Guitar")
    UStaticMeshComponent* NeckMesh;

    /** Köprü (bridge) */
    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Melovia|Guitar")
    UStaticMeshComponent* BridgeMesh;

    /** Tel procedural mesh bileşenleri (6 tel) */
    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Melovia|Strings")
    TArray<UProceduralMeshComponent*> StringMeshes;

    /** Perde işaretçileri (fret markers / inlays) */
    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Melovia|Guitar")
    TArray<UStaticMeshComponent*> FretMarkers;

    /** Vurgulanan perde göstergesi */
    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Melovia|Guitar")
    UStaticMeshComponent* HighlightIndicator;

    // ==================================================
    // AYARLAR
    // ==================================================

    /** Tel başlangıç pozisyonu (köprü tarafı) */
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Melovia|Settings")
    FVector StringStartOffset = FVector(0.0f, -35.0f, 2.0f);

    /** Tel bitiş pozisyonu (burgu tarafı) */
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Melovia|Settings")
    FVector StringEndOffset = FVector(0.0f, 35.0f, 2.0f);

    /** Teller arası mesafe */
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Melovia|Settings")
    float StringSpacing = 1.2f;

    /** Tel segman sayısı (titreşim detayı) */
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Melovia|Settings")
    int32 StringSegments = 64;

    /** Titreşim genliği */
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Melovia|Settings")
    float VibrationAmplitude = 0.3f;

    /** Titreşim sönümlenme hızı */
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Melovia|Settings")
    float VibrationDecayRate = 2.0f;

    /** Perde sayısı (görsel) */
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Melovia|Settings")
    int32 VisibleFrets = 12;

    // ==================================================
    // BLUEPRINT FONKSİYONLARI
    // ==================================================

    /** Belirli bir teli çal ve titreşim animasyonu başlat */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Guitar")
    void PlayString(int32 StringNum, int32 Fret);

    /** Telin titreşimini durdur */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Guitar")
    void StopString(int32 StringNum);

    /** Tüm telleri durdur */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Guitar")
    void StopAllStrings();

    /** Belirli bir perdeyi vurgula (ışıklı gösterge) */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Guitar")
    void HighlightFret(int32 StringNum, int32 Fret);

    /** Vurgulamayı temizle */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Guitar")
    void ClearHighlight();

    /** Akor çal (tüm telleri sırayla tetikle) */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Guitar")
    void PlayChord(const TArray<int32>& Frets);

    /** Titreşim durumunu oku */
    UFUNCTION(BlueprintCallable, BlueprintPure, Category = "Melovia|Guitar")
    FStringVibrationState GetStringState(int32 StringNum) const;

    /** Bir tel titreşiyor mu? */
    UFUNCTION(BlueprintCallable, BlueprintPure, Category = "Melovia|Guitar")
    bool IsStringVibrating(int32 StringNum) const;

    // ==================================================
    // OLAY (EVENT) DELEYGATLERİ
    // ==================================================

    /** Nota çalındığında tetiklenir */
    DECLARE_DYNAMIC_MULTICAST_DELEGATE_ThreeParams(FOnNotePlayedSignature, int32, StringNum, int32, Fret, float, Frequency);

    UPROPERTY(BlueprintAssignable, Category = "Melovia|Events")
    FOnNotePlayedSignature OnNotePlayed;

    /** Tel titreşimi durduğunda tetiklenir */
    DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnStringStoppedSignature, int32, StringNum);

    UPROPERTY(BlueprintAssignable, Category = "Melovia|Events")
    FOnStringStoppedSignature OnStringStopped;

private:
    // Tel titreşim durumları
    FStringVibrationState StringStates[6];

    // Telleri prosedürel olarak oluştur
    void GenerateStringMesh(int32 StringIndex);

    // Titreşen tel mesh'ini güncelle
    void UpdateVibrationMesh(int32 StringIndex, float DeltaTime);

    // Tel renkleri
    FLinearColor GetStringColor(int32 StringIndex) const;

    // Perde pozisyonunu hesapla (fret pozisyonu -> world space)
    FVector GetFretWorldPosition(int32 StringNum, int32 Fret) const;
};

// MeloviaSceneManager.h
// Melovia v0.2 - Sahne Yöneticisi
//
// Kamera sistemi, ışıklandırma ve ortam yönetimi.
// Farklı kamera açıları arasında smooth geçiş sağlar.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "Camera/CameraComponent.h"
#include "GameFramework/SpringArmComponent.h"
#include "Components/SpotLightComponent.h"
#include "Components/PointLightComponent.h"
#include "MeloviaSceneManager.generated.h"

/** Kamera görünüm modları */
UENUM(BlueprintType)
enum class ECameraView : uint8
{
    Front       UMETA(DisplayName = "Önden Görünüm"),
    Side        UMETA(DisplayName = "Yandan Görünüm"),
    CloseUp     UMETA(DisplayName = "Yakın Çekim"),
    TopDown     UMETA(DisplayName = "Üstten Görünüm"),
    Free        UMETA(DisplayName = "Serbest Kamera")
};

/** Sahne ortam modları */
UENUM(BlueprintType)
enum class ESceneAmbience : uint8
{
    Studio      UMETA(DisplayName = "Stüdyo"),
    Concert     UMETA(DisplayName = "Konser"),
    Bedroom     UMETA(DisplayName = "Oda"),
    Dark        UMETA(DisplayName = "Karanlık")
};

UCLASS(Blueprintable)
class MELOVIAUE5_API AMeloviaSceneManager : public AActor
{
    GENERATED_BODY()

public:
    AMeloviaSceneManager();

    virtual void Tick(float DeltaTime) override;

protected:
    virtual void BeginPlay() override;

public:
    // ==================================================
    // KAMERA BİLEŞENLERİ
    // ==================================================

    /** Ana kamera bileşeni */
    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Melovia|Camera")
    UCameraComponent* MainCamera;

    /** Kamera kolu (Spring Arm) */
    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Melovia|Camera")
    USpringArmComponent* CameraArm;

    // ==================================================
    // IŞIK BİLEŞENLERİ
    // ==================================================

    /** Ana spot ışığı */
    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Melovia|Lighting")
    USpotLightComponent* KeyLight;

    /** Dolgu ışığı */
    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Melovia|Lighting")
    USpotLightComponent* FillLight;

    /** Arka ışık (rim light) */
    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Melovia|Lighting")
    USpotLightComponent* RimLight;

    /** Ortam noktasal ışığı */
    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Melovia|Lighting")
    UPointLightComponent* AmbientLight;

    // ==================================================
    // AYARLAR
    // ==================================================

    /** Mevcut kamera görünümü */
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Melovia|Camera")
    ECameraView CurrentView = ECameraView::Front;

    /** Kamera geçiş süresi (saniye) */
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Melovia|Camera")
    float CameraTransitionSpeed = 3.0f;

    /** Hedef gitar aktörü */
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Melovia|Scene")
    AActor* TargetGuitarActor;

    // ==================================================
    // KAMERA FONKSİYONLARI
    // ==================================================

    /** Kamera görünümünü değiştir */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Camera")
    void SwitchCamera(ECameraView NewView);

    /** Sonraki kamera açısına geç */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Camera")
    void NextCameraView();

    /** Belirli bir perdeye yakınlaş */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Camera")
    void FocusOnFret(int32 StringNum, int32 Fret);

    /** Kamerayı varsayılana döndür */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Camera")
    void ResetCamera();

    // ==================================================
    // IŞIK FONKSİYONLARI
    // ==================================================

    /** Ortam modunu değiştir */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Lighting")
    void SetAmbience(ESceneAmbience Ambience);

    /** Ana ışık rengini ayarla */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Lighting")
    void SetKeyLightColor(FLinearColor Color);

    /** Ortam ışık yoğunluğunu ayarla */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Lighting")
    void SetAmbientIntensity(float Intensity);

    /** Nota çalındığında ışık pulse efekti */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Lighting")
    void TriggerNotePulse(float Intensity = 1.0f);

    /** Mevcut kamera görünümünü döndür */
    UFUNCTION(BlueprintCallable, BlueprintPure, Category = "Melovia|Camera")
    ECameraView GetCurrentView() const { return CurrentView; }

private:
    // Kamera geçiş durumu
    bool bIsTransitioning = false;
    FVector TargetCameraLocation;
    FRotator TargetCameraRotation;
    float TargetArmLength;

    // Işık pulse durumu
    float PulseTimer = 0.0f;
    float PulseIntensity = 0.0f;
    float BaseKeyLightIntensity = 0.0f;

    // Kamera preset pozisyonlarını al
    void GetCameraPreset(ECameraView View, FVector& OutLocation, FRotator& OutRotation, float& OutArmLength) const;

    // Ortam preset değerlerini uygula
    void ApplyAmbiencePreset(ESceneAmbience Ambience);
};

// MeloviaPlayerController.h
// Melovia v0.2 - Oyuncu Girdi Yönetimi
//
// Klavye girişlerini gitar notalarına bağlar.
// GuitarActor ve SceneManager ile iletişim kurar.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/PlayerController.h"
#include "GuitarActor.h"
#include "MeloviaSceneManager.h"
#include "MeloviaPlayerController.generated.h"

UCLASS(Blueprintable)
class MELOVIAUE5_API AMeloviaPlayerController : public APlayerController
{
    GENERATED_BODY()

public:
    AMeloviaPlayerController();

protected:
    virtual void BeginPlay() override;
    virtual void SetupInputComponent() override;

public:
    // ==================================================
    // REFERANSLAR
    // ==================================================

    /** Sahne yöneticisi referansı */
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Melovia")
    AMeloviaSceneManager* SceneManager;

    /** Gitar aktörü referansı */
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Melovia")
    AGuitarActor* GuitarActor;

    // ==================================================
    // AYARLAR
    // ==================================================

    /** Aktif tel (1-6) */
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Melovia|Input")
    int32 ActiveString = 1;

    /** Mouse tıklama ile nota çalma aktif mi */
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Melovia|Input")
    bool bMouseInputEnabled = true;

    // ==================================================
    // BLUEPRINT FONKSİYONLARI
    // ==================================================

    /** Nota girişi (tel + perde) */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Input")
    void OnNoteInput(int32 StringNum, int32 Fret);

    /** Akor çal */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Input")
    void OnChordInput(const FString& ChordName);

    /** Aktif teli değiştir */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Input")
    void SetActiveString(int32 StringNum);

    /** Kamera açısını değiştir */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Input")
    void CycleCamera();

    /** Tüm telleri durdur */
    UFUNCTION(BlueprintCallable, Category = "Melovia|Input")
    void StopAll();

    /** Sahne referanslarını otomatik bul */
    UFUNCTION(BlueprintCallable, Category = "Melovia")
    void FindSceneActors();

private:
    // Input action handler'ları
    void OnFret0Pressed();
    void OnFret1Pressed();
    void OnFret2Pressed();
    void OnFret3Pressed();
    void OnFret4Pressed();
    void OnFret5Pressed();
    void OnFret6Pressed();
    void OnFret7Pressed();
    void OnFret8Pressed();
    void OnFret9Pressed();
    void OnFret10Pressed();
    void OnFret11Pressed();
    void OnFret12Pressed();

    void OnString1Selected();
    void OnString2Selected();
    void OnString3Selected();
    void OnString4Selected();
    void OnString5Selected();
    void OnString6Selected();

    void OnCameraCycle();
    void OnStopAll();

    // Nota çal ve efekt tetikle
    void PlayNoteWithEffects(int32 StringNum, int32 Fret);
};

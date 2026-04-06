// MeloviaSceneManager.cpp
// Melovia v0.2 - Sahne Yöneticisi Implementation

#include "MeloviaSceneManager.h"

AMeloviaSceneManager::AMeloviaSceneManager()
{
    PrimaryActorTick.bCanEverTick = true;

    // Root
    USceneComponent* Root = CreateDefaultSubobject<USceneComponent>(TEXT("SceneRoot"));
    SetRootComponent(Root);

    // Spring Arm (kamera kolu)
    CameraArm = CreateDefaultSubobject<USpringArmComponent>(TEXT("CameraArm"));
    CameraArm->SetupAttachment(Root);
    CameraArm->TargetArmLength = 80.0f;
    CameraArm->bDoCollisionTest = false;
    CameraArm->bEnableCameraLag = true;
    CameraArm->CameraLagSpeed = 5.0f;
    CameraArm->SetRelativeRotation(FRotator(-25.0f, 0.0f, 0.0f));

    // Ana kamera
    MainCamera = CreateDefaultSubobject<UCameraComponent>(TEXT("MainCamera"));
    MainCamera->SetupAttachment(CameraArm);
    MainCamera->FieldOfView = 60.0f;

    // === 3-Point Lighting Setup ===

    // Key Light (Ana ışık - sol üstten)
    KeyLight = CreateDefaultSubobject<USpotLightComponent>(TEXT("KeyLight"));
    KeyLight->SetupAttachment(Root);
    KeyLight->SetRelativeLocation(FVector(-60.0f, 30.0f, 80.0f));
    KeyLight->SetRelativeRotation(FRotator(-45.0f, 30.0f, 0.0f));
    KeyLight->Intensity = 8000.0f;
    KeyLight->SetLightColor(FLinearColor(1.0f, 0.95f, 0.9f)); // Sıcak beyaz
    KeyLight->InnerConeAngle = 25.0f;
    KeyLight->OuterConeAngle = 45.0f;
    KeyLight->AttenuationRadius = 300.0f;

    // Fill Light (Dolgu ışığı - sağdan)
    FillLight = CreateDefaultSubobject<USpotLightComponent>(TEXT("FillLight"));
    FillLight->SetupAttachment(Root);
    FillLight->SetRelativeLocation(FVector(50.0f, 20.0f, 50.0f));
    FillLight->SetRelativeRotation(FRotator(-30.0f, -20.0f, 0.0f));
    FillLight->Intensity = 3000.0f;
    FillLight->SetLightColor(FLinearColor(0.7f, 0.8f, 1.0f)); // Soğuk mavi
    FillLight->InnerConeAngle = 30.0f;
    FillLight->OuterConeAngle = 60.0f;
    FillLight->AttenuationRadius = 250.0f;

    // Rim Light (Arka ışık - arkadan)
    RimLight = CreateDefaultSubobject<USpotLightComponent>(TEXT("RimLight"));
    RimLight->SetupAttachment(Root);
    RimLight->SetRelativeLocation(FVector(0.0f, -40.0f, 60.0f));
    RimLight->SetRelativeRotation(FRotator(-40.0f, 180.0f, 0.0f));
    RimLight->Intensity = 5000.0f;
    RimLight->SetLightColor(FLinearColor(0.6f, 0.5f, 1.0f)); // Mor vurgu
    RimLight->InnerConeAngle = 20.0f;
    RimLight->OuterConeAngle = 40.0f;
    RimLight->AttenuationRadius = 200.0f;

    // Ambient Light (Ortam ışığı)
    AmbientLight = CreateDefaultSubobject<UPointLightComponent>(TEXT("AmbientLight"));
    AmbientLight->SetupAttachment(Root);
    AmbientLight->SetRelativeLocation(FVector(0.0f, 0.0f, 100.0f));
    AmbientLight->Intensity = 1500.0f;
    AmbientLight->SetLightColor(FLinearColor(0.4f, 0.3f, 0.6f)); // Hafif mor
    AmbientLight->AttenuationRadius = 500.0f;

    BaseKeyLightIntensity = 8000.0f;
}

void AMeloviaSceneManager::BeginPlay()
{
    Super::BeginPlay();

    // Varsayılan kamera pozisyonunu ayarla
    SwitchCamera(ECameraView::Front);

    UE_LOG(LogTemp, Log, TEXT("MELOVIA: Scene Manager hazır - Kamera ve ışık sistemi aktif"));
}

void AMeloviaSceneManager::Tick(float DeltaTime)
{
    Super::Tick(DeltaTime);

    // Kamera geçişi (smooth interpolation)
    if (bIsTransitioning)
    {
        FVector CurrentLoc = CameraArm->GetRelativeLocation();
        FRotator CurrentRot = CameraArm->GetRelativeRotation();
        float CurrentLength = CameraArm->TargetArmLength;

        FVector NewLoc = FMath::VInterpTo(CurrentLoc, TargetCameraLocation, DeltaTime, CameraTransitionSpeed);
        FRotator NewRot = FMath::RInterpTo(CurrentRot, TargetCameraRotation, DeltaTime, CameraTransitionSpeed);
        float NewLength = FMath::FInterpTo(CurrentLength, TargetArmLength, DeltaTime, CameraTransitionSpeed);

        CameraArm->SetRelativeLocation(NewLoc);
        CameraArm->SetRelativeRotation(NewRot);
        CameraArm->TargetArmLength = NewLength;

        // Geçiş tamamlandı mı?
        if (FVector::Distance(NewLoc, TargetCameraLocation) < 0.5f &&
            FMath::Abs(NewLength - TargetArmLength) < 0.5f)
        {
            bIsTransitioning = false;
        }
    }

    // Işık pulse efekti sönümlenme
    if (PulseTimer > 0.0f)
    {
        PulseTimer -= DeltaTime * 3.0f;
        float PulseFactor = FMath::Max(0.0f, PulseTimer);
        KeyLight->SetIntensity(BaseKeyLightIntensity + (PulseIntensity * 4000.0f * PulseFactor));

        if (PulseTimer <= 0.0f)
        {
            KeyLight->SetIntensity(BaseKeyLightIntensity);
        }
    }
}

// ==================================================
// KAMERA FONKSİYONLARI
// ==================================================

void AMeloviaSceneManager::SwitchCamera(ECameraView NewView)
{
    CurrentView = NewView;
    GetCameraPreset(NewView, TargetCameraLocation, TargetCameraRotation, TargetArmLength);
    bIsTransitioning = true;

    UE_LOG(LogTemp, Log, TEXT("MELOVIA: Kamera geçişi -> %d"), (int32)NewView);
}

void AMeloviaSceneManager::NextCameraView()
{
    int32 Next = ((int32)CurrentView + 1) % 5;
    SwitchCamera((ECameraView)Next);
}

void AMeloviaSceneManager::FocusOnFret(int32 StringNum, int32 Fret)
{
    // Yakın çekime geç ve perdeye odaklan
    CurrentView = ECameraView::CloseUp;

    // Perde pozisyonuna göre kamera offseti
    float FretOffset = Fret * 3.0f;
    TargetCameraLocation = FVector(0.0f, FretOffset - 10.0f, 10.0f);
    TargetCameraRotation = FRotator(-35.0f, 0.0f, 0.0f);
    TargetArmLength = 25.0f;
    bIsTransitioning = true;
}

void AMeloviaSceneManager::ResetCamera()
{
    SwitchCamera(ECameraView::Front);
}

void AMeloviaSceneManager::GetCameraPreset(ECameraView View, FVector& OutLocation, FRotator& OutRotation, float& OutArmLength) const
{
    switch (View)
    {
    case ECameraView::Front:
        OutLocation = FVector(0.0f, 0.0f, 15.0f);
        OutRotation = FRotator(-20.0f, 0.0f, 0.0f);
        OutArmLength = 80.0f;
        break;

    case ECameraView::Side:
        OutLocation = FVector(50.0f, 0.0f, 10.0f);
        OutRotation = FRotator(-15.0f, -45.0f, 0.0f);
        OutArmLength = 70.0f;
        break;

    case ECameraView::CloseUp:
        OutLocation = FVector(0.0f, 5.0f, 8.0f);
        OutRotation = FRotator(-30.0f, 0.0f, 0.0f);
        OutArmLength = 30.0f;
        break;

    case ECameraView::TopDown:
        OutLocation = FVector(0.0f, 0.0f, 60.0f);
        OutRotation = FRotator(-80.0f, 0.0f, 0.0f);
        OutArmLength = 50.0f;
        break;

    case ECameraView::Free:
    default:
        OutLocation = FVector(30.0f, 20.0f, 20.0f);
        OutRotation = FRotator(-25.0f, -30.0f, 0.0f);
        OutArmLength = 60.0f;
        break;
    }
}

// ==================================================
// IŞIK FONKSİYONLARI
// ==================================================

void AMeloviaSceneManager::SetAmbience(ESceneAmbience Ambience)
{
    ApplyAmbiencePreset(Ambience);
    UE_LOG(LogTemp, Log, TEXT("MELOVIA: Ortam modu -> %d"), (int32)Ambience);
}

void AMeloviaSceneManager::SetKeyLightColor(FLinearColor Color)
{
    if (KeyLight)
    {
        KeyLight->SetLightColor(Color);
    }
}

void AMeloviaSceneManager::SetAmbientIntensity(float Intensity)
{
    if (AmbientLight)
    {
        AmbientLight->SetIntensity(Intensity);
    }
}

void AMeloviaSceneManager::TriggerNotePulse(float Intensity)
{
    PulseTimer = 1.0f;
    PulseIntensity = FMath::Clamp(Intensity, 0.0f, 2.0f);
}

void AMeloviaSceneManager::ApplyAmbiencePreset(ESceneAmbience Ambience)
{
    switch (Ambience)
    {
    case ESceneAmbience::Studio:
        KeyLight->SetLightColor(FLinearColor(1.0f, 0.95f, 0.9f));
        KeyLight->SetIntensity(8000.0f);
        FillLight->SetLightColor(FLinearColor(0.7f, 0.8f, 1.0f));
        FillLight->SetIntensity(3000.0f);
        RimLight->SetLightColor(FLinearColor(0.6f, 0.5f, 1.0f));
        AmbientLight->SetIntensity(1500.0f);
        BaseKeyLightIntensity = 8000.0f;
        break;

    case ESceneAmbience::Concert:
        KeyLight->SetLightColor(FLinearColor(1.0f, 0.3f, 0.1f)); // Kırmızı
        KeyLight->SetIntensity(12000.0f);
        FillLight->SetLightColor(FLinearColor(0.1f, 0.3f, 1.0f)); // Mavi
        FillLight->SetIntensity(5000.0f);
        RimLight->SetLightColor(FLinearColor(1.0f, 0.0f, 1.0f)); // Magenta
        RimLight->SetIntensity(8000.0f);
        AmbientLight->SetIntensity(500.0f);
        BaseKeyLightIntensity = 12000.0f;
        break;

    case ESceneAmbience::Bedroom:
        KeyLight->SetLightColor(FLinearColor(1.0f, 0.85f, 0.6f)); // Sıcak
        KeyLight->SetIntensity(4000.0f);
        FillLight->SetLightColor(FLinearColor(0.9f, 0.8f, 0.6f));
        FillLight->SetIntensity(2000.0f);
        RimLight->SetIntensity(1000.0f);
        AmbientLight->SetLightColor(FLinearColor(0.8f, 0.6f, 0.3f));
        AmbientLight->SetIntensity(2000.0f);
        BaseKeyLightIntensity = 4000.0f;
        break;

    case ESceneAmbience::Dark:
        KeyLight->SetLightColor(FLinearColor(0.3f, 0.2f, 0.8f)); // Mor
        KeyLight->SetIntensity(3000.0f);
        FillLight->SetIntensity(500.0f);
        RimLight->SetLightColor(FLinearColor(0.0f, 0.8f, 1.0f)); // Cyan
        RimLight->SetIntensity(4000.0f);
        AmbientLight->SetIntensity(300.0f);
        BaseKeyLightIntensity = 3000.0f;
        break;
    }
}

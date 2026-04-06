// MeloviaPlayerController.cpp
// Melovia v0.2 - Oyuncu Girdi Yönetimi Implementation

#include "MeloviaPlayerController.h"
#include "Kismet/GameplayStatics.h"

AMeloviaPlayerController::AMeloviaPlayerController()
{
    bShowMouseCursor = true;
    bEnableClickEvents = true;
}

void AMeloviaPlayerController::BeginPlay()
{
    Super::BeginPlay();

    // Sahne aktörlerini otomatik bul
    FindSceneActors();

    UE_LOG(LogTemp, Log, TEXT("MELOVIA: Player Controller hazır"));
}

void AMeloviaPlayerController::FindSceneActors()
{
    // Sahnedeki gitar aktörünü bul
    if (!GuitarActor)
    {
        AActor* Found = UGameplayStatics::GetActorOfClass(GetWorld(), AGuitarActor::StaticClass());
        GuitarActor = Cast<AGuitarActor>(Found);
        if (GuitarActor)
        {
            UE_LOG(LogTemp, Log, TEXT("MELOVIA: GuitarActor otomatik bulundu"));
        }
    }

    // Sahne yöneticisini bul
    if (!SceneManager)
    {
        AActor* Found = UGameplayStatics::GetActorOfClass(GetWorld(), AMeloviaSceneManager::StaticClass());
        SceneManager = Cast<AMeloviaSceneManager>(Found);
        if (SceneManager)
        {
            UE_LOG(LogTemp, Log, TEXT("MELOVIA: SceneManager otomatik bulundu"));
        }
    }
}

void AMeloviaPlayerController::SetupInputComponent()
{
    Super::SetupInputComponent();

    if (!InputComponent) return;

    // Perde tuşları (Q,W,E,R,T,Y,U,I,O,P ve daha fazlası)
    InputComponent->BindAction("Fret0", IE_Pressed, this, &AMeloviaPlayerController::OnFret0Pressed);
    InputComponent->BindAction("Fret1", IE_Pressed, this, &AMeloviaPlayerController::OnFret1Pressed);
    InputComponent->BindAction("Fret2", IE_Pressed, this, &AMeloviaPlayerController::OnFret2Pressed);
    InputComponent->BindAction("Fret3", IE_Pressed, this, &AMeloviaPlayerController::OnFret3Pressed);
    InputComponent->BindAction("Fret4", IE_Pressed, this, &AMeloviaPlayerController::OnFret4Pressed);
    InputComponent->BindAction("Fret5", IE_Pressed, this, &AMeloviaPlayerController::OnFret5Pressed);
    InputComponent->BindAction("Fret6", IE_Pressed, this, &AMeloviaPlayerController::OnFret6Pressed);
    InputComponent->BindAction("Fret7", IE_Pressed, this, &AMeloviaPlayerController::OnFret7Pressed);
    InputComponent->BindAction("Fret8", IE_Pressed, this, &AMeloviaPlayerController::OnFret8Pressed);
    InputComponent->BindAction("Fret9", IE_Pressed, this, &AMeloviaPlayerController::OnFret9Pressed);
    InputComponent->BindAction("Fret10", IE_Pressed, this, &AMeloviaPlayerController::OnFret10Pressed);
    InputComponent->BindAction("Fret11", IE_Pressed, this, &AMeloviaPlayerController::OnFret11Pressed);
    InputComponent->BindAction("Fret12", IE_Pressed, this, &AMeloviaPlayerController::OnFret12Pressed);

    // Tel seçim tuşları (1-6)
    InputComponent->BindAction("String1", IE_Pressed, this, &AMeloviaPlayerController::OnString1Selected);
    InputComponent->BindAction("String2", IE_Pressed, this, &AMeloviaPlayerController::OnString2Selected);
    InputComponent->BindAction("String3", IE_Pressed, this, &AMeloviaPlayerController::OnString3Selected);
    InputComponent->BindAction("String4", IE_Pressed, this, &AMeloviaPlayerController::OnString4Selected);
    InputComponent->BindAction("String5", IE_Pressed, this, &AMeloviaPlayerController::OnString5Selected);
    InputComponent->BindAction("String6", IE_Pressed, this, &AMeloviaPlayerController::OnString6Selected);

    // Kamera döngüsü (Tab)
    InputComponent->BindAction("CycleCamera", IE_Pressed, this, &AMeloviaPlayerController::OnCameraCycle);

    // Tümünü durdur (Escape)
    InputComponent->BindAction("StopAll", IE_Pressed, this, &AMeloviaPlayerController::OnStopAll);
}

// ==================================================
// BLUEPRINT FONKSİYONLARI
// ==================================================

void AMeloviaPlayerController::OnNoteInput(int32 StringNum, int32 Fret)
{
    PlayNoteWithEffects(StringNum, Fret);
}

void AMeloviaPlayerController::OnChordInput(const FString& ChordName)
{
    // GameMode üzerinden akor bilgisini al
    // Blueprint'te daha detaylı implemente edilecek
    UE_LOG(LogTemp, Log, TEXT("MELOVIA: Akor girişi: %s"), *ChordName);
}

void AMeloviaPlayerController::SetActiveString(int32 StringNum)
{
    ActiveString = FMath::Clamp(StringNum, 1, 6);
    UE_LOG(LogTemp, Log, TEXT("MELOVIA: Aktif tel -> %d"), ActiveString);
}

void AMeloviaPlayerController::CycleCamera()
{
    if (SceneManager)
    {
        SceneManager->NextCameraView();
    }
}

void AMeloviaPlayerController::StopAll()
{
    if (GuitarActor)
    {
        GuitarActor->StopAllStrings();
    }
}

// ==================================================
// INPUT HANDLER'LAR
// ==================================================

void AMeloviaPlayerController::OnFret0Pressed()  { PlayNoteWithEffects(ActiveString, 0); }
void AMeloviaPlayerController::OnFret1Pressed()  { PlayNoteWithEffects(ActiveString, 1); }
void AMeloviaPlayerController::OnFret2Pressed()  { PlayNoteWithEffects(ActiveString, 2); }
void AMeloviaPlayerController::OnFret3Pressed()  { PlayNoteWithEffects(ActiveString, 3); }
void AMeloviaPlayerController::OnFret4Pressed()  { PlayNoteWithEffects(ActiveString, 4); }
void AMeloviaPlayerController::OnFret5Pressed()  { PlayNoteWithEffects(ActiveString, 5); }
void AMeloviaPlayerController::OnFret6Pressed()  { PlayNoteWithEffects(ActiveString, 6); }
void AMeloviaPlayerController::OnFret7Pressed()  { PlayNoteWithEffects(ActiveString, 7); }
void AMeloviaPlayerController::OnFret8Pressed()  { PlayNoteWithEffects(ActiveString, 8); }
void AMeloviaPlayerController::OnFret9Pressed()  { PlayNoteWithEffects(ActiveString, 9); }
void AMeloviaPlayerController::OnFret10Pressed() { PlayNoteWithEffects(ActiveString, 10); }
void AMeloviaPlayerController::OnFret11Pressed() { PlayNoteWithEffects(ActiveString, 11); }
void AMeloviaPlayerController::OnFret12Pressed() { PlayNoteWithEffects(ActiveString, 12); }

void AMeloviaPlayerController::OnString1Selected() { SetActiveString(1); }
void AMeloviaPlayerController::OnString2Selected() { SetActiveString(2); }
void AMeloviaPlayerController::OnString3Selected() { SetActiveString(3); }
void AMeloviaPlayerController::OnString4Selected() { SetActiveString(4); }
void AMeloviaPlayerController::OnString5Selected() { SetActiveString(5); }
void AMeloviaPlayerController::OnString6Selected() { SetActiveString(6); }

void AMeloviaPlayerController::OnCameraCycle() { CycleCamera(); }
void AMeloviaPlayerController::OnStopAll() { StopAll(); }

// ==================================================
// YARDIMCI
// ==================================================

void AMeloviaPlayerController::PlayNoteWithEffects(int32 StringNum, int32 Fret)
{
    if (GuitarActor)
    {
        GuitarActor->PlayString(StringNum, Fret);
        GuitarActor->HighlightFret(StringNum, Fret);
    }

    if (SceneManager)
    {
        SceneManager->TriggerNotePulse(0.5f);
    }
}

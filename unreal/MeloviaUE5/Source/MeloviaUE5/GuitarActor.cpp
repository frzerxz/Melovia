// GuitarActor.cpp
// Melovia v0.2 - 3D Gitar Aktörü Implementation

#include "GuitarActor.h"
#include "Engine/StaticMesh.h"
#include "Materials/MaterialInstanceDynamic.h"
#include "UObject/ConstructorHelpers.h"

AGuitarActor::AGuitarActor()
{
    PrimaryActorTick.bCanEverTick = true;

    // Root component
    USceneComponent* Root = CreateDefaultSubobject<USceneComponent>(TEXT("RootComponent"));
    SetRootComponent(Root);

    // Gitar gövdesi (placeholder - Blueprint'te veya editörde gerçek mesh atanabilir)
    BodyMesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("GuitarBody"));
    BodyMesh->SetupAttachment(Root);
    BodyMesh->SetRelativeLocation(FVector(0.0f, 0.0f, 0.0f));

    // Gitar sapı
    NeckMesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("GuitarNeck"));
    NeckMesh->SetupAttachment(Root);
    NeckMesh->SetRelativeLocation(FVector(0.0f, 15.0f, 0.0f));

    // Köprü
    BridgeMesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("GuitarBridge"));
    BridgeMesh->SetupAttachment(Root);
    BridgeMesh->SetRelativeLocation(FVector(0.0f, -30.0f, 1.0f));

    // Vurgulama göstergesi
    HighlightIndicator = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("HighlightIndicator"));
    HighlightIndicator->SetupAttachment(Root);
    HighlightIndicator->SetVisibility(false);
    HighlightIndicator->SetRelativeScale3D(FVector(0.5f, 0.5f, 0.1f));

    // 6 tel için procedural mesh bileşenleri oluştur
    for (int32 i = 0; i < 6; i++)
    {
        FName MeshName = *FString::Printf(TEXT("StringMesh_%d"), i + 1);
        UProceduralMeshComponent* StringMesh = CreateDefaultSubobject<UProceduralMeshComponent>(MeshName);
        StringMesh->SetupAttachment(Root);
        StringMesh->bUseComplexAsSimpleCollision = false;
        StringMeshes.Add(StringMesh);
    }

    // Titreşim durumlarını sıfırla
    for (int32 i = 0; i < 6; i++)
    {
        StringStates[i] = FStringVibrationState();
    }
}

void AGuitarActor::BeginPlay()
{
    Super::BeginPlay();

    // Başlangıçta tüm telleri oluştur (sabit pozisyon - titreşimsiz)
    for (int32 i = 0; i < 6; i++)
    {
        GenerateStringMesh(i);
    }

    UE_LOG(LogTemp, Log, TEXT("MELOVIA: 3D Guitar Actor hazır - 6 tel oluşturuldu"));
}

void AGuitarActor::Tick(float DeltaTime)
{
    Super::Tick(DeltaTime);

    // Titreşen telleri güncelle
    for (int32 i = 0; i < 6; i++)
    {
        if (StringStates[i].bIsVibrating)
        {
            UpdateVibrationMesh(i, DeltaTime);
        }
    }
}

// ==================================================
// TEL MESH OLUŞTURMA
// ==================================================

void AGuitarActor::GenerateStringMesh(int32 StringIndex)
{
    if (StringIndex < 0 || StringIndex >= 6 || StringIndex >= StringMeshes.Num()) return;

    UProceduralMeshComponent* Mesh = StringMeshes[StringIndex];
    if (!Mesh) return;

    // Tel kalınlığı (1. tel en ince, 6. tel en kalın)
    float Thickness = 0.03f + (StringIndex * 0.012f);

    // Tel Y pozisyonu (teller arası boşluk)
    float StringY = (StringIndex - 2.5f) * StringSpacing;

    TArray<FVector> Vertices;
    TArray<int32> Triangles;
    TArray<FVector> Normals;
    TArray<FVector2D> UVs;
    TArray<FColor> Colors;

    FLinearColor StringColor = GetStringColor(StringIndex);

    // Tel mesh'ini segment'lere bölerek oluştur
    for (int32 Seg = 0; Seg <= StringSegments; Seg++)
    {
        float T = (float)Seg / (float)StringSegments;

        // Başlangıç ve bitiş arasında interpolasyon
        FVector Pos = FMath::Lerp(StringStartOffset, StringEndOffset, T);
        Pos.X += StringY;  // Teller X ekseni boyunca dağılır

        // Titreşim eklenmesi (eğer titreşiyorsa)
        float VibOffset = 0.0f;
        if (StringStates[StringIndex].bIsVibrating)
        {
            float Freq = StringStates[StringIndex].Frequency;
            float Amp = StringStates[StringIndex].Amplitude;
            float Time = StringStates[StringIndex].TimeElapsed;
            float Decay = FMath::Exp(-VibrationDecayRate * Time);

            // Sinüs dalgası titreşimi
            VibOffset = Amp * VibrationAmplitude * Decay *
                FMath::Sin(Freq * Time * 2.0f * PI) *
                FMath::Sin(T * PI);  // Tel uçlarında sıfır, ortada maksimum
        }

        // Üst vertex
        Vertices.Add(FVector(Pos.X, Pos.Y, Pos.Z + Thickness + VibOffset));
        // Alt vertex
        Vertices.Add(FVector(Pos.X, Pos.Y, Pos.Z - Thickness + VibOffset));

        Normals.Add(FVector(0, 0, 1));
        Normals.Add(FVector(0, 0, -1));

        UVs.Add(FVector2D(T, 0.0f));
        UVs.Add(FVector2D(T, 1.0f));

        FColor VertColor = StringColor.ToFColor(true);
        Colors.Add(VertColor);
        Colors.Add(VertColor);

        // Üçgen oluştur (her segment için 2 üçgen = 1 quad)
        if (Seg < StringSegments)
        {
            int32 BaseIdx = Seg * 2;
            // Üçgen 1
            Triangles.Add(BaseIdx);
            Triangles.Add(BaseIdx + 2);
            Triangles.Add(BaseIdx + 1);
            // Üçgen 2
            Triangles.Add(BaseIdx + 1);
            Triangles.Add(BaseIdx + 2);
            Triangles.Add(BaseIdx + 3);
        }
    }

    Mesh->ClearAllMeshSections();
    Mesh->CreateMeshSection(0, Vertices, Triangles, Normals, UVs, Colors, TArray<FProcMeshTangent>(), false);
}

// ==================================================
// TİTREŞİM GÜNCELLEMESİ
// ==================================================

void AGuitarActor::UpdateVibrationMesh(int32 StringIndex, float DeltaTime)
{
    FStringVibrationState& State = StringStates[StringIndex];
    State.TimeElapsed += DeltaTime;

    // Sönümlenme kontrolü
    float DecayFactor = FMath::Exp(-VibrationDecayRate * State.TimeElapsed);
    if (DecayFactor < 0.01f || State.TimeElapsed > State.Duration)
    {
        State.bIsVibrating = false;
        State.TimeElapsed = 0.0f;
        GenerateStringMesh(StringIndex); // Sabit pozisyona dön
        OnStringStopped.Broadcast(StringIndex + 1);
        return;
    }

    // Titreşen mesh'i yeniden oluştur
    GenerateStringMesh(StringIndex);
}

// ==================================================
// BLUEPRINT FONKSİYONLARI
// ==================================================

void AGuitarActor::PlayString(int32 StringNum, int32 Fret)
{
    int32 Index = FMath::Clamp(StringNum - 1, 0, 5);

    // Frekans hesapla (basit: temel nota + perde kaydırma)
    // Standart akort frekansları
    static const float OpenStringFreqs[] = { 329.63f, 246.94f, 196.0f, 146.83f, 110.0f, 82.41f };
    float BaseFreq = OpenStringFreqs[Index];
    float NoteFreq = BaseFreq * FMath::Pow(2.0f, Fret / 12.0f);

    // Titreşim durumunu ayarla
    StringStates[Index].bIsVibrating = true;
    StringStates[Index].Frequency = NoteFreq;
    StringStates[Index].Amplitude = 1.0f;
    StringStates[Index].TimeElapsed = 0.0f;
    StringStates[Index].Duration = 2.5f;
    StringStates[Index].Fret = Fret;

    // Event tetikle
    OnNotePlayed.Broadcast(StringNum, Fret, NoteFreq);

    UE_LOG(LogTemp, Log, TEXT("MELOVIA: Tel %d, Perde %d çalındı (%.1f Hz)"), StringNum, Fret, NoteFreq);
}

void AGuitarActor::StopString(int32 StringNum)
{
    int32 Index = FMath::Clamp(StringNum - 1, 0, 5);
    StringStates[Index].bIsVibrating = false;
    StringStates[Index].TimeElapsed = 0.0f;
    GenerateStringMesh(Index);
    OnStringStopped.Broadcast(StringNum);
}

void AGuitarActor::StopAllStrings()
{
    for (int32 i = 0; i < 6; i++)
    {
        StopString(i + 1);
    }
}

void AGuitarActor::HighlightFret(int32 StringNum, int32 Fret)
{
    if (!HighlightIndicator) return;

    FVector Pos = GetFretWorldPosition(StringNum, Fret);
    HighlightIndicator->SetWorldLocation(Pos);
    HighlightIndicator->SetVisibility(true);
}

void AGuitarActor::ClearHighlight()
{
    if (HighlightIndicator)
    {
        HighlightIndicator->SetVisibility(false);
    }
}

void AGuitarActor::PlayChord(const TArray<int32>& Frets)
{
    for (int32 i = 0; i < FMath::Min(Frets.Num(), 6); i++)
    {
        if (Frets[i] >= 0) // -1 = bu tel çalınmaz
        {
            // Strum efekti: her tel hafif gecikmeli başlar
            FTimerHandle TimerHandle;
            int32 StringNum = i + 1;
            int32 Fret = Frets[i];

            GetWorldTimerManager().SetTimer(TimerHandle,
                FTimerDelegate::CreateLambda([this, StringNum, Fret]()
                {
                    PlayString(StringNum, Fret);
                }),
                i * 0.03f, // 30ms aralık
                false
            );
        }
    }
}

FStringVibrationState AGuitarActor::GetStringState(int32 StringNum) const
{
    int32 Index = FMath::Clamp(StringNum - 1, 0, 5);
    return StringStates[Index];
}

bool AGuitarActor::IsStringVibrating(int32 StringNum) const
{
    int32 Index = FMath::Clamp(StringNum - 1, 0, 5);
    return StringStates[Index].bIsVibrating;
}

// ==================================================
// YARDIMCI FONKSİYONLAR
// ==================================================

FLinearColor AGuitarActor::GetStringColor(int32 StringIndex) const
{
    // Tel renkleri: ince -> kalın (gümüş tonları, kalın teller bakır/bronz)
    static const FLinearColor Colors[] = {
        FLinearColor(0.85f, 0.85f, 0.9f, 1.0f),   // 1. tel - gümüş
        FLinearColor(0.8f, 0.8f, 0.85f, 1.0f),     // 2. tel
        FLinearColor(0.75f, 0.75f, 0.8f, 1.0f),     // 3. tel
        FLinearColor(0.7f, 0.6f, 0.4f, 1.0f),       // 4. tel - bronz
        FLinearColor(0.65f, 0.55f, 0.35f, 1.0f),    // 5. tel
        FLinearColor(0.6f, 0.5f, 0.3f, 1.0f)        // 6. tel - bakır
    };
    return Colors[FMath::Clamp(StringIndex, 0, 5)];
}

FVector AGuitarActor::GetFretWorldPosition(int32 StringNum, int32 Fret) const
{
    int32 Index = FMath::Clamp(StringNum - 1, 0, 5);
    float StringY = (Index - 2.5f) * StringSpacing;

    // Perde pozisyonu: eşit temperli ölçekleme (gerçek gitar gibi)
    float FretRatio = 1.0f - FMath::Pow(2.0f, -(float)Fret / 12.0f);
    float TotalLength = FMath::Abs(StringEndOffset.Y - StringStartOffset.Y);
    float FretY = StringStartOffset.Y + (FretRatio * TotalLength);

    FVector LocalPos(StringY + StringStartOffset.X, FretY, StringStartOffset.Z);
    return GetActorTransform().TransformPosition(LocalPos);
}

// MeloviaUE5.Build.cs
// Ana Oyun Modülü Build Configuration
// v0.2: 3D Görselleştirme + UI

using UnrealBuildTool;

public class MeloviaUE5 : ModuleRules
{
    public MeloviaUE5(ReadOnlyTargetRules Target) : base(Target)
    {
        PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;

        PublicDependencyModuleNames.AddRange(new string[]
        {
            "Core",
            "CoreUObject",
            "Engine",
            "InputCore",
            "EnhancedInput",
            "UMG",
            "Slate",
            "SlateCore",
            "ProceduralMeshComponent",
            "MeloviaCore"
        });
    }
}

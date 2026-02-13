// MeloviaUE5.Build.cs
// Ana Oyun Modülü Build Configuration

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
            "MeloviaCore"
        });
    }
}

// MeloviaCore.Build.cs
// Melovia Universal Note Core - Unreal Engine 5 Build Configuration

using UnrealBuildTool;

public class MeloviaCore : ModuleRules
{
    public MeloviaCore(ReadOnlyTargetRules Target) : base(Target)
    {
        PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;

        PublicDependencyModuleNames.AddRange(new string[]
        {
            "Core",
            "CoreUObject",
            "Engine"
        });

        PrivateDependencyModuleNames.AddRange(new string[]
        {
            "AudioMixer",
            "SignalProcessing"
        });
    }
}

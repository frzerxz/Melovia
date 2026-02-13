// MeloviaUE5.Target.cs
// Game Build Target

using UnrealBuildTool;
using System.Collections.Generic;

public class MeloviaUE5Target : TargetRules
{
    public MeloviaUE5Target(TargetInfo Target) : base(Target)
    {
        Type = TargetType.Game;
        DefaultBuildSettings = BuildSettingsVersion.V5;
        IncludeOrderVersion = EngineIncludeOrderVersion.Unreal5_5;

        ExtraModuleNames.AddRange(new string[]
        {
            "MeloviaUE5",
            "MeloviaCore"
        });
    }
}

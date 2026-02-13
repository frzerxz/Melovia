// MeloviaUE5Editor.Target.cs
// Editor Build Target

using UnrealBuildTool;
using System.Collections.Generic;

public class MeloviaUE5EditorTarget : TargetRules
{
    public MeloviaUE5EditorTarget(TargetInfo Target) : base(Target)
    {
        Type = TargetType.Editor;
        DefaultBuildSettings = BuildSettingsVersion.V6;
        IncludeOrderVersion = EngineIncludeOrderVersion.Unreal5_7;
        
        // Installed engine (Epic Launcher) ile uyumluluk
        bOverrideBuildEnvironment = true;

        ExtraModuleNames.AddRange(new string[]
        {
            "MeloviaUE5",
            "MeloviaCore"
        });
    }
}

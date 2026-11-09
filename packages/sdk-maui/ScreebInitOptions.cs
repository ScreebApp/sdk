namespace Screeb.Maui;

public class ScreebInitOptions
{
    public bool IsDebugMode { get; set; } = false;
    public bool DisableMirror { get; set; } = false;
    /// <summary>"light", "dark" or "auto"; null keeps the native default (auto).</summary>
    public string? ColorScheme { get; set; }
}

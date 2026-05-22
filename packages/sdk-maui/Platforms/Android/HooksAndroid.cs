// packages/sdk-maui/Platforms/Android/HooksAndroid.cs
#if ANDROID
using Java.Util;

namespace Screeb.Maui;

internal static class HooksAndroid
{
    internal static HashMap? ToGlobalHooks(Dictionary<string, string> uuidMap)
        => BuildHooksMap(uuidMap);

    internal static HashMap? ToSurveyHooks(Dictionary<string, string> uuidMap)
        => BuildHooksMap(uuidMap);

    private static HashMap? BuildHooksMap(Dictionary<string, string> uuidMap)
    {
        if (uuidMap.Count == 0) return null;
        var map = new HashMap();
        foreach (var (key, value) in uuidMap)
        {
            if (key == "version")
            {
                map.Put(key, new Java.Lang.String(value));
            }
            else
            {
                var uuid = value; // capture
                map.Put(key, new KotlinHookCallback(payload =>
                {
                    var fn = HooksRegistry.Get(uuid);
                    if (fn != null)
                    {
                        // Fire and forget — run the C# callback asynchronously
                        Task.Run(() => fn(payload?.ToString() ?? "{}"));
                    }
                }));
            }
        }
        return map;
    }
}

/// <summary>
/// Wraps a C# Action as a Kotlin Function1&lt;Object, Unit&gt; so the
/// Android Screeb SDK can call it as a hook callback.
/// </summary>
[Android.Runtime.Register("app/screeb/maui/KotlinHookCallback")]
internal class KotlinHookCallback : Java.Lang.Object, Kotlin.Jvm.Functions.IFunction1
{
    private readonly Action<Java.Lang.Object?> _onHook;

    public KotlinHookCallback(Action<Java.Lang.Object?> onHook)
    {
        _onHook = onHook;
    }

    public Java.Lang.Object? Invoke(Java.Lang.Object? p0)
    {
        _onHook(p0);
        return null; // Kotlin Unit → null
    }
}
#endif

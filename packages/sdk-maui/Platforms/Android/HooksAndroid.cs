// packages/sdk-maui/Platforms/Android/HooksAndroid.cs
#if ANDROID
namespace Screeb.Maui;

internal static class HooksAndroid
{
    internal static IDictionary<string, Java.Lang.Object>? ToGlobalHooks(Dictionary<string, string> uuidMap)
        => BuildHooksMap(uuidMap);

    internal static IDictionary<string, Java.Lang.Object>? ToSurveyHooks(Dictionary<string, string> uuidMap)
        => BuildHooksMap(uuidMap);

    private static IDictionary<string, Java.Lang.Object>? BuildHooksMap(Dictionary<string, string> uuidMap)
    {
        if (uuidMap.Count == 0) return null;
        var map = new Dictionary<string, Java.Lang.Object>();
        foreach (var (key, value) in uuidMap)
        {
            if (key == "version")
            {
                map[key] = new Java.Lang.String(value);
            }
            else
            {
                var uuid = value; // capture
                map[key] = new KotlinHookCallback(payload =>
                {
                    var fn = HooksRegistry.Get(uuid);
                    if (fn != null)
                    {
                        Task.Run(() => fn(payload?.ToString() ?? "{}"));
                    }
                });
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

/// <summary>
/// Wraps a C# Action as a Kotlin Function2&lt;Object, Object, Unit&gt; for
/// result/error callbacks (GetIdentity, Debug, DebugTargeting).
/// </summary>
[Android.Runtime.Register("app/screeb/maui/KotlinResultCallback")]
internal sealed class KotlinResultCallback : Java.Lang.Object, Kotlin.Jvm.Functions.IFunction2
{
    private readonly Action<Java.Lang.Object?, Java.Lang.Object?> _callback;

    internal KotlinResultCallback(Action<Java.Lang.Object?, Java.Lang.Object?> callback)
    {
        _callback = callback;
    }

    public Java.Lang.Object? Invoke(Java.Lang.Object? p1, Java.Lang.Object? p2)
    {
        _callback(p1, p2);
        return null; // Kotlin Unit → null
    }
}
#endif

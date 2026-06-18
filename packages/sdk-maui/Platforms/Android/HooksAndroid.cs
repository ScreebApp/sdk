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
        return App.Screeb.Sdk.Screeb.Instance.MakeHooks(uuidMap, new ScreebHookCallbackAdapter());
    }

    internal static Java.Lang.Object? ToJavaObject(object? value)
    {
        return value switch
        {
            null => null,
            Java.Lang.Object javaObject => javaObject,
            string s => new Java.Lang.String(s),
            bool b => Java.Lang.Boolean.ValueOf(b),
            int i => Java.Lang.Integer.ValueOf(i),
            long l => Java.Lang.Long.ValueOf(l),
            float f => Java.Lang.Float.ValueOf(f),
            double d => Java.Lang.Double.ValueOf(d),
            IDictionary<string, object> dict => ToJavaDictionary(dict),
            IEnumerable<object> list => ToJavaList(list),
            _ => new Java.Lang.String(value.ToString() ?? "")
        };
    }

    private static Java.Util.HashMap ToJavaDictionary(IDictionary<string, object> dict)
    {
        var map = new Java.Util.HashMap();
        foreach (var (key, value) in dict)
        {
            map.Put(new Java.Lang.String(key), ToJavaObject(value));
        }
        return map;
    }

    private static Java.Util.ArrayList ToJavaList(IEnumerable<object> list)
    {
        var array = new Java.Util.ArrayList();
        foreach (var item in list)
        {
            var javaItem = ToJavaObject(item);
            if (javaItem != null) array.Add(javaItem);
        }
        return array;
    }
}

internal sealed class ScreebHookCallbackAdapter : Java.Lang.Object, App.Screeb.Sdk.IScreebHookCallback
{
    public void Invoke(string hookId, string nativeHookId, string payload)
    {
        var fn = HooksRegistry.Get(hookId);
        if (fn == null) return;

        Task.Run(async () =>
        {
            try
            {
                var callbackResult = await fn(payload).ConfigureAwait(false);
                if (!string.IsNullOrWhiteSpace(nativeHookId))
                {
                    App.Screeb.Sdk.Screeb.Instance.OnHookResult(nativeHookId, HooksAndroid.ToJavaObject(callbackResult));
                }
            }
            catch
            {
                if (!string.IsNullOrWhiteSpace(nativeHookId))
                {
                    App.Screeb.Sdk.Screeb.Instance.OnHookResult(nativeHookId, Java.Lang.Boolean.ValueOf(false));
                }
            }
        });
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

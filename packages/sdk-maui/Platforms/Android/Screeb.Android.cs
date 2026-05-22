// packages/sdk-maui/Platforms/Android/Screeb.Android.cs
#if ANDROID
using Android.OS;
using App.Screeb.Sdk;

namespace Screeb.Maui;

public static partial class Screeb
{
    private static Android.Content.Context AppContext =>
        Android.App.Application.Context;

    private static IEnumerable<string>? _globalHookUuids;

    public static partial async Task<bool?> InitSdk(
        string channelId,
        string? userId,
        Dictionary<string, object>? properties,
        ScreebHooks? hooks,
        ScreebInitOptions? initOptions,
        string? language)
    {
        var tcs = new TaskCompletionSource<bool?>();
        new Handler(Looper.MainLooper!).Post(() =>
        {
            try
            {
                App.Screeb.Sdk.Screeb.Instance.SetSecondarySDK("maui", "0.1.0");
                var jProps = ToJavaDictionary(ScreebUtils.FormatProperties(properties));
                var jInitOptions = ToInitOptionsMap(initOptions);
                var uuidMap = HooksRegistry.RegisterHooks(hooks);
                _globalHookUuids = uuidMap.Values.ToList();
                var jHooks = HooksAndroid.ToGlobalHooks(uuidMap);
                App.Screeb.Sdk.Screeb.Instance.PluginInit(
                    channelId, userId, jProps, jInitOptions, jHooks, language);
                tcs.SetResult(true);
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return await tcs.Task;
    }

    public static partial async Task<bool?> CloseSdk()
    {
        var tcs = new TaskCompletionSource<bool?>();
        new Handler(Looper.MainLooper!).Post(() =>
        {
            try
            {
                if (_globalHookUuids != null)
                {
                    HooksRegistry.Unregister(_globalHookUuids);
                    _globalHookUuids = null;
                }
                App.Screeb.Sdk.Screeb.Instance.CloseSdk();
                tcs.SetResult(true);
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return await tcs.Task;
    }

    public static partial async Task<bool?> SetIdentity(string userId, Dictionary<string, object>? properties)
    {
        var tcs = new TaskCompletionSource<bool?>();
        new Handler(Looper.MainLooper!).Post(() =>
        {
            try
            {
                App.Screeb.Sdk.Screeb.Instance.SetIdentity(userId, ToJavaDictionary(ScreebUtils.FormatProperties(properties)));
                tcs.SetResult(true);
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return await tcs.Task;
    }

    public static partial async Task<bool?> SetProperties(Dictionary<string, object>? properties)
    {
        var tcs = new TaskCompletionSource<bool?>();
        new Handler(Looper.MainLooper!).Post(() =>
        {
            try
            {
                var props = ToJavaDictionary(ScreebUtils.FormatProperties(properties));
                if (props != null) App.Screeb.Sdk.Screeb.Instance.SetVisitorProperties(props);
                tcs.SetResult(true);
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return await tcs.Task;
    }

    public static partial async Task<bool?> ResetIdentity()
    {
        var tcs = new TaskCompletionSource<bool?>();
        new Handler(Looper.MainLooper!).Post(() =>
        {
            try { App.Screeb.Sdk.Screeb.Instance.ResetIdentity(); tcs.SetResult(true); }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return await tcs.Task;
    }

    public static partial Task<Dictionary<string, object>?> GetIdentity()
    {
        var tcs = new TaskCompletionSource<Dictionary<string, object>?>();
        new Handler(Looper.MainLooper!).Post(() =>
        {
            try
            {
                App.Screeb.Sdk.Screeb.Instance.GetIdentity(new KotlinResultCallback((identity, error) =>
                {
                    if (error != null) tcs.SetException(new Exception(error.ToString()));
                    else tcs.SetResult(FromJavaObject(identity));
                }));
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

    public static partial async Task<bool?> AssignGroup(string? groupType, string groupName, Dictionary<string, object>? properties)
    {
        var tcs = new TaskCompletionSource<bool?>();
        new Handler(Looper.MainLooper!).Post(() =>
        {
            try
            {
                App.Screeb.Sdk.Screeb.Instance.AssignGroup(groupType, groupName, ToJavaDictionary(ScreebUtils.FormatProperties(properties)));
                tcs.SetResult(true);
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return await tcs.Task;
    }

    public static partial async Task<bool?> UnassignGroup(string? groupType, string groupName, Dictionary<string, object>? properties)
    {
        var tcs = new TaskCompletionSource<bool?>();
        new Handler(Looper.MainLooper!).Post(() =>
        {
            try
            {
                App.Screeb.Sdk.Screeb.Instance.UnassignGroup(groupType, groupName, ToJavaDictionary(ScreebUtils.FormatProperties(properties)));
                tcs.SetResult(true);
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return await tcs.Task;
    }

    public static partial async Task<bool?> TrackEvent(string name, Dictionary<string, object>? properties)
    {
        var tcs = new TaskCompletionSource<bool?>();
        new Handler(Looper.MainLooper!).Post(() =>
        {
            try
            {
                App.Screeb.Sdk.Screeb.Instance.TrackEvent(name, ToJavaDictionary(ScreebUtils.FormatProperties(properties)));
                tcs.SetResult(true);
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return await tcs.Task;
    }

    public static partial async Task<bool?> TrackScreen(string name, Dictionary<string, object>? properties)
    {
        var tcs = new TaskCompletionSource<bool?>();
        new Handler(Looper.MainLooper!).Post(() =>
        {
            try
            {
                App.Screeb.Sdk.Screeb.Instance.TrackScreen(name, ToJavaDictionary(ScreebUtils.FormatProperties(properties)));
                tcs.SetResult(true);
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return await tcs.Task;
    }

    public static partial async Task<bool?> StartSurvey(
        string surveyId, bool allowMultipleResponses, Dictionary<string, object>? hiddenFields,
        bool ignoreSurveyStatus, ScreebHooks? hooks, string? language, string? distributionId)
    {
        var tcs = new TaskCompletionSource<bool?>();
        new Handler(Looper.MainLooper!).Post(() =>
        {
            try
            {
                var jHooks = HooksAndroid.ToSurveyHooks(HooksRegistry.RegisterHooks(hooks));
                // TODO: unregister survey hooks on close (v0.2.0)
                App.Screeb.Sdk.Screeb.Instance.StartSurvey(
                    surveyId, allowMultipleResponses, ToJavaDictionary(ScreebUtils.FormatProperties(hiddenFields)),
                    ignoreSurveyStatus, jHooks, language, distributionId);
                tcs.SetResult(true);
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return await tcs.Task;
    }

    public static partial async Task<bool?> CloseSurvey(string? surveyId)
    {
        var tcs = new TaskCompletionSource<bool?>();
        new Handler(Looper.MainLooper!).Post(() =>
        {
            try { App.Screeb.Sdk.Screeb.Instance.CloseSurvey(surveyId); tcs.SetResult(true); }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return await tcs.Task;
    }

    public static partial async Task<bool?> StartMessage(
        string messageId, bool allowMultipleResponses, Dictionary<string, object>? hiddenFields,
        bool ignoreMessageStatus, ScreebHooks? hooks, string? language, string? distributionId)
    {
        var tcs = new TaskCompletionSource<bool?>();
        new Handler(Looper.MainLooper!).Post(() =>
        {
            try
            {
                var jHooks = HooksAndroid.ToSurveyHooks(HooksRegistry.RegisterHooks(hooks));
                // TODO: unregister message hooks on close (v0.2.0)
                App.Screeb.Sdk.Screeb.Instance.StartMessage(
                    messageId, allowMultipleResponses, ToJavaDictionary(ScreebUtils.FormatProperties(hiddenFields)),
                    ignoreMessageStatus, jHooks, language, distributionId);
                tcs.SetResult(true);
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return await tcs.Task;
    }

    public static partial async Task<bool?> CloseMessage(string? messageId)
    {
        var tcs = new TaskCompletionSource<bool?>();
        new Handler(Looper.MainLooper!).Post(() =>
        {
            try { App.Screeb.Sdk.Screeb.Instance.CloseMessage(messageId); tcs.SetResult(true); }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return await tcs.Task;
    }

    public static partial async Task<bool?> SessionReplayStart()
    {
        var tcs = new TaskCompletionSource<bool?>();
        new Handler(Looper.MainLooper!).Post(() =>
        {
            try { App.Screeb.Sdk.Screeb.Instance.SessionReplayStart(); tcs.SetResult(true); }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return await tcs.Task;
    }

    public static partial async Task<bool?> SessionReplayStop()
    {
        var tcs = new TaskCompletionSource<bool?>();
        new Handler(Looper.MainLooper!).Post(() =>
        {
            try { App.Screeb.Sdk.Screeb.Instance.SessionReplayStop(); tcs.SetResult(true); }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return await tcs.Task;
    }

    public static partial Task<string?> Debug()
    {
        var tcs = new TaskCompletionSource<string?>();
        new Handler(Looper.MainLooper!).Post(() =>
        {
            try
            {
                App.Screeb.Sdk.Screeb.Instance.Debug(new KotlinResultCallback((info, error) =>
                {
                    if (error != null) tcs.SetException(new Exception(error.ToString()));
                    else tcs.SetResult(info?.ToString());
                }));
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

    public static partial Task<string?> DebugTargeting()
    {
        var tcs = new TaskCompletionSource<string?>();
        new Handler(Looper.MainLooper!).Post(() =>
        {
            try
            {
                App.Screeb.Sdk.Screeb.Instance.DebugTargeting(new KotlinResultCallback((info, error) =>
                {
                    if (error != null) tcs.SetException(new Exception(error.ToString()));
                    else tcs.SetResult(info?.ToString());
                }));
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

    // --- Helpers ---

    private static IDictionary<string, Java.Lang.Object>? ToJavaDictionary(Dictionary<string, object>? dict)
    {
        if (dict == null) return null;
        var map = new Dictionary<string, Java.Lang.Object>();
        foreach (var (k, v) in dict)
            map[k] = v is string s ? new Java.Lang.String(s) :
                       v is bool b ? Java.Lang.Boolean.ValueOf(b)! :
                       v is int i ? Java.Lang.Integer.ValueOf(i)! :
                       v is long l ? Java.Lang.Long.ValueOf(l)! :
                       v is double d ? Java.Lang.Double.ValueOf(d)! :
                       new Java.Lang.String(v.ToString() ?? "");
        return map;
    }

    private static Dictionary<string, object>? FromJavaObject(Java.Lang.Object? obj)
    {
        if (obj == null) return null;
        if (obj is IDictionary<string, Java.Lang.Object> dict)
        {
            var result = new Dictionary<string, object>();
            foreach (var (k, v) in dict)
                result[k] = v?.ToString() ?? "";
            return result;
        }
        return null;
    }

    private static IDictionary<string, Java.Lang.Object>? ToInitOptionsMap(ScreebInitOptions? opts)
    {
        if (opts == null) return null;
        return new Dictionary<string, Java.Lang.Object>
        {
            ["isDebugMode"] = Java.Lang.Boolean.ValueOf(opts.IsDebugMode)!,
            ["disableMirror"] = Java.Lang.Boolean.ValueOf(opts.DisableMirror)!
        };
    }
}
#endif

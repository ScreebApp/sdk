// packages/sdk-maui/Platforms/Android/Screeb.Android.cs
#if ANDROID
using Android.OS;
using App.Screeb.Sdk;

namespace Screeb.Maui;

public static partial class Screeb
{
    private static readonly Handler _mainHandler = new Handler(Looper.MainLooper!);

    // Dispatches body to the main thread; catches exceptions and forwards them to the returned Task.
    private static Task<bool?> OnMain(Action<TaskCompletionSource<bool?>> body)
    {
        var tcs = new TaskCompletionSource<bool?>(TaskCreationOptions.RunContinuationsAsynchronously);
        _mainHandler.Post(() =>
        {
            try { body(tcs); }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

    private static Task<bool?> OnMain(Action body) =>
        OnMain(tcs => { body(); tcs.SetResult(true); });

    private static Task<T?> OnMain<T>(Action<TaskCompletionSource<T?>> body) where T : class
    {
        var tcs = new TaskCompletionSource<T?>(TaskCreationOptions.RunContinuationsAsynchronously);
        _mainHandler.Post(() =>
        {
            try { body(tcs); }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

    public static partial Task<bool?> InitSdk(
        string channelId, string? userId, Dictionary<string, object>? properties,
        ScreebHooks? hooks, ScreebInitOptions? initOptions, string? language)
        => OnMain(() =>
        {
            var uuidMap = HooksRegistry.RegisterHooks(hooks);
            App.Screeb.Sdk.Screeb.Instance.SetSecondarySDK("maui", SdkVersion);
            App.Screeb.Sdk.Screeb.Instance.PluginInit(
                channelId, userId,
                ToJavaDictionary(ScreebUtils.FormatProperties(properties)),
                ToInitOptionsMap(initOptions),
                HooksAndroid.ToGlobalHooks(uuidMap),
                language);
        });

    public static partial Task<bool?> CloseSdk() => OnMain(() =>
    {
        HooksRegistry.UnregisterAll();
        App.Screeb.Sdk.Screeb.Instance.CloseSdk();
    });

    public static partial Task<bool?> SetIdentity(string userId, Dictionary<string, object>? properties)
        => OnMain(() => App.Screeb.Sdk.Screeb.Instance.SetIdentity(
            userId, ToJavaDictionary(ScreebUtils.FormatProperties(properties))));

    public static partial Task<bool?> SetProperties(Dictionary<string, object>? properties)
        => OnMain(() =>
        {
            var props = ToJavaDictionary(ScreebUtils.FormatProperties(properties));
            if (props != null) App.Screeb.Sdk.Screeb.Instance.SetVisitorProperties(props);
        });

    public static partial Task<bool?> ResetIdentity()
        => OnMain(() => App.Screeb.Sdk.Screeb.Instance.ResetIdentity());

    public static partial Task<Dictionary<string, object>?> GetIdentity()
        => OnMain<Dictionary<string, object>>(tcs =>
            App.Screeb.Sdk.Screeb.Instance.GetIdentity(new KotlinResultCallback((identity, error) =>
            {
                if (error != null) tcs.SetException(new Exception(error.ToString()));
                else tcs.SetResult(FromJavaObject(identity));
            })));

    public static partial Task<bool?> AssignGroup(string? groupType, string groupName, Dictionary<string, object>? properties)
        => OnMain(() => App.Screeb.Sdk.Screeb.Instance.AssignGroup(
            groupType, groupName, ToJavaDictionary(ScreebUtils.FormatProperties(properties))));

    public static partial Task<bool?> UnassignGroup(string? groupType, string groupName, Dictionary<string, object>? properties)
        => OnMain(() => App.Screeb.Sdk.Screeb.Instance.UnassignGroup(
            groupType, groupName, ToJavaDictionary(ScreebUtils.FormatProperties(properties))));

    public static partial Task<bool?> TrackEvent(string name, Dictionary<string, object>? properties)
        => OnMain(() => App.Screeb.Sdk.Screeb.Instance.TrackEvent(
            name, ToJavaDictionary(ScreebUtils.FormatProperties(properties))));

    public static partial Task<bool?> TrackScreen(string name, Dictionary<string, object>? properties)
        => OnMain(() => App.Screeb.Sdk.Screeb.Instance.TrackScreen(
            name, ToJavaDictionary(ScreebUtils.FormatProperties(properties))));

    public static partial Task<bool?> StartSurvey(
        string surveyId, bool allowMultipleResponses, Dictionary<string, object>? hiddenFields,
        bool ignoreSurveyStatus, ScreebHooks? hooks, string? language, string? distributionId)
        => OnMain(() => App.Screeb.Sdk.Screeb.Instance.StartSurvey(
            surveyId, allowMultipleResponses,
            ToJavaDictionary(ScreebUtils.FormatProperties(hiddenFields)),
            ignoreSurveyStatus,
            HooksAndroid.ToSurveyHooks(HooksRegistry.RegisterHooks(hooks)),
            language, distributionId));

    public static partial Task<bool?> CloseSurvey(string? surveyId)
        => OnMain(() => App.Screeb.Sdk.Screeb.Instance.CloseSurvey(surveyId));

    public static partial Task<bool?> StartMessage(
        string messageId, bool allowMultipleResponses, Dictionary<string, object>? hiddenFields,
        bool ignoreMessageStatus, ScreebHooks? hooks, string? language, string? distributionId)
        => OnMain(() => App.Screeb.Sdk.Screeb.Instance.StartMessage(
            messageId, allowMultipleResponses,
            ToJavaDictionary(ScreebUtils.FormatProperties(hiddenFields)),
            ignoreMessageStatus,
            HooksAndroid.ToSurveyHooks(HooksRegistry.RegisterHooks(hooks)),
            language, distributionId));

    public static partial Task<bool?> CloseMessage(string? messageId)
        => OnMain(() => App.Screeb.Sdk.Screeb.Instance.CloseMessage(messageId));

    public static partial Task<bool?> SessionReplayStart()
        => OnMain(() => App.Screeb.Sdk.Screeb.Instance.SessionReplayStart());

    public static partial Task<bool?> SessionReplayStop()
        => OnMain(() => App.Screeb.Sdk.Screeb.Instance.SessionReplayStop());

    public static partial Task<string?> Debug()
        => OnMain<string>(tcs =>
            App.Screeb.Sdk.Screeb.Instance.Debug(new KotlinResultCallback((info, error) =>
            {
                if (error != null) tcs.SetException(new Exception(error.ToString()));
                else tcs.SetResult(info?.ToString());
            })));

    public static partial Task<string?> DebugTargeting()
        => OnMain<string>(tcs =>
            App.Screeb.Sdk.Screeb.Instance.DebugTargeting(new KotlinResultCallback((info, error) =>
            {
                if (error != null) tcs.SetException(new Exception(error.ToString()));
                else tcs.SetResult(info?.ToString());
            })));

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

    private static IDictionary<string, Java.Lang.Object>? ToInitOptionsMap(ScreebInitOptions? opts)
    {
        if (opts == null) return null;
        return new Dictionary<string, Java.Lang.Object>
        {
            ["isDebugMode"] = Java.Lang.Boolean.ValueOf(opts.IsDebugMode)!,
            ["disableMirror"] = Java.Lang.Boolean.ValueOf(opts.DisableMirror)!
        };
    }

    private static Dictionary<string, object>? FromJavaObject(Java.Lang.Object? obj)
    {
        if (obj == null) return null;
        if (obj is IDictionary<string, Java.Lang.Object> dict)
        {
            var result = new Dictionary<string, object>();
            foreach (var (k, v) in dict) result[k] = v?.ToString() ?? "";
            return result;
        }
        return null;
    }


}
#endif

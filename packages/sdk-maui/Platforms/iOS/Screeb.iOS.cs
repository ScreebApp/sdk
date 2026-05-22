#if IOS
using Foundation;
using Screeb.iOS.Binding;
using NativeScreeb = global::Screeb.iOS.Binding.Screeb;

namespace Screeb.Maui;

public static partial class Screeb
{
    // Dispatches body to the main thread; catches exceptions and forwards them to the returned Task.
    private static Task<bool?> OnMain(Action<TaskCompletionSource<bool?>> body)
    {
        var tcs = new TaskCompletionSource<bool?>();
        NSRunLoop.Main.BeginInvokeOnMainThread(() =>
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
        var tcs = new TaskCompletionSource<T?>();
        NSRunLoop.Main.BeginInvokeOnMainThread(() =>
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
            NativeScreeb.SetSecondarySDK("maui", SdkVersion);
            NativeScreeb.InitSdk(null, channelId, userId,
                ToNSDictionary(ScreebUtils.FormatProperties(properties)) ?? new NSDictionary(),
                new InitOptions(NSDictionary.FromObjectsAndKeys(
                    new object[] { NSNumber.FromBoolean(initOptions?.IsDebugMode ?? false), NSNumber.FromBoolean(initOptions?.DisableMirror ?? false) },
                    new object[] { "isDebugMode", "disableMirror" })),
                HooksIOS.ToNSDictionary(HooksRegistry.RegisterHooks(hooks)),
                language);
        });

    public static partial Task<bool?> CloseSdk()
        => OnMain(() => NativeScreeb.CloseSdk());

    public static partial Task<bool?> SetIdentity(string userId, Dictionary<string, object>? properties)
        => OnMain(() => NativeScreeb.SetIdentity(
            userId, ToNSDictionary(ScreebUtils.FormatProperties(properties)) ?? new NSDictionary()));

    public static partial Task<bool?> SetProperties(Dictionary<string, object>? properties)
        => OnMain(() => NativeScreeb.VisitorProperty(
            ToNSDictionary(ScreebUtils.FormatProperties(properties)) ?? new NSDictionary()));

    public static partial Task<bool?> ResetIdentity()
        => OnMain(() => NativeScreeb.ResetIdentity());

    public static partial Task<Dictionary<string, object>?> GetIdentity()
        => OnMain<Dictionary<string, object>>(tcs =>
            NativeScreeb.GetIdentity((identity, error) =>
            {
                if (error != null) tcs.SetException(new Exception(error.LocalizedDescription));
                else tcs.SetResult(FromNSDictionary(identity));
            }));

    public static partial Task<bool?> AssignGroup(string? groupType, string groupName, Dictionary<string, object>? properties)
        => OnMain(() => NativeScreeb.AssignGroup(
            groupType, groupName, ToNSDictionary(ScreebUtils.FormatProperties(properties)) ?? new NSDictionary()));

    public static partial Task<bool?> UnassignGroup(string? groupType, string groupName, Dictionary<string, object>? properties)
        => OnMain(() => NativeScreeb.UnassignGroup(
            groupType, groupName, ToNSDictionary(ScreebUtils.FormatProperties(properties)) ?? new NSDictionary()));

    public static partial Task<bool?> TrackEvent(string name, Dictionary<string, object>? properties)
        => OnMain(() => NativeScreeb.TrackEvent(
            name, ToNSDictionary(ScreebUtils.FormatProperties(properties)) ?? new NSDictionary()));

    public static partial Task<bool?> TrackScreen(string name, Dictionary<string, object>? properties)
        => OnMain(() => NativeScreeb.TrackScreen(
            name, ToNSDictionary(ScreebUtils.FormatProperties(properties)) ?? new NSDictionary()));

    public static partial Task<bool?> StartSurvey(
        string surveyId, bool allowMultipleResponses, Dictionary<string, object>? hiddenFields,
        bool ignoreSurveyStatus, ScreebHooks? hooks, string? language, string? distributionId)
        => OnMain(() => NativeScreeb.StartSurvey(
            surveyId, allowMultipleResponses,
            ToNSDictionary(ScreebUtils.FormatProperties(hiddenFields)) ?? new NSDictionary(),
            ignoreSurveyStatus,
            HooksIOS.ToNSDictionary(HooksRegistry.RegisterHooks(hooks)),
            language, distributionId));

    public static partial Task<bool?> CloseSurvey(string? surveyId)
        => OnMain(() => NativeScreeb.CloseSurvey(surveyId));

    public static partial Task<bool?> StartMessage(
        string messageId, bool allowMultipleResponses, Dictionary<string, object>? hiddenFields,
        bool ignoreMessageStatus, ScreebHooks? hooks, string? language, string? distributionId)
        => OnMain(() => NativeScreeb.StartMessage(
            messageId, allowMultipleResponses,
            ToNSDictionary(ScreebUtils.FormatProperties(hiddenFields)) ?? new NSDictionary(),
            ignoreMessageStatus,
            HooksIOS.ToNSDictionary(HooksRegistry.RegisterHooks(hooks)),
            language, distributionId));

    public static partial Task<bool?> CloseMessage(string? messageId)
        => OnMain(() => NativeScreeb.CloseMessage(messageId));

    public static partial Task<bool?> SessionReplayStart()
        => OnMain(() => NativeScreeb.SessionReplayStart());

    public static partial Task<bool?> SessionReplayStop()
        => OnMain(() => NativeScreeb.SessionReplayStop());

    public static partial Task<string?> Debug()
        => OnMain<string>(tcs =>
            NativeScreeb.Debug((info, error) =>
            {
                if (error != null) tcs.SetException(new Exception(error.LocalizedDescription));
                else tcs.SetResult(info);
            }));

    public static partial Task<string?> DebugTargeting()
        => OnMain<string>(tcs =>
            NativeScreeb.DebugTargeting((info, error) =>
            {
                if (error != null) tcs.SetException(new Exception(error.LocalizedDescription));
                else tcs.SetResult(info);
            }));

    // --- Helpers ---

    private static NSDictionary? ToNSDictionary(Dictionary<string, object>? dict)
    {
        if (dict == null) return null;
        var keys = new List<NSObject>();
        var values = new List<NSObject>();
        foreach (var (k, v) in dict)
        {
            keys.Add(new NSString(k));
            values.Add(v is string s ? new NSString(s) :
                       v is bool b ? NSNumber.FromBoolean(b) :
                       v is int i ? NSNumber.FromInt32(i) :
                       v is long l ? NSNumber.FromInt64(l) :
                       v is double d ? NSNumber.FromDouble(d) :
                       (NSObject)new NSString(v.ToString() ?? ""));
        }
        return NSDictionary.FromObjectsAndKeys(values.ToArray(), keys.ToArray());
    }

    private static Dictionary<string, object>? FromNSDictionary(NSDictionary? dict)
    {
        if (dict == null) return null;
        var result = new Dictionary<string, object>();
        foreach (var key in dict.Keys)
            result[key.ToString() ?? ""] = dict[key]?.ToString() ?? "";
        return result;
    }
}
#endif

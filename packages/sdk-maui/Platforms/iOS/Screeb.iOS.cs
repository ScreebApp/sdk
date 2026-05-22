#if IOS
using Foundation;
using Screeb.iOS.Binding;

namespace Screeb.Maui;

public static partial class Screeb
{
    public static partial Task<bool?> InitSdk(
        string channelId, string? userId, Dictionary<string, object>? properties,
        ScreebHooks? hooks, ScreebInitOptions? initOptions, string? language)
    {
        var tcs = new TaskCompletionSource<bool?>();
        MainThread.InvokeOnMainThread(() =>
        {
            try
            {
                Screeb.iOS.Binding.Screeb.SetSecondarySDK("maui", "0.1.0");
                var ioOpts = new Screeb.iOS.Binding.InitOptions(NSDictionary.FromObjectsAndKeys(
                    new object[] { 
                        NSNumber.FromBoolean(initOptions?.IsDebugMode ?? false), 
                        NSNumber.FromBoolean(initOptions?.DisableMirror ?? false) 
                    },
                    new object[] { "isDebugMode", "disableMirror" }));
                var jHooks = HooksIOS.ToNSDictionary(HooksRegistry.RegisterHooks(hooks));
                Screeb.iOS.Binding.Screeb.InitSdk(
                    null, channelId, userId,
                    ToNSDictionary(ScreebUtils.FormatProperties(properties)) ?? new NSDictionary(),
                    ioOpts, jHooks, language);
                tcs.SetResult(true);
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

    public static partial Task<bool?> CloseSdk()
    {
        var tcs = new TaskCompletionSource<bool?>();
        MainThread.InvokeOnMainThread(() =>
        {
            try { Screeb.iOS.Binding.Screeb.CloseSdk(); tcs.SetResult(true); }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

    public static partial Task<bool?> SetIdentity(string userId, Dictionary<string, object>? properties)
    {
        var tcs = new TaskCompletionSource<bool?>();
        MainThread.InvokeOnMainThread(() =>
        {
            try
            {
                Screeb.iOS.Binding.Screeb.SetIdentity(userId,
                    ToNSDictionary(ScreebUtils.FormatProperties(properties)) ?? new NSDictionary());
                tcs.SetResult(true);
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

    public static partial Task<bool?> SetProperties(Dictionary<string, object>? properties)
    {
        var tcs = new TaskCompletionSource<bool?>();
        MainThread.InvokeOnMainThread(() =>
        {
            try
            {
                Screeb.iOS.Binding.Screeb.VisitorProperty(
                    ToNSDictionary(ScreebUtils.FormatProperties(properties)) ?? new NSDictionary());
                tcs.SetResult(true);
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

    public static partial Task<bool?> ResetIdentity()
    {
        var tcs = new TaskCompletionSource<bool?>();
        MainThread.InvokeOnMainThread(() =>
        {
            try { Screeb.iOS.Binding.Screeb.ResetIdentity(); tcs.SetResult(true); }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

    public static partial Task<Dictionary<string, object>?> GetIdentity()
    {
        var tcs = new TaskCompletionSource<Dictionary<string, object>?>();
        MainThread.InvokeOnMainThread(() =>
        {
            try
            {
                Screeb.iOS.Binding.Screeb.GetIdentity((identity, error) =>
                {
                    if (error != null) tcs.SetException(new Exception(error.LocalizedDescription));
                    else tcs.SetResult(FromNSDictionary(identity));
                });
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

    public static partial Task<bool?> AssignGroup(string? groupType, string groupName, Dictionary<string, object>? properties)
    {
        var tcs = new TaskCompletionSource<bool?>();
        MainThread.InvokeOnMainThread(() =>
        {
            try
            {
                Screeb.iOS.Binding.Screeb.AssignGroup(groupType, groupName,
                    ToNSDictionary(ScreebUtils.FormatProperties(properties)) ?? new NSDictionary());
                tcs.SetResult(true);
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

    public static partial Task<bool?> UnassignGroup(string? groupType, string groupName, Dictionary<string, object>? properties)
    {
        var tcs = new TaskCompletionSource<bool?>();
        MainThread.InvokeOnMainThread(() =>
        {
            try
            {
                Screeb.iOS.Binding.Screeb.UnassignGroup(groupType, groupName,
                    ToNSDictionary(ScreebUtils.FormatProperties(properties)) ?? new NSDictionary());
                tcs.SetResult(true);
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

    public static partial Task<bool?> TrackEvent(string name, Dictionary<string, object>? properties)
    {
        var tcs = new TaskCompletionSource<bool?>();
        MainThread.InvokeOnMainThread(() =>
        {
            try
            {
                Screeb.iOS.Binding.Screeb.TrackEvent(name,
                    ToNSDictionary(ScreebUtils.FormatProperties(properties)) ?? new NSDictionary());
                tcs.SetResult(true);
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

    public static partial Task<bool?> TrackScreen(string name, Dictionary<string, object>? properties)
    {
        var tcs = new TaskCompletionSource<bool?>();
        MainThread.InvokeOnMainThread(() =>
        {
            try
            {
                Screeb.iOS.Binding.Screeb.TrackScreen(name,
                    ToNSDictionary(ScreebUtils.FormatProperties(properties)) ?? new NSDictionary());
                tcs.SetResult(true);
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

    public static partial Task<bool?> StartSurvey(
        string surveyId, bool allowMultipleResponses, Dictionary<string, object>? hiddenFields,
        bool ignoreSurveyStatus, ScreebHooks? hooks, string? language, string? distributionId)
    {
        var tcs = new TaskCompletionSource<bool?>();
        MainThread.InvokeOnMainThread(() =>
        {
            try
            {
                var jHooks = HooksIOS.ToNSDictionary(HooksRegistry.RegisterHooks(hooks));
                Screeb.iOS.Binding.Screeb.StartSurvey(
                    surveyId, allowMultipleResponses,
                    ToNSDictionary(ScreebUtils.FormatProperties(hiddenFields)) ?? new NSDictionary(),
                    ignoreSurveyStatus, jHooks, language, distributionId);
                tcs.SetResult(true);
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

    public static partial Task<bool?> CloseSurvey(string? surveyId)
    {
        var tcs = new TaskCompletionSource<bool?>();
        MainThread.InvokeOnMainThread(() =>
        {
            try { Screeb.iOS.Binding.Screeb.CloseSurvey(surveyId); tcs.SetResult(true); }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

    public static partial Task<bool?> StartMessage(
        string messageId, bool allowMultipleResponses, Dictionary<string, object>? hiddenFields,
        bool ignoreMessageStatus, ScreebHooks? hooks, string? language, string? distributionId)
    {
        var tcs = new TaskCompletionSource<bool?>();
        MainThread.InvokeOnMainThread(() =>
        {
            try
            {
                var jHooks = HooksIOS.ToNSDictionary(HooksRegistry.RegisterHooks(hooks));
                Screeb.iOS.Binding.Screeb.StartMessage(
                    messageId, allowMultipleResponses,
                    ToNSDictionary(ScreebUtils.FormatProperties(hiddenFields)) ?? new NSDictionary(),
                    ignoreMessageStatus, jHooks, language, distributionId);
                tcs.SetResult(true);
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

    public static partial Task<bool?> CloseMessage(string? messageId)
    {
        var tcs = new TaskCompletionSource<bool?>();
        MainThread.InvokeOnMainThread(() =>
        {
            try { Screeb.iOS.Binding.Screeb.CloseMessage(messageId); tcs.SetResult(true); }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

    public static partial Task<bool?> SessionReplayStart()
    {
        var tcs = new TaskCompletionSource<bool?>();
        MainThread.InvokeOnMainThread(() =>
        {
            try { Screeb.iOS.Binding.Screeb.SessionReplayStart(); tcs.SetResult(true); }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

    public static partial Task<bool?> SessionReplayStop()
    {
        var tcs = new TaskCompletionSource<bool?>();
        MainThread.InvokeOnMainThread(() =>
        {
            try { Screeb.iOS.Binding.Screeb.SessionReplayStop(); tcs.SetResult(true); }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

    public static partial Task<string?> Debug()
    {
        var tcs = new TaskCompletionSource<string?>();
        MainThread.InvokeOnMainThread(() =>
        {
            try
            {
                Screeb.iOS.Binding.Screeb.Debug((info, error) =>
                {
                    if (error != null) tcs.SetException(new Exception(error.LocalizedDescription));
                    else tcs.SetResult(info);
                });
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

    public static partial Task<string?> DebugTargeting()
    {
        var tcs = new TaskCompletionSource<string?>();
        MainThread.InvokeOnMainThread(() =>
        {
            try
            {
                Screeb.iOS.Binding.Screeb.DebugTargeting((info, error) =>
                {
                    if (error != null) tcs.SetException(new Exception(error.LocalizedDescription));
                    else tcs.SetResult(info);
                });
            }
            catch (Exception ex) { tcs.SetException(ex); }
        });
        return tcs.Task;
    }

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
                       new NSString(v.ToString() ?? ""));
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

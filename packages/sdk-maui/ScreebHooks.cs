namespace Screeb.Maui;

public class ScreebHooks
{
    public string? Version { get; set; }

    /// <summary>
    /// Hook callbacks: key = hook name (e.g. "onSurveyShowed"),
    /// value = async callback receiving the JSON payload string.
    /// </summary>
    public Dictionary<string, Func<string, Task<object?>>> Callbacks { get; set; } = new();
}

/// <summary>
/// Internal registry mapping UUID → C# callback. Used by platform implementations.
/// Thread-safe via ConcurrentDictionary — callbacks are registered from the main thread
/// but invoked from native Android/iOS callback threads.
/// </summary>
internal static class HooksRegistry
{
    private static readonly System.Collections.Concurrent.ConcurrentDictionary<string, Func<string, Task<object?>>> _registry = new();

    internal static Dictionary<string, string> RegisterHooks(ScreebHooks? hooks)
    {
        var uuidMap = new Dictionary<string, string>();
        if (hooks == null) return uuidMap;
        if (hooks.Version != null)
            uuidMap["version"] = hooks.Version;
        foreach (var (key, callback) in hooks.Callbacks)
        {
            var uuid = Guid.NewGuid().ToString("N") + "_" + key;
            _registry[uuid] = callback;
            uuidMap[key] = uuid;
        }
        return uuidMap;
    }

    internal static Func<string, Task<object?>>? Get(string uuid)
        => _registry.TryGetValue(uuid, out var fn) ? fn : null;

    /// <summary>
    /// Removes registered callbacks by UUID. Call after SDK teardown or hook de-registration
    /// to prevent unbounded memory growth across repeated InitSdk/StartSurvey calls.
    /// </summary>
    internal static void Unregister(IEnumerable<string> uuids)
    {
        foreach (var uuid in uuids)
            _registry.TryRemove(uuid, out _);
    }
}

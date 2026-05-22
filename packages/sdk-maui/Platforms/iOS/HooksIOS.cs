#if IOS
using Foundation;

namespace Screeb.Maui;

internal static class HooksIOS
{
    /// <summary>
    /// Converts hook UUIDs to NSDictionary for passing to native iOS SDK.
    /// NOTE: ObjC block-based hook callbacks are not yet supported in v0.1.0.
    /// The "version" key is passed as a string; other hook keys are registered
    /// in HooksRegistry but callbacks will not fire from the native iOS side.
    /// </summary>
    internal static NSDictionary? ToNSDictionary(Dictionary<string, string> uuidMap)
    {
        if (uuidMap.Count == 0) return null;
        var keys = new List<NSObject>();
        var values = new List<NSObject>();

        foreach (var (key, value) in uuidMap)
        {
            keys.Add(new NSString(key));
            values.Add(new NSString(value));
        }
        return NSDictionary.FromObjectsAndKeys(values.ToArray(), keys.ToArray());
    }
}
#endif

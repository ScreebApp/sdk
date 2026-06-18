#if IOS
using Foundation;
using NativeScreeb = Screeb.iOS.Binding.Screeb;

namespace Screeb.Maui;

internal static class HooksIOS
{
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

        var hookIds = NSDictionary.FromObjectsAndKeys(values.ToArray(), keys.ToArray());
        return NativeScreeb.MakeHooks(hookIds, (wrapperHookId, nativeHookId, payload) =>
        {
            var fn = HooksRegistry.Get(wrapperHookId);
            if (fn == null || string.IsNullOrWhiteSpace(nativeHookId)) return;

            Task.Run(async () =>
            {
                try
                {
                    var callbackResult = await fn(payload).ConfigureAwait(false);
                    NativeScreeb.OnHookResult(nativeHookId, ToNSObject(callbackResult));
                }
                catch
                {
                    NativeScreeb.OnHookResult(nativeHookId, NSNumber.FromBoolean(false));
                }
            });
        });
    }

    private static NSObject? ToNSObject(object? value)
    {
        return value switch
        {
            null => null,
            NSObject nsObject => nsObject,
            string s => new NSString(s),
            bool b => NSNumber.FromBoolean(b),
            int i => NSNumber.FromInt32(i),
            long l => NSNumber.FromInt64(l),
            float f => NSNumber.FromFloat(f),
            double d => NSNumber.FromDouble(d),
            IDictionary<string, object> dict => ToNSDictionary(dict),
            IEnumerable<object> list => NSArray.FromNSObjects(list.Select(ToNSObject).Where(item => item != null).ToArray()!),
            _ => new NSString(value.ToString() ?? "")
        };
    }

    private static NSDictionary ToNSDictionary(IDictionary<string, object> dict)
    {
        var keys = new List<NSObject>();
        var values = new List<NSObject>();
        foreach (var (key, value) in dict)
        {
            var nsValue = ToNSObject(value);
            if (nsValue == null) continue;
            keys.Add(new NSString(key));
            values.Add(nsValue);
        }
        return NSDictionary.FromObjectsAndKeys(values.ToArray(), keys.ToArray());
    }
}
#endif

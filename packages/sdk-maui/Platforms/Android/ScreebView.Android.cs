#if ANDROID
using Android.Views;
using Microsoft.Maui.Controls;
using AndroidView = Android.Views.View;

namespace Screeb.Maui;

internal static partial class ScreebViewPlatform
{
    internal static partial void ApplyId(VisualElement element, string id) =>
        Apply(element, view => SetTag(view, "screeb_id", new Java.Lang.String(id)));

    internal static partial void ApplyMaskText(VisualElement element) =>
        Apply(element, view => SetTag(view, "screeb_sensitive_tag", Java.Lang.Boolean.True!));

    internal static partial void ApplyNoCapture(VisualElement element) =>
        Apply(element, view => SetTag(view, "screeb_no_capture_tag", Java.Lang.Boolean.True!));

    private static void Apply(VisualElement element, Action<AndroidView> action)
    {
        if (element.Handler?.PlatformView is AndroidView view)
        {
            action(view);
            return;
        }

        void OnHandlerChanged(object? sender, EventArgs args)
        {
            element.HandlerChanged -= OnHandlerChanged;
            if (element.Handler?.PlatformView is AndroidView attachedView)
            {
                action(attachedView);
            }
        }

        element.HandlerChanged += OnHandlerChanged;
    }

    private static void SetTag(AndroidView view, string resourceName, Java.Lang.Object value)
    {
        var id = view.Resources?.GetIdentifier(resourceName, "id", view.Context?.PackageName) ?? 0;
        if (id == 0)
        {
            throw new InvalidOperationException($"Unable to resolve Screeb Android resource id '{resourceName}'.");
        }
        view.SetTag(id, value);
    }
}
#endif

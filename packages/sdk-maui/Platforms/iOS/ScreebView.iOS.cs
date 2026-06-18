#if IOS
using Microsoft.Maui.Controls;
using NativeScreebView = Screeb.iOS.Binding.ScreebView;
using IosView = UIKit.UIView;

namespace Screeb.Maui;

internal static partial class ScreebViewPlatform
{
    internal static partial void ApplyId(VisualElement element, string id) =>
        Apply(element, view => NativeScreebView.ScreebId(view, id));

    internal static partial void ApplyMaskText(VisualElement element) =>
        Apply(element, NativeScreebView.ScreebMaskText);

    internal static partial void ApplyNoCapture(VisualElement element) =>
        Apply(element, NativeScreebView.ScreebNoCapture);

    private static void Apply(VisualElement element, Action<IosView> action)
    {
        if (element.Handler?.PlatformView is IosView view)
        {
            action(view);
            return;
        }

        void OnHandlerChanged(object? sender, EventArgs args)
        {
            element.HandlerChanged -= OnHandlerChanged;
            if (element.Handler?.PlatformView is IosView attachedView)
            {
                action(attachedView);
            }
        }

        element.HandlerChanged += OnHandlerChanged;
    }
}
#endif

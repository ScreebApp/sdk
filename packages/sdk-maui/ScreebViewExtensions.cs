using Microsoft.Maui.Controls;

namespace Screeb.Maui;

public static class ScreebViewExtensions
{
    public static T ScreebId<T>(this T element, string id) where T : VisualElement
    {
        ArgumentNullException.ThrowIfNull(element);
        ArgumentException.ThrowIfNullOrWhiteSpace(id);
        ScreebViewPlatform.ApplyId(element, id);
        return element;
    }

    public static T ScreebMaskText<T>(this T element) where T : VisualElement
    {
        ArgumentNullException.ThrowIfNull(element);
        ScreebViewPlatform.ApplyMaskText(element);
        return element;
    }

    public static T ScreebNoCapture<T>(this T element) where T : VisualElement
    {
        ArgumentNullException.ThrowIfNull(element);
        ScreebViewPlatform.ApplyNoCapture(element);
        return element;
    }
}

internal static partial class ScreebViewPlatform
{
    internal static partial void ApplyId(VisualElement element, string id);
    internal static partial void ApplyMaskText(VisualElement element);
    internal static partial void ApplyNoCapture(VisualElement element);
}

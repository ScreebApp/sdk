namespace Screeb.Maui;

public static class ScreebUtils
{
    /// <summary>
    /// Converts DateTime/DateTimeOffset values to ISO 8601 strings with timezone offset,
    /// e.g. "2024-01-15T10:30:00.000+02:00". Recursively processes nested dictionaries.
    /// Mirrors Flutter's _formatDates and React Native's normalizeValue.
    /// </summary>
    public static Dictionary<string, object>? FormatProperties(Dictionary<string, object>? props)
    {
        if (props == null) return null;
        var result = new Dictionary<string, object>(props.Count);
        foreach (var (key, value) in props)
            result[key] = FormatValue(value);
        return result;
    }

    private static object FormatValue(object value) => value switch
    {
        DateTimeOffset dto => FormatDateTimeOffset(dto),
        DateTime dt => FormatDateTimeOffset(new DateTimeOffset(dt)),
        Dictionary<string, object> nested => FormatProperties(nested)!,
        _ => value
    };

    private static string FormatDateTimeOffset(DateTimeOffset dto)
    {
        var offset = dto.Offset;
        var sign = offset >= TimeSpan.Zero ? "+" : "-";
        var absHours = Math.Abs(offset.Hours).ToString("D2");
        var mins = Math.Abs(offset.Minutes).ToString("D2");
        return $"{dto:yyyy-MM-ddTHH:mm:ss.fff}{sign}{absHours}:{mins}";
    }
}

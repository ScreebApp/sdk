using Screeb.Maui;
using Xunit;

namespace Screeb.Maui.Tests;

public class ScreebUtilsTests
{
    [Fact]
    public void FormatProperties_NullInput_ReturnsNull()
    {
        var result = ScreebUtils.FormatProperties(null);
        Assert.Null(result);
    }

    [Fact]
    public void FormatProperties_NoDateValues_ReturnsSameDictionary()
    {
        var input = new Dictionary<string, object> { ["name"] = "Alice", ["age"] = 30 };
        var result = ScreebUtils.FormatProperties(input)!;
        Assert.Equal("Alice", result["name"]);
        Assert.Equal(30, result["age"]);
    }

    [Fact]
    public void FormatProperties_DateTimeValue_ConvertsToIso8601WithOffset()
    {
        var dt = new DateTimeOffset(2024, 1, 15, 10, 30, 0, TimeSpan.FromHours(2));
        var input = new Dictionary<string, object> { ["created_at"] = dt };
        var result = ScreebUtils.FormatProperties(input)!;
        Assert.Equal("2024-01-15T10:30:00.000+02:00", result["created_at"]);
    }

    [Fact]
    public void FormatProperties_NestedDictionary_RecursivelyFormats()
    {
        var dt = new DateTimeOffset(2024, 6, 1, 0, 0, 0, TimeSpan.Zero);
        var input = new Dictionary<string, object>
        {
            ["meta"] = new Dictionary<string, object> { ["at"] = dt }
        };
        var result = ScreebUtils.FormatProperties(input)!;
        var nested = (Dictionary<string, object>)result["meta"];
        Assert.Equal("2024-06-01T00:00:00.000+00:00", nested["at"]);
    }

    [Fact]
    public void FormatNativeProperties_NestedDictionary_RemainsDictionary()
    {
        var input = new Dictionary<string, object>
        {
            ["meta"] = new Dictionary<string, object>
            {
                ["plan"] = "pro",
                ["at"] = new DateTimeOffset(2024, 6, 1, 0, 0, 0, TimeSpan.Zero)
            }
        };

        var result = ScreebUtils.FormatNativeProperties(input)!;

        var nested = Assert.IsType<Dictionary<string, object>>(result["meta"]);
        Assert.Equal("pro", nested["plan"]);
        Assert.Equal("2024-06-01T00:00:00.000+00:00", nested["at"]);
    }

    [Fact]
    public void FormatProperties_DateTimeUtcValue_ConvertsToIso8601WithZeroOffset()
    {
        var dt = DateTime.SpecifyKind(new DateTime(2024, 1, 15, 10, 30, 0), DateTimeKind.Utc);
        var input = new Dictionary<string, object> { ["ts"] = dt };
        var result = ScreebUtils.FormatProperties(input)!;
        Assert.Equal("2024-01-15T10:30:00.000+00:00", result["ts"]);
    }

    [Fact]
    public void FormatProperties_NegativeOffsetDate_IncludesMinusSign()
    {
        var dt = new DateTimeOffset(2024, 1, 15, 10, 30, 0, TimeSpan.FromHours(-5));
        var input = new Dictionary<string, object> { ["ts"] = dt };
        var result = ScreebUtils.FormatProperties(input)!;
        Assert.Equal("2024-01-15T10:30:00.000-05:00", result["ts"]);
    }
}

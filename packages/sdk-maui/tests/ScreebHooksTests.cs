using Screeb.Maui;
using Xunit;

namespace Screeb.Maui.Tests;

public class ScreebHooksTests
{
    [Fact]
    public void RegisterHooks_NullHooks_ReturnsEmptyMap()
    {
        HooksRegistry.UnregisterAll();

        var result = HooksRegistry.RegisterHooks(null);

        Assert.Empty(result);
    }

    [Fact]
    public async Task RegisteredHook_ForwardsPayloadAndReturnsResult()
    {
        HooksRegistry.UnregisterAll();
        string? receivedPayload = null;
        var hooks = new ScreebHooks
        {
            Version = "1.0",
            Callbacks =
            {
                ["onSurveyShowed"] = payload =>
                {
                    receivedPayload = payload;
                    return Task.FromResult<object?>(true);
                }
            }
        };

        var uuidMap = HooksRegistry.RegisterHooks(hooks);
        var uuid = uuidMap["onSurveyShowed"];
        var callback = HooksRegistry.Get(uuid);

        Assert.Equal("1.0", uuidMap["version"]);
        Assert.NotNull(callback);
        Assert.EndsWith("_onSurveyShowed", uuid);
        Assert.True((bool)(await callback!(@"{""hook_id"":""native-hook""}")!)!);
        Assert.Equal(@"{""hook_id"":""native-hook""}", receivedPayload);
    }

    [Fact]
    public void Unregister_RemovesOnlyRequestedHooks()
    {
        HooksRegistry.UnregisterAll();
        var hooks = new ScreebHooks
        {
            Version = "1.0",
            Callbacks =
            {
                ["first"] = _ => Task.FromResult<object?>(true),
                ["second"] = _ => Task.FromResult<object?>(false)
            }
        };
        var uuidMap = HooksRegistry.RegisterHooks(hooks);

        HooksRegistry.Unregister(new[] { uuidMap["first"] });

        Assert.Null(HooksRegistry.Get(uuidMap["first"]));
        Assert.NotNull(HooksRegistry.Get(uuidMap["second"]));
    }
}

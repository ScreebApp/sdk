using Microsoft.Extensions.Logging;
using static Screeb.Maui.Screeb;

namespace ExampleMaui;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder.UseMauiApp<App>();

        Task.Run(async () =>
        {
            await InitSdk(
                channelId: "0e2b609a-8dce-4695-a80f-966fbfa87a88",
                userId: "maui-user-123",
                properties: new Dictionary<string, object>
                {
                    ["platform"] = "maui",
                    ["plan"] = "free"
                }
            );
        });

#if DEBUG
        builder.Logging.AddDebug();
#endif

        return builder.Build();
    }
}

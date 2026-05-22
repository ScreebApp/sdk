using Microsoft.Extensions.Logging;
using Screeb.Maui;

namespace ExampleMaui;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder.UseMauiApp<App>();

        // Initialize Screeb — replace with your channel ID
        Task.Run(async () =>
        {
            await Screeb.InitSdk(
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

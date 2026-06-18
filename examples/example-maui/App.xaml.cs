using static Screeb.Maui.Screeb;

namespace ExampleMaui;

public partial class App : Application
{
    public App()
    {
        InitializeComponent();
        MainPage = new MainPage();
    }

    protected override async void OnStart()
    {
        base.OnStart();
        await InitSdk(
            channelId: "0e2b609a-8dce-4695-a80f-966fbfa87a88",
            userId: "maui-user-123",
            properties: new Dictionary<string, object>
            {
                ["platform"] = "maui",
                ["plan"] = "free"
            },
            initOptions: new Screeb.Maui.ScreebInitOptions { IsDebugMode = false }
        );
    }
}

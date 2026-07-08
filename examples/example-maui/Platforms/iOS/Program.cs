using Foundation;
using UIKit;

namespace ExampleMaui;

public class Program
{
    static void Main(string[] args) =>
        UIApplication.Main(args, null, typeof(AppDelegate));
}

public class AppDelegate : MauiUIApplicationDelegate
{
    protected override MauiApp CreateMauiApp() => MauiProgram.CreateMauiApp();

    // Screeb deep links (screeb-* scheme) — editor/survey/message links open in-app.
    public override bool OpenUrl(UIApplication app, NSUrl url, NSDictionary options)
    {
        _ = global::Screeb.Maui.Screeb.HandleDeepLink(url.AbsoluteString ?? "");
        return true;
    }
}

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
}

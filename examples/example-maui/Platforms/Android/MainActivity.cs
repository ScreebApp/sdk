using Android.App;
using Android.Content;
using Android.Content.PM;
using Android.OS;

namespace ExampleMaui;

[Activity(
    Theme = "@style/Maui.SplashTheme",
    MainLauncher = true,
    LaunchMode = LaunchMode.SingleTop,
    ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation |
                           ConfigChanges.UiMode | ConfigChanges.ScreenLayout |
                           ConfigChanges.SmallestScreenSize | ConfigChanges.Density)]
// Screeb deep links: screeb-<channel-id>://... (e.g. ://inspector)
[IntentFilter(
    new[] { Intent.ActionView },
    Categories = new[] { Intent.CategoryDefault, Intent.CategoryBrowsable },
    DataScheme = "screeb-0e2b609a-8dce-4695-a80f-966fbfa87a88")]
public class MainActivity : MauiAppCompatActivity
{
    protected override void OnCreate(Bundle? savedInstanceState)
    {
        base.OnCreate(savedInstanceState);
        // Forward the launch deep link to the SDK.
        global::App.Screeb.Sdk.Screeb.Instance.HandleDeepLink(Intent);
    }

    protected override void OnNewIntent(Intent? intent)
    {
        base.OnNewIntent(intent);
        Intent = intent;
        global::App.Screeb.Sdk.Screeb.Instance.HandleDeepLink(intent);
    }
}

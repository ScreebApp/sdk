using static Screeb.Maui.Screeb;

namespace ExampleMaui;

public partial class MainPage : ContentPage
{
    public MainPage()
    {
        InitializeComponent();
    }

    private async void OnInitSdkClicked(object sender, EventArgs e)
    {
        try
        {
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
            StatusLabel.Text = "SDK initialized ✓";
        }
        catch (Exception ex)
        {
            StatusLabel.Text = $"Error: {ex.Message}";
        }
    }

    private async void OnSetIdentityClicked(object sender, EventArgs e)
    {
        try
        {
            await SetIdentity("maui-user-123", new Dictionary<string, object> { ["plan"] = "premium" });
            StatusLabel.Text = "Identity set ✓";
        }
        catch (Exception ex)
        {
            StatusLabel.Text = $"Error: {ex.Message}";
        }
    }

    private async void OnSetPropertiesClicked(object sender, EventArgs e)
    {
        try
        {
            await SetProperties(new Dictionary<string, object> { ["plan"] = "premium" });
            StatusLabel.Text = "Properties set ✓";
        }
        catch (Exception ex)
        {
            StatusLabel.Text = $"Error: {ex.Message}";
        }
    }

    private async void OnAssignGroupClicked(object sender, EventArgs e)
    {
        try
        {
            await AssignGroup("company", "Screeb", new Dictionary<string, object> { ["plan"] = "enterprise" });
            StatusLabel.Text = "Group assigned ✓";
        }
        catch (Exception ex)
        {
            StatusLabel.Text = $"Error: {ex.Message}";
        }
    }

    private async void OnUnassignGroupClicked(object sender, EventArgs e)
    {
        try
        {
            await UnassignGroup("company", "Screeb");
            StatusLabel.Text = "Group unassigned ✓";
        }
        catch (Exception ex)
        {
            StatusLabel.Text = $"Error: {ex.Message}";
        }
    }

    private async void OnResetIdentityClicked(object sender, EventArgs e)
    {
        try
        {
            await ResetIdentity();
            StatusLabel.Text = "Identity reset ✓";
        }
        catch (Exception ex)
        {
            StatusLabel.Text = $"Error: {ex.Message}";
        }
    }

    private async void OnGetIdentityClicked(object sender, EventArgs e)
    {
        try
        {
            var identity = await GetIdentity();
            StatusLabel.Text = $"Identity: {identity?.Count ?? 0} props";
        }
        catch (Exception ex)
        {
            StatusLabel.Text = $"Error: {ex.Message}";
        }
    }

    private async void OnTrackEventClicked(object sender, EventArgs e)
    {
        try
        {
            await TrackEvent("button_clicked", new Dictionary<string, object> { ["button"] = "track_event" });
            StatusLabel.Text = "Event tracked ✓";
        }
        catch (Exception ex)
        {
            StatusLabel.Text = $"Error: {ex.Message}";
        }
    }

    private async void OnTrackScreenClicked(object sender, EventArgs e)
    {
        try
        {
            await TrackScreen("MainPage");
            StatusLabel.Text = "Screen tracked ✓";
        }
        catch (Exception ex)
        {
            StatusLabel.Text = $"Error: {ex.Message}";
        }
    }

    private async void OnStartSurveyClicked(object sender, EventArgs e)
    {
        try
        {
            await StartSurvey("1b1fe0c4-d41d-4307-9ca0-b0b66cce8cff");
            StatusLabel.Text = "Survey started ✓";
        }
        catch (Exception ex)
        {
            StatusLabel.Text = $"Error: {ex.Message}";
        }
    }

    private async void OnStartMessageClicked(object sender, EventArgs e)
    {
        try
        {
            await StartMessage("642929b9-28f1-4cb5-b153-f482777e0003");
            StatusLabel.Text = "Message started ✓";
        }
        catch (Exception ex)
        {
            StatusLabel.Text = $"Error: {ex.Message}";
        }
    }

    private async void OnSessionReplayStartClicked(object sender, EventArgs e)
    {
        try
        {
            await SessionReplayStart();
            StatusLabel.Text = "Session replay started ✓";
        }
        catch (Exception ex)
        {
            StatusLabel.Text = $"Error: {ex.Message}";
        }
    }

    private async void OnSessionReplayStopClicked(object sender, EventArgs e)
    {
        try
        {
            await SessionReplayStop();
            StatusLabel.Text = "Session replay stopped ✓";
        }
        catch (Exception ex)
        {
            StatusLabel.Text = $"Error: {ex.Message}";
        }
    }

    private async void OnDebugSdkClicked(object sender, EventArgs e)
    {
        try
        {
            var info = await Debug();
            StatusLabel.Text = info ?? "Debug info unavailable";
        }
        catch (Exception ex)
        {
            StatusLabel.Text = $"Error: {ex.Message}";
        }
    }

    private async void OnDebugTargetingClicked(object sender, EventArgs e)
    {
        try
        {
            var info = await DebugTargeting();
            StatusLabel.Text = info ?? "Targeting debug unavailable";
        }
        catch (Exception ex)
        {
            StatusLabel.Text = $"Error: {ex.Message}";
        }
    }

    private async void OnCloseSdkClicked(object sender, EventArgs e)
    {
        try
        {
            await CloseSdk();
            StatusLabel.Text = "SDK closed ✓";
        }
        catch (Exception ex)
        {
            StatusLabel.Text = $"Error: {ex.Message}";
        }
    }
}

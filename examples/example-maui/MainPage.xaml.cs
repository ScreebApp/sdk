using Screeb.Maui;

namespace ExampleMaui;

public partial class MainPage : ContentPage
{
    public MainPage()
    {
        InitializeComponent();
    }

    private async void OnTrackEventClicked(object sender, EventArgs e)
    {
        try
        {
            await Screeb.TrackEvent("button_clicked", new Dictionary<string, object> { ["button"] = "track_event" });
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
            await Screeb.TrackScreen("MainPage");
            StatusLabel.Text = "Screen tracked ✓";
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
            await Screeb.SetIdentity("maui-user-123", new Dictionary<string, object> { ["plan"] = "premium" });
            StatusLabel.Text = "Identity set ✓";
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
            await Screeb.ResetIdentity();
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
            var identity = await Screeb.GetIdentity();
            StatusLabel.Text = $"Identity: {identity?.Count ?? 0} props";
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
            await Screeb.AssignGroup("company", "Screeb", new Dictionary<string, object> { ["plan"] = "enterprise" });
            StatusLabel.Text = "Group assigned ✓";
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
            await Screeb.StartSurvey("<YOUR_SURVEY_ID>");
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
            await Screeb.StartMessage("<YOUR_MESSAGE_ID>");
            StatusLabel.Text = "Message started ✓";
        }
        catch (Exception ex)
        {
            StatusLabel.Text = $"Error: {ex.Message}";
        }
    }
}

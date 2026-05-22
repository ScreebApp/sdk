namespace Screeb.Maui;

/// <summary>
/// Screeb SDK for .NET MAUI. All methods are thread-safe and run on the main thread.
/// Call InitSdk before any other method.
/// </summary>
public static partial class Screeb
{
    /// <summary>
    /// Initialize the Screeb SDK. Must be called before any other method.
    /// </summary>
    /// <param name="channelId">Your Screeb channel ID from the Screeb dashboard.</param>
    /// <param name="userId">Visitor identifier. Pass null for anonymous visitors.</param>
    /// <param name="properties">User properties. Supports string, int, double, bool, DateTime, and nested Dictionary values. Pass null for no properties.</param>
    /// <param name="hooks">Optional lifecycle callbacks for survey/message events.</param>
    /// <param name="initOptions">Optional SDK configuration options.</param>
    /// <param name="language">ISO 639-1 language code (e.g. "en", "fr"). Pass null to use device locale.</param>
    /// <returns>true if initialization succeeded, false if it failed or SDK already initialized, null if unsupported.</returns>
    public static partial Task<bool?> InitSdk(
        string channelId,
        string? userId = null,
        Dictionary<string, object>? properties = null,
        ScreebHooks? hooks = null,
        ScreebInitOptions? initOptions = null,
        string? language = null);

    /// <summary>Stop the SDK. Opposite of InitSdk.</summary>
    /// <returns>true if closure succeeded, false if it failed or SDK not initialized, null if unsupported.</returns>
    public static partial Task<bool?> CloseSdk();

    /// <summary>Identify the current user with optional properties.</summary>
    /// <param name="userId">Visitor identifier.</param>
    /// <param name="properties">User properties. Supports string, int, double, bool, DateTime, and nested Dictionary values. Pass null for no properties.</param>
    /// <returns>true if identification succeeded, false if it failed or SDK not initialized, null if unsupported.</returns>
    public static partial Task<bool?> SetIdentity(
        string userId,
        Dictionary<string, object>? properties = null);

    /// <summary>Send visitor properties without changing the identity.</summary>
    /// <param name="properties">User properties. Supports string, int, double, bool, DateTime, and nested Dictionary values. Pass null for no properties.</param>
    /// <returns>true if properties update succeeded, false if it failed or SDK not initialized, null if unsupported.</returns>
    public static partial Task<bool?> SetProperties(
        Dictionary<string, object>? properties = null);

    /// <summary>Reset user identity (e.g. on logout).</summary>
    /// <returns>true if reset succeeded, false if it failed or SDK not initialized, null if unsupported.</returns>
    public static partial Task<bool?> ResetIdentity();

    /// <summary>Get current visitor identity and properties.</summary>
    /// <returns>Dictionary of current identity and properties, or null if identity is unavailable or SDK not initialized.</returns>
    public static partial Task<Dictionary<string, object>?> GetIdentity();

    /// <summary>Assign the current user to a group.</summary>
    /// <param name="groupType">Group type identifier, or null for the default group type.</param>
    /// <param name="groupName">Group name identifier.</param>
    /// <param name="properties">User properties. Supports string, int, double, bool, DateTime, and nested Dictionary values. Pass null for no properties.</param>
    /// <returns>true if assignment succeeded, false if it failed or SDK not initialized, null if unsupported.</returns>
    public static partial Task<bool?> AssignGroup(
        string? groupType,
        string groupName,
        Dictionary<string, object>? properties = null);

    /// <summary>Remove the current user from a group.</summary>
    /// <param name="groupType">Group type identifier, or null for the default group type.</param>
    /// <param name="groupName">Group name identifier.</param>
    /// <param name="properties">User properties. Supports string, int, double, bool, DateTime, and nested Dictionary values. Pass null for no properties.</param>
    /// <returns>true if removal succeeded, false if it failed or SDK not initialized, null if unsupported.</returns>
    public static partial Task<bool?> UnassignGroup(
        string? groupType,
        string groupName,
        Dictionary<string, object>? properties = null);

    /// <summary>Track a custom event.</summary>
    /// <param name="name">Event name.</param>
    /// <param name="properties">User properties. Supports string, int, double, bool, DateTime, and nested Dictionary values. Pass null for no properties.</param>
    /// <returns>true if event tracking succeeded, false if it failed or SDK not initialized, null if unsupported.</returns>
    public static partial Task<bool?> TrackEvent(
        string name,
        Dictionary<string, object>? properties = null);

    /// <summary>Track a screen navigation event.</summary>
    /// <param name="name">Event name.</param>
    /// <param name="properties">User properties. Supports string, int, double, bool, DateTime, and nested Dictionary values. Pass null for no properties.</param>
    /// <returns>true if screen tracking succeeded, false if it failed or SDK not initialized, null if unsupported.</returns>
    public static partial Task<bool?> TrackScreen(
        string name,
        Dictionary<string, object>? properties = null);

    /// <summary>Start a specific survey programmatically.</summary>
    /// <param name="surveyId">Survey identifier.</param>
    /// <param name="allowMultipleResponses">Allow the same visitor to respond multiple times.</param>
    /// <param name="hiddenFields">Pre-filled hidden field values.</param>
    /// <param name="ignoreSurveyStatus">Show survey even if it has already been completed.</param>
    /// <param name="hooks">Optional lifecycle callbacks for survey/message events.</param>
    /// <param name="language">ISO 639-1 language code (e.g. "en", "fr"). Pass null to use device locale.</param>
    /// <param name="distributionId">Distribution identifier. Pass null to use the default distribution.</param>
    /// <returns>true if survey started successfully, false if it failed or SDK not initialized, null if unsupported.</returns>
    public static partial Task<bool?> StartSurvey(
        string surveyId,
        bool allowMultipleResponses = true,
        Dictionary<string, object>? hiddenFields = null,
        bool ignoreSurveyStatus = true,
        ScreebHooks? hooks = null,
        string? language = null,
        string? distributionId = null);

    /// <summary>Close the currently displayed survey.</summary>
    /// <param name="surveyId">Survey identifier.</param>
    /// <returns>true if survey closed successfully, false if it failed or no survey is displayed, null if unsupported.</returns>
    public static partial Task<bool?> CloseSurvey(string? surveyId = null);

    /// <summary>Start a specific message programmatically.</summary>
    /// <param name="messageId">Message identifier.</param>
    /// <param name="allowMultipleResponses">Allow the same visitor to respond multiple times.</param>
    /// <param name="hiddenFields">Pre-filled hidden field values.</param>
    /// <param name="ignoreMessageStatus">Show message even if it has already been seen.</param>
    /// <param name="hooks">Optional lifecycle callbacks for survey/message events.</param>
    /// <param name="language">ISO 639-1 language code (e.g. "en", "fr"). Pass null to use device locale.</param>
    /// <param name="distributionId">Distribution identifier. Pass null to use the default distribution.</param>
    /// <returns>true if message started successfully, false if it failed or SDK not initialized, null if unsupported.</returns>
    public static partial Task<bool?> StartMessage(
        string messageId,
        bool allowMultipleResponses = true,
        Dictionary<string, object>? hiddenFields = null,
        bool ignoreMessageStatus = true,
        ScreebHooks? hooks = null,
        string? language = null,
        string? distributionId = null);

    /// <summary>Close the currently displayed message.</summary>
    /// <param name="messageId">Message identifier.</param>
    /// <returns>true if message closed successfully, false if it failed or no message is displayed, null if unsupported.</returns>
    public static partial Task<bool?> CloseMessage(string? messageId = null);

    /// <summary>Start session replay recording.</summary>
    /// <returns>true if recording started successfully, false if it failed or SDK not initialized, null if unsupported.</returns>
    public static partial Task<bool?> SessionReplayStart();

    /// <summary>Stop session replay recording.</summary>
    /// <returns>true if recording stopped successfully, false if it failed or recording not active, null if unsupported.</returns>
    public static partial Task<bool?> SessionReplayStop();

    /// <summary>Get SDK debug information.</summary>
    /// <returns>Debug information string, or null if SDK is not initialized.</returns>
    public static partial Task<string?> Debug();

    /// <summary>Get targeting debug information (why surveys aren't showing).</summary>
    /// <returns>Targeting debug information string, or null if SDK is not initialized.</returns>
    public static partial Task<string?> DebugTargeting();
}

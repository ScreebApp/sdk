// packages/sdk-maui/Platforms/iOS/ApiDefinitions.cs
using Foundation;
using UIKit;
using ObjCRuntime;

namespace Screeb.iOS.Binding;

[Static]
[DisableDefaultCtor]
interface Screeb
{
    [Static]
    [Export("setSecondarySDK:version:")]
    void SetSecondarySDK(string name, string version);

    [Static]
    [Export("initSdk:channelId:identity:visitorProperty:initOptions:hooks:language:")]
    void InitSdk(
        [NullAllowed] UIViewController context,
        string channelId,
        [NullAllowed] string identity,
        NSDictionary visitorProperty,
        [NullAllowed] InitOptions initOptions,
        [NullAllowed] NSDictionary hooks,
        [NullAllowed] string language);

    [Static]
    [Export("closeSdk")]
    void CloseSdk();

    [Static]
    [Export("setIdentity:visitorProperty:")]
    void SetIdentity(string uniqueVisitorId, NSDictionary visitorProperty);

    [Static]
    [Export("visitorProperty:")]
    void VisitorProperty(NSDictionary visitorProperty);

    [Static]
    [Export("resetIdentity")]
    void ResetIdentity();

    [Static]
    [Export("getIdentity:")]
    void GetIdentity(Action<NSDictionary?, NSError?> completion);

    [Static]
    [Export("assignGroup:name:properties:")]
    void AssignGroup([NullAllowed] string type, string name, NSDictionary properties);

    [Static]
    [Export("unassignGroup:name:properties:")]
    void UnassignGroup([NullAllowed] string type, string name, NSDictionary properties);

    [Static]
    [Export("trackEvent:trackingEventProperties:")]
    void TrackEvent(string name, NSDictionary trackingEventProperties);

    [Static]
    [Export("trackScreen:trackingEventProperties:")]
    void TrackScreen(string name, NSDictionary trackingEventProperties);

    [Static]
    [Export("startSurvey:allowMultipleResponses:hiddenFields:ignoreSurveyStatus:hooks:language:distributionId:")]
    void StartSurvey(
        string surveyId,
        bool allowMultipleResponses,
        NSDictionary hiddenFields,
        bool ignoreSurveyStatus,
        [NullAllowed] NSDictionary hooks,
        [NullAllowed] string language,
        [NullAllowed] string distributionId);

    [Static]
    [Export("closeSurvey:")]
    void CloseSurvey([NullAllowed] string surveyId);

    [Static]
    [Export("startMessage:allowMultipleResponses:hiddenFields:ignoreMessageStatus:hooks:language:distributionId:")]
    void StartMessage(
        string messageId,
        bool allowMultipleResponses,
        NSDictionary hiddenFields,
        bool ignoreMessageStatus,
        [NullAllowed] NSDictionary hooks,
        [NullAllowed] string language,
        [NullAllowed] string distributionId);

    [Static]
    [Export("closeMessage:")]
    void CloseMessage([NullAllowed] string messageId);

    [Static]
    [Export("sessionReplayStart")]
    void SessionReplayStart();

    [Static]
    [Export("sessionReplayStop")]
    void SessionReplayStop();

    [Static]
    [Export("debug:")]
    void Debug(Action<string?, NSError?> completion);

    [Static]
    [Export("debugTargeting:")]
    void DebugTargeting(Action<string?, NSError?> completion);
}

[BaseType(typeof(NSObject))]
interface InitOptions
{
    [Export("initWithDict:")]
    NativeHandle Constructor(NSDictionary dict);

    [Export("isDebugMode")]
    bool IsDebugMode { get; set; }

    [Export("disableMirror")]
    bool DisableMirror { get; set; }
}

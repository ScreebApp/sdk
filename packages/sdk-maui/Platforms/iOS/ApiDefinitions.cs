// packages/sdk-maui/Platforms/iOS/ApiDefinitions.cs
using System;
using Foundation;
using UIKit;
using ObjCRuntime;

namespace Screeb.iOS.Binding;

[Static]
[DisableDefaultCtor]
[BaseType(typeof(NSObject))]
interface Screeb
{
    [Static]
    [Export("setSecondarySDKWithName:version:")]
    void SetSecondarySDK(string name, string version);

    [Static]
    [Export("initSdkWithContext:channelId:identity:visitorProperty:initOptions:hooks:language:")]
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
    [Export("setIdentityWithUniqueVisitorId:visitorProperty:")]
    void SetIdentity(string uniqueVisitorId, NSDictionary visitorProperty);

    [Static]
    [Export("visitorPropertyWithVisitorProperty:")]
    void VisitorProperty(NSDictionary visitorProperty);

    [Static]
    [Export("resetIdentity")]
    void ResetIdentity();

    [Static]
    [Export("getIdentityWithCallback:")]
    void GetIdentity(Action<NSDictionary?, NSError?> callback);

    [Static]
    [Export("assignGroupWithType:name:properties:")]
    void AssignGroup([NullAllowed] string type, string name, NSDictionary properties);

    [Static]
    [Export("unassignGroupWithType:name:properties:")]
    void UnassignGroup([NullAllowed] string type, string name, NSDictionary properties);

    [Static]
    [Export("trackEventWithName:trackingEventProperties:")]
    void TrackEvent(string name, NSDictionary trackingEventProperties);

    [Static]
    [Export("trackScreenWithName:trackingEventProperties:")]
    void TrackScreen(string name, NSDictionary trackingEventProperties);

    [Static]
    [Export("startSurveyWithSurveyId:allowMultipleResponses:hiddenFields:ignoreSurveyStatus:hooks:language:distributionId:")]
    void StartSurvey(
        string surveyId,
        bool allowMultipleResponses,
        NSDictionary hiddenFields,
        bool ignoreSurveyStatus,
        [NullAllowed] NSDictionary hooks,
        [NullAllowed] string language,
        [NullAllowed] string distributionId);

    [Static]
    [Export("closeSurveyWithSurveyId:")]
    void CloseSurvey([NullAllowed] string surveyId);

    [Static]
    [Export("startMessageWithMessageId:allowMultipleResponses:hiddenFields:ignoreMessageStatus:hooks:language:distributionId:")]
    void StartMessage(
        string messageId,
        bool allowMultipleResponses,
        NSDictionary hiddenFields,
        bool ignoreMessageStatus,
        [NullAllowed] NSDictionary hooks,
        [NullAllowed] string language,
        [NullAllowed] string distributionId);

    [Static]
    [Export("closeMessageWithMessageId:")]
    void CloseMessage([NullAllowed] string messageId);

    [Static]
    [Export("sessionReplayStart")]
    void SessionReplayStart();

    [Static]
    [Export("sessionReplayStop")]
    void SessionReplayStop();

    [Static]
    [Export("debugWithCallback:")]
    void Debug(Action<string?, NSError?> callback);

    [Static]
    [Export("debugTargetingWithCallback:")]
    void DebugTargeting(Action<string?, NSError?> callback);
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

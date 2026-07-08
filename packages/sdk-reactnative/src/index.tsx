import {
  DeviceEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
  View,
  type ViewProps,
} from 'react-native';
import ScreebReactNative from './NativeScreebReactNative';

type ScreebEvent = {
  hookId?: string;
  nativeHookId?: string;
  payload?: unknown;
};
type ScreebEventEmitter = {
  addListener(
    eventType: 'ScreebEvent',
    listener: (event: ScreebEvent) => void
  ): { remove: () => void };
};

let emitter: ScreebEventEmitter | undefined;
let eventSubscription: { remove: () => void } | undefined;

type HookFn = (payload: string) => unknown | Promise<unknown>;
type HookMap = {
  version?: string;
  [key: string]: unknown;
};

type HookIdsMap = { [key: string]: string };
type InitOptions = {
  isDebugMode?: boolean;
  disableMirror?: boolean;
};
export type ScreebPrivacyViewProps = ViewProps;
export type ScreebIdProps = ViewProps & {
  id: string;
};

// initSdk
export function initSdk(
  channelId: string,
  userId?: string,
  properties?: Record<string, unknown> | Map<string, unknown>,
  hooks?: HookMap,
  initOptions?: InitOptions,
  language?: string
) {
  registerEventListener();
  hooksRegistry.clear();
  const mapHooksId = buildHooksMap(hooks);

  return ScreebReactNative.initSdk(
    channelId,
    userId,
    toObject(properties),
    mapHooksId,
    initOptions,
    language
  );
}

// setIdentity
export function setIdentity(
  userId: string,
  properties?: Record<string, unknown> | Map<string, unknown> | null
) {
  return ScreebReactNative.setIdentity(userId, toObject(properties));
}

// setProperties
export function setProperties(
  properties?: Record<string, unknown> | Map<string, unknown> | null
) {
  return ScreebReactNative.setProperties(toObject(properties));
}

// assignGroup
export function assignGroup(
  type: string | null,
  name: string,
  properties?: Record<string, unknown> | Map<string, unknown> | null
) {
  return ScreebReactNative.assignGroup(type, name, toObject(properties));
}

// unassignGroup
export function unassignGroup(
  type: string | null,
  name: string,
  properties?: Record<string, unknown> | Map<string, unknown> | null
) {
  return ScreebReactNative.unassignGroup(type, name, toObject(properties));
}

// trackEvent
export function trackEvent(
  name: string,
  properties?: Record<string, unknown> | Map<string, unknown> | null
) {
  return ScreebReactNative.trackEvent(name, toObject(properties));
}

// trackScreen
export function trackScreen(
  name: string,
  properties?: Record<string, unknown> | Map<string, unknown> | null
) {
  return ScreebReactNative.trackScreen(name, toObject(properties));
}

// startSurvey
export function startSurvey(
  surveyId: string,
  allowMultipleResponses?: boolean,
  hiddenFields?: Record<string, unknown> | Map<string, unknown> | null,
  ignoreSurveyStatus?: boolean,
  hooks?: HookMap,
  language?: string,
  distributionId?: string
) {
  const mapHooksId = buildHooksMap(hooks);
  return ScreebReactNative.startSurvey(
    surveyId,
    allowMultipleResponses ?? true,
    toObject(hiddenFields),
    ignoreSurveyStatus ?? true,
    mapHooksId,
    language,
    distributionId
  );
}

// startMessage
export function startMessage(
  messageId: string,
  allowMultipleResponses?: boolean,
  hiddenFields?: Record<string, unknown> | Map<string, unknown> | null,
  ignoreMessageStatus?: boolean,
  hooks?: HookMap,
  language?: string,
  distributionId?: string
) {
  const mapHooksId = buildHooksMap(hooks);
  return ScreebReactNative.startMessage(
    messageId,
    allowMultipleResponses ?? true,
    toObject(hiddenFields),
    ignoreMessageStatus ?? true,
    mapHooksId,
    language,
    distributionId
  );
}

// debug
export function debug() {
  return ScreebReactNative.debug();
}

// debugTargeting
export function debugTargeting() {
  return ScreebReactNative.debugTargeting();
}

// sessionReplayStart
export function sessionReplayStart() {
  return ScreebReactNative.sessionReplayStart();
}

// sessionReplayStop
export function sessionReplayStop() {
  return ScreebReactNative.sessionReplayStop();
}

// resetIdentity
export function resetIdentity() {
  return ScreebReactNative.resetIdentity();
}

// getIdentity
export function getIdentity() {
  return ScreebReactNative.getIdentity();
}

// handleDeepLink — forward a Screeb deep link (screeb-<channel-id> scheme) to
// the SDK: editor, survey and message links open in-app. Wire it to your
// linking events (e.g. expo-linking / RN Linking url listener).
export function handleDeepLink(url: string) {
  return ScreebReactNative.handleDeepLink(url);
}

// closeSdk
export function closeSdk() {
  eventSubscription?.remove();
  eventSubscription = undefined;
  emitter = undefined;
  hooksRegistry.clear();
  return ScreebReactNative.closeSdk();
}

// closeSurvey
export function closeSurvey(surveyId?: string) {
  return ScreebReactNative.closeSurvey(surveyId);
}

// closeMessage
export function closeMessage(messageId?: string) {
  return ScreebReactNative.closeMessage(messageId);
}

export function ScreebMaskText(props: ScreebPrivacyViewProps) {
  const marker = screebPlatformMarker({
    android: 'screeb-mask-text',
    ios: 'screebMaskText',
  });

  return (
    <View
      {...props}
      accessibilityLabel={marker}
      collapsable={false}
      nativeID={marker}
    />
  );
}

export function ScreebNoCapture(props: ScreebPrivacyViewProps) {
  const marker = screebPlatformMarker({
    android: 'screeb-no-capture',
    ios: 'screebNoCapture',
  });

  return (
    <View
      {...props}
      accessibilityLabel={marker}
      collapsable={false}
      nativeID={marker}
    />
  );
}

export function ScreebId({ id, ...props }: ScreebIdProps) {
  const marker = `screebId:${id}`;

  return (
    <View
      {...props}
      accessibilityLabel={marker}
      collapsable={false}
      nativeID={marker}
    />
  );
}

const hooksRegistry = new Map<
  string,
  (payload: string) => unknown | Promise<unknown>
>();

function screebPlatformMarker(markers: { android: string; ios: string }) {
  return Platform.OS === 'android' ? markers.android : markers.ios;
}

function registerEventListener() {
  eventSubscription?.remove();

  // Use NativeEventEmitter on both platforms; pass the native module on iOS
  // and rely on the default emitter on Android.
  if (Platform.OS === 'ios') {
    emitter = new NativeEventEmitter(
      NativeModules.ScreebReactNative
    ) as unknown as ScreebEventEmitter;
  } else {
    emitter = DeviceEventEmitter as unknown as ScreebEventEmitter;
  }

  eventSubscription = emitter?.addListener('ScreebEvent', handleEvent);
}

function buildHooksMap(hooks?: HookMap | null): HookIdsMap | undefined {
  if (hooks == null) {
    return undefined;
  }

  const mapHooksId: HookIdsMap = {};
  Object.keys(hooks).forEach((key) => {
    if (key === 'version') {
      const version = hooks.version ?? undefined;
      if (version) {
        mapHooksId.version = version;
      }
      return;
    }

    const uuid = Date.now().toString() + Math.random().toString() + key;
    const fn = (hooks as Record<string, unknown>)[key];
    if (typeof fn === 'function') {
      hooksRegistry.set(uuid, fn as HookFn);
    }
    mapHooksId[key] = uuid;
  });

  return mapHooksId;
}

function handleEvent(event: ScreebEvent) {
  if (event?.hookId != null) {
    const hook = hooksRegistry.get(event.hookId);
    if (hook != null) {
      const payload = event.payload
        ? typeof event.payload !== 'string'
          ? JSON.stringify(event.payload)
          : event.payload
        : '{}';
      let originalHookId = event.nativeHookId;
      if (!originalHookId) {
        try {
          const parsedPayload = JSON.parse(payload) as { hook_id?: string };
          originalHookId = parsedPayload?.hook_id;
        } catch (error) {
          console.error(error);
          return;
        }
      }
      if (originalHookId) {
        try {
          Promise.resolve(hook(payload))
            .then((hookResult) => {
              ScreebReactNative.onHookResult(originalHookId, {
                result: hookResult,
              });
            })
            .catch((error) => {
              console.error(error);
              ScreebReactNative.onHookResult(originalHookId, {
                result: false,
              });
            });
        } catch (error) {
          console.error(error);
          ScreebReactNative.onHookResult(originalHookId, {
            result: false,
          });
        }
      }
    }
  }
}

function toObject(
  value?: Record<string, unknown> | Map<string, unknown> | null
): { [key: string]: unknown } | undefined {
  if (value == null) return undefined;
  if (value instanceof Map) {
    return normalizeValue(
      Object.fromEntries(value as Map<string, unknown>)
    ) as {
      [key: string]: unknown;
    };
  }
  return normalizeValue(value) as { [key: string]: unknown };
}

function normalizeValue(value: unknown): unknown {
  if (value instanceof Date) {
    return formatDateValue(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeValue(item));
  }

  if (value instanceof Map) {
    return normalizeValue(Object.fromEntries(value as Map<string, unknown>));
  }

  if (value != null && typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>).reduce(
      (acc, [key, nestedValue]) => {
        acc[key] = normalizeValue(nestedValue);
        return acc;
      },
      {} as Record<string, unknown>
    );
  }

  return value;
}

// Format payloads so DateTime properties are correctly interpreted by the SDK
function formatDateValue(value: Date): string {
  const timezoneOffsetMinutes = -value.getTimezoneOffset();
  const sign = timezoneOffsetMinutes >= 0 ? '+' : '-';
  const absOffset = Math.abs(timezoneOffsetMinutes);
  const offsetHours = Math.floor(absOffset / 60)
    .toString()
    .padStart(2, '0');
  const offsetMinutes = (absOffset % 60).toString().padStart(2, '0');
  const pad = (n: number, l = 2) => n.toString().padStart(l, '0');
  const isoWithoutTimezone = `${value.getFullYear()}-${pad(
    value.getMonth() + 1
  )}-${pad(value.getDate())}T${pad(value.getHours())}:${pad(
    value.getMinutes()
  )}:${pad(value.getSeconds())}.${pad(value.getMilliseconds(), 3)}`;
  return `${isoWithoutTimezone}${sign}${offsetHours}:${offsetMinutes}`;
}

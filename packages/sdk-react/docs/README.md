@screeb/sdk-react

# @screeb/sdk-react

## Table of contents

### Type Aliases

- [CloseFunction](README.md#closefunction)
- [DebugFunction](README.md#debugfunction)
- [EventTrackFunction](README.md#eventtrackfunction)
- [IdentityFunction](README.md#identityfunction)
- [IdentityGetFunction](README.md#identitygetfunction)
- [IdentityGroupAssignFunction](README.md#identitygroupassignfunction)
- [IdentityGroupUnassignFunction](README.md#identitygroupunassignfunction)
- [IdentityPropertiesFunction](README.md#identitypropertiesfunction)
- [IdentityResetFunction](README.md#identityresetfunction)
- [InitFunction](README.md#initfunction)
- [LoadFunction](README.md#loadfunction)
- [MessageCloseFunction](README.md#messageclosefunction)
- [MessageStartFunction](README.md#messagestartfunction)
- [ScreebContextValues](README.md#screebcontextvalues)
- [ScreebProps](README.md#screebprops)
- [ScreebProviderProps](README.md#screebproviderprops)
- [SessionReplayStartFunction](README.md#sessionreplaystartfunction)
- [SessionReplayStopFunction](README.md#sessionreplaystopfunction)
- [SurveyCloseFunction](README.md#surveyclosefunction)
- [SurveyStartFunction](README.md#surveystartfunction)
- [TargetingDebugFunction](README.md#targetingdebugfunction)

### Functions

- [ScreebProvider](README.md#screebprovider)
- [useScreeb](README.md#usescreeb)

## Type Aliases

### CloseFunction

Ƭ **CloseFunction**: () => `Promise`\<`void`\>

Shutdowns current Screeb session.

**`Example`**

```ts
const { close } = useScreeb();

close();
```

#### Type declaration

▸ (): `Promise`\<`void`\>

##### Returns

`Promise`\<`void`\>

___

### DebugFunction

Ƭ **DebugFunction**: () => `Promise`\<`unknown`\>

Prints the actual state information of Screeb tag.

**`Example`**

```ts
const { debug } = useScreeb();

debug();
// ******************* SCREEB SESSION DEBUG *********************
// Screeb channel id: <UUID>
// Screeb channel type: widget
// Screeb respondent id: <UUID>
// Screeb survey id: none
// Screeb response id: none
//
// Screeb current session start: Thu May 04 2023 16:53:49 GMT+0200 (Central European Summer Time)
// Screeb current session last activity: Thu May 04 2023 17:41:30 GMT+0200 (Central European Summer Time)
//
// Screeb targeting engine status: disabled
// Screeb targeting engine: 3 surveys
//
// Detected platform: desktop
// Detected locale: en-GB
// Detected timezone: -120
// **************************************************************
```

#### Type declaration

▸ (): `Promise`\<`unknown`\>

##### Returns

`Promise`\<`unknown`\>

___

### EventTrackFunction

Ƭ **EventTrackFunction**: (`eventName`: `string`, `eventProperties?`: `PropertyRecord`) => `Promise`\<`unknown`\>

Tracks a user event.

**`Example`**

```ts
const { eventTrack } = useScreeb();

eventTrack(
  "Product added to cart",
  {
    product_name: 'Red bike 2021',
    category: 'sport',
    color: 'red',
    price: 299,
    count: 1,
    reference: '2CF093TG1',
    delivery_method: 'UPS',
    user_logged: false,
    added_at: new Date(),
  }
);
```

#### Type declaration

▸ (`eventName`, `eventProperties?`): `Promise`\<`unknown`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The event name. |
| `eventProperties?` | `PropertyRecord` | The properties of your event. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date. ``` |

##### Returns

`Promise`\<`unknown`\>

___

### IdentityFunction

Ƭ **IdentityFunction**: (`userId`: `string`, `userProperties?`: `PropertyRecord`) => `Promise`\<`unknown`\>

Change the current user identity.
Warning: Running surveys will be closed.

**`Example`**

```ts
const { identity } = useScreeb();

identity(
  "<your-user-id>",
  {
    firstname: '<user-firstname>',
    lastname: '<user-lastname>',
    plan: '<user-plan>',
    last_seen_at: new Date(),
    authenticated: true
  }
);
```

#### Type declaration

▸ (`userId`, `userProperties?`): `Promise`\<`unknown`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `string` | The unique identifier of your user. |
| `userProperties?` | `PropertyRecord` | The properties of your user. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date. ``` |

##### Returns

`Promise`\<`unknown`\>

___

### IdentityGetFunction

Ƭ **IdentityGetFunction**: () => `Promise`\<`ScreebIdentityGetReturn`\>

Retrieves the current user identity.

**`Example`**

```ts
const { identityGet } = useScreeb();

console.log(await identityGet());
// {
//   anonymous_id: "<UUID>",
//   user_id: "<UUID>",
//   session_id: "<UUID>",
//   session_start: "2023-05-04T16:30:15.882Z",
//   session_end: "2023-05-04T17:02:09.087Z",
//   channel_id: "<UUID>",
//   is_ready: true,
// }
```

#### Type declaration

▸ (): `Promise`\<`ScreebIdentityGetReturn`\>

##### Returns

`Promise`\<`ScreebIdentityGetReturn`\>

___

### IdentityGroupAssignFunction

Ƭ **IdentityGroupAssignFunction**: (`groupName`: `string`, `groupType?`: `string`, `groupProperties?`: `PropertyRecord`) => `Promise`\<`unknown`\>

Assigns the current user to a group.

**`Example`**

```ts
const { identityGroupAssign } = useScreeb();

identityGroupAssign(
  'company',
  'Apple',
  {
    address_line_1: 'Apple Campus',
    address_line_2: '1 Infinite Loop',
    city: 'Cupertino',
    zipcode: 95014,
    state: 'California',
    country: 'United states',
  }
);
```

#### Type declaration

▸ (`groupName`, `groupType?`, `groupProperties?`): `Promise`\<`unknown`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `groupName` | `string` |  |
| `groupType?` | `string` |  |
| `groupProperties?` | `PropertyRecord` | The properties of your user group. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date. ``` |

##### Returns

`Promise`\<`unknown`\>

___

### IdentityGroupUnassignFunction

Ƭ **IdentityGroupUnassignFunction**: (`groupName`: `string`, `groupType?`: `string`) => `Promise`\<`unknown`\>

Unassigns the current user to a group.

**`Example`**

```ts
const { identityGroupUnassign } = useScreeb();

identityGroupUnassign('company', 'Apple');
```

#### Type declaration

▸ (`groupName`, `groupType?`): `Promise`\<`unknown`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `groupName` | `string` | The name of your user group. |
| `groupType?` | `string` | The type of your user group. |

##### Returns

`Promise`\<`unknown`\>

___

### IdentityPropertiesFunction

Ƭ **IdentityPropertiesFunction**: (`userProperties`: `PropertyRecord`) => `Promise`\<`unknown`\>

Adds properties to the current user identity.

**`Example`**

```ts
const { identityProperties } = useScreeb();

// Set user properties
identityProperties(
  {
    firstname: '<user-firstname>',
    lastname: '<user-lastname>',
    plan: '<user-plan>',
    last_seen_at: new Date(),
    authenticated: true
  }
);

// Delete user property : set values to null
identityProperties(
  {
    age: null,
    company: null,
    logged: true,
  }
);
```

#### Type declaration

▸ (`userProperties`): `Promise`\<`unknown`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userProperties` | `PropertyRecord` | The properties of your user. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date. ``` |

##### Returns

`Promise`\<`unknown`\>

___

### IdentityResetFunction

Ƭ **IdentityResetFunction**: () => `Promise`\<`unknown`\>

Resets the current user identity.
Warning: This command must be called only once, since it creates a new identity on Screeb side.

**`Example`**

```ts
const { identityReset } = useScreeb();

identityReset();
```

#### Type declaration

▸ (): `Promise`\<`unknown`\>

##### Returns

`Promise`\<`unknown`\>

___

### InitFunction

Ƭ **InitFunction**: (`websiteId`: `string`, `userId?`: `string`, `userProperties?`: `PropertyRecord`, `hooks?`: `HooksInit`, `language?`: `string`, `spaNavigationHandler?`: `SpaNavigationHandler`) => `Promise`\<`void`\>

Initializes Screeb tag.

**`Example`**

```ts
const { init } = useScreeb();

init(
  "<your-website-id>",
  "<your-user-id>",
  {
    firstname: '<user-firstname>',
    lastname: '<user-lastname>',
    plan: '<user-plan>',
    last_seen_at: new Date(),
    authenticated: true
  },
  "en"
);
```

#### Type declaration

▸ (`websiteId`, `userId?`, `userProperties?`, `hooks?`, `language?`, `spaNavigationHandler?`): `Promise`\<`void`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `websiteId` | `string` | Your website/channel id. |
| `userId?` | `string` | The unique identifier of your user. |
| `userProperties?` | `PropertyRecord` | The properties of your user. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date ``` |
| `hooks?` | `HooksInit` | - |
| `language?` | `string` | Force a specific language for the tag. eg: 'en'. default: browser language. |
| `spaNavigationHandler?` | `SpaNavigationHandler` | - |

##### Returns

`Promise`\<`void`\>

___

### LoadFunction

Ƭ **LoadFunction**: (`options?`: `ScreebOptions`) => `Promise`\<`void`\>

Appends Screeb tag into your dom.

**`Example`**

```ts
const { load } = useScreeb();

load();
```

#### Type declaration

▸ (`options?`): `Promise`\<`void`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `ScreebOptions` | Screeb module options. |

##### Returns

`Promise`\<`void`\>

___

### MessageCloseFunction

Ƭ **MessageCloseFunction**: () => `Promise`\<`unknown`\>

Interrupts a running message.

**`Example`**

```ts
const { messageClose } = useScreeb();

messageClose();
```

#### Type declaration

▸ (): `Promise`\<`unknown`\>

##### Returns

`Promise`\<`unknown`\>

___

### MessageStartFunction

Ƭ **MessageStartFunction**: (`messageId`: `string`, `allowMultipleResponses?`: `boolean`, `hiddenFields?`: `PropertyRecord`, `hooks?`: `HooksMessageStart`, `language?`: `string`) => `Promise`\<`unknown`\>

Starts a message by its ID.

**`Example`**

```ts
const { messageStart } = useScreeb();

messageStart(
  '<UUID>',
  false,
  {
    color: "green",
    article_id: 42
  }
);
```

#### Type declaration

▸ (`messageId`, `allowMultipleResponses?`, `hiddenFields?`, `hooks?`, `language?`): `Promise`\<`unknown`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `messageId` | `string` |
| `allowMultipleResponses?` | `boolean` |
| `hiddenFields?` | `PropertyRecord` |
| `hooks?` | `HooksMessageStart` |
| `language?` | `string` |

##### Returns

`Promise`\<`unknown`\>

___

### ScreebContextValues

Ƭ **ScreebContextValues**: `Object`

Screeb context API

#### Type declaration

| Name | Type |
| :------ | :------ |
| `close` | [`CloseFunction`](README.md#closefunction) |
| `debug` | [`DebugFunction`](README.md#debugfunction) |
| `eventTrack` | [`EventTrackFunction`](README.md#eventtrackfunction) |
| `identity` | [`IdentityFunction`](README.md#identityfunction) |
| `identityGet` | [`IdentityGetFunction`](README.md#identitygetfunction) |
| `identityGroupAssign` | [`IdentityGroupAssignFunction`](README.md#identitygroupassignfunction) |
| `identityGroupUnassign` | [`IdentityGroupUnassignFunction`](README.md#identitygroupunassignfunction) |
| `identityProperties` | [`IdentityPropertiesFunction`](README.md#identitypropertiesfunction) |
| `identityReset` | [`IdentityResetFunction`](README.md#identityresetfunction) |
| `init` | [`InitFunction`](README.md#initfunction) |
| `load` | [`LoadFunction`](README.md#loadfunction) |
| `messageClose` | [`MessageCloseFunction`](README.md#messageclosefunction) |
| `messageStart` | [`MessageStartFunction`](README.md#messagestartfunction) |
| `sessionReplayStart` | [`SessionReplayStartFunction`](README.md#sessionreplaystartfunction) |
| `sessionReplayStop` | [`SessionReplayStopFunction`](README.md#sessionreplaystopfunction) |
| `surveyClose` | [`SurveyCloseFunction`](README.md#surveyclosefunction) |
| `surveyStart` | [`SurveyStartFunction`](README.md#surveystartfunction) |
| `targetingDebug` | [`TargetingDebugFunction`](README.md#targetingdebugfunction) |

___

### ScreebProps

Ƭ **ScreebProps**: `Object`

Properties of Screeb provider

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `hooks?` | `HooksInit` | Hooks to define callback for various event |
| `language?` | `string` | The language you want to force |
| `spaNavigationHandler?` | `SpaNavigationHandler` | Optional handler for the `in-page-spa` "Navigate to URL" target (custom SPA routers). |
| `userId?` | `string` | The unique identifier of your user. |
| `userProperties?` | `PropertyRecord` | The properties of your user. |
| `websiteId` | `string` | Your website/channel id. |

___

### ScreebProviderProps

Ƭ **ScreebProviderProps**: \{ `autoInit?`: `boolean` ; `options?`: `ScreebOptions` ; `shouldLoad?`: `boolean`  } & `Partial`\<[`ScreebProps`](README.md#screebprops)\>

Properties of Screeb provider

___

### SessionReplayStartFunction

Ƭ **SessionReplayStartFunction**: () => `Promise`\<`unknown`\>

Starts a session replay.

**`Example`**

```ts
const { sessionReplayStart } = useScreeb();

sessionReplayStart();
```

#### Type declaration

▸ (): `Promise`\<`unknown`\>

##### Returns

`Promise`\<`unknown`\>

___

### SessionReplayStopFunction

Ƭ **SessionReplayStopFunction**: () => `Promise`\<`unknown`\>

Interrupts a running session replay.

**`Example`**

```ts
const { sessionReplayStop } = useScreeb();

sessionReplayStop();
```

#### Type declaration

▸ (): `Promise`\<`unknown`\>

##### Returns

`Promise`\<`unknown`\>

___

### SurveyCloseFunction

Ƭ **SurveyCloseFunction**: () => `Promise`\<`unknown`\>

Interrupts a running survey.

**`Example`**

```ts
const { surveyClose } = useScreeb();

surveyClose();
```

#### Type declaration

▸ (): `Promise`\<`unknown`\>

##### Returns

`Promise`\<`unknown`\>

___

### SurveyStartFunction

Ƭ **SurveyStartFunction**: (`surveyId`: `string`, `distributionId?`: `string`, `allowMultipleResponses?`: `boolean`, `hiddenFields?`: `PropertyRecord`, `hooks?`: `HooksSurveyStart`, `language?`: `string`, `selectors?`: `string` \| `string`[]) => `Promise`\<`unknown`\>

Starts a survey by its ID.

**`Example`**

```ts
const { surveyStart } = useScreeb();

surveyStart(
  '<UUID>',
  '<UUID>',
  false,
  { // optional
    color: "green",
    article_id: 42
  },
  { // optional
    version: "1.0.0",
    onSurveyShowed: (payload) => console.log("Survey showed", payload),
  },
  "en", // optional
  "#screeb-survey-container" // optional
);
```

#### Type declaration

▸ (`surveyId`, `distributionId?`, `allowMultipleResponses?`, `hiddenFields?`, `hooks?`, `language?`, `selectors?`): `Promise`\<`unknown`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `surveyId` | `string` |
| `distributionId?` | `string` |
| `allowMultipleResponses?` | `boolean` |
| `hiddenFields?` | `PropertyRecord` |
| `hooks?` | `HooksSurveyStart` |
| `language?` | `string` |
| `selectors?` | `string` \| `string`[] |

##### Returns

`Promise`\<`unknown`\>

___

### TargetingDebugFunction

Ƭ **TargetingDebugFunction**: () => `Promise`\<`unknown`\>

Prints the current state of the targeting engine.

**`Example`**

```ts
const { targetingDebug } = useScreeb();

console.log(await targetingDebug());
// targeting ************ SCREEB TARGETING RULES DEBUG **************
// Disabled surveys are not listed here.
//
// Screeb channel id: <UUID>
// Screeb respondent id: <UUID>
//
// Survey <UUID>:
// https://admin.screeb.app/org/last/survey/<UUID>/share
//
//   - Rule of type "Device type (desktop/mobile/tablet)": true 🟢
//   - Rule of type "Multiple display": true 🟢
//   - Rule of type "Capping per time between survey display on current respondent": true 🟢
//   - Rule of type "User event count": false 🔴
//   - Rule of type "Capping per respondent display count": false 🔴
```

#### Type declaration

▸ (): `Promise`\<`unknown`\>

##### Returns

`Promise`\<`unknown`\>

## Functions

### ScreebProvider

▸ **ScreebProvider**(`props`, `deprecatedLegacyContext?`): `ReactNode`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `PropsWithChildren`\<[`ScreebProviderProps`](README.md#screebproviderprops)\> | - |
| `deprecatedLegacyContext?` | `any` | **`Deprecated`** **`See`** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

#### Returns

`ReactNode`

___

### useScreeb

▸ **useScreeb**(): [`ScreebContextValues`](README.md#screebcontextvalues)

#### Returns

[`ScreebContextValues`](README.md#screebcontextvalues)

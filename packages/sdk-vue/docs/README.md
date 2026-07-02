@screeb/sdk-vue

# @screeb/sdk-vue

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
- [ScreebConfig](README.md#screebconfig)
- [ScreebContextValues](README.md#screebcontextvalues)
- [SessionReplayStartFunction](README.md#sessionreplaystartfunction)
- [SessionReplayStopFunction](README.md#sessionreplaystopfunction)
- [SurveyCloseFunction](README.md#surveyclosefunction)
- [SurveyStartFunction](README.md#surveystartfunction)
- [TargetingDebugFunction](README.md#targetingdebugfunction)

### Variables

- [SCREEB\_PLUGIN\_KEY](README.md#screeb_plugin_key)
- [ScreebPlugin](README.md#screebplugin)

### Functions

- [useScreeb](README.md#usescreeb)

## Type Aliases

### CloseFunction

Ƭ **CloseFunction**: () => `Promise`\<`void`\>

#### Type declaration

▸ (): `Promise`\<`void`\>

##### Returns

`Promise`\<`void`\>

___

### DebugFunction

Ƭ **DebugFunction**: () => `Promise`\<`unknown`\>

#### Type declaration

▸ (): `Promise`\<`unknown`\>

##### Returns

`Promise`\<`unknown`\>

___

### EventTrackFunction

Ƭ **EventTrackFunction**: (`eventName`: `string`, `eventProperties?`: `PropertyRecord`) => `Promise`\<`unknown`\>

#### Type declaration

▸ (`eventName`, `eventProperties?`): `Promise`\<`unknown`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `eventProperties?` | `PropertyRecord` |

##### Returns

`Promise`\<`unknown`\>

___

### IdentityFunction

Ƭ **IdentityFunction**: (`userId`: `string`, `userProperties?`: `PropertyRecord`) => `Promise`\<`unknown`\>

#### Type declaration

▸ (`userId`, `userProperties?`): `Promise`\<`unknown`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |
| `userProperties?` | `PropertyRecord` |

##### Returns

`Promise`\<`unknown`\>

___

### IdentityGetFunction

Ƭ **IdentityGetFunction**: () => `Promise`\<`ScreebIdentityGetReturn`\>

#### Type declaration

▸ (): `Promise`\<`ScreebIdentityGetReturn`\>

##### Returns

`Promise`\<`ScreebIdentityGetReturn`\>

___

### IdentityGroupAssignFunction

Ƭ **IdentityGroupAssignFunction**: (`groupName`: `string`, `groupType?`: `string`, `groupProperties?`: `PropertyRecord`) => `Promise`\<`unknown`\>

#### Type declaration

▸ (`groupName`, `groupType?`, `groupProperties?`): `Promise`\<`unknown`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `groupName` | `string` |
| `groupType?` | `string` |
| `groupProperties?` | `PropertyRecord` |

##### Returns

`Promise`\<`unknown`\>

___

### IdentityGroupUnassignFunction

Ƭ **IdentityGroupUnassignFunction**: (`groupName`: `string`, `groupType?`: `string`) => `Promise`\<`unknown`\>

#### Type declaration

▸ (`groupName`, `groupType?`): `Promise`\<`unknown`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `groupName` | `string` |
| `groupType?` | `string` |

##### Returns

`Promise`\<`unknown`\>

___

### IdentityPropertiesFunction

Ƭ **IdentityPropertiesFunction**: (`userProperties`: `PropertyRecord`) => `Promise`\<`unknown`\>

#### Type declaration

▸ (`userProperties`): `Promise`\<`unknown`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `userProperties` | `PropertyRecord` |

##### Returns

`Promise`\<`unknown`\>

___

### IdentityResetFunction

Ƭ **IdentityResetFunction**: () => `Promise`\<`unknown`\>

#### Type declaration

▸ (): `Promise`\<`unknown`\>

##### Returns

`Promise`\<`unknown`\>

___

### InitFunction

Ƭ **InitFunction**: (`websiteId`: `string`, `userId?`: `string`, `userProperties?`: `PropertyRecord`, `hooks?`: `HooksInit`, `language?`: `string`, `spaNavigationHandler?`: `SpaNavigationHandler`) => `Promise`\<`void`\>

#### Type declaration

▸ (`websiteId`, `userId?`, `userProperties?`, `hooks?`, `language?`, `spaNavigationHandler?`): `Promise`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `websiteId` | `string` |
| `userId?` | `string` |
| `userProperties?` | `PropertyRecord` |
| `hooks?` | `HooksInit` |
| `language?` | `string` |
| `spaNavigationHandler?` | `SpaNavigationHandler` |

##### Returns

`Promise`\<`void`\>

___

### LoadFunction

Ƭ **LoadFunction**: (`options?`: `ScreebOptions`) => `Promise`\<`void`\>

#### Type declaration

▸ (`options?`): `Promise`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `ScreebOptions` |

##### Returns

`Promise`\<`void`\>

___

### MessageCloseFunction

Ƭ **MessageCloseFunction**: () => `Promise`\<`unknown`\>

#### Type declaration

▸ (): `Promise`\<`unknown`\>

##### Returns

`Promise`\<`unknown`\>

___

### MessageStartFunction

Ƭ **MessageStartFunction**: (`messageId`: `string`, `allowMultipleResponses?`: `boolean`, `hiddenFields?`: `PropertyRecord`, `hooks?`: `HooksMessageStart`, `language?`: `string`) => `Promise`\<`unknown`\>

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

### ScreebConfig

Ƭ **ScreebConfig**: `Object`

Configuration for the ScreebPlugin

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `autoInit?` | `boolean` | Indicates if Screeb should be automatically initialized. When true, `init` is called automatically with `websiteId` and `userId`. **`Default`** ```ts false ``` |
| `hooks?` | `HooksInit` | Hooks to define callback for various Screeb events |
| `language?` | `string` | Force a specific language (e.g. 'en'). Default: browser language. |
| `options?` | `ScreebOptions` | Screeb tag initialization options — handle with care. |
| `shouldLoad?` | `boolean` | Indicates if Screeb should be automatically loaded. Set to false to prevent the SDK from loading (e.g. in CI). **`Default`** ```ts true ``` |
| `spaNavigationHandler?` | `SpaNavigationHandler` | Optional handler for the `in-page-spa` "Navigate to URL" target (custom SPA routers). |
| `userId?` | `string` | The unique identifier of your user. |
| `userProperties?` | `PropertyRecord` | The properties of your user. |
| `websiteId` | `string` | Your website/channel id. |

___

### ScreebContextValues

Ƭ **ScreebContextValues**: `Object`

All Screeb methods provided via `useScreeb()`

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

### SessionReplayStartFunction

Ƭ **SessionReplayStartFunction**: () => `Promise`\<`unknown`\>

#### Type declaration

▸ (): `Promise`\<`unknown`\>

##### Returns

`Promise`\<`unknown`\>

___

### SessionReplayStopFunction

Ƭ **SessionReplayStopFunction**: () => `Promise`\<`unknown`\>

#### Type declaration

▸ (): `Promise`\<`unknown`\>

##### Returns

`Promise`\<`unknown`\>

___

### SurveyCloseFunction

Ƭ **SurveyCloseFunction**: () => `Promise`\<`unknown`\>

#### Type declaration

▸ (): `Promise`\<`unknown`\>

##### Returns

`Promise`\<`unknown`\>

___

### SurveyStartFunction

Ƭ **SurveyStartFunction**: (`surveyId`: `string`, `distributionId?`: `string`, `allowMultipleResponses?`: `boolean`, `hiddenFields?`: `PropertyRecord`, `hooks?`: `HooksSurveyStart`, `language?`: `string`, `selectors?`: `string` \| `string`[]) => `Promise`\<`unknown`\>

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

#### Type declaration

▸ (): `Promise`\<`unknown`\>

##### Returns

`Promise`\<`unknown`\>

## Variables

### SCREEB\_PLUGIN\_KEY

• `Const` **SCREEB\_PLUGIN\_KEY**: `InjectionKey`\<[`ScreebContextValues`](README.md#screebcontextvalues)\>

___

### ScreebPlugin

• `Const` **ScreebPlugin**: `Plugin`

## Functions

### useScreeb

▸ **useScreeb**(): [`ScreebContextValues`](README.md#screebcontextvalues)

#### Returns

[`ScreebContextValues`](README.md#screebcontextvalues)

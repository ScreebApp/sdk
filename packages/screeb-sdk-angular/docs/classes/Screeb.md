[@screeb/sdk-angular](../README.md) / Screeb

# Class: Screeb

## Table of contents

### Constructors

- [constructor](Screeb.md#constructor)

### Properties

- [config](Screeb.md#config)
- [isInitialized](Screeb.md#isinitialized)

### Methods

- [close](Screeb.md#close)
- [debug](Screeb.md#debug)
- [ensureScreeb](Screeb.md#ensurescreeb)
- [eventTrack](Screeb.md#eventtrack)
- [identity](Screeb.md#identity)
- [identityGet](Screeb.md#identityget)
- [identityGroupAssign](Screeb.md#identitygroupassign)
- [identityGroupUnassign](Screeb.md#identitygroupunassign)
- [identityProperties](Screeb.md#identityproperties)
- [identityReset](Screeb.md#identityreset)
- [init](Screeb.md#init)
- [load](Screeb.md#load)
- [surveyClose](Screeb.md#surveyclose)
- [surveyStart](Screeb.md#surveystart)
- [targetingCheck](Screeb.md#targetingcheck)
- [targetingDebug](Screeb.md#targetingdebug)

## Constructors

### constructor

• **new Screeb**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ScreebConfig`](ScreebConfig.md) |

## Properties

### config

• `Private` **config**: [`ScreebConfig`](ScreebConfig.md)

___

### isInitialized

• `Private` **isInitialized**: `boolean` = `false`

## Methods

### close

▸ **close**(): `Promise`<`unknown`\>

Shutdowns current Screeb session.

#### Returns

`Promise`<`unknown`\>

**`Example`**

```ts
this.screeb.close();
```

___

### debug

▸ **debug**(): `Promise`<`unknown`\>

Prints the actual state information of Screeb tag.

#### Returns

`Promise`<`unknown`\>

**`Example`**

```ts
this.screeb.debug();
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

___

### ensureScreeb

▸ `Private` **ensureScreeb**(`functionName`, `onlyLoaded?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `functionName` | `string` | `undefined` |
| `onlyLoaded` | `boolean` | `false` |

#### Returns

`Promise`<`void`\>

___

### eventTrack

▸ **eventTrack**(`eventName`, `eventProperties?`): `Promise`<`unknown`\>

Tracks a user event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The event name. |
| `eventProperties?` | `PropertyRecord` | The properties of your event. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date. ``` |

#### Returns

`Promise`<`unknown`\>

**`Example`**

```ts
this.screeb.eventTrack(
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

___

### identity

▸ **identity**(`userId`, `userProperties?`): `Promise`<`unknown`\>

Change the current user identity.
Warning: Running surveys will be closed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `string` | The unique identifier of your user. |
| `userProperties?` | `PropertyRecord` | The properties of your user. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date. ``` |

#### Returns

`Promise`<`unknown`\>

**`Example`**

```ts
this.screeb.identity(
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

___

### identityGet

▸ **identityGet**(): `Promise`<`ScreebIdentityGetReturn`\>

Retrieves the current user identity.

#### Returns

`Promise`<`ScreebIdentityGetReturn`\>

**`Example`**

```ts
console.log(await this.screeb.identityGet());
// {
//   channel_id: "<UUID>",
//   anonymous_id: "<UUID>",
//   user_id: "<UUID>",
//   is_ready: true,
//   session_id: "<UUID>",
//   session_start: "2023-05-04T16:30:15.882Z",
//   session_end: "2023-05-04T17:02:09.087Z",
// }
```

___

### identityGroupAssign

▸ **identityGroupAssign**(`groupName`, `groupType?`, `groupProperties?`): `Promise`<`unknown`\>

Assigns the current user to a group.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `groupName` | `string` |  |
| `groupType?` | `string` |  |
| `groupProperties?` | `PropertyRecord` | The properties of your user group. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date. ``` |

#### Returns

`Promise`<`unknown`\>

**`Example`**

```ts
this.screeb.identityGroupAssign(
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

___

### identityGroupUnassign

▸ **identityGroupUnassign**(`groupName`, `groupType?`): `Promise`<`unknown`\>

Unassigns the current user to a group.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `groupName` | `string` | The name of your user group. |
| `groupType?` | `string` | The type of your user group. |

#### Returns

`Promise`<`unknown`\>

**`Example`**

```ts
this.screeb.identityGroupUnassign('company', 'Apple');
```

___

### identityProperties

▸ **identityProperties**(`userProperties`): `Promise`<`unknown`\>

Adds properties to the current user identity.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userProperties` | `PropertyRecord` | The properties of your user. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date. ``` |

#### Returns

`Promise`<`unknown`\>

**`Example`**

```ts
// Set user properties
this.screeb.identityProperties(
  {
    firstname: '<user-firstname>',
    lastname: '<user-lastname>',
    plan: '<user-plan>',
    last_seen_at: new Date(),
    authenticated: true
  }
);

// Delete user property : set values to null
this.screeb.identityProperties(
  {
    age: null,
    company: null,
    logged: true,
  }
);
```

___

### identityReset

▸ **identityReset**(): `Promise`<`unknown`\>

Resets the current user identity.
Warning: This command must be called only once, since it creates a new identity on Screeb side.

#### Returns

`Promise`<`unknown`\>

**`Example`**

```ts
this.screeb.identityReset();
```

___

### init

▸ **init**(`websiteId`, `userId?`, `userProperties?`, `hooks?`): `Promise`<`unknown`\>

Initializes Screeb tag.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `websiteId` | `string` | Your website/channel id. |
| `userId?` | `string` | The unique identifier of your user. |
| `userProperties?` | `PropertyRecord` | The properties of your user. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date ``` |
| `hooks?` | `Hooks` | - |

#### Returns

`Promise`<`unknown`\>

**`Example`**

```ts
this.screeb.init(
  "<your-website-id>",
  "<your-user-id>",
  {
    firstname: '<user-firstname>',
    lastname: '<user-lastname>',
    plan: '<user-plan>',
    last_seen_at: new Date(),
    authenticated: true
  },
  {
    version: "1.0.0",
    onReady: (payload) => console.log("Screeb SDK is ready!", payload),
  },
);
```

___

### load

▸ **load**(): `Promise`<`undefined`\>

Appends Screeb tag into your dom.

#### Returns

`Promise`<`undefined`\>

**`Example`**

```ts
this.screeb.load();
```

___

### surveyClose

▸ **surveyClose**(): `Promise`<`unknown`\>

Interrupts a running survey.

#### Returns

`Promise`<`unknown`\>

**`Example`**

```ts
this.screeb.surveyClose();
```

___

### surveyStart

▸ **surveyStart**(`surveyId`, `allowMultipleResponses`, `hiddenFields`, `hooks?`): `Promise`<`unknown`\>

Starts a survey by its ID.

#### Parameters

| Name | Type |
| :------ | :------ |
| `surveyId` | `string` |
| `allowMultipleResponses` | `boolean` |
| `hiddenFields` | `PropertyRecord` |
| `hooks?` | `Hooks` |

#### Returns

`Promise`<`unknown`\>

**`Example`**

```ts
this.screeb.surveyStart(
  '<UUID>',
  false,
  {
    color: "green",
    article_id: 42
  },
  {
    version: "1.0.0",
    onSurveyShowed: (payload) => console.log("Survey showed", payload),
  },
);
```

___

### targetingCheck

▸ **targetingCheck**(): `Promise`<`unknown`\>

Forces a targeting check.

#### Returns

`Promise`<`unknown`\>

**`Example`**

```ts
this.screeb.targetingCheck();
```

___

### targetingDebug

▸ **targetingDebug**(): `Promise`<`unknown`\>

Prints the current state of the targeting engine.

#### Returns

`Promise`<`unknown`\>

**`Example`**

```ts
console.log(await this.screeb.targetingDebug());
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

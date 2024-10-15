@screeb/sdk-browser

# @screeb/sdk-browser

## Table of contents

### Type Aliases

- [Channel](README.md#channel)
- [ChannelType](README.md#channeltype)
- [HookCommonProperties](README.md#hookcommonproperties)
- [HookCommonPropertiesMessage](README.md#hookcommonpropertiesmessage)
- [HookCommonPropertiesSurvey](README.md#hookcommonpropertiessurvey)
- [HookOnMessageCompleted](README.md#hookonmessagecompleted)
- [HookOnMessageDisplayAllowed](README.md#hookonmessagedisplayallowed)
- [HookOnMessageHidden](README.md#hookonmessagehidden)
- [HookOnMessageShowed](README.md#hookonmessageshowed)
- [HookOnMessageStarted](README.md#hookonmessagestarted)
- [HookOnQuestionReplied](README.md#hookonquestionreplied)
- [HookOnReady](README.md#hookonready)
- [HookOnSurveyCompleted](README.md#hookonsurveycompleted)
- [HookOnSurveyDisplayAllowed](README.md#hookonsurveydisplayallowed)
- [HookOnSurveyHidden](README.md#hookonsurveyhidden)
- [HookOnSurveyShowed](README.md#hookonsurveyshowed)
- [HookOnSurveyStarted](README.md#hookonsurveystarted)
- [HooksInit](README.md#hooksinit)
- [HooksMessageStart](README.md#hooksmessagestart)
- [HooksSurveyStart](README.md#hookssurveystart)
- [Message](README.md#message)
- [PropertyRecord](README.md#propertyrecord)
- [PropertyType](README.md#propertytype)
- [ResponseItem](README.md#responseitem)
- [ResponseItemAnswer](README.md#responseitemanswer)
- [ResponseItemQuestion](README.md#responseitemquestion)
- [ResponseStatus](README.md#responsestatus)
- [ScreebFunction](README.md#screebfunction)
- [ScreebIdentityGetReturn](README.md#screebidentitygetreturn)
- [ScreebObject](README.md#screebobject)
- [ScreebOptions](README.md#screeboptions)
- [Survey](README.md#survey)
- [SurveyFormat](README.md#surveyformat)
- [SurveyPosition](README.md#surveyposition)
- [SurveySize](README.md#surveysize)
- [User](README.md#user)

### Functions

- [close](README.md#close)
- [debug](README.md#debug)
- [eventTrack](README.md#eventtrack)
- [identity](README.md#identity)
- [identityGet](README.md#identityget)
- [identityGroupAssign](README.md#identitygroupassign)
- [identityGroupUnassign](README.md#identitygroupunassign)
- [identityProperties](README.md#identityproperties)
- [identityReset](README.md#identityreset)
- [init](README.md#init)
- [isLoaded](README.md#isloaded)
- [load](README.md#load)
- [messageClose](README.md#messageclose)
- [messageStart](README.md#messagestart)
- [surveyClose](README.md#surveyclose)
- [surveyStart](README.md#surveystart)
- [targetingCheck](README.md#targetingcheck)
- [targetingDebug](README.md#targetingdebug)

## Type Aliases

### Channel

Ƭ **Channel**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `type` | [`ChannelType`](README.md#channeltype) |

___

### ChannelType

Ƭ **ChannelType**: ``"widget"`` \| ``"ios"`` \| ``"android"``

___

### HookCommonProperties

Ƭ **HookCommonProperties**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `channel` | [`Channel`](README.md#channel) |
| `user` | [`User`](README.md#user) |

___

### HookCommonPropertiesMessage

Ƭ **HookCommonPropertiesMessage**: [`HookCommonProperties`](README.md#hookcommonproperties) & \{ `message`: [`Message`](README.md#message)  }

___

### HookCommonPropertiesSurvey

Ƭ **HookCommonPropertiesSurvey**: [`HookCommonProperties`](README.md#hookcommonproperties) & \{ `survey`: [`Survey`](README.md#survey)  }

___

### HookOnMessageCompleted

Ƭ **HookOnMessageCompleted**: (`data`: [`HookCommonPropertiesMessage`](README.md#hookcommonpropertiesmessage) & \{ `response`: \{ `id`: `string` ; `items`: [`ResponseItem`](README.md#responseitem)[]  }  }) => `void`

#### Type declaration

▸ (`data`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`HookCommonPropertiesMessage`](README.md#hookcommonpropertiesmessage) & \{ `response`: \{ `id`: `string` ; `items`: [`ResponseItem`](README.md#responseitem)[]  }  } |

##### Returns

`void`

___

### HookOnMessageDisplayAllowed

Ƭ **HookOnMessageDisplayAllowed**: (`data`: [`HookCommonPropertiesSurvey`](README.md#hookcommonpropertiessurvey)) => `boolean`

#### Type declaration

▸ (`data`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`HookCommonPropertiesSurvey`](README.md#hookcommonpropertiessurvey) |

##### Returns

`boolean`

___

### HookOnMessageHidden

Ƭ **HookOnMessageHidden**: (`data`: [`HookCommonPropertiesMessage`](README.md#hookcommonpropertiesmessage) & \{ `response`: \{ `hide_reason`: [`ResponseStatus`](README.md#responsestatus) ; `id`: `string` ; `items`: [`ResponseItem`](README.md#responseitem)[]  }  }) => `void`

#### Type declaration

▸ (`data`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`HookCommonPropertiesMessage`](README.md#hookcommonpropertiesmessage) & \{ `response`: \{ `hide_reason`: [`ResponseStatus`](README.md#responsestatus) ; `id`: `string` ; `items`: [`ResponseItem`](README.md#responseitem)[]  }  } |

##### Returns

`void`

___

### HookOnMessageShowed

Ƭ **HookOnMessageShowed**: (`data`: [`HookCommonPropertiesMessage`](README.md#hookcommonpropertiesmessage) & \{ `response`: \{ `id`: `string` ; `items`: [`ResponseItem`](README.md#responseitem)[]  }  }) => `void`

#### Type declaration

▸ (`data`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`HookCommonPropertiesMessage`](README.md#hookcommonpropertiesmessage) & \{ `response`: \{ `id`: `string` ; `items`: [`ResponseItem`](README.md#responseitem)[]  }  } |

##### Returns

`void`

___

### HookOnMessageStarted

Ƭ **HookOnMessageStarted**: (`data`: [`HookCommonPropertiesMessage`](README.md#hookcommonpropertiesmessage) & \{ `response`: \{ `id`: `string`  }  }) => `void`

#### Type declaration

▸ (`data`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`HookCommonPropertiesMessage`](README.md#hookcommonpropertiesmessage) & \{ `response`: \{ `id`: `string`  }  } |

##### Returns

`void`

___

### HookOnQuestionReplied

Ƭ **HookOnQuestionReplied**: (`data`: [`HookCommonPropertiesSurvey`](README.md#hookcommonpropertiessurvey) & \{ `response`: \{ `answer`: [`ResponseItemAnswer`](README.md#responseitemanswer) ; `id`: `string` ; `items`: [`ResponseItem`](README.md#responseitem)[] ; `question`: [`ResponseItemQuestion`](README.md#responseitemquestion) ; `status`: ``null``  }  }) => `void`

#### Type declaration

▸ (`data`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`HookCommonPropertiesSurvey`](README.md#hookcommonpropertiessurvey) & \{ `response`: \{ `answer`: [`ResponseItemAnswer`](README.md#responseitemanswer) ; `id`: `string` ; `items`: [`ResponseItem`](README.md#responseitem)[] ; `question`: [`ResponseItemQuestion`](README.md#responseitemquestion) ; `status`: ``null``  }  } |

##### Returns

`void`

___

### HookOnReady

Ƭ **HookOnReady**: (`data`: \{ `channel`: [`Channel`](README.md#channel) ; `user`: [`User`](README.md#user)  }) => `void`

#### Type declaration

▸ (`data`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Object` |
| `data.channel` | [`Channel`](README.md#channel) |
| `data.user` | [`User`](README.md#user) |

##### Returns

`void`

___

### HookOnSurveyCompleted

Ƭ **HookOnSurveyCompleted**: (`data`: [`HookCommonPropertiesSurvey`](README.md#hookcommonpropertiessurvey) & \{ `response`: \{ `id`: `string` ; `items`: [`ResponseItem`](README.md#responseitem)[]  }  }) => `void`

#### Type declaration

▸ (`data`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`HookCommonPropertiesSurvey`](README.md#hookcommonpropertiessurvey) & \{ `response`: \{ `id`: `string` ; `items`: [`ResponseItem`](README.md#responseitem)[]  }  } |

##### Returns

`void`

___

### HookOnSurveyDisplayAllowed

Ƭ **HookOnSurveyDisplayAllowed**: (`data`: [`HookCommonPropertiesSurvey`](README.md#hookcommonpropertiessurvey)) => `boolean`

#### Type declaration

▸ (`data`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`HookCommonPropertiesSurvey`](README.md#hookcommonpropertiessurvey) |

##### Returns

`boolean`

___

### HookOnSurveyHidden

Ƭ **HookOnSurveyHidden**: (`data`: [`HookCommonPropertiesSurvey`](README.md#hookcommonpropertiessurvey) & \{ `response`: \{ `hide_reason`: [`ResponseStatus`](README.md#responsestatus) ; `id`: `string` ; `items`: [`ResponseItem`](README.md#responseitem)[]  }  }) => `void`

#### Type declaration

▸ (`data`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`HookCommonPropertiesSurvey`](README.md#hookcommonpropertiessurvey) & \{ `response`: \{ `hide_reason`: [`ResponseStatus`](README.md#responsestatus) ; `id`: `string` ; `items`: [`ResponseItem`](README.md#responseitem)[]  }  } |

##### Returns

`void`

___

### HookOnSurveyShowed

Ƭ **HookOnSurveyShowed**: (`data`: [`HookCommonPropertiesSurvey`](README.md#hookcommonpropertiessurvey) & \{ `response`: \{ `id`: `string` ; `items`: [`ResponseItem`](README.md#responseitem)[]  }  }) => `void`

#### Type declaration

▸ (`data`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`HookCommonPropertiesSurvey`](README.md#hookcommonpropertiessurvey) & \{ `response`: \{ `id`: `string` ; `items`: [`ResponseItem`](README.md#responseitem)[]  }  } |

##### Returns

`void`

___

### HookOnSurveyStarted

Ƭ **HookOnSurveyStarted**: (`data`: [`HookCommonPropertiesSurvey`](README.md#hookcommonpropertiessurvey) & \{ `response`: \{ `id`: `string`  }  }) => `void`

#### Type declaration

▸ (`data`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`HookCommonPropertiesSurvey`](README.md#hookcommonpropertiessurvey) & \{ `response`: \{ `id`: `string`  }  } |

##### Returns

`void`

___

### HooksInit

Ƭ **HooksInit**: [`HooksSurveyStart`](README.md#hookssurveystart) & [`HooksMessageStart`](README.md#hooksmessagestart) & \{ `onMessageDisplayAllowed?`: [`HookOnMessageDisplayAllowed`](README.md#hookonmessagedisplayallowed) ; `onReady?`: [`HookOnReady`](README.md#hookonready) ; `onSurveyDisplayAllowed?`: [`HookOnSurveyDisplayAllowed`](README.md#hookonsurveydisplayallowed) ; `version`: `string`  }

This is the Screeb tag hooks object available on `init` command.

___

### HooksMessageStart

Ƭ **HooksMessageStart**: `Object`

This is the Screeb tag hooks object available on `message.start` command.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `onMessageCompleted?` | [`HookOnMessageCompleted`](README.md#hookonmessagecompleted) | This hook is triggered when a message is completed |
| `onMessageHidden?` | [`HookOnMessageHidden`](README.md#hookonmessagehidden) | This hook is triggered when a message is hidden |
| `onMessageShowed?` | [`HookOnMessageShowed`](README.md#hookonmessageshowed) | This hook is triggered when a message is displayed on screen (also triggered when page is reloaded) |
| `onMessageStarted?` | [`HookOnMessageStarted`](README.md#hookonmessagestarted) | This hook is triggered when a message is started |
| `onQuestionReplied?` | [`HookOnQuestionReplied`](README.md#hookonquestionreplied) | This hook is triggered when a question is answered |

___

### HooksSurveyStart

Ƭ **HooksSurveyStart**: `Object`

This is the Screeb tag hooks object available on `survey.start` command.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `onQuestionReplied?` | [`HookOnQuestionReplied`](README.md#hookonquestionreplied) | This hook is triggered when a question is answered |
| `onSurveyCompleted?` | [`HookOnSurveyCompleted`](README.md#hookonsurveycompleted) | This hook is triggered when a survey is completed |
| `onSurveyHidden?` | [`HookOnSurveyHidden`](README.md#hookonsurveyhidden) | This hook is triggered when a survey is hidden |
| `onSurveyShowed?` | [`HookOnSurveyShowed`](README.md#hookonsurveyshowed) | This hook is triggered when a survey is displayed on screen (also triggered when page is reloaded) |
| `onSurveyStarted?` | [`HookOnSurveyStarted`](README.md#hookonsurveystarted) | This hook is triggered when a survey is started |

___

### Message

Ƭ **Message**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `messagey_size` | ``100`` |

___

### PropertyRecord

Ƭ **PropertyRecord**: `Object`

This is a property object that are supported by Screeb.

#### Index signature

▪ [key: `string`]: [`PropertyType`](README.md#propertytype) \| [`PropertyType`](README.md#propertytype)[]

___

### PropertyType

Ƭ **PropertyType**: `number` \| `boolean` \| `string` \| `Date` \| [`PropertyRecord`](README.md#propertyrecord)

This is property types that are supported by Screeb.

___

### ResponseItem

Ƭ **ResponseItem**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `answer` | [`ResponseItemAnswer`](README.md#responseitemanswer) |
| `question` | [`ResponseItemQuestion`](README.md#responseitemquestion) |

___

### ResponseItemAnswer

Ƭ **ResponseItemAnswer**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fields?` | \{ `boolean?`: `boolean` ; `number?`: `number` ; `text?`: `string` ; `time?`: `string` ; `type`: ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"none"`` \| ``"time"`` \| ``"file"``  }[] |
| `replied_at?` | `string` |

___

### ResponseItemQuestion

Ƭ **ResponseItemQuestion**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `title` | `string` |
| `type` | ``"text"`` \| ``"video"`` |
| `url?` | `string` |

___

### ResponseStatus

Ƭ **ResponseStatus**: ``"displayed"`` \| ``"started"`` \| ``"ended"`` \| ``"closed"`` \| ``"interrupted"``

___

### ScreebFunction

Ƭ **ScreebFunction**: (...`_`: `unknown`[]) => `void` \| `Promise`\<`unknown`\>

#### Type declaration

▸ (`..._`): `void` \| `Promise`\<`unknown`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `..._` | `unknown`[] |

##### Returns

`void` \| `Promise`\<`unknown`\>

___

### ScreebIdentityGetReturn

Ƭ **ScreebIdentityGetReturn**: `Object`

This is the object returned by the function `identityGet()`.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `anonymous_id` | `string` | Anonymous id given to each user |
| `channel_id` | `string` | The current channel id with which the tag was initialized |
| `is_ready` | `boolean` | `true` if the tag is loaded, initialized and ready to rock |
| `session_end` | `string` | The current user session end time |
| `session_id` | `string` | The current user session id |
| `session_start` | `string` | The current user session start time |
| `user_id` | `string` | The authenticated id assigned to the user. |

___

### ScreebObject

Ƭ **ScreebObject**: [`ScreebFunction`](README.md#screebfunction) & \{ `q?`: \{ `args`: `unknown`[] ; `ko`: (`reason?`: `unknown`) => `void` ; `ok`: (`value?`: `unknown`) => `void` ; `v`: `number`  }[]  }

This is the Screeb object publicly exposed in browser `window`.

___

### ScreebOptions

Ƭ **ScreebOptions**: `Object`

This is the Screeb tag options object.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `screebEndpoint?` | `string` | Please don't do this. |
| `sdkName?` | `string` | SDK name (eg: sdk-browser, sdk-react, sdk-angular, etc...) |
| `sdkVersion?` | `string` | SDK version (eg: 1.2.3) |
| `window?` | `Window` | If you're running Screeb tag in an iframe, please set the inner window here. |

___

### Survey

Ƭ **Survey**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `survey_format` | [`SurveyFormat`](README.md#surveyformat) |
| `survey_position` | [`SurveyPosition`](README.md#surveyposition) |
| `survey_size` | ``100`` |

___

### SurveyFormat

Ƭ **SurveyFormat**: ``"conversationnal"`` \| ``"cards"``

___

### SurveyPosition

Ƭ **SurveyPosition**: ``"center-left"`` \| ``"center-center"`` \| ``"center-right"`` \| ``"bottom-left"`` \| ``"bottom-center"`` \| ``"bottom-right"``

___

### SurveySize

Ƭ **SurveySize**: ``25`` \| ``50`` \| ``75`` \| ``100`` \| ``125`` \| ``150``

___

### User

Ƭ **User**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `anonymous_id` | `string` |
| `userId?` | `string` |

## Functions

### close

▸ **close**(): `void` \| `Promise`\<`unknown`\>

Shutdowns current Screeb session.

#### Returns

`void` \| `Promise`\<`unknown`\>

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.close();
```

___

### debug

▸ **debug**(): `void` \| `Promise`\<`unknown`\>

Prints the actual state information of Screeb tag.

#### Returns

`void` \| `Promise`\<`unknown`\>

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.debug();
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

### eventTrack

▸ **eventTrack**(`eventName`, `eventProperties?`): `void` \| `Promise`\<`unknown`\>

Tracks a user event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The event name. |
| `eventProperties?` | [`PropertyRecord`](README.md#propertyrecord) | The properties of your event. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date. ``` |

#### Returns

`void` \| `Promise`\<`unknown`\>

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.eventTrack(
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

▸ **identity**(`userId`, `userProperties?`): `void` \| `Promise`\<`unknown`\>

Change the current user identity.
Warning: Running surveys will be closed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `string` | The unique identifier of your user. |
| `userProperties?` | [`PropertyRecord`](README.md#propertyrecord) | The properties of your user. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date. ``` |

#### Returns

`void` \| `Promise`\<`unknown`\>

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.identity(
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

▸ **identityGet**(): `Promise`\<[`ScreebIdentityGetReturn`](README.md#screebidentitygetreturn)\>

Retrieves the current user identity.

#### Returns

`Promise`\<[`ScreebIdentityGetReturn`](README.md#screebidentitygetreturn)\>

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

console.log(await Screeb.identityGet());
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

___

### identityGroupAssign

▸ **identityGroupAssign**(`groupName`, `groupType?`, `groupProperties?`): `void` \| `Promise`\<`unknown`\>

Assigns the current user to a group.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `groupName` | `string` |  |
| `groupType?` | `string` |  |
| `groupProperties?` | [`PropertyRecord`](README.md#propertyrecord) | The properties of your user group. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date. ``` |

#### Returns

`void` \| `Promise`\<`unknown`\>

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.identityGroupAssign(
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

▸ **identityGroupUnassign**(`groupName`, `groupType?`): `void` \| `Promise`\<`unknown`\>

Unassigns the current user to a group.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `groupName` | `string` | The name of your user group. |
| `groupType?` | `string` | The type of your user group. |

#### Returns

`void` \| `Promise`\<`unknown`\>

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.identityGroupUnassign('company', 'Apple');
```

___

### identityProperties

▸ **identityProperties**(`userProperties`): `void` \| `Promise`\<`unknown`\>

Adds properties to the current user identity.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userProperties` | [`PropertyRecord`](README.md#propertyrecord) | The properties of your user. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date. ``` |

#### Returns

`void` \| `Promise`\<`unknown`\>

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

// Set user properties
Screeb.identityProperties(
  {
    firstname: '<user-firstname>',
    lastname: '<user-lastname>',
    plan: '<user-plan>',
    last_seen_at: new Date(),
    authenticated: true
  }
);

// Delete user property : set values to null
Screeb.identityProperties(
  {
    age: null,
    company: null,
    logged: true,
  }
);
```

___

### identityReset

▸ **identityReset**(): `void` \| `Promise`\<`unknown`\>

Resets the current user identity.
Warning: This command must be called only once, since it creates a new identity on Screeb side.

#### Returns

`void` \| `Promise`\<`unknown`\>

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.identityReset();
```

___

### init

▸ **init**(`websiteId`, `userId?`, `userProperties?`, `hooks?`, `language?`): `void` \| `Promise`\<`unknown`\>

Initializes Screeb tag.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `websiteId` | `string` | Your website/channel id. |
| `userId?` | `string` | The unique identifier of your user. |
| `userProperties?` | [`PropertyRecord`](README.md#propertyrecord) | The properties of your user. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date ``` |
| `hooks?` | [`HooksInit`](README.md#hooksinit) | Hooks to be called when SDK is ready or a survey is showed, started, completed, hidden or when a question is replied. |
| `language?` | `string` | Force a specific language for the tag. eg: 'en'. default: browser language. |

#### Returns

`void` \| `Promise`\<`unknown`\>

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.init(
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
    onReady: (payload) =>  console.log("Screeb SDK is ready!", payload),
  },
  "en"
);
```

___

### isLoaded

▸ **isLoaded**(): `undefined` \| `boolean`

Checks if Screeb tag has been loaded.

#### Returns

`undefined` \| `boolean`

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

console.log(Screeb.isLoaded()); // false
Screeb.load();
console.log(Screeb.isLoaded()); // true
```

___

### load

▸ **load**(`options?`): `Promise`\<`undefined`\>

Appends Screeb tag into your dom.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ScreebOptions`](README.md#screeboptions) | Screeb module options. |

#### Returns

`Promise`\<`undefined`\>

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.load();
```

___

### messageClose

▸ **messageClose**(): `void` \| `Promise`\<`unknown`\>

Interrupts a running message.

#### Returns

`void` \| `Promise`\<`unknown`\>

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.messageClose();
```

___

### messageStart

▸ **messageStart**(`messageId`, `hiddenFields?`, `hooks?`, `language?`): `void` \| `Promise`\<`unknown`\>

Starts a message by its ID.

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageId` | `string` |
| `hiddenFields` | [`PropertyRecord`](README.md#propertyrecord) |
| `hooks?` | [`HooksMessageStart`](README.md#hooksmessagestart) |
| `language?` | `string` |

#### Returns

`void` \| `Promise`\<`unknown`\>

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.messageStart(
  '<UUID>',
  false,
  {
    color: "green",
    article_id: 42
  },
  {
    version: "1.0.0",
    onMessageShowed: (payload) => console.log("Message showed", payload),
  },
  "en"
);
```

___

### surveyClose

▸ **surveyClose**(): `void` \| `Promise`\<`unknown`\>

Interrupts a running survey.

#### Returns

`void` \| `Promise`\<`unknown`\>

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.surveyClose();
```

___

### surveyStart

▸ **surveyStart**(`surveyId`, `distributionId?`, `allowMultipleResponses?`, `hiddenFields?`, `hooks?`, `language?`): `void` \| `Promise`\<`unknown`\>

Starts a survey by its ID.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `surveyId` | `string` | `undefined` |
| `distributionId?` | `string` | `undefined` |
| `allowMultipleResponses` | `boolean` | `true` |
| `hiddenFields` | [`PropertyRecord`](README.md#propertyrecord) | `{}` |
| `hooks?` | [`HooksSurveyStart`](README.md#hookssurveystart) | `undefined` |
| `language?` | `string` | `undefined` |

#### Returns

`void` \| `Promise`\<`unknown`\>

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.surveyStart(
  '<UUID>',
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
  "en"
);
```

___

### targetingCheck

▸ **targetingCheck**(): `void` \| `Promise`\<`unknown`\>

Forces a targeting check.

#### Returns

`void` \| `Promise`\<`unknown`\>

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.targetingCheck();
```

___

### targetingDebug

▸ **targetingDebug**(): `void` \| `Promise`\<`unknown`\>

Prints the current state of the targeting engine.

#### Returns

`void` \| `Promise`\<`unknown`\>

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

console.log(await Screeb.targetingDebug());
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

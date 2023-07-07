@screeb/sdk-browser

# @screeb/sdk-browser

## Table of contents

### Type Aliases

- [GlobalHooks](README.md#globalhooks)
- [HookType](README.md#hooktype)
- [PropertyRecord](README.md#propertyrecord)
- [PropertyType](README.md#propertytype)
- [QuestionAnswerPair](README.md#questionanswerpair)
- [ResponseAnswer](README.md#responseanswer)
- [ResponseAnswerValue](README.md#responseanswervalue)
- [ResponseAnswerValueBoolean](README.md#responseanswervalueboolean)
- [ResponseAnswerValueNone](README.md#responseanswervaluenone)
- [ResponseAnswerValueNumber](README.md#responseanswervaluenumber)
- [ResponseAnswerValueString](README.md#responseanswervaluestring)
- [ResponseAnswerValueTime](README.md#responseanswervaluetime)
- [ResponseHook](README.md#responsehook)
- [ResponseHookSDKReady](README.md#responsehooksdkready)
- [ResponseHookSurveyCompleted](README.md#responsehooksurveycompleted)
- [ResponseHookSurveyHidden](README.md#responsehooksurveyhidden)
- [ResponseHookSurveyReplied](README.md#responsehooksurveyreplied)
- [ResponseHookSurveyShowed](README.md#responsehooksurveyshowed)
- [ResponseHookSurveyStarted](README.md#responsehooksurveystarted)
- [ResponseQuestion](README.md#responsequestion)
- [ResponseQuestionActionButton](README.md#responsequestionactionbutton)
- [ResponseQuestionActionInput](README.md#responsequestionactioninput)
- [ResponseQuestionActionInputValidation](README.md#responsequestionactioninputvalidation)
- [ResponseQuestionActionLink](README.md#responsequestionactionlink)
- [ResponseQuestionActionRange](README.md#responsequestionactionrange)
- [ResponseQuestionActionScoring](README.md#responsequestionactionscoring)
- [ResponseQuestionActionSkip](README.md#responsequestionactionskip)
- [ResponseQuestionCTA](README.md#responsequestioncta)
- [ResponseQuestionCTAAppStoreRating](README.md#responsequestionctaappstorerating)
- [ResponseQuestionCTAChoices](README.md#responsequestionctachoices)
- [ResponseQuestionCTAInput](README.md#responsequestionctainput)
- [ResponseQuestionCTANone](README.md#responsequestionctanone)
- [ResponseQuestionCTARange](README.md#responsequestionctarange)
- [ResponseQuestionCTAScores](README.md#responsequestionctascores)
- [ResponseQuestionMessage](README.md#responsequestionmessage)
- [ResponseQuestionMessageText](README.md#responsequestionmessagetext)
- [ResponseStatus](README.md#responsestatus)
- [ScreebIdentityGetReturn](README.md#screebidentitygetreturn)
- [ScreebObject](README.md#screebobject)
- [ScreebOptions](README.md#screeboptions)
- [SurveyHooks](README.md#surveyhooks)

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
- [surveyClose](README.md#surveyclose)
- [surveyStart](README.md#surveystart)
- [targetingCheck](README.md#targetingcheck)
- [targetingDebug](README.md#targetingdebug)

## Type Aliases

### GlobalHooks

Ƭ **GlobalHooks**: { [key in HookType \| "onReady"]?: Function }

___

### HookType

Ƭ **HookType**: ``"onSurveyShowed"`` \| ``"onSurveyStarted"`` \| ``"onQuestionReplied"`` \| ``"onSurveyCompleted"`` \| ``"onSurveyHidden"``

Hooks

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

### QuestionAnswerPair

Ƭ **QuestionAnswerPair**: `Object`

#### Type declaration

| Name       | Type                                             |
| :--------- | :----------------------------------------------- |
| `answer?`  | [`ResponseAnswer`](README.md#responseanswer)     |
| `question` | [`ResponseQuestion`](README.md#responsequestion) |

___

### ResponseAnswer

Ƭ **ResponseAnswer**: `Object`

#### Type declaration

| Name          | Type                                                     |
| :------------ | :------------------------------------------------------- |
| `created_at`  | `Date`                                                   |
| `id`          | `string`                                                 |
| `question_id` | `string`                                                 |
| `values`      | [`ResponseAnswerValue`](README.md#responseanswervalue)[] |

___

### ResponseAnswerValue

Ƭ **ResponseAnswerValue**: [`ResponseAnswerValueNone`](README.md#responseanswervaluenone) \| [`ResponseAnswerValueString`](README.md#responseanswervaluestring) \| [`ResponseAnswerValueNumber`](README.md#responseanswervaluenumber) \| [`ResponseAnswerValueBoolean`](README.md#responseanswervalueboolean) \| [`ResponseAnswerValueTime`](README.md#responseanswervaluetime)

Answer

___

### ResponseAnswerValueBoolean

Ƭ **ResponseAnswerValueBoolean**: `ResponseAnswerValueAbstract` & { `type`: ``"boolean"`` ; `value_boolean`: `boolean`  }

___

### ResponseAnswerValueNone

Ƭ **ResponseAnswerValueNone**: `ResponseAnswerValueAbstract` & { `type`: ``"none"``  }

___

### ResponseAnswerValueNumber

Ƭ **ResponseAnswerValueNumber**: `ResponseAnswerValueAbstract` & { `type`: ``"number"`` ; `value_number`: `number`  }

___

### ResponseAnswerValueString

Ƭ **ResponseAnswerValueString**: `ResponseAnswerValueAbstract` & { `type`: ``"string"`` ; `value_string`: `string`  }

___

### ResponseAnswerValueTime

Ƭ **ResponseAnswerValueTime**: `ResponseAnswerValueAbstract` & { `type`: ``"time"`` ; `value_time`: `Date`  }

___

### ResponseHook

Ƭ **ResponseHook**: `Object`

#### Type declaration

| Name                | Type                                                                   |
| :------------------ | :--------------------------------------------------------------------- |
| `onQuestionReplied` | [`ResponseHookSurveyReplied`](README.md#responsehooksurveyreplied)     |
| `onReady`           | [`ResponseHookSDKReady`](README.md#responsehooksdkready)               |
| `onSurveyCompleted` | [`ResponseHookSurveyCompleted`](README.md#responsehooksurveycompleted) |
| `onSurveyHidden`    | [`ResponseHookSurveyHidden`](README.md#responsehooksurveyhidden)       |
| `onSurveyShowed`    | [`ResponseHookSurveyShowed`](README.md#responsehooksurveyshowed)       |
| `onSurveyStarted`   | [`ResponseHookSurveyStarted`](README.md#responsehooksurveystarted)     |

___

### ResponseHookSDKReady

Ƭ **ResponseHookSDKReady**: `Object`

#### Type declaration

| Name                | Type                                                |
| :------------------ | :-------------------------------------------------- |
| `user`              | { `anonymous_id`: `string` ; `user_id`: `string`  } |
| `user.anonymous_id` | `string`                                            |
| `user.user_id`      | `string`                                            |

___

### ResponseHookSurveyCompleted

Ƭ **ResponseHookSurveyCompleted**: `Object`

#### Type declaration

| Name                     | Type                                                                                                                                               |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items`                  | [`QuestionAnswerPair`](README.md#questionanswerpair)[]                                                                                             |
| `response`               | { `id`: `string`  }                                                                                                                                |
| `response.id`            | `string`                                                                                                                                           |
| `survey`                 | { `id`: `string` ; `survey_format`: ``"conversationnal"`` \| ``"cards"`` \| `undefined` ; `survey_position`: `number` ; `survey_size`: `number`  } |
| `survey.id`              | `string`                                                                                                                                           |
| `survey.survey_format`   | ``"conversationnal"`` \| ``"cards"`` \| `undefined`                                                                                                |
| `survey.survey_position` | `number`                                                                                                                                           |
| `survey.survey_size`     | `number`                                                                                                                                           |
| `user`                   | { `anonymous_id`: `string` ; `user_id`: `string`  }                                                                                                |
| `user.anonymous_id`      | `string`                                                                                                                                           |
| `user.user_id`           | `string`                                                                                                                                           |

___

### ResponseHookSurveyHidden

Ƭ **ResponseHookSurveyHidden**: `Object`

#### Type declaration

| Name                     | Type                                                                                                                                               |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items`                  | [`QuestionAnswerPair`](README.md#questionanswerpair)[]                                                                                             |
| `response`               | { `hide_reason`: [`ResponseStatus`](README.md#responsestatus) ; `id`: `string`  }                                                                  |
| `response.hide_reason`   | [`ResponseStatus`](README.md#responsestatus)                                                                                                       |
| `response.id`            | `string`                                                                                                                                           |
| `survey`                 | { `id`: `string` ; `survey_format`: ``"conversationnal"`` \| ``"cards"`` \| `undefined` ; `survey_position`: `number` ; `survey_size`: `number`  } |
| `survey.id`              | `string`                                                                                                                                           |
| `survey.survey_format`   | ``"conversationnal"`` \| ``"cards"`` \| `undefined`                                                                                                |
| `survey.survey_position` | `number`                                                                                                                                           |
| `survey.survey_size`     | `number`                                                                                                                                           |
| `user`                   | { `anonymous_id`: `string` ; `user_id`: `string`  }                                                                                                |
| `user.anonymous_id`      | `string`                                                                                                                                           |
| `user.user_id`           | `string`                                                                                                                                           |

___

### ResponseHookSurveyReplied

Ƭ **ResponseHookSurveyReplied**: `Object`

#### Type declaration

| Name                     | Type                                                                                                                                               |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items`                  | [`QuestionAnswerPair`](README.md#questionanswerpair)[]                                                                                             |
| `response`               | { `id`: `string` ; `status`: [`ResponseStatus`](README.md#responsestatus)  }                                                                       |
| `response.id`            | `string`                                                                                                                                           |
| `response.status`        | [`ResponseStatus`](README.md#responsestatus)                                                                                                       |
| `survey`                 | { `id`: `string` ; `survey_format`: ``"conversationnal"`` \| ``"cards"`` \| `undefined` ; `survey_position`: `number` ; `survey_size`: `number`  } |
| `survey.id`              | `string`                                                                                                                                           |
| `survey.survey_format`   | ``"conversationnal"`` \| ``"cards"`` \| `undefined`                                                                                                |
| `survey.survey_position` | `number`                                                                                                                                           |
| `survey.survey_size`     | `number`                                                                                                                                           |
| `user`                   | { `anonymous_id`: `string` ; `user_id`: `string`  }                                                                                                |
| `user.anonymous_id`      | `string`                                                                                                                                           |
| `user.user_id`           | `string`                                                                                                                                           |

___

### ResponseHookSurveyShowed

Ƭ **ResponseHookSurveyShowed**: `Object`

#### Type declaration

| Name                     | Type                                                                                                                                               |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items`                  | [`QuestionAnswerPair`](README.md#questionanswerpair)[]                                                                                             |
| `response`               | { `id`: `string`  }                                                                                                                                |
| `response.id`            | `string`                                                                                                                                           |
| `survey`                 | { `id`: `string` ; `survey_format`: ``"conversationnal"`` \| ``"cards"`` \| `undefined` ; `survey_position`: `number` ; `survey_size`: `number`  } |
| `survey.id`              | `string`                                                                                                                                           |
| `survey.survey_format`   | ``"conversationnal"`` \| ``"cards"`` \| `undefined`                                                                                                |
| `survey.survey_position` | `number`                                                                                                                                           |
| `survey.survey_size`     | `number`                                                                                                                                           |
| `user`                   | { `anonymous_id`: `string` ; `user_id`: `string`  }                                                                                                |
| `user.anonymous_id`      | `string`                                                                                                                                           |
| `user.user_id`           | `string`                                                                                                                                           |

___

### ResponseHookSurveyStarted

Ƭ **ResponseHookSurveyStarted**: `Object`

#### Type declaration

| Name                     | Type                                                                                                                                               |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `response`               | { `id`: `string`  }                                                                                                                                |
| `response.id`            | `string`                                                                                                                                           |
| `survey`                 | { `id`: `string` ; `survey_format`: ``"conversationnal"`` \| ``"cards"`` \| `undefined` ; `survey_position`: `number` ; `survey_size`: `number`  } |
| `survey.id`              | `string`                                                                                                                                           |
| `survey.survey_format`   | ``"conversationnal"`` \| ``"cards"`` \| `undefined`                                                                                                |
| `survey.survey_position` | `number`                                                                                                                                           |
| `survey.survey_size`     | `number`                                                                                                                                           |
| `user`                   | { `anonymous_id`: `string` ; `user_id`: `string`  }                                                                                                |
| `user.anonymous_id`      | `string`                                                                                                                                           |
| `user.user_id`           | `string`                                                                                                                                           |

___

### ResponseQuestion

Ƭ **ResponseQuestion**: `Object`

#### Type declaration

| Name             | Type                                                                 |
| :--------------- | :------------------------------------------------------------------- |
| `call_to_action` | [`ResponseQuestionCTA`](README.md#responsequestioncta)               |
| `ends`           | `boolean`                                                            |
| `id`             | `string`                                                             |
| `messages`       | [`ResponseQuestionMessage`](README.md#responsequestionmessage)[]     |
| `skip_action?`   | [`ResponseQuestionActionSkip`](README.md#responsequestionactionskip) |

___

### ResponseQuestionActionButton

Ƭ **ResponseQuestionActionButton**: `Object`

Action

#### Type declaration

| Name            | Type                                                          |
| :-------------- | :------------------------------------------------------------ |
| `id`            | `string`                                                      |
| `payload`       | { `emoji`: `string` ; `label`: `string` ; `url?`: `string`  } |
| `payload.emoji` | `string`                                                      |
| `payload.label` | `string`                                                      |
| `payload.url?`  | `string`                                                      |
| `type`          | ``"button"``                                                  |

___

### ResponseQuestionActionInput

Ƭ **ResponseQuestionActionInput**: `Object`

#### Type declaration

| Name                 | Type                                                                                                          |
| :------------------- | :------------------------------------------------------------------------------------------------------------ |
| `id`                 | `string`                                                                                                      |
| `payload`            | { `validation`: [`ResponseQuestionActionInputValidation`](README.md#responsequestionactioninputvalidation)  } |
| `payload.validation` | [`ResponseQuestionActionInputValidation`](README.md#responsequestionactioninputvalidation)                    |
| `type`               | ``"text_input"``                                                                                              |

___

### ResponseQuestionActionInputValidation

Ƭ **ResponseQuestionActionInputValidation**: ``"text"`` \| ``"email"``

___

### ResponseQuestionActionLink

Ƭ **ResponseQuestionActionLink**: `Object`

#### Type declaration

| Name            | Type                                                          |
| :-------------- | :------------------------------------------------------------ |
| `id`            | `string`                                                      |
| `payload`       | { `emoji`: `string` ; `label`: `string` ; `link`: `string`  } |
| `payload.emoji` | `string`                                                      |
| `payload.label` | `string`                                                      |
| `payload.link`  | `string`                                                      |
| `type`          | ``"link"``                                                    |

___

### ResponseQuestionActionRange

Ƭ **ResponseQuestionActionRange**: `Object`

#### Type declaration

| Name                 | Type                                                                                     |
| :------------------- | :--------------------------------------------------------------------------------------- |
| `id`                 | `string`                                                                                 |
| `payload`            | { `emoji`: `string` ; `max`: `number` ; `min`: `number` ; `validation`: ``"min_max"``  } |
| `payload.emoji`      | `string`                                                                                 |
| `payload.max`        | `number`                                                                                 |
| `payload.min`        | `number`                                                                                 |
| `payload.validation` | ``"min_max"``                                                                            |
| `type`               | ``"number_input"``                                                                       |

___

### ResponseQuestionActionScoring

Ƭ **ResponseQuestionActionScoring**: `Object`

#### Type declaration

| Name            | Type                                       |
| :-------------- | :----------------------------------------- |
| `id`            | `string`                                   |
| `payload`       | { `emoji`: `string` ; `value`: `number`  } |
| `payload.emoji` | `string`                                   |
| `payload.value` | `number`                                   |
| `type`          | ``"scoring"``                              |

___

### ResponseQuestionActionSkip

Ƭ **ResponseQuestionActionSkip**: `Object`

#### Type declaration

| Name      | Type       |
| :-------- | :--------- |
| `id`      | `string`   |
| `payload` | `any`      |
| `type`    | ``"skip"`` |

___

### ResponseQuestionCTA

Ƭ **ResponseQuestionCTA**: [`ResponseQuestionCTANone`](README.md#responsequestionctanone) \| [`ResponseQuestionCTAChoices`](README.md#responsequestionctachoices) \| [`ResponseQuestionCTAScores`](README.md#responsequestionctascores) \| [`ResponseQuestionCTAInput`](README.md#responsequestionctainput) \| [`ResponseQuestionCTARange`](README.md#responsequestionctarange) \| [`ResponseQuestionCTAAppStoreRating`](README.md#responsequestionctaappstorerating)

___

### ResponseQuestionCTAAppStoreRating

Ƭ **ResponseQuestionCTAAppStoreRating**: `Object`

#### Type declaration

| Name   | Type                  |
| :----- | :-------------------- |
| `type` | ``"appstore_rating"`` |

___

### ResponseQuestionCTAChoices

Ƭ **ResponseQuestionCTAChoices**: `Object`

#### Type declaration

| Name      | Type                                                                       |
| :-------- | :------------------------------------------------------------------------- |
| `choices` | [`ResponseQuestionActionButton`](README.md#responsequestionactionbutton)[] |
| `type`    | ``"multiple_choice"`` \| ``"pmf"`` \| ``"link"``                           |

___

### ResponseQuestionCTAInput

Ƭ **ResponseQuestionCTAInput**: `Object`

#### Type declaration

| Name    | Type                                                                   |
| :------ | :--------------------------------------------------------------------- |
| `input` | [`ResponseQuestionActionInput`](README.md#responsequestionactioninput) |
| `type`  | ``"input"``                                                            |

___

### ResponseQuestionCTANone

Ƭ **ResponseQuestionCTANone**: `Object`

CTA

#### Type declaration

| Name   | Type       |
| :----- | :--------- |
| `type` | ``"none"`` |

___

### ResponseQuestionCTARange

Ƭ **ResponseQuestionCTARange**: `Object`

#### Type declaration

| Name    | Type                                                                   |
| :------ | :--------------------------------------------------------------------- |
| `range` | [`ResponseQuestionActionRange`](README.md#responsequestionactionrange) |
| `type`  | ``"range"``                                                            |

___

### ResponseQuestionCTAScores

Ƭ **ResponseQuestionCTAScores**: `Object`

#### Type declaration

| Name     | Type                                                                         |
| :------- | :--------------------------------------------------------------------------- |
| `scores` | [`ResponseQuestionActionScoring`](README.md#responsequestionactionscoring)[] |
| `type`   | ``"scoring"`` \| ``"nps"`` \| ``"ces"`` \| ``"csat"``                        |

___

### ResponseQuestionMessage

Ƭ **ResponseQuestionMessage**: { `id`: `string`  } & [`ResponseQuestionMessageText`](README.md#responsequestionmessagetext)

___

### ResponseQuestionMessageText

Ƭ **ResponseQuestionMessageText**: `Object`

Messages

#### Type declaration

| Name   | Type       |
| :----- | :--------- |
| `text` | `string`   |
| `type` | ``"text"`` |

___

### ResponseStatus

Ƭ **ResponseStatus**: ``"started"`` \| ``"ended"`` \| ``"closed"`` \| ``"interrupted"``

___

### ScreebIdentityGetReturn

Ƭ **ScreebIdentityGetReturn**: `Object`

This is the object returned by the function `identityGet()`.

#### Type declaration

| Name            | Type      | Description                                                |
| :-------------- | :-------- | :--------------------------------------------------------- |
| `channel_id`    | `string`  | The current channel id with which the tag was initialized  |
| `anonymous_id`  | `string`  | Anonymous id given to each user                            |
| `user_id`       | `string`  | The authenticated id assigned to the user.                 |
| `is_ready`      | `boolean` | `true` if the tag us loaded, initialized and ready to rock |
| `session_id`    | `string`  | The current user session id                                |
| `session_start` | `string`  | The current user session start time                        |
| `session_end`   | `string`  | The current user session end time                          |

___

### ScreebObject

Ƭ **ScreebObject**: `ScreebFunction` & { `q?`: { `args`: `unknown`[] ; `ko`: (`reason?`: `unknown`) => `void` ; `ok`: (`value?`: `unknown`) => `void` ; `v`: `number`  }[]  }

This is the Screeb object publicly exposed in browser `window`.

___

### ScreebOptions

Ƭ **ScreebOptions**: `Object`

This is the Screeb tag options object.

#### Type declaration

| Name              | Type     | Description                                                                  |
| :---------------- | :------- | :--------------------------------------------------------------------------- |
| `screebEndpoint?` | `string` | Please don't do this.                                                        |
| `window?`         | `Window` | If you're running Screeb tag in an iframe, please set the inner window here. |

___

### SurveyHooks

Ƭ **SurveyHooks**: { [key in HookType]?: Function }

## Functions

### close

▸ **close**(): `void` \| `Promise`<`unknown`\>

Shutdowns current Screeb session.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.close();
```

#### Returns

`void` \| `Promise`<`unknown`\>

___

### debug

▸ **debug**(): `void` \| `Promise`<`unknown`\>

Prints the actual state information of Screeb tag.

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

#### Returns

`void` \| `Promise`<`unknown`\>

___

### eventTrack

▸ **eventTrack**(`eventName`, `eventProperties?`): `void` \| `Promise`<`unknown`\>

Tracks a user event.

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

#### Parameters

| Name               | Type                                         | Description                                                                                                                                                                                               |
| :----------------- | :------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `eventName`        | `string`                                     | The event name.                                                                                                                                                                                           |
| `eventProperties?` | [`PropertyRecord`](README.md#propertyrecord) | The properties of your event. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date. ``` |

#### Returns

`void` \| `Promise`<`unknown`\>

___

### identity

▸ **identity**(`userId`, `userProperties?`): `void` \| `Promise`<`unknown`\>

Change the current user identity.
Warning: Running surveys will be closed.

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

#### Parameters

| Name              | Type                                         | Description                                                                                                                                                                                              |
| :---------------- | :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `userId`          | `string`                                     | The unique identifier of your user.                                                                                                                                                                      |
| `userProperties?` | [`PropertyRecord`](README.md#propertyrecord) | The properties of your user. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date. ``` |

#### Returns

`void` \| `Promise`<`unknown`\>

___

### identityGet

▸ **identityGet**(): `Promise`<[`ScreebIdentityGetReturn`](README.md#screebidentitygetreturn)\>

Retrieves the current user identity.

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

#### Returns

`Promise`<[`ScreebIdentityGetReturn`](README.md#screebidentitygetreturn)\>

___

### identityGroupAssign

▸ **identityGroupAssign**(`groupName`, `groupType?`, `groupProperties?`): `void` \| `Promise`<`unknown`\>

Assigns the current user to a group.

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

#### Parameters

| Name               | Type                                         | Description                                                                                                                                                                                                    |
| :----------------- | :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `groupName`        | `string`                                     |                                                                                                                                                                                                                |
| `groupType?`       | `string`                                     |                                                                                                                                                                                                                |
| `groupProperties?` | [`PropertyRecord`](README.md#propertyrecord) | The properties of your user group. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date. ``` |

#### Returns

`void` \| `Promise`<`unknown`\>

___

### identityGroupUnassign

▸ **identityGroupUnassign**(`groupName`, `groupType?`): `void` \| `Promise`<`unknown`\>

Unassigns the current user to a group.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.identityGroupUnassign('company', 'Apple');
```

#### Parameters

| Name         | Type     | Description                  |
| :----------- | :------- | :--------------------------- |
| `groupName`  | `string` | The name of your user group. |
| `groupType?` | `string` | The type of your user group. |

#### Returns

`void` \| `Promise`<`unknown`\>

___

### identityProperties

▸ **identityProperties**(`userProperties`): `void` \| `Promise`<`unknown`\>

Adds properties to the current user identity.

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

#### Parameters

| Name             | Type                                         | Description                                                                                                                                                                                              |
| :--------------- | :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `userProperties` | [`PropertyRecord`](README.md#propertyrecord) | The properties of your user. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date. ``` |

#### Returns

`void` \| `Promise`<`unknown`\>

___

### identityReset

▸ **identityReset**(): `void` \| `Promise`<`unknown`\>

Resets the current user identity.
Warning: This command must be called only once, since it creates a new identity on Screeb side.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.identityReset();
```

#### Returns

`void` \| `Promise`<`unknown`\>

___

### init

▸ **init**(`websiteId`, `userId?`, `userProperties?`, `hooks?`): `void` \| `Promise`<`unknown`\>

Initializes Screeb tag.

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
    onReady: (payload) => {
       console.log("SDK is ready", payload);
    },
  },
);
```

#### Parameters

| Name              | Type                                         | Description                                                                                                                                                                                             |
| :---------------- | :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `websiteId`       | `string`                                     | Your website/channel id.                                                                                                                                                                                |
| `userId?`         | `string`                                     | The unique identifier of your user.                                                                                                                                                                     |
| `userProperties?` | [`PropertyRecord`](README.md#propertyrecord) | The properties of your user. ```text Requirements: - Property names must be limited to 128 characters - No more than 1000 attributes - Supported types for values: string, number, boolean and Date ``` |
| `hooks?`          | [`GlobalHooks`](README.md#globalhooks)       | Hooks to be called when SDK is ready or a survey is showed, started, completed, hidden or when a question is replied.                                                                                   |

#### Returns

`void` \| `Promise`<`unknown`\>

___

### isLoaded

▸ **isLoaded**(): `boolean`

Checks if Screeb tag has been loaded.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

console.log(Screeb.isLoaded()); // false
Screeb.load();
console.log(Screeb.isLoaded()); // true
```

#### Returns

`boolean`

___

### load

▸ **load**(`options?`): `Promise`<`undefined`\>

Appends Screeb tag into your dom.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.load();
```

#### Parameters

| Name      | Type                                       | Description            |
| :-------- | :----------------------------------------- | :--------------------- |
| `options` | [`ScreebOptions`](README.md#screeboptions) | Screeb module options. |

#### Returns

`Promise`<`undefined`\>

___

### surveyClose

▸ **surveyClose**(): `void` \| `Promise`<`unknown`\>

Interrupts a running survey.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.surveyClose();
```

#### Returns

`void` \| `Promise`<`unknown`\>

___

### surveyStart

▸ **surveyStart**(`surveyId`, `allowMultipleResponses?`, `hiddenFields?`, `hooks?`): `void` \| `Promise`<`unknown`\>

Starts a survey by its ID.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.surveyStart(
  '<UUID>',
  false,
  {
    color: "green",
    article_id: 42
  },
  {
    onSurveyShowed: (payload) => {
       console.log("Survey showed", payload);
    },
  },
);
```

#### Parameters

| Name                     | Type                                                  | Default value |
| :----------------------- | :---------------------------------------------------- | :------------ |
| `surveyId`               | `string`                                              | `undefined`   |
| `allowMultipleResponses` | `boolean`                                             | `true`        |
| `hiddenFields`           | [`PropertyRecord`](README.md#propertyrecord)          | `{}`          |
| `hooks`                  | `undefined` \| [`SurveyHooks`](README.md#surveyhooks) | `undefined`   |

#### Returns

`void` \| `Promise`<`unknown`\>

___

### targetingCheck

▸ **targetingCheck**(): `void` \| `Promise`<`unknown`\>

Forces a targeting check.

**`Example`**

```ts
import * as Screeb from "@screeb/sdk-browser";

Screeb.targetingCheck();
```

#### Returns

`void` \| `Promise`<`unknown`\>

___

### targetingDebug

▸ **targetingDebug**(): `void` \| `Promise`<`unknown`\>

Prints the current state of the targeting engine.

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

#### Returns

`void` \| `Promise`<`unknown`\>

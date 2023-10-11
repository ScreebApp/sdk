[@screeb/sdk-angular](../README.md) / ScreebModule

# Class: ScreebModule

## Table of contents

### Constructors

- [constructor](ScreebModule.md#constructor)

### Methods

- [forRoot](ScreebModule.md#forroot)

## Constructors

### constructor

• **new ScreebModule**(`config`, `screeb`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ScreebConfig`](ScreebConfig.md) |
| `screeb` | [`Screeb`](Screeb.md) |

## Methods

### forRoot

▸ `Static` **forRoot**(`config`): `ModuleWithProviders`<[`ScreebModule`](ScreebModule.md)\>

This is used to initialize Screeb at the top of your Angular application

**`Example`**

```ts
ScreebModule.forRoot({
  autoInit: true,
  websiteId: "<your-website-id>",
  userId: "<your-user-id>",
  userProperties: {
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
})
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`ScreebConfig`](ScreebConfig.md) | Configuration to pass to Screeb browser SDK |

#### Returns

`ModuleWithProviders`<[`ScreebModule`](ScreebModule.md)\>

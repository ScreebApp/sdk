[@screeb/sdk-angular](../README.md) / ScreebConfig

# Class: ScreebConfig

Configuration of Screeb module

## Table of contents

### Constructors

- [constructor](ScreebConfig.md#constructor)

### Properties

- [autoInit](ScreebConfig.md#autoinit)
- [options](ScreebConfig.md#options)
- [shouldLoad](ScreebConfig.md#shouldload)
- [userId](ScreebConfig.md#userid)
- [userProperties](ScreebConfig.md#userproperties)
- [websiteId](ScreebConfig.md#websiteid)

## Constructors

### constructor

• **new ScreebConfig**()

## Properties

### autoInit

• `Optional` **autoInit**: `boolean`

Indicates if Screeb should be automatically initialized.

**`Remarks`**

if `true`, 'init' does not need to be called manually

___

### options

• `Optional` **options**: `ScreebOptions`

Screeb tag initialization options.

**`Remarks`**

this is used is really particular cases, handle with care.

___

### shouldLoad

• `Optional` **shouldLoad**: `boolean`

Indicates if Screeb should be automatically loaded.
This will ping to the Screeb servers.

**`Remarks`**

if `true`, 'load' does not need to be called manually. Can be used for multistaged environments

___

### userId

• `Optional` **userId**: `string`

The unique identifier of your user.

___

### userProperties

• `Optional` **userProperties**: `PropertyRecord`

The properties of your user.

___

### websiteId

• `Optional` **websiteId**: `string`

Your website/channel id.

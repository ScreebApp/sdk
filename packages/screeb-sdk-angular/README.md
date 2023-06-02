<p align="center">
  <a href="https://screeb.app" alt="Screeb">
    <img src="https://raw.githubusercontent.com/ScreebApp/sdk-js/master/packages/screeb-sdk-angular/readme/screeb-logo.svg?token=GHSAT0AAAAAAB2OOPMGT2QD5TL3IRJN3CKCZDEYHJA" alt="Logo" height="120px" style="margin-top: 20px;"/>
  </a>
</p>
<h1 align="center">@screeb/sdk-angular</h1>
<p align="center">
  Screeb's browser sdk, optimized for Angular.

  <b>Continuous Product Discovery, Without the Time Sink.</b>

  <a href="https://screeb.app" alt="Screeb">Screeb</a> is the only Continuous Product Discovery platform that lets you analyse users' behaviour, ask in-app questions, recruit people for interviews and analyse data in a blink with AI.
</p>

<p align="center">
  <a href="https://github.com/ScreebApp/sdk-js/actions/workflows/node.js.yml" alt="ci">
    <img alt="ci" src="https://github.com/ScreebApp/sdk-js/actions/workflows/node.js.yml/badge.svg">
  </a>
  <a href="https://www.npmjs.com/package/@screeb/sdk-angular" alt="version">
    <img alt="version" src="https://img.shields.io/npm/v/@screeb/sdk-angular.svg" />
  </a>
  <a href="https://bundlephobia.com/package/@screeb/sdk-angular" alt="min size">
    <img alt="min size" src="https://img.shields.io/bundlephobia/min/@screeb/sdk-angular">
  </a>
  <a href="https://bundlephobia.com/package/@screeb/sdk-angular" alt="minzipped size">
    <img alt="minzipped size" src="https://img.shields.io/bundlephobia/minzip/@screeb/sdk-angular">
  </a>
<img alt="downloads" src="https://badgen.net/npm/dw/@screeb/sdk-angular" />
</p>


## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```bash
npm install @screeb/sdk-angular --save

# For Yarn, use the command below.
yarn add @screeb/sdk-angular
```

## Usage

Basic usage:

In your app bootstrap and/or app module:

```ts
import { ScreebModule } from "@screeb/sdk-angular";

@NgModule({
  imports: [
    // ...
    ScreebModule.forRoot({
      autoInit: true,
      "<your-website-id>",
      "<your-user-id>",
      {
        firstname: '<user-firstname>',
        lastname: '<user-lastname>',
        plan: '<user-plan>',
        last_seen_at: new Date(),
        authenticated: true
      }
    })
    // ...
  ]
})
export class AppModule {}
```

Then, if you need to use Screeb SDK API, in any module:

```ts
// App
import { Component, OnInit } from '@angular/core';
import { ScreebModule } from "@screeb/sdk-angular";

@Component({
  selector: 'app',
  template: `...`
})
export class AppComponent implements OnInit {
  constructor(
    public screeb: Screeb
  ){}

  ngOnInit() {
    this.screeb.eventTrack("screeb-sdk-angular-example started", {
      test: 123,
    });
  }
}
```

For a working example, see our [Screeb Angular SDK example app](https://github.com/ScreebApp/sdk-js/tree/master/packages/screeb-sdk-angular-example).

For a more advanced usage and a complete API documentation, see [documentation generated from source files](https://github.com/ScreebApp/sdk-js/tree/master/packages/screeb-sdk-angular/docs).

For further information, see [our developper documentation](https://github.com/ScreebApp/developers).

## Support
For any issues, please contact our support team at support@screeb.com.

## Contributing
All third party contributors acknowledge that any contributions they provide will be made under the same open source license that the open source project is provided under.

## License

Released under [MIT License](https://github.com/ScreebApp/sdk-js/blob/master/LICENSE).
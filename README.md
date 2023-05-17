# sdk-js

This is a lerna-powered mono-repository for Screeb javascript SDKs.

## Table of Contents:

- [Packages](#packages)
- [Get Started](#get-started)
- [Support](#support)
- [Contributing](#contributing)
- [License](#license)

## Get started

Here is the guide to set everything up before contributing.

### Packages

This is a monorepo with multiple packages leveraging [`lerna`](https://github.com/lerna/lerna):

- [@screeb/eslint-config](packages/screeb-eslint-config/README.md) - Screeb's eslint config for frontend app.
- [@screeb/sdk-browser](packages/screeb-sdk-browser/README.md) - Screeb's browser sdk.
- [@screeb/sdk-browser-example](packages/screeb-sdk-browser-example/README.md) - Screeb's example app for browser sdk.
- [@screeb/template-lib](packages/screeb-template-lib/README.md) - Screeb's template for a front-end lib.
- [@screeb/typescript-config](packages/screeb-typescript-config/README.md) - Screeb's typescript configs for frontend app.

### Getting set up

You'll need to have some tools installed locally to build and test action destinations.

- Node 18.12 (latest LTS, we recommand using [`nvm`](https://github.com/nvm-sh/nvm) for managing Node versions)

If you are a Screeb employee you can directly `git clone` the repository locally. Otherwise you'll want to fork this repository for your organization to submit Pull Requests against the main Screeb repository. Once you've got a fork, you can `git clone` that locally.

```sh
# Clone the repo locally
git clone <your fork or https://github.com/ScreebApp/sdk-js.git>
cd sdk-js

npm login

# Requires node 18.12.1, optionally: nvm use 18.12.1
npm i

# Run unit tests to ensure things are working!
npm test
```

## Support
For any issues, please contact our support team at support@screeb.com.

## Contributing
All third party contributors acknowledge that any contributions they provide will be made under the same open source license that the open source project is provided under.

## License

Released under [MIT License](LICENSE).
# `screeb-eslint-config`

Screeb's eslint config for frontend app.

## Usage

**Warning:** This package is **NOT** published in the NPM registry and can't be installed using any package manager.

Add config to your package:

```bash
npx lerna add @screeb/eslint-config --scope=<your-package>
```

In your `.eslintrc`:

```json
{
  "extends": [
    "@screeb/eslint-config"
  ]
}
```

In your `package.json`:

```json
{
    "scripts": {
        "lint": "eslint .",
        // [..]
    },
    // [..]
}
```

In your `.eslintignore` (recommended):

```
dist/*
node_modules
```

## License

Released under [MIT License](../../LICENSE).
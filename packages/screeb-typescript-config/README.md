# `screeb-typescript-config`

Screeb's typescript configs for frontend app.

## Usage

**Warning:** This package is **NOT** published in the NPM registry and can't be installed using any package manager.

**You may better clone the [@screeb/template-lib](../screeb-template-lib) if you have to build something with typescript/rollup.**

Add config to your package:

```bash
npx lerna add @screeb/typescript-config --scope=<your-package>
```

In your `tsconfig.json`:

```json
{
  // Mandatory
  "extends": "@screeb/typescript-config/src/tsconfig.json",

  // Recommended
  "include": ["src"],
  "exclude": ["dist"],
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true,
    "declarationDir": "."
  }

  // [..]
}
```

In your `package.json`:

```json
{
  // [..]

  // Mandatory
  "scripts": {
    "build": "rollup -c ../../node_modules/@screeb/typescript-config/src/rollup.config.js"
    // [..]
  },

  // Recommended
  "sideEffects": false,
  "type": "module",
  "module": "dist/index.es.js",
  "main": "dist/index.cjs.js",
  "jsnext:main": "dist/index.es.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "exports": {
    "./package.json": "./package.json",
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.es.js"
      },
      "require": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.cjs.js"
      }
    }
  }

  // [..]
}
```

## License

Released under [MIT License](../../LICENSE).

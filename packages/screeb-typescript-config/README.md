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
  "module": "dist/es/index.js",
  "main": "dist/cjs/index.js",
  "jsnext:main": "dist/es/index.js",
  "types": "dist/es/index.d.ts",
  "files": ["dist"],
  "exports": {
    "./package.json": "./package.json",
    ".": {
      "import": {
        "types": "./dist/cjs/index.d.ts",
        "default": "./dist/cjs/index.js"
      },
      "require": {
        "types": "./dist/es/index.d.ts",
        "default": "./dist/es/index.js"
      }
    }
  }

  // [..]
}
```

## License

Released under [MIT License](../../LICENSE).

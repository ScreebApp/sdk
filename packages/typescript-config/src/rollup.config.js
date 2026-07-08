import glob from 'glob'
import path from 'path'
import fs from 'fs'

import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const watcher = (globs) => ({
  buildStart () {
    for (const item of globs) {
      glob.sync(path.resolve(item)).forEach((filename) => { this.addWatchFile(filename) })
    }
  }
})

const updateVersion = () => ({
  renderStart (outputOptions, inputOptions) {
    outputOptions.footer = () => `CONSTANTS.version = '${JSON.parse(fs.readFileSync('package.json', 'utf8')).version}'`
  }
})

// Keep the `CONSTANTS` binding intact (the updateVersion footer reassigns
// CONSTANTS.version at runtime) and avoid constant-folding its reads.
const minify = () => terser({
  mangle: { reserved: ['CONSTANTS'] },
  compress: { evaluate: false, reduce_vars: false },
})

export default {
    input: "src/index.ts",
    output: [
        {
            plugins: [
                updateVersion(),
                minify(),
            ],
            file: "dist/es/index.mjs",
            format: "esm"
        }, {
            plugins: [
                updateVersion(),
                minify(),
            ],
            file: "dist/cjs/index.cjs",
            format: "cjs"
        },
    ],
    plugins: [
        watcher(['package.json']),
        typescript({ tsconfig: './tsconfig.json' }),
    ]
};

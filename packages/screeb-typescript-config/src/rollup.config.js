import glob from 'glob'
import path from 'path'
import fs from 'fs'

import typescript from '@rollup/plugin-typescript';

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

export default {
    input: "src/index.ts",
    output: [
        {
            plugins: [
                updateVersion()
            ],
            file: "dist/es/index.mjs",
            format: "esm"
        }, {
            plugins: [
                updateVersion()
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

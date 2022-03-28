#!/usr/bin/env node

const ImportGlobPlugin = require('esbuild-plugin-import-glob').default;

require("esbuild").build({
    plugins: [
        ImportGlobPlugin(),
    ],
    entryPoints: ["src/twitter.js"],
    outfile: "twitter",
    platform: "node",
    bundle: true,
})
.catch(() => process.exit(1));

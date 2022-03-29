import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: 'src/twitter.js',
  output: {
    file: 'twitter',
    format: 'cjs',
    banner: '#!/usr/bin/env node'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json()
  ]
};

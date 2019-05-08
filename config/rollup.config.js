'use strict';

const path = require('path');
const paths = require('./paths');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const json = require('rollup-plugin-json');
const babelConfig = require(paths.babelConfig);
const pkg = require(paths.packageJson);

module.exports = {
  input: paths.resolveRoot('src/index'),
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    }
  ],
  plugins: [
    json(),
    resolve(),
    babel({ exclude: 'node_modules/**', ...babelConfig })
  ],
  external: ['react', 'react-dom', 'hyphenated']
};

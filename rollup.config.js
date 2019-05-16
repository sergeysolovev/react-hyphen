'use strict';

const path = require('path');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const babelConfig = require('./babel.config');
const pkg = require('./package.json');

module.exports = {
  input: path.resolve(__dirname, 'src/index.js'),
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    }
  ],
  plugins: [resolve(), babel({ exclude: 'node_modules/**', ...babelConfig })],
  external: ['react', 'react-dom', 'hyphenated']
};

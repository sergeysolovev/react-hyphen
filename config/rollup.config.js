'use strict';

const path = require('path');
const paths = require('./paths');
const babel = require('rollup-plugin-babel');
const babelConfig = require(paths.babelConfig);
const pkg = require(paths.packageJson);

const mapInput = item => ({
  [item]: path.resolve(paths.src, item)
});

const buildInput = (...mappings) => {
  return mappings.reduce((all, mapping) => Object.assign({}, all, mapping), {});
};

module.exports = {
  input: buildInput(
    mapInput('index'),
    mapInput('languages/en-us'),
    mapInput('languages/en-gb'),
    mapInput('languages/de'),
    mapInput('languages/fr')
  ),
  output: [
    {
      dir: path.dirname(pkg.main),
      format: 'cjs'
    }
  ],
  plugins: [babel({ exclude: 'node_modules/**', ...babelConfig })],
  external: id => {
    return (
      ['react', 'react-dom', 'hyphen'].indexOf(id) !== -1 ||
      /^hyphen\/patterns\//.test(id)
    );
  }
};

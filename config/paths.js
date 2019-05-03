'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveRoot = (relativePath = '') =>
  path.resolve(appDirectory, relativePath);

module.exports = {
  resolveRoot,
  src: resolveRoot('src'),
  packageJson: resolveRoot('package.json'),
  babelConfig: resolveRoot('babel.config.js'),
  rollupConfig: resolveRoot('config/rollup.config.js')
};

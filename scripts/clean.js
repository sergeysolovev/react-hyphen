const fs = require('fs-extra');
const paths = require('../config/paths');

const clean = () => {
  fs.removeSync(paths.resolveRoot('index.js'));
  fs.removeSync(paths.resolveRoot('languages'));
  fs.removeSync(paths.resolveRoot('esm'));
};

module.exports = clean;

clean();

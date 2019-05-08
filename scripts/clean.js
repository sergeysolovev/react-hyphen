const fs = require('fs-extra');
const paths = require('../config/paths');

const clean = () => {
  fs.removeSync(paths.resolveRoot('dist'));
};

module.exports = clean;

clean();

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
    mapInput('languages/af'),
    mapInput('languages/as'),
    mapInput('languages/be'),
    mapInput('languages/bg'),
    mapInput('languages/bn'),
    mapInput('languages/ca'),
    mapInput('languages/cop'),
    mapInput('languages/cs'),
    mapInput('languages/cu'),
    mapInput('languages/cy'),
    mapInput('languages/da'),
    mapInput('languages/de-ch'),
    mapInput('languages/de'),
    mapInput('languages/el-monoton'),
    mapInput('languages/el-polyton'),
    mapInput('languages/en-gb'),
    mapInput('languages/en-us'),
    mapInput('languages/es'),
    mapInput('languages/et'),
    mapInput('languages/eu'),
    mapInput('languages/fi'),
    mapInput('languages/fr'),
    mapInput('languages/fur'),
    mapInput('languages/ga'),
    mapInput('languages/gl'),
    mapInput('languages/grc'),
    mapInput('languages/gu'),
    mapInput('languages/hi'),
    mapInput('languages/hr'),
    mapInput('languages/hsb'),
    mapInput('languages/hu'),
    mapInput('languages/hy'),
    mapInput('languages/ia'),
    mapInput('languages/id'),
    mapInput('languages/is'),
    mapInput('languages/it'),
    mapInput('languages/ka'),
    mapInput('languages/kmr'),
    mapInput('languages/kn'),
    mapInput('languages/la-classic'),
    mapInput('languages/la-liturgic'),
    mapInput('languages/la'),
    mapInput('languages/lt'),
    mapInput('languages/lv'),
    mapInput('languages/ml'),
    mapInput('languages/mn-cyrl'),
    mapInput('languages/mr'),
    mapInput('languages/mul-ethi'),
    mapInput('languages/nb'),
    mapInput('languages/nl'),
    mapInput('languages/nn'),
    mapInput('languages/no'),
    mapInput('languages/oc'),
    mapInput('languages/or'),
    mapInput('languages/pa'),
    mapInput('languages/pi'),
    mapInput('languages/pl'),
    mapInput('languages/pms'),
    mapInput('languages/pt'),
    mapInput('languages/rm'),
    mapInput('languages/ro'),
    mapInput('languages/ru'),
    mapInput('languages/sa'),
    mapInput('languages/sh-cyrl'),
    mapInput('languages/sh-latn'),
    mapInput('languages/sk'),
    mapInput('languages/sl'),
    mapInput('languages/sr-cyrl'),
    mapInput('languages/sv'),
    mapInput('languages/ta'),
    mapInput('languages/te'),
    mapInput('languages/th'),
    mapInput('languages/tk'),
    mapInput('languages/tr'),
    mapInput('languages/uk'),
    mapInput('languages/zh-latn')
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

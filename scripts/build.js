'use strict';

const paths = require('../config/paths');
const clean = require('./clean');
const chalk = require('chalk');
const rollup = require('rollup');
const rollupConfig = require(paths.rollupConfig);

async function build() {
  try {
    console.log('Building package bundle...');
    const bundle = await rollup.rollup(rollupConfig);
    for (const outputOptions of rollupConfig.output) {
      await bundle.write(outputOptions);
    }
    console.log(chalk.green('Done.\n'));
  } catch (error) {
    console.log(chalk.red('Something went wrong.\n'));
    console.error(error);
    process.exit(1);
  }
}

clean();
build();

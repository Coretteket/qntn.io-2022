const postcssShortVar = require('postcss-short-var');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

const config = {
  plugins: [
    postcssShortVar,
    postcssPresetEnv({
      stage: 0,
    }),
    // cssnano,
  ],
};

module.exports = config;

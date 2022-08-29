const postcssShortVar = require('postcss-short-var');
const postcssPresetEnv = require('postcss-preset-env');

const config = {
  plugins: [
    postcssShortVar,
    postcssPresetEnv({
      stage: 0,
    }),
  ],
};

module.exports = config;

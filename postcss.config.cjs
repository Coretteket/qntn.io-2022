const postcssShortVar = require('postcss-short-var');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

const config = {
  plugins: [
    postcssShortVar,
    postcssPresetEnv({
      stage: 0,
      importFrom: './src/app.css',
      // TODO: stay alert to future importFrom deprecation
      features: { 'custom-properties': { disableDeprecationNotice: true } },
    }),
    cssnano,
  ],
};

module.exports = config;

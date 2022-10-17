module.exports = {
  plugins: [
    require('postcss-fluid-type')({ min: '400px', max: '800px' }),
    require('postcss-simple-include'),
    require('postcss-preset-env')({ stage: 3, features: { 'nesting-rules': true } }),
  ],
};

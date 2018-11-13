module.exports = config => {
  config.set({
    frameworks: ['jasmine'],

    files: [
      { pattern: 'src/test.js', watched: false }
    ],

    preprocessors: {
      'src/test.js': ['webpack']
    },

    webpack: require('./webpack.config'),

    browsers: ['ChromeHeadless']
  })
};

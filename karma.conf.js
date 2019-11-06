// Karma configuration
// Generated on Wed Feb 28 2018 15:39:11 GMT+0530 (India Standard Time)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["jasmine", "karma-typescript"],


    // list of files / patterns to load in the browser
    files: [
      './src/test/**/*.ts',
      './testAssets/tools/**/*.ts',
      './src/script/model/**/*.ts',
      './src/script/design/**/*.ts',
      './src/script/*.ts',
      './src/script/treeView/lib/*.ts',
      
      
      //JSON Fixture
      {
        pattern: './testAssets/**/*.json',
        watched: true,
        served: true,
        included: false
      },

      {
        pattern: './testAssets/**/*.png',
        watched: false,
        included: false,
        served: true,
        nocache: false
      },

      {
        pattern: './testAssets/**/*.vi',
        watched: false,
        included: false,
        served: true,
        nocache: false
      },
      
    ],



    // list of files / patterns to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './**/*.ts': ['karma-typescript']
    },

    typescriptPreprocessor: {
      options: {
        sourceMap: true, // generate source maps
        noResolve: false // enforce type resolution
      },
      transformPath: function (path) {
        return path.replace(/\.ts$/, '.js');
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'karma-typescript'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    browserNoActivityTimeout: 100000,


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
module.exports = function(config) {
  config.set({

    frameworks: ['mocha','sinon'],
    basePath:'app/',
    files: [
      'bower_components/modernizr/modernizr.js',
      'bower_components/modernizr/**/*.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/assert/assert.js',
      'bower_components/should/should.js',
      'bower_components/bootstrap/**/*.js',
      'bower_components/dustjs/dist/**/*.js',
      'dust_source/*.html',
      'scripts/*.js',
      '../test/**/*.js',
      'index.html'

    ],
    exclude: [
      'bower_components/modernizr/grunt.js',
      'bower_components/modernizr/test/**/*.js'
    ],
    preprocessors: {
      '*.html'   : ['html2js'],
      'dust_source/*.html'   : ['html2js']

    },
    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_DEBUG,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: false
  });
};

// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-06-19 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      "test/phantomjs-fix.js",
      // bower:js
      'app/components/jquery/dist/jquery.js',
      'app/components/angular/angular.js',
      'app/components/angular-animate/angular-animate.js',
      'app/components/bootstrap/dist/js/bootstrap.js',
      'app/components/angular-bootstrap/ui-bootstrap-tpls.js',
      'app/components/angular-ui-router/release/angular-ui-router.js',
      'app/components/ngInfiniteScroll/build/ng-infinite-scroll.js',
      'app/components/angular-ui-select/dist/select.js',
      'app/components/angular-sanitize/angular-sanitize.js',
      'app/components/angular-mocks/angular-mocks.js',
      // endbower
      <!-- injector:js -->
      './app/scripts/emails/common/filterService.js',
      './app/scripts/emails/list/listController.js',
      './app/scripts/emails/list/listSideBarController.js',
      './app/scripts/emails/view/fullViewDirective.js',
      './app/scripts/emails/view/shortViewDirective.js',
      './app/scripts/emails/view/viewController.js',
      './app/scripts/emails/view/viewSideBarController.js',
      './app/scripts/common/appSettings.js',
      './app/scripts/common/pagedData.js',
      './app/scripts/common/routingConfig.js',
      './app/scripts/emails/email.js',
      './app/scripts/emails/emailsApi.js',
      './app/scripts/emails/emailsLoader.js',
      './app/scripts/emails/emailsParser.js',
      './app/scripts/common/module.js',
      './app/scripts/emails/module.js',
      './app/scripts/app.js',
      <!-- endinjector -->
      "test/mock/**/*.js",
      "test/spec/**/factory.js",
      "test/spec/**/*.js",
      'app/scripts/**/*.html'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-chrome-launcher",
      "karma-jasmine",
      "karma-ng-html2js-preprocessor"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'

    preprocessors: {
      'app/scripts/**/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
      moduleName: 'ngHtmlFiles'
    }
  });
};

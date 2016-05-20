// Generated on 2015-06-19 using generator-angular 0.11.1
'use strict';

var path = require('path');

module.exports = function (grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['app/scripts/**/*.js'],
        tasks: ['inject']
      },
      jsTest: {
        files: ['test/**/*.js'],
        tasks: ['inject:test', 'karma']
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['inject']
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      app: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static(appPaths.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('test'),
              connect.static(appPaths.app)
            ];
          }
        }
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      options: {
        exclude: [
        ],
        "overrides": {
          "bootstrap": {
            "main": [
              "dist/js/bootstrap.js",
              "dist/css/bootstrap.css",
              "less/bootstrap.less"
            ]
          }
        }
      },
      app: {
        src: ['app/index.html'],
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    /**
     * When typescript compiles a file it needs to have references to all files definitions from which are used in the file.
     * This task keeps all such references in one file that in its turn is referenced in all ts files.
     */
    'sails-linker': {
      app: {
        options: {
          startTag: '///<!-- inject:ts -->',
          endTag: '///<!-- endinject -->',
          fileTmpl: '/// <reference path="%s" />',
          appRoot: 'app/scripts/'
        },
        files: {
          'app/scripts/tsd.d.ts': ['app/scripts/**/*.ts', '!app/scripts/tsd.d.ts']
        }
      },
      test: {
        options: {
          startTag: '///<!-- inject:ts -->',
          endTag: '///<!-- endinject -->',
          fileTmpl: '/// <reference path="%s" />',
          appRoot: 'test/'
        },
        files: {
          'test/tsd.d.ts': ['test/**/*.ts', '!test/tsd.d.ts']
        }
      }
    },

    /**
     *  Injects all js files in the right order.
     *  By right order we mean order in which all angular's module files are placed before module definition.
     */
    injector: {
      options: {
        lineEnding: grunt.util.linefeed,
        modulesOrder: [
        ],
        baseClasses: [
        ],
        sort: function (file1, file2) {
          function fileScore(file) {
            var score = 0;

            var depth = file.split('/').length;
            score -= depth * 100000;

            var dir = path.dirname(file);
            for(var i = 0; i < grunt.config.data.injector.options.modulesOrder.length; i++) {
              if(dir.indexOf(grunt.config.data.injector.options.modulesOrder[i]) != -1) {
                score += i * 1000;
                break;
              }
            }

            var fileName = path.basename(file, '.js');
            var fileIsModuleDefinition = fileName == "module";
            if(fileIsModuleDefinition) {
              score += 100;
            }

            grunt.config.data.injector.options.baseClasses.forEach(function(baseClass)  {
              if(file.indexOf(baseClass) !== -1) {
                score -= 10;
              }
            });

            return score;
          }

          var file1Score = fileScore(file1);
          var file2Score = fileScore(file2);

          if(file1 > file2) {
            file1Score++;
          } else {
            file2Score++;
          }

          return file1Score - file2Score;
        }
      },
      app: {
        files: {
          'app/index.html': ['app/scripts/**/*.js']
        }
      },
      test: {
        options: {
          transform: function(file) {
            return "'." + file + "',";
          }
        },
        files: {
          'test/karma.conf.js': ['app/scripts/**/*.js']
        }
      }
    },

    /**
     * Fixes paths inside html files
     */
    'string-replace': {
      app_html: {
        files: {
          'app/index.html': 'app/index.html'
        },
        options: {
          replacements: [{
            pattern: /\/app\/scripts\//ig,
            replacement: "scripts/"
          }]
        }
      }
    }
  });

  grunt.registerTask('inject', [
    'wiredep',
    'sails-linker',
    'injector',
    'string-replace'
  ]);
  grunt.registerTask('test', [
    'connect:test',
    'karma'
  ]);
  grunt.registerTask('default', [
    'connect:app',
    'watch'
  ]);
};

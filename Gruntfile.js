module.exports = function (grunt) {
  grunt.initConfig({

    nodemon: {
      dev: {
        script: 'server/app.js',
        options: {
          env: {
            HTTP_LOGGING:'dev'
          },
          nodeArgs: ['--harmony'],
          ext: 'js',
          ignore: ['node_modules/**', 'app/assets/**'],
          args: grunt.option.flags()
        }
      }
    },

    watch: {
      test: {
        files: ['**/*.js'],
        tasks: ['mochaTest']
      },
      css: {
        files: []
      }
    },

    concurrent: {
      target: {
        tasks: ['watch', 'nodemon'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    sass: {
      compile: {
        files: [
          {
            expand: true,
            cwd: "client/assets/sass",
            src: ["**/*.scss"],
            dest: "client/assets/css",
            ext: ".css"
          }
        ]
      }
    },

    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'bower_components/',
          src: ['**/*.min.js'],
          dest: 'client/assets/js'
        }]
      }
    }

  });
  [
    'grunt-contrib-watch',
    'grunt-nodemon',
    'grunt-concurrent',
    'grunt-mocha-test',
    'grunt-sass',
    'grunt-contrib-copy'
  ].forEach(function (task) {
      grunt.loadNpmTasks(task);
    });

  grunt.registerTask('default', ['build', 'concurrent:target']);

  grunt.registerTask('build', ['sass', 'mochaTest', 'copy']);

  grunt.registerTask('test', ['mochaTest']);
};

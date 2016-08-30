module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
        options: {
          targetDir: './src/public/',
          layout : function (type, component) {
            if (type === 'css') {
              return 'css';
            } else if (type === 'js') {
               return 'js';
            } else if (type === 'fonts') {
              return 'fonts';
            } else {
              return '';
            }
          },
          install: true,
          verbose: false,
          cleanTargetDir: false,
          cleanBowerDir: false
        }
      },
    }
    // npmcopy: {
    //   // Javascript
    //   libs: {
    //     options: {
    //         destPrefix: './src/public/js'
    //     },
    //     files: {
    //       'react.js': 'react/dist/react.js',
    //       'react.min.js': 'react/dist/react.min.js',
    //       'react-with-addons.js': 'react/dist/react-with-addons.js',
    //       'react-with-addons.min.js': 'react/dist/react-with-addons.min.js',
    //       'ReactRouter.js': 'react-router/umd/ReactRouter.js',
    //       'ReactRouter.min.js': 'react-router/umd/ReactRouter.min.js'
    //     }
    //   }
    // }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.loadNpmTasks('grunt-bower-task');
//  grunt.loadNpmTasks('grunt-npmcopy');
  grunt.registerTask('default', ['bower:install']);
};

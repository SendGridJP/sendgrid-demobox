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
    },
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   build: {
    //     src: 'src/<%= pkg.name %>.js',
    //     dest: 'build/<%= pkg.name %>.min.js'
    //   }
    // },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  //grunt.registerTask('default', ['uglify']);
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.registerTask('default', ['bower:install']);
};

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
    npmcopy: {
      // Javascript
      libs: {
        options: {
            destPrefix: './src/public/js'
        },
        files: {
          'react-flip-move.js': 'react-flip-move/dist/react-flip-move.js',
          'react-flip-move.min.js': 'react-flip-move/dist/react-flip-move.min.js'
        }
      }
    },
    webpack: {
      build: {
        // webpack options
        entry: './src/client/root.jsx',
        output: {
          path: './src/public/js',
          filename: 'main.js'
        },
        module: {
          loaders: [{
            test: /\.jsx?$/, // 拡張子がjsxで
            exclude: /node_modules/, // node_modulesフォルダ配下でなければ
            loader: 'babel', // babel-loaderを使って変換する
            query: {
              plugins: ["transform-react-jsx"] // babelのtransform-react-jsxプラグインを使ってjsxを変換
            }
          }]
        },
        failOnError: true, // don't report error to grunt if webpack find errors
      }
    },
    uglify: {
      dist: {
        files: {
          // 出力ファイル: 元ファイル
          './src/public/js/main.min.js': './src/public/js/main.js'
        }
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-npmcopy');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['bower:install', 'npmcopy:libs', 'webpack:build', 'uglify']);
};

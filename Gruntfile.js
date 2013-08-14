module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
        src: '<%= pkg.name %>.js'
    },
    jasmine: {
      src: '<%= pkg.name %>.js',
      options: {
        specs: 'tests/spec/RubyJS-Spec.js',
        version: '1.3.1'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task.
  grunt.registerTask('default', ['jshint','jasmine','uglify']);

  // Travis CI task.
  grunt.registerTask('travis', ['jshint','jasmine']);
};

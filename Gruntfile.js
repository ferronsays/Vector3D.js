module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
          build: {
            src: 'Vector3D.js',
            dest: 'Vector3D.min.js'
          }
        },
        watch: {
          scripts: {
            files: ['*.js'],
            tasks: ['uglify'],
            options: {
              spawn: false,
            },
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify', 'watch']);

};

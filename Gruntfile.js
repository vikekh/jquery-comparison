module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title %> v<%= pkg.version %> | (C) 2014 vikekh | http://www.gnu.org/licenses/gpl-3.0.txt */',
        concat: {
            options: {
                stripBanners: true,
                banner: '<%= banner %>\n\n'
            },
            css: {
                src: ['src/css/<%= pkg.name %>.css'],
                dest: 'dist/css/<%= pkg.name %>.css'
            },
            js: {
                src: ['src/js/<%= pkg.name %>.js'],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>\n'
            },
            dist: {
                src: ['src/js/<%= pkg.name %>.js'],
                dest: 'dist/js/<%= pkg.name %>.min.js'
            }
        },
        cssmin: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: ['src/css/<%= pkg.name %>.css'],
                dest: 'dist/css/<%= pkg.name %>.min.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);

};
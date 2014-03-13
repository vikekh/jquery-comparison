module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        common: {
            banner: '/* <%= pkg.title %> v<%= pkg.version %> */',
            dest: 'build',
            src: 'src'
        },
        uglify: {
            options: {
                banner: '<%= common.banner %>\n'
            },
            build: {
                files: {
                    '<%= common.dest %>/js/<%= pkg.name %>.min.js': ['<%= common.src %>/js/<%= pkg.name %>.js']
                }
            }
        },
        cssmin: {
            options: {
                banner: '<%= common.banner %>'
            },
            build: {
                files: {
                    '<%= common.dest %>/css/<%= pkg.name %>.min.css': ['<%= common.src %>/css/<%= pkg.name %>.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['uglify', 'cssmin']);

};
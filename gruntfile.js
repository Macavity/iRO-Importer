

module.exports = function(grunt) {
    "use strict";

    var settings = grunt.file.readJSON("src/settings.json");

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        /*
         * Copy Task
         */
        copy: {
            chrome: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/chrome',
                        src: '**/*',
                        dest: 'build/chrome',
                        filter: 'isFile'
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/bootstrap-sass/assets/fonts/bootstrap',
                        src: '*',
                        dest: 'build/css/',
                        filter: 'isFile'
                    }
                ]
            },
            css: {
                files: [
                    {
                        expand: true,
                        src: 'build/css/*',
                        dest: 'build/chrome/css/',
                        filter: 'isFile'
                    },{
                        expand: true,
                        src: 'build/css/*',
                        dest: 'build/firefox/css/',
                        filter: 'isFile'
                    },{
                        expand: true,
                        src: 'build/css/*',
                        dest: 'build/safari/css/',
                        filter: 'isFile'
                    }
                ]
            }
        },

        clean: {
            chrome: ["build/chrome"]
        },

        sass: {
            build: {
                files: {
                    'build/css/main.css': 'sass/main.scss'
                }
            }
        },

        /*
         * Watches for changes in files and executes the tasks
         */
        watch: {
            sass: {
                files: [
                    "sass/*.scss"
                ],
                tasks: [
                    "sass:build",
                    "copy:css"
                ]
            },

            /**
             * Watch for js changes during development and build Dev-Files
             */
            chrome: {
                files: [
                    "src/chrome/**/*"
                ],
                tasks: [
                    "copy:chrome"
                ]
            }

        }
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-shell");

    // Used during development
    grunt.registerTask("default", function(){
        grunt.log.writeln("build all extensions");
        grunt.task.run([
            "clean:chrome",
            "sass:build",
            "copy:fonts",
            "copy:css",
            "copy:chrome"
        ]);
    });

    grunt.event.on("watch", function(action, filepath) {
        grunt.log.writeln(filepath + " has " + action);
    });
};



module.exports = function(grunt) {
    "use strict";

    var settings = grunt.file.readJSON("src/settings.json");
    var pkg = grunt.file.readJSON("package.json");

    grunt.initConfig({

        browserify: {
            libs: {
                options: {
                    shim: {
                        jquery: {
                            path: './node_modules/jquery/dist/jquery.min.js',
                            exports: '$'
                        }
                    }
                },
                src: [
                    './node_modules/jquery/dist/jquery.min.js'
                ],
                dest: 'build/chrome/js/libs.js'
            },
            main: {
                src: "src/js/main.ts",
                dest: "src/js/main.js",
                options: {
                    alias: {
                        jquery: './node_modules/jquery/dist/jquery.min.js'
                    },
                    external: {
                        jquery: './node_modules/jquery/dist/jquery.min.js'
                    },
                    browserifyOptions: {
                        debug: true
                    },
                    plugin: ['tsify']
                }
            },
            watch: {
                src: "src/js/main.ts",
                dest: "src/js/main.js",
                options: {
                    watch: true,
                    browserifyOptions: {
                        debug: true
                    },
                    plugin: ['tsify']
                }
            }
        },

        /*
         * Copy Task
         */
        copy: {
            chrome: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/chrome',
                        src: [
                            '**/*'
                        ],
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
                        dest: 'build/chrome/css/'
                    }
                ]
            },
            css: {
                files: [
                    {   cwd: 'src/sass/', src: ['main.css', 'main.css.map'], dest: 'build/chrome/css/', expand: true }
                ]
            },
            js : {
                files: [
                    {   cwd: 'src/js/', src: ['main.js'], dest: 'build/chrome/js/', expand: true}
                ]
            },
            lib: {
                files: [
                    {
                        expand: true,
                        flatten:true,
                        src: [
                            'node_modules/jquery/dist/jquery.min.js'
                        ],
                        dest: 'build/chrome/js/'
                    }
                ]
            }
        },

        clean: {
            chrome: ["build/chrome"]
        },

        sass: {
            main: {
                files: {
                    'src/sass/main.css': 'src/sass/main.scss'
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
                    "sass:main",
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
            },

            ts: {
                files: [
                    "src/js/*.ts"
                ],
                tasks: ["browserify:watch","copy:js"]
            }

        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-shell");

    // Used during development
    grunt.registerTask("default", function(){
        grunt.log.writeln("build all extensions");
        grunt.task.run([
            "chrome"
        ]);
    });

    grunt.registerTask("chrome", function(){
        grunt.log.writeln("Build Chrome extensions");

        grunt.task.run([
            "clean:chrome",
            "browserify:main",
            "sass:main",
            "copy:fonts",
            "copy:css",
            "copy:js",
            "copy:chrome",
            "copy:lib"
        ]);
    });

    grunt.event.on("watch", function(action, filepath) {
        grunt.log.writeln(filepath + " has " + action);
    });
};

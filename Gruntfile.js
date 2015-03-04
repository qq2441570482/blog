module.exports = function(grunt){

    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            static_mappings:{
                files:[
                    {
                        src: './bower_components/bootstrap/dist/js/bootstrap.js',
                        dest: './app/assets/javascripts/bootstrap.min.js'
                    }
                ]
            }

        },
        concat_css: {
            all: {
                src: ["./bower_components/bootstrap/dist/css/bootstrap.css"],
                dest: "./app/assets/stylesheets/bootstrap.min.css"
            }
        }
    });

    // 加载提供"uglify"任务的插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-concat-css');

    // 默认任务
    grunt.registerTask('default', ['uglify', 'concat_css']);
}
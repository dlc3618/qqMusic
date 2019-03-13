var gulp = require("gulp");
//压缩html
var htmlClean = require("gulp-htmlclean");
//压缩图片
var imageMin = require("gulp-imagemin");
//压缩js插件
var uglify = require("gulp-uglify");
//去掉js中的调试语句
var debug = require("gulp-strip-debug");
//将less转换为css
var less = require("gulp-less");
//压缩css 
var cleanCss = require("gulp-clean-css");
//postcss autoprofixer 补前缀
var postCss =require("gulp-postcss");
var autoprefixer = require("autoprefixer");
//开启服务器
var connect = require("gulp-connect");

var folder = {
    src:"src/",
    dist:"dist/"
}
//判断当前环境变量
var devMod = process.env.NODE_ENV == "development";
console.log(devMod);
//export NODE_ENV=development 在git中设置环境变量

gulp.task("html",function(){
   var page = gulp.src(folder.src + "html/*")
        .pipe(connect.reload());
        if(!devMod){
            page.pipe(htmlClean())
        }
        page.pipe(gulp.dest(folder.dist + "html/"))
})
gulp.task("img",function(){
    gulp.src(folder.src + "img/*")
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + "img/"))
})
gulp.task("css",function(){
    var page = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer()]))
        if(!devMod){
            page.pipe(cleanCss())
        }
        page.pipe(gulp.dest(folder.dist + "css/"))
})
gulp.task("js",function(){
    var page = gulp.src(folder.src + "js/*")
        .pipe(connect.reload())//开启自动刷新
        if(!devMod){
            page.pipe(debug())
            .pipe(uglify())
        }
        page.pipe(gulp.dest(folder.dist + "js/"))
})

gulp.task("server",function(){
    connect.server({
        port:"8888",
        liveload:true //自动刷新
    })
})
//监听文件变化
gulp.task("watch",function(){
    gulp.watch(folder.src + "html/*",["html"]);
    gulp.watch(folder.src + "css/*",["css"]);
    gulp.watch(folder.src + "js/*",["js"]);//css,js,html都得开启
})
gulp.task("default",["html","css","js","img","server","watch"])
//less---->自动添加css3前缀------->压缩----->css文件


var gulp = require('gulp'),
  connect = require('gulp-connect');

gulp.task('myServer', function() {
  connect.server({
    root: 'app',
    port: 8000,
    livereload: true
  });
});

var gulp=require("gulp");
var uglify = require("gulp-uglify");
var minifyCss = require("gulp-minify-css");
var minifyHtml = require("gulp-minify-html");
var webserver=require("gulp-webserver")
var sass=require("gulp-sass") //编译scss到css
//gulp.task("copy",function(){
//	//读取文件，写入final
//	gulp.src("./src/**/*.*").pipe(gulp.dest("./final"))
//})
gulp.task("copy-html", ()=>{
	//读取所有文件 ,//写入到final目录
	gulp.src("./source/**/*.html").pipe( gulp.dest("./final") )
	gulp.src("./source/images/*.*").pipe( gulp.dest("./final/images") )
	gulp.src("./source/js/lips/*.js").pipe( gulp.dest("./final/js/lips") )
})

gulp.task('minify-js', function () {
    gulp.src('./source/js/*.js') // 要压缩的js文件
    .pipe(uglify())  //使用uglify进行压缩,更多配置请参考：
    .pipe(gulp.dest('final/js')); //压缩后的路径
});

gulp.task('minify-css', function () {
    gulp.src('./source/css/**/*.css') // 要压缩的css文件
    .pipe(minifyCss()) //压缩css
    .pipe(gulp.dest('final/css'));
}); 

gulp.task('build-css', function () {
    gulp.src('./source/scss/**/*.scss') // 要压缩的css文件
    .pipe(sass()) //编译sass
    .pipe(gulp.dest('final/css'));
}); 

gulp.task('minify-html', function () {
    gulp.src('source/*.html') // 要压缩的html文件
    .pipe(minifyHtml()) //压缩
    .pipe(gulp.dest('final'));
});
gulp.task('default',function(){
    //进行文件监控，文件变动触发执行任务
    gulp.watch('./source/js/*.js', ['minify-js']);
    gulp.watch('./source/css/**/*.css', ['minify-css']);
    gulp.watch('./source/scss/**/*.scss', ['bulid-css']);
    gulp.watch('./source/**/*.html', ['copy-html']);
});

gulp.task('webserver',['default'], function() {
  gulp.src('final')
    .pipe(webserver({
     livereload: true,
//   directoryListing: true,
     open: true,
     port:9900,
      proxies:[{
      	source: '/agent',
        target: 'http://gouwu.360.cn/list/fetch?'
      }]
    }));
});

gulp.task('build',['minify-js','minify-css','build-css','minify-html'])
gulp.task('build',['minify-js','minify-css','bulid-css'])
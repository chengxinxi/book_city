//引入模块
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var less = require('gulp-less');
var sequence = require('gulp-sequence');
var url = require('url');
var mock = require('./src/data/mock.js');
var mincss = require('gulp-clean-css');
var uglifyjs = require('gulp-uglify');
var es6 = require('gulp-babel');
var htmlmin = require('gulp-htmlmin');
//把style.less转换成style.css
gulp.task('textless', function() {
    gulp.src('./src/css/*.css')
        .pipe(less())
        .pipe(mincss())
        .pipe(gulp.dest('dist/css'))
});

//压缩
gulp.task('uglifyjs', function() {
    gulp.src(['./src/js/{common/,lib/,page/}*.js', './src/js/main.js', './src/js/search.js'])
        .pipe(es6({
            presets: 'es2015'
        }))
        .pipe(uglifyjs())
        .pipe(gulp.dest('dist/js'))
});
//压缩html
gulp.task('htmlmin', function() {
    gulp.src('src/**/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest("dist/html"))
})


//监听
// gulp.task('listen', function() {
//     gulp.watch('./src/css/*.less', ['textless'])
// });
//起个服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(webserver({
            port: 8090,
            host: "localhost",
            livereload: true,
            middleware: function(req, res, next) {
                var urlname = url.parse(req.url, true);
                if (/\/book/.test(urlname.pathname)) {
                    res.end(JSON.stringify(mock(req.url)));
                }
                next();
            }
        }))

})

//默认
gulp.task('default', function(cb) {
    sequence('textless', "uglifyjs", "server", cb) //"htmlmin"
});
var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var sass = require('gulp-ruby-sass')
var autoprefixer = require('gulp-autoprefixer')
var minifycss = require('gulp-minify-css')

gulp.task('serve',['sass'], function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/app.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('sass', function () {
    return sass('scss/app.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('css/'))
        .pipe(autoprefixer({browsers: 'last 2 versions'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});



gulp.task('default', ['serve']);
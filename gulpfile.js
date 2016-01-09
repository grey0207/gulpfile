var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css')
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

gulp.task('serve',['sass'], function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/app.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("js/*.js", ['js']).on('change', browserSync.reload);
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

gulp.task('js', function () {
    return gulp.src('js/*js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('images', function() {
  return gulp.src('images/*')
    .pipe(cache(imagemin({optimizationLevel: 5})))
    .pipe(gulp.dest('dist/images'));
});


gulp.task('watch', function() {
  gulp.watch('images/*', ['images']);
});

gulp.task('default', ['serve','watch','images']);
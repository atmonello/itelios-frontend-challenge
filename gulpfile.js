// Gulp vars required for each task
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var runSequence = require('run-sequence');

// Compiles SASS into CSS
gulp.task('sass', function(){
    return gulp.src('dev/sass/**/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('docs/assets/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

// Minify images
gulp.task('images', function(){
    return gulp.src('dev/assets/img/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
        interlaced: true
    })))
    .pipe(gulp.dest('docs/assets/img/'))
});

// Runs BrowserSync
gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: 'docs'
        }
    })
});

// Watches files
gulp.task('watch', ['browserSync', 'sass'], function(){
    gulp.watch('dev/**/*.sass', ['sass']);
    gulp.watch('dev/*.html', browserSync.reload);
    gulp.watch('dev/**/*.js', browserSync.reload);
});

// Default task to run all other images
gulp.task('default', function(callback){
    runSequence(['sass', 'images', 'browserSync', 'watch'],
    callback )
});



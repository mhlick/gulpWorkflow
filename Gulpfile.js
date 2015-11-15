// initalize Gulp.js
var gulp = require('gulp');

// initalize Plugins
var clean = require('gulp-clean'),
    imagemin = require ('gulp-imagemin'),
    concat = require ('gulp-concat'),
    uglify = require ('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyhtml = require ('gulp-minify-html'),
    autoprefixer = require ('gulp-autoprefixer'),
    sass = require('gulp-sass');

//start the runAll and watch task at the beginning
gulp.task('default', ['runAll']);

//run all tasks
gulp.task('runAll', ['images', 'icons', 'vendor', 'js', 'html', 'styles',  'watch']);

//watch for changes
gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss',['styles']);
    gulp.watch('src/vendor/*.js',['vendor']);
    gulp.watch('src/js/*.js',['js']);
    gulp.watch('src/HTML/*.html',['html']);
    gulp.watch('src/icons/**/*',['icons']);
    gulp.watch('src/images/**/*',['images']);
});

//Clean up the build directory
gulp.task('clean', function () {
    return gulp.src('assets/', {read: false})
        .pipe(clean())
});

//Compress all images
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('assets/img'))
});

//Compress all icons
gulp.task('icons', function() {
    return gulp.src('src/icons/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('assets/icons'))
});

//Compress and combine vendors
gulp.task('vendor', function() {
    return gulp.src('src/vendor/*.js')
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(rename('vendor.min.js'))
        .pipe(gulp.dest('assets/js/'))
});

//Compress and combine JS files
gulp.task('js', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('assets/js/'))
});

//Compress the HTML file
gulp.task('html', function () {
    return gulp.src('src/HTML/*.html')
        .pipe(minifyhtml())
        .pipe(gulp.dest('./'))
});

//Compress, compile and autoprefix SASS (SCSS) files
gulp.task('styles', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions']
        }))
        .pipe(gulp.dest('assets/css/'))
});

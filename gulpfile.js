var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var package = require('./package.json');

gulp.task('default', function () {
    return gulp.src('src/querystring.js')
        .pipe(replace('@version', package.version))
        .pipe(uglify({
            preserveComments: 'some'
        }))
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('dist/'));
});
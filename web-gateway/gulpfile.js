var gulp = require('gulp'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env')

gulp.task('test', function () {
    env({vars:{ENV:'Test'}});
    gulp.src('tests/*.js', {read: false})
        .pipe(gulpMocha({reporter: 'nyan'}))
});
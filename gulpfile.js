var gulp = require('gulp');
var useref = require('gulp-useref');

gulp.task('build', function () {
  return gulp.src('site/index.html')
    .pipe(useref.assets())
    .pipe(useref.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

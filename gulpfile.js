var gulp = require('gulp');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var htmlReplace = require('gulp-html-replace');

gulp.task('make', function(callback) {
  runSequence('clean', 'copy', 'snipcart', callback);
});

gulp.task('clean', function() {
  return gulp.src('public/', {'read': false})
    .pipe(clean());
});

gulp.task('copy', function() {
  return gulp.src('site/**/**')
    .pipe(gulp.dest('public/'))
});

gulp.task('snipcart', function () {
  var snipcart = "<script type='text/javascript' id='snipcart' data-api-key='YTQ5YWY2ZTAtNTZkZS00NDUyLTliN2ItYjRmYTJkNmM0ZTdj' src='https://app.snipcart.com/scripts/snipcart.js'></script>"
  return gulp.src('site/index.html')
    .pipe(htmlReplace({'snipcart': snipcart}))
    .pipe(gulp.dest('public/'));
});

var gulp = require('gulp');
var clean = require('gulp-clean');
var htmlreplace = require('gulp-html-replace');

var snipcart = "<script type='text/javascript' id='snipcart' data-api-key='YTQ5YWY2ZTAtNTZkZS00NDUyLTliN2ItYjRmYTJkNmM0ZTdj' src='https://app.snipcart.com/scripts/snipcart.js'></script>"

gulp.task('make', ['clean', 'copy', 'snipcart'], function() {
});

gulp.task('clean', function() {
  return gulp.src('dist/', {'read': false})
    .pipe(clean());
});

gulp.task('copy', function() {
  return gulp.src('site/**/**')
    .pipe(gulp.dest('dist/'))
});

gulp.task('snipcart', function () {
  return gulp.src('site/index.html')
    .pipe(htmlreplace({'snipcart': snipcart}))
    .pipe(gulp.dest('dist/'));
});


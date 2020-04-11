const gulp = require('gulp');
const {series} = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const eslint = require('gulp-eslint');
const jasmineBrowser = require('gulp-jasmine-browser');


function styles(cb) {
  gulp.src('sass/**/*.scss')
      .pipe(sass())
      .on('error', sass.logError)
      .pipe(
          autoprefixer({
            browserlist: ['last 2 versions'],
          })
      )
      .pipe(gulp.dest('./css'))
      .pipe(browserSync.stream());
  cb();
}

function watch() {
  gulp.watch('sass/**/*.scss', gulp.parallel(styles));
  gulp.watch('sass/**/*.scss') .on('change', reload);
  gulp.watch('*.html').on('change', reload);
  gulp.watch('js/**/*.js').on('change', reload);
  gulp.watch('js/**/*.js', gulp.series(lint));
  browserSync.init({
    server: './',
  })
}

function lint(cb) {
  gulp.src(['js/**/*.js'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  cb();
}

function jasmine() {
  return gulp.src(['js/**/*.js', 'spec/**/*._spec.js'])
  .pipe(jasmineBrowser.specRunner())
  .pipe(jasmineBrowser.server({port:8888}));
}

exports.styles = styles;
exports.default = series(styles, lint, jasmine, watch);

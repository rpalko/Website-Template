const gulp = require ('gulp');
const {series} = require ('gulp');
const sass = require ('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;


function styles (cb) {
  gulp.src('sass/**/*.scss')
    .pipe (sass())
    .on('error', sass.logError)
    .pipe(
      autoprefixer({
        browserlist:["last 2 versions"]
      })
    )
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
    cb();
}

function watch(cb){
  gulp.watch('sass/**/*.scss', gulp.parallel(styles));
  gulp.watch('sass/**/*.scss') .on('change', reload);
  gulp.watch('*.html').on('change', reload);
  gulp.watch('js/**/*.js').on('change', reload);
  browserSync.init({
    server: "./"
  });
  cb();
}

exports.styles = styles;
exports.default = series(styles, watch);

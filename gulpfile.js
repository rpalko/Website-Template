const gulp = require ('gulp');
const {series} = require ('gulp');
const sass = require ('gulp-sass');


function styles (cb) {
  gulp.src('sass/**/*.scss')
    .pipe (sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./css'))
    cb();
}

exports.styles = styles;
exports.default = series(styles);

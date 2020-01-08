const gulp = require('gulp');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

const { src, dest, parallel } =gulp;

const PATH = {
  TS: {
    src: 'src/**/*.ts',
    dist:'./dist/',
    map: '../maps'
  }
};

function tsTask() {
  return src(PATH.TS.src)
    .pipe(sourcemaps.init())
    .pipe(typescript())
    .pipe(sourcemaps.write(PATH.TS.map))
    .pipe(dest(PATH.TS.dist));
}

function watch(done) {
  gulp.watch(PATH.TS.src, tsTask);
  done();
}

function clean() {
  return del(['dist', 'maps']);
}

const build = gulp.series(clean, parallel(tsTask));

exports.default = gulp.series(build, watch);

import * as gulp from 'gulp';
import * as path from 'path';
import * as sass from 'gulp-sass';
import * as rename from 'gulp-rename';
import { build } from 'aurelia-cli';
const autoprefix = require('gulp-autoprefixer');

const SASS_INCLUDE_PATHS = [
  path.resolve('node_modules')
];
// https://github.com/ai/browserslist#queries
const AUTOPREFIXER_BROWSERS = {
  browsers: [
    'last 2 version',
    'not ie <= 8'
  ],
  cascade: false
};

// TODO:  something smart to not have to copy css and scss to
//        amd folder

function processCSS() {
  return gulp.src('src/styles/animators/*.scss')
    .pipe(sass({
      includePaths: SASS_INCLUDE_PATHS
    }).on('error', sass.logError))
    .pipe(autoprefix(AUTOPREFIXER_BROWSERS))
    .pipe(rename('pages.css'))
    .pipe(gulp.dest('dist/amd/'))
    .pipe(gulp.dest('dist/commonjs/'))
    .pipe(gulp.dest('dist/'));
}

function processCSSmin() {
  return gulp.src('src/styles/animators/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: SASS_INCLUDE_PATHS
    }).on('error', sass.logError))
    .pipe(autoprefix(AUTOPREFIXER_BROWSERS))
    .pipe(rename('pages.min.css'))
    .pipe(gulp.dest('dist/amd/'))
    .pipe(gulp.dest('dist/commonjs/'))
    .pipe(gulp.dest('dist/'));

}

function copyScss() {
  return gulp.src('src/styles/animators/*.scss')
    .pipe(gulp.dest('dist/amd/'))
    .pipe(gulp.dest('dist/commonjs/'))
    .pipe(gulp.dest('dist/'));
}

export default gulp.series(
  processCSS,
  processCSSmin,
  copyScss
);

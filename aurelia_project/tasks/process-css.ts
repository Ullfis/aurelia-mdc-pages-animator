import * as gulp from 'gulp';
import * as path from 'path';
import * as sourcemaps from 'gulp-sourcemaps';
import * as sass from 'gulp-sass';
import * as project from '../aurelia.json';
import {build} from 'aurelia-cli';
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

export default function processCSS() {
  return gulp.src(project.cssProcessor.source)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: SASS_INCLUDE_PATHS
    }).on('error', sass.logError))
    .pipe(autoprefix(AUTOPREFIXER_BROWSERS))
    .pipe(build.bundle());
}

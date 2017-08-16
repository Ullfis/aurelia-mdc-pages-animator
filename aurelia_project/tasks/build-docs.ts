// tslint:disable-next-line:no-var-requires
const project = require('../aurelia.json');
import * as gulp from 'gulp';
import * as path from 'path';
import * as plumber from 'gulp-plumber';
import * as notify from 'gulp-notify';
import * as htmlreplace from 'gulp-html-replace';
import { build } from 'aurelia-cli';

function copyIndex() {
  return gulp.src(['index.html', 'favicon.ico'])
    .pipe(plumber({ errorHandler: notify['onError']('Error: <%= error.message %>') }))
    .pipe(htmlreplace({ basereplace: '<base href="/aurelia-mdc-pages-animator/">' }))
    .pipe(gulp.dest('docs'));
}

function copyScripts() {
  return gulp.src('scripts/**/*.{html,css,json,js}')
    .pipe(plumber({ errorHandler: notify['onError']('Error: <%= error.message %>') }))
    .pipe(gulp.dest('docs/scripts'));
}

export default gulp.series(
  copyScripts,
  copyIndex
);

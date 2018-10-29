'use strict';

const eslint = require('gulp-eslint');
const gulp = require('gulp');
const fs = require('fs');
const mocha = require('gulp-mocha');
const shell = require('gulp-shell');

const paths = {
  analyze: [ '**/*.js', '!coverage/**/*.js', '!test/testPattern.js' ],
  tests: [ 'test/**/*Test.js', '!coverage/**/*.js' ]
};

/* eslint-disable no-process-exit */
gulp.task('mocha', () => {
  return gulp.src(paths.tests, { read: false }).
	pipe(mocha({ timeout: 105000 })).
	once('error', function (err) {
  /* eslint-disable no-console */
  console.log(err.stack);
  /* eslint-enable no-console*/
  process.exit(1);
	}).
	once('end', function () {
  process.exit();
	});
});

gulp.task('lint', function () {
  return gulp.src(paths.analyze).
		pipe(eslint({
      parserOptions: {
        ecmaVersion: 8
      }
    })).
    pipe(eslint.format()).
    pipe(eslint.failAfterError());
});

gulp.task('default', shell.task([
  'gulp lint'
]));

# gulp-ng-pug-to-inline

With this task-runner it's possible to convert in pug written angular components to inline-html components.

## Installation

```
npm i gulp-ng-pug-to-inline
```

## Gulpfile

```
gulp.task('inline', function() {
  gulp.src([ 'src/transModule/**/*.ts', '!src/transModule/**/*spec.ts'  ])
    .pipe(inline())
    .pipe(gulp.dest('src/transModule'));
});
```

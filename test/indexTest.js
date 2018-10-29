'use strict';

const assert = require('assertthat');
const fs = require('fs');
const path = require('path');
const gutil = require('gulp-util');
const runner = require('../lib');

describe('Test task runner...', () => {
  it('... is a function', (done) => {
    assert.that(runner).is.ofType('function');
    done();
  });

  it('... must read a file', (done) => {
    // const file = fs.readFileSync(path.resolve('test/testComponent/testComponent.ts')).toString();
    const task = runner();
    const filePath = path.resolve('test/testComponent/testComponent.ts');
    //
    // task.write(file);
    task.write(new gutil.File({
                path: filePath,
                contents: new Buffer(fs.readFileSync(filePath))
        }));
    done();
  });
});

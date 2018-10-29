'use strict';

const map = require('map-stream');
const es = require('event-stream');
const fs = require('fs');
const path = require('path');
const pug = require('pug');
const gutil = require('gulp-util');

const convert = (options) => {
  options = options || {};

  return es.map((file, cb) => {
    let i = 0;
    let newFile = '';

    const content = file.contents.toString().split(/\r?\n/)
    const pathArr = file.path.split('/');
    const fileName = pathArr[pathArr.length -1];

    console.log('### Converting File on Path: ' + file.path);

    content.forEach(line => {
      if (line.indexOf('templateUrl:') > -1) {
        const templateFile = eval(line.split(':')[1].replace(',', ''));
        const templatePath = path.resolve(file.path.replace(fileName, templateFile));

        const template = fs.readFileSync(templatePath).toString();
        const html = pug.render(template, { pretty: true });
        line = "template: ` " + html + " `,";
      }

      newFile = newFile + line + '\n';

      i++;
    });

    file.contents = new Buffer(newFile);

    cb(null, file);
  });
};

module.exports = convert;

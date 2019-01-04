/* jshint node: true */
'use strict';
let fs = require('fs');
let pkg = require('../package.json');

let domain = pkg.homepage;
fs.writeFileSync(__dirname + '/../docs/CNAME', domain.replace('https://', ''));

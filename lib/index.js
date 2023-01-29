/* jshint node: true */
'use strict';

const kss = require('kss');
const watch = require('./watch');

module.exports = {
	build: kss,
	watch,
};

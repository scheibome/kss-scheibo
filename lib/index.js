/* jshint node: true */
'use strict';

const kss = require('kss');
const chokidar = require('chokidar');

const watch = (path, callback) => {
	if (typeof callback !== 'function') {
		throw new Error('watch() requires a callback function');
	}

	chokidar
		// TODO: implement correct regex
		.watch(path, {
			ignored: 'regex',
		})
		.on('change', callback);
};

module.exports = {
	build: kss,
	watch,
};

/* jshint node: true */
'use strict';

let autoprefixer = require('autoprefixer');
let uncss = require('postcss-uncss');
let postcss = require('postcss');
let fs = require('fs');
let filePath = 'kss_styleguide/scheibo-template/kss-assets/';
let theProcess = 'live';

if (process.argv[2] === '--demo') {
	filePath = 'docs/kss-assets/';
	theProcess = 'demo';
}

fs.readFile(filePath + 'kss.css', (err, css) => {
	postcss([uncss({
		html: ['docs/*.html'],
		ignore: ['.kss-guides-mode .kss-modifier__example', '.kss-section--hidden']
	}), autoprefixer])
	.process(css, {
		from: filePath + 'kss.css',
		to: filePath + 'kss.css'
	})
	.then(result => {
		fs.writeFile(filePath + 'kss.css', result.css, () => true);
		if ( result.map ) {
			fs.writeFile(filePath + 'kss.css.map', result.map, () => true);
		}
	});
});

console.log('--- postcss for ' + theProcess + ' is done ---');

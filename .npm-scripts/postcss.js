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
		ignore: [
			'.kss-guides-mode .kss-modifier__example',
			'.kss-section--hidden',
			'.kss-fullscreen-mode',
			'.kss-fullscreen-mode .kss-header',
			'.kss-fullscreen-mode .kss-sidebar',
			'.kss-fullscreen-mode .kss-section',
			'.kss-fullscreen-mode .kss-github',
			'.kss-fullscreen-mode .kss-container',
			'.kss-fullscreen-mode .kss-main',
			'.kss-fullscreen-mode .kss-modifier',
			'.kss-fullscreen-mode .kss-modifier__example',
			'.kss-search__list--display'
		]
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

/* jshint node: true */
const fs = require('fs');
const path = require('path');
const createHTML = require('create-html');

module.exports = function(Handlebars, options) {
	'use strict';

	Handlebars.registerHelper('modifierFullscreenButton', function(
		name,
		markup,
		referenceURI,
		key,
		wrapper,
		requirejs,
		globalRequireJs,
		bodyclass,
		globalBodyclass,
		htmllang)
	{
		let filename = 'index-' + referenceURI + '_' + key + '.html';
		let svgicon = '<svg class="kss-toolbar__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.016 3h6.984v6.984h-2.016v-3.563l-9.797 9.797-1.406-1.406 9.797-9.797h-3.563v-2.016zM18.984 18.984v-6.984h2.016v6.984c0 1.078-0.938 2.016-2.016 2.016h-13.969c-1.125 0-2.016-0.938-2.016-2.016v-13.969c0-1.078 0.891-2.016 2.016-2.016h6.984v2.016h-6.984v13.969h13.969z"/></svg>';
		let requireJsOutput = '';
		let bodyclassOutput = '';

		if (wrapper) {
			// markup
			wrapper = wrapper.replace(/{{modifier_class}}/gm, name);
			wrapper = wrapper.split('<wrapper-content/>');
			markup = wrapper[0] + markup + wrapper[1];
		}

		if (bodyclass) {
			bodyclassOutput =  'class="' + bodyclass + '"';
		} else if (globalBodyclass) {
			bodyclassOutput =  'class="' + globalBodyclass + '"';
		}

		if (requirejs) {
			let requireSplit = requirejs.split(':');
			requireJsOutput =  '<script data-main="' + requireSplit[1].trim() + '" src="' + requireSplit[0].trim() + '"></script>';
		} else if (globalRequireJs.length > 0) {
			requireJsOutput =  '<script data-main="' + globalRequireJs[1].trim() + '" src="' + globalRequireJs[0].trim() + '"></script>';
		}

		let html = createHTML({
			title: name + ' - ' + referenceURI + ' - modifier: ' + key,
			script: options.js,
			css: options.css,
			head: '<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">',
			body: markup + requireJsOutput
		});
		html = html.replace(
			'<body>',
			'<body ' + bodyclassOutput + ' style="margin: 0;">'
		);

		if (htmllang.length > 0) {
			html = html.replace(
				'lang="en"',
				'lang="' + htmllang[0] + '"'
			);
		}

		let isFileContentDifferent = false;

		const filePath = `${options.destination}/${filename}`;
		const isFileAlreadyPresent = fs.existsSync(path.relative(process.cwd(), filePath));

		if (isFileAlreadyPresent) {
			const fileContent = fs.readFileSync(filePath, 'utf8');
			isFileContentDifferent = fileContent !== html;
		}

		if (isFileAlreadyPresent === false || isFileContentDifferent) {
			fs.writeFile(filePath, html, (error) => {
				if (error) {
					console.log(error);
				}
			});
		}

		return '<a title="open in a new window" class="" href="' + filename + '" target="_blank">' + svgicon + '</a>';
	});
};

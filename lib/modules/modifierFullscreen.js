/* jshint node: true */
let fs = require('fs');
let createHTML = require('create-html');
let settings = JSON.parse(fs.readFileSync('./kss-scheibo.json'));

module.exports = function(Handlebars) {
	'use strict';

	Handlebars.registerHelper('modifierFullscreenButton', function(name, markup, referenceURI, key) {
		let filename = 'index-' + referenceURI + '_' + key + '.html';
		let svgicon = '<svg class="kss-toolbar__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.016 3h6.984v6.984h-2.016v-3.563l-9.797 9.797-1.406-1.406 9.797-9.797h-3.563v-2.016zM18.984 18.984v-6.984h2.016v6.984c0 1.078-0.938 2.016-2.016 2.016h-13.969c-1.125 0-2.016-0.938-2.016-2.016v-13.969c0-1.078 0.891-2.016 2.016-2.016h6.984v2.016h-6.984v13.969h13.969z"/></svg>';

		let html = createHTML({
			title: name + ' - ' + referenceURI + ' - modifier: ' + key,
			script: settings.js,
			css: settings.css,
			head: '<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">',
			body: markup
		});
		html = html.replace('<body>', '<body style="margin: 0;">');

		fs.writeFile(settings.destination + '/' + filename, html, function(err) {
			if (err) {
				console.log(err);
			}
		});

		return '<a title="open in a new window" class="" href="' + filename + '" target="_blank">' + svgicon + '</a>';
	});
};

/* jshint node: true */
let fs = require('fs');
let createHTML = require('create-html');
let settings = JSON.parse(fs.readFileSync('./kss-scheibo.json'));

module.exports = function(Handlebars) {
	'use strict';

	Handlebars.registerHelper('modifierFullscreenButton', function(name, markup, referenceURI, key) {
		let filename = 'index-' + referenceURI + '_' + key + '.html';
		let svgicon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M14.016 3h6.984v6.984h-2.016v-3.563l-9.797 9.797-1.406-1.406 9.797-9.797h-3.563v-2.016zM18.984 18.984v-6.984h2.016v6.984c0 1.078-0.938 2.016-2.016 2.016h-13.969c-1.125 0-2.016-0.938-2.016-2.016v-13.969c0-1.078 0.891-2.016 2.016-2.016h6.984v2.016h-6.984v13.969h13.969z"/></svg>';

		let html = createHTML({
			title: name,
			script: settings.js,
			css: settings.css,
			body: markup
		});

		fs.writeFile(settings.destination + '/' + filename, html, function(err) {
			if (err) {
				console.log(err);
			}
		});

		return '<a title="open in a new window" class="" href="' + filename + '" target="_blank">' + svgicon + '</a>';
	});
};

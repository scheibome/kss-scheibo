let fs = require('fs');
let createHTML = require('create-html');
let settings = JSON.parse(fs.readFileSync('./kss-scheibo.json'));
let destination = settings.destination;

module.exports = function (Handlebars) {
	'use strict';

	Handlebars.registerHelper('modifierFullscreenButton', function (name, markup, referenceURI, key) {
		let html = createHTML({
			title: name,
			script: settings.js,
			css: settings.css,
			// lang: 'en',
			// dir: 'rtl',
			// head: '<meta name="description" content="example">',
			body: markup
		});

		fs.writeFile(settings.destination + '/index-' + referenceURI + '_' + key + '.html', html, function (err) {
			if (err) console.log(err)
		});

		return '<button>open in new window</button>';
	});
};

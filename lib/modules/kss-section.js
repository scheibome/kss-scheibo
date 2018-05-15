/* jshint node: true */
'use strict';
let kss = require('kss');
let fs = require('fs');
let kssScheiboJson = JSON.parse(fs.readFileSync('./kss-scheibo.json'));

function setupEachSection(styleguide) {
	styleguide.sections().forEach(function(section) {
		let markup = section.data.markup;
		let markupMatch = markup.match(/<insert-markup>(.*?)<\/insert-markup>/i);

		let raw = section.meta.raw;
		let rawMatch = raw.match(/<insert-markup>(.*?)<\/insert-markup>/i);

		if (markupMatch && raw) {
			section.data.markup = markup.replace(/<insert-markup>[\s\S]*?<\/insert-markup>/, styleguide.sections(markupMatch[1]).data.markup);
			section.meta.raw = raw.replace(/<insert-markup>[\s\S]*?<\/insert-markup>/, styleguide.sections(rawMatch[1]).meta.raw);
		}
	});
}

kss.traverse('./' + kssScheiboJson.source).then(function(styleguide) {
	setupEachSection(styleguide);
	console.log(styleguide.sections());
});

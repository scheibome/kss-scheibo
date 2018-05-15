/* jshint node: true */
'use strict';
let kss = require('kss');

function replaceMarkup(styleGuide) {
	styleGuide.sections().forEach(function(element) {
		let markup = element.data.markup;
		let markupMatch = markup.match(/<insert-markup>(.*?)<\/insert-markup>/i);

		let raw = element.meta.raw;
		let rawMatch = raw.match(/<insert-markup>(.*?)<\/insert-markup>/i);

		if (markupMatch && raw) {
			element.data.markup = markup.replace(/<insert-markup>[\s\S]*?<\/insert-markup>/, styleGuide.sections(markupMatch[1]).data.markup);
			element.meta.raw = markup.replace(/<insert-markup>[\s\S]*?<\/insert-markup>/, styleGuide.sections(rawMatch[1]).meta.raw);
		}
	});

	return styleGuide;
}

kss.traverse('./source/scss').then(function(styleGuide) {
	styleGuide = replaceMarkup(styleGuide);

	console.log(styleGuide.sections());
});

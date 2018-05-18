/* jshint node: true */
'use strict';

let KssBuilderHandlebars = require('kss/builder/handlebars');

class KssBuilderScheibo extends KssBuilderHandlebars {

	prepare(styleGuide) {
		this.setupEachSection(styleGuide);
		return super.prepare(styleGuide);
	}

	setupEachModifier(modifiers) {
		modifiers.sections().forEach(function(modifier) {

			console.log(modifier);

			// let modifier = section.modifiers();
			// if (Object.keys(modifier).length > 0) {
			// 	console.log(modifier);
			// 	console.log(section.data.reference);
			// }
		});
	}

	setupEachSection(styleGuide) {
		styleGuide.sections().forEach(function(section) {
			let modifier = section.modifiers();
			if (Object.keys(modifier).length > 0) {
				this.setupEachModifier(modifier);
			}

			let markup = section.data.markup;
			let markupMatch = markup.match(/<insert-markup>(.*?)<\/insert-markup>/i);

			let raw = section.meta.raw;
			let rawMatch = raw.match(/<insert-markup>(.*?)<\/insert-markup>/i);

			if (markupMatch && raw) {
				section.data.markup = markup.replace(/<insert-markup>[\s\S]*?<\/insert-markup>/g,
					styleGuide.sections(markupMatch[1]).data.markup);
				section.meta.raw = raw.replace(/<insert-markup>[\s\S]*?<\/insert-markup>/g,
					styleGuide.sections(rawMatch[1]).meta.raw);
			}
		});
	}
}

module.exports = KssBuilderScheibo;

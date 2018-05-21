/* jshint node: true */
'use strict';

let KssBuilderHandlebars = require('kss/builder/handlebars');

class KssBuilderScheibo extends KssBuilderHandlebars {

	prepare(styleGuide) {
		this.setupEachSection(styleGuide);
		// this.setupEachModifier(styleGuide);
		return super.prepare(styleGuide);
	}

	setupEachModifier(styleGuide) {
		styleGuide.sections().forEach(function(section) {
			let modifier = section.modifiers();
			if (Object.keys(modifier).length > 0) {
				modifier.forEach(function(modi) {
					console.log(modi);
				});
			}
		});
	}

	setupEachSection(styleGuide) {
		styleGuide.sections().forEach(function(section) {
			let regexModifier = /<insert-markup>([0-9\.]*\-?([0-9]*))<\/insert-markup>/gm;
			let markup = section.data.markup;
			let markupMatch = markup.match(/<insert-markup>(.*?)<\/insert-markup>/g);

			let raw = section.meta.raw;
			let rawMatch = raw.match(/<insert-markup>(.*?)<\/insert-markup>/g);

			if (markupMatch && raw) {
				// console.log(styleGuide.sections('1.1').data.modifiers);

				let i = 0;
				markupMatch.forEach(function(markupItem) {
					// console.log(styleGuide.sections('1.1').modifiers('1').className());
					let modifier = regexModifier.exec(markupItem);

					// console.log(i, markupItem);
					if (modifier) {
						console.log(markup);
						console.log(modifier);
					}


					i++;
				});

				// console.log(raw.replace(/<insert-markup>[\s\S]*?<\/insert-markup>/g, styleGuide.sections(rawMatch[1]).meta.raw));

				// console.log(styleGuide.sections(markupMatch[1]).data.markup);

				// section.data.markup = markup.replace(/<insert-markup>[\s\S]*?<\/insert-markup>/g,
				// 	styleGuide.sections(markupMatch[1]).data.markup);
				// section.meta.raw = raw.replace(/<insert-markup>[\s\S]*?<\/insert-markup>/g,
				// 	styleGuide.sections(rawMatch[1]).meta.raw);
			}
		});
	}
}

module.exports = KssBuilderScheibo;

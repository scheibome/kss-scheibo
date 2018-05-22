/* jshint node: true */
'use strict';

let KssBuilderHandlebars = require('kss/builder/handlebars');
const regexModifier = /<insert-markup>([0-9\.]*\-?([0-9]*))<\/insert-markup>/gm;

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

			let markup = section.data.markup;
			let markupMatch = markup.match(/<insert-markup>(.*?)<\/insert-markup>/gm);

			let raw = section.meta.raw;
			let rawMatch = raw.match(/<insert-markup>(.*?)<\/insert-markup>/gm);

			if (markupMatch && raw) {
				// console.log(styleGuide.sections('1.1').data.modifiers);

				let i = 0;
				markupMatch.forEach(function(markupItem) {

					// console.log('TEST ' + i + ': ', markupMatch[i]);
					// console.log(styleGuide.sections('1.1').modifiers('1').className());
					let modifier = regexModifier.exec(markupMatch);

					// console.log(i, modifier, markupMatch);
					if (modifier && modifier[2] !== '') {
						// console.log(modifier[2]);
						// console.log(markupItem);
						// console.log(styleGuide.sections('1.1').modifiers(modifier[2])); // TODO: check if exists
						// console.log(styleGuide.sections('1.1').modifiers(1).data.name); // TODO: The name


						// console.log(styleGuide.sections('1.1').data.markup);
						// console.log(styleGuide.sections('1.1').meta);
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

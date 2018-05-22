/* jshint node: true */
'use strict';

let KssBuilderHandlebars = require('kss/builder/handlebars');
const regexModifier = /<insert-markup>(([0-9\.]*)\-?([0-9]*))<\/insert-markup>/gm;
const regexModifierLine = /<insert-markup>(([0-9\.]*)\-?([0-9]*))<\/insert-markup>/m;

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
		let markup;
		let markupMatch;
		let modifier;
		let modifierFirstNumber;
		let modifierNumber;
		let modifierMarkup;
		let modifierName;

		styleGuide.sections().forEach(function(section) {
			markup = section.data.markup;

			// Check isset markup
			if(markup) {
				markupMatch = markup.match(regexModifier);

				// Check isset '<insert-markup>'
				if(markupMatch) {

					markupMatch.forEach(function(markupItem, i) {
						modifier = regexModifierLine.exec(markupItem);

						if (modifier && modifier[3] !== '') {
							modifierFirstNumber = modifier[2];
							modifierNumber = modifier[3];
							modifierMarkup = modifier[1];

							// Check if modifier is exists
							if (styleGuide.sections(modifierFirstNumber).modifiers(modifier[3])) {
								modifierName = styleGuide.sections(modifierFirstNumber).modifiers(modifier[3]).data.name;

								console.log(modifierName, modifier[0], modifier[2], modifier[3]);
							} else {
								// TODO: ADD MARKER FOR MISSING MODIFIER!
							}

							// console.log(modifier[2]);
							// console.log(markupItem);
							// console.log(styleGuide.sections('1.1').modifiers(modifier[3])); // TODO: check if exists
							// console.log(styleGuide.sections('1.1').modifiers(1).data.name); // TODO: The name


							// console.log(styleGuide.sections('1.1').data.markup);
							// console.log(styleGuide.sections('1.1').meta);

						}

						// console.log(section.data.header, markup, markupMatch, markupItem, modifier);
					});
				}
			}



			// let markup = section.data.markup;
			// let markupMatch = markup.match(/<insert-markup>(.*?)<\/insert-markup>/gm);
			//
			// let raw = section.meta.raw;
			// let rawMatch = raw.match(/<insert-markup>(.*?)<\/insert-markup>/gm);
			//
			// if (markupMatch && raw) {
			// 	// console.log(styleGuide.sections('1.1').data.modifiers);
			//
			// 	let i = 0;
			// 	markupMatch.forEach(function(markupItem) {
			//
			// 		// console.log('TEST ' + i + ': ', markupMatch[i]);
			// 		// console.log(styleGuide.sections('1.1').modifiers('1').className());
			// 		let modifier = regexModifier.exec(markupMatch[i]);
			// 		console.log(i, markupMatch[i], modifier);
			// 		// console.log(i, modifier, markupMatch);
			// 		if (modifier && modifier[3] !== '') {
			//
			// 			// console.log(markupItem);
			// 			let modifierFirstNumber = modifier[2];
			// 			let modifierNumber = modifier[3];
			// 			let modifierMarkup = modifier[1];
			// 			let modifierName = styleGuide.sections(modifierFirstNumber).modifiers(1).data.name;
			//
			// 			// Check if modifier is exists
			// 			if (styleGuide.sections(modifierFirstNumber).modifiers(modifier[3])) {
			// 				// console.log(modifierName, modifier[0], modifier[2], modifier[3]);
			// 			}
			//
			// 			// console.log(modifier[2]);
			// 			// console.log(markupItem);
			// 			// console.log(styleGuide.sections('1.1').modifiers(modifier[3])); // TODO: check if exists
			// 			// console.log(styleGuide.sections('1.1').modifiers(1).data.name); // TODO: The name
			//
			//
			// 			// console.log(styleGuide.sections('1.1').data.markup);
			// 			// console.log(styleGuide.sections('1.1').meta);
			//
			// 		}
			// 	});
			//
			//
			// 	// console.log(raw.replace(/<insert-markup>[\s\S]*?<\/insert-markup>/g, styleGuide.sections(rawMatch[1]).meta.raw));
			//
			// 	// console.log(styleGuide.sections(markupMatch[1]).data.markup);
			//
			// 	// section.data.markup = markup.replace(/<insert-markup>[\s\S]*?<\/insert-markup>/g,
			// 	// 	styleGuide.sections(markupMatch[1]).data.markup);
			// 	// section.meta.raw = raw.replace(/<insert-markup>[\s\S]*?<\/insert-markup>/g,
			// 	// 	styleGuide.sections(rawMatch[1]).meta.raw);
			// }
		});
	}
}

module.exports = KssBuilderScheibo;

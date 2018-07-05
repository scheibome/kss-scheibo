/* jshint node: true */
const regexModifierLine = /<insert-markup>(([0-9\.]*)\-?([0-9]*))<\/insert-markup>/m;
const fs = require('fs');
const async = require('async');

module.exports = function(Handlebars) {
	'use strict';

	Handlebars.registerHelper('modifierInsertSection', function(markup, sections, styleGuide, sourcePath) {
		let markupNumber;

		let getModifier = function(data, modifierId) {
			let i;
			for (i = 0; i < data.modifiers.length; i++) {
				if (i === parseInt(modifierId)) {
					return data.modifiers[i].data.name;
				}
			}
		};

		let replaceModifierClass = function(str, replacestr) {
			return str.replace('{{modifier_class}}', replacestr);
		};

		let getMarkup = function(markupNumber, styleGuide, markupModifierNumber) {
			if (typeof(styleGuide) === 'object') {
				let i;

				async.each(styleGuide.data.sections, function(item, callback) {
					let newMarkup = '';
					if (item.data.reference === markupNumber) {
						// if isset a markupModifierNumber, then add the markupModifierNumber class

						newMarkup = item.data.markup;
						if (item.data.markupFile) {
							let filepath = sourcePath + '/' + item.data.markup;
							fs.readFile(filepath, 'utf8', (err, data) => {
								if (err) {
									return callback(err);
								}
								try {
									newMarkup = data;
								} catch (e) {
									return callback(e);
								}
								callback();
							});


							// newMarkup = fs.readFile(filepath, 'utf8'); // TODO: check this line
						}

						if (!markupModifierNumber) {
							return newMarkup;
						}

						let className = getModifier(item.data, markupModifierNumber);
						return replaceModifierClass(newMarkup, className);
					}
				}, function(err) {
					console.log('All done');
				});

				// for (i = 0; i < styleGuide.data.sections.length; i++) {
				// 	let newMarkup = '';
				// 	let styleGuidesection = styleGuide.data.sections[i];
				// 	if (styleGuidesection.data.reference === markupNumber) {
				// 		// if isset a markupModifierNumber, then add the markupModifierNumber class
				//
				// 		newMarkup = styleGuidesection.data.markup;
				// 		if (styleGuidesection.data.markupFile) {
				// 			let filepath = sourcePath + '/' + styleGuidesection.data.markup;
				// 			newMarkup = fs.readFileSync(filepath, 'utf8'); // TODO: check this line
				// 		}
				//
				// 		if (!markupModifierNumber) {
				// 			return newMarkup;
				// 		}
				//
				// 		let className = getModifier(styleGuidesection.data, markupModifierNumber);
				// 		return replaceModifierClass(newMarkup, className);
				// 	}
				// }
			}
		};

		let replaceInsert = function(markup, styleGuide) {
			let markupModifierNumber = '';
			let insertSetting = markup.match(regexModifierLine);
			markupNumber = insertSetting[2];

			if (insertSetting[3] !== '') {
				markupModifierNumber = insertSetting[3];
			}

			let newMarkup = getMarkup(markupNumber, styleGuide, markupModifierNumber);
			markup = markup.replace(insertSetting[0], newMarkup);
			let newInsertLine = markup.match(regexModifierLine);

			// Check isset '<insert-markup>'
			if (newInsertLine) {
				return replaceInsert(markup, styleGuide);
			} else {
				return markup;
			}
		};

		// Init function
		let insertLines = markup.match(regexModifierLine);
		// Check isset '<insert-markup>'
		if (!insertLines) {
			return markup;
		}

		return replaceInsert(markup, styleGuide);
	});
};

/* jshint node: true */
const regexModifierLine = /<insert-markup>(([0-9\.]*)\-?([0-9]*))<\/insert-markup>/m;
const fs = require('fs');

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

				for (i = 0; i < styleGuide.data.sections.length; i++) {
					let styleGuidesection = styleGuide.data.sections[i];
					if (styleGuidesection.data.reference === markupNumber) {
						// if isset a markupModifierNumber, then add the markupModifierNumber class

						let markupOutput = styleGuidesection.data.markup;
						if (styleGuidesection.data.markupFile) {
							let filepath = sourcePath + '/' + styleGuidesection.data.markup;
							markupOutput = fs.readFileSync(filepath, 'utf8');
						}

						if (!markupModifierNumber) {
							return markupOutput;
						}

						let className = getModifier(styleGuidesection.data, markupModifierNumber);
						return replaceModifierClass(markupOutput, className);
					}
				}
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

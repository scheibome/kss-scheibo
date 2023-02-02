/* jshint node: true */

const fs = require('fs');
const path = require('path');
const pug = require('pug');

// eslint-disable-next-line no-useless-escape
const regexModifierLine = /<insert-markup>(([0-9\.]*)\-?([0-9]*))<\/insert-markup>/m;

module.exports = (Handlebars) => {
	Handlebars.registerHelper('modifierInsertSection', (markup, sections, styleGuide, sourcePath) => {
		let markupNumber;

		const getModifier = (data, modifierId) => {
			let i;
			for (i = 0; i < data.modifiers.length; i += 1) {
				if (i === parseInt(modifierId, 10)) {
					return data.modifiers[i].data.name;
				}
			}
		};

		/**
		 * Replace {{modifier_class}} with modifier class from KSS
		 */
		const replaceModifierClass = (str, replacestr) => {
			// replace first point if in class isset
			if (replacestr.charAt(0) === '.') {
				replacestr = replacestr.substr(1);
			}
			replacestr = replacestr.replace(/\./g, ' ');
			return str.replace(/{{modifier_class}}/gm, replacestr);
		};

		const getMarkup = function (
			markupNumber,
			styleGuide,
			markupModifierNumber,
		) {
			if (typeof styleGuide === 'object') {
				let i;

				for (i = 0; i < styleGuide.data.sections.length; i += 1) {
					const styleGuidesection = styleGuide.data.sections[i];
					if (styleGuidesection.data.reference === markupNumber) {
						// if isset a markupModifierNumber, then add the markupModifierNumber class

						let markupOutput = styleGuidesection.data.markup;
						if (styleGuidesection.data.markupFile) {
							const filepath = `${sourcePath}/${styleGuidesection.data.markup}`;

							const isPugFile = path.extname(filepath) === '.pug';
							if (isPugFile) {
								const pugFn = pug.compileFile(filepath);
								markupOutput = pugFn();
							} else {
								markupOutput = fs.readFileSync(filepath, 'utf8');
							}
						}

						if (!markupModifierNumber) {
							return markupOutput;
						}

						const className = getModifier(
							styleGuidesection.data,
							markupModifierNumber,
						);

						return replaceModifierClass(markupOutput, className);
					}
				}
			}
		};

		/**
		 * Replace <insert-markup> with markup
		 */
		const replaceInsert = (markup, styleGuide) => {
			let markupModifierNumber = '';
			const insertSetting = markup.match(regexModifierLine);
			markupNumber = insertSetting[2];

			if (insertSetting[3] !== '') {
				markupModifierNumber = insertSetting[3];
			}

			const newMarkup = getMarkup(
				markupNumber,
				styleGuide,
				markupModifierNumber,
			);

			markup = markup.replace(insertSetting[0], newMarkup);
			const newInsertLine = markup.match(regexModifierLine);

			// Check isset '<insert-markup>'
			if (newInsertLine) {
				return replaceInsert(markup, styleGuide);
			}

			return markup;
		};

		/**
		 * Replace <
		 */

		// Init function
		const insertLines = markup.match(regexModifierLine);
		// Check isset '<insert-markup>'
		if (!insertLines) {
			return markup;
		}

		return replaceInsert(markup, styleGuide);
	});
};

/* jshint node: true */
'use strict';

const path = require('path');
const pug = require('pug');

module.exports = (Handlebars, options) => {
	Handlebars.registerHelper('modifierIsVitePugEnabled', (markup) => {
		const regexModifierLine = /<insert-vite-pug src="(.*)"><\/insert-vite-pug>/gm;

		const vitePugTags = markup.match(regexModifierLine);
		if (!vitePugTags) {
			return markup;
		}

		let markupOutput = markup;

		vitePugTags.forEach((vitePugTag) => {
			const pugSourcePath = vitePugTag.match(/src="(.*)"/)[1];
			if (!pugSourcePath) {
				return;
			}

			// Vite requires no Pug compilation, since we can use a Pug plugin
			if (options.isVitePugEnabled) {
				markupOutput = markupOutput.replace(vitePugTag, `<pug src="${pugSourcePath}" />`);
				return;
			}

			const isPugFile = path.extname(pugSourcePath) === '.pug';
			if (!isPugFile) {
				throw new Error(`${pugSourcePath} is not a valid .pug file`);
			}

			if (isPugFile) {
				const pugFn = pug.compileFile(pugSourcePath);
				const pugOutput = pugFn();

				markupOutput = markupOutput.replace(vitePugTag, pugOutput);
			}
		});

		return markupOutput;
	});
};

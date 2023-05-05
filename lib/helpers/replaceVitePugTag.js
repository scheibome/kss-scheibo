const path = require('path');
const pug = require('pug');

/**
 * Replace <insert-vite-pug src="..."></insert-vite-pug> tags with Pug output
 */
const replaceVitePugTags = (markup, options) => {
	const regexModifierLine = /<insert-vite-pug src="(.+?)".*\s*(modifierClass="(.+?)")? *><\/insert-vite-pug>/gm;

	const vitePugTags = markup.match(regexModifierLine);
	if (!vitePugTags) {
		return markup;
	}

	let markupOutput = markup;

	vitePugTags.forEach((vitePugTag) => {
		const pugSourcePath = vitePugTag.match(/src="(.+?)"/)[1];
		if (!pugSourcePath) {
			return;
		}

		const pugModifierClass = vitePugTag.match(/modifierClass="(.+?)"/);
		let pugLocals = {};

		if (pugModifierClass && pugModifierClass[1]) {
			pugLocals = {
				modifierClass: pugModifierClass[1],
			}
		}

		// Vite requires no Pug compilation, since we can use a Pug plugin
		if (options.isVitePugEnabled) {
			let pugTag = `<pug src="${pugSourcePath}" />`;

			if (pugModifierClass && pugModifierClass[1]) {
				pugTag = `<pug src="${pugSourcePath}" locals="${encodeURIComponent(JSON.stringify(pugLocals))}" />`;
			}

			markupOutput = markupOutput.replace(vitePugTag, pugTag);
			return;
		}

		const isPugFile = path.extname(pugSourcePath) === '.pug';
		if (!isPugFile) {
			throw new Error(`${pugSourcePath} is not a valid .pug file`);
		}

		const pugFn = pug.compileFile(pugSourcePath, {
			pretty: true,
		});

		const pugOutput = pugFn(pugLocals);

		markupOutput = markupOutput.replace(vitePugTag, pugOutput);
	});

	return markupOutput;
};

module.exports = replaceVitePugTags;

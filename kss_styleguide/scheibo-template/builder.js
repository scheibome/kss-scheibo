/* jshint node: true */
'use strict';

let KssBuilderHandlebars = require('kss/builder/handlebars');
const fs = require('fs');
const path = require('path');
const recursive = require('recursive-readdir');

const regexModifier = /<insert-markup>(([0-9\.]*)\-?([0-9]*))<\/insert-markup>/gm;
const regexModifierLine = /<insert-markup>(([0-9\.]*)\-?([0-9]*))<\/insert-markup>/m;

class KssBuilderScheibo extends KssBuilderHandlebars {
	prepare(styleGuide) {
		this.setupEachSection(styleGuide);
		return super.prepare(styleGuide).then(styleGuide => {
			require('../../lib/modules/modifierInsertCode')(this.Handlebars);
			require('../../lib/modules/modifierFullscreen')(this.Handlebars);
			require('../../lib/modules/colors')(this.Handlebars);
			return styleGuide;
		});
	}

	returnMarkupFromFile(section) {
		let workingDirectory = process.cwd();
		let filePath = section.data.markup;

		recursive(workingDirectory, ['.git', 'node_modules', '.idea'], function (err, files) {
			files.forEach(function(findUrl) {
				if (findUrl.indexOf(path.normalize(filePath)) > -1) {
					let data = fs.readFileSync(findUrl).toString();
					// return global_data;

					returnRecursive(data);
				}
			});
		});


		function returnRecursive(data) {
			return data;
			// console.log(data);
		}
	}

	modifyMarkup(markupid, replacestr, markup) {
		let replace = '<insert-markup>' + markupid + '</insert-markup>';
		let re = new RegExp(replace, 'g');
		return markup.replace(re, replacestr);
	}

	replaceModifierClass(str, replacestr) {
		return str.replace('{{modifier_class}}', replacestr);
	}

	setupEachSection(styleGuide) {
		let markup;
		let markupMatch;
		let modifier;
		let modifierFirstNumber;
		let modifierNumber;
		let modifierMarkup;
		let modifierName;
		let addedSectionMarkup;
		let insertModifier;
		let that = this;

		styleGuide.sections().forEach(function(section) {
			markup = section.data.markup;

			// Check isset markup
			if (markup) {
				if (markup.search('^[^\n]+\.(html)$') > -1) {
					// that.returnMarkupFromFile(section);
					console.log(that.returnMarkupFromFile(section));
					// console.log(markup);
				}


				markupMatch = markup.match(regexModifier);

				// Check isset '<insert-markup>'
				if (markupMatch) {
					markupMatch.forEach(function(markupItem) {
						modifier = regexModifierLine.exec(markupItem);
						modifierMarkup = modifier[1];
						modifierFirstNumber = modifier[2];
						insertModifier = styleGuide.sections(modifierFirstNumber);

						if (modifier && modifier[3] !== '') {
							modifierNumber = modifier[3];

							// Check if modifier is exists
							if (insertModifier.modifiers(modifier[3])) {
								// get modifiername
								modifierName = insertModifier.modifiers(modifierNumber).data.name;

								// replace modifier marker by modifier
								addedSectionMarkup = that.replaceModifierClass(insertModifier.data.markup, modifierName.substring(1));

								// build new section markup
								section.data.markup = that.modifyMarkup(modifierMarkup, addedSectionMarkup, section.data.markup);
							} else {
								console.log('ERROR: ' + modifierMarkup + ' is not define. Check your section ' + section.data.reference + ' in file ' + section.data.source.filename + ' in line ' + section.data.source.line + ' !!');
							}
						} else {
							// replace modifier marker by modifier
							addedSectionMarkup = that.replaceModifierClass(insertModifier.data.markup, '');

							// build new section markup
							section.data.markup = that.modifyMarkup(modifierMarkup, addedSectionMarkup, section.data.markup);
						}
					});
				}
			}
		});
	}
}

module.exports = KssBuilderScheibo;

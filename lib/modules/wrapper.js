/* jshint node: true */
module.exports = function(Handlebars) {
	'use strict';

	Handlebars.registerHelper('kssWrapper', function(doc, name, block) {
		if (doc == null) {
			return block.fn(this);
		}

		let replaceModifierClass = function(str, replacestr) {
			return str.replace(/{{modifier_class}}/gm, replacestr);
		};

		var wrap = doc.split('<wrapper-content/>');
		return replaceModifierClass(wrap[0], name); + block.fn(this) + wrap[1];
	});
};

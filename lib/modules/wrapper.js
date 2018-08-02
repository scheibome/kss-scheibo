/* jshint node: true */
module.exports = function(Handlebars) {
	'use strict';

	Handlebars.registerHelper('kssWrapper', function(doc, block) {
		if (doc == null) {
			return block.fn(this);
		}

		var wrap = doc.split('<wrapper-content/>');
		return wrap[0] + block.fn(this) + wrap[1];
	});
};

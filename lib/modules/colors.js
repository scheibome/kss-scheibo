/* jshint node: true */
module.exports = function(Handlebars) {
	'use strict';

	Handlebars.registerHelper('kssColors', function(doc, block) {
		let output = [];

		for (let i = 0; i < doc.length; i++) {
			this.color = {};
			this.color.variable = doc[i].name;
			this.color.value = doc[i].color;

			if (doc[i].description !== undefined) {
				this.color.description = doc[i].description;
			}

			output.push(block.fn(this));
		}
		return output.join('');
	});
};

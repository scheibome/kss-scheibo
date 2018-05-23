module.exports = function (Handlebars) {
	'use strict';

	Handlebars.registerHelper('kssColors', function (doc, block) {
		let output = [];
		let regex = /^(\S+)\s*:\s*(\S+)(?:\s*-\s*(.*))?$/gm;
		let color;

		while ((color = regex.exec(doc)) !== null) {

			this.color = {};
			this.color.variable = color[1];
			this.color.value = color[2];

			if (color[3] !== undefined) {
				this.color.description = color[3];
			}

			output.push(block.fn(this));
		}

		return output.join('');
	});
};

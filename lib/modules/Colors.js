module.exports = function (Handlebars) {
	'use strict';

	Handlebars.registerHelper('kssColors', function (doc, block) {
		let output = [];
		let regex = /^(\S+)\s*:\s*(\S+)(?:\s*-\s*(.*))?$/gm;
		let color;

		// console.log(doc, block);

		while ((color = regex.exec(doc)) !== null) {

			this.color = {};
			this.color.value = color[2];
			this.color.name = color[3];
			this.color.character = color[2];
			if (color[3] !== undefined) {
				this.color.description = color[3];
			}

			console.log(color);

			output.push(block.fn(this));
		}

		return output.join('');
	});
};

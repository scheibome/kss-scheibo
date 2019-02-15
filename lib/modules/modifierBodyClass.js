/* jshint node: true */
module.exports = function(Handlebars) {
	'use strict';

	Handlebars.registerHelper('modifierBodyClass', function(bodyclass) {
		if (bodyclass) {
			return bodyclass;
		}
	});
};

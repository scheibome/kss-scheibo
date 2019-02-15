/* jshint node: true */
module.exports = function(Handlebars) {
	'use strict';

	Handlebars.registerHelper('modifierRequireJs', function(requirejs) {
		if (requirejs) {
			return '<script data-main="' + requirejs[1].trim() + '" src="' + requirejs[0].trim() + '"></script>';
		}
	});
};

/* jshint node: true */
module.exports = function(Handlebars) {
	'use strict';

	Handlebars.registerHelper('modifierBodyClass', function(bodyclass, globalBodyclass) {
		if (bodyclass) {
			return bodyclass;
		} else if (globalBodyclass.length > 0) {
			return globalBodyclass[0];
		}
	});
};

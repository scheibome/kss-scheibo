/* jshint node: true */
module.exports = function(Handlebars) {
	'use strict';

	Handlebars.registerHelper('modifierHTMLClass', function(htmlclass) {
		if (htmlclass) {
			return htmlclass;
		}
	});
};

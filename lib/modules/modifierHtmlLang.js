/* jshint node: true */
module.exports = function(Handlebars) {
	'use strict';

	Handlebars.registerHelper('modifierHtmlLang', function(htmllang) {
		if (htmllang) {
			return htmllang;
		}
	});
};

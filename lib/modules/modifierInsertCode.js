/* jshint node: true */
module.exports = function(Handlebars) {
	'use strict';

	Handlebars.registerHelper('modifierInsertCode', function(referenceURI, key) {
		referenceURI = referenceURI.replace(/-/g, '.');
		return '<insert-markup>' + referenceURI + '-' + key + '</insert-markup>';
	});
};

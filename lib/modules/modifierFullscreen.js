module.exports = function (Handlebars) {
	'use strict';

	Handlebars.registerHelper('modifierFullscreenButton', function (markup, referenceURI, key) {
		console.log(markup);
		console.log(referenceURI);
		console.log(key);
		return '<button>open in new window</button>';
	});
};

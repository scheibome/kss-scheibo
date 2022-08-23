/* jshint node: true */
module.exports = function(Handlebars) {
	'use strict';

	Handlebars.registerHelper('modifierScriptModule', function(scripts) {
		const generateScript = (src) => `<script src="${src}" type="module"></script>`;

		if (typeof scripts === 'string') {
			return generateScript(scripts);
		}

		let output = '';

		if (Array.isArray(scripts)) {
			scripts.forEach((script) => {
				output += generateScript(script);
			});
		}

		return output;
	});
};

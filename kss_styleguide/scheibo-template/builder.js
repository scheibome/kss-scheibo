/* jshint node: true */
'use strict';

let KssBuilderHandlebars = require('kss/builder/handlebars');

class KssBuilderScheibo extends KssBuilderHandlebars {

	constructor() {
		super();

		this.addOptionDefinitions({
			requirejs: {
				group: 'Style guide:',
				string: true
			}
		});

		this.addOptionDefinitions({
			bodyclass: {
				group: 'Style guide:',
				string: true
			}
		});
	}

	prepare(styleGuide) {
		return super.prepare(styleGuide).then(styleGuide => {
			require('../../lib/modules/colors')(this.Handlebars);
			require('../../lib/modules/modifierRequireJs')(this.Handlebars);
			require('../../lib/modules/modifierBodyClass')(this.Handlebars);
			require('../../lib/modules/modifierInsertCode')(this.Handlebars);
			require('../../lib/modules/modifierFullscreen')(this.Handlebars, this.options);
			require('../../lib/modules/modifierInsertSection')(this.Handlebars);
			require('../../lib/modules/wrapper')(this.Handlebars);
			return styleGuide;
		});
	}
}

module.exports = KssBuilderScheibo;

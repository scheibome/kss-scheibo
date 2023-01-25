/* jshint node: true */
'use strict';

let KssBuilderHandlebars = require('kss/builder/handlebars');

class KssBuilderScheibo extends KssBuilderHandlebars {

	constructor() {
		super();

		this.addOptionDefinitions({
			scriptModules: {
				group: 'Style guide:',
				string: true,
				describe: 'Inject scripts with type module into body'
			}
		});

		this.addOptionDefinitions({
			requirejs: {
				group: 'Style guide:',
				string: true,
				describe: 'Add RequireJs as global option and in every single fullscreen mode.'
			}
		});

		this.addOptionDefinitions({
			bodyclass: {
				group: 'Style guide:',
				string: true,
				describe: 'Add a global body class and in every single fullscreen mode.'
			}
		});

		this.addOptionDefinitions({
			htmllang: {
				group: 'Style guide:',
				string: true,
				describe: 'Change the global lang attribute.'
			}
		});

		this.addOptionDefinitions({
			isVitePugEnabled: {
				group: 'Style guide:',
				boolean: true,
				multiple: false,
				describe: 'Whether the styleguide is used in a Vite environment',
				default: false
			},
		});
	}

	prepare(styleGuide) {
		return super.prepare(styleGuide).then(styleGuide => {
			require('../../lib/modules/colors')(this.Handlebars);
			require('../../lib/modules/modifierRequireJs')(this.Handlebars);
			require('../../lib/modules/modifierScriptModule')(this.Handlebars);
			require('../../lib/modules/modifierBodyClass')(this.Handlebars);
			require('../../lib/modules/modifierInsertCode')(this.Handlebars);
			require('../../lib/modules/modifierFullscreen')(this.Handlebars, this.options);
			require('../../lib/modules/modifierInsertSection')(this.Handlebars);
			require('../../lib/modules/modifierIsVitePugEnabled')(this.Handlebars, this.options);
			require('../../lib/modules/modifierHtmlLang')(this.Handlebars);
			require('../../lib/modules/wrapper')(this.Handlebars);

			return styleGuide;
		});
	}
}

module.exports = KssBuilderScheibo;

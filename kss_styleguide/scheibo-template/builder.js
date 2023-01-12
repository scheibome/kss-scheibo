/* jshint node: true */
'use strict';

const KssBuilderHandlebars = require('kss/builder/handlebars');
const path = require('path');
const Promise = require('bluebird');
const glob = Promise.promisify(require('glob'));
const fs = Promise.promisifyAll(require('fs-extra'));
const pug = require('pug');

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
			require('../../lib/modules/modifierHtmlLang')(this.Handlebars);
			require('../../lib/modules/wrapper')(this.Handlebars);
			return styleGuide;
		});
	}

	/**
	 * Source: builder/base/kss_builder_base.js
	 *
	 * A helper method that can be used by subclasses of KssBuilderBase when
	 * implementing their build() method.
	 *
	 * The following options are required to use this helper method:
	 * - readBuilderTemplate: A function that returns a promise to read/load a
	 *   template provided by the builder.
	 * - readSectionTemplate: A function that returns a promise to read/load a
	 *   template specified by a section.
	 * - loadInlineTemplate: A function that returns a promise to load an inline
	 *   template from markup.
	 * - loadContext: A function that returns a promise to load the data context
	 *   given a template file path.
	 * - getTemplate: A function that returns a promise to get a template by name.
	 * - templateRender: A function that renders a template and returns the
	 *   markup.
	 * - filenameToTemplateRef: A function that converts a filename into a unique
	 *   name used by the templating system.
	 * - templateExtension: A string containing the file extension used by the
	 *   templates.
	 * - emptyTemplate: A string containing markup for an empty template.
	 *
	 * @param {KssStyleGuide} styleGuide The KSS style guide in object format.
	 * @param {object} options The options necessary to use this helper method.
	 * @returns {Promise.<KssStyleGuide>} A `Promise` object resolving to a
	 *   `KssStyleGuide` object.
	 */
	// jshint ignore:start
	buildGuide(styleGuide, options) {
		let readBuilderTemplate = options.readBuilderTemplate;
		let readSectionTemplate = options.readSectionTemplate;
		let loadInlineTemplate = options.loadInlineTemplate;
		let loadContext = options.loadContext;
		let filenameToTemplateRef = options.filenameToTemplateRef;
		let templateExtension = options.templateExtension;
		let emptyTemplate = options.emptyTemplate;

		this.styleGuide = styleGuide;
		this.sectionTemplates = {};

		if (typeof this.templates === 'undefined') {
			this.templates = {};
		}

		let buildTasks = [],
			readBuilderTask;

		// Optionally load/compile the index template.
		if (typeof this.templates.index === 'undefined') {
			readBuilderTask = readBuilderTemplate('index').then(template => {
				this.templates.index = template;
				return Promise.resolve();
			});
		} else {
			readBuilderTask = Promise.resolve();
		}

		// Optionally load/compile the section template.
		if (typeof this.templates.section === 'undefined') {
			readBuilderTask = readBuilderTask.then(() => {
				return readBuilderTemplate('section').then(template => {
					this.templates.section = template;
					return Promise.resolve();
				}).catch(() => {
					// If the section template cannot be read, use the index template.
					this.templates.section = this.templates.index;
					return Promise.resolve();
				});
			});
		}

		// Optionally load/compile the item template.
		if (typeof this.templates.item === 'undefined') {
			readBuilderTask = readBuilderTask.then(() => {
				return readBuilderTemplate('item').then(template => {
					this.templates.item = template;
					return Promise.resolve();
				}).catch(() => {
					// If the item template cannot be read, use the section template.
					this.templates.item = this.templates.section;
					return Promise.resolve();
				});
			});
		}
		buildTasks.push(readBuilderTask);

		let sections = this.styleGuide.sections();

		if (this.options.verbose && this.styleGuide.meta.files) {
			this.log(this.styleGuide.meta.files.map(file => {
				return ' - ' + file;
			}).join('\n'));
		}

		if (this.options.verbose) {
			this.log('...Determining section markup:');
		}

		let sectionRoots = [];

		// Save the name of the template and its context for retrieval in
		// buildPage(), where we only know the reference.
		let saveTemplate = template => {
			this.sectionTemplates[template.reference] = {
				name: template.name,
				context: template.context,
				filename: template.file,
				exampleName: template.exampleName,
				exampleContext: template.exampleContext
			};

			return Promise.resolve();
		};

		sections.forEach(section => { // jshint ignore:line
			// Accumulate an array of section references for all sections at the root
			// of the style guide.
			let currentRoot = section.reference().split(/(?:\.|\ \-\ )/)[0];
			if (sectionRoots.indexOf(currentRoot) === -1) {
				sectionRoots.push(currentRoot);
			}

			if (!section.markup()) {
				return;
			}

			// Register all the markup blocks as templates.
			let template = {
				name: section.reference(),
				reference: section.reference(),
				file: '',
				markup: section.markup(),
				context: {},
				exampleName: false,
				exampleContext: {}
			};

			// Check if the markup is a file path.
			if (template.markup.search('^[^\n]+\.(html|pug|' + templateExtension + ')$') === -1) {
				if (this.options.verbose) {
					this.log(' - ' + template.reference + ': inline markup');
				}
				buildTasks.push(
					loadInlineTemplate(template.name, template.markup).then(() => {
						return saveTemplate(template);
					})
				);
			} else {
				// Attempt to load the file path.
				section.custom('markupFile', template.markup);
				template.file = template.markup;
				template.name = filenameToTemplateRef(template.file);

				let findTemplates = [],
					matchFilename = path.basename(template.file),
					matchExampleFilename = 'kss-example-' + matchFilename;
				this.options.source.forEach(source => {
					let returnFilesAndSource = function(files) {
						return {
							source: source,
							files: files
						};
					};
					findTemplates.push(glob(source + '/**/' + template.file).then(returnFilesAndSource));
					findTemplates.push(
						glob(source + '/**/' + path.join(path.dirname(template.file), matchExampleFilename))
							.then(returnFilesAndSource)
					);
				});
				buildTasks.push(
					Promise.all(findTemplates).then(globMatches => {
						let foundTemplate = false,
							foundExample = false,
							loadTemplates = [];
						for (let globMatch of globMatches) {
							let files = globMatch.files,
								source = globMatch.source;
							if (!foundTemplate || !foundExample) {
								for (let file of files) {
									// Read the template from the first matched path.
									let filename = path.basename(file);
									if (!foundTemplate && filename === matchFilename) {
										foundTemplate = true;
										section.custom('markupFile', path.relative(source, file));
										template.file = file;
										loadTemplates.push(
											readSectionTemplate(template.name, file).then(() => {
												/* eslint-disable max-nested-callbacks */
												return loadContext(file).then(context => {
													template.context = context;
													return Promise.resolve();
												});
												/* eslint-enable max-nested-callbacks */
											})
										);
									} else if (!foundExample && filename === matchExampleFilename) {
										foundExample = true;
										template.exampleName = 'kss-example-' + template.name;
										loadTemplates.push(
											readSectionTemplate(template.exampleName, file).then(() => {
												/* eslint-disable max-nested-callbacks */
												return loadContext(file).then(context => {
													template.exampleContext = context;
													return Promise.resolve();
												});
												/* eslint-enable max-nested-callbacks */
											})
										);
									}
								}
							}
						}

						// If the markup file is not found, note that in the style guide.
						if (!foundTemplate && !foundExample) {
							template.markup += ' NOT FOUND!';
							if (!this.options.verbose) {
								this.log('WARNING: In section ' + template.reference + ', ' + template.markup);
							}
							loadTemplates.push(
								loadInlineTemplate(template.name, template.markup)
							);
						} else if (!foundTemplate) {
							// If we found an example, but no template, load an empty
							// template.
							loadTemplates.push(
								loadInlineTemplate(template.name, emptyTemplate)
							);
						}

						if (this.options.verbose) {
							this.log(' - ' + template.reference + ': ' + template.markup);
						}

						return Promise.all(loadTemplates).then(() => {
							return template;
						});
					}).then(saveTemplate)
				);
			}
		});

		return Promise.all(buildTasks).then(() => {
			if (this.options.verbose) {
				this.log('...Building style guide pages:');
			}

			let buildPageTasks = [];

			// Build the homepage.
			buildPageTasks.push(this.buildPage('index', options, null, []));

			// Group all the sections by their root reference, and make a page for each.
			sectionRoots.forEach(rootReference => {
				buildPageTasks.push(this.buildPage('section', options, rootReference, this.styleGuide.sections(rootReference + '.*')));
			});

			// For each section, build a page which only has a single section on it.
			// istanbul ignore else
			if (this.templates.item) {
				sections.forEach(section => {
					buildPageTasks.push(this.buildPage('item', options, section.reference(), [section]));
				});
			}

			return Promise.all(buildPageTasks);
		}).then(() => {
			// We return the KssStyleGuide, just like KssBuilderBase.build() does.
			return Promise.resolve(styleGuide);
		});
	}

	/**
	 * Source: builder/base/handlebars/kss_builder_base_handlebars.js
	 *
	 * Build the HTML files of the style guide given a KssStyleGuide object.
	 *
	 * @param {KssStyleGuide} styleGuide The KSS style guide in object format.
	 * @returns {Promise.<KssStyleGuide>} A `Promise` object resolving to a
	 *   `KssStyleGuide` object.
	 */
	build(styleGuide) {
		let options = {};
		// Returns a promise to read/load a template provided by the builder.
		options.readBuilderTemplate = (name) => {
			return fs.readFileAsync(path.resolve(this.options.builder, name + '.hbs'), 'utf8').then(content => {
				return this.Handlebars.compile(content);
			});
		};

		// Returns a promise to read/load a template specified by a section.
		options.readSectionTemplate = (name, filepath) => {
			return fs.readFileAsync(filepath, 'utf8').then(fileContent => {
				let output = fileContent;

				const isPugFile = path.extname(filepath) === '.pug';
				if (isPugFile) {
					const pugFn = pug.compileFile(filepath);
					output = pugFn();
				}

				this.Handlebars.registerPartial(name, output);
				return output;
			});
		};

		// Returns a promise to load an inline template from markup.
		options.loadInlineTemplate = (name, markup) => {
			this.Handlebars.registerPartial(name, markup);
			return Promise.resolve();
		};

		// Returns a promise to load the data context given a template file path.
		options.loadContext = filepath => {
			let context;
			// Load sample context for the template from the sample .json file.
			try {
				context = require(path.join(path.dirname(filepath), path.basename(filepath, path.extname(filepath)) + '.json'));
				// require() returns a cached object. We want an independent clone of
				// the object so we can make changes without affecting the original.
				context = JSON.parse(JSON.stringify(context));
			} catch (error) {
				context = {};
			}
			return Promise.resolve(context);
		};

		// Returns a promise to get a template by name.
		options.getTemplate = name => {
			// We don't wrap the rendered template in "new handlebars.SafeString()"
			// since we want the ability to display it as a code sample with {{ }} and
			// as rendered HTML with {{{ }}}.
			return Promise.resolve(this.Handlebars.compile('{{> "' + name + '"}}'));
		};

		// Returns a promise to get a template's markup by name.
		options.getTemplateMarkup = name => {
			// We don't wrap the rendered template in "new handlebars.SafeString()"
			// since we want the ability to display it as a code sample with {{ }} and
			// as rendered HTML with {{{ }}}.
			return Promise.resolve(this.Handlebars.partials[name]);
		};

		// Renders a template and returns the markup.
		options.templateRender = (template, context) => {
			return template(context);
		};

		// Converts a filename into a Handlebars partial name.
		options.filenameToTemplateRef = filename => {
			// Return the filename without the full path or the file extension.
			return path.basename(filename, path.extname(filename));
		};

		options.templateExtension = 'hbs';
		options.emptyTemplate = '{{! Cannot be an empty string. }}';

		return this.buildGuide(styleGuide, options);
	}
	// jshint ignore:end
}

module.exports = KssBuilderScheibo;

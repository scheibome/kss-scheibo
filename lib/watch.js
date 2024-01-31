/* jshint node: true */
'use strict';

const fs = require('fs');
const chokidar = require('chokidar');

const watchForFileContentChanges = (path, regex, callback) => {
	if (typeof callback !== 'function') {
		throw new Error('kss-scheibo watch requires a callback function');
	}

	const regexFileContents = new Map();

	const registerFileContentMatches = (filePath) => {
		const currentFileContent = fs.readFileSync(filePath, 'utf8');
		const currentFileMatches = currentFileContent.match(regex);

		if (currentFileMatches === null) {
			return;
		}

		regexFileContents.set(filePath, currentFileMatches);
	};

	const handleContentChanges = (filePath) => {
		const previousFileMatches = regexFileContents.get(filePath);
		const hasFileBeenReadBefore = previousFileMatches !== undefined;

		const currentFileContent = fs.readFileSync(filePath, 'utf8');
		const currentFileMatches = currentFileContent.match(regex);

		if (hasFileBeenReadBefore === false) {
			regexFileContents.set(filePath, currentFileMatches);
			if (currentFileMatches === null) {
				return;
			}

			callback();
			return;
		}

		const haveFileMatchesChanged = JSON.stringify(previousFileMatches) !== JSON.stringify(currentFileMatches);

		if (haveFileMatchesChanged === false) {
			return;
		}

		regexFileContents.set(filePath, currentFileMatches);
		callback();
	};

	const handleFileRemoval = (filePath) => {
		regexFileContents.delete(filePath);
	};

	chokidar.watch(path)
		.on('add', registerFileContentMatches)
		.on('change', handleContentChanges)
		.on('unlink', handleFileRemoval);
};

module.exports = (path, callback) => {
	// Matches the KSS section comment block
	// (file must start with "/*", end with "*/" and contain "Styleguide"
	const kssSectionRegex = /\/\*[^*]*Styleguide.*?\*\//gs;

	watchForFileContentChanges(
		path,
		kssSectionRegex,
		callback
	);
};

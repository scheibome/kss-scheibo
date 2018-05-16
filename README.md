# KSS-Scheibo - a template for the KSS-node styleguide

[![npm version](https://badge.fury.io/js/kss-scheibo.svg?style=flat)](https://npmjs.org/package/kss-scheibo) [![Issues](http://img.shields.io/github/issues/scheibome/kss-scheibo.svg)]( https://github.com/scheibome/kss-scheibo/issues) ![npm](https://img.shields.io/npm/dt/kss-scheibo.svg)

### Install

`npm install kss-scheibo --save-dev`

### Setup

Create a file name `kss-scheibo.json` in your package.json root with the following lines.
For all configurations see [kss-node documentation](https://github.com/kss-node/kss-node#using-the-command-line-tool)

```
{
  "title"        : "the name of your styleguide",
  "builder"      : "node_modules/kss-scheibo/kss_styleguide/scheibo-template/",
  "source"       : "assets/",
  "destination"  : "../styleguide/",
  "css"          : ['URL_of_a_CSS_file_to_include_in_the_style_guide.css']
}
```

Create a `kss-homepage.md` and add your styles like [style-documentation](https://github.com/kss-node/kss/blob/spec/SPEC.md#style-documentation) in your source folder.

### Generate

Generate your styleguide with the following line:

`node node_modules/kss/bin/kss --config kss-scheibo.json`

### Using kss-scheibo with Gulp

```
var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('kss', function(cb) {
	exec('node node_modules/kss/bin/kss --config kss-scheibo.json', function(err) {
		cb(err);
	});
});
``` 

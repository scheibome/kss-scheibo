# KSS-Scheibo - a template for the KSS-node styleguide

[![npm version](https://badge.fury.io/js/kss-scheibo.svg?style=flat)](https://npmjs.org/package/kss-scheibo) 
![npm](https://img.shields.io/npm/v/kss-scheibo.svg)
 [![Issues](https://img.shields.io/github/issues/scheibome/kss-scheibo.svg)]( https://github.com/scheibome/kss-scheibo/issues) ![npm](https://img.shields.io/npm/dt/kss-scheibo.svg) 
![npm](https://img.shields.io/npm/l/kss-scheibo.svg)


## Install

``npm install kss-scheibo --save-dev``

## Setup

Create a file name `kss-scheibo.json` in your package.json root with the following lines.
For all configurations see [kss-node documentation](https://github.com/kss-node/kss-node#using-the-command-line-tool)

```
{
  "title"        : "the name of your styleguide",
  "builder"      : "node_modules/kss-scheibo/kss_styleguide/scheibo-template/",
  "custom"       : ["Colors"],
  "source"       : "assets/",
  "destination"  : "../styleguide/",
  "css"          : ['URL_of_a_CSS_file_to_include_in_the_style_guide.css']
}
```

Create a ``kss-homepage.md`` and add your styles like [style-documentation](https://github.com/kss-node/kss/blob/spec/SPEC.md#style-documentation) in your source folder.

## Generate

Generate your styleguide with the following line:

`node node_modules/kss/bin/kss --config kss-scheibo.json`

## Using kss-scheibo with Gulp

```
var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('kss', function(cb) {
	exec('node node_modules/kss/bin/kss --config kss-scheibo.json', function(err) {
		cb(err);
	});
});
``` 

## Modifications

#### Insert section into another

You can include another section in a section.
This is possible with ``<insert-markup>``.
The digits after the ``-`` are the specified classes, starting at 0

Here is an [example](https://kss-scheibo.scheibitz.com/section-2.html#kssref-2-2):

```
Markup:
  <form action="#" method="get" class="form {{modifier_class}}">
    <insert-markup>2.1-0</insert-markup>
    <insert-markup>2.1-0</insert-markup>
    <insert-markup>2.1-0</insert-markup>
    <insert-markup>1.2-0</insert-markup>
  </form>
```

#### Colors

add the following config in your ``kss-scheibo.json``

```
{
  "custom" : ["Colors"]
}
```

The markup for the colors is specified as follows:

```
/*
Colors

Colors:
$color-primary  : #FF6400 - This is the primary color
$cloudburst     : #354052 - Font color
$dodgerblue     : #2EA2F8
$crimson        : #ED1C24
$kellygreen     : #1BB934

Styleguide Colors
*/
```

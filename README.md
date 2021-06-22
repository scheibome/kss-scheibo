# KSS-Scheibo - a template for the KSS-node styleguide

[![npm version](https://badge.fury.io/js/kss-scheibo.svg?style=flat)](https://npmjs.org/package/kss-scheibo)
[![Issues](https://img.shields.io/github/issues/scheibome/kss-scheibo.svg)]( https://github.com/scheibome/kss-scheibo/issues) ![npm](https://img.shields.io/npm/dt/kss-scheibo.svg)
![npm](https://img.shields.io/npm/l/kss-scheibo.svg)


## Install

``npm install kss-scheibo --save-dev``

## Setup

Create a ``kss-homepage.md`` and add your styles like [style-documentation](https://github.com/kss-node/kss/blob/spec/SPEC.md#style-documentation) in your source folder.

#### Builder
``node_modules/kss-scheibo/kss_styleguide/scheibo-template/``

#### Custom
``["Colors", "Wrapper", "RequireJS", "BodyClass", "HtmlLang"]``

##### Optional
Create a JSON file like `kss-scheibo.json` in your package.json root with the following lines.
For all configurations see [kss-node documentation](https://github.com/kss-node/kss-node#using-the-command-line-tool)

```
{
  "title"        : "the name of your styleguide",
  "builder"      : "node_modules/kss-scheibo/kss_styleguide/scheibo-template/",
  "custom"       : ["Colors", "Wrapper", "RequireJS", "BodyClass", "HtmlLang"],
  "source"       : "assets/",
  "destination"  : "../styleguide/",
  "css"          : ['URL_of_a_CSS_file_to_include_in_the_style_guide.css']
}
```

## Generate

Generate your styleguide with the following line:

``node node_modules/kss/bin/kss --config [yourconfigname].json``

or

``node node_modules/kss/bin/kss --source "assets/" --destination "../styleguide/" --builder "node_modules/kss-scheibo/kss_styleguide/scheibo-template/" --custom "['Colors', 'Wrapper', 'RequireJS']" `` etc.

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

#### Wrapper

add the following config in your ``kss-scheibo.json``

```
{
  "custom" : ["Wrapper"]
}
```

The markup for the wrapper is specified as follows:

```
/*
Form

Markup: templates/02_components/form.html

Wrapper:
<div style="background-color: grey;">
  <wrapper-content/>
</div>

form-input--small - This is a large style

Styleguide 2.2
*/
```

#### RequireJS

##### Global

You can add RequireJs as global option and in every single fullscreen mode.
To add RequireJs global, add ``"requirejs": ["/javascripts/Vendor/require.js", "/javascripts/main"]`` into the ``kss-scheibo.json`` as new option.

##### Only in the fullscreen mode and every single element
The first option is the path to requireJS, the second is the path to the data-main file.
Add the following config in your ``kss-scheibo.json``

```
{
  "custom" : ["RequireJS"]
}
```

The markup for requireJs in fullscreen mode is specified as follows:

```
/*
Form

Markup: templates/02_components/form.html

Requirejs:
  /javascripts/Vendor/require.js : /javascripts/main

Styleguide 2.2
*/
```

#### Bodyclass

##### Global

You can add a global body class and in every single fullscreen mode.
To add your class global, add ``"bodyclass": "yourclassname"`` into the ``kss-scheibo.json`` as new option.

##### Only in the fullscreen mode and every single element

You can add your own bodyclass for every single fullscreen mode.
Add the following config in your ``kss-scheibo.json``

```
{
  "custom" : ["BodyClass"]
}
```

The markup for bodyclass in fullscreen mode is specified as follows:

```
/*
Form

Markup: templates/02_components/form.html

bodyclass: demobodyclass

Styleguide 2.2
*/
```

#### HTML lang attribute

##### Global

You can change the global [lang attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang).
To change the lang attribute, add ``"htmllang": "de"`` into the ``kss-scheibo.json`` as new option.

```
{
  "custom" : ["HtmlLang"],
  "htmllang": "de"
}
```

#### Hint

Is the markup a file, the name must be unique.

#### Theme Color

You can set your own maincolors for the theme by set the following css pseudo-classes

```
:root {
  #{--kss-scheibo--maincolor}: #6CB2EB;
  #{--kss-scheibo--maincolor-con}: #FFFFFF;
}
```

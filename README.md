# Install

`npm install kss-scheibo --save-dev`


##### kss-config.json

```
{
  "title"        : "KSS-Scheibo Theme",

  "//": "relative to this file.",
  "builder"      : "node_modules/kss-scheibo/kss_styleguide/scheibo-template/",
  "source"       : "assets/",
  "destination"  : "../styleguide/",

  "//": "relative to the generated style guide.",
  "css": [],
  "js" : []
```


`node node_modules/.bin/kss --config kss-config.json`

const kss = require('kss');


kss.traverse('./source/scss').then(function(styleGuide) {
	replaceInsertMarkup(styleGuide.sections());
});

function replaceInsertMarkup(sections) {
	console.log(sections);
	//console.log($sections.KssSection);
}

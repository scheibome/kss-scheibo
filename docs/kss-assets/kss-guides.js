(function(window, document) {
	'use strict';
	var KssGuides = function(config) {
		this.bodyClass = config.bodyClass || 'kss-guides-mode';
		this.init();
	};
	KssGuides.prototype.init = function() {
		var self = this;
		// Initialize all guides toggle buttons.
		var elementList = document.querySelectorAll('a[data-kss-guides]');
		for (var button of elementList) {
			button.onclick = self.showGuides.bind(self);
		}
	};
	// Toggle the guides mode.
	KssGuides.prototype.showGuides = function() {
		document.getElementsByTagName('body')[0].classList.toggle(this.bodyClass);
	};
	// Export to DOM global space.
	window.KssGuides = KssGuides;
})(window, document);

(function(window, document) {
	'use strict';
	var KssMarkup = function(config) {
		this.bodyClass = config.bodyClass || 'kss-markup-mode';
		this.detailsClass = config.detailsClass || 'kss-markup';
		this.init();
	};
	KssMarkup.prototype.init = function() {
		var self = this;
		// Initialize all markup toggle buttons.
		var elementList = document.querySelectorAll('a[data-kss-markup]');
		for (var button of elementList) {
			button.onclick = self.showGuides.bind(self);
		}

		var detailMarkupElements = document.querySelectorAll('.' + this.detailsClass);
		for (var detail of detailMarkupElements) {
			detail.addEventListener('click', function(event) {
				self.highlightMarkup(event.currentTarget);
			});
		}
	};
	// Activation function that takes the ID of the element that will receive
	// fullscreen focus.
	KssMarkup.prototype.showGuides = function() {
		var body = document.getElementsByTagName('body')[0],
			enabled = body.classList.contains(this.bodyClass);
		var elementList = document.querySelectorAll('.' + this.detailsClass);
		for (var el of elementList) {
			if (enabled) {
				el.removeAttribute('open');
			} else {
				el.setAttribute('open', '');
				this.highlightMarkup(el);
			}
		}
		// Toggle the markup mode.
		body.classList.toggle(this.bodyClass);
	};

	KssMarkup.prototype.highlightMarkup = function(element) {
		if (!element.classList.contains('prism-highlighted')) {
			window.Prism.highlightAllUnder(element);
			element.currentTarget.classList.add('prism-highlighted');
		}
	}
	// Export to DOM global space.
	window.KssMarkup = KssMarkup;
})(window, document);

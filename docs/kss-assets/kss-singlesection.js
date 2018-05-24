(function(window, document) {
	'use strict';
	const sectionclass = '.kss-section';
	const sectionclasshidden = 'kss-section--hidden';

	let KssSingleSection = function() {
		if (window.location.hash) {
			this.setFocus(window.location.hash.substr(1));
		}
		this.init();
	};

	KssSingleSection.prototype.init = function() {
		let self = this;
		// Initialize toggle button for all sections in navigation.
		let navigationlinks = document.querySelectorAll('.kss-nav__menu-link');
		navigationlinks.forEach(function(links) {
			links.onclick = self.setFocus.bind(self, links.dataset.singlesectiontrigger);
		});
	};

	KssSingleSection.prototype.setFocus = function(id) {
		let el;
		if (el = document.getElementById(id)) {
			let sections = document.querySelectorAll(sectionclass);
			sections.forEach(function(section) {
				section.classList.add(sectionclasshidden);
			});
			el.classList.remove(sectionclasshidden);
		}
		return true;
	};

	window.KssSingleSection = KssSingleSection;
})(window, document);

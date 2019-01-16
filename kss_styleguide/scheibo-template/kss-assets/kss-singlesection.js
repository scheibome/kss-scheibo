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

	KssSingleSection.prototype.setFocus = function(id, trigger) {
		let el;
		if (el = document.getElementById(id)) {
			let sections = document.querySelectorAll(sectionclass);
			sections.forEach(function(section) {
				if (section.id === id || section.id.startsWith(id + '-')) {
					section.classList.remove(sectionclasshidden);
				} else {
					section.classList.add(sectionclasshidden);
				}
			});
			el.classList.remove(sectionclasshidden);
			this.pushUrl(id);

			if (trigger) {
				let headerHeight = document.querySelector('header.kss-header').offsetHeight;
				let windowTop = document.documentElement.scrollTop;
				let contentTopMargin = windowTop - headerHeight;

				if (windowTop > headerHeight) {
					el.style.marginTop = contentTopMargin + 'px';
				}
			}
		}

		return true;
	};

	KssSingleSection.prototype.pushUrl = function(id) {
		if (typeof (history.pushState) !== 'undefined') {
			let obj = {
				Url: '#' + id
			};
			history.pushState(null, null, obj.Url);
		} else {
			alert('Browser does not support HTML5.');
		}
	};

	window.KssSingleSection = KssSingleSection;
})(window, document);

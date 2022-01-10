(function() {
	'use strict';
	var searchInput = document.getElementById('kss-search__input');
	var searchList = document.getElementById('kss-search__list');
	var searchItems = document.querySelectorAll('.kss-search__item');
	var mainNavigation = document.querySelector('nav.kss-nav');
	var searchListDisplayClassname = 'kss-search__list--display';

	function recursiveListSearch(el) {
		var nextListItem = el.parentNode.parentNode;
		if (nextListItem.nodeName === 'LI') {
			nextListItem.style.display = '';
			recursiveListSearch(nextListItem);
		}
	}

	function kssSearch() {
		var filter;
		var a;
		var i;
		filter = searchInput.value.toUpperCase();

		// Loop through all list items, and hide those who don't match the search query
		for (i = 0; i < searchItems.length; i++) {
			a = searchItems[i].getElementsByTagName('a')[0];
			if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
				searchItems[i].style.display = '';
				recursiveListSearch(searchItems[i]);
			} else {
				searchItems[i].style.display = 'none';
			}
		}
	}
	document.addEventListener('click', function(e) {
		if (e.target === searchInput) {
			searchInput.addEventListener('keyup', function() {
				if (!searchList.classList.contains(searchListDisplayClassname)) {
					searchList.classList.add(searchListDisplayClassname);
					mainNavigation.style.opacity = '0';
					console.log(1641834680659, mainNavigation);
				}
				kssSearch();
			});
		} else {
			searchList.classList.remove(searchListDisplayClassname);
			mainNavigation.style.opacity = '1';
		}
	});
})();

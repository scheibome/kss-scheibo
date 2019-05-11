(function() {
	'use strict';
	var searchInput = document.getElementById('kss-search__input');
	var searchList = document.getElementById('kss-search__list');
	var searchItems = document.querySelectorAll('.kss-search__item');
	var searchListDisplayClassname = 'kss-search__list--display';

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
			} else {
				searchItems[i].style.display = 'none';
			}
		}
	}
	document.addEventListener('click', function(e) {
		if (e.target === searchInput) {
			searchList.classList.add(searchListDisplayClassname);
			searchInput.addEventListener('keyup', function() {
				kssSearch();
			});
		} else {
			searchList.classList.remove(searchListDisplayClassname);
		}
	});
})();

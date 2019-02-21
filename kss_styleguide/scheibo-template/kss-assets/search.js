(function() {
	var searchInput = document.getElementById('kss-search__input');
	var searchList = document.getElementById('kss-search__list');
	var searchListDisplayClassname = 'kss-search__list--display';

	document.addEventListener('click', function(e) {
		if (e.target.matches('#kss-search__input')) {
			searchList.classList.add(searchListDisplayClassname);
			console.log(e);
		}
	});

	// $("#kss-search__input").on("focusin", function() {
	// 	$("#kss-search__list").show();
	// });

	// $(document).click(function(event) {
	// 	if (!$(event.target).closest(".kss-search").length) {
	// 		if ($("#kss-search__list").is(":visible")) {
	// 			$("#kss-search__list").hide();
	// 		}
	// 	}
	// });

	// function kssSearch() {
	// 	// Declare variables
	// 	var input, filter, ul, li, a, i;
	// 	input = document.getElementById("kss-search__input");
	// 	filter = input.value.toUpperCase();
	// 	ul = document.getElementById("kss-search__list");
	// 	li = ul.getElementsByTagName("li");
	//
	// 	// Loop through all list items, and hide those who don't match the search query
	// 	for (i = 0; i < li.length; i++) {
	// 		a = li[i].getElementsByTagName("a")[0];
	// 		if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
	// 			li[i].style.display = "";
	// 		} else {
	// 			li[i].style.display = "none";
	// 		}
	// 	}
	// }
})();

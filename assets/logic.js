$(function () {

	// when we relaod all buttons gets add to the page
	populateButtons(searchArray, "searchButton", "#buttonsArea");
	console.log("page loaded");
})

// list of cartoons
var searchArray = ["Bob's Burgers", "South Park", "F is for family", "Daria", "Rick and Morty", "American Dad", "Family Guy"];

// function to populate buttons
function populateButtons(searchArray, classToAdd, areaToAddTo) {

	// empty out buttons area every time we add a new button to prevent copies of buttons
	$(areaToAddTo).empty();

	// lops through the list of cartoons
	for (var i = 0; i < searchArray.length; i++) {

		// modifiying button element
		var a = $("<button>");
		// add a class
		a.addClass(classToAdd);
		// add type of data equal to search array
		a.attr("data-type", searchArray[i]);
		// text of button equal to search array 
		a.text(searchArray[i]);
		// 
		$(areaToAddTo).append(a);
	}
}

// when the searchbutton is clicked
$(document).on("click", ".searchButton", function () {
	var type = $(this).data("type");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=VDI1IDJjdm7DGBpfMAc58F85a37aDulQ&limit=10";

	// API call
	$.ajax({
		url: queryURL,
		method: "GET"
		// return reponse within a function
	}).done(function (response) {
		// loops through data array
		for (var i = 0; i < response.data.length; i++) {

			// reference to the div that will be modified
			var searchDiv = $("<div class='search-item'>");

			// storing the rating of the Giphy
			var rating = response.data[i].rating;

			// contain the text of rating
			var p = $("<p>").text("Rating: " + rating);

			var animated = response.data[i].images.fixed_height.url;

			var still = reponse.data[i].images.fixed_height_still.url;

			// image tag
			var image = $("<img>");
			image.attr("src", still);
			image.attr("data-still", still);
			image.attr("data-animated", animated);
			image.attr("data-state", "still");
			image.addClass("searchImage");
			searchDiv.append(p);

		}
	})

})
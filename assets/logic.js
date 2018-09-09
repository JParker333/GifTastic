$(function () {

	// when we relaod all buttons get added to the page
	populateButtons(searchArray, "searchButton", "#buttonsArea");
	console.log("page loaded");
})

// list of cartoons
var searchArray = ["Bob's Burgers", "South Park", "F is for family", "Daria", "Rick and Morty", "American Dad", "Family Guy", "King of the Hill"];

// function to populate buttons
function populateButtons(searchArray, classToAdd, areaToAddTo) {

	// empty out buttons area every time we add a new button to prevent copies of buttons
	$(areaToAddTo).empty();

	// loops through the list of cartoons
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
	$("#searches").empty();

	var type = $(this).data("type");
	console.log(type);

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=VDI1IDJjdm7DGBpfMAc58F85a37aDulQ&limit=10";


	// API call
	$.ajax({
		url: queryURL,
		method: "GET"
		// 	// return reponse within a function
	}).then(function (response) {
		console.log(response);

		// loops through data array
		for (var i = 0; i < response.data.length; i++) {

			// reference to the div that will be modified
			var searchDiv = $("<div class='search-item'>");

			// storing the rating of the Giphy
			var rating = response.data[i].rating;

			// contain the text of rating
			var p = $("<p>").text("Rating: " + rating);

			var animated = response.data[i].images.fixed_height.url;

			var still = response.data[i].images.fixed_height_still.url;

			// image tag
			var image = $("<img>");

			// modifiying the image
			image.attr("src", still);
			image.attr("data-still", still);
			image.attr("data-animated", animated);
			image.attr("data-state", "still");
			image.addClass("searchImage");
			// adding the above to a search div
			// adding in the paragraph that tells us the rating
			searchDiv.append(p);
			// adding in the image for Gif
			searchDiv.append(image);
			// adding to within HTML
			$("#searches").append(searchDiv);

		}
	})
})

// animating the gifs
$(document).on("click", ".searchImage", function(){

	var state = $(this).attr("data-state");
	if (state==="still"){
		$(this).attr("src", $(this).data("animated"))
		$(this).attr("data-state", "animated");
	} else {
		$(this).attr("src", $(this).data("still"))
		$(this).attr("data-state", "still");
	}
})

// adding new buttons
$("#addSearch").on("click", function () {

	// grabs whatever is stored within text box and place in new search var
	// eq looks for an input
	var newSearch = $("input").eq(0).val();

	// add to search array 
	searchArray.push(newSearch);

	populateButtons(searchArray, "searchButton", "#buttonsArea");

	// return false because we have a submit type button
	// so that we can prevent from re loading the page
	return false;

})
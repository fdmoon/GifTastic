$(document).ready(function() {
	var foodGroup = ["Biscuit", "Bread", "Baked potato", "Buffalo wing", "Chicken nugget", "Corn dog", "Doughnut", "Fajita", "Hamburger", "Ice cream cake", "Onion ring", "Oreo", "Pancakes", "Pizza", "Pumpkin pie", "Ribs", "Waffle"];

	function renderButtons() {
		$("#button-view").empty();

		for (var i = 0; i < foodGroup.length; i++) {
			var btn = $("<button type='button' class='btn btn-info'>");
			btn.addClass("food");
			btn.attr("data-name", foodGroup[i]);
			btn.text(foodGroup[i]);
			$("#button-view").append(btn);
		}
	}

	$("#add-food").on("click", function(event) {
		event.preventDefault();

		var food = $("#food-input").val().trim();
		foodGroup.push(food);

		renderButtons();
	});

	$(document).on("click", ".food", function() {
		var food = $(this).attr("data-name");

		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&limit=10&g=pg+g&api_key=dc6zaTOxFJmzC";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			$("#food-view").empty();

			var data = response.data;
			var div;
			var img;

			for(var i=0; i<data.length; i++) {
				div = $("<div class='food-img'>");
				div.append("<strong>Rating: " + data[i].rating + "</strong><br>");

				img = $("<img class='giphy' data-state='still'>");
				img.attr({
					"src": data[i].images.fixed_height_still.url,
					"data-still": data[i].images.fixed_height_still.url,
					"data-animate": data[i].images.fixed_height.url
				});
				div.append(img);

				$("#food-view").append(div);
			}
		});
	});

	$(document).on("click", ".giphy", function() {
		var state = $(this).attr("data-state");

		if(state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");

		}
		else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	});

	renderButtons();
});

	
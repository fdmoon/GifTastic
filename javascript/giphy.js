$(document).ready(function() {
	var foodGroup = ["bread", "fries", "buffalo wing", "chicken nugget", "corn dog", "doughnut", "fajita", "hamburger", "ice cream cake", "onion ring", "oreo", "pancakes", "pizza", "pumpkin pie", "ribs", "sandwich", "waffle", "bibimbap"];

	var curButtonId = "";

	function renderButtons() {
		$("#button-view").empty();

		for (var i = 0; i < foodGroup.length; i++) {
			var btn = $("<button type='button' class='btn btn-info'>");
			btn.addClass("food-btn");
			btn.attr("id", "item"+(i+1));
			btn.attr("data-name", foodGroup[i]);
			btn.text(foodGroup[i]);

			if(curButtonId === btn.attr("id")) {
				btn.addClass("btn-danger");
			}

			$("#button-view").append(btn);
		}
	}

	$("#add-food").on("click", function(event) {
		event.preventDefault();

		var food = $("#food-input").val().trim();
		foodGroup.push(food);

		$("#food-input").val("");

		renderButtons();
	});

	$(document).on("click", ".food-btn", function() {
		curButtonId = $(this).attr("id");

		for (var i = 0; i < foodGroup.length; i++) {
			$("#button-view").children().eq(i).removeClass("btn-danger");
		}
		$(this).addClass("btn-danger");


		var food = $(this).attr("data-name");

		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&limit=10&rating=pg-13&api_key=LIbNaEBuTfqucbor28clE97pSNU26jUV";

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


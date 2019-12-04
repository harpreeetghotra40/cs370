$(document).ready(function() {
	loadMenu();
	// checkLogin();
	loadFlights();
});

function loadMenu() {
	$nav = $("nav");
	$.get("./menu.html", function(data){
		$nav.html(data);
	});
}

function checkLogin() {
    if (localStorage.jwt === null || localStorage.jwt === undefined) {
        location.href = 'login.html';
    } else {
        document.querySelector('#username').innerText = localStorage.username;
    }
}

function loadFlights() {
	$flightContainer = $("#flight-container");
	$flightCount = 10;
	pullFlightdata($flightCount);

}

function pullFlightdata(count) {
	if(count > 0) {
    fetch("http://localhost:3000/flights", {
            "method": "POST",
            "headers": {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                "airportSource": flyCityA_oneWay,
                "airportDestination": flyCityB_oneWay,
                "date": flyingFromDate_oneWay
            })
        })
        .then(response => response.json())
        .then(response => {
            displayResults(response);
        })
		$.ajax({
			url: './user-flight.html',
			type: 'GET',
			async: 'true',
			success: function(result) {
				console.log(count + "testing");
				$flight = $(document.createElement("div"))
					.attr({"class" : "flight"});
				$flight.html(result);
				$($flight).find(".code").text(count + "testing");
				$($flightContainer).append($flight);
				pullFlightdata(count - 1);
			}
		});
	}
}
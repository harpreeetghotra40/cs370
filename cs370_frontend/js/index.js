$(document).ready(function() {
	loadMenu();
	if ($(".book-flight-widget").length) loadBookFlightWidget();
	if ($("#flight-container").length)loadFlights();
	
});
function makeReservation(event) {
    event.preventDefault();
    let flyCityA_round = document.querySelector("#flyCityA_round").value
    let flyCityA_oneWay = document.querySelector("#flyCityA_oneWay").value
    let flyCityB_round = document.querySelector("#flyCityB_round").value
    let flyCityB_oneWay = document.querySelector("#flyCityB_oneWay").value
    let flyingFromDate_round = document.querySelector("#flyingFromDate_round").value
    let flyingFromDate_oneWay = document.querySelector("#flyingFromDate_oneWay").value
    let flyingToDate_round = document.querySelector("#flyingToDate_round").value
    let numOfPassenger = document.querySelector("#passenger").value
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
}
function displayResults(flights){
    console.log(flights);
}
function clickArrow(event) {
    event.target.click();
}
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    tabcontent[0].style.display = "block";
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
function checkLogin() {
    if (localStorage.jwt === null || localStorage.jwt === undefined) {
		
    } else {
        $('#account').html("").load("user-login.html");
    }
}
function signOut() {
    localStorage.clear();
    // window.location.href = "login.html";
}
function loadMenu() {
	$nav = $("nav");
    $nav.html("").load("./menu.html", function() {
		checkLogin();
	});
}
function loadBookFlightWidget(){
    $widget = $(".book-flight-widget");
    $($widget).html("").load("./book-flight-widget.html");
}
function loadFlights() {
	$flightContainer = $("#flight-container");
	$flightCount = 10;
	pullFlightdata($flightCount);

}
function pullFlightdata(count) {
	if(count > 0) {
    // fetch("http://localhost:3000/flights", {
            // "method": "POST",
            // "headers": {
                // 'Content-Type': 'application/json',
                // 'Accepts': 'application/json'
            // },
            // body: JSON.stringify({
                // "airportSource": flyCityA_oneWay,
                // "airportDestination": flyCityB_oneWay,
                // "date": flyingFromDate_oneWay
            // })
        // })
        // .then(response => response.json())
        // .then(response => {
            // displayResults(response);
        // })
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
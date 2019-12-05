$(document).ready(function() {
	loadMenu();
	if ($(".book-flight-widget").length) loadBookFlightWidget();
	if ($("#flight-container").length)loadFlights();	
    if ($(".flight_list").length)loadFlightListResult();
    if ($("#Departure").length)loadAirportInfoResult();
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
		// $('#account').html("").load("user-login.html");
		$account = $('#account');
        $.ajax({
			url: 'user-login.html',
			type: 'GET',
			async: 'true',
			success: function(result) {
				$account.html(result);
				$account.find("a:first").text(localStorage.username);
			}
		});
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
function loadFlightListResult(){
    $flight_list = $(".flight_list");
    $($flight_list).html("").load("./flight-list-result.html");
}
function loadAirportInfoResult(){
    $tabcontent = $(".tabcontent");
    $($tabcontent).html("").load("./airport-content.html");
}
function loadFlights(from, to, date) {
	$flightContainer = $("#flight-container");
	fetch(`http://localhost:3000/reservations`, {
		"method": "GET",
		"headers": {
			'Content-Type': 'application/json',
			'Accepts': 'application/json',
			'Authorization': `Bearer ${localStorage.jwt}`
		}
	})
	.then(res => res.json())
	.then(res => {
		$tickets = res;
		console.log($tickets);
		pullFlightdata($tickets, $tickets.length);
	});
}
function pullFlightdata(data, count) {
	if(count > 0) {
		$.ajax({
			url: './user-flight.html',
			type: 'GET',
			async: 'true',
			success: function(result) {
				$flight = $(document.createElement("div"))
					.attr({"class" : "flight"});
				$flight.html(result);
				$($flight).find(".airline").text(getAirline(data[data.length-count].airline_id));
				$($flight).find(".from-airport").text(getAirport(data[data.length-count].airportSource));
				$($flight).find(".from-time").text(readTime(data[data.length-count].timeOfDeparture));
				$($flight).find(".to-airport").text(getAirport(data[data.length-count].airportDestination));
				$($flight).find(".to-time").text(readTime(data[data.length-count].timeOfArrival));
				$($flight).find(".duration").text(getDuration(data[data.length-count].timeOfDeparture,data[data.length-count].timeOfArrival));
				$($flight).find(".price").text(readTime(data[data.length-count].price));
				$($flight).find(".seats").text(readTime(data[data.length-count].seats));
				$flightContainer.append($flight);
				pullFlightdata(data, count - 1);
				// console.log(getAirline(data[data.length-count].airline_id));
				// console.log(getAirport(data[data.length-count].airportSource));
				// console.log(readTime(data[data.length-count].timeOfDeparture));
				// console.log(getAirport(data[data.length-count].airportDestination));
				// console.log(readTime(data[data.length-count].timeOfArrival));
				// console.log(getDuration(data[data.length-count].timeOfDeparture,data[data.length-count].timeOfArrival));
				// console.log(readTime(data[data.length-count].price));
				// console.log(readTime(data[data.length-count].seats));
			}
		});
	}
}
function getAirline(airline) {
	switch(airline){
		case 1: return "H-Air";
		case 2: return "P-Air";
		case 3: return "J-Air";
		default: return "Airline";
	}
}
function getAirport(airport) {
	switch(airport){
		case 1: return "JFK";
		case 2: return "LAX";
		case 3: return "Airport";
		default: return "Airport";
	}
}
function readTime(time) {
	$date = new Date(time);
	return $date.toUTCString();
}
function getDuration(from, to) {
	$start = new Date(from);
	$end = new Date(to);
	$minutes = parseInt(($end.getTime() - $start.getTime())/(60*1000));
	$m = $minutes%60;
	$h = Math.floor($minutes/60);
	return $h + " hours " + $m + " minutes";
}
function redirectToSearchFlights(){
	$from = $("#flyCityA_oneWay").val();
	$to = $("#flyCityB_oneWay").val();
    $date = new Date($("#flyingFromDate_oneWay").val());
	$airline = $("title").text();
	if ($airline == "Flight Bookings") $airline = null;
	loadSearchFlightPage($to, $from, $date, $airline);
}
function loadSearchFlightPage(from, to, date, airline) {
	localStorage.setItem('from',from);
	localStorage.setItem('to',to);
	localStorage.setItem('date',date);
	localStorage.setItem('airline', airline);
	console.log(localStorage.airline);
	window.location.href = "search-itinerary.html";
}
function loadSearchFlightData(from, to, date, airline) {
	$flightContainer = $("#flight-result-container");
	
	console.log(localStorage.airline);
	fetch("http://localhost:3000/flights", {
		"method": "POST",
		"headers": {
			'Content-Type': 'application/json',
			'Accepts': 'application/json'
		},
		body: JSON.stringify({
			"airportSource": from,
			"airportDestination": to,
			"date": date,
			"airline": airline
		})
	})
	.then(response => response.json())
	.then(response => {
		$flights = response;			
		pullFlightResultdata($flights, $flights.length);
	})
}
function pullFlightResultdata(data, count) {
	if(count > 0) {
		$.ajax({
			url: './result-flight.html',
			type: 'GET',
			async: 'true',
			success: function(result) {
				$flight = $(document.createElement("div"))
					.attr({"class" : "flight"});
				$flight.html(result);
				$($flight).find(".airline").text(getAirline(data[data.length-count].airline_id));
				$($flight).find(".from-airport").text(getAirport(data[data.length-count].airportSource));
				$($flight).find(".from-time").text(readTime(data[data.length-count].timeOfDeparture));
				$($flight).find(".to-airport").text(getAirport(data[data.length-count].airportDestination));
				$($flight).find(".to-time").text(readTime(data[data.length-count].timeOfArrival));
				$($flight).find(".duration").text(getDuration(data[data.length-count].timeOfDeparture,data[data.length-count].timeOfArrival));
				$($flight).find(".price").text(readTime(data[data.length-count].price));
				$($flight).find(".seats").text(readTime(data[data.length-count].seats));
				$($flight).find(".flightCode").text(data[data.length-count].id);
				$flightContainer.append($flight);
				if ($("h2").text() == "Ticket") {
					$(".buyButton").text("Confirm");
					$(".buyButton").attr({'onclick':'confirmTicket()'});
				}
				pullFlightResultdata(data, count - 1);
			}
		});
	}
}
function buyTicket() {
	$ticket = event.target;
	$ticket = $ticket.parentElement;
	$flight = $($ticket).find(".flightCode").text();
	localStorage.setItem('flightID',$flight);
	// localStorage.setItem('airline',$($ticket).find(".airline").text());
	// localStorage.setItem('from-airport',$($ticket).find(".from-airport").text());
	// localStorage.setItem('from-time',$($ticket).find(".from-time").text());
	// localStorage.setItem('to-airport',$($ticket).find(".to-airport").text());
	// localStorage.setItem('to-time',$($ticket).find(".to-time").text());
	// localStorage.setItem('duration',$($ticket).find(".duration").text());
	// localStorage.setItem('price',$($ticket).find(".price").text());
	// localStorage.setItem('seats',$($ticket).find(".seats").text());
	window.location.href = "buy-ticket.html";
}
function loadTicketDetails() {
	$flightID = localStorage.flightID;
	fetch(`http://localhost:3000/flights/getFlight`, {
		"method": "POST",
		"headers": {
			'Content-Type': 'application/json',
			'Accepts': 'application/json',
			'Authorization': `Bearer ${localStorage.jwt}`
		},
		body: JSON.stringify({
			"flight_id": $flightID
		})
	})
	.then(res => res.json())
	.then(res => {
	$flights = res;
	console.log($flights);
	$flightContainer = $("#flight-result-container");
	pullFlightResultdata($($flights), 1);})
}
function confirmTicket() {
	console.log(localStorage.flightID);
	fetch(`http://localhost:3000/reservations/new`, {
		"method": "POST",
		"headers": {
			'Content-Type': 'application/json',
			'Accepts': 'application/json',
			'Authorization': `Bearer ${localStorage.jwt}`
		},
		body: JSON.stringify({
			"flight_id": localStorage.flightID,
			"seats": "23"
		})
	})
	.then(res => res.json())
	.then(res => {
		window.location.href = "user-itinerary.html";
	})
}
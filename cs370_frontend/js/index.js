$(document).ready(function() {
	loadMenu();
	checkLogin();
});

function loadMenu() {
	$nav = $("nav");
	$nav.html("").load("./menu.html");
}

function checkLogin() {
    if (localStorage.jwt === null || localStorage.jwt === undefined) {
        location.href = 'login.html';
    } else {
        document.querySelector('#username').innerText = localStorage.username;
    }
}

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

function logout() {
    // console.log("halll");
    localStorage.clear();
    window.location.href = "login.html";
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
        location.href = 'login.html';
    } else {
        document.querySelector('#username').innerText = localStorage.username;
    }
}
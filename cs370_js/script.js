$(document).ready(function() {
	loadMenu();
});

function loadMenu() {
	$nav = $("nav");
	$nav.html("").load("./menu.html");
}
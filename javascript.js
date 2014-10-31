var year = "1";
var roommates = 1;
var available;

//ROOM LISTS: http://brown.edu/Student_Services/Residential_Council/lottery/RoomIndex2012pv.php
//Based on spring 2014 data
//Note: Minden Quads are available only to Sophmores and Miden Singles are available only to Juniors/Seniors.
//Marcy, Thayer, NewPembroke, and Plantations are not included on the map - too far north
var sophmores = ["barbour", "chapin", "diman", "goddard", "harkness", "hope", "littlefield", "caswell", "mindens", "olney", "perkins", "sears"];
var junior_senior = ["grada", "gradb", "gradc", "gradd", "gregoriana", "gregorianb", "hegeman", "mindenjs", "slater", "youngorchard"];

var singles = ["barbour", "chapin", "diman", "goddard", "grada", "gradc", "gradd", "gregoriana", "gregorianb", "harkness", "hegeman", "hope", "mindenjs", "olney", "perkins", "sears", "slater"];
var doubles = ["barbour", "chapin", "diman", "goddard", "gregoriana", "gregorianb", "harkness", "hegeman", "hope", "littlefield", "caswell", "mindens", "mindenjs", "slater", "olney", "perkins", "sears"];
var triples = ["barbour", "diman", "gregoriana", "hegeman", "mindens", "mindenjs", "slater"];
var quads = ["barbour", "grada", "gradb", "gregoriana", "gregorianb", "mindens", "slater", "youngorchard"];
var suite5 = ["gradb", "barbour", "chapin", "gradc", "gregoriana", "gregorianb"];
var suite6 = ["goddard", "gradb", "gradc"];
var suite7 = ["harkness", "sears"];
var suite8 = ["diman", "gregoriana", "harkness"];
var allRooms = [singles, doubles, triples, quads, suite5, suite6, suite7, suite8];

function showAvailable(){
	if (available.length==0){
		$("#none").fadeIn("slow");
		$("#allDorms").css("display","none");
	}
	else { 
		$("#none").css("display","none");
		$("#allDorms").css("display","block");
	}
	for (var i in available){
		var dorm = available[i];
		if (dorm == "mindenjs" || dorm=="mindens"){
			dorm = "minden";
		}
		var dot = $("#map_"+dorm);
		dot.css("display","block");
		$("#"+dorm).css("display","block");
	}
}

function updateAvailable(){
	for (var i in available){
		var dorm = available[i];
		if (dorm == "mindenjs" || dorm=="mindens"){
			dorm = "minden";
		}
		var dot = $("#map_"+dorm);
		dot.css("display","none");
		$("#"+dorm).css("display","none");
	}
	available = [];
	var rooms = allRooms[roommates-1];
	for (var i in rooms){
		if (year=="1" && sophmores.indexOf(rooms[i])>-1){
			available.push(rooms[i]);
		}
		else if ((year=="2" || year=="3") && junior_senior.indexOf(rooms[i])>-1){
			available.push(rooms[i]);
		}
	}
	showAvailable();
}

$(document).ready(function() {
	available = ["barbour", "chapin", "diman", "goddard", "harkness", "hope", "olney", "perkins", "sears"];
	showAvailable();

	$(".option").click( function() {
		year = $(this).attr("id")[4];
		$(".active").removeClass("active");
		$(this).addClass("active");
		if (year=="1"){
			$("#year_person").attr("src","fresh.png");
		}
		else if (year=="2"){
			$("#year_person").attr("src","soph.png");
		}
		else if (year=="3"){
			$("#year_person").attr("src","junior.png");
		}
		updateAvailable();
	});

	$("#triangle-up").click( function() {
		if (roommates<8){
			var li = document.createElement("li");
			var ul = document.getElementById("roommateList");
			ul.appendChild(li);
			roommates ++;
			updateAvailable();
		}
	});

	$("#triangle-down").click( function() {
		if (roommates>1){
			$("#roommateList li:last").remove();
			roommates--;
			updateAvailable();
		}
	});

	$(".location").hover( function() {
			$(this).animate({
	    		height: 50,
	    		width: 50
			});
			var id = $(this).attr("id");
			id=id.split("_");
			console.log("label_"+id[1]);
			$("#label_"+id[1]).fadeIn();
		}, function() {
			$(this).animate({
	    		height: 40,
	    		width: 40
	    	});
	    	var id = $(this).attr("id");
			id=id.split("_");
	    	$("#label_"+id[1]).fadeOut();
	});



	//Scrolling/Click listeners

	$(document).scroll(function () {
	    if ($(this).scrollTop() > 4012) { $('#back').fadeIn();
	    } else { $('#back').fadeOut(); }

	     if ($(this).scrollTop() > 4012) { $('#nav').fadeOut();
	    } else { $('#nav').fadeIn(); }

	});


	$(".location").click( function() {

		$.fn.scrollView = function () {
    		return this.each(function () {
        		$('html, body').animate({
            		scrollTop: $(this).offset().top
        		}, "slow");
    		});
		}

		var id = $(this).attr("id");
		id = id.split("_");
		$("#"+id[1]).scrollView();
	});

	$("#back").click( function() {
		$.fn.scrollView = function () {
    		return this.each(function () {
        		$('html, body').animate({
            		scrollTop: $(this).offset().top
        		}, "slow");
    		});
		}
		$("#map").scrollView();
	});

	$("#nav li").click( function() {
		$.fn.scrollView = function () {
    		return this.each(function () {
    			var id = $(this).attr("id");
    			console.log(id);
    			var scroll = $(this).offset().top;
    			if (id=="inner"){ scroll-=25; }
        		$('html, body').animate({
            		scrollTop: scroll
        		}, "slow");
    		});
		}

		var id = $(this).attr("id");
		id=id.split("_");
		$("#"+id[1]).scrollView();
	});
});
// 
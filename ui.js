var deg = 0;

var height1, height2, height3, height4, height5, height6, height7, height8, height9;
var heights = [height1, height2, height3, height4, height5, height6, height7, height8, height9]; //im so sorry

var doneLoading = function() { //Remove loading screen.
  $("#loading-outer").addClass("gone");
  setTimeout(function() {
    $("#loading-outer").remove();
    clearInterval(cycinterval);
  }, 500)
}

$("#everything").imagesLoaded() //Uses imagesloaded.js
  .always(function(instance) {
    doneLoading();
  });

var getHeights = function() { //Gets the positions of all the tops of the floors.
  var height = window.innerHeight
  for(i = 0; i < heights.length; i++) {
    heights[i] = height*i - height;
  }
}
getHeights();

var rotateAll = function() { //Rotates everything!
  deg += 90;
  $(".rotate").css("transform", "rotate("+deg+"deg)");
  $(".rotate").css("-webkit-transform", "rotate("+deg+"deg)"); //.rotate is rotated +deg
  $(".no-rotate").css("transform", "rotate(-"+deg+"deg)"); //.no-rotate is rotated -deg
  $(".no-rotate").css("-webkit-transform", "rotate(-"+deg+"deg)");
  $(".main-text").css("transform", "translateX(-50%) rotate(-"+deg+"deg)"); //.main-text needs translateX in its transform
  $(".main-text").css("-webkit-transform", "translateX(-50%) rotate(-"+deg+"deg)");
  if(detectmobile() || $(window).width() <= 700) {
    $(".info-outer").css("transform", "rotate(-"+deg+"deg) scale(2)"); //info-outer is scaled 2x on mobile
    $(".info-outer").css("-webkit-transform", "rotate(-"+deg+"deg) scale(2)");
  }
  if(deg % 180 === 0) {
    $(".main-text").removeClass("shifted"); //main-text is shifted to avoid overlap on certain rotate intervals
  }
  if(deg % 180 != 0) {
    $(".main-text").addClass("shifted");
  }
  if(deg % 180 && detectmobile() === false) {
    $(".floor").css("height", "77.34375vh");
    $(".floor").css("width", "110vh"); //there's like a ratio that the floor always needs to be in
  }
  else if(!(deg % 180) && detectmobile() === false) {
    $(".floor").css("height", "84.375vh");
    $(".floor").css("width", "120vh");
  }
}

var scrollToFloor = function(query) { //self explanatory. Query should be 0-9
  var yo = heights[query];
  if(parseInt(query) === 9) {
    yo = $("body").height();
  }
  $('html, body').animate({
    scrollTop: yo
  })
}

var floorDescs = ['The main level', 'The math hallway', 'The electives hallway', 'The science hallway', 'The band/theatre/arts hallway', 'The social studies/languages hallway', 'The athletic/health hallway', 'The language arts hallway', 'The Bricks and the 700 hallway\'s gyms'];

var select = function(query) { //Changes text based on currently scrolled room.
  if(query === 1) {
    $("#header-top-h1, #floor-floor").html("main");
  }
  else {
    $("#header-top-h1, #floor-floor").html(query+"00");
  }
  $(".header-sub").removeClass("selected");
  $("#"+query+"00h").addClass("selected");
  $("#floor-text").html(floorDescs[query - 1]);
}

var headerActive = false;

var toggleHeader = function(state) { //Toggles OPTIONS header
  if(state === false) {
    headerActive = true;
    $("#header-top-more").html("hide options");
    $("#header-top").addClass('more');
  }
  else {
    headerActive = false;
    $("#header-top-more").html("options");
    $("#header-top").removeClass('more');
  }
}

var headerHidden = false;

var setHidden = function(state) { //toggles LEFT HEADER being hidden or not
  if(state === false) {
    headerHidden = true;
    $("#header-left, #rotate, #hamburger-outer, .floor, .floor-outer, #floor-text, #header-search").addClass("hidden"); //look at the css for this
    $(".ham1, .ham2, .ham3, .hamhidden, .circle").removeClass("active");
  }
  else {
    headerHidden = false;
    $("#header-left, #rotate, #hamburger-outer, .floor, .floor-outer, #floor-text, #header-search").removeClass("hidden");
    $(".ham1, .ham2, .ham3, .hamhidden, .circle").addClass("active");
  }
}

var expanded = false;

var setExpanded = function(state) { //toggles the SEARCH header being expanded or not
  if(state === false) {
    expanded = false;
    $("#header-search, #darkened-full").removeClass("expanded");
    $("#search-lower").height(0);
    $("input[name=search]").val("");
  }
  else {
    expanded = true;
    $("#header-search, #darkened-full").addClass("expanded");
    $("#search-lower").height(0);
    $("input[name=search]").val('');
    $("#search").focus();
  }
}

function detectmobile() { // thanks, stackoverflow!
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}

var exitsActive = true, floorsActive = true, roomsActive = true; //From options header

var setState = function(query, boolean) { //Sets the state of dots being hidden or not.
  if(boolean) { // Showing
    $("."+query).addClass("active");
    switch(query) {
      case 'exits':
        $('.exit').removeClass("nope"); //Nope class gives opacity: 0 and pointer-events: none
        exitsActive = true;
        break;
      case 'floors':
        $('.other:not(.exit)').removeClass("nope");
        floorsActive = true;
        break;
      case 'rooms':
        $('.room').removeClass("nope");
        roomsActive = true;
        break;
    }
  }
  else { //Hiding
    $("."+query).removeClass("active");
    switch(query) {
      case 'exits':
        $('.exit').addClass("nope");
        exitsActive = false;
        break;
      case 'floors':
        $('.other:not(.exit)').addClass("nope");
        floorsActive = false;
        break;
      case 'rooms':
        $('.room').addClass("nope");
        roomsActive = false;
        break;
    }
  } //there should be an easier way to do this :(
}

var zoom = document.documentElement.clientWidth / window.innerWidth; //from stackoverflow mobile zooming

$(document).ready(function() {
  $("#search").keypress(function(event) { //Searching shortcuts
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13') { //Searches first result if there is one.
      event.preventDefault();
      if($("input[name=search]").val() != "" && results) { //If it's a room
        if(!isNaN($("input[name=search]").val().toString())) {
          var currFloor = $("input[name=search]").val().toString()[0];
          var firstRoom = foundRooms[0];
          goTo(floors[currFloor][firstRoom].num);
        }
        else { //If it's not a room
          var firstDesc = foundDescs[0];
          goTo(floors[firstDesc[0]][firstDesc[1]].num);
        }
      }
    }
  });
  $("body").keydown(function(event) {
    var keycode = event.keyCode;
    if(keycode == '70' && !expanded) { //If 'f' is pressed, show the search bar.
      setExpanded(true);
      event.preventDefault();
    }
    else if(keycode == '27' && expanded) { //If escape is pressed and the search bar is expanded, close it.
      setExpanded(false);
      event.preventDefault();
    }
  });
  $("#darkened-full").click(function() { //If you press the darkened background when search is open, close it.
    setExpanded(false);
  })
  $("#header-top-more").click(function() { //The options more button.
    toggleHeader(headerActive);
  })
  $("#searchio").click(function() { //The magnifying glass.
    setExpanded(!expanded);
  })
  $(".exits").click(function() { //Exit hiding/showing option
    setState('exits', !exitsActive);
  })
  $(".floors").click(function() { //Floor hiding/showing option
    setState('floors', !floorsActive);
  })
  $(".rooms").click(function() { //Room hiding/showing option
    setState('rooms', !roomsActive);
  })
  $("#hamburger-relative").click(function() { //Hamburger button
    setHidden(headerHidden);
  })
  $(".header-sub").click(function() { //Left header option clicking.
    $(".header-sub").removeClass("selected");
    $(this).addClass("selected"); //Only make the clicked one selected
    var id = $(this).attr("id").toString();
    scrollToFloor(id[0]); //Goes to that floor.
  })
  $("#rotate-inner").click(function() { //Rotating
    rotateAll();
  })
  $(".floor-outer").scrollLeft($(".floor-outer").width()/2); //Center all the floors for mobile.
  $(window).resize(function() {
    getHeights();

    //Below you can see a failed attempt at detecting mobile zooming.

    // var zoomNew = document.documentElement.clientWidth / window.innerWidth;
    // if (zoom != zoomNew) {
    //     // zoom has changed
    //     // adjust your fixed element
    //     zoom = zoomNew;
    //     $(".room").css({
    //       height: (50/zoom)+"px",
    //       width: (50/zoom)+"px"
    //     })
    //     $(".room > p").css({
    //       fontSize: (20/zoom)+"px",
    //       lineHeight: (50/zoom)+"px"
    //     })
    //     $(".other").css({
    //       height: (75/zoom)+"px",
    //       width: (75/zoom)+"px"
    //     })
    //     $(".other > p").css({
    //       fontSize: (25/zoom)+"px",
    //       lineHeight: (75/zoom)+"px"
    //     })
    //     $(".exit").css({
    //       height: (60/zoom)+"px",
    //       width: (60/zoom)+"px"
    //     })
    //     $(".exit > p").css({
    //       fontSize: (25/zoom)+"px",
    //       lineHeight: (60/zoom)+"px"
    //     })
    // }

  })
  findCurrentlyScrolledFloor = function() {
    var a = $(window).scrollTop() - 250; //250px off of the scroll
    if(a <= heights[0]) {select(0)} else //Then compare it to all the heights and select the currently scrolled floor.
    if(a <= heights[1]) {select(1)} else
    if(a <= heights[2]) {select(2)} else
    if(a <= heights[3]) {select(3)} else
    if(a <= heights[4]) {select(4)} else
    if(a <= heights[5]) {select(5)} else
    if(a <= heights[6]) {select(6)} else
    if(a <= heights[7]) {select(7)} else
    if(a <= heights[8]) {select(8)} else
    {select(9)}
  }
  $(window).scroll(function() { //Whenever the window is scrolled
    findCurrentlyScrolledFloor();
  })
  findCurrentlyScrolledFloor(); //Does it upon the document loading.

  setTimeout(function() {$("#floor-text").html("Scroll the page to see the other hallways.");}, 10); //Timeout to avoid the description changing to the currently selected floor.

  if(detectmobile()) {
    setHidden(false); //Shows the left header when on mobile.
  }
  else {
    setHidden(true);
  }
  window.addEventListener("load",function() { //This is something I copied from stackoverflow. It does something for mobile but idk what.
	// Set a timeout...
	setTimeout(function(){
		// Hide the address bar!
		window.scrollToFloor($(".floor").width/2, 1);
	}, 0);
});

  //More failed zooming feature

  // window.addEventListener('gestureend', function(e) {
  //   if (e.scale < 1.0 && detectmobile()) {
  //     //zoomed out
  //     $(".room, .exit, .other, p").removeClass("zoomed");
  //   }
  //   else if (e.scale > 1.0 && detectmobile()) {
  //     //zoomed in
  //     $(".room, .exit, .other, p").addClass("zoomed");
  //   }
  // }, false);
})

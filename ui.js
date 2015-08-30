var deg = 0;

var currScroll;

var height1, height2, height3, height4, height5, height6, height7, height8, height9;
var heights = [height1, height2, height3, height4, height5, height6, height7, height8, height9];

var getHeights = function() {
  var height = window.innerHeight
  for(i = 0; i < heights.length; i++) {
    heights[i] = height*i - height;
  }
}

getHeights();

var rotateAll = function() {
  deg += 90;
  // if(deg === 360) {
  //   deg = 0;
  // }
  $(".rotate").css("transform", "rotate("+deg+"deg)");
  $(".rotate").css("-webkit-transform", "rotate("+deg+"deg)");
  // $(".room, .other").css("transform", "scale(1) rotate(-"+deg+"deg)");
  // $(".room, .other").css("-webkit-transform", "scale(1) rotate(-"+deg+"deg)");
  $(".no-rotate").css("transform", "rotate(-"+deg+"deg)");
  $(".no-rotate").css("-webkit-transform", "rotate(-"+deg+"deg)");
  if(deg % 180) {
    $(".floor").css("height", "77.34375vh");
    $(".floor").css("width", "110vh");
  }
  else {
    $(".floor").css("height", "84.375vh");
    $(".floor").css("width", "120vh");
  }
}

var scrollio = function(wat) {
  var yo = heights[wat];
  if(parseInt(wat) === 9) {
    yo = $("body").height();
  }
  $('html, body').animate({
    scrollTop: yo
  })
}

var select = function(wat) {
  currScroll = wat;
  if(wat === 1) {
    $("#header-top-h1").html("main");
  }
  else {
    $("#header-top-h1").html(wat+"00");
  }
  $(".header-sub").removeClass("selected");
  $("#"+wat+"00h").addClass("selected");
}

var headerActive = false;

var toggleHeader = function(state) {
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

var setHidden = function(state) {
  if(state === false) {
    headerHidden = true;
    $("#header-left, #rotate, #hamburger-outer, .floor").addClass("hidden");
    $(".ham1, .ham2, .ham3, .hamhidden, .circle").removeClass("active");
  }
  else {
    headerHidden = false;
    $("#header-left, #rotate, #hamburger-outer, .floor").removeClass("hidden");
    $(".ham1, .ham2, .ham3, .hamhidden, .circle").addClass("active");
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

var exitsActive = true, floorsActive = true, roomsActive = true;

var setState = function(wat, boo) {
  if(boo) {
    $("."+wat).addClass("active");
    switch(wat) {
      case 'exits':
        $('.exit').removeClass("nope");
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
  else {
    $("."+wat).removeClass("active");
    switch(wat) {
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
  }
}

$(document).ready(function() {
  $("#header-top-more").click(function() {
    toggleHeader(headerActive);
  })
  $(".exits").click(function() {
    setState('exits', !exitsActive);
  })
  $(".floors").click(function() {
    setState('floors', !floorsActive);
  })
  $(".rooms").click(function() {
    setState('rooms', !roomsActive);
  })
  $("#hamburger-relative").click(function() {
    setHidden(headerHidden);
  })
  $(".header-sub").click(function() {
    $(".header-sub").removeClass("selected");
    $(this).addClass("selected");
    var id = $(this).attr("id").toString();
    scrollio(id[0]);
  })
  $("#rotate-inner").click(function() {
    rotateAll();
  })
  $(window).resize(function() {
    getHeights();
  })
  $(window).scroll(function() {
    var a = $(window).scrollTop() - 250;
    if(a <= heights[0]) {select(0)} else
    if(a <= heights[1]) {select(1)} else
    if(a <= heights[2]) {select(2)} else
    if(a <= heights[3]) {select(3)} else
    if(a <= heights[4]) {select(4)} else
    if(a <= heights[5]) {select(5)} else
    if(a <= heights[6]) {select(6)} else
    if(a <= heights[7]) {select(7)} else
    if(a <= heights[8]) {select(8)} else
    {select(9)}
  })
  if(detectmobile()) {
    setHidden(false);
  }
  else {
    setHidden(true);
  }
})

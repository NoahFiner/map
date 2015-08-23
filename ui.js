var deg = 0;

var currScroll;

var height1, height2, height3, height4, height5, height6, height7, height8;
var heights = [height1, height2, height3, height4, height5, height6, height7, height8];

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
  $(".room, .other").css("transform", "scale(1) rotate(-"+deg+"deg)");
  $(".room, .other").css("-webkit-transform", "scale(1) rotate(-"+deg+"deg)");
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
  if(parseInt(wat) === 8) {
    yo = $("body").height();
  }
  $('html, body').animate({
    scrollTop: yo
  })
}

var select = function(wat) {
  currScroll = wat;
  $(".header-sub").removeClass("selected");
  $("#"+wat+"00h").addClass("selected");
}

$(document).ready(function() {
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
    getHeight();
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
    {select(8)}
  })
})

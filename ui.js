var deg = 0;

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
}

$(document).ready(function() {
  $("#rotate-inner").click(function() {
    rotateAll();
  })
})

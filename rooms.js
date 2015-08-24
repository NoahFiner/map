var deg;
var currScroll;

var Room = function(floor, x, y, num, info) {
  this.x = x;
  this.y = y;
  this.num = num;
  this.info = info;
  this.floor = floor;
  if(!isNaN(this.num) || this.num.search('-') != -1 && this.num.search('F') === -1 && this.num.search('M') === -1) {
    this.type = 'room';
  }
  else {
    this.type = 'other';
  }
  if(this.type === 'room') {
    this.color = '#B20202';
  }
  else {
    this.color = "#02B202";
  }
  this.init = function() {
    if((this.type === 'other') && (this.num != "LIRBARY")) {
      $("#f"+this.floor+"-content").append("<div class='"+this.type+" "+this.num+"' id='"+this.num+"'><p>"+this.num.substr(0, 4)+"</p></div>")
    }
    else {
      $("#f"+this.floor+"-content").append("<div class='"+this.type+" "+this.num+"' id='"+this.num+"'><p>"+this.num.substr(0, 3)+"</p></div>")
    }
    $("#"+this.num).css("left", this.x+"%");
    $("#"+this.num).css("top", this.y+"%");
  }
  this.init();
}

var floors = [[], [], [], [], [], [], [], [], [], [], []];

var searchForFloor, infoTime;

var activateInfo = function() {
  $("#f"+currScroll+"-info").css("opacity", "1");
}

$(document).ready(function() {
  floors[4][0] = new Room (4, 77, 49, '402-1', 'classroom with stuff in it');
  floors[4][1] = new Room (4, 71, 72, '402-2', 'another entrance to that classroom');
  floors[4][2] = new Room (4, 81, 83, '405-1', 'this is the classroom that is impossible to find');
  floors[4][3] = new Room (4, 89, 43, '432-1', 'idk what\'s in this weird place');
  floors[4][4] = new Room (4, 81, 42, '432-2', 'another entrance to that weird place');
  floors[4][5] = new Room (4, 86, 50, '401', 'this is like some office thing');
  floors[4][6] = new Room (4, 77, 42, '430-1', 'idk what this one is either lol');
  floors[4][7] = new Room (4, 70, 38, '430-2', 'another entrance to another room i\'ve never been in.');
  floors[4][8] = new Room (4, 67, 37, '424-2', 'The science hall computer lab');
  floors[4][9] = new Room (4, 64, 64, '425-1', 'Upper lecture hall entrance');
  floors[4][10] = new Room (4, 53, 30, '424-1', 'The science hall computer lab other entrance');
  floors[4][11] = new Room (4, 52, 34, '425-2', 'Upper lecture hall other entrance');
  floors[4][12] = new Room (4, 49, 37, '426-2', 'Lower lecture hall other entrance');
  floors[4][13] = new Room (4, 61, 67, '426-1', 'Lower lecture hall entrance');
  floors[4][14] = new Room (4, 62, 72, '427', 'Some closet thing');
  floors[4][15] = new Room (4, 66, 86, '405-2', 'another entrance to that place');
  floors[4][16] = new Room (4, 64, 90, '407', 'some creepy closet crap');
  floors[4][17] = new Room (4, 62, 86, '408-1', 'another cool classroom thingy');
  floors[4][18] = new Room (4, 48, 87, '408-2', 'another entrance to 408');
  floors[4][19] = new Room (4, 37, 83, '410', 'closet crap');
  floors[4][20] = new Room (4, 31, 84, '411-1', 'Biology room entrance');
  floors[4][21] = new Room (4, 22, 84, '411-2', 'Biology room alternate entrance');
  floors[4][22] = new Room (4, 21, 74, '413', 'Greenhouse entrance');
  floors[4][23] = new Room (4, 25, 73, '414-1', 'Another biology room entrance');
  floors[4][24] = new Room (4, 28, 73, '415-1', 'no idea what this is');
  floors[4][25] = new Room (4, 45, 70, '415-2', 'another entrance to 415');
  floors[4][26] = new Room (4, 42, 35, '422-1', 'some chem lab thing');
  floors[4][27] = new Room (4, 32, 46, '415-3', 'ANOTHER WAY INTO 415???');
  floors[4][28] = new Room (4, 27, 44, '414-2', 'really more bio entrances why is this necessary');
  floors[4][29] = new Room (4, 33, 29, '422-2', 'that stupid chem lab again');
  floors[4][30] = new Room (4, 29, 26, '421-1', 'and another chem lab how many are there');
  floors[4][31] = new Room (4, 19, 17, '421-2', 'wow enough with all these chem labs seriously');
  floors[4][32] = new Room (4, 16, 23, '422-3', 'how many bio entrances can you have');
  floors[4][33] = new Room (4, 41, 90, 'F600-1', 'A staircase to floor 600.')
  floors[4][34] = new Room (4, 69, 79, 'F600-2', 'A hidden staircase to floor 600.')
  floors[4][35] = new Room (4, 10, 73, 'LIBRARY', 'The school library.')
  floors[4][36] = new Room (4, 80, 75, 'MAIN-1', 'Back to the main hallway.')
  floors[4][37] = new Room (4, 57, 5, 'F200-1', 'A staircase to floor 200.')
  floors[4][38] = new Room (4, 91, 45, 'MAIN-2', 'Back to the main hallway.')
  floors[6][0] = new Room (6, 44, 15, 'F400-1', 'Main staircase to floor 400.')
  floors[6][1] = new Room (6, 34.5, 2, '631', 'Spanish and French room.')
  floors[6][2] = new Room (6, 36, 4, '632', 'I have no idea.')
  floors[6][3] = new Room (6, 32, 5, '630', 'Yup, never been in there.')
  searchForRoom = function(wat) {
    var currFloor = wat[0];
    for(i = 0; i < floors[currFloor].length; i++) {
      if(floors[currFloor][i].num === wat) {
        return i;
      }
    }
    return -1;
  }
  searchForFloor = function(wat) {
    for(j = 0; j < floors.length; j++) {
      for(i = 0; i < floors[j].length; i++) {
        if(floors[j][i].num === wat) {
          return [j, i];
        }
      }
    }
    return [-1, -1];
  }

  $(".other").click(function() {
    var id = $(this).attr("id").toString();
    if(parseInt(id[1])) {
      scrollio(id[1]);
    }
    if(id.substr(0, 4) === "MAIN") {
      scrollio(0);
    }
  })

  $(".room, .other").hover(function() {
    clearTimeout(infoTime);
    var a;
    var id = $(this).attr("id").toString();
    var floorio = id[0];
    if(floorio === 'F' || 'L' || 'M') {
      floorio = searchForFloor(id.toString());
      a = floorio[1];
      floorio = floorio[0];
    }
    else {
      a = searchForRoom(id);
    }
    var roomio = floors[floorio][a];
    activateInfo();
    if((deg % 180) === 0 || deg === 0) {
      $("#f"+floorio+"-info").css("top", ((roomio.y)-15)+"%");
      $("#f"+floorio+"-info").css("left", ((roomio.x)-10)+"%");
      if(roomio.y <= 20) {
        $("#f"+floorio+"-info").css("top", ((roomio.y)+10)+"%");
      }
      if(roomio.x >= 85) {
        $("#f"+floorio+"-info").css("left", ((roomio.x)-20)+"%");
      }
    }
    else {
      $("#f"+floorio+"-info").css("top", ((roomio.y)-20)+"%");
      $("#f"+floorio+"-info").css("left", ((roomio.x)-15)+"%");
      if(roomio.y <= 30) {
        $("#f"+floorio+"-info").css("top", ((roomio.y)+10)+"%");
      }
      if(roomio.x <= 20) {
        $("#f"+floorio+"-info").css("left", ((roomio.x)+5)+"%");
      }
    }


    $("#f"+floorio+"-h1").html(roomio.num);
    $("#f"+floorio+"-p").html(roomio.info);
    $(".info-top").css("background-color", roomio.color);
    $(".info-outer").css("border", "1px solid "+roomio.color);
  }, function() {
    clearTimeout(infoTime);
    infoTime = setTimeout(function() {$(".info-outer").css("opacity", "0")}, 1000);
  })




});

$(function() {
$("#f6-content").click(function(e) {

  var offset = $(this).offset();
  var height = $(this).height();
  var width = $(this).width();
  var relativeX = ((e.pageX - offset.left));
  var relativeY = ((e.pageY - offset.top));
  relativeX = relativeX*100/width;
  relativeY = relativeY*100/height;
  alert("X: " + parseInt(relativeX) + "  Y: " + parseInt(relativeY));
  //turn that alert on for testing only
});
});

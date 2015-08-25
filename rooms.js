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
  floors[4][0] = new Room (4, 77, 49, '402-1', 'Science');
  floors[4][1] = new Room (4, 71, 72, '402-2', 'Science');
  floors[4][2] = new Room (4, 81, 83, '405-1', 'Science');
  floors[4][3] = new Room (4, 89, 43, '432-1', 'Physics');
  floors[4][4] = new Room (4, 81, 42, '432-2', 'Physics');
  floors[4][5] = new Room (4, 86, 50, '401', 'Office');
  floors[4][6] = new Room (4, 77, 42, '430-1', 'Physics');
  floors[4][7] = new Room (4, 70, 38, '430-2', 'Physics');
  floors[4][8] = new Room (4, 67, 37, '424-2', 'Science Computer Lab');
  floors[4][9] = new Room (4, 64, 64, '425-1', 'Upper Lecture Hall');
  floors[4][10] = new Room (4, 53, 30, '424-1', 'Science Computer Lab');
  floors[4][11] = new Room (4, 52, 34, '425-2', 'Upper Lecture Hall');
  floors[4][12] = new Room (4, 49, 37, '426-2', 'Lower Lecture Hall');
  floors[4][13] = new Room (4, 61, 67, '426-1', 'Lower Lecture Hall');
  floors[4][14] = new Room (4, 62, 72, '427', 'Office');
  floors[4][15] = new Room (4, 66, 86, '405-2', 'Science');
  floors[4][16] = new Room (4, 64, 90, '407', 'Office');
  floors[4][17] = new Room (4, 62, 86, '408-1', 'Science');
  floors[4][18] = new Room (4, 48, 87, '408-2', 'Science');
  floors[4][19] = new Room (4, 37, 83, '410', 'Electrical');
  floors[4][20] = new Room (4, 31, 84, '411-1', 'Biology');
  floors[4][21] = new Room (4, 22, 84, '411-2', 'Biology');
  floors[4][22] = new Room (4, 21, 74, '413', 'Greenhouse');
  floors[4][23] = new Room (4, 25, 73, '414-1', 'Biology');
  floors[4][24] = new Room (4, 28, 73, '415-1', 'Science Storage/Kitchen');
  floors[4][25] = new Room (4, 45, 70, '415-2', 'Science Storage/Kitchen');
  floors[4][26] = new Room (4, 42, 35, '422-1', 'Chemistry Lab');
  floors[4][27] = new Room (4, 32, 46, '415-3', 'Science Storage/Kitchen');
  floors[4][28] = new Room (4, 27, 44, '414-2', 'Biology');
  floors[4][29] = new Room (4, 33, 29, '422-2', 'Chemistry Lab');
  floors[4][30] = new Room (4, 29, 26, '421-1', 'Chemistry Lab');
  floors[4][31] = new Room (4, 19, 17, '421-2', 'Chemistry Lab');
  floors[4][32] = new Room (4, 16, 23, '420-2', 'Biology');
  floors[4][33] = new Room (4, 41, 90, 'F600-1', 'Staircase to floor 600.');
  floors[4][34] = new Room (4, 69, 79, 'F600-2', 'Staircase to floor 600.');
  floors[4][35] = new Room (4, 10, 73, 'LIBRARY', 'The school library.');
  floors[4][36] = new Room (4, 80, 75, 'MAIN-400-1', 'Back to the main hallway.');
  floors[4][37] = new Room (4, 57, 5, 'F200-1', 'Staircase to floor 200.');
  floors[4][38] = new Room (4, 91, 45, 'MAIN-400-2', 'Back to the main hallway.');
  floors[4][39] = new Room (4, 29, 32, '420-1', 'Biology');
  floors[6][0] = new Room (6, 44, 15, 'F400-1', 'Main staircase to floor 400.');
  floors[6][1] = new Room (6, 34.5, 2, '631', 'Spanish and French room.');
  floors[6][2] = new Room (6, 36, 4, '632', 'I have no idea.');
  floors[6][3] = new Room (6, 32, 5, '630', 'Yup, never been in there.');
  floors[6][4] = new Room (6, 39, 12, '633', 'no idea');
  floors[6][5] = new Room (6, 37, 18, '629', 'French and Spanish classroom.');
  floors[6][6] = new Room (6, 41, 16, '636', 'Super tiny closet.');
  floors[6][7] = new Room (6, 38, 22, '628', 'idk i think this is french.');
  floors[6][8] = new Room (6, 37, 36, '627', 'Pretty sure this is an office.');
  floors[6][9] = new Room (6, 35, 37, '626', 'Maybe this is the office? One of these is a classroom idk');
  floors[6][10] = new Room (6, 34, 42, '625', 'This is probably the office because it\' smaller.');
  floors[6][11] = new Room (6, 21, 74.5, '659', 'Another world languages classroom?????');
  floors[6][12] = new Room (6, 20, 78, '660', 'uh oh this classroom is almost 666');
  floors[6][13] = new Room (6, 15, 89, '661', 'i feel bad for whoever has their class here... at least they get exercise');
  floors[6][14] = new Room (6, 27, 76, '658', 'one of these rooms is a computer lab. maybe this one????');
  floors[6][15] = new Room (6, 28, 72, '657', 'this one is probably the computer lab');
  floors[6][16] = new Room (6, 35, 60, '654', 'cute tiny closet');
  floors[6][17] = new Room (6, 38, 60, '655', 'probably a teacher closet');
  floors[6][18] = new Room (6, 47, 62, '656', 'idk office??');
  floors[6][19] = new Room (6, 52, 61, '616', 'Boys\' 600 bathroom.');
  floors[6][20] = new Room (6, 56, 54, '615', 'Social studies/HvZ room.');
  floors[6][21] = new Room (6, 52, 47, '614', 'closet again');
  floors[6][22] = new Room (6, 41, 56, '619', 'some office');
  floors[6][23] = new Room (6, 50, 57, '620', 'some other office');
  floors[6][24] = new Room (6, 49, 50, '621', 'some other office');
  floors[6][25] = new Room (6, 46, 41, '622', 'office again wow');
  floors[6][26] = new Room (6, 43, 36, '612', 'The 600 hall kitchen.');
  floors[6][27] = new Room (6, 50, 25, '637', 'Pretty small probs an office.');
  floors[6][28] = new Room (6, 55, 23, '638', 'some classroom.');
  floors[6][29] = new Room (6, 59, 23, '639-1', 'entrance to 639.');
  floors[6][30] = new Room (6, 63, 12, '639-2', 'alternate entrance to 639.');
  floors[6][31] = new Room (6, 62, 7, '641', 'the line to this class always blocks the stairs and it\'s annoying :(');
  floors[6][32] = new Room (6, 67, 11, '642', 'Office for some of the social studies teachers.');
  floors[6][33] = new Room (6, 69, 18, '645', 'Tiny closet.');
  floors[6][34] = new Room (6, 69, 15, '644', 'Probably some other office thing.');
  floors[6][35] = new Room (6, 73, 32, '646', 'If this is a classroom it must be very cramped.');
  floors[6][36] = new Room (6, 80, 31, '647', 'classroom i guess');
  floors[6][37] = new Room (6, 82, 29, '648', 'classroom too');
  floors[6][38] = new Room (6, 41, 40, '624', 'office sorry i put this out of order in the array');
  floors[6][39] = new Room (6, 59, 35, '611', 'clasroom yay');
  floors[6][40] = new Room (6, 61, 38, '609', 'if you remove the 0 this class becomes 69 hahahahahha');
  floors[6][41] = new Room (6, 72, 46, '608', 'Meeting place of the Stock Market club and another class');
  floors[6][42] = new Room (6, 74, 37, '604', 'closet or bathroom or something');
  floors[6][43] = new Room (6, 83, 35, '602', 'some other classroom i guess');
  floors[6][44] = new Room (6, 86, 32, '601', 'the #1 classroom');
  floors[6][45] = new Room (6, 61, 0, 'F400-HIDDEN', 'A hidden staircase to the 400 level.');
  floors[6][46] = new Room (6, 88, 25, 'MAIN-600', 'Back to the main level.');
  floors[6][47] = new Room (6, 57, 62, 'F800', 'Main staircase to the 800 floor.');
  floors[6][48] = new Room (6, 84, 43, 'F800-HIDDEN', 'Hidden staircase to the 800 floor.');

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
$(".relative-full").click(function(e) {

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

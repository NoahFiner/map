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
      $("#f"+this.floor+"-content").append("<div class='"+this.type+" "+this.num+"' id='"+this.num+"'><p class='no-rotate'>"+this.num.substr(0, 4)+"</p></div>")
    }
    else {
      $("#f"+this.floor+"-content").append("<div class='"+this.type+" "+this.num+"' id='"+this.num+"'><p class='no-rotate'>"+this.num.substr(0, 3)+"</p></div>")
    }
    $("#"+this.num).css("left", this.x+"%");
    $("#"+this.num).css("top", this.y+"%");
  }
  this.init();
}

var floors = [[], [], [], [], [], [], [], [], [], [], [], []];

var searchForFloor, infoTime;

var activateInfo = function() {
  $("#f"+currScroll+"-info").css("opacity", "1");
}

$(document).ready(function() {
  floors[2][0] = new Room (2, 61, 79, '201', 'Some big math classroom.');
  floors[2][1] = new Room (2, 58, 79, '203', 'A teacher\s office.');
  floors[2][2] = new Room (2, 53, 59, '213', 'PIB Algebra II class (i think)');
  floors[2][3] = new Room (2, 53, 68, '214', 'other weird math class');
  floors[2][4] = new Room (2, 56, 68, '212', 'another weird math class');
  floors[2][5] = new Room (2, 46, 80, '204', 'some other office');
  floors[2][6] = new Room (2, 42, 80, '205', 'coolio classroom');
  floors[2][7] = new Room (2, 30, 79, '206', 'teensy weensy office');
  floors[2][8] = new Room (2, 16, 79, '208', 'I think this is a really weird bathroom');
  floors[2][9] = new Room (2, 9, 79, '211', 'other weird bathroom');
  floors[2][10] = new Room (2, 23, 64, '216', 'Boys\'s bathroom. Don\'t go here, it\'s the weirdest thing ever.');
  floors[2][11] = new Room (2, 22, 61, '217', 'Girl\'s bathroom. Idk what is in there which is good.');
  floors[2][12] = new Room (2, 18, 54, '218', 'Cute little teacher office.');
  floors[2][13] = new Room (2, 18, 48, '224', 'Either a tiny classroom or big office.');
  floors[2][14] = new Room (2, 19, 44, '225', 'The 200 computer lab with special headphones.');
  floors[2][15] = new Room (2, 25, 25, '227', 'Idk cute closet or something.');
  floors[2][16] = new Room (2, 26, 22, '228', 'Pretty big classroom.');
  floors[2][17] = new Room (2, 31, 7, '231', 'Office that\'s in the corner of shame.');
  floors[2][18] = new Room (2, 32, 15, '230', 'Other office that just barely missed the corner of shame.');
  floors[2][19] = new Room (2, 45, 11, '233', 'Big classroom that must be a pain to walk to.');
  floors[2][20] = new Room (2, 49, 10, '235', 'This seriously looks like the smallest room in the school.');
  floors[2][21] = new Room (2, 45, 19, '232', 'wtf fairview name these rooms in order.');
  floors[2][22] = new Room (2, 39, 26, '222', 'these numbers make no sense at all wow.');
  floors[2][23] = new Room (2, 32, 27, '219-2', 'ANOTHER CLASSROOM CALLED 219 WHY FAIRVIEW WHY ARE YOU DOING THIS YOU MESSED UP MY ALGORITHM');
  floors[2][24] = new Room (2, 24, 45, '220', 'This room probably contains some krap but I don\'t care what it is.');
  floors[2][25] = new Room (2, 23, 51, '219', 'The FIRST stupid room called 219.');
  floors[2][26] = new Room (2, 21, 89, 'F400-2', 'The main staircase to the 400 floor.');
  floors[2][27] = new Room (2, 79, 81, 'MAIN-200', 'Access to the main level.');
  floors[2][28] = new Room (2, 88, 80, 'F300-1', 'Tiny corridor to the 300 floor.');
  floors[2][28] = new Room (2, 84, 66, 'F100', 'Access to the 100 floor (cafeteria)');


  floors[3][0] = new Room (3, 22, 14, '302', 'Break room.');
  floors[3][1] = new Room (3, 31, 31, '308', 'Teacher office.');
  floors[3][2] = new Room (3, 35, 29, '309-1', 'Tech/Drafting Lab.');
  floors[3][3] = new Room (3, 36, 46, '310', 'Video editing.');
  floors[3][4] = new Room (3, 37, 49, '312-1', 'Electrical.');
  floors[3][5] = new Room (3, 44, 46, '311-1', 'Storage/Lost and Found.');
  floors[3][6] = new Room (3, 47, 39, '312-2', 'idk other storage');
  floors[3][7] = new Room (3, 49, 34, '312-3', 'ANOTHER 312 GET YOUR CARP TOGETHER FAIRVIEW');
  floors[3][8] = new Room (3, 42, 24, '309-2', 'Tech/Drafting Lab.');
  floors[3][9] = new Room (3, 53, 26, '309-3', 'Tech/Drafting Lab.');
  floors[3][10] = new Room (3, 69, 38, '339-1', 'Film/Photography room and JLab.');
  floors[3][11] = new Room (3, 75, 58, '339-2', 'Film/Photography room and JLab.');
  floors[3][12] = new Room (3, 75, 62, '333', 'Computer lab');
  floors[3][13] = new Room (3, 69, 73, '330', 'Custodian room.');
  floors[3][14] = new Room (3, 70, 82, '329', 'Storage room.');
  floors[3][15] = new Room (3, 59, 83, '325', 'Strange boy\'s bathroom.');
  floors[3][16] = new Room (3, 55, 83, '324', 'Strange girl\'s bathroom.');
  floors[3][17] = new Room (3, 55, 88, '326', 'Dressing room.');
  floors[3][18] = new Room (3, 59, 90, '327', 'Another dressing room.');
  floors[3][19] = new Room (3, 59, 94, '328', 'ANOTHER dressing room.');
  floors[3][20] = new Room (3, 59, 29, '318', 'Pantry.');
  floors[3][21] = new Room (3, 63, 39, '317-1', 'Food lab.');
  floors[3][22] = new Room (3, 51, 41, '316', 'Work room.');
  floors[3][23] = new Room (3, 69, 62, '317-2', 'Food lab.');
  floors[3][24] = new Room (3, 68, 68, '334', 'Storage.');
  floors[3][25] = new Room (3, 65, 71, '323', 'Workroom.');
  floors[3][26] = new Room (3, 57, 74, '315-1', 'Multi-use classroom.');
  floors[3][27] = new Room (3, 46, 52, '315-2', 'Multi-use classroom.');
  floors[3][28] = new Room (3, 11, 1, 'MAIN-300', 'Back to the main hallway.');
  floors[3][29] = new Room (3, 42, 32, 'F500-1', 'Staircase to the 500 hallway.');
  floors[3][30] = new Room (3, 72, 79, 'F500-2', 'Another staircase to the 500 hallway.');


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


  floors[8][0] = new Room (8, 96, 26, '801', 'The office');
  floors[8][1] = new Room (8, 81, 45, '802', 'Another room in the office place.');
  floors[8][2] = new Room (8, 71, 50, '809', 'Entrance to the attendance office.');
  floors[8][3] = new Room (8, 63, 48, '821', 'Tiny storage closet.');
  floors[8][4] = new Room (8, 82, 24, '811', 'Freshmen LA classes.');
  floors[8][5] = new Room (8, 78, 33, '812-1', 'An entrance to another LA class I think.');
  floors[8][6] = new Room (8, 61, 33, '812-2', 'An alternate entrance to another LA class I think.');
  floors[8][7] = new Room (8, 57, 25, '813', 'Some LA class that I think is for seniors and stuff');
  floors[8][8] = new Room (8, 49, 14, '814', 'I\'ve seen my friend go into this class a few times so I think it\' LA');
  floors[8][9] = new Room (8, 31, 39, '859-1', 'Entrance to a pretty large teacher office.');
  floors[8][10] = new Room (8, 20, 39, '859-2', 'Alternate entrance to a pretty large teacher office.');
  floors[8][11] = new Room (8, 13, 60, '854', 'LA classroom i guess');
  floors[8][12] = new Room (8, 13, 68, '853', 'I know TAG meets here.');
  floors[8][13] = new Room (8, 14, 75, '848', 'there\'s a freshmen seminar class in here probs');
  floors[8][14] = new Room (8, 19, 62, '844-1', 'This is where mock trial is.');
  floors[8][15] = new Room (8, 36.5, 63, '844-2', 'Alternate entrance to where mock trial is.');
  floors[8][16] = new Room (8, 18, 71, '843', 'I feel bad for whoever has to work in this office if it is one because it\'s really small.');
  floors[8][17] = new Room (8, 23.5, 79, '842-1', 'Large teacher office place.');
  floors[8][18] = new Room (8, 32, 79, '842-2', 'Alternate entrance to that teacher office place.');
  floors[8][19] = new Room (8, 24, 92, '847', 'one of those stupidly shaped LA classes');
  floors[8][20] = new Room (8, 31, 92, '846', 'another one of those stupidly shaped LA classes');
  floors[8][21] = new Room (8, 37, 71, '841', 'hey look a cramped office');
  floors[8][22] = new Room (8, 39, 52, '831', 'another cute office');
  floors[8][23] = new Room (8, 42, 61, '822', 'no idea');
  floors[8][24] = new Room (8, 42, 68, '823', 'some other la class');
  floors[8][25] = new Room (8, 42, 74, '845', 'really never been here before');
  floors[8][26] = new Room (8, 10.5, 33, 'F600-MAIN-1', 'Main staircase to the 600 floor.');
  floors[8][27] = new Room (8, 56, 2, 'F600-HIDDEN-1', 'A hidden staircase to the 600 floor.');
  floors[8][28] = new Room (8, 87, 19, 'MAIN-800', 'Back to the main level.');

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
  // alert("X: " + parseInt(relativeX) + "  Y: " + parseInt(relativeY));
  //turn that alert on for testing only
});
});

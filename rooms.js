var Room = function(x, y, num, info) {
  this.x = x;
  this.y = y;
  this.num = num;
  this.info = info;
  if(!isNaN(this.num)) {
    this.type = 'room';
  }
  else {
    if(this.num.search('-')) {
      this.type = 'room';
    }
    else {
      this.type = 'floor';
    }
  }
  this.floor = this.num[0];
  this.init = function() {
    $("#f"+this.floor+"-content").append("<div class='"+this.type+" "+this.num+"' id='"+this.num+"'><p>"+this.num.substr(0, 3)+"</p></div>")
    $("#"+this.num).css("left", this.x+"%");
    $("#"+this.num).css("top", this.y+"%");
  }
  this.init();
}

var floors = [[], [], [], [], [], [], [], [], [], [], []];

var searchForFloor, infoTime;

var activateInfo = function() {
  $(".info-outer").css("opacity", "1");
}

$(document).ready(function() {
  floors[4][0] = new Room (77, 49, '402-1', 'classroom with stuff in it');
  floors[4][1] = new Room (71, 72, '402-2', 'another entrance to that classroom');
  floors[4][2] = new Room (81, 83, '405-1', 'this is the classroom that is impossible to find');
  floors[4][3] = new Room (89, 43, '432-1', 'idk what\'s in this weird place');
  floors[4][4] = new Room (81, 42, '432-2', 'another entrance to that weird place');
  floors[4][5] = new Room (86, 50, '401', 'this is like some office thing');
  floors[4][6] = new Room (77, 42, '430-1', 'idk what this one is either lol');
  floors[4][7] = new Room (70, 38, '430-2', 'another entrance to another room i\'ve never been in.');
  floors[4][8] = new Room (67, 37, '424-2', 'The science hall computer lab');
  floors[4][9] = new Room (64, 64, '425-1', 'Upper lecture hall entrance');
  floors[4][10] = new Room (53, 30, '424-1', 'The science hall computer lab other entrance');
  floors[4][11] = new Room (52, 34, '425-2', 'Upper lecture hall other entrance');
  floors[4][12] = new Room (49, 37, '426-2', 'Lower lecture hall other entrance');
  floors[4][13] = new Room (61, 67, '426-1', 'Lower lecture hall entrance');
  floors[4][14] = new Room (62, 72, '427', 'Some closet thing');
  floors[4][15] = new Room (66, 86, '405-2', 'another entrance to that place');
  floors[4][16] = new Room (64, 90, '407', 'some creepy closet crap');
  floors[4][17] = new Room (62, 86, '408-1', 'another cool classroom thingy');
  floors[4][18] = new Room (48, 87, '408-2', 'another entrance to 408');
  searchForRoom = function(wat) {
    var currFloor = wat[0];
    for(i = 0; i < floors[currFloor].length; i++) {
      if(floors[currFloor][i].num === wat) {
        return i;
      }
    }
    return -1;
  }

  $(".room").hover(function() {
    clearTimeout(infoTime);
    var id = $(this).attr("id").toString();
    var a = searchForRoom(id);
    var roomio = floors[id[0]][a];
    activateInfo();
    $("#f"+id[0]+"-info").css("top", ((roomio.y)-15)+"%");
    $("#f"+id[0]+"-info").css("left", ((roomio.x)-10)+"%");
    $("#f"+id[0]+"-h1").html(roomio.num);
    $("#f"+id[0]+"-p").html(roomio.info);
  }, function() {
    clearTimeout(infoTime);
    infoTime = setTimeout(function() {$(".info-outer").css("opacity", "0")}, 1000);
  })
});

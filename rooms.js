// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require jquery2
//= require jquery-ui/effect.all

String.prototype.splice = function( idx, rem, s ) { //thanks, stackoverflow!
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

//NECESSARY FOR PROGRAM TO WORK!!! DO NOT DELETE!!!
var isnoahcool = true;
var isjordancool = false;
var isjacksoncool = false;
var isbrendancool = false;
var isbrendanhot = false;
var isbrendanalive = false;
var issaketramcool = true;
var isicycool = true;

var deg;
var currScroll = 1;

var activeFloor = 1;

var maxSearchCars = 30;

var results = false;

String.prototype.insertSpans = function(string) { //No thanks, stackoverflow. I wrote this myself! c:
  if(this.toLowerCase().search(string.toLowerCase()) === -1) {
    return this;
  }
  else {
    var stop1 = (this.toLowerCase().search(string.toLowerCase()));
    var stop2 = (this.toLowerCase().search(string.toLowerCase()) + string.length);
    var stop3 = this.length;
    var splice1 = this.substr(0, stop1);
    var splice2 = this.substr(stop1, string.length); //No idea why substr works this way...
    var splice3 = this.substr(stop2, stop3);
    return splice1 + "<span class='descSearched'>" + splice2 + "</span>" + splice3;
  }
}

var Room = function(floor, x, y, num, info, teacher) {
  this.x = x;
  this.y = y;
  this.num = num;
  this.info = info;
  this.floor = floor;
  if (typeof teacher === 'undefined') { this.teacher = ''; }
  else {
    this.teacher = teacher;
  }
  if(!isNaN(this.num) || this.num.search('-') != -1 && this.num.search('F') === -1 && this.num.search('M') === -1 && this.num.search('EXIT') === -1 && this.num.search('COUNSELING') === -1) {
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
    if(this.num.search("EXIT") != -1) {
      this.color = "#02B2B2";
    }
  }
  this.init = function() {
    if((this.type === 'other') && (this.num != "LIRBARY")) {
      $("#f"+this.floor+"-content").append("<div class='"+this.type+" "+this.num+"' id='"+this.num+"'><p class='no-rotate'>"+this.num.substr(0, 4)+"</p></div>")
      if(this.num.search("EXIT") != -1) {
        $("#"+this.num).addClass("exit");
      }
    }
    else {
      $("#f"+this.floor+"-content").append("<div class='"+this.type+" "+this.num+"' id='"+this.num+"'><p class='no-rotate'>"+this.num.substr(0, 3)+"</p></div>")
    }
    $("#"+this.num).css("left", this.x+"%");
    $("#"+this.num).css("top", this.y+"%");
  }
  this.init();
}

var floors = [[], [], [], [], [], [], [], [], [], [], [], [], []];

var searchForFloor, infoTime;

var activateInfo = function(where) {
  $(".info-outer").css("opacity", "0");
  $("#f"+where+"-info").css("opacity", "1");
}

var found = ['this is to avoid an infinite loop lol'];

$(document).ready(function() {

  floors[1][0] = new Room (1, 25, 39, 'F400-MAIN-1', "The science hallway");
  floors[1][1] = new Room (1, 33, 26, 'F400-MAIN-2', "The science hallway");
  floors[1][2] = new Room (1, 34, 65, 'F600-MAIN', "The social studies and world languages hallway");
  floors[1][3] = new Room (1, 43, 90, 'F800-MAIN', "The English hallway");
  floors[1][4] = new Room (1, 56, 87, 'F900', "The Bricks and gyms. Access to 700 hallway");
  floors[1][5] = new Room (1, 64, 27, 'F500-MAIN-1', "The band/theatre hallway");
  floors[1][6] = new Room (1, 74, 40, 'F500-MAIN-2', "The band/theatre hallway");
  floors[1][7] = new Room (1, 38, 2, 'F200-MAIN', "The math hallway");
  floors[1][8] = new Room (1, 53, 4, 'F300-MAIN', "The electives hallway");
  floors[1][9] = new Room (1, 48.5, 2, 'F100-MAIN', "The cafeteria");
  floors[1][10] = new Room (1, 50, 91, 'EXIT-FRONT', "Front entrance/exit");
  floors[1][11] = new Room (1, 45, 2, 'EXIT-BACK', "Back entrance/exit (LOCKED AFTER 9:00)");
  floors[1][12] = new Room (1, 48, 66, 'COUNSELING', "Counseling offices");


  floors[2][0] = new Room (2, 61, 79, '201', 'Math classroom');
  floors[2][1] = new Room (2, 58, 79, '203', 'Office', "Propri");
  floors[2][2] = new Room (2, 53, 59, '213', 'Math classroom');
  floors[2][3] = new Room (2, 53, 68, '214', 'Math classroom');
  floors[2][4] = new Room (2, 56, 68, '212', 'Math classroom', "Flood");
  floors[2][5] = new Room (2, 46, 80, '204', 'Office', "Tullis, White");
  floors[2][6] = new Room (2, 42, 80, '205', 'Classroom', "Pfenning");
  floors[2][7] = new Room (2, 30, 79, '206', 'Office');
  floors[2][8] = new Room (2, 16, 79, '208', 'Locked, old bathroom');
  floors[2][9] = new Room (2, 9, 79, '211', 'Locked, old bathroom');
  floors[2][10] = new Room (2, 23, 64, '216', 'Boys\'s bathroom'); //TODO: confirm these are bathrooms
  floors[2][11] = new Room (2, 22, 61, '217', 'Girl\'s bathroom');
  floors[2][12] = new Room (2, 18, 54, '218', 'Office');
  floors[2][13] = new Room (2, 18, 48, '224', 'Office', "Arehart, Bixler, Chilton, Silverman");
  floors[2][14] = new Room (2, 19, 44, '225', 'The 200 computer lab');
  floors[2][15] = new Room (2, 25, 25, '227', 'Office', "Harig");
  floors[2][16] = new Room (2, 26, 22, '228', 'Classroom');
  floors[2][17] = new Room (2, 31, 7, '231', 'Office');
  floors[2][18] = new Room (2, 32, 15, '230', 'Office', "Ebadi");
  floors[2][19] = new Room (2, 45, 11, '233', 'Classroom');
  floors[2][20] = new Room (2, 49, 10, '235', 'Storage');
  floors[2][21] = new Room (2, 45, 19, '232', 'Classroom', "Myers");
  floors[2][22] = new Room (2, 39, 26, '222', 'Classroom');
  floors[2][23] = new Room (2, 32, 27, '219-2', 'Office', "Cawelti, Hickman, Muzny");
  floors[2][24] = new Room (2, 24, 45, '220', 'Classroom');
  floors[2][25] = new Room (2, 23, 51, '219', 'Classroom');
  floors[2][26] = new Room (2, 21, 89, 'F400-2', 'The main staircase to the 400 floor');
  floors[2][27] = new Room (2, 79, 81, 'MAIN-200', 'Access to the main level');
  floors[2][28] = new Room (2, 88, 80, 'F300-1', 'Tiny corridor to the 300 floor');
  floors[2][29] = new Room (2, 84, 66, 'F100', 'Access to the 100 floor (cafeteria)');
  floors[2][30] = new Room (2, 52, 13, 'EXIT-200-1', 'Exit (LOCKED)');
  floors[2][31] = new Room (2, 6, 68, 'EXIT-200-2', 'Exit (LOCKED)');
  floors[2][32] = new Room (2, 71, 53, 'EXIT-BACK-1', 'Back entrance/exit (LOCKED AFTER 9:00)');


  floors[3][0] = new Room (3, 22, 14, '302', 'Break room');
  floors[3][1] = new Room (3, 31, 31, '308', 'Teacher office', "Feeney, Karner, Gesell");
  floors[3][2] = new Room (3, 35, 29, '309-1', 'Tech/Drafting Lab');
  floors[3][3] = new Room (3, 36, 46, '310', 'Video editing');
  floors[3][4] = new Room (3, 37, 49, '312-1', 'Electrical');
  floors[3][5] = new Room (3, 44, 46, '311-1', 'Storage/Lost and Found');
  floors[3][6] = new Room (3, 47, 39, '312-2', 'Storage');
  floors[3][7] = new Room (3, 49, 34, '312-3', 'Storage');
  floors[3][8] = new Room (3, 42, 24, '309-2', 'Tech/Drafting Lab');
  floors[3][9] = new Room (3, 53, 26, '309-3', 'Tech/Drafting Lab');
  floors[3][10] = new Room (3, 69, 38, '339-1', 'Film/Photography room and JLab');
  floors[3][11] = new Room (3, 75, 58, '339-2', 'Film/Photography room and JLab');
  floors[3][12] = new Room (3, 75, 62, '333', 'Computer lab', "Gyamerah");
  floors[3][13] = new Room (3, 69, 73, '330', 'Custodian room');
  floors[3][14] = new Room (3, 70, 82, '329', 'Storage room');
  floors[3][15] = new Room (3, 59, 83, '325', 'Boy\'s bathroom');
  floors[3][16] = new Room (3, 55, 83, '324', 'Girl\'s bathroom');
  floors[3][17] = new Room (3, 55, 88, '326', 'Dressing room');
  floors[3][18] = new Room (3, 59, 90, '327', 'Dressing room');
  floors[3][19] = new Room (3, 59, 94, '328', 'Dressing room');
  floors[3][20] = new Room (3, 59, 29, '318', 'Pantry');
  floors[3][21] = new Room (3, 63, 39, '317-1', 'Food lab');
  floors[3][22] = new Room (3, 51, 41, '316', 'Work room', "Costello, Grossi");
  floors[3][23] = new Room (3, 69, 62, '317-2', 'Food lab');
  floors[3][24] = new Room (3, 68, 68, '334', 'Storage');
  floors[3][25] = new Room (3, 65, 71, '323', 'Workroom');
  floors[3][26] = new Room (3, 57, 74, '315-1', 'Multi-use classroom');
  floors[3][27] = new Room (3, 46, 52, '315-2', 'Multi-use classroom');
  floors[3][28] = new Room (3, 11, 1, 'MAIN-300', 'Back to the main hallway');
  floors[3][29] = new Room (3, 42, 32, 'F500-1', 'Staircase to the 500 hallway');
  floors[3][30] = new Room (3, 72, 79, 'F500-2', 'Another staircase to the 500 hallway');
  floors[3][31] = new Room (3, 63, 26, 'EXIT-300', 'Exit to the back parking lot (LOCKED)');
  //Missing teachers: Halstead

  floors[4][0] = new Room (4, 77, 49, '402-1', 'Science');
  floors[4][1] = new Room (4, 71, 72, '402-2', 'Science');
  floors[4][2] = new Room (4, 81, 83, '405-1', 'Science');
  floors[4][3] = new Room (4, 89, 43, '432-1', 'Physics');
  floors[4][4] = new Room (4, 81, 42, '432-2', 'Physics');
  floors[4][5] = new Room (4, 86, 50, '401', 'Office', "Clement, Gutherie, Szameitat");
  floors[4][6] = new Room (4, 77, 42, '430-1', 'Physics');
  floors[4][7] = new Room (4, 70, 38, '430-2', 'Physics');
  floors[4][8] = new Room (4, 67, 37, '424-2', 'Science Computer Lab');
  floors[4][9] = new Room (4, 64, 64, '425-1', 'Upper Lecture Hall');
  floors[4][10] = new Room (4, 53, 30, '424-1', 'Science Computer Lab');
  floors[4][11] = new Room (4, 52, 34, '425-2', 'Upper Lecture Hall');
  floors[4][12] = new Room (4, 49, 37, '426-2', 'Lower Lecture Hall');
  floors[4][13] = new Room (4, 61, 67, '426-1', 'Lower Lecture Hall');
  floors[4][14] = new Room (4, 62, 72, '427', 'Office', "Albritton, Passarelli, Petach, Wozniak");
  floors[4][15] = new Room (4, 66, 86, '405-2', 'Science');
  floors[4][16] = new Room (4, 64, 90, '407', 'Office', "Cox, Glaab, Rabatin, Rundell");
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
  floors[4][33] = new Room (4, 41, 90, 'F600-1', 'Staircase to floor 600');
  floors[4][34] = new Room (4, 69, 79, 'F600-2', 'Staircase to floor 600');
  floors[4][35] = new Room (4, 10, 73, 'LIBRARY', 'The school library');
  floors[4][36] = new Room (4, 80, 75, 'MAIN-400-1', 'Back to the main hallway');
  floors[4][37] = new Room (4, 57, 5, 'F200-1', 'Staircase to floor 200');
  floors[4][38] = new Room (4, 91, 45, 'MAIN-400-2', 'Back to the main hallway');
  floors[4][39] = new Room (4, 29, 32, '420-1', 'Biology');
  floors[4][40] = new Room (4, 15, 17, 'EXIT-400', 'Exit to the lake (LOCKED)');
  //Campbell, Hearty, Knowles, Roetto, Strode

  floors[5][0] = new Room (5, 38, 83, "541", "Office");
  floors[5][1] = new Room (5, 40, 89, "542", "Office");
  floors[5][2] = new Room (5, 34, 94, "545", "Platform");
  floors[5][3] = new Room (5, 38, 94, "544", "Office");
  floors[5][4] = new Room (5, 38, 62, "501", "Special Education");
  floors[5][5] = new Room (5, 34, 44, "501-2", "Special Education");
  floors[5][6] = new Room (5, 29, 38, "510", "Custodian Room");
  floors[5][7] = new Room (5, 26, 33, "514-ACCESS-1", "Provides access to the 514 art room");
  floors[5][8] = new Room (5, 21, 20, "507", "");
  floors[5][9] = new Room (5, 21, 7, "512", "Fine arts room");
  floors[5][10] = new Room (5, 46, 15, "513", "Fine arts room", "Jaramillo");
  floors[5][11] = new Room (5, 44, 18, "514-ACCESS-2", "Provides access to the 514 art room");
  floors[5][12] = new Room (5, 38, 41, "502", "Special Education");
  floors[5][13] = new Room (5, 44, 59, "521", "Music Library");
  floors[5][14] = new Room (5, 49, 55, "522", "Music Library", "Boyer");
  floors[5][15] = new Room (5, 53, 52, "524", "Choir Room");
  floors[5][16] = new Room (5, 54, 57, "523", "Office", "Bizzaro, Vlachos");
  floors[5][17] = new Room (5, 56, 67, "531", "Fine Arts Studio");
  floors[5][18] = new Room (5, 66, 69, "555", "Office");
  floors[5][19] = new Room (5, 77, 71, "EXIT-500", "Exit and band rooms");
  floors[5][20] = new Room (5, 58, 79, "F300-3", "Access to the 300 floor");
  floors[5][21] = new Room (5, 30.5, 21, "F300-2", "Access to the 300 floor");
  floors[5][22] = new Room (5, 25, 71, "MAIN-600-1", "Access to the main level");
  floors[5][23] = new Room (5, 73, 81, "F700-1", "Access to the 700 floor");
  floors[5][24] = new Room (5, 42, 22, "518", "Storage");
  //Missing: Anderson, Keller

  floors[6][0] = new Room (6, 44, 15, 'F400-1', 'Main staircase to floor 400');
  floors[6][1] = new Room (6, 34.5, 2, '631', 'Spanish and French classroom');
  floors[6][2] = new Room (6, 36, 4, '632', 'Office');
  floors[6][3] = new Room (6, 32, 5, '630', 'Office');
  floors[6][4] = new Room (6, 39, 12, '633', 'Classroom');
  floors[6][5] = new Room (6, 37, 18, '629', 'French and Spanish classroom');
  floors[6][6] = new Room (6, 41, 16, '636', 'Storage');
  floors[6][7] = new Room (6, 38, 22, '628', 'Languages classroom');
  floors[6][8] = new Room (6, 37, 36, '627', 'Office');
  floors[6][9] = new Room (6, 35, 37, '626', 'Classroom');
  floors[6][10] = new Room (6, 34, 42, '625', 'Office');
  floors[6][11] = new Room (6, 21, 74.5, '659', 'World languages classroom');
  floors[6][12] = new Room (6, 20, 78, '660', 'Classroom');
  floors[6][13] = new Room (6, 15, 89, '661', 'Languages classroom');
  floors[6][14] = new Room (6, 27, 76, '658', 'Languages classroom');
  floors[6][15] = new Room (6, 28, 72, '657', 'Computer lab');
  floors[6][16] = new Room (6, 35, 60, '654', 'Storage');
  floors[6][17] = new Room (6, 38, 60, '655', 'Office');
  floors[6][18] = new Room (6, 47, 62, '656', 'Office');
  floors[6][19] = new Room (6, 52, 61, '616', 'Boy\'s bathroom');
  floors[6][20] = new Room (6, 56, 54, '615', 'Social studies classroom');
  floors[6][21] = new Room (6, 52, 47, '614', 'Closet');
  floors[6][22] = new Room (6, 41, 56, '619', 'Staff bathroom');
  floors[6][23] = new Room (6, 50, 57, '620', 'Staff bathroom');
  floors[6][24] = new Room (6, 49, 50, '621', 'Office');
  floors[6][25] = new Room (6, 46, 41, '622', 'Girl\'s bathroom');
  floors[6][26] = new Room (6, 43, 36, '612', 'Kitchen');
  floors[6][27] = new Room (6, 50, 25, '637', 'Office', "Cordon");
  floors[6][28] = new Room (6, 55, 23, '638', 'Social studies classroom');
  floors[6][29] = new Room (6, 59, 23, '639-1', 'Social studies classroom');
  floors[6][30] = new Room (6, 63, 12, '639-2', 'Social studies classroom');
  floors[6][31] = new Room (6, 62, 7, '641', 'Social studies classroom');
  floors[6][32] = new Room (6, 67, 11, '642', 'Office', "Stewart");
  floors[6][33] = new Room (6, 69, 18, '645', 'Storage');
  floors[6][34] = new Room (6, 69, 15, '644', 'Closet');
  floors[6][35] = new Room (6, 73, 32, '646', 'Classroom');
  floors[6][36] = new Room (6, 80, 31, '647', 'Bathroom');
  floors[6][37] = new Room (6, 82, 29, '648', 'Bathroom');
  floors[6][38] = new Room (6, 41, 40, '624', 'Office');
  floors[6][39] = new Room (6, 59, 35, '611', 'Social studies classroom');
  floors[6][40] = new Room (6, 61, 38, '609', 'Social studies classroom');
  floors[6][41] = new Room (6, 72, 46, '608', 'Social studies classroom');
  floors[6][42] = new Room (6, 74, 37, '604', 'Office');
  floors[6][43] = new Room (6, 83, 35, '602', 'Office');
  floors[6][44] = new Room (6, 86, 32, '601', 'Office');
  floors[6][45] = new Room (6, 61, 0, 'F400-HIDDEN', 'A hidden staircase to the 400 level');
  floors[6][46] = new Room (6, 88, 25, 'MAIN-600', 'Back to the main level');
  floors[6][47] = new Room (6, 57, 62, 'F800', 'Main staircase to the 800 floor');
  floors[6][48] = new Room (6, 84, 43, 'F800-HIDDEN', 'Hidden staircase to the 800 floor');
  floors[6][49] = new Room (6, 17, 92, 'EXIT-600', 'Exit to the parking lot (LOCKED)');


  floors[7][0] = new Room (7, 31, 27, '703', 'Health Room');
  floors[7][1] = new Room (7, 33, 32, '704', 'Men\'s Locker Room');
  floors[7][2] = new Room (7, 35, 53, '722', 'Office');
  floors[7][3] = new Room (7, 31, 57, '726-1', 'Varsity Locker Room');
  floors[7][4] = new Room (7, 27, 61, '729', 'Office');
  floors[7][5] = new Room (7, 33, 79, '731', 'Health Room');
  floors[7][6] = new Room (7, 35, 84, '732-ACCESS', 'Hallway to Women\'s Locker Room');
  floors[7][7] = new Room (7, 53, 86, '738', 'Women\'s Locker Room');
  floors[7][8] = new Room (7, 62, 68, '744', 'Access to Women\'s Locker Room');
  floors[7][9] = new Room (7, 64, 61, '726-2', 'Varsity Locker Room');
  floors[7][10] = new Room (7, 38, 76, '735', 'Trainer');
  floors[7][11] = new Room (7, 75, 58, '760', 'Weight Room');
  floors[7][12] = new Room (7, 66, 66, 'F900-2', 'Access to the mat room and main gym');
  floors[7][13] = new Room (7, 82, 71, 'F900-3', 'Access to the main gym and south gym');
  floors[7][14] = new Room (7, 19, 57, 'F900-4', 'Access to The Bricks and main level');
  floors[7][15] = new Room (7, 17, 7, 'F500-3', 'Access to 500 level');
  floors[7][16] = new Room (7, 86, 67, 'EXIT-700', 'Exit to the side of the school');
  // Beauchamp, Vandepol, McCartney

  floors[8][0] = new Room (8, 96, 26, '801', 'Main office (from outside this hallway)');
  floors[8][1] = new Room (8, 81, 45, '802', 'Main office');
  floors[8][2] = new Room (8, 71, 50, '809', 'Attendance office');
  floors[8][3] = new Room (8, 63, 48, '821', 'Storage');
  floors[8][4] = new Room (8, 82, 24, '811', 'Language arts classroom');
  floors[8][5] = new Room (8, 78, 33, '812-1', 'Language arts classroom');
  floors[8][6] = new Room (8, 61, 33, '812-2', 'Language arts classroom');
  floors[8][7] = new Room (8, 57, 25, '813', 'Language arts classroom');
  floors[8][8] = new Room (8, 49, 14, '814', 'Language arts classroom');
  floors[8][9] = new Room (8, 31, 39, '855-1', 'Teacher office', "Hutchins, Lewis, Thistle");
  floors[8][10] = new Room (8, 20, 39, '855-2', 'Teacher office', "Hutchins, Lewis, Thistle");
  floors[8][11] = new Room (8, 13, 60, '854', 'Language arts classroom');
  floors[8][12] = new Room (8, 13, 68, '853', 'Language arts classroom', "Brennan");
  floors[8][13] = new Room (8, 14, 75, '848', 'Language arts classroom');
  floors[8][14] = new Room (8, 19, 62, '844-1', 'Language arts classroom', "Bursiek, Robertson");
  floors[8][15] = new Room (8, 36.5, 63, '844-2', 'Language arts classroom', "Bursiek, Robertson");
  floors[8][16] = new Room (8, 18, 71, '843', 'Teacher office');
  floors[8][17] = new Room (8, 23.5, 79, '842-1', 'Teacher office', "Hensley, Hunt");
  floors[8][18] = new Room (8, 32, 79, '842-2', 'Teacher office', "Hensley, Hunt");
  floors[8][19] = new Room (8, 24, 92, '847', 'Language arts classroom');
  floors[8][20] = new Room (8, 31, 92, '846', 'Language arts classroom');
  floors[8][21] = new Room (8, 37, 71, '841', 'Teacher office', "Broaddus, Cosmos");
  floors[8][22] = new Room (8, 39, 52, '831', 'Teacher office', "Rodrigues, Scott, Zerwin");
  floors[8][23] = new Room (8, 42, 61, '822', 'Languages arts computer lab');
  floors[8][24] = new Room (8, 42, 68, '823', 'Language arts classroom');
  floors[8][25] = new Room (8, 42, 74, '845', 'Language arts classroom');
  floors[8][26] = new Room (8, 10.5, 33, 'F600-MAIN-1', 'Main staircase to the 600 floor');
  floors[8][27] = new Room (8, 56, 2, 'F600-HIDDEN-1', 'A hidden staircase to the 600 floor');
  floors[8][28] = new Room (8, 87, 19, 'MAIN-800', 'Back to the main level');
  //Teachers missing: Corson, Nieb, Radis, Roitz, Weber

  floors[9][0] = new Room (9, 6, 36, "918", "");
  floors[9][1] = new Room (9, 12, 36, "917", "");
  floors[9][2] = new Room (9, 33, 35, "915", "");
  floors[9][3] = new Room (9, 42, 35, "914", "IB Store");
  floors[9][4] = new Room (9, 50, 24, "913", "Football Storage");
  floors[9][5] = new Room (9, 56, 29, "901-1", "Mat Room/Aerobics");
  floors[9][6] = new Room (9, 52, 37, "900-1", "Main Gym");
  floors[9][7] = new Room (9, 83, 68, "900-2", "Main Gym");
  floors[9][8] = new Room (9, 81, 73, "900-3", "Main Gym");
  floors[9][9] = new Room (9, 84, 80, "902-1", "South Gym");
  floors[9][10] = new Room (9, 85, 76, "906", "Bathroom");
  floors[9][11] = new Room (9, 90, 62, "905", "Bathroom");
  floors[9][12] = new Room (9, 91, 58, "902-2", "South Gym");
  floors[9][13] = new Room (9, 73, 25, "901-2", "Mat Room/Aerobics");
  floors[9][14] = new Room (9, 69, 27, "F700-2", "Access to the 700 floor's other corridors (plus the other gyms)");
  floors[9][15] = new Room (9, 44, 25, "F700-3", "Access to the 700 floor main corridor");
  floors[9][16] = new Room (9, 3, 39, "MAIN-900", "Access to the main hall");
  floors[9][17] = new Room (9, 8, 44, "EXIT-900-1", "Exit to front parking lot");
  floors[9][18] = new Room (9, 44, 44, "EXIT-900-2", "Exit to front parking lot");
  floors[9][19] = new Room (9, 91, 50, "EXIT-900-3", "Exit to the back parking lot");
  floors[9][20] = new Room (9, 81, 81, "EXIT-900-4", "Exit to the front parking lot");

  searchForRoom = function(query) { //searches for exact room number. query must be numeric.
    var currFloor = query[0];
    for(i = 0; i < floors[currFloor].length; i++) {
      if(floors[currFloor][i].num === query) {
        return i;
      }
    }
    return -1;
  }
  searchForFloor = function(query) { //returns floor and room number in floors[] that's .num is query.
    for(j = 0; j < floors.length; j++) {
      for(i = 0; i < floors[j].length; i++) {
        if(floors[j][i].num === query) {
          return [j, i];
        }
      }
    }
    return [-1, -1];
  }

  searchForFound = function(query) { //searches the found array
    for(i = 0; i < found.length; i++) {
      if(query === found[i]) {
        return i;
      }
    }
    return -1;
  }

  searchForRoomSoft = function(query) { //searches for the room containing query. adds it to the found array and will only return the value one time if found isn't [].
    var currFloor = query[0];
    if(!isNaN(currFloor)) {
      if(currFloor >= 0 && currFloor <= 9) {
        for(j = 0; j < floors[currFloor].length; j++) {
          var room = floors[currFloor][j].num;
          if((room.search(query) === 0) && (searchForFound(room.substr(0, 3)) === -1)) {
            found.push(room.substr(0, 3));
            return j;
          }
        }
        return -1;
      } else {
        return -1;
      }
    } else {
      return -1;
    }
  }

  searchForRoomSoftTemp = function(query) { //searchForRoomSoft() but doesn't check the found array.
    var currFloor = query[0];
    if(!isNaN(currFloor)) {
      if(currFloor >= 0 && currFloor <= 9) {
        for(j = 0; j < floors[currFloor].length; j++) {
          var room = floors[currFloor][j].num;
          if((room.search(query) === 0)) {
            // found.push(room.substr(0, 3)); sorry i'm lazy and query this to work
            return j;
          }
        }
        return -1;
      } else {
        return -1;
      }
    } else {
      return -1;
    }
  }

  searchForDescSoft = function(query) { //like searchforroomsoft but with .info. case doesn't matter.
    var searchLower = query.toString().toLowerCase();
    query = searchLower;
    for(e = 0; e < floors.length; e++) {
      for(j = 0; j < floors[e].length; j++) {
        var room = floors[e][j].num;
        var desc = floors[e][j].info.toString().toLowerCase();
        var teachers = floors[e][j].teacher.toString().toLowerCase();
        if(((desc.search(searchLower) != -1) || (teachers.search(searchLower) != -1)) && (searchForFound(room) === -1)) {
          found.push(room);
          return [e, j];
        }
      }
    }
    return -1;
  }

  $(".other").click(function() {
    var id = $(this).attr("id").toString();
    if(parseInt(id[1])) {
      scrollToFloor(id[1]);
    }
    if(id.substr(0, 4) === "MAIN") {
      scrollToFloor(0);
    }
  })

  $(document).keyup(function() {
    setTimeout(function() {
      var searchInput = $("input[name=search]").val();
      search(searchInput);
    }, 100)
  })

  // $("#search").focusout(function() {
  //   search("");
  //   $("#search-lower").height(0);
  // });

  hoverRoom = function(id, activate) {
    $(".room, .other").removeClass("hovered");
    if(activate != false) {
      $("#"+id.toString()).addClass("hovered");
      $("#"+id.toString()+"-1").addClass("hovered"); // just in case the function is being run from the hash
    }
    clearTimeout(infoTime);
    var a;
    activeFloor = id[0];
    if(activeFloor === 'F' || activeFloor === 'L' || activeFloor === 'M' || activeFloor === 'C' || activeFloor === 'E') {
      activeFloor = searchForFloor(id.toString());
      a = activeFloor[1];
      activeFloor = activeFloor[0];
    }
    else {
      if(!activate) {
        a = searchForRoom(id);
      }
      else {
        a = searchForRoomSoftTemp(id);
      }
    }
    var activeRoom = floors[activeFloor][a];
    activateInfo(activeFloor);
    if((deg % 180) === 0 || deg === 0) {
      $("#f"+activeFloor+"-info").css("top", ((activeRoom.y)-15)+"%");
      $("#f"+activeFloor+"-info").css("left", ((activeRoom.x)-10)+"%");
      if(activeRoom.y <= 20) {
        $("#f"+activeFloor+"-info").css("top", ((activeRoom.y)+10)+"%");
      }
      if(activeRoom.x >= 85) {
        $("#f"+activeFloor+"-info").css("left", ((activeRoom.x)-20)+"%");
      }
      if(activeRoom.x <= 10) {
        $("#f"+activeFloor+"-info").css("left", ((activeRoom.x)+5)+"%");
      }
    }
    else {
      $("#f"+activeFloor+"-info").css("top", ((activeRoom.y)-30)+"%");
      $("#f"+activeFloor+"-info").css("left", ((activeRoom.x)-25)+"%");
      if(activeRoom.y <= 30) {
        $("#f"+activeFloor+"-info").css("top", ((activeRoom.y)+10)+"%");
      }
      if(activeRoom.x <= 35) {
        $("#f"+activeFloor+"-info").css("left", ((activeRoom.x)+5)+"%");
      }
    }


    $("#f"+activeFloor+"-h1").html(activeRoom.num);
    if(activeRoom.teacher === "") {
      $("#f"+activeFloor+"-p").html(activeRoom.info);
    } else {
      var teacherText = "Teachers";
      if(activeRoom.teacher.search(",") === -1) { //Only one teacher
        var teacherText = "Teacher"
      }
      $("#f"+activeFloor+"-p").html(activeRoom.info + "<br><span class='teacher'>"+teacherText+": "+activeRoom.teacher+"</span>");
    }
      $(".info-top").css("background-color", activeRoom.color);
    $(".info-outer").css("border", "1px solid "+activeRoom.color);
    infoTime = setTimeout(function() {$(".info-outer").css("opacity", "0")}, 1000);
  }

  $(".room, .other").hover(function() {
    hoverRoom($(this).attr("id").toString(), false)
  }, function() {
    clearTimeout(infoTime);
    $("#"+$(this).attr("id").toString()).removeClass("hovered");
    infoTime = setTimeout(function() {$("#f"+activeFloor+"-info").css("opacity", "0")}, 1000);
  })

  foundRooms = [];
  foundDescs = [];

  //HOW THE SEARCH WORKS
  //1) Search function creates foundRooms array and gets all the stuff needed.
  //2) It either runs appendFound() or appendFoundDescs(), which appends the found stuff.

  search = function(query) {
    if(!isNaN(query) && parseInt(query[0]) >= 2) {
      found = ['this is to avoid infinite loops lol'];
      foundRooms = [];
      var currFloor = query[0];
      for(f = 0; f < floors[currFloor].length; f++) {
        var hi = searchForRoomSoft(query);
        if(f === 0 && hi === -1) {
          foundRooms = [];
          appendFound(query);
          break;
        }
        if(hi != -1) {
          foundRooms.push(hi);
        }
        if(hi === -1) {
          appendFound(query);
          break;
        }
      }
      appendFound(query);
    }
    if(isNaN(query)) {//descriptions
      found = ['avoiding more infinite loops']; //For some reason, when found starts is empty an infinite loop occurrs. DO NOT REMOVE
      foundDescs = [];
      for(r = 0; r < floors.length; r++) {
        for(f = 0; f < floors[r].length; f++) {
          var hi = searchForDescSoft(query);
          if(hi != -1) {
            foundDescs.push(hi);
          }
          if(hi === -1) {
            appendFoundDescs(query);
            break;
          }
        }
        appendFoundDescs(query);
      }
    }
  }

  appendFound = function(query) { //appends foundRooms[] into the search thing
    query = $("input[name=search]").val().toString().toLowerCase();
    var currFloor = query[0];
    if(foundRooms.length === 0) {
      $("#search-lower").css("height", "5vw");
      $("#search-lower").empty();
      $("#search-lower").append("<p style='font-size: 3vw; line-height; 5vw; vertical-align: middle; font-weight: 900; color: black; text-align: center'>No rooms found.</p>")
      results = false;
    }
    else {
      results = true;
      var multVal; // This calculates the height of search-lower
      if(detectmobile()) {
        multVal = 10;
      }
      else {
        multVal = 5;
      }
      if(foundRooms.length <= 4) {
        $("#search-lower").css("height", multVal*foundRooms.length+"vw");
      }
      else {
        $("#search-lower").css("height", multVal*4.5+"vw");
      }
      $("#search-lower").empty();
      if(foundRooms.length > 1) {
        for(i = 0; i < foundRooms.length; i++) {
          var e = foundRooms[i];
          var roomNumFull = floors[currFloor][e].num;
          var roomNum = floors[currFloor][e].num.substr(0, 3);
          var roomDesc = floors[currFloor][e].info;
          var roomTeacher = floors[currFloor][e].teacher;
          if(roomDesc.length >= maxSearchCars) {
            roomDesc = roomDesc.substr(0, maxSearchCars) + "...";
          }
          if(roomTeacher != "") {
            var teacherText = "Teachers";
            if(roomTeacher.search(',') === -1) {
              teacherText = "Teacher"
            }
            $("#search-lower").append('<div class="result-outer" id="q'+roomNumFull+'"><div class="result-left"><p>'+roomNum+'</p></div><p class="result-right">'+roomDesc+'<span class="teacher-search">'+teacherText+': '+roomTeacher+'</span></p></div>')
          }
          else {
            $("#search-lower").append('<div class="result-outer" id="q'+roomNumFull+'"><div class="result-left"><p>'+roomNum+'</p></div><p class="result-right">'+roomDesc+'</p></div>')
          }
        }
      }
      else if(foundRooms.length === 1) {
        var e = foundRooms[0];
        var roomNumFull = floors[currFloor][e].num;
        var roomNum = floors[currFloor][e].num.substr(0, 3);
        var roomDesc = floors[currFloor][e].info;
        var roomTeacher = floors[currFloor][e].teacher;
        if(roomDesc.length >= maxSearchCars) {
          roomDesc = roomDesc.substr(0, maxSearchCars) + "...";
        }
        if(roomTeacher != "") {
          $("#search-lower").append('<div class="result-outer" id="q'+roomNumFull+'"><div class="result-left"><p>'+roomNum+'</p></div><p class="result-right">'+roomDesc+'<span class="teacher-search">TEACHERS: '+roomTeacher+'</span></p></div>')
        }
        else {
          $("#search-lower").append('<div class="result-outer" id="q'+roomNumFull+'"><div class="result-left"><p>'+roomNum+'</p></div><p class="result-right">'+roomDesc+'</p></div>')
        }
      }
    }
    $(".result-outer").click(function() {
      var id = $(this).attr("id").toString()
      var id = id.substr(1, id.length);
      goTo(id);
    })
  }

  appendFoundDescs = function(query) {
    if(foundDescs.length === 0) {
      $("#search-lower").css("height", "5vw");
      $("#search-lower").empty();
      $("#search-lower").append("<p style='font-size: 3vw; line-height; 5vw; vertical-align: middle; font-weight: 900; color: black; text-align: center'>No rooms found.</p>")
      results = false;
      return 0;
    }
    else {
      results = true;
      var multVal;
      if(detectmobile()) {
        multVal = 10;
      }
      else {
        multVal = 5;
      }
      if(foundDescs.length <= 4) {
        $("#search-lower").css("height", multVal*foundDescs.length+"vw");
      }
      else {
        $("#search-lower").css("height", multVal*4.5+"vw");
      }
      $("#search-lower").empty();
      if(foundDescs.length >= 1) {
        for(i = 0; i < foundDescs.length; i++) {
          var roomNum;
          var descFloor = foundDescs[i][0];
          var descRoom = foundDescs[i][1];
          var roomNumFull = floors[descFloor][descRoom].num;
          var roomTeacher = floors[descFloor][descRoom].teacher;
          var roomType = floors[descFloor][descRoom].type;
          if(floors[descFloor][descRoom].type === 'room') {
            roomNum = floors[descFloor][descRoom].num.substr(0, 3);
          }
          else {
            roomNum = floors[descFloor][descRoom].num.substr(0, 4);
          }
          var roomDesc = floors[descFloor][descRoom].info;
          if(roomDesc.length >= maxSearchCars) {
            roomDesc = roomDesc.substr(0, maxSearchCars) + "...";
          }
          roomDesc = roomDesc.insertSpans(query);
          if(roomTeacher != "") {
            var teacherText = "Teachers";
            if(roomTeacher.search(',') === -1) {
              teacherText = "Teacher"
            }
            $("#search-lower").append('<div class="result-outer" id="q'+roomNumFull+'"><div class="result-left" id="result-left'+roomNumFull+'"><p>'+roomNum+'</p></div><p class="result-right">'+roomDesc+'<span class="teacher-search">'+teacherText+': '+roomTeacher+'</span></p></div>')
            if(roomType === 'other') {
              $("#result-left"+roomNumFull).addClass("r-other");
            }
          }
          else {
            $("#search-lower").append('<div class="result-outer" id="q'+roomNumFull+'"><div class="result-left" id="result-left'+roomNumFull+'"><p>'+roomNum+'</p></div><p class="result-right">'+roomDesc+'</p></div>')
            if(roomType === 'other') {
              $("#result-left"+roomNumFull).addClass("r-other");
              $("#result-left"+roomNumFull).css("background-color", floors[descFloor][descRoom].color);
            }
          }
        }
      }
    }
    $(".result-outer").click(function() {
      var id = $(this).attr("id").toString()
      var id = id.substr(1, id.length);
      goTo(id);
    })
  }

  goTo = function(where) {
    if(!isNaN(where[0])) {
      var currentFloor = where[0];
      var f = searchForRoomSoftTemp(where.toString());
      if(f != -1) {
        $(".room, .other").css("pointer-events", "none");
        scrollToFloor(parseInt(where[0]));
        var actualWhere = floors[currentFloor][f].num.toString();
        var offset = $("#"+actualWhere).offset();
        $("#"+where[0]+"00-outer").scrollLeft(offset.left);
        hoverRoom(where, true);
        setTimeout(function() {
          $(".room, .other").css("pointer-events", "auto");
        }, 3000);
      }
    }
    else if(where[0] === 'F') {
      scrollToFloor(where[1]);
    }
    else if(where[0] === 'E') {
      var f = searchForFloor(where.toString());
      if(f != -1) {
        $(".room, .other").css("pointer-events", "none");
        scrollToFloor(parseInt(f[0]));
        var actualWhere = floors[f[0]][f[1]].num.toString();
        var offset = $("#"+actualWhere).offset();
        $("#"+where[0]+"00-outer").scrollLeft(offset.left);
        hoverRoom(where, true);
        setTimeout(function() {
          $(".room, .other").css("pointer-events", "auto");
        }, 3000);
      }
    }
    else if(where[0] === 'C') {
      $(".room, .other").css("pointer-events", "none");
      scrollToFloor(0);
      var actualWhere = floors[1][12].num.toString();
      var offset = $("#"+actualWhere).offset();
      $("#"+where[0]+"00-outer").scrollLeft(offset.left);
      hoverRoom(where, true);
      setTimeout(function() {
        $(".room, .other").css("pointer-events", "auto");
      }, 3000);
    }
    setExpanded(false);
    $("#search").blur();
  }

  setTimeout(function() { // allows time for the window to scroll to (something, 0) for mobile
    var category = (location.hash).replace('#','');
    goTo(category.toString());
  }, 1000);

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

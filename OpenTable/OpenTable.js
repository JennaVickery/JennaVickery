var data;
var table = [];
var KEYN;
var KEYT;
var PSet;
var Screen = 1;
var Possible;
var Servers;
var Final;


//LOADS DATA FILE 
function preload() {
  data = loadTable("data/Table.csv");
  LoadServers();
}
//LOADS OBJECT 
function setup() {

  Servers = new Dictionary();
  PSet = new Set();
  createCanvas(800, 600);
  background(0);
  for (var r = 0; r< data.getRowCount(); r++) {
    table.push(new Tables(data.getString(r, 0), data.getString(r, 1), data.getString(r, 2)));
  }
}

//START UP
function draw() {

  drawTables();
  titleScreen();
  if (Screen == 2) {
    titleScreen2();
  }
}
//drawsTables
function drawTables() {

  var x = 50;
  var y = 25;
  var size = 50;


  for (var r = 0; r < table.length; r++) {

    if (y < 600) {
      fill(104, 203, 221);
      rect(x, y, size, size);

      textSize(15);
      fill(0);
      text(table[r].getTableNumber(), x + 15, y + 30);
      y+= 100;
    } else {
      y = 25;
      x+=150;
    }
  }
}
//FIRST SCREEN SHOWN 
function titleScreen() {

  fill(104, 203, 221);
  rect(200, 150, 400, 200);
  fill(0);
  textSize(50);

  text("How Many?", 275, 250);
  if (keyIsPressed && Screen == 1) {
    KEYN = String.fromCharCode(keyCode);
    Guest();
  }
} 
//SECOND SCREEN SHOWN
function titleScreen2() {
  fill(104, 203, 221);
  rect(200, 150, 400, 200);
  fill(0);
  textSize(50);

  text("Table or Booth?", 225, 250);
  textSize(32);
  text("T or B", 350, 300);
  if (keyIsPressed && Screen == 2) {
    KEYT = String.fromCharCode(keyCode);
  }
  fill(255);
  text(getTableOnBooth(), 100, 100);
}
//CALLED AFTER FIRST TITLE SCREEN, LAUNCHES THE SECOND 
function Guest() {

  textSize(30);
  fill(0);
  text(KEYN, 400, 300);
  fill(0);
  text(getTableOnNumber(), 50, 500);
  Screen+=1;
  titleScreen2();
}
//FINDS ALL BOOTHS IN THE RESURANT, RETURNS A SET 
function getBooth() {
  var PBooth = new Set();

  for (var r = 0; r < table.length; r ++) {
    if (table[r].isBooth()) {
      PBooth.add(table[r].getTableNumber());
    }
  }

  return PBooth;
}
//FINDS ALL TALBES IN THE RESURANT, RETURNS A SET
function getTable() {
  var PTable = new Set();
  for (var r = 0; r < table.length; r++) {
    if (!table[r].isBooth()) {
      PTable.add(table[r].getTableNumber());
    }
  }
  return PTable;
}



//FINDS ALL TABLES THAT FIT THE NUMEBR OF GUESST 
function getTableOnNumber() {

  for (var r = 0; r < table.length; r++) {
    if (KEYN <= table[r].getMax()) {
      PSet.add(table[r].getTableNumber());
    }
  }
  return PSet.show();
}
//COMPARES 2 SETS 
function getTableOnBooth() {
  Possible = new Set();

  if (KEYT == "T" || KEYT == "t") {
    for (var r = 0; r < getTable().size(); r++) {
      if (PSet.contains(getTable().get(r))) {
        Possible.add(getTable().get(r));
      }
    }
  } else if (KEYT == "B" || KEYT == "b") {
    for (var r = 0; r < getBooth().size(); r++) {
      if (PSet.contains(getBooth().get(r))) {
        Possible.add(getBooth().get(r));
      }
    }
  }
  return Possible.show();
}


////// Load Servers /////////////////
function LoadServers () {

  var S1 = new Set();
  var S2 = new Set();
  var S3 = new Set();
  var S4 = new Set();


  for (r = 0; r < table.length; r++) {
    if (r < 9) {
      S1.add(table[r]);
    } else if ( r < 18) {
      S2.add(table[r]);
    } else if (r < 27 ) {
      S3.add(table[r]);
    } else if (r < 36) {
      S4.add(table[r]);
    }
  }
  Servers.add("Server1", S1);
  Servers.add("Server2", S2);
  Servers.add("Server3", S3);
  Servers.add("Server4", S2);
}



////////////////////////////////////////Object///////////////////////////////////////////
function Tables(tableNumber, maxCap, type) {
  this.tableNumber = tableNumber;
  this.maxCap = maxCap;
  this.type = type;


  this.getMax = function() {
    return this.maxCap;
  }

  this.getTableNumber = function() {
    return this.tableNumber;
  }
  this.isSat = function(s) {
    return this.s;
  }

  this.isBooth = function() {
    if (this.type == "t") {
      return true;
    } else if (this.type == "f") {
      return false;
    }
  }
}
//////////////////////////////////SET//////////////////////////////////////////////////////


function Set() {
  this.dataStore = [];


  this.add = function(data) {
    if (this.dataStore.indexOf(data) < 0) {
      this.dataStore.push(data);
      return true;
    } else {
      return false;
    }
  }

  this.show = function() {
    return this.dataStore;
  }

  this.remove = function(data) {
    var pos = this.dataStore.indexOf(data);
    if (pos > -1) {
      this.dataStore.splice(pos, 1);
      return true;
    } else {
      return false;
    }
  }

  this.size = function() {

    return this.dataStore.length;
  }

  this.get = function(number) {

    return this.dataStore[number];
  }

  this.contains =  function (data) {
    if (this.dataStore.indexOf(data) > -1) {
      return true;
    } else {
      return false;
    }
  }
}
////////////////////////////////////////////MAP///////////////////////////////////////////////

function Dictionary() {

  this.datastore = [];

  this.add = function(key, value) {
    this.datastore[key] = value;
  }
  this.find = function(key) {
    return this.datastore[key];
  }

  this.remove =  function (key) {
    delete this.datastore[key];
  }
  this.showAll = function () {
    for (var key in this.datastore) {
      print(key + " -> " + this.datastore[key]);
    }
  }
}
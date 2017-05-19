var currentWord;
var words;
var len;
var RanLen;
var KEY;
var count = 0;
var RCOUNT = 0;

function preload() {

  words = loadStrings('words.txt');
}
function setup() {
  createCanvas(800, 450);
  background(0);
  h = new HangMan();
  len = words.length;
  setRandom();

  
}

function draw() {
 

   
  drawBar();
  createLine();
  textSize(32);
  fill(255);
  textSize(32);
  //text(currentWord,100,100);
  noFill();
  stroke(255);
  
  
  rect(600,50, 175, 150);
  Counting();
 // CountringR();
}

function scan(word) {

  if (currentWord.indexOf(word) > -1 ) {
    return true;
  } else if (currentWord.indexOf(word) < -1) {
    return false;
  }
}

function disPlay() {
  if (scan(KEY)) {
    text(KEY, 30 +currentWord.indexOf(KEY)*40, 260);
   RCOUNT++;
  } else {
    textSize(25);
    text(KEY, random(605,765), random(60,195));
    count++;
  }
 
}
function Counting(){
  
   if(count == 1){
   h.Head(true);
 }else if (count ==2){
   h.Body(true);
 }else if (count == 3){
   h.Arm1(true);
 }else if(count == 4){
   h.Arm2(true);
 }else if (count == 5){
   h.Leg1(true);
 }else if (count == 6){
   h.Leg2(true);
   h.GameOver(true);
 
  
 }
 if (RCOUNT == currentWord.length){
   h.GameOverR(true);
 }
  
}
function CountingR(){
  
if(RCOUNT == currentWord.length){
  h.GameOverR(true);
}
}
function setRandom() {

  currentWord = random(words);
}

function drawBar() {
  stroke(255);
  line(400, 173, 400, 125);
  line(400, 125, 525, 125);
  line(525, 125, 525, 400);
  line(400, 400, 625, 400);
}

function createLine() {

  var start = 25;

  for (var i =0; i < currentWord.length; i++) {
    line(start, 263, start+25, 263);
    start+= 40;
  }
}

function keyPressed() {

  textSize(32);
  fill(255);

  var keyC = String.fromCharCode(keyCode);
  KEY = keyC.toLowerCase();
  //textSize(32);
 // scan(KEY);
 disPlay();
 
}

/////////////////////////////OBJECT///////////////////////////////////////////////////////////////////////
function HangMan() {
  this.head = false;
  this.body = false;
  this.arm1 = false;
  this.arm2 = false;
  this.leg1 = false;
  this.leg2 = false;
  this.gameOver = false;
  this.gameOverR = false;

  this.Head= function(on) {
    this.head = on;
    if (this.head == true) {
      noFill();
      stroke(255);
      ellipse(width/2, 200, 50, 50);
    }
  }
  this.Body = function(on) {
    this.body = on;
    if (this.body == true) {
      noFill();
      stroke(255);
      line(400, 325, 400, 225);
    }
  }
  this.Arm1 = function(on) {
    this.arm1 = on;
    this.body = on;
    if (this.arm1 == true) {
      noFill();
      stroke(255);
      line(400, 275, 420, 245);
    }
  }
  this.Arm2 = function(on) {
    this.arm2 = on;
    if (this.arm2 == true) {
      noFill();
      stroke(255);
      line(400, 275, 380, 245);
    }
  }
  this.Leg1 = function(on) {
    this.leg1 = on;
    if (this.body == true) {
      noFill();
      stroke(255);
      line(400, 325, 380, 375);
    }
  }
  this.Leg2 = function(on) {
    this.leg2 = on;
    if (this.leg2 == true) {
      noFill();
      stroke(255);
      line(400, 325, 420, 375);
    }
  }
  this.GameOver = function(on) {
    this.gameOver = on;
    textSize(50);
    fill(255);
    text("GAME OVER", 250, height/2);
    textSize(32);
    text("The Correct Word Is:", 250, height/2 +30);
    text(currentWord, 375, height/2 +75);
  }
  this.GameOverR = function(on){
    this.gameOverR = on;
    textSize(50);
    fill(random(255), random(255), random(255));
    text("YOU WIN!", 250 ,height/2);
  
}
}

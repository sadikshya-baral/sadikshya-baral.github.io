const levels = [	
	  // level 0
	  ["tree", "tree", "tree", "tree", "tree", "key", "tree", "tree", "tree", "tree", 
		"tree", "tree", "tree", "tree", "", "", "", "tree", "tree", "tree",
		"tree", "rock", "lava", "lava", "animate", "animate", "animate", "lava", "lava", "rock", 
		"tree", "rock", "rock", "lava", "", "", "", "lava", "rock", "tree",
		"tree", "rock", "rock", "lava", "", "", "", "lava", "rock", "tree",
		"tree", "rock", "rock", "lava", "", "", "", "lava", "rock", "tree",
	    "tree", "rock", "rock", "lava", "", "", "", "lava", "rock", "tree",
		"tree", "rock", "rock", "lava", "", "", "", "lava", "rock", "tree",
		"door", "rock", "rock", "lava", "", "", "", "lava", "rock", "tree",
		"", "", "ice", "", "playerup", "", "", "", "", "tree"],
	  
	  // level 1
	  ["door", "lava", "lava", "", "", "tree", "tree", "tree", "tree", "tree",
		"ice", "lava", "lava", "", "", "tree", "tree", "tree", "tree", "tree",
		"", "lava", "lava", "", "", "", "tree", "tree", "tree", "tree",  
		"", "lava", "lava", "", "", "", "", "tree", "tree", "tree",
		"animate", "bridge animate", "bridge animate", "animate", "animate", "animate", "", "", "key", "tree",
		"", "lava", "lava", "", "", "", "", "", "tree", "tree",
	    "", "lava", "lava", "", "", "", "", "tree", "tree", "tree",
		"", "lava", "lava", "", "", "", "tree", "tree", "tree", "tree",
		"playerup", "lava", "lava", "", "", "tree", "tree", "tree", "tree", "tree",
		"", "lava", "lava", "", "", "tree", "tree", "tree", "tree", "tree"],
		
	  // level 2
	  ["tree", "tree", "tree", "tree", "tree", "playerdown", "tree", "tree", "tree", "tree",
	    "tree", "tree", "tree", "tree", "tree", "", "", "tree", "tree", "tree",
		"door", "tree", "tree", "tree", "tree", "tree", "", "tree", "tree", "tree",
		"ice", "tree", "tree", "animate", "animate", "animate", "animate", "tree", "tree", "tree",
		"", "tree", "tree", "tree", "key", "tree", "tree", "tree", "tree", "tree",
		"ice", "tree", "tree", "tree", "", "tree", "tree", "tree", "tree", "tree",
	    "", "", "", "ice", "", "tree", "tree", "tree", "tree", "tree",
		"tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree",
		"tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree",
		"tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree",],
	  
	  //  level 3
	  ["playerdown", "rock", "rock", "rock", "rock", "rock", "door", "rock", "rock", "rock",
		"", "", "", "", "animate", "animate", "animate", "animate", "animate", "",
		"lava", "lava", "lava", "lava", "lava", "lava", "bridge", "lava", "lava", "lava",
		"lava", "lava", "lava", "lava", "lava", "lava", "bridge", "lava", "lava", "lava",
		"", "rock", "", "rock", "", "", "", "rock", "", "rock",
		"rock", "", "rock", "", "rock", "", "", "", "rock", "",
	    "", "rock", "", "", "", "", "rock", "", "", "",
		"rock", "", "rock", "", "", "rock", "", "", "rock", "",
		"", "", "heart2", "animate2", "animate2", "animate2", "rock", "", "", "",
		"rock", "", "rock", "", "key", "rock", "", "rock", "", "rock"],
		
		
	  //  level 4
	  ["", "tree", "", "tree", "", "door", "", "tree", "", "",
	    "", "", "", "", "ice", "ice", "ice", "", "", "",
		"", "tree", "", "tree", "animate", "animate", "animate", "", "", "",
		"playerright", "", "", "", "", "", "ice", "", "", "",
		"", "", "", "", "tree", "", "ice", "", "heart2", "",
		"tree", "", "tree", "", "", "", "tree", "", "", "",
	    "", "", "", "", "", "", "tree", "", "", "",
		"lava", "lava", "lava", "bridge", "lava", "lava", "lava", "lava", "lava", "lava",
		"lava", "lava", "lava", "bridge", "lava", "lava", "lava", "lava", "lava", "lava",
		"rock", "rock", "animate2", "animate2", "animate2", "animate2", "key", "", "", ""],
	]; // end of levels

const gridBoxes = document.querySelectorAll("#gameBoard div");
const noPassObstacles = ["rock", "tree", "lava"];
var currentLevel = 0; // starting level
var keyOn = false; // is the riser on?
var currentLocationOfPlayer = 0;
var currentAnimation;
var currentAnimation2;
var widthOfBoard = 10;
var nextEnemyClass = "";
var lives = 3;

// start game
window.addEventListener("load", function () {
	loadLevel();
});

// move player
document.onkeydown = function (e) { keydownEventListener(e); };
 
function keydownEventListener(e) {
	switch (e.keyCode) {
		case 37: // left arrow
		  if (currentLocationOfPlayer % widthOfBoard !== 0) {
			  tryToMove("left");
		  } // if
		  break;
		case 38: // up arrow 
		  if (currentLocationOfPlayer - widthOfBoard >= 0){
			  tryToMove("up");
		  } // if
		  break;
		case 39: // right arrow
		  if (currentLocationOfPlayer % widthOfBoard < widthOfBoard - 1){
			  tryToMove("right");
		  } // if
		  break;
		case 40: // down arrow
		  if (currentLocationOfPlayer + widthOfBoard < widthOfBoard * widthOfBoard) {
			  tryToMove("down");  
		  } // if
		  break;
	} // switch
} // key event listener 

// try to move the horse
function tryToMove(direction) {
  
  // location before move
  let oldLocation = currentLocationOfPlayer;
  
  // class of location before move
  let oldClassName = gridBoxes[oldLocation].className;
  
  let nextLocation = 0; // location we wish to move to 
  let nextClass = "";   // class of location we wish to move to
  
  let nextLocation2 = 0;
  let nextClass2 = 0;
  
  let newClass = ""; // new class to switch to if move successful

  switch (direction) {
	  case "left":
		nextLocation = currentLocationOfPlayer - 1;
		break;
	  case "right":
		nextLocation = currentLocationOfPlayer + 1;
		break;
	  case "down":
		nextLocation = currentLocationOfPlayer + widthOfBoard;
		break;
	  case "up":
		nextLocation = currentLocationOfPlayer - widthOfBoard;
		break;
    } // switch
  
  nextClass = gridBoxes[nextLocation].className;
  
  // if the obstacle is not passable, don't move
  if (noPassObstacles.includes(nextClass)){ return;}
  
  // collect heart 
  if (nextClass == "heart2" && lives != 3){
	  if (lives == 2) {
		  document.getElementById("heart1").style.visibility = "visible";
	  } else if (lives == 1) {
		  document.getElementById("heart2").style.visibility = "visible";
	  } // else if
	  lives ++;
  } else if (nextClass == "heart2" && lives == 3) {
	  return;
  } // else if
  
  // if player doesn't have the key, don't open door
  if (!keyOn && nextClass.includes("door")) { return;}
  
  // if it's ice, and there is no key, don't move
  if (!keyOn && nextClass.includes("ice")) { return;}
  
  // if there is a ice, move two spaces with animation
  if (nextClass.includes("ice")) {
	  
	  // rider must be on to jump
	  if (keyOn) {
		gridBoxes[currentLocationOfPlayer].className = "";
		oldClassName = gridBoxes[nextLocation].className;
	  } // if
	  
	  // set values according to direction 
	  if (direction == "left") {
		  nextClass = "jumpL";
		  nextClass2 = "playerkeyleft";
		  nextLocation2 = nextLocation - 1;
	  } else if (direction == "right") {
		  nextClass = "jumpR";
		  nextClass2 = "playerkeyright";
		  nextLocation2 = nextLocation + 1;
	  } else if (direction == "up") {
		  nextClass = "jumpUp";
		  nextClass2 = "playerkeyup";
		  nextLocation2 = nextLocation - widthOfBoard;
	  } else if (direction == "down") {
		  nextClass = "jumpD";
		  nextClass2 = "playerkeydown";
		  nextLocation2 = nextLocation + widthOfBoard;
	  } // else if
	  
	  // show player jumping
	  gridBoxes[nextLocation].className = nextClass;
	  
	  setTimeout(function() {
		  
		  // set jump back to just ice
		  gridBoxes[nextLocation].className = oldClassName;
		  
		  // update current location of player to be 2 spaces past take off
		  currentLocationOfPlayer = nextLocation2;
		  
		  // get class of box after jump
		  nextClass = gridBoxes[currentLocationOfPlayer].className;
		   
		  // show player and key after landing
		  gridBoxes[currentLocationOfPlayer].className = nextClass2;
		 
		  // if next box is a door, go up a level	
		  levelUp(nextClass);

	  }, 350);
	  return;  
  } // if class has fence
  
  // if there is a key, add key
  if (nextClass == "key") {
	  keyOn = true;
  } // if
  
  // if there is a bridge in the old location keep it
  if (oldClassName.includes("bridge")) {
	  gridBoxes[oldLocation].className = "bridge";
  } else {
	  gridBoxes[oldLocation].className = "";
  } // else
  
  // build name of a new class
  newClass = (keyOn) ? "playerkey" : "player";
  newClass += direction;
  
  // there is a bridge in the next location, keep it
  if (gridBoxes[nextLocation].classList.contains("bridge")) {
	  newClass += " bridge";
  } // if
  
  // move 1 space 
  currentLocationOfPlayer = nextLocation;
  gridBoxes[currentLocationOfPlayer].className = newClass;
  
  // if it is an enemy, end game
  hitEnemy(nextClass);
  
  // move up to next level if needed
  levelUp(nextClass);
  
} // tryToMove

// move up a level
function levelUp(nextClass){
  
  // move to next level if there is one 
  if (nextClass == "door" && keyOn && currentLevel != 4){
	  document.getElementById("levelup").style.display = "block";
	  clearTimeout(currentAnimation);
	  clearTimeout(currentAnimation2);
	  setTimeout(function() {
		  document.getElementById("levelup").style.display = "none";
		  currentLevel++;
    	  loadLevel();
	  }, 1000);
  } // if
  
  // end game when levels are finished
  if (nextClass == "door" && keyOn && currentLevel == 4) {
	  // document.getElementById("endgame").style.display = "block";
	  location.replace("win.html");
  } // if
  
} // levelUp

// load levels 0 - maxlevel
function loadLevel() {
  let levelMap = levels[currentLevel];
  let animateBoxes;
  let animateBoxes2;
  keyOn = false;
  
  // load board
  for (i = 0; i < gridBoxes.length; i++) {
	  gridBoxes[i].className = levelMap[i];
	  if (levelMap[i].includes("player")) currentLocationOfPlayer = i;
  } // for
  
  animateBoxes = document.querySelectorAll(".animate"); 
  animateBoxes2 = document.querySelectorAll(".animate2");
  animateEnemy(animateBoxes, 0, "left");
  animateEnemy2(animateBoxes2, 0, "right");
  	
} // loadLevel

// animate enemy left to right (could add up and down to this)
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation 
function animateEnemy (boxes, index, direction) {
  
  // exit function if no animation
  if (boxes.length <= 0) {return; }
  
  // update images 
  if (direction == "right") {
	  nextEnemyClass = boxes[index].className;
	  hitEnemy(nextEnemyClass);
	  boxes[index].classList.add("birdR");
  } else {
	  nextEnemyClass = boxes[index].className;
	  hitEnemy(nextEnemyClass);
	  boxes[index].classList.add("birdL");
  } // else
  
  // remove images from other boxes 
  for (i = 0; i < boxes.length; i++) {
	  if (i != index) {
		 boxes[i].classList.remove("birdL"); 
		 boxes[i].classList.remove("birdR"); 
	  } // if
  } // for
  
  // moving right
  if (direction == "right"){
	  // turn around if hit right side
	  if (index == boxes.length - 1) {
		 index --;
		 direction = "left";
	  } else {
		  index ++;
	  } // if
  
  // moving left
  } else {
	  // turn around if hit left side
	  if (index == 0) {
		 index ++;
		 direction = "right";
	  } else {
		  index --;
	  } // if
  } // else 
  
  currentAnimation = setTimeout(function() {
	  animateEnemy(boxes, index, direction);
  }, 750);
  
} // animateEnemy
function animateEnemy2 (boxes, index, direction) {
  
  // exit function if no animation
  if (boxes.length <= 0) {return; }
  
  // update images 
  if (direction == "right") {
	  nextEnemyClass = boxes[index].className;
	  hitEnemy(nextEnemyClass);
	  boxes[index].classList.add("birdR");
  } else {
	  nextEnemyClass = boxes[index].className;
	  hitEnemy(nextEnemyClass);
	  boxes[index].classList.add("birdL");
  } // else
  
  // remove images from other boxes 
  for (i = 0; i < boxes.length; i++) {
	  if (i != index) {
		 boxes[i].classList.remove("birdL"); 
		 boxes[i].classList.remove("birdR"); 
	  } // if
  } // for
  
  // moving right
  if (direction == "right"){
	  // turn around if hit right side
	  if (index == boxes.length - 1) {
		 index --;
		 direction = "left";
	  } else {
		  index ++;
	  } // if
  
  // moving left
  } else {
	  // turn around if hit left side
	  if (index == 0) {
		 index ++;
		 direction = "right";
	  } else {
		  index --;
	  } // if
  } // else 
  
  currentAnimation2 = setTimeout(function() {
	  animateEnemy2(boxes, index, direction);
  }, 750);
  
} // animateEnemy

// determines if enemy and player hit each other
function hitEnemy(nextClasses) {
	
  // check if it hit the horse 
  if (nextClasses.includes("player")){
	  lives --;
	  
	  if (lives == 2) {
		  document.getElementById("heart1").style.visibility = "hidden";
	  } else if (lives == 1) {
		  document.getElementById("heart2").style.visibility = "hidden";
	  } else if (lives <= 0) {
		 document.getElementById("heart3").style.visibility = "hidden";
		 location.replace("lose.html");
	  } // else 
	  
	  return;
  } // if
  
  // check if it hit enemy
  if (nextClasses.includes("bird")){
	  lives --;
	  
	  if (lives == 2) {
		  document.getElementById("heart1").style.visibility = "hidden";
	  } else if (lives == 1) {
		  document.getElementById("heart2").style.visibility = "hidden";
	  } else if (lives <= 0) {
		 document.getElementById("heart3").style.visibility = "hidden";
		 location.replace("lose.html");
	  } // else 
	  
	  return;
  } // if
  
  /* use if the code above does not work: 
  put in animateEnemy
  
  if(boxes[index].className.includes("rider")){
	  console.log("coliision has occurred");
  }*/
  
} // hitEnemy

// resume game play
function resumeGame () {
  document.onkeydown = function (e) { keydownEventListener(e); };
} // resumeGame

// pause game play
function pauseGame() {
  let level = currentLevel + 1;
  let message1 = "Game Paused";
  let message2 = "";
  
  if (keyOn) {
	 message2 = "You have the key and are currently on level " + level + ". You have " + lives + " lives/life left. Press resume to continue!";
  } else {
	 message2 = "You don't have the key and are currently on level " + level + ". You have " + lives + " lives/life left. Press resume to continue!"; 
  } // if
  
  document.onkeydown = function(){};
  showLightBox(message1, message2);
  
} // pauseGame

/****Lightbox Code****/

// change the visibility of divId
function changeVisibility (divId){
  var elem = document.getElementById(divId);
  
  // if element exists, it is considered true
  if (elem){
	elem.className = (elem.className == 'hidden') ? 'unhidden' : 'hidden';
  } // if 
} // changeVisibility

// display message in lightbox
function showLightBox(message, message2){
  
  // set messages
  document.getElementById("message").innerHTML = message;
  document.getElementById("message2").innerHTML = message2;
  
  // show lightbox
  changeVisibility ("lightbox");
  changeVisibility ("boundaryMessage");
  
} // showLightBox

// close light box
function continueGame (){
  changeVisibility ("lightbox");
  changeVisibility ("boundaryMessage");
} // continueGame

/****END Lightbox Code****/

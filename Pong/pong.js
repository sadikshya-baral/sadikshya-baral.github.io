// global variables
var speedOfPaddle1 = 0;
const startPositionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var speedOfPaddle2 = 0;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;

const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;

const gameboardHeight = document.getElementById("gameBoard").offsetHeight;
const gameBoardWidth = document.getElementById("gameBoard").offsetWidth;
 
const ballHeight = document.getElementById("ball").offsetHeight;
 
const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;

var score1 = document.getElementById("score1").innerHTML;
var score2 = document.getElementById("score2").innerHTML;

var bounce = new sound("sounds/jump.mp3");
var out = new sound ("sounds/buzzer.mp3");

var newHeight = 0;

// used to determine when to stop an abilities
var counter = 0;
var counter2 = 0;
var counter3 = 0;
var counter4 = 0;

// used to control game start/stop
var controlPlay;

// start ball motion 
/*window.addEventListener('load', function() {
	startBall();
});*/

// increases the height the paddles
function longerPaddles (divId) {
	newHeight = paddleHeight + 60;
	document.getElementById(divId).style.height = newHeight + 'px';
			
	// turn height back after 2 secs
	setTimeout(function(){
	  document.getElementById(divId).style.height = 150 + 'px';
	  newHeight = 0;
	}, 2500);
	
} // longerPaddles

// control paddles
document.addEventListener('keydown', function(e) {
	
	// move paddles
	if (e.keyCode == 87 || e.which == 87){ // W
	   speedOfPaddle1 = -10;
	} //if
	if (e.keyCode == 83 || e.which == 83){ // S
	   speedOfPaddle1 = 10;
	} //if
	if (e.keyCode == 38 || e.which == 38){ // up arrow
	   speedOfPaddle2 = -10;
	} //if
	if (e.keyCode == 40 || e.which == 40){ // down arrow
	   speedOfPaddle2 = 10;
	} //if
	
	// make paddle longer for 2 secs 3 times 
	if (e.keyCode == 65 || e.which == 65) { // A
		if (counter < 3) {
			longerPaddles("paddle1");
		} // if
		counter ++;
	} // if
	if (e.keyCode == 37 || e.which == 37) { // left arrow
		if (counter2 < 3){
			longerPaddles("paddle2");
		} // if
		counter2 ++;
	} // if
	
	if (e.keyCode == 68 || e.which == 68) { // D
		if (counter3 < 1) {
			stopPaddle("player2");
		} // if
		counter3 ++;
	} // if 
	
	if (e.keyCode == 39 || e.which == 39) { // right arrow
		if (counter4 < 1) {
			stopPaddle("player1");
		} // if
		counter4 ++;
	} // if 
	
});

// stop paddle temporary 
function stopPaddle(player = "") {
	
	if (player == "player2") {
		document.addEventListener('keydown', function(e) {
			if (e.keyCode == 38 || e.which == 38){ // up arrow
					speedOfPaddle2 = 0;;
				  } //if
				  if (e.keyCode == 40 || e.which == 40){ // down arrow
					speedOfPaddle2 = 0;
				  } //if
		});
		
		setTimeout(function(){
		  document.addEventListener('keydown', function(e) {
			  if (e.keyCode == 38 || e.which == 38){ // up arrow
				speedOfPaddle2 = -10;;
			  } //if
			  if (e.keyCode == 40 || e.which == 40){ // down arrow
				speedOfPaddle2 = 10;
			  } //if
		  });
		}, 2000);
		
	} // if
	
	if (player == "player1") {
		document.addEventListener('keydown', function(e) {
			if (e.keyCode == 87 || e.which == 87){ // W
				speedOfPaddle1 = 0;
			} //if
			if (e.keyCode == 83 || e.which == 83){ // S
				speedOfPaddle1 = 0;
			} //if
		});
	
		setTimeout(function(){
			document.addEventListener('keydown', function(e) {
				if (e.keyCode == 87 || e.which == 87){ // W
					speedOfPaddle1 = -10;
				} //if
				if (e.keyCode == 83 || e.which == 83){ // S
					speedOfPaddle1 = 10;
				} //if
			});
		}, 2000);
		
	} // if
	
} // stopPaddle

// Stop paddles
document.addEventListener('keyup', function(e) {
	
	// stop paddles
	if (e.keyCode == 87 || e.which == 87){ // W
	   speedOfPaddle1 = 0;
	} // if
	if (e.keyCode == 83 || e.which == 83){ // S
	   speedOfPaddle1 = 0;
	} //if
	if (e.keyCode == 38 || e.which == 38){ // up arrow
	   speedOfPaddle2 = 0;
	} // if
	if (e.keyCode == 40 || e.which == 40){ // down arrow
	   speedOfPaddle2 = 0;
	} //if
});

// object constructor to play sounds
// https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
} // sound

// start the ball movement
function startBall () {
  let direction = 1;
  let rand =  Math.floor(Math.random() * 6); // 0-5
  
  topPositionOfBall = startTopPositionOfBall;
  leftPositionOfBall = startLeftPositionOfBall;
  
  // 50% chance of starting in either direction (right or left) 
  if (Math.random() < 0.5) {
	  direction = 1;
  } else {
	 direction = -1;
  } // else
  
  // random speed
  if (rand == 0) {
	 topSpeedOfBall = Math.random() * 2 + 3; // 3-4.999
	 leftSpeedOfBall = direction * (Math.random() * 2 + 3);
  } else if (rand == 1) {
	 topSpeedOfBall = Math.random() * 2 + 4; 
	 leftSpeedOfBall = direction * (Math.random() * 2 + 3);
  } else if (rand == 2) {
	 topSpeedOfBall = Math.random() * 2 + 5;
	 leftSpeedOfBall = direction * (Math.random() * 2 + 3);	 
  } else if (rand == 3) {
	 topSpeedOfBall = Math.random() * 2 + 6;
	 leftSpeedOfBall = direction * (Math.random() * 2 + 3);
  } else {
	 topSpeedOfBall = Math.random() * 2 + 7;
     leftSpeedOfBall = direction * (Math.random() * 2 + 3);	 
  } // else  
  
} // startBall

// update locations of paddles and ball
function show() {
  
  // update positions of elements 
  positionOfPaddle1 += speedOfPaddle1;
  positionOfPaddle2 += speedOfPaddle2;
  topPositionOfBall += topSpeedOfBall;
  leftPositionOfBall += leftSpeedOfBall;
  
  // stop paddles from leaving top of gameBoard
  if (positionOfPaddle1 <= 0) {
	  positionOfPaddle1 = 0;
  } // if
  if (positionOfPaddle2 <= 0) {
	  positionOfPaddle2 = 0;
  } // if
  
  // stop paddles from leaving bottom of gameBoard
  if (positionOfPaddle1 >= gameboardHeight - paddleHeight) {
	  positionOfPaddle1 = gameboardHeight - paddleHeight;
  } // if
  if (positionOfPaddle2 >= gameboardHeight - paddleHeight) {
	  positionOfPaddle2 = gameboardHeight - paddleHeight;
  } // if
  
  // stop longer paddles from leaving bottom of gameBoard
  if (positionOfPaddle1 >= gameboardHeight - newHeight && newHeight != 0) {
	  positionOfPaddle1 = gameboardHeight - newHeight - 10;
  } // if
  if (positionOfPaddle2 >= gameboardHeight - newHeight && newHeight != 0) {
	  positionOfPaddle2 = gameboardHeight - newHeight - 10;
  } // if
  
  // if ball hits top, or bottom, of gameboard, change direction
  if (topPositionOfBall <= 0 || topPositionOfBall >= gameboardHeight - ballHeight) {
	  topSpeedOfBall *= -1;
  } // if
  
  // ball on left edge of gameboard
  if (leftPositionOfBall <= paddleWidth) {
	  
	  // if ball hits left paddle, change direction
	  if (topPositionOfBall > positionOfPaddle1 && 
	        topPositionOfBall < positionOfPaddle1 + paddleHeight){
		  bounce.play();
		  leftSpeedOfBall *= -1;
	  } else {
		  score2 ++;
		  document.getElementById("score2").innerHTML = score2;
		  out.play();
		  startBall();
	  } // else
  } // if
  
  // ball on right edge of gameboard
  if (leftPositionOfBall >= gameBoardWidth - paddleWidth - ballHeight) {
	  
	  // if ball hits right paddle, change direction
	  if (topPositionOfBall > positionOfPaddle2 && 
	        topPositionOfBall < positionOfPaddle2 + paddleHeight){
		  bounce.play();
		  leftSpeedOfBall *= -1;
	  } else {
		  score1 ++;
		  document.getElementById("score1").innerHTML = score1;
		  out.play();
		  startBall();
	  } // else
	  
  } // if
  
  // stop game when one player has reached to 10 points
	if (score1 == 10 || score2 == 10) {
		stopGame();
	} // if
  
  document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
  document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
  document.getElementById("ball").style.top = topPositionOfBall + "px";
  document.getElementById("ball").style.left = leftPositionOfBall + "px";
  
} // show

// resume game play
function resumeGame () {
  if (!controlPlay){
	  controlPlay = window.setInterval(show, 1000/60);
  } // if
} // resumeGame

// pause game play
function pauseGame() {
  window.clearInterval(controlPlay);
  controlPlay = false;
} // pauseGame

// start game play
function startGame () {
  
  // reset scores, ball and paddle location
  score1 = 0;
  score2 = 0;
  document.getElementById("score1").innerHTML = score1;
  document.getElementById("score2").innerHTML = score1;
  positionOfPaddle1 = startPositionOfPaddle1;
  positionOfPaddle2 = startPositionOfPaddle2;
  counter = 0;
  counter2 = 0;
  counter3 = 0;
  counter4 = 0;
 
 startBall();
	
  if (!controlPlay){
	  controlPlay = window.setInterval(show, 1000/60);
  } // if
} // startGame

// stop game play
function stopGame() {
  window.clearInterval(controlPlay);
  controlPlay = false;
  
  // show lightbox with score 
  let message1 = "Tie Game";
  let message2 = "Close to continue";
  
  if (score2 > score1){
	  message1 = "Player 2 wins with " + score2 + " point(s)!";
      message2 = "Player 1 had " + score1 + " point(s)!";
  } else if(score2 < score1){
	  message1 = "Player 1 wins with " + score1 + " point(s)!";
      message2 = "Player 2 had " + score2 + " point(s)!";
  } // else if
  
  showLightBox(message1, message2);
  
} // stopGame

// explain special abilities
function abilities() {
  let message1 = "";
  let message2 = "You can increase your paddle's height, 3 times total in the game. Player 1, press 'A'. Player 2, press 'left arrow'. You can stop you opponent's paddle, only once, by pressing, 'D' (player 1), 'right arrow' (player 2).";
	
  showLightBox(message1, message2);
} // instructions 

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

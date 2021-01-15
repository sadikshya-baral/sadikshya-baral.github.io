let currentPlayer = "X";
let gameStatus = ""; // "" - continue game, "Tie", "X wins", "O wins"
let numTurns = 0;
let idNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
let rand = 0;
let rand2 = 0;
let rand3 = 0;
  
// restest board and all variables
function newGame() {
	
	// reset board
	for (var i = 0; i < idNames.length; i++){
	  document.getElementById(idNames[i]).innerHTML = "";
	} // for
	
	numTurns = 0;
	gameStatus = "";
	currentPlayer = "X";
	
	changeVisibility("controls");
	
} // newGame

// chooses three different numbers from 1-3
function pickThreeDifferentNums () {
	
  // pick three random numbers from 1-3
  while (rand == rand2 || rand == rand3 || rand2 == rand3){
	  rand = parseInt(Math.random()*3) + 1; // 1-3
	  rand2 = parseInt(Math.random()*3) + 1; // 1-3
	  rand3 = parseInt(Math.random()*3) + 1; // 1-3
  } // while
} // pickThreeDifferentNums 

// chooses a free box for computer
function computerTakeTurn () {
   let idName = "";
   let cornerBoxes = ["one", "three", "seven", "nine"];
   let firstRow = ["one", "two", "three"];
   let secondRow = ["four", "five", "six"];
   let thirdRow = ["seven", "eight", "nine"];
   let firstColumn = ["one", "four", "seven"];
   let secondColumn = ["two", "five", "eight"];
   let thirdColumn = ["three", "six", "nine"];
   let firstDiagonal = ["one", "five", "nine"];
   let secondDiagonal = ["three", "five", "seven"];
   
   do{
	   
	  // block 'X' when its about to win on first row
	  pickThreeDifferentNums ();
	  
	  if (document.getElementById(firstRow[rand-1]).innerHTML == "X" && 
	  document.getElementById(firstRow[rand2-1]).innerHTML == "X" && 
	  document.getElementById(firstRow[rand3-1]).innerHTML == "") {
		  document.getElementById(firstRow[rand3-1]).innerHTML = currentPlayer;
		  break;
	  } // if
	  
	  // block 'X' when its about to win on second row
	  pickThreeDifferentNums ();
	  
	  if (document.getElementById(secondRow[rand-1]).innerHTML == "X" && 
	  document.getElementById(secondRow[rand2-1]).innerHTML == "X" && 
	  document.getElementById(secondRow[rand3-1]).innerHTML == "") {
		  document.getElementById(secondRow[rand3-1]).innerHTML = currentPlayer;
		  break;
	  } // if
	  
	  // block 'X' when its about to win on third row
	  pickThreeDifferentNums ();
	  
	  if (document.getElementById(thirdRow[rand-1]).innerHTML == "X" && 
	  document.getElementById(thirdRow[rand2-1]).innerHTML == "X" && 
	  document.getElementById(thirdRow[rand3-1]).innerHTML == "") {
		  document.getElementById(thirdRow[rand3-1]).innerHTML = currentPlayer;
		  break;
	  } // if
	  
	  // block 'X' when its about to win on first column
	  pickThreeDifferentNums ();
	  
	  if (document.getElementById(firstColumn[rand-1]).innerHTML == "X" && 
	  document.getElementById(firstColumn[rand2-1]).innerHTML == "X" && 
	  document.getElementById(firstColumn[rand3-1]).innerHTML == "") {
		  document.getElementById(firstColumn[rand3-1]).innerHTML = currentPlayer;
		  break;
	  } // if
	  
	  // block 'X' when its about to win on second column
	  pickThreeDifferentNums ();
	  
	  if (document.getElementById(secondColumn[rand-1]).innerHTML == "X" && 
	  document.getElementById(secondColumn[rand2-1]).innerHTML == "X" && 
	  document.getElementById(secondColumn[rand3-1]).innerHTML == "") {
		  document.getElementById(secondColumn[rand3-1]).innerHTML = currentPlayer;
		  break;
	  } // if
	  
	  // block 'X' when its about to win on third column
	  pickThreeDifferentNums ();
	  
	  if (document.getElementById(thirdColumn[rand-1]).innerHTML == "X" && 
	  document.getElementById(thirdColumn[rand2-1]).innerHTML == "X" && 
	  document.getElementById(thirdColumn[rand3-1]).innerHTML == "") {
		  document.getElementById(thirdColumn[rand3-1]).innerHTML = currentPlayer;
		  break;
	  } // if
	  
	  // block 'X' when its about to win on the left diagonal line
	  pickThreeDifferentNums ();
	  
	  if (document.getElementById(firstDiagonal[rand-1]).innerHTML == "X" && 
	  document.getElementById(firstDiagonal[rand2-1]).innerHTML == "X" && 
	  document.getElementById(firstDiagonal[rand3-1]).innerHTML == "") {
		  document.getElementById(firstDiagonal[rand3-1]).innerHTML = currentPlayer;
		  break;
	  } // if
	  
	  // block 'X' when its about to win on the right diagonal line
	  pickThreeDifferentNums ();
	  
	  if (document.getElementById(secondDiagonal[rand-1]).innerHTML == "X" && 
	  document.getElementById(secondDiagonal[rand2-1]).innerHTML == "X" && 
	  document.getElementById(secondDiagonal[rand3-1]).innerHTML == "") {
		  document.getElementById(secondDiagonal[rand3-1]).innerHTML = currentPlayer;
		  break;
	  } // if
	  
	  // choose center box if empty
      if (document.getElementById("five").innerHTML == "") {
		  document.getElementById("five").innerHTML = currentPlayer;
		  break;
	  } // if
	  
	  // choose a  random corner box if empty
	  let random = parseInt(Math.random()*4) + 1; // 1-4
	  idName = cornerBoxes[random-1];
	  
	  if (document.getElementById(idName).innerHTML == "") {
		  document.getElementById(idName).innerHTML = currentPlayer;
		  break;
	  } // if
	  
	 // choose random boxes until an empty box is found
	 let randNum = parseInt(Math.random()*9) + 1; // 1-9
	 idName = idNames[randNum-1];
	 
     if (document.getElementById(idName).innerHTML == "") {
		 document.getElementById(idName).innerHTML = currentPlayer;
		 break;
     } // if 
  } while (true);
  
} // computerTakeTurn 



// take player turn
function playerTakeTurn(e){
  
  if (e.innerHTML == "") {
	 e.innerHTML = currentPlayer;
	 checkGameStatus();
	 
	 // if game is not over, computer goes
	 if (gameStatus == "") {
		 setTimeout( function () {
	         computerTakeTurn();
	         checkGameStatus();
		    }, 500
		 );
	 } // if
	 
  } else {
	 showLightBox("This box is already selected.", "Please select another one!");
	 return;	 
  } // else
  
} // playerTakeTurn

// after each turn, check for a winner, a tie, or continue playing
function checkGameStatus(){
  numTurns++; // count turn
  
  // check for Win
  if (checkWin()){
	  gameStatus = currentPlayer + " wins";
  } // if
  
  // check for tie
  if (numTurns == 9 && checkWin() != true){
	  gameStatus = "Game Tied";
  } // if
  
  // switch current player
  currentPlayer = (currentPlayer == "X" ? "O" : "X");
  
  // game is over
  if (gameStatus != ""){
	 setTimeout(function () {showLightBox(gameStatus, "Game Over!");}, 500 );
  } // if
  
  
} // checkGameStatus

// check for a Win, there 8 win paths
function checkWin(){
  let cb = []; // current board
  cb [0] = ""; // not going to use
  cb [1] = document.getElementById("one").innerHTML;
  cb [2] = document.getElementById("two").innerHTML;
  cb [3] = document.getElementById("three").innerHTML;
  cb [4] = document.getElementById("four").innerHTML;
  cb [5] = document.getElementById("five").innerHTML;
  cb [6] = document.getElementById("six").innerHTML;
  cb [7] = document.getElementById("seven").innerHTML;
  cb [8] = document.getElementById("eight").innerHTML;
  cb [9] = document.getElementById("nine").innerHTML;
  
  // top row 
  if(cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3]){
	  return true;
  } // if
  
  // second row
  if(cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6]){
	  return true;
  } // if
  
  // third row
  if(cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9]){
	  return true;
  } // if
  
  // first column
  if(cb[1] != "" && cb[1] == cb[4] && cb[4] == cb[7]){
	  return true;
  } // if
  
  // second column
  if(cb[2] != "" && cb[2] == cb[5] && cb[5] == cb[8]){
	  return true;
  } // if
  
  // third column
  if(cb[3] != "" && cb[3] == cb[6] && cb[6] == cb[9]){
	  return true;
  } // if
  
  // diagonal line from the left
  if(cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9]){
	  return true;
  } // if
  
  // diagonal line from the right
  if(cb[3] != "" && cb[3] == cb[5] && cb[5] == cb[7]){
	  return true;
  } // if
  
  //return false;
  
} // checkWin

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
  
  // if the game is over, show controls
  if (gameStatus != ""){
	  changeVisibility ("controls");
  } // if
  
} // continueGame
$(document).ready(function(){
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var canvasWidth = $("#canvas").width();
	var canvasHeight = $("#canvas").height();
	var pikachu;
	var pikaDirection;
	var pikaSize;
	var score;
	var level;

	var food = {x:100, y:100};
	var poo = {x:500, y: 400};

	function init(){
		pikachu = {x:200, y:200};
		pikaDirection = "right";
		pikaSize = 10;
		score = 1;
		level = 1;
		speed = 200;

		createBackground();
		paintScore();
		paintLevel();

		paintSquare(pikachu);

		newLocation(food);
		paintSquare(food);

		newLocation(poo);
		paintSquare(poo);

	};
	init();

	game_loop = setInterval(paint, speed);
	
	function createBackground(){
		// #77DD77

		if (level == 1) {
			backgroundColor = "#F78181";
		} else if (level == 2) {
			backgroundColor = "#F18258";
		} else if (level == 3) {
			backgroundColor = "#FAAC58";
		} else if (level == 4) {
			backgroundColor = "#D0FA58";
		} else if (level == 5) {
			backgroundColor = "#00FFBF";
		} else if (level == 6) {
			backgroundColor = "#2E9AFE";
		} else if (level == 7) {
			backgroundColor = "#BE81F7";
		} else if (level == 8) {
			backgroundColor = "#F781D8";
		} else if (level == 9) {
			backgroundColor = "#819FF7";
		} else if (level == 10) {
			backgroundColor = "#F5DA81";
		} else {
			backgroundColor = "#DBA901";
		} 

		ctx.fillStyle= backgroundColor;
		ctx.fillRect(0,0,canvasWidth,canvasHeight);
		ctx.strokeStyle="black";
		ctx.strokeRect(0,0,canvasWidth,canvasHeight);
		console.log("background done");
	};

	function createPickachu(){
		ctx.fillStyle="yellow";
		ctx.fillRect(pikachu.x,pikachu.y,pikaSize, pikaSize);
		ctx.strokeStyle="brown";
		ctx.strokeRect(pikachu.x,pikachu.y,pikaSize,pikaSize);
		//console.log("pikachu loc (x = " + pikachu.x + ", y = " + pikachu.y + ")");
	};

	function paint(){
		createBackground();
		movePikachu();

		// if off the canvas, restart the game
		if (pikachu.x == 0 || pikachu.x == canvasWidth ||
			pikachu.y == 0 || pikachu.y == canvasHeight ||
			pikaSize < 1) {
			init();
			return;
		} else if (score == 5) { // level up!
			level = level + 1;
			score = 0;
			speed = speed - 50;
			
			clearInterval(game_loop);
			game_loop = setInterval(paint, speed);

			if (speed == 0) { // you win the game!
				paintWinMessage();
				clearInterval(game_loop);
				return;
			}
		}

		console.log("score: " + score + ", level: " + level + ", speed: " + speed);

		createPickachu();
		paintScore();
		paintLevel();
	};

	// keyboard controls:
	$(document).keydown(function(e){
		var key = e.which;
		if (key == "37") pikaDirection = "left";
		else if (key == "38") pikaDirection = "up";
		else if (key == "39") pikaDirection = "right";
		else if (key == "40") pikaDirection = "down";

		//console.log ("pikachu direction: " + pikaDirection + ", size: " + pikaSize);
	});


	function movePikachu(){
		
		if (pikaDirection == "left") { 
			pikachu.x = pikachu.x - 10;
		} else if (pikaDirection == "right") {
			pikachu.x = pikachu.x + 10;
		} else if (pikaDirection == "up") {
			pikachu.y = pikachu.y - 10;
		} else if (pikaDirection == "down") {
			pikachu.y = pikachu.y + 10;
		}
		
		if (sameLocation(food)){
			pikaSize = pikaSize + 10;
			score = score + 1;
			newLocation(food);
		} 
		paintSquare(food);

		if (sameLocation(poo)){
			pikaSize = pikaSize - 10;
			score = score -1;
			newLocation(poo);
		}
		paintSquare(poo);

	};

	function sameLocation(item){
		//console.log("check location? ");
		if(pikachu.x <= item.x &&  item.x <= (pikachu.x+pikaSize) &&
			pikachu.y <= item.y &&  item.y <= (pikachu.y+pikaSize)){
			return true;
		}
		return false;
	};

	function newLocation(item){
		item.x = Math.round(Math.random()*(canvasWidth-10)/10)*10;
		item.y = Math.round(Math.random()*(canvasHeight-10)/10)*10;
	};

	function paintSquare(item) {
		if (item == food) {
			insideColor = "red";
			borderColor = "green";
		} else if (item == poo) {
			insideColor = "brown";
			borderColor = "black";
		} else if (item == pikachu) {
			insideColor = "yellow";
			borderColor = "brown";
		} else {
			insideColor = "white";
			borderColor - "white";
			console.log ("painting weird object: " + item);
		}

		ctx.fillStyle=insideColor;
		ctx.fillRect(item.x,item.y,10, 10);
		ctx.strokeStyle=borderColor;
		ctx.strokeRect(item.x,item.y,10,10);
	};

	function paintScore(){
		ctx.fillStyle="black";
		ctx.font="12px Cambria";
		var scoreText = "Score: " + score;
		ctx.fillText(scoreText, 5, canvasHeight-5);
	};

	function paintLevel(){
		ctx.fillStyle="black";
		ctx.font="15px Cambria";
		var scoreText = "LEVEL: " + level;
		ctx.fillText(scoreText, canvasWidth/2-10, 15);	
	};

	function paintWinMessage(){
		ctx.fillStyle="black";
		ctx.font="20px Cambria";
		var scoreText = "YOU WIN!! :)";
		ctx.fillText(scoreText, canvasWidth/2-10, canvasHeight/2);	
	};

});
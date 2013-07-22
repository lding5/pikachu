$(document).ready(function(){
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var canvasWidth = $("#canvas").width();
	var canvasHeight = $("#canvas").height();
	var pikachu = {x:200, y:200};
	var pikaDirection;
	var pikaSize = 10;

	var food = {x:100, y:100};
	var poo = {x:500, y: 400};

	function init(){
		createBackground();
		createPickachu();
		createFood(true);
		createPoo(true);
	}
	init();
	
	function createBackground(){
		ctx.fillStyle="#77DD77";
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

		console.log("pikachu loc (x = " + pikachu.x + ", y = " + pikachu.y + ")");
	};

	// keyboard controls:
	$(document).keydown(function(e){
		var key = e.which;
		if (key == "37") pikaDirection = "left";
		else if (key == "38") pikaDirection = "up";
		else if (key == "39") pikaDirection = "right";
		else if (key == "40") pikaDirection = "down";

		movePikachu();
		console.log ("pikachu direction: " + pikaDirection + ", size: " + pikaSize);
	});

	function movePikachu(){
		
		createBackground();

		if (pikaDirection == "left") pikachu.x = pikachu.x - 10;
		else if (pikaDirection == "right") pikachu.x = pikachu.x + 10;
		else if (pikaDirection == "up") pikachu.y = pikachu.y - 10;
		else if (pikaDirection == "down") pikachu.y = pikachu.y + 10;


		if (sameLocation(food)){
			pikaSize = pikaSize + 10;
			createFood(true);
		} else {
			createFood(false);
		}

		if (sameLocation(poo)){
			pikaSize = pikaSize - 10;
			createPoo(true);
		} else {
			createPoo(false);
		}

		createPickachu();
		
	};

	function sameLocation(item){
		console.log("check location? ");
		if(pikachu.x <= item.x &&  item.x <= (pikachu.x+pikaSize) &&
			pikachu.y <= item.y &&  item.y <= (pikachu.y+pikaSize)){
			return true;
		}
		return false;
	}

	function newLocation(item){
		item.x = Math.round(Math.random()*(canvasWidth-10)/10)*10;
		item.y = Math.round(Math.random()*(canvasHeight-10)/10)*10;
	}

	function createFood(isNew){
		if (isNew){
			newLocation(food);
		}

		ctx.fillStyle="red";
		ctx.fillRect(food.x,food.y,10, 10);
		ctx.strokeStyle="green";
		ctx.strokeRect(food.x,food.y,10,10);
		console.log("food loc (x = " + food.x + ", y = " + food.y + ")");

	};

	function createPoo(isNew){
		if (isNew){
			newLocation(poo);
		}

		ctx.fillStyle="brown";
		ctx.fillRect(poo.x,poo.y,10, 10);
		ctx.strokeStyle="black";
		ctx.strokeRect(poo.x,poo.y,10,10);
		console.log("poo loc (x = " + poo.x + ", y = " + poo.y + ")");

	};

	createFood();

	function isInTheField(){
		if (pikachu.x == -1 || pikachu.x == canvasWidth){
			console.log("out of the field!!!");
			return true;
		}
	};


});
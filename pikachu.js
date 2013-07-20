$(document).ready(function(){
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	var pikachu = {x:200, y:200};
	var pika_direction;

	createBackground();
	createPickachu();
	// create background
	function createBackground(){
	ctx.fillStyle="#77DD77";
	ctx.fillRect(0,0,w,h);
	ctx.strokeStyle="black";
	ctx.strokeRect(0,0,w,h);
	console.log("background done");
	};


	// create pikachu
	function createPickachu(){
	ctx.fillStyle="yellow";
	ctx.fillRect(pikachu.x,pikachu.y,10, 10);
	ctx.strokeStyle="brown";
	ctx.strokeRect(pikachu.x,pikachu.y,10,10);
	console.log("pikachu done");
	
	console.log("pikachu loc (x = " + pikachu.x + ", y = " + pikachu.y + ")");
	};

	// keyboard controls:
	$(document).keydown(function(e){
		var key = e.which;
		if (key == "37") pika_direction = "left";
		else if (key == "38") pika_direction = "up";
		else if (key == "39") pika_direction = "right";
		else if (key == "40") pika_direction = "down";

		movePikachu();
		console.log ("pikachu direction: " + pika_direction);
	});

	function movePikachu(){
		if (pika_direction == "left") pikachu.x = pikachu.x - 10;
		else if (pika_direction == "right") pikachu.x = pikachu.x + 10;
		else if (pika_direction == "up") pikachu.y = pikachu.y - 10;
		else if (pika_direction == "down") pikachu.y = pikachu.y + 10;
		else { console.log ("moving pikachu, but idk direction?")};

		createBackground();
		createPickachu();



		
	};


});
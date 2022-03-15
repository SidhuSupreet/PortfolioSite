console.log('Its working');

let theme = localStorage.getItem('theme')

if(theme == null){
	setTheme('light')
}else{
	setTheme(theme)
}

let themeDots = document.getElementsByClassName('theme-dot')


for (var i=0; themeDots.length > i; i++){
	themeDots[i].addEventListener('click', function(){
		let mode = this.dataset.mode
		console.log('Option clicked:', mode)
		setTheme(mode)
	})
}

function setTheme(mode){
	if(mode == 'light'){
		document.getElementById('theme-style').href = 'default.css'
	}

	if(mode == 'blue'){
		document.getElementById('theme-style').href = 'blue.css'
	}

	if(mode == 'green'){
		document.getElementById('theme-style').href = 'green.css'
	}

	if(mode == 'purple'){
		document.getElementById('theme-style').href = 'purple.css'
	}

	localStorage.setItem('theme', mode)
}

/*
	For snake game
*/
const canvas = document.getElementById("game");
const ctx = canvas.getContext('2d');

if(!localStorage.getItem('highScore')){
	localStorage.setItem('highScore', 0);
}

class snakePart{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
}
let speed = 15;

//canvas attributes
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

//snake attributes
let headX = 10;
let headY = 10;
let velX = 0;
let velY = 0;
const snakeParts = [];
let tailLen = 2;
let prevVelX = 0;
let prevVelY = 0;


//food attributes
let foodX = 5;
let foodY = 5;

let score = 0;

function drawGame(){
	if(prevVelX === 1 && velX === -1){
		velX = prevVelX;
	}
	if(prevVelX === -1 && velX === 1){
		velX = prevVelX;
	}
	if(prevVelY === 1 && velY === -1){
		velY = prevVelY;
	}
	if(prevVelY === -1 && velY === 1){
		velY = prevVelY;
	}
	prevVelX = velX;
	prevVelY = velY;

	changeSnakePosition();
	let result = isGameOver();
	if(result){
		return;
	}
	clearScreen();
	checkFoodCollision();
	drawFood();
	drawSnake();
	drawScore();
	setTimeout(drawGame, 1000/speed);
}

function isGameOver() {
	let gameOver = false;

	if(velX === 0 && velY === 0){
		return false;
	}

	if(headX < 0 || headX === tileCount || headY < 0 || headY === tileCount){
		gameOver = true;
	}

	for(i = 0; i < snakeParts.length; i++){
		let part = snakeParts[i];
		if(headX === part.x && headY === part.y){
			gameOver = true;
			break;
		}
	}

	if (gameOver) {
		if(score > localStorage.getItem('highScore')){
			localStorage.setItem('highScore', score);
		}
		ctx.fillStyle = 'white';
		ctx.font = "50px Verdana"
		ctx.fillText("Game Over!", canvas.width /6.5, canvas.height/2);
		ctx.font = "17px Verdana"
		ctx.fillText("Press Enter to Restart", canvas.width/6.5 + 50, (canvas.height/2)+30);
		document.body.addEventListener('keydown', function restart(event){
			if(event.keyCode == 13) {
				location.reload();
			}
		});
	}
	
	return gameOver;
}

function clearScreen(){
	console.log("hey");
	ctx.fillStyle = 'black'
	ctx.fillRect(0,0,canvas.width,canvas.height)
}

function changeSnakePosition(){
	headX = headX + velX;
	headY = headY + velY;
}

function checkFoodCollision() {
	if(headX === foodX && headY === foodY){
		foodX = Math.floor(Math.random() * tileCount);
		foodY = Math.floor(Math.random() * tileCount);
		if(foodY <= 2){
			foodY += 2;
		}
		tailLen++;
		score++;
		if(score > localStorage.getItem('highScore')){
			localStorage.setItem('highScore', score);
		}
	}
}

function drawFood() {
	ctx.fillStyle = 'red'
	ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
}

function drawSnake() {
	ctx.fillStyle = 'green'
	for(i = 0; i < snakeParts.length; i++){
		let part = snakeParts[i];
		ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
	}

	snakeParts.push(new snakePart(headX, headY));
	while(snakeParts.length > tailLen){
		snakeParts.shift();
	}

	ctx.fillStyle = 'orange'
	ctx.strokeStyle = 'orange'
	ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function drawScore() {
	ctx.fillStyle = 'white';
	ctx.font = "10px Verdana"
	ctx.fillText("Score: " + score, 20, 20);
	ctx.fillText("High Score: " + localStorage.getItem('highScore'), canvas.width-100, 20);


}


document.body.addEventListener('keydown', keyDown);
//stops arrow keys from scrolling
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

function keyDown(event){
	//up
	if(event.keyCode == 38 || event.keyCode == 87){
		// if (velY == 1)
		// 	return;
		velY = -1;
		velX = 0;
	}
	//down
	if(event.keyCode == 40 || event.keyCode == 83){
		// if (velY == -1)
		// 	return;
		velY = 1;
		velX = 0;
	}
	//left
	if(event.keyCode == 37 || event.keyCode == 65){
		// if (velX == 1)
		// 	return;
		velY = 0;
		velX = -1;
	}
	//right
	if(event.keyCode == 39 || event.keyCode == 68){
		// if (velX == -1)
		// 	return;
		velY = 0;
		velX = 1;
	}
}

drawGame();

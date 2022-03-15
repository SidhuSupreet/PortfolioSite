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

//food attributes
let foodX = 5;
let foodY = 5;

let score = 0;

function drawGame(){
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
		ctx.fillStyle = 'white';
		ctx.font = "50px Verdana"
		ctx.fillText("Game Over!", canvas.width /6.5, canvas.height/2);
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
		tailLen++;
		score++;
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
	ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function drawScore() {
	ctx.fillStyle = 'white';
	ctx.font = "10px Verdana"
	ctx.fillText("Score: " + score, canvas.width-50, 10);
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
	if(event.keyCode == 38){
		if (velY == 1)
			return;
		velY = -1;
		velX = 0;
	}
	//down
	if(event.keyCode == 40){
		if (velY == -1)
			return;
		velY = 1;
		velX = 0;
	}
	//down
	if(event.keyCode == 37){
		if (velX == 1)
			return;
		velY = 0;
		velX = -1;
	}
	//down
	if(event.keyCode == 39){
		if (velX == -1)
			return;
		velY = 0;
		velX = 1;
	}
}

drawGame();